import "./ArtMemory.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import MarginTopInput from "../../commponents/EditCss/MaginTopInput";
import AMIntro from "../../commponents/ViewExhibition/AMIntro";

function ArtMemory() {
  // 슬라이더 세팅
  const isMobile = window.innerWidth <= 1024;
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
      spacing: 50,
    },
  });
  //받아온 전시관람 정보
  const slides = [
    { title: "2" },
    { title: "3" },
    { title: "4" },
    { title: "5" },
  ];
  // 소개글 위치 조정

  return (
    <>
      <MarginTopInput value={50} />
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

        {slides.map((slide, index) => (
          <Link to={`/art-memory/${index}`} className="linkbox" key={index}>
            <div className="keen-slider__slide number-slide">
              <div className="innerSlideBox">{slide.title}</div>
            </div>
          </Link>
        ))}
      </div>
      <MarginTopInput value={40} />
    </>
  );
}
export default ArtMemory;
