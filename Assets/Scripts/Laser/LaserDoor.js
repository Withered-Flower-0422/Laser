import { scene } from "gameApi";
import Laser from "Scripts/Laser/LaserClass.js";
export const init = (self, v) => Object.assign(globalThis, v);
const unlock = () => {
    unlocked = true;
    audioPlayer.play();
    renderer.setData({ Materials: [mats[1]] });
    physicsObject.setData({ CollisionLayer: 5 });
};
const lock = () => {
    unlocked = false;
    audioPlayer.play();
    renderer.setData({ Materials: [mats[0]] });
    physicsObject.setData({ CollisionLayer: 2 });
};
let unlocked = false;
let unlockTimer = 0;
let unlockLastTime = 0;
let renderer;
let audioPlayer;
let physicsObject;
export const registerEvents = ["OnLoadLevel", "OnPhysicsUpdate"];
export const onEvents = (self, { OnLoadLevel, OnPhysicsUpdate }) => {
    if (OnLoadLevel) {
        unlockLastTime =
            typeof door === "undefined" ? 100 : +scene.getItem(door).getComponent("Settings").getData("Tags")[0];
        renderer = self.getComponent("Renderer");
        audioPlayer = self.getComponent("AudioPlayer");
        physicsObject = self.getComponent("PhysicsObject");
    }
    if (OnPhysicsUpdate) {
        if (Laser.isCasted(self))
            unlockTimer = unlockLastTime;
        if (unlockTimer > 0) {
            unlockTimer--;
            if (!unlocked)
                unlock();
        }
        else {
            if (unlocked)
                lock();
        }
    }
};
