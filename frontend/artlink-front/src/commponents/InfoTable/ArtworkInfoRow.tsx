// import React from 'react';
import "./style/InfoRow.css";
import { Link } from "react-router-dom";

// InfoTable 컴포넌트들에 들어갈 세부 정보

interface Props {
  /*
  기본적으로 들어가는 작품 정보들
  작가명, 작품명, 재료, 크기, 제작연도, 소장처
  추후 추가할 것
  */
  key: number;
  id: number;
  title: string;
  location: string;
  description: string;
}

function ArtworkInfoRow({ key, id, title, location, description }: Props) {
  function trClick() {
    console.log("클릭", key, title, id, location);
  }
  return (
    <>
      <tr onClick={trClick}>
        <td>{id}</td>
        <td>{title}</td>
        <td>{location}</td>
        {/* <td>{description}</td> */}
        <td>
          <Link to={`${id}`}>편집</Link>
        </td>
      </tr>
    </>
  );
}
export default ArtworkInfoRow;
