import axios from "axios";

// Header에 토큰 싣기
export const setAuthorizationHeader = () => {
  const accessToken = localStorage.getItem("access_token");
  axios.defaults.headers.common["Authorization"] = `Bearer ${
    accessToken as string
  }`;
};

// Url에서 Pk키 추출
export const getPk = () => {
  const url = window.location.href;
  const parts = url.split("/");
  const pk = parts[parts.length - 1];
  return Number(pk);
};

// Url중간에서 PK 추출
export const getPk2 = () => {
  const url = window.location.href;
  const parts = url.split("/");

  const lastPart = parts[parts.length - 2];
  return Number(lastPart);
};

// 전시회 작품 상세 PK추출
export const getPk3 = () => {
  const url = window.location.href;
  const parts = url.split("/");

  const exhiPK = Number(parts[parts.length - 1]);
  const workPK = Number(parts[parts.length - 2]);
  return [exhiPK, workPK];
};
