// import React from 'react';
import "./InfoRow.module.css";

// InfoTable 컴포넌트들에 들어갈 세부 정보

interface Props {
  type?: string; // 컴포넌트의 타입을 규정
  infoTitle?: string;
  infoDetail?: string;
  name?: string;
  phone?: string;
  id?: string;
  title?: string;
  location?: string;
  description?: string;
}

function MyInfoRow({
  type,
  infoTitle,
  infoDetail,
  name,
  phone,
  id,
  title,
  location,
  description,
}: Props) {
  return (
    <>
      {/*my page에 들어갈 경우*/}
      {type == "mypage" && (
        <tr>
          <td>{infoTitle}</td>
          <td>{infoDetail}</td>
        </tr>
      )}
      {/*유저, 갤러리 관리 페이지에 들어갈 경우*/}
      {type == "user" && (
        <tr>
          <td>{name}</td>
          <td>{phone}</td>
          <td>{id}</td>
        </tr>
      )}
      {/*작품 관리 페이지에 들어갈 경우*/}
      {type == "artwork" && (
        <tr>
          <td>{id}</td>
          <td>{title}</td>
          <td>{location}</td>
          <td>{description}</td>
        </tr>
      )}
    </>
  );
}
export default MyInfoRow;
