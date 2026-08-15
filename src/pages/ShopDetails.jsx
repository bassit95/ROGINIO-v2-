import React from 'react';
import PageBanner from '../components/ui/Cards/PageBanner';
import {useEffect, useRef, useState} from "react";
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {Link, useParams} from "react-router-dom";
import ProductData from "../assets/Data/ProductData.json"
import MainBtn from '../components/ui/buttons/MainBtn';
import gsap from "gsap"


import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import ProductCard from "../components/ui/Cards/ProductCard";
import { useCart } from '../hooks/useCart';
import { Facebook, Instagram, Minus, Twitter,Plus } from 'lucide-react';


// =========================================================================
// CONFIGURATION INITIALE GSAP
// =========================================================================
// On associe le plugin ScrollTrigger à GSAP. Cela donne à GSAP le pouvoir de lier 
// le déclenchement des animations à la position de défilement (scroll) de la page.
gsap.registerPlugin(ScrollTrigger);

/**
 * COMPOSANT PRINCIPAL : ShopDetails
 * Rôle global : Ce composant gère l'affichage complet d'une page de détails produit.
 * Il récupère les informations dynamiques du produit via l'URL, gère l'état de la quantité à commander,
 * affiche une galerie d'images zoomables, et anime plusieurs sections du layout au chargement et au scroll.
 */
