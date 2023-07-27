import { useState } from "react";
import ProfileUserApi from "./ProfileUserApi";
import { UserInfoRes } from "../../api/UserApi";
import ProfileBox from "./ProfileBox";
import Styles from "./Profile.module.css";

function ProfileUser() {
  const [userData, setUserData] = useState<UserInfoRes | null>(null);

  // 자식 컴포넌트에서 받아온 데이터를 상태에 저장하는 콜백 함수
  const handleUserInfoData = (data: UserInfoRes) => {
    setUserData(data);
  };
  // input 필드의 값을 변경하여 userData를 업데이트하는 함수
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUserData((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <>
      <div className={Styles.infoOuterBoxLeft}>
        <div className={Styles.infoInnerBoxLeft}>
          <ProfileBox />
        </div>
      </div>
      <ProfileUserApi onUserDataChange={handleUserInfoData} />
      {/* 불러온 데이터로 꾸미기 */}
      {userData && (
        <div className={Styles.infoOuterBoxRight}>
          <div className={Styles.infoInnerBoxRight}>
            <p style={{ fontSize: "25px", fontWeight: "600" }}>
              User Infromation
            </p>
            {Object.keys(userData).map((key) => (
              <p key={key}>
                {key}:{" "}
                <input
                  type="text"
                  name={key}
                  value={userData[key]}
                  onChange={handleInputChange}
                  className={Styles.profileInput}
                />
              </p>
            ))}
          </div>
        </div>
      )}
      {/* 데이터 변경요청 */}
      <div className={Styles.changeBtn}>
        <div>{">"}</div>
        <div>change</div>
      </div>
    </>
  );
}

export default ProfileUser;
