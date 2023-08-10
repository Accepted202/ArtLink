// import { useState, ChangeEvent, useRef } from "react";
// import { Data, AddGallery } from "../../api/ManagerApi";
// import BackBtn from "../../commponents/Base/BackBtn";
// import TextBtn from "../../commponents/Base/TextBtn";
// import Modal from "../../commponents/Base/Form/ExhibitionModal/Modal2";
// import EmptyProfile from "../../assets/EmptyProfile2.svg";

// function GalleryCreate() {
//   // 전송할 폼데이터
//   const formDataRef = useRef<FormData>(new FormData());
//   const [isModalActive, setisModalActive] = useState<boolean>(false); // 모달 활성 boolean
//   const [formData, setFormData] = useState<Data>({});
//   // 각 필드와 필드에 대한 이름을 매핑한 객체
//   const fieldNames = {
//     name: "제목",
//     id: "유저번호",
//     description: "설명",
//     artist: "작가",
//     locationX: "위치 X",
//     locationY: "위치 Y",
//     drawingPath: "",
//   };
//   const [image, setImage] = useState<string | null>(null); // 이미지 관련

//   // 생성 요청시
//   const handleAdd = () => {
//     console.log("creating");
//     for (const [key, value] of Object.entries(formData)) {
//       if (key != "drawingPath" && key != "id") {
//         formDataRef.current.append(key, value as string);
//       }
//     }
//     if (formDataRef.current.has("imageFile")) {
//       void callCreateWork();
//     }
//   };

//   // 생성 API
//   const callCreateWork = async () => {
//     try {
//       const response = await AddGallery(formDataRef.current);
//       console.log("Work created:", response);
//       setisModalActive(true);
//     } catch (error) {
//       console.error("Error creating exhibition:", error);
//     }
//   };

//   // 인풋값 변경시
//   const handleInputChange = (
//     e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
//   ) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   // 인풋 필드 자동 생성
//   const renderFields = () => {
//     return Object.keys(formData).map((field, index) => {
//       return (
//         <div key={index} className="input-field">
//           <label htmlFor={field}>{fieldNames[field as keyof Drawing]} : </label>
//           <input
//             type="text"
//             id={field}
//             name={field}
//             placeholder={`${fieldNames[field as keyof Drawing]}을 입력하세요`}
//             onChange={handleInputChange}
//           />
//         </div>
//       );
//       return null;
//     });
//   };

//   return (
//     <>
//       <Modal sendActive={isModalActive} />
//       {/* 뒤로가기 & 페이지 설명 */}
//       <div className="worksBackBtn">
//         <BackBtn />
//         <h2>갤러리 계정 생성</h2>
//       </div>
//       {/* 갤러리 생성 바디 */}
//       <div className="detail-container">
//         {/* 텍스트 */}
//         <div className="txt-box">{renderFields()}</div>
//       </div>
//       {/* 갤러리 계정 생성 버튼 */}
//       <div onClick={handleAdd}>
//         <TextBtn inner="CREATE" wid={200} hei={50} />
//       </div>
//     </>
//   );
// }

// export default GalleryCreate;
