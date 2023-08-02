// import React from 'react';
import MainLogo from "../../commponents/Base/MainLogo";
import { Link } from "react-router-dom";
import Styles from "./Entrance.module.css";
import MarginTopInput from "../../commponents/EditCss/MaginTopInput";

function Entrance() {
  return (
    <>
      <div className={Styles.entranceContainer}>
        <MainLogo />
        <Link to="/login" style={{ textDecoration: "none" }}>
          <div className={Styles.startbtnBody}>
            <div className={Styles.startbtn}>
              <p className={Styles.innerIcon}>{"start"}</p>
            </div>
          </div>
        </Link>
        <MarginTopInput value={100} />
      </div>
    </>
  );
}
export default Entrance;
