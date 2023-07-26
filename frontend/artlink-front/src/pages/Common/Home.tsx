import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import "./Home.css";

import HomeUser from "../../commponents/HomeWho/HomeUser";
import HomeGallery from "../../commponents/HomeWho/HomeGallery";
import HomeManager from "../../commponents/HomeWho/HomeManager";

function Homepage() {
  // (시작) 로그인 여부, 로그인 주체 판단용 임시 코드
  const [isLoggedIn, setIsLoggedIn] = useState(true);
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

  // (시작) 로그인 여부, 로그인 주체 판단용 임시 코드

  const navigate = useNavigate();

  useEffect(() => {
    // 컴포넌트가 마운트된 후에 isLoggedIn 상태를 체크하고, 로그인 상태가 아니라면 내비게이션을 수행합니다.
    if (!isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn, navigate]);

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
      {/* Body */}
      {/* (시작) 서비스 제작용 툴입니다 추후 삭제 예정  */}
      {/* (끝) 서비스 제작용 툴입니다 추후 삭제 예정  */}
      <div style={{ marginTop: "100px" }}>{render_component}</div>
      <div>
        <button onClick={handleLog}>
          {isLoggedIn ? "로그아웃" : "로그인"}
        </button>
        |<button onClick={handleUser}>유저</button>
        <button onClick={handleGallery}>갤러리</button>
        <button onClick={handleManager}>매니저</button>
      </div>
    </>
  );
}

export default Homepage;
