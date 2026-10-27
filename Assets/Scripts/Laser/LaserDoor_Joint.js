// @ts-nocheck







import { scene } from "gameApi";
import laserManager from "Scripts/Laser/LaserManager.js";





let unlockSound;
let renderer;
let joint;
let preMat;
let resetOnDeath;
let doorItems;

let active = true;

export const init = (self, v) => Object.assign(globalThis, v);


export const registerEvents = [
"OnLoadLevel",
"OnStartLevel",
"OnTimerActive",
"OnPlayerDeadEnd",
"OnPhysicsUpdate"];


export const onEvents = (
self, _ref) =>







{let { OnLoadLevel, OnPlayerDeadEnd, OnStartLevel, OnTimerActive, OnPhysicsUpdate } = _ref;
  if (OnLoadLevel) {
    unlockSound = self.getComponent("AudioPlayer");
    renderer = scene.getItem(pic).getComponent("Renderer");
    joint = self.getComponent("Joint");
    preMat = renderer.getData("Materials")[0];
    resetOnDeath = scene.
    getItem(door).
    getComponent("Settings").
    getData("Tags").
    includes("ResetOnDeath");
    doorItems = scene.getItems(doors);
  }

  if (OnTimerActive) {
    if (resetOnDeath) {
      active = true;
    } else {
      if (!active) joint.breakJoint();
    }
  }

  if (OnPlayerDeadEnd && resetOnDeath || OnStartLevel) {
    renderer.setData({ Materials: [preMat] });
    active = true;
  }

  if (OnPhysicsUpdate && active) {
    if (doorItems.some((d) => laserManager.isCastedByLaser(d))) {
      active = false;
      renderer.setData({ Materials: [] });
      unlockSound.play();
      joint.breakJoint();
    }
  }
};