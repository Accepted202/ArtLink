// import React from 'react';
import "./style/InfoRow.css";

// MyInfoTable 컴포넌트들에 들어갈 세부 정보

interface Props {
  infoTitle: string;
  infoDetail: string;
}

function MyInfoRow({ infoTitle, infoDetail }: Props) {
  return (
    <>
      <tr>
        <td>{infoTitle}</td>
        <td>{infoDetail}</td>
      </tr>
    </>
  );
}
export default MyInfoRow;
