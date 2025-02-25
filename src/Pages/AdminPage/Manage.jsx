import React from "react";
import { FaUser } from "react-icons/fa";
import { GoOrganization } from "react-icons/go";
import { Link } from "react-router";
import { MdOutlineCampaign } from "react-icons/md";

const Manage = () => {
  return (
    <section className="container mt-4 mb-4">
        
      <div className="row g-3">
        {/* Manage User */}
        
        <Link to={'/admin/manageuser'} style={{textDecoration:'none'}}>
        <div className="col-lg-12 col-md-12 col-sm-12">
          <div className="card shadow-sm">
            <div className="card-body">
              <h2
                className="mb-4"
                style={{
                  color: "#1995AD",
                  fontSize: "35px",
                  fontWeight: "bolder",
                  textAlign: "center",
                }}
              >
                Manage User
              </h2>
              <div
                className="d-flex justify-content-center align-items-center"
                style={{ fontSize: "250px", color: "#1995AD" }}
              >
                <FaUser />
              </div>
            </div>
          </div>
        </div>
        </Link>

           {/* Manage Organization */}
           <Link to={'/admin/manageorganization'} style={{textDecoration:'none'}}>
        <div className="col-lg-12 col-md-12 col-sm-12">
          <div className="card shadow-sm">
            <div className="card-body">
              <h2
                className="mb-4"
                style={{
                  color: "#1995AD",
                  fontSize: "35px",
                  fontWeight: "bolder",
                  textAlign: "center",
                }}
              >
                Manage Organization
              </h2>
              <div
                className="d-flex justify-content-center align-items-center"
                style={{ fontSize: "250px", color: "#1995AD" }}
              >
                <GoOrganization />
              </div>
            </div>
          </div>
        </div>
        </Link>

        {/* Manage Campaign */}
        <Link to={'/admin/managecampaigndetails'} style={{textDecoration:'none'}}>
        <div className="col-lg-12 col-md-12 col-sm-12">
          <div className="card shadow-sm">
            <div className="card-body">
              <h2
                className="mb-4"
                style={{
                  color: "#1995AD",
                  fontSize: "35px",
                  fontWeight: "bolder",
                  textAlign: "center",
                }}
              >
                Manage Campaign
              </h2>
              <div
                className="d-flex justify-content-center align-items-center"
                style={{ fontSize: "250px", color: "#1995AD" }}
              >
                <MdOutlineCampaign />
              </div>
            </div>
          </div>
        </div>
        </Link>
      </div>
    </section>
  );
};

export default Manage;
