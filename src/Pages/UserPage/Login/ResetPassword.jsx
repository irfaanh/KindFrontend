import React from "react";
import { useFormik } from "formik";
import { api } from "../../../axios.js";
import { useNavigate, useParams } from "react-router";
import toast from "react-hot-toast";

const ResetPassword = () => {
    const { token } = useParams();
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            newPassword: "",
        },
        onSubmit: async (values) => {
            try {
                await api.post(`/user/resetpassword/${token}`, values);
                toast.success("Password updated successfully");
                navigate("/login");
            } catch (err) {
                console.error(err);
                toast.error("Error resetting password");
            }
        },
    });

    return (
        <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
            <div className="p-4 bg-white rounded shadow" style={{ width: "400px" }}>
                <h2 className="text-center mb-4" style={{ color: "#1995AD", fontSize: "40px", fontWeight: "bolder" }}>
                    Reset Password
                </h2>
                <form onSubmit={formik.handleSubmit} className="d-flex flex-column gap-3">
                    <input
                        onChange={formik.handleChange}
                        value={formik.values.newPassword}
                        className="form-control p-2"
                        style={{ borderColor: "#ddd" }}
                        type="password"
                        name="newPassword"
                        placeholder="Enter New Password"
                    />
                    <button className="btn btn-primary w-100 py-2" type="submit" style={{ backgroundColor: "#1995AD", border: "none" }}>
                        Update
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ResetPassword;
