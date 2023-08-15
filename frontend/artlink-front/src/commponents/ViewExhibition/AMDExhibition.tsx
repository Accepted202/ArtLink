import { useState } from "react";
import Styles from "./AMD.module.css";
import poster from "../../assets/전시회.jpg";
import { UserOneRecordRes } from "../../api/UserApi";
import TextBtnFontsize from "../Base/TextBtnFontsize";

interface AMDExhibitionProps {
  onButtonClick: () => void;
  galleryData: UserOneRecordRes;
  isRightVisible: boolean;
}
function AMDExhibition({
  onButtonClick,
  galleryData,
  isRightVisible,
}: AMDExhibitionProps) {
  const [isFrameEnabled, setIsFrameVisible] = useState(true);

  const handleButtonClick = () => {
    setIsFrameVisible(!isFrameEnabled);
    onButtonClick();
  };

  return (
    <>
      {/* 갤러리의 특정 전시회를 불러와서 정보를 보여줌 */}
      <p className={`${Styles.AMDTitleTxt}`}>{galleryData.exhibitionName}</p>
      <div
        className={`${isFrameEnabled ? Styles.AMDFrame : Styles.AMDFrameOn}`}
      >
        <div className={`${Styles.AMDimageBox}`}>
          <img
            src={poster}
            alt="전시회를 준비중입니다."
            className={`${Styles.AMDimage}`}
          />
        </div>
        <div className={`${Styles.AMBRightBox}`}>
          <div
            className={`${Styles.AMDtxtBox} ${
              isRightVisible ? Styles.smallFontSize : Styles.largeFontSize
            }`}
          >
            {galleryData.exhibitionExplanation}
          </div>
          <div className={`${Styles.AMDbtnBox}`}>
            <div style={{width:"35%"}}>
              <TextBtnFontsize hei={"40px"} wid={"100%"} fontSize={12} inner="About Page"/>
            </div>
            <div style={{width:"50%"}} onClick={handleButtonClick} >
              <TextBtnFontsize hei={"40px"} wid={"100%"} fontSize={12} inner={`Your Record ${isFrameEnabled ? "▶" : "◀"}`}/>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default AMDExhibition;
