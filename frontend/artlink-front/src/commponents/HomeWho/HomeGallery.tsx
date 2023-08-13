// import React from "react";
import { Link } from "react-router-dom";
import MainLogo from "../../commponents/Base/MainLogo";
import Styles from "./../../commponents/Base/BigButton.module.css"

function HomeGallery() {
  return (
    <>
      <MainLogo />
      <div className="BigBtnBox2">
        {/* Menu : Artwork Manage */}
        <div className={Styles.startbtnBody}>
          <Link to="/exhibition-board" style={{ textDecoration: "none"}} className={Styles.startbtn}>
            <div style={{margin:"auto"}}>
              <p className={Styles.innerIcon}>{"Artwork Manager"}</p>
              <p className={Styles.innerIcon2}>{"Register your work"}</p>
            </div>
          </Link>
        </div>
        {/* Menu : My page */}
        <div className={Styles.startbtnBody}>
          <Link to="/mypage/gallery" style={{ textDecoration: "none"}} className={Styles.startbtn}>
            <div style={{margin:"auto"}}>
              <p className={Styles.innerIcon}>{"My Page"}</p>
              <p className={Styles.innerIcon2}>{"Manage your gallery info"}</p>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
}
export default HomeGallery;
