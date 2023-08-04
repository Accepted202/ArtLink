import { useState } from "react";
import "./style/Detail.css";
import ProfileBox from "../../commponents/Mypage/ProfileBox.tsx";
import UserInputInfoTable from "../../commponents/Info/UserInputInfoTable.tsx";

const id = 1;
const name = "이름";
const phone = "010-0000-0000";

function UserDetail() {
  const [isChange, setisChange] = useState<boolean>(false); // 변경요청 boolean
  return (
    <div className="detail-container">
      <ProfileBox isChanged={isChange} />
      <UserInputInfoTable
        id={id}
        name={name}
        phone={phone}
      ></UserInputInfoTable>
    </div>
  );
}
export default UserDetail;
