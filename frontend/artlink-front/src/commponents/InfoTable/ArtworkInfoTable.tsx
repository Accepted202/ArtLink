// import React from 'react';
import AIR from "./ArtworkInfoRow.tsx";
import "./style/InfoTable.css";

// 관리 중인 작품들의 정보를 보여주는 테이블

/*
API로 작품 정보 가져오는 코드 삽입
*/

function ArtworkInfoTable() {
  return (
    <>
      <h1>ArtworkInfoTable</h1>
      <div>
        <table>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Location</th>
            <th>Description</th>
          </tr>
          <tbody>
            <AIR id="아이디" title="제목" location="위치" description="설명" />
            <AIR id="아이디" title="제목" location="위치" description="설명" />
            <AIR id="아이디" title="제목" location="위치" description="설명" />
          </tbody>
        </table>
      </div>
    </>
  );
}
export default ArtworkInfoTable;
