// import React from "react";
import { Link } from "react-router-dom";
import Styles from "./MainLogo.module.css";

function MainLogo() {
  return (
    < >
      <Link to="/home" className={Styles.MainLogo}>
        <h1>MainLogo</h1>
      </Link>
    </>
  );
}

export default MainLogo;
