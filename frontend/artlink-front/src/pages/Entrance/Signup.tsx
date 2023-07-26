// import React from 'react';
import SignUp from "../../commponents/Entrance/SignUp";
import MainLogo from "../../commponents/Base/MainLogo";
import MarginTop100 from "../../commponents/EditCss/MarginTop100";

function Signup() {
  return (
    <>
      <MarginTop100 />
      <MainLogo />
      <h1>Signup</h1>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <SignUp />
      </div>
    </>
  );
}
export default Signup;
