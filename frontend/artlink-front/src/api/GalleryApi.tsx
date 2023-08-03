import axios, { AxiosResponse } from "axios";

// 디폴트 백엔드 URL
const defaultBackendUrl = import.meta.env.VITE_APP_BACKEND_URL;
// URL을 디폴트 백엔드 URL과 합치는 함수
const createUrl = (endpoint: string): string => {
  return `${defaultBackendUrl}${endpoint}`;
};

// 갤러리 정보 조회
export interface GalleryInfoRes {
  // username: string;
  // galleryName: string;
  // accepted: boolean;
  // description: string;
  [key: string]: string | boolean;
}
export const GalleryInfo = async (): Promise<GalleryInfoRes> => {
  try {
    const response: AxiosResponse<GalleryInfoRes> = await axios.get(
      createUrl("/galleries/me")
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching GalleryInfo:", error);
    throw error;
  }
};

// 갤러리 정보 변경
export interface GalleryInfoEditRes {
  username: string;
  galleryName: string;
  accepted: boolean;
  description: string;
}
export interface GalleryInfoEditReq {
  username: string;
  galleryName: string;
  accepted: boolean;
  description: string;
}
export const GalleryInfoEdit = async (
  dataToSend: GalleryInfoEditReq
): Promise<GalleryInfoEditRes[]> => {
  try {
    const response: AxiosResponse<GalleryInfoEditRes[]> = await axios.put(
      createUrl("/galleries/me"),
      dataToSend
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching GalleryInfoEdit:", error);
    throw error;
  }
};
// IotAdd
// IotRemove
