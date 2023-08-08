import axios, { AxiosResponse } from "axios";
import { getPk } from "../commponents/Base/BaseFun";

// 디폴트 백엔드 URL
const defaultBackendUrl = import.meta.env.VITE_APP_BACKEND_URL;
// URL을 디폴트 백엔드 URL과 합치는 함수
const createUrl = (endpoint: string): string => {
  return `${defaultBackendUrl}${endpoint}`;
};

// 전체 유저 정보 조회
export interface UserGetRes {
  users: UserEach[];
}
export interface UserEach {
  username: string;
  nickname: string;
  phoneNumber: number;
  [key: string]: string | number;
}
export const UserGet = async (): Promise<UserGetRes> => {
  try {
    const response: AxiosResponse<UserGetRes> = await axios.get(
      createUrl("/admin/users")
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching UserGet:", error);
    throw error;
  }
};

// 개별 유저 정보 조회
export interface OneUserEach {
  id: number;
  username: string;
  nickname: string;
  phoneNumber: number;
}
export const OneUserGet = async (): Promise<OneUserEach> => {
  try {
    const pk = getPk();
    const response: AxiosResponse<OneUserEach> = await axios.get(
      createUrl(`/admin/users/${pk}`)
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching OneUserGet:", error);
    throw error;
  }
};

// 전체 갤러리 정보 조회
export interface GalleryGetRes {
  galleries: GalleryEach[];
}
export interface GalleryEach {
  id: number;
  username: string;
  galleryName: string;
  accepted: boolean;
  description: string;
  [key: string]: string | number | boolean;
}
export const GalleryGet = async (): Promise<GalleryGetRes> => {
  try {
    const response: AxiosResponse<GalleryGetRes> = await axios.get(
      createUrl("/admin/galleries")
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching GalleryGet:", error);
    throw error;
  }
};
// 개별 갤러리 정보 조회
export interface OneGalleryEach {
  id: number;
  username: string;
  galleryName: string;
  accepted: boolean;
  description: string;
}
export const OneGalleryGet = async (): Promise<OneGalleryEach> => {
  try {
    const pk = getPk();
    const response: AxiosResponse<OneGalleryEach> = await axios.get(
      createUrl(`/admin/galleries/${pk}`)
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching OneGalleryGet:", error);
    throw error;
  }
};
