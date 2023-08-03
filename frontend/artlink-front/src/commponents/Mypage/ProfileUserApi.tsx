import React, { useEffect } from "react";
import { UserInfoRes, UserInfo } from "../../api/UserApi";
import axios from "axios";

interface ApitestUserInfoProps {
  onUserDataChange: (data: UserInfoRes) => void;
}

const ApitestUserInfo: React.FC<ApitestUserInfoProps> = ({
  onUserDataChange,
}) => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const accessToken = localStorage.getItem("access_token");
        axios.defaults.headers.common["Authorization"] = `Bearer ${
          accessToken as string
        }`;

        const data = await UserInfo();
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
