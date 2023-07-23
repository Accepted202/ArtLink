// import React, { useEffect, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { Physics } from "@react-three/cannon";
import { Stars, Sky } from "@react-three/drei";
import Styles from "./ThreeMain.module.css"

// Controls
// import PhysicsLookControls from "../Threejs/Controls/PhysicsLookControls";
// import { PointerLockControls } from '@react-three/drei'
import LookControls from "../Threejs/Controls/LookControls";
import LightControls from "../Threejs/Controls/LightControls";
import { handleDoubleClick } from "../Threejs/Funtions/Fullscreen";
import { Player } from "../Threejs/Controls/Player";

// OBJ
// import Player from "../Threejs/Controls/Player";
// import AniObj1 from "../Threejs/OBJ/AniObj1";
import Fall from "../Threejs/OBJ/Fall";
import Planee from "../Threejs/OBJ/Plane";
import Vehicle from "../Threejs/OBJ/Vehicle";

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
        <Sky sunPosition={[100, 100, 20]}/>
        <gridHelper />

        {/* 빛 입니다. */}
        <LightControls />

        <Physics>
          {/* <PointerLockControls /> */}
          {/* <PhysicsLookControls /> */}
          <LookControls />
          {/* 플레이어 */}
          <Player />

          <Fall />
          <Vehicle position={undefined} />
          <Planee />
        </Physics>
      </Canvas>
      {/* 조준점 */}
      <div className={`${Styles.centered} ${Styles.cursor} ${"absolute"}`}>+</div>

    </div>
  );
}

export default ThreeTest;
