import { useEffect } from "react";
import { useGLTF } from "@react-three/drei";

export default function UniversityModel({ onReady }) {
  const { scene } = useGLTF("/models/Uni_plan.glb");

  useEffect(() => {
    onReady?.();
  }, [onReady]);

  return <primitive object={scene} />;
}

useGLTF.preload("/models/Uni_plan.glb");
