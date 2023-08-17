import introVideo from "../../assets/video/video1.mp4";

function AboutPage3() {
  return (
    <>
      <div style={{ display: "flex", justifyContent: "auto" }} className="videoOuter"> 
        <video
          controls
          height="100%"
          autoPlay
          loop
          muted
          playsInline
          style={{ margin: "auto" }}
        >
          <source src={introVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </>
  );
}

export default AboutPage3;
