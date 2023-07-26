// import React from "react";
import { Link } from "react-router-dom";

function PageManager() {
  const PM: Record<string, string> = {
    // Add more components and their URLs as needed...
    Home: "/home",
    Mypage: "/mypage",
    MypageEdit: "/mypage/edit",
    Entrance: "/",
    Login: "/login",
    Signup: "/signup",
    LoginGallery: "/login-gallery",
    LoginAdmin: "/login-admin",
    SignupGallery: "/signup-gallery",
    // User
    ArtMemory: "/art-memory",
    ArtMemoryDetail: "/art-memory/1", // Example with parameter (replace '1' with an actual ID)
    ArtMemoryEdit: "/art-memory/1/edit", // Example with parameter (replace '1' with an actual ID)
    ThreeTest: "/art-memory/1/3d", // Example with parameter (replace '1' with an actual ID)
    // Gallery
    WorksBoard: "/works-board",
    WorksCreate: "/works-board/create",
    WorksDetail: "/works-board/1", // Example with parameter (replace '1' with an actual ID)
    IotAdd: "/gallery/add-iot",
    IotRemove: "/gallery/remove-iot",
    // Manager
    UserBoard: "/user-board",
    UserDetail: "/user-board/1", // Example with parameter (replace '1' with an actual ID)
    GalleryBoard: "/gallery-board",
    GalleryDetail: "/gallery-board/1", // Example with parameter (replace '1' with an actual ID)
    // Kiosk
    Kiosk: "/kiosk/home",
    KioskDetail: "/kiosk/1", // Example with parameter (replace '1' with an actual ID)
    KioskEdit: "/kiosk/1/edit", // Example with parameter (replace '1' with an actual ID)
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
    PageManage: "/PM",
  };

  const sections = {
    Common: ["Home", "Mypage", "MypageEdit"],
    Entrance: [
      "Entrance",
      "Login",
      "Signup",
      "LoginGallery",
      "LoginAdmin",
      "SignupGallery",
    ],
    User: ["ArtMemory", "ArtMemoryDetail", "ArtMemoryEdit", "ThreeTest"],
    Gallery: [
      "WorksBoard",
      "WorksCreate",
      "WorksDetail",
      "IotAdd",
      "IotRemove",
    ],
    Manager: ["UserBoard", "UserDetail", "GalleryBoard", "GalleryDetail"],
    Kiosk: [
      "Kiosk",
      "KioskDetail",
      "KioskEdit",
      "KioskPrint",
      "KioskExit",
      "KioskResult",
    ],
    Other: ["Contact", "AboutUs"],
    OnlyDeveloper: [
      "ThreeTestPage",
      "ApiTest",
      "ApiTest_Login",
      "ApiTest_Signup",
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
