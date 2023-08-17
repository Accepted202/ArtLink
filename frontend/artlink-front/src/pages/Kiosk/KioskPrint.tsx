import { useEffect, useState } from "react";
import KioskMainLogo from "./KioskMainLogo";
import styles from "./KioskPrint.module.css";
import { useNavigate } from "react-router-dom";

function KioskPrint() {
  const [countdown, setCountdown] = useState<number>(3);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prevCountdown) => prevCountdown - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (countdown === 0) {
      navigate("/kiosk/exit");
    }
  }, [countdown, navigate]);

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
