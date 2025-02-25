import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./OrgHero.css";
import { useSelector } from 'react-redux'
import { Link } from "react-router";


const OrgHero = () => {



  return (
    <section>
      {/* <div>{id}</div>
      <div>{name}</div>
      <div>{username}</div> */}
            <div className="container vh-100 d-flex flex-column justify-content-center">
        <div className="row align-items-center">
          <div className="col-lg-6 text-md-center text-sm-center">
            <h1 className="cont_head">Make a Difference</h1>
            <p className="cont_p">
              Every donation, no matter how small, brings hope to someone in need.
            </p>
            <Link to={'/organization/addnewcampaign'}>
                <button className="cont_btn">Add Campaigns</button>
            </Link>
            
          </div>
          <div className="col-lg-6 text-md-center text-sm-center">
            <img
              className="center_img mw-100"
              src="/images/orghome2.webp"
              alt=""
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default OrgHero;
