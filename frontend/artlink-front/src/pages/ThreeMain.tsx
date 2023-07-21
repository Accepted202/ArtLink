// import React, { useEffect, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { Physics } from "@react-three/cannon";
import { Stars } from "@react-three/drei";

import LookControls from "../Threejs/Controls/LookControls";
import LightControls from "../Threejs/Controls/LightControls";
import { handleDoubleClick } from "../Threejs/Funtions/Fullscreen";

import Fall from "../Threejs/OBJ/Fall";
import Planee from "../Threejs/OBJ/Plane";
import Vehicle from "../Threejs/OBJ/Vehicle";
// import AniObj1 from "../Threejs/OBJ/AniObj1";

// 컴포넌트 구성
function ThreeTest() {
  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <Canvas
        style={{ height: "100%" }}
        shadows
        camera={{ position: [10, 10, 20], fov: 40 }}
        onDoubleClick={(event) => handleDoubleClick(event)}
      >
        {/* 이펙트 입니다. */}
        <Stars />
        <gridHelper />

        {/* 빛 입니다. */}
        <LightControls />

        {/* 객체 입니다. */}
        <Physics>
          <LookControls />
          <Fall />
          <Vehicle position={undefined} />
          {/* <AnimatedObject /> */}
          {/* <AniObj1 /> */}
          <Planee />
        </Physics>
      </Canvas>
    </div>
  );
}

export default ThreeTest;
