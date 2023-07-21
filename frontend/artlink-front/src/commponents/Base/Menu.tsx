import { useState, createContext, useContext } from "react";
import { useAuth } from "../../pages/Common/Home";

const MenuContext = createContext<{
  menuselect: string;
} | null>(null);
// eslint-disable-next-line react-refresh/only-export-components
export function useMenu() {
  return useContext(MenuContext);
}

function Menu() {
  const fromHome = useAuth();
  console.log(fromHome, fromHome?.isLoggedIn);
  const menu_user = ["Your Record", "My Page"];
  const menu_gallery = ["Artwork Manager", "My Page"];
  const menu_manager = ["Manage User", "Manage Gallery"];

  const [menuselect, setMenuselect] = useState("null");
  function handleMenu(index: number) {
    setMenuselect((index + 1).toString());
  }
  const value = {
    menuselect,
  };
  console.log(menuselect, value);

  return (
    <>
      <MenuContext.Provider value={value}>
        <h1>Menu</h1>
        {fromHome?.isLoggedIn &&
          fromHome?.whoareyou === "user" &&
          menu_user.map((menuItem, index: number) => (
            <div key={index}>
              <button onClick={() => handleMenu(index)}>{menuItem}</button>
            </div>
          ))}
        {fromHome?.isLoggedIn &&
          fromHome?.whoareyou === "gallery" &&
          menu_gallery.map((menuItem, index) => (
            <div key={index}>
              <button onClick={() => handleMenu(index)}>{menuItem}</button>
            </div>
          ))}
        {fromHome?.isLoggedIn &&
          fromHome?.whoareyou === "manager" &&
          menu_manager.map((menuItem, index) => (
            <div key={index}>
              <button onClick={() => handleMenu(index)}>{menuItem}</button>
            </div>
          ))}
      </MenuContext.Provider>
    </>
  );
}

export default Menu;
