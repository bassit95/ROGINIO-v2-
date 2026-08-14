import React from 'react'
import MainBtn from "../ui/Buttons/MainBtn";
import FeatureCard from '../ui/Cards/FeatureCard.jsx';

import FeatureImage1 from "/images/Index/Features/feature-image-01.jpg";
import FeatureImage2 from "/images/Index/Features/feature-image-02.jpg";
import FeatureImage3 from "/images/Index/Features/feature-image-03.jpg";
import FeatureImage4 from "/images/Index/Features/feature-image-04.jpg";
import FeatureImage5 from "/images/Index/Features/feature-image-05.jpg";
import FeatureImage6 from "/images/Index/Features/feature-image-06.jpg";
import FeatureImage7 from "/images/Index/Features/feature-image-07.jpg";
import { BedDouble, ChefHat, Lightbulb, Square, Bath, Palette,Flame,Sofa } from 'lucide-react';


import { useEffect,useRef } from 'react';
import gsap from "gsap";
import { ScrollTrigger } from 'gsap/ScrollTrigger'; 

gsap.registerPlugin(ScrollTrigger);


function Features() {
  
  const featureRef = useRef();

   useEffect(() => {
    const ctx = gsap.context(() => {
       gsap.from(".feature-content", {
        y: 80,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger : {
           trigger: ".feature-content",
           start: "top 85%",
           toggleActions : "play none none reset",
        }
       });

       gsap.from(".feature-btn",{
        scale: 0.8,
        opacity : 0,
        duration: 0.6,
        delay: 0.3,
        ease : "back.out(1.7)",
        scrollTrigger : {
          trigger: ".feature-content",
          start : "top 85%",
          toggleActions : "play none noen reset",
        }
       });
       gsap.from(".feature-card",{
        y: 60,
        opacity : 0,
        duration: 0.8,
        stagger: 0.3,
        ease : "power3.out",
        scrollTrigger : {
          trigger: ".feature-card",
          start : "top 90%",
          toggleActions : "play none noen reset",
        }
       });
    },featureRef);

    ScrollTrigger.refresh();
    return () => ctx.revert();
   },[]);

  return (
   <>
   <div  ref={featureRef} className="bg-light-yellow">
    <div className="container py-[8%] mx-auto px-4 space-y-10">
      <div className="feature-content section-container lg:items-center!">
          <div>
            <span className="title-span">
              Our Features
            </span>
            <h2 className='heading-1 mb-5'>
              <span className='text-coffee'>
               Modern ideas
              </span>
              <br />
              for Home
            </h2>
            <p className='pera-text'>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim temporibus non ratione vitae.
            </p>
          </div>
          <MainBtn text={"Read More"} className="bg-black! text-white! feature-btn" path="services" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 
      xl:grid-cols-4 gap-8">
        <FeatureCard 
         image={FeatureImage1}
         Icon={BedDouble}
         title ="Bedrooms"
         description="
             Comfortable and elegant bedroom designs that 
             create a peaceful and relaxing environment for rest and rejuvenation. "
        />
        <FeatureCard 
         image={FeatureImage2}
         Icon={ChefHat}
         title ="kitchen"
         description="
            Modern kitchens designed for functionality and style, combining smart layouts with beautiful finishes. "
        />
        <FeatureCard 
         image={FeatureImage3}
         Icon={Lightbulb}
         title ="Lighting"
         description="
            Creative lighting solutions that enhance mood, highlight interiors, and bring warmth to every space. "
        />
        <FeatureCard 
         image={FeatureImage4}
         Icon={Square}
         title ="Windows"
         description="
            Stylish window designs that maximize natural light while improving ventilation and aesthetic appeal. "
        />
        <FeatureCard 
         image={FeatureImage5}
         Icon={Bath}
         title ="Bathrooms"
         description="
            Stylish window designs that maximize natural light while improving ventilation and aesthetic appeal. "
        />
        <FeatureCard 
         image={FeatureImage6}
         Icon={Palette}
         title ="Decoration"
         description="
            Stylish window designs that maximize natural light while improving ventilation and aesthetic appeal. "
        />
        <FeatureCard 
         image={FeatureImage7}
         Icon={Flame}
         title ="Fire"
         description="
            Stylish window designs that maximize natural light while improving ventilation and aesthetic appeal. "
        />
         <FeatureCard 
         image={FeatureImage5}
         Icon={Sofa}
         title ="LivingRooms"
         description="
            Stylish window designs that maximize natural light while improving ventilation and aesthetic appeal. "
        />
      </div>
    </div>
   </div>
   
   </>
  )
}

export default Features