import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Hero.css"; // Optional CSS file for custom styles
import { useSelector } from 'react-redux'


const Hero = () => {

  const {id,name, username} = useSelector(store => store.user)


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
            <a href="#campaigns"><button className="cont_btn">View campaigns</button></a>
            
          </div>
          <div className="col-lg-6 text-md-center text-sm-center">
            <img
              className="center_img mw-100"
              src="/images/center_img-removebg-preview.png"
              alt=""
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
