import ProfileUser from "../../commponents/Mypage/ProfileUser";
import ProfileGallery from "../../commponents/Mypage/ProfileGallery";
import BackBtn from "../../commponents/Base/BackBtn";
import Styles from "./Mypage.module.css";

function Mypage() {
  // 로그인한 사용자 권한 확인후 렌더링
  const pathname = window.location.pathname;
  return (
    <>
      {/* 뒤로가기버튼 */}
      <div className={Styles.BackBtn}>
        <BackBtn />
      </div>
      {/* 프로필 컨테이너 */}
      <div className={Styles.Mypagecontainer}>
        {pathname.includes("user") && <ProfileUser />}
        {pathname.includes("gallery") && <ProfileGallery />}
      </div>
    </>
  );
}
export default Mypage;
