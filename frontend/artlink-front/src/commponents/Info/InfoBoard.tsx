import styles from "./InfoBoard.module.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import InfoTable from "./InfoTable";

interface Data {
  [key: string]: string | number;
}

interface Props {
  data: Data[]; // 출력할 데이터
  placeholder?: string; // 검색창에 표시할 문구
  link: string; // add 버튼 클릭 시 이동할 페이지의 링크
  pageSize?: number; // 표 페이지 하나에 표시할 요소 개수
  dataKeys: string[]; // 데이터의 키들
  columnWidths: string[]; // 표의 각 열의 너비
  keyToExclude?: string[]; // 표에서 나타나지 않게 하고 싶은 키
  detail?: boolean; // detail 화면으로 이동하는 링크 열 포함 여부
}

function InfoBoard({
  data,
  placeholder = "검색할 정보를 입력하세요",
  link,
  pageSize = 10,
  dataKeys,
  columnWidths,
  keyToExclude = [],
  detail = true,
}: Props) {
  const [searchTerm, setSearchTerm] = useState(""); // 검색용
  const [filteredData, setFilteredData] = useState<Data[]>([]);

  // 검색어로 데이터 필터링
  const filteringData = () => {
    const filteredData = data.filter((item) =>
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

  return (
    <>
      <div className={styles.container}>
        {/* 테이블 상단 */}
        <div className={styles.upperWrapper}>
          <Link to={link}>
            <button className={styles.addButton}>+</button>
          </Link>
          <div>
            <input
              type="search"
              placeholder={placeholder}
              className={styles.searchInput}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                filteringData();
              }}
              onKeyPress={handleKeyPress}
            />
            <button className={styles.searchButton} onClick={filteringData}>
              search
            </button>
          </div>
        </div>
        {/* 테이블 내용 */}
        <div className={styles.tableWrapper}>
          <InfoTable
            data={searchTerm === "" ? data : filteredData}
            pageSize={pageSize}
            dataKeys={dataKeys}
            columnWidths={columnWidths}
            keyToExclude={keyToExclude}
            detail={detail}
          />
        </div>
      </div>
    </>
  );
}
export default InfoBoard;
