import React, { useRef, useEffect, useState } from 'react';

// Importations pour les animations avec GSAP
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { useParams, useNavigate } from "react-router-dom";
import GalleryData from "../assets/Data/GalleryData.json";

import {Swiper,  SwiperSlide} from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";

import {Navigation} from 'swiper/modules'
import {ArrowLeft, ArrowRight} from 'lucide-react'
import PageBanner from '../components/ui/Cards/PageBanner';

// Enregistrement du plugin ScrollTrigger de GSAP
gsap.registerPlugin(ScrollTrigger);

const GalleryDetails = () => {

      const galleryRef = useRef();
      const { id } = useParams();
      const gallery = GalleryData.find((g) => g.id === parseInt(id));

      if(!gallery) return <p className='text-center mt-10'> Gallery not found!</p>

      const [mainImage, setMainImage] = useState(gallery.image1)

  return (
    <>
     <PageBanner 
        title="Gallery Details" 
        currentPage="Gallery Details" 
        productName={gallery.title}
      />

      <div className="container mx-auto px-4 py-[8%]">
        <h3 className="heading-1 mb-14">{gallery.title}</h3>

        <div className="section-container p-0! gap-10 lg:gap-14">
            {( gallery.Client || gallery.Date || gallery.Year || gallery.Author) && (
                <div className="w-full lg:w-[30%] lg:sticky top-[8em] left-0 gallery-left">
                    <ul className='lg:max-w-60 space-y-4 '>
                       {gallery.Client && (
                        <li className='centered-row justify-between'>
                           <span className='text-heading text-lg font-semibold'>Client</span>
                           <span className='text-heading text-lg font-semibold'>{gallery.Client}</span>
                        </li>
                       )}
                       {(gallery.Date || gallery.Year) && (
                        <li className='centered-row justify-between'>
                           <span className='text-heading text-lg font-semibold'>
                             {gallery.Date && gallery.Year ? "Date & Year" :gallery.Date ? "Date" : "Year"}
                            </span>
                           <span className='text-heading text-lg font-semibold'>
                            {gallery.Date && gallery.Year ? `${gallery.Date} / ${gallery.Year}`:  gallery.Date ? gallery.Date : gallery.Year}
                           </span>
                        </li>
                       )}
                       {gallery.Author && (
                        <li className='centered-row justify-between'>
                           <span className='text-heading text-lg font-semibold'>Author</span>
                           <span className='text-heading text-lg font-semibold'>{gallery.Author}</span>
                        </li>
                       )}
                    </ul>
                </div>
            )}

            <div className={`gallery-right ${ gallery.Client || gallery.Date || gallery.Year || gallery.Author ? "w-full lg:w-[70%]" : "w-full lg:w-full flex justify-center flex-col"}`}>
             <div className="main-image w-full relative">
                 <div className="absolute -top-16 right-4 flex gap-4 z-10">
                      <button className='gly-prev w-12 h-12  border items-center justify-center hover:bg-black hover:text-white transition-all duration-300 cursor-pointer sm:flex hidden'>
                       <ArrowLeft size={20}/>
                     </button>

                      <button className='gly-next w-12 h-12  border 
                      items-center justify-center hover:bg-black hover:text-white transition-all duration-300 cursor-pointer sm:flex hidden'>
                     <ArrowRight size={20}/>
                     </button>
                 </div>
                 {gallery.swiperimage1  ? (
                  <Swiper
                  modules={[Navigation]}
                  spaceBetween={10}
                  slidesPerView={1}
                  navigation={{
                    prevEl: ".gly-prev",          
                    nextEl: ".gly-next"
                  }}
                 >
                  {[gallery.image1,gallery.image2,gallery.image3,gallery.image4,gallery.swiperimage1,gallery.swiperimage2,gallery.swiperimage3].map((img,idx) => (
                    <SwiperSlide key={idx}>
                      <img src={img} 
                      alt={`${gallery.title} ${idx + 1}`} 
                       className='w-full h-full object-cover rounded'
                      />
                    </SwiperSlide>
                  ))}
                  </Swiper>
                 ) : (
                     <img src={mainImage} 
                      alt={gallery.title} 
                       className='w-full h-full object-cover rounded'
                      />
                 )}
             </div>
             <h3 className='text-3xl lg:text-4xl font-semibold pt-8 pb-5'>Wood Sliding Doors</h3>
             <p className="text-paragraph pb-8">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt cumque et eligendi adipisci nulla, labore corrupti deserunt saepe, dolore tenetur repudiandae ex. Consequatur fugit nesciunt aspernatur cupiditate incidunt deserunt soluta?
             </p>

             <div className="centered-row justify-between flex-col lg:flex-row gap-3 w-full h-auto lg:h-90">
                <div className="image group overflow-hidden rounded-sm w-full h-full">
                  <img src={gallery.image2} alt="gallery-image" className='section-image group-hover:scale-110 transition-all duration-300' />
                </div>

                <div className="image group overflow-hidden rounded-sm w-full h-full">
                  <img src={gallery.image3} alt="gallery-image" className='section-image group-hover:scale-110 transition-all duration-300' />
                </div>

             </div>


              <p className="text-paragraph py-2">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt cumque et eligendi adipisci nulla, labore corrupti deserunt saepe, dolore tenetur repudiandae ex. Consequatur fugit nesciunt aspernatur cupiditate incidunt deserunt soluta?
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eum officiis voluptatum eveniet praesentium a cupiditate optio architecto, fugit soluta minima, ratione voluptatibus suscipit nulla corrupti ducimus illo atque recusandae vel.
             </p>
               
              <div className="centered-row justify-between flex-col xl:flex-row items-start! gap-10">
                <div className="w-full xl:w-1/2">
                  <p className="text-paragraph pb-8">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt cumque et eligendi adipisci nulla, labore corrupti deserunt saepe, dolore tenetur repudiandae ex. Consequatur fugit nesciunt aspernatur cupiditate incidunt deserunt soluta?
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eum officiis voluptatum eveniet praesentium a cupiditate optio architecto, fugit soluta minima, ratione voluptatibus suscipit nulla corrupti ducimus illo atque recusandae vel.
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit. Architecto hic excepturi cumque id, harum tempore nam fuga dignissimos culpa, numquam quis quod asperiores. Possimus animi esse, voluptatem maiores aperiam ratione!
                 </p>
               
                  <h4 className="text-2xl font-medium text-heading pb-3">
                    Design that Reflects Your Style
                  </h4>

                  <p className="text-paragraph pb-8">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt cumque et eligendi adipisci nulla, labore corrupti deserunt saepe, dolore tenetur repudiandae ex. Consequatur fugit nesciunt aspernatur cupiditate incidunt deserunt soluta?
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eum officiis voluptatum eveniet praesentium a cupiditate optio architecto, fugit soluta minima, ratione voluptatibus suscipit nulla corrupti ducimus illo atque recusandae vel.
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit. Architecto hic excepturi cumque id, harum tempore nam fuga dignissimos culpa, numquam quis quod asperiores. Possimus animi esse, voluptatem maiores aperiam ratione!
                 </p>
                </div>

                <div className="w-full xl:w-1/2">
                 <img src={gallery.image4} alt="interior design" />
                </div>
              </div>
            </div>
        </div>
      </div>
    
    </>
  )
}

export default GalleryDetails