// @ts-nocheck

import {
  Float2,
  Float3,
  math,
  player,
  scene,
  uiCanvas } from


"gameApi";
import { Laser } from "Scripts/Laser/LaserClass.js";
import Manager from "Scripts/UtilClass/Manager.js";
import { mathEx } from "Scripts/Utility/mathEx.js";



export class BaseLaserManager extends Manager {
  enable() {
    throw new Error("LaserManager cannot be disabled or enabled.");
  }

  disable() {
    throw new Error("LaserManager cannot be disabled or enabled.");
  }

  get tipText()


  {
    throw new Error("LaserManager has no tips.");
  }


  init() {
    this.keys = {};
  }
}

export class LaserWrapper {
  config;













  static =


  null;

  laser;
  updateCount;

  constructor(
  bindItem,
  endPosOffset,
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
  isStatic)
  {
    this.config = {
      bindItem,
      vector: math.normalizeFloat3(endPosOffset),
      maxDistance: math.lengthFloat3(endPosOffset),
      damageTable,
      heatFactor,
      chargeFactor,
      dryFactor,
      stopUpdateDistance,
      updateFrequency,
      asRepeater,
      tags: bindItem.getComponent("Settings").getData("Tags")
    };
    this.laser = new Laser(force, material, thickness);
    this.updateCount = rndInt(0, updateFrequency);
    if (isStatic) {
      const pos = bindItem.getTransform()[0];
      const rot = bindItem.getRotationQuaternion();

      this.static = {
        trans: [pos, rot],
        vector: mathEx.transFloat3WithQuat(this.config.vector, rot)
      };
    }
  }
}

export class BakedLaserWrapper {
  bindItemPos;
  vector;
  maxDistance;
  laser;

  constructor(
  bindItem,
  endPosOffset,
  material,
  thickness)
  {
    this.bindItemPos = bindItem.getTransform()[0];
    this.vector = mathEx.transFloat3WithQuat(
      math.normalizeFloat3(endPosOffset),
      bindItem.getRotationQuaternion()
    );
    this.maxDistance = math.lengthFloat3(endPosOffset);
    this.laser = new Laser(null, material, thickness);
  }
}




const tagCache =


{};

const setTagCache = (item) => {
  if (item.guid in tagCache) return;
  const tag = item.getComponent("Settings").getData("Tags");
  tagCache[item.guid] = {
    ignoreLaser: tag.includes("IgnoreLaser"),
    reflectLaser: tag.includes("ReflectLaser"),
    affectedByLaserForce: tag.includes("AffectedByLaserForce")
  };
};

export const isIgnoreLaser = (item) => {
  if (item.guid === player.guid) return player.ballType === "IceBall";
  setTagCache(item);
  return tagCache[item.guid].ignoreLaser;
};

export const isReflectLaser = (item) => {
  if (item.guid === player.guid) return player.ballType === "SteelBall";
  setTagCache(item);
  return tagCache[item.guid].reflectLaser;
};

export const isAffectedByLaserForce = (item) => {
  if (item.guid === player.guid) return true;
  setTagCache(item);
  return tagCache[item.guid].affectedByLaserForce;
};





export const createScreenUI = (type) => {
  const screenUI = uiCanvas.createUI("Panel");
  screenUI.alpha = 0;
  screenUI.sizeDelta = new Float2(0, 0);
  screenUI.anchorMin = new Float2(0, 0);
  screenUI.anchorMax = new Float2(1, 1);

  const screenUIImage = uiCanvas.createUI("Image");
  screenUIImage.parent = screenUI;
  screenUIImage.texture = `Textures/Screen/Screen_${
  { Hurt: "Red", Heal: "Green" }[type]}.tex`;

  screenUIImage.sizeDelta = new Float2(0, 0);
  screenUIImage.anchorMin = new Float2(0, 0);
  screenUIImage.anchorMax = new Float2(1, 1);

  return screenUI;
};





export const calEndPos = (startPos, vector, distance) =>
mathEx.addFloat3(
  startPos,
  mathEx.scaleFloat3(math.normalizeFloat3(vector), distance)
);

export const calRayTransform = (
startPos,
endPos,
thickness) =>

[
startPos,
math.quaternionToFloat3(
  mathEx.getQuatFromAxes(
    unitZFloat3,
    mathEx.subFloat3(endPos, startPos)
  )
),
new Float3(thickness, thickness, math.distanceFloat3(startPos, endPos))];


export const isSamePos = function (a, b) {let threshold = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1e-3;return (
    math.distanceFloat3(a, b) < threshold);};

export const laserCast = (startPos, endPos) =>
scene.
raycastAll(startPos, endPos).
sort((_ref, _ref2) => {let { fraction: f1 } = _ref;let { fraction: f2 } = _ref2;return f1 - f2;}).
find((r) => !isSamePos(r.position, startPos) && !isIgnoreLaser(r.item));





export const unitZFloat3 = new Float3(0, 0, 1);
export const zeroFloat3 = new Float3(0, 0, 0);
export const rndInt = (min, max) =>
Math.floor(Math.random() * (max - min)) + min;