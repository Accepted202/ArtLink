import React, { useEffect } from "react";
import { UserInfoRes, UserInfoReq, UserInfo } from "../../api/UserApi";

interface ApitestUserInfoProps {
  onUserDataChange: (data: UserInfoRes) => void;
}

const ApitestUserInfo: React.FC<ApitestUserInfoProps> = ({
  onUserDataChange,
}) => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const sendData: UserInfoReq = {
          headers: {
            Authorization:
              "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ1c2VyMSIsInJvbGUiOiJST0xFX1VTRVIiLCJpZCI6MSwiZXhwIjoxNjkwNDQ1OTMzLCJ1c2VybmFtZSI6InVzZXIxIn0.fMZBvQW__aGIFT2uWSrx2mAuhHOcAE-FyWv7niNPTbZen0EEO5JNs3UNCkj4miu3OwuFZSpE9s8g9ghX7mRVeA", // 여기에 발급받은 AccessToken을 넣어주세요
          },
        };
        const data = await UserInfo(sendData);
        console.log(data);

        // 부모 컴포넌트로 데이터 전달
        onUserDataChange(data);
      } catch (error) {
        console.error("Error fetching sample data:", error);
      }
    };

    void fetchData();
  }, []);

  return <></>;
};

export default ApitestUserInfo;
