// import React from 'react';
import { useLocation } from "react-router-dom";
import MainLogo from "../../commponents/Base/MainLogo";
import Menu from "../../commponents/Base/Menu";
import headercss from "./Header.module.css";

const excludePaths = [
  "/home",
  "/",
  "/login",
  "/signup",
  "/login-gallery",
  "/signup-gallery",
  "/login-admin",
]; // 여기에 메뉴를 렌더링하고 싶지 않은 경로를 추가
function Header() {
  const location = useLocation();
  const isExcludedPath = excludePaths.includes(location.pathname);
  const isKiosk = location.pathname.includes("kiosk");
  const is3D = location.pathname.includes("3d");
  const isHome = location.pathname.includes("home");

  return (
    <>
      {!isKiosk && !is3D && !isHome && (
        <div className={headercss.header}>
          <div style={{ marginRight: "auto", marginLeft: "5%" }}>
            <MainLogo />
          </div>
          {/* <h1>Header</h1> */}
          {!isExcludedPath && <Menu />}
        </div>
      )}
    </>
  );
}
export default Header;
