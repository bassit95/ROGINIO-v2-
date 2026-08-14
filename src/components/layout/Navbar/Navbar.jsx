import React, { useEffect, useState } from 'react'
import Logo from './Logo'
import NavMenu from './NavMenu'
import NavDropdown from './NavDropdown'
import { NavLink, useLocation, Link } from 'react-router-dom';
import { TextAlignJustify, User, ShoppingBag } from 'lucide-react';
import MobileMenu from './MobileMenu';
import AuthModal from '../../ui/AuthModel';
import { useCart } from '../../../hooks/useCart';

const navLinks = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  {
    name: "Shop",
    submenu: [
      { name: "Product List", path: "/shop" },
      { name: "Product Single", path: "/product/1" },
      { name: "Cart", path: "/cart" },
      { name: "Checkout", path: "/checkout" },
      { name: "Wishlist Page", path: "/wishlist" },
    ],
  },
  { name: "Blogs", path: "/blogs" },
  { name: "Contact", path: "/contact" },
  {
    name: "Pages",
    submenu: [
      { name: "Services", path: "/services" },
      { name: "Teams", path: "/team" },
      { name: "FAQs", path: "/faqs" },
      { name: "404 Page", path: "/page404" },
    ],
  },
];


const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scroll, setScroll] = useState(false)

 // apres avoir créer la partir shop
// pour le panier, on utilise le hook useCart pour récupérer les produits du panier et les afficher dans
//  l'icône du panier dans la barre de navigation 
  const {cart} = useCart();

  useEffect(()=> {
    const handleScroll = () => {
      if(window.scrollY > 50) {
        setScroll(true)
      }else {
        setScroll(false)
      }
    }
    window.addEventListener("scroll",handleScroll)
      return () => window.removeEventListener("scroll",handleScroll)
  },[])

  const location = useLocation();
  const is404 = location.pathname === "/page404";
  const [openAuth, setOpenAuth] = useState(false);
  return (
    <>
    <div className={`w-full fixed z-10 top-0 left-0 transition-all duration-300 ${ is404 ? "bg-black! text-white" :scroll ? "bg-black shadow-lg" : "bg-transparent"}`}>
     <div className="container mx-auto   max-w-7xl flex justify-between items-center h-22 px-4">
        <NavLink to="/">
        <Logo />
       </NavLink>
        
       <div className="centered-row justify-center gap-12">
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((item, index) =>
                item.submenu ? (
                  // Si le lien a un sous-menu, on utilise NavDropdown
                  <NavDropdown key={index} item={item} />
                ) : (
                  // Sinon, on utilise un simple bouton NavMenu
                  <NavMenu key={index} name={item.name} path={item.path} />
                )
              )}
            </div>
            {/* nav Icons */}
            <div className="nav-icons flex items-center gap-3">
              <button onClick={()=> setOpenAuth(true)} className='user cursor-pointer'>
                <User size={24} className='text-white cursor-pointer'/>
              </button>
              <Link to='/cart' className="relative">
                <ShoppingBag size={24} className="text-white cursor-pointer"/>
                {cart.length > 0 && (
                    <span className='card-count text-white'>{cart.length}</span>
                )}
              </Link>

              <button className='relative ms-2 lg:hidden block' onClick={() => setMenuOpen(true)}>
                <TextAlignJustify size={24} className='text-white cursor-pointer'/>
              </button>
            </div>
          </div>
     </div>
    
    
    </div>
     <MobileMenu menuOpen={menuOpen} setMenuOpen={setMenuOpen}  navLinks={navLinks} className="lg:block hidden"/>
     <AuthModal isOpen={openAuth} onClose={()=>setOpenAuth(false)}/>
    </>
  )
}

export default Navbar