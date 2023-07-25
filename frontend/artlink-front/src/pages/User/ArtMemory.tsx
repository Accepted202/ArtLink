import Styles from "./ArtMemory.module.css";
import { Link } from "react-router-dom";
import ExhibitionTable from "../../commponents/ViewExhibition/ExhibitionTable";

// import React from 'react';

function ArtMemory() {
  return (
    <>
      <h1>ArtMemory</h1>
      {/* 과거 전시를 전부 담은 태그 */}
      {/* 전시회 PK, 유저정보를 전송해야함 */}
      {/* 실제 코드는 api통신을 통해받은 데이터를 map으로 구현 */}
      <div className={Styles.ExhibitionCollectBox}>
        <Link to="1">
          <ExhibitionTable />
        </Link>
        <Link to="2">
          <ExhibitionTable />
        </Link>
        <Link to="3">
          <ExhibitionTable />
        </Link>
        <Link to="4">
          <ExhibitionTable />
        </Link>
        <Link to="5">
          <ExhibitionTable />
        </Link>
      </div>
    </>
  );
}
export default ArtMemory;
