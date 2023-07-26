// import React from 'react';
import ProfileBox from "../../commponents/Base/ProfileBox";
import ArtworkInputInfoTable from "../../commponents/InfoTable/ArtworkInputInfoTable.tsx";
import "./Detail.css";
// import { useParams } from "react-router-dom";

/*
api로 해당 아이디의 작품 정보 가져오는 코드
useParams를 사용해 파라미터 값(아이디)
*/

const id = 1;
const title = "제목";
const location = "위치";
const description = "설명";

function WorksDetail() {
  return (
    <div className="container">
      <ProfileBox></ProfileBox>
      <ArtworkInputInfoTable
        id={id}
        title={title}
        location={location}
        description={description}
      ></ArtworkInputInfoTable>
    </div>
  );
}
export default WorksDetail;
