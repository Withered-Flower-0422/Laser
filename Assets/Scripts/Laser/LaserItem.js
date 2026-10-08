// @ts-nocheck

import { Float2 } from "gameApi";
import laserManager from "Scripts/Laser/LaserManager.js";
import { BakedLaserWrapper, LaserWrapper } from "Scripts/Laser/Utils.js";















const arrToObj = (arr, keys) => {
  const obj = {};
  for (let i = 0; i < keys.length; i++) obj[keys[i]] = arr[i];
  return obj;
};

const normalize = () => {
  damageTable = arrToObj(damageTable, [
  "WoodenBall",
  "StoneBall",
  "PaperBall",
  "IceBall",
  "SteelBall",
  "RubberBall",
  "BalloonBall",
  "StickyBall",
  "SpongeBall",
  "Default"]
  );

  if (stopUpdateDistance < 0) stopUpdateDistance = Infinity;
  if (updateFrequency < 1) updateFrequency = 1;

  force.x *= updateFrequency;
  force.y *= updateFrequency;
};

export const init = (self, v) => {
  Object.assign(globalThis, v);
  normalize();

  if (bake)
  for (const offset of endPosOffsets)
  laserManager.bakedLasers.push(
    new BakedLaserWrapper(self, offset, material, thickness)
  );else

  for (const offset of endPosOffsets)
  laserManager.lasers.push(
    new LaserWrapper(
      self,
      offset,
      force,
      damageTable,
      heatFactor,
      chargeFactor,
      dryFactor,
      material,
      thickness,
      stopUpdateDistance,
      updateFrequency,
      asRepeater,
      isStatic
    )
  );
};