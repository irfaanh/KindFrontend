import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { api } from "../../axios";
import { Bar } from "react-chartjs-2";
import {Chart as ChartJS} from 'chart.js/auto'
import { FaUser } from "react-icons/fa6";
import { GoOrganization } from "react-icons/go";
import { Link } from "react-router";


const AdminDashboard = () => {
    const [campaignData,setCampaignData] = useState([])
    const [userDonation,setUserDonation] = useState([])

    const fetchCampaignDonationSum = async () => {
        try{
            const {data} = await api.get('/admin/getdonationsumofcampaign')
            setCampaignData(data.result)
        }catch(err){
            console.error("Error fetching donation data:", err);
            
        }
    }
    console.log(campaignData)
    
    useEffect(()=>{
        fetchCampaignDonationSum()
    },[])


    const chartData1 = {
        labels: campaignData.map(item => item._id),
        datasets: [
            {
                label: "Total Donation",
                data: campaignData.map(item => item.totalAmount),
                backgroundColor: "rgba(75, 192, 75, 1)",
                borderColor: "rgba(75, 192, 75, 1)",
                borderWidth: 1,
            }
        ]
    }

    const options1 = {
        responsive: true,
        plugins: {
          legend: { position: "top" },
          title: { display: true, text: "Donations by Date" },
        },
        scales: {
          x: { title: { display: true, text: "Campaigns" } },
          y: { title: { display: true, text: "Total Amount ($)" } },
        },
      };


    //   Secong Graph
  
      const fetchUserDonation = async () => {
        try{
            const {data} = await api.get('/admin/getuserdonationsum')
            setUserDonation(data.result)
        }catch(err){
            console.error("Error fetching donation data:", err);
            
        }
    }
    console.log(userDonation)
    
    useEffect(()=>{
        fetchUserDonation()
    },[])


    const chartData2 = {
        labels: userDonation.map(item => item._id),
        datasets: [
            {
                label: "Total Donation",
                data: userDonation.map(item => item.totalAmount),
                backgroundColor: "rgba(54, 162, 235, 0.8)",
                borderColor: "rgba(54, 162, 235, 1)", 

                borderWidth: 1,
            }
        ]
    }

    const options2 = {
        responsive: true,
        plugins: {
          legend: { position: "top" },
          title: { display: true, text: "Donations by Date" },
        },
        scales: {
          x: { title: { display: true, text: "User ID" } },
          y: { title: { display: true, text: "Total Donated ($)" } },
        },
      };

  return (
    <>
    <section className="vh-auto mb-4" style={{ backgroundColor: "#f8f9fa" }}>
      <div className="container-fluid h-100">
        <div className="row h-100">
          {/* First Column */}
          <div className="col-lg-6 col-md-12 col-sm-12">
            <div className="card shadow-sm mt-2 ms-2" style={{ height: "490px" }}>
                <div className="card-body d-flex flex-column">
                <h2
                    className="mb-4"
                    style={{
                    color: "#1995AD",
                    fontSize: "35px",
                    fontWeight: "bolder",
                    textAlign: "center",
                    }}
                >
                    Campaign Collections
                </h2>
                <div style={{ flex: 1, overflowY: "auto" }}>
                    {campaignData.length > 0 ? (
                    <Bar data={chartData1} options={options1}/>
                    ) : (
                    <p className="text-center">No donation data available.</p>
                    )}
                </div>
                </div>
            </div>
            </div>

          {/* Second Column */}
          <div className="col-lg-6 clol-md-8 col-sm-12">
            <div className="card shadow-sm mt-2 ms-2" style={{ height: "490px" }}>
              <div className="card-body d-flex flex-column">
                <h2
                  className="mb-4"
                  style={{
                    color: "#1995AD",
                    fontSize: "35px",
                    fontWeight: "bolder",
                    textAlign:'center'
                  }}
                >
                  User Donation Total
                </h2>
                <div style={{ flex: 1, overflowY: "auto" }}>
                    {campaignData.length > 0 ? (
                    <Bar data={chartData2} options={options2}/>
                    ) : (
                    <p className="text-center">No donation data available.</p>
                    )}
                </div>
                </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    
    </>
  );
};

export default AdminDashboard;
