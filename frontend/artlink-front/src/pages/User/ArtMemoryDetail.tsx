import { useEffect, useState } from "react";

import Styles from "./ArtMemoryDetail.module.css";
import MarginTopInput from "../../commponents/EditCss/MaginTopInput";
import AMDExhibition from "../../commponents/ViewExhibition/AMDExhibition";
import AMDMyrecord from "../../commponents/ViewExhibition/AMDMyrecord";
import BackBtn from "../../commponents/Base/BackBtn";
import { useLocation } from "react-router-dom";
import { UserOneRecord, UserOneRecordRes } from "../../api/UserApi";
const defaultMemory = {
  exhibitionID: 0,
  exhibitionName: "다빈치에서 마티스까지",
  galleryID: 0,
  galleryName: "양평군립미술관",
  visitDate: "2023-08-02",
  workList: [
    { paintName: "작품1", paintPath: "src/assets/모나리자" },
    { paintName: "작품2", paintPath: "src/assets/고흐" },
  ],
};
function ArtMemoryDetail() {
  const location = useLocation();
  const [memoryData, setMemoryData] = useState<UserOneRecordRes>(defaultMemory);
  const [isLeftVisible, setIsLeftVisible] = useState(true); // State variable for left div visibility
  const [isRightVisible, setIsRightVisible] = useState(false); // State variable for right div visibility

  const toggleVisibility = () => {
    setIsRightVisible(!isRightVisible);
  };

  const toggleVisibilityR = () => {
    setIsLeftVisible(!isLeftVisible);
  };
  // userKey로 데이터 조회
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const pk = searchParams.get("userKey");
    const fetchMemory = async () => {
      if (pk) {
        const fetchedExhibitions = await UserOneRecord(pk);
        console.log(fetchedExhibitions);
        setMemoryData(fetchedExhibitions);
      }
    };
    void fetchMemory();
  }, []);
  return (
    <>
      <BackBtn />
      <MarginTopInput value={10} />
      <div className={Styles["artmemory-container"]}>
        {/* Left div with the button */}
        <div
          className={`${Styles.artdetailLeft}`}
          style={{
            width: isLeftVisible ? "100%" : "100%",
            display: isLeftVisible ? "block" : "none",
          }}
        >
          <div style={{ fontFamily: "SUITE-Regular" }}>
            {/* <button onClick={toggleVisibility}>좌버튼</button> */}
            <AMDExhibition
              onButtonClick={toggleVisibility}
              galleryData={memoryData}
            />
          </div>
        </div>

        {/* Right div */}
        <div
          className={`${Styles.artdetailRight}`}
          style={{
            display: isRightVisible ? "block" : "none",
            width: isLeftVisible ? "80%" : "100%",
          }}
        >
          <button onClick={toggleVisibilityR}>우버튼</button>
          <AMDMyrecord userData={memoryData} isLeftVisible={isLeftVisible} />
        </div>
      </div>
    </>
  );
}

export default ArtMemoryDetail;
