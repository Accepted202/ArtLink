import "./ArtMemory.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import MarginTopInput from "../../commponents/EditCss/MaginTopInput";
import AMIntro from "../../commponents/ViewExhibition/AMIntro";
import { UserRecords, UserRecordsRes } from "../../api/UserApi";

function ArtMemory() {
  // 슬라이더 세팅
  const isMobile = window.innerWidth <= 1024;
  const [userRecords, setUserRecords] = useState<[UserRecordsRes]>([
    {
      userKey: "",
      exhibitionName: "",
      posterUrl: "",
      galleryName: "",
      visitDate: "",
    },
  ]); // 유저 전시 관람 정보 전체
  const [perView, setPerView] = useState(isMobile ? 1 : 3);
  useEffect(() => {
    // Function to update the perView value based on window size
    const updatePerView = () => {
      if (window.innerWidth <= 1024) {
        setPerView(1);
      } else {
        setPerView(3);
      }
    };
    window.addEventListener("resize", updatePerView);
    updatePerView();
    return () => {
      window.removeEventListener("resize", updatePerView);
    };
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
  useEffect(() => {
    void loadUserRecord();
  }, []);
  return (
    <>
      <MarginTopInput value={50} />
      <div></div>
      {isMobile && (
        <div className="introBox mobileView" style={{ margin: "auto" }}>
          <AMIntro />
        </div>
      )}

      <div ref={sliderRef} className="keen-slider sliderbox minwid">
        {!isMobile && (
          <div className="keen-slider__slide number-slide">
            <div className="introBox webView">
              <AMIntro />
            </div>
          </div>
        )}

        {userRecords &&
          userRecords.map((slide, index) => (
            <Link to={`/art-memory/${index}`} className="linkbox" key={index}>
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
