// import React from "react";
import { Link } from "react-router-dom";
import "./PM.css";

function PageManager() {
  const PM: Record<string, string> = {
    // Add more components and their URLs as needed...
    Home: "/home",
    Entrance: "/",
    Login: "/login",
    Signup: "/signup",
    LoginGallery: "/login-gallery",
    LoginAdmin: "/login-admin",
    SignupGallery: "/signup-gallery",
    Password: "/login/password",
    PasswordGallery: "/login-gallery/password",
    // User
    ArtMemory: "/art-memory",
    ArtMemoryDetail: "/art-memory/1",
    ArtMemoryEdit: "/art-memory/1/edit",
    ThreeTest: "/art-memory/1/3d",
    MypageUser: "/mypage/user",
    // Gallery
    ExhibitionBoard: "/exhibition-board",
    ExhibitionDetail: "/exhibition-board/1",
    WorksCreate: "/exhibition-board/1/create",
    WorksDetail: "/exhibition-board/1/1",
    IoTAdd: "/gallery/add-iot",
    IoTBoard: "/gallery/iot-board",
    MypageGallery: "/mypage/gallery",
    // Manager
    UserBoard: "/user-board",
    UserDetail: "/user-board/1", // Example with parameter (replace '1' with an actual ID)
    GalleryBoard: "/gallery-board",
    GalleryDetail: "/gallery-board/1", // Example with parameter (replace '1' with an actual ID)
    GalleryCreate: "/gallery-board/create",
    // Kiosk
    Kiosk: "/kiosk/home",
    KioskDetail: "/kiosk/1", // Example with parameter (replace '1' with an actual ID)
    KioskPrint: "/kiosk/print",
    KioskExit: "/kiosk/exit",
    ComponentTest: "/component-test", // Example with parameter (replace '1' with an actual ID)
    // Other
    Contact: "/contact",
    AboutUs: "/about",
    NotFound: "/not-found",
    // Only Developer
    ThreeTestPage: "/3d",
    ApiTest: "/api",
    ApiTest_Login: "/api_login",
    ApiTest_Signup: "/api_signup",
    ApiTest_UserInfo: "/api_userinfo",
    PageManage: "/PM",
  };

  const sections = {
    Entrance: [
      "Home",
      "Entrance",
      "Login",
      "Signup",
      "LoginGallery",
      "SignupGallery",
      "LoginAdmin",
      "Password",
      "PasswordGallery",
    ],
    User: ["ArtMemory", "ArtMemoryDetail", "ThreeTest", "MypageUser"],
    Gallery: [
      "ExhibitionBoard",
      "ExhibitionDetail",
      "WorksCreate",
      "WorksDetail",
      "IoTAdd",
      "IoTBoard",
      "MypageGallery",
    ],
    Manager: [
      "UserBoard",
      "UserDetail",
      "GalleryBoard",
      "GalleryDetail",
      "GalleryCreate",
    ],
    Kiosk: ["Kiosk", "KioskDetail", "KioskPrint", "KioskExit", "ComponentTest"],
    Other: ["Contact", "AboutUs", "NotFound", "ThreeTestPage"],
  };
  const needworkPages = ["Password", "PasswordGallery", "AboutUs", "Contact"];
  return (
    <>
      <h1>PageManager</h1>
      <p>기능별 페이지에 클릭으로 접근하세요</p>
      {/* 로그인 구현 */}
      <div>
        <button className="PMBtn">Login to User1</button>
        <button className="PMBtn">Login to Gallery1</button>
        <button className="PMBtn">Login to Admin1</button>
        <button className="PMBtn">LogOut</button>
      </div>
      {/* 각 기능 접근 */}
      <div className="PMContainer">
        {Object.entries(sections).map(([sectionName, componentList]) => (
          <div key={sectionName} className="PMSection">
            <h3>{sectionName}</h3>
            {componentList.map((componentName) => (
              <Link key={componentName} to={PM[componentName]}>
                <button className="PMBtn">{componentName}</button>
              </Link>
            ))}
          </div>
        ))}
      </div>
      {/* 작업 목록 노트 */}
      <div className="workContainer">
        <div className="workPage">
          <h2>작업 필요한 페이지</h2>
          <div className="workButtons">
            {needworkPages.map((componentName) => (
              <Link key={componentName} to={PM[componentName]}>
                <button className="PMBtn">{componentName}</button>
              </Link>
            ))}
          </div>
        </div>
        <div className="workOther">
          <h3>{`<기능수정>`}</h3>
          <div style={{ fontSize: "12px" }}>
            <p>모달 컴포넌트 경량화</p>
            <p>작품 수정 성공시 모달창</p>
            <p>회원가입에 휴대전화번호 필드</p>
            <p>새로고침 버튼 만들기</p>
            <p>
              작품생성에서 이미지 없을시 경고문 띄우기 (한번 없을시 state
              초기화-이건 버그임)
            </p>
            <p>user 매니저에서 이미지 안뜸</p>
            <p>매니저 + 버튼 삭제</p>
            <p>about page 모바일시 출력되는 컴포넌트 수정</p>
          </div>
          <h3>{`<디자인수정>`}</h3>
          <div style={{ fontSize: "12px" }}>
            <p>모달창 x버튼 디자인</p>
            <p>전시회 생성에서 이미지 비율</p>
            <p>description 인풋필드 자동 줄바꿈(해결)</p>
            <p>위로 이동 버튼 디자인</p>
            <p>갤러리 마이페이지 key 라벨링</p>
            <p>전시회 설명 필드 text area변경</p>
            <p>작품 생성 디폴트 이미지 변경</p>
          </div>
          <h3>{`<ETC>`}</h3>
          <div style={{ fontSize: "12px" }}>
            <p>API 에러발생 처리 전부</p>
            <p>Search 기능 구현 여부(해결)</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default PageManager;
