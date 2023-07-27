// import React from "react";
import { Link } from "react-router-dom";

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
    // User
    ArtMemory: "/art-memory",
    ArtMemoryDetail: "/art-memory/1",
    ArtMemoryEdit: "/art-memory/1/edit",
    ThreeTest: "/art-memory/1/3d",
    MypageUser: "/mypage/user",
    // Gallery
    WorksBoard: "/works-board",
    WorksCreate: "/works-board/create",
    WorksDetail: "/works-board/1", // Example with parameter (replace '1' with an actual ID)
    IotAdd: "/gallery/add-iot",
    IotRemove: "/gallery/remove-iot",
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
    KioskResult: "/kiosk/result/1", // Example with parameter (replace '1' with an actual ID)
    // Other
    Contact: "/contact",
    AboutUs: "/about",
    // Only Developer
    ThreeTestPage: "/3d",
    ApiTest: "/api",
    ApiTest_Login: "/api_login",
    ApiTest_Signup: "/api_signup",
    ApiTest_UserInfo: "/api_userinfo",
    PageManage: "/PM",
  };

  const sections = {
    Common: ["Home", "MypageEdit"],
    Entrance: [
      "Entrance",
      "Login",
      "Signup",
      "LoginGallery",
      "LoginAdmin",
      "SignupGallery",
    ],
    User: [
      "ArtMemory",
      "ArtMemoryDetail",
      "ArtMemoryEdit",
      "ThreeTest",
      "MypageUser",
    ],
    Gallery: [
      "WorksBoard",
      "WorksCreate",
      "WorksDetail",
      "IotAdd",
      "IotRemove",
      "MypageGallery",
    ],
    Manager: ["UserBoard", "UserDetail", "GalleryBoard", "GalleryDetail"],
    Kiosk: ["Kiosk", "KioskDetail", "KioskPrint", "KioskExit", "KioskResult"],
    Other: ["Contact", "AboutUs"],
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
      {/* Map through the sections to create buttons for each component group */}
      {Object.entries(sections).map(([sectionName, componentList]) => (
        <div key={sectionName}>
          <h3>{sectionName}</h3>
          {componentList.map((componentName) => (
            <Link key={componentName} to={PM[componentName]}>
              <button>{componentName}</button>
            </Link>
          ))}
        </div>
      ))}
    </>
  );
}

export default PageManager;
