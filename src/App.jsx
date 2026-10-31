import { lazy, Suspense, useCallback, useEffect, useRef, useState } from "react";
import { BUILDING_IDS } from "./data/campus.js";
import mascot from "./assets/ga3fr-greet-hero.png";
import desktopMascot from "./assets/ga3fr-hero-desktop.png";
import singingMascot from "./assets/ga3fr-singing.png";
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
  const [sceneReady, setSceneReady] = useState(false);
  const landingTimer = useRef(null);
  const markSceneReady = useCallback(() => setSceneReady(true), []);

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
          <Suspense fallback={null}>
            <UniversityScene
              phase={phase}
              mode={mode}
              selectedId={selection}
              onArrived={() => setPhase("explore")}
              onSelect={selectOnMap}
              onReady={markSceneReady}
            />
          </Suspense>
        )}

        {sceneMounted && !sceneReady && (
          <div className="scene-loading" role="status">
            <div className="scene-loading__art">
              <img src={singingMascot} alt="" aria-hidden="true" />
            </div>
            <p className="scene-loading__label" lang="en">
              loading
              <span className="scene-loading__dots" aria-hidden="true">
                <span className="scene-loading__dot" />
                <span className="scene-loading__dot" />
                <span className="scene-loading__dot" />
              </span>
            </p>
          </div>
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
          className={`fixed inset-0 z-30 flex flex-col items-center overflow-y-auto bg-linear-to-b from-white to-paper px-5 pt-5 pb-[max(20px,env(safe-area-inset-bottom))] font-body text-ink transition-[opacity,visibility] duration-[470ms] desktop:px-12 desktop:py-12 ${
            landingLeaving ? "pointer-events-none invisible opacity-0" : ""
          }`}
          aria-hidden={landingLeaving}
          inert={landingLeaving}
        >
          <section
            className="grid w-full max-w-[680px] flex-1 grid-rows-[1fr_auto] text-center desktop:max-w-[1360px] desktop:grid-cols-2 desktop:grid-rows-[auto_auto] desktop:content-center desktop:items-center desktop:gap-x-16"
            aria-labelledby="landing-title"
          >
            <div className="flex flex-col items-center justify-center desktop:contents">
              {/* The source art has transparent padding around the mascot. */}
              <picture className="relative block aspect-[440/345] w-[clamp(210px,58vw,260px)] shrink-0 overflow-hidden desktop:col-start-2 desktop:row-span-2 desktop:aspect-[820/514] desktop:w-[110%] desktop:justify-self-end">
                <source media="(min-width: 900px)" srcSet={desktopMascot} />
                <img
                  className="pointer-events-none h-full w-full scale-[2.2] select-none object-contain desktop:scale-100 desktop:object-cover"
                  src={mascot}
                  alt=""
                  aria-hidden="true"
                />
              </picture>

              <div className="mt-4 desktop:col-start-1 desktop:row-start-1 desktop:mt-0">
                <h1
                  id="landing-title"
                  className="mb-2 font-display text-[clamp(2.4rem,10vw,3rem)] font-bold leading-[1.15] text-balance text-brand desktop:mb-4 desktop:text-[clamp(4rem,5.5vw,5.5rem)]"
                >
                  إلى أين نذهب؟
                </h1>
                <p className="mx-auto max-w-[30ch] text-base font-medium leading-relaxed text-balance text-charcoal desktop:text-2xl">
                  اختر مبنى وسأخذك إليه
                </p>
              </div>
            </div>

            <div className="mt-3 grid w-full max-w-[440px] justify-self-center gap-3 desktop:col-start-1 desktop:row-start-2 desktop:mt-10 desktop:max-w-[520px]">
              <div className="relative">
                <select
                  className="min-h-14 w-full cursor-pointer appearance-none rounded-xl border-2 border-mist bg-white py-3 pr-11 pl-4 text-right font-body text-[17px] font-bold text-ink transition-colors hover:border-muted focus-visible:ring-2 focus-visible:ring-muted focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
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
                <svg
                  aria-hidden="true"
                  viewBox="0 0 20 20"
                  fill="none"
                  className="pointer-events-none absolute top-1/2 right-4 h-5 w-5 -translate-y-1/2 text-muted"
                >
                  <path
                    d="m5 7.5 5 5 5-5"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>

              <button
                type="button"
                className="min-h-14 w-full cursor-pointer rounded-xl bg-brand py-3 font-body text-[17px] font-bold text-white shadow-[0_4px_0_#162661] transition enabled:hover:bg-ink enabled:hover:shadow-[0_4px_0_#6380aa] enabled:active:translate-y-0.5 enabled:active:shadow-[0_2px_0_#6380aa] focus-visible:ring-2 focus-visible:ring-muted focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-mist disabled:text-muted disabled:shadow-none"
                onClick={startTour}
                disabled={!selection || landingLeaving}
              >
                لننطلق
              </button>
            </div>
          </section>
        </div>
      )}
    </main>
  );
}

export default App;
