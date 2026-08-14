import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { ChevronDown, Copyright, Dribbble, Facebook, Instagram, Twitter, X } from 'lucide-react';
import Logo from './Logo';

const MobileMenu = ({ menuOpen, setMenuOpen, navLinks }) => {
  const [activeMenu, setActiveMenu] = useState(null);
  const year = new Date().getFullYear();

  const handleMenuClick = (index) => {
    setActiveMenu(activeMenu === index ? null : index);
  };

  return (
    <div className={`z-50 fixed top-0 left-0 w-full bg-black text-white overflow-y-auto transition-all duration-500 px-[2%] md:px-[8%] xl:px-[12%] ${menuOpen ? "h-screen opacity-100" : "h-0 opacity-0 pointer-events-none"}`}>
      <div className="flex justify-between items-center py-5 border-b border-b-gray-50/20">
        <Logo />
        <div>
          <button onClick={() => setMenuOpen(false)} className='text-white flex gap-2 cursor-pointer items-center'>
            <span>Close</span>
            <X size={25} />
          </button>
        </div>
      </div>

      <div className="flex flex-col items-center gap-6 text-xl mt-10">
        {navLinks.map((item, index) => (
          <div key={index} className="w-full text-center">
            {item.submenu ? (
              <button
                onClick={() => handleMenuClick(index)}
                className="flex items-center justify-center gap-2 w-full text-white relative cursor-pointer"
              >
                {item.name}
                <ChevronDown className={`transition-transform duration-300 ${activeMenu === index ? "rotate-180" : ""}`} />
              </button>
            ) : (
              <NavLink
                to={item.path}
                onClick={() => setMenuOpen(false)}
                className="text-white block w-full"
              >
                {item.name}
              </NavLink>
            )}

            {item.submenu && (
              <div className={`overflow-hidden transition-all duration-500 ${activeMenu === index ? "max-h-60 mt-4" : "max-h-0"}`}>
                <div className="flex flex-col gap-3">
                  {item.submenu.map((sub, i) => (
                    <NavLink
                      key={i} // Correction: key en minuscule
                      to={sub.path}
                      onClick={() => setMenuOpen(false)}
                      className="text-gray-300 hover:text-white text-lg"
                    >
                      {sub.name}
                    </NavLink>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <hr className="mt-8 border-gray-50/20" />

      {/* Social Icons & Copyrights */}
      <ul className="mx-auto flex items-center justify-center py-5 gap-3">
        <li>
          <Link to="/" className="p-3 rounded-full bg-linear-to-r from-blue-500 to-blue-700 transition-all duration-300 inline-block">
            <Facebook className="text-white" size={20} /> {/* Correction: text-white */}
          </Link>
        </li>
        <li>
          <Link to="/" className="p-3 rounded-full bg-linear-to-r from-blue-400 to-blue-600 transition-all duration-300 inline-block">
            <Twitter className="text-white" size={20} />
          </Link>
        </li>
        <li>
          <Link to="/" className="p-3 rounded-full bg-linear-to-r from-pink-500 via-red-500 to-yellow-500 transition-all duration-300 inline-block">
            <img-gradient />
            <Instagram className="text-white" size={20} />
          </Link>
        </li>
        <li>
          <Link to="/" className="p-3 rounded-full bg-linear-to-r from-purple-500 via-pink-500 transition-all duration-300 inline-block">
            <Dribbble className="text-white" size={20} />
          </Link>
        </li>
      </ul>

      <div className="w-full text-center pb-5">
        <p className="text-sm text-gray-400 flex items-center justify-center gap-1">
          <Copyright size={16} />
          <span>{year} Your Company, All Rights Reserved.</span>
        </p>
      </div>
    </div>
  );
};

export default MobileMenu;