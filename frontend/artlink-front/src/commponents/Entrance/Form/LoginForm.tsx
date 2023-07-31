/* eslint-disable @typescript-eslint/no-misused-promises */
import React, { useState, useEffect } from "react";
import "./Form.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { LoginApi } from "../../../api/CommonApi";
import axios from "axios";

function LoginForm() {
  const navigate = useNavigate();

  // 인풋 필드 useState
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    role: "",
  });
  // 인풋 필드 변경
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("변경시도");
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  // url에 따른 role 값 사전 설정
  const location = useLocation();
  useEffect(() => {
    const determineRole = () => {
      if (location.pathname.includes("login-gallery")) {
        return "GALLERY";
      } else if (location.pathname.includes("login-admin")) {
        return "ADMIN";
      } else {
        return "USER";
      }
    };

    // role 값을 설정해줍니다.
    const role = determineRole();
    setFormData((prevData) => ({
      ...prevData,
      role: role,
    }));
  }, [location.pathname]);
  // 로그인 API요청
  const reqLogin = async () => {
    try {
      // 로그인 API를 호출하여 데이터를 서버로 보냅니다.
      const response = await LoginApi(formData);
      console.log(response, response.accessToken);
      // 로그인 성공시 (Header에 저장, Home으로 이동)
      const accessToken = response.accessToken;
      const refreshToken = response.refreshToken;
      localStorage.setItem("access_token", accessToken);
      localStorage.setItem("refresh_token", refreshToken);
      axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
      console.log(axios.defaults.headers.common["Authorization"]);
      // 홈으로 이동
      navigate("/home");
    } catch (error) {
      console.error("Error Log in:", error);
      window.alert(error);
    }
  };
  const signUpLink = location.pathname.includes("login-gallery")
    ? "/signup-gallery"
    : "/signup";
  const anotherLoginLink = location.pathname.includes("login-gallery")
    ? "/login"
    : "/login-gallery";
  const anotherLogintxt = location.pathname.includes("login-gallery")
    ? "Go to User Login"
    : "Go to Gallery Login";
  const loginTitle = location.pathname.includes("login-admin")
    ? "Admin Login"
    : location.pathname.includes("login-gallery")
    ? "Gallery Login"
    : "User Login";

  // location.pathname.includes('login-admin')가 true인 경우에는 링크들을 비활성화
  const isLoginAdmin = location.pathname.includes("login-admin");
  return (
    <>
      <h2>{loginTitle}</h2>
      <div className="box">
        <label>ID</label>
        <br />
        <input
          type="text"
          name="username"
          id="username"
          placeholder="Enter ID"
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
        <div className="forget">
          <label className="checkbox-label">
            <input type="checkbox" />
            <span className="checkbox-custom "></span>
            <span className="label-text">Remember me</span>
          </label>
          <span className="fg">
            <a href="#"> Forget password?</a>
          </span>
        </div>
        <div className="btnBox">
          {!isLoginAdmin ? (
            <>
              <Link to={signUpLink} className="btn smallbutton">
                <p>Sign Up</p>
              </Link>
              <button
                type="submit"
                className="btn smallbutton"
                onClick={reqLogin}
              >
                <p>Log In</p>
              </button>
            </>
          ) : (
            <button type="submit" className="btn" onClick={reqLogin}>
              <p>Log In</p>
            </button>
          )}
        </div>
      </div>
      {!isLoginAdmin && (
        <Link
          to={anotherLoginLink}
          style={{
            margin: "0px",
            marginBottom: "100px",
            textDecorationLine: "underline",
          }}
          className="anotherLogin"
        >
          <p>
            {">"} {anotherLogintxt}
          </p>
        </Link>
      )}
    </>
  );
}
export default LoginForm;
