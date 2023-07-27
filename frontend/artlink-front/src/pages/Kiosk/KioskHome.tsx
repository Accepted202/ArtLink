import MainLogo from "../../commponents/Base/MainLogo";
import styles from "./KioskHome.module.css";
import MarginTop200 from "../../commponents/EditCss/MarginTop200";

function KioskHome() {
  return (
    <>
      <MarginTop200 />
      <MainLogo />
      <div className={styles.startbtnBody}>
        <div className={styles.startbtn}>
          <div className={styles.innerText}>{"Please Tag"}</div>
        </div>
      </div>
    </>
  );
}
export default KioskHome;
