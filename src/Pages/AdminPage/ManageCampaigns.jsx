import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { api } from "../../axios";
import toast from "react-hot-toast";
import './ManageCampaign.css'

const ManageCampaigns = () => {
    const [pendingCampaigns, setPendingCampaigns] = useState([]);
    const getPendingCampaign = async () => {
        try {
          const { data } = await api.get("/admin/pendingcampaign");
          console.log(data);          
          setPendingCampaigns(data.PendingCampaigns); 

          
        } catch (error) {
          console.error("Error fetching pending campaigns:", error);
        }
      };
    useEffect(() => {
        getPendingCampaign();
      },[])
      console.log(pendingCampaigns);

    const handleAccept = async (id) => {
        try{
            const responce =  await api.patch("/admin/acceptcampaign" , {status:"Accept" },{params: {id}})
      if(responce.status === 200){
        toast.success(responce.data.message || "Campaign Accepted")
        
        setPendingCampaigns(prevCampaigns => prevCampaigns.filter(campaigns => campaigns._id !== id))
      } else{
        toast.error(responce.data.message || "Failed to Upadate details")
      }
        }catch(err){
            console.log(err);
            toast.error("Failed to update details");
            return;
            
        }

    }
    const handleReject = async (id) => {
        try{
            const responce =  await api.patch("/admin/rejectcampaign" , {status:"Rejected" },{params: {id}})
      if(responce.status === 200){
        toast.success(responce.data.message || "Campaign Rejected")

        setPendingCampaigns(prevCampaigns => prevCampaigns.filter(campaigns => campaigns._id !== id))

      } else{
        toast.error(responce.data.message || "Failed to Upadate details")
      }
        }catch(err){
            console.log(err);
            toast.error("Failed to update details");
            return;
            
        }
    }
    console.log(pendingCampaigns);
    
    const campPending = pendingCampaigns.filter(pending => pending.status === "Pending")
    console.log(campPending);
    
      
  return (
    <section id="manage-campaigns" className="py-5" style={{ backgroundColor: "#1995AD" }}>
  <div className="container">
    <h2 className="text-center mb-4 text-white">Manage Campaigns</h2>

    {campPending.length > 0 ? (
    campPending.map((campaign, index) => (
      <div
        key={index}
        className="row text-center align-items-center py-3 bg-white border rounded-2 my-4 shadow-sm"
      >
        <div className="col-lg-3">
          <img
            className="campaign_image mw-100 rounded"
            src={campaign.image || "https://via.placeholder.com/150"}
            alt="campaign logo"
            style={{ maxHeight: "250px", objectFit: "cover" }}
          />
        </div>
        <div className="col-lg-6">
          <h3 className="campaign_title py-1">{campaign.title}</h3>
          <p className="campaign_description">{campaign.description}</p>
        </div>
        <div className="col-lg-3 d-flex justify-content-center gap-2">
          <button onClick={()=>handleAccept(campaign._id)}
            className="btn btn-success"
            style={{ padding: "10px 20px", fontWeight: "bold" }}
          >
            Accept
          </button>
          <button onClick={()=>handleReject(campaign._id)}
            className="btn btn-danger"
            style={{ padding: "10px 20px", fontWeight: "bold" }}
          >
            Reject
          </button>
        </div>
      </div>
    ))) : (
        <div className="text-center">
            <p className="text-white fs-4">No Campaign Request Found</p>
          </div>
    )}
  </div>
</section>

  );
};



export default ManageCampaigns;
