import Laser from "Scripts/Laser/LaserClass.js";
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
export const registerEvents = ["OnStartLevel", "OnPlayerDeadEnd", "OnPhysicsUpdate"];
export const onEvents = (self, { OnPlayerDeadEnd, OnStartLevel, OnPhysicsUpdate }) => {
    if (OnStartLevel || OnPlayerDeadEnd) {
        active = true;
        renderer.setData({ Materials: originalMat });
    }
    if (active && OnPhysicsUpdate) {
        if (Laser.getCastedLasers(self).some(l => l.canDestroyItem)) {
            active = false;
            audioPlayer.play();
            renderer.setData({ Materials: [] });
            physicsObject.destroyPhysicsObject();
            levelManager.spawnVfx("DestroyObject", self.getTransform()[0]);
        }
    }
};
