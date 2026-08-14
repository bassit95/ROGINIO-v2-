import React,{useState,useEffect} from 'react'
import {MoveUp} from 'lucide-react'


const 
ScrollToTop = () => {

 const [visible,setVisible] = useState(false);

 const toggleVisibility = () =>{
    if(window.scrollY > 300) {
        setVisible(true)
    } else {
        setVisible(false)
    }
 }

 const ScrollToTop = () => {

    window.scrollTo({
        top:0,
        behavior: "smooth",
    })
 };

 useEffect(()=> {
    window.addEventListener("scroll",toggleVisibility);
    return () => window.removeEventListener("scroll",toggleVisibility)
 },[]);

  return (
    <>
    {visible && (
        <button
         onClick={ScrollToTop}
         className='fixed bottom-0 right-5 bg-primary text-white p-3 rounded-sm shadow-lg hover:bg-coffee-light transition-all duration-300 hover:text-black cursor-pointer'
        >
        <MoveUp/>
        </button>
    )}
    
    </>
  )
}

export default ScrollToTop