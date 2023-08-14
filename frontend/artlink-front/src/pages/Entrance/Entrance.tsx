import { useState } from "react";
import MainLogo from "../../commponents/Base/MainLogo";
import { useNavigate } from "react-router-dom";
import Styles from "./Entrance.module.css";
import MarginTopInput from "../../commponents/EditCss/MaginTopInput";

function Entrance() {
  const navigate = useNavigate();
  const [showAnimation, setShowAnimation] = useState(false);

  const handleStartButtonClick = () => {
    setShowAnimation(true);

    setTimeout(() => {
      // 애니메이션 작동 코드
      navigate("/login");
    }, 1000); // 1초 동안 애니메이션 표시
  };

  return (
    <div
      className={`${Styles.entranceContainer} ${
        showAnimation ? Styles.animateContainer : ""
      }`}
    >
      <MainLogo />
      <div
        className={`${Styles.startbtnBody} ${
          showAnimation ? Styles.animateStartbtnBody : ""
        }`}
      >
        <button
          className={`${Styles.startbtn}  ${
            showAnimation ? Styles.animateStartbtn : ""
          }`}
          onClick={handleStartButtonClick}
        >
          <p className={Styles.innerIcon}>{"start"}</p>
        </button>
      </div>
      <MarginTopInput value={100} />
    </div>
  );
}

export default Entrance;
