import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./ViewCampaignDetForOrg.css"; 
import { api } from "../../axios";
import { useParams } from "react-router";

const ViewCampaignDetForOrg = () => {
  const [campaignDetailsForOrg, setCampaignDetailsForOrg] = useState([]);
  const { id } = useParams();

  const getMoreCampaignDetails = async () => {
    try {
      const { data } = await api.get("/organization/getcampaigndetailsfororg", { params: { id } });
      console.log(data);
      setCampaignDetailsForOrg([data.campDetailsForOrg]); 
    } catch (error) {
      console.error("Error fetching campaign details:", error);
    }
  };

  useEffect(() => {
    getMoreCampaignDetails();
  }, []);

  return (
    <section
      id="campaigns"
      className="py-5 d-flex justify-content-center align-items-center"
      style={{
        backgroundColor: "#1995AD",
        minHeight: "100vh", 
      }}
    >
      <div className="container py-4">
        
      <h1 className="text-center mb-4 text-white">More About Campaign</h1>

        {campaignDetailsForOrg.map((details, index) => (
          <div
            key={index}
            className="row text-center align-items-center py-4 bg-white border rounded-3 mb-4 shadow-sm"
            style={{
              minHeight: "500px", // Adjust the minimum height of the div
            }}
          >
            <div className="col-lg-4">
              <img
                className="campaign_image mw-100 rounded"
                src={details.image}
                alt={details.title}
                style={{
                  maxHeight: "250px", // Ensure consistent image height
                  objectFit: "cover",
                }}
              />
            </div>
            <div className="col-lg-8 text-start">
              <h2 className="campaign_head py-1">{details.title}</h2>
              <p className="campaign_p">{details.description}</p>
              <ul className="list-unstyled mb-0">
                <li>
                    <strong>Campaign Name:</strong>{details.campaignName}
                </li>
                <li>
                  <strong>Target Amount:</strong> ${details.targetAmount}
                </li>
                <li>
                  <strong>Collected Amount:</strong> ${details.collectedAmount}
                </li>
                <li>
                  <strong>Email:</strong>{" "}
                  <a href={`mailto:${details.email}`}>{details.email}</a>
                </li>
                <li>
                  <strong>Location:</strong> {details.location || "Not Specified"}
                </li>
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ViewCampaignDetForOrg;
