import React from "react";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import { api } from "../../../axios.js";
import { useNavigate } from "react-router";
import {useDispatch} from 'react-redux'
import { createUser } from "../../../Redux/UserSlice.js";

const Login = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    onSubmit: async (values) => {
      try {
        const { data } = await api.get("/user/login", { params: values });
        localStorage.setItem("access_token", data.token);
        localStorage.setItem("role",data.user.role)
        dispatch(createUser(data.user));
        console.log(data.user.role);


        toast.success("Logged In");
        navigate("/");
      } catch (err) {
        toast.error(err.message || "User is Blocked");
        console.log(err);
      }
    },
  });

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="p-4 bg-white rounded shadow" style={{ width: "400px" }}>
        <h2 className="text-center mb-4" style={{ color: "#1995AD", fontSize:'40px', fontWeight:'bolder'}}>
          Log in
        </h2>
        <form onSubmit={formik.handleSubmit} className="d-flex flex-column gap-3">
          <input
            onChange={formik.handleChange}
            value={formik.values.username}
            className="form-control p-2"
            style={{ borderColor: "#ddd" }}
            type="text"
            name="username"
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
          <a href="/forget-password" style={{ color: "#1995AD", textDecoration: "none" }}>
            Forgot password?
          </a>
        </div>
        <div className="mt-4 text-center">
          <span className="text-muted">New to Kind? </span>
          <a href="/signup" style={{ color: "#1995AD", textDecoration: "none" }}>
            Join now
          </a>
        </div>
        <hr />
        <div className="mt-4 text-center">
          <span className="text-muted">Organization ? </span>
          <a href="/organization/organizationlogin" style={{ color: "#1995AD", textDecoration: "none" }}>
            login
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;
