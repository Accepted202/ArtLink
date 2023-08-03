import styles from "./InfoDetail.module.css";

interface Data {
  [key: string]: string | number;
}

interface Props {
  data: Data; // 데이터
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

function InfoDetail({ data, handleInputChange }: Props) {
  return (
    <>
      {Object.keys(data).map((key, index) => (
        <p key={index}>
          {key}:{" "}
          <input
            type="text"
            name={key}
            value={data[key]}
            onChange={handleInputChange}
            className={styles.profileInput}
          />
        </p>
      ))}
    </>
  );
}

export default InfoDetail;
