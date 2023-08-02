// import React from 'react';
import "./style/InfoRow.css";
import { Link } from "react-router-dom";

// UserInfoTable 컴포넌트들에 들어갈 세부 정보

interface Props {
  id: number;
  name: string;
  phone: string;
}

function UserInfoRow({ name, phone, id }: Props) {
  return (
    <>
      <tr>
        <td>{id}</td>
        <td>{name}</td>
        <td>{phone}</td>
        <td>
          <Link to={`${id}`}>편집</Link>
        </td>
      </tr>
    </>
  );
}
export default UserInfoRow;
