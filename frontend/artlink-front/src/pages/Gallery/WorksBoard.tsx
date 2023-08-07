import styles from "./WorksBoard.module.css";
import InfoTable from "../../commponents/Info/InfoTable";
import { Link } from "react-router-dom";
import BackBtn from "../../commponents/Base/BackBtn";
import { AllWorks, AllWorksRes } from "../../api/GalleryApi";
import { useEffect, useState } from "react";

function WorksBoard() {
  const [works, setWorks] = useState([{}]);
  useEffect(() => {
    const fetchAllworks = async () => {
      const allWorks:AllWorksRes = await AllWorks();
      console.log('전체 작품 목록', allWorks);
      setWorks(allWorks.DrawingList);
    };

    void fetchAllworks();
  }, []);

  // const keys = Object.keys(works[0]);
  const keys = ["아티스트", "설명", "제목"];
  const widths = ["20%", "40%", "30%"];
  const keyToExclude = ["drawingPath","locationX","locationY"];

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
            <Link to="create">
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
            data={works}
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
