import React from 'react'
import DonatePage from '../Pages/UserPage/Donate'
import CampaignMoreDetails from '../Pages/UserPage/CampaignMoreDetails'
import DonationHistory from '../Pages/UserPage/DonationHistory'
import Footer from '../Pages/UserPage/Footer'

const DonationPage = () => {
  return (
    <>
        <CampaignMoreDetails />
        <DonatePage />
        <DonationHistory />
        <Footer/>
    </>
  )
}

export default DonationPage