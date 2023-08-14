import { useState } from "react";
import GDApi from "./GDApi";
import { OneGalleryEach, AcceptGallery } from "../../api/ManagerApi";
import Styles from "../../commponents/Mypage/Profile.module.css";
import Styles2 from "../../pages/Common/Mypage.module.css";
import BackBtn from "../../commponents/Base/BackBtn";
import MarginTopInput from "../../commponents/EditCss/MaginTopInput";
import { setAuthorizationHeader } from "../../commponents/Base/BaseFun";
import Modal from "../../commponents/Base/Form/MypageEditModal/Modal";
import TextareaAutosize from "react-textarea-autosize";

function GalleryDetail() {
  const [galleryData, setgalleryData] = useState<OneGalleryEach | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  // 화면에 보일 라벨링
  const labelMapping: Record<string, string> = {
    id: "PK",
    username: "아이디",
    galleryName: "갤러리명",
    accepted: "관리자 승인",
    description: "갤러리 소개",
  };
  labelMapping;
  const [isModalActive, setisModalActive] = useState<boolean>(false); // 모달 활성 boolean

  const fieldNames: Record<keyof OneGalleryEach, string> = {
    id: "",
    username: "ID",
    galleryName: "갤러리명",
    accepted: "승인 여부",
    description: "설명",
  };

  // 자식 컴포넌트에서 받아온 데이터를 상태에 저장하는 콜백 함수
  const handleGalleryInfoData = (data: OneGalleryEach) => {
    console.log(data);
    setgalleryData(data);
    setLoading(false); // Data has been fetched, set loading to false
  };

  const handleAccept = async () => {
    try {
      setAuthorizationHeader();
      if (galleryData !== null) {
        const response = await AcceptGallery(galleryData.id);
        console.log(response);
        setisModalActive(true);
      }
    } catch (error) {
      window.alert("갤러리 승인 실패");
    }
  };

  return (
    <>
      <Modal sendActive={isModalActive} />
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
                  <p style={{ fontSize: "21px", fontWeight: "600" }}>
                    갤러리 정보
                  </p>
                  {Object.entries(galleryData).map(
                    ([key, value]) =>
                      key !== "id" && (
                        <div key={key}>
                          <p key={key}>
                            {fieldNames[key]}:{" "}
                            {key === "accepted" ? (
                              value ? (
                                <span>✅ 승인되었습니다.</span>
                              ) : (
                                // eslint-disable-next-line @typescript-eslint/no-misused-promises
                                <button onClick={handleAccept}>승인</button>
                              )
                            ) : key === "description" ? (
                              <TextareaAutosize
                                name={key}
                                value={galleryData[key]}
                                className={Styles.profileTextArea}
                                disabled
                              />
                            ) : (
                              <span>{value}</span>
                              // <input
                              //   type="text"
                              //   name={key}
                              //   value={value as string}
                              //   disabled={true}
                              //   className={Styles.profileInput}
                              // />
                            )}
                          </p>
                        </div>
                      )
                  )}
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
