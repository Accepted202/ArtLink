import { useState } from "react";
import Styles from "./AMD.module.css";
import poster from "../../assets/전시회.jpg";
import { UserOneRecordRes } from "../../api/UserApi";

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
            <button className={`${Styles.AMDLinkBtn}`}>About Page</button>
            <button
              className={`${Styles.AMDMyrecordBtn}`}
              onClick={handleButtonClick}
            >
              Your Record &nbsp; &nbsp; {isFrameEnabled ? "▶" : "◀"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
export default AMDExhibition;
