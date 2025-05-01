import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import { api } from "../../axios";
import "bootstrap/dist/css/bootstrap.min.css";

const DonationHistory = () => {
  const [campaignDonationHistory, setCampaignDonationHistory] = useState([]);
  const { id: userId } = useSelector((store) => store.user);
  const { id: campaignId } = useParams();

  const getCampaignDonationHistory = async () => {
    try {
      const { data } = await api.get("/donation/donationhistory", {
        params: { userId, campaignId },
      });
      setCampaignDonationHistory(data.result);
    } catch (err) {
      console.error("Error fetching campaign donation details:", err);
    }
  };

  useEffect(() => {
    getCampaignDonationHistory();
    // Remove donationHistory from dependency to avoid infinite loop
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
      <div className="container py-4 bg-white rounded shadow">
        <h1 className="text-center mb-4 text-dark">Donation History</h1>
        {campaignDonationHistory.length > 0 ? (
          <div className="table-responsive">
            <table className="table table-bordered table-hover text-center">
              <thead className="table-primary">
                <tr>
                  <th>No</th>
                  <th>Amount</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {campaignDonationHistory.map((donation, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>${donation.amount}</td>
                    <td>{donation.donationDate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
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
