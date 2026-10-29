import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { BUILDING_IDS } from "./data/campus.js";
import mascot from "./assets/daleel-mascot.png";
import "./App.css";

const importScene = () => import("./scene/UniversityScene.jsx");
const UniversityScene = lazy(importScene);

const LANDING_EXIT_MS = 470;
const SCENE_PREFETCH_MS = 1500;

function App() {
  const [phase, setPhase] = useState("landing");
  const [mode, setMode] = useState("arrival");
  const [selection, setSelection] = useState("");
  const [landingMounted, setLandingMounted] = useState(true);
  const [sceneMounted, setSceneMounted] = useState(false);
  const landingTimer = useRef(null);

  useEffect(() => () => clearTimeout(landingTimer.current), []);

  useEffect(() => {
    // Let the landing paint and accept input before fetching the 3D bundle.
    const timer = setTimeout(importScene, SCENE_PREFETCH_MS);
    return () => clearTimeout(timer);
  }, []);

  function startTour() {
    if (!selection) return;

    setSceneMounted(true);
    setMode("arrival");
    setPhase("intro");
    clearTimeout(landingTimer.current);
    landingTimer.current = setTimeout(
      () => setLandingMounted(false),
      LANDING_EXIT_MS,
    );
  }

  function changeBuilding() {
    clearTimeout(landingTimer.current);
    setMode("arrival");
    setPhase("landing");
    setLandingMounted(true);
  }

  function selectOnMap(buildingId) {
    if (phase !== "explore" || buildingId === selection) return;

    setSelection(buildingId);
    setMode("switch");
    setPhase("intro");
  }

  const landingLeaving = phase !== "landing";

  return (
    <main className="app">
      <div className="map-container">
        {sceneMounted && (
          <Suspense
            fallback={
              <div className="scene-loading" role="status">
                جارٍ تحميل الخريطة…
              </div>
            }
          >
            <UniversityScene
              phase={phase}
              mode={mode}
              selectedId={selection}
              onArrived={() => setPhase("explore")}
              onSelect={selectOnMap}
            />
          </Suspense>
        )}
      </div>

      {phase === "explore" && selection && (
        <header className="map-header">
          <div className="brand">
            <span className="brand__name">دليل</span>
          </div>

          <div className="map-header__actions">
            <span className="current-building">مبنى {selection}</span>
            <button
              type="button"
              className="change-button"
              onClick={changeBuilding}
            >
              تغيير المبنى
            </button>
          </div>
        </header>
      )}

      {landingMounted && (
        <div
          className={`landing${landingLeaving ? " landing--leaving" : ""}`}
          aria-hidden={landingLeaving}
          inert={landingLeaving}
        >
          <section className="landing__card" aria-labelledby="landing-title">
            <img
              className="landing__mascot"
              src={mascot}
              alt=""
              aria-hidden="true"
              width="334"
              height="388"
            />

            <h1 id="landing-title" className="landing__title">
              إلى أين تذهب؟
            </h1>
            <p className="landing__subtitle">
              اختر مبنى وسنأخذك إليه من البوابة.
            </p>

            <select
              className="building-select"
              value={selection}
              onChange={(event) => setSelection(event.target.value)}
              aria-label="اختر المبنى"
              disabled={landingLeaving}
            >
              <option value="" disabled>
                اختر المبنى
              </option>
              {BUILDING_IDS.map((id) => (
                <option key={id} value={id}>
                  {id}
                </option>
              ))}
            </select>

            <button
              type="button"
              className="start-button"
              onClick={startTour}
              disabled={!selection || landingLeaving}
            >
              انطلق
            </button>
          </section>
        </div>
      )}
    </main>
  );
}

export default App;
