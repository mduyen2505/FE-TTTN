import React from "react";
import "./Style.css";


const Footer = () => {
    return (
        <footer className="footer">
          <div className="footer-container">
            
            <div className="footer-column">
              <h2 className="footer-logo">
                Glowify <span className="bold-text">Cosmestic </span>
              </h2>
              <p className="footer-description">
                Discover nature's beauty with our natural care products.
              </p>
              <div className="footer-contact">
                <p>📞 +84 843604370</p>
                <p>✉️ glowify@gmail.com</p>
                <p>📍 18A Cộng Hòa, Tân Bình, HCMHCM</p>
              </div>
            </div>
    
           
            <div className="footer-column">
              <h3>ABOUT</h3>
              <ul>
                <li><a href="#">About us</a></li>
                <li><a href="#">Blog</a></li>
                <li><a href="#">Privacy Policy</a></li>
                <li><a href="#">Terms & Conditions</a></li>
              </ul>
            </div>
    
           
            <div className="footer-column">
              <h3>MY ACCOUNT</h3>
              <ul>
                <li><a href="#">Order Status</a></li>
                <li><a href="#">Rewards</a></li>
              </ul>
            </div>
    
            
            <div className="footer-column">
              <h3>CUSTOMER CARE</h3>
              <ul>
                <li><a href="#">FAQ</a></li>
                <li><a href="#">Shipping Information</a></li>
                <li><a href="#">Contact us</a></li>
                <li><a href="#">Returns & Exchanges</a></li>
              </ul>
            </div>
    
            
            <div className="footer-column">
              <h3>SIGN UP FOR EMAILS</h3>
              <p>Stay informed, subscribe to our newsletter now!</p>
              <input type="email" placeholder="Email" className="footer-input" />
              <a href="#" className="subscribe-link">Subscribe →</a>
            </div>
          </div>
    
          {}
          <div className="footer-bottom">
            <p>© 2025 Glowify</p>
            <div className="footer-socials">
              <a href="#">📘</a>
              <a href="#">🐦</a>
              <a href="#">📸</a>
            </div>
          </div>
        </footer>
      );
    };
    

export default Footer;
