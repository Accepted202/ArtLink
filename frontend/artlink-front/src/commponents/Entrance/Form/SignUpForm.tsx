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
        const numericPhoneNumber = String(formData.phoneNumber);
        const formattedPhoneNumber = "82" + numericPhoneNumber.slice(1,11);
        const updatedFormData = { ...formData, phoneNumber: Number(formattedPhoneNumber) };
        const response = await signUpUserApi(updatedFormData);
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
      <p className="loginTitle">{"회원가입"}</p>
      <div className="box">
        <label>아이디</label>
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
        <label>비밀번호</label>
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
            <label>닉네임</label>
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
            <br />
            <br />
            <label>전화 번호</label>
            <br />
            <input
              type="phoneNumber"
              name="phoneNumber"
              id="phoneNumber"
              maxLength={11}
              placeholder="Enter phone number"
              className="input-box"
              onChange={handleChange}
              onKeyPress={handleKeyPress}
            />
          </>
        )}
        {/* 갤러리 이름 */}
        {showGalleryNameField && (
          <>
            <label>갤러리 이름</label>
            <br />
            <input
              type="galleryName"
              name="galleryName"
              id="galleryName"
              placeholder="Enter gallery name"
              className="input-box"
              onChange={handleChange}
              onKeyPress={handleKeyPress}
            />
          </>
        )}
        {/* 에러메세지 띄우기 */}
        <div className="errorMsg">{}</div>
      <MarginTopInput value={50} />
        <button type="submit" className="btn" onClick={reqSignup}>
          <p>회원가입</p>
        </button>
        <Modal sendActive={isActive} />

        
      </div>
      <MarginTopInput value={40} />
    </>
  );
}
export default SignupForm;
