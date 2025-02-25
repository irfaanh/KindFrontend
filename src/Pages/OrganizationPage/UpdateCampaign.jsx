import React from 'react';
import { useFormik } from "formik";
import { api } from '../../axios';
import toast from 'react-hot-toast';
import { useLocation, useParams } from 'react-router';

const UpdateCampaign = () => {
    const {id} = useParams()
    const {state} = useLocation()
    console.log(state);
    

  const formik = useFormik({
    initialValues: {
      campaignName:state?.campaignName,
      image:state?.image,
      title: state?.title,
      description: state?.description,
      targetAmount: state?.targetAmount,
      email: state?.email,
      location: state?.location,
     
    },
    onSubmit: async (values) => {
        const trimedValue = {
            ...values,
            campaignName:values.campaignName.trim(),
            image:values.image.trim(),
            title: values.title.trim(),
            description: values.description.trim(),
            targetAmount:values.targetAmount.trim(),
            email:values.email.trim(),
            location:values.location.trim()
        }
      try {
        console.log(values); 
        await api.patch("/organization/updatecampaign",trimedValue,{params:{id}})
        toast.success("Campaign Added");
      } catch (err) {
        console.log(err);
        return toast.error(err.message);

      }
    },
  });

  return (
    <>
      <section
        id="contact"
        style={{
          backgroundColor: "#f8f9fa",
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div className="container py-4">
          <div className="row">
            <div className="col text-center d-flex flex-column align-items-center">
              <h2 style={{ color: "#1995AD", fontWeight: "bold" }}>
                Update Campaign
              </h2>
              <p className="text-muted mb-4">
                Provide accurate and genuine information. It helps donors build trust.
              </p>
              <div className="d-flex flex-column gap-3 w-50 bg-white p-4 rounded shadow">
                <form onSubmit={formik.handleSubmit} className="d-flex flex-column gap-3">
                <input
                    className="form-control"
                    type="text"
                    name="campaignName"
                    placeholder="Campaign Name"
                    style={{ borderColor: "#1995AD" }}
                    onChange={formik.handleChange}
                    value={formik.values.campaignName}
                  />
                <input
                    className="form-control"
                    type="text"
                    name="image"
                    placeholder="Campaign Image"
                    style={{ borderColor: "#1995AD" }}
                    onChange={formik.handleChange}
                    value={formik.values.image}
                  />

                  <input
                    className="form-control"
                    type="text"
                    name="title"
                    placeholder="Campaign Title"
                    style={{ borderColor: "#1995AD" }}
                    onChange={formik.handleChange}
                    value={formik.values.title}
                  />

                  <textarea
                    className="form-control"
                    name="description"
                    rows="4"
                    placeholder="Details about the campaign"
                    style={{ borderColor: "#1995AD" }}
                    onChange={formik.handleChange}
                    value={formik.values.description}
                  ></textarea>

                  <input
                    className="form-control"
                    type="number"
                    name="targetAmount"
                    placeholder="Target Amount"
                    style={{ borderColor: "#1995AD" }}
                    onChange={formik.handleChange}
                    value={formik.values.targetAmount}
                  />

                  <input
                    className="form-control"
                    type="email"
                    name="email"
                    placeholder="Enter Email"
                    style={{ borderColor: "#1995AD" }}
                    onChange={formik.handleChange}
                    value={formik.values.email}
                  />

                  <input
                    className="form-control"
                    type="text"
                    name="location"
                    placeholder="Your Location"
                    style={{ borderColor: "#1995AD" }}
                    onChange={formik.handleChange}
                    value={formik.values.location}
                  />

                  <button
                    type="submit"
                    className="btn btn-primary"
                    style={{
                      backgroundColor: "#1995AD",
                      border: "none",
                      padding: "10px 20px",
                    }}
                  >
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default UpdateCampaign;
