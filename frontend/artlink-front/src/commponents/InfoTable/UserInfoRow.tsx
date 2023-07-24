// import React from 'react';
import "./style/InfoRow.css";

// UserInfoTable 컴포넌트들에 들어갈 세부 정보

interface Props {
  name: string;
  phone: string;
  id: string;
}

function UserInfoRow({ name, phone, id }: Props) {
  return (
    <>
      <tr>
        <td>{name}</td>
        <td>{phone}</td>
        <td>{id}</td>
      </tr>
    </>
  );
}
export default UserInfoRow;
