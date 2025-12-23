import { player, math, levelManager } from "gameApi";
import mathEx from "Scripts/Utility/mathEx.js";
import Laser from "Scripts/Laser/LaserClass.js";
export const init = (self, v) => {
    Object.assign(globalThis, v);
    const arrToObj = (arr, keys) => {
        const obj = {};
        for (let i = 0; i < keys.length; i++)
            obj[keys[i]] = arr[i];
        return obj;
    };
    globalThis["damageTable"] = arrToObj(damageTable, [
        "WoodenBall",
        "StoneBall",
        "PaperBall",
        "IceBall",
        "SteelBall",
        "RubberBall",
        "BalloonBall",
        "StickyBall",
        "SpongeBall",
        "Default",
    ]);
    if (stopUpdateDistance < 0)
        globalThis["stopUpdateDistance"] = Infinity;
    if (halfSample) {
        uiAlphaFactor = 0.5;
        uiAnimeSpeed = 2;
        force[0] *= 2;
        force[1] *= 2;
        for (const k in damageTable)
            damageTable[k] *= 2;
        globalThis["heatFactor"] *= 2;
        globalThis["chargeFactor"] *= 2;
        globalThis["dryFactor"] *= 2;
    }
    for (const offset of endPosOffsets)
        lasers.push({
            vector: math.normalizeFloat3(offset),
            maxDistance: math.lengthFloat3(offset),
            laser: new Laser(material, self.getComponent("Settings").getData("Tags"), !bake, !bake),
        });
};
export const registerEvents = ["OnStartLevel", "OnPlayerDeadEnd", "OnPhysicsUpdate"];
let uiAlphaFactor = 1;
let uiAnimeSpeed = 1;
let sample = Math.random() > 0.5;
const lasers = [];
export const onEvents = (self, { OnPhysicsUpdate, OnPlayerDeadEnd, OnStartLevel }) => {
    if (bake) {
        if (OnStartLevel || OnPlayerDeadEnd) {
            const selfPos = self.getTransform()[0];
            const selfRot = self.getRotationQuaternion();
            for (const { vector, maxDistance, laser } of lasers) {
                laser.unfreeze();
                laser.clearRays();
                laser.updateRays(selfPos, mathEx.transFloat3WithQuat(vector, selfRot), maxDistance, thickness);
                laser.freeze();
            }
        }
    }
    else {
        if (OnStartLevel || OnPlayerDeadEnd)
            lasers.forEach(({ laser }) => laser.clearRays());
        if (OnPhysicsUpdate) {
            if (levelManager.timerEnabled &&
                math.distanceFloat3(player.position, self.getTransform()[0]) > stopUpdateDistance) {
                for (const { laser } of lasers)
                    if (!laser.frozen)
                        laser.freeze();
            }
            else {
                for (const { laser } of lasers)
                    if (laser.frozen)
                        laser.unfreeze();
            }
            if (halfSample && (sample = !sample))
                return;
            const selfPos = self.getTransform()[0];
            const selfRot = self.getRotationQuaternion();
            for (const { vector, maxDistance, laser } of lasers) {
                laser.updateRays(selfPos, mathEx.transFloat3WithQuat(vector, selfRot), asRepeater ? (Laser.isCasted(self) ? maxDistance : 0) : maxDistance, thickness);
                laser.applyForce(...force);
                if (!player.ballType)
                    return;
                laser.updatePlayerStates(damageTable[player.ballType] ?? damageTable.Default, heatFactor > 0
                    ? heatFactor * ((600 - player.temperature) / 300)
                    : heatFactor * ((player.temperature + 120) / 80), chargeFactor, player.temperature > -20 ? dryFactor : 0, uiAlphaFactor, uiAnimeSpeed);
            }
        }
    }
};
