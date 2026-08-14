import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import PageBanner from '../components/ui/Cards/PageBanner';
import Banner from '../components/sections/Banner';
import MainBtn from '../components/ui/Buttons/MainBtn';

import aboutImg1 from "/images/AboutPage/about-image-01.jpg";
import aboutImg2 from "/images/AboutPage/about-image-02.jpg";

import gallery from "../assets/Data/GalleryData.json";
import CountUp from "react-countup";
import Team from "../components/sections/Team";
import GallerySlide from '../components/ui/GallerySlide';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const aboutRef = useRef();
  const galleryRef = useRef();
  const countRef = useRef();
  const [startCount, setStartCount] = useState(false);


  useEffect(() => {
    const ctx = gsap.context(() => {
      const images = aboutRef.current.querySelectorAll("img");
      const heading = aboutRef.current.querySelector("h2");
      const spanTitle = aboutRef.current.querySelector(".title-span");
      const pera = aboutRef.current.querySelector(".pera-text");
      const listItems = aboutRef.current.querySelectorAll("ul li");
      const button = aboutRef.current.querySelector("button");

      gsap.from(images[0], {
        x: -50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: images[0],
          start: "top 90%",
          toggleActions: "play none none reverse",
        },
      });

      gsap.from(images[1], {
        scale: 0.8,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: images[0],
          start: "top 90%",
          toggleActions: "play none none reverse",
        },
      });

      gsap.from(spanTitle, {
        y: 20,
        opacity: 0,
        duration: 0.6,
        ease: "power3.out",
        scrollTrigger: {
          trigger: spanTitle,
          start: "top 95%",
          toggleActions: "play none none reverse",
        },
      });

      gsap.from(heading, {
        y: 20,
        duration: 0.8,
        opacity: 0,
        delay: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: heading,
          start: "top 95%",
          toggleActions: "play none none reverse",
        },
      });

      gsap.from(pera, {
        y: 20,
        duration: 0.8,
        delay: 0.2,
        opacity: 0,
        ease: "power3.out",
        scrollTrigger: {
          trigger: pera,
          start: "top 95%",
          toggleActions: "play none none reverse",
        },
      });

      gsap.from(listItems, {
        x: -20,
        opacity: 0,
        stagger: 0.15,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: listItems[0],
          start: "top 95%",
          toggleActions: "play none none reverse",
        },
      });

      gsap.from(button, {
        y: 20,
        opacity: 0,
        duration: 0.8,
        delay: 0.3,
        ease: "power3.out",
        scrollTrigger: {
          trigger: listItems[0],
          start: "top 95%",
          toggleActions: "play none none reverse",
        },
      });
    }, aboutRef);

    return () => ctx.revert();
  }, []);

useEffect(() => {

    const ctx = gsap.context(() => {
      const heading = galleryRef.current.querySelector(".heading-1");
      const title = galleryRef.current.querySelector(".title-span");
      const slider = galleryRef.current.querySelector(".gallery-slider");

      gsap.from(title, {
        y: 20,
        opacity: 0,
        duration: 0.6,
        ease: "power3.out",
        scrollTrigger: {
          trigger: title,
          start: "top 95%",
          toggleActions: "play none none reverse",
        },
      });

      gsap.from(heading, {
        y: 30,
        duration: 0.8,
        opacity: 0,
        delay: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: heading,
          start: "top 95%",
          toggleActions: "play none none reverse",
        },
      });

      gsap.from(slider, {
        scale: 0.95,
        duration: 1,
        delay: 0.3,
        opacity: 0,
        ease: "power3.out",
        scrollTrigger: {
          trigger: slider,
          start: "top 90%",
          toggleActions: "play none none reverse",
        },
      });
    }, galleryRef);

    return () => ctx.revert();
  }, []);

  // 3. Animation Section Compteurs (CORRIGÉE !)
  useEffect(() => {
    const ctx = gsap.context(() => {    
      const items = countRef.current.querySelectorAll(".counter-item");

      gsap.from(items, {
        y: 30,
        opacity: 0,
        stagger: 0.2,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: countRef.current,
          start: "top 85%",
          onEnter: () => setStartCount(true),
          onLeaveBack: () => setStartCount(false),
          toggleActions: "play none none reverse",
        },
      });
    }, countRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <PageBanner 
        title="About Us" 
        currentPage="About Us" 
      />

      <div ref={aboutRef} className="container mx-auto py-[8%] px-4 gap-14 section-container items-center!">
        <div className="rounded-sm w-full lg:w-1/2 relative">
          <img src={aboutImg1} alt="about-image" className="rounded-sm w-full lg:w-auto" />
          <img 
            src={aboutImg2} 
            alt="about-image" 
            className="absolute hidden md:block right-4 -bottom-10 md:-bottom-12 lg:-bottom-16 xl:-bottom-20 w-40 md:w-52 lg:w-64 xl:w-90 rounded-sm shadow-lg" 
          />
        </div>

        <div className="about-content w-full lg:w-1/2">
          <span className="title-span">Premium quality</span>
          <h2 className="heading-1 mb-5">
            <span className="text-coffee">Your comfort is our</span> <br />
            only priority
          </h2>
          <p className="pera-text">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore.
          </p>

          <ul className="space-y-2 mb-10 text-muted">
            <li>
              <span>Mon-Fri: 9 AM - 10 PM</span>
            </li>
            <li>
              <span>Saturday: 9 AM - 6 PM</span>
            </li>
          </ul>

          <MainBtn path="/shop" text={"Shop Now"} className='bg-black! text-white!'/>
        </div>
      </div>

      <div ref={galleryRef} className="image-gallery py-[8%] bg-light-yellow">
        <div className="container mx-auto px-4">
          <span className="title-span">Our Gallery</span>
          <h2 className="heading-1 mb-20">
            Work Examples
          </h2>
        </div>
        <div className="container mx-auto py-[8%] px-4 relative gallery-slider">
          <GallerySlide gallery={gallery}/>
        </div>
      </div>

      <Banner/>

      {/* Section Compteurs */}
      <div ref={countRef} className="container py-[8%] mx-auto px-4 gap-14 section-container grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 text-center">
        <div className="counter-item">
          <p className='text-lg text-gray-600 mb-2'>Offices</p>
          <h3 className='text-5xl font-bold'>
            {startCount ? <CountUp end={90} duration={2} /> : 0}+
          </h3>
        </div>

        <div className="counter-item">
          <p className='text-lg text-gray-600 mb-2'>Clients</p>
          <h3 className='text-5xl font-bold'>
            {startCount ? <CountUp end={2548} duration={2} /> : 0}+
          </h3>
        </div>

        <div className="counter-item">
          <p className='text-lg text-gray-600 mb-2'>Years</p>
          <h3 className='text-5xl font-bold'>
            {startCount ? <CountUp end={25} duration={2} /> : 0}+
          </h3>
        </div>

        <div className="counter-item">
          <p className='text-lg text-gray-600 mb-2'>Projects</p>
          <h3 className='text-5xl font-bold'>
            {startCount ? <CountUp end={256} duration={2} /> : 0}+
          </h3>
        </div>
      </div>

      <Team/>
    </>
  );
};

export default About;