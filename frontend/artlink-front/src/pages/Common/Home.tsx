import { useState, createContext, useContext } from "react";
// import { Link } from "react-router-dom";
import Header from "../../layout/Header/Header";
import Footer from "../../layout/Footer/Footer";

import "./Home.css";

import HomeUser from "../../commponents/HomeWho/HomeUser";
import HomeGallery from "../../commponents/HomeWho/HomeGallery";
import HomeManager from "../../commponents/HomeWho/HomeManager";

const AuthContext = createContext<{
  isLoggedIn: boolean;
  whoareyou: string;
} | null>(null);
// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  return useContext(AuthContext);
}

function Homepage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [whoareyou, setWhoAreYou] = useState("user");
  function handleLog() {
    setIsLoggedIn(!isLoggedIn);
  }
  function handleUser() {
    setWhoAreYou("user");
  }
  function handleGallery() {
    setWhoAreYou("gallery");
  }
  function handleManager() {
    setWhoAreYou("manager");
  }

  const value = {
    isLoggedIn,
    whoareyou,
  };

  let render_component;
  if (isLoggedIn) {
    if (whoareyou === "manager") {
      render_component = <HomeManager />;
    } else if (whoareyou === "user") {
      render_component = <HomeUser />;
    } else if (whoareyou === "gallery") {
      render_component = <HomeGallery />;
    }
  } else {
    render_component = <h1>로그인하세요</h1>;
  }

  return (
    <>
      <AuthContext.Provider value={value}>
        {/* Header */}
        <Header />
        {/* Body */}
        <div>
          <button onClick={handleLog}>
            {isLoggedIn ? "로그아웃" : "로그인"}
          </button>
          |<button onClick={handleUser}>유저</button>
          <button onClick={handleGallery}>갤러리</button>
          <button onClick={handleManager}>매니저</button>
        </div>
        {render_component}
        {/* Footer */}
        <Footer />
      </AuthContext.Provider>
    </>
  );
}

export default Homepage;
