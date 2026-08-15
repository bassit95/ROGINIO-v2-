import React from 'react';
import PageBanner from '../components/ui/Cards/PageBanner';
import {useEffect, useRef, useState} from "react";
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {Link, useParams} from "react-router-dom";
import ProductData from "../assets/Data/ProductData.json"
import MainBtn from '../components/ui/buttons/MainBtn';
import gsap from "gsap";

import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import ProductCard from "../components/ui/Cards/ProductCard";
import { useCart } from '../hooks/useCart';
import { Facebook, Instagram, Minus, Twitter, Plus } from 'lucide-react';

// =========================================================================
// CONFIGURATION INITIALE GSAP
// =========================================================================
gsap.registerPlugin(ScrollTrigger);

/**
 * COMPOSANT PRINCIPAL : ShopDetails
 */
function ShopDetails() {
  
   // Récupération de la méthode 'addToCart' via un hook personnalisé pour gérer le panier
   const { addToCart } = useCart();

   // -------------------------------------------------------------------------
   // RECUPERATION DES DONNEES ET REFS (DOM ANCHORS)
   // -------------------------------------------------------------------------
   const { id } = useParams();
   
   // On parcourt le fichier JSON (ProductData) pour extraire le produit dont l'id correspond à celui de l'URL
   const product = ProductData.find(p => p.id === parseInt(id));
   
   const shopRef = useRef();     // Cible le bloc contenant les produits similaires
   const headingRef = useRef();   // Cible le titre "Related products"
   const productRef = useRef();   // Cible la section supérieure (Images + Texte détails)
   const peraRef = useRef();     // Cible le bloc de paragraphes descriptifs du milieu
   
   // Sécurité : Si l'ID de l'URL n'existe pas dans le JSON, on coupe le rendu
   if(!product) return <p className='p-6 text-xl'> Product not found!</p>;
   
   // -------------------------------------------------------------------------
   // GESTION DE L'ETAT LOCAL (QUANTITE)
   // -------------------------------------------------------------------------
   const [qty, setQty] = useState(1);

   const increase = () => {
     setQty(qty + 1);
   };

   const decrease = () => {
     if(qty > 1) {
       setQty(qty - 1);
     }
   };

   // Gestion de l'ajout au panier avec transmission de la quantité choisie
   const handleAddToCart = () => {
     addToCart(product, qty);
   };

   // =========================================================================
   // ANALYSE DES EFFECT ET ANIMATIONS GSAP
   // =========================================================================

   /**
    * USEEFFECT N°1 : Animation de la liste des produits similaires
    */
   useEffect(() => {
     const ctx = gsap.context(() => {
       const cards = shopRef.current.querySelectorAll(".product-card"); 

       gsap.from(cards, {
         y: 50,
         opacity: 0,
         duration: 0.8,
         stagger: 0.2,
         ease: "power3.out",
         scrollTrigger: {
           trigger: shopRef.current,
           start: "top 85%",
           toggleActions: "play none none reverse"
         },
       });
     }, shopRef);
     
     return () => ctx.revert();
   }, []);

   /**
    * USEEFFECT N°2 : Animation du titre "Related products"
    */
   useEffect(() => {
     const ctx = gsap.context(() => {
       gsap.from(headingRef.current, {
         y: 50,
         opacity: 0,
         duration: 1,
         stagger: 0.2,
         ease: "power3.out",
         scrollTrigger: {
           trigger: headingRef.current,
           start: "top 90%",
           toggleActions: "play none none reverse",
         },
       });
     }, headingRef);

     return () => ctx.revert();
   }, []);

   /**
    * USEEFFECT N°3 : Animation combinée de la zone produit supérieure
    */
   useEffect(() => {
     const ctx = gsap.context(() => {
       const imageSection = productRef.current.querySelectorAll(".product-image"); 
       const contentSection = productRef.current.querySelectorAll(".product-content");
       const thumbs = productRef.current.querySelectorAll(".thumb-item");
       const thumbWrapper = productRef.current.querySelector(".thumbnail-list");

       gsap.from(imageSection, {
         x: -50,
         opacity: 0,
         duration: 0.8,
         ease: "power3.out",
         scrollTrigger: {
           trigger: imageSection,
           start: "top 85%",
           toggleActions: "play none none reverse"
         },
       });

       const contentItems = contentSection[0].querySelectorAll("h2,p,quantity,button,ul li");

       gsap.from(contentItems, {
         x: 50,
         opacity: 0,
         stagger: 0.15,
         duration: 0.6,
         ease: "power3.out",
         scrollTrigger: {
           trigger: contentSection,
           start: "top 85%",
           toggleActions: "play none none reverse"
         },
       });
     
       gsap.fromTo(thumbs,
         { y: 20, opacity: 0 },
         {
           y: 20,
           opacity: 1,
           stagger: 0.15,
           duration: 0.6,
           ease: "power3.out",
           scrollTrigger: {
             trigger: thumbWrapper,
             start: "top 90%",
             toggleActions: "play none none reverse"
           },
         }
       );
     }, productRef);

     return () => ctx.revert();
   }, []);

   /**
    * USEEFFECT N°4 : Animation des longs textes de description
    */
   useEffect(() => {
     if(!peraRef.current) return;
      
     const ctx = gsap.context(() => {
       const peraText = peraRef.current.querySelectorAll(".pera-text");

       if(peraText.length) {
         gsap.fromTo(peraText,
           { x: -30, opacity: 0 },
           {
             x: 0,
             opacity: 1,
             stagger: 0.2,
             duration: 0.7,
             ease: "power3.out",
             scrollTrigger: {
               trigger: peraText[0],
               start: "top 90%",
               toggleActions: "play none none reverse"
             },
           }
         );
       }
     }, productRef);

     return () => ctx.revert();
   }, []);

   const images = [product.image3, product.image4, product.image5];

   // -------------------------------------------------------------------------
   // STRUCTURATION DU RENDU (JSX)
   // -------------------------------------------------------------------------
   return (
    <>
      {/* Banner */}
      <PageBanner  
        title="shop Details" 
        currentPage="Shop Details"
        productName={product.title}
      />

      {/* BLOC PRINCIPAL PRODUIT */}
      <div ref={productRef} className="bg-light-yellow pt-[8%] px-4">
         <div className="container mx-auto px-4 flex flex-col lg:flex-row section-container gap-10 lg:gap-14">
           
           {/* Galerie d'images */}
           <div className="product-image w-full lg:w-1/2 space-y-8">
             <Zoom>
              <img 
                src={product.image2} 
                alt="main product" 
                className='w-full cursor-zoom-in rounded-sm'
              />
             </Zoom>

             <ul className='thumb-list centered-row justify-between gap-8 flex-col md:flex-row'>
             {images.map((img, index) => (
                <li key={index} className='thumb-item'>
                 <Zoom>
                   <img 
                     src={img} 
                     alt={`Thumbnail ${index}`} 
                     className='cursor-zoom-in h-55 w-full object-cover rounded-sm'
                   />
                 </Zoom>
                </li>
             ))}
             </ul>
           </div>

           {/* Détails du produit */}
           <div className="product-content w-full lg:w-1/2">
             <h2 className="uppercase! text-3xl sm:text-4xl lg:text-5xl pb-5 font-semibold">
               {product.title}
             </h2>
             <p className="space-x-2 text-3xl lg:text-4xl pb-8">
               <span className="line-through text-muted">
                 {product.oldprice} {""}
               </span>
               <span>${product.price}</span>
             </p>
             <p className='text-muted font-light pb-5'>
               Lorem ipsum dolor sit amet consectetur, adipisicing elit...
             </p>
             <p className='text-muted font-light pb-5'>
               Lorem ipsum dolor sit amet consectetur, adipisicing elit...
             </p>
            
             {/* Module de commande */}
             <div className="centered-row flex-wrap gap-8 pb-12">
               <div className="quantity bg-white min-w-full! lg:min-w-50! centered-row justify-between">
                 <span onClick={decrease} className='cursor-pointer py-5 px-4'>
                   <Minus />
                 </span>
                 <span>{qty}</span>
                 <span onClick={increase} className='cursor-pointer py-5 px-4'>
                   <Plus />
                 </span>
               </div>
               
               {/* Bouton Add to cart corrigé */}
               <MainBtn  
                 onClick={handleAddToCart}  
                 text={"Add to cart"} 
                 className='rounded-none! shadow-none! bg-black! text-white! text-[16px]! w-full! lg:w-60! px-12! py-8!'
               />
             </div>
            
             {/* Métadonnées du produit */}
             <ul className='space-y-3'>
               <li>
                 <span className='font-medium'>Product Id : </span>
                 <span>{product.id}</span>
               </li>
               <li>
                 <span className='font-medium'>Categories : </span>
                 <span>{product.categories}</span>
               </li>
               <li>
                 <span className='font-medium'>Tags : </span>
                 <span>Chair, Color, Decor, Design, Light, Wood</span>
               </li>
               <li>
                 <p className='centered-row space-x-3'>
                   <span className='font-medium'>Share : </span>
                   <Link to="https://www.facebook.com/" className='cursor-pointer'>
                     <Facebook size={22}/>
                   </Link>
                   <Link to="https://x.com/" className='cursor-pointer'>
                     <Twitter size={22}/>
                   </Link>
                   <Link to="https://www.instagram.com/" className='cursor-pointer'>
                     <Instagram size={22}/>
                   </Link>
                 </p>
               </li>
             </ul>
           </div>
         </div>
      </div>
      
      {/* SECTION DESCRIPTION ET PRODUITS ASSOCIES */}
      <div className="bg-light-yellow pt-[3%]">
       <div className="container mx-auto px-4" ref={peraRef}>
         <p className='pera-text'>
           Lorem ipsum dolor sit amet consectetur adipisicing elit...
         </p>
         <p className='pera-text mb-20'>
           Lorem ipsum dolor sit amet consectetur adipisicing elit...
         </p>

         <div>
           <div ref={headingRef} className="w-full mb-16">
             <span className='title-span'>
               Our shop
             </span>
             <h2 className='heading-1 mb-5'>
               Related <span className='text-coffee'>products</span>
             </h2>
           </div>
           
           <div ref={shopRef} className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-10">
             {ProductData.slice(12, 16).map(product => (
               <ProductCard key={product.id} product={product}/>
             ))}
           </div>
         </div>
       </div>
      </div>
    </>
  );
}

export default ShopDetails;