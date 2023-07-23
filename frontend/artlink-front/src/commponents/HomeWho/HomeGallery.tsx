// import React from "react";
import { Link } from "react-router-dom";
import BigButton from "../../commponents/Base/BigButton";
import MainLogo from "../../commponents/Base/MainLogo";

function HomeGallery() {

  return (
    <>
      <MainLogo />
      <h3>HomeGallery</h3>
        <div className="BigBtnBox2">
          <Link to="/works-board">
            <BigButton tabName={"Artwork Manager"} />
          </Link>
          <Link to="/mypage">
            <BigButton tabName={"My Page"} />
          </Link>
        </div>

    </>
  );
}
export default HomeGallery;
