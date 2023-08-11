import { useState } from "react";
import GDApi from "./GDApi";
import { OneGalleryEach } from "../../api/ManagerApi";
import Styles from "../../commponents/Mypage/Profile.module.css";
import Styles2 from "../../pages/Common/Mypage.module.css";
import BackBtn from "../../commponents/Base/BackBtn";
import MarginTopInput from "../../commponents/EditCss/MaginTopInput";

function GalleryDetail() {
  const [galleryData, setgalleryData] = useState<OneGalleryEach | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // 자식 컴포넌트에서 받아온 데이터를 상태에 저장하는 콜백 함수
  const handleGalleryInfoData = (data: OneGalleryEach) => {
    console.log(data);
    setgalleryData(data);
    setLoading(false); // Data has been fetched, set loading to false
  };

  return (
    <>
      {/* 뒤로가기버튼 */}
      <div className={Styles.BackBtn}>
        <BackBtn />
      </div>
      {/* 프로필 컨테이너 */}
      <div className={Styles2.Mypagecontainer}>
        {loading ? ( // Show loading message if data is being fetched
          <>
            <h3>Loading...</h3>
            <p>The server is under maintenance. Please try again later.</p>
          </>
        ) : (
          <div className={Styles.MypageinnerBox}>
            {/* 프로필 데이터 */}
            {galleryData && (
              <div className={Styles.infoOuterBoxRightGal}>
                <div className={Styles.infoInnerBoxRightGal}>
                  <p style={{ fontSize: "25px", fontWeight: "600" }}>
                    Gallery Information
                  </p>
                  {Object.entries(galleryData).map(([key, value]) => (
                    <div key={key}>
                      {key === "description" ? ( // Check if the key is "description"
                        <>
                          <p>{key}:</p>
                          <textarea
                            name={key}
                            value={galleryData[key]}
                            className={Styles.profileTextArea}
                          />
                        </>
                      ) : (
                        <p key={key}>
                          {key}:{" "}
                          <input
                            type="text"
                            name={key}
                            value={value as string}
                            disabled={true}
                            className={Styles.profileInput}
                          />
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
        <MarginTopInput value={40} />
        {/* 갤러리 정보 로딩 컴포넌트 */}
        <GDApi onGalleryDataChange={handleGalleryInfoData} />
      </div>
    </>
  );
}

export default GalleryDetail;
