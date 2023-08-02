import KioskMainLogo from "./KioskMainLogo";
import styles from "./KioskPrint.module.css";

function KioskPrint() {
  return (
    <>
      <KioskMainLogo />
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
