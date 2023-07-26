import ProfileBox from "../../commponents/Base/ProfileBox";
import MyInfoBox from "../../commponents/InfoTable/MyInfoTable";

import Styles from "./Mypage.module.css";

// import React from 'react';
function Mypage() {
  return (
    <>
      <div className={Styles.container}>
        <ProfileBox />
        <MyInfoBox />
      </div>
    </>
  );
}
export default Mypage;
