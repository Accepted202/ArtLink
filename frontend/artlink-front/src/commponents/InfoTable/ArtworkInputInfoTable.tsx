// import React from 'react';
import IIR from "./InputInfoRow.tsx";
import Styles from "./style/Artwork.module.css";

interface Props {
  /*
  기본적으로 들어가는 작품 정보들
  작가명, 작품명, 재료, 크기, 제작연도, 소장처
  추후 추가할 것
  */
  id?: number;
  title?: string;
  location?: string;
  description?: string;
}

// 작품 세부 사항
function InputInfoTable({ id, title, location, description }: Props) {
  return (
    <>
      <div className={Styles.ArtworkTable}>
        <table>
          <tbody>
            <IIR infoTitle="ID" infoDetail={id} />
            <IIR infoTitle="작품명" infoDetail={title} />
            <IIR infoTitle="위치" infoDetail={location} />
            <IIR infoTitle="작품 설명" infoDetail={description} />
          </tbody>
        </table>
      </div>
    </>
  );
}
export default InputInfoTable;
