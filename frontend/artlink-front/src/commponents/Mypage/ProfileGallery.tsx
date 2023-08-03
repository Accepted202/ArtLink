import { useState } from "react";
import ProfileGalleryApi from "./ProfileGalleryApi";
import { GalleryInfoRes } from "../../api/GalleryApi";
import ProfileBox from "./ProfileBox";
import Styles from "./Profile.module.css";

function ProfileUser() {
  const [galleryData, setgalleryData] = useState<GalleryInfoRes | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // 자식 컴포넌트에서 받아온 데이터를 상태에 저장하는 콜백 함수
  const handleGalleryInfoData = (data: GalleryInfoRes) => {
    setgalleryData(data);
    setLoading(false); // Data has been fetched, set loading to false
  };

  // input 필드의 값을 변경하여 galleryData를 업데이트하는 함수
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setgalleryData((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <>
      {loading ? ( // Show loading message if data is being fetched
        <>
          <h3>Loading...</h3>
          <p>The server is under maintenance. Please try again later.</p>
        </>
      ) : (
        <div className={Styles.MypageinnerBox}>
          {/* 왼쪽 박스 (프로필 이미지) */}
          <div className={Styles.infoOuterBoxLeft}>
            <div className={Styles.infoInnerBoxLeft}>
              <ProfileBox />
            </div>
          </div>
          {/* 오른쪽 박스 (프로필 데이터) */}
          {galleryData && (
            <div className={Styles.infoOuterBoxRight}>
              <div className={Styles.infoInnerBoxRight}>
                <p style={{ fontSize: "25px", fontWeight: "600" }}>
                  Gallery Information
                </p>
                {Object.keys(galleryData).map((key) => (
                  <p key={key}>
                    {key}:{" "}
                    <input
                      type="text"
                      name={key}
                      value={galleryData[key]}
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
      <ProfileGalleryApi onGalleryDataChange={handleGalleryInfoData} />
      {/* 데이터 변경요청 */}
      {loading ? null : <button className={Styles.changeBtn}>change</button>}
    </>
  );
}

export default ProfileUser;
