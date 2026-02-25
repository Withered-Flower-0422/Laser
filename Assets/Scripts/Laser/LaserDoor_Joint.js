// @ts-nocheck
import { scene } from "gameApi";
import Laser from "Scripts/Laser/LaserClass.js";
let unlockSound;
let renderer;
let joint;
let preMat;
let resetOnDeath;
let doorItems;
let active = true;
const setMat = mat => renderer.setData({
  Materials: [mat]
});
export const init = (self, v) => {
  Object.assign(globalThis, v);
  unlockSound = self.getComponent("AudioPlayer");
  renderer = scene.getItem(pic).getComponent("Renderer");
  joint = self.getComponent("Joint");
  preMat = renderer.getData("Materials")[0];
  resetOnDeath = scene.getItem(door).getComponent("Settings").getData("Tags").includes("ResetOnDeath");
  doorItems = scene.getItems(doors);
};
export const registerEvents = ["OnStartLevel", "OnTimerActive", "OnPlayerDeadEnd", "OnPhysicsUpdate"];
export const onEvents = (self, _ref) => {
  let {
    OnPlayerDeadEnd,
    OnStartLevel,
    OnTimerActive,
    OnPhysicsUpdate
  } = _ref;
  if (OnTimerActive) {
    if (resetOnDeath) {
      active = true;
    } else {
      if (!active) joint.breakJoint();
    }
  }
  if (OnPlayerDeadEnd && resetOnDeath || OnStartLevel) {
    setMat(preMat);
    active = true;
  }
  if (OnPhysicsUpdate && active) {
    if (doorItems.some(d => Laser.isCasted(d))) {
      active = false;
      setMat(nullMat);
      unlockSound.play();
      joint.breakJoint();
    }
  }
};