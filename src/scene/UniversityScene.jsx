import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { GATE_VIEW } from "../data/campus.js";
import UniversityModel from "./UniversityModel.jsx";
import CameraRig from "./CameraRig.jsx";
import RouteLine from "./RouteLine.jsx";
import BuildingLabels from "./BuildingLabels.jsx";

export default function UniversityScene({
  phase,
  mode,
  selectedId,
  onArrived,
  onSelect,
}) {
  const exploring = phase === "explore";

  return (
    <div className="university-scene">
      <Canvas
        dpr={[1, 1.25]}
        frameloop={phase === "landing" ? "demand" : "always"}
        camera={{
          position: GATE_VIEW.position,
          fov: 42,
          near: 1,
          far: 900,
        }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
          stencil: false,
        }}
      >
        <ambientLight intensity={0.55} />
        <hemisphereLight args={["#c4d7f2", "#162661", 0.65]} />
        <directionalLight
          position={[-70, 130, 50]}
          color="#c4d7f2"
          intensity={1.25}
        />

        <Suspense fallback={null}>
          <UniversityModel />
        </Suspense>

        {exploring && selectedId && (
          <>
            <RouteLine key={selectedId} buildingId={selectedId} />
            <BuildingLabels selectedId={selectedId} onSelect={onSelect} />
          </>
        )}

        <OrbitControls
          makeDefault
          enabled={exploring}
          enablePan={false}
          enableDamping
          dampingFactor={0.08}
          rotateSpeed={0.65}
          minDistance={18}
          maxDistance={300}
          minPolarAngle={0.1}
          maxPolarAngle={1.38}
        />

        <CameraRig
          phase={phase}
          mode={mode}
          selectedId={selectedId}
          onArrived={onArrived}
        />
      </Canvas>
    </div>
  );
}
