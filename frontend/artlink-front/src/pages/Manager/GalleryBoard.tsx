import "./style/Board.css";
import { useState, useEffect } from "react";
import { GalleryGet, GalleryGetRes } from "../../api/ManagerApi";
import { setAuthorizationHeader } from "../../commponents/Base/BaseFun";
import InfoTable from "../../commponents/Info/InfoTable";

interface Data {
  [key: string]: string | number | boolean;
}

function GalleryBoard() {
  const [AllGalleryData, setAllGalleryData] = useState<Data[]>([]);
  useEffect(() => {
    const AllGallery = async () => {
      try {
        setAuthorizationHeader();
        const response: GalleryGetRes = await GalleryGet();
        setAllGalleryData(response.galleries);
      } catch (error) {
        console.error("Error Alluser:", error);
        window.alert(error);
      }
    };
    void AllGallery();
  }, []);

  // 테이블 데이터
  // 허용여부(accepted)를 출력을 위해 "O","X"의 string 형태로 바꿔야함
  const galleryData = AllGalleryData.map((data) => ({
    ...data,
    accept: data.accept ? "O" : "X",
  }));
  const keys = ["PK", "아이디", "갤러리이름", "허용여부", "설명문"]; // 데이터가 존재하지 않을 경우 오류가 발생하기 때문에 이 부분은 페이지 별로 하드코딩해야 함
  const widths = ["6%", "13%", "13%", "13%", "45%"];
  const keyToExclude = [""];

  return (
    <>
      <p className="board_title">Gallery Manager</p>
      <div className="board-container">
        <div className="component-wrapper">
          <InfoTable
            data={galleryData}
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
export default GalleryBoard;
