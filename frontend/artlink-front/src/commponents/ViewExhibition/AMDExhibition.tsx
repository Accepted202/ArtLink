import { useState } from "react";
import Styles from "./AMD.module.css";
import poster from "../../assets/전시회.jpg";
import { UserOneRecordRes } from "../../api/UserApi";

interface AMDExhibitionProps {
  onButtonClick: () => void;
  galleryData: UserOneRecordRes;
}
function AMDExhibition({ onButtonClick, galleryData }: AMDExhibitionProps) {
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
          <div className={`${Styles.AMDtxtBox}`}>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dicta
            delectus ipsam, optio ipsa quaerat asperiores hic distinctio vitae
            esse, mollitia ex aut similique magni, omnis iste libero at impedit
            nisi reprehenderit cupiditate. Minus, non in deleniti voluptates
            ipsam similique ea ducimus facere libero! Non necessitatibus officia
            totam vitae cum illo veritatis maxime voluptate, deserunt
            consequatur, sapiente dolor nam at earum id temporibus delectus
            aliquam possimus fugiat. Voluptatum, distinctio. Veniam suscipit
            mollitia esse aliquid omnis. Fuga vero fugiat tempore deserunt
            laborum?
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
