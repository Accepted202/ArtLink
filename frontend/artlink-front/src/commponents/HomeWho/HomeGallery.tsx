import { useState } from "react";
import BigButton from "../../commponents/Base/BigButton";
import MainLogo from "../../commponents/Base/MainLogo";

import GalleryMenu1 from "../../pages/Gallery/WorksBoard";
import GalleryMypage from "../../pages/Common/Mypage";

function HomeGallery() {
  const [isBigBtnBoxVisible, setIsBigBtnBoxVisible] = useState(true);
  const [render_component, setRenderComponent] =
    useState<React.ReactNode>(null);

  function LoadComp(menu: string) {
    // 메뉴 버튼을 누를시 메뉴 버튼 탭은 사라지고
    // 클릭한 메뉴가 로드
    console.log({ menu });
    setIsBigBtnBoxVisible(false);
    if (menu === "1") {
      setRenderComponent(<GalleryMenu1 />);
    } else if (menu === "2") {
      setRenderComponent(<GalleryMypage />);
    }
  }

  return (
    <>
      <MainLogo />
      <h3>HomeGallery</h3>
      {isBigBtnBoxVisible && (
        <div className="BigBtnBox2">
          <div onClick={() => LoadComp("1")}>
            <BigButton tabName={"Artwork Manager"} />
          </div>
          <div onClick={() => LoadComp("2")}>
            <BigButton tabName={"My Page"} />
          </div>
        </div>
      )}
      {/* 메뉴별 렌더링 컴포넌트 */}
      {render_component}
    </>
  );
}
export default HomeGallery;
