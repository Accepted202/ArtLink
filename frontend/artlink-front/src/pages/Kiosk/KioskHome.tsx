import styles from "./KioskHome.module.css";
import KioskMainLogo from "./KioskMainLogo";
import { useState } from "react";
import { deleteDevice } from "../../api/IoTApi";
import { useNavigate } from "react-router-dom";

/*
  디스플레이 사양: 1024*600 7인치
*/

function KioskHome() {
  const [deviceId, setDeviceId] = useState(0);
  const navigate = useNavigate();

  // 유저키 가져오기
  const getUserKey = async () => {
    try {
      const response = await deleteDevice(deviceId);
      navigate(`/kiosk/${response}`);
    } catch (error) {
      console.error("유저키를 가져오는 데 실패했습니다.", error);
      window.alert("유저키 가져오기 실패");
    }
  };

  return (
    <>
      <KioskMainLogo />
      <div className={styles["notice-container"]}>
        <div className={styles["notice-box"]}>
          <div className={styles["notice-text"]}>{"Please Tag"}</div>
        </div>
      </div>
      <div className={styles.inputWrapper}>
        <input
          type="text"
          id="tag"
          onChange={(e) => {
            setDeviceId(Number(e.target.value));
          }}
        />
        <button
          type="submit"
          id="submit"
          // eslint-disable-next-line @typescript-eslint/no-misused-promises
          onClick={getUserKey}
        >
          제출
        </button>
      </div>
    </>
  );
}
export default KioskHome;
