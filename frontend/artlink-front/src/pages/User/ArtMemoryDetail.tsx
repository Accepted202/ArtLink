// import React from 'react';
import MarginTopInput from "../../commponents/EditCss/MaginTopInput";
import ExhibitionBox from "../../commponents/ViewExhibition/ExhibitionBox";
import MyRecordBox from "../../commponents/ViewExhibition/MyRecordBox";
import Styles from "./ArtMemoryDetail.module.css";

function ArtMemoryDetail() {
  return (
    <>
      <MarginTopInput value={20} />
      <div className={Styles["artmemory-container"]}>
        <div className={Styles.artdetailLeft}>
          <ExhibitionBox />
        </div>
        <div className={Styles.artdetailRight}>
          <MyRecordBox />
        </div>
      </div>
    </>
  );
}
export default ArtMemoryDetail;
