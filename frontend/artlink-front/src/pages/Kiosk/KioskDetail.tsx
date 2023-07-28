import { useRef, useState, useEffect } from "react";
import MainLogo from "../../commponents/Base/MainLogo";
import styles from "./KioskDetail.module.css";
import BoxContainer from "./BoxContainer";

// 요소 삭제 시 삭제 애니메이션 넣으면 어떨까

function KioskDetail() {
  // 서버로부터 가져온 작품 정보
  // const artworksInfo = [
  //   { title: "1" },
  //   { title: "2" },
  //   { title: "3" },
  //   { title: "4" },
  //   { title: "5" },
  //   { title: "6" },
  //   { title: "7" },
  //   { title: "8" },
  //   { title: "9" },
  //   { title: "10" },
  // ];

  // 서버에 보낼 최종 데이터는 artworks다.
  // const [artworks, setArtworks] = useState(artworksInfo);

  // Delete 버튼 클릭 시 요소 삭제
  // const handleDelete = (index: number) => {
  //   const updatedArtworks = [
  //     ...artworks.slice(0, index),
  //     ...artworks.slice(index + 1),
  //   ];
  //   setArtworks(updatedArtworks);
  // };

  return (
    <>
      <MainLogo />
      <div className={styles["container-wrapper"]}>
        <BoxContainer></BoxContainer>
        <BoxContainer></BoxContainer>
        <BoxContainer></BoxContainer>
        <BoxContainer></BoxContainer>
      </div>
    </>
  );
}
export default KioskDetail;
