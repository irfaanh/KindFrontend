import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./ViewAccepted.css"; 
import { FaSearch } from "react-icons/fa";
import { api } from "../../axios";
import { Link, useNavigate } from "react-router";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

const ViewAccepted = () => {
    const { id } = useSelector((store) => store.organization);

  const [acceptedCampaigns, setAcceptedCampaigns] = useState([]);
  const [visibleCount, setVisibleCount] = useState(5);
  const [searchTerm,setSearchTerm] = useState("")
  const navigate = useNavigate()

    const getAcceptedCampaign = async () => {
        try {
          const { data } = await api.get("/organization/acceptedcampaignorg",{params:{id}});
          console.log(data);          
          setAcceptedCampaigns(data.AcceptedCampaigns); 

          
        } catch (error) {
          console.error("Error fetching accepted campaigns:", error);
        }
      };

    useEffect(() => {
      getAcceptedCampaign();
      },[])
      console.log(acceptedCampaigns);

    const showMoreCampaign = () => {
        setVisibleCount((prevCount) => prevCount + 5)
    }

    const handleDisable = async (id) => {
        try{
            const responce =  await api.patch("/organization/disablecampaign" , {isEnabled:"Disable" },{params: {id}})
      if(responce.status === 200){
        toast.success("Campaign Disabled")

        setAcceptedCampaigns(prevCampaigns => prevCampaigns.filter(campaigns => campaigns._id !== id))

      } else{
        toast.error(responce.data.message || "Failed to Upadate details")
      }
        }catch(err){
            console.log(err);
            toast.error("Failed to update details");
            return;
            
        }
    }

    const filteredCampaign = acceptedCampaigns.filter((campaigns) => 
        campaigns.title.toLowerCase().includes(searchTerm.trim().toLowerCase()))

  return (
    <section id="campaigns" className="py-5" style={{ backgroundColor: "#1995AD" }}>
      <div className="container">
      <h2 className="text-center mb-4 text-white">Campaigns</h2>

        <div className="d-flex align-items-center gap-1 p-2 bg-white text-center border rounded-2">
        <FaSearch />
          <input
            id="campaignsearchbox"
            className="w-100 border-0"
            type="text"
            placeholder="Find campaigns..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {filteredCampaign.slice(0,visibleCount).map((campaign, index) => (
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
                <Link to={`viewstatus/${campaign._id}`}>
                    <button className="donate_button">View Status</button>
                </Link>
                <div>
                    <button onClick={()=>navigate(`updatecampaign/${campaign._id}`,{state:campaign})} 
                    className="update_button">Update</button>
                </div>
                <div>
                <button onClick={()=>handleDisable(campaign._id)}
                className="disable_button">Disable</button>
                </div>
            </div>
          </div>
        ))}
        {visibleCount < acceptedCampaigns.length && (
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



export default ViewAccepted;
