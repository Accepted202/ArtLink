import { useState, ChangeEvent, useRef } from "react";
import BackBtn from "../../commponents/Base/BackBtn.tsx";
import TextBtn from "../../commponents/Base/TextBtn.tsx";
import { GalleryCreateRes, AddGallery } from "../../api/ManagerApi.tsx";
import Modal2 from "../../commponents/Base/Form/ExhibitionModal/Modal2.tsx";
import styles from "./GalleryCreate.module.css";

function GalleryCreate() {
  // 전송할 폼데이터
  const formDataRef = useRef<FormData>(new FormData());
  const [isModalActive, setisModalActive] = useState<boolean>(false); // 모달 활성 boolean
  const [formData, setFormData] = useState<GalleryCreateRes>({
    username: "",
    password: "",
    galleryName: "",
  });

  // 각 필드와 필드에 대한 이름을 매핑한 객체
  const fieldNames: Record<keyof GalleryCreateRes, string> = {
    username: "본인 이름",
    password: "비밀번호",
    galleryName: "갤러리 이름",
  };
  // 생성 요청시
  const handleAdd = () => {
    console.log("creating");
    for (const [key, value] of Object.entries(formData)) {
      formDataRef.current.append(key, value);
    }
    void callCreateWork();
  };

  // 생성 API
  const callCreateWork = async () => {
    try {
      const response = await AddGallery(formDataRef.current);
      console.log("Work created:", response);
      setisModalActive(true);
    } catch (error) {
      console.error("Error creating exhibition:", error);
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
      return (
        <div key={index} className={styles["input-field"]}>
          <label htmlFor={field}>{fieldNames[field]} : </label>
          <input
            type="text"
            id={field}
            name={field}
            placeholder={`${fieldNames[field]}을 입력하세요`}
            onChange={handleInputChange}
          />
        </div>
      );
    });
  };

  return (
    <>
      <Modal2 sendActive={isModalActive} />
      {/* 뒤로가기 & 페이지 설명 */}
      <div className={styles["worksBackBtn"]}>
        <BackBtn />
        <h2>갤러리 계정 생성</h2>
      </div>
      {/* 계정 생성 바디 */}
      <div className={styles["detail-container"]}>
        {/* 텍스트 */}
        <div className={styles["txt-box"]}>{renderFields()}</div>
      </div>
      {/* 계정 생성 버튼 */}
      <div onClick={handleAdd}>
        <TextBtn inner="CREATE" wid={200} hei={50} />
      </div>
    </>
  );
}
export default GalleryCreate;
