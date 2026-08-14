// -------------------------------------------------------------
// 1. IMPORTS DES COMPOSANTS ET OUTILS
// -------------------------------------------------------------
import PageBanner from "../components/ui/Cards/PageBanner";

// CORRECTION : Les hooks (useState, useEffect, useRef) proviennent de 'react', pas de 'react-router-dom'
import { useState, useEffect, useRef } from 'react';

// Importation de GSAP et de son plugin ScrollTrigger pour les animations au défilement
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Importation du hook personnalisé pour gérer l'état du panier (ajouter, supprimer, contenu)
import { useCart } from '../hooks/useCart';

// Importation du composant d'icônes génériques
import { Icon } from '@iconify/react';

// Importation des icônes de gestion de quantité (Plus / Moins)
import { Minus, Plus } from 'lucide-react';

// Importation du bouton principal personnalisé de l'interface utilisateur
import MainBtn from "../components/ui/Buttons/MainBtn";
// Enregistrement officiel du plugin ScrollTrigger auprès du cœur de GSAP
gsap.registerPlugin(ScrollTrigger);

// -------------------------------------------------------------
// 2. COMPOSANT PRINCIPAL : CART (PANIER)
// -------------------------------------------------------------
function Cart({ path, text, className }) {

  // Récupération des données du panier et de la fonction de suppression via le hook personnalisé
  const { cart, removeFromCart } = useCart();

  // État local pour stocker les quantités de chaque produit sous forme d'objet { id_produit: quantite }
  const [qty, setQty] = useState({});

  
  // -------------------------------------------------------------
  // 3. FONCTIONS DE GESTION DES QUANTITÉS
  // -------------------------------------------------------------
  
  // Augmente la quantité d'un produit (limite fixée à 5 maximum)
  const increase = (id) => {
    setQty((prev) => ({
      ...prev,
      [id]: (prev[id] || 1) < 5 ? (prev[id] || 1) + 1 : 5
    }));
  }

  // Diminue la quantité d'un produit (limite fixée à 1 minimum)
  const decrease = (id) => {
    setQty((prev) => ({
      ...prev,
      [id]: (prev[id] || 1) > 1 ? (prev[id] || 1) - 1 : 1 
    }));
  }

  // -------------------------------------------------------------
  // 4. CALCULS ET RÉFÉRENCES
  // -------------------------------------------------------------
  
  // Calcul dynamique du sous-total du panier en fonction du prix et de la quantité de chaque article
  const subtotal = cart.reduce((acc, item) => { 
    const quantity = (qty[item.id] || 1);
    return acc + item.price * quantity;
  }, 0);
  
  // Référence React attachée au conteneur principal pour cibler les animations GSAP de manière isolée
  const cartRef = useRef();

  // -------------------------------------------------------------
  // 5. EFFET ET ANIMATIONS GSAP (SCROLLTRIGGER)
  // -------------------------------------------------------------
  useEffect(() => {
    // Si la référence n'est pas encore liée à l'élément du DOM, on annule l'exécution
    if (!cartRef.current) return;
      
    // Utilisation de gsap.context() pour regrouper et nettoyer facilement les animations
    const ctx = gsap.context(() => {

      // Outil de sélection restreint au conteneur parent (évite de cibler des éléments hors du panier)
      const q = gsap.utils.selector(cartRef.current);

      // Animation d'apparition des lignes de produits du panier
      gsap.from(q(".cart-item"), {
        y: 60,
        opacity: 0,
        duration: 0.6,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: q(".wishlist-section"), // CORRECTION : Alignement sur la classe parente réelle du conteneur
          start: "top 85%",
          toggleActions: "play none none revert"
        },
      });

      // Animation du message indiquant que le panier est vide
      gsap.from(q(".wishlist-empty"), { // CORRECTION : Utilisation de .wishlist-empty au lieu de .cart-empty inexistant
        scale: 0.9,
        opacity: 0,
        duration: 0.6,
        stagger: 0.2,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: q(".wishlist-empty"),
          start: "top 85%",
          toggleActions: "play none none reverse"
        },
      });

      // Animation du bloc récapitulatif des actions de paiement
      gsap.from(q(".cart-actions"), {
        y: 50,
        opacity: 0,
        duration: 0.6,
        ease: "power3.out",
        scrollTrigger: {
          trigger: q(".cart-actions"),
          start: "top 85%",
          toggleActions: "play none none reverse"
        },
      });

      // Animation des boutons d'action du panier
      gsap.from(q(".cart-btn"), {
        y: 30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.2,
        delay: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: q(".cart-btn"),
          start: "top 85%",
          toggleActions: "play none none reverse"
        },
      });

      // Animation de l'en-tête du tableau ou de la section
      gsap.from(q(".cart-head"), {
        y: -40,
        opacity: 0,
        duration: 0.6,
        ease: "power3.out",
        scrollTrigger: {
          trigger: q(".cart-head"),
          start: "top 90%",
          toggleActions: "play none none reverse"
        },
      });

      // Animation d'apparition successive des titres de colonnes du tableau (th)
      gsap.from(q(".cart-th"), {
        x: -30,
        opacity: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: q(".cart-th"), // CORRECTION : Déclencheur basé sur l'élément lui-même
          start: "top 90%",
          toggleActions: "play none none reverse"
        },
      });

    }, cartRef); // Définition du scope de l'animation

    // Nettoyage automatique des instances d'animation lors du démontage du composant
    return () => ctx.revert();
 
  }, [cart]); // L'effet se re-déclenche si le contenu du panier change pour réajuster les animations


  // -------------------------------------------------------------
  // 6. RENDU JSX DU COMPOSANT
  // -------------------------------------------------------------
  return (
    <>
      {/* Affichage de la bannière supérieure */}
      <PageBanner title="Cart" currentPage="Cart" />

      {/* Conteneur principal du panier lié à la référence d'animation cartRef */}
      <div ref={cartRef} className="container mx-auto py-[8%] px-4 wishlist-section">
        {cart.length === 0 ? (
          /* ÉCRAN INITIAL : Cas où le panier est totalement vide */
          <p className="text-center text-lg bg-gray-50 shadow-md py-5 wishlist-empty">Your cart is empty.</p>
        ) : (
          <>
            {/* VUE ORDINATEUR (Large Screens) : Tableau structuré */}
            <div className="hidden lg:block overflow-x-auto"> {/* CORRECTION : overscroll-x-auto changé en overflow-x-auto */}
              <table className="w-full border-collapse">
                <thead className="bg-black text-white cart-head"> {/* AJOUT : Classe cart-head pour l'animation GSAP */}
                  <tr className='text-center'>
                    <th className="p-4 cart-th">Remove</th> {/* CORRECTION : p-4cart-th séparé + Libellé explicite */}
                    <th className="p-4 text-left font-medium cart-th">Product</th>
                    <th className="p-4 font-medium cart-th">Price</th>
                    <th className="p-4 font-medium cart-th">Quantity</th>
                    <th className="p-4 font-medium cart-th">Status</th>
                    <th className="p-4 font-medium cart-th">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {/* Boucle d'affichage de chaque produit du panier dans le tableau */}
                  {cart.map((item) => {
                    const quantity = qty[item.id] || 1;

                    return (
                      <tr key={item.id} className="border-b cart-item"> {/* CORRECTION : classname changé en className partout */}
                        {/* Bouton de suppression de l'article */}
                        <td className="text-center">
                          <button 
                            className="cursor-pointer"
                            onClick={() => removeFromCart(item.id)}
                          >
                            <Icon icon="mdi:close" width="18"/>
                          </button>
                        </td>

                        {/* Visuel et désignation du produit */}
                        <td className="flex items-center gap-4 py-6">
                          <img src={item.image1} alt={item.title} className="w-20 h-20 object-cover"/>
                          <p className="font-semibold"> {/* CORRECTION : font-semiblold corrigé en font-semibold */}
                            {item.title}
                          </p>
                        </td>

                        {/* Prix unitaire de l'article */}
                        <td className="text-center">
                          ${item.price}
                        </td>

                        {/* Sélecteur de quantité numérique (+ / -) */}
                        <td className="text-center">
                          <div className="flex justify-center items-center gap-3">
                            <button 
                              className="cursor-pointer border border-gray-200 p-2"
                              onClick={() => decrease(item.id)}
                            >
                              <Minus size={14}/>
                            </button>

                            <span>{quantity}</span>

                            <button 
                              className="cursor-pointer border border-gray-200 p-2"
                              onClick={() => increase(item.id)}
                            >
                              <Plus size={14}/>
                            </button>
                          </div>
                        </td>

                        {/* État de la disponibilité en stock */}
                        <td className="text-center text-green-600">
                          In stock
                        </td>

                        {/* Prix total accumulé pour cette ligne d'article */}
                        <td className="text-center font-semibold">
                          ${(item.price * quantity)}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* VUE MOBILE (Small Screens) : Liste de cartes empilées */}
            <div className="lg:hidden space-y-6">
              {/* Boucle d'affichage des cartes produits pour mobiles */}
              {cart.map((item) => {
                const quantity = qty[item.id] || 1;

                return (
                  <div key={item.id} className="border border-gray-200 bg-white shadow-lg p-4 rounded-lg cart-item">
                    {/* Entête de la carte mobile : Action de suppression et statut */}
                    <div className="flex justify-between">
                      <button 
                        className="cursor-pointer border border-gray-200 p-2"
                        onClick={() => removeFromCart(item.id)}
                      >
                        <Icon icon="mdi:close" width="18"/>
                      </button>

                      <span className="text-green-600">
                        In stock
                      </span>
                    </div>

                    {/* Image et titre du produit */}
                    <div className="flex items-center gap-4 mt-4">
                      <img src={item.image1} alt={item.title} className="w-20 h-20 object-cover rounded-sm"/>
                      <p className="font-semibold">{item.title}</p>
                    </div>

                    {/* Affichage du prix unitaire */}
                    <div className="flex items-center gap-4 mt-4">
                      <span>Price:</span>
                      <span>${item.price}</span>
                    </div>

                    {/* Contrôle des quantités sur mobile */}
                    <div className="flex items-center gap-4 mt-4">
                      <span>Quantity:</span>
                      <div className="flex items-center gap-3">
                        <button 
                          className="cursor-pointer border border-gray-200 p-2"
                          onClick={() => decrease(item.id)}
                        >
                          <Minus size={14}/>
                        </button>

                        <span>{quantity}</span>

                        <button 
                          className="cursor-pointer border border-gray-200 p-2"
                          onClick={() => increase(item.id)}
                        >
                          <Plus size={14}/>
                        </button>
                      </div>
                    </div>

                    {/* Total financier de la carte produit */}
                    <div className="flex justify-between items-center mt-4 font-semibold">
                      <span>Total:</span>
                      <span>${(item.price * quantity)}</span>
                    </div>
                  </div>
                );
              })} {/* CORRECTION : Retrait du point-virgule en trop après l'accolade qui brisait le JSX */}
            </div>

            {/* BLOC RÉCAPITULATIF FINANCIER (SOUS-TOTAL, LIVRAISON ET TOTAL GLOBAL) */}
            <div className="w-full flex justify-end items-center mt-10 cart-actions"> {/* CORRECTION : items-centermt-10 séparé en items-center mt-10 */}
              <div className="w-full lg:w-120 border border-gray-200 rounded-sm">
                
                {/* Ligne : Sous-total cumulé */}
                <div className="grid grid-cols-2 border-b border-gray-200 cart-item">
                  <div className="p-6 font-semibold bg-gray-50 border-r border-gray-200">
                    Subtotal
                  </div>
                  <div className="p-6 text-right font-semibold bg-gray-50">
                    ${subtotal.toFixed(2)}
                  </div>
                </div>

                {/* Ligne : Options et calcul des frais de port */}
                <div className="grid grid-cols-2 border-b border-gray-200 cart-item">
                  <div className="p-6 font-semibold bg-gray-50 border-r border-gray-200">
                    Shipping
                  </div>
                  <div className="p-6 text-sm text-gray-600">
                    <p className="mb-3">
                      Enter your address to view shipping options.
                    </p>
                    <button className="flex items-center gap-2 font-semibold border-dashed border-black text-black">
                      CALCULATE SHIPPING
                      <Icon icon="mdi:arrow-right" width="18"/>
                    </button>
                  </div>
                </div>

                {/* Ligne : Montant total de la commande finale */}
                <div className="grid grid-cols-2 border-b border-gray-200 cart-item">
                  <div className="p-6 font-semibold bg-gray-50 border-r border-gray-200">
                    Total
                  </div>
                  <div className="p-6 text-right font-bold text-lg">
                    ${subtotal.toFixed(2)}
                  </div>
                </div>

                {/* Zone du bouton de finalisation de commande (Checkout) */}
                <div className="p-6 cart-btn"> {/* CORRECTION : Changé cart-actions en cart-btn pour correspondre au sélecteur GSAP */}
                  <MainBtn 
                   path="/checkout"
                    text={'PROCEED TO CHECKOUT'}
                    className="wishlist-btn shadow-none! bg-black! text-white! hover:bg-black! hover:text-white! w-full! rounded-sm!"
                  />
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  )
}

export default Cart;