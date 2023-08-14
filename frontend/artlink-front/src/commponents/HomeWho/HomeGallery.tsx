// import React from "react";
import { Link } from "react-router-dom";
import MainLogo from "../../commponents/Base/MainLogo";
import Styles from "./../../commponents/Base/BigButton.module.css";
import { GalleryInfo } from "../../api/GalleryApi";
import { setAuthorizationHeader } from "../Base/BaseFun";
import { useEffect, useState } from "react";

function HomeGallery() {
  const [accepted, setAccepted] = useState(true);

  const getGalleryAccepted = async () => {
    try {
      setAuthorizationHeader();
      const data = await GalleryInfo();
      setAccepted(data.accepted);
    } catch (error) {
      console.error("승인 여부 가져오기 실패: ", error);
    }
  };

  useEffect(() => {
    void getGalleryAccepted();
  }, []);

  return (
    <>
      <MainLogo />
      <div className="BigBtnBox2">
        {/* Menu : Artwork Manage */}
        <div className={Styles.startbtnBody}>
          {accepted ? (
            <Link
              to="/exhibition-board"
              style={{ textDecoration: "none" }}
              className={Styles.startbtn}
            >
              <div style={{ margin: "auto" }}>
                <p className={Styles.innerIcon}>{"Artwork Manager"}</p>
                <p className={Styles.innerIcon2}>{"Register your work"}</p>
              </div>
            </Link>
          ) : (
            <div style={{ textDecoration: "none" }} className={Styles.startbtn}>
              <div style={{ margin: "auto" }}>
                <p className={Styles.innerIcon}>{"Artwork Manager"}</p>
                <p className={Styles.innerIcon2}>{"Register your work"}</p>
                <p style={{ color: "red" }} className={Styles.innerIcon}>
                  {"Authorization required!"}
                </p>
              </div>
            </div>
          )}
        </div>
        {/* Menu : My page */}
        <div className={Styles.startbtnBody}>
          <Link
            to="/mypage/gallery"
            style={{ textDecoration: "none" }}
            className={Styles.startbtn}
          >
            <div style={{ margin: "auto" }}>
              <p className={Styles.innerIcon}>{"My Page"}</p>
              <p className={Styles.innerIcon2}>{"Manage your gallery info"}</p>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
}
export default HomeGallery;
