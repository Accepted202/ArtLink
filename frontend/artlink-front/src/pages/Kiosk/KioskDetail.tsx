import { useState } from "react";
import MainLogo from "../../commponents/Base/MainLogo";
import styles from "./KioskDetail.module.css";
import BoxContainer from "./BoxContainer";

// 작품 조회 페이지

/*
  [v] Artwork 배분
  [v] Artwork 삭제
  [v] 요소 삭제 시 모달 창 띄우기
  [ ] 상속 문제 해결
  [ ] 요소 삭제 시 삭제 애니메이션
  [ ] 페이지 별로 구분하는 애니메이션
*/

/*
api 확인 후 데이터 구조에 따라 수정 필요.
데이터 내의 정보로 어떤 것을 삭제할 지 결정해야한다.
-> api 아직 완성 안됨
*/

function KioskDetail() {
  // 서버로부터 가져온 작품 정보
  const artworksInfo = [
    { id: 1, title: "1" },
    { id: 2, title: "2" },
    { id: 3, title: "3" },
    { id: 4, title: "4" },
    { id: 5, title: "5" },
    { id: 6, title: "6" },
    { id: 7, title: "7" },
    { id: 8, title: "8" },
    { id: 9, title: "9" },
    { id: 10, title: "10" },
  ];

  // 서버에 보낼 최종 데이터는 artworks다.
  const [artworks, setArtworks] = useState(artworksInfo);

  // Delete 버튼 클릭 시 요소 삭제
  const handleDelete = (id: number) => {
    setArtworks((prevData) => prevData.filter((item) => item.id !== id));
  };

  const chunkSize = 4; // 컨테이너 하나 당 들어가는 작품 개수
  const chunkedData = [];

  // 컨테이너 하나에 작품 4개씩 넣기
  for (let i = 0; i < artworks.length; i += chunkSize) {
    chunkedData.push(artworks.slice(i, i + chunkSize));
  }

  // 페이지
  // const startIdx = (currentPage - 1) * itemsPerContainer;
  // const endIdx = currentPage * itemsPerContainer;

  // const displayedArtworks = artworks.slice(startIdx, endIdx);

  return (
    <>
      <MainLogo />
      <div className={styles["container-wrapper"]}>
        {chunkedData.map((chunk, index) => (
          <BoxContainer
            key={index}
            chunk={chunk}
            onClickDelete={handleDelete}
          />
        ))}
      </div>
      <div className={styles["button-wrapper"]}>
        <button className={styles["next-button"]}>Print</button>
      </div>
    </>
  );
}
export default KioskDetail;
