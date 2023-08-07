import "./style/Board.css";
import { useState, useEffect } from "react";
import { UserGet, UserGetRes } from "../../api/ManagerApi";
import { setAuthorizationHeader } from "../../commponents/Base/BaseFun";
import InfoTable from "../../commponents/Info/InfoTable";

function UserBoard() {
  const [AllUserData, setAllUserData] = useState([{}]);
  useEffect(() => {
    const AllUser = async () => {
      try {
        setAuthorizationHeader();
        const response: UserGetRes = await UserGet();
        setAllUserData(response.users);
      } catch (error) {
        console.error("Error Alluser:", error);
        window.alert(error);
      }
    };
    void AllUser();
  }, []);

  // 테이블 데이터
  const userData = AllUserData;
  // const keys = Object.keys(userData[0]);
  const keys = ["PK", "아이디", "전화번호", "닉네임"]; // 데이터가 존재하지 않을 경우 오류가 발생하기 때문에 이 부분은 페이지 별로 하드코딩해야 함
  const widths = ["8%", "20%", "20%", "20%", "8%"];
  const keyToExclude = [""];

  return (
    <>
      <p className="board_title">User Manager</p>
      <div className="board-container">
        <div className="component-wrapper">
          <InfoTable
            data={userData}
            pageSize={10}
            dataKeys={keys}
            columnWidths={widths}
            keyToExclude={keyToExclude}
          />
        </div>
      </div>
    </>
  );
}
export default UserBoard;
