import MainLogo from "../../commponents/Base/MainLogo";
import styles from "./KioskHome.module.css";
import MarginTop200 from "../../commponents/EditCss/MarginTop200";

/*
  디스플레이 사양: 1024*600 7인치
*/

function KioskHome() {
  return (
    <>
      <MarginTop200 />
      <MainLogo />
      <div className={styles["notice-container"]}>
        <div className={styles["notice-box"]}>
          <div className={styles["notice-text"]}>{"Please Tag"}</div>
        </div>
      </div>
    </>
  );
}
export default KioskHome;
