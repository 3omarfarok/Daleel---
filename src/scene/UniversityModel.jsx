import { useGLTF } from "@react-three/drei";

export default function UniversityModel() {
  const { scene } = useGLTF("/models/Uni_plan.glb");

  return <primitive object={scene} />;
}

useGLTF.preload("/models/Uni_plan.glb");
