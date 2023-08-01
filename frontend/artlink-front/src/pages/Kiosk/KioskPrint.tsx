import MainLogo from "../../commponents/Base/MainLogo";
import styles from "./KioskPrint.module.css";
import MarginTop200 from "../../commponents/EditCss/MarginTop200";

function KioskPrint() {
  return (
    <>
      <MarginTop200 />
      <MainLogo />
      <div className={styles["wrapper"]}>
        <div className={styles["loading-spinner"]}>
          <div className={styles["loading-spinner__ring"]}>
            <div className={styles["text"]}>Printing..</div>
            <div className={styles["loading-spinner__inner"]}></div>
          </div>
        </div>
      </div>
    </>
  );
}
export default KioskPrint;
