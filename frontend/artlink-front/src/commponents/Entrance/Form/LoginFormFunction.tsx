import { useNavigate, useLocation } from "react-router-dom";
import { LoginApi, LoginRes, LoginReq } from "../../../api/CommonApi";

export function useLogin() {
  const navigate = useNavigate();
  const location = useLocation();

  const determineRole = () => {
    if (location.pathname.includes("login-gallery")) {
      return "GALLERY";
    } else if (location.pathname.includes("login-admin")) {
      return "ADMIN";
    } else {
      return "USER";
    }
  };

  const reqLogin = async (formData: LoginReq) => {
    try {
      const response: LoginRes = await LoginApi(formData);
      const accessToken = response.accessToken;
      const refreshToken = response.refreshToken;
      localStorage.setItem("access_token", accessToken);
      localStorage.setItem("refresh_token", refreshToken);

      navigate("/home");
    } catch (error) {
      console.error("Error Log in:", error);
      window.alert(error);
    }
  };

  return { determineRole, reqLogin };
}
