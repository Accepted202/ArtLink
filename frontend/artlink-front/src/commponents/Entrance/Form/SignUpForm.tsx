/* eslint-disable @typescript-eslint/no-misused-promises */
import "./Form.css";
import React, { useState } from "react";
import Modal from "../../Base/Form/SignupModal/Modal";
import {
  SignUpReq,
  signUpUserApi,
  signUpGalleryApi,
} from "../../../api/CommonApi";
import BackBtn from "../../Base/BackBtn";
import MarginTopInput from "../../EditCss/MaginTopInput";

function SignupForm() {
  const [isActive, setisActive] = useState(false); // 모달창 띄울 때 사용

  // 폼 데이터
  const [formData, setFormData] = useState<SignUpReq>({
    username: "",
    password: "",
    phoneNumber: 0,
    nickname: "",
    galleryName: "",
  });

  const [passwordCheckMsg, setPasswordCheckMsg] = useState(""); // 입력값 일치 확인

  // 인풋 필드 저장
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handlePass = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (formData.password && value) {
      if (formData.password === value) {
        setPasswordCheckMsg("입력하신 값이 같습니다.");
      } else {
        setPasswordCheckMsg("입력하신 값이 다릅니다.");
      }
    } else {
      // 입력값 없을 시 메세지 가림
      setPasswordCheckMsg("");
    }
  };

  // 가입자의 종류에 따른 필드 설정
  const showGalleryNameField = location.pathname === "/signup-gallery";

  // 회원가입 API 요청
  const reqSignup = async () => {
    try {
      if (showGalleryNameField) {
        console.log("갤러리 회원가입 요청");
        const response = await signUpGalleryApi(formData);
        console.log(response);
        setisActive(true);
      } else if (!showGalleryNameField) {
        console.log("유저 회원가입 요청");
        const response = await signUpUserApi(formData);
        console.log(response);
        setisActive(true); // 성공 모달창
      }
    } catch (error) {
      console.error("Error signing up:", error);
    }
  };

  // 입력창에서 엔터키 누를 시 폼 제출
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      void reqSignup();
      console.log("enter key pressed");
    }
  };
  return (
    <>
      <BackBtn />
      <MarginTopInput value={20} />
      <p className="loginTitle">{"Sign Up"}</p>
      <div className="box">
        <label>ID</label>
        <input
          type="text"
          name="username"
          id="username"
          placeholder="Enter ID"
          className="input-box"
          onChange={handleChange}
          onKeyPress={handleKeyPress}
        />
        {/* 아이디 중복체크 */}
        <div className="idCheck">{}</div>
        <br />
        <label>Password</label>
        <br />
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Enter Password"
          className="input-box"
          onChange={handleChange}
          onKeyPress={handleKeyPress}
        />
        <input
          type="password"
          placeholder="Confirm Password"
          className="input-box"
          onChange={handlePass}
          onKeyPress={handleKeyPress}
        />
        <br />
        {/* 패스워드 다를시 로직 */}
        <div className="passwordCheck">{passwordCheckMsg}</div>
        <br />
        {/* 닉네임 */}
        {!showGalleryNameField && (
          <>
            <label>Nickname</label>
            <br />
            <input
              type="nickname"
              name="nickname"
              id="nickname"
              placeholder="Enter nickname"
              className="input-box"
              onChange={handleChange}
              onKeyPress={handleKeyPress}
            />
          </>
        )}
        {/* 갤러리 이름 */}
        {showGalleryNameField && (
          <>
            <label>Galleryname</label>
            <br />
            <input
              type="galleryName"
              name="galleryName"
              id="galleryName"
              placeholder="Enter galleryName"
              className="input-box"
              onChange={handleChange}
              onKeyPress={handleKeyPress}
            />
          </>
        )}
        {/* 에러메세지 띄우기 */}
        <div className="errorMsg">{}</div>
        <button type="submit" className="btn" onClick={reqSignup}>
          <p>Sign Up</p>
        </button>
        <Modal sendActive={isActive} />

        <span className="option">or sign in with</span>
        <div className="social">
          <div className="box-radius">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="2.2em"
              viewBox="0 0 488 512"
            >
              <path d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z" />
            </svg>
          </div>
          <div className="box-radius">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="2.2em"
              viewBox="0 0 384 512"
            >
              <path d="M21.1 33.9c12.7-4.6 26.9-.7 35.5 9.6L320 359.6V64c0-17.7 14.3-32 32-32s32 14.3 32 32V448c0 13.5-8.4 25.5-21.1 30.1s-26.9 .7-35.5-9.6L64 152.4V448c0 17.7-14.3 32-32 32s-32-14.3-32-32V64C0 50.5 8.4 38.5 21.1 33.9z" />
            </svg>
          </div>
          <div className="box-radius">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="2.2em"
              viewBox="0 0 320 512"
            >
              <path d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z" />
            </svg>
          </div>
        </div>
      </div>
      <MarginTopInput value={40} />
    </>
  );
}
export default SignupForm;
