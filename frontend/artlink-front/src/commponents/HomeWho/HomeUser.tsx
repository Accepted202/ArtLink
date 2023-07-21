import { useState } from "react";
import BigButton from "../../commponents/Base/BigButton";
import MainLogo from "../../commponents/Base/MainLogo";

import UserMenu1 from "../../pages/User/ArtMemory";
import UserMypage from "../../pages/Common/Mypage";
import { useMenu } from "../../commponents/Base/Menu";

function HomeUser() {
  const [isBigBtnBoxVisible, setIsBigBtnBoxVisible] = useState(true);
  const [render_component, setRenderComponent] =
    useState<React.ReactNode>(null);

  function LoadComp(menu: string) {
    // 메뉴 버튼을 누를시 메뉴 버튼 탭은 사라지고
    // 클릭한 메뉴가 로드
    console.log({ menu });
    setIsBigBtnBoxVisible(false);
    if (menu === "1") {
      setRenderComponent(<UserMenu1 />);
    } else if (menu === "2") {
      setRenderComponent(<UserMypage />);
    }
  }

  const fromMenu = useMenu();
  console.log("메뉴에서 왔습니다", fromMenu, fromMenu?.menuselect);
  return (
    <>
      <MainLogo />
      <h3>HomeUser</h3>
      {/* 초기화면의 메뉴 BigButtons */}
      {isBigBtnBoxVisible && (
        <div className="BigBtnBox3">
          {/* 메뉴 버튼 */}
          <div onClick={() => LoadComp("1")}>
            <BigButton tabName={"Menu 1"} />
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
export default HomeUser;
