import React, { useEffect, useState } from "react";
import { LoginApi, LoginRes, LoginReq } from "./CommonApi";
// 해당 컴포넌트는 api통신 테스트입니다. get요청이고 post요청일시 datatosend변수로 매개변수를 전달하면 됩니다.

const Apitest: React.FC = () => {
  const [sampleData, setSampleData] = useState<LoginRes[]>([]);
  const sendData: LoginReq = {
    username: "user1",
    password: "1234",
    role: "USER",
  };
  const getData = async () => {
    try {
      const data = await LoginApi(sendData);
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
      <p>로그인 API 테스트입니다.</p>
      <p>USER1에 대한 시도입니다.</p>
      <hr />
      <div>
        {/* 가져온 데이터를 화면에 렌더링 */}
        accessToken : <p>{sampleData.accessToken}</p>
        refreshToken : <p>{sampleData.refreshToken}</p>
      </div>
    </>
  );
};
export default Apitest;
