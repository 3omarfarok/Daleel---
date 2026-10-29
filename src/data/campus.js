export const BUILDING_IDS = ["A", "B", "C", "D", "F", "G"];

export const GATE_ENTRY = [-8.14, -164];
export const ROUTE_Y = 0.45;

export const GATE_VIEW = {
  position: [-8.14, 95, -285],
  target: [-8.14, 2, -130],
};

// Routes use the centre lines of the Path mesh, with connectors from the gate
// and from the nearest path to the building entrance.
// shortcut: buildings with several entrances use the first one until labs are
// assigned to the closest entrance.
export const BUILDINGS = {
  A: {
    anchor: [-66, 16, -147.4],
    entrance: [-17.4052, 2, -146.953],
    route: [
      [-8.14, -164],
      [-8.14, -126.5],
      [-17.4052, -126.5],
      [-17.4052, -146.953],
    ],
    view: {
      position: [55, 90, -240],
      target: [-45, 4, -145],
    },
  },
  B: {
    anchor: [-42.46, 16, -85.58],
    entrance: [-62.5, 2, -114.518],
    route: [
      [-8.14, -164],
      [-8.14, -126.5],
      [-62.5, -126.5],
      [-62.5, -114.518],
    ],
    view: {
      position: [10, 75, -190],
      target: [-45, 4, -95],
    },
  },
  C: {
    anchor: [69.74, 16, 16.5],
    entrance: [49.5001, 2, 16.2327],
    route: [
      [-8.14, -164],
      [-8.14, -126.5],
      [-4.73, -126.5],
      [-4.73, -34.76],
      [3.85, -34.76],
      [3.85, 10.12],
      [28.05, 10.12],
      [28.05, 16.2327],
      [49.5001, 16.2327],
    ],
    view: {
      position: [0, 62, -38],
      target: [49.5001, 4, 16.2327],
    },
  },
  D: {
    anchor: [111.1, 12.5, 5.5],
    entrance: [111.183, 2, -15.4166],
    route: [
      [-8.14, -164],
      [-8.14, -126.5],
      [-4.73, -126.5],
      [-4.73, -34.76],
      [3.85, -34.76],
      [3.85, -25.3],
      [111.183, -25.3],
      [111.183, -15.4166],
    ],
    view: {
      position: [55, 65, -70],
      target: [111.183, 4, -15.4166],
    },
  },
  F: {
    anchor: [-82.28, 12.5, 41.8],
    entrance: [-84.8388, 2, -22.0252],
    route: [
      [-8.14, -164],
      [-8.14, -126.5],
      [-4.73, -126.5],
      [-4.73, -34.76],
      [-84.8388, -34.76],
      [-84.8388, -22.0252],
    ],
    view: {
      position: [-145, 75, -85],
      target: [-82, 4, 0],
    },
  },
  G: {
    anchor: [79.2, 9, 85.8],
    entrance: [31.2183, 2, 52.0924],
    route: [
      [-8.14, -164],
      [-8.14, -126.5],
      [-4.73, -126.5],
      [-4.73, -34.76],
      [3.85, -34.76],
      [3.85, 10.12],
      [28.05, 10.12],
      [28.05, 52.0924],
      [31.2183, 52.0924],
    ],
    view: {
      position: [-15, 75, 5],
      target: [45, 4, 65],
    },
  },
};

export function getRoutePoints(id) {
  const route = BUILDINGS[id]?.route;

  return route ? route.map(([x, z]) => [x, ROUTE_Y, z]) : [];
}

export function getArrivalCameraPath(id, scale = 1) {
  const { view } = BUILDINGS[id];
  const end = view.position.map(
    (value, axis) => view.target[axis] + (value - view.target[axis]) * scale,
  );

  // Straight flight; an offset midpoint made the camera dip and loop on B/C/D.
  return {
    start: GATE_VIEW.position,
    mid: GATE_VIEW.position.map((value, axis) => (value + end[axis]) / 2),
    end,
  };
}

export function getCameraScale(width, height) {
  if (!width || !height) return 1;

  const aspect = width / height;
  return aspect < 1 ? Math.min(1.85, 1 / aspect) : 1;
}
