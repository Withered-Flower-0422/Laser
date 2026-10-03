// @ts-nocheck
function ownKeys(e, r) {var t = Object.keys(e);if (Object.getOwnPropertySymbols) {var o = Object.getOwnPropertySymbols(e);r && (o = o.filter(function (r) {return Object.getOwnPropertyDescriptor(e, r).enumerable;})), t.push.apply(t, o);}return t;}function _objectSpread(e) {for (var r = 1; r < arguments.length; r++) {var t = null != arguments[r] ? arguments[r] : {};r % 2 ? ownKeys(Object(t), !0).forEach(function (r) {_defineProperty(e, r, t[r]);}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) {Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));});}return e;}function _defineProperty(e, r, t) {return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e;}function _toPropertyKey(t) {var i = _toPrimitive(t, "string");return "symbol" == typeof i ? i : i + "";}function _toPrimitive(t, r) {if ("object" != typeof t || !t) return t;var e = t[Symbol.toPrimitive];if (void 0 !== e) {var i = e.call(t, r || "default");if ("object" != typeof i) return i;throw new TypeError("@@toPrimitive must return a primitive value.");}return ("string" === r ? String : Number)(t);}import { levelManager, settings } from "gameApi";























export default class Manager





{


  #eventSymbol = Symbol();

  canceledEvents = new Set(

  );

  sendEvent(
  name,
  data)
  {
    levelManager.sendCustomEvent(_defineProperty(_defineProperty({},
    this.#eventSymbol, true),
    name, data)
    );
  }

  sendEvents(events) {
    levelManager.sendCustomEvent(_objectSpread(_defineProperty({},
    this.#eventSymbol, true),
    events)
    );
  }






  isSelfEvent(e) {
    return e?.[this.#eventSymbol] === true;
  }





  cancelEvent(event) {
    this.canceledEvents.add(event);
  }













  showTip(tipKey, duration) {
    levelManager.hideTipDelay(
      levelManager.showTip(this.tipText[tipKey][settings.language]),
      duration
    );
  }



  #keys = null;


  get keys() {
    if (!this.#keys)
    throw new ReferenceError("Custom keys are not initialized");

    return this.#keys;
  }

  set keys(value) {
    this.#keys = value;
  }







  #enabled = true;

  get enabled() {
    return this.#enabled;
  }

  set enabled(value) {
    if (this.#enabled === value) return;

    if (value) {
      this.enable();
    } else {
      this.disable();
      Object.values(this.keys).forEach(
        (key) => key.ui.ui.enabled = false
      );
    }

    this.#enabled = value;
  }

















  update(e) {
    if (!this.#enabled) return;

    this.onEvents(e);

    const keys = Object.values(this.keys);
    if (e.OnStartLevel) keys.forEach((key) => key.updateConflictKey());
    if (e.OnPhysicsUpdate) keys.forEach((key) => key.update());

    this.canceledEvents.clear();
  }
}