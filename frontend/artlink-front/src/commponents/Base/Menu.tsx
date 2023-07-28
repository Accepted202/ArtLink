import { Link } from "react-router-dom";
import { useState } from "react";
import "./Menu.module.css";

interface MenuItem {
  label: string;
  path: string;
}

function Menu() {
  // 권한에 따라 다른 메뉴창 보이기
  const [isLoggedIn] = useState(true);
  const [whoareyou, setWhoAreYou] = useState("user");
  function handleUser() {
    setWhoAreYou("user");
  }
  function handleGallery() {
    setWhoAreYou("gallery");
  }
  function handleManager() {
    setWhoAreYou("manager");
  }

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

  return (
    <>
      {/* <div style={{ display: "flex", flexDirection: "column", margin: "auto" }}>
        <button onClick={handleUser} style={{ fontSize: "10px" }}>
          유저
        </button>
        <button onClick={handleGallery} style={{ fontSize: "10px" }}>
          갤러리
        </button>
        <button onClick={handleManager} style={{ fontSize: "10px" }}>
          매니저
        </button>
      </div> */}
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
          </ul>
        </nav>
      </div>
    </>
  );
}

export default Menu;
