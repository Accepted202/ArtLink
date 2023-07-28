import styles from "./BoxContainer.module.css";
import ArtworkBox from "./ArtworkBox";

// ArtworkBox를 담는 컨테이너

function BoxContainer() {
  return (
    <div className={styles.container}>
      <ArtworkBox title="1" />
      <ArtworkBox title="2" />
      <ArtworkBox title="3" />
    </div>
  );
}

export default BoxContainer;
