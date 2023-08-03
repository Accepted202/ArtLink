import axios, { AxiosResponse } from "axios";

const defaultBackendUrl = import.meta.env.VITE_APP_BACKEND_URL;
// URL을 디폴트 백엔드 URL과 합치는 함수
const createUrl = (endpoint: string): string => {
  return `${defaultBackendUrl}${endpoint}`;
};

// 유저정보 조회
export interface UserInfoRes {
  // id: number;
  // username: string;
  // phoneNumber: number;
  [key: string]: string | number;
}
export const UserInfo = async (): Promise<UserInfoRes> => {
  try {
    const response: AxiosResponse<UserInfoRes> = await axios.get(
      createUrl("/users/me")
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching UserInfo:", error);
    throw error;
  }
};

// 유저정보 변경
export interface UserInfoEditRes {
  notdefined: boolean;
}
export interface UserInfoEditReq {
  username: string;
  phoneNumber: number;
}
export const UserInfoEdit = async (
  dataToSend: UserInfoEditReq
): Promise<UserInfoEditRes> => {
  try {
    const response: AxiosResponse<UserInfoEditRes> = await axios.put(
      createUrl("/users/me"),
      dataToSend
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching UserInfoEdit:", error);
    throw error;
  }
};

// 유저 비밀번호 변경
export interface UserPasswordChangeRes {
  notdefined: boolean;
}
export interface UserPasswordChangeReq {
  password: number;
}
export const UserPasswordChange = async (
  dataToSend: UserPasswordChangeReq
): Promise<UserInfoRes[]> => {
  try {
    const response: AxiosResponse<UserInfoRes[]> = await axios.post(
      createUrl("/users/me/change-password"),
      dataToSend
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching UserInfo:", error);
    throw error;
  }
};
