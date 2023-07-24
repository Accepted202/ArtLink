import ProfileBox from "../../commponents/MyPage/ProfileBox";
import MyInfoBox from "../../commponents/MyPage/MyInfoBox";

import Styles from "./Mypage.module.css";

// import React from 'react';
function Mypage() {
  return (
    <>
      <h1>Mypage</h1>
      <div className={Styles.Mypage}>
        <ProfileBox />
        <MyInfoBox />
      </div>
    </>
  );
}
export default Mypage;
