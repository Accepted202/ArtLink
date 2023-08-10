import { UserOneRecordRes } from "../../api/UserApi";
import Styles from "./AMD.module.css";

// import React from 'react';
interface AMDMyrecordProps {
  userData: UserOneRecordRes;
  isLeftVisible: boolean;
}
function AMDMyrecord({ userData, isLeftVisible }: AMDMyrecordProps) {
  return (
    <>
      {isLeftVisible && <>왼쪽 켜짐</>}
      {/* 나의 전시 여정을 보여줌 */}
      <div>
        <p
          className={`${Styles.AMDTitleTxt}`}
          style={{
            fontSize: isLeftVisible ? "16px" : "25px",
            justifyContent: isLeftVisible ? "center" : "left",
          }}
        >
          당신의 전시여정
        </p>
        <div>기본 인포</div>
        <div>본문</div>
      </div>
    </>
  );
}
export default AMDMyrecord;
