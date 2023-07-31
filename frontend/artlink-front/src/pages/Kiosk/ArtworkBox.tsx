import styles from "./ArtworkBox.module.css";

// 작품의 정보를 띄울 박스, delete로 작품 삭제 가능

interface Artwork {
  id: number;
  title: string;
}

interface Props {
  artwork: Artwork;
  onClickDelete: (id: number) => void;
}

function ArtworkBox({ artwork, onClickDelete }: Props) {
  return (
    <div className={styles["artwork-box"]}>
      <div className={`${styles.artwork} ${styles.neu}`}>
        {/*작품의 정보가 들어갈 곳*/}
        <div>{artwork.title}</div>
      </div>
      <div className={styles["button-wrapper"]}>
        <button
          className={`${styles.neu} ${styles.delete}`}
          onClick={() => onClickDelete(artwork.id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default ArtworkBox;
