import React, { useEffect, useState } from "react";
import { fetchSample, Sample } from "./TestApi";
// 해당 컴포넌트는 api통신 테스트입니다. get요청이고 post요청일시 datatosend변수로 매개변수를 전달하면 됩니다.
import { Data, getDeviceList, registerDevice } from "./IoTApi";

const Apitest: React.FC = () => {
  const [deviceData, setDeviceData] = useState<Data[]>([]);

  const regist = async () => {
    try {
      const dataToSend: Data = { phoneNumber: 8201012345678, exhibitionId: 2 };
      const data = await registerDevice(dataToSend, 1);
      console.log(data);
    } catch (error) {
      console.error("기기 등록에 실패했습니다.:", error);
    }
  };

  const getData = async () => {
    try {
      const data = await getDeviceList();
      console.log(data);
      setDeviceData(data);
    } catch (error) {
      console.error("기기 데이터를 가져오는 데 실패했습니다: ", error);
    }
  };
  useEffect(() => {
    void regist();
    void getData(); // 데이터를 가져오는 함수를 호출합니다.
  }, []);

  return (
    <>
      <h1>Apitest</h1>
      <hr />
      <div>
        {/* 가져온 데이터를 화면에 렌더링 */}
        {deviceData.map((item, index) => (
          <div key={index}>
            <p>deviceId: {item.deviceId}</p>
            <p>phoneNumber: {item.phoneNumber}</p>
          </div>
        ))}
      </div>
    </>
  );
};
export default Apitest;