function ShopDetails() {
  

    // Récupération de la méthode 'addToCart' via un hook personnalisé pour gérer le panier
   const {addToCart} = useCart ();

   // -------------------------------------------------------------------------
   // RECUPERATION DES DONNEES ET REFS (DOM ANCHORS)
   // -------------------------------------------------------------------------
   // useParams récupère l'identifiant (id) dynamique présent dans l'adresse URL (ex: /product/12)
   const {id} =   useParams();
   

  
   
   // On parcourt le fichier JSON (ProductData) pour extraire le produit dont l'id correspond à celui de l'URL
   const product = ProductData.find(p => p.id === parseInt(id));
   
   // Les 'useRef' créent des références persistantes vers des éléments réels du DOM. 
   // GSAP en a impérativement besoin pour savoir exactement quelles sections animer.
   const shopRef = useRef ();     // Cible le bloc contenant les produits similaires
   const headingRef = useRef();   // Cible le titre "Related products"
   const productRef = useRef();   // Cible la section supérieure (Images + Texte détails)
   const peraRef = useRef ();     // Cible le bloc de paragraphes descriptifs du milieu
   
   

   // Sécurité : Si l'ID de l'URL n'existe pas dans le JSON, on coupe le rendu et on affiche un message d'erreur
   if(!product) return <p className='p-6 text-xl'> Product not found!</p>;
   
   // -------------------------------------------------------------------------
   // GESTION DE L'ETAT LOCAL (QUANTITE)
   // -------------------------------------------------------------------------
   // 'qty' stocke la quantité sélectionnée (par défaut 1), 'setQty' permet de la modifier
   const [qty,setQty] = useState(1);

   const increase = () => {
     setQty(qty+ 1); // Augmente la quantité de 1
   }

   const decrease = () => {
     if(qty > 1) {
       setQty(qty-1); // Diminue la quantité de 1 sans jamais descendre en dessous de 1
     }
   }

   // Gestion de l'ajout au panier avec transmission de la quantité choisie
   const handleAddToCart = () => {
     addToCart(product, qty);
   };


   // =========================================================================
   // ANALYSE DES EFFECT ET ANIMATIONS GSAP
   // =========================================================================

   /**
    * USEEFFECT N°1 : Animation de la liste des produits similaires (Related Products)
    * Rôle : Déclenche une animation en cascade ("stagger") sur les cartes de produits du bas.
    */
   useEffect(() => {

     // gsap.context() regroupe toutes les animations créées à l'intérieur.
     // Utilité majeure en React : Permet de nettoyer instantanément la mémoire et de détruire 
     // les écouteurs de scroll (revert()) si l'utilisateur change subitement de page.
     const ctx = gsap.context(() => {

       // Recherche de tous les éléments ayant la classe ".product-card" à l'intérieur du conteneur lié à 'shopRef'
       const cards = shopRef.current.querySelectorAll(".product-card"); 

       // ANIMATION DE TYPE "FROM" (Départ configuré -> Arrivée aux styles CSS par défaut)
       gsap.from(cards,{
         y: 50,              // Les cartes commencent 50px plus bas que leur position normale
         opacity : 0,        // Elles commencent totalement transparentes
         duration: 0.8,      // L'animation individuelle de chaque carte dure 0.8 seconde
         stagger : 0.2,       // EFFET CASCADE : Décale le départ de l'animation de chaque carte de 0.2 seconde
         ease : "power3.out", // Courbe de vitesse : démarrage rapide puis décélération fluide
         scrollTrigger : {
           trigger : shopRef.current,             // L'élément qui déclenche l'effet au scroll
           start : "top 85%",                     // Démarre quand le haut de 'shopRef' atteint 85% de la hauteur de l'écran
           toggleActions : "play none none reverse" // Actions : Joue au scroll vers le bas, s'inverse au scroll vers le haut
         },
       });
     },shopRef);
     
     // Fonction de nettoyage (cleanup) exécutée au démontage du composant
     return () =>ctx.revert();
   },[]) // S'exécute une seule fois au montage grâce au tableau de dépendances vide []


   /**
    * USEEFFECT N°2 : Animation du titre "Related products"
    * Rôle : Rendre visible et dynamique l'apparition du titre principal de la grille du bas.
    */
   useEffect(() => {
     
     const ctx = gsap.context(() => {

       // Animation du titre lié à 'headingRef'
       gsap.from(headingRef.current , {
         y: 50,              // Arrive du bas (décalage de 50px)
         opacity : 0,        // Apparaît en fondu
         duration: 1,        // Dure 1 seconde entière
         stagger : 0.2,      
         ease : "power3.out",
         scrollTrigger : {
           trigger : headingRef.current,          // Se déclenche dès que le titre s'approche du champ de vision
           start : "top 90%",                     // Plus sensible (90% du bas de l'écran)
           toggleActions : "play none none reverse",
         },
       })
       
     },headingRef)
      return () => ctx.revert();
   },[]);


   /**
    * USEEFFECT N°3 : Animation combinée de la zone produit supérieure (Images + Contenus textuels)
    * Rôle : Créer une cinématique d'entrée asymétrique (l'image glisse depuis la gauche, le texte depuis la droite).
    */
   useEffect(() => {

     const ctx = gsap.context(() => {

       // Sélection locale ciblée des différents blocs à l'intérieur du conteneur parent 'productRef'
       const imageSection = productRef.current.querySelectorAll(".product-image"); 
       const contentSection = productRef.current.querySelectorAll(".product-content");
       const thumbs = productRef.current.querySelectorAll(".thumb-item");
       const thumbWrapper = productRef.current.querySelector(".thumbnail-list");


       // 1. Animation du bloc de la grande image principale
       gsap.from(imageSection, {
         x:-50,             // Glisse horizontalement depuis la gauche (-50px)
         opacity : 0,        
         duration :0.8,
         ease : "power3.out",
         scrollTrigger : {
           trigger : imageSection,
           start : "top 85%",
           toggleActions : "play none none reverse"
         },
       });

       // 2. Sélection fine et ordonnée de toutes les balises de textes/boutons de la colonne de droite
       const contentItems = contentSection[0].querySelectorAll("h2,p,quantity,button,ul li");

       // Animation du texte en cascade séquentielle
       gsap.from(contentItems,{
         x:50,              // Glisse horizontalement depuis la droite (+50px)
         opacity :0,
         stagger: 0.15,      // Chaque ligne/paragraphe apparaît l'un après l'autre avec 0.15s de décalage
         duration: 0.6,
         ease: "power3.out",
         scrollTrigger : {
           trigger : contentSection,
           start : "top 85%",
           toggleActions : "play none none reverse"
         },
       });
     
       // 3. ANIMATION DE TYPE "FROMTO" (On force explicitement l'état de départ ET l'état d'arrivée)
       // Cible la liste des vignettes d'images miniatures sous la photo principale
       gsap.fromTo(thumbs,
         {y:20, opacity:0}, // ÉTAT INITIAL (FROM) : Placé 20px plus bas et transparent
         {                  // ÉTAT FINAL (TO)
         y : 20,            // Reste configuré à 20px selon vos paramètres actuels
         opacity : 1,       // Devient totalement opaque
         stagger : 0.15,    // Apparition cadencée des miniatures
         duration : 0.6,
         ease : "power3.out",
         scrollTrigger : {
           trigger : thumbWrapper,
           start : "top 90%",
           toggleActions : "play none none reverse"
         },
       });

     },productRef);

     return ()  =>ctx.revert();
   },[]);


   /**
    * USEEFFECT N°4 : Animation des longs textes de description (Milieu de page)
    * Rôle : Donne un effet d'entrée fluide par la gauche aux grands paragraphes informatifs.
    */
   useEffect(() => {

      if(!peraRef.current) return; // Sécurité anti-crash si la référence n'est pas encore montée
      
     const ctx = gsap.context(() => {

       // Sélection de tous les paragraphes portant la classe `.pera-text` dans la zone 'peraRef'
       const peraText = peraRef.current.querySelectorAll(".pera-text");

     if(peraText.length) {

          // Animation progressive des paragraphes
          gsap.fromTo(peraText,
            {x:-30, opacity:0}, // ÉTAT INITIAL : Décalé vers la gauche, invisible
           {                    // ÉTAT FINAL
           x: 0,                // Revient à sa place d'origine en CSS
           opacity : 1,
           stagger : 0.2,       // Le deuxième paragraphe s'anime juste après le premier
           duration : 0.7,
           ease : "power3.out",
           scrollTrigger : {
             trigger :peraText[0], // Déclencheur basé sur le tout premier paragraphe de la liste
             start : "top 90%",
             toggleActions : "play none none reverse"
           },
         });

     }
       
       
     },productRef);
      return () => ctx.revert();
   },[]);


   // Tableau contenant les liens d'images secondaires extraits dynamiquement de l'objet produit
   const images = [product.image3,product.image4,product.image5];


   // -------------------------------------------------------------------------
   // STRUCTURATION DU RENDU (JSX)
   // -------------------------------------------------------------------------
   return (
    <>
      {/* Composant de bannière haute : affiche le titre général de la section et le nom du produit courant */}
      <PageBanner  
      title= "shop Details" 
      currentPage="Shop Details"
      productName={product.title}
      />

      {/* BLOC PRINCIPAL PRODUIT (Scanné par productRef pour GSAP) */}
      <div ref={productRef} className="bg-light-yellow pt-[8%] px-4">
         <div className="container mx-auto px-4 flex flex-col lg:flex-row section-container gap-10 lg:gap-14">
           
           {/* SOUS-BLOC GAUCHE : Galerie d'images (Scanné par imageSection pour GSAP) */}
           <div className="product-image w-full lg:w-1/2 space-y-8">
             <Zoom>
              <img 
              src={product.image2} 
              alt="main product" 
              className='w-full cursor-zoom-in  rounded-sm'
              />
             </Zoom>

             {/* Itération (Map) sur les miniatures d'images du produit */}
             <ul className='thumb-list centered-row justify-between gap-8 flex-col md:flex-row'>
             {images.map((img, index) => (
                <li key={index} className='thumb-item'>
                 <Zoom>
                   <img 
                   src={img} alt={`Thumbnail ${index}`} 
                   className='cursor-zoom-in h-55 w-full object-cover rounded-sm'
                   />
                 </Zoom>
                </li>
             ))}
             </ul>
           </div>

           {/* SOUS-BLOC DROITE : Textes informatifs et actions (Scanné par contentSection pour GSAP) */}
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
            
            {/* Module de commande : Sélection du compteur numérique et bouton panier */}
            <div className="centered-row flex-wrap gap-8 pb-12">
              <div className="quantity bg-white min-w-full! lg:min-w-50! centered-row justify-between">
                <span onClick={decrease} className='cursor-pointer py-5 px-4'>
                 <Minus   />
                </span>
                <span>{qty}</span>
                <span onClick={increase} className='cursor-pointer py-5 px-4'>
                 <Plus   />
                </span>
              </div>
              <MainBtn  onClick={handleAddToCart}  text={"Add to cart"} className='rounded-none! shadow-none! bg-black! text-white! text-[16px]! w-full! lg:w-60! px-12! py-8!'/>
            </div>
            
            {/* Liste de métadonnées du produit avec icônes de partage social */}
            <ul className='space-y-3'>
              <li>
                <span className='font-medium'>Product Id :</span>
                <span>{product.id}</span>
              </li>
              <li>
                <span className='font-medium'>Categories :</span>
                <span>{product.categories}</span>
              </li>
              <li>
                <span className='font-medium'> Tages:</span>
                <span>Chair, Color, Decor, Design, Light, Wood</span>
              </li>
              <li>
                <p className='centered-row space-x-3'>
                   <span className='font-medium'> Share :</span>
                  <Link to= "https://www.facebook.com/" className='cursor-pointer'>
                    <Facebook  size={22}/>
                  </Link>
                  <Link to= "https://x.com/" className='cursor-pointer'>
                    <Twitter  size={22}/>
                  </Link>
                  <Link to= "https://www.instagram.com/" className='cursor-pointer'>
                    <Instagram size={22}/>
                  </Link>
                </p>
              </li>
            </ul>
           </div>
         </div>
      </div>
      
      {/* SECTION DESCRIPTION TECHNIQUE ET PRODUITS ASSOCIES */}
      <div className="bg-light-yellow   pt-[3%] ">
       <div className="container mx-auto   px-4" ref={peraRef}>
         <p className='pera-text '>
           Lorem ipsum dolor sit amet consectetur adipisicing elit...
         </p>
         <p className='pera-text mb-20'>
           Lorem ipsum dolor sit amet consectetur adipisicing elit...
         </p>

         <div>
           {/* En-tête textuel lié à headingRef pour l'animation GSAP */}
           <div ref ={headingRef} className="w-full mb-16">
             <span className='title-span'>
              Our shop
             </span>
             <h2 className='heading-1 mb-5'>
              Related
              <span className='text-coffee'>products</span>
             </h2>
           </div>
           
           {/* Grille de cartes liées à shopRef pour l'animation GSAP */}
           <div ref={shopRef} className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-10">
             {ProductData.slice(12, 16).map(product => (
               <ProductCard key={product.id} product={product}/>
             ))}
           </div>
         </div>
       </div>
      </div>
      
      </>
  )
}

export default ShopDetails;