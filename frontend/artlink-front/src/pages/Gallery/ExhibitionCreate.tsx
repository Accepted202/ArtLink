import Styles from "./Exhibition.module.css";
import BackBtn from "../../commponents/Base/BackBtn";
import CreateExhibition from "../../commponents/GalleryExhibitions/CreateExhibition";

function ExhibitionCreate() {
  return (
    <>
      {/* 전시회 박스 */}
      <div className={Styles.Create}>
        {/* 상단 메뉴 */}
        <div className={Styles.CreateMenu}>
          <BackBtn />
          <div className={Styles.CreateTitle}>Exhibition Create</div>
        </div>
        <hr style={{ width: "80vw" }} />
        {/* 메인 컨테이너 */}
        <div className={Styles.CreateContainer}>
          <CreateExhibition />
        </div>
      </div>
    </>
  );
}
export default ExhibitionCreate;
