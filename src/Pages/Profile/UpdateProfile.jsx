import React, { useRef, useState } from "react";
import { CgProfile } from "react-icons/cg";
import { useDispatch, useSelector } from "react-redux";
import { FaPencilAlt } from "react-icons/fa";
import { api } from "../../axios";
import {toast} from 'react-hot-toast'
import { createUser } from "../../Redux/UserSlice";

const UpdateProfile = () => {
  const { id : userId, username,name, email } = useSelector((store) => store.user);

  const [updateUsername,setUpdateUsername] = useState(username)
  const [updateName,setUpdateName] = useState(name)
  const [updateEmail,setUpdateEmail] = useState(email)

  const dispatch = useDispatch()

  const usernameRef = useRef(null);
  const nameRef = useRef(null);
  const emailRef = useRef(null);


  const handleEditClick = (field) => {
    if (field === "username") usernameRef.current.focus();
    if (field === "name") nameRef.current.focus();
    if (field === "email") emailRef.current.focus();
  };

  const handleChanges = async () => {
    try{
        console.log(
            {
                name:name,
                username:username,
                email:email
            }
        )
      const responce =  await api.patch("/user/update" , 
        {name: updateName,username: updateUsername,email: updateEmail },
        {params: {userId}})
        dispatch(createUser(responce.data.updatedValue))
      if(responce.status === 200){
        toast.success(responce.data.message || "Details Updated Successfully")
      } else{
        toast.error(responce.data.message || "Failed to Upadate details")
      }
        
    }
    catch (error) {
        console.error("Error :", error);
        toast.error("Failed to update details");
        return;
    }
    console.log({
        updateEmail,
        updateName,
        updateUsername
    });
    
}


  return (
    <section className="bg-light vh-100 d-flex justify-content-center align-items-center">
      <div
        className="p-4 bg-white rounded shadow-sm"
        style={{ width: "500px", borderRadius: "10px" }}
      >
        <div className="text-center mb-4">
          <CgProfile style={{ fontSize: "100px", color: "#1995AD" }} />
          <h4 className="mt-2">{username}</h4>
          <p className="text-muted">User ID: {userId}</p>
        </div>

        <div className="d-flex flex-column gap-3">
          <div className="d-flex justify-content-between align-items-center p-2 border-bottom">
            <div>
              <p className="mb-0 text-muted">Username</p>
              {username ? (
                <input
                  ref={usernameRef}
                  type="text"
                  defaultValue={updateUsername}
                  className="form-control"
                  style={{ width: "200px" }}
                  onChange={e => setUpdateUsername(e.target.value)}
                />
              ) : (
                <p className="mb-0">{updateUsername}</p>
              )}
            </div>
            <FaPencilAlt
              style={{ color: "#1995AD", cursor: "pointer" }}
              onClick={() => handleEditClick("username")}
            />
          </div>

          <div className="d-flex justify-content-between align-items-center p-2 border-bottom">
            <div>
              <p className="mb-0 text-muted">Name</p>
              {name ? (
                <input 
                  ref={nameRef}
                  type="text"
                  defaultValue={updateName}
                  className="form-control"
                  style={{ width: "200px" }}
                  onChange={e => setUpdateName(e.target.value)}
                />
              ) : (
                <p className="mb-0">{updateName}</p>
              )}
            </div>
            <FaPencilAlt
              style={{ color: "#1995AD", cursor: "pointer" }}
              onClick={() => handleEditClick("name")}
            />
          </div>

          <div className="d-flex justify-content-between align-items-center p-2 border-bottom">
            <div>
              <p className="mb-0 text-muted">Email</p>
              {email ? (
                <input
                  ref={emailRef}
                  type="email"
                  defaultValue={updateEmail}
                  className="form-control"
                  style={{ width: "200px" }}
                  onChange={e => setUpdateEmail(e.target.value)}
                />
              ) : (
                <p className="mb-0">{updateEmail}</p>
              )}
            </div>
            <FaPencilAlt
              style={{ color: "#1995AD", cursor: "pointer" }}
              onClick={() => handleEditClick("email")}
            />
          </div>
        </div>
        <button onClick={handleChanges}
          className="btn w-100 mt-4 py-2"
          style={{ backgroundColor: "#1995AD", color: "white", border: "none" }}
        >
          Save Changes
        </button>
      </div>
    </section>
  )
}

export default UpdateProfile;
