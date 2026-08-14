import { useEffect,useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import StepCard from "../ui/Cards/StepCard";

gsap.registerPlugin(ScrollTrigger)

function Steps() {

  const stepsRef = useRef();

  useEffect (() => {
    const ctx = gsap.context(() => {
      gsap.from(".steps-header", {
        y:50,
        opacity:0,
        duration :1,
        ease: "power3.out",
        scrollTrigger:  {
           trigger : ".steps-header",
           start : "top 85%",
           toggleActions : "play none none reset",
        }
      });

      gsap.from(".step-card", {
        y:60,
        opacity:0,
        duration :0.8,
        stagger:0.2,
        ease: "power3.out",
        scrollTrigger:  {
           trigger : ".step-card",
           start : "top 90%",
           toggleActions : "play none none reset",
        }
      })
    }, stepsRef)

     ScrollTrigger.refresh()
     return () => ctx.revert();
  },[])
  return (
  <>
   <div  ref={stepsRef} className="container py-[8%] mx-auto px-4">
    <div className=" steps-header text-center w-full mb-16 steps-header">
        <span className="title-span">
            Steps
        </span>
        <h2 className='heading-1 mb-5'>
          <span className='text-coffee'>
          4 Easy Steps 
          </span> <br />
          to Get Interior Design
        </h2>
    </div>
     <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-10">
      <div className="step-card">
        <StepCard
        number={"01"}
        title={"Requesting Sending"}
        description="
         Send us your project request and requirements so we can understand your needs clearly. "
       />
      </div>
       <div className="step-card">
         <StepCard
        number={"02"}
        title={"Project Planning"}
        description="
         Send us your project request and requirements so we can unders "
       />
       </div>
      <div className="step-card">
         <StepCard
        number={"03"}
        title={"Design Creating"}
        description="
         We design a beautiful and functional solution tailored specifically for your business goals."
       />
       </div>
      <div className="step-card">
        <StepCard
        number={"04"}
        title={"Requesting"}
        description="
       Sit back and enjoy the final result as we deliver a polished and high-quality project. "
       />
       </div>
       
     </div>
   </div>
  
  
  </>
  )
}

export default Steps