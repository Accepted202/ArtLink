// import React from "react";
import { Link } from "react-router-dom";

function MainLogo() {
  function handleLogoClick() {
    window.location.href = "/home"; // 홈 URL로 이동하고 새로고침
  }
  return (
    <>
      <Link to="/home" onClick={handleLogoClick}>
        <h1>MainLogo</h1>
      </Link>
    </>
  );
}

export default MainLogo;
