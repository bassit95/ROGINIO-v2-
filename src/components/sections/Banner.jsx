import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

import bannerbg from "/images/Index/Banner/banner-bg.jpg";

gsap.registerPlugin(ScrollTrigger);

const Banner = () => {
  const playRef = useRef(null);
  const bannerRef = useRef(null);

  // --- EFFET DE PARALLAXE DE LA SOURIS ---
  const handleMouseMove = (e) => {
    if (!playRef.current) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    gsap.to(playRef.current, {
      x: x / 8,
      y: y / 8,
      duration: 0.3,
      ease: "power2.out",
      overwrite: "auto"
    });
  };

  const handleMouseLeave = () => {
    if (playRef.current) {
      gsap.to(playRef.current, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: "power2.out",
        overwrite: "auto"
      });
    }
  };

  // --- EFFET D'ONDE DE CHOC GÉANTE SUR L'IMAGE (EAU) ---
  const handlePlayClick = (e) => {
    const banner = bannerRef.current;
    if (!banner) return;

    // 1. Création de l'élément d'onde
    const ripple = document.createElement("div");
    ripple.classList.add("water-ripple");

    // 2. Récupération des dimensions de la bannière entière
    const rect = banner.getBoundingClientRect();
    
    // On définit une taille de départ pour l'onde (ex: 150px)
    const size = 150; 
    
    // 3. Calcul de la position du clic de l'utilisateur par rapport à la bannière
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    // 4. Application des styles de positionnement
    ripple.style.width = `${size}px`;
    ripple.style.height = `${size}px`;
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;

    // 5. Ajout de l'onde dans la bannière (elle se propagera sur toute l'image)
    banner.appendChild(ripple);

    // 6. Nettoyage de l'élément du DOM après la fin de l'animation (1.4s)
    setTimeout(() => {
      ripple.remove();
    }, 1400);
  };

  // --- ANIMATIONS GSAP AU SCROLL ---
  useEffect(() => {
    const ctx = gsap.context((self) => {
      
      gsap.from(playRef.current, {
        y: 50,
        opacity: 0,
        duration: 1,
        scale: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: bannerRef.current,
          start: "top 90%",
          toggleActions: "play none none reverse",
        },
      });

      gsap.fromTo(
        bannerRef.current,
        { scale: 0.9 },
        {
          scale: 1,
          ease: "none",
          scrollTrigger: {
            trigger: bannerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );
    }, bannerRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <div className="container py-20 mx-auto px-4">
        <div
          ref={bannerRef}
          className="banner relative rounded-lg overflow-hidden bg-center bg-cover cursor-pointer"
          style={{
            backgroundImage: `url(${bannerbg})`,
            height: "700px",
          }}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          onClick={handlePlayClick} // Le clic n'importe où sur la bannière (ou le bouton) déclenche l'onde
        >
          {/* Overlay sombre */}
          <div className="overlay absolute inset-0 bg-black/40 pointer-events-none"></div>

          {/* Bouton Play */}
          <div className="play-btn absolute inset-0 flex justify-center items-center pointer-events-none">
            <div
              ref={playRef}
              className="play border w-28 h-28 flex justify-center items-center border-white rounded-full text-white uppercase tracking-wide hover:bg-white/10 transition-colors duration-300"
            >
              Play
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Banner;