import "./ArtMemory.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import MarginTopInput from "../../commponents/EditCss/MaginTopInput";
import AMIntro from "../../commponents/ViewExhibition/AMIntro";
import { UserRecords, UserRecordsRes } from "../../api/UserApi";

const sampleData = [
  {
    id: 1,
    userKey: "a23dsd",
    exhibitionName: "거장의 시선, 사람을 향하다",
    posterUrl: "src/assets/exhibition/exhibition1.png",
    galleryName: "대영미술관",
    visitDate: "2023-08-09",
  },
  {
    id: 2,
    userKey: "b324sd",
    exhibitionName: "함스부르크 600년, 매혹의 걸작들",
    posterUrl: "src/assets/exhibition/exhibition2.png",
    galleryName: "루브르박물관",
    visitDate: "2023-08-10",
  },
];
const defaultRecord = {
  id: 1,
  userKey: "nothing",
  exhibitionName: "",
  posterUrl: "",
  galleryName: "",
  visitDate: "2023-08-09",
}; // 기본 세팅

function ArtMemory() {
  // 슬라이더 세팅
  const isMobile = window.innerWidth <= 1024;
  const [userRecords, setUserRecords] = useState<UserRecordsRes[]>([
    defaultRecord,
  ]); // 유저 전시 관람 정보 전체
  const [perView, setPerView] = useState(isMobile ? 1 : 3);


  const [sliderRef] = useKeenSlider({
    loop: true,
    slides: {
      perView: perView,
      spacing: 1,
    },
  });
  //  전시 기록 전체 조회
  useEffect(() => {
    void loadUserRecord();
  }, []);
  
  useEffect(() => {
    // Function to update the perView value based on window size
    const updatePerView = () => {
        

        if (userRecords.length == 1) {
          setPerView(2);
          if (window.innerWidth <= 1024) {
            setPerView(1);
            // setPerView(1);
          }
        } else {
          setPerView(3);
          if (window.innerWidth <= 1024) {
            setPerView(1);
          }
        }
      
      
    };
    window.addEventListener("resize", updatePerView);
    updatePerView();
    
  }, [userRecords]);


  // 유저 전시정보 조회 API
  const loadUserRecord = async () => {
    try {
      const response: [UserRecordsRes] = await UserRecords();
      console.log("User Records:", response);
      setUserRecords(sampleData);
    } catch (error) {
      console.error("Error UserRecords:", error);
      window.alert(error);
    }
  };

  return (
    <>
      {/* 모바일용 인트로 박스 */}
      {isMobile && (
        <div className="introBox" style={{ margin: "auto" }}>
          <AMIntro />
        </div>
      )}
      {/* 슬라이드 박스 */}
      <div className="slideContainer" >

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
        {userRecords[0].userKey == "nothing" &&  (
          <Link to={`/art-memory/1`} className="linkbox">
            <div className="keen-slider__slide number-slide">
              <div className="innerSlideBox_outter">
                <div className="innerSlideBox">
                  <div className="innerTxt1">
                    {`< 서비스를 이용하고 전시회를 기록해보세요 >`}
                    <p>{"샘플 확인하기"}</p>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        )}
        {userRecords[0].userKey == "" &&  (
          <Link to={`/art-memory/1`} className="linkbox" style={{margin:"auto"}}>
            <div className="number-slide" style={{width:"40vw"}}>
              <div className="innerSlideBox_outter">
                <div className="innerSlideBox">
                  <div className="innerTxt1">
                    {`< 서비스를 이용하고 전시회를 기록해보세요 >`}
                    <p>{"샘플 확인하기"}</p>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        )}

        {userRecords[0].userKey !== "" &&
          userRecords.map((slide, index) => (
            <Link
              to={{
                pathname: `/art-memory/${slide.id}`,
                search: `${slide.userKey}`,
              }}
              className="linkbox"
              key={index}
            >
              <div className="keen-slider__slide number-slide">
                <div className="innerSlideBox_outter">
                  <div className="innerSlideBox">
                    <img src={slide.posterUrl} alt="" />
                  </div>
                </div>
                <div className="innerTxt1">
                  {`< ${slide.exhibitionName} >`}{" "}
                </div>
                <div className="innerTxt2">
                  <div>{slide.galleryName} </div>
                  <div>{slide.visitDate}</div>
                </div>
              </div>
            </Link>
          ))}
      </div>
      </div>
      <MarginTopInput value={40} />
    </>
  );
}
export default ArtMemory;
