import styles from "./IoTBoard.module.css";
import { Link } from "react-router-dom";
import IoTTable from "./IoTTable";
import { useState, useEffect } from "react";
import { Data, getDeviceList } from "../../api/IoTApi";
import { setAuthorizationHeader } from "../Base/BaseFun";

/*
TODO:
[ ] api 연결
*/

function IoTBoard() {
  const [deviceData, setDeviceData] = useState([{}]);
  useEffect(() => {
    const getData = async () => {
      try {
        setAuthorizationHeader();
        const response: Data[] = await getDeviceList();
        setDeviceData(response);
      } catch (error) {
        console.error("기기 정보들을 가져오는 데 실패했습니다.", error);
        window.alert("기기 정보 가져오기 실패");
      }
    };
    void getData();
  }, []);

  const IoTData: Data[] = deviceData;

  const keys = Object.keys(IoTData[0]);
  const widths = ["20%", "80%"];

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
