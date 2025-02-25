import React, { useEffect, useState } from 'react'
import {Bar} from 'react-chartjs-2'
import {Chart as ChartJS} from 'chart.js/auto'
import { api } from '../../axios'
import { useParams } from 'react-router'

const ViewCampChart = () => {
    const [donationData,setDonationData] = useState([])
    const { id : campaignId} = useParams();


    const fetchDonationData = async () => {
        try{
            const {data} = await api.get('/organization/gettotalamountbydate',{params : { campaignId }})
            setDonationData(data.result)
        }catch(err){
            console.error("Error fetching donation data:", err);
            
        }
    }
    console.log(donationData)
    
    useEffect(()=>{
        fetchDonationData()
    },[])

    const chartData = {
        labels: donationData.map(item => item._id),
        datasets: [
            {
                label: "Total Donation",
                data: donationData.map(item => item.totalAmount),
                backgroundColor: "rgba(75, 192, 192, 0.6)",
                borderColor: "rgba(75, 192, 192, 1)",
                borderWidth: 1,
            }
        ]
    }

    const options = {
        responsive: true,
        plugins: {
          legend: { position: "top" },
          title: { display: true, text: "Donations by Date" },
        },
        scales: {
          x: { title: { display: true, text: "Donation Dates" } },
          y: { title: { display: true, text: "Total Amount ($)" } },
        },
      };
  

  return (
    <div className="container py-5">
      <h2 className="text-center mb-4">Daily Donations Summary</h2>
      {donationData.length > 0 ? (
        <Bar data={chartData} options={options} />
      ) : (
        <p className="text-center">No donation data available.</p>
      )}
    </div>
  )
}

export default ViewCampChart