import { Link } from "react-router-dom";
import styles from "./WorksBoard.module.css";
import ArtworkInfoTable from "../../commponents/Info/ArtworkInfoTable";

// import React from 'react';

function WorksBoard() {
  return (
    <>
      <div className={styles.container}>
        {/* 테이블 상단 */}
        <div className={styles.wrapper}>
          <Link to="/works-board/create">
            <button className={styles.addbutton}>+</button>
          </Link>
          <div>
            <input
              type="search"
              placeholder="검색할 작품명을 입력하세요."
              className={styles.searchinput}
            />
            <button className={styles.searchbutton}>search</button>
          </div>
        </div>
        {/* 테이블 내용 */}
        <div className={styles["component-wrapper"]}>
          <ArtworkInfoTable />
        </div>
      </div>
    </>
  );
}
export default WorksBoard;
