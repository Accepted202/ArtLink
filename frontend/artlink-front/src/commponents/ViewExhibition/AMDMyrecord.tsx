import { UserOneRecordRes } from "../../api/UserApi";
import "./AMDMyrecord.css";

// import React from 'react';
interface AMDMyrecordProps {
  userData: UserOneRecordRes;
  isLeftVisible: boolean;
  isRightVisible: boolean;
}
function AMDMyrecord({
  userData,
  isLeftVisible,
  isRightVisible,
}: AMDMyrecordProps) {
  const scrollBoxClasses = `${
    window.innerWidth > 767 && isLeftVisible && isRightVisible
      ? "scrollBox"
      : ""
  }`;
  return (
    <>
      {/* 나의 전시 여정을 보여줌 */}
      <div className="MyrecordBody" style={{ flex: "1" }}>
        <div>
          <hr />
        </div>
        {/* 스크롤바 적용 div */}
        <div className={scrollBoxClasses}>
          {/* 관람 기본 정보 */}
          <div
            className="infoBox"
            style={{
              fontSize: isLeftVisible ? "11.5px" : "14px",
            }}
          >
            <div
              className="infoTxt"
              style={{
                margin: isLeftVisible ? "2px" : "6px",
              }}
            >
              장소 : {userData.galleryName}
            </div>
            <div
              className="infoTxt"
              style={{
                margin: isLeftVisible ? "2px" : "6px",
              }}
            >
              전시회명 : {userData.exhibitionName}
            </div>
            <div
              className="infoTxt"
              style={{
                margin: isLeftVisible ? "2px" : "6px",
              }}
            >
              기록한 작품수 : {userData.workList.length}
            </div>
            <div
              className="infoTxt"
              style={{
                margin: isLeftVisible ? "2px" : "6px",
              }}
            >
              기록 일자 : {userData.visitDate}
            </div>
          </div>
          <hr />
          {/* 기록 전시 */}
          <div>
            <h3>본문</h3>
            <img
              src="/src/assets/artwork/artwork1.jpg"
              alt="불러오기 실패"
              className="recordWork"
            />
            <img
              src="/src/assets/artwork/artwork1.jpg"
              alt="불러오기 실패"
              className="recordWork"
            />
            <img
              src="/src/assets/artwork/artwork1.jpg"
              alt="불러오기 실패"
              className="recordWork"
            />
          </div>
        </div>
      </div>
    </>
  );
}
export default AMDMyrecord;
