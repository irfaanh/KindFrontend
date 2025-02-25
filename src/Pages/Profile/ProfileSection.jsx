import React from 'react'
import { MdKeyboardArrowRight } from "react-icons/md";
import { Link } from 'react-router';
import {useNavigate} from 'react-router'
import {useDispatch} from 'react-redux'
import { logOutUser } from '../../Redux/UserSlice';


const ProfileSection = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleLogOut = () => {
        localStorage.removeItem("access_token")
        localStorage.removeItem("role")
        dispatch(logOutUser())
        navigate('/')
        
    }

  return (
    <section className="bg-light vh-100 d-flex justify-content-center align-items-center">
        <div
        className="p-4 bg-white rounded shadow-sm d-flex flex-column gap-3"
        style={{ width: "500px", borderRadius: "10px" }}
      >
        <Link style={{textDecoration:'none', color:'black'}} to={'/updateprofile'}>
            <div className="d-flex justify-content-between text-center border-bottom">
                <p className="">Update Profile</p>
                <MdKeyboardArrowRight style={{fontSize:'25px'}}/>
            </div>
        </Link>
        <Link style={{textDecoration:'none', color:'black'}} to={'/transactionhistory'}>
            <div className="d-flex justify-content-between text-center border-bottom">
                <p className="">View Transaction History</p>
                <MdKeyboardArrowRight style={{fontSize:'25px'}}/>
            </div>
        </Link>
        <Link style={{textDecoration:'none', color:'black'}} to={'/organization/organizationlogin'}>
            <div className="d-flex justify-content-between text-center">
                <p className="">Become an Organization</p>
                <MdKeyboardArrowRight style={{fontSize:'25px'}}/>
            </div>
        </Link>
        
        <button onClick={handleLogOut}
                style={{padding:"10px 25px 10px 25px", borderRadius: "5px",
                    fontWeight: "bolder", backgroundColor: "#1995AD",
                    color:'white', border:'1px solid #1995AD'
                        }}>Logout</button>
      </div>
    </section>

  )
}

export default ProfileSection