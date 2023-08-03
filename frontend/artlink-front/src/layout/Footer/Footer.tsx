import { useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faEnvelope,
  faHouse,
} from "@fortawesome/free-solid-svg-icons";
import { faGitlab } from "@fortawesome/free-brands-svg-icons";
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
              <a href="/home">
                <FontAwesomeIcon
                  icon={faHouse}
                  size="sm"
                  style={{ margin: "auto" }}
                />
              </a>
              <a href="https://lofty-cream-f31.notion.site/59d76894cbcc49b2b6f1adc747c01d06?v=1d3daf3fd2b5425bb03182aa2ab2abb7&pvs=4">
                <FontAwesomeIcon
                  icon={faMagnifyingGlass}
                  size="sm"
                  style={{ margin: "auto" }}
                />
              </a>
              <a href="/contact">
                <FontAwesomeIcon
                  icon={faEnvelope}
                  size="sm"
                  style={{ margin: "auto" }}
                />
              </a>
              <a href="https://lab.ssafy.com/s09-webmobile3-sub2/S09P12A202">
                <FontAwesomeIcon
                  style={{ margin: "auto" }}
                  size="sm"
                  icon={faGitlab}
                />
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
            <p className="copyright">
              SSAFY Project - Team : Accpted 202 @ 2023
            </p>
          </section>
        </div>
      )}
    </>
  );
}
export default Footer;
