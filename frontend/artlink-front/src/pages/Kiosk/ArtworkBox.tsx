import { useState } from "react";
import styles from "./ArtworkBox.module.css";
import DeleteModal from "./DeleteModal";
import { Paint } from "../../api/KioskApi";

// 작품의 정보를 띄울 박스, delete로 작품 삭제 가능

interface Props {
  artwork: Paint;
  onClickDelete: (drawingId: number) => Promise<void>;
}

function ArtworkBox({ artwork, onClickDelete }: Props) {
  // 모달 창 오픈 여부 저장
  const [isModalOpen, setIsModalOpen] = useState(false);
  // 작품 삭제 여부 저장
  const [isDelete, setIsDelete] = useState(false);

  // 모달창 열기
  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  // 모달 창 닫기
  const handleModalClose = async () => {
    setIsModalOpen(false);
    if (isDelete) {
      await onClickDelete(artwork.artworkId);
    }
  };

  // 삭제 결정
  const handleDelete = () => {
    setIsDelete(true);
  };

  return (
    <div className={styles["artwork-box"]}>
      <div className={`${styles.artwork} ${styles.neu}`}>
        {/*작품의 정보가 들어갈 곳*/}
        <div className={styles.title}>{artwork.paintName}</div>
        <img src={artwork.paintPath} alt="작품 이미지" />
      </div>
      <div className={styles["button-wrapper"]}>
        <button
          className={`${styles.neu} ${styles.delete}`}
          onClick={handleModalOpen}
        >
          Delete
        </button>
        <DeleteModal
          isOpen={isModalOpen}
          // eslint-disable-next-line @typescript-eslint/no-misused-promises
          onClose={handleModalClose}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
}

export default ArtworkBox;
