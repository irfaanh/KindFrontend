import { Toaster } from "react-hot-toast"

import {BrowserRouter,Route,Routes} from 'react-router'
import UserHome from '../Route/UserHome'
import Login from '../Pages/UserPage/Login/Login'
import SignIn from '../Pages/UserPage/Login/SignIn'
import UpdateProfile from '../Pages/Profile/UpdateProfile'
import ProfileSection from '../Pages/Profile/ProfileSection'
import OrganizationHome from '../Route/OrganizationHome'
import OrgLogin from '../Pages/OrgLogin/OrgLogin'
import OrgSignUp from '../Pages/OrgLogin/OrgSignUp'
import OrgProfileSection from '../Pages/OrgProfile/OrgProfileSection'
import UpdateOrgProfile from '../Pages/OrgProfile/UpdateOrgProfile'
import AddCampaign from '../Pages/OrganizationPage/AddCampaign'
import AdminHome from '../Route/AdminHome'
import AdminLogin from '../Pages/AdminPage/AdminLogin/AdminLogin'
import DonationPage from '../Route/DonationPage'
import Transactionhistory from '../Pages/Profile/TransactionHistory'
import ViewStatus from '../Route/ViewStatus'
import UsersList from '../Pages/AdminPage/UsersList'
import OrganizationList from '../Pages/AdminPage/OrganizationList'
import UpdateOrganizationProfile from '../Pages/AdminPage/UpdateOrganizationProfile'
import ProtectedRoute from '../Pages/UserPage/ProtectedRoute'
import UnauthorizedPage from '../Pages/AdminPage/UnauthorizedPage'
import AdminMsg from '../Pages/AdminPage/AdminMsg'
import UpdateCampaign from '../Pages/OrganizationPage/UpdateCampaign'
import ViewDisabledCampaign from '../Pages/OrganizationPage/ViewDisabledCampaign'
import UpdateUserProfile from '../Pages/AdminPage/UpdateUserProfile'
import ForgetPassword from '../Pages/UserPage/Login/ForgetPassword'
import ResetPassword from '../Pages/UserPage/Login/ResetPassword'
import OrgForgetPass from '../Pages/OrgLogin/OrgForgetPass'
import OrgResetPass from '../Pages/OrgLogin/OrgResetPass'
import CampaignList from '../Pages/AdminPage/CampaignList'

