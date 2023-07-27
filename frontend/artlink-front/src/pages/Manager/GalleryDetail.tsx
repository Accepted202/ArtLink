// import React from 'react';
import "./style/Detail.css";
import ProfileBox from "../../commponents/Mypage/ProfileBox.tsx";
import UserInputInfoTable from "../../commponents/InfoTable/UserInputInfoTable.tsx";

const id = 1;
const name = "이름";
const phone = "010-0000-0000";

function GalleryDetail() {
  return (
    <div className="detail-container">
      <ProfileBox></ProfileBox>
      <UserInputInfoTable
        id={id}
        name={name}
        phone={phone}
      ></UserInputInfoTable>
    </div>
  );
}
export default GalleryDetail;
