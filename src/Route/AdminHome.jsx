import React from 'react'
import AdminNavbar from '../Pages/AdminPage/AdminNavbar'
import AdminDashboard from '../Pages/AdminPage/AdminDashboard'
import ManageCampaigns from '../Pages/AdminPage/ManageCampaigns'
import Manage from '../Pages/AdminPage/Manage'
import Footer from '../Pages/UserPage/Footer'

const AdminHome = () => {
  return (
    <>
      <AdminNavbar/>
      <AdminDashboard/>
      <Manage/>
      <ManageCampaigns/>
      <Footer/>
      
    </>
  )
}

export default AdminHome