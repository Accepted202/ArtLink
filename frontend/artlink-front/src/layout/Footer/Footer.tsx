// import React from 'react';
import { useLocation } from "react-router-dom";
import footercss from "./Footer.module.css";

function Footer() {
  const location = useLocation();
  const isKiosk = location.pathname.includes("kiosk"); 
  const is3D = location.pathname.includes("3d");
  
  return (
    <>
    {!isKiosk&& !is3D && (
      <div className={footercss.footer}>
        <h1>Footer</h1>
      </div>
    )}
    </>
  );
}
export default Footer;
