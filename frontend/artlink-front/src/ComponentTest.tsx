import InfoTable from "./commponents/Info/InfoTable";
import { useState } from "react";
import Pagination from "./commponents/Info/Pagination";

// 타입지정
interface ArtworkData {
  id: number;
  title: string;
  location: string;
  description: string;
  [key: string]: string | number;
}

interface SelectedPage {
  selected: number;
}

function ComponentTest() {
  const pageSize = 10; // 한 페이지에 표시할 작품 수
  const [currentPage, setCurrentPage] = useState(0); // 현재 페이지 번호

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
    // ... 더 많은 작품 데이터를 추가할 수 있습니다.
  ];

  const keys = Object.keys(artworkData[0]);
  const widths = ["8%", "30%", "8%"];

  const pageCount = Math.ceil(artworkData.length / pageSize);
  const offset = currentPage * pageSize;
  const currentPageArtworks = artworkData.slice(offset, offset + pageSize);

  // 페이지 변경 시 호출되는 함수
  const handlePageChange = (selectedPage: SelectedPage) => {
    const newPage = selectedPage.selected;
    setCurrentPage(Math.max(newPage, 0)); // 현재 페이지가 0 미만이면 0으로 설정
    console.log(keys);
  };

  return (
    <>
      <h1>ComponentTest</h1>
      <InfoTable
        columnHeaders={keys}
        columnWidths={widths}
        data={currentPageArtworks}
      />
      <Pagination pageCount={pageCount} handlePageChange={handlePageChange} />
    </>
  );
}
export default ComponentTest;
