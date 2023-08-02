// import React from 'react';
import { useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import "./Footer.css";

function Footer() {
  const location = useLocation();
  const isKiosk = location.pathname.includes("kiosk");
  const is3D = location.pathname.includes("3d");

  return (
    <>
      {!isKiosk && !is3D && (
        <div className="footBody">
          <section className="footer">
            <div className="social">
              <a href="#">
                <FontAwesomeIcon icon={faCamera} size="2x" />
              </a>
              <a href="#">
                <i className="fab fa-snapchat"></i>
              </a>
              <a href="#">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#">
                <i className="fab fa-facebook-f"></i>
              </a>
            </div>
            <ul className="list">
              <li>
                <a href="#">Home</a>
              </li>
              <li>
                <a href="#">Services</a>
              </li>
              <li>
                <a href="#">About</a>
              </li>
              <li>
                <a href="#">Terms</a>
              </li>
              <li>
                <a href="#">Privacy Policy</a>
              </li>
            </ul>
            <p className="copyright">SSAFY PJT1 - Accpted 202 @ 2023</p>
          </section>
        </div>
      )}
    </>
  );
}
export default Footer;
