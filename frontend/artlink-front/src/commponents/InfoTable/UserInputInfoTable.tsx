// import React from 'react';
import IIR from "./InputInfoRow.tsx";

interface Props {
  id?: number;
  name?: string;
  phone?: string;
}

// 작품 세부 사항
function UserInputInfoTable({ id, name, phone }: Props) {
  return (
    <>
      <div>
        <table>
          <tbody>
            <IIR infoTitle="ID" infoDetail={id} />
            <IIR infoTitle="이름" infoDetail={name} />
            <IIR infoTitle="전화번호" infoDetail={phone} />
          </tbody>
        </table>
      </div>
    </>
  );
}
export default UserInputInfoTable;
