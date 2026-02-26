// @ts-nocheck
import {
  player,
  scene,
  uiCanvas,
  variables,
  math,
  Float2,
  Float3 } from
"gameApi";
import mathEx from "Scripts/Utility/mathEx.js";


const LASER_INSTANCES = "LaserInstances";

const unitZFloat3 = new Float3(0, 0, 1);
const zeroFloat3 = new Float3(0, 0, 0);

const calEndPos = (startPos, vector, distance) =>
mathEx.addFloat3(
  startPos,
  mathEx.scaleFloat3(math.normalizeFloat3(vector), distance)
);

const calRayTransform = (startPos, endPos, thickness) =>
[
startPos,
math.quaternionToFloat3(
  mathEx.getQuatFromAxes(
    unitZFloat3,
    mathEx.subFloat3(endPos, startPos)
  )
),
new Float3(thickness, thickness, math.distanceFloat3(startPos, endPos))];


const isSamePos = function (a, b) {let threshold = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1e-3;return (
    math.distanceFloat3(a, b) < threshold);};

const laserCast = (startPos, endPos) =>
scene.
raycastAll(startPos, endPos).
sort((_ref, _ref2) => {let { fraction: f1 } = _ref;let { fraction: f2 } = _ref2;return f1 - f2;}).
find((r) => !isSamePos(r.position, startPos) && !isIgnoreLaser(r.item));

const ignoreLaserCache = {};
const isIgnoreLaser = (item) =>
item.guid === player.guid ?
player.ballType === "IceBall" :
ignoreLaserCache[item.guid] ??= item.
getComponent("Settings").
getData("Tags").
includes("IgnoreLaser");

const reflectLaserCache = {};
const isReflectLaser = (item) =>
item.guid === player.guid ?
player.ballType === "SteelBall" :
reflectLaserCache[item.guid] ??= item.
getComponent("Settings").
getData("Tags").
includes("ReflectLaser");

const affectedByLaserForceCache = {};
const isAffectedByLaserForce = (item) =>
item.guid === player.guid ?
true :
affectedByLaserForceCache[item.guid] ??= item.
getComponent("Settings").
getData("Tags").
includes("AffectedByLaserForce");

export const createHurtUI = () => {
  const hurtUI = uiCanvas.createUI("Panel");
  hurtUI.alpha = 0;
  hurtUI.sizeDelta = new Float2(0, 0);
  hurtUI.anchorMin = new Float2(0, 0);
  hurtUI.anchorMax = new Float2(1, 1);

  const hurtUIImage = uiCanvas.createUI("Image");
  hurtUIImage.parent = hurtUI;
  hurtUIImage.texture = "Textures/Screen/Screen_Red.tex";
  hurtUIImage.sizeDelta = new Float2(0, 0);
  hurtUIImage.anchorMin = new Float2(0, 0);
  hurtUIImage.anchorMax = new Float2(1, 1);

  return hurtUI;
};








export class Ray {

  get startPos() {
    return this._startPos;
  }


  get endPos() {
    return this._endPos;
  }


  get castItem() {
    return this._castItem;
  }

  _enabled = true;
  get enabled() {
    return this._enabled;
  }

  _destroyed = false;
  get destroyed() {
    return this._destroyed;
  }











  constructor(
  startPos,
  endPos,
  castItem,
  thickness,
  material)
  {
    this._startPos = startPos;
    this._endPos = endPos;
    this._castItem = castItem;

    this.rayItem = scene.createItem(
      "LaserRay",
      ...calRayTransform(startPos, endPos, thickness)
    );
    this.rayItem.
    getComponent("Renderer").
    setData({ Materials: [material] });
  }






  isCasted(item) {
    return (
      this._enabled &&
      !this._destroyed &&
      this._castItem?.guid === item.guid);

  }









  hasSameStartAndEndPos(startPos, endPos) {let threshold = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1e-3;
    if (!this._enabled || this._destroyed) return false;

    return (
      isSamePos(this.startPos, startPos, threshold) &&
      isSamePos(this.endPos, endPos, threshold));

  }






  updateCastItem(castItem) {
    this._castItem = castItem;
  }









  enable(
  startPos,
  endPos,
  castItem,
  thickness)
  {
    this._enabled = true;

    this._startPos = startPos;
    this._endPos = endPos;
    this._castItem = castItem;

    if (scene.getItem(this.rayItem.guid))
    this.rayItem.setTransform(
      ...calRayTransform(startPos, endPos, thickness)
    );
  }





  disable() {
    this._enabled = false;

    if (scene.getItem(this.rayItem.guid)) this.rayItem.setScale(zeroFloat3);
  }





  destroy() {
    this._destroyed = true;
    scene.destroyItem(this.rayItem.guid);
  }
}

export class Laser {




  static {
    const instances = variables.get(LASER_INSTANCES);
    if (instances) this.instances = instances;else
    variables.set(LASER_INSTANCES, this.instances = []);
  }







  static isCasted(item) {for (var _len = arguments.length, excludeLasers = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {excludeLasers[_key - 1] = arguments[_key];}
    return this.instances.some(
      (l) => !excludeLasers.includes(l) && l.isCasted(item)
    );
  }







  static countCasted(item) {for (var _len2 = arguments.length, excludeLasers = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {excludeLasers[_key2 - 1] = arguments[_key2];}
    return this.instances.reduce(
      (acc, l) =>
      acc + (excludeLasers.includes(l) ? 0 : l.countCasted(item)),
      0
    );
  }






  static getCastedLasers(item) {
    return this.instances.filter((l) => l.isCasted(item));
  }





  static instanceNum() {
    return this.instances.length;
  }



  _frozen = false;
  get frozen() {
    return this._frozen;
  }

  rays = [];









  constructor(
  material)



  {let tags = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];let enableUI = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;let pushToInstances = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;this.material = material;this.tags = tags;
    if (enableUI) this.hurtUI = createHurtUI();
    if (pushToInstances) Laser.instances.push(this);
  }












  updateRays(
  startPos,
  vector,
  maxDis,
  thickness)
  {
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

      if (ray) ray.enable(startPos, endPos, castItem, thickness);else

      this.rays[j] = new Ray(
        startPos,
        endPos,
        castItem,
        thickness,
        this.material
      );
    }
  }







  applyForce(linearKp, angularKp) {
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
        linearKp,
        angularKp
      );
      physicsObject.setVelocity(linear, angular);
    }
  }













  updatePlayerStates(
  damage,
  heat,
  charge,
  dry)


  {let uiAlphaFactor = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 1;let uiAnimeSpeed = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 1;
    const castCnt = this.countCasted(player);

    if (castCnt > 0) {
      player.durability -= damage * castCnt;
      player.temperature += heat * castCnt;
      player.power += charge * castCnt;
      player.wetness -= dry * castCnt;
    }

    if (!this.hurtUI) return;

    const speed = 0.005 * uiAnimeSpeed;
    if (castCnt > 0 && damage > 0) {
      const maxAlpha =
      0.1 * Math.min(damage * 4 * castCnt * uiAlphaFactor, 1);
      const diff = maxAlpha - this.hurtUI.alpha;
      if (diff > 0) this.hurtUI.alpha += Math.min(diff, speed);else
      this.hurtUI.alpha -= Math.min(-diff, speed);
    } else {
      if (this.hurtUI.alpha > 0) this.hurtUI.alpha -= speed;
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