import { useState } from "react";
import styles from "./ArtworkBox.module.css";
import DeleteModal from "./DeleteModal";

// 작품의 정보를 띄울 박스, delete로 작품 삭제 가능

interface Data {
  [key: string]: string | number;
}

interface Props {
  artwork: Data;
  onClickDelete: (id: number | string) => void;
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
  const handleModalClose = () => {
    setIsModalOpen(false);
    if (isDelete) {
      onClickDelete(artwork.id);
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
        <div>{artwork.title}</div>
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
          onClose={handleModalClose}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
}

export default ArtworkBox;
