// import React from 'react';
import "./style/Board.css";
import UserInfoTable from "../../commponents/InfoTable/UserInfoTable";

function UserBoard() {
  return (
    <div className="board-container">
      <div className="component-wrapper">
        <UserInfoTable></UserInfoTable>
      </div>
    </div>
  );
}
export default UserBoard;
