import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Line } from "@react-three/drei";
import { getRoutePoints } from "../data/campus.js";

const REVEAL_SECONDS = 0.85;

export default function RouteLine({ buildingId }) {
  const glow = useRef();
  const core = useRef();
  const startedAt = useRef(null);
  const points = getRoutePoints(buildingId);

  useFrame((state) => {
    if (startedAt.current === null) startedAt.current = state.clock.elapsedTime;

    const progress = Math.min(
      (state.clock.elapsedTime - startedAt.current) / REVEAL_SECONDS,
      1,
    );
    const reveal = 1 - (1 - progress) ** 3;
    const pulse = 0.8 + Math.sin(state.clock.elapsedTime * 2.6) * 0.2;

    if (core.current) core.current.material.opacity = reveal;
    if (glow.current) {
      glow.current.material.opacity = reveal * (0.24 + pulse * 0.14);
    }
  });

  return (
    <group>
      <Line
        ref={glow}
        points={points}
        color="#134daa"
        lineWidth={20}
        transparent
        opacity={0}
        depthWrite={false}
        toneMapped={false}
        renderOrder={2}
      />
      <Line
        ref={core}
        points={points}
        color="#c4d7f2"
        lineWidth={6}
        transparent
        opacity={0}
        depthWrite={false}
        toneMapped={false}
        renderOrder={3}
      />
    </group>
  );
}
