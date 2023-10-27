import { Environment } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useMotionValue, useSpring } from "framer-motion";
import React, { useEffect } from "react";
import Model from './Model'

const Index = () => {
  const mouse = {
    x: useMotionValue(0),
    y: useMotionValue(0),
  };

  const smoothMouse = {
    x: useSpring(mouse.x, { stiffness: 75, damping: 100, mass: 3 }),
    y: useSpring(mouse.y, { stiffness: 75, damping: 100, mass: 3 }),
  };

  const manageMouse = (e) => {
    const { innerHeight, innerWidth } = window;
    const { clientX, clientY } = e;
    const x = clientX / innerWidth;
    const y = clientY / innerHeight;

    mouse.x.set(x);
    mouse.y.set(y);
  };

  useEffect(() => {
    window.addEventListener("mousemove", manageMouse);
    return () => window.removeEventListener("mousemove", manageMouse);
  }, []);

  return (
    <Canvas
      style={{
        background: "#e0e0e2",
      }}
      orthographic
      camera={{ position: [0, 0, 200], zoom: 10 }}
    >
      <Model mouse={smoothMouse} />
      <Environment preset="studio" />
    </Canvas>
  );
};

export default Index;
