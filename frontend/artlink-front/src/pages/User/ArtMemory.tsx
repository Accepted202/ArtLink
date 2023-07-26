import "./ArtMemory.css";
import { Link } from "react-router-dom";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import MarginTopInput from "../../commponents/EditCss/MaginTopInput";

function ArtMemory() {
  // 슬라이더 세팅
  const [sliderRef] = useKeenSlider({
    loop: true,
    slides: {
      perView: 3,
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

  return (
    <>
      <MarginTopInput value={80} />
      <div ref={sliderRef} className="keen-slider sliderbox">
        <Link to="#" className="linkbox">
          <div className="keen-slider__slide number-slide">
            <div className="introBox ">
              <div>
                <p className="introtxt">Your Memory</p>
                <p className="introtxt2">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut
                  maiores corporis amet eius assumenda nesciunt consequuntur
                  explicabo at aliquam ipsa sunt voluptate earum vitae magni,
                  beatae, nobis veniam eveniet aut ea incidunt! Id vitae cumque
                  officia aliquam iste culpa natus hic et magni vero placeat
                  libero, iusto beatae atque rem non adipisci quas veritatis
                </p>
              </div>
            </div>
          </div>
        </Link>
        {slides.map((slide, index) => (
          <Link to="#" className="linkbox" key={index}>
            <div className="keen-slider__slide number-slide">
              <div className="innerSlideBox">{slide.title}</div>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
export default ArtMemory;
