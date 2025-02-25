import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./CampaignMoreDetails.css"; 
import { api } from "../../axios";
import { data, useParams } from "react-router";

const CampaignMoreDetails = () => {
  const [campaignDetails, setCampaignDetails] = useState(null);
  const { id } = useParams();

  const getMoreCampaignDetails = async () => {
    try {
      const { data } = await api.get("/user/getcampaigndetails", { params: { id } });
      console.log(data);
      setCampaignDetails(data.campDetails); 
    } catch (error) {
      console.error("Error fetching campaign details:", error);
    }
  };

  useEffect(() => {
    getMoreCampaignDetails();
  }, [campaignDetails]);

  if (!campaignDetails) {
    return <p className="text-white text-center">Loading...</p>; 
  }

  return (
    <section
      id="campaigns"
      className="py-5 d-flex justify-content-center align-items-center"
      style={{ backgroundColor: "#1995AD", minHeight: "100vh" }}
    >
      <div className="container py-4">
        <h1 className="text-center mb-4 text-white">More About Campaign</h1>
        
        <div className="row text-center align-items-center py-4 bg-white border rounded-3 mb-4 shadow-sm"
          style={{ minHeight: "500px" }}>
          <div className="col-lg-4">
            <img
              className="campaign_image mw-100 rounded"
              src={campaignDetails.image}
              alt={campaignDetails.title}
              style={{ maxHeight: "250px", objectFit: "cover" }}
            />
          </div>
          <div className="col-lg-8 text-start">
            <h2 className="campaign_head py-1">{campaignDetails.title}</h2>
            <p className="campaign_p">{campaignDetails.description}</p>
            <ul className="list-unstyled mb-0">
              <li><strong>Target Amount:</strong> ${campaignDetails.targetAmount}</li>
              <li><strong>Collected Amount:</strong> ${campaignDetails.collectedAmount}</li>
              <li><strong>Email:</strong> <a href={`mailto:${campaignDetails.email}`}>{campaignDetails.email}</a></li>
              <li><strong>Location:</strong> {campaignDetails.location || "Not Specified"}</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CampaignMoreDetails;
