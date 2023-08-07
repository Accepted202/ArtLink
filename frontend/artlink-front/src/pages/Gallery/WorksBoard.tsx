import styles from "./WorksBoard.module.css";
import InfoTable from "../../commponents/Info/InfoTable";
import { Link } from "react-router-dom";
import BackBtn from "../../commponents/Base/BackBtn";
import { AllWorks, AllWorksRes } from "../../api/GalleryApi";
import { useEffect, useState } from "react";

interface ArtworkData {
  [key: string]: string | number; // 키-값 데이터 타입은 이렇게만 설정해두면 됨
}

function WorksBoard() {
  const [works, setWorks] = useState<AllWorksRes>();
  useEffect(() => {
    const fetchAllworks = async () => {
      const allWorks = await AllWorks();
      console.log(allWorks);
      setWorks(allWorks);
    };

    void fetchAllworks();
  }, []);
  const artworkData: ArtworkData[] = [
    { id: 1, title: "제목1", location: "위치1", description: "설명1" },
    { id: 2, title: "제목2", location: "위치2", description: "설명2" },
    { id: 3, title: "제목3", location: "위치3", description: "설명3" },
    { id: 4, title: "제목4", location: "위치3", description: "설명3" },
    { id: 5, title: "제목5", location: "위치3", description: "설명3" },
    { id: 6, title: "제목6", location: "위치3", description: "설명3" },
    { id: 7, title: "제목7", location: "위치3", description: "설명3" },
    { id: 8, title: "제목8", location: "위치3", description: "설명3" },
    { id: 9, title: "제목8", location: "위치3", description: "설명3" },
    { id: 10, title: "제목8", location: "위치3", description: "설명3" },
    { id: 11, title: "제목8", location: "위치3", description: "설명3" },
    { id: 12, title: "제목8", location: "위치3", description: "설명3" },
  ];

  const keys = Object.keys(artworkData[0]);
  const widths = ["8%", "54%", "30%", "8%"];
  const keyToExclude = ["description"];

  return (
    <>
      <div className={styles.container}>
        {/* 테이블 상단 */}
        <div className={styles.wrapper}>
          <div className={styles.etc}>
            <BackBtn />
            <p style={{ marginLeft: "10px", fontSize: "24px" }}>
              {"Exhibition Title"}
            </p>
          </div>
          <div className={styles.utilBox}>
            <input
              type="search"
              placeholder="검색할 작품명을 입력하세요."
              className={styles.searchinput}
            />
            <button className={styles.searchbutton}>search</button>
            <Link to="works/create">
              <button className={styles.addbutton}>+</button>
            </Link>
            <Link to="update">
              <button className={styles.addbutton}>⚙</button>
            </Link>
          </div>
        </div>
        {/* 테이블 내용 */}
        <div className={styles["component-wrapper"]}>
          <InfoTable
            data={artworkData}
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
export default WorksBoard;
