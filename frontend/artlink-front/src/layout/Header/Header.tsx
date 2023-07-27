import { useRef } from "react";
import { useLocation } from "react-router-dom";
import MainLogo from "../../commponents/Base/MainLogo";
import Menu from "../../commponents/Base/Menu";
import headercss from "./Header.module.css";

const excludePaths: string[] = ["/home"];
const excludeHeaderPaths: string[] = [
  "/",
  "/kiosk/",
  "/3d",
  "/home",
  "/login",
  "/signup",
  "/login-gallery",
  "/signup-gallery",
  "/login-admin",
];

function Header(): JSX.Element {
  const location = useLocation();
  const isExcludedPath: boolean = excludePaths.includes(location.pathname);
  const isExcludedHeaderPath: boolean =
    excludeHeaderPaths.includes(location.pathname) ||
    location.pathname.includes("kiosk");

  const headerRef = useRef<HTMLDivElement>(null); // Ref to get the header element

  return (
    <>
      {!isExcludedHeaderPath && (
        <div ref={headerRef} className={headercss.header}>
          <div style={{ marginRight: "auto", marginLeft: "5%" }}>
            <MainLogo />
          </div>
          {!isExcludedPath && <Menu />}
        </div>
      )}
      {/* Now you can use 'headerHeight' state wherever you need the height value */}
    </>
  );
}

export default Header;
