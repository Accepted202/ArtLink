// import React from 'react';
import Styles from "./Iot.module.css";

function IotInputBox() {
  return (
    <>
      <div className={Styles.IotBox}>
        <h2>Iot 등록</h2>
        <div>
          <input
            className={Styles.IotInput}
            type="text"
            placeholder="초기화할 Iot 기기 번호를 입력하세요"
          />
        </div>
        <div>
          <input
            type="submit"
            className={Styles.IotSubmit}
            value="기기 초기화하기"
          />
        </div>
      </div>
    </>
  );
}
export default IotInputBox;
