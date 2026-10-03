// @ts-nocheck
function _regenerator() {var e,t,r = "function" == typeof Symbol ? Symbol : {},n = r.iterator || "@@iterator",o = r.toStringTag || "@@toStringTag";function i(r, n, o, i) {var c = n && n.prototype instanceof Generator ? n : Generator,u = Object.create(c.prototype);return _regeneratorDefine(u, "_invoke", function (r, n, o) {var i,c,u,f = 0,p = o || [],y = !1,G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function (t, r) {return i = t, c = 0, u = e, G.n = r, a;} };function d(r, n) {for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) {var o,i = p[t],d = G.p,l = i[2];r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0));}if (o || r > 1) return a;throw y = !0, n;}return function (o, p, l) {if (f > 1) throw TypeError("Generator is already running");for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) {i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u);try {if (f = 2, i) {if (c || (o = "next"), t = i[o]) {if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object");if (!t.done) return t;u = t.value, c < 2 && (c = 0);} else 1 === c && (t = i.return) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1);i = e;} else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break;} catch (t) {i = e, c = 1, u = t;} finally {f = 1;}}return { value: t, done: y };};}(r, o, i), !0), u;}var a = {};function Generator() {}function GeneratorFunction() {}function GeneratorFunctionPrototype() {}t = Object.getPrototypeOf;var c = [][n] ? t(t([][n]())) : (_regeneratorDefine(t = {}, n, function () {return this;}), t),u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c);function f(e) {return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e;}return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine(u), _regeneratorDefine(u, o, "Generator"), _regeneratorDefine(u, n, function () {return this;}), _regeneratorDefine(u, "toString", function () {return "[object Generator]";}), (_regenerator = function () {return { w: i, m: f };})();}function _regeneratorDefine(e, r, n, t) {var i = Object.defineProperty;try {i({}, "", {});} catch (e) {i = 0;}_regeneratorDefine = function (e, r, n, t) {function o(r, n) {_regeneratorDefine(e, r, function (e) {return this._invoke(r, n, e);});}r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2));}, _regeneratorDefine(e, r, n, t);}var _marked = _regenerator().m(

































  range);import { player as p, console, variables, levelManager, inputManager, Float3, Quaternion } from "gameApi";import mathEx from "Scripts/Utility/mathEx.js";export function range(start, end, step) {var i;return _regenerator().w(function (_context) {while (1) switch (_context.n) {case 0:
        if (end === void 0) {
          end = start;
          start = 0;
        }

        step ??= start < end ? 1 : -1;

        i = start;case 1:if (!(i < end)) {_context.n = 3;break;}_context.n = 2;return i;case 2:i += step;_context.n = 1;break;case 3:return _context.a(2);}}, _marked);}


export const keyboard = {
  isPlayerKeyDown(key) {
    return inputManager.keyboard.checkKeyDown(
      inputManager.getPlayerKey(key)
    );
  },
  isPlayerKeyHold(key) {
    return inputManager.keyboard.checkKeyHold(
      inputManager.getPlayerKey(key)
    );
  },
  isPlayerKeyUp(key) {
    return inputManager.keyboard.checkKeyUp(inputManager.getPlayerKey(key));
  }
};

export const capitalize = (str) =>
str.charAt(0).toUpperCase() + str.slice(1);

export const allKeyboardKeys = [
"Space",
"Enter",
"Tab",
"Backquote",
"Quote",
"Semicolon",
"Comma",
"Period",
"Slash",
"Backslash",
"LeftBracket",
"RightBracket",
"Minus",
"Equals",
"A",
"B",
"C",
"D",
"E",
"F",
"G",
"H",
"I",
"J",
"K",
"L",
"M",
"N",
"O",
"P",
"Q",
"R",
"S",
"T",
"U",
"V",
"W",
"X",
"Y",
"Z",
"Digit1",
"Digit2",
"Digit3",
"Digit4",
"Digit5",
"Digit6",
"Digit7",
"Digit8",
"Digit9",
"Digit0",
"LeftShift",
"RightShift",
"LeftAlt",
"RightAlt",
"AltGr",
"LeftCtrl",
"RightCtrl",
"LeftMeta",
"RightMeta",
"LeftWindows",
"RightWindows",
"LeftApple",
"RightApple",
"LeftCommand",
"RightCommand",
"ContextMenu",
"Escape",
"LeftArrow",
"RightArrow",
"UpArrow",
"DownArrow",
"Backspace",
"PageDown",
"PageUp",
"Home",
"End",
"Insert",
"Delete",
"CapsLock",
"NumLock",
"PrintScreen",
"ScrollLock",
"Pause",
"NumpadEnter",
"NumpadDivide",
"NumpadMultiply",
"NumpadPlus",
"NumpadMinus",
"NumpadPeriod",
"NumpadEquals",
"Numpad0",
"Numpad1",
"Numpad2",
"Numpad3",
"Numpad4",
"Numpad5",
"Numpad6",
"Numpad7",
"Numpad8",
"Numpad9",
"F1",
"F2",
"F3",
"F4",
"F5",
"F6",
"F7",
"F8",
"F9",
"F10",
"F11",
"F12",
"OEM1",
"OEM2",
"OEM3",
"OEM4",
"OEM5"];


export const checkKeyDown = (key) =>
key === "Left" || key === "Right" || key === "Middle" ?
inputManager.mouse.checkButtonDown(key) :
inputManager.keyboard.checkKeyDown(key);

export const allPlayerKeys = [
"MoveForward",
"MoveBackward",
"MoveLeft",
"MoveRight",
"ViewClockwiseRotate",
"ViewCounterclockwiseRotate",
"CameraOverlook",
"FreeLookMoveForward",
"FreeLookMoveBackward",
"FreeLookMoveLeft",
"FreeLookMoveRight",
"FreeLookLockView",
"FreeLookToggleFirstPersonView"];



export class Entity {
  get trans() {
    return isPlayer(this.entity) ?
    p.ballType ?
    [
    p.position,
    p.rotation,
    new Float3(p.scale, p.scale, p.scale)] :

    [
    new Float3(0, 1.5, 0),
    new Float3(0, 0, 0),
    new Float3(1, 1, 1)] :

    this.entity.getTransform();
  }


  get scale() {
    const { x, y, z } = this.trans[2];
    return Math.max(Math.abs(x), Math.abs(y), Math.abs(z));
  }

  constructor(entity) {this.entity = entity;}
}









export const setSwitchLikeVelocity = function (
item,
targetPos)



{let targetQuat = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : new Quaternion(0, 0, 0, 1);let linearKp = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 5;let angularKp = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 8;
  let curPos;
  let curQuat;
  let physicsObject;

  if ("ballType" in item) {
    curPos = item.position;
    curQuat = item.rotationQuaternion;
    physicsObject = item.physicsObject;
  } else {
    curPos = item.getTransform()[0];
    curQuat = item.getRotationQuaternion();
    physicsObject = item.getComponent("PhysicsObject");
  }

  physicsObject?.setVelocity(
    mathEx.scaleFloat3(mathEx.subFloat3(targetPos, curPos), linearKp),
    mathEx.getAngularVelocityToTarget(curQuat, targetQuat, angularKp)
  );
};








export function isPlayer(item) {
  return item?.guid === p.guid;
}

export const isPlayerTouchWall = (collisions) =>
collisions ?
collisions.some((_ref) => {let { contactPoint } = _ref;
  const py = p.position.y;
  const cy = contactPoint.y;

  return py > cy || cy - py < 0.25 * p.scale;
}) :
false;

export const isPlayerTouchGround = (
collisions) =>

collisions ?
collisions.some(
  (_ref2) => {let { contactPoint } = _ref2;return (
      p.position.y - contactPoint.y > 0.25 * p.scale);}
) :
false;





export const print = function () {for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {args[_key] = arguments[_key];}return (
    console.log(args.map((arg) => JSON.stringify(arg)).join(" ")));};








export const setTimeout = function (
callback)


{let timeout = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;for (var _len2 = arguments.length, args = new Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {args[_key2 - 2] = arguments[_key2];}
  let active = true;
  levelManager.invoke(() => {
    if (active) callback(...args);
  }, timeout);
  return () => {
    active = false;
  };
};








export const setInterval = function (
callback)


{let interval = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;for (var _len3 = arguments.length, args = new Array(_len3 > 2 ? _len3 - 2 : 0), _key3 = 2; _key3 < _len3; _key3++) {args[_key3 - 2] = arguments[_key3];}
  let active = true;
  const _setInterval = function (
  callback) {let
    interval = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;for (var _len4 = arguments.length,
      args = new Array(_len4 > 2 ? _len4 - 2 : 0), _key4 = 2; _key4 < _len4; _key4++) {args[_key4 - 2] = arguments[_key4];}return (

      levelManager.invoke(() => {
        if (active) {
          callback(...args);
          _setInterval(callback, interval, ...args);
        }
      }, interval));};

  _setInterval(callback, interval, ...args);
  return () => {
    active = false;
  };
};







export const createSingleton = function (


cls)

{for (var _len5 = arguments.length, args = new Array(_len5 > 1 ? _len5 - 1 : 0), _key5 = 1; _key5 < _len5; _key5++) {args[_key5 - 1] = arguments[_key5];}
  let instance = variables.get(cls.name);
  if (!instance) variables.set(cls.name, instance = new cls(...args));
  return instance;
};






export const nn = (arr) =>
arr;


export const player = new Entity(p);

export const getComponentData = (



comp,
names) =>
{
  const res = {};
  for (const name of names) res[name] = comp.getData(name);
  return res;
};

export default {
  player,
  Entity,
  keyboard,
  allKeyboardKeys,
  allPlayerKeys,
  checkKeyDown,
  capitalize,
  setSwitchLikeVelocity,
  isPlayer,
  isPlayerTouchWall,
  isPlayerTouchGround,
  print,
  range,
  setTimeout,
  setInterval,
  createSingleton,
  nn,
  getComponentData
};