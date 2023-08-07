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
    WorksCreate: "/exhibition-board/1/works/create",
    WorksDetail: "/exhibition-board/1/works/1",
    IoTAdd: "/gallery/add-iot",
    IoTBoard: "/gallery/iot-board",
    MypageGallery: "/mypage/gallery",
    // Manager
    UserBoard: "/user-board",
    UserDetail: "/user-board/1", // Example with parameter (replace '1' with an actual ID)
    GalleryBoard: "/gallery-board",
    GalleryDetail: "/gallery-board/1", // Example with parameter (replace '1' with an actual ID)
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
    Common: ["Home"],
    Entrance: [
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
    Manager: ["UserBoard", "UserDetail", "GalleryBoard", "GalleryDetail"],
    Kiosk: ["Kiosk", "KioskDetail", "KioskPrint", "KioskExit", "ComponentTest"],
    Other: ["Contact", "AboutUs", "NotFound"],
    OnlyDeveloper: [
      "ThreeTestPage",
      "ApiTest",
      "ApiTest_Login",
      "ApiTest_Signup",
      "ApiTest_UserInfo",
      "PageManage",
    ],
  };

  return (
    <>
      <h1>PageManager</h1>
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
      {/* Map through the sections to create buttons for each component group */}
    </>
  );
}

export default PageManager;
