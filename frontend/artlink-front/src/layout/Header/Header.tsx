// import React from 'react';
import { useLocation } from "react-router-dom";
import MainLogo from "../../commponents/Base/MainLogo";
import Menu from "../../commponents/Base/Menu";
import headercss from "./Header.module.css";

// 메뉴바 비활성화 주소
const excludePaths = ["/home"];
// 헤더 비활성화 주소
const excludeHeaderPaths = [
  "/",
  "/kiosk",
  "/3d",
  "/home",
  "/login",
  "/signup",
  "/login-gallery",
  "/signup-gallery",
  "/login-admin",
];
function Header() {
  const location = useLocation();
  const isExcludedPath = excludePaths.includes(location.pathname);
  const isExcludedHeaderPath = excludeHeaderPaths.includes(location.pathname);

  return (
    <>
      {!isExcludedHeaderPath && (
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
