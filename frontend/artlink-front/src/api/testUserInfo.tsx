import React, { useEffect, useState } from "react";
import { UserInfoRes, UserInfoReq, UserInfo } from "./UserApi";
// 해당 컴포넌트는 api통신 테스트입니다. get요청이고 post요청일시 datatosend변수로 매개변수를 전달하면 됩니다.

const ApitestUserInfo: React.FC = () => {
  const [userInfoData, setuserInfoData] = useState<UserInfoRes[]>([]);
  const getData = async () => {
    try {
      const sendData: UserInfoReq = {
        headers: {
          Authorization:
            "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ1c2VyMSIsInJvbGUiOiJST0xFX1VTRVIiLCJpZCI6MSwiZXhwIjoxNjkwNDQ1OTMzLCJ1c2VybmFtZSI6InVzZXIxIn0.fMZBvQW__aGIFT2uWSrx2mAuhHOcAE-FyWv7niNPTbZen0EEO5JNs3UNCkj4miu3OwuFZSpE9s8g9ghX7mRVeA", // 여기에 발급받은 AccessToken을 넣어주세요
        },
      };
      const data = await UserInfo(sendData);
      console.log(data);
      setuserInfoData(data);
    } catch (error) {
      console.error("Error fetching sample data:", error);
    }
  };
  useEffect(() => {
    void getData(); // 데이터를 가져오는 함수를 호출합니다.
  }, []);

  return (
    <>
      <h1>Apitest</h1>
      {userInfoData && (
        <div>
          <p>PK: {userInfoData.id}</p>
          <p>ID: {userInfoData.username}</p>
          <p>phoneNumber: {userInfoData.phoneNumber}</p>
        </div>
      )}
    </>
  );
};
export default ApitestUserInfo;
