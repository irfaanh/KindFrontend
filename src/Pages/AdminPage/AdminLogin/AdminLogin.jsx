import React from "react";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import { api } from "../../../axios.js";
import { useNavigate } from "react-router";

const AdminLogin = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    onSubmit: async (values) => {
      try {
        const { data } = await api.get("/admin/login", { params: values });
        console.log(data.token);
        
        localStorage.setItem("access_token", data.token);
        localStorage.setItem("role", data.Admin.role);

        toast.success("Logged In");
        setTimeout(() => {
          navigate("/admin");
        }, 200);
      } catch (err) {
        toast.error("Login failed");
        console.log(err);
      }
    },
  });

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="p-4 bg-white rounded shadow" style={{ width: "400px" }}>
        <h2 className="text-center mb-4" style={{ color: "#1995AD", fontSize:'40px', fontWeight:'bolder'}}>
          Admin Login
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
      </div>
    </div>
  );
};

export default AdminLogin;
