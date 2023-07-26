// import React from 'react';
import MainLogo from "../../commponents/Base/MainLogo";
import { Link } from "react-router-dom";
import Styles from "./Entrace.module.css";
import MarginTop200 from "../../commponents/EditCss/MarginTop200";

function Entrance() {
  return (
    <>
      <MarginTop200 />
      <MainLogo />
      <Link to="/login" style={{ textDecoration: "none" }}>
        <div className={Styles.startbtnBody}>
          <div className={Styles.startbtn}>
            <p className={Styles.innerIcon}>{"start"}</p>
          </div>
        </div>
      </Link>
    </>
  );
}
export default Entrance;
