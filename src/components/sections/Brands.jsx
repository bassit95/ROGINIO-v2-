import { useEffect, useRef } from 'react';
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import client1 from "/images/Index/Brand/client-1-copyright.webp";
import client2 from "/images/Index/Brand/client-2-copyright.webp";
import client3 from "/images/Index/Brand/client-3-copyright.webp";
import client4 from "/images/Index/Brand/client-4-copyright.webp";
import client5 from "/images/Index/Brand/client-5-copyright.webp";
import client6 from "/images/Index/Brand/client-6-copyright.webp";

gsap.registerPlugin(ScrollTrigger);

function Brands() {
  const brandsRef = useRef(null); // Bonne pratique : initialiser à null

  useEffect(() => {
    // On passe brandsRef en deuxième argument pour définir le "scope" (la frontière)
    const ctx = gsap.context(() => {
      
      // Plus besoin de querySelectorAll ! On cible directement la classe.
      gsap.from(".brand-card", {
        y: 50,
        opacity: 0, // Ajouté pour que l'effet de fondu fonctionne avec le y:50
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: brandsRef.current, // Le parent sert de déclencheur
          start: "top 90%",
          toggleActions: "play none none reset"
        },
      });

    }, brandsRef);
    return () => ctx.revert(); // Nettoyage impeccable
  }, []);

  return (
    <>
      <div ref={brandsRef} className="container mx-auto grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-6 gap-10 pb-[8%]">
        
        {/* CORRECTION : Remplacement des {} par () pour retourner le JSX */}
        {[client1, client2, client3, client4, client5, client6].map((client, index) => (
          <div 
            key={index} 
            // Ajout de la classe "brand-card" pour que GSAP la cible facilement
            className="brand-card bg-white card h-20 shadow hover:shadow-xl transition-all duration-300 rounded-sm w-full opacity-60 hover:opacity-100 flex items-center justify-center will-change-transform"
          >
            <img 
              src={client} 
              alt={`brand-${index + 1}`}
              className="section-image object-contain lg:object-cover"
            />
          </div>
        ))}

      </div>
    </>
  );
}

export default Brands;