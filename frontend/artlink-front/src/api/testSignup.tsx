import React, { useEffect, useState } from "react";
import { SignupApi, SignupRes, SignupReq } from "./CommonApi";
// 해당 컴포넌트는 api통신 테스트입니다. get요청이고 post요청일시 datatosend변수로 매개변수를 전달하면 됩니다.

const Apitest: React.FC = () => {
  const [sampleData, setSampleData] = useState<SignupRes[]>([]);
  const sendData: SignupReq = {
    username: "Cho Junha",
    password: "wnsgk0208!",
    phoneNumber: 821022921491,
  };
  const getData = async () => {
    try {
      const data = await SignupApi(sendData);
      console.log(data);
      setSampleData(data);
    } catch (error) {
      console.error("Error fetching SignupApi data:", error);
    }
  };
  useEffect(() => {
    console.log("이펙 트");
    void getData(); // 데이터를 가져오는 함수를 호출합니다.
  }, []);

  return (
    <>
      <h1>Apitest</h1>
      <div>
        {/* 가져온 데이터를 화면에 렌더링 */}
        <p>{sampleData.id}</p>
        <p>{sampleData.password}</p>
        <p>{sampleData.role}</p>
        <p>{sampleData.username}</p>
      </div>
    </>
  );
};
export default Apitest;
