import { useState, ChangeEvent, useEffect, useRef } from "react";
import EmptyProfile from "../../assets/EmptyProfile2.svg";
import { UserImageChange, UserImage } from "../../api/UserApi";
import { setAuthorizationHeader } from "../Base/BaseFun";

// 프로필 박스의 부모노드에서 변경요청 변수
interface PBprops {
  isChanged: boolean;
}

const ProfileBox: React.FC<PBprops> = ({ isChanged }) => {
  const [image, setImage] = useState<string | null>(null);
  const formData = new FormData();
  const formDataRef = useRef<FormData>(new FormData());

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
      formData.append("file", file);
      formDataRef.current.append("file", file);
    }
  };

  // 부모노드에서 변경요청 감지
  useEffect(() => {
    if (isChanged) {
      changeImage();
    }
    void loadUserimage();
  }, [isChanged]);

  // 변경 요청 감지시 실행할 함수들
  const changeImage = () => {
    console.log("changeImage");
    void updateUserimage();
  };

  // 업데이트 API
  const updateUserimage = async () => {
    try {
      const data = await UserImageChange(formDataRef.current);
      console.log(data);
    } catch (error) {
      console.error("Error UserInfoEdit:", error);
    }
  };

  // 로딩 API
  const loadUserimage = async () => {
    try {
      setAuthorizationHeader();
      const data = await UserImage();
      setImage(data.profilePicture);
    } catch (error) {
      console.error("Error UserInfoEdit:", error);
    }
  };

  return (
    <>
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
    </>
  );
};

export default ProfileBox;
