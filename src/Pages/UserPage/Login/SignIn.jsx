import React from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { api } from "../../../axios.js";
import { useDispatch } from "react-redux";
import { createUser } from "../../../Redux/UserSlice.js";
import { useFormik } from "formik";

function SignUp() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      name: "",
      username: "",
      email: "",
      password: "",
      confirm_password: "",
    },
    onSubmit: async (values) => {
      try {
        const { data } = await api.post("/user/signup", values);
        console.log(values);
        console.log(data);
        console.log(data.user.role);

        localStorage.setItem("access_token", data.token);
        localStorage.setItem("role",data.user.role)
        dispatch(createUser(data.user));
        toast.success("Account Created");
        navigate("/");
      } catch (err) {
        console.log(err);
        return toast.error("Invalid Credential");
      }
    },
  });

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="p-4 bg-white rounded shadow" style={{ width: "400px" }}>
        <h2 className="text-center mb-4" style={{ color: "#1995AD", fontSize:'40px', fontWeight:'bolder'}}>
          Join To Kind
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
            value={formik.values.username}
            className="form-control p-2"
            style={{ borderColor: "#ddd" }}
            type="text"
            name="username"
            placeholder="Username"
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
          <a href="/login" style={{ color: "#1995AD", textDecoration: "none" }}>
            Sign in
          </a>
        </div>
        <hr />
        <div className="mt-4 text-center">
          <span className="text-muted">Sign in as organization ?  </span>
          <a href="/organization/organizationsignup" style={{ color: "#1995AD", textDecoration: "none" }}>
            Sign in
          </a>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
