import { useRef, useEffect, useState } from "react";
import "./AboutUs.css";
import Dots from "./AboutDot";

function AboutUs() {
  const outerDivRef = useRef<HTMLDivElement>(null);
  const [scrollIndex, setScrollIndex] = useState<number>(1); // State type specified for scrollIndex

  useEffect(() => {
    const wheelHandler = (e: WheelEvent) => {
      e.preventDefault();
      const { deltaY } = e;
      const { scrollTop } = outerDivRef.current!;

      const pageHeight = window.innerHeight * 0.8;

      if (deltaY > 0) {
        if (scrollTop >= 0 && scrollTop < pageHeight) {
          console.log("현재 1페이지, down");
          setScrollIndex(2);
          outerDivRef.current!.scrollTo({
            top: pageHeight,
            left: 0,
            behavior: "smooth",
          });
        } else if (scrollTop >= pageHeight && scrollTop < pageHeight * 2) {
          console.log("현재 2페이지, down");
          setScrollIndex(3);
          outerDivRef.current!.scrollTo({
            top: pageHeight * 2,
            left: 0,
            behavior: "smooth",
          });
        } else {
          console.log("현재 3페이지, down");
          outerDivRef.current!.scrollTo({
            top: pageHeight * 2,
            left: 0,
            behavior: "smooth",
          });
        }
      } else {
        if (scrollTop >= 0 && scrollTop < pageHeight) {
          console.log("현재 1페이지, up");
          outerDivRef.current!.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth",
          });
        } else if (
          Number(scrollTop) + 1 >= pageHeight &&
          Number(scrollTop) + 1 < pageHeight * 2
        ) {
          console.log("현재 2페이지, up", scrollTop, pageHeight * 2);
          setScrollIndex(1);
          outerDivRef.current!.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth",
          });
        } else {
          console.log("현재 3페이지, up");
          setScrollIndex(2);
          outerDivRef.current!.scrollTo({
            top: pageHeight,
            left: 0,
            behavior: "smooth",
          });
        }
      }
    };

    const outerDivRefCurrent = outerDivRef.current;
    if (outerDivRefCurrent) {
      outerDivRefCurrent.addEventListener("wheel", wheelHandler);
    }

    return () => {
      if (outerDivRefCurrent) {
        outerDivRefCurrent.removeEventListener("wheel", wheelHandler);
      }
    };
  }, []);

  return (
    <>
      <div className="aboutBody">
        <div ref={outerDivRef} className="outer">
          <Dots scrollIndex={scrollIndex} />
          <div className="inner bg-yellow">1</div>
          <div className="inner bg-blue">2</div>
          <div className="inner bg-pink">3</div>
        </div>
      </div>
    </>
  );
}

export default AboutUs;
