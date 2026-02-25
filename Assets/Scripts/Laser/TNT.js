// @ts-nocheck
import { player, scene, math, levelManager } from "gameApi";
import Laser, { createHurtUI } from "Scripts/Laser/LaserClass.js";
import mathEx from "Scripts/Utility/mathEx.js";
let originalMat;
let active = true;
let hurtUI;
let renderer;
let audioPlayer;
let physicsObject;
export const init = (self, v) => {
  Object.assign(globalThis, v);
  const arrToObj = (arr, keys) => {
    const obj = {};
    for (let i = 0; i < keys.length; i++) obj[keys[i]] = arr[i];
    return obj;
  };
  globalThis["damageTable"] = arrToObj(damageTable, ["WoodenBall", "StoneBall", "PaperBall", "IceBall", "SteelBall", "RubberBall", "BalloonBall", "StickyBall", "SpongeBall", "Default"]);
  hurtUI = createHurtUI();
  renderer = self.getComponent("Renderer");
  audioPlayer = self.getComponent("AudioPlayer");
  physicsObject = self.getComponent("PhysicsObject");
  originalMat = renderer.getData("Materials");
};
const explode = self => {
  active = false;
  audioPlayer.play();
  renderer.setData({
    Materials: []
  });
  physicsObject.destroyPhysicsObject();
  levelManager.spawnVfx("Explosion", self.getTransform()[0]);
  const selfPos = self.getTransform()[0];
  for (const items of Object.values(scene.sphereCastAll(selfPos, range))) {
    for (const item of items) {
      if (item.guid === self.guid) continue;
      const physicsObject = item.getComponent("PhysicsObject");
      if (physicsObject?.getData("PhysicsBodyType") !== 2) continue;
      const itemPos = item.getTransform()[0];
      const disFactor = Math.max(math.distanceFloat3(selfPos, itemPos) ** 0.5, 1);
      physicsObject.setLinearVelocity(mathEx.addFloat3(physicsObject.getLinearVelocity(), mathEx.scaleFloat3(math.normalizeFloat3(mathEx.subFloat3(itemPos, selfPos)), explodeForce / disFactor / physicsObject.getMass())));
      if (item.guid === player.guid) {
        hurtUI.alpha = 0.24;
        player.durability -= (damageTable[player.ballType] ?? damageTable.Default) / disFactor;
      }
    }
  }
};
export const onCollide = (self, _ref) => {
  let {
    impulse,
    itemB: {
      guid
    }
  } = _ref;
  if (active && (impulse > explodeImpulseRequire || guid === player.guid && player.temperature > explodeTempRequire)) explode(self);
};
export const registerEvents = ["OnStartLevel", "OnPlayerDeadEnd", "OnPhysicsUpdate"];
export const onEvents = (self, _ref2) => {
  let {
    OnPlayerDeadEnd,
    OnStartLevel,
    OnPhysicsUpdate
  } = _ref2;
  if (OnStartLevel || OnPlayerDeadEnd) {
    active = true;
    renderer.setData({
      Materials: originalMat
    });
  }
  if (OnPhysicsUpdate) {
    if (active && Laser.isCasted(self)) explode(self);
    if (hurtUI.alpha > 0) hurtUI.alpha -= 0.003;
  }
};