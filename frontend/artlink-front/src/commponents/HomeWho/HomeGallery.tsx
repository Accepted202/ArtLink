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
        <Link to="/works-board" className={LinkStyle.LinkNone}>
          <BigButton tabName={"Artwork Manager"} />
        </Link>
        <Link to="/mypage" className={LinkStyle.LinkNone}>
          <BigButton tabName={"My Page"} />
        </Link>
      </div>
    </>
  );
}
export default HomeGallery;
