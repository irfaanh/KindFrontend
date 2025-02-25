import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import { api } from "../../axios";
import "bootstrap/dist/css/bootstrap.min.css";

const DonationHistory = () => {
  const [campaignDonationHistory, setCampaignDonationHistory] = useState([]);
  const { id :userId } = useSelector((store) => store.user);
  const { id : campaignId} = useParams();

  console.log(campaignId);
  
  const getCampaignDonationHistory = async () => {
    try {
      const { data } = await api.get("/donation/donationhistory", {
        params: { userId, campaignId },
      });
      console.log(data);
      setCampaignDonationHistory(data.result);
    } catch (err) {
      console.error("Error fetching campaign donation details:", err);
    }
  };
  console.log(campaignDonationHistory);
  

  useEffect(() => {
    getCampaignDonationHistory();
  }, [campaignDonationHistory]);

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
        <h1 className="text-center mb-4 text-white">Donation History</h1>
        {campaignDonationHistory.length > 0 ? (
          campaignDonationHistory.map((donation, index) => (
            <div
              key={index}
              className="row text-center align-items-center py-3 bg-white border rounded-3 mb-4 shadow-sm"
              style={{
                minHeight: "150px",
              }}
            >
              <div className="col text-start">
                <h3 className="text-primary">Donation #{index + 1}</h3>
                <ul className="list-unstyled mb-0">
                  <li>
                    <strong>Amount:</strong> ${donation.amount}
                  </li>
                  <li>
                    <strong>Date:</strong> {donation.donationDate}
                  </li>
                </ul>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center">
            <p className="text-white fs-4">No donation history found.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default DonationHistory;
