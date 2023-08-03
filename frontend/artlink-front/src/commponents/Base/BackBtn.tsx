// import React from 'react';
import { useNavigate } from "react-router-dom";
import Styles from "./BackBtn.module.css";
function BackBtn() {
  const navigate = useNavigate();
  return (
    <>
      <button className={Styles.cta} onClick={() => navigate(-1)}>
        <svg
          width="40px"
          height="40px"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M20 12H4M4 12L10 6M4 12L10 18"
            stroke="#313131"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </>
  );
}
export default BackBtn;
