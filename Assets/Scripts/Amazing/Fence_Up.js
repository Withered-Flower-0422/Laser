// @ts-nocheck
import { scene, player } from "gameApi";




let handleItem;
let handlePhysicsObject;
let initialMass;

export const init = (self, v) => Object.assign(globalThis, v);

export const onTrigger = (
self,
triggeredItem,
type) =>
{
  if (triggeredItem.guid === player.guid) {
    if (type === "Enter") {
      handlePhysicsObject.setMass(100);
    } else {
      handlePhysicsObject.setMass(initialMass);
    }
  }
};


export const registerEvents = ["OnLoadLevel"];

export const onEvents = (
self, _ref) =>

{let { OnLoadLevel } = _ref;
  if (OnLoadLevel) {
    handleItem = scene.getItem(handle);
    handlePhysicsObject = handleItem.getComponent("PhysicsObject");
    initialMass = handlePhysicsObject.getMass();
  }
};