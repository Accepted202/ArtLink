import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import "./Menu.module.css";
import jwt_decode from "jwt-decode";

interface MenuItem {
  label: string;
  path: string;
}
interface DecodedToken {
  sub: string;
  role: string;
  id: number;
  exp: number;
  username: string;
}

function Menu() {
  // 권한에 따라 다른 메뉴창 보이기
  const [isLoggedIn] = useState(true);
  const [whoareyou, setWhoAreYou] = useState("user");
  const accessToken: string | null = localStorage.getItem("access_token");

  useEffect(() => {
    if (accessToken) {
      const decodedToken = jwt_decode<DecodedToken>(accessToken);
      const userRole = decodedToken.role;
      if (userRole === "ROLE_MANAGER") {
        setWhoAreYou("manager");
      } else if (userRole === "ROLE_USER") {
        setWhoAreYou("user");
      } else if (userRole === "ROLE_GALLERY") {
        setWhoAreYou("gallery");
      }
    }
  }, [accessToken]);
  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    window.location.reload();
  };

  const menus: { [key: string]: MenuItem[] } = {
    user: [
      { label: "Your Record", path: "/art-memory" },
      { label: "My Page", path: "/mypage/user" },
    ],
    gallery: [
      { label: "Artwork Manager", path: "/works-board" },
      { label: "My Page", path: "/mypage/gallery" },
    ],
    manager: [
      { label: "Manage User", path: "/user-board" },
      { label: "Manage Gallery", path: "/gallery-board" },
    ],
  };

  const menuItems = isLoggedIn ? menus[whoareyou] : [];
  if (!accessToken) {
    return null;
  }
  return (
    <>
      {/* 움직이는 메뉴바 */}
      <div className="menuContainer">
        <nav>
          <ul>
            <Link to="/about">
              <li>About</li>
            </Link>
            {menuItems.map((menuItem, index) => (
              <Link to={menuItem.path} key={index}>
                <li>{menuItem.label}</li>
              </Link>
            ))}
            <li onClick={handleLogout}>Logout</li>
          </ul>
        </nav>
      </div>
    </>
  );
}

export default Menu;
