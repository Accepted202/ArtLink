import { useState } from "react";
import ProfileGalleryApi from "./ProfileGalleryApi";
import { GalleryInfoRes, GalleryInfoEdit } from "../../api/GalleryApi";
import Styles from "./Profile.module.css";
import Modal from "../../commponents/Base/Form/MypageEditModal/Modal";
import TextareaAutosize from "react-textarea-autosize";

function ProfileUser() {
  const [isModalActive, setisModalActive] = useState(false);
  const [galleryData, setgalleryData] = useState<GalleryInfoRes>({
    username: "",
    galleryName: "",
    accepted: true,
    description: "",
  });
  const [loading, setLoading] = useState<boolean>(true);
  // 화면에 보일 라벨링
  const labelMapping: Record<string, string> = {
    username: "아이디",
    galleryName: "갤러리명",
    accepted: "관리자 승인",
    description: "갤러리 소개",
  };

  // 자식 컴포넌트에서 받아온 데이터를 상태에 저장하는 콜백 함수
  const handleGalleryInfoData = (data: GalleryInfoRes) => {
    console.log(data);
    setgalleryData(data);
    setLoading(false); // Data has been fetched, set loading to false
  };

  // input 필드의 값을 변경하여 galleryData를 변경하는 함수
  const handleInputChange = (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setgalleryData((prevData) => ({ ...prevData, [name]: value }));
  };

  // 갤러리 정보 업데이트
  const updateGalleryinfo = async () => {
    try {
      const data = await GalleryInfoEdit(galleryData);
      console.log("업데이트후 받아온", data);
      setisModalActive(true);
    } catch (error) {
      console.error("Error UserInfoEdit:", error);
    }
  };

  return (
    <>
      <Modal sendActive={isModalActive} />
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
                  <hr />
                </p>
                {Object.entries(galleryData).map(([key, value]) => (
                  <div key={key} className={Styles.eachField}>
                    {key === "description" ? ( // Check if the key is "description"
                      <>
                        <div style={{ marginTop: "10px" }}></div>
                        {labelMapping[key]}:{" "}
                        <TextareaAutosize
                          name={key}
                          value={galleryData[key]}
                          onChange={handleInputChange}
                          className={Styles.profileTextArea}
                        />
                      </>
                    ) : (
                      <>
                        {labelMapping[key]}:{" "}
                        <input
                          type="text"
                          name={key}
                          value={value as string}
                          onChange={handleInputChange}
                          disabled={key !== "description"}
                          className={Styles.profileInput}
                        />
                      </>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
      {/* 갤러리 정보 로딩 컴포넌트 */}
      <ProfileGalleryApi onGalleryDataChange={handleGalleryInfoData} />
      {/* 데이터 변경요청 버튼 */}
      {loading ? null : (
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        <button className={Styles.changeBtn} onClick={updateGalleryinfo}>
          change
        </button>
      )}
    </>
  );
}

export default ProfileUser;
