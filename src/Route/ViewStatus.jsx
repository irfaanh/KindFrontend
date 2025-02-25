import React from 'react'
import ViewCampCart from '../Pages/OrganizationPage/ViewCampChart'
import ViewCampaignDetForOrg from '../Pages/OrganizationPage/ViewCampaignDetForOrg'
import CampaignCollection from '../Pages/OrganizationPage/CampaignCollection'

const ViewStatus = () => {
  return (
    <>
      <ViewCampaignDetForOrg/>
      <ViewCampCart />
      <CampaignCollection/>
      
    </>
  )
}

export default ViewStatus