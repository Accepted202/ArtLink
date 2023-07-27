// import React from 'react';
import SignUp from "../../commponents/Entrance/SignUp";
import MainLogo from "../../commponents/Base/MainLogo";
import MarginTop100 from "../../commponents/EditCss/MarginTop100";

function SignupGallery() {
  return (
    <>
      <MarginTop100 />
      <MainLogo mode="web" />
      <h1>SignupGallery</h1>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <SignUp />
      </div>
    </>
  );
}
export default SignupGallery;
