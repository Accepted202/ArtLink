import "./style/Board.css";
import InfoTable from "../../commponents/Info/InfoTable";

interface UserData {
  [key: string]: string | number; // 키-값 데이터 타입은 이렇게만 설정해두면 됨
}

function UserBoard() {
  const userData: UserData[] = [
    { id: 1, name: "이름1", phoneNumber: "010-XXXX-XXXX" },
    { id: 2, name: "이름2", phoneNumber: "010-XXXX-XXXX" },
    { id: 3, name: "이름3", phoneNumber: "010-XXXX-XXXX" },
    { id: 4, name: "이름4", phoneNumber: "010-XXXX-XXXX" },
    { id: 5, name: "이름5", phoneNumber: "010-XXXX-XXXX" },
    { id: 6, name: "이름6", phoneNumber: "010-XXXX-XXXX" },
    { id: 7, name: "이름7", phoneNumber: "010-XXXX-XXXX" },
    { id: 8, name: "이름8", phoneNumber: "010-XXXX-XXXX" },
    { id: 9, name: "이름9", phoneNumber: "010-XXXX-XXXX" },
    { id: 10, name: "이름10", phoneNumber: "010-XXXX-XXXX" },
    { id: 11, name: "이름11", phoneNumber: "010-XXXX-XXXX" },
    { id: 12, name: "이름12", phoneNumber: "010-XXXX-XXXX" },
    { id: 13, name: "이름13", phoneNumber: "010-XXXX-XXXX" },
  ];

  const keys = Object.keys(userData[0]);
  const widths = ["8%", "24%", "60%", "8%"];
  const keyToExclude = [""];

  return (
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
  );
}
export default UserBoard;
