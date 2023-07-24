// import React from 'react';
import MainLogo from "../../commponents/Base/MainLogo";
import { Link } from "react-router-dom";

function Entrance() {
  return (
    <div>
      <div>
        <h1>Entrance</h1>
        <div style={{ margin: "auto" }}>
          <MainLogo />
          <Link to="/login">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path d="M22 12l-20 12 7.289-12-7.289-12z" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}
export default Entrance;
