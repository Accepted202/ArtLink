import styles from "./KioskHome.module.css";
import KioskMainLogo from "./KioskMainLogo";

/*
  디스플레이 사양: 1024*600 7인치
*/

function KioskHome() {
  return (
    <>
      <KioskMainLogo />
      <div className={styles["notice-container"]}>
        <div className={styles["notice-box"]}>
          <div className={styles["notice-text"]}>{"Please Tag"}</div>
        </div>
      </div>
    </>
  );
}
export default KioskHome;
