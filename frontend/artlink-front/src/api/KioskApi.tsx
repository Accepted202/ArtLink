import axios, { AxiosResponse } from "axios";

/*
사후 데이터 삭제(DELETE): selections/devices/{deviceId}
키를 통한 사후 데이터 조회(GET): /postevents/{Key}
*/

/*
태깅
-> RFID 기기에서 /devices/{deviceId}(DELETE) api로 userKey 받아옴
-> 기기에서 받아온 userKey를 키오스크 홈의 input에 넣기
-> 입력 후 제출 버튼 누를 시 해당 키가 다음 페이지로 넘겨지며 해당 페이지로 넘어감
*/

const defaultBackendUrl = import.meta.env.VITE_APP_BACKEND_URL;
// URL을 디폴트 백엔드 URL과 합치는 함수
const createUrl = (endpoint: string): string => {
  return `${defaultBackendUrl}${endpoint}`;
};

export interface Data {
  [key: string]: string | number;
}

// 사후 데이터 삭제(DELETE): /postevents/{userKey}/drawings/{deviceId}
export const deleteArtwork = async (
  userKey: string,
  drawingId: number
): Promise<Data> => {
  try {
    const response: AxiosResponse<Data> = await axios.delete(
      createUrl(`/postevents/${userKey}/drawings/${drawingId}`)
    );
    return response.data;
  } catch (error) {
    console.error("사후 데이터 삭제에 실패했습니다.", error);
    throw error;
  }
};

// 키를 통한 사후 데이터 조회(GET): /postevents/{userKey}
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