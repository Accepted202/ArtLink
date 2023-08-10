import "./ArtMemory.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import MarginTopInput from "../../commponents/EditCss/MaginTopInput";
import AMIntro from "../../commponents/ViewExhibition/AMIntro";
import { UserRecords, UserRecordsRes } from "../../api/UserApi";

const defaultRecord = {
  id: 1,
  userKey: "",
  exhibitionName: "",
  posterUrl: "",
  galleryName: "",
  visitDate: "2023-08-09",
}; // 기본 세팅

function ArtMemory() {
  // 슬라이더 세팅
  const isMobile = window.innerWidth <= 1024;
  const [userRecords, setUserRecords] = useState<[UserRecordsRes]>([
    defaultRecord,
  ]); // 유저 전시 관람 정보 전체
  const [perView, setPerView] = useState(isMobile ? 1 : 3);
  useEffect(() => {
    // Function to update the perView value based on window size
    const updatePerView = () => {
      if (window.innerWidth <= 1024) {
        setPerView(1);
      } else {
        if (userRecords.length == 1) {
          setPerView(2);
        } else {
          setPerView(3);
        }
      }
    };
    window.addEventListener("resize", updatePerView);
    updatePerView();
  }, []);

  //  전시 기록 전체 조회
  useEffect(() => {
    void loadUserRecord();
  }, []);
  const [sliderRef] = useKeenSlider({
    loop: true,
    slides: {
      perView: perView,
      spacing: 1,
    },
  });
  // 유저 전시정보 조회 API
  const loadUserRecord = async () => {
    try {
      const response: [UserRecordsRes] = await UserRecords();
      console.log("User Records:", response);
      setUserRecords(response);
    } catch (error) {
      console.error("Error UserRecords:", error);
      window.alert(error);
    }
  };
  return (
    <>
      <MarginTopInput value={50} />
      <div></div>
      {/* 모바일용 인트로 박스 */}
      {isMobile && (
        <div className="introBox mobileView" style={{ margin: "auto" }}>
          <AMIntro />
        </div>
      )}
      {/* 슬라이드 박스 */}
      <div ref={sliderRef} className="keen-slider sliderbox minwid">
        {/* 비모바일용 인트로 박스 */}
        {!isMobile && (
          <div className="keen-slider__slide number-slide">
            <div className="introBox webView">
              <AMIntro />
            </div>
          </div>
        )}
        {/* API로 로드한 정보로 슬라이드 구성 */}
        {userRecords[0].userKey == "" && (
          <Link to={`/art-memory`} className="linkbox">
            <div className="keen-slider__slide number-slide">
              <div className="innerSlideBox">
                <div className="innerTxt1">
                  {`< 서비스를 이용하고 전시회를 기록해보세요 >`}{" "}
                </div>
              </div>
            </div>
          </Link>
        )}

        {userRecords[0].userKey !== "" &&
          userRecords.map((slide, index) => (
            <Link
              to={{
                pathname: `/art-memory/${slide.id}?userKey=${slide.userKey}`,
              }}
              className="linkbox"
              key={index}
            >
              <div className="keen-slider__slide number-slide">
                <div className="innerSlideBox">
                  <div className="innerTxt1">
                    {`< ${slide.exhibitionName} >`}{" "}
                  </div>
                  <img src={slide.posterUrl} alt="" />
                  <div className="innerTxt2">
                    <div>{slide.galleryName} </div>
                    <div>{slide.visitDate}</div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
      </div>
      <MarginTopInput value={40} />
    </>
  );
}
export default ArtMemory;
