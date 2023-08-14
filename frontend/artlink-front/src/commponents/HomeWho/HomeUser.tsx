// import React from "react";
import { Link } from "react-router-dom";
import MainLogo from "../../commponents/Base/MainLogo";
import Styles from "./../../commponents/Base/BigButton.module.css";

function HomeUser() {
  return (
    <>
      <div style={{ height: "60%" }}>
        <MainLogo />
        <div className="BigBtnBox2">
          {/* Menu : Your Memory */}
          <div className={Styles.startbtnBody}>
            <Link
              to="/art-memory"
              style={{ textDecoration: "none" }}
              className={Styles.startbtn}
            >
              <div style={{ margin: "auto" }}>
                <p className={Styles.innerIcon}>{"Your Memory"}</p>
                <p className={Styles.innerIcon2}>{"Exhibition Journey"}</p>
              </div>
            </Link>
          </div>
          {/* Menu : My Page */}
          <div className={Styles.startbtnBody}>
            <Link
              to="/mypage/user"
              style={{ textDecoration: "none" }}
              className={Styles.startbtn}
            >
              <div style={{ margin: "auto" }}>
                <p className={Styles.innerIcon}>{"My Page"}</p>
                <p className={Styles.innerIcon2}>
                  {"Read and Change Your Info"}
                </p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
export default HomeUser;
