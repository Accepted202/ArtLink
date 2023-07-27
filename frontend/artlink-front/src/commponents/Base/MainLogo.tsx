// import React from "react";
import { Link } from "react-router-dom";
import Styles from "./MainLogo.module.css";

interface Props {
  mode: string;
}

function MainLogo({ mode }: Props) {
  return (
    <>
      {mode == "kiosk" && (
        <div className={Styles.MainLogo}>
          <p className={Styles.MainLogotxt}>ArtLink</p>
        </div>
      )}
      {mode == "web" && (
        <Link to="/home" className={Styles.MainLogo}>
          <p className={Styles.MainLogotxt}>ArtLink</p>
        </Link>
      )}
    </>
  );
}

export default MainLogo;
