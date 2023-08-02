import axios, { AxiosResponse } from "axios";
// 아래의 API들은 요청&반환 값에 대한 타입지정, Api함수 로직으로 구성되어있습니다.

// 디폴트 백엔드 URL
const defaultBackendUrl = "http://70.12.246.124:8080";

// URL을 디폴트 백엔드 URL과 합치는 함수
const createUrl = (endpoint: string): string => {
  return `${defaultBackendUrl}${endpoint}`;
};

// 로그인 API
export interface LoginRes {
  accessToken: string;
  refreshToken: string;
  role: string;
}
export interface LoginReq {
  username: string;
  password: string;
  role: string;
}
export const LoginApi = async (dataToSend: LoginReq): Promise<LoginRes> => {
  try {
    const response: AxiosResponse<LoginRes> = await axios.post(
      createUrl("/auth/login"),
      dataToSend
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching LoginApi:", error);
    throw error;
  }
};

// 로그아웃 API
export interface LogoutRes {
  Sample: string;
}
export interface LogoutReq {
  Sample: string;
}
export const LogoutApi = async (
  dataToSend: LogoutReq
): Promise<LogoutRes[]> => {
  try {
    const response: AxiosResponse<LogoutRes[]> = await axios.post(
      createUrl("/auth/logout"),
      dataToSend
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching LogoutApi:", error);
    throw error;
  }
};
// 토큰 갱신
export interface RefreshRes {
  Sample: string;
  // 필요한 정보 타입 명시
}
export interface RefreshReq {
  Sample: string;
  // 필요한 정보 타입 명시
}
export const RefreshToken = async (
  dataToSend: RefreshReq
): Promise<RefreshRes[]> => {
  try {
    const response: AxiosResponse<RefreshRes[]> = await axios.post(
      createUrl("/auth/refresh"),
      dataToSend
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching RefresApi:", error);
    throw error;
  }
};
// 회원가입 API
export interface SignupRes {
  message: string;
  data: {
    user: {
      username: string;
      nickname: number;
      phoneNumber: number;
    };
  };
}
export interface SignupReq {
  username: string;
  password: string;
  phoneNumber: number;
  nickname: string;
}
export const SignupApi = async (
  dataToSend: SignupReq
): Promise<SignupRes[]> => {
  try {
    const response: AxiosResponse<SignupRes[]> = await axios.post(
      createUrl("/auth/signup"),
      dataToSend
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching SignupApi:", error);
    throw error;
  }
};
// 회원탈퇴 API
export interface WithdrawalRes {
  Sample: string;
}
export interface WithdrawalReq {
  Sample: string;
}
export const WithdrawalApi = async (): Promise<WithdrawalRes[]> => {
  try {
    const response: AxiosResponse<WithdrawalRes[]> = await axios.delete(
      createUrl("/api/Withdrawal")
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching WithdrawalApi:", error);
    throw error;
  }
};
