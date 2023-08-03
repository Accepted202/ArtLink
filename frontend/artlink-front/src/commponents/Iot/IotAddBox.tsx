// import React from 'react';
import Styles from "./Iot.module.css";
import NormalForm from "../Entrance/Form/NormalForm";

function IotInputBox() {
  return (
    <>
      <div className={Styles.IotBox}>
        <h2>Iot 등록</h2>
        <div>
          <input
            type="text"
            name="text"
            className={Styles.inputtest}
            placeholder="Type here..."
          ></input>
        </div>

        <div>
          <input
            type="submit"
            className={Styles.IotSubmit}
            value="기기 등록하기"
          />
        </div>
      </div>
    </>
  );
}
export default IotInputBox;
