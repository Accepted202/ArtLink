// import React from "react";
import { Link } from "react-router-dom";
import Styles from "./MainLogo.module.css";

function MainLogo() {
  return (
    <>
      <Link to="/home" className={Styles.MainLogo}>
        <p className={Styles.MainLogotxt}>ArtLink</p>
      </Link>
    </>
  );
}

export default MainLogo;
