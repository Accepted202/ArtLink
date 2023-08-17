import "./AboutUs.css";
import aboutImg1 from "../../assets/About2-1.png";
import aboutImg2 from "../../assets/About2-2.png";
import aboutImg3 from "../../assets/About2-3.png";
import aboutImg4 from "../../assets/About2-4.png";
import aboutImg5 from "../../assets/About2-5.png";
import aboutImg6 from "../../assets/About2-6.png";

function AboutPage2() {
  return (
    <>
      <div className="imgOuter">
        <div className="horizontalscrollcontainer">
        <img src={aboutImg1} alt="" />
        <img src={aboutImg2} alt="" />
        <img src={aboutImg3} alt="" />
        <img src={aboutImg4} alt="" />
        <img src={aboutImg5} alt="" />
        <img src={aboutImg6} alt="" />
        </div>
      </div>
    </>
  );
}
export default AboutPage2;
