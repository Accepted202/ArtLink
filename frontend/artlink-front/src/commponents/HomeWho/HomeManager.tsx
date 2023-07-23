// import React from "react";
import { Link } from "react-router-dom";
import BigButton from "../../commponents/Base/BigButton";
import MainLogo from "../../commponents/Base/MainLogo";

function HomeManager() {
  return (
    <>
      <MainLogo />
      <h3>HomeManager</h3>
        <div className="BigBtnBox2">
          <Link to="/user-board">
            <BigButton tabName={"User Manage"} />
          </Link>
          <Link to="/gallery-board">
            <BigButton tabName={"Gallery Manage"} />
          </Link>

        </div>
    </>
  );
}
export default HomeManager;
