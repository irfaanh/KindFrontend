import React from 'react'
import Navbar from '../Pages/UserPage/Navbar'
import Hero from '../Pages/UserPage/Hero'
import Campaign from '../Pages/UserPage/Campaign'
import WhySection from '../Pages/UserPage/WhySection'
import Message from '../Pages/UserPage/Message'
import Footer from '../Pages/UserPage/Footer'

const UserHome = () => {
  return (
    <>
    <Navbar/>
    <Hero/>
    <Campaign/>
    <WhySection/>
    <Message/>
    <Footer/>
    </>
  )
}

export default UserHome