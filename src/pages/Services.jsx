import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { PhoneCall, ArrowRight, CheckCircle, HelpCircle } from 'lucide-react';
import MainBtn from '../components/ui/buttons/MainBtn';

import aboutImg1 from '/images/AboutPage/about-image-01.jpg';
import aboutImg2 from '/images/AboutPage/about-image-02.jpg';
import services from '../assets/Data/Services.json';

import faqImage1 from '/images/Faqs/faq-image-01.jpg';
import faqImage2 from '/images/Faqs/faq-image-02.jpg';

import feature1 from '/images/Services/feature-01.png';
import feature2 from '/images/Services/feature-02.png';
import feature3 from '/images/Services/feature-03.png';
import PageBanner from '../components/ui/Cards/PageBanner';
import ServiceCard from '../components/ui/Cards/ServiceCard';
import Testimonials from '../components/ui/Testimonials';

gsap.registerPlugin(ScrollTrigger);

const Services = () => {
  const aboutRef = useRef();
  const serviceRef = useRef();
  const storeRef = useRef();
  const ctaRef = useRef();
  const featureRef = useRef();
  const testimonialRef = useRef();

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* ==================== ABOUT SECTION ==================== */
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

      /* ==================== SERVICES SECTION ==================== */
      const serviceHeader = serviceRef.current.querySelector(".content");
      const serviceCards = serviceRef.current.querySelectorAll(".service-grid > *");

      gsap.from(serviceHeader, {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: serviceHeader,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });

      gsap.from(serviceCards, {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: serviceRef.current.querySelector(".service-grid"),
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });

      /* ==================== CTA SECTION ==================== */
      const ctaHeader = ctaRef.current.querySelector("h2");
      const ctaBtn = ctaRef.current.querySelector("a, button");

      gsap.from([ctaHeader, ctaBtn], {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ctaRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });

      /* ==================== STORE SECTION ==================== */
      const faqImgs = storeRef.current.querySelectorAll(".faq-image img");
      const storeContent = storeRef.current.querySelectorAll(".content > *");

      gsap.from(faqImgs, {
        x: -40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: storeRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });

      gsap.from(storeContent, {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: storeRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });

      /* ==================== FEATURES SECTION ==================== */
      const featureGroups = featureRef.current.querySelectorAll(".feature-grid .group");

      gsap.from(featureGroups, {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: featureRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });

      /* ==================== TESTIMONIALS SECTION ==================== */
      const testimonialHeader = testimonialRef.current.querySelector(".content");
      const testimonialWrapper = testimonialRef.current.querySelector(".testimonials-wrapper");

      gsap.from(testimonialHeader, {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: testimonialHeader,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });

      gsap.from(testimonialWrapper, {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: testimonialWrapper,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });

    });

    return () => ctx.revert();
  }, []);

  return (
    <>
      <PageBanner title="Our Services" currentPage="Services" />
      
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
          <div className="flex flex-row items-center gap-6 sm:gap-8 flex-wrap">
  <MainBtn path="/about" text={"About Us"} className="bg-black! text-white!" />
  
  <div className="flex items-center gap-3">
    <span className="bg-white p-3 rounded-sm shadow-2xl flex items-center justify-center">
      <PhoneCall size={25} />
    </span>
    <span className="font-medium whitespace-nowrap">+225 12345 67890</span>
  </div>
</div>
        </div>
      </div>
    
      <div ref={serviceRef} className="container py-[8%] mx-auto px-4 gap-10 lg:gap-14">
        <div className="text-center w-full mb-10 content">
          <span className="title-span">Premium quality</span>
          <h2 className="heading-1 mb-5">
            <span className="text-coffee">Our services make your</span> <br />
            life comfortable
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-10 service-grid">
          {services.map((service, index) => (
            <ServiceCard key={index} {...service}/>
          ))}
        </div>
      </div>
<div ref={ctaRef} className="bg-primary text-white">
  <div className="container py-[4%] mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6 md:gap-10 content">
    <h2 className="text-xl sm:text-2xl lg:text-3xl max-w-2xl font-medium">
      Schedule an appointment to meet or email us your questions
    </h2>

    <div className="shrink-0 mt-4 md:mt-0">
    <MainBtn path="/contact" text={"Contact Us"} />
    </div>
  </div>
</div>
      <div ref={storeRef} className="container py-[8%] mx-auto px-4 section-container items-center! gap-10 lg:gap-14">
        <div className="faq-image w-full lg:w-1/2 centered-row sm:flex-row flex-col gap-5 h-auto sm:h-90 xl:h-120">
          <img src={faqImage1} alt="faq-image" className="section-image rounded-sm" />
          <img src={faqImage2} alt="faq-image" className="section-image rounded-sm" />
        </div>

        <div className="content w-full lg:w-1/2">
          <span className="title-span">Modern Solutions</span>
          <h2 className="heading-1 mb-5">
            Timeless, quality interior <br />
            <span className="text-coffee">design</span>
          </h2>
          <p className="pera-text">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident in asperiores ratione quasi tempora.
          </p>

          <MainBtn path="/shop" text={"Visit Our Online Store"} className="bg-black! text-white! w-60!" />
        </div>
      </div>

      <div ref={featureRef} className="container py-[8%] mx-auto px-4">
        <div className="feature-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 text-center">
          <div className="group">
            <img src={feature1} alt="feature-icon" className="mx-auto mb-8" />
            <h3 className="text-xl lg:text-2xl font-semibold mb-3">
              Worldwide shipping
            </h3>
            <p className="text-gray-600 mb-6 max-w-xs mx-auto text-sm">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </p>
          </div>

          <div className="group">
            <img src={feature2} alt="feature-icon" className="mx-auto mb-8" />
            <h3 className="text-xl lg:text-2xl font-semibold mb-3">
              Best quality
            </h3>
            <p className="text-gray-600 mb-6 max-w-xs mx-auto text-sm">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </p>
          </div>

          <div className="group">
            <img src={feature3} alt="feature-icon" className="mx-auto mb-8" />
            <h3 className="text-xl lg:text-2xl font-semibold mb-3">
              24/7 Support
            </h3>
            <p className="text-gray-600 mb-6 max-w-xs mx-auto text-sm">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </p>
          </div>
        </div>
      </div>

      <div ref={testimonialRef} className="bg-light-yellow">
        <div className="container py-[8%] mx-auto px-4">
          <div className="text-center w-full mb-10 content">
            <span className="title-span">Our Testimonials</span>
            <h2 className="heading-1 mb-5">
              Feedback from <br />
              <span className="text-coffee">clients</span>
            </h2>
          </div>
        </div>
        
        <div className="testimonials-wrapper">
          <Testimonials/>
        </div>
      </div>
    </>
  );
};

export default Services;