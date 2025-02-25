import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./ViewAccepted.css"; 
import { api } from "../../axios";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { Link } from "react-router";

const ViewDisabledCampaign = () => {
    const { id } = useSelector((store) => store.organization);

  const [disabledCampaign, setDisabledCampaign] = useState([]);
  const [visibleCount, setVisibleCount] = useState(5);


    const getDisabledCampaign = async () => {
        try {
          const { data } = await api.get("/organization/getdisable");
          console.log(data);          
          setDisabledCampaign(data.DisabledCampaigns); 

          
        } catch (error) {
          console.error("Error fetching accepted campaigns:", error);
        }
      };
    useEffect(() => {
      getDisabledCampaign();
      },[])
      console.log(disabledCampaign);

      console.log(disabledCampaign[0]?.isDisableByAdmin);


      

    const showMoreCampaign = () => {
        setVisibleCount((prevCount) => prevCount + 5)
    }

    const handleEnable = async (id) => {
        try{
            const campaignToEnable = disabledCampaign.find((campaign) => campaign._id === id)

            if(!campaignToEnable){
                toast.error("Campaign not found");
                return
            }

            if(campaignToEnable.isDisableByAdmin === "Disable"){
                toast.error("Campaign disabled by admin")
                return
            }

            const responce = await api.patch("/organization/disablecampaign", { isEnabled: "Enable"},{ params:{ id }})
            if (responce.status === 200) {
                toast.success("Campaign Enabled");
                setDisabledCampaign(prevCampaigns =>
                    prevCampaigns.filter(campaign => campaign._id !== id)
                );
            }else{
                toast.error("Failed to update details")
            }
        }catch(err){
            console.log(err);
            toast.error("Failed to update details");
        }
    
    }
    

  return (
    <section id="campaigns" className="py-5 vh-100" style={{ backgroundColor: "#1995AD" }}>
      <div className="container">
      <h2 className="text-center mb-4 text-white">Disabled Campaigns</h2>


        {disabledCampaign.slice(0,visibleCount).map((campaign, index) => (
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
            <div className="col-lg-3 d-flex flex-column gap-2">
                <div>
                <button onClick={()=>handleEnable(campaign._id)}
                className="btn btn-success">Enable</button>
                </div>
            </div>
          </div>
        ))}
        {visibleCount < disabledCampaign.length && (
          <div className="text-center mt-4">
            
            <button
              className="show_more"
              onClick={showMoreCampaign}
            >
              Show More
            </button>
          </div>
        )}
      </div>
    </section>
  );
};



export default ViewDisabledCampaign;
