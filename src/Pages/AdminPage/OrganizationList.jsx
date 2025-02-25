import React, { useEffect, useState } from "react";
import { api } from "../../axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaInfoCircle } from "react-icons/fa";
import { Link, useNavigate } from "react-router";


const OrganizationList = () => {
  const [organizationList, setOrganizationList] = useState([]);
  const navigate = useNavigate()

  
  const getOrganizationList = async () => {
    try {
      const { data } = await api.get("/admin/getorganizationdetail");
      console.log(data);
      setOrganizationList(data?.organizationDetail?.[0]?.allOrganization);
    } catch (err) {
      console.error("Error fetching campaign donation details:", err);
    }
  };
  console.log(organizationList);
  

  useEffect(() => {
    getOrganizationList();
  }, []);

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
        <h1 className="text-center mb-4 text-white">Organization Details</h1>
          {organizationList.map((organization, index) => (
            <div
              key={index}
              className="row text-center align-items-center py-3 bg-white border rounded-3 mb-4 shadow-sm"
              style={{
                minHeight: "150px",
              }}
            >
              <div className="col text-start">
                <h3 className="text-primary">User #{index + 1}</h3>
                <ul className="list-unstyled mb-0">
                  <li>
                    <strong>User ID :</strong> {organization._id}
                  </li>
                  <li>
                    <strong>Username :</strong> {organization.organizationname}
                  </li>
                  <li>
                    <strong>Email :</strong> {organization.email}
                  </li>
                </ul>
                <button style={{border:'none', backgroundColor:'white'}}
                onClick={()=>navigate(`/admin/updateorganization/${organization._id}`,{state:organization})}>
                    <FaInfoCircle style={{fontSize:'20px', color:'black'}}/>
                </button>
                
              </div>
            </div>
          ))}
        
      </div>
    </section>
  );
};

export default OrganizationList;
