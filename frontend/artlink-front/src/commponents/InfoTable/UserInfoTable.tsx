// import React from 'react';
import UIR from "./UserInfoRow.tsx";
import "./style/InfoTable.css";

// 일반 유저, 갤러리 관리자의 개인정보들을 보여주는 테이블

/*
API로 개인정보 가져오는 함수
*/

function UserInfoTable() {
  return (
    <>
      <div>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Phone Number</th>
              <th>자세히</th>
            </tr>
          </thead>
          <tbody>
            <UIR id={1} name="이름" phone="010-OOOO-OOOO" />
            <UIR id={2} name="이름" phone="010-OOOO-OOOO" />
            <UIR id={3} name="이름" phone="010-OOOO-OOOO" />
          </tbody>
        </table>
      </div>
    </>
  );
}
export default UserInfoTable;
