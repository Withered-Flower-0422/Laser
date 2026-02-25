// @ts-nocheck
import { player } from "gameApi";
let initialMass;
let handlePhysicsObject;
export const onTrigger = (self, triggeredItem, type) => {
  if (triggeredItem.guid === player.guid) {
    if (type === "Stay") {
      if (player.physicsObject.getMass() > 1) {
        if (handlePhysicsObject.getMass() !== initialMass) handlePhysicsObject.setMass(initialMass);
      } else {
        if (handlePhysicsObject.getMass() !== 100) handlePhysicsObject.setMass(100);
      }
    } else {
      handlePhysicsObject.setMass(initialMass);
    }
  }
};
export const registerEvents = ["OnLoadLevel", "OnTimerActive"];
export const onEvents = (self, _ref) => {
  let {
    OnLoadLevel,
    OnTimerActive
  } = _ref;
  if (OnLoadLevel) {
    handlePhysicsObject = self.getComponent("PhysicsObject");
    initialMass = handlePhysicsObject.getMass();
  }
  if (OnTimerActive) {
    handlePhysicsObject.setMass(initialMass);
  }
};