import { useState } from "react";
import Styles from "./CreateExhibition.module.css";
import TextBtn from "../Base/TextBtn";
import ExhibitionProfile from "./ExhibitionProfile";
import { ExhibitionCreate, ExhibitionCreateReq } from "../../api/GalleryApi";
import Modal from "../Base/Form/ExhibitionModal/Modal";

function CreateExhibition() {
  const [exhibitionInfo, setExhibitionInfo] = useState<ExhibitionCreateReq>({
    exhibitionName: "",
    exhibitionExplanation: "",
  });
  const [isModalActive, setisModalActive] = useState<boolean>(false); // 모달 활성 boolean
  // 필드별 출력 이름
  const initialFields = [
    { name: "exhibitionName", placeholder: "전시회 이름" },
    { name: "exhibitionExplanation", placeholder: "전시회 설명" },
  ];
  // 인풋필드 변경시 저장
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setExhibitionInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };
  // 전시회 생성 함수 호출 및 결과 저장
  const callCreateExhibition = async () => {
    try {
      const response = await ExhibitionCreate(exhibitionInfo);
      console.log("Exhibition created:", response);
      setisModalActive(true);
    } catch (error) {
      console.error("Error creating exhibition:", error);
    }
  };
  // 생성 버튼 클릭시
  const handleCreateExhibition = () => {
    void callCreateExhibition();
  };
  return (
    <>
      <Modal sendActive={isModalActive} />
      {/* 전시회 생성 */}
      <div className={Styles.ExhibitionInfo}>
        <div className={Styles.ExhibitionInner}>
          {/* 이미지 박스 */}
          <div className={Styles.ExhibitionProfile}>
            <ExhibitionProfile isChanged={false} />
          </div>
          {/* 텍스트 박스 */}
          <div className={Styles.ExhibitionTxt}>
            {initialFields.map((field) => (
              <>
                <div
                  className={Styles.ExhibitionInputContainer}
                  key={field.name}
                >
                  <p>{field.placeholder} : </p>
                  <input
                    type="text"
                    name={field.name}
                    value={exhibitionInfo[field.name]}
                    onChange={handleInputChange}
                    className={Styles.ExhibitionInput}
                  />
                </div>
              </>
            ))}
          </div>
        </div>
        {/* 생성 전송 */}
        <div onClick={handleCreateExhibition}>
          <TextBtn inner={"CREATE"} wid={200} hei={50} />
        </div>
      </div>
    </>
  );
}
export default CreateExhibition;
