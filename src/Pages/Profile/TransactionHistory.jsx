import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { api } from "../../axios";
import "bootstrap/dist/css/bootstrap.min.css";

const TransactionHistory = () => {
  const [campaignDonationHistory, setCampaignDonationHistory] = useState([]);
  const { id: userId } = useSelector((store) => store.user);

  const getUserTransactionHistory = async () => {
    try {
      const { data } = await api.get("/user/getusertransactiondetails", {
        params: { userId },
      });
      console.log(data);
      setCampaignDonationHistory(data.result);
    } catch (err) {
      console.error("Error fetching campaign donation details:", err);
    }
  };

  useEffect(() => {
    getUserTransactionHistory();
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

        {/* Transaction History Table */}
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
            <p className="fs-4 text-dark">No donation history found.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default TransactionHistory;
