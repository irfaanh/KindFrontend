import "./Footer.css"; 
import {useSelector} from 'react-redux'

const Footer = () => {
  const {id} = useSelector(store => store.user)

    return (
      <footer className="footer_section">
        <div className="footer_main">
          <div className="footer_inner">
            <div className="inner_footer">
              <img
                className="footer_logo"
                src="/images/logo_kind-removebg-preview copy.png"
                alt="logo"
              />
              <div className="foot_links">
                <ul className="footer_ul">
                  <li>Campaigns</li>
                  <li>Contact</li>
                  <li>About</li>
                  {!id ?  <li>Sign in</li> : ""}
                 
                </ul>
              </div>
            </div>
            <div className="copywrite_section">
              <p>© 2025 Kind. All rights reserved.</p>
              <div className="icons">
                <i className="fa-brands fa-instagram"></i>
                <i className="fa-brands fa-facebook"></i>
                <i className="fa-brands fa-twitter"></i>
              </div>
            </div>
          </div>
        </div>
      </footer>
    );
  };

  export default Footer;