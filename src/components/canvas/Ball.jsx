import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";  //importing Canvas from react-three-fiber
import {
  Decal,
  Float,
  OrbitControls,
  Preload,
  useTexture,
} from "@react-three/drei";       //importing Decal, Float, OrbitControls, Preload, useTexture from react-three-drei

import CanvasLoader from "../Loader";   //importing CanvasLoader from Loader

const Ball = (props) => {   //creating a Ball component
  const [decal] = useTexture([props.imgUrl]);   //using useTexture to load the image of the ball

  return (
    <Float speed={1.75} rotationIntensity={2} floatIntensity={4}>   //using Float to make the ball float
      <ambientLight intensity={2} />
      <directionalLight position={[0, 0, 0.15]} />
      <mesh castShadow receiveShadow scale={2.75}>
        <icosahedronGeometry args={[1, 1]} />
        <meshStandardMaterial
          color='#fff8eb'
          polygonOffset
          polygonOffsetFactor={-5}
          flatShading
        />
        <Decal
          position={[0, 0, 1]}
          rotation={[2 * Math.PI, 0, 6.25]}
          scale={1}
          map={decal}
          flatShading
        />
      </mesh>
    </Float>
  );
};

const BallCanvas = ({ icon }) => {
  return (
    <Canvas
      frameloop='always'
      dpr={[1, 2]}
      gl={{ preserveDrawingBuffer: true }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls enableZoom={false} />
        <Ball imgUrl={icon} />
      </Suspense>

      <Preload all />
    </Canvas>
  );
};

export default BallCanvas;
