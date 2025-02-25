import React, { useEffect, useState } from "react";
import { api } from "../../axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaLock } from "react-icons/fa";
import { FaLockOpen } from "react-icons/fa";
import {toast} from 'react-hot-toast'
import { FaInfoCircle } from "react-icons/fa";
import { Link, useNavigate } from "react-router";


const UsersList = () => {
  const [usersList, setUsersList] = useState([]);
  const navigate = useNavigate()

  
  const getUsersList = async () => {
    try {
      const { data } = await api.get("/admin/getuserdetail");
      console.log(data);
      setUsersList(data?.usersDetail?.[0]?.allUsers);
    } catch (err) {
      console.error("Error fetching campaign donation details:", err);
    }
  };
  console.log(usersList);
  

  useEffect(() => {
    getUsersList();
  }, []);

  const handleBlock = async (id) =>{
    try{
        const responce = await api.patch('/admin/blockuser',{id})
        if(responce.status === 200){
            toast.success(responce.data.message || "Details Updated Successfully")
            setUsersList((prev) =>
                prev.map((user) =>
                  user._id === id ? { ...user, isBlocked: true } : user
                )
              );
          } else{
            toast.error(responce.data.message || "Failed to Upadate details")
          }
          
    }catch(err){
        console.error("Error fetching on blocking user:", err);
    }
  }

  const handleUnBlock = async (id) =>{
    try{
        const responce = await api.patch('/admin/unblockuser',{id})
        if(responce.status === 200){
            toast.success(responce.data.message || "Details Updated Successfully")
            setUsersList((prev) =>
                prev.map((user) =>
                  user._id === id ? { ...user, isBlocked: false } : user
                )
              );
          } else{
            toast.error(responce.data.message || "Failed to Upadate details")
          }
    }catch(err){
        console.error("Error fetching on blocking user:", err);
    }
  }

  console.log(usersList);
  

  return (
    <section
      id="campaigns"
      className="py-5 d-flex justify-content-center align-items-center"
      style={{
        backgroundColor: "#1995AD",
        minHeight: "100vh",
      }}
    >
      <div className="container py-4">
        <h1 className="text-center mb-4 text-white">User Details</h1>

          {usersList.map((user, index) => (
            <div
              key={index}
              className="row text-center py-3 bg-white border rounded-3 mb-4 shadow-sm"
              style={{
                minHeight: "150px",
              }}
            >
              <div className="col text-start">
                
                <h3 className="text-primary">User #{index + 1}</h3>
                <div>
                <ul className="list-unstyled mb-0">
                  <li>
                    <strong>User ID :</strong> {user._id}
                  </li>
                  <li>
                    <strong>Username :</strong> {user.name}
                  </li>
                  <li>
                    <strong>Email :</strong> {user.email}
                  </li>
                  <li>
                    <strong>Status :</strong> {user.isBlocked?"Blocked":"Unblocked"}
                  </li>
                </ul>
                </div>
                <div
                  className="fs-4"
                  style={{ cursor: "pointer" }}
                >
                  {!user.isBlocked  ? <FaLock onClick={()=>handleBlock(user._id)}/> : 
                    <FaLockOpen onClick={()=>handleUnBlock(user._id)}/>}
                </div>

                <button style={{border:'none', backgroundColor:'white'}}
                onClick={()=>navigate(`/admin/updateuser/${user._id}`,{state:user})}>
                <FaInfoCircle style={{fontSize:'20px', color:'black'}}/>
                </button>
              </div>
              
            </div>
        ))}
      </div>
    </section>
  );
};

export default UsersList;
