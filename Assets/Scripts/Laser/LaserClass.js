// @ts-nocheck

import { Float3, math } from "gameApi";

import Ray from "Scripts/Laser/RayClass.js";
import {
  calEndPos,
  isAffectedByLaserForce,
  isReflectLaser,
  laserCast } from
"Scripts/Laser/Utils.js";
import mathEx from "Scripts/Utility/mathEx.js";

export class Laser {
  _frozen = false;
  get frozen() {
    return this._frozen;
  }

  rays = [];







  constructor(
  force,
  material,
  thickness)
  {this.force = force;this.material = material;this.thickness = thickness;}










  updateRays(startPos, vector, maxDis) {
    if (this._frozen) return;

    const raysData = [];

    if (maxDis > 0) {
      let maxEndPos = calEndPos(startPos, vector, maxDis);
      let res = laserCast(startPos, maxEndPos);
      let pushLastRay = true;

      while (res) {
        const { item: castItem, position: endPos, normal } = res;
        raysData.push({
          startPos,
          endPos,
          castItem
        });

        if (!isReflectLaser(castItem)) {
          pushLastRay = false;
          break;
        }

        maxDis -= math.distanceFloat3(startPos, endPos);
        startPos = endPos;
        vector = math.reflectFloat3(vector, normal);
        maxEndPos = calEndPos(startPos, vector, maxDis);
        res = laserCast(startPos, maxEndPos);
      }

      if (pushLastRay)
      raysData.push({
        startPos,
        endPos: maxEndPos,
        castItem: null
      });
    }

    for (let i = raysData.length; i < this.rays.length; i++) {
      const ray = this.rays[i];
      if (ray.enabled) ray.disable();else


      break;
    }

    let i = 0;
    for (; i < this.rays.length; i++) {
      const ray = this.rays[i];
      const rayData = raysData[i];
      if (!rayData) return;

      const { startPos, endPos, castItem } = rayData;
      if (ray.hasSameStartAndEndPos(startPos, endPos))
      ray.updateCastItem(castItem);else
      break;
    }
    for (let j = i; j < raysData.length; j++) {
      const ray = this.rays[j];
      const { startPos, endPos, castItem } = raysData[j];

      if (ray) ray.enable(startPos, endPos, castItem, this.thickness);else

      this.rays[j] = new Ray(
        startPos,
        endPos,
        castItem,
        this.thickness,
        this.material
      );
    }
  }


  applyForce() {
    if (this._frozen) return;

    for (let i = 0; i < this.rays.length; i++) {
      const { enabled, startPos, endPos, castItem } = this.rays[i];
      if (!enabled || !castItem) break;
      if (!isAffectedByLaserForce(castItem)) continue;

      const physicsObject = castItem.getComponent("PhysicsObject");
      if (physicsObject?.getData("PhysicsBodyType") !== 2) continue;

      const { linear, angular } = mathEx.getVelocityByForceAtPoint(
        castItem.getTransform()[0],
        castItem.getRotationQuaternion(),
        endPos,
        math.normalizeFloat3(mathEx.subFloat3(endPos, startPos)),
        physicsObject.getLinearVelocity(),
        physicsObject.getAngularVelocity(),
        physicsObject.getMass(),
        this.force.x,
        this.force.y
      );
      physicsObject.setVelocity(linear, angular);
    }
  }






  isCasted(item) {
    return !this.frozen && this.rays.some((ray) => ray.isCasted(item));
  }






  countCasted(item) {
    return this.frozen ?
    0 :
    this.rays.filter((ray) => ray.isCasted(item)).length;
  }


  clearRays() {
    for (const r of this.rays) r.destroy();
    this.rays.length = 0;
  }


  freeze() {
    this._frozen = true;
  }


  unfreeze() {
    this._frozen = false;
  }
}

export default Laser;