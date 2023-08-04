import axios, { AxiosResponse } from "axios";

/*
방문객 작품 삭제(DELETE): selections/devices/{deviceId}
키를 통한 사후 데이터 조회(GET): /postevents/{Key}
*/

const defaultBackendUrl = import.meta.env.VITE_APP_BACKEND_URL;
// URL을 디폴트 백엔드 URL과 합치는 함수
const createUrl = (endpoint: string): string => {
  return `${defaultBackendUrl}${endpoint}`;
};

export interface Data {
  [key: string]: string | number;
}

// 방문객 작품 삭제(DELETE): selections/devices/{deviceId}
export const deleteDevice = async (deviceId: number): Promise<Data> => {
  try {
    const response: AxiosResponse<Data> = await axios.delete(
      createUrl(`selections/devices/${deviceId}`)
    );
    return response.data;
  } catch (error) {
    console.error("방문객 작품 삭제에 실패했습니다.", error);
    throw error;
  }
};

// 키를 통한 사후 데이터 조회(GET): /postevents/{Key}
export const getPostevents = async (userKey: string): Promise<Data[]> => {
  try {
    const accessToken = localStorage.getItem("access_token");
    axios.defaults.headers.common["Authorization"] = `Bearer ${
      accessToken as string
    }`;

    const response: AxiosResponse<Data[]> = await axios.get(
      createUrl(`/postevents/${userKey}`)
    );
    return response.data;
  } catch (error) {
    console.error("사후 데이터 정보를 가져오는 데 실패했습니다.", error);
    throw error;
  }
};
