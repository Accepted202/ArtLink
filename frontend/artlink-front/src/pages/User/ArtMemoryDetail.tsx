// import React from 'react';
import ExhibitionBox from "../../commponents/ViewExhibition/ExhibitionBox";
import MyRecordBox from "../../commponents/ViewExhibition/MyRecordBox";
import Styles from "./ArtMemoryDetail.module.css";

function ArtMemoryDetail() {
  return (
    <>
      <h1>ArtMemoryDetail</h1>
      <div className={Styles["artmemory-container"]}>
        <ExhibitionBox />
        <MyRecordBox />
      </div>
    </>
  );
}
export default ArtMemoryDetail;
