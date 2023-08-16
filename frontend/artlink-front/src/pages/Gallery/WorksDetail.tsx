import { useState, ChangeEvent, useRef, useEffect } from "react";
import "./Detail.css";
import defaultImg from "../../assets/EmptyGallery.png";
import BackBtn from "../../commponents/Base/BackBtn.tsx";
import { Drawing, OneWork, WorkUpdate } from "../../api/GalleryApi.tsx";
import TextareaAutosize from "react-textarea-autosize";
import TextBtn from "../../commponents/Base/TextBtn.tsx";
import ModalUpdate2 from "../../commponents/Base/Form/ExhibitionModal/ModalUpdate2";

function WorksDetail() {
  const [image, setImage] = useState<string>(""); // 이미지 관련
  const [isModalActive, setisModalActive] = useState<boolean>(false); // 모달 활성 boolean
  const [workData, setWorkData] = useState<Drawing>({
    name: "test",
    id: 0,
    drawingPath: "test",
    description: "test",
    artist: "test",
    locationX: 0,
    locationY: 0,
  });
  // 각 필드와 필드에 대한 이름을 매핑한 객체
  const fieldNames: Record<keyof Drawing, string> = {
    name: "제목",
    id: "유저번호",
    description: "설명",
    artist: "작가",
    locationX: "위치 X",
    locationY: "위치 Y",
    drawingPath: "",
  };
  const formDataRef = useRef<FormData>(new FormData());
  // 작품 상세 조회 API
  useEffect(() => {
    const fetchOneWork = async () => {
      const onework = await OneWork();
      console.log("Onework :", onework);
      setWorkData(onework);
      setImage(onework.drawingPath);
    };

    void fetchOneWork();
  }, []);

  // 이미지 변경시
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setImage(reader.result as string);
    };

    if (file) {
      reader.readAsDataURL(file);
      // 폼데이터에 파일 저장
      formDataRef.current.delete("imageFile");
      formDataRef.current.append("imageFile", file);
    }
  };
  // 인풋값 변경시
  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setWorkData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  // 인풋 필드 자동 생성
  const renderFields = () => {
    return Object.keys(workData).map((field, index) => {
      if (field !== "id" && field !== "drawingPath") {
        // 이미지 필드는 제외
        return (
          <div key={index} className="input-field">
            <label htmlFor={field}>{fieldNames[field]} </label>
            <TextareaAutosize
              id={field}
              name={field}
              onChange={handleInputChange}
              value={workData[field]}
              className="textArea2"
            />
          </div>
        );
      }
      return null;
    });
  };
  // 업데이트 버튼 누를시
  const handleWorkUpdate = () => {
    console.log("Work update");
    for (const [key, value] of Object.entries(workData)) {
      if (key != "drawingPath" && key != "id") {
        formDataRef.current.append(key, value as string);
      }
    }

    void callWorkUpdate();
  };
  // 업데이트 요청
  const callWorkUpdate = async () => {
    try {
      const response = await WorkUpdate(formDataRef.current);
      console.log("Work updated:", response);
      setisModalActive(true);
    } catch (error) {
      console.error("Error updating exhibition:", error);
      window.alert("사용할 수 없는 입력값입니다. 다시 입력해주세요");
      window.location.reload();
    }
  };
  return (
    <>
      <ModalUpdate2 sendActive={isModalActive} />
      {/* 작품 정보 타이틀 */}
      <div className="worksBackBtn">
        <BackBtn />
        <div className="workTitle">작품 정보</div>
      </div>
      {/* 작품 정보 박스 */}
      <div className="detail-container-outter">
        <div className="detail-container">
          <div className="image-box">
            <div>
              {image ? (
                <img src={image} alt="Profile" className="work-image2" />
              ) : (
                <img src={defaultImg} alt="빈 프로필" />
              )}
            </div>
            <input
              type="file"
              accept="image/*"
              id="file"
              onChange={handleImageChange}
              style={{ display: "none" }}
            />
            <label htmlFor="file" style={{ fontSize: "12px" }}>
              파일 업로드
            </label>
          </div>
          <div className="txt-box">{renderFields()}</div>
        </div>
        {/* 이미지 */}
        {/* 텍스트 */}
      </div>
      {/* 작품 정보 업데이트 버튼 */}
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div onClick={handleWorkUpdate}>
          <TextBtn inner={"Update"} wid={200} hei={50} />
        </div>
      </div>
    </>
  );
}
export default WorksDetail;
