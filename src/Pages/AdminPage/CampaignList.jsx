import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router';
import { api } from '../../axios';
import toast from 'react-hot-toast';
import './CampaignList.css'

const CampaignList = () => {
    const [campaignList,setCampaignList] = useState([]);
    const navigate = useNavigate()

    const getCampaignList = async () => {
        try{
            const {data} = await api.get('/admin/getcampaigndetail');
            console.log(data);
            setCampaignList(data?.campaignDetail?.[0].allCampaign);
            
        }catch(err){
            console.error("Error fetching campaign donation details:", err);
        }
    }
    console.log(campaignList);

    useEffect(() => {
        getCampaignList()
    })

    const handleDisable = async (id) => {
        try{
            const responce =  await api.patch("/admin/disablecampaignbyadmin" , { 
                isDisableByAdmin: "Disable", 
                isEnabled: "Disable",
            },
                {params: {id}})
      if(responce.status === 200){
        toast.success("Campaign Disabled")

        setCampaignList(prevCampaigns => prevCampaigns.filter(campaigns => campaigns._id !== id))

      } else{
        toast.error(responce.data.message || "Failed to Upadate details")
      }
        }catch(err){
            console.log(err);
            toast.error("Failed to update details");
            return;
            
        }
    }
    
    const handleEnable = async (id) => {
        try{
            const responce =  await api.patch("/admin/enablecampaignbyadmin" , { 
                isDisableByAdmin: "Enable", 
                isEnabled: "Enable",
            },
                {params: {id}})
      if(responce.status === 200){
        toast.success("Campaign Enabled")

        setCampaignList(prevCampaigns => prevCampaigns.filter(campaigns => campaigns._id !== id))

      } else{
        toast.error(responce.data.message || "Failed to Upadate details")
      }
        }catch(err){
            console.log(err);
            toast.error("Failed to update details");
            return;
            
        }
    }
    
  return (
    <section id="campaigns" className="py-5 vh-100" style={{ backgroundColor: "#1995AD"}}>
  <div className="container d-flex flex-column align-items-center">
    <h2 className="text-center mb-4 text-white">Campaigns List</h2>

    {campaignList.map((campaign, index) => (
      <div
        key={index}
        className="row text-center align-items-center py-2 bg-white border rounded-2 my-4"
      >
        <div className="col-lg-3">
          <img
            className="campaign_image mw-100"
            src={campaign.image}
            alt="campaign logo"
          />
        </div>
        <div className="col-lg-6">
          <h2 className="campaign_head py-1">{campaign.title}</h2>
          <p className="campaign_p">{campaign.description}</p>
        </div>

        <div className="col-lg-3 d-flex flex-column align-items-center gap-2">
          {campaign.isDisableByAdmin === "Enable" ? (
            <button onClick={() => handleDisable(campaign._id)} className="btn btn-danger">
              Disable
            </button>
          ) : (
            <button onClick={() => handleEnable(campaign._id)} className="btn btn-success">
              Enable
            </button>
          )}
        </div>
      </div>
    ))} 
  </div>
</section>

  )
}

export default CampaignList