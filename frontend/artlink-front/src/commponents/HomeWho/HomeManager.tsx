// import React from "react";
import { Link } from "react-router-dom";
import MainLogo from "../../commponents/Base/MainLogo";
import Styles from "./../../commponents/Base/BigButton.module.css"

function HomeManager() {
  return (
    <>
      <MainLogo />
      <div className="BigBtnBox2">
        {/* Menu : User Manage */}
        <div className={Styles.startbtnBody}>
          <Link to="/user-board" style={{ textDecoration: "none"}} className={Styles.startbtn}>
            <div style={{margin:"auto"}}>
              <p className={Styles.innerIcon}>{"User Manage"}</p>
              <p className={Styles.innerIcon2}>{"Manage your users"}</p>
            </div>
          </Link>
        </div>
        {/* Menu : Gallery Manage */}
        <div className={Styles.startbtnBody}>
          <Link to="/gallery-board" style={{ textDecoration: "none"}} className={Styles.startbtn}>
            <div style={{margin:"auto"}}>
              <p className={Styles.innerIcon}>{"Gallery Manage"}</p>
              <p className={Styles.innerIcon2}>{"Manage your galleries"}</p>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
}
export default HomeManager;
