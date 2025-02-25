import React from "react";
import { useFormik } from "formik";
import { api } from "../../../axios.js";
import toast from "react-hot-toast";


const ForgetPassord = () => {


  const formik = useFormik({
    initialValues: {
      email: "",
    },
    onSubmit: async (values) => {
      try {
        await api.post("/user/forgetpassword", { values });
        return toast.success("Rest link send successful")

      } catch (err) {
        console.log(err);
        return toast.error("Error on sending link")

      }
    },
  });

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="p-4 bg-white rounded shadow" style={{ width: "400px" }}>
        <h2 className="text-center mb-4" style={{ color: "#1995AD", fontSize:'40px', fontWeight:'bolder'}}>
          Forget Password
        </h2>
        <form onSubmit={formik.handleSubmit} className="d-flex flex-column gap-3">

          <input
            onChange={formik.handleChange}
            value={formik.values.email}
            className="form-control p-2"
            style={{ borderColor: "#ddd" }}
            type="email"
            name="email"
            placeholder="Enter Email"
          />
          <button
            className="btn btn-primary w-100 py-2"
            type="submit"
            style={{ backgroundColor: "#1995AD", border: "none" }}
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgetPassord;
