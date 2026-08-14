import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import PageBanner from '../components/ui/Cards/PageBanner';
import MainBtn from '../components/ui/buttons/MainBtn';
import { Compass, Home } from 'lucide-react';

const NotFound = () => {
    const pageRef = useRef();

    useEffect(() => {
        if (!pageRef.current) return;

        let ctx = gsap.context(() => {
            // Animation d'entrée du bloc central
            gsap.from(".not-found-content > *", {
                opacity: 0,
                y: 40,
                duration: 0.8,
                stagger: 0.2,
                ease: "power3.out"
            });

            // Animation d'oscillation/flottaison du grand 404
            gsap.to(".big-404", {
                y: -15,
                repeat: -1,
                yoyo: true,
                duration: 2.5,
                ease: "sine.inOut"
            });
        }, pageRef);

        return () => ctx.revert();
    }, []);

    return (
        <div ref={pageRef}>
            <PageBanner title="404 Page" currentPage="404" />

            <div className="container mx-auto px-4 py-[8%] flex flex-col items-center text-center not-found-content">
                
                {/* Icône / Visuel thématisé */}
                <div className="relative mb-6">
                    <h1 className="big-404 text-9xl sm:text-[14rem] font-bold text-gray-100 select-none leading-none">
                        404
                    </h1>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="p-5 bg-black text-white rounded-full shadow-2xl">
                            <Compass className="w-12 h-12 animate-spin-slow" />
                        </div>
                    </div>
                </div>

                {/* Message personnalisé */}
                <h2 className="text-3xl sm:text-4xl font-semibold mb-4">
                    Oups ! Cet espace n'a pas encore été aménagé.
                </h2>
                <p className="text-gray-600 max-w-md mb-8 leading-relaxed">
                    La page que vous recherchez semble avoir été déplacée, réorganisée ou n'a jamais existé dans nos plans.
                </p>

                {/* Bouton de retour */}
                <Link to="/">
                    <MainBtn 
                        text="Home" 
                        className="bg-black! text-white! flex items-center gap-2"
                    />
                </Link>

            </div>
        </div>
    );
};

export default NotFound;