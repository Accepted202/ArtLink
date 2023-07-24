// import React from 'react';
import "./style/InfoRow.css";

// InfoTable 컴포넌트들에 들어갈 세부 정보

interface Props {
  /*
  기본적으로 들어가는 작품 정보들
  작가명, 작품명, 재료, 크기, 제작연도, 소장처
  추후 추가할 것
  */
  id: string;
  title: string;
  location: string;
  description: string;
}

function ArtworkInfoRow({ id, title, location, description }: Props) {
  return (
    <>
      <tr>
        <td>{id}</td>
        <td>{title}</td>
        <td>{location}</td>
        <td>{description}</td>
      </tr>
    </>
  );
}
export default ArtworkInfoRow;
