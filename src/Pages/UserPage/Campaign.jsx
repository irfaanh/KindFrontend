import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Campaign.css"; 
import { FaSearch } from "react-icons/fa";
import { api } from "../../axios";
import { Link, useNavigate } from "react-router";
import { useSelector } from "react-redux";

const Campaign = () => {
  const [acceptedCampaigns, setAcceptedCampaigns] = useState([]);
  const [visibleCount,setVisibleCount] = useState(5)
  const [searchTerm,setSearchTerm] = useState("")

  const { id } = useSelector((store) => store.user);
  const navigate = useNavigate()

    const getAcceptedCampaign = async () => {
        try {
          const { data } = await api.get("/user/acceptedcampaignuser");
          console.log(data);          
          setAcceptedCampaigns(data.AcceptedCampaigns); 

          setAcceptedCampaigns(prevState => prevState.filter(campaign => campaign.isEnabled === "Enable"))
        } catch (error) {
          console.error("Error fetching accepted campaigns:", error);
        }
      };
    useEffect(() => {
      getAcceptedCampaign();
      },[acceptedCampaigns])
      console.log(acceptedCampaigns);

    const handleShowMore = () => {
      setVisibleCount((prevCount) => prevCount + 5)
    }
    const filteredCampaign = acceptedCampaigns.filter((campaigns) => 
      campaigns.title.toLowerCase().includes(searchTerm.trim().toLowerCase()))

  return (
    <section id="campaigns" className="py-5" style={{ backgroundColor: "#1995AD" }}>
      <div className="container">
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


            {id ? <div className="col-lg-3">
              <Link to={`/donate/${campaign._id}` }>
                <button className="donate_button">Donate</button>

              </Link>
            </div> : 
            <div className="col-lg-3">
            <Link to={'/login' }>
              <button className="donate_button">Donate</button>

            </Link>
            </div>
            }
            
          </div>
        ))}
        {visibleCount < acceptedCampaigns.length && (
          <div className="text-center mt-4">
            <button
              className="show_more"
              onClick={handleShowMore}
            >
              Show More
            </button>
          </div>
        )}
      </div>
    </section>
  );
};



export default Campaign;
