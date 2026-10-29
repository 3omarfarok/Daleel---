import { useEffect, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { CatmullRomCurve3, Vector3 } from "three";
import {
  BUILDINGS,
  GATE_VIEW,
  getArrivalCameraPath,
  getCameraScale,
} from "../data/campus.js";

const ARRIVAL_SECONDS = 3.1;
const SWITCH_SECONDS = 1.9;
const ARRIVAL_DELAY = 0.45;

function easing(t) {
  return t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2;
}

export default function CameraRig({ phase, mode, selectedId, onArrived }) {
  const { camera, controls, size } = useThree();
  const animation = useRef(null);
  const onArrivedRef = useRef(onArrived);

  useEffect(() => {
    onArrivedRef.current = onArrived;
  }, [onArrived]);

  useEffect(() => {
    if (phase === "landing" || !selectedId) {
      animation.current = null;
      camera.position.set(...GATE_VIEW.position);
      camera.lookAt(...GATE_VIEW.target);

      if (controls) {
        controls.target.set(...GATE_VIEW.target);
        if (controls.enabled) controls.update();
      }

      return;
    }

    if (phase !== "intro") return;

    const { view } = BUILDINGS[selectedId];
    const scale = getCameraScale(size.width, size.height);
    const finalTarget = new Vector3(...view.target);
    const arrivalPath = getArrivalCameraPath(selectedId, scale);
    const finalPosition = new Vector3(...arrivalPath.end);

    let startPosition;
    let startTarget;
    let midPosition;

    if (mode === "arrival") {
      startPosition = new Vector3(...arrivalPath.start);
      startTarget = new Vector3(...GATE_VIEW.target);
      midPosition = new Vector3(...arrivalPath.mid);
    } else {
      startPosition = camera.position.clone();
      startTarget = controls?.target.clone() ?? finalTarget.clone();
      midPosition = new Vector3(
        (startPosition.x + finalPosition.x) / 2,
        Math.max(startPosition.y, finalPosition.y) + 28,
        (startPosition.z + finalPosition.z) / 2,
      );
    }

    const reduceMotion = window.matchMedia?.(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    animation.current = {
      path: new CatmullRomCurve3(
        [startPosition, midPosition, finalPosition],
        false,
        "centripetal",
      ),
      startTarget,
      finalTarget,
      startTime: null,
      done: false,
      delay: reduceMotion ? 0 : mode === "arrival" ? ARRIVAL_DELAY : 0,
      duration: reduceMotion
        ? 0.01
        : mode === "arrival"
          ? ARRIVAL_SECONDS
          : SWITCH_SECONDS,
    };

    camera.position.copy(startPosition);
    camera.lookAt(startTarget);

    if (controls) controls.target.copy(startTarget);
  }, [phase, mode, selectedId, camera, controls, size]);

  useFrame((state) => {
    const current = animation.current;

    if (!current) return;

    if (current.startTime === null) current.startTime = state.clock.elapsedTime;

    const elapsed =
      state.clock.elapsedTime - current.startTime - current.delay;

    if (elapsed < 0) return;

    const progress =
      current.duration <= 0.02
        ? 1
        : Math.min(elapsed / current.duration, 1);
    const eased = easing(progress);
    const target = current.startTarget
      .clone()
      .lerp(current.finalTarget, eased);

    camera.position.copy(current.path.getPoint(eased));
    camera.lookAt(target);

    if (controls) controls.target.copy(target);

    if (progress < 1 || current.done) return;

    current.done = true;
    camera.position.copy(current.path.getPoint(1));
    camera.lookAt(current.finalTarget);

    if (controls) controls.target.copy(current.finalTarget);

    animation.current = null;
    onArrivedRef.current?.();
  });

  return null;
}
