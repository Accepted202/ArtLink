// import React from 'react';
import ArtworkInfoRow from "./ArtworkInfoRow.tsx";
import "./style/InfoTable.css";

// 관리 중인 작품들의 정보를 보여주는 테이블

/*
API로 작품 정보 가져오는 코드 삽입
*/

function ArtworkInfoTable() {
  return (
    <>
      <div>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Edit</th>
              <th>Title</th>
              <th>Location</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <ArtworkInfoRow
              id={1}
              title="제목"
              location="위치"
              description="설명"
            />
            <ArtworkInfoRow
              id={2}
              title="제목"
              location="위치"
              description="설명"
            />
          </tbody>
        </table>
      </div>
    </>
  );
}
export default ArtworkInfoTable;
