import React from "react";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import { api } from "../../axios.js";
import { useNavigate } from "react-router";
import {useDispatch} from 'react-redux'
import { createOrganization } from "../../Redux/OrganizationSlice.js";

const OrgLogin = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      organizationname: "",
      password: "",
    },
    onSubmit: async (values) => {
      try {
        const { data } = await api.get("/organization/login", { params: values });
        localStorage.setItem("access_token", data.token);
        console.log(data);
        
        localStorage.setItem("role", data.organization.role);
        console.log(data.organization.role);

        dispatch(createOrganization(data.organization));

        toast.success("Logged In");
        navigate("/organization");
      } catch (err) {
        toast.error(err.message);
        console.log(err);
      }
    },
  });

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="p-4 bg-white rounded shadow" style={{ width: "400px" }}>
        <h2 className="text-center mb-4" style={{ color: "#1995AD", fontSize:'30px', fontWeight:'bolder'}}>
          Organization Details
        </h2>
        <form onSubmit={formik.handleSubmit} className="d-flex flex-column gap-3">
          <input
            onChange={formik.handleChange}
            value={formik.values.organizationname}
            className="form-control p-2"
            style={{ borderColor: "#ddd" }}
            type="text"
            name="organizationname"
            placeholder="Enter Username"
          />
          <input
            onChange={formik.handleChange}
            value={formik.values.password}
            className="form-control p-2"
            style={{ borderColor: "#ddd" }}
            type="password"
            name="password"
            placeholder="Password"
          />
          <button
            className="btn btn-primary w-100 py-2"
            type="submit"
            style={{ backgroundColor: "#1995AD", border: "none" }}
          >
            Sign in
          </button>
        </form>
        <div className="mt-3 text-center">
          <a href="/organization/forgetorg-password" style={{ color: "#1995AD", textDecoration: "none" }}>
            Forgot password?
          </a>
        </div>
      </div>
    </div>
  );
};

export default OrgLogin;
