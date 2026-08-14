import React from 'react'
import SocialIcons from '../../ui/SocialIcons'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
   <>
    <div className="bg-primary pt-[8%] px-4">
      <footer className='container pb-10 mx-auto text-white grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-10
       border-b border-gray-50/10'>

        {/* Working Hours */}
        <div className="footer-item">
            <h3 className="text-xl font-semibold mb-6">Working Hours</h3>
            <ul className='space-y-3'>
                <li>
                    <span className='text-muted font-light'>Mon - Fri: 8:00 AM - 6:00 PM</span>
                </li>
                <li>
                    <span className='text-muted font-light'>Sat: 9:00 AM - 2:00 PM</span>
                </li>
                <li>
                    <span className='text-muted font-light'>Sunday: Closed</span>
                </li>
            </ul>
        </div>
        
        {/* Office Location & Contact */}
        <div className="footer-item">
            <h3 className="text-xl font-semibold mb-6">Office</h3>
            <ul className='space-y-3'>
                <li>
                    <p className='text-muted font-light pb-5'>
                      Abidjan, Cote d'Ivoire — Cocody Abatta, Carrefour Sirene
                    </p>
                </li>
                <li>
                    <Link to="mailto:contact@votre-entreprise.ci" className='text-muted font-light pb-2 block text-lg hover:underline transition-300 hover:text-white'>
                      contact@votre-entreprise.ci
                    </Link>
                    <span className='text-xl tracking-tight block'>
                      +225 07 00 00 00 00
                    </span>
                </li>
                <li>
                    <span className='text-muted font-light'>Sunday: Closed</span>
                </li>
            </ul>
        </div>
        
        {/* Navigation Links */}
        <div className="footer-item links">
            <h3 className="text-xl font-semibold mb-6">Quick Links</h3>
            <ul className='space-y-3 w-fit'>
                <li className='w-fit'>
                    <Link to="/" >
                      Home
                    </Link>
                </li>
                <li className='w-fit'>
                    <Link to="/about" >
                      About Us
                    </Link>
                </li>
                <li className='w-fit'>
                    <Link to="/products" >
                      Products
                    </Link>
                </li>
                <li className='w-fit'>
                    <Link to="/shop" >
                      Shop
                    </Link>
                </li>
                <li className='w-fit'>
                    <Link to="/contact" >
                      Contact
                    </Link>
                </li>
            </ul>
        </div>

        {/* Social Icons */}
        <div className="footer-item social">
            <h3 className='text-xl font-semibold mb-6'>Get In Touch</h3>
            <SocialIcons/>
        </div>
      </footer>  

      <div className="container py-6 text-muted mx-auto text-center">
        <p className="link-bottom">
            <Link to="/" className='text-white font-semibold cursor-pointer' >
                Abdoul bassit
            </Link> © {new Date().getFullYear()}. All Rights Reserved.
        </p>
      </div>
    </div>
   </>
  )
}

export default Footer