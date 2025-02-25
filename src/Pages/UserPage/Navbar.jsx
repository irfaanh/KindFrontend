import React from "react";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import './Navbar.css';
import { Link } from "react-router-dom";
import {useSelector} from 'react-redux'
import { CgProfile } from "react-icons/cg";

const Navbar = () => {
  const {id} = useSelector(store => store.user)

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-white px-3 border border-2">
        <div className="container-fluid">
          <div className="logodiv">
            <img
              className="logoimg"
              src="/images/logo_kind-removebg-preview copy.png"
              alt="logo"
            />
          </div>
          <div className="toggleicon">
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
          </div>
        </div>

        <div className="navlink px-3">
          <div className="collapse navbar-collapse content" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link" href="#campaigns">
                  Campaigns
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#contact">
                  Contact
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#about">
                  About
                </a>
              </li>
            </ul>
            {id ? <Link to={'/profilesection'}><CgProfile  className="profile"/></Link> : <div className="navbtn">
              <Link to={'/login'}>
                <button className="logbtn">Login</button>
              </Link>
              <Link to={'/signup'}>
                <button className="logbtn">Signup</button>
              </Link> 
            </div> }

          </div>

        </div>
      </nav>
    </>
  );
};

export default Navbar;
