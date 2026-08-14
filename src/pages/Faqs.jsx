import React, { useEffect, useRef, useState } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import FAQItem from "../components/ui/FAQItem"
import work from "../assets/Data/Work.json"


gsap.registerPlugin(ScrollTrigger);

import faqImage1 from "/images/Faqs/faq-image-01.jpg"
import faqImage2 from "/images/Faqs/faq-image-02.jpg"
import PageBanner from "../components/ui/Cards/PageBanner"
import MainBtn from "../components/ui/Buttons/MainBtn"
import WorkCard from "../components/ui/Cards/WorkCard"

const Faqs = () => {
  const faqRef = useRef();
  const workRef = useRef();
  const headingRef = useRef();
  const [openIndex, setOpenIndex] = useState(0);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  }

  return (
    <>
      <PageBanner
        title="Faq's"
        currentPage="Faq's"
      />

    <div ref={faqRef} className="container py-[8%] mx-auto px-4 section-container items-center flex flex-col lg:flex-row gap-10 lg:gap-16">
        {/* Section Images */}
        <div className="faq-image w-full lg:w-1/2 centered-row sm:flex-row flex-col gap-5 h-auto">
          <img src={faqImage1} alt="faq-image" className='section-image rounded-sm' />
          <img src={faqImage2} alt="faq-image" className='section-image rounded-sm' />
        </div>

        {/* Section Accordéon / FAQs */}
        <div className="faq-content w-full lg:w-1/2 flex flex-col gap-4">
          <FAQItem
            question="What are the execution terms?"
            answer="Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda, amet? Odio nam odit consequatur at voluptatum aliquid adipisci ipsam? Ipsam, tenetur. Blanditiis ipsam doloremque ea harum eum nihil iste mole"
            isOpen={openIndex === 0}
            onClick={() => toggleFAQ(0)}
          />

          <FAQItem
            question="How do I choose an architect?"
            answer="Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda, amet? Odio nam odit consequatur at voluptatum aliquid adipisci ipsam? Ipsam, tenetur. Blanditiis ipsam doloremque ea harum eum nihil iste mole"
            isOpen={openIndex === 1}
            onClick={() => toggleFAQ(1)}
          />

          <FAQItem
            question="Where to meet for the project review?"
            answer="Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda, amet? Odio nam odit consequatur at voluptatum aliquid adipisci ipsam? Ipsam, tenetur. Blanditiis ipsam doloremque ea harum eum nihil iste mole"
            isOpen={openIndex === 2}
            onClick={() => toggleFAQ(2)}
          />

          <FAQItem
            question="How much does a consultation cost?"
            answer="Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda, amet? Odio nam odit consequatur at voluptatum aliquid adipisci ipsam? Ipsam, tenetur. Blanditiis ipsam doloremque ea harum eum nihil iste mole"
            isOpen={openIndex === 3}
            onClick={() => toggleFAQ(3)}
          />
        </div>
      </div>

      <div ref={headingRef} className="bg-light-yellow py-[8%]">
        <div className="container mx-auto px-4 section-container">
          <div className="text-center w-full content">
            <span className="title-span">design studio</span>
            <h2 className="heading-1 mb-5">
              <span className="text-coffee">Our services make your </span> <br />
              comfortable and cozy
            </h2>
            <MainBtn text={"Read More"} className="bg-black! text-white!" />
          </div>
        </div>
      </div>

      <div ref={workRef} className="works container mx-auto px-4 py-[8%]">
        <div className="w-full mb-10 content">
          <span className="title-span">Our Work</span>
          <h2 className="heading-1 mb-5">
            <span className="text-coffee">possible </span> <br />
          </h2>
        </div>

       <div className="grid grid-cols-1 xl:grid-cols-3 lg:grid-cols-2 gap-10 work-grid">
          {work.slice(0, 3).map((work) => (
            <WorkCard
              key={work.id}
              id={work.id}
              number={work.number}
              title={work.title}
              image={work.image}
            />
          ))}
        </div>
      </div>

    </>
  )
}

export default Faqs