const Router = () => {
  return (
    <>
    <BrowserRouter>
        <Routes>
            <Route
              path="/unauthorized"
              element={
                <>
                  <UnauthorizedPage />
                  <Toaster position="top-left" />
                </>
              }
            />
          <Route path="/">
      
            <Route
                path=""
                element={
                  <>
                    <UserHome />
                    <Toaster position="top-left" />
                  </>
                }
              />

            <Route
              path="login"
              element={
                <>
                  <Login />
                  <Toaster position="top-left" />
                </>
              }
            />

            <Route
              path="signup"
              element={
                <>
                  <SignIn />
                  <Toaster position="top-left" />
                </>
              }
            />

            <Route
              path="forget-password"
              element={
                <>
                  <ForgetPassword />
                  <Toaster position="top-left" />
                </>
              }
            />

            <Route
              path="reset-password/:token"
              element={
                <>
                  <ResetPassword />
                  <Toaster position="top-left" />
                </>
              }
            />

            <Route
              path="profilesection"
              element={
                <>
                  <ProfileSection />
                  <Toaster position="top-left" />
                </>
              }
            />

            <Route
              path="transactionhistory"
              element={
                <>
                  <Transactionhistory />
                  <Toaster position="top-left" />
                </>
              }
            />

            <Route
              path="updateprofile"
              element={
                <>
                  <UpdateProfile />
                  <Toaster position="top-left" />
                </>
              }
            />

            <Route
              path="/donate/:id"
              element={
                <>
                  <DonationPage />
                  <Toaster position="top-left" />
                </>
              }
            />
            
            </Route>
        </Routes>


        <Routes>
              <Route path='/organization'>
            <Route
              path="organizationlogin"
              element={
                <>
                  <OrgLogin />
                  <Toaster position="top-left" />
                </>
              }
            />

            <Route
              path="organizationsignup"
              element={
                <>
                  <OrgSignUp />
                  <Toaster position="top-left" />
                </>
              }
            />
            {/* <Route element={<ProtectedRoute allowesUser={["Organization"]}/>}> */}
            <Route
              path=""
              element={
                <>
                  <OrganizationHome />
                  <Toaster position="top-left" />
                </>
              }
            />
            {/* </Route> */}

            <Route
              path="orgprofilesection"
              element={
                <>
                  <OrgProfileSection />
                  <Toaster position="top-left" />
                </>
              }
            />

            <Route
              path="updateorgprofile"
              element={
                <>
                  <UpdateOrgProfile />
                  <Toaster position="top-left" />
                </>
              }
            />

            <Route
              path="viewdisabledcampaigns"
              element={
                <>
                  <ViewDisabledCampaign />
                  <Toaster position="top-left" />
                </>
              }
            />

            <Route
              path="addnewcampaign"
              element={
                <>
                  <AddCampaign />
                  <Toaster position="top-left" />
                </>
              }
            />
            <Route
              path="viewstatus/:id"
              element={
                <>
                  <ViewStatus />
                  <Toaster position="top-left" />
                </>
              }
            />
            <Route
              path="updatecampaign/:id"
              element={
                <>
                  <UpdateCampaign />
                  <Toaster position="top-left" />
                </>
              }
            />
            <Route
              path="forgetorg-password"
              element={
                <>
                  <OrgForgetPass />
                  <Toaster position="top-left" />
                </>
              }
            />

            <Route
              path="resetorg-password/:token"
              element={
                <>
                  <OrgResetPass />
                  <Toaster position="top-left" />
                </>
              }
            />
          </Route>
        </Routes>

        <Routes>
              <Route path='/admin'>

              <Route
              path="adminlogin"
              element={
                <>
                  <AdminLogin />
                  <Toaster position="top-left" />
                </>
              }
            />

          {/* <Route element={<ProtectedRoute allowesUser={["Admin"]}/>}> */}
            <Route
              path=""
              element={
                <ProtectedRoute allowedRole={"Admin"}>
                <>
                  <AdminHome />
                  <Toaster position="top-left" />
                </>
                </ProtectedRoute>
              }
            />
            {/* </Route> */}


            <Route
              path="manageuser"
              element={
                <ProtectedRoute allowedRole={"Admin"}>
                <>
                  <UsersList />
                  <Toaster position="top-left" />
                </>
                </ProtectedRoute>
              }
            />
            <Route
              path="manageorganization"
              element={
                <ProtectedRoute allowedRole={"Admin"}>
                <>
                  <OrganizationList />
                  <Toaster position="top-left" />
                </>
                </ProtectedRoute>
              }
            />

            <Route
              path="managecampaigndetails"
              element={
                <ProtectedRoute allowedRole={"Admin"}>
                <>
                  <CampaignList />
                  <Toaster position="top-left" />
                </>
                </ProtectedRoute>
              }
            />
            <Route
              path="updateuser/:id"
              element={
                <ProtectedRoute allowedRole={"Admin"}>
                <>
                  <UpdateUserProfile />
                  <Toaster position="top-left" />
                </>
                </ProtectedRoute>
              }
            />
            <Route
              path="updateorganization/:id"
              element={
                <ProtectedRoute allowedRole={"Admin"}>
                <>
                  <UpdateOrganizationProfile />
                  <Toaster position="top-left" />
                </>
                </ProtectedRoute>
              }
            />
            <Route
              path="message"
              element={
                <ProtectedRoute allowedRole={"Admin"}>
                <>
                  <AdminMsg />
                  <Toaster position="top-left" />
                </>
                </ProtectedRoute>
              }
            />
          </Route>
        </Routes>
        
    </BrowserRouter>
    </>
  )
}

export default Router