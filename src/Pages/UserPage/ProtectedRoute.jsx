import { Navigate,Outlet } from 'react-router'

const ProtectedRoute = ({allowesUser}) => {
    const token = localStorage.getItem("access_token")
    const userRole = localStorage.getItem("role")

    if(!token){
        return <Navigate to='/login' replace/>
    }
    if(!allowesUser.includes(userRole)){
        return <Navigate to='/unauthorized' replace/>
    }
  return <Outlet/>
}

export default ProtectedRoute