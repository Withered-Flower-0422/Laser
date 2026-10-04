// @ts-nocheck

import { levelManager, math, player } from "gameApi";

import {
  createScreenUI,
  LaserManagerBase } from

"Scripts/Laser/Utils.js";
import "Scripts/UtilClass/Manager.js";
import { mathEx } from "Scripts/Utility/mathEx.js";
import utils from "Scripts/Utility/utils.js";

class LaserManager extends LaserManagerBase {
  lasers = [];
  hurtUI = createScreenUI("Hurt");
  healUI = createScreenUI("Heal");






  isCastedByLaser(item) {
    return this.lasers.some((_ref) => {let { laser } = _ref;return laser.isCasted(item);});
  }






  countCastedByLaser(item) {
    return this.lasers.reduce(
      (acc, _ref2) => {let { laser } = _ref2;return acc + laser.countCasted(item);},
      0
    );
  }









  getCastedLasers(item) {let raw = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    const lasers = this.lasers.filter((_ref3) => {let { laser } = _ref3;return laser.isCasted(item);});
    return raw ? lasers : lasers.map((_ref4) => {let { laser } = _ref4;return laser;});
  }

  updateScreenUI(
  ui,
  showCond,
  maxAlpha,
  speed)
  {
    if (showCond) {
      const diff = maxAlpha - ui.alpha;
      if (diff > 0) ui.alpha += Math.min(diff, speed);else
      ui.alpha -= Math.min(-diff, speed);
    } else {
      if (ui.alpha > 0) ui.alpha -= speed;
    }
  }


  updatePlayerStates() {
    let damage = 0;
    let heat = 0;
    let charge = 0;
    let dry = 0;

    for (const {
      laser,
      config: { damageTable, heatFactor, chargeFactor, dryFactor }
    } of this.lasers) {
      if (!laser.isCasted(player)) continue;

      const count = laser.countCasted(player);
      damage +=
      (damageTable[player.ballType] ?? damageTable.Default) * count;
      heat += heatFactor * count;
      charge += chargeFactor * count;
      dry += dryFactor * count;
    }

    if (player.temperature < -20) dry = 0;
    if (heat > 0) heat *= (600 - player.temperature) / 300;else
    heat *= (player.temperature + 120) / 80;

    player.durability -= damage;
    player.wetness -= dry;
    player.power += charge;
    player.temperature += heat;

    const maxAlpha = 0.1 * Math.min(Math.abs(damage) * 4, 1);
    const speed = 0.005;

    this.updateScreenUI(this.hurtUI, damage > 0, maxAlpha, speed);
    this.updateScreenUI(this.healUI, damage < 0, maxAlpha, speed);
  }

  onEvents(_ref5)



  {let { OnStartLevel, OnPlayerDeadEnd, OnPhysicsUpdate } = _ref5;
    if (OnStartLevel || OnPlayerDeadEnd)
    for (const { laser } of this.lasers) laser.clearRays();

    if (OnPhysicsUpdate) {
      for (const l of this.lasers) {
        const { laser, config, static: st } = l;

        const pos = st?.trans[0] ?? config.bindItem.getTransform()[0];

        if (
        levelManager.timerEnabled &&
        math.distanceFloat3(player.position, pos) >
        config.stopUpdateDistance)
        {
          laser.freeze();
          continue;
        } else laser.unfreeze();

        l.updateCount = (l.updateCount + 1) % l.config.updateFrequency;
        if (l.updateCount !== 0) continue;

        laser.updateRays(
          pos,
          st?.vector ??
          mathEx.transFloat3WithQuat(
            config.vector,
            config.bindItem.getRotationQuaternion()
          ),
          config.asRepeater ?
          this.isCastedByLaser(config.bindItem) ?
          config.maxDistance :
          0 :
          config.maxDistance
        );

        laser.applyForce();
      }

      if (!player.ballType) return;
      this.updatePlayerStates();
    }
  }
}

export const laserManager = utils.createSingleton(LaserManager);

export default laserManager;