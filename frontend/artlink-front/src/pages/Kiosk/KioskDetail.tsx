import { useState } from "react";
import MainLogo from "../../commponents/Base/MainLogo";
import styles from "./KioskDetail.module.css";

// TODO: Edit 기능 추가 필요

function KioskDetail() {
  // 서버로부터 가져온 작품 정보
  const artworksInfo = [
    { title: 1 },
    { title: 2 },
    { title: 3 },
    { title: 4 },
    { title: 5 },
    { title: 6 },
    { title: 7 },
  ];

  // 서버에 보낼 최종 데이터는 artworks다.
  const [artworks, setArtworks] = useState(artworksInfo);

  // Delete 버튼 클릭 시 요소 삭제
  const handleDelete = (index: number) => {
    const updatedArtworks = [
      ...artworks.slice(0, index),
      ...artworks.slice(index + 1),
    ];
    setArtworks(updatedArtworks);
  };

  // 요소 삭제 시 삭제 애니메이션 넣으면 어떨까

  return (
    <>
      <MainLogo />
      <div className={styles["container-wrapper"]}>
        {artworks.map((artwork, index) => (
          <div className={styles["artwork-container"]}>
            <div className={`${styles.artwork} ${styles.neu}`} key={index}>
              <div>{artwork.title}</div>
            </div>
            <div className={styles["button-wrapper"]}>
              <button className={`${styles.neu} ${styles.edit}`}>Edit</button>
              <button
                className={`${styles.neu} ${styles.delete}`}
                onClick={() => handleDelete(index)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
export default KioskDetail;
