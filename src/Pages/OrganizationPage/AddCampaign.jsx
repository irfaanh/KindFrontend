import OrgNavbar from './OrgNavbar';
import { useFormik } from "formik";
import { api } from '../../axios';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';

const AddCampaign = () => {
    const {id,organizationname} = useSelector(store => store.organization)

  const formik = useFormik({
    initialValues: {
      organizationname:organizationname,
      campaignName:"",
      image:"",
      title: "",
      description: "",
      targetAmount: "",
      collectedAmount:0,
      organizationId:id,
      email: "",
      location: "",
     
    },
    onSubmit: async (values) => {
        const trimedValue = {
            ...values,
            campaignName:values.campaignName.trim(),
            image:values.image.trim(),
            title: values.title.trim(),
            description: values.description.trim(),
            targetAmount:values.targetAmount,
            email:values.email.trim(),
            location:values.location.trim()
        }
      try {
        console.log(values); 
        await api.post("/organization/addnewcampaign",trimedValue)
        toast.success("Campaign Added");
      } catch (err) {
        console.log(err);
        return toast.error(err.message);

      }
    },
  });

  return (
    <>
      <OrgNavbar />
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
                Add New Campaign
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
                    required
                  />
                <input
                    className="form-control"
                    type="text"
                    name="image"
                    placeholder="Campaign Image"
                    style={{ borderColor: "#1995AD" }}
                    onChange={formik.handleChange}
                    value={formik.values.image}
                    required
                  />

                  <input
                    className="form-control"
                    type="text"
                    name="title"
                    placeholder="Campaign Title"
                    style={{ borderColor: "#1995AD" }}
                    onChange={formik.handleChange}
                    value={formik.values.title}
                    required
                  />

                  <textarea
                    className="form-control"
                    name="description"
                    rows="4"
                    placeholder="Details about the campaign"
                    style={{ borderColor: "#1995AD" }}
                    onChange={formik.handleChange}
                    value={formik.values.description}
                    required
                  ></textarea>

                  <input
                    className="form-control"
                    type="number"
                    name="targetAmount"
                    placeholder="Target Amount"
                    style={{ borderColor: "#1995AD" }}
                    onChange={formik.handleChange}
                    value={formik.values.targetAmount}
                    required
                  />

                  <input
                    className="form-control"
                    type="email"
                    name="email"
                    placeholder="Enter Email"
                    style={{ borderColor: "#1995AD" }}
                    onChange={formik.handleChange}
                    value={formik.values.email}
                    required
                  />

                  <input
                    className="form-control"
                    type="text"
                    name="location"
                    placeholder="Your Location"
                    style={{ borderColor: "#1995AD" }}
                    onChange={formik.handleChange}
                    value={formik.values.location}
                    required
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

export default AddCampaign;
