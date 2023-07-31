/* eslint-disable @typescript-eslint/no-misused-promises */
import "./Form.css";
import React, { useState } from "react";
import Modal from "../../Base/Form/SignupModal/Modal";
import { SignupReq, SignupApi } from "../../../api/CommonApi";
import BackBtn from "../../Base/BackBtn";
import MarginTopInput from "../../EditCss/MaginTopInput";

function SignupForm() {
  const [isActive, setisActive] = useState(false);
  // 인풋 필드 useState
  const [formData, setFormData] = useState<SignupReq>({
    username: "",
    password: "",
    phoneNumber: 0,
    nickname: "",
  });
  // 인풋 필드 저장
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  // 회원가입 API 요청
  const reqSignup = async () => {
    try {
      // 회원가입 API를 호출하여 데이터를 서버로 보냅니다.
      const response = await SignupApi(formData);
      console.log(response);
      setisActive(true);
      // 회원가입 성공 시, 화면에 알림 메시지 또는 다른 처리를 수행할 수 있습니다.
    } catch (error) {
      console.error("Error signing up:", error);
      // 회원가입 실패 시, 화면에 알림 메시지 또는 다른 처리를 수행할 수 있습니다.
    }
  };

  return (
    <>
      <BackBtn />
      <MarginTopInput value={20} />
      <div className="box">
        <label>ID</label>
        <br />
        <input
          type="text"
          name="username"
          id="username"
          placeholder="Enter Username"
          className="input-box"
          onChange={handleChange}
        />
        <br />
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
        />
        <br />
        <br />
        <label>Nickname</label>
        <br />
        <input
          type="nickname"
          name="nickname"
          id="nickname"
          placeholder="Enter nickname"
          className="input-box"
          onChange={handleChange}
        />
        <br />
        {/* <div className="forget">
          <label className="checkbox-label">
          <input type="checkbox" />
          <span className="checkbox-custom "></span>
          <span className="label-text">Remember me</span>
          </label>
          <span className="fg">
          <a href=""> Forget password?</a>
          </span>
        </div> */}
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
