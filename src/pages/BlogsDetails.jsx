import React, { useRef, useEffect, useState } from 'react';
import { useParams, useNavigate } from "react-router-dom";

// Importations des icônes de Lucide-React
import { Quote, ChevronLeft, Calendar, MessageSquare, User, ArrowRight } from "lucide-react";

// Importations des images requises
import gallery1 from "/images/Index/Blogs/gallery-image-01.jpg";
import gallery2 from "/images/Index/Blogs/gallery-image-02.jpg";
import post from "/images/Index/Blogs/gallery-main.jpg";

// Importation des données locales des articles de blog
import blogData from "../assets/Data/Blogs.json";

// Importations pour les animations avec GSAP
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

// Enregistrement du plugin ScrollTrigger de GSAP
gsap.registerPlugin(ScrollTrigger);

const BlogsDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const blogdetailsRef = useRef(null);

  // Recherche de l'article correspondant à l'ID reçu dans l'URL
  const blog = blogData.find((item) => item.id === Number(id));

  // Sélectionner 2 autres articles au hasard (pour la section "You May Also Like")
  const relatedBlogs = blogData.filter((item) => item.id !== Number(id)).slice(0, 2);

  // Animation GSAP
  useEffect(() => {
    if (!blog || !blogdetailsRef.current) return;

    const ctx = gsap.context(() => {
      // Entrée de la carte flottante blanche
      gsap.from(".animate-overlap-card", {
        y: 60,
        opacity: 0,
        duration: 1.2,
        ease: "power4.out"
      });

      // Apparition progressive du contenu
      gsap.from(".animate-fade-in", {
        y: 30,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        scrollTrigger: {
          trigger: ".content-trigger",
          start: "top 85%",
          toggleActions: "play none none reverse",
        }
      });
    }, blogdetailsRef.current);

    return () => ctx.revert();
  }, [blog]);

  // Sécurité si l'article n'existe pas
  if (!blog) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f4f1e5]">
        <p className="text-xl font-medium text-gray-600 font-sans">Blog not found</p>
      </div>
    );
  }

  return (
    <div ref={blogdetailsRef} className="w-full h-full bg-[#f4f1e5] text-heading font-sans relative">

      {/* ==========================================
          1. BANNIÈRE DE L'ARTICLE (IMAGE DE FOND FIXE)
          ========================================== */}
      <div
        className="w-full h-[60vh] min-h-[450px] bg-center bg-cover bg-no-repeat bg-fixed relative z-1 font-sans"
        style={{ backgroundImage: `url(${blog.image})` }}
      >
        {/* Voile sombre léger */}
        <div className="absolute inset-0 bg-black/20 z-0"></div>
      </div>

      {/* ==========================================
          2. CARTE BLANCHE CHEVAUCHANTE
          ========================================== */}
      <div className="container mx-auto px-4 relative z-10 -mt-32 md:-mt-40 max-w-5xl animate-overlap-card font-sans">
        <div className="bg-white rounded-sm shadow-xl p-8 md:p-16 text-center border border-gray-100 font-sans">
          
          {/* Badge Catégorie */}
          <span className="inline-block bg-[#0d1b2a] text-white text-[11px] font-bold uppercase tracking-widest px-4 py-1.5 rounded-sm mb-6 font-sans">
            {blog.category || "Furniture"}
          </span>

          {/* Titre Principal */}
          <h1 className="text-3xl md:text-5xl font-sans font-bold text-gray-900 max-w-3xl mx-auto leading-tight tracking-tight mb-8">
            {blog.title}
          </h1>

          {/* Méta-données Auteur */}
          <div className="flex flex-wrap justify-center items-center gap-4 text-xs text-gray-500 border-t border-gray-100 pt-6 max-w-md mx-auto font-sans">
            <div className="flex items-center gap-2 font-sans">
              {/* Avatar générique chic */}
              <img 
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100" 
                alt="Author" 
                className="w-8 h-8 rounded-full object-cover border border-gray-200"
              />
              <span className="font-semibold text-gray-800 font-sans">Peter Bowman</span>
            </div>
            <span className="text-gray-300 font-sans">•</span>
            <span className="flex items-center gap-1 font-sans">
              <Calendar size={14} />
              {blog.date}
            </span>
            <span className="text-gray-300 font-sans">•</span>
            <span className="flex items-center gap-1 font-sans">
              <MessageSquare size={14} />
              2 Comments
            </span>
          </div>

        </div>
      </div>

      {/* ==========================================
          3. CONTENU ET ZONE DE COMMENTAIRES
          ========================================== */}
      <div className="container mx-auto px-4 py-16 max-w-4xl content-trigger font-sans">
        <div className="animate-fade-in space-y-8 text-[16px] leading-relaxed text-gray-600 font-sans">
          
          {/* Premier paragraphe avec lettrine */}
          <p className="first-letter:text-6xl first-letter:font-sans first-letter:font-bold first-letter:text-[#c29f68] first-letter:mr-3 first-letter:float-left first-letter:leading-[0.8] font-sans">
            {blog.description || "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis et id mi rhoncus, feugiat dictum elit ut, hendrerit justo."}
          </p>

          {/* Galerie d'images à deux colonnes */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-10 font-sans">
            <div className="overflow-hidden rounded-sm">
              <img 
                src={gallery1} 
                alt="Gallery 1" 
                className="w-full h-[320px] object-cover hover:scale-105 transition-transform duration-500" 
              />
            </div>
            <div className="overflow-hidden rounded-sm">
              <img 
                src={gallery2} 
                alt="Gallery 2" 
                className="w-full h-[320px] object-cover hover:scale-105 transition-transform duration-500" 
              />
            </div>
          </div>

          <p className="font-sans">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis et id mi rhoncus, feugiat dictum elit ut, hendrerit justo. Phasellus dictum dolor et convallis eleifend, nisl diam lacinia metus, vel feugiat purus eros non sapien.
          </p>

          {/* Bloc de Citation */}
          <div className="my-12 p-8 bg-[#ebe7d8] border-l-4 border-l-[#c29f68] border-[#dfdbcc] flex gap-4 items-start rounded-sm font-sans">
            <Quote className="text-[#c29f68] shrink-0 rotate-180" size={32} />
            <blockquote className="text-lg font-sans font-semibold text-gray-800 leading-relaxed">
              "La simplicité est la sophistication suprême. Chaque ligne tracée doit porter l'intention de l'équilibre parfait entre l'ombre et la matière."
            </blockquote>
          </div>

          {/* Sous-section : Creative Approach */}
          <div className="space-y-4 pt-4 font-sans">
            <h3 className="text-2xl font-sans font-bold text-gray-900">
              Creative Approach To Every Project
            </h3>
            <p className="font-sans">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Velit sit optio deliberate to, rem rem id, aut nescit. At ea vel sint animi. Tempore eius modi nihil, optio, aspernatur, ratione molestiae sit porro.
            </p>
          </div>

          {/* Grande Image Principale */}
          <div className="w-full overflow-hidden my-12 rounded-sm font-sans">
            <img 
              src={post} 
              alt="Main view" 
              className="w-full h-[500px] object-cover" 
            />
          </div>

          <p className="border-b border-[#dddac9] pb-12 font-sans">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Velit sit optio deliberate to, rem rem id, aut nescit. At ea vel sint animi.
          </p>

          {/* ==========================================
              4. ESPACE COMMENTAIRES DESIGN (DEUX SECTIONS)
              ========================================== */}
          <div className="pt-12 space-y-12 font-sans">
            
            {/* A. Liste des commentaires existants */}
            <div className="space-y-8 font-sans">
              <h3 className="text-2xl font-sans font-bold text-gray-900 border-b border-[#dddac9] pb-4">
                Discussion (2)
              </h3>
              
              <div className="space-y-6 font-sans">
                {/* Commentaire 1 */}
                <div className="flex gap-4 items-start p-6 bg-white/50 rounded-sm border border-white font-sans">
                  <img 
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100" 
                    alt="User" 
                    className="w-12 h-12 rounded-full object-cover border border-gray-100"
                  />
                  <div className="space-y-1 flex-1 font-sans">
                    <div className="flex justify-between items-center font-sans">
                      <h4 className="font-bold text-gray-900 text-sm font-sans">Lucas Martin</h4>
                      <span className="text-[10px] text-gray-400 font-sans">Il y a 2 jours</span>
                    </div>
                    <p className="text-xs text-gray-600 leading-relaxed font-sans">
                      Cet article résonne particulièrement avec mes projets actuels. Le choix des nuances neutres et du mobilier organique apporte une vraie sérénité à l'espace. Merci pour ces précieux conseils !
                    </p>
                  </div>
                </div>

                {/* Commentaire 2 */}
                <div className="flex gap-4 items-start p-6 bg-white/50 rounded-sm border border-white font-sans">
                  <img 
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100" 
                    alt="User" 
                    className="w-12 h-12 rounded-full object-cover border border-gray-100"
                  />
                  <div className="space-y-1 flex-1 font-sans">
                    <div className="flex justify-between items-center font-sans">
                      <h4 className="font-bold text-gray-900 text-sm font-sans">Amélie Laurent</h4>
                      <span className="text-[10px] text-gray-400 font-sans">Il y a 1 jour</span>
                    </div>
                    <p className="text-xs text-gray-600 leading-relaxed font-sans">
                      L'approche créative est tout simplement magnifique. J'adore la façon dont vous intégrez les éléments en bois texturé.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* B. Formulaire de soumission de commentaire */}
            <div className="bg-white p-8 md:p-10 rounded-sm shadow-md border border-gray-100 font-sans">
              <h3 className="text-2xl font-sans font-bold text-gray-900 mb-2">
                Leave A Comment
              </h3>
              <p className="text-xs text-gray-500 mb-8 uppercase tracking-widest font-sans">Rejoignez la conversation</p>

              <form onSubmit={(e) => e.preventDefault()} className="space-y-6 text-xs font-sans">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-sans">
                  <input 
                    type="text" 
                    placeholder="Your Name *" 
                    className="w-full bg-[#f4f1e5]/40 border-b border-gray-200 focus:border-[#c29f68] py-3 px-2 focus:outline-none transition-colors duration-300 placeholder-gray-400 font-sans" 
                    required 
                  />
                  <input 
                    type="email" 
                    placeholder="Your E-mail *" 
                    className="w-full bg-[#f4f1e5]/40 border-b border-gray-200 focus:border-[#c29f68] py-3 px-2 focus:outline-none transition-colors duration-300 placeholder-gray-400 font-sans" 
                    required 
                  />
                </div>

                <textarea 
                  rows="4" 
                  placeholder="Your comment *" 
                  className="w-full bg-[#f4f1e5]/40 border-b border-gray-200 focus:border-[#c29f68] py-3 px-2 focus:outline-none transition-colors duration-300 placeholder-gray-400 resize-none font-sans" 
                  required
                ></textarea>

                <div className="flex items-center gap-3 font-sans">
                  <input 
                    type="checkbox" 
                    id="save-info" 
                    className="w-4 h-4 accent-[#c29f68] cursor-pointer"
                  />
                  <label htmlFor="save-info" className="text-[11px] text-gray-500 cursor-pointer select-none font-sans">
                    I agree that my submitted data is being collected and stored.
                  </label>
                </div>

                <button 
                  type="submit" 
                  className="bg-[#0d1b2a] hover:bg-black text-white text-[11px] font-bold tracking-[0.2em] px-8 py-4 transition-colors duration-300 uppercase flex items-center gap-3 font-sans"
                >
                  <span className="font-sans">Post Comment</span>
                  <ArrowRight size={14} />
                </button>
              </form>
            </div>

          </div>

          {/* ==========================================
              5. SECTION ARTICLES SIMILAIRES
              ========================================== */}
          <div className="pt-20 border-t border-[#dddac9] mt-20 font-sans">
            <h3 className="text-2xl font-sans font-bold text-gray-900 mb-10">
              You May Also Like
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 font-sans">
              {relatedBlogs.map((related) => (
                <div 
                  key={related.id} 
                  onClick={() => {
                    navigate(`/blog/${related.id}`);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="group cursor-pointer font-sans"
                >
                  <div className="overflow-hidden mb-6 h-[260px] rounded-sm font-sans">
                    <img 
                      src={related.image} 
                      alt={related.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    />
                  </div>
                  
                  <div className="flex gap-2 items-center text-[11px] uppercase tracking-wider text-[#c29f68] font-semibold mb-3 font-sans">
                    <span className="font-sans">{related.category || "Furniture"}</span>
                    <span className="font-sans">•</span>
                    <span className="font-sans">{related.date}</span>
                  </div>

                  <h4 className="text-lg font-sans font-semibold text-gray-900 group-hover:text-[#c29f68] transition-colors duration-300 leading-snug">
                    {related.title}
                  </h4>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

    </div>
  );
};

export default BlogsDetails;