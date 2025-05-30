import React from "react";
import toast from "react-hot-toast";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { api } from "../../axios.js";
import { useDispatch } from "react-redux";
import { createOrganization } from "../../Redux/OrganizationSlice.js";

function OrgSignUp() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      name: "",
      organizationname: "",
      email: "",
      password: "",
    },
    onSubmit: async (values) => {
      try {
        const { data } = await api.post("/organization/signup", values);
        console.log(values);
        console.log(data);

        localStorage.setItem("access_token", data.token);
        localStorage.setItem("role", data.organization.role);
        console.log(data.organization.role);
        dispatch(createOrganization(data.organization));
        toast.success("Account Created");
        navigate("/organization");
      } catch (err) {
        return toast.error(err.message);
      }
    },
  });

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="p-4 bg-white rounded shadow" style={{ width: "400px" }}>
        <h2 className="text-center mb-4" style={{ color: "#1995AD", fontSize:'40px', fontWeight:'bolder'}}>
        Organization Details
        </h2>
        <form onSubmit={formik.handleSubmit} className="d-flex flex-column gap-3">
          <input
            onChange={formik.handleChange}
            value={formik.values.name}
            className="form-control p-2"
            style={{ borderColor: "#ddd" }}
            type="text"
            name="name"
            placeholder="Name"
          />
          <input
            onChange={formik.handleChange}
            value={formik.values.organizationname}
            className="form-control p-2"
            style={{ borderColor: "#ddd" }}
            type="text"
            name="organizationname"
            placeholder="organization Name"
          />
          <input
            onChange={formik.handleChange}
            value={formik.values.email}
            className="form-control p-2"
            style={{ borderColor: "#ddd" }}
            type="email"
            name="email"
            placeholder="Email Address"
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
            Agree & Join
          </button>
        </form>

        <div className="mt-4 text-center">
          <span className="text-muted">Already have an account? </span>
          <a href="/organization/organizationlogin" style={{ color: "#1995AD", textDecoration: "none" }}>
            Sign in
          </a>
        </div>
      </div>
    </div>
  );
}

export default OrgSignUp;
