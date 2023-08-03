import "./index.css";
import { Route, Routes, Navigate } from "react-router-dom";
import Header from "./layout/Header/Header";
import Footer from "./layout/Footer/Footer";

// Common
import Homepage from "./pages/Common/Home";
import Mypage from "./pages/Common/Mypage";
// Entrance
import Entrance from "./pages/Entrance/Entrance";
import Login from "./pages/Entrance/Login";
import Signup from "./pages/Entrance/Signup";
import LoginGallery from "./pages/Entrance/LoginGallery";
import LoginAdmin from "./pages/Entrance/LoginAdmin";
import SignupGallery from "./pages/Entrance/SignupGallery";
import FindPassword from "./pages/Entrance/FindPassword";
// User
import ArtMemory from "./pages/User/ArtMemory";
import ArtMemoryDetail from "./pages/User/ArtMemoryDetail";
import ArtMemoryEdit from "./pages/User/ArtMemoryEdit";
import ThreeTest from "./pages/ThreeMain";
// Gallery
import WorksBoard from "./pages/Gallery/WorksBoard";
import WorksCreate from "./pages/Gallery/WorksCreate";
import WorksDetail from "./pages/Gallery/WorksDetail";
import IotAdd from "./pages/Gallery/IotAdd";
import IoTBoard from "./commponents/Iot/IotBoard";

// Manager
import UserBoard from "./pages/Manager/UserBoard";
import UserDetail from "./pages/Manager/UserDetail";
import GalleryBoard from "./pages/Manager/GalleryBoard";
import GalleryDetail from "./pages/Manager/GalleryDetail";
// Kiosk
import Kiosk from "./pages/Kiosk/KioskHome";
import KioskDetail from "./pages/Kiosk/KioskDetail";
import KioskPrint from "./pages/Kiosk/KioskPrint";
import KioskExit from "./pages/Kiosk/KioskExit";
import ComponentTest from "./ComponentTest";
// Other
import Contact from "./pages/Other/Contact";
import AboutUs from "./pages/Other/AboutUs";
// Only Developer (*** Del After release ***)
import PageManager from "./pages/PageManager";
import Apitest from "./api/Apitest";
import TestSignup from "./api/testSignup";
import TestLogin from "./api/testLogin";
import TestUserInfo from "./api/testUserInfo";

function App() {
  // 로그인 여부 판단
  const isLoggedIn = () => {
    const accessToken = localStorage.getItem("access_token");
    return !!accessToken; // access_token이 있으면 로그인 상태로 간주합니다.
  };
  return (
    <div className="App">
      <Header />

      <Routes>
        {/* Common */}
        <Route
          path="/home"
          element={isLoggedIn() ? <Homepage /> : <Navigate to="/login" />}
        />
        <Route
          path="/mypage/user"
          element={isLoggedIn() ? <Mypage /> : <Navigate to="/login" />}
        />
        <Route
          path="/mypage/gallery"
          element={isLoggedIn() ? <Mypage /> : <Navigate to="/login-gallery" />}
        />

        {/* Entrance Routes */}
        <Route path="/" element={<Entrance />} />
        <Route
          path="/login"
          element={!isLoggedIn() ? <Login /> : <Navigate to="/home" />}
        />
        <Route
          path="/signup"
          element={!isLoggedIn() ? <Signup /> : <Navigate to="/home" />}
        />
        <Route
          path="/login-gallery"
          element={!isLoggedIn() ? <LoginGallery /> : <Navigate to="/home" />}
        />
        <Route
          path="/signup-gallery"
          element={!isLoggedIn() ? <SignupGallery /> : <Navigate to="/home" />}
        />
        <Route
          path="/login-admin"
          element={!isLoggedIn() ? <LoginAdmin /> : <Navigate to="/home" />}
        />
        <Route
          path="/login/password"
          element={!isLoggedIn() ? <FindPassword /> : <Navigate to="/home" />}
        />
        <Route
          path="/login-gallery/password"
          element={!isLoggedIn() ? <FindPassword /> : <Navigate to="/home" />}
        />

        {/* User Routes */}
        <Route
          path="/art-memory"
          element={isLoggedIn() ? <ArtMemory /> : <Navigate to="/login" />}
        />
        <Route
          path="/art-memory/:pk"
          element={
            isLoggedIn() ? <ArtMemoryDetail /> : <Navigate to="/login" />
          }
        />
        <Route
          path="/art-memory/:pk/edit"
          element={isLoggedIn() ? <ArtMemoryEdit /> : <Navigate to="/login" />}
        />
        <Route
          path="/art-memory/:pk/3d"
          element={isLoggedIn() ? <ThreeTest /> : <Navigate to="/login" />}
        />

        {/* Gallery Routes */}
        <Route
          path="/works-board"
          element={
            isLoggedIn() ? <WorksBoard /> : <Navigate to="/login-gallery" />
          }
        />
        <Route
          path="/works-board/create"
          element={
            isLoggedIn() ? <WorksCreate /> : <Navigate to="/login-gallery" />
          }
        />
        <Route
          path="/works-board/:pk"
          element={
            isLoggedIn() ? <WorksDetail /> : <Navigate to="/login-gallery" />
          }
        />
        <Route path="/gallery/add-iot" element={<IotAdd />} />
        <Route path="/gallery/iot-board" element={<IoTBoard />} />

        {/* Manager Routes */}
        <Route
          path="/user-board"
          element={
            isLoggedIn() ? <UserBoard /> : <Navigate to="/login-admin" />
          }
        />
        <Route
          path="/user-board/:pk"
          element={
            isLoggedIn() ? <UserDetail /> : <Navigate to="/login-admin" />
          }
        />
        <Route
          path="/gallery-board"
          element={
            isLoggedIn() ? <GalleryBoard /> : <Navigate to="/login-admin" />
          }
        />
        <Route
          path="/gallery-board/:pk"
          element={
            isLoggedIn() ? <GalleryDetail /> : <Navigate to="/login-admin" />
          }
        />

        {/* Kiosk Routes */}
        <Route path="/kiosk/home" element={<Kiosk />} />
        <Route path="/kiosk/:pk" element={<KioskDetail />} />
        <Route path="/kiosk/print" element={<KioskPrint />} />
        <Route path="/kiosk/exit" element={<KioskExit />} />
        <Route path="/component-test" element={<ComponentTest />} />

        {/* Other Routes */}
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<AboutUs />} />

        {/* Only Developer */}
        <Route path="/3d" element={<ThreeTest />} />
        <Route path="/PM" element={<PageManager />} />
        <Route path="/api" element={<Apitest />} />
        <Route path="/api_signup" element={<TestSignup />} />
        <Route path="/api_login" element={<TestLogin />} />
        <Route path="/api_userinfo" element={<TestUserInfo />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
