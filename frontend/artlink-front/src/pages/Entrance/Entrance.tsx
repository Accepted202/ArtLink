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
        <div className={Styles.startbtnBody}>
          <Link to="/login" style={{ textDecoration: "none" }}>
              <div className={Styles.startbtn}>
                <p className={Styles.innerIcon}>{"start"}</p>
              </div>
          </Link>
        </div>
        <MarginTopInput value={100} />
      </div>
    </>
  );
}
export default Entrance;
