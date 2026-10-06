// @ts-nocheck

import { Float2, math } from "gameApi";
import Laser from "Scripts/Laser/LaserClass.js";
import laserManager from "Scripts/Laser/LaserManager.js";
import { LaserWrapper } from "Scripts/Laser/Utils.js";
import mathEx from "Scripts/Utility/mathEx.js";















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

  if (bake) {
    selfPos = self.getTransform()[0];
    for (const offset of endPosOffsets)
    lasers.push({
      vector: mathEx.transFloat3WithQuat(
        math.normalizeFloat3(offset),
        self.getRotationQuaternion()
      ),
      maxDistance: math.lengthFloat3(offset),
      laser: new Laser(new Float2(0, 0), material, thickness)
    });
  } else
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


export const registerEvents = [
"OnStartLevel",
"OnPlayerDeadEnd"];


const lasers = [];

let selfPos;
export const onEvents = () => {
  if (bake) {
    for (const { vector, maxDistance, laser } of lasers) {
      laser.unfreeze();
      laser.clearRays();
      laser.updateRays(selfPos, vector, maxDistance);
      laser.freeze();
    }
  }
};