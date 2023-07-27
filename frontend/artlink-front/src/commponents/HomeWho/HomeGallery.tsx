// import React from "react";
import { Link } from "react-router-dom";
import BigButton from "../../commponents/Base/BigButton";
import MainLogo from "../../commponents/Base/MainLogo";
import LinkStyle from "./Link.module.css";

function HomeGallery() {
  return (
    <>
      <MainLogo mode="web" />
      <div className="BigBtnBox2">
        <Link to="/works-board" className={LinkStyle.LinkNone}>
          <BigButton tabName={"Artwork Manager"} mini={"Register your work"} />
        </Link>
        <Link to="/mypage/gallery" className={LinkStyle.LinkNone}>
          <BigButton tabName={"My Page"} mini={"Manage your gallery info"} />
        </Link>
      </div>
    </>
  );
}
export default HomeGallery;
