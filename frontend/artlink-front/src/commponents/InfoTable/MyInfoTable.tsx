// import React from 'react';
import MIR from "./MyInfoRow.tsx";
import "./style/InfoTable.css";

/*
API로 내 정보 가져오는 코드 삽입
*/

// 내 정보들을 보여줄 컴포넌트
function MyInfoTable() {
  return (
    <>
      <h1>MyInfoTable</h1>
      <div>
        <table>
          <tbody>
            <MIR infoTitle="이름" infoDetail="OOO" />
            <MIR infoTitle="아이디" infoDetail="XXXXX" />
            <MIR infoTitle="비밀번호" infoDetail="****" />
          </tbody>
        </table>
      </div>
    </>
  );
}
export default MyInfoTable;
