import { scene, math, Float3 } from "gameApi";
import mathEx from "Scripts/Utility/mathEx.js";
export const init = (self, v) => Object.assign(globalThis, v);
let angle = 0;
let laser;
let initialRotQuat;
let start = false;
export const registerEvents = [
    "OnLoadLevel",
    "OnStartLevel",
    "OnTimerActive",
    "OnPhysicsUpdate",
    "OnPlayerDeadEnd",
];
export const onEvents = (self, { OnLoadLevel, OnTimerActive, OnPhysicsUpdate, OnPlayerDeadEnd, OnStartLevel }) => {
    if (OnLoadLevel) {
        laser = scene.getItem(laserItem);
        initialRotQuat = laser.getRotationQuaternion();
    }
    if (OnStartLevel || OnPlayerDeadEnd) {
        start = false;
        laser.setRotationQuaternion(initialRotQuat);
    }
    if (OnTimerActive) {
        angle = 0;
        start = true;
    }
    if (OnPhysicsUpdate && start) {
        laser.setRotationQuaternion(mathEx.mulQuaternion(initialRotQuat, math.float3ToQuaternion(new Float3(0, (angle = (angle + rotateSpeed) % 360), 0))));
    }
};
