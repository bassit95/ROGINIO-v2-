import React, { useEffect, useRef, useState } from 'react';
import { ChevronDown } from "lucide-react";
import { NavLink } from 'react-router-dom';

const NavDropdown = ({ item }) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleDropdown = () => {
    setOpen(!open);
  };

  return (
    <div
      ref={dropdownRef}
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <div className="flex items-center gap-1 cursor-pointer" onClick={toggleDropdown}>
        <NavLink
          to={item.path || "#"}
          className="text-sm md:text-[16px] font-medium text-white"
          onClick={(e) => {
            if (item.submenu) e.preventDefault();
          }}
        >
          {item.name}
        </NavLink>
        <ChevronDown
          size={20}
          className={`transition-transform text-white duration-300 ${open ? "rotate-180" : ""}`}
        />
      </div>

      {/* Structure HTML sémantique corrigée : les styles appliqués au ul */}
      <ul
        className={`absolute top-full left-0 mt-2 lg:w-40 xl:w-44 bg-zinc-800 rounded-sm shadow-lg transition-all duration-300 space-y-3 py-4 overflow-hidden z-30 ${
          open ? "max-h-96 opacity-100 visible" : "max-h-0 opacity-0 invisible"
        }`}
      >
        {item.submenu.map((sub, index) => (
          <li key={index}>
            <NavLink
              to={sub.path}
              className="block px-4 transition-all w-full duration-300 text-sm text-white hover:text-gray-300 nav-link"
              onClick={() => setOpen(false)}
            >
              {sub.name}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NavDropdown;