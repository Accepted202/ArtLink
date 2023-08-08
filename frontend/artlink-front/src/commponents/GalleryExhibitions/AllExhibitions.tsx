import "./AllExhibitions.css";
import { useEffect, useState } from "react";
import { ExhibitionAllInfo, ExhibitionAllInfoRes } from "../../api/GalleryApi";
import "../../assets/EmptyGallery.png";
import { Link } from "react-router-dom";

function AllExhibitions() {
  const [exhibitions, setExhibitions] = useState<ExhibitionAllInfoRes>();
  // 전체 전시회 정보 조회 API
  useEffect(() => {
    const fetchExhibitions = async () => {
      const fetchedExhibitions = await ExhibitionAllInfo();
      console.log(fetchedExhibitions);
      setExhibitions(fetchedExhibitions);
    };

    void fetchExhibitions();
  }, []);

  return (
    <>
      {exhibitions?.exhibitions?.map((exhibition) => (
        <Link
          to={`${exhibition.id}`}
          key={`${exhibition.id}`}
          className="ExhibitionLink"
        >
          <div className="ExhibitionBox">
            <div className="ExhibitionTitle">{exhibition.exhibitionName}</div>
            <img src={exhibition.posterUrl} alt="전시회 이미지가 없습니다" />
          </div>
        </Link>
      ))}
    </>
  );
}
export default AllExhibitions;
