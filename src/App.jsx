import { Route, Routes } from 'react-router-dom'
import Navbar from './components/layout/Navbar/Navbar'
import Home from './pages/Home';
import {useEffect,useRef} from "react";
import gsap from 'gsap';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Wishlist from './pages/Wishlist';
import Cart from './pages/Cart';
import ShopDetails from './pages/ShopDetails';
import { Toaster } from 'react-hot-toast';
import Checkout from './pages/Checkout';
import TeamDetails from './pages/TeamDetails';
import BlogsDetails from './pages/BlogsDetails';
import Footer from './components/layout/Footer/Footer';
import ScrollToTop from './components/ui/ScrollToTop';
import About from './pages/About';
import GalleryDetails from './pages/GalleryDetails';
import Shop from './pages/Shop';
import Blogs from './pages/Blogs';
import Contact from './pages/Contact';
import Services from './pages/Services';
import ServiceDetails from './pages/ServiceDetails';
import Team from './pages/Team';
import Faqs from './pages/Faqs';
import WorkDetails from './pages/WorkDetails';
import NotFound from './pages/NotFound';



const App = () => {

  const contactRef = useRef(null); 

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger,ScrollSmoother)
    const smoother = ScrollSmoother.create({
      
      content : "#smooth-content",
      smooth : 1.8,
      effects : true,
    })
    return () => {
      smoother && smoother.kill()
      ScrollTrigger.getAll().forEach((t) => t.kill())
    }
  },[]);

  return (
 <>
 <div id="smooth-wrapper">
     <Navbar/>
     <div id="smooth-content">
      <div className="min-h-screen overflow-clip">
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/wishlist" element={<Wishlist/>}/>
          <Route path="/cart" element={<Cart/>}/>
          <Route path="/checkout" element={<Checkout/>}/>
          <Route path="/product/:id" element={<ShopDetails/>}/>
          <Route path="/team/:id" element={<TeamDetails/>}/>
          <Route path="/Blog/:id" element={<BlogsDetails/>}/>
          <Route path="/about" element={<About/>}/>
          <Route path="/gallery/:id" element={<GalleryDetails/>}/>
          <Route path="/shop" element={<Shop/>}/>
          <Route path="/blogs" element={<Blogs/>}/>
          <Route path="/contact" element={<Contact/>}/>
          <Route path="/services" element={<Services/>}/>
          <Route path="/service/:id" element={<ServiceDetails/>}/>
          <Route path="/team" element={<Team/>}/>
          <Route path="/faqs" element={<Faqs/>}/>
          <Route path="/work/:id" element={<WorkDetails/>}/>
          <Route path="/page404" element={<NotFound/>}/>
        </Routes> 
      </div>
     <Footer/>
     </div>
 </div>
 <ScrollToTop/>
 <Toaster position='top-right'/>
 </>
  )
}

export default App