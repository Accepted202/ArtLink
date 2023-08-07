import axios, { AxiosResponse } from "axios";
import { setAuthorizationHeader, getPk } from "../commponents/Base/BaseFun";

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

// 전시회 전체 조회
export interface ExhibitionAllInfoRes {
  exhibitions: ExhibitionEach[];
}
export interface ExhibitionEach {
  id: number;
  exhibitionName: string;
  exhibitionExplanation: string;
  posterUrl: string;
  createdAt: string;
}
export const ExhibitionAllInfo = async (): Promise<ExhibitionAllInfoRes> => {
  try {
    setAuthorizationHeader();
    const response: AxiosResponse<ExhibitionAllInfoRes> = await axios.get(
      createUrl("/galleries/me/exhibitions")
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching ExhibitionAllInfo:", error);
    throw error;
  }
};

// 전시회 생성
export interface ExhibitionCreateRes {
  [key: string]: string;
}
export interface ExhibitionCreateReq {
  [key: string]: string;
}
export const ExhibitionCreate = async (
  dataToSend: ExhibitionCreateReq
): Promise<ExhibitionCreateRes> => {
  try {
    const response: AxiosResponse<ExhibitionCreateRes> = await axios.post(
      createUrl("/galleries/me/exhibitions"),
      dataToSend
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching ExhibitionCreate:", error);
    throw error;
  }
};

// 전시회 수정

// 전시회 작품 생성

// 전시회 작품 전체 조회
export interface AllWorksRes {
  DrawingList: Drawing[];
}
export interface Drawing {
  name: string;
  drawingPath: string;
  description: string;
  artist: string;
  locationX: number;
  locationY: number;
}
export const AllWorks = async (): Promise<AllWorksRes> => {
  try {
    setAuthorizationHeader();
    const pk = getPk();
    console.log(pk, "pk는");
    const response: AxiosResponse<AllWorksRes> = await axios.get(
      createUrl(`/galleries/me/exhibitions/${pk}/artworks`)
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching ExhibitionAllInfo:", error);
    throw error;
  }
};

// 전시회 작품 업데이트

// 전시회 작품 개별 조회
