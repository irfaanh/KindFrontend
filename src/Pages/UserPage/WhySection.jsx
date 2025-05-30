import "./WhySection.css"; // Optional CSS file for custom styles
import { FaHandshake } from "react-icons/fa";
import { FaStopwatch } from "react-icons/fa";
import { FaEarthAmericas } from "react-icons/fa6";

const WhySection = () => {
  return (
    <section className="why_section">
      <div className="why_content">
        <div className="why_head">
          <h2>Why Kind?</h2>
          <p>We’ve earned trust by uplifting and empowering communities across the globe.</p>
        </div>
        <div className="why_innercontent">
          <div className="inner inner1">
            <FaHandshake className="why_icons"/>
            <h3>Trust</h3>
            <p>
              Your generosity is safe with us.<br /> 
              Every donation is handled transparently<br /> 
              to make a meaningful impact.
            </p>
          </div>
          <div className="inner inner2">
            <FaStopwatch className="why_icons"/>
            <h3>Speed</h3>
            <p>
              Our streamlined platform ensures your <br />
              donations are quick, secure, and impactful—making <br />
              giving easier than ever.
            </p>
          </div>
          <div className="inner inner3">
            <FaEarthAmericas className="why_icons"/>
            <h3>Reach</h3>
            <p>
              Our platform ensures your donation reaches those who<br /> need it most, no matter their location. Your gift has <br />
              the power to transform lives across the globe.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhySection;