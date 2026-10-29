import test from "node:test";
import assert from "node:assert/strict";
import {
  BUILDING_IDS,
  BUILDINGS,
  GATE_ENTRY,
  ROUTE_Y,
  getArrivalCameraPath,
  getCameraScale,
  getRoutePoints,
} from "./campus.js";

test("offers exactly the six buildings, with no E", () => {
  assert.deepEqual(BUILDING_IDS, ["A", "B", "C", "D", "F", "G"]);
  assert.equal(BUILDINGS.E, undefined);
});

test("every building has a route that starts just inside Gate 1", () => {
  for (const id of BUILDING_IDS) {
    const points = getRoutePoints(id);

    assert.ok(points.length >= 3, `${id} needs a real route`);
    assert.deepEqual(points[0], [GATE_ENTRY[0], ROUTE_Y, GATE_ENTRY[1]]);
  }
});

test("routes are made of straight, campus-sized walking segments", () => {
  for (const id of BUILDING_IDS) {
    const route = BUILDINGS[id].route;

    for (let i = 1; i < route.length; i++) {
      const [x1, z1] = route[i - 1];
      const [x2, z2] = route[i];
      const movedX = Math.abs(x2 - x1) > 0.01;
      const movedZ = Math.abs(z2 - z1) > 0.01;

      assert.ok(movedX || movedZ, `${id} has a zero-length segment`);
      assert.ok(!(movedX && movedZ), `${id} cuts a diagonal corner`);

      for (const [x, z] of [route[i - 1], route[i]]) {
        assert.ok(x >= -132 && x <= 132, `${id} leaves the campus on X`);
        assert.ok(z >= -172 && z <= 172, `${id} leaves the campus on Z`);
      }
    }
  }
});

test("every route ends at its building's first entrance", () => {
  for (const id of BUILDING_IDS) {
    const route = BUILDINGS[id].route;
    const entrance = BUILDINGS[id].entrance;
    const [endX, endZ] = route.at(-1);

    assert.equal(entrance.length, 3, `${id} needs an entrance anchor`);
    assert.ok(
      Math.abs(endX - entrance[0]) < 0.001 &&
        Math.abs(endZ - entrance[2]) < 0.001,
      `${id} route must stop at its first entrance`,
    );
  }
});

test("every building has a usable camera view", () => {
  for (const id of BUILDING_IDS) {
    const { position, target } = BUILDINGS[id].view;
    const entrance = BUILDINGS[id].entrance;
    const focusGap = Math.hypot(
      target[0] - entrance[0],
      target[2] - entrance[2],
    );

    assert.equal(position.length, 3);
    assert.equal(target.length, 3);
    assert.ok(position[1] > 30, `${id} camera must stay above the roofs`);
    assert.ok(target[1] >= 0, `${id} camera target must be on the campus`);
    assert.ok(focusGap <= 35, `${id} camera must frame its entrance`);
  }
});

test("arrival camera flies straight in from the gate", () => {
  for (const id of BUILDING_IDS) {
    for (const scale of [1, getCameraScale(390, 844)]) {
      const { start, mid, end } = getArrivalCameraPath(id, scale);

      for (let axis = 0; axis < 3; axis++) {
        const halfway = (start[axis] + end[axis]) / 2;

        assert.ok(
          Math.abs(mid[axis] - halfway) < 0.000001,
          `${id} arrival must not dip or loop on axis ${axis}`,
        );
      }
    }
  }
});

test("portrait screens pull the camera back", () => {
  assert.equal(getCameraScale(1600, 900), 1);

  const tablet = getCameraScale(768, 1024);
  const phone = getCameraScale(390, 844);

  assert.ok(tablet > 1.2 && tablet < phone, "tablet framing should widen");
  assert.ok(phone >= 1.8 && phone <= 1.85, "phone framing should widen more");
});
