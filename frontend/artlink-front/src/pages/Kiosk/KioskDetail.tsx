import { useState, useEffect } from "react";
import KioskMainLogo from "./KioskMainLogo";
import styles from "./KioskDetail.module.css";
import BoxContainer from "./BoxContainer";
import { Link, useParams } from "react-router-dom";
import {
  Paint,
  PostData,
  getPostevents,
  deleteArtwork,
} from "../../api/KioskApi";

// 작품 조회 페이지

/*
  [v] Artwork 배분
  [v] Artwork 삭제
  [v] 요소 삭제 시 모달 창 띄우기
  [ ] postData에 있는 데이터들 표시하기
  [ ] 요소 삭제 시 삭제 애니메이션
*/

function KioskDetail() {
  const { pk } = useParams();
  const [postData, setPostData] = useState<PostData>(); // 서버로부터 가져온 작품 정보
  postData;
  const [artworks, setArtworks] = useState<Paint[]>([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await getPostevents(pk as string);
        setPostData(response);
        setArtworks(response.workList);
        console.log(response);
      } catch (error) {
        console.error("사후 데이터를 가져오는 데 실패했습니다.", error);
        window.alert("사후 데이터 가져오기 실패");
      }
    };
    void getData();
  }, []);

  // Delete 버튼 클릭 시 요소 삭제
  const handleDelete = async (drawingId: number) => {
    setArtworks((prevData) =>
      prevData.filter((item) => item.artworkId !== drawingId)
    );
    try {
      await deleteArtwork(pk as string, drawingId);
    } catch (error) {
      window.alert(error);
    }
  };

  const chunkSize = 4; // 컨테이너 하나 당 들어가는 작품 개수
  const chunkedData = [];

  // 컨테이너 하나에 작품 4개씩 넣기
  for (let i = 0; i < artworks.length; i += chunkSize) {
    chunkedData.push(artworks.slice(i, i + chunkSize));
  }

  return (
    <>
      <KioskMainLogo />
      <div className={styles["container-wrapper"]}>
        {chunkedData.map((chunk, index) => (
          <BoxContainer
            key={index}
            chunk={chunk}
            // eslint-disable-next-line @typescript-eslint/no-misused-promises
            onClickDelete={handleDelete}
          />
        ))}
      </div>
      <div className={styles["button-wrapper"]}>
        <Link to="/kiosk/print">
          <button className={styles["next-button"]}>Print</button>
        </Link>
      </div>
    </>
  );
}
export default KioskDetail;
