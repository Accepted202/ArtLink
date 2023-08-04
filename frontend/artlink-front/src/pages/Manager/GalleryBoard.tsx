import "./style/Board.css";
import { useState, useEffect } from "react";
import { GalleryGet, GalleryGetRes } from "../../api/ManagerApi";
import { setAuthorizationHeader } from "../../commponents/Base/BaseFun";
import InfoTable from "../../commponents/Info/InfoTable";

function GalleryBoard() {
  const [AllGalleryData, setAllGalleryData] = useState([{}]);
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
  const galleryData = AllGalleryData;
  const keys = Object.keys(galleryData[0]);
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
