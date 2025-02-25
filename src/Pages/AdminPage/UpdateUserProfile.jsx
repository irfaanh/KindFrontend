import React, { useEffect, useRef, useState } from "react";
import { CgProfile } from "react-icons/cg";
import { useDispatch, useSelector } from "react-redux";
import { FaPencilAlt } from "react-icons/fa";
import { api } from "../../axios";
import { toast } from "react-hot-toast";
import {  useLocation, useParams } from "react-router";
import { createUser } from "../../Redux/UserSlice";

const UpdateUserProfile = () => {
  const [userDetails, setUserDetails] = useState([]);
  
//   const { id } = useSelector((store) => store.user);
  const { id: userId } = useParams();
  const {state} = useLocation()
  const dispatch = useDispatch()
  

  const [updateUsername, setUpdateUsername] = useState(state.username);
  const [updateName, setUpdateName] = useState(state.name);
  const [updateEmail, setUpdateEmail] = useState(state.email);

  const usernameRef = useRef(null);
  const nameRef = useRef(null);
  const emailRef = useRef(null);

  const handleEditClick = (field) => {
    if (field === "username") usernameRef.current.focus();
    if (field === "name") nameRef.current.focus();
    if (field === "email") emailRef.current.focus();
  };

  const handleChanges = async () => {
    try {
      const response = await api.patch(
        "/user/update",
        { name: updateName, username: updateUsername, email: updateEmail },
        { params: { userId } }
      );
      dispatch(createUser(response.data.updatedValuer))
      if (response.status === 200) {
        toast.success(response.data.message || "Details Updated Successfully");
      } else {
        toast.error(response.data.message || "Failed to Update details");
      }
    } catch (error) {
      console.error("Error :", error);
      toast.error("Failed to update details");
    }
  };

  const getUserDetail = async () => {
    try {
      const { data } = await api.get("/admin/userdetails", { params: { userId } });
      setUserDetails(data.result);
    } catch (err) {
      console.error("Error fetching user data:", err);
    }
  };
  
  useEffect(() => {
    getUserDetail();
  }, []);

  console.log(userDetails);

  


  return (
    <section className="bg-light vh-100 d-flex justify-content-center align-items-center">
      {userDetails && userDetails.length > 0 ? (
        userDetails.map((user, index) => (
          <div
            key={index}
            className="p-4 bg-white rounded shadow-sm"
            style={{ width: "500px", borderRadius: "10px" }}
          >
            <div className="text-center mb-4">
              <CgProfile style={{ fontSize: "100px", color: "#1995AD" }} />
              <h4 className="mt-2">{user.username}</h4>
              <p className="text-muted">User ID: {userId}</p>
            </div>

            <div className="d-flex flex-column gap-3">
              {/* Username */}
              <div className="d-flex justify-content-between align-items-center p-2 border-bottom">
                <div>
                  <p className="mb-0 text-muted">Username</p>
                  <input
                    ref={usernameRef}
                    type="text"
                    value={updateUsername}
                    className="form-control"
                    style={{ width: "200px" }}
                    onChange={(e) => setUpdateUsername(e.target.value)}
                  />
                </div>
                <FaPencilAlt
                  style={{ color: "#1995AD", cursor: "pointer" }}
                  onClick={() => handleEditClick("username")}
                />
              </div>

              {/* Name */}
              <div className="d-flex justify-content-between align-items-center p-2 border-bottom">
                <div>
                  <p className="mb-0 text-muted">Name</p>
                  <input
                    ref={nameRef}
                    type="text"
                    value={updateName}
                    className="form-control"
                    style={{ width: "200px" }}
                    onChange={(e) => setUpdateName(e.target.value)}
                  />
                </div>
                <FaPencilAlt
                  style={{ color: "#1995AD", cursor: "pointer" }}
                  onClick={() => handleEditClick("name")}
                />
              </div>

              {/* Email */}
              <div className="d-flex justify-content-between align-items-center p-2 border-bottom">
                <div>
                  <p className="mb-0 text-muted">Email</p>
                  <input
                    ref={emailRef}
                    type="email"
                    value={updateEmail}
                    className="form-control"
                    style={{ width: "200px" }}
                    onChange={(e) => setUpdateEmail(e.target.value)}
                  />
                </div>
                <FaPencilAlt
                  style={{ color: "#1995AD", cursor: "pointer" }}
                  onClick={() => handleEditClick("email")}
                />
              </div>
            </div>

            <button
              onClick={handleChanges}
              className="btn w-100 mt-4 py-2"
              style={{ backgroundColor: "#1995AD", color: "white", border: "none" }}
            >
              Save Changes
            </button>
          </div>
        ))
      ) : (
        <p className="text-muted">No user details available.</p>
      )}
    </section>
  );
};

export default UpdateUserProfile;
