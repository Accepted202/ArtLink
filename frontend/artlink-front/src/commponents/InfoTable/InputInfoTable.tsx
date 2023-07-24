// import React from 'react';
import IIR from "./InputInfoRow.tsx";

// 작품 세부 사항
function InputInfoTable() {
  return (
    <>
      <h1>InputInfoTable</h1>
      <div>
        <table>
          <tbody>
            <IIR infoTitle="작품명" infoDetail="OOO" />
            <IIR infoTitle="작가명" infoDetail="XXX" />
            <IIR infoTitle="제작연도" infoDetail="2000" />
          </tbody>
        </table>
      </div>
    </>
  );
}
export default InputInfoTable;
