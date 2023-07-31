import ProfileUser from "../../commponents/Mypage/ProfileUser";
import ProfileGallery from "../../commponents/Mypage/ProfileGallery";
import BackBtn from "../../commponents/Base/BackBtn";

import Styles from "./Mypage.module.css";

// import React from 'react';
function Mypage() {
  // 로그인한 사용자 권한 확인후 렌더링
  const pathname = window.location.pathname;
  return (
    <>
      <div className={Styles.BackBtn}>
        <BackBtn />
      </div>

      <div className={Styles.Mypagecontainer}>
        {/* <div className={Styles.MypageinnerBox}> */}
        {pathname.includes("user") && <ProfileUser />}
        {pathname.includes("gallery") && <ProfileGallery />}
        {/* </div> */}
      </div>
    </>
  );
}
export default Mypage;
