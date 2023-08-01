import styles from "./BoxContainer.module.css";
import ArtworkBox from "./ArtworkBox";

// ArtworkBox를 담는 컨테이너

interface Artwork {
  id: number;
  title: string;
}

interface Props {
  chunk: Artwork[];
  onClickDelete: (id: number) => void;
}

function BoxContainer({ chunk, onClickDelete }: Props) {
  return (
    <div className={styles.container}>
      {chunk.map((artwork, index) => (
        <ArtworkBox
          key={index}
          artwork={artwork}
          onClickDelete={() => onClickDelete(artwork.id)}
        />
      ))}
    </div>
  );
}

export default BoxContainer;