import { useState } from "react";
import Styles from "./CreateExhibition.module.css";
import TextBtn from "../Base/TextBtn";
import ExhibitionProfile from "./ExhibitionProfile";
import { ExhibitionCreateReq } from "../../api/GalleryApi";
import TextareaAutosize from 'react-textarea-autosize';

function CreateExhibition() {
  const [exhibitionInfo, setExhibitionInfo] = useState<ExhibitionCreateReq>({
    exhibitionName: "",
    exhibitionExplanation: "",
  });
  const [isChange, setisChange] = useState<boolean>(false); // 이미지변경 활성 boolean
  // 필드별 출력 이름
  const initialFields = [
    { name: "exhibitionName", placeholder: "전시회 이름" },
    { name: "exhibitionExplanation", placeholder: "전시회 설명" },
  ];
  // 인풋필드 변경시 저장
  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setExhibitionInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };
  // 생성 버튼 클릭시
  const handleCreateExhibition = () => {
    if (exhibitionInfo.exhibitionName == "") {
      window.alert("Please fill exhibitionName")
    } else if (exhibitionInfo.exhibitionExplanation == "") {
      window.alert("Please fill exhibitionExplanation")
    } else {
      setisChange(true);
    }
  };
  // 조건에 맞지 않을시 다시 세팅
  const handleSetisChange = () => {
    setisChange(false);
  };
  return (
    <>
      {/* 전시회 생성 */}
      <div className={Styles.ExhibitionInfo}>
        <div className={Styles.ExhibitionInner}>
          {/* 이미지 박스 */}
          <div className={Styles.ExhibitionProfile}>
            <ExhibitionProfile
              isChanged={isChange}
              exhibitionInfo={exhibitionInfo}
              handleSetisChange = {handleSetisChange}
            />
          </div>
          {/* 텍스트 박스 */}
          <div className={Styles.ExhibitionTxt}>
            {initialFields.map((field) => (
                <div
                  className={Styles.ExhibitionInputContainer}
                  key={field.name}
                >
                  <p>{field.placeholder}</p>
                  <TextareaAutosize
                    name={field.name}
                    value={exhibitionInfo[field.name]}
                    onChange={handleInputChange}
                    className={Styles.ExhibitionInput}
                  />
                </div>
            ))}
          </div>
        </div>
        {/* 생성 전송 */}
        <div onClick={handleCreateExhibition} style={{ display: "inline-block", textAlign: "center" }}>
          <TextBtn inner={"CREATE"} wid={200} hei={50} />
        </div>
      </div>
    </>
  );
}
export default CreateExhibition;
