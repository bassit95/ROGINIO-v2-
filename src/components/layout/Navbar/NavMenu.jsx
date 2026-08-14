import React from 'react'
import {NavLink} from "react-router-dom"

const NavMenu = ({path,name}) => {
  return (
   <>
    <div className="text-sm md:text-[16px] font-medium text-white hover:text-gray-300 transition-colors duration-100 nav-link">
       <NavLink
       to ={path}>
        {name}
       </NavLink>
    </div>
   </>
  )
}

export default NavMenu