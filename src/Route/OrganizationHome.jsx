import React from 'react'
import Footer from '../Pages/UserPage/Footer'
import OrgNavbar from '../Pages/OrganizationPage/OrgNavbar'
import OrgHero from '../Pages/OrganizationPage/OrgHero'
import ViewAccepted from '../Pages/OrganizationPage/ViewAccepted'
import OrgMessage from '../Pages/OrganizationPage/OrgMessage'

const OrganizationHome = () => {
  return (
    <>
        <OrgNavbar/>
        <OrgHero/>
        <ViewAccepted/>
        <OrgMessage/>
        <Footer/>
    </>
  )
}

export default OrganizationHome