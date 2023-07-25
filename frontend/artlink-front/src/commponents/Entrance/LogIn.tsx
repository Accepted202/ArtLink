import styles from "./LogIn.module.css";
import { Link, useLocation } from "react-router-dom";

function LogIn() {
  const location = useLocation();
  const signUpLink = location.pathname.includes("login-gallery")
    ? "/signup-gallery"
    : "/signup";
  const anotherLoginLink = location.pathname.includes("login-gallery")
    ? "/login"
    : "/login-gallery";
  const anotherLogintxt = location.pathname.includes("login-gallery")
    ? "유저 로그인"
    : "갤러리 로그인";

  // location.pathname.includes('login-admin')가 true인 경우에는 링크들을 비활성화
  const isLoginAdmin = location.pathname.includes("login-admin");

  return (
    <div className={styles.container}>
      {!isLoginAdmin && <Link to={anotherLoginLink}>{anotherLogintxt}</Link>}
      <h1>Log In</h1>
      <input type="text" placeholder="아이디" />
      <input type="password" placeholder="비밀번호" />
      <a href="">아이디/비밀번호를 잊어버리셨나요?</a>
      <div className={styles["button-wrapper"]}>
        {!isLoginAdmin && (
          <Link to={signUpLink}>
            <button>회원 가입</button>
          </Link>
        )}
        <button type="submit">로그인</button>
      </div>
    </div>
  );
}

export default LogIn;
