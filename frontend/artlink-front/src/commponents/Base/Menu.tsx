import { Link } from "react-router-dom";
import { useState } from 'react';

interface MenuItem {
  label: string;
  path: string;
}

function Menu() {
  // 
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

  const menus: { [key: string]: MenuItem[] } = {
    user: [
      { label: "Your Record", path: "/art-memory" },
      { label: "My Page", path: "/mypage" },
    ],
    gallery: [
      { label: "Artwork Manager", path: "/works-board" },
      { label: "My Page", path: "/mypage" },
    ],
    manager: [
      { label: "Manage User", path: "/user-board" },
      { label: "Manage Gallery", path: "/gallery-board" },
    ],
  };

  const menuItems = isLoggedIn ? menus[whoareyou] : [];

  return (
    <>
      {/* <h1>Menu</h1> */}
      <div>
      <button onClick={handleLog}>
        {isLoggedIn ? "로그아웃" : "로그인"}
      </button>
      </div>
      {isLoggedIn && ( // isLoggedIn이 true일 때에만 버튼 렌더링
        <div>
          |<button onClick={handleUser}>유저</button>
          <button onClick={handleGallery}>갤러리</button>
          <button onClick={handleManager}>매니저</button>
        </div>
      )}
      {menuItems.map((menuItem, index) => (
        <div key={index}>
          <Link to={menuItem.path}>
            <button>{menuItem.label}</button>
          </Link>
        </div>
      ))}
    </>
  );
}

export default Menu;
