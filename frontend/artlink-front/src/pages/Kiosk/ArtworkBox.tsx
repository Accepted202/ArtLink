import styles from "./ArtworkBox.module.css";

// 작품의 정보를 띄울 박스, delete로 작품 삭제 가능

interface Props {
  title: string;
  // onClickDelete: () => void;
}

// function ArtworkBox({ title, onClickDelete }: Props) {
function ArtworkBox({ title }: Props) {
  return (
    <div className={styles["artwork-box"]}>
      <div className={`${styles.artwork} ${styles.neu}`}>
        {/*작품의 정보가 들어갈 곳*/}
        <div>{title}</div>
      </div>
      {/* <div className={styles["button-wrapper"]}>
        <button
          className={`${styles.neu} ${styles.delete}`}
          onClick={onClickDelete}
        >
          Delete
        </button>
      </div> */}
    </div>
  );
}

export default ArtworkBox;
