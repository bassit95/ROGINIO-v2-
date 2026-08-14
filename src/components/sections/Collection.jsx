import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Play } from "lucide-react";
import { Link } from "react-router-dom";

import collectionImage1 from "/images/Index/Collection/collection-image-01.jpg";
import collectionImage2 from "/images/Index/Collection/collection-image-02.jpg";

gsap.registerPlugin(ScrollTrigger);

function Collection() {
    const collectionRef = useRef();

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Animation de la première image (glissement vertical + fondu)
            gsap.from(collectionRef.current.querySelector(".collection-image:first-child"), {
                y: 50,
                opacity: 0,
                duration: 1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: collectionRef.current,
                    start: "top 85%",
                    toggleActions: "play none none reset"
                },  
            });

            // Animation du bloc textuel complet (glissement horizontal + fondu avec un léger retard)
            gsap.from(collectionRef.current.querySelector(".collection-content"), {
                x: 50,
                opacity: 0,
                duration: 1,
                delay: 0.2,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: collectionRef.current,
                    start: "top 85%",
                    toggleActions: "play none none reset"
                },  
            });

            // Animation du bouton Play (effet de zoom élastique qui apparaît en dernier)
            gsap.from(collectionRef.current.querySelector(".play-btn"), {
                scale: 0,
                opacity: 0,
                duration: 0.8,
                delay: 0.5,
                ease: "back.out(1.7)",
                scrollTrigger: {
                    trigger: collectionRef.current,
                    start: "top 85%",
                    toggleActions: "play none none reset"
                },  
            });
        }, collectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <>
            {/* ========================================== */}
            {/* CONTENEUR PRINCIPAL DE LA SECTION          */}
            {/* ========================================== */}
            <div ref={collectionRef} className="collection container py-[8%] mx-auto px-4 section-container gap-10 lg:gap-14">

                {/* ========================================== */}
                {/* BLOC DE GAUCHE : PREMIÈRE IMAGE           */}
                {/* ========================================== */}
                <div className="collection-image w-full lg:w-1/2 overflow-hidden group rounded-sm max-w-full lg:max-w-150 relative mx-auto">
                    <img 
                        src={collectionImage1}
                        alt="collection-image"
                        className="section-image group-hover:scale transition-all duration-300" 
                    />
                </div>

                {/* ========================================== */}
                {/* BLOC DE DROITE : CONTENU TEXTE & VIDÉO    */}
                {/* ========================================== */}
                <div className="collection-content w-full lg:w-1/2">
                    
                    {/* --- Zone des textes promotionnels --- */}
                    <span className="title-span">Our Collection</span>
                    
                    <h2 className="heading-1 mb-5">
                        Our sofas <span className="text-coffee"> design-focused</span> create style
                    </h2>
                    
                    <p className="pera-text mb-20 sm:mb-40 lg:mb-60">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim temporibus non ratione vitae.
                    </p>
                    
                    {/* --- Zone de la deuxième image avec bouton vidéo --- */}
                    <div className="collection-image mx-0! relative flex justify-center rounded-sm overflow-hidden">
                        
                        {/* Image de fond pour la vidéo */}
                        <img src={collectionImage2} alt="collection-image" />

                        {/* Conteneur invisible superposé (Overlay) pour centrer le bouton Play */}
                        <div className="play-btn absolute top-0 left-0 w-full h-full flex justify-center items-center">
                            
                            {/* Lien/Bouton cliquable avec l'icône Play de Lucide */}
                            <Link className="play-btn bg-white w-14 h-14 flex justify-center items-center rounded-sm cursor-pointer">
                                <Play size={20} />
                            </Link>
                            
                        </div>
                        
                    </div>

                </div> {/* Fin du bloc de droite */}
                
            </div> {/* Fin du conteneur principal */}
        </>
    );
}

export default Collection;