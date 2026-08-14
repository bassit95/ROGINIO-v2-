import AboutMainImg from "/images/Index/About/about-main-image.jpg";
import aboutImg1 from "/images/Index/About/about-image01.jpg";
import aboutImg2 from "/images/Index/About/about-image02.jpg";
import aboutImg3 from "/images/Index/About/about-image03.jpg";

import MainBtn from "../ui/buttons/MainBtn";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// 1. Toujours enregistrer le plugin à l'extérieur du composant
gsap.registerPlugin(ScrollTrigger);

function About() {
  const aboutRef = useRef();

  useEffect(() => {
    const ctx = gsap.context(() => {
      
      // Animation de l'image principale
      gsap.from(".about-image", {
        y: 100,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".about-image",
          start: "top 85%", // Corrigé (pas d'espace au début)
          toggleActions: "play none none reset"
        }
      });

      // Animation du contenu (Texte + Grille)
      gsap.from(".about-content", { // Corrigé : Ajout du "." manquant
        x: 100,
        opacity: 0,
        duration: 1,
        delay: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".about-content", // Corrigé : Ajout du "." manquant
          start: "top 85%", // Corrigé (pas d'espace au début)
          toggleActions: "play none none reset"
        }
      });

      // Animation des 3 images de la grille
      gsap.from(".image", {
        y: 50,
        opacity: 0,
        duration: 0.8,
        delay: 0.2,
        stagger: 0.1, // Optionnel mais recommandé pour un effet de cascade sympa !
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".grid", // Mieux vaut cibler le parent direct de la grille ici
          start: "top 90%", // Corrigé (pas d'espace au début)
          toggleActions: "play none none reset"
        }
      });

    }, aboutRef);

    return () => ctx.revert(); // Nettoyage automatique propre à React
  }, []);

  return (
    <>
      <div ref={aboutRef} className="about container py-[8%] mx-auto section-container gap-14">
        
        <div className="about-image rounded-sm w-full lg:w-1/2 max-w-full lg:max-w-125 mx-auto relative overflow-hidden">
          <div className="about-bg-video absolute inset-0 -z-10"></div>
          <img src={AboutMainImg} alt="about-image" className="about"/>
        </div>

        <div className="about-content w-full lg:w-1/2">
          <span className="title-sapn">About Us</span>
          <h2 className="heading-1 mb-5">
            <span className="text-coffee">Creative Solutions</span> <br />
            Creative Solutions by Professional Designers
          </h2>
          <p className="pera-text">
             Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet <br />luptates maiores omnis modi asperiores! 
             Ut ex facilis deserunt at repellat.
          </p>
          
          {/* La Grille d'images */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 xl:gap-8 lg:grid-cols-3 mx-auto mb-14 md:mb-18">
            <div className="image">
               <img src={aboutImg1} alt="about-image" className="section-image"/>
            </div>
            <div className="image">
               <img src={aboutImg2} alt="about-image" className="section-image"/>
            </div>
            <div className="image">
               <img src={aboutImg3} alt="about-image" className="section-image"/>
            </div>
          </div>
          
          <MainBtn path="/about" text={"Read More"} className="bg-black! text-white!"/>
        </div>

      </div>
    </>
  );
}

export default About;