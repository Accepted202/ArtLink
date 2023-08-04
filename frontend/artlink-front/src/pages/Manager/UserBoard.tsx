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
  const keys = Object.keys(userData[0]);
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
