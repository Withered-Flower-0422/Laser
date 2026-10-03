// @ts-nocheck

import { math } from "gameApi";
import Laser from "Scripts/Laser/LaserClass.js";
import laserManager from "Scripts/Laser/LaserManager.js";
import { LaserWrapper } from "Scripts/Laser/Utils.js";
import mathEx from "Scripts/Utility/mathEx.js";















export const init = (self, v) => {
  Object.assign(globalThis, v);
  const arrToObj = (
  arr,
  keys) =>
  {
    const obj = {};
    for (let i = 0; i < keys.length; i++) obj[keys[i]] = arr[i];
    return obj;
  };
  globalThis["damageTable"] = arrToObj(
    damageTable,
    [
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

  if (stopUpdateDistance < 0)
  globalThis["stopUpdateDistance"] = Infinity;

  if (halfSample) {
    force[0] *= 2;
    force[1] *= 2;
    for (const k in damageTable) damageTable[k] *= 2;
    globalThis["heatFactor"] *= 2;
    globalThis["chargeFactor"] *= 2;
    globalThis["dryFactor"] *= 2;
  }

  for (const offset of endPosOffsets)
  if (!bake)
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
      halfSample,
      asRepeater,
      isStatic
    )
  );else

  lasers.push({
    vector: math.normalizeFloat3(offset),
    maxDistance: math.lengthFloat3(offset),
    laser: new Laser([0, 0], material, thickness)
  });
};


export const registerEvents = [
"OnStartLevel",
"OnPlayerDeadEnd"];


const lasers = [];

export const onEvents = (self) => {
  if (bake) {
    for (const { vector, maxDistance, laser } of lasers) {
      laser.unfreeze();
      laser.clearRays();
      laser.updateRays(
        self.getTransform()[0],
        mathEx.transFloat3WithQuat(
          vector,
          self.getRotationQuaternion()
        ),
        maxDistance
      );
      laser.freeze();
    }
  }
};