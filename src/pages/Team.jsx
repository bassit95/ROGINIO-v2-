import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import PageBanner from '../components/ui/Cards/PageBanner';

import TeamCard from '../components/ui/Cards/TeamCard';
import TeamData from "../assets/Data/TeamData.json";

gsap.registerPlugin(ScrollTrigger);

const Team = () => {
    const teamRef = useRef();

    useEffect(() => {
        if (!teamRef.current) return;

        // Context GSAP pour assurer le nettoyage propre des déclencheurs React
        let ctx = gsap.context(() => {
            gsap.from(teamRef.current.children, {
                opacity: 0,
                y: 50,
                duration: 0.8,
                stagger: 0.2, // Apparition en cascade des cartes
                ease: "power3.out",
                scrollTrigger: {
                    trigger: teamRef.current,
                    start: "top 80%", // Déclenche l'animation quand la grille entre dans la vue
                }
            });
        }, teamRef);

        return () => ctx.revert();
    }, []);

    return (
        <>
            <PageBanner title="Team" currentPage="Team" />

            <div className="container mx-auto px-4 py-[8%]">
                <div ref={teamRef} className="grid lg:grid-cols-2 xl:grid-cols-4 gap-10">
                    {TeamData.map((team) => (
                        <TeamCard key={team.id} {...team} />
                    ))}
                </div>
            </div>
        </>
    );
};

export default Team;