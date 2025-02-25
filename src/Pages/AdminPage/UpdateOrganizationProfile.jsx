import React, { useEffect, useRef, useState } from "react";
import { CgProfile } from "react-icons/cg";
import { useSelector } from "react-redux";
import { FaPencilAlt } from "react-icons/fa";
import { api } from "../../axios";
import { toast } from "react-hot-toast";
import { useLocation, useParams } from "react-router";

const UpdateOrganizationProfile = () => {
  const [organizationDetails, setOrganizationDetails] = useState([]);
  console.log(organizationDetails);
  
//   const { id, } = useSelector((store) => store.organization);
  const { id: orgId } = useParams();
  const {state} = useLocation()

  const [updateOrganizationName, setUpdateOrganizationName] = useState(state?.organizationname);
  const [updateName, setUpdateName] = useState(state?.name);
  const [updateEmail, setUpdateEmail] = useState(state?.email);

  const organizationnameRef = useRef(null);
  const nameRef = useRef(null);
  const emailRef = useRef(null);

  const handleEditClick = (field) => {
    if (field === "organizationname") organizationnameRef.current.focus();
    if (field === "name") nameRef.current.focus();
    if (field === "email") emailRef.current.focus();
  };

  const handleChanges = async () => {
    try {
      const response = await api.patch(
        "/organization/update",
        { name: updateName, organizationname: updateOrganizationName, email: updateEmail },
        { params: { orgId } }
      );

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

  const getOrganizationDetail = async () => {
    try {
      const { data } = await api.get("/admin/organizationdetails", { params: { orgId } });
      setOrganizationDetails(data.result || []);
    } catch (err) {
      console.error("Error fetching organization data:", err);
    }
  };
  console.log(organizationDetails);
  

  useEffect(() => {
    getOrganizationDetail();
  }, []);

  return (
    <section className="bg-light vh-100 d-flex justify-content-center align-items-center">
      {organizationDetails && organizationDetails.length > 0 ? (
        organizationDetails.map((organization, index) => (
          <div
            key={index}
            className="p-4 bg-white rounded shadow-sm"
            style={{ width: "500px", borderRadius: "10px" }}
          >
            <div className="text-center mb-4">
              <CgProfile style={{ fontSize: "100px", color: "#1995AD" }} />
              <h4 className="mt-2">{ organization.organizationname}</h4>
              <p className="text-muted">User ID: {orgId}</p>
            </div>

            <div className="d-flex flex-column gap-3">
              {/* Organization Name */}
              <div className="d-flex justify-content-between align-items-center p-2 border-bottom">
                <div>
                  <p className="mb-0 text-muted">Organization Name</p>
                  <input
                    ref={organizationnameRef}
                    type="text"
                    defaultValue={updateOrganizationName}
                    className="form-control"
                    style={{ width: "200px" }}
                    onChange={(e) => setUpdateOrganizationName(e.target.value)}
                  />
                </div>
                <FaPencilAlt
                  style={{ color: "#1995AD", cursor: "pointer" }}
                  onClick={() => handleEditClick("organizationname")}
                />
              </div>

              {/* Name */}
              <div className="d-flex justify-content-between align-items-center p-2 border-bottom">
                <div>
                  <p className="mb-0 text-muted">Name</p>
                  <input
                    ref={nameRef}
                    type="text"
                    defaultValue={updateName}
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
                    defaultValue={updateEmail}
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
        <p className="text-muted">No organization details available.</p>
      )}
    </section>
  );
};

export default UpdateOrganizationProfile;
