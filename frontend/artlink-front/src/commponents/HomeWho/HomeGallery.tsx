// import React from "react";
import { Link } from "react-router-dom";
import BigButton from "../../commponents/Base/BigButton";
import MainLogo from "../../commponents/Base/MainLogo";
import LinkStyle from "./Link.module.css";

function HomeGallery() {
  return (
    <>
      <MainLogo />
      <div className="BigBtnBox2">
        {/* Menu : Artwork Manage */}
        <Link to="/exhibition-board" className={LinkStyle.LinkNone}>
          <BigButton tabName={"Artwork Manager"} mini={"Register your work"} />
        </Link>
        {/* Menu : My page */}
        <Link to="/mypage/gallery" className={LinkStyle.LinkNone}>
          <BigButton tabName={"My Page"} mini={"Manage your gallery info"} />
        </Link>
      </div>
    </>
  );
}
export default HomeGallery;
