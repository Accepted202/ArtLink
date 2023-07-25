// import React, { useState } from "react";
import "./index.css";
import { Route, Routes } from "react-router-dom";
import Header from "./layout/Header/Header";
// import Footer from "./layout/Footer/Footer";

// Common
import Homepage from "./pages/Common/Home";
import Mypage from "./pages/Common/Mypage";
import MypageEdit from "./pages/Common/MypageEdit";
// Entrance
import Entrance from "./pages/Entrance/Entrance";
import Login from "./pages/Entrance/Login";
import Signup from "./pages/Entrance/Signup";
import LoginGallery from "./pages/Entrance/LoginGallery";
import LoginAdmin from "./pages/Entrance/LoginAdmin";
import SignupGallery from "./pages/Entrance/SignupGallery";
// User
import ArtMemory from "./pages/User/ArtMemory";
import ArtMemoryDetail from "./pages/User/ArtMemoryDetail";
import ArtMemoryEdit from "./pages/User/ArtMemoryEdit";
import ThreeTest from "./pages/ThreeMain";
// Gallery
import WorksBoard from "./pages/Gallery/WorksBoard";
import WorksCreate from "./pages/Gallery/WorksCreate";
import WorksDetail from "./pages/Gallery/WorksDetail";
import WorksEdit from "./pages/Gallery/WorksEdit";
import IotAdd from "./pages/Gallery/IotAdd";
import IotRemove from "./pages/Gallery/IotRemove";
// Manager
import UserBoard from "./pages/Manager/UserBoard";
import UserManage from "./pages/Manager/UserManage";
import GalleryBoard from "./pages/Manager/GalleryBoard";
import GalleryManage from "./pages/Manager/GalleryManage";
// Kiosk
import Kiosk from "./pages/Kiosk/KioskHome";
import KioskDetail from "./pages/Kiosk/KioskDetail";
import KioskEdit from "./pages/Kiosk/KioskEdit";
import KioskPrint from "./pages/Kiosk/KioskPrint";
import KioskExit from "./pages/Kiosk/KioskExit";
import KioskResult from "./pages/Kiosk/KioskResult";
// Other
import Contact from "./pages/Other/Contact";
import AboutUs from "./pages/Other/AboutUs";
// Only Developer (*** Del After release ***)
import PageManager from "./pages/PageManager";
import Apitest from "./api/Apitest";
import TestSignup from "./api/testSignup";
import TestLogin from "./api/testLogin";

function App() {
  // const [count, setCount] = useState(0);

  return (
    <div className="App">
      <Header />

      <Routes>
        {/* Common */}
        <Route path="/home" element={<Homepage />} />
        <Route path="/mypage" element={<Mypage />} />
        <Route path="/mypage/edit" element={<MypageEdit />} />

        {/* Entrance Routes */}
        <Route path="/" element={<Entrance />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login-gallery" element={<LoginGallery />} />
        <Route path="/signup-gallery" element={<SignupGallery />} />
        <Route path="/login-admin" element={<LoginAdmin />} />

        {/* User Routes */}
        <Route path="/home" element={<Homepage />} />
        <Route path="/art-memory" element={<ArtMemory />} />
        <Route path="/art-memory/:pk" element={<ArtMemoryDetail />} />
        <Route path="/art-memory/:pk/edit" element={<ArtMemoryEdit />} />
        <Route path="/art-memory/:pk/3d" element={<ThreeTest />} />

        {/* Gallery Routes */}
        <Route path="/works-board" element={<WorksBoard />} />
        <Route path="/works-board/create" element={<WorksCreate />} />
        <Route path="/works-board/:pk" element={<WorksDetail />} />
        <Route path="/works-board/:pk/edit" element={<WorksEdit />} />
        <Route path="/gallery/addiot" element={<IotAdd />} />
        <Route path="/gallery/removeiot" element={<IotRemove />} />

        {/* Manager Routes */}
        <Route path="/user-board" element={<UserBoard />} />
        <Route path="/user-manage/:pk" element={<UserManage />} />
        <Route path="/gallery-board" element={<GalleryBoard />} />
        <Route path="/gallery-manage/:pk" element={<GalleryManage />} />

        {/* Kiosk Routes */}
        <Route path="/kiosk/home" element={<Kiosk />} />
        <Route path="/kiosk/:pk" element={<KioskDetail />} />
        <Route path="/kiosk/:pk/edit" element={<KioskEdit />} />
        <Route path="/kiosk/print" element={<KioskPrint />} />
        <Route path="/kiosk/exit" element={<KioskExit />} />
        <Route path="/kiosk/result/:pk" element={<KioskResult />} />

        {/* Other Routes */}
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<AboutUs />} />

        {/* Only Developer */}
        <Route path="/3d" element={<ThreeTest />} />
        <Route path="/PM" element={<PageManager />} />
        <Route path="/api" element={<Apitest />} />
        <Route path="/api_signup" element={<TestSignup />} />
        <Route path="/api_login" element={<TestLogin />} />
      </Routes>

      {/* <Footer /> */}
    </div>
  );
}

export default App;
