import { Html } from "@react-three/drei";
import { BUILDING_IDS, BUILDINGS } from "../data/campus.js";

export default function BuildingLabels({ selectedId, onSelect }) {
  return BUILDING_IDS.map((id) => (
    <Html
      key={id}
      position={BUILDINGS[id].anchor}
      center
      zIndexRange={[15, 0]}
      wrapperClass="building-label-anchor"
    >
      <button
        type="button"
        className={`building-label${selectedId === id ? " is-selected" : ""}`}
        onClick={() => onSelect(id)}
        aria-label={`المبنى ${id}`}
        aria-pressed={selectedId === id}
        title={`المبنى ${id}`}
      >
        {id}
      </button>
    </Html>
  ));
}
