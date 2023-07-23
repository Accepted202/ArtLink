// import React from "react";
import { Link } from "react-router-dom";
import BigButton from "../../commponents/Base/BigButton";
import MainLogo from "../../commponents/Base/MainLogo";

function HomeUser() {
  return (
    <>
      <MainLogo />
      <h3>HomeUser</h3>
        <div className="BigBtnBox3">
          {/* 메뉴 버튼 */}
            <Link to="/art-memory">
              <BigButton tabName={"Menu 1"} />
            </Link>
            <Link to="/mypage">
              <BigButton tabName={"My Page"} />
            </Link>
        </div>
    </>
  );
}
export default HomeUser;
