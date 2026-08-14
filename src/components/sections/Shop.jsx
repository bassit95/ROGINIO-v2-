import React from 'react'
import gsap from 'gsap'
import { useEffect, useRef } from 'react'
import { ScrollTrigger } from 'gsap/ScrollTrigger' // Correction de l'import

import ProductCard from '../ui/Cards/ProductCard'
import ProductData from '../../assets/Data/ProductData.json'

gsap.registerPlugin(ScrollTrigger);

const Shop = () => {
    // 1. Déclaration des Refs
    const shopRef = useRef(null);
    const headingRef = useRef(null);

    useEffect(() => {
      // Un seul contexte GSAP pour tout gérer proprement
      const ctx = gsap.context(() => {
        
        // Animation du titre
        gsap.from(headingRef.current, {
            y: 50,
            opacity: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: { // CORRECTION : 's' minuscule
                trigger: headingRef.current,
                start: "top 90%",
                toggleActions: "play none none reset"
            }
        });

        // Animation des cartes produits
        // Maintenant que shopRef est attaché, querySelectorAll va fonctionner !
        const cards = shopRef.current.querySelectorAll(".product-card");

        gsap.from(cards, {
            y: 50,
            opacity: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: "power3.out",
            scrollTrigger: { // CORRECTION : 's' minuscule
                trigger: shopRef.current,
                start: "top 85%",
                toggleActions: "play none none reset"
            }
        });

      }, shopRef); // Le scope protège toutes nos animations dans shopRef

       return () => ctx.revert();
    }, []); // Tableau de dépendances vide pour ne l'exécuter qu'au montage

  return (
   <>
   {/* CORRECTION : On attache shopRef sur la div parente globale */}
   <div ref={shopRef} className="bg-light-yellow">
    <div className="container py-[8%] mx-auto px-4">
        
        {/* Le titre garde sa propre référence pour son animation individuelle */}
        <div ref={headingRef} className="text-center w-full mb-16">
            <span className='title-span'>Our Shop</span>
            <div className="heading-1 mb-5">
                Trending
                <span className='text-coffee'>items</span>
            </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-10">
            {ProductData.slice(4, 8).map(product => (
                <ProductCard key={product.id} product={product} />
            ))}
        </div>
    </div>
   </div>
   </>
  )
}

export default Shop;