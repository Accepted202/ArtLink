import { useState } from "react";
import ProfileUserApi from "./ProfileUserApi";
import { UserInfoRes } from "../../api/UserApi";
import ProfileBox from "./ProfileBox";
import Styles from "./Profile.module.css";

function ProfileUser() {
  const [userData, setUserData] = useState<UserInfoRes | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // 자식 컴포넌트에서 받아온 데이터를 상태에 저장하는 콜백 함수
  const handleUserInfoData = (data: UserInfoRes) => {
    setUserData(data);
    setLoading(false); // Data has been fetched, set loading to false
  };

  // input 필드의 값을 변경하여 userData를 업데이트하는 함수
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUserData((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <>
      {loading ? ( // Show loading message if data is being fetched
        <h1>Loading...</h1>
      ) : (
        <div className={Styles.MypageinnerBox}>
          {/* 왼쪽 박스 (프로필 이미지) */}
          <div className={Styles.infoOuterBoxLeft}>
            <div className={Styles.infoInnerBoxLeft}>
              <ProfileBox />
            </div>
          </div>
          {/* 오른쪽 박스 (프로필 데이터) */}
          {userData && (
            <div className={Styles.infoOuterBoxRight}>
              <div className={Styles.infoInnerBoxRight}>
                <p style={{ fontSize: "25px", fontWeight: "600" }}>
                  User Information
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
        </div>
      )}
      <ProfileUserApi onUserDataChange={handleUserInfoData} />
      {/* 데이터 변경요청 */}
      {loading ? null : <button className={Styles.changeBtn}>change</button>}
    </>
  );
}

export default ProfileUser;
