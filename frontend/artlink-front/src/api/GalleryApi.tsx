import axios, { AxiosResponse } from "axios";
export interface Sample {
  Sample: string;
  // 필요한 정보 타입 명시
}
export const fetchSample = async (): Promise<Sample[]> => {
  try {
    const response: AxiosResponse<Sample[]> = await axios.get("/api/Sample");
    return response.data;
  } catch (error) {
    console.error("Error fetching Sample:", error);
    throw error;
  }
};

// IotAdd
// IotRemove
