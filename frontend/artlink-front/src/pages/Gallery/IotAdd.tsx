import styles from "./IoTAdd.module.css";
import { useState } from "react";
import { registerDevice } from "../../api/IoTApi";

interface Data {
  [key: string]: number;
}

function IoTAdd() {
  const [deviceData, setDeviceData] = useState<Data>({});

  // 인풋 필드값 변경
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "phoneNumber") {
      setDeviceData((prevData) => ({
        ...prevData,
        [name]: Number("82" + value),
      }));
    } else {
      setDeviceData((prevData) => ({
        ...prevData,
        [name]: Number(value),
      }));
    }
  };

  const handleKeyPress = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      await handlerRegister();
    }
  };

  const handlerRegister = async () => {
    const { deviceId, ...restData } = deviceData;
    await registerDevice(restData, deviceId);
    window.location.reload();
  };

  return (
    <>
      <div className={styles.IoTBox}>
        <h2>기기 등록</h2>
        <div className={styles.inputWrapper}>
          <input
            type="text"
            name="deviceId"
            className={styles.infoInput}
            placeholder="Device ID"
            onChange={handleChange}
            // eslint-disable-next-line @typescript-eslint/no-misused-promises
            onKeyPress={handleKeyPress}
          ></input>
          <input
            type="text"
            name="phoneNumber"
            className={styles.infoInput}
            placeholder="Phone number"
            onChange={handleChange}
            // eslint-disable-next-line @typescript-eslint/no-misused-promises
            onKeyPress={handleKeyPress}
          ></input>
          <input
            type="text"
            name="exhibitionId"
            className={styles.infoInput}
            placeholder="Exhibition ID"
            onChange={handleChange}
            // eslint-disable-next-line @typescript-eslint/no-misused-promises
            onKeyPress={handleKeyPress}
          ></input>
        </div>

        <div>
          <button
            type="submit"
            className={styles.btn}
            // eslint-disable-next-line @typescript-eslint/no-misused-promises
            onClick={handlerRegister}
          >
            기기 등록하기
          </button>
        </div>
      </div>
    </>
  );
}
export default IoTAdd;
