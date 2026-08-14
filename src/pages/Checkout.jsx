import PageBanner from "../components/ui/Cards/PageBanner";
import { useState, useEffect, useRef } from 'react'; 
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useCart } from '../hooks/useCart';

import { Icon } from '@iconify/react';
import { Minus, Plus } from 'lucide-react';
import { Link } from "react-router-dom";
import MainBtn from "../components/ui/buttons/MainBtn";

import data from "../assets/data";

gsap.registerPlugin(ScrollTrigger);

function Checkout() {
  // Destructuring : On s'assure de récupérer la liste 'cart', au cas où ton hook renvoie un objet
  // Si ton hook renvoie directement le tableau, utilise : const cart = useCart();
  const { cart = [] } = useCart() || {}; 

  const [paymentMethod, setPaymentMethod] = useState("bank_transfer");

  const subtotal = cart.reduce((acc, item) => acc + item.price, 0);

  // 1. CORRECTION GSAP : Remplacement de useState() par useRef(null)
  const checkoutRef = useRef(null); 

  useEffect(() => {
    if (!checkoutRef.current) return;

    // On utilise la référence DOM directe pour le sélecteur GSAP
    const ctx = gsap.context(() => {
      const q = gsap.utils.selector(checkoutRef.current);

      gsap.from(q(".returning-customer"), {
        y: -30,
        opacity: 0,
        duration: 0.6,
        ease: "power3.out",
        scrollTrigger: {
          trigger: q(".returning-customer"),
          start: "top 90%",
          toggleActions: "play none none reverse",
        }
      });
      
      gsap.from(q(".checkout-right"), {
        x: 50,
        opacity: 0,
        duration: 0.6,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: q(".checkout-right"),
          start: "top 85%",
          toggleActions: "play none none reverse",
        }
      });

      gsap.from(q(".checkout-table tbody tr"), {
        y: 30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: q(".checkout-table"),
          start: "top 85%",
          toggleActions: "play none none reverse",
        }
      });

      gsap.from(q(".payment-options input, .payment-options label, .payment-options button"), {
        scale: 0.95,
        opacity: 0,
        duration: 0.6,
        stagger: 0.15,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: q(".payment-options"), // Correction du sélecteur au pluriel pour correspondre à ton HTML futur
          start: "top 85%",
          toggleActions: "play none none reverse",
        }
      });

    }, checkoutRef.current); // Correction : On passe l'élément DOM réel (.current)

    return () => ctx.revert();
  }, [cart]);

  return (
    <>
      <PageBanner title="checkout" currentPage="checkout"/>

      <div ref={checkoutRef} className="container mx-auto py-[8%] px-4">
        <div className="bg-gray-50 border-t-4 border-black p-4 text-sm mb-10 returning-customer">
          Returning customer ? <Link to="/" className="cursor-pointer underline">Click here to login</Link>
        </div>
        
        {/* 2. CORRECTION TAILWIND : grid-clos-1 -> grid-cols-1 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          <div className="lg:col-span-7 billing-form">
            <h2 className="text-2xl mb-6"> Billing details</h2>

            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm mb-2">First name <span className="text-red-500">*</span></label>
                  <input type="text" className="w-full border border-gray-300 p-3 rounded-sm outline-none focus:border-black" required/>
                </div>
                <div>
                  <label className="block text-sm mb-2">Last name <span className="text-red-500">*</span></label>
                  <input type="text" className="w-full border border-gray-300 p-3 rounded-sm outline-none focus:border-black" required/>
                </div>
              </div>

              <div>
                <label className="block text-sm mb-2">Company name (optional)</label>
                <input type="text" className="w-full border border-gray-300 p-3 rounded-sm outline-none focus:border-black"/>
              </div>

              <div>
                <label className="block text-sm mb-2">Country / Region <span className="text-red-500">*</span></label>
                <select className="w-full border border-gray-300 p-3 rounded-sm outline-none bg-white">
                  {data?.countries?.map((country, index) => (
                    <option key={index} value={country}>{country}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm mb-2">Street address</label>
                <input type="text" placeholder="House number and street" className="w-full border border-gray-300 p-3 rounded-sm outline-none focus:border-black mb-4" required/>
                <input type="text" placeholder="Apartment, suite, unit etc. (optional)" className="w-full border border-gray-300 p-3 rounded-sm outline-none focus:border-black"/>
              </div>
            </form>
          </div>

          <div className="lg:col-span-5 checkout-right">
            {/* 3. CORRECTION HTML : type="chekbox" -> type="checkbox" */}
            {/* 4. CORRECTION STRUCTURE : L'input à l'intérieur du label avec un texte "block" cassait la mise en page */}
            <div className="flex items-start gap-2 mb-4">
              <label className="font-bold cursor-pointer block w-full" htmlFor="ship-different">
                <input type="checkbox" id="ship-different" className="mr-3"/>
                Ship to a different address? 
              </label>
            </div>

            <div className="mb-8">
              <label className="block text-sm mb-2">Order notes (optional)</label>
              <textarea placeholder="Notes about your order, e.g. special notes for delivery." className="w-full border border-gray-300 p-3 rounded-sm h-32 outline-none focus:border-black"></textarea>
            </div>

            <div className="border border-gray-200 p-6 rounded-sm">
              <h3 className="text-xl font-bold mb-4 border-b border-gray-200 pb-4">Your order</h3>
              <table className="w-full text-sm checkout-table mb-6">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-2">Product</th>
                    <th className="text-right py-2">Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  {/* 5. CORRECTION FAUTE DE FRAPPE : iem.id -> item.id */}
                  {cart.map((item) => (
                    <tr key={item.id} className="border-b">
                      <td className="py-4 text-gray-600">{item.title} x 1</td>
                      <td className="py-4 text-right font-medium">${item.price.toFixed(2)}</td>
                    </tr>
                  ))}

                  <tr className="border-b border-gray-200">
                    <td className="py-4 font-bold">Subtotal</td>
                    <td className="py-4 text-right font-bold">${subtotal.toFixed(2)}</td>
                  </tr>

                  <tr className="border-b border-gray-200">
                    <td className="py-4 font-bold">Shipping</td>
                    <td className="py-4 text-right text-gray-500">Enter your address to view Shipping options.</td>
                  </tr>

                  <tr>
                    <td className="py-4 text-lg font-bold">Total</td>
                    <td className="py-4 text-right text-lg font-bold">${subtotal.toFixed(2)}</td>
                  </tr>
                </tbody>
              </table>
                <div className="space-y-4 bg-gray-50 p-4 payment-options">

           <label className=" flex items-start gap-3 cursor-pointer">

            <input 

            type="radio" 

            name="payment"

            className="mt-1"

            checked ={paymentMethod === "bank_transfer"}

            onChange={() => setPaymentMethod("bank_transfer")}

            />

            <div>

              <span className="font-bold">Direct bank transfer</span>

              {paymentMethod === "bank_transfer" && (

                <p className="text-xs  border-gray-500 mt-2">

                  Make  your payment directly into our bank account.

                  Please use your Order ID as the payment references

                </p>

              )}

            </div>

           </label>



           <label className="flex items-center gap-3 cursor-pointer">

             <input type="radio"  name="payment" checked = {paymentMethod === "check"} onChange={()=> setPaymentMethod("check")}/>

             <span className="font-bold">Check payments</span>

           </label>



           <label className="flex items-center gap-3 cursor-pointer">

             <input type="radio"  name="payment" checked = {paymentMethod === "cod"} onChange={()=> setPaymentMethod("cod")}/>

             <span className="font-bold">cash on delivery</span>

           </label>

        </div>



        <MainBtn 

        type="submit"

        text = "PLACE ORDER"

        className="w-full! rounded-sm! shadow-none! bg-black! text-white! mt-8"

        />


            </div>
          </div>

        </div>
      </div>
    </>
  );
}

export default Checkout;