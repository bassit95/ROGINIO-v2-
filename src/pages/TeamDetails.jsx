import React from 'react';
import PageBanner from '../components/ui/Cards/PageBanner';
import { useEffect, useRef, useState } from "react";
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link, useParams } from "react-router-dom";
import TeamData from "../assets/Data/TeamData.json";

import MainBtn from '../components/ui/Buttons/MainBtn';

import data from "../assets/data";
import gsap from "gsap";
import SocialIcons from '../components/ui/SocialIcons';

import { Facebook, Mail, Minus, Plus, Phone } from 'lucide-react';
import TeamSkills from '../components/ui/TeamSkills';

// -------------------------------------------------------------------------
// INITIALISATION DE GSAP
// -------------------------------------------------------------------------
// ScrollTrigger est le plugin de GSAP qui permet de déclencher des animations
// au moment où un élément devient visible à l'écran lors du défilement (scroll).
gsap.registerPlugin(ScrollTrigger);

function TeamDetails() {
  
  // -------------------------------------------------------------------------
  // 1. REFS, ROUTAGE & ÉTATS (STATE)
  // -------------------------------------------------------------------------
  
  // TeamDetailsRef : Référence React qui cible le conteneur principal HTML.
  // Grâce à elle, GSAP sait exactement dans quelle zone chercher les éléments à animer.
  const TeamDetailsRef = useRef(); 

  // useParams() : Hook de react-router-dom qui récupère les paramètres de l'URL.
  // Si l'URL est '/team/3', 'id' vaudra "3".
  const { id } = useParams();

  // team : Recherche dans le fichier JSON (TeamData) le membre dont l'ID correspond
  // à l'ID de l'URL. parseInt(id) convertit la chaîne "3" en nombre 3 pour la comparaison.
  const team = TeamData.find((t) => t.id === parseInt(id));

  // active : État qui stocke l'index de l'accordéon d'expérience actuellement déplié.
  // - Par défaut : index 0 (le premier accordéon est ouvert).
  // - Si active vaut 'null', tous les accordéons sont fermés.
  const [active, setActive] = useState(0);

  // -------------------------------------------------------------------------
  // 2. SÉCURITÉ (RENDU CONDITIONNEL)
  // -------------------------------------------------------------------------
  // Si l'ID dans l'URL n'existe pas dans le fichier JSON, on arrête le rendu du composant
  // principal pour éviter des erreurs "cannot read property of undefined" sur le reste du code.
  if (!team) {
    return <div className="container mx-auto p-4 text-center">Team member not found</div>;
  }

  // -------------------------------------------------------------------------
  // 3. LOGIQUE GSAP (ANIMATIONS D'ENTRÉE)
  // -------------------------------------------------------------------------
  useEffect(() => {
    
    // gsap.context() regroupe toutes les animations de ce composant.
    // L'avantage crucial : il permet de nettoyer automatiquement toutes les animations actives
    // et les ScrollTriggers lorsque l'utilisateur quitte la page (grâce à ctx.revert() dans le return).
    const ctx = gsap.context((self) => {
      
      // self.selector() est un outil puissant de GSAP. Il cherche les classes CSS
      // UNIQUEMENT à l'intérieur de TeamDetailsRef (le parent). C'est beaucoup plus sûr et propre.
      const image = self.selector(".team-image"); 
      const content = self.selector(".team-content"); 
      const form = self.selector(".team-contact-form"); 

      const about = self.selector(".team-about"); 
      const experience = self.selector(".team-experience"); 
      const skills = self.selector(".team-skills-form"); 

      // --- ANIMATION DE L'IMAGE PRINCIPALE ---
      // L'image glisse de la gauche (x: -50) vers sa position d'origine avec un fondu au noir.
      gsap.from(image, {
        x: -50,         
        opacity: 0,   
        duration: 0.8,  
        ease: "power3.out",
        scrollTrigger: {
          trigger: image,             // L'animation se déclenche quand l'image arrive à l'écran
          start: "top 85%",           // Démarre quand le haut de l'image atteint 85% de la hauteur de l'écran
          toggleActions: "play none none reverse" // Se re-joue à l'envers si on remonte la page
        },
      });
          
      // --- ANIMATION DES TEXTES DE PRÉSENTATION (STAGGER) ---
      // On cible spécifiquement les balises textuelles à l'intérieur de la colonne de texte.
      const contactItems = self.selector(".team-content h3, .team-content span, .team-content p, .team-content li");

      gsap.from(contactItems, {
        x: 50,         
        opacity: 0,   
        duration: 0.8,  
        stagger: 0.1,                 // Délai de 0.1s entre l'apparition de chaque élément (effet cascade)
        ease: "power3.out",
        scrollTrigger: {
          trigger: content,
          start: "top 85%",
          toggleActions: "play none none reverse"
        },
      });

      // --- ANIMATION DU FORMULAIRE DE CONTACT ---
      // Le bloc de formulaire monte du bas (y: 40) vers le haut.
      gsap.from(form, {
        y: 40,         
        opacity: 0,   
        duration: 0.7,  
        ease: "power3.out",
        scrollTrigger: {
          trigger: form,              // Déclenché par le formulaire lui-même
          start: "top 90%",
          toggleActions: "play none none reverse"
        },
      });

      // --- ANIMATION DE LA SECTION BASSE (ABOUT, EXPÉRIENCES, COMPÉTENCES) ---
      // Les trois colonnes du bas apparaissent l'une après l'autre avec un effet de montée.
      gsap.from([about, experience, skills], {
        y: 40,         
        opacity: 0,   
        duration: 0.7,  
        stagger: 0.2,                 // 0.2s d'intervalle d'apparition entre About, Experience et Skills
        ease: "power3.out",
        scrollTrigger: {
          trigger: about,
          start: "top 85%",
          toggleActions: "play none none reverse"
        },
      });
          
    }, TeamDetailsRef); // On lie le contexte à notre Ref parent
     
    // Nettoyage (Clean-up) : Très important en React pour éviter les fuites de mémoire
    // et les bugs d'animations doublées lors des rechargements à chaud (HMR).
    return () => ctx.revert(); 
  }, []);

  // -------------------------------------------------------------------------
  // 4. STRUCTURE DU RENDU (JSX)
  // -------------------------------------------------------------------------
  return (
    <>
      {/* Bannière supérieure commune à tout le site */}
      <PageBanner
        title="Team Details"
        currentPage="Team Details"
        productName={team.name}
      />

      {/* Conteneur global de la fiche de détails */}
      <div ref={TeamDetailsRef} className="container py-[8%] mx-auto px-4">
        
        {/* =========================================================
            GRILLE SUPÉRIEURE : IMAGE, INFOS DE BASE & FORMULAIRE
            ========================================================= */}
        {/* Grid Responsive : 1 col sur mobile, 2 cols sur tablette (lg), 3 cols sur PC (xl) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-10 mb-10">
          
          {/* Colonne 1 : Image du membre */}
          <div className="team-image rounded-sm group overflow-hidden w-full h-auto lg:h-150">
            <img
              src={team.image}
              alt={team.name}
              className='group-hover:scale-110 transition-all duration-300 section-image w-full h-full object-cover'
            />
          </div>

          {/* Colonne 2 : Texte d'informations et coordonnées de contact */}
          <div className="team-content">
            <h3 className='text-2xl sm:text-3xl lg:text-4xl font-medium pb-3'>
              {team.name}
            </h3>
            <span className='text-xl text-coffee pb-5 block'>{team.category}</span>
            <p className='text-paragraph leading-relaxed pb-8'>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim dolore repellat quis nostrum debitis aspernatur temporibus...
            </p>

            {/* Caractéristiques (Âge, Expérience, Spécialité) */}
            <ul className='space-y-2 pb-8'>
              <li>
                <span className='font-semibold text-lg'>Age :</span>
                <span className='text-muted ml-1'>{team.age}</span>
              </li>
              <li>
                <span className='font-semibold text-lg'>Experience :</span>
                <span className='text-muted ml-1'>{team.Experience}</span>
              </li>
              <li>
                <span className='font-semibold text-lg'>Specialization :</span>
                <span className='text-muted ml-1'>{team.Specialization}</span>
              </li>
            </ul>

            {/* Téléphone & Email */}
            <ul className='space-y-2 pb-10'>
              <li className='centered-row gap-2 flex items-center'>
                <Phone size={25} className='text-coffee-light' />
                <span className='text-muted'>{team.mobnumber}</span>
              </li>
              <li className='centered-row gap-2 flex items-center'>
                <Mail size={25} className='text-coffee-light' />
                <span className='text-muted'>{team.email}</span>
              </li>
            </ul>
            <SocialIcons/>
          </div>

          {/* Colonne 3 : Formulaire de contact direct */}
          <div className="team-contact-form bg-[#f3f2f2] px-5 py-8 lg:py-10 rounded-sm lg:col-span-2 xl:col-span-1">
            <h4 className='text-center text-2xl font-medium pb-10'>
              contact me directory
            </h4>
            
            {/* onSubmit={(e) => e.preventDefault()} : Évite que la page ne se recharge entièrement
                lors de la soumission du formulaire, ce qui est le comportement par défaut en HTML */}
            <form onSubmit={(e) => e.preventDefault()}>
              <input
                type='text'
                placeholder='Your Name'
                className='w-full rounded-sm py-4 bg-white px-4 outline-none mb-8'
              />

              <input
                type='email'
                placeholder='Your Email'
                className='w-full rounded-sm py-4 bg-white px-4 outline-none mb-8'
              />

              <textarea
                placeholder='Message'
                className='w-full rounded-sm py-4 bg-white px-4 outline-none resize-none mb-8'
              ></textarea>

              <MainBtn type='submit' text={"send Message"} className='bg-black! text-white! w-full! rounded-none! shadow-none!' />
            </form>
          </div>
        </div>

        {/* =========================================================
            GRILLE INFÉRIEURE : BIOGRAPHIE, ACCORDÉON D'EXPÉRIENCE & COMPÉTENCES
            ========================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-10">
          
          {/* Colonne A : À propos (Biographie) */}
          <div className="team-about">
            <h3 className='text-2xl sm:text-3xl lg:text-4xl font-medium pb-3'>About Me</h3>
            <p className='pb-5 text-paragraph'>
              Creative approach to every project...
            </p>
            <p className='pb-5 text-paragraph'>
              Voices and law enforcement zero...
            </p>
            <MainBtn type='button' text={"Contact Me"} className='bg-black! text-white! w-full! rounded-sm! shadow-none!' />
          </div>

          {/* Colonne B : Les Expériences Professionnelles sous forme d'Accordéon */}
          <div className="team-experience">
            <h3 className='text-2xl sm:text-3xl lg:text-4xl font-medium pb-6'>
              Experience
            </h3>
            
            <ul className='space-y-4'>
              {/* Le "Optional Chaining" (?.) évite un plantage si la liste est vide ou indéfinie */}
              {data?.experiences?.map((item, index) => (
                <li key={index} className='bg-gray-100 overflow-hidden'>
                  
                  {/* Entête cliquable pour ouvrir/fermer la ligne d'accordéon */}
                  <div
                    onClick={() => setActive(active === index ? null : index)}
                    className='flex justify-between items-center px-6 py-5 cursor-pointer'
                  >
                    <span className='font-semibold'>{item.title}</span>
                    {active === index ? <Minus /> : <Plus />}
                  </div>

                  {/* Corps de l'accordéon : S'ouvre de manière fluide grâce à max-h et transition-all */}
                  <div className={`px-6 transition-all duration-500 ease-in-out overflow-hidden
                    ${active === index ? "max-h-40 opacity-100 pb-5" : "max-h-0 opacity-0"}`}
                  >
                    <p className='text-gray-600'>{item.desc}</p>
                  </div>

                </li>
              ))}
            </ul>
          </div>

          {/* Colonne C : Les compétences professionnelles (Composant TeamSkills indépendant) */}
          {/* On lui passe l'objet de compétences "team.Skills" sous forme de Prop */}
          <div className="team-skills-form lg:col-span-2 xl:col-span-1">
             <TeamSkills skills={team.Skills}/>
          </div>

        </div>
      </div>
    </>
  );
}

export default TeamDetails;