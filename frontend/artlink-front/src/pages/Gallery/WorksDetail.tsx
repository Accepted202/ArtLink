import { useState, ChangeEvent, useRef, useEffect } from "react";
import "./Detail.css";
import BackBtn from "../../commponents/Base/BackBtn.tsx";
import { Drawing, OneWork, WorkUpdate } from "../../api/GalleryApi.tsx";

function WorksDetail() {
  const [image, setImage] = useState<string>(""); // 이미지 관련
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
  const fieldNames = {
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
            <label htmlFor={field}>
              {fieldNames[field as keyof Drawing]} :{" "}
            </label>
            <input
              type="text"
              id={field}
              name={field}
              onChange={handleInputChange}
              value={workData[field as keyof Drawing]}
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
    for (const key in workData) {
      if (key != "drawingPath" && key != "id") {
        formDataRef.current.append(key, workData[key]);
      }
    }
    if (formDataRef.current.has("imageFile")) {
      void callWorkUpdate();
    }
  };
  // 업데이트 요청
  const callWorkUpdate = async () => {
    try {
      const response = await WorkUpdate(formDataRef.current);
      console.log("Work updated:", response);
      // setisModalActive(true);
    } catch (error) {
      console.error("Error updating exhibition:", error);
    }
  };
  return (
    <>
      {/* 작품 정보 타이틀 */}
      <div className="worksBackBtn">
        <BackBtn />
        <h2>작품 정보</h2>
      </div>
      {/* 작품 정보 박스 */}
      <div className="detail-container">
        {/* 이미지 */}
        <div>
          <div className="image-box">
            <div className="imageInner-box">
              {image ? (
                <img src={image} alt="Profile" className="work-image" />
              ) : (
                <img src={image} alt="빈 프로필" className="work-image" />
              )}
            </div>
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
        <div className="txt-box">{renderFields()}</div>
      </div>
      {/* 작품 정보 업데이트 버튼 */}
      <div>
        <button className="detail-updateBtn" onClick={handleWorkUpdate}>
          UPDATE
        </button>
      </div>
    </>
  );
}
export default WorksDetail;
