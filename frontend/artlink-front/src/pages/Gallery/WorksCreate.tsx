import { useState, ChangeEvent, useRef } from "react";
import "./Detail.css";
import EmptyProfile from "../../assets/EmptyProfile2.svg";
import BackBtn from "../../commponents/Base/BackBtn.tsx";
import TextBtn from "../../commponents/Base/TextBtn.tsx";
import { Drawing, WorkCreate } from "../../api/GalleryApi.tsx";

function WorksCreate() {
  // 전송할 폼데이터
  const formDataRef = useRef<FormData>(new FormData());
  const [formData, setFormData] = useState<Drawing>({
    Name: "",
    DrawingPath: "",
    Description: "",
    Artist: "",
    LocationX: 0,
    LocationY: 0,
  });
  // 각 필드와 필드에 대한 이름을 매핑한 객체
  const fieldNames: Record<keyof Drawing, string> = {
    Name: "제목",
    Description: "설명",
    Artist: "작가",
    LocationX: "위치 X",
    LocationY: "위치 Y",
    DrawingPath: ""
  };
  const [image, setImage] = useState<string | null>(null); // 이미지 관련
  // 생성 요청시
  const handleAdd = () => {
    console.log("creating");
    for (const key in formData) {
      if (key != "DrawingPath"){
        formDataRef.current.append(key, formData[key]);
      }
    }
    if (formDataRef.current.has("ImageFile")) {
      void callCreateWork();
    }
  };
  // 생성 API
  const callCreateWork = async () => {
    try {
      const response = await WorkCreate(formDataRef.current);
      console.log("Work created:", response);
    } catch (error) {
      console.error("Error creating exhibition:", error);
    }
  };
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
      formDataRef.current.append("ImageFile", file);
    }
  };
  // 인풋값 변경시
  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  // 인풋 필드 자동 생성
  const renderFields = () => {
    return Object.keys(formData).map((field, index) => {
      if (field !== "DrawingPath") {
        // 이미지 필드는 제외
        return (
          <div key={index} className="input-field">
            <label htmlFor={field}>{fieldNames[field as keyof Drawing]} : </label>
            <input
              type="text"
              id={field}
              name={field}
              placeholder={`${fieldNames[field as keyof Drawing]}을 입력하세요`}
              onChange={handleInputChange}
            />
          </div>
        );
      }
      return null;
    });
  };

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
        <div className="txt-box">{renderFields()}</div>
      </div>
      {/* 작품 생성 버튼 */}
      <div onClick={handleAdd}>
        <TextBtn inner="CREATE" wid={200} hei={50} />
      </div>
    </>
  );
}
export default WorksCreate;
