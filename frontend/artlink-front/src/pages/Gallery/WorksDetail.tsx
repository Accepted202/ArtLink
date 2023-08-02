import ArtworkProfileBox from "../../commponents/Info/ArtworkProfileBox.tsx";
import ArtworkInputInfoTable from "../../commponents/Info/ArtworkInputInfoTable.tsx";
import "./Detail.css";
import BackBtn from "../../commponents/Base/BackBtn.tsx";

/*
api로 해당 아이디의 작품 정보 가져오는 코드
useParams를 사용해 파라미터 값(아이디)
*/

const id = 1;
const title = "제목";
const location = "위치";
const description = "설명";

function WorksDetail() {
  return (
    <>
      {/* 작품 정보 타이틀 */}
      <div className="worksBackBtn">
        <BackBtn />
        <h2>작품 정보</h2>
      </div>
      {/* 작품 정보 박스 */}
      <div className="detail-container">
        <ArtworkProfileBox />
        <ArtworkInputInfoTable
          id={id}
          title={title}
          location={location}
          description={description}
        />
      </div>
      {/* 작품 정보 업데이트 버튼 */}
      <div>
        <button className="detail-updateBtn">UPDATE</button>
      </div>
    </>
  );
}
export default WorksDetail;
