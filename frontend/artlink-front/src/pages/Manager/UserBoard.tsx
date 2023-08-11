import "./style/Board.css";
import { useState, useEffect } from "react";
import { UserGet, UserGetRes } from "../../api/ManagerApi";
import { setAuthorizationHeader } from "../../commponents/Base/BaseFun";
import InfoBoard from "../../commponents/Info/InfoBoard";

interface Data {
  [key: string]: string | number;
}

function UserBoard() {
  const [AllUserData, setAllUserData] = useState<Data[]>([]);
  useEffect(() => {
    const allUser = async () => {
      try {
        setAuthorizationHeader();
        const response: UserGetRes = await UserGet();
        setAllUserData(response.users);
      } catch (error) {
        console.error("유저 정보들을 가져오는 데 실패했습니다.", error);
        window.alert("기기 정보 가져오기 실패");
      }
    };
    void allUser();
  }, []);

  // 테이블 데이터
  const userData = AllUserData;
  const keys = ["PK", "아이디", "전화번호", "닉네임"]; // 데이터가 존재하지 않을 경우 오류가 발생하기 때문에 이 부분은 페이지 별로 하드코딩해야 함
  const widths = ["8%", "20%", "20%", "20%", "8%"];

  return (
    <>
      <div className="container">
        <InfoBoard
          title="User Manager"
          data={userData}
          dataKeys={keys}
          columnWidths={widths}
          userManager={true}
        />
      </div>
    </>
  );
}
export default UserBoard;
