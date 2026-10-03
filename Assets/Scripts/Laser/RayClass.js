// @ts-nocheck

import { scene } from "gameApi";
import { calRayTransform, isSamePos, zeroFloat3 } from "Scripts/Laser/Utils.js";








export default class Ray {
  _startPos;
  get startPos() {
    return this._startPos;
  }

  _endPos;
  get endPos() {
    return this._endPos;
  }

  _castItem;
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

  rayItem;









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