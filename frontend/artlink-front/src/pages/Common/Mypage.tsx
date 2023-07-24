import ProfileBox from "../../commponents/Base/ProfileBox";
import MyInfoBox from "../../commponents/InfoTable/MyInfoTable";

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
