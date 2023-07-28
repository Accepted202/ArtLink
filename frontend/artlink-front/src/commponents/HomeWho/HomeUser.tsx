// import React from "react";
import { Link } from "react-router-dom";
import BigButton from "../../commponents/Base/BigButton";
import MainLogo from "../../commponents/Base/MainLogo";

import LinkStyle from "./Link.module.css";

function HomeUser() {
  return (
    <>
      <MainLogo />
      <div className="BigBtnBox2">
        {/* Menu : Your Memory */}
        <Link to="/art-memory" className={LinkStyle.LinkNone}>
          <BigButton tabName={"Your Memory"} mini={"Exhibition Journey"} />
        </Link>
        {/* Menu : My Page */}
        <Link to="/mypage/user" className={LinkStyle.LinkNone}>
          <BigButton tabName={"My Page"} mini={"Read and Change Your Info"} />
        </Link>
      </div>
    </>
  );
}
export default HomeUser;
