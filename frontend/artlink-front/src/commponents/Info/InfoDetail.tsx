import BackBtn from "../Base/BackBtn";
import EmptyProfile from "../../assets/EmptyProfile2.svg";
import styles from "./InfoDetail.module.css";

interface Data {
  [key: string]: string | number;
}

interface Props {
  data: Data; // 데이터
  image: string | null;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function InfoDetail({
  data,
  image,
  handleInputChange,
  handleImageChange,
}: Props) {
  return (
    <>
      {/* 뒤로가기 & 페이지 설명 */}
      <div className="worksBackBtn">
        <BackBtn />
        <h2>작품 생성</h2>
      </div>
      {/* 작품 생성 바디 */}
      <div className="detail-container">
        {/* 이미지 */}
        <div className="image-box">
          <div style={{ width: "200px" }}>
            {image ? (
              <img
                src={image}
                alt="Profile"
                style={{ width: "200px", height: "200px" }}
              />
            ) : (
              <img src={EmptyProfile} alt="빈 프로필" />
            )}
          </div>
          <input
            type="file"
            accept="image/*"
            id="file"
            onChange={handleImageChange}
            style={{ display: "none" }}
          />
          <label htmlFor="file">파일 업로드</label>
        </div>
        {/* 텍스트 */}
        <div className="txt-box">
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
        </div>
      </div>
      {/* 작품 생성 버튼 */}
      <div onClick={handleAdd}>
        <TextBtn inner="CREATE" wid={200} hei={50} />
      </div>
    </>
  );
}

export default InfoDetail;
