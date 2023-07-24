import { useState, ChangeEvent } from "react";
import styles from "./ProfileBox.module.css";

const ProfileBox: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setImage(reader.result as string);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <div>
        {image ? (
          <img
            src={image}
            alt="Profile"
            style={{ width: "200px", height: "200px" }}
          />
        ) : (
          <div>No Image</div>
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
  );
};

export default ProfileBox;
