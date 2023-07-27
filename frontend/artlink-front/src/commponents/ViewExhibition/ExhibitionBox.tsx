// import React from 'react';
import styles from "./ExhibitionBox.module.css";
import poster from "../../assets/전시회.jpg";

// 전시회 정보를 보여주는 컴포넌트
function ExhibitionBox() {
  return (
    <>
      <div className={styles["exhibition-container"]}>
        <div className={styles["exhibition-header"]}>
          <h1>Exhibition</h1>
        </div>
        <div className={styles["info-wrapper"]}>
          <div className={styles["img-box"]}>
            <img src={poster} alt="전시회" />
          </div>
          <div className={styles["text-and-button"]}>
            <div className={styles.text}>이 전시회 개쩝니다</div>
            <div className={styles["button-wrapper"]}>
              <button>전시회 사이트</button>
              <button>내 여정</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default ExhibitionBox;
