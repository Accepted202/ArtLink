import { useState } from "react";
import BigButton from "../../commponents/Base/BigButton";
import MainLogo from "../../commponents/Base/MainLogo";

import UserBoard from "../../pages/Manager/UserBoard";
import GalleryBoard from "../../pages/Manager/GalleryBoard";

function HomeManager() {
  const [isBigBtnBoxVisible, setIsBigBtnBoxVisible] = useState(true);
  const [render_component, setRenderComponent] =
    useState<React.ReactNode>(null);

  function LoadComp(menu: string) {
    // 메뉴 버튼을 누를시 메뉴 버튼 탭은 사라지고
    // 클릭한 메뉴가 로드
    console.log({ menu });
    setIsBigBtnBoxVisible(false);
    if (menu === "1") {
      setRenderComponent(<UserBoard />);
    } else if (menu === "2") {
      setRenderComponent(<GalleryBoard />);
    }
  }

  return (
    <>
      <MainLogo />
      <h3>HomeManager</h3>
      {isBigBtnBoxVisible && (
        <div className="BigBtnBox2">
          <div onClick={() => LoadComp("1")}>
            <BigButton tabName={"User Manage"} />
          </div>
          <div onClick={() => LoadComp("2")}>
            <BigButton tabName={"Gallery Manage"} />
          </div>
        </div>
      )}
      {/* 메뉴별 렌더링 컴포넌트 */}
      {render_component}
    </>
  );
}
export default HomeManager;
