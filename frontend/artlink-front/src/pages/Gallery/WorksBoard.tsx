import UserInfoTable from "../../commponents/InfoTable/UserInfoTable";
import { Link } from "react-router-dom";
import styles from "./WorksBoard.module.css";

// import React from 'react';

function WorksBoard() {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <Link to="/works-board/create">
          <button className={styles.button}>add</button>
        </Link>
        <div>
          <input type="search" placeholder="검색할 작품명을 입력" />
          <input type="submit" value="검색" />
        </div>
      </div>
      <div className={styles["component-wrapper"]}>
        <UserInfoTable />
      </div>
    </div>
  );
}
export default WorksBoard;
