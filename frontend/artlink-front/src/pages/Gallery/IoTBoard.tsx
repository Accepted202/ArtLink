import styles from "./IoTBoard.module.css";
import { Link } from "react-router-dom";
import IoTTable from "../../commponents/Iot/IoTTable";
import { useState, useEffect } from "react";
import { Data, getDeviceList } from "../../api/IoTApi";
import { setAuthorizationHeader } from "../../commponents/Base/BaseFun";

function IoTBoard() {
  const [deviceData, setDeviceData] = useState<Data[]>([]);
  const [searchTerm, setSearchTerm] = useState(""); // 검색용
  const [filteredData, setFilteredData] = useState<Data[]>([]);

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
  });

  // 검색어로 데이터 필터링
  const filteringData = () => {
    const filteredData = deviceData.filter((item) =>
      Object.values(item).some((value) =>
        value.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    );

    setFilteredData(filteredData);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      filteringData();
    }
  };

  const keys = ["Id", "Phone number"];
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
              onChange={(e) => {
                setSearchTerm(e.target.value);
                filteringData();
              }}
              onKeyPress={handleKeyPress}
            />
            <button className={styles.searchbutton} onClick={filteringData}>
              search
            </button>
          </div>
        </div>
        {/* 테이블 내용 */}
        <div className={styles["table-wrapper"]}>
          <IoTTable
            data={searchTerm === "" ? deviceData : filteredData}
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
