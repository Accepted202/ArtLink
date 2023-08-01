// import React from 'react';
import ArtworkProfileBox from "../../commponents/Info/ArtworkProfileBox.tsx";
import ArtworkInputInfoTable from "../../commponents/Info/ArtworkInputInfoTable.tsx";
import "./Detail.css";
import BackBtn from "../../commponents/Base/BackBtn.tsx";

function WorksCreate() {
  return (
    <>
      {/* 뒤로가기 & 페이지 설명 */}
      <div className="worksBackBtn">
        <BackBtn />
        <h2>작품 생성</h2>
      </div>
      {/* 작품 생성 바디 */}
      <div className="detail-container">
        <ArtworkProfileBox />
        <ArtworkInputInfoTable></ArtworkInputInfoTable>
      </div>
      {/* 작품 정보 업데이트 버튼 */}
      <div>
        <button className="detail-updateBtn">CREATE</button>
      </div>
    </>
  );
}
export default WorksCreate;
