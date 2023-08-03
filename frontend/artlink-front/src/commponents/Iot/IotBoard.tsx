import styles from "./IoTBoard.module.css";
import { Link } from "react-router-dom";
import IoTTable from "./IoTTable";

interface Data {
  [key: string]: string | number; // 키-값 데이터 타입은 이렇게만 설정해두면 됨
}

function IoTBoard() {
  const IoTData: Data[] = [
    { deviceId: 1, phoneNumber: 8201000000000 },
    { deviceId: 1, phoneNumber: 8201000000000 },
    { deviceId: 1, phoneNumber: 8201000000000 },
    { deviceId: 1, phoneNumber: 8201000000000 },
    { deviceId: 1, phoneNumber: 8201000000000 },
    { deviceId: 1, phoneNumber: 8201000000000 },
    { deviceId: 1, phoneNumber: 8201000000000 },
    { deviceId: 1, phoneNumber: 8201000000000 },
    { deviceId: 1, phoneNumber: 8201000000000 },
    { deviceId: 1, phoneNumber: 8201000000000 },
    { deviceId: 1, phoneNumber: 8201000000000 },
    { deviceId: 1, phoneNumber: 8201000000000 },
  ];

  const keys = Object.keys(IoTData[0]);
  const widths = ["20%", "60%", "20%"];

  return (
    <>
      <div className={styles.container}>
        {/* 테이블 상단 */}
        <div className={styles.wrapper}>
          <Link to="/gallery/add-iot">
            <button className={styles.addbutton}>+</button>
          </Link>
          <div>
            <input
              type="search"
              placeholder="검색할 전화번호를 입력하세요."
              className={styles.searchinput}
            />
            <button className={styles.searchbutton}>search</button>
          </div>
        </div>
        {/* 테이블 내용 */}
        <div className={styles["table-wrapper"]}>
          <IoTTable
            data={IoTData}
            pageSize={10}
            dataKeys={keys}
            columnWidths={widths}
          />
        </div>
      </div>
    </>
  );
}
export default IoTBoard;
