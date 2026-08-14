import React from 'react'
import Hero from '../components/sections/Hero'
import About from '../components/sections/AboutSection'
import Featured from '../components/sections/Features'
import Steps from '../components/sections/Steps'
import Brands from '../components/sections/Brands'
import Shop from '../components/sections/Shop'
import Collection from '../components/sections/Collection'
import Team from '../components/sections/Team'
import Banner from '../components/sections/Banner'
import Blogs from '../components/sections/Blog'

const Home = () => {
  return (
  <>
   <Hero/>
   <About/>
   <Featured/>
   <Steps/>
   <Brands/>
   <Shop/>
   <Collection/>
   <Team/>
   <Banner/>
   <Blogs/>
  </>
  )
}

export default Home