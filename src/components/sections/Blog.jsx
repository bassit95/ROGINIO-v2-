// ==========================================
// IMPORTS ET CONFIGURATION DES DEPENDANCES
// ==========================================
import React, { useRef, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

// Importation du composant Card
import BlogCard from '../ui/Cards/BlogCard'; 

// Importation des icônes depuis la bibliothèque Lucide-React
import { Gift, Percent, ShoppingBag, WalletMinimal } from 'lucide-react';

// Importation des données locales des articles de blog
import blogData from "../../assets/Data/Blogs.json";

// Importations pour les animations avec GSAP
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

// Enregistrement du plugin ScrollTrigger de GSAP
gsap.registerPlugin(ScrollTrigger);

// ==========================================
// COMPOSANT PRINCIPAL : BLOGS
// ==========================================
const Blogs = () => {
  // Références React pour cibler les éléments à animer avec GSAP
  const headingRef = useRef(null);
  const blogRef = useRef(null);
  const featureRef = useRef(null); // Référence pour la ligne des caractéristiques

   useEffect(() => {
    const ctx = gsap.context(() => {
      
      gsap.from(headingRef.current.querySelectorAll(".swiper-slide"), {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger:headingRef.current,
          start: "top 90%",
          toggleActions: "play none none reverse",
        },
      });

      gsap.from(blogRef.current.querySelectorAll(".swiper-slide"), {
        y: 50,
        opacity: 0,
        stagger:0.2,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger:blogRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });

      gsap.from(featureRef.current.querySelectorAll(".item"), {
        y: 50,
        opacity: 0,
        stagger:0.15,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger:featureRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });

   });

  return () => ctx.revert();
  }, []);



  return (
    <div className="bg-light-yellow">
      <div className="container px-4 py-[8%] mx-auto">
        
        {/* En-tête de la section (Titre & Sous-titre) */}
        <div ref={headingRef} className="text-center w-full mb-16">
          <span className="title-span">Our Blog</span>
          <h2 className="heading-1 mb-5">
            Latest <span className="text-coffee">news</span>
          </h2>
        </div>

        {/* Conteneur principal du Carrousel (Swiper) */}
        <div ref={blogRef}>
          <Swiper
            spaceBetween={30}
            slidesPerView={1}
            navigation={true}
            pagination={{ clickable: true }}
            breakpoints={{
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 }
            }}
            className="mb-40"
          >
            {/* Boucle sur les données pour générer chaque slide dynamiquement */}
            {blogData.map((blog) => (
              <SwiperSlide key={blog.id}>
                <BlogCard 
                  id={blog.id}
                  image={blog.image}
                  title={blog.title}
                  date={blog.date}
                  category={blog.category}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* ==========================================
            NOUVEAU BLOC : FEATURES ROW
            ========================================== */}
        <div className="border-t border-[#dddac9]">
          <div 
            ref={featureRef}
            className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-14 py-16"
          >
            {/* Élément 1 : Reward Program */}
            <div className="item centered-row gap-3 lg:px-8">
              <Gift size={50} />
              <div className="content">
                <h4 className="text-lg font-semibold text-heading">
                  Reward program
                </h4>
                <span className="text-gray-500">Lorem, ipsum.</span>
              </div>
            </div>

            {/* Élément 2 : Fast Shipping */}
            <div className="item centered-row gap-3 lg:px-8">
              <Percent size={50} />
              <div className="content">
                <h4 className="text-lg font-semibold text-heading">
                  Fast shipping
                </h4>
                <span className="text-gray-500">Lorem, ipsum.</span>
              </div>
            </div>

            {/* Élément 3: Fast Shipping */}
            <div className="item centered-row gap-3 lg:px-8">
              <ShoppingBag size={50} />
              <div className="content">
                <h4 className="text-lg font-semibold text-heading">
                   Great prices
                </h4>
                <span className="text-gray-500">Lorem, ipsum</span>
              </div>
            </div>


            {/* Élément 3: Fast Shipping */}
            <div className="item centered-row gap-3 lg:px-8">
              <WalletMinimal size={50} />
              <div className="content">
                <h4 className="text-lg font-semibold text-heading">
                   Great prices
                </h4>
                <span className="text-gray-500">Lorem, ipsum</span>
              </div>
            </div>

            
          </div>
        </div>

      </div>
    </div>
  );
};

export default Blogs;
