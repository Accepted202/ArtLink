import { useEffect, useState } from "react";
import Styles from "./ArtMemoryDetail.module.css";
import Styles2 from "../../commponents/ViewExhibition/AMD.module.css";
import MarginTopInput from "../../commponents/EditCss/MaginTopInput";
import AMDExhibition from "../../commponents/ViewExhibition/AMDExhibition";
import AMDMyrecord from "../../commponents/ViewExhibition/AMDMyrecord";
import BackBtn from "../../commponents/Base/BackBtn";
import { useLocation } from "react-router-dom";
import { UserOneRecord, UserOneRecordRes } from "../../api/UserApi";
import TextBtnFontsize from "../../commponents/Base/TextBtnFontsize";

const defaultMemory = {
  exhibitionID: 0,
  exhibitionName: "다빈치에서 마티스까지",
  exhibitionDescription:
    "섬세한 손놀림과 창의적인 아이디어가 어우러진 뛰어난 예술 작품들을 만나보실 수 있는 특별한 전시회를 소개합니다. 다양한 장르와 스타일의 작품들이 아름다운 공간을 가득 채우며 관람객들에게 시각적인 감동을 선사할 것입니다. 예술가들의 열정과 탐구정신이 그대로 묻어나는 이번 전시회에서 예술의 매력에 빠져보세요. 문화와 예술의 아름다움을 만끽할 수 있는 이 기회를 놓치지 마세요.",
  galleryID: 0,
  galleryName: "양평군립미술관",
  visitDate: "2023-08-02",
  workList: [
    { paintName: "작품1", paintPath: "/src/assets/artwork/artwork1.jpg" },
    { paintName: "작품2", paintPath: "/src/assets/artwork/artwork2.jpg" },
    { paintName: "작품3", paintPath: "/src/assets/artwork/artwork3.jpg" },
    { paintName: "작품4", paintPath: "/src/assets/artwork/artwork4.png" },
    { paintName: "작품5", paintPath: "/src/assets/artwork/artwork5.png" },
    { paintName: "작품6", paintPath: "/src/assets/artwork/artwork6.png" },
  ],
};
function ArtMemoryDetail() {
  const location = useLocation();
  const [memoryData, setMemoryData] = useState<UserOneRecordRes>(defaultMemory);
  const [isLeftVisible, setIsLeftVisible] = useState(true); // State variable for left div visibility
  const [isRightVisible, setIsRightVisible] = useState(false); // State variable for right div visibility
  const [isMobile, setIsMobile] = useState(true);

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
    console.log(pk);
    const fetchMemory = async () => {
      if (pk) {
        const fetchedExhibitions = await UserOneRecord(pk);
        console.log(fetchedExhibitions);
        setMemoryData(fetchedExhibitions);
      }
    };
    void fetchMemory();
  }, []);
  // 모바일 확인여부
  const handleResize = () => {
    if (window.innerWidth < 767) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  };
  useEffect(() => {
    // 창 크기가 변경될 때마다 handleResize 함수 호출
    window.addEventListener("resize", handleResize);
    // 컴포넌트가 unmount될 때 이벤트 리스너 제거
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <>
      <div className="worksBackBtn">
        <BackBtn />
        <div className="workTitle">전시 기록 살펴보기</div>
      </div>
      <MarginTopInput value={10} />
      <div
        className={Styles["artmemory-container-outter"]}
        style={{
          width: isRightVisible ? (isLeftVisible ? "80vw" : "40vw") : "40vw",
          minWidth: isRightVisible ? "400px" : "400px",
          maxWidth: isRightVisible
            ? isLeftVisible
              ? "900px"
              : "600px"
            : "600px",
        }}
      >
        <div
          className={Styles["artmemory-container"]}
          style={{
            width: isRightVisible ? "80vw" : "40vw",
            minWidth: isRightVisible ? "400px" : "400px",
          }}
        >
          {/* Left div with the button */}
          <div
            className={`${Styles.artdetailLeft}`}
            style={{
              width: isLeftVisible ? "100%" : "100%",
              display: isLeftVisible ? "flex" : "none",
            }}
          >
            <div
              style={{
                fontFamily: "SUITE-Regular",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <AMDExhibition
                onButtonClick={toggleVisibility}
                galleryData={memoryData}
                isRightVisible={isRightVisible}
              />
            </div>
          </div>

          {/* Right div */}
          <div
            className={`${
              isLeftVisible ? Styles.artdetailRight3 : Styles.artdetailRight2
            }`}
            style={{
              display: isRightVisible
                ? isLeftVisible
                  ? isMobile
                    ? "block"
                    : "flex"
                  : "block"
                : "none",
            }}
          >
            <div
              className={`${
                isLeftVisible ? Styles.artdetailRight : Styles.artdetailRight2
              }`}
              style={{
                display: isRightVisible
                  ? isLeftVisible
                    ? isMobile
                      ? "block"
                      : "flex"
                    : "block"
                  : "none",
              }}
            >
              <div
                className={`${
                  isLeftVisible ? Styles.artdetailRight : Styles.artdetailRight2
                }`}
                style={{
                  display: isRightVisible
                    ? isLeftVisible
                      ? isMobile
                        ? "block"
                        : "flex"
                      : "block"
                    : "none",
                }}
              >
                {/* 상단바 */}
                <div className={`${Styles.MyrecordHead}`}>
                  {" "}
                  <p
                    className={`${Styles2.AMDTitleTxt}`}
                    style={{
                      fontSize: isLeftVisible ? "13px" : "16px",
                      justifyContent: isLeftVisible ? "center" : "center",
                      border: "none",
                    }}
                  >
                    당신의 전시여정
                  </p>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-around",
                      width: "100%",
                    }}
                  >
                    <div style={{ width: "35%" }} onClick={toggleVisibilityR}>
                      <TextBtnFontsize
                        fontSize={12}
                        hei={"30px"}
                        wid={"100%"}
                        inner="확대/축소"
                      />
                    </div>
                  </div>
                </div>
                {/* 본내용 */}
                <AMDMyrecord
                  userData={memoryData}
                  isLeftVisible={isLeftVisible}
                  isRightVisible={isRightVisible}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <MarginTopInput value={100} />
    </>
  );
}

export default ArtMemoryDetail;
