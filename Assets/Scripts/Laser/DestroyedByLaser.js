// @ts-nocheck
import laserManager from "Scripts/Laser/LaserManager.js";






import { levelManager } from "gameApi";

let active = true;

let renderer;
let audioPlayer;
let physicsObject;

let originalMat;

export const init = (self, v) => {
  renderer = self.getComponent("Renderer");
  audioPlayer = self.getComponent("AudioPlayer");
  physicsObject = self.getComponent("PhysicsObject");

  originalMat = renderer.getData("Materials");
};


export const registerEvents = [
"OnStartLevel",
"OnPlayerDeadEnd",
"OnPhysicsUpdate"];


export const onEvents = (
self, _ref) =>

{let { OnPlayerDeadEnd, OnStartLevel, OnPhysicsUpdate } = _ref;
  if (OnStartLevel || OnPlayerDeadEnd) {
    active = true;
    renderer.setData({ Materials: originalMat });
  }

  if (active && OnPhysicsUpdate) {
    if (
    laserManager.
    getCastedLasers(self, true).
    some((l) => l.config.tags.includes("CanDestroyItem")))
    {
      active = false;

      audioPlayer.play();
      renderer.setData({ Materials: [] });
      physicsObject.destroyPhysicsObject();
      levelManager.spawnVfx("DestroyObject", self.getTransform()[0]);
    }
  }
};