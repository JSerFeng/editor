var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a2, b2) => {
  for (var prop in b2 || (b2 = {}))
    if (__hasOwnProp.call(b2, prop))
      __defNormalProp(a2, prop, b2[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b2)) {
      if (__propIsEnum.call(b2, prop))
        __defNormalProp(a2, prop, b2[prop]);
    }
  return a2;
};
var __spreadProps = (a2, b2) => __defProps(a2, __getOwnPropDescs(b2));
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
import * as React from "react";
import React__default, { Children, isValidElement, cloneElement, useState, useRef, useEffect, PureComponent, Component } from "react";
import { Link } from "react-router-dom";
import * as ReactDOM from "react-dom";
const EditorTypes = {
  Color: "Color",
  Upload: "Upload",
  Text: "Text",
  Number: "Number",
  Select: "Select",
  Switch: "Switch"
};
function normalizePos(pos) {
  return {
    x: (pos == null ? void 0 : pos.x) || 0,
    y: (pos == null ? void 0 : pos.y) || 0,
    w: (pos == null ? void 0 : pos.w) || 100,
    h: (pos == null ? void 0 : pos.h) || 100
  };
}
function checkIfValidRenderConfig(renderConfig) {
  if (renderConfig.renderConfig) {
    renderConfig = renderConfig.renderConfig;
  }
  return renderConfig.projectName && renderConfig.widgets && Array.isArray(renderConfig.widgets) ? renderConfig : null;
}
const sureStrToRenderConfig = (str) => {
  try {
    return JSON.parse(str);
  } catch (e2) {
    return {
      projectName: "BROKEN_PROJECT",
      widgets: [],
      pos: {
        w: 0,
        h: 0
      },
      routerMode: "history",
      histories: [],
      currHistoryIdx: -1,
      dependencies: []
    };
  }
};
class WidgetsCenter {
  constructor(initMap = new Map()) {
    __publicField(this, "widgetsMap");
    __publicField(this, "subQueue");
    __publicField(this, "preHooks");
    this.widgetsMap = initMap;
    this.subQueue = [];
    this.preHooks = new Set();
  }
  createConfigFromDescription(info) {
    return __spreadProps(__spreadValues({}, info), {
      pos: info.initPos ? __spreadProps(__spreadValues({}, info.initPos), { x: 10, y: 10 }) : { x: 10, y: 10, w: 60, h: 60 },
      routeInfo: {
        exact: true,
        path: ["/"]
      }
    });
  }
  use(widget) {
    for (const cb of this.preHooks) {
      widget = cb(widget);
    }
    const { getDescription, FC, Configuration } = widget;
    const description = getDescription();
    this.widgetsMap.set(description.name, { FC, getDescription, Configuration });
    this.notify();
  }
  remove(name) {
    if (this.widgetsMap.has(name)) {
      this.widgetsMap.delete(name);
      this.notify();
    }
  }
  unPre(cb) {
    if (this.preHooks.has(cb)) {
      this.preHooks.delete(cb);
    }
  }
  notify() {
    const all = this.getAll();
    this.subQueue.forEach((cb) => cb(all));
  }
  subscribe(cb) {
    this.subQueue.push(cb);
  }
  get(widgetConfig) {
    let name;
    if (typeof widgetConfig === "string") {
      name = widgetConfig;
    } else {
      name = widgetConfig.name;
    }
    const pkg = this.widgetsMap.get(name);
    if (!pkg)
      return null;
    return pkg;
  }
  getAll() {
    const widgets = [];
    this.widgetsMap.forEach((v2) => widgets.push(v2));
    return widgets;
  }
  pre(cb) {
    this.preHooks.add(cb);
  }
  createConfigFromName(widgetName) {
    let widget = this.widgetsMap.get(widgetName);
    if (!widget)
      return null;
    const description = widget.getDescription();
    return __spreadProps(__spreadValues({}, description), {
      pos: normalizePos(description.initPos),
      routeInfo: {
        exact: true,
        path: ["/"]
      }
    });
  }
}
const defaultDescription = {
  name: "no-name",
  showName: "\u672A\u547D\u540D",
  snapShot: "",
  version: "*",
  editorConfig: [],
  config: {},
  initPos: { w: 100, h: 100 },
  style: {},
  description: "\u65E0\u63CF\u8FF0",
  from: "presets",
  dependencies: {}
};
const createPkg = (Comp, getDescription, Configuration) => {
  const description = getDescription instanceof Function ? getDescription : () => getDescription;
  return {
    FC: Comp,
    Configuration,
    getDescription: description
  };
};
var commonjsGlobal = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
function getDefaultExportFromCjs(x2) {
  return x2 && x2.__esModule && Object.prototype.hasOwnProperty.call(x2, "default") ? x2["default"] : x2;
}
var jsxRuntime = { exports: {} };
var reactJsxRuntime_production_min = {};
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/
var getOwnPropertySymbols$1 = Object.getOwnPropertySymbols;
var hasOwnProperty$p = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;
function toObject(val) {
  if (val === null || val === void 0) {
    throw new TypeError("Object.assign cannot be called with null or undefined");
  }
  return Object(val);
}
function shouldUseNative() {
  try {
    if (!Object.assign) {
      return false;
    }
    var test1 = new String("abc");
    test1[5] = "de";
    if (Object.getOwnPropertyNames(test1)[0] === "5") {
      return false;
    }
    var test2 = {};
    for (var i2 = 0; i2 < 10; i2++) {
      test2["_" + String.fromCharCode(i2)] = i2;
    }
    var order2 = Object.getOwnPropertyNames(test2).map(function(n2) {
      return test2[n2];
    });
    if (order2.join("") !== "0123456789") {
      return false;
    }
    var test3 = {};
    "abcdefghijklmnopqrst".split("").forEach(function(letter) {
      test3[letter] = letter;
    });
    if (Object.keys(Object.assign({}, test3)).join("") !== "abcdefghijklmnopqrst") {
      return false;
    }
    return true;
  } catch (err) {
    return false;
  }
}
shouldUseNative() ? Object.assign : function(target, source) {
  var from;
  var to = toObject(target);
  var symbols;
  for (var s2 = 1; s2 < arguments.length; s2++) {
    from = Object(arguments[s2]);
    for (var key in from) {
      if (hasOwnProperty$p.call(from, key)) {
        to[key] = from[key];
      }
    }
    if (getOwnPropertySymbols$1) {
      symbols = getOwnPropertySymbols$1(from);
      for (var i2 = 0; i2 < symbols.length; i2++) {
        if (propIsEnumerable.call(from, symbols[i2])) {
          to[symbols[i2]] = from[symbols[i2]];
        }
      }
    }
  }
  return to;
};
/** @license React v17.0.2
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var f$2 = React__default, g$2 = 60103;
reactJsxRuntime_production_min.Fragment = 60107;
if (typeof Symbol === "function" && Symbol.for) {
  var h$2 = Symbol.for;
  g$2 = h$2("react.element");
  reactJsxRuntime_production_min.Fragment = h$2("react.fragment");
}
var m$1 = f$2.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, n$2 = Object.prototype.hasOwnProperty, p$2 = { key: true, ref: true, __self: true, __source: true };
function q$2(c2, a2, k2) {
  var b2, d2 = {}, e2 = null, l2 = null;
  k2 !== void 0 && (e2 = "" + k2);
  a2.key !== void 0 && (e2 = "" + a2.key);
  a2.ref !== void 0 && (l2 = a2.ref);
  for (b2 in a2)
    n$2.call(a2, b2) && !p$2.hasOwnProperty(b2) && (d2[b2] = a2[b2]);
  if (c2 && c2.defaultProps)
    for (b2 in a2 = c2.defaultProps, a2)
      d2[b2] === void 0 && (d2[b2] = a2[b2]);
  return { $$typeof: g$2, type: c2, key: e2, ref: l2, props: d2, _owner: m$1.current };
}
reactJsxRuntime_production_min.jsx = q$2;
reactJsxRuntime_production_min.jsxs = q$2;
{
  jsxRuntime.exports = reactJsxRuntime_production_min;
}
const jsx = jsxRuntime.exports.jsx;
const jsxs = jsxRuntime.exports.jsxs;
const ImageWidget = ({
  config,
  pos
}) => {
  return /* @__PURE__ */ jsx("img", {
    style: {
      width: pos.w,
      height: pos.h
    },
    alt: config.src,
    src: config.src
  });
};
var img = createPkg(ImageWidget, () => ({
  name: "image-wrapper",
  showName: "\u57FA\u7840\u56FE\u7247\u7EC4\u4EF6",
  description: "\u56FE\u7247\u7EC4\u4EF6",
  editorConfig: [{
    name: "\u56FE\u7247\u63CF\u8FF0",
    key: "alt",
    type: "Text"
  }],
  config: {
    src: "/no-img.png",
    alt: "\u65E0\u56FE\u7247",
    width: "200px",
    height: "200px"
  }
}));
var common = {
  black: "#000",
  white: "#fff"
};
var common$1 = common;
var red$1 = {
  50: "#ffebee",
  100: "#ffcdd2",
  200: "#ef9a9a",
  300: "#e57373",
  400: "#ef5350",
  500: "#f44336",
  600: "#e53935",
  700: "#d32f2f",
  800: "#c62828",
  900: "#b71c1c",
  A100: "#ff8a80",
  A200: "#ff5252",
  A400: "#ff1744",
  A700: "#d50000"
};
var red$2 = red$1;
var pink$1 = {
  50: "#fce4ec",
  100: "#f8bbd0",
  200: "#f48fb1",
  300: "#f06292",
  400: "#ec407a",
  500: "#e91e63",
  600: "#d81b60",
  700: "#c2185b",
  800: "#ad1457",
  900: "#880e4f",
  A100: "#ff80ab",
  A200: "#ff4081",
  A400: "#f50057",
  A700: "#c51162"
};
var pink$2 = pink$1;
var indigo$1 = {
  50: "#e8eaf6",
  100: "#c5cae9",
  200: "#9fa8da",
  300: "#7986cb",
  400: "#5c6bc0",
  500: "#3f51b5",
  600: "#3949ab",
  700: "#303f9f",
  800: "#283593",
  900: "#1a237e",
  A100: "#8c9eff",
  A200: "#536dfe",
  A400: "#3d5afe",
  A700: "#304ffe"
};
var indigo$2 = indigo$1;
var blue$1 = {
  50: "#e3f2fd",
  100: "#bbdefb",
  200: "#90caf9",
  300: "#64b5f6",
  400: "#42a5f5",
  500: "#2196f3",
  600: "#1e88e5",
  700: "#1976d2",
  800: "#1565c0",
  900: "#0d47a1",
  A100: "#82b1ff",
  A200: "#448aff",
  A400: "#2979ff",
  A700: "#2962ff"
};
var blue$2 = blue$1;
var green$1 = {
  50: "#e8f5e9",
  100: "#c8e6c9",
  200: "#a5d6a7",
  300: "#81c784",
  400: "#66bb6a",
  500: "#4caf50",
  600: "#43a047",
  700: "#388e3c",
  800: "#2e7d32",
  900: "#1b5e20",
  A100: "#b9f6ca",
  A200: "#69f0ae",
  A400: "#00e676",
  A700: "#00c853"
};
var green$2 = green$1;
var orange$1 = {
  50: "#fff3e0",
  100: "#ffe0b2",
  200: "#ffcc80",
  300: "#ffb74d",
  400: "#ffa726",
  500: "#ff9800",
  600: "#fb8c00",
  700: "#f57c00",
  800: "#ef6c00",
  900: "#e65100",
  A100: "#ffd180",
  A200: "#ffab40",
  A400: "#ff9100",
  A700: "#ff6d00"
};
var orange$2 = orange$1;
var grey = {
  50: "#fafafa",
  100: "#f5f5f5",
  200: "#eeeeee",
  300: "#e0e0e0",
  400: "#bdbdbd",
  500: "#9e9e9e",
  600: "#757575",
  700: "#616161",
  800: "#424242",
  900: "#212121",
  A100: "#d5d5d5",
  A200: "#aaaaaa",
  A400: "#303030",
  A700: "#616161"
};
var grey$1 = grey;
function _extends$f() {
  _extends$f = Object.assign || function(target) {
    for (var i2 = 1; i2 < arguments.length; i2++) {
      var source = arguments[i2];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends$f.apply(this, arguments);
}
function _typeof$1(obj) {
  "@babel/helpers - typeof";
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof$1 = function _typeof2(obj2) {
      return typeof obj2;
    };
  } else {
    _typeof$1 = function _typeof2(obj2) {
      return obj2 && typeof Symbol === "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
    };
  }
  return _typeof$1(obj);
}
function isPlainObject$2(item) {
  return item && _typeof$1(item) === "object" && item.constructor === Object;
}
function deepmerge(target, source) {
  var options = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {
    clone: true
  };
  var output = options.clone ? _extends$f({}, target) : target;
  if (isPlainObject$2(target) && isPlainObject$2(source)) {
    Object.keys(source).forEach(function(key) {
      if (key === "__proto__") {
        return;
      }
      if (isPlainObject$2(source[key]) && key in target) {
        output[key] = deepmerge(target[key], source[key], options);
      } else {
        output[key] = source[key];
      }
    });
  }
  return output;
}
var propTypes$1 = { exports: {} };
var ReactPropTypesSecret$3 = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";
var ReactPropTypesSecret_1$1 = ReactPropTypesSecret$3;
var ReactPropTypesSecret$2 = ReactPropTypesSecret_1$1;
function emptyFunction$1() {
}
function emptyFunctionWithReset$1() {
}
emptyFunctionWithReset$1.resetWarningCache = emptyFunction$1;
var factoryWithThrowingShims$1 = function() {
  function shim(props, propName, componentName, location, propFullName, secret) {
    if (secret === ReactPropTypesSecret$2) {
      return;
    }
    var err = new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");
    err.name = "Invariant Violation";
    throw err;
  }
  shim.isRequired = shim;
  function getShim() {
    return shim;
  }
  var ReactPropTypes = {
    array: shim,
    bool: shim,
    func: shim,
    number: shim,
    object: shim,
    string: shim,
    symbol: shim,
    any: shim,
    arrayOf: getShim,
    element: shim,
    elementType: shim,
    instanceOf: getShim,
    node: shim,
    objectOf: getShim,
    oneOf: getShim,
    oneOfType: getShim,
    shape: getShim,
    exact: getShim,
    checkPropTypes: emptyFunctionWithReset$1,
    resetWarningCache: emptyFunction$1
  };
  ReactPropTypes.PropTypes = ReactPropTypes;
  return ReactPropTypes;
};
{
  propTypes$1.exports = factoryWithThrowingShims$1();
}
var PropTypes = propTypes$1.exports;
function _defineProperty$2(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}
function formatMuiErrorMessage(code) {
  var url = "https://material-ui.com/production-error/?code=" + code;
  for (var i2 = 1; i2 < arguments.length; i2 += 1) {
    url += "&args[]=" + encodeURIComponent(arguments[i2]);
  }
  return "Minified Material-UI error #" + code + "; visit " + url + " for the full message.";
}
function clamp(value) {
  var min = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
  var max = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 1;
  return Math.min(Math.max(min, value), max);
}
function hexToRgb(color) {
  color = color.substr(1);
  var re = new RegExp(".{1,".concat(color.length >= 6 ? 2 : 1, "}"), "g");
  var colors = color.match(re);
  if (colors && colors[0].length === 1) {
    colors = colors.map(function(n2) {
      return n2 + n2;
    });
  }
  return colors ? "rgb".concat(colors.length === 4 ? "a" : "", "(").concat(colors.map(function(n2, index) {
    return index < 3 ? parseInt(n2, 16) : Math.round(parseInt(n2, 16) / 255 * 1e3) / 1e3;
  }).join(", "), ")") : "";
}
function hslToRgb(color) {
  color = decomposeColor(color);
  var _color = color, values2 = _color.values;
  var h2 = values2[0];
  var s2 = values2[1] / 100;
  var l2 = values2[2] / 100;
  var a2 = s2 * Math.min(l2, 1 - l2);
  var f2 = function f3(n2) {
    var k2 = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : (n2 + h2 / 30) % 12;
    return l2 - a2 * Math.max(Math.min(k2 - 3, 9 - k2, 1), -1);
  };
  var type = "rgb";
  var rgb = [Math.round(f2(0) * 255), Math.round(f2(8) * 255), Math.round(f2(4) * 255)];
  if (color.type === "hsla") {
    type += "a";
    rgb.push(values2[3]);
  }
  return recomposeColor({
    type,
    values: rgb
  });
}
function decomposeColor(color) {
  if (color.type) {
    return color;
  }
  if (color.charAt(0) === "#") {
    return decomposeColor(hexToRgb(color));
  }
  var marker = color.indexOf("(");
  var type = color.substring(0, marker);
  if (["rgb", "rgba", "hsl", "hsla"].indexOf(type) === -1) {
    throw new Error(formatMuiErrorMessage(3, color));
  }
  var values2 = color.substring(marker + 1, color.length - 1).split(",");
  values2 = values2.map(function(value) {
    return parseFloat(value);
  });
  return {
    type,
    values: values2
  };
}
function recomposeColor(color) {
  var type = color.type;
  var values2 = color.values;
  if (type.indexOf("rgb") !== -1) {
    values2 = values2.map(function(n2, i2) {
      return i2 < 3 ? parseInt(n2, 10) : n2;
    });
  } else if (type.indexOf("hsl") !== -1) {
    values2[1] = "".concat(values2[1], "%");
    values2[2] = "".concat(values2[2], "%");
  }
  return "".concat(type, "(").concat(values2.join(", "), ")");
}
function getContrastRatio(foreground, background) {
  var lumA = getLuminance(foreground);
  var lumB = getLuminance(background);
  return (Math.max(lumA, lumB) + 0.05) / (Math.min(lumA, lumB) + 0.05);
}
function getLuminance(color) {
  color = decomposeColor(color);
  var rgb = color.type === "hsl" ? decomposeColor(hslToRgb(color)).values : color.values;
  rgb = rgb.map(function(val) {
    val /= 255;
    return val <= 0.03928 ? val / 12.92 : Math.pow((val + 0.055) / 1.055, 2.4);
  });
  return Number((0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2]).toFixed(3));
}
function alpha(color, value) {
  color = decomposeColor(color);
  value = clamp(value);
  if (color.type === "rgb" || color.type === "hsl") {
    color.type += "a";
  }
  color.values[3] = value;
  return recomposeColor(color);
}
function darken(color, coefficient) {
  color = decomposeColor(color);
  coefficient = clamp(coefficient);
  if (color.type.indexOf("hsl") !== -1) {
    color.values[2] *= 1 - coefficient;
  } else if (color.type.indexOf("rgb") !== -1) {
    for (var i2 = 0; i2 < 3; i2 += 1) {
      color.values[i2] *= 1 - coefficient;
    }
  }
  return recomposeColor(color);
}
function lighten(color, coefficient) {
  color = decomposeColor(color);
  coefficient = clamp(coefficient);
  if (color.type.indexOf("hsl") !== -1) {
    color.values[2] += (100 - color.values[2]) * coefficient;
  } else if (color.type.indexOf("rgb") !== -1) {
    for (var i2 = 0; i2 < 3; i2 += 1) {
      color.values[i2] += (255 - color.values[i2]) * coefficient;
    }
  }
  return recomposeColor(color);
}
function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null)
    return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i2;
  for (i2 = 0; i2 < sourceKeys.length; i2++) {
    key = sourceKeys[i2];
    if (excluded.indexOf(key) >= 0)
      continue;
    target[key] = source[key];
  }
  return target;
}
function _objectWithoutProperties$2(source, excluded) {
  if (source == null)
    return {};
  var target = _objectWithoutPropertiesLoose(source, excluded);
  var key, i2;
  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
    for (i2 = 0; i2 < sourceSymbolKeys.length; i2++) {
      key = sourceSymbolKeys[i2];
      if (excluded.indexOf(key) >= 0)
        continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key))
        continue;
      target[key] = source[key];
    }
  }
  return target;
}
var keys$7 = ["xs", "sm", "md", "lg", "xl"];
function createBreakpoints(breakpoints) {
  var _breakpoints$values = breakpoints.values, values2 = _breakpoints$values === void 0 ? {
    xs: 0,
    sm: 600,
    md: 960,
    lg: 1280,
    xl: 1920
  } : _breakpoints$values, _breakpoints$unit = breakpoints.unit, unit = _breakpoints$unit === void 0 ? "px" : _breakpoints$unit, _breakpoints$step = breakpoints.step, step = _breakpoints$step === void 0 ? 5 : _breakpoints$step, other = _objectWithoutProperties$2(breakpoints, ["values", "unit", "step"]);
  function up(key) {
    var value = typeof values2[key] === "number" ? values2[key] : key;
    return "@media (min-width:".concat(value).concat(unit, ")");
  }
  function down(key) {
    var endIndex = keys$7.indexOf(key) + 1;
    var upperbound = values2[keys$7[endIndex]];
    if (endIndex === keys$7.length) {
      return up("xs");
    }
    var value = typeof upperbound === "number" && endIndex > 0 ? upperbound : key;
    return "@media (max-width:".concat(value - step / 100).concat(unit, ")");
  }
  function between(start, end) {
    var endIndex = keys$7.indexOf(end);
    if (endIndex === keys$7.length - 1) {
      return up(start);
    }
    return "@media (min-width:".concat(typeof values2[start] === "number" ? values2[start] : start).concat(unit, ") and ") + "(max-width:".concat((endIndex !== -1 && typeof values2[keys$7[endIndex + 1]] === "number" ? values2[keys$7[endIndex + 1]] : end) - step / 100).concat(unit, ")");
  }
  function only(key) {
    return between(key, key);
  }
  function width(key) {
    return values2[key];
  }
  return _extends$f({
    keys: keys$7,
    values: values2,
    up,
    down,
    between,
    only,
    width
  }, other);
}
function createMixins(breakpoints, spacing, mixins) {
  var _toolbar;
  return _extends$f({
    gutters: function gutters() {
      var styles7 = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
      console.warn(["Material-UI: theme.mixins.gutters() is deprecated.", "You can use the source of the mixin directly:", "\n      paddingLeft: theme.spacing(2),\n      paddingRight: theme.spacing(2),\n      [theme.breakpoints.up('sm')]: {\n        paddingLeft: theme.spacing(3),\n        paddingRight: theme.spacing(3),\n      },\n      "].join("\n"));
      return _extends$f({
        paddingLeft: spacing(2),
        paddingRight: spacing(2)
      }, styles7, _defineProperty$2({}, breakpoints.up("sm"), _extends$f({
        paddingLeft: spacing(3),
        paddingRight: spacing(3)
      }, styles7[breakpoints.up("sm")])));
    },
    toolbar: (_toolbar = {
      minHeight: 56
    }, _defineProperty$2(_toolbar, "".concat(breakpoints.up("xs"), " and (orientation: landscape)"), {
      minHeight: 48
    }), _defineProperty$2(_toolbar, breakpoints.up("sm"), {
      minHeight: 64
    }), _toolbar)
  }, mixins);
}
var light = {
  text: {
    primary: "rgba(0, 0, 0, 0.87)",
    secondary: "rgba(0, 0, 0, 0.54)",
    disabled: "rgba(0, 0, 0, 0.38)",
    hint: "rgba(0, 0, 0, 0.38)"
  },
  divider: "rgba(0, 0, 0, 0.12)",
  background: {
    paper: common$1.white,
    default: grey$1[50]
  },
  action: {
    active: "rgba(0, 0, 0, 0.54)",
    hover: "rgba(0, 0, 0, 0.04)",
    hoverOpacity: 0.04,
    selected: "rgba(0, 0, 0, 0.08)",
    selectedOpacity: 0.08,
    disabled: "rgba(0, 0, 0, 0.26)",
    disabledBackground: "rgba(0, 0, 0, 0.12)",
    disabledOpacity: 0.38,
    focus: "rgba(0, 0, 0, 0.12)",
    focusOpacity: 0.12,
    activatedOpacity: 0.12
  }
};
var dark = {
  text: {
    primary: common$1.white,
    secondary: "rgba(255, 255, 255, 0.7)",
    disabled: "rgba(255, 255, 255, 0.5)",
    hint: "rgba(255, 255, 255, 0.5)",
    icon: "rgba(255, 255, 255, 0.5)"
  },
  divider: "rgba(255, 255, 255, 0.12)",
  background: {
    paper: grey$1[800],
    default: "#303030"
  },
  action: {
    active: common$1.white,
    hover: "rgba(255, 255, 255, 0.08)",
    hoverOpacity: 0.08,
    selected: "rgba(255, 255, 255, 0.16)",
    selectedOpacity: 0.16,
    disabled: "rgba(255, 255, 255, 0.3)",
    disabledBackground: "rgba(255, 255, 255, 0.12)",
    disabledOpacity: 0.38,
    focus: "rgba(255, 255, 255, 0.12)",
    focusOpacity: 0.12,
    activatedOpacity: 0.24
  }
};
function addLightOrDark(intent, direction, shade, tonalOffset) {
  var tonalOffsetLight = tonalOffset.light || tonalOffset;
  var tonalOffsetDark = tonalOffset.dark || tonalOffset * 1.5;
  if (!intent[direction]) {
    if (intent.hasOwnProperty(shade)) {
      intent[direction] = intent[shade];
    } else if (direction === "light") {
      intent.light = lighten(intent.main, tonalOffsetLight);
    } else if (direction === "dark") {
      intent.dark = darken(intent.main, tonalOffsetDark);
    }
  }
}
function createPalette(palette) {
  var _palette$primary = palette.primary, primary = _palette$primary === void 0 ? {
    light: indigo$2[300],
    main: indigo$2[500],
    dark: indigo$2[700]
  } : _palette$primary, _palette$secondary = palette.secondary, secondary = _palette$secondary === void 0 ? {
    light: pink$2.A200,
    main: pink$2.A400,
    dark: pink$2.A700
  } : _palette$secondary, _palette$error = palette.error, error = _palette$error === void 0 ? {
    light: red$2[300],
    main: red$2[500],
    dark: red$2[700]
  } : _palette$error, _palette$warning = palette.warning, warning = _palette$warning === void 0 ? {
    light: orange$2[300],
    main: orange$2[500],
    dark: orange$2[700]
  } : _palette$warning, _palette$info = palette.info, info = _palette$info === void 0 ? {
    light: blue$2[300],
    main: blue$2[500],
    dark: blue$2[700]
  } : _palette$info, _palette$success = palette.success, success = _palette$success === void 0 ? {
    light: green$2[300],
    main: green$2[500],
    dark: green$2[700]
  } : _palette$success, _palette$type = palette.type, type = _palette$type === void 0 ? "light" : _palette$type, _palette$contrastThre = palette.contrastThreshold, contrastThreshold = _palette$contrastThre === void 0 ? 3 : _palette$contrastThre, _palette$tonalOffset = palette.tonalOffset, tonalOffset = _palette$tonalOffset === void 0 ? 0.2 : _palette$tonalOffset, other = _objectWithoutProperties$2(palette, ["primary", "secondary", "error", "warning", "info", "success", "type", "contrastThreshold", "tonalOffset"]);
  function getContrastText(background) {
    var contrastText = getContrastRatio(background, dark.text.primary) >= contrastThreshold ? dark.text.primary : light.text.primary;
    return contrastText;
  }
  var augmentColor = function augmentColor2(color) {
    var mainShade = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 500;
    var lightShade = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 300;
    var darkShade = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : 700;
    color = _extends$f({}, color);
    if (!color.main && color[mainShade]) {
      color.main = color[mainShade];
    }
    if (!color.main) {
      throw new Error(formatMuiErrorMessage(4, mainShade));
    }
    if (typeof color.main !== "string") {
      throw new Error(formatMuiErrorMessage(5, JSON.stringify(color.main)));
    }
    addLightOrDark(color, "light", lightShade, tonalOffset);
    addLightOrDark(color, "dark", darkShade, tonalOffset);
    if (!color.contrastText) {
      color.contrastText = getContrastText(color.main);
    }
    return color;
  };
  var types = {
    dark,
    light
  };
  var paletteOutput = deepmerge(_extends$f({
    common: common$1,
    type,
    primary: augmentColor(primary),
    secondary: augmentColor(secondary, "A400", "A200", "A700"),
    error: augmentColor(error),
    warning: augmentColor(warning),
    info: augmentColor(info),
    success: augmentColor(success),
    grey: grey$1,
    contrastThreshold,
    getContrastText,
    augmentColor,
    tonalOffset
  }, types[type]), other);
  return paletteOutput;
}
function round(value) {
  return Math.round(value * 1e5) / 1e5;
}
function roundWithDeprecationWarning(value) {
  return round(value);
}
var caseAllCaps = {
  textTransform: "uppercase"
};
var defaultFontFamily = '"Roboto", "Helvetica", "Arial", sans-serif';
function createTypography(palette, typography) {
  var _ref = typeof typography === "function" ? typography(palette) : typography, _ref$fontFamily = _ref.fontFamily, fontFamily = _ref$fontFamily === void 0 ? defaultFontFamily : _ref$fontFamily, _ref$fontSize = _ref.fontSize, fontSize = _ref$fontSize === void 0 ? 14 : _ref$fontSize, _ref$fontWeightLight = _ref.fontWeightLight, fontWeightLight = _ref$fontWeightLight === void 0 ? 300 : _ref$fontWeightLight, _ref$fontWeightRegula = _ref.fontWeightRegular, fontWeightRegular = _ref$fontWeightRegula === void 0 ? 400 : _ref$fontWeightRegula, _ref$fontWeightMedium = _ref.fontWeightMedium, fontWeightMedium = _ref$fontWeightMedium === void 0 ? 500 : _ref$fontWeightMedium, _ref$fontWeightBold = _ref.fontWeightBold, fontWeightBold = _ref$fontWeightBold === void 0 ? 700 : _ref$fontWeightBold, _ref$htmlFontSize = _ref.htmlFontSize, htmlFontSize = _ref$htmlFontSize === void 0 ? 16 : _ref$htmlFontSize, allVariants = _ref.allVariants, pxToRem2 = _ref.pxToRem, other = _objectWithoutProperties$2(_ref, ["fontFamily", "fontSize", "fontWeightLight", "fontWeightRegular", "fontWeightMedium", "fontWeightBold", "htmlFontSize", "allVariants", "pxToRem"]);
  var coef = fontSize / 14;
  var pxToRem = pxToRem2 || function(size) {
    return "".concat(size / htmlFontSize * coef, "rem");
  };
  var buildVariant = function buildVariant2(fontWeight, size, lineHeight, letterSpacing, casing) {
    return _extends$f({
      fontFamily,
      fontWeight,
      fontSize: pxToRem(size),
      lineHeight
    }, fontFamily === defaultFontFamily ? {
      letterSpacing: "".concat(round(letterSpacing / size), "em")
    } : {}, casing, allVariants);
  };
  var variants = {
    h1: buildVariant(fontWeightLight, 96, 1.167, -1.5),
    h2: buildVariant(fontWeightLight, 60, 1.2, -0.5),
    h3: buildVariant(fontWeightRegular, 48, 1.167, 0),
    h4: buildVariant(fontWeightRegular, 34, 1.235, 0.25),
    h5: buildVariant(fontWeightRegular, 24, 1.334, 0),
    h6: buildVariant(fontWeightMedium, 20, 1.6, 0.15),
    subtitle1: buildVariant(fontWeightRegular, 16, 1.75, 0.15),
    subtitle2: buildVariant(fontWeightMedium, 14, 1.57, 0.1),
    body1: buildVariant(fontWeightRegular, 16, 1.5, 0.15),
    body2: buildVariant(fontWeightRegular, 14, 1.43, 0.15),
    button: buildVariant(fontWeightMedium, 14, 1.75, 0.4, caseAllCaps),
    caption: buildVariant(fontWeightRegular, 12, 1.66, 0.4),
    overline: buildVariant(fontWeightRegular, 12, 2.66, 1, caseAllCaps)
  };
  return deepmerge(_extends$f({
    htmlFontSize,
    pxToRem,
    round: roundWithDeprecationWarning,
    fontFamily,
    fontSize,
    fontWeightLight,
    fontWeightRegular,
    fontWeightMedium,
    fontWeightBold
  }, variants), other, {
    clone: false
  });
}
var shadowKeyUmbraOpacity = 0.2;
var shadowKeyPenumbraOpacity = 0.14;
var shadowAmbientShadowOpacity = 0.12;
function createShadow() {
  return ["".concat(arguments.length <= 0 ? void 0 : arguments[0], "px ").concat(arguments.length <= 1 ? void 0 : arguments[1], "px ").concat(arguments.length <= 2 ? void 0 : arguments[2], "px ").concat(arguments.length <= 3 ? void 0 : arguments[3], "px rgba(0,0,0,").concat(shadowKeyUmbraOpacity, ")"), "".concat(arguments.length <= 4 ? void 0 : arguments[4], "px ").concat(arguments.length <= 5 ? void 0 : arguments[5], "px ").concat(arguments.length <= 6 ? void 0 : arguments[6], "px ").concat(arguments.length <= 7 ? void 0 : arguments[7], "px rgba(0,0,0,").concat(shadowKeyPenumbraOpacity, ")"), "".concat(arguments.length <= 8 ? void 0 : arguments[8], "px ").concat(arguments.length <= 9 ? void 0 : arguments[9], "px ").concat(arguments.length <= 10 ? void 0 : arguments[10], "px ").concat(arguments.length <= 11 ? void 0 : arguments[11], "px rgba(0,0,0,").concat(shadowAmbientShadowOpacity, ")")].join(",");
}
var shadows = ["none", createShadow(0, 2, 1, -1, 0, 1, 1, 0, 0, 1, 3, 0), createShadow(0, 3, 1, -2, 0, 2, 2, 0, 0, 1, 5, 0), createShadow(0, 3, 3, -2, 0, 3, 4, 0, 0, 1, 8, 0), createShadow(0, 2, 4, -1, 0, 4, 5, 0, 0, 1, 10, 0), createShadow(0, 3, 5, -1, 0, 5, 8, 0, 0, 1, 14, 0), createShadow(0, 3, 5, -1, 0, 6, 10, 0, 0, 1, 18, 0), createShadow(0, 4, 5, -2, 0, 7, 10, 1, 0, 2, 16, 1), createShadow(0, 5, 5, -3, 0, 8, 10, 1, 0, 3, 14, 2), createShadow(0, 5, 6, -3, 0, 9, 12, 1, 0, 3, 16, 2), createShadow(0, 6, 6, -3, 0, 10, 14, 1, 0, 4, 18, 3), createShadow(0, 6, 7, -4, 0, 11, 15, 1, 0, 4, 20, 3), createShadow(0, 7, 8, -4, 0, 12, 17, 2, 0, 5, 22, 4), createShadow(0, 7, 8, -4, 0, 13, 19, 2, 0, 5, 24, 4), createShadow(0, 7, 9, -4, 0, 14, 21, 2, 0, 5, 26, 4), createShadow(0, 8, 9, -5, 0, 15, 22, 2, 0, 6, 28, 5), createShadow(0, 8, 10, -5, 0, 16, 24, 2, 0, 6, 30, 5), createShadow(0, 8, 11, -5, 0, 17, 26, 2, 0, 6, 32, 5), createShadow(0, 9, 11, -5, 0, 18, 28, 2, 0, 7, 34, 6), createShadow(0, 9, 12, -6, 0, 19, 29, 2, 0, 7, 36, 6), createShadow(0, 10, 13, -6, 0, 20, 31, 3, 0, 8, 38, 7), createShadow(0, 10, 13, -6, 0, 21, 33, 3, 0, 8, 40, 7), createShadow(0, 10, 14, -6, 0, 22, 35, 3, 0, 8, 42, 7), createShadow(0, 11, 14, -7, 0, 23, 36, 3, 0, 9, 44, 8), createShadow(0, 11, 15, -7, 0, 24, 38, 3, 0, 9, 46, 8)];
var shadows$1 = shadows;
var shape = {
  borderRadius: 4
};
var shape$1 = shape;
function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length)
    len = arr.length;
  for (var i2 = 0, arr2 = new Array(len); i2 < len; i2++) {
    arr2[i2] = arr[i2];
  }
  return arr2;
}
function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr))
    return _arrayLikeToArray(arr);
}
function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null)
    return Array.from(iter);
}
function _unsupportedIterableToArray(o2, minLen) {
  if (!o2)
    return;
  if (typeof o2 === "string")
    return _arrayLikeToArray(o2, minLen);
  var n2 = Object.prototype.toString.call(o2).slice(8, -1);
  if (n2 === "Object" && o2.constructor)
    n2 = o2.constructor.name;
  if (n2 === "Map" || n2 === "Set")
    return Array.from(o2);
  if (n2 === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n2))
    return _arrayLikeToArray(o2, minLen);
}
function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}
function createUnarySpacing(theme) {
  var themeSpacing = theme.spacing || 8;
  if (typeof themeSpacing === "number") {
    return function(abs) {
      return themeSpacing * abs;
    };
  }
  if (Array.isArray(themeSpacing)) {
    return function(abs) {
      return themeSpacing[abs];
    };
  }
  if (typeof themeSpacing === "function") {
    return themeSpacing;
  }
  return function() {
    return void 0;
  };
}
function createSpacing() {
  var spacingInput = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 8;
  if (spacingInput.mui) {
    return spacingInput;
  }
  var transform3 = createUnarySpacing({
    spacing: spacingInput
  });
  var spacing = function spacing2() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    if (args.length === 0) {
      return transform3(1);
    }
    if (args.length === 1) {
      return transform3(args[0]);
    }
    return args.map(function(argument) {
      if (typeof argument === "string") {
        return argument;
      }
      var output = transform3(argument);
      return typeof output === "number" ? "".concat(output, "px") : output;
    }).join(" ");
  };
  Object.defineProperty(spacing, "unit", {
    get: function get4() {
      return spacingInput;
    }
  });
  spacing.mui = true;
  return spacing;
}
var easing = {
  easeInOut: "cubic-bezier(0.4, 0, 0.2, 1)",
  easeOut: "cubic-bezier(0.0, 0, 0.2, 1)",
  easeIn: "cubic-bezier(0.4, 0, 1, 1)",
  sharp: "cubic-bezier(0.4, 0, 0.6, 1)"
};
var duration = {
  shortest: 150,
  shorter: 200,
  short: 250,
  standard: 300,
  complex: 375,
  enteringScreen: 225,
  leavingScreen: 195
};
function formatMs(milliseconds) {
  return "".concat(Math.round(milliseconds), "ms");
}
var transitions = {
  easing,
  duration,
  create: function create() {
    var props = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : ["all"];
    var options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    var _options$duration = options.duration, durationOption = _options$duration === void 0 ? duration.standard : _options$duration, _options$easing = options.easing, easingOption = _options$easing === void 0 ? easing.easeInOut : _options$easing, _options$delay = options.delay, delay = _options$delay === void 0 ? 0 : _options$delay;
    _objectWithoutProperties$2(options, ["duration", "easing", "delay"]);
    return (Array.isArray(props) ? props : [props]).map(function(animatedProp) {
      return "".concat(animatedProp, " ").concat(typeof durationOption === "string" ? durationOption : formatMs(durationOption), " ").concat(easingOption, " ").concat(typeof delay === "string" ? delay : formatMs(delay));
    }).join(",");
  },
  getAutoHeightDuration: function getAutoHeightDuration(height) {
    if (!height) {
      return 0;
    }
    var constant2 = height / 36;
    return Math.round((4 + 15 * Math.pow(constant2, 0.25) + constant2 / 5) * 10);
  }
};
var zIndex = {
  mobileStepper: 1e3,
  speedDial: 1050,
  appBar: 1100,
  drawer: 1200,
  modal: 1300,
  snackbar: 1400,
  tooltip: 1500
};
var zIndex$1 = zIndex;
function createTheme() {
  var options = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
  var _options$breakpoints = options.breakpoints, breakpointsInput = _options$breakpoints === void 0 ? {} : _options$breakpoints, _options$mixins = options.mixins, mixinsInput = _options$mixins === void 0 ? {} : _options$mixins, _options$palette = options.palette, paletteInput = _options$palette === void 0 ? {} : _options$palette, spacingInput = options.spacing, _options$typography = options.typography, typographyInput = _options$typography === void 0 ? {} : _options$typography, other = _objectWithoutProperties$2(options, ["breakpoints", "mixins", "palette", "spacing", "typography"]);
  var palette = createPalette(paletteInput);
  var breakpoints = createBreakpoints(breakpointsInput);
  var spacing = createSpacing(spacingInput);
  var muiTheme = deepmerge({
    breakpoints,
    direction: "ltr",
    mixins: createMixins(breakpoints, spacing, mixinsInput),
    overrides: {},
    palette,
    props: {},
    shadows: shadows$1,
    typography: createTypography(palette, typographyInput),
    spacing,
    shape: shape$1,
    transitions,
    zIndex: zIndex$1
  }, other);
  for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }
  muiTheme = args.reduce(function(acc, argument) {
    return deepmerge(acc, argument);
  }, muiTheme);
  return muiTheme;
}
var hasSymbol = typeof Symbol === "function" && Symbol.for;
var nested = hasSymbol ? Symbol.for("mui.nested") : "__THEME_NESTED__";
var pseudoClasses = ["checked", "disabled", "error", "focused", "focusVisible", "required", "expanded", "selected"];
function createGenerateClassName() {
  var options = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
  var _options$disableGloba = options.disableGlobal, disableGlobal = _options$disableGloba === void 0 ? false : _options$disableGloba, _options$productionPr = options.productionPrefix, productionPrefix = _options$productionPr === void 0 ? "jss" : _options$productionPr, _options$seed = options.seed, seed = _options$seed === void 0 ? "" : _options$seed;
  var seedPrefix = seed === "" ? "" : "".concat(seed, "-");
  var ruleCounter = 0;
  var getNextCounterId = function getNextCounterId2() {
    ruleCounter += 1;
    return ruleCounter;
  };
  return function(rule, styleSheet) {
    var name = styleSheet.options.name;
    if (name && name.indexOf("Mui") === 0 && !styleSheet.options.link && !disableGlobal) {
      if (pseudoClasses.indexOf(rule.key) !== -1) {
        return "Mui-".concat(rule.key);
      }
      var prefix2 = "".concat(seedPrefix).concat(name, "-").concat(rule.key);
      if (!styleSheet.options.theme[nested] || seed !== "") {
        return prefix2;
      }
      return "".concat(prefix2, "-").concat(getNextCounterId());
    }
    {
      return "".concat(seedPrefix).concat(productionPrefix).concat(getNextCounterId());
    }
  };
}
function getThemeProps(params) {
  var theme = params.theme, name = params.name, props = params.props;
  if (!theme || !theme.props || !theme.props[name]) {
    return props;
  }
  var defaultProps2 = theme.props[name];
  var propName;
  for (propName in defaultProps2) {
    if (props[propName] === void 0) {
      props[propName] = defaultProps2[propName];
    }
  }
  return props;
}
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function(obj) {
  return typeof obj;
} : function(obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};
var isBrowser = (typeof window === "undefined" ? "undefined" : _typeof(window)) === "object" && (typeof document === "undefined" ? "undefined" : _typeof(document)) === "object" && document.nodeType === 9;
function _defineProperties(target, props) {
  for (var i2 = 0; i2 < props.length; i2++) {
    var descriptor = props[i2];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor)
      descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}
function _createClass$8(Constructor, protoProps, staticProps) {
  if (protoProps)
    _defineProperties(Constructor.prototype, protoProps);
  if (staticProps)
    _defineProperties(Constructor, staticProps);
  return Constructor;
}
function _setPrototypeOf(o2, p2) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf2(o3, p3) {
    o3.__proto__ = p3;
    return o3;
  };
  return _setPrototypeOf(o2, p2);
}
function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;
  _setPrototypeOf(subClass, superClass);
}
function _assertThisInitialized(self2) {
  if (self2 === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return self2;
}
var plainObjectConstrurctor = {}.constructor;
function cloneStyle(style2) {
  if (style2 == null || typeof style2 !== "object")
    return style2;
  if (Array.isArray(style2))
    return style2.map(cloneStyle);
  if (style2.constructor !== plainObjectConstrurctor)
    return style2;
  var newStyle = {};
  for (var name in style2) {
    newStyle[name] = cloneStyle(style2[name]);
  }
  return newStyle;
}
function createRule(name, decl, options) {
  if (name === void 0) {
    name = "unnamed";
  }
  var jss2 = options.jss;
  var declCopy = cloneStyle(decl);
  var rule = jss2.plugins.onCreateRule(name, declCopy, options);
  if (rule)
    return rule;
  if (name[0] === "@")
    ;
  return null;
}
var join = function join2(value, by) {
  var result = "";
  for (var i2 = 0; i2 < value.length; i2++) {
    if (value[i2] === "!important")
      break;
    if (result)
      result += by;
    result += value[i2];
  }
  return result;
};
var toCssValue = function toCssValue2(value, ignoreImportant) {
  if (ignoreImportant === void 0) {
    ignoreImportant = false;
  }
  if (!Array.isArray(value))
    return value;
  var cssValue = "";
  if (Array.isArray(value[0])) {
    for (var i2 = 0; i2 < value.length; i2++) {
      if (value[i2] === "!important")
        break;
      if (cssValue)
        cssValue += ", ";
      cssValue += join(value[i2], " ");
    }
  } else
    cssValue = join(value, ", ");
  if (!ignoreImportant && value[value.length - 1] === "!important") {
    cssValue += " !important";
  }
  return cssValue;
};
function getWhitespaceSymbols(options) {
  if (options && options.format === false) {
    return {
      linebreak: "",
      space: ""
    };
  }
  return {
    linebreak: "\n",
    space: " "
  };
}
function indentStr(str, indent) {
  var result = "";
  for (var index = 0; index < indent; index++) {
    result += "  ";
  }
  return result + str;
}
function toCss(selector, style2, options) {
  if (options === void 0) {
    options = {};
  }
  var result = "";
  if (!style2)
    return result;
  var _options = options, _options$indent = _options.indent, indent = _options$indent === void 0 ? 0 : _options$indent;
  var fallbacks = style2.fallbacks;
  if (options.format === false) {
    indent = -Infinity;
  }
  var _getWhitespaceSymbols = getWhitespaceSymbols(options), linebreak = _getWhitespaceSymbols.linebreak, space = _getWhitespaceSymbols.space;
  if (selector)
    indent++;
  if (fallbacks) {
    if (Array.isArray(fallbacks)) {
      for (var index = 0; index < fallbacks.length; index++) {
        var fallback = fallbacks[index];
        for (var prop in fallback) {
          var value = fallback[prop];
          if (value != null) {
            if (result)
              result += linebreak;
            result += indentStr(prop + ":" + space + toCssValue(value) + ";", indent);
          }
        }
      }
    } else {
      for (var _prop in fallbacks) {
        var _value = fallbacks[_prop];
        if (_value != null) {
          if (result)
            result += linebreak;
          result += indentStr(_prop + ":" + space + toCssValue(_value) + ";", indent);
        }
      }
    }
  }
  for (var _prop2 in style2) {
    var _value2 = style2[_prop2];
    if (_value2 != null && _prop2 !== "fallbacks") {
      if (result)
        result += linebreak;
      result += indentStr(_prop2 + ":" + space + toCssValue(_value2) + ";", indent);
    }
  }
  if (!result && !options.allowEmpty)
    return result;
  if (!selector)
    return result;
  indent--;
  if (result)
    result = "" + linebreak + result + linebreak;
  return indentStr("" + selector + space + "{" + result, indent) + indentStr("}", indent);
}
var escapeRegex = /([[\].#*$><+~=|^:(),"'`\s])/g;
var nativeEscape = typeof CSS !== "undefined" && CSS.escape;
var escape = function(str) {
  return nativeEscape ? nativeEscape(str) : str.replace(escapeRegex, "\\$1");
};
var BaseStyleRule = /* @__PURE__ */ function() {
  function BaseStyleRule2(key, style2, options) {
    this.type = "style";
    this.isProcessed = false;
    var sheet = options.sheet, Renderer = options.Renderer;
    this.key = key;
    this.options = options;
    this.style = style2;
    if (sheet)
      this.renderer = sheet.renderer;
    else if (Renderer)
      this.renderer = new Renderer();
  }
  var _proto = BaseStyleRule2.prototype;
  _proto.prop = function prop(name, value, options) {
    if (value === void 0)
      return this.style[name];
    var force = options ? options.force : false;
    if (!force && this.style[name] === value)
      return this;
    var newValue = value;
    if (!options || options.process !== false) {
      newValue = this.options.jss.plugins.onChangeValue(value, name, this);
    }
    var isEmpty = newValue == null || newValue === false;
    var isDefined = name in this.style;
    if (isEmpty && !isDefined && !force)
      return this;
    var remove = isEmpty && isDefined;
    if (remove)
      delete this.style[name];
    else
      this.style[name] = newValue;
    if (this.renderable && this.renderer) {
      if (remove)
        this.renderer.removeProperty(this.renderable, name);
      else
        this.renderer.setProperty(this.renderable, name, newValue);
      return this;
    }
    var sheet = this.options.sheet;
    if (sheet && sheet.attached)
      ;
    return this;
  };
  return BaseStyleRule2;
}();
var StyleRule = /* @__PURE__ */ function(_BaseStyleRule) {
  _inheritsLoose(StyleRule2, _BaseStyleRule);
  function StyleRule2(key, style2, options) {
    var _this;
    _this = _BaseStyleRule.call(this, key, style2, options) || this;
    var selector = options.selector, scoped = options.scoped, sheet = options.sheet, generateId = options.generateId;
    if (selector) {
      _this.selectorText = selector;
    } else if (scoped !== false) {
      _this.id = generateId(_assertThisInitialized(_assertThisInitialized(_this)), sheet);
      _this.selectorText = "." + escape(_this.id);
    }
    return _this;
  }
  var _proto2 = StyleRule2.prototype;
  _proto2.applyTo = function applyTo(renderable) {
    var renderer = this.renderer;
    if (renderer) {
      var json = this.toJSON();
      for (var prop in json) {
        renderer.setProperty(renderable, prop, json[prop]);
      }
    }
    return this;
  };
  _proto2.toJSON = function toJSON() {
    var json = {};
    for (var prop in this.style) {
      var value = this.style[prop];
      if (typeof value !== "object")
        json[prop] = value;
      else if (Array.isArray(value))
        json[prop] = toCssValue(value);
    }
    return json;
  };
  _proto2.toString = function toString2(options) {
    var sheet = this.options.sheet;
    var link = sheet ? sheet.options.link : false;
    var opts = link ? _extends$f({}, options, {
      allowEmpty: true
    }) : options;
    return toCss(this.selectorText, this.style, opts);
  };
  _createClass$8(StyleRule2, [{
    key: "selector",
    set: function set2(selector) {
      if (selector === this.selectorText)
        return;
      this.selectorText = selector;
      var renderer = this.renderer, renderable = this.renderable;
      if (!renderable || !renderer)
        return;
      var hasChanged = renderer.setSelector(renderable, selector);
      if (!hasChanged) {
        renderer.replaceRule(renderable, this);
      }
    },
    get: function get4() {
      return this.selectorText;
    }
  }]);
  return StyleRule2;
}(BaseStyleRule);
var pluginStyleRule = {
  onCreateRule: function onCreateRule(key, style2, options) {
    if (key[0] === "@" || options.parent && options.parent.type === "keyframes") {
      return null;
    }
    return new StyleRule(key, style2, options);
  }
};
var defaultToStringOptions = {
  indent: 1,
  children: true
};
var atRegExp = /@([\w-]+)/;
var ConditionalRule = /* @__PURE__ */ function() {
  function ConditionalRule2(key, styles7, options) {
    this.type = "conditional";
    this.isProcessed = false;
    this.key = key;
    var atMatch = key.match(atRegExp);
    this.at = atMatch ? atMatch[1] : "unknown";
    this.query = options.name || "@" + this.at;
    this.options = options;
    this.rules = new RuleList(_extends$f({}, options, {
      parent: this
    }));
    for (var name in styles7) {
      this.rules.add(name, styles7[name]);
    }
    this.rules.process();
  }
  var _proto = ConditionalRule2.prototype;
  _proto.getRule = function getRule(name) {
    return this.rules.get(name);
  };
  _proto.indexOf = function indexOf(rule) {
    return this.rules.indexOf(rule);
  };
  _proto.addRule = function addRule(name, style2, options) {
    var rule = this.rules.add(name, style2, options);
    if (!rule)
      return null;
    this.options.jss.plugins.onProcessRule(rule);
    return rule;
  };
  _proto.toString = function toString2(options) {
    if (options === void 0) {
      options = defaultToStringOptions;
    }
    var _getWhitespaceSymbols = getWhitespaceSymbols(options), linebreak = _getWhitespaceSymbols.linebreak;
    if (options.indent == null)
      options.indent = defaultToStringOptions.indent;
    if (options.children == null)
      options.children = defaultToStringOptions.children;
    if (options.children === false) {
      return this.query + " {}";
    }
    var children = this.rules.toString(options);
    return children ? this.query + " {" + linebreak + children + linebreak + "}" : "";
  };
  return ConditionalRule2;
}();
var keyRegExp = /@media|@supports\s+/;
var pluginConditionalRule = {
  onCreateRule: function onCreateRule2(key, styles7, options) {
    return keyRegExp.test(key) ? new ConditionalRule(key, styles7, options) : null;
  }
};
var defaultToStringOptions$1 = {
  indent: 1,
  children: true
};
var nameRegExp = /@keyframes\s+([\w-]+)/;
var KeyframesRule = /* @__PURE__ */ function() {
  function KeyframesRule2(key, frames, options) {
    this.type = "keyframes";
    this.at = "@keyframes";
    this.isProcessed = false;
    var nameMatch = key.match(nameRegExp);
    if (nameMatch && nameMatch[1]) {
      this.name = nameMatch[1];
    } else {
      this.name = "noname";
    }
    this.key = this.type + "-" + this.name;
    this.options = options;
    var scoped = options.scoped, sheet = options.sheet, generateId = options.generateId;
    this.id = scoped === false ? this.name : escape(generateId(this, sheet));
    this.rules = new RuleList(_extends$f({}, options, {
      parent: this
    }));
    for (var name in frames) {
      this.rules.add(name, frames[name], _extends$f({}, options, {
        parent: this
      }));
    }
    this.rules.process();
  }
  var _proto = KeyframesRule2.prototype;
  _proto.toString = function toString2(options) {
    if (options === void 0) {
      options = defaultToStringOptions$1;
    }
    var _getWhitespaceSymbols = getWhitespaceSymbols(options), linebreak = _getWhitespaceSymbols.linebreak;
    if (options.indent == null)
      options.indent = defaultToStringOptions$1.indent;
    if (options.children == null)
      options.children = defaultToStringOptions$1.children;
    if (options.children === false) {
      return this.at + " " + this.id + " {}";
    }
    var children = this.rules.toString(options);
    if (children)
      children = "" + linebreak + children + linebreak;
    return this.at + " " + this.id + " {" + children + "}";
  };
  return KeyframesRule2;
}();
var keyRegExp$1 = /@keyframes\s+/;
var refRegExp$1 = /\$([\w-]+)/g;
var findReferencedKeyframe = function findReferencedKeyframe2(val, keyframes) {
  if (typeof val === "string") {
    return val.replace(refRegExp$1, function(match, name) {
      if (name in keyframes) {
        return keyframes[name];
      }
      return match;
    });
  }
  return val;
};
var replaceRef = function replaceRef2(style2, prop, keyframes) {
  var value = style2[prop];
  var refKeyframe = findReferencedKeyframe(value, keyframes);
  if (refKeyframe !== value) {
    style2[prop] = refKeyframe;
  }
};
var pluginKeyframesRule = {
  onCreateRule: function onCreateRule3(key, frames, options) {
    return typeof key === "string" && keyRegExp$1.test(key) ? new KeyframesRule(key, frames, options) : null;
  },
  onProcessStyle: function onProcessStyle(style2, rule, sheet) {
    if (rule.type !== "style" || !sheet)
      return style2;
    if ("animation-name" in style2)
      replaceRef(style2, "animation-name", sheet.keyframes);
    if ("animation" in style2)
      replaceRef(style2, "animation", sheet.keyframes);
    return style2;
  },
  onChangeValue: function onChangeValue(val, prop, rule) {
    var sheet = rule.options.sheet;
    if (!sheet) {
      return val;
    }
    switch (prop) {
      case "animation":
        return findReferencedKeyframe(val, sheet.keyframes);
      case "animation-name":
        return findReferencedKeyframe(val, sheet.keyframes);
      default:
        return val;
    }
  }
};
var KeyframeRule = /* @__PURE__ */ function(_BaseStyleRule) {
  _inheritsLoose(KeyframeRule2, _BaseStyleRule);
  function KeyframeRule2() {
    return _BaseStyleRule.apply(this, arguments) || this;
  }
  var _proto = KeyframeRule2.prototype;
  _proto.toString = function toString2(options) {
    var sheet = this.options.sheet;
    var link = sheet ? sheet.options.link : false;
    var opts = link ? _extends$f({}, options, {
      allowEmpty: true
    }) : options;
    return toCss(this.key, this.style, opts);
  };
  return KeyframeRule2;
}(BaseStyleRule);
var pluginKeyframeRule = {
  onCreateRule: function onCreateRule4(key, style2, options) {
    if (options.parent && options.parent.type === "keyframes") {
      return new KeyframeRule(key, style2, options);
    }
    return null;
  }
};
var FontFaceRule = /* @__PURE__ */ function() {
  function FontFaceRule2(key, style2, options) {
    this.type = "font-face";
    this.at = "@font-face";
    this.isProcessed = false;
    this.key = key;
    this.style = style2;
    this.options = options;
  }
  var _proto = FontFaceRule2.prototype;
  _proto.toString = function toString2(options) {
    var _getWhitespaceSymbols = getWhitespaceSymbols(options), linebreak = _getWhitespaceSymbols.linebreak;
    if (Array.isArray(this.style)) {
      var str = "";
      for (var index = 0; index < this.style.length; index++) {
        str += toCss(this.at, this.style[index]);
        if (this.style[index + 1])
          str += linebreak;
      }
      return str;
    }
    return toCss(this.at, this.style, options);
  };
  return FontFaceRule2;
}();
var keyRegExp$2 = /@font-face/;
var pluginFontFaceRule = {
  onCreateRule: function onCreateRule5(key, style2, options) {
    return keyRegExp$2.test(key) ? new FontFaceRule(key, style2, options) : null;
  }
};
var ViewportRule = /* @__PURE__ */ function() {
  function ViewportRule2(key, style2, options) {
    this.type = "viewport";
    this.at = "@viewport";
    this.isProcessed = false;
    this.key = key;
    this.style = style2;
    this.options = options;
  }
  var _proto = ViewportRule2.prototype;
  _proto.toString = function toString2(options) {
    return toCss(this.key, this.style, options);
  };
  return ViewportRule2;
}();
var pluginViewportRule = {
  onCreateRule: function onCreateRule6(key, style2, options) {
    return key === "@viewport" || key === "@-ms-viewport" ? new ViewportRule(key, style2, options) : null;
  }
};
var SimpleRule = /* @__PURE__ */ function() {
  function SimpleRule2(key, value, options) {
    this.type = "simple";
    this.isProcessed = false;
    this.key = key;
    this.value = value;
    this.options = options;
  }
  var _proto = SimpleRule2.prototype;
  _proto.toString = function toString2(options) {
    if (Array.isArray(this.value)) {
      var str = "";
      for (var index = 0; index < this.value.length; index++) {
        str += this.key + " " + this.value[index] + ";";
        if (this.value[index + 1])
          str += "\n";
      }
      return str;
    }
    return this.key + " " + this.value + ";";
  };
  return SimpleRule2;
}();
var keysMap = {
  "@charset": true,
  "@import": true,
  "@namespace": true
};
var pluginSimpleRule = {
  onCreateRule: function onCreateRule7(key, value, options) {
    return key in keysMap ? new SimpleRule(key, value, options) : null;
  }
};
var plugins$1 = [pluginStyleRule, pluginConditionalRule, pluginKeyframesRule, pluginKeyframeRule, pluginFontFaceRule, pluginViewportRule, pluginSimpleRule];
var defaultUpdateOptions = {
  process: true
};
var forceUpdateOptions = {
  force: true,
  process: true
};
var RuleList = /* @__PURE__ */ function() {
  function RuleList2(options) {
    this.map = {};
    this.raw = {};
    this.index = [];
    this.counter = 0;
    this.options = options;
    this.classes = options.classes;
    this.keyframes = options.keyframes;
  }
  var _proto = RuleList2.prototype;
  _proto.add = function add(name, decl, ruleOptions) {
    var _this$options = this.options, parent = _this$options.parent, sheet = _this$options.sheet, jss2 = _this$options.jss, Renderer = _this$options.Renderer, generateId = _this$options.generateId, scoped = _this$options.scoped;
    var options = _extends$f({
      classes: this.classes,
      parent,
      sheet,
      jss: jss2,
      Renderer,
      generateId,
      scoped,
      name,
      keyframes: this.keyframes,
      selector: void 0
    }, ruleOptions);
    var key = name;
    if (name in this.raw) {
      key = name + "-d" + this.counter++;
    }
    this.raw[key] = decl;
    if (key in this.classes) {
      options.selector = "." + escape(this.classes[key]);
    }
    var rule = createRule(key, decl, options);
    if (!rule)
      return null;
    this.register(rule);
    var index = options.index === void 0 ? this.index.length : options.index;
    this.index.splice(index, 0, rule);
    return rule;
  };
  _proto.get = function get4(name) {
    return this.map[name];
  };
  _proto.remove = function remove(rule) {
    this.unregister(rule);
    delete this.raw[rule.key];
    this.index.splice(this.index.indexOf(rule), 1);
  };
  _proto.indexOf = function indexOf(rule) {
    return this.index.indexOf(rule);
  };
  _proto.process = function process() {
    var plugins2 = this.options.jss.plugins;
    this.index.slice(0).forEach(plugins2.onProcessRule, plugins2);
  };
  _proto.register = function register(rule) {
    this.map[rule.key] = rule;
    if (rule instanceof StyleRule) {
      this.map[rule.selector] = rule;
      if (rule.id)
        this.classes[rule.key] = rule.id;
    } else if (rule instanceof KeyframesRule && this.keyframes) {
      this.keyframes[rule.name] = rule.id;
    }
  };
  _proto.unregister = function unregister(rule) {
    delete this.map[rule.key];
    if (rule instanceof StyleRule) {
      delete this.map[rule.selector];
      delete this.classes[rule.key];
    } else if (rule instanceof KeyframesRule) {
      delete this.keyframes[rule.name];
    }
  };
  _proto.update = function update2() {
    var name;
    var data;
    var options;
    if (typeof (arguments.length <= 0 ? void 0 : arguments[0]) === "string") {
      name = arguments.length <= 0 ? void 0 : arguments[0];
      data = arguments.length <= 1 ? void 0 : arguments[1];
      options = arguments.length <= 2 ? void 0 : arguments[2];
    } else {
      data = arguments.length <= 0 ? void 0 : arguments[0];
      options = arguments.length <= 1 ? void 0 : arguments[1];
      name = null;
    }
    if (name) {
      this.updateOne(this.map[name], data, options);
    } else {
      for (var index = 0; index < this.index.length; index++) {
        this.updateOne(this.index[index], data, options);
      }
    }
  };
  _proto.updateOne = function updateOne(rule, data, options) {
    if (options === void 0) {
      options = defaultUpdateOptions;
    }
    var _this$options2 = this.options, plugins2 = _this$options2.jss.plugins, sheet = _this$options2.sheet;
    if (rule.rules instanceof RuleList2) {
      rule.rules.update(data, options);
      return;
    }
    var style2 = rule.style;
    plugins2.onUpdate(data, rule, sheet, options);
    if (options.process && style2 && style2 !== rule.style) {
      plugins2.onProcessStyle(rule.style, rule, sheet);
      for (var prop in rule.style) {
        var nextValue = rule.style[prop];
        var prevValue = style2[prop];
        if (nextValue !== prevValue) {
          rule.prop(prop, nextValue, forceUpdateOptions);
        }
      }
      for (var _prop in style2) {
        var _nextValue = rule.style[_prop];
        var _prevValue = style2[_prop];
        if (_nextValue == null && _nextValue !== _prevValue) {
          rule.prop(_prop, null, forceUpdateOptions);
        }
      }
    }
  };
  _proto.toString = function toString2(options) {
    var str = "";
    var sheet = this.options.sheet;
    var link = sheet ? sheet.options.link : false;
    var _getWhitespaceSymbols = getWhitespaceSymbols(options), linebreak = _getWhitespaceSymbols.linebreak;
    for (var index = 0; index < this.index.length; index++) {
      var rule = this.index[index];
      var css2 = rule.toString(options);
      if (!css2 && !link)
        continue;
      if (str)
        str += linebreak;
      str += css2;
    }
    return str;
  };
  return RuleList2;
}();
var StyleSheet = /* @__PURE__ */ function() {
  function StyleSheet2(styles7, options) {
    this.attached = false;
    this.deployed = false;
    this.classes = {};
    this.keyframes = {};
    this.options = _extends$f({}, options, {
      sheet: this,
      parent: this,
      classes: this.classes,
      keyframes: this.keyframes
    });
    if (options.Renderer) {
      this.renderer = new options.Renderer(this);
    }
    this.rules = new RuleList(this.options);
    for (var name in styles7) {
      this.rules.add(name, styles7[name]);
    }
    this.rules.process();
  }
  var _proto = StyleSheet2.prototype;
  _proto.attach = function attach2() {
    if (this.attached)
      return this;
    if (this.renderer)
      this.renderer.attach();
    this.attached = true;
    if (!this.deployed)
      this.deploy();
    return this;
  };
  _proto.detach = function detach2() {
    if (!this.attached)
      return this;
    if (this.renderer)
      this.renderer.detach();
    this.attached = false;
    return this;
  };
  _proto.addRule = function addRule(name, decl, options) {
    var queue = this.queue;
    if (this.attached && !queue)
      this.queue = [];
    var rule = this.rules.add(name, decl, options);
    if (!rule)
      return null;
    this.options.jss.plugins.onProcessRule(rule);
    if (this.attached) {
      if (!this.deployed)
        return rule;
      if (queue)
        queue.push(rule);
      else {
        this.insertRule(rule);
        if (this.queue) {
          this.queue.forEach(this.insertRule, this);
          this.queue = void 0;
        }
      }
      return rule;
    }
    this.deployed = false;
    return rule;
  };
  _proto.insertRule = function insertRule2(rule) {
    if (this.renderer) {
      this.renderer.insertRule(rule);
    }
  };
  _proto.addRules = function addRules(styles7, options) {
    var added = [];
    for (var name in styles7) {
      var rule = this.addRule(name, styles7[name], options);
      if (rule)
        added.push(rule);
    }
    return added;
  };
  _proto.getRule = function getRule(name) {
    return this.rules.get(name);
  };
  _proto.deleteRule = function deleteRule(name) {
    var rule = typeof name === "object" ? name : this.rules.get(name);
    if (!rule || this.attached && !rule.renderable) {
      return false;
    }
    this.rules.remove(rule);
    if (this.attached && rule.renderable && this.renderer) {
      return this.renderer.deleteRule(rule.renderable);
    }
    return true;
  };
  _proto.indexOf = function indexOf(rule) {
    return this.rules.indexOf(rule);
  };
  _proto.deploy = function deploy() {
    if (this.renderer)
      this.renderer.deploy();
    this.deployed = true;
    return this;
  };
  _proto.update = function update2() {
    var _this$rules;
    (_this$rules = this.rules).update.apply(_this$rules, arguments);
    return this;
  };
  _proto.updateOne = function updateOne(rule, data, options) {
    this.rules.updateOne(rule, data, options);
    return this;
  };
  _proto.toString = function toString2(options) {
    return this.rules.toString(options);
  };
  return StyleSheet2;
}();
var PluginsRegistry = /* @__PURE__ */ function() {
  function PluginsRegistry2() {
    this.plugins = {
      internal: [],
      external: []
    };
    this.registry = {};
  }
  var _proto = PluginsRegistry2.prototype;
  _proto.onCreateRule = function onCreateRule8(name, decl, options) {
    for (var i2 = 0; i2 < this.registry.onCreateRule.length; i2++) {
      var rule = this.registry.onCreateRule[i2](name, decl, options);
      if (rule)
        return rule;
    }
    return null;
  };
  _proto.onProcessRule = function onProcessRule(rule) {
    if (rule.isProcessed)
      return;
    var sheet = rule.options.sheet;
    for (var i2 = 0; i2 < this.registry.onProcessRule.length; i2++) {
      this.registry.onProcessRule[i2](rule, sheet);
    }
    if (rule.style)
      this.onProcessStyle(rule.style, rule, sheet);
    rule.isProcessed = true;
  };
  _proto.onProcessStyle = function onProcessStyle2(style2, rule, sheet) {
    for (var i2 = 0; i2 < this.registry.onProcessStyle.length; i2++) {
      rule.style = this.registry.onProcessStyle[i2](rule.style, rule, sheet);
    }
  };
  _proto.onProcessSheet = function onProcessSheet(sheet) {
    for (var i2 = 0; i2 < this.registry.onProcessSheet.length; i2++) {
      this.registry.onProcessSheet[i2](sheet);
    }
  };
  _proto.onUpdate = function onUpdate(data, rule, sheet, options) {
    for (var i2 = 0; i2 < this.registry.onUpdate.length; i2++) {
      this.registry.onUpdate[i2](data, rule, sheet, options);
    }
  };
  _proto.onChangeValue = function onChangeValue2(value, prop, rule) {
    var processedValue = value;
    for (var i2 = 0; i2 < this.registry.onChangeValue.length; i2++) {
      processedValue = this.registry.onChangeValue[i2](processedValue, prop, rule);
    }
    return processedValue;
  };
  _proto.use = function use(newPlugin, options) {
    if (options === void 0) {
      options = {
        queue: "external"
      };
    }
    var plugins2 = this.plugins[options.queue];
    if (plugins2.indexOf(newPlugin) !== -1) {
      return;
    }
    plugins2.push(newPlugin);
    this.registry = [].concat(this.plugins.external, this.plugins.internal).reduce(function(registry, plugin) {
      for (var name in plugin) {
        if (name in registry) {
          registry[name].push(plugin[name]);
        }
      }
      return registry;
    }, {
      onCreateRule: [],
      onProcessRule: [],
      onProcessStyle: [],
      onProcessSheet: [],
      onChangeValue: [],
      onUpdate: []
    });
  };
  return PluginsRegistry2;
}();
var SheetsRegistry = /* @__PURE__ */ function() {
  function SheetsRegistry2() {
    this.registry = [];
  }
  var _proto = SheetsRegistry2.prototype;
  _proto.add = function add(sheet) {
    var registry = this.registry;
    var index = sheet.options.index;
    if (registry.indexOf(sheet) !== -1)
      return;
    if (registry.length === 0 || index >= this.index) {
      registry.push(sheet);
      return;
    }
    for (var i2 = 0; i2 < registry.length; i2++) {
      if (registry[i2].options.index > index) {
        registry.splice(i2, 0, sheet);
        return;
      }
    }
  };
  _proto.reset = function reset() {
    this.registry = [];
  };
  _proto.remove = function remove(sheet) {
    var index = this.registry.indexOf(sheet);
    this.registry.splice(index, 1);
  };
  _proto.toString = function toString2(_temp) {
    var _ref = _temp === void 0 ? {} : _temp, attached = _ref.attached, options = _objectWithoutPropertiesLoose(_ref, ["attached"]);
    var _getWhitespaceSymbols = getWhitespaceSymbols(options), linebreak = _getWhitespaceSymbols.linebreak;
    var css2 = "";
    for (var i2 = 0; i2 < this.registry.length; i2++) {
      var sheet = this.registry[i2];
      if (attached != null && sheet.attached !== attached) {
        continue;
      }
      if (css2)
        css2 += linebreak;
      css2 += sheet.toString(options);
    }
    return css2;
  };
  _createClass$8(SheetsRegistry2, [{
    key: "index",
    get: function get4() {
      return this.registry.length === 0 ? 0 : this.registry[this.registry.length - 1].options.index;
    }
  }]);
  return SheetsRegistry2;
}();
var sheets = new SheetsRegistry();
var globalThis$1 = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" && window.Math === Math ? window : typeof self !== "undefined" && self.Math === Math ? self : Function("return this")();
var ns = "2f1acc6c3a606b082e5eef5e54414ffb";
if (globalThis$1[ns] == null)
  globalThis$1[ns] = 0;
var moduleId = globalThis$1[ns]++;
var createGenerateId = function createGenerateId2(options) {
  if (options === void 0) {
    options = {};
  }
  var ruleCounter = 0;
  var generateId = function generateId2(rule, sheet) {
    ruleCounter += 1;
    var jssId = "";
    var prefix2 = "";
    if (sheet) {
      if (sheet.options.classNamePrefix) {
        prefix2 = sheet.options.classNamePrefix;
      }
      if (sheet.options.jss.id != null) {
        jssId = String(sheet.options.jss.id);
      }
    }
    if (options.minify) {
      return "" + (prefix2 || "c") + moduleId + jssId + ruleCounter;
    }
    return prefix2 + rule.key + "-" + moduleId + (jssId ? "-" + jssId : "") + "-" + ruleCounter;
  };
  return generateId;
};
var memoize$3 = function memoize(fn2) {
  var value;
  return function() {
    if (!value)
      value = fn2();
    return value;
  };
};
var getPropertyValue = function getPropertyValue2(cssRule, prop) {
  try {
    if (cssRule.attributeStyleMap) {
      return cssRule.attributeStyleMap.get(prop);
    }
    return cssRule.style.getPropertyValue(prop);
  } catch (err) {
    return "";
  }
};
var setProperty = function setProperty2(cssRule, prop, value) {
  try {
    var cssValue = value;
    if (Array.isArray(value)) {
      cssValue = toCssValue(value, true);
      if (value[value.length - 1] === "!important") {
        cssRule.style.setProperty(prop, cssValue, "important");
        return true;
      }
    }
    if (cssRule.attributeStyleMap) {
      cssRule.attributeStyleMap.set(prop, cssValue);
    } else {
      cssRule.style.setProperty(prop, cssValue);
    }
  } catch (err) {
    return false;
  }
  return true;
};
var removeProperty = function removeProperty2(cssRule, prop) {
  try {
    if (cssRule.attributeStyleMap) {
      cssRule.attributeStyleMap.delete(prop);
    } else {
      cssRule.style.removeProperty(prop);
    }
  } catch (err) {
  }
};
var setSelector = function setSelector2(cssRule, selectorText) {
  cssRule.selectorText = selectorText;
  return cssRule.selectorText === selectorText;
};
var getHead = memoize$3(function() {
  return document.querySelector("head");
});
function findHigherSheet(registry, options) {
  for (var i2 = 0; i2 < registry.length; i2++) {
    var sheet = registry[i2];
    if (sheet.attached && sheet.options.index > options.index && sheet.options.insertionPoint === options.insertionPoint) {
      return sheet;
    }
  }
  return null;
}
function findHighestSheet(registry, options) {
  for (var i2 = registry.length - 1; i2 >= 0; i2--) {
    var sheet = registry[i2];
    if (sheet.attached && sheet.options.insertionPoint === options.insertionPoint) {
      return sheet;
    }
  }
  return null;
}
function findCommentNode(text2) {
  var head = getHead();
  for (var i2 = 0; i2 < head.childNodes.length; i2++) {
    var node = head.childNodes[i2];
    if (node.nodeType === 8 && node.nodeValue.trim() === text2) {
      return node;
    }
  }
  return null;
}
function findPrevNode(options) {
  var registry = sheets.registry;
  if (registry.length > 0) {
    var sheet = findHigherSheet(registry, options);
    if (sheet && sheet.renderer) {
      return {
        parent: sheet.renderer.element.parentNode,
        node: sheet.renderer.element
      };
    }
    sheet = findHighestSheet(registry, options);
    if (sheet && sheet.renderer) {
      return {
        parent: sheet.renderer.element.parentNode,
        node: sheet.renderer.element.nextSibling
      };
    }
  }
  var insertionPoint = options.insertionPoint;
  if (insertionPoint && typeof insertionPoint === "string") {
    var comment = findCommentNode(insertionPoint);
    if (comment) {
      return {
        parent: comment.parentNode,
        node: comment.nextSibling
      };
    }
  }
  return false;
}
function insertStyle(style2, options) {
  var insertionPoint = options.insertionPoint;
  var nextNode = findPrevNode(options);
  if (nextNode !== false && nextNode.parent) {
    nextNode.parent.insertBefore(style2, nextNode.node);
    return;
  }
  if (insertionPoint && typeof insertionPoint.nodeType === "number") {
    var insertionPointElement = insertionPoint;
    var parentNode = insertionPointElement.parentNode;
    if (parentNode)
      parentNode.insertBefore(style2, insertionPointElement.nextSibling);
    return;
  }
  getHead().appendChild(style2);
}
var getNonce = memoize$3(function() {
  var node = document.querySelector('meta[property="csp-nonce"]');
  return node ? node.getAttribute("content") : null;
});
var _insertRule = function insertRule(container, rule, index) {
  try {
    if ("insertRule" in container) {
      container.insertRule(rule, index);
    } else if ("appendRule" in container) {
      container.appendRule(rule);
    }
  } catch (err) {
    return false;
  }
  return container.cssRules[index];
};
var getValidRuleInsertionIndex = function getValidRuleInsertionIndex2(container, index) {
  var maxIndex = container.cssRules.length;
  if (index === void 0 || index > maxIndex) {
    return maxIndex;
  }
  return index;
};
var createStyle = function createStyle2() {
  var el2 = document.createElement("style");
  el2.textContent = "\n";
  return el2;
};
var DomRenderer = /* @__PURE__ */ function() {
  function DomRenderer2(sheet) {
    this.getPropertyValue = getPropertyValue;
    this.setProperty = setProperty;
    this.removeProperty = removeProperty;
    this.setSelector = setSelector;
    this.hasInsertedRules = false;
    this.cssRules = [];
    if (sheet)
      sheets.add(sheet);
    this.sheet = sheet;
    var _ref = this.sheet ? this.sheet.options : {}, media = _ref.media, meta = _ref.meta, element = _ref.element;
    this.element = element || createStyle();
    this.element.setAttribute("data-jss", "");
    if (media)
      this.element.setAttribute("media", media);
    if (meta)
      this.element.setAttribute("data-meta", meta);
    var nonce = getNonce();
    if (nonce)
      this.element.setAttribute("nonce", nonce);
  }
  var _proto = DomRenderer2.prototype;
  _proto.attach = function attach2() {
    if (this.element.parentNode || !this.sheet)
      return;
    insertStyle(this.element, this.sheet.options);
    var deployed = Boolean(this.sheet && this.sheet.deployed);
    if (this.hasInsertedRules && deployed) {
      this.hasInsertedRules = false;
      this.deploy();
    }
  };
  _proto.detach = function detach2() {
    if (!this.sheet)
      return;
    var parentNode = this.element.parentNode;
    if (parentNode)
      parentNode.removeChild(this.element);
    if (this.sheet.options.link) {
      this.cssRules = [];
      this.element.textContent = "\n";
    }
  };
  _proto.deploy = function deploy() {
    var sheet = this.sheet;
    if (!sheet)
      return;
    if (sheet.options.link) {
      this.insertRules(sheet.rules);
      return;
    }
    this.element.textContent = "\n" + sheet.toString() + "\n";
  };
  _proto.insertRules = function insertRules(rules, nativeParent) {
    for (var i2 = 0; i2 < rules.index.length; i2++) {
      this.insertRule(rules.index[i2], i2, nativeParent);
    }
  };
  _proto.insertRule = function insertRule2(rule, index, nativeParent) {
    if (nativeParent === void 0) {
      nativeParent = this.element.sheet;
    }
    if (rule.rules) {
      var parent = rule;
      var latestNativeParent = nativeParent;
      if (rule.type === "conditional" || rule.type === "keyframes") {
        var _insertionIndex = getValidRuleInsertionIndex(nativeParent, index);
        latestNativeParent = _insertRule(nativeParent, parent.toString({
          children: false
        }), _insertionIndex);
        if (latestNativeParent === false) {
          return false;
        }
        this.refCssRule(rule, _insertionIndex, latestNativeParent);
      }
      this.insertRules(parent.rules, latestNativeParent);
      return latestNativeParent;
    }
    var ruleStr = rule.toString();
    if (!ruleStr)
      return false;
    var insertionIndex = getValidRuleInsertionIndex(nativeParent, index);
    var nativeRule = _insertRule(nativeParent, ruleStr, insertionIndex);
    if (nativeRule === false) {
      return false;
    }
    this.hasInsertedRules = true;
    this.refCssRule(rule, insertionIndex, nativeRule);
    return nativeRule;
  };
  _proto.refCssRule = function refCssRule(rule, index, cssRule) {
    rule.renderable = cssRule;
    if (rule.options.parent instanceof StyleSheet) {
      this.cssRules[index] = cssRule;
    }
  };
  _proto.deleteRule = function deleteRule(cssRule) {
    var sheet = this.element.sheet;
    var index = this.indexOf(cssRule);
    if (index === -1)
      return false;
    sheet.deleteRule(index);
    this.cssRules.splice(index, 1);
    return true;
  };
  _proto.indexOf = function indexOf(cssRule) {
    return this.cssRules.indexOf(cssRule);
  };
  _proto.replaceRule = function replaceRule(cssRule, rule) {
    var index = this.indexOf(cssRule);
    if (index === -1)
      return false;
    this.element.sheet.deleteRule(index);
    this.cssRules.splice(index, 1);
    return this.insertRule(rule, index);
  };
  _proto.getRules = function getRules() {
    return this.element.sheet.cssRules;
  };
  return DomRenderer2;
}();
var instanceCounter = 0;
var Jss = /* @__PURE__ */ function() {
  function Jss2(options) {
    this.id = instanceCounter++;
    this.version = "10.8.2";
    this.plugins = new PluginsRegistry();
    this.options = {
      id: {
        minify: false
      },
      createGenerateId,
      Renderer: isBrowser ? DomRenderer : null,
      plugins: []
    };
    this.generateId = createGenerateId({
      minify: false
    });
    for (var i2 = 0; i2 < plugins$1.length; i2++) {
      this.plugins.use(plugins$1[i2], {
        queue: "internal"
      });
    }
    this.setup(options);
  }
  var _proto = Jss2.prototype;
  _proto.setup = function setup(options) {
    if (options === void 0) {
      options = {};
    }
    if (options.createGenerateId) {
      this.options.createGenerateId = options.createGenerateId;
    }
    if (options.id) {
      this.options.id = _extends$f({}, this.options.id, options.id);
    }
    if (options.createGenerateId || options.id) {
      this.generateId = this.options.createGenerateId(this.options.id);
    }
    if (options.insertionPoint != null)
      this.options.insertionPoint = options.insertionPoint;
    if ("Renderer" in options) {
      this.options.Renderer = options.Renderer;
    }
    if (options.plugins)
      this.use.apply(this, options.plugins);
    return this;
  };
  _proto.createStyleSheet = function createStyleSheet(styles7, options) {
    if (options === void 0) {
      options = {};
    }
    var _options = options, index = _options.index;
    if (typeof index !== "number") {
      index = sheets.index === 0 ? 0 : sheets.index + 1;
    }
    var sheet = new StyleSheet(styles7, _extends$f({}, options, {
      jss: this,
      generateId: options.generateId || this.generateId,
      insertionPoint: this.options.insertionPoint,
      Renderer: this.options.Renderer,
      index
    }));
    this.plugins.onProcessSheet(sheet);
    return sheet;
  };
  _proto.removeStyleSheet = function removeStyleSheet(sheet) {
    sheet.detach();
    sheets.remove(sheet);
    return this;
  };
  _proto.createRule = function createRule$1(name, style2, options) {
    if (style2 === void 0) {
      style2 = {};
    }
    if (options === void 0) {
      options = {};
    }
    if (typeof name === "object") {
      return this.createRule(void 0, name, style2);
    }
    var ruleOptions = _extends$f({}, options, {
      name,
      jss: this,
      Renderer: this.options.Renderer
    });
    if (!ruleOptions.generateId)
      ruleOptions.generateId = this.generateId;
    if (!ruleOptions.classes)
      ruleOptions.classes = {};
    if (!ruleOptions.keyframes)
      ruleOptions.keyframes = {};
    var rule = createRule(name, style2, ruleOptions);
    if (rule)
      this.plugins.onProcessRule(rule);
    return rule;
  };
  _proto.use = function use() {
    var _this = this;
    for (var _len = arguments.length, plugins2 = new Array(_len), _key = 0; _key < _len; _key++) {
      plugins2[_key] = arguments[_key];
    }
    plugins2.forEach(function(plugin) {
      _this.plugins.use(plugin);
    });
    return this;
  };
  return Jss2;
}();
var createJss = function createJss2(options) {
  return new Jss(options);
};
var hasCSSTOMSupport = typeof CSS === "object" && CSS != null && "number" in CSS;
function getDynamicStyles(styles7) {
  var to = null;
  for (var key in styles7) {
    var value = styles7[key];
    var type = typeof value;
    if (type === "function") {
      if (!to)
        to = {};
      to[key] = value;
    } else if (type === "object" && value !== null && !Array.isArray(value)) {
      var extracted = getDynamicStyles(value);
      if (extracted) {
        if (!to)
          to = {};
        to[key] = extracted;
      }
    }
  }
  return to;
}
/**
 * A better abstraction over CSS.
 *
 * @copyright Oleg Isonen (Slobodskoi) / Isonen 2014-present
 * @website https://github.com/cssinjs/jss
 * @license MIT
 */
createJss();
var now$2 = Date.now();
var fnValuesNs = "fnValues" + now$2;
var fnRuleNs = "fnStyle" + ++now$2;
var functionPlugin = function functionPlugin2() {
  return {
    onCreateRule: function onCreateRule8(name, decl, options) {
      if (typeof decl !== "function")
        return null;
      var rule = createRule(name, {}, options);
      rule[fnRuleNs] = decl;
      return rule;
    },
    onProcessStyle: function onProcessStyle2(style2, rule) {
      if (fnValuesNs in rule || fnRuleNs in rule)
        return style2;
      var fnValues = {};
      for (var prop in style2) {
        var value = style2[prop];
        if (typeof value !== "function")
          continue;
        delete style2[prop];
        fnValues[prop] = value;
      }
      rule[fnValuesNs] = fnValues;
      return style2;
    },
    onUpdate: function onUpdate(data, rule, sheet, options) {
      var styleRule = rule;
      var fnRule = styleRule[fnRuleNs];
      if (fnRule) {
        styleRule.style = fnRule(data) || {};
      }
      var fnValues = styleRule[fnValuesNs];
      if (fnValues) {
        for (var _prop in fnValues) {
          styleRule.prop(_prop, fnValues[_prop](data), options);
        }
      }
    }
  };
};
var functions = functionPlugin;
var at = "@global";
var atPrefix = "@global ";
var GlobalContainerRule = /* @__PURE__ */ function() {
  function GlobalContainerRule2(key, styles7, options) {
    this.type = "global";
    this.at = at;
    this.isProcessed = false;
    this.key = key;
    this.options = options;
    this.rules = new RuleList(_extends$f({}, options, {
      parent: this
    }));
    for (var selector in styles7) {
      this.rules.add(selector, styles7[selector]);
    }
    this.rules.process();
  }
  var _proto = GlobalContainerRule2.prototype;
  _proto.getRule = function getRule(name) {
    return this.rules.get(name);
  };
  _proto.addRule = function addRule(name, style2, options) {
    var rule = this.rules.add(name, style2, options);
    if (rule)
      this.options.jss.plugins.onProcessRule(rule);
    return rule;
  };
  _proto.indexOf = function indexOf(rule) {
    return this.rules.indexOf(rule);
  };
  _proto.toString = function toString2() {
    return this.rules.toString();
  };
  return GlobalContainerRule2;
}();
var GlobalPrefixedRule = /* @__PURE__ */ function() {
  function GlobalPrefixedRule2(key, style2, options) {
    this.type = "global";
    this.at = at;
    this.isProcessed = false;
    this.key = key;
    this.options = options;
    var selector = key.substr(atPrefix.length);
    this.rule = options.jss.createRule(selector, style2, _extends$f({}, options, {
      parent: this
    }));
  }
  var _proto2 = GlobalPrefixedRule2.prototype;
  _proto2.toString = function toString2(options) {
    return this.rule ? this.rule.toString(options) : "";
  };
  return GlobalPrefixedRule2;
}();
var separatorRegExp$1 = /\s*,\s*/g;
function addScope(selector, scope) {
  var parts = selector.split(separatorRegExp$1);
  var scoped = "";
  for (var i2 = 0; i2 < parts.length; i2++) {
    scoped += scope + " " + parts[i2].trim();
    if (parts[i2 + 1])
      scoped += ", ";
  }
  return scoped;
}
function handleNestedGlobalContainerRule(rule, sheet) {
  var options = rule.options, style2 = rule.style;
  var rules = style2 ? style2[at] : null;
  if (!rules)
    return;
  for (var name in rules) {
    sheet.addRule(name, rules[name], _extends$f({}, options, {
      selector: addScope(name, rule.selector)
    }));
  }
  delete style2[at];
}
function handlePrefixedGlobalRule(rule, sheet) {
  var options = rule.options, style2 = rule.style;
  for (var prop in style2) {
    if (prop[0] !== "@" || prop.substr(0, at.length) !== at)
      continue;
    var selector = addScope(prop.substr(at.length), rule.selector);
    sheet.addRule(selector, style2[prop], _extends$f({}, options, {
      selector
    }));
    delete style2[prop];
  }
}
function jssGlobal() {
  function onCreateRule8(name, styles7, options) {
    if (!name)
      return null;
    if (name === at) {
      return new GlobalContainerRule(name, styles7, options);
    }
    if (name[0] === "@" && name.substr(0, atPrefix.length) === atPrefix) {
      return new GlobalPrefixedRule(name, styles7, options);
    }
    var parent = options.parent;
    if (parent) {
      if (parent.type === "global" || parent.options.parent && parent.options.parent.type === "global") {
        options.scoped = false;
      }
    }
    if (options.scoped === false) {
      options.selector = name;
    }
    return null;
  }
  function onProcessRule(rule, sheet) {
    if (rule.type !== "style" || !sheet)
      return;
    handleNestedGlobalContainerRule(rule, sheet);
    handlePrefixedGlobalRule(rule, sheet);
  }
  return {
    onCreateRule: onCreateRule8,
    onProcessRule
  };
}
var separatorRegExp = /\s*,\s*/g;
var parentRegExp = /&/g;
var refRegExp = /\$([\w-]+)/g;
function jssNested() {
  function getReplaceRef(container, sheet) {
    return function(match, key) {
      var rule = container.getRule(key) || sheet && sheet.getRule(key);
      if (rule) {
        return rule.selector;
      }
      return key;
    };
  }
  function replaceParentRefs(nestedProp, parentProp) {
    var parentSelectors = parentProp.split(separatorRegExp);
    var nestedSelectors = nestedProp.split(separatorRegExp);
    var result = "";
    for (var i2 = 0; i2 < parentSelectors.length; i2++) {
      var parent = parentSelectors[i2];
      for (var j2 = 0; j2 < nestedSelectors.length; j2++) {
        var nested2 = nestedSelectors[j2];
        if (result)
          result += ", ";
        result += nested2.indexOf("&") !== -1 ? nested2.replace(parentRegExp, parent) : parent + " " + nested2;
      }
    }
    return result;
  }
  function getOptions(rule, container, prevOptions) {
    if (prevOptions)
      return _extends$f({}, prevOptions, {
        index: prevOptions.index + 1
      });
    var nestingLevel = rule.options.nestingLevel;
    nestingLevel = nestingLevel === void 0 ? 1 : nestingLevel + 1;
    var options = _extends$f({}, rule.options, {
      nestingLevel,
      index: container.indexOf(rule) + 1
    });
    delete options.name;
    return options;
  }
  function onProcessStyle2(style2, rule, sheet) {
    if (rule.type !== "style")
      return style2;
    var styleRule = rule;
    var container = styleRule.options.parent;
    var options;
    var replaceRef3;
    for (var prop in style2) {
      var isNested = prop.indexOf("&") !== -1;
      var isNestedConditional = prop[0] === "@";
      if (!isNested && !isNestedConditional)
        continue;
      options = getOptions(styleRule, container, options);
      if (isNested) {
        var selector = replaceParentRefs(prop, styleRule.selector);
        if (!replaceRef3)
          replaceRef3 = getReplaceRef(container, sheet);
        selector = selector.replace(refRegExp, replaceRef3);
        container.addRule(selector, style2[prop], _extends$f({}, options, {
          selector
        }));
      } else if (isNestedConditional) {
        container.addRule(prop, {}, options).addRule(styleRule.key, style2[prop], {
          selector: styleRule.selector
        });
      }
      delete style2[prop];
    }
    return style2;
  }
  return {
    onProcessStyle: onProcessStyle2
  };
}
var uppercasePattern = /[A-Z]/g;
var msPattern = /^ms-/;
var cache$2 = {};
function toHyphenLower(match) {
  return "-" + match.toLowerCase();
}
function hyphenateStyleName(name) {
  if (cache$2.hasOwnProperty(name)) {
    return cache$2[name];
  }
  var hName = name.replace(uppercasePattern, toHyphenLower);
  return cache$2[name] = msPattern.test(hName) ? "-" + hName : hName;
}
function convertCase(style2) {
  var converted = {};
  for (var prop in style2) {
    var key = prop.indexOf("--") === 0 ? prop : hyphenateStyleName(prop);
    converted[key] = style2[prop];
  }
  if (style2.fallbacks) {
    if (Array.isArray(style2.fallbacks))
      converted.fallbacks = style2.fallbacks.map(convertCase);
    else
      converted.fallbacks = convertCase(style2.fallbacks);
  }
  return converted;
}
function camelCase() {
  function onProcessStyle2(style2) {
    if (Array.isArray(style2)) {
      for (var index = 0; index < style2.length; index++) {
        style2[index] = convertCase(style2[index]);
      }
      return style2;
    }
    return convertCase(style2);
  }
  function onChangeValue2(value, prop, rule) {
    if (prop.indexOf("--") === 0) {
      return value;
    }
    var hyphenatedProp = hyphenateStyleName(prop);
    if (prop === hyphenatedProp)
      return value;
    rule.prop(hyphenatedProp, value);
    return null;
  }
  return {
    onProcessStyle: onProcessStyle2,
    onChangeValue: onChangeValue2
  };
}
var px = hasCSSTOMSupport && CSS ? CSS.px : "px";
var ms = hasCSSTOMSupport && CSS ? CSS.ms : "ms";
var percent = hasCSSTOMSupport && CSS ? CSS.percent : "%";
var defaultUnits = {
  "animation-delay": ms,
  "animation-duration": ms,
  "background-position": px,
  "background-position-x": px,
  "background-position-y": px,
  "background-size": px,
  border: px,
  "border-bottom": px,
  "border-bottom-left-radius": px,
  "border-bottom-right-radius": px,
  "border-bottom-width": px,
  "border-left": px,
  "border-left-width": px,
  "border-radius": px,
  "border-right": px,
  "border-right-width": px,
  "border-top": px,
  "border-top-left-radius": px,
  "border-top-right-radius": px,
  "border-top-width": px,
  "border-width": px,
  "border-block": px,
  "border-block-end": px,
  "border-block-end-width": px,
  "border-block-start": px,
  "border-block-start-width": px,
  "border-block-width": px,
  "border-inline": px,
  "border-inline-end": px,
  "border-inline-end-width": px,
  "border-inline-start": px,
  "border-inline-start-width": px,
  "border-inline-width": px,
  "border-start-start-radius": px,
  "border-start-end-radius": px,
  "border-end-start-radius": px,
  "border-end-end-radius": px,
  margin: px,
  "margin-bottom": px,
  "margin-left": px,
  "margin-right": px,
  "margin-top": px,
  "margin-block": px,
  "margin-block-end": px,
  "margin-block-start": px,
  "margin-inline": px,
  "margin-inline-end": px,
  "margin-inline-start": px,
  padding: px,
  "padding-bottom": px,
  "padding-left": px,
  "padding-right": px,
  "padding-top": px,
  "padding-block": px,
  "padding-block-end": px,
  "padding-block-start": px,
  "padding-inline": px,
  "padding-inline-end": px,
  "padding-inline-start": px,
  "mask-position-x": px,
  "mask-position-y": px,
  "mask-size": px,
  height: px,
  width: px,
  "min-height": px,
  "max-height": px,
  "min-width": px,
  "max-width": px,
  bottom: px,
  left: px,
  top: px,
  right: px,
  inset: px,
  "inset-block": px,
  "inset-block-end": px,
  "inset-block-start": px,
  "inset-inline": px,
  "inset-inline-end": px,
  "inset-inline-start": px,
  "box-shadow": px,
  "text-shadow": px,
  "column-gap": px,
  "column-rule": px,
  "column-rule-width": px,
  "column-width": px,
  "font-size": px,
  "font-size-delta": px,
  "letter-spacing": px,
  "text-decoration-thickness": px,
  "text-indent": px,
  "text-stroke": px,
  "text-stroke-width": px,
  "word-spacing": px,
  motion: px,
  "motion-offset": px,
  outline: px,
  "outline-offset": px,
  "outline-width": px,
  perspective: px,
  "perspective-origin-x": percent,
  "perspective-origin-y": percent,
  "transform-origin": percent,
  "transform-origin-x": percent,
  "transform-origin-y": percent,
  "transform-origin-z": percent,
  "transition-delay": ms,
  "transition-duration": ms,
  "vertical-align": px,
  "flex-basis": px,
  "shape-margin": px,
  size: px,
  gap: px,
  grid: px,
  "grid-gap": px,
  "row-gap": px,
  "grid-row-gap": px,
  "grid-column-gap": px,
  "grid-template-rows": px,
  "grid-template-columns": px,
  "grid-auto-rows": px,
  "grid-auto-columns": px,
  "box-shadow-x": px,
  "box-shadow-y": px,
  "box-shadow-blur": px,
  "box-shadow-spread": px,
  "font-line-height": px,
  "text-shadow-x": px,
  "text-shadow-y": px,
  "text-shadow-blur": px
};
function addCamelCasedVersion(obj) {
  var regExp2 = /(-[a-z])/g;
  var replace = function replace2(str) {
    return str[1].toUpperCase();
  };
  var newObj = {};
  for (var key in obj) {
    newObj[key] = obj[key];
    newObj[key.replace(regExp2, replace)] = obj[key];
  }
  return newObj;
}
var units = addCamelCasedVersion(defaultUnits);
function iterate(prop, value, options) {
  if (value == null)
    return value;
  if (Array.isArray(value)) {
    for (var i2 = 0; i2 < value.length; i2++) {
      value[i2] = iterate(prop, value[i2], options);
    }
  } else if (typeof value === "object") {
    if (prop === "fallbacks") {
      for (var innerProp in value) {
        value[innerProp] = iterate(innerProp, value[innerProp], options);
      }
    } else {
      for (var _innerProp in value) {
        value[_innerProp] = iterate(prop + "-" + _innerProp, value[_innerProp], options);
      }
    }
  } else if (typeof value === "number" && isNaN(value) === false) {
    var unit = options[prop] || units[prop];
    if (unit && !(value === 0 && unit === px)) {
      return typeof unit === "function" ? unit(value).toString() : "" + value + unit;
    }
    return value.toString();
  }
  return value;
}
function defaultUnit(options) {
  if (options === void 0) {
    options = {};
  }
  var camelCasedOptions = addCamelCasedVersion(options);
  function onProcessStyle2(style2, rule) {
    if (rule.type !== "style")
      return style2;
    for (var prop in style2) {
      style2[prop] = iterate(prop, style2[prop], camelCasedOptions);
    }
    return style2;
  }
  function onChangeValue2(value, prop) {
    return iterate(prop, value, camelCasedOptions);
  }
  return {
    onProcessStyle: onProcessStyle2,
    onChangeValue: onChangeValue2
  };
}
var js = "";
var css = "";
var vendor = "";
var browser = "";
var isTouch = isBrowser && "ontouchstart" in document.documentElement;
if (isBrowser) {
  var jsCssMap = {
    Moz: "-moz-",
    ms: "-ms-",
    O: "-o-",
    Webkit: "-webkit-"
  };
  var _document$createEleme = document.createElement("p"), style$3 = _document$createEleme.style;
  var testProp = "Transform";
  for (var key in jsCssMap) {
    if (key + testProp in style$3) {
      js = key;
      css = jsCssMap[key];
      break;
    }
  }
  if (js === "Webkit" && "msHyphens" in style$3) {
    js = "ms";
    css = jsCssMap.ms;
    browser = "edge";
  }
  if (js === "Webkit" && "-apple-trailing-word" in style$3) {
    vendor = "apple";
  }
}
var prefix = {
  js,
  css,
  vendor,
  browser,
  isTouch
};
function supportedKeyframes(key) {
  if (key[1] === "-")
    return key;
  if (prefix.js === "ms")
    return key;
  return "@" + prefix.css + "keyframes" + key.substr(10);
}
var appearence = {
  noPrefill: ["appearance"],
  supportedProperty: function supportedProperty(prop) {
    if (prop !== "appearance")
      return false;
    if (prefix.js === "ms")
      return "-webkit-" + prop;
    return prefix.css + prop;
  }
};
var colorAdjust = {
  noPrefill: ["color-adjust"],
  supportedProperty: function supportedProperty2(prop) {
    if (prop !== "color-adjust")
      return false;
    if (prefix.js === "Webkit")
      return prefix.css + "print-" + prop;
    return prop;
  }
};
var regExp = /[-\s]+(.)?/g;
function toUpper(match, c2) {
  return c2 ? c2.toUpperCase() : "";
}
function camelize(str) {
  return str.replace(regExp, toUpper);
}
function pascalize(str) {
  return camelize("-" + str);
}
var mask = {
  noPrefill: ["mask"],
  supportedProperty: function supportedProperty3(prop, style2) {
    if (!/^mask/.test(prop))
      return false;
    if (prefix.js === "Webkit") {
      var longhand = "mask-image";
      if (camelize(longhand) in style2) {
        return prop;
      }
      if (prefix.js + pascalize(longhand) in style2) {
        return prefix.css + prop;
      }
    }
    return prop;
  }
};
var textOrientation = {
  noPrefill: ["text-orientation"],
  supportedProperty: function supportedProperty4(prop) {
    if (prop !== "text-orientation")
      return false;
    if (prefix.vendor === "apple" && !prefix.isTouch) {
      return prefix.css + prop;
    }
    return prop;
  }
};
var transform = {
  noPrefill: ["transform"],
  supportedProperty: function supportedProperty5(prop, style2, options) {
    if (prop !== "transform")
      return false;
    if (options.transform) {
      return prop;
    }
    return prefix.css + prop;
  }
};
var transition = {
  noPrefill: ["transition"],
  supportedProperty: function supportedProperty6(prop, style2, options) {
    if (prop !== "transition")
      return false;
    if (options.transition) {
      return prop;
    }
    return prefix.css + prop;
  }
};
var writingMode = {
  noPrefill: ["writing-mode"],
  supportedProperty: function supportedProperty7(prop) {
    if (prop !== "writing-mode")
      return false;
    if (prefix.js === "Webkit" || prefix.js === "ms" && prefix.browser !== "edge") {
      return prefix.css + prop;
    }
    return prop;
  }
};
var userSelect = {
  noPrefill: ["user-select"],
  supportedProperty: function supportedProperty8(prop) {
    if (prop !== "user-select")
      return false;
    if (prefix.js === "Moz" || prefix.js === "ms" || prefix.vendor === "apple") {
      return prefix.css + prop;
    }
    return prop;
  }
};
var breakPropsOld = {
  supportedProperty: function supportedProperty9(prop, style2) {
    if (!/^break-/.test(prop))
      return false;
    if (prefix.js === "Webkit") {
      var jsProp = "WebkitColumn" + pascalize(prop);
      return jsProp in style2 ? prefix.css + "column-" + prop : false;
    }
    if (prefix.js === "Moz") {
      var _jsProp = "page" + pascalize(prop);
      return _jsProp in style2 ? "page-" + prop : false;
    }
    return false;
  }
};
var inlineLogicalOld = {
  supportedProperty: function supportedProperty10(prop, style2) {
    if (!/^(border|margin|padding)-inline/.test(prop))
      return false;
    if (prefix.js === "Moz")
      return prop;
    var newProp = prop.replace("-inline", "");
    return prefix.js + pascalize(newProp) in style2 ? prefix.css + newProp : false;
  }
};
var unprefixed = {
  supportedProperty: function supportedProperty11(prop, style2) {
    return camelize(prop) in style2 ? prop : false;
  }
};
var prefixed = {
  supportedProperty: function supportedProperty12(prop, style2) {
    var pascalized = pascalize(prop);
    if (prop[0] === "-")
      return prop;
    if (prop[0] === "-" && prop[1] === "-")
      return prop;
    if (prefix.js + pascalized in style2)
      return prefix.css + prop;
    if (prefix.js !== "Webkit" && "Webkit" + pascalized in style2)
      return "-webkit-" + prop;
    return false;
  }
};
var scrollSnap = {
  supportedProperty: function supportedProperty13(prop) {
    if (prop.substring(0, 11) !== "scroll-snap")
      return false;
    if (prefix.js === "ms") {
      return "" + prefix.css + prop;
    }
    return prop;
  }
};
var overscrollBehavior = {
  supportedProperty: function supportedProperty14(prop) {
    if (prop !== "overscroll-behavior")
      return false;
    if (prefix.js === "ms") {
      return prefix.css + "scroll-chaining";
    }
    return prop;
  }
};
var propMap = {
  "flex-grow": "flex-positive",
  "flex-shrink": "flex-negative",
  "flex-basis": "flex-preferred-size",
  "justify-content": "flex-pack",
  order: "flex-order",
  "align-items": "flex-align",
  "align-content": "flex-line-pack"
};
var flex2012 = {
  supportedProperty: function supportedProperty15(prop, style2) {
    var newProp = propMap[prop];
    if (!newProp)
      return false;
    return prefix.js + pascalize(newProp) in style2 ? prefix.css + newProp : false;
  }
};
var propMap$1 = {
  flex: "box-flex",
  "flex-grow": "box-flex",
  "flex-direction": ["box-orient", "box-direction"],
  order: "box-ordinal-group",
  "align-items": "box-align",
  "flex-flow": ["box-orient", "box-direction"],
  "justify-content": "box-pack"
};
var propKeys = Object.keys(propMap$1);
var prefixCss = function prefixCss2(p2) {
  return prefix.css + p2;
};
var flex2009 = {
  supportedProperty: function supportedProperty16(prop, style2, _ref) {
    var multiple = _ref.multiple;
    if (propKeys.indexOf(prop) > -1) {
      var newProp = propMap$1[prop];
      if (!Array.isArray(newProp)) {
        return prefix.js + pascalize(newProp) in style2 ? prefix.css + newProp : false;
      }
      if (!multiple)
        return false;
      for (var i2 = 0; i2 < newProp.length; i2++) {
        if (!(prefix.js + pascalize(newProp[0]) in style2)) {
          return false;
        }
      }
      return newProp.map(prefixCss);
    }
    return false;
  }
};
var plugins = [appearence, colorAdjust, mask, textOrientation, transform, transition, writingMode, userSelect, breakPropsOld, inlineLogicalOld, unprefixed, prefixed, scrollSnap, overscrollBehavior, flex2012, flex2009];
var propertyDetectors = plugins.filter(function(p2) {
  return p2.supportedProperty;
}).map(function(p2) {
  return p2.supportedProperty;
});
var noPrefill = plugins.filter(function(p2) {
  return p2.noPrefill;
}).reduce(function(a2, p2) {
  a2.push.apply(a2, _toConsumableArray(p2.noPrefill));
  return a2;
}, []);
var el;
var cache = {};
if (isBrowser) {
  el = document.createElement("p");
  var computed = window.getComputedStyle(document.documentElement, "");
  for (var key$1 in computed) {
    if (!isNaN(key$1))
      cache[computed[key$1]] = computed[key$1];
  }
  noPrefill.forEach(function(x2) {
    return delete cache[x2];
  });
}
function supportedProperty17(prop, options) {
  if (options === void 0) {
    options = {};
  }
  if (!el)
    return prop;
  if (cache[prop] != null) {
    return cache[prop];
  }
  if (prop === "transition" || prop === "transform") {
    options[prop] = prop in el.style;
  }
  for (var i2 = 0; i2 < propertyDetectors.length; i2++) {
    cache[prop] = propertyDetectors[i2](prop, el.style, options);
    if (cache[prop])
      break;
  }
  try {
    el.style[prop] = "";
  } catch (err) {
    return false;
  }
  return cache[prop];
}
var cache$1 = {};
var transitionProperties = {
  transition: 1,
  "transition-property": 1,
  "-webkit-transition": 1,
  "-webkit-transition-property": 1
};
var transPropsRegExp = /(^\s*[\w-]+)|, (\s*[\w-]+)(?![^()]*\))/g;
var el$1;
function prefixTransitionCallback(match, p1, p2) {
  if (p1 === "var")
    return "var";
  if (p1 === "all")
    return "all";
  if (p2 === "all")
    return ", all";
  var prefixedValue = p1 ? supportedProperty17(p1) : ", " + supportedProperty17(p2);
  if (!prefixedValue)
    return p1 || p2;
  return prefixedValue;
}
if (isBrowser)
  el$1 = document.createElement("p");
function supportedValue(property2, value) {
  var prefixedValue = value;
  if (!el$1 || property2 === "content")
    return value;
  if (typeof prefixedValue !== "string" || !isNaN(parseInt(prefixedValue, 10))) {
    return prefixedValue;
  }
  var cacheKey = property2 + prefixedValue;
  if (cache$1[cacheKey] != null) {
    return cache$1[cacheKey];
  }
  try {
    el$1.style[property2] = prefixedValue;
  } catch (err) {
    cache$1[cacheKey] = false;
    return false;
  }
  if (transitionProperties[property2]) {
    prefixedValue = prefixedValue.replace(transPropsRegExp, prefixTransitionCallback);
  } else if (el$1.style[property2] === "") {
    prefixedValue = prefix.css + prefixedValue;
    if (prefixedValue === "-ms-flex")
      el$1.style[property2] = "-ms-flexbox";
    el$1.style[property2] = prefixedValue;
    if (el$1.style[property2] === "") {
      cache$1[cacheKey] = false;
      return false;
    }
  }
  el$1.style[property2] = "";
  cache$1[cacheKey] = prefixedValue;
  return cache$1[cacheKey];
}
function jssVendorPrefixer() {
  function onProcessRule(rule) {
    if (rule.type === "keyframes") {
      var atRule = rule;
      atRule.at = supportedKeyframes(atRule.at);
    }
  }
  function prefixStyle(style2) {
    for (var prop in style2) {
      var value = style2[prop];
      if (prop === "fallbacks" && Array.isArray(value)) {
        style2[prop] = value.map(prefixStyle);
        continue;
      }
      var changeProp = false;
      var supportedProp = supportedProperty17(prop);
      if (supportedProp && supportedProp !== prop)
        changeProp = true;
      var changeValue = false;
      var supportedValue$1 = supportedValue(supportedProp, toCssValue(value));
      if (supportedValue$1 && supportedValue$1 !== value)
        changeValue = true;
      if (changeProp || changeValue) {
        if (changeProp)
          delete style2[prop];
        style2[supportedProp || prop] = supportedValue$1 || value;
      }
    }
    return style2;
  }
  function onProcessStyle2(style2, rule) {
    if (rule.type !== "style")
      return style2;
    return prefixStyle(style2);
  }
  function onChangeValue2(value, prop) {
    return supportedValue(prop, toCssValue(value)) || value;
  }
  return {
    onProcessRule,
    onProcessStyle: onProcessStyle2,
    onChangeValue: onChangeValue2
  };
}
function jssPropsSort() {
  var sort = function sort2(prop0, prop1) {
    if (prop0.length === prop1.length) {
      return prop0 > prop1 ? 1 : -1;
    }
    return prop0.length - prop1.length;
  };
  return {
    onProcessStyle: function onProcessStyle2(style2, rule) {
      if (rule.type !== "style")
        return style2;
      var newStyle = {};
      var props = Object.keys(style2).sort(sort);
      for (var i2 = 0; i2 < props.length; i2++) {
        newStyle[props[i2]] = style2[props[i2]];
      }
      return newStyle;
    }
  };
}
function jssPreset() {
  return {
    plugins: [
      functions(),
      jssGlobal(),
      jssNested(),
      camelCase(),
      defaultUnit(),
      typeof window === "undefined" ? null : jssVendorPrefixer(),
      jssPropsSort()
    ]
  };
}
function mergeClasses$2() {
  var options = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
  var baseClasses = options.baseClasses, newClasses = options.newClasses;
  options.Component;
  if (!newClasses) {
    return baseClasses;
  }
  var nextClasses = _extends$f({}, baseClasses);
  Object.keys(newClasses).forEach(function(key) {
    if (newClasses[key]) {
      nextClasses[key] = "".concat(baseClasses[key], " ").concat(newClasses[key]);
    }
  });
  return nextClasses;
}
var multiKeyStore = {
  set: function set(cache2, key1, key2, value) {
    var subCache = cache2.get(key1);
    if (!subCache) {
      subCache = new Map();
      cache2.set(key1, subCache);
    }
    subCache.set(key2, value);
  },
  get: function get(cache2, key1, key2) {
    var subCache = cache2.get(key1);
    return subCache ? subCache.get(key2) : void 0;
  },
  delete: function _delete(cache2, key1, key2) {
    var subCache = cache2.get(key1);
    subCache.delete(key2);
  }
};
var multiKeyStore$1 = multiKeyStore;
var ThemeContext = React__default.createContext(null);
var ThemeContext$1 = ThemeContext;
function useTheme() {
  var theme = React__default.useContext(ThemeContext$1);
  return theme;
}
var jss = createJss(jssPreset());
var generateClassName = createGenerateClassName();
var sheetsManager = new Map();
var defaultOptions = {
  disableGeneration: false,
  generateClassName,
  jss,
  sheetsCache: null,
  sheetsManager,
  sheetsRegistry: null
};
var StylesContext = React__default.createContext(defaultOptions);
var indexCounter = -1e9;
function increment() {
  indexCounter += 1;
  return indexCounter;
}
var noopTheme = {};
var noopTheme$1 = noopTheme;
function getStylesCreator(stylesOrCreator) {
  var themingEnabled = typeof stylesOrCreator === "function";
  return {
    create: function create2(theme, name) {
      var styles7;
      try {
        styles7 = themingEnabled ? stylesOrCreator(theme) : stylesOrCreator;
      } catch (err) {
        throw err;
      }
      if (!name || !theme.overrides || !theme.overrides[name]) {
        return styles7;
      }
      var overrides = theme.overrides[name];
      var stylesWithOverrides = _extends$f({}, styles7);
      Object.keys(overrides).forEach(function(key) {
        stylesWithOverrides[key] = deepmerge(stylesWithOverrides[key], overrides[key]);
      });
      return stylesWithOverrides;
    },
    options: {}
  };
}
function getClasses(_ref, classes, Component2) {
  var state = _ref.state, stylesOptions = _ref.stylesOptions;
  if (stylesOptions.disableGeneration) {
    return classes || {};
  }
  if (!state.cacheClasses) {
    state.cacheClasses = {
      value: null,
      lastProp: null,
      lastJSS: {}
    };
  }
  var generate = false;
  if (state.classes !== state.cacheClasses.lastJSS) {
    state.cacheClasses.lastJSS = state.classes;
    generate = true;
  }
  if (classes !== state.cacheClasses.lastProp) {
    state.cacheClasses.lastProp = classes;
    generate = true;
  }
  if (generate) {
    state.cacheClasses.value = mergeClasses$2({
      baseClasses: state.cacheClasses.lastJSS,
      newClasses: classes,
      Component: Component2
    });
  }
  return state.cacheClasses.value;
}
function attach(_ref2, props) {
  var state = _ref2.state, theme = _ref2.theme, stylesOptions = _ref2.stylesOptions, stylesCreator = _ref2.stylesCreator, name = _ref2.name;
  if (stylesOptions.disableGeneration) {
    return;
  }
  var sheetManager = multiKeyStore$1.get(stylesOptions.sheetsManager, stylesCreator, theme);
  if (!sheetManager) {
    sheetManager = {
      refs: 0,
      staticSheet: null,
      dynamicStyles: null
    };
    multiKeyStore$1.set(stylesOptions.sheetsManager, stylesCreator, theme, sheetManager);
  }
  var options = _extends$f({}, stylesCreator.options, stylesOptions, {
    theme,
    flip: typeof stylesOptions.flip === "boolean" ? stylesOptions.flip : theme.direction === "rtl"
  });
  options.generateId = options.serverGenerateClassName || options.generateClassName;
  var sheetsRegistry = stylesOptions.sheetsRegistry;
  if (sheetManager.refs === 0) {
    var staticSheet;
    if (stylesOptions.sheetsCache) {
      staticSheet = multiKeyStore$1.get(stylesOptions.sheetsCache, stylesCreator, theme);
    }
    var styles7 = stylesCreator.create(theme, name);
    if (!staticSheet) {
      staticSheet = stylesOptions.jss.createStyleSheet(styles7, _extends$f({
        link: false
      }, options));
      staticSheet.attach();
      if (stylesOptions.sheetsCache) {
        multiKeyStore$1.set(stylesOptions.sheetsCache, stylesCreator, theme, staticSheet);
      }
    }
    if (sheetsRegistry) {
      sheetsRegistry.add(staticSheet);
    }
    sheetManager.staticSheet = staticSheet;
    sheetManager.dynamicStyles = getDynamicStyles(styles7);
  }
  if (sheetManager.dynamicStyles) {
    var dynamicSheet = stylesOptions.jss.createStyleSheet(sheetManager.dynamicStyles, _extends$f({
      link: true
    }, options));
    dynamicSheet.update(props);
    dynamicSheet.attach();
    state.dynamicSheet = dynamicSheet;
    state.classes = mergeClasses$2({
      baseClasses: sheetManager.staticSheet.classes,
      newClasses: dynamicSheet.classes
    });
    if (sheetsRegistry) {
      sheetsRegistry.add(dynamicSheet);
    }
  } else {
    state.classes = sheetManager.staticSheet.classes;
  }
  sheetManager.refs += 1;
}
function update(_ref3, props) {
  var state = _ref3.state;
  if (state.dynamicSheet) {
    state.dynamicSheet.update(props);
  }
}
function detach(_ref4) {
  var state = _ref4.state, theme = _ref4.theme, stylesOptions = _ref4.stylesOptions, stylesCreator = _ref4.stylesCreator;
  if (stylesOptions.disableGeneration) {
    return;
  }
  var sheetManager = multiKeyStore$1.get(stylesOptions.sheetsManager, stylesCreator, theme);
  sheetManager.refs -= 1;
  var sheetsRegistry = stylesOptions.sheetsRegistry;
  if (sheetManager.refs === 0) {
    multiKeyStore$1.delete(stylesOptions.sheetsManager, stylesCreator, theme);
    stylesOptions.jss.removeStyleSheet(sheetManager.staticSheet);
    if (sheetsRegistry) {
      sheetsRegistry.remove(sheetManager.staticSheet);
    }
  }
  if (state.dynamicSheet) {
    stylesOptions.jss.removeStyleSheet(state.dynamicSheet);
    if (sheetsRegistry) {
      sheetsRegistry.remove(state.dynamicSheet);
    }
  }
}
function useSynchronousEffect(func, values2) {
  var key = React__default.useRef([]);
  var output;
  var currentKey = React__default.useMemo(function() {
    return {};
  }, values2);
  if (key.current !== currentKey) {
    key.current = currentKey;
    output = func();
  }
  React__default.useEffect(function() {
    return function() {
      if (output) {
        output();
      }
    };
  }, [currentKey]);
}
function makeStyles(stylesOrCreator) {
  var options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  var name = options.name, classNamePrefixOption = options.classNamePrefix, Component2 = options.Component, _options$defaultTheme = options.defaultTheme, defaultTheme2 = _options$defaultTheme === void 0 ? noopTheme$1 : _options$defaultTheme, stylesOptions2 = _objectWithoutProperties$2(options, ["name", "classNamePrefix", "Component", "defaultTheme"]);
  var stylesCreator = getStylesCreator(stylesOrCreator);
  var classNamePrefix = name || classNamePrefixOption || "makeStyles";
  stylesCreator.options = {
    index: increment(),
    name,
    meta: classNamePrefix,
    classNamePrefix
  };
  var useStyles = function useStyles2() {
    var props = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    var theme = useTheme() || defaultTheme2;
    var stylesOptions = _extends$f({}, React__default.useContext(StylesContext), stylesOptions2);
    var instance = React__default.useRef();
    var shouldUpdate = React__default.useRef();
    useSynchronousEffect(function() {
      var current = {
        name,
        state: {},
        stylesCreator,
        stylesOptions,
        theme
      };
      attach(current, props);
      shouldUpdate.current = false;
      instance.current = current;
      return function() {
        detach(current);
      };
    }, [theme, stylesCreator]);
    React__default.useEffect(function() {
      if (shouldUpdate.current) {
        update(instance.current, props);
      }
      shouldUpdate.current = true;
    });
    var classes = getClasses(instance.current, props.classes, Component2);
    return classes;
  };
  return useStyles;
}
function toVal(mix) {
  var k2, y2, str = "";
  if (typeof mix === "string" || typeof mix === "number") {
    str += mix;
  } else if (typeof mix === "object") {
    if (Array.isArray(mix)) {
      for (k2 = 0; k2 < mix.length; k2++) {
        if (mix[k2]) {
          if (y2 = toVal(mix[k2])) {
            str && (str += " ");
            str += y2;
          }
        }
      }
    } else {
      for (k2 in mix) {
        if (mix[k2]) {
          str && (str += " ");
          str += k2;
        }
      }
    }
  }
  return str;
}
function clsx() {
  var i2 = 0, tmp, x2, str = "";
  while (i2 < arguments.length) {
    if (tmp = arguments[i2++]) {
      if (x2 = toVal(tmp)) {
        str && (str += " ");
        str += x2;
      }
    }
  }
  return str;
}
var reactIs$1 = { exports: {} };
var reactIs_production_min = {};
/** @license React v16.13.1
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var b$1 = typeof Symbol === "function" && Symbol.for, c$1 = b$1 ? Symbol.for("react.element") : 60103, d$1 = b$1 ? Symbol.for("react.portal") : 60106, e = b$1 ? Symbol.for("react.fragment") : 60107, f$1 = b$1 ? Symbol.for("react.strict_mode") : 60108, g$1 = b$1 ? Symbol.for("react.profiler") : 60114, h$1 = b$1 ? Symbol.for("react.provider") : 60109, k$1 = b$1 ? Symbol.for("react.context") : 60110, l$1 = b$1 ? Symbol.for("react.async_mode") : 60111, m = b$1 ? Symbol.for("react.concurrent_mode") : 60111, n$1 = b$1 ? Symbol.for("react.forward_ref") : 60112, p$1 = b$1 ? Symbol.for("react.suspense") : 60113, q$1 = b$1 ? Symbol.for("react.suspense_list") : 60120, r$1 = b$1 ? Symbol.for("react.memo") : 60115, t$1 = b$1 ? Symbol.for("react.lazy") : 60116, v$1 = b$1 ? Symbol.for("react.block") : 60121, w$1 = b$1 ? Symbol.for("react.fundamental") : 60117, x$1 = b$1 ? Symbol.for("react.responder") : 60118, y$1 = b$1 ? Symbol.for("react.scope") : 60119;
function z$1(a2) {
  if (typeof a2 === "object" && a2 !== null) {
    var u2 = a2.$$typeof;
    switch (u2) {
      case c$1:
        switch (a2 = a2.type, a2) {
          case l$1:
          case m:
          case e:
          case g$1:
          case f$1:
          case p$1:
            return a2;
          default:
            switch (a2 = a2 && a2.$$typeof, a2) {
              case k$1:
              case n$1:
              case t$1:
              case r$1:
              case h$1:
                return a2;
              default:
                return u2;
            }
        }
      case d$1:
        return u2;
    }
  }
}
function A$1(a2) {
  return z$1(a2) === m;
}
reactIs_production_min.AsyncMode = l$1;
reactIs_production_min.ConcurrentMode = m;
reactIs_production_min.ContextConsumer = k$1;
reactIs_production_min.ContextProvider = h$1;
reactIs_production_min.Element = c$1;
reactIs_production_min.ForwardRef = n$1;
reactIs_production_min.Fragment = e;
reactIs_production_min.Lazy = t$1;
reactIs_production_min.Memo = r$1;
reactIs_production_min.Portal = d$1;
reactIs_production_min.Profiler = g$1;
reactIs_production_min.StrictMode = f$1;
reactIs_production_min.Suspense = p$1;
reactIs_production_min.isAsyncMode = function(a2) {
  return A$1(a2) || z$1(a2) === l$1;
};
reactIs_production_min.isConcurrentMode = A$1;
reactIs_production_min.isContextConsumer = function(a2) {
  return z$1(a2) === k$1;
};
reactIs_production_min.isContextProvider = function(a2) {
  return z$1(a2) === h$1;
};
reactIs_production_min.isElement = function(a2) {
  return typeof a2 === "object" && a2 !== null && a2.$$typeof === c$1;
};
reactIs_production_min.isForwardRef = function(a2) {
  return z$1(a2) === n$1;
};
reactIs_production_min.isFragment = function(a2) {
  return z$1(a2) === e;
};
reactIs_production_min.isLazy = function(a2) {
  return z$1(a2) === t$1;
};
reactIs_production_min.isMemo = function(a2) {
  return z$1(a2) === r$1;
};
reactIs_production_min.isPortal = function(a2) {
  return z$1(a2) === d$1;
};
reactIs_production_min.isProfiler = function(a2) {
  return z$1(a2) === g$1;
};
reactIs_production_min.isStrictMode = function(a2) {
  return z$1(a2) === f$1;
};
reactIs_production_min.isSuspense = function(a2) {
  return z$1(a2) === p$1;
};
reactIs_production_min.isValidElementType = function(a2) {
  return typeof a2 === "string" || typeof a2 === "function" || a2 === e || a2 === m || a2 === g$1 || a2 === f$1 || a2 === p$1 || a2 === q$1 || typeof a2 === "object" && a2 !== null && (a2.$$typeof === t$1 || a2.$$typeof === r$1 || a2.$$typeof === h$1 || a2.$$typeof === k$1 || a2.$$typeof === n$1 || a2.$$typeof === w$1 || a2.$$typeof === x$1 || a2.$$typeof === y$1 || a2.$$typeof === v$1);
};
reactIs_production_min.typeOf = z$1;
{
  reactIs$1.exports = reactIs_production_min;
}
var reactIs = reactIs$1.exports;
var REACT_STATICS = {
  childContextTypes: true,
  contextType: true,
  contextTypes: true,
  defaultProps: true,
  displayName: true,
  getDefaultProps: true,
  getDerivedStateFromError: true,
  getDerivedStateFromProps: true,
  mixins: true,
  propTypes: true,
  type: true
};
var KNOWN_STATICS = {
  name: true,
  length: true,
  prototype: true,
  caller: true,
  callee: true,
  arguments: true,
  arity: true
};
var FORWARD_REF_STATICS = {
  "$$typeof": true,
  render: true,
  defaultProps: true,
  displayName: true,
  propTypes: true
};
var MEMO_STATICS = {
  "$$typeof": true,
  compare: true,
  defaultProps: true,
  displayName: true,
  propTypes: true,
  type: true
};
var TYPE_STATICS = {};
TYPE_STATICS[reactIs.ForwardRef] = FORWARD_REF_STATICS;
TYPE_STATICS[reactIs.Memo] = MEMO_STATICS;
function getStatics(component) {
  if (reactIs.isMemo(component)) {
    return MEMO_STATICS;
  }
  return TYPE_STATICS[component["$$typeof"]] || REACT_STATICS;
}
var defineProperty$4 = Object.defineProperty;
var getOwnPropertyNames = Object.getOwnPropertyNames;
var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
var getPrototypeOf = Object.getPrototypeOf;
var objectPrototype = Object.prototype;
function hoistNonReactStatics(targetComponent, sourceComponent, blacklist) {
  if (typeof sourceComponent !== "string") {
    if (objectPrototype) {
      var inheritedComponent = getPrototypeOf(sourceComponent);
      if (inheritedComponent && inheritedComponent !== objectPrototype) {
        hoistNonReactStatics(targetComponent, inheritedComponent, blacklist);
      }
    }
    var keys2 = getOwnPropertyNames(sourceComponent);
    if (getOwnPropertySymbols) {
      keys2 = keys2.concat(getOwnPropertySymbols(sourceComponent));
    }
    var targetStatics = getStatics(targetComponent);
    var sourceStatics = getStatics(sourceComponent);
    for (var i2 = 0; i2 < keys2.length; ++i2) {
      var key = keys2[i2];
      if (!KNOWN_STATICS[key] && !(blacklist && blacklist[key]) && !(sourceStatics && sourceStatics[key]) && !(targetStatics && targetStatics[key])) {
        var descriptor = getOwnPropertyDescriptor(sourceComponent, key);
        try {
          defineProperty$4(targetComponent, key, descriptor);
        } catch (e2) {
        }
      }
    }
  }
  return targetComponent;
}
var hoistNonReactStatics_cjs = hoistNonReactStatics;
var withStyles$1 = function withStyles(stylesOrCreator) {
  var options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  return function(Component2) {
    var defaultTheme2 = options.defaultTheme, _options$withTheme = options.withTheme, withTheme = _options$withTheme === void 0 ? false : _options$withTheme, name = options.name, stylesOptions = _objectWithoutProperties$2(options, ["defaultTheme", "withTheme", "name"]);
    var classNamePrefix = name;
    var useStyles = makeStyles(stylesOrCreator, _extends$f({
      defaultTheme: defaultTheme2,
      Component: Component2,
      name: name || Component2.displayName,
      classNamePrefix
    }, stylesOptions));
    var WithStyles = /* @__PURE__ */ React__default.forwardRef(function WithStyles2(props, ref) {
      props.classes;
      var innerRef = props.innerRef, other = _objectWithoutProperties$2(props, ["classes", "innerRef"]);
      var classes = useStyles(_extends$f({}, Component2.defaultProps, props));
      var theme;
      var more = other;
      if (typeof name === "string" || withTheme) {
        theme = useTheme() || defaultTheme2;
        if (name) {
          more = getThemeProps({
            theme,
            name,
            props: other
          });
        }
        if (withTheme && !more.theme) {
          more.theme = theme;
        }
      }
      return /* @__PURE__ */ React__default.createElement(Component2, _extends$f({
        ref: innerRef || ref,
        classes
      }, more));
    });
    hoistNonReactStatics_cjs(WithStyles, Component2);
    return WithStyles;
  };
};
var withStylesWithoutDefault = withStyles$1;
var defaultTheme = createTheme();
var defaultTheme$1 = defaultTheme;
function withStyles2(stylesOrCreator, options) {
  return withStylesWithoutDefault(stylesOrCreator, _extends$f({
    defaultTheme: defaultTheme$1
  }, options));
}
function capitalize(string) {
  if (typeof string !== "string") {
    throw new Error(formatMuiErrorMessage(7));
  }
  return string.charAt(0).toUpperCase() + string.slice(1);
}
function debounce$1(func) {
  var wait = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 166;
  var timeout;
  function debounced() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    var that = this;
    var later = function later2() {
      func.apply(that, args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  }
  debounced.clear = function() {
    clearTimeout(timeout);
  };
  return debounced;
}
function setRef(ref, value) {
  if (typeof ref === "function") {
    ref(value);
  } else if (ref) {
    ref.current = value;
  }
}
var useEnhancedEffect$3 = typeof window !== "undefined" ? React.useLayoutEffect : React.useEffect;
function useEventCallback(fn2) {
  var ref = React.useRef(fn2);
  useEnhancedEffect$3(function() {
    ref.current = fn2;
  });
  return React.useCallback(function() {
    return ref.current.apply(void 0, arguments);
  }, []);
}
function useForkRef(refA, refB) {
  return React.useMemo(function() {
    if (refA == null && refB == null) {
      return null;
    }
    return function(refValue) {
      setRef(refA, refValue);
      setRef(refB, refValue);
    };
  }, [refA, refB]);
}
var hadKeyboardEvent = true;
var hadFocusVisibleRecently = false;
var hadFocusVisibleRecentlyTimeout = null;
var inputTypesWhitelist = {
  text: true,
  search: true,
  url: true,
  tel: true,
  email: true,
  password: true,
  number: true,
  date: true,
  month: true,
  week: true,
  time: true,
  datetime: true,
  "datetime-local": true
};
function focusTriggersKeyboardModality(node) {
  var type = node.type, tagName = node.tagName;
  if (tagName === "INPUT" && inputTypesWhitelist[type] && !node.readOnly) {
    return true;
  }
  if (tagName === "TEXTAREA" && !node.readOnly) {
    return true;
  }
  if (node.isContentEditable) {
    return true;
  }
  return false;
}
function handleKeyDown(event) {
  if (event.metaKey || event.altKey || event.ctrlKey) {
    return;
  }
  hadKeyboardEvent = true;
}
function handlePointerDown() {
  hadKeyboardEvent = false;
}
function handleVisibilityChange() {
  if (this.visibilityState === "hidden") {
    if (hadFocusVisibleRecently) {
      hadKeyboardEvent = true;
    }
  }
}
function prepare(doc) {
  doc.addEventListener("keydown", handleKeyDown, true);
  doc.addEventListener("mousedown", handlePointerDown, true);
  doc.addEventListener("pointerdown", handlePointerDown, true);
  doc.addEventListener("touchstart", handlePointerDown, true);
  doc.addEventListener("visibilitychange", handleVisibilityChange, true);
}
function isFocusVisible(event) {
  var target = event.target;
  try {
    return target.matches(":focus-visible");
  } catch (error) {
  }
  return hadKeyboardEvent || focusTriggersKeyboardModality(target);
}
function handleBlurVisible() {
  hadFocusVisibleRecently = true;
  window.clearTimeout(hadFocusVisibleRecentlyTimeout);
  hadFocusVisibleRecentlyTimeout = window.setTimeout(function() {
    hadFocusVisibleRecently = false;
  }, 100);
}
function useIsFocusVisible() {
  var ref = React.useCallback(function(instance) {
    var node = ReactDOM.findDOMNode(instance);
    if (node != null) {
      prepare(node.ownerDocument);
    }
  }, []);
  return {
    isFocusVisible,
    onBlurVisible: handleBlurVisible,
    ref
  };
}
var TransitionGroupContext = React__default.createContext(null);
function getChildMapping(children, mapFn) {
  var mapper = function mapper2(child) {
    return mapFn && isValidElement(child) ? mapFn(child) : child;
  };
  var result = Object.create(null);
  if (children)
    Children.map(children, function(c2) {
      return c2;
    }).forEach(function(child) {
      result[child.key] = mapper(child);
    });
  return result;
}
function mergeChildMappings(prev, next) {
  prev = prev || {};
  next = next || {};
  function getValueForKey(key) {
    return key in next ? next[key] : prev[key];
  }
  var nextKeysPending = Object.create(null);
  var pendingKeys = [];
  for (var prevKey in prev) {
    if (prevKey in next) {
      if (pendingKeys.length) {
        nextKeysPending[prevKey] = pendingKeys;
        pendingKeys = [];
      }
    } else {
      pendingKeys.push(prevKey);
    }
  }
  var i2;
  var childMapping = {};
  for (var nextKey in next) {
    if (nextKeysPending[nextKey]) {
      for (i2 = 0; i2 < nextKeysPending[nextKey].length; i2++) {
        var pendingNextKey = nextKeysPending[nextKey][i2];
        childMapping[nextKeysPending[nextKey][i2]] = getValueForKey(pendingNextKey);
      }
    }
    childMapping[nextKey] = getValueForKey(nextKey);
  }
  for (i2 = 0; i2 < pendingKeys.length; i2++) {
    childMapping[pendingKeys[i2]] = getValueForKey(pendingKeys[i2]);
  }
  return childMapping;
}
function getProp(child, prop, props) {
  return props[prop] != null ? props[prop] : child.props[prop];
}
function getInitialChildMapping(props, onExited) {
  return getChildMapping(props.children, function(child) {
    return cloneElement(child, {
      onExited: onExited.bind(null, child),
      in: true,
      appear: getProp(child, "appear", props),
      enter: getProp(child, "enter", props),
      exit: getProp(child, "exit", props)
    });
  });
}
function getNextChildMapping(nextProps, prevChildMapping, onExited) {
  var nextChildMapping = getChildMapping(nextProps.children);
  var children = mergeChildMappings(prevChildMapping, nextChildMapping);
  Object.keys(children).forEach(function(key) {
    var child = children[key];
    if (!isValidElement(child))
      return;
    var hasPrev = key in prevChildMapping;
    var hasNext = key in nextChildMapping;
    var prevChild = prevChildMapping[key];
    var isLeaving = isValidElement(prevChild) && !prevChild.props.in;
    if (hasNext && (!hasPrev || isLeaving)) {
      children[key] = cloneElement(child, {
        onExited: onExited.bind(null, child),
        in: true,
        exit: getProp(child, "exit", nextProps),
        enter: getProp(child, "enter", nextProps)
      });
    } else if (!hasNext && hasPrev && !isLeaving) {
      children[key] = cloneElement(child, {
        in: false
      });
    } else if (hasNext && hasPrev && isValidElement(prevChild)) {
      children[key] = cloneElement(child, {
        onExited: onExited.bind(null, child),
        in: prevChild.props.in,
        exit: getProp(child, "exit", nextProps),
        enter: getProp(child, "enter", nextProps)
      });
    }
  });
  return children;
}
var values = Object.values || function(obj) {
  return Object.keys(obj).map(function(k2) {
    return obj[k2];
  });
};
var defaultProps = {
  component: "div",
  childFactory: function childFactory(child) {
    return child;
  }
};
var TransitionGroup = /* @__PURE__ */ function(_React$Component) {
  _inheritsLoose(TransitionGroup2, _React$Component);
  function TransitionGroup2(props, context) {
    var _this;
    _this = _React$Component.call(this, props, context) || this;
    var handleExited = _this.handleExited.bind(_assertThisInitialized(_this));
    _this.state = {
      contextValue: {
        isMounting: true
      },
      handleExited,
      firstRender: true
    };
    return _this;
  }
  var _proto = TransitionGroup2.prototype;
  _proto.componentDidMount = function componentDidMount() {
    this.mounted = true;
    this.setState({
      contextValue: {
        isMounting: false
      }
    });
  };
  _proto.componentWillUnmount = function componentWillUnmount() {
    this.mounted = false;
  };
  TransitionGroup2.getDerivedStateFromProps = function getDerivedStateFromProps(nextProps, _ref) {
    var prevChildMapping = _ref.children, handleExited = _ref.handleExited, firstRender = _ref.firstRender;
    return {
      children: firstRender ? getInitialChildMapping(nextProps, handleExited) : getNextChildMapping(nextProps, prevChildMapping, handleExited),
      firstRender: false
    };
  };
  _proto.handleExited = function handleExited(child, node) {
    var currentChildMapping = getChildMapping(this.props.children);
    if (child.key in currentChildMapping)
      return;
    if (child.props.onExited) {
      child.props.onExited(node);
    }
    if (this.mounted) {
      this.setState(function(state) {
        var children = _extends$f({}, state.children);
        delete children[child.key];
        return {
          children
        };
      });
    }
  };
  _proto.render = function render3() {
    var _this$props = this.props, Component2 = _this$props.component, childFactory2 = _this$props.childFactory, props = _objectWithoutPropertiesLoose(_this$props, ["component", "childFactory"]);
    var contextValue = this.state.contextValue;
    var children = values(this.state.children).map(childFactory2);
    delete props.appear;
    delete props.enter;
    delete props.exit;
    if (Component2 === null) {
      return /* @__PURE__ */ React__default.createElement(TransitionGroupContext.Provider, {
        value: contextValue
      }, children);
    }
    return /* @__PURE__ */ React__default.createElement(TransitionGroupContext.Provider, {
      value: contextValue
    }, /* @__PURE__ */ React__default.createElement(Component2, props, children));
  };
  return TransitionGroup2;
}(React__default.Component);
TransitionGroup.propTypes = {};
TransitionGroup.defaultProps = defaultProps;
var TransitionGroup$1 = TransitionGroup;
var useEnhancedEffect$2 = typeof window === "undefined" ? React.useEffect : React.useLayoutEffect;
function Ripple(props) {
  var classes = props.classes, _props$pulsate = props.pulsate, pulsate = _props$pulsate === void 0 ? false : _props$pulsate, rippleX = props.rippleX, rippleY = props.rippleY, rippleSize = props.rippleSize, inProp = props.in, _props$onExited = props.onExited, onExited = _props$onExited === void 0 ? function() {
  } : _props$onExited, timeout = props.timeout;
  var _React$useState = React.useState(false), leaving = _React$useState[0], setLeaving = _React$useState[1];
  var rippleClassName = clsx(classes.ripple, classes.rippleVisible, pulsate && classes.ripplePulsate);
  var rippleStyles = {
    width: rippleSize,
    height: rippleSize,
    top: -(rippleSize / 2) + rippleY,
    left: -(rippleSize / 2) + rippleX
  };
  var childClassName = clsx(classes.child, leaving && classes.childLeaving, pulsate && classes.childPulsate);
  var handleExited = useEventCallback(onExited);
  useEnhancedEffect$2(function() {
    if (!inProp) {
      setLeaving(true);
      var timeoutId = setTimeout(handleExited, timeout);
      return function() {
        clearTimeout(timeoutId);
      };
    }
    return void 0;
  }, [handleExited, inProp, timeout]);
  return /* @__PURE__ */ React.createElement("span", {
    className: rippleClassName,
    style: rippleStyles
  }, /* @__PURE__ */ React.createElement("span", {
    className: childClassName
  }));
}
var DURATION = 550;
var DELAY_RIPPLE = 80;
var styles$7 = function styles(theme) {
  return {
    root: {
      overflow: "hidden",
      pointerEvents: "none",
      position: "absolute",
      zIndex: 0,
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      borderRadius: "inherit"
    },
    ripple: {
      opacity: 0,
      position: "absolute"
    },
    rippleVisible: {
      opacity: 0.3,
      transform: "scale(1)",
      animation: "$enter ".concat(DURATION, "ms ").concat(theme.transitions.easing.easeInOut)
    },
    ripplePulsate: {
      animationDuration: "".concat(theme.transitions.duration.shorter, "ms")
    },
    child: {
      opacity: 1,
      display: "block",
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      backgroundColor: "currentColor"
    },
    childLeaving: {
      opacity: 0,
      animation: "$exit ".concat(DURATION, "ms ").concat(theme.transitions.easing.easeInOut)
    },
    childPulsate: {
      position: "absolute",
      left: 0,
      top: 0,
      animation: "$pulsate 2500ms ".concat(theme.transitions.easing.easeInOut, " 200ms infinite")
    },
    "@keyframes enter": {
      "0%": {
        transform: "scale(0)",
        opacity: 0.1
      },
      "100%": {
        transform: "scale(1)",
        opacity: 0.3
      }
    },
    "@keyframes exit": {
      "0%": {
        opacity: 1
      },
      "100%": {
        opacity: 0
      }
    },
    "@keyframes pulsate": {
      "0%": {
        transform: "scale(1)"
      },
      "50%": {
        transform: "scale(0.92)"
      },
      "100%": {
        transform: "scale(1)"
      }
    }
  };
};
var TouchRipple = /* @__PURE__ */ React.forwardRef(function TouchRipple2(props, ref) {
  var _props$center = props.center, centerProp = _props$center === void 0 ? false : _props$center, classes = props.classes, className = props.className, other = _objectWithoutProperties$2(props, ["center", "classes", "className"]);
  var _React$useState = React.useState([]), ripples = _React$useState[0], setRipples = _React$useState[1];
  var nextKey = React.useRef(0);
  var rippleCallback = React.useRef(null);
  React.useEffect(function() {
    if (rippleCallback.current) {
      rippleCallback.current();
      rippleCallback.current = null;
    }
  }, [ripples]);
  var ignoringMouseDown = React.useRef(false);
  var startTimer = React.useRef(null);
  var startTimerCommit = React.useRef(null);
  var container = React.useRef(null);
  React.useEffect(function() {
    return function() {
      clearTimeout(startTimer.current);
    };
  }, []);
  var startCommit = React.useCallback(function(params) {
    var pulsate2 = params.pulsate, rippleX = params.rippleX, rippleY = params.rippleY, rippleSize = params.rippleSize, cb = params.cb;
    setRipples(function(oldRipples) {
      return [].concat(_toConsumableArray(oldRipples), [/* @__PURE__ */ React.createElement(Ripple, {
        key: nextKey.current,
        classes,
        timeout: DURATION,
        pulsate: pulsate2,
        rippleX,
        rippleY,
        rippleSize
      })]);
    });
    nextKey.current += 1;
    rippleCallback.current = cb;
  }, [classes]);
  var start = React.useCallback(function() {
    var event = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    var options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    var cb = arguments.length > 2 ? arguments[2] : void 0;
    var _options$pulsate = options.pulsate, pulsate2 = _options$pulsate === void 0 ? false : _options$pulsate, _options$center = options.center, center = _options$center === void 0 ? centerProp || options.pulsate : _options$center, _options$fakeElement = options.fakeElement, fakeElement = _options$fakeElement === void 0 ? false : _options$fakeElement;
    if (event.type === "mousedown" && ignoringMouseDown.current) {
      ignoringMouseDown.current = false;
      return;
    }
    if (event.type === "touchstart") {
      ignoringMouseDown.current = true;
    }
    var element = fakeElement ? null : container.current;
    var rect = element ? element.getBoundingClientRect() : {
      width: 0,
      height: 0,
      left: 0,
      top: 0
    };
    var rippleX;
    var rippleY;
    var rippleSize;
    if (center || event.clientX === 0 && event.clientY === 0 || !event.clientX && !event.touches) {
      rippleX = Math.round(rect.width / 2);
      rippleY = Math.round(rect.height / 2);
    } else {
      var _ref = event.touches ? event.touches[0] : event, clientX = _ref.clientX, clientY = _ref.clientY;
      rippleX = Math.round(clientX - rect.left);
      rippleY = Math.round(clientY - rect.top);
    }
    if (center) {
      rippleSize = Math.sqrt((2 * Math.pow(rect.width, 2) + Math.pow(rect.height, 2)) / 3);
      if (rippleSize % 2 === 0) {
        rippleSize += 1;
      }
    } else {
      var sizeX = Math.max(Math.abs((element ? element.clientWidth : 0) - rippleX), rippleX) * 2 + 2;
      var sizeY = Math.max(Math.abs((element ? element.clientHeight : 0) - rippleY), rippleY) * 2 + 2;
      rippleSize = Math.sqrt(Math.pow(sizeX, 2) + Math.pow(sizeY, 2));
    }
    if (event.touches) {
      if (startTimerCommit.current === null) {
        startTimerCommit.current = function() {
          startCommit({
            pulsate: pulsate2,
            rippleX,
            rippleY,
            rippleSize,
            cb
          });
        };
        startTimer.current = setTimeout(function() {
          if (startTimerCommit.current) {
            startTimerCommit.current();
            startTimerCommit.current = null;
          }
        }, DELAY_RIPPLE);
      }
    } else {
      startCommit({
        pulsate: pulsate2,
        rippleX,
        rippleY,
        rippleSize,
        cb
      });
    }
  }, [centerProp, startCommit]);
  var pulsate = React.useCallback(function() {
    start({}, {
      pulsate: true
    });
  }, [start]);
  var stop = React.useCallback(function(event, cb) {
    clearTimeout(startTimer.current);
    if (event.type === "touchend" && startTimerCommit.current) {
      event.persist();
      startTimerCommit.current();
      startTimerCommit.current = null;
      startTimer.current = setTimeout(function() {
        stop(event, cb);
      });
      return;
    }
    startTimerCommit.current = null;
    setRipples(function(oldRipples) {
      if (oldRipples.length > 0) {
        return oldRipples.slice(1);
      }
      return oldRipples;
    });
    rippleCallback.current = cb;
  }, []);
  React.useImperativeHandle(ref, function() {
    return {
      pulsate,
      start,
      stop
    };
  }, [pulsate, start, stop]);
  return /* @__PURE__ */ React.createElement("span", _extends$f({
    className: clsx(classes.root, className),
    ref: container
  }, other), /* @__PURE__ */ React.createElement(TransitionGroup$1, {
    component: null,
    exit: true
  }, ripples));
});
var TouchRipple$1 = withStyles2(styles$7, {
  flip: false,
  name: "MuiTouchRipple"
})(/* @__PURE__ */ React.memo(TouchRipple));
var styles$6 = {
  root: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    WebkitTapHighlightColor: "transparent",
    backgroundColor: "transparent",
    outline: 0,
    border: 0,
    margin: 0,
    borderRadius: 0,
    padding: 0,
    cursor: "pointer",
    userSelect: "none",
    verticalAlign: "middle",
    "-moz-appearance": "none",
    "-webkit-appearance": "none",
    textDecoration: "none",
    color: "inherit",
    "&::-moz-focus-inner": {
      borderStyle: "none"
    },
    "&$disabled": {
      pointerEvents: "none",
      cursor: "default"
    },
    "@media print": {
      colorAdjust: "exact"
    }
  },
  disabled: {},
  focusVisible: {}
};
var ButtonBase = /* @__PURE__ */ React.forwardRef(function ButtonBase2(props, ref) {
  var action = props.action, buttonRefProp = props.buttonRef, _props$centerRipple = props.centerRipple, centerRipple = _props$centerRipple === void 0 ? false : _props$centerRipple, children = props.children, classes = props.classes, className = props.className, _props$component = props.component, component = _props$component === void 0 ? "button" : _props$component, _props$disabled = props.disabled, disabled = _props$disabled === void 0 ? false : _props$disabled, _props$disableRipple = props.disableRipple, disableRipple = _props$disableRipple === void 0 ? false : _props$disableRipple, _props$disableTouchRi = props.disableTouchRipple, disableTouchRipple = _props$disableTouchRi === void 0 ? false : _props$disableTouchRi, _props$focusRipple = props.focusRipple, focusRipple = _props$focusRipple === void 0 ? false : _props$focusRipple, focusVisibleClassName = props.focusVisibleClassName, onBlur = props.onBlur, onClick = props.onClick, onFocus = props.onFocus, onFocusVisible = props.onFocusVisible, onKeyDown = props.onKeyDown, onKeyUp = props.onKeyUp, onMouseDown = props.onMouseDown, onMouseLeave = props.onMouseLeave, onMouseUp = props.onMouseUp, onTouchEnd = props.onTouchEnd, onTouchMove = props.onTouchMove, onTouchStart = props.onTouchStart, onDragLeave = props.onDragLeave, _props$tabIndex = props.tabIndex, tabIndex = _props$tabIndex === void 0 ? 0 : _props$tabIndex, TouchRippleProps = props.TouchRippleProps, _props$type = props.type, type = _props$type === void 0 ? "button" : _props$type, other = _objectWithoutProperties$2(props, ["action", "buttonRef", "centerRipple", "children", "classes", "className", "component", "disabled", "disableRipple", "disableTouchRipple", "focusRipple", "focusVisibleClassName", "onBlur", "onClick", "onFocus", "onFocusVisible", "onKeyDown", "onKeyUp", "onMouseDown", "onMouseLeave", "onMouseUp", "onTouchEnd", "onTouchMove", "onTouchStart", "onDragLeave", "tabIndex", "TouchRippleProps", "type"]);
  var buttonRef = React.useRef(null);
  function getButtonNode() {
    return ReactDOM.findDOMNode(buttonRef.current);
  }
  var rippleRef = React.useRef(null);
  var _React$useState = React.useState(false), focusVisible = _React$useState[0], setFocusVisible = _React$useState[1];
  if (disabled && focusVisible) {
    setFocusVisible(false);
  }
  var _useIsFocusVisible = useIsFocusVisible(), isFocusVisible2 = _useIsFocusVisible.isFocusVisible, onBlurVisible = _useIsFocusVisible.onBlurVisible, focusVisibleRef = _useIsFocusVisible.ref;
  React.useImperativeHandle(action, function() {
    return {
      focusVisible: function focusVisible2() {
        setFocusVisible(true);
        buttonRef.current.focus();
      }
    };
  }, []);
  React.useEffect(function() {
    if (focusVisible && focusRipple && !disableRipple) {
      rippleRef.current.pulsate();
    }
  }, [disableRipple, focusRipple, focusVisible]);
  function useRippleHandler(rippleAction, eventCallback) {
    var skipRippleAction = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : disableTouchRipple;
    return useEventCallback(function(event) {
      if (eventCallback) {
        eventCallback(event);
      }
      var ignore = skipRippleAction;
      if (!ignore && rippleRef.current) {
        rippleRef.current[rippleAction](event);
      }
      return true;
    });
  }
  var handleMouseDown = useRippleHandler("start", onMouseDown);
  var handleDragLeave = useRippleHandler("stop", onDragLeave);
  var handleMouseUp = useRippleHandler("stop", onMouseUp);
  var handleMouseLeave = useRippleHandler("stop", function(event) {
    if (focusVisible) {
      event.preventDefault();
    }
    if (onMouseLeave) {
      onMouseLeave(event);
    }
  });
  var handleTouchStart = useRippleHandler("start", onTouchStart);
  var handleTouchEnd = useRippleHandler("stop", onTouchEnd);
  var handleTouchMove = useRippleHandler("stop", onTouchMove);
  var handleBlur = useRippleHandler("stop", function(event) {
    if (focusVisible) {
      onBlurVisible(event);
      setFocusVisible(false);
    }
    if (onBlur) {
      onBlur(event);
    }
  }, false);
  var handleFocus3 = useEventCallback(function(event) {
    if (!buttonRef.current) {
      buttonRef.current = event.currentTarget;
    }
    if (isFocusVisible2(event)) {
      setFocusVisible(true);
      if (onFocusVisible) {
        onFocusVisible(event);
      }
    }
    if (onFocus) {
      onFocus(event);
    }
  });
  var isNonNativeButton = function isNonNativeButton2() {
    var button = getButtonNode();
    return component && component !== "button" && !(button.tagName === "A" && button.href);
  };
  var keydownRef = React.useRef(false);
  var handleKeyDown2 = useEventCallback(function(event) {
    if (focusRipple && !keydownRef.current && focusVisible && rippleRef.current && event.key === " ") {
      keydownRef.current = true;
      event.persist();
      rippleRef.current.stop(event, function() {
        rippleRef.current.start(event);
      });
    }
    if (event.target === event.currentTarget && isNonNativeButton() && event.key === " ") {
      event.preventDefault();
    }
    if (onKeyDown) {
      onKeyDown(event);
    }
    if (event.target === event.currentTarget && isNonNativeButton() && event.key === "Enter" && !disabled) {
      event.preventDefault();
      if (onClick) {
        onClick(event);
      }
    }
  });
  var handleKeyUp = useEventCallback(function(event) {
    if (focusRipple && event.key === " " && rippleRef.current && focusVisible && !event.defaultPrevented) {
      keydownRef.current = false;
      event.persist();
      rippleRef.current.stop(event, function() {
        rippleRef.current.pulsate(event);
      });
    }
    if (onKeyUp) {
      onKeyUp(event);
    }
    if (onClick && event.target === event.currentTarget && isNonNativeButton() && event.key === " " && !event.defaultPrevented) {
      onClick(event);
    }
  });
  var ComponentProp = component;
  if (ComponentProp === "button" && other.href) {
    ComponentProp = "a";
  }
  var buttonProps = {};
  if (ComponentProp === "button") {
    buttonProps.type = type;
    buttonProps.disabled = disabled;
  } else {
    if (ComponentProp !== "a" || !other.href) {
      buttonProps.role = "button";
    }
    buttonProps["aria-disabled"] = disabled;
  }
  var handleUserRef = useForkRef(buttonRefProp, ref);
  var handleOwnRef = useForkRef(focusVisibleRef, buttonRef);
  var handleRef = useForkRef(handleUserRef, handleOwnRef);
  var _React$useState2 = React.useState(false), mountedState = _React$useState2[0], setMountedState = _React$useState2[1];
  React.useEffect(function() {
    setMountedState(true);
  }, []);
  var enableTouchRipple = mountedState && !disableRipple && !disabled;
  return /* @__PURE__ */ React.createElement(ComponentProp, _extends$f({
    className: clsx(classes.root, className, focusVisible && [classes.focusVisible, focusVisibleClassName], disabled && classes.disabled),
    onBlur: handleBlur,
    onClick,
    onFocus: handleFocus3,
    onKeyDown: handleKeyDown2,
    onKeyUp: handleKeyUp,
    onMouseDown: handleMouseDown,
    onMouseLeave: handleMouseLeave,
    onMouseUp: handleMouseUp,
    onDragLeave: handleDragLeave,
    onTouchEnd: handleTouchEnd,
    onTouchMove: handleTouchMove,
    onTouchStart: handleTouchStart,
    ref: handleRef,
    tabIndex: disabled ? -1 : tabIndex
  }, buttonProps, other), children, enableTouchRipple ? /* @__PURE__ */ React.createElement(TouchRipple$1, _extends$f({
    ref: rippleRef,
    center: centerRipple
  }, TouchRippleProps)) : null);
});
var ButtonBase$1 = withStyles2(styles$6, {
  name: "MuiButtonBase"
})(ButtonBase);
var styles$5 = function styles2(theme) {
  return {
    root: {
      textAlign: "center",
      flex: "0 0 auto",
      fontSize: theme.typography.pxToRem(24),
      padding: 12,
      borderRadius: "50%",
      overflow: "visible",
      color: theme.palette.action.active,
      transition: theme.transitions.create("background-color", {
        duration: theme.transitions.duration.shortest
      }),
      "&:hover": {
        backgroundColor: alpha(theme.palette.action.active, theme.palette.action.hoverOpacity),
        "@media (hover: none)": {
          backgroundColor: "transparent"
        }
      },
      "&$disabled": {
        backgroundColor: "transparent",
        color: theme.palette.action.disabled
      }
    },
    edgeStart: {
      marginLeft: -12,
      "$sizeSmall&": {
        marginLeft: -3
      }
    },
    edgeEnd: {
      marginRight: -12,
      "$sizeSmall&": {
        marginRight: -3
      }
    },
    colorInherit: {
      color: "inherit"
    },
    colorPrimary: {
      color: theme.palette.primary.main,
      "&:hover": {
        backgroundColor: alpha(theme.palette.primary.main, theme.palette.action.hoverOpacity),
        "@media (hover: none)": {
          backgroundColor: "transparent"
        }
      }
    },
    colorSecondary: {
      color: theme.palette.secondary.main,
      "&:hover": {
        backgroundColor: alpha(theme.palette.secondary.main, theme.palette.action.hoverOpacity),
        "@media (hover: none)": {
          backgroundColor: "transparent"
        }
      }
    },
    disabled: {},
    sizeSmall: {
      padding: 3,
      fontSize: theme.typography.pxToRem(18)
    },
    label: {
      width: "100%",
      display: "flex",
      alignItems: "inherit",
      justifyContent: "inherit"
    }
  };
};
var IconButton = /* @__PURE__ */ React.forwardRef(function IconButton2(props, ref) {
  var _props$edge = props.edge, edge = _props$edge === void 0 ? false : _props$edge, children = props.children, classes = props.classes, className = props.className, _props$color = props.color, color = _props$color === void 0 ? "default" : _props$color, _props$disabled = props.disabled, disabled = _props$disabled === void 0 ? false : _props$disabled, _props$disableFocusRi = props.disableFocusRipple, disableFocusRipple = _props$disableFocusRi === void 0 ? false : _props$disableFocusRi, _props$size = props.size, size = _props$size === void 0 ? "medium" : _props$size, other = _objectWithoutProperties$2(props, ["edge", "children", "classes", "className", "color", "disabled", "disableFocusRipple", "size"]);
  return /* @__PURE__ */ React.createElement(ButtonBase$1, _extends$f({
    className: clsx(classes.root, className, color !== "default" && classes["color".concat(capitalize(color))], disabled && classes.disabled, size === "small" && classes["size".concat(capitalize(size))], {
      "start": classes.edgeStart,
      "end": classes.edgeEnd
    }[edge]),
    centerRipple: true,
    focusRipple: !disableFocusRipple,
    disabled,
    ref
  }, other), /* @__PURE__ */ React.createElement("span", {
    className: classes.label
  }, children));
});
var IconButton$1 = withStyles2(styles$5, {
  name: "MuiIconButton"
})(IconButton);
var FormControlContext = React.createContext();
function useFormControl() {
  return React.useContext(FormControlContext);
}
var FormControlContext$1 = FormControlContext;
function formControlState(_ref) {
  var props = _ref.props, states = _ref.states, muiFormControl = _ref.muiFormControl;
  return states.reduce(function(acc, state) {
    acc[state] = props[state];
    if (muiFormControl) {
      if (typeof props[state] === "undefined") {
        acc[state] = muiFormControl[state];
      }
    }
    return acc;
  }, {});
}
function getStyleValue(computedStyle, property2) {
  return parseInt(computedStyle[property2], 10) || 0;
}
var useEnhancedEffect$1 = typeof window !== "undefined" ? React.useLayoutEffect : React.useEffect;
var styles$4 = {
  shadow: {
    visibility: "hidden",
    position: "absolute",
    overflow: "hidden",
    height: 0,
    top: 0,
    left: 0,
    transform: "translateZ(0)"
  }
};
var TextareaAutosize = /* @__PURE__ */ React.forwardRef(function TextareaAutosize2(props, ref) {
  var onChange = props.onChange, rows = props.rows, rowsMax = props.rowsMax, rowsMinProp = props.rowsMin, maxRowsProp = props.maxRows, _props$minRows = props.minRows, minRowsProp = _props$minRows === void 0 ? 1 : _props$minRows, style2 = props.style, value = props.value, other = _objectWithoutProperties$2(props, ["onChange", "rows", "rowsMax", "rowsMin", "maxRows", "minRows", "style", "value"]);
  var maxRows = maxRowsProp || rowsMax;
  var minRows = rows || rowsMinProp || minRowsProp;
  var _React$useRef = React.useRef(value != null), isControlled = _React$useRef.current;
  var inputRef = React.useRef(null);
  var handleRef = useForkRef(ref, inputRef);
  var shadowRef = React.useRef(null);
  var renders = React.useRef(0);
  var _React$useState = React.useState({}), state = _React$useState[0], setState = _React$useState[1];
  var syncHeight = React.useCallback(function() {
    var input = inputRef.current;
    var computedStyle = window.getComputedStyle(input);
    var inputShallow = shadowRef.current;
    inputShallow.style.width = computedStyle.width;
    inputShallow.value = input.value || props.placeholder || "x";
    if (inputShallow.value.slice(-1) === "\n") {
      inputShallow.value += " ";
    }
    var boxSizing = computedStyle["box-sizing"];
    var padding = getStyleValue(computedStyle, "padding-bottom") + getStyleValue(computedStyle, "padding-top");
    var border = getStyleValue(computedStyle, "border-bottom-width") + getStyleValue(computedStyle, "border-top-width");
    var innerHeight = inputShallow.scrollHeight - padding;
    inputShallow.value = "x";
    var singleRowHeight = inputShallow.scrollHeight - padding;
    var outerHeight = innerHeight;
    if (minRows) {
      outerHeight = Math.max(Number(minRows) * singleRowHeight, outerHeight);
    }
    if (maxRows) {
      outerHeight = Math.min(Number(maxRows) * singleRowHeight, outerHeight);
    }
    outerHeight = Math.max(outerHeight, singleRowHeight);
    var outerHeightStyle = outerHeight + (boxSizing === "border-box" ? padding + border : 0);
    var overflow = Math.abs(outerHeight - innerHeight) <= 1;
    setState(function(prevState) {
      if (renders.current < 20 && (outerHeightStyle > 0 && Math.abs((prevState.outerHeightStyle || 0) - outerHeightStyle) > 1 || prevState.overflow !== overflow)) {
        renders.current += 1;
        return {
          overflow,
          outerHeightStyle
        };
      }
      return prevState;
    });
  }, [maxRows, minRows, props.placeholder]);
  React.useEffect(function() {
    var handleResize = debounce$1(function() {
      renders.current = 0;
      syncHeight();
    });
    window.addEventListener("resize", handleResize);
    return function() {
      handleResize.clear();
      window.removeEventListener("resize", handleResize);
    };
  }, [syncHeight]);
  useEnhancedEffect$1(function() {
    syncHeight();
  });
  React.useEffect(function() {
    renders.current = 0;
  }, [value]);
  var handleChange = function handleChange2(event) {
    renders.current = 0;
    if (!isControlled) {
      syncHeight();
    }
    if (onChange) {
      onChange(event);
    }
  };
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("textarea", _extends$f({
    value,
    onChange: handleChange,
    ref: handleRef,
    rows: minRows,
    style: _extends$f({
      height: state.outerHeightStyle,
      overflow: state.overflow ? "hidden" : null
    }, style2)
  }, other)), /* @__PURE__ */ React.createElement("textarea", {
    "aria-hidden": true,
    className: props.className,
    readOnly: true,
    ref: shadowRef,
    tabIndex: -1,
    style: _extends$f({}, styles$4.shadow, style2)
  }));
});
var TextareaAutosize$1 = TextareaAutosize;
function hasValue(value) {
  return value != null && !(Array.isArray(value) && value.length === 0);
}
function isFilled(obj) {
  var SSR = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false;
  return obj && (hasValue(obj.value) && obj.value !== "" || SSR && hasValue(obj.defaultValue) && obj.defaultValue !== "");
}
var styles$3 = function styles3(theme) {
  var light2 = theme.palette.type === "light";
  var placeholder = {
    color: "currentColor",
    opacity: light2 ? 0.42 : 0.5,
    transition: theme.transitions.create("opacity", {
      duration: theme.transitions.duration.shorter
    })
  };
  var placeholderHidden = {
    opacity: "0 !important"
  };
  var placeholderVisible = {
    opacity: light2 ? 0.42 : 0.5
  };
  return {
    "@global": {
      "@keyframes mui-auto-fill": {},
      "@keyframes mui-auto-fill-cancel": {}
    },
    root: _extends$f({}, theme.typography.body1, {
      color: theme.palette.text.primary,
      lineHeight: "1.1876em",
      boxSizing: "border-box",
      position: "relative",
      cursor: "text",
      display: "inline-flex",
      alignItems: "center",
      "&$disabled": {
        color: theme.palette.text.disabled,
        cursor: "default"
      }
    }),
    formControl: {},
    focused: {},
    disabled: {},
    adornedStart: {},
    adornedEnd: {},
    error: {},
    marginDense: {},
    multiline: {
      padding: "".concat(8 - 2, "px 0 ").concat(8 - 1, "px"),
      "&$marginDense": {
        paddingTop: 4 - 1
      }
    },
    colorSecondary: {},
    fullWidth: {
      width: "100%"
    },
    input: {
      font: "inherit",
      letterSpacing: "inherit",
      color: "currentColor",
      padding: "".concat(8 - 2, "px 0 ").concat(8 - 1, "px"),
      border: 0,
      boxSizing: "content-box",
      background: "none",
      height: "1.1876em",
      margin: 0,
      WebkitTapHighlightColor: "transparent",
      display: "block",
      minWidth: 0,
      width: "100%",
      animationName: "mui-auto-fill-cancel",
      animationDuration: "10ms",
      "&::-webkit-input-placeholder": placeholder,
      "&::-moz-placeholder": placeholder,
      "&:-ms-input-placeholder": placeholder,
      "&::-ms-input-placeholder": placeholder,
      "&:focus": {
        outline: 0
      },
      "&:invalid": {
        boxShadow: "none"
      },
      "&::-webkit-search-decoration": {
        "-webkit-appearance": "none"
      },
      "label[data-shrink=false] + $formControl &": {
        "&::-webkit-input-placeholder": placeholderHidden,
        "&::-moz-placeholder": placeholderHidden,
        "&:-ms-input-placeholder": placeholderHidden,
        "&::-ms-input-placeholder": placeholderHidden,
        "&:focus::-webkit-input-placeholder": placeholderVisible,
        "&:focus::-moz-placeholder": placeholderVisible,
        "&:focus:-ms-input-placeholder": placeholderVisible,
        "&:focus::-ms-input-placeholder": placeholderVisible
      },
      "&$disabled": {
        opacity: 1
      },
      "&:-webkit-autofill": {
        animationDuration: "5000s",
        animationName: "mui-auto-fill"
      }
    },
    inputMarginDense: {
      paddingTop: 4 - 1
    },
    inputMultiline: {
      height: "auto",
      resize: "none",
      padding: 0
    },
    inputTypeSearch: {
      "-moz-appearance": "textfield",
      "-webkit-appearance": "textfield"
    },
    inputAdornedStart: {},
    inputAdornedEnd: {},
    inputHiddenLabel: {}
  };
};
var useEnhancedEffect = typeof window === "undefined" ? React.useEffect : React.useLayoutEffect;
var InputBase = /* @__PURE__ */ React.forwardRef(function InputBase2(props, ref) {
  var ariaDescribedby = props["aria-describedby"], autoComplete = props.autoComplete, autoFocus = props.autoFocus, classes = props.classes, className = props.className;
  props.color;
  var defaultValue = props.defaultValue, disabled = props.disabled, endAdornment = props.endAdornment;
  props.error;
  var _props$fullWidth = props.fullWidth, fullWidth = _props$fullWidth === void 0 ? false : _props$fullWidth, id = props.id, _props$inputComponent = props.inputComponent, inputComponent = _props$inputComponent === void 0 ? "input" : _props$inputComponent, _props$inputProps = props.inputProps, inputPropsProp = _props$inputProps === void 0 ? {} : _props$inputProps, inputRefProp = props.inputRef;
  props.margin;
  var _props$multiline = props.multiline, multiline = _props$multiline === void 0 ? false : _props$multiline, name = props.name, onBlur = props.onBlur, onChange = props.onChange, onClick = props.onClick, onFocus = props.onFocus, onKeyDown = props.onKeyDown, onKeyUp = props.onKeyUp, placeholder = props.placeholder, readOnly = props.readOnly, renderSuffix = props.renderSuffix, rows = props.rows, rowsMax = props.rowsMax, rowsMin = props.rowsMin, maxRows = props.maxRows, minRows = props.minRows, startAdornment = props.startAdornment, _props$type = props.type, type = _props$type === void 0 ? "text" : _props$type, valueProp = props.value, other = _objectWithoutProperties$2(props, ["aria-describedby", "autoComplete", "autoFocus", "classes", "className", "color", "defaultValue", "disabled", "endAdornment", "error", "fullWidth", "id", "inputComponent", "inputProps", "inputRef", "margin", "multiline", "name", "onBlur", "onChange", "onClick", "onFocus", "onKeyDown", "onKeyUp", "placeholder", "readOnly", "renderSuffix", "rows", "rowsMax", "rowsMin", "maxRows", "minRows", "startAdornment", "type", "value"]);
  var value = inputPropsProp.value != null ? inputPropsProp.value : valueProp;
  var _React$useRef = React.useRef(value != null), isControlled = _React$useRef.current;
  var inputRef = React.useRef();
  var handleInputRefWarning = React.useCallback(function(instance) {
  }, []);
  var handleInputPropsRefProp = useForkRef(inputPropsProp.ref, handleInputRefWarning);
  var handleInputRefProp = useForkRef(inputRefProp, handleInputPropsRefProp);
  var handleInputRef = useForkRef(inputRef, handleInputRefProp);
  var _React$useState = React.useState(false), focused = _React$useState[0], setFocused = _React$useState[1];
  var muiFormControl = useFormControl();
  var fcs = formControlState({
    props,
    muiFormControl,
    states: ["color", "disabled", "error", "hiddenLabel", "margin", "required", "filled"]
  });
  fcs.focused = muiFormControl ? muiFormControl.focused : focused;
  React.useEffect(function() {
    if (!muiFormControl && disabled && focused) {
      setFocused(false);
      if (onBlur) {
        onBlur();
      }
    }
  }, [muiFormControl, disabled, focused, onBlur]);
  var onFilled = muiFormControl && muiFormControl.onFilled;
  var onEmpty = muiFormControl && muiFormControl.onEmpty;
  var checkDirty = React.useCallback(function(obj) {
    if (isFilled(obj)) {
      if (onFilled) {
        onFilled();
      }
    } else if (onEmpty) {
      onEmpty();
    }
  }, [onFilled, onEmpty]);
  useEnhancedEffect(function() {
    if (isControlled) {
      checkDirty({
        value
      });
    }
  }, [value, checkDirty, isControlled]);
  var handleFocus3 = function handleFocus4(event) {
    if (fcs.disabled) {
      event.stopPropagation();
      return;
    }
    if (onFocus) {
      onFocus(event);
    }
    if (inputPropsProp.onFocus) {
      inputPropsProp.onFocus(event);
    }
    if (muiFormControl && muiFormControl.onFocus) {
      muiFormControl.onFocus(event);
    } else {
      setFocused(true);
    }
  };
  var handleBlur = function handleBlur2(event) {
    if (onBlur) {
      onBlur(event);
    }
    if (inputPropsProp.onBlur) {
      inputPropsProp.onBlur(event);
    }
    if (muiFormControl && muiFormControl.onBlur) {
      muiFormControl.onBlur(event);
    } else {
      setFocused(false);
    }
  };
  var handleChange = function handleChange2(event) {
    if (!isControlled) {
      var element = event.target || inputRef.current;
      if (element == null) {
        throw new Error(formatMuiErrorMessage(1));
      }
      checkDirty({
        value: element.value
      });
    }
    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }
    if (inputPropsProp.onChange) {
      inputPropsProp.onChange.apply(inputPropsProp, [event].concat(args));
    }
    if (onChange) {
      onChange.apply(void 0, [event].concat(args));
    }
  };
  React.useEffect(function() {
    checkDirty(inputRef.current);
  }, []);
  var handleClick = function handleClick2(event) {
    if (inputRef.current && event.currentTarget === event.target) {
      inputRef.current.focus();
    }
    if (onClick) {
      onClick(event);
    }
  };
  var InputComponent = inputComponent;
  var inputProps = _extends$f({}, inputPropsProp, {
    ref: handleInputRef
  });
  if (typeof InputComponent !== "string") {
    inputProps = _extends$f({
      inputRef: handleInputRef,
      type
    }, inputProps, {
      ref: null
    });
  } else if (multiline) {
    if (rows && !maxRows && !minRows && !rowsMax && !rowsMin) {
      InputComponent = "textarea";
    } else {
      inputProps = _extends$f({
        minRows: rows || minRows,
        rowsMax,
        maxRows
      }, inputProps);
      InputComponent = TextareaAutosize$1;
    }
  } else {
    inputProps = _extends$f({
      type
    }, inputProps);
  }
  var handleAutoFill = function handleAutoFill2(event) {
    checkDirty(event.animationName === "mui-auto-fill-cancel" ? inputRef.current : {
      value: "x"
    });
  };
  React.useEffect(function() {
    if (muiFormControl) {
      muiFormControl.setAdornedStart(Boolean(startAdornment));
    }
  }, [muiFormControl, startAdornment]);
  return /* @__PURE__ */ React.createElement("div", _extends$f({
    className: clsx(classes.root, classes["color".concat(capitalize(fcs.color || "primary"))], className, fcs.disabled && classes.disabled, fcs.error && classes.error, fullWidth && classes.fullWidth, fcs.focused && classes.focused, muiFormControl && classes.formControl, multiline && classes.multiline, startAdornment && classes.adornedStart, endAdornment && classes.adornedEnd, fcs.margin === "dense" && classes.marginDense),
    onClick: handleClick,
    ref
  }, other), startAdornment, /* @__PURE__ */ React.createElement(FormControlContext$1.Provider, {
    value: null
  }, /* @__PURE__ */ React.createElement(InputComponent, _extends$f({
    "aria-invalid": fcs.error,
    "aria-describedby": ariaDescribedby,
    autoComplete,
    autoFocus,
    defaultValue,
    disabled: fcs.disabled,
    id,
    onAnimationStart: handleAutoFill,
    name,
    placeholder,
    readOnly,
    required: fcs.required,
    rows,
    value,
    onKeyDown,
    onKeyUp
  }, inputProps, {
    className: clsx(classes.input, inputPropsProp.className, fcs.disabled && classes.disabled, multiline && classes.inputMultiline, fcs.hiddenLabel && classes.inputHiddenLabel, startAdornment && classes.inputAdornedStart, endAdornment && classes.inputAdornedEnd, type === "search" && classes.inputTypeSearch, fcs.margin === "dense" && classes.inputMarginDense),
    onBlur: handleBlur,
    onChange: handleChange,
    onFocus: handleFocus3
  }))), endAdornment, renderSuffix ? renderSuffix(_extends$f({}, fcs, {
    startAdornment
  })) : null);
});
var InputBase$1 = withStyles2(styles$3, {
  name: "MuiInputBase"
})(InputBase);
var SPACINGS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
var GRID_SIZES = ["auto", true, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
function generateGrid(globalStyles, theme, breakpoint) {
  var styles7 = {};
  GRID_SIZES.forEach(function(size) {
    var key = "grid-".concat(breakpoint, "-").concat(size);
    if (size === true) {
      styles7[key] = {
        flexBasis: 0,
        flexGrow: 1,
        maxWidth: "100%"
      };
      return;
    }
    if (size === "auto") {
      styles7[key] = {
        flexBasis: "auto",
        flexGrow: 0,
        maxWidth: "none"
      };
      return;
    }
    var width = "".concat(Math.round(size / 12 * 1e8) / 1e6, "%");
    styles7[key] = {
      flexBasis: width,
      flexGrow: 0,
      maxWidth: width
    };
  });
  if (breakpoint === "xs") {
    _extends$f(globalStyles, styles7);
  } else {
    globalStyles[theme.breakpoints.up(breakpoint)] = styles7;
  }
}
function getOffset(val) {
  var div = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 1;
  var parse = parseFloat(val);
  return "".concat(parse / div).concat(String(val).replace(String(parse), "") || "px");
}
function generateGutter(theme, breakpoint) {
  var styles7 = {};
  SPACINGS.forEach(function(spacing) {
    var themeSpacing = theme.spacing(spacing);
    if (themeSpacing === 0) {
      return;
    }
    styles7["spacing-".concat(breakpoint, "-").concat(spacing)] = {
      margin: "-".concat(getOffset(themeSpacing, 2)),
      width: "calc(100% + ".concat(getOffset(themeSpacing), ")"),
      "& > $item": {
        padding: getOffset(themeSpacing, 2)
      }
    };
  });
  return styles7;
}
var styles$2 = function styles4(theme) {
  return _extends$f({
    root: {},
    container: {
      boxSizing: "border-box",
      display: "flex",
      flexWrap: "wrap",
      width: "100%"
    },
    item: {
      boxSizing: "border-box",
      margin: "0"
    },
    zeroMinWidth: {
      minWidth: 0
    },
    "direction-xs-column": {
      flexDirection: "column"
    },
    "direction-xs-column-reverse": {
      flexDirection: "column-reverse"
    },
    "direction-xs-row-reverse": {
      flexDirection: "row-reverse"
    },
    "wrap-xs-nowrap": {
      flexWrap: "nowrap"
    },
    "wrap-xs-wrap-reverse": {
      flexWrap: "wrap-reverse"
    },
    "align-items-xs-center": {
      alignItems: "center"
    },
    "align-items-xs-flex-start": {
      alignItems: "flex-start"
    },
    "align-items-xs-flex-end": {
      alignItems: "flex-end"
    },
    "align-items-xs-baseline": {
      alignItems: "baseline"
    },
    "align-content-xs-center": {
      alignContent: "center"
    },
    "align-content-xs-flex-start": {
      alignContent: "flex-start"
    },
    "align-content-xs-flex-end": {
      alignContent: "flex-end"
    },
    "align-content-xs-space-between": {
      alignContent: "space-between"
    },
    "align-content-xs-space-around": {
      alignContent: "space-around"
    },
    "justify-content-xs-center": {
      justifyContent: "center"
    },
    "justify-content-xs-flex-end": {
      justifyContent: "flex-end"
    },
    "justify-content-xs-space-between": {
      justifyContent: "space-between"
    },
    "justify-content-xs-space-around": {
      justifyContent: "space-around"
    },
    "justify-content-xs-space-evenly": {
      justifyContent: "space-evenly"
    }
  }, generateGutter(theme, "xs"), theme.breakpoints.keys.reduce(function(accumulator, key) {
    generateGrid(accumulator, theme, key);
    return accumulator;
  }, {}));
};
var Grid = /* @__PURE__ */ React.forwardRef(function Grid2(props, ref) {
  var _props$alignContent = props.alignContent, alignContent = _props$alignContent === void 0 ? "stretch" : _props$alignContent, _props$alignItems = props.alignItems, alignItems = _props$alignItems === void 0 ? "stretch" : _props$alignItems, classes = props.classes, classNameProp = props.className, _props$component = props.component, Component2 = _props$component === void 0 ? "div" : _props$component, _props$container = props.container, container = _props$container === void 0 ? false : _props$container, _props$direction = props.direction, direction = _props$direction === void 0 ? "row" : _props$direction, _props$item = props.item, item = _props$item === void 0 ? false : _props$item, justify = props.justify, _props$justifyContent = props.justifyContent, justifyContent2 = _props$justifyContent === void 0 ? "flex-start" : _props$justifyContent, _props$lg = props.lg, lg = _props$lg === void 0 ? false : _props$lg, _props$md = props.md, md = _props$md === void 0 ? false : _props$md, _props$sm = props.sm, sm = _props$sm === void 0 ? false : _props$sm, _props$spacing = props.spacing, spacing = _props$spacing === void 0 ? 0 : _props$spacing, _props$wrap = props.wrap, wrap = _props$wrap === void 0 ? "wrap" : _props$wrap, _props$xl = props.xl, xl = _props$xl === void 0 ? false : _props$xl, _props$xs = props.xs, xs = _props$xs === void 0 ? false : _props$xs, _props$zeroMinWidth = props.zeroMinWidth, zeroMinWidth = _props$zeroMinWidth === void 0 ? false : _props$zeroMinWidth, other = _objectWithoutProperties$2(props, ["alignContent", "alignItems", "classes", "className", "component", "container", "direction", "item", "justify", "justifyContent", "lg", "md", "sm", "spacing", "wrap", "xl", "xs", "zeroMinWidth"]);
  var className = clsx(classes.root, classNameProp, container && [classes.container, spacing !== 0 && classes["spacing-xs-".concat(String(spacing))]], item && classes.item, zeroMinWidth && classes.zeroMinWidth, direction !== "row" && classes["direction-xs-".concat(String(direction))], wrap !== "wrap" && classes["wrap-xs-".concat(String(wrap))], alignItems !== "stretch" && classes["align-items-xs-".concat(String(alignItems))], alignContent !== "stretch" && classes["align-content-xs-".concat(String(alignContent))], (justify || justifyContent2) !== "flex-start" && classes["justify-content-xs-".concat(String(justify || justifyContent2))], xs !== false && classes["grid-xs-".concat(String(xs))], sm !== false && classes["grid-sm-".concat(String(sm))], md !== false && classes["grid-md-".concat(String(md))], lg !== false && classes["grid-lg-".concat(String(lg))], xl !== false && classes["grid-xl-".concat(String(xl))]);
  return /* @__PURE__ */ React.createElement(Component2, _extends$f({
    className,
    ref
  }, other));
});
var StyledGrid = withStyles2(styles$2, {
  name: "MuiGrid"
})(Grid);
var Grid$1 = StyledGrid;
var styles$1 = function styles5(theme) {
  var light2 = theme.palette.type === "light";
  var bottomLineColor = light2 ? "rgba(0, 0, 0, 0.42)" : "rgba(255, 255, 255, 0.7)";
  return {
    root: {
      position: "relative"
    },
    formControl: {
      "label + &": {
        marginTop: 16
      }
    },
    focused: {},
    disabled: {},
    colorSecondary: {
      "&$underline:after": {
        borderBottomColor: theme.palette.secondary.main
      }
    },
    underline: {
      "&:after": {
        borderBottom: "2px solid ".concat(theme.palette.primary.main),
        left: 0,
        bottom: 0,
        content: '""',
        position: "absolute",
        right: 0,
        transform: "scaleX(0)",
        transition: theme.transitions.create("transform", {
          duration: theme.transitions.duration.shorter,
          easing: theme.transitions.easing.easeOut
        }),
        pointerEvents: "none"
      },
      "&$focused:after": {
        transform: "scaleX(1)"
      },
      "&$error:after": {
        borderBottomColor: theme.palette.error.main,
        transform: "scaleX(1)"
      },
      "&:before": {
        borderBottom: "1px solid ".concat(bottomLineColor),
        left: 0,
        bottom: 0,
        content: '"\\00a0"',
        position: "absolute",
        right: 0,
        transition: theme.transitions.create("border-bottom-color", {
          duration: theme.transitions.duration.shorter
        }),
        pointerEvents: "none"
      },
      "&:hover:not($disabled):before": {
        borderBottom: "2px solid ".concat(theme.palette.text.primary),
        "@media (hover: none)": {
          borderBottom: "1px solid ".concat(bottomLineColor)
        }
      },
      "&$disabled:before": {
        borderBottomStyle: "dotted"
      }
    },
    error: {},
    marginDense: {},
    multiline: {},
    fullWidth: {},
    input: {},
    inputMarginDense: {},
    inputMultiline: {},
    inputTypeSearch: {}
  };
};
var Input = /* @__PURE__ */ React.forwardRef(function Input2(props, ref) {
  var disableUnderline = props.disableUnderline, classes = props.classes, _props$fullWidth = props.fullWidth, fullWidth = _props$fullWidth === void 0 ? false : _props$fullWidth, _props$inputComponent = props.inputComponent, inputComponent = _props$inputComponent === void 0 ? "input" : _props$inputComponent, _props$multiline = props.multiline, multiline = _props$multiline === void 0 ? false : _props$multiline, _props$type = props.type, type = _props$type === void 0 ? "text" : _props$type, other = _objectWithoutProperties$2(props, ["disableUnderline", "classes", "fullWidth", "inputComponent", "multiline", "type"]);
  return /* @__PURE__ */ React.createElement(InputBase$1, _extends$f({
    classes: _extends$f({}, classes, {
      root: clsx(classes.root, !disableUnderline && classes.underline),
      underline: null
    }),
    fullWidth,
    inputComponent,
    multiline,
    ref,
    type
  }, other));
});
Input.muiName = "Input";
var Input$1 = withStyles2(styles$1, {
  name: "MuiInput"
})(Input);
function n(n2) {
  for (var r2 = arguments.length, t2 = Array(r2 > 1 ? r2 - 1 : 0), e2 = 1; e2 < r2; e2++)
    t2[e2 - 1] = arguments[e2];
  throw Error("[Immer] minified error nr: " + n2 + (t2.length ? " " + t2.map(function(n3) {
    return "'" + n3 + "'";
  }).join(",") : "") + ". Find the full error at: https://bit.ly/3cXEKWf");
}
function r(n2) {
  return !!n2 && !!n2[Q];
}
function t(n2) {
  return !!n2 && (function(n3) {
    if (!n3 || typeof n3 != "object")
      return false;
    var r2 = Object.getPrototypeOf(n3);
    if (r2 === null)
      return true;
    var t2 = Object.hasOwnProperty.call(r2, "constructor") && r2.constructor;
    return typeof t2 == "function" && Function.toString.call(t2) === Z;
  }(n2) || Array.isArray(n2) || !!n2[L] || !!n2.constructor[L] || s(n2) || v(n2));
}
function i(n2, r2, t2) {
  t2 === void 0 && (t2 = false), o(n2) === 0 ? (t2 ? Object.keys : nn)(n2).forEach(function(e2) {
    t2 && typeof e2 == "symbol" || r2(e2, n2[e2], n2);
  }) : n2.forEach(function(t3, e2) {
    return r2(e2, t3, n2);
  });
}
function o(n2) {
  var r2 = n2[Q];
  return r2 ? r2.i > 3 ? r2.i - 4 : r2.i : Array.isArray(n2) ? 1 : s(n2) ? 2 : v(n2) ? 3 : 0;
}
function u(n2, r2) {
  return o(n2) === 2 ? n2.has(r2) : Object.prototype.hasOwnProperty.call(n2, r2);
}
function a(n2, r2) {
  return o(n2) === 2 ? n2.get(r2) : n2[r2];
}
function f(n2, r2, t2) {
  var e2 = o(n2);
  e2 === 2 ? n2.set(r2, t2) : e2 === 3 ? (n2.delete(r2), n2.add(t2)) : n2[r2] = t2;
}
function c(n2, r2) {
  return n2 === r2 ? n2 !== 0 || 1 / n2 == 1 / r2 : n2 != n2 && r2 != r2;
}
function s(n2) {
  return X && n2 instanceof Map;
}
function v(n2) {
  return q && n2 instanceof Set;
}
function p(n2) {
  return n2.o || n2.t;
}
function l(n2) {
  if (Array.isArray(n2))
    return Array.prototype.slice.call(n2);
  var r2 = rn(n2);
  delete r2[Q];
  for (var t2 = nn(r2), e2 = 0; e2 < t2.length; e2++) {
    var i2 = t2[e2], o2 = r2[i2];
    o2.writable === false && (o2.writable = true, o2.configurable = true), (o2.get || o2.set) && (r2[i2] = { configurable: true, writable: true, enumerable: o2.enumerable, value: n2[i2] });
  }
  return Object.create(Object.getPrototypeOf(n2), r2);
}
function d(n2, e2) {
  return e2 === void 0 && (e2 = false), y(n2) || r(n2) || !t(n2) ? n2 : (o(n2) > 1 && (n2.set = n2.add = n2.clear = n2.delete = h), Object.freeze(n2), e2 && i(n2, function(n3, r2) {
    return d(r2, true);
  }, true), n2);
}
function h() {
  n(2);
}
function y(n2) {
  return n2 == null || typeof n2 != "object" || Object.isFrozen(n2);
}
function b(r2) {
  var t2 = tn[r2];
  return t2 || n(18, r2), t2;
}
function _() {
  return U;
}
function j(n2, r2) {
  r2 && (b("Patches"), n2.u = [], n2.s = [], n2.v = r2);
}
function g(n2) {
  O(n2), n2.p.forEach(S), n2.p = null;
}
function O(n2) {
  n2 === U && (U = n2.l);
}
function w(n2) {
  return U = { p: [], l: U, h: n2, m: true, _: 0 };
}
function S(n2) {
  var r2 = n2[Q];
  r2.i === 0 || r2.i === 1 ? r2.j() : r2.g = true;
}
function P(r2, e2) {
  e2._ = e2.p.length;
  var i2 = e2.p[0], o2 = r2 !== void 0 && r2 !== i2;
  return e2.h.O || b("ES5").S(e2, r2, o2), o2 ? (i2[Q].P && (g(e2), n(4)), t(r2) && (r2 = M(e2, r2), e2.l || x(e2, r2)), e2.u && b("Patches").M(i2[Q], r2, e2.u, e2.s)) : r2 = M(e2, i2, []), g(e2), e2.u && e2.v(e2.u, e2.s), r2 !== H ? r2 : void 0;
}
function M(n2, r2, t2) {
  if (y(r2))
    return r2;
  var e2 = r2[Q];
  if (!e2)
    return i(r2, function(i2, o3) {
      return A(n2, e2, r2, i2, o3, t2);
    }, true), r2;
  if (e2.A !== n2)
    return r2;
  if (!e2.P)
    return x(n2, e2.t, true), e2.t;
  if (!e2.I) {
    e2.I = true, e2.A._--;
    var o2 = e2.i === 4 || e2.i === 5 ? e2.o = l(e2.k) : e2.o;
    i(e2.i === 3 ? new Set(o2) : o2, function(r3, i2) {
      return A(n2, e2, o2, r3, i2, t2);
    }), x(n2, o2, false), t2 && n2.u && b("Patches").R(e2, t2, n2.u, n2.s);
  }
  return e2.o;
}
function A(e2, i2, o2, a2, c2, s2) {
  if (r(c2)) {
    var v2 = M(e2, c2, s2 && i2 && i2.i !== 3 && !u(i2.D, a2) ? s2.concat(a2) : void 0);
    if (f(o2, a2, v2), !r(v2))
      return;
    e2.m = false;
  }
  if (t(c2) && !y(c2)) {
    if (!e2.h.F && e2._ < 1)
      return;
    M(e2, c2), i2 && i2.A.l || x(e2, c2);
  }
}
function x(n2, r2, t2) {
  t2 === void 0 && (t2 = false), n2.h.F && n2.m && d(r2, t2);
}
function z(n2, r2) {
  var t2 = n2[Q];
  return (t2 ? p(t2) : n2)[r2];
}
function I(n2, r2) {
  if (r2 in n2)
    for (var t2 = Object.getPrototypeOf(n2); t2; ) {
      var e2 = Object.getOwnPropertyDescriptor(t2, r2);
      if (e2)
        return e2;
      t2 = Object.getPrototypeOf(t2);
    }
}
function k(n2) {
  n2.P || (n2.P = true, n2.l && k(n2.l));
}
function E(n2) {
  n2.o || (n2.o = l(n2.t));
}
function R(n2, r2, t2) {
  var e2 = s(r2) ? b("MapSet").N(r2, t2) : v(r2) ? b("MapSet").T(r2, t2) : n2.O ? function(n3, r3) {
    var t3 = Array.isArray(n3), e3 = { i: t3 ? 1 : 0, A: r3 ? r3.A : _(), P: false, I: false, D: {}, l: r3, t: n3, k: null, o: null, j: null, C: false }, i2 = e3, o2 = en;
    t3 && (i2 = [e3], o2 = on);
    var u2 = Proxy.revocable(i2, o2), a2 = u2.revoke, f2 = u2.proxy;
    return e3.k = f2, e3.j = a2, f2;
  }(r2, t2) : b("ES5").J(r2, t2);
  return (t2 ? t2.A : _()).p.push(e2), e2;
}
function D(e2) {
  return r(e2) || n(22, e2), function n2(r2) {
    if (!t(r2))
      return r2;
    var e3, u2 = r2[Q], c2 = o(r2);
    if (u2) {
      if (!u2.P && (u2.i < 4 || !b("ES5").K(u2)))
        return u2.t;
      u2.I = true, e3 = F(r2, c2), u2.I = false;
    } else
      e3 = F(r2, c2);
    return i(e3, function(r3, t2) {
      u2 && a(u2.t, r3) === t2 || f(e3, r3, n2(t2));
    }), c2 === 3 ? new Set(e3) : e3;
  }(e2);
}
function F(n2, r2) {
  switch (r2) {
    case 2:
      return new Map(n2);
    case 3:
      return Array.from(n2);
  }
  return l(n2);
}
var G, U, W = typeof Symbol != "undefined" && typeof Symbol("x") == "symbol", X = typeof Map != "undefined", q = typeof Set != "undefined", B = typeof Proxy != "undefined" && Proxy.revocable !== void 0 && typeof Reflect != "undefined", H = W ? Symbol.for("immer-nothing") : ((G = {})["immer-nothing"] = true, G), L = W ? Symbol.for("immer-draftable") : "__$immer_draftable", Q = W ? Symbol.for("immer-state") : "__$immer_state", Z = "" + Object.prototype.constructor, nn = typeof Reflect != "undefined" && Reflect.ownKeys ? Reflect.ownKeys : Object.getOwnPropertySymbols !== void 0 ? function(n2) {
  return Object.getOwnPropertyNames(n2).concat(Object.getOwnPropertySymbols(n2));
} : Object.getOwnPropertyNames, rn = Object.getOwnPropertyDescriptors || function(n2) {
  var r2 = {};
  return nn(n2).forEach(function(t2) {
    r2[t2] = Object.getOwnPropertyDescriptor(n2, t2);
  }), r2;
}, tn = {}, en = { get: function(n2, r2) {
  if (r2 === Q)
    return n2;
  var e2 = p(n2);
  if (!u(e2, r2))
    return function(n3, r3, t2) {
      var e3, i3 = I(r3, t2);
      return i3 ? "value" in i3 ? i3.value : (e3 = i3.get) === null || e3 === void 0 ? void 0 : e3.call(n3.k) : void 0;
    }(n2, e2, r2);
  var i2 = e2[r2];
  return n2.I || !t(i2) ? i2 : i2 === z(n2.t, r2) ? (E(n2), n2.o[r2] = R(n2.A.h, i2, n2)) : i2;
}, has: function(n2, r2) {
  return r2 in p(n2);
}, ownKeys: function(n2) {
  return Reflect.ownKeys(p(n2));
}, set: function(n2, r2, t2) {
  var e2 = I(p(n2), r2);
  if (e2 == null ? void 0 : e2.set)
    return e2.set.call(n2.k, t2), true;
  if (!n2.P) {
    var i2 = z(p(n2), r2), o2 = i2 == null ? void 0 : i2[Q];
    if (o2 && o2.t === t2)
      return n2.o[r2] = t2, n2.D[r2] = false, true;
    if (c(t2, i2) && (t2 !== void 0 || u(n2.t, r2)))
      return true;
    E(n2), k(n2);
  }
  return n2.o[r2] === t2 && typeof t2 != "number" || (n2.o[r2] = t2, n2.D[r2] = true, true);
}, deleteProperty: function(n2, r2) {
  return z(n2.t, r2) !== void 0 || r2 in n2.t ? (n2.D[r2] = false, E(n2), k(n2)) : delete n2.D[r2], n2.o && delete n2.o[r2], true;
}, getOwnPropertyDescriptor: function(n2, r2) {
  var t2 = p(n2), e2 = Reflect.getOwnPropertyDescriptor(t2, r2);
  return e2 ? { writable: true, configurable: n2.i !== 1 || r2 !== "length", enumerable: e2.enumerable, value: t2[r2] } : e2;
}, defineProperty: function() {
  n(11);
}, getPrototypeOf: function(n2) {
  return Object.getPrototypeOf(n2.t);
}, setPrototypeOf: function() {
  n(12);
} }, on = {};
i(en, function(n2, r2) {
  on[n2] = function() {
    return arguments[0] = arguments[0][0], r2.apply(this, arguments);
  };
}), on.deleteProperty = function(r2, t2) {
  return en.deleteProperty.call(this, r2[0], t2);
}, on.set = function(r2, t2, e2) {
  return en.set.call(this, r2[0], t2, e2, r2[0]);
};
var un = function() {
  function e2(r2) {
    var e3 = this;
    this.O = B, this.F = true, this.produce = function(r3, i3, o2) {
      if (typeof r3 == "function" && typeof i3 != "function") {
        var u2 = i3;
        i3 = r3;
        var a2 = e3;
        return function(n2) {
          var r4 = this;
          n2 === void 0 && (n2 = u2);
          for (var t2 = arguments.length, e4 = Array(t2 > 1 ? t2 - 1 : 0), o3 = 1; o3 < t2; o3++)
            e4[o3 - 1] = arguments[o3];
          return a2.produce(n2, function(n3) {
            var t3;
            return (t3 = i3).call.apply(t3, [r4, n3].concat(e4));
          });
        };
      }
      var f2;
      if (typeof i3 != "function" && n(6), o2 !== void 0 && typeof o2 != "function" && n(7), t(r3)) {
        var c2 = w(e3), s2 = R(e3, r3, void 0), v2 = true;
        try {
          f2 = i3(s2), v2 = false;
        } finally {
          v2 ? g(c2) : O(c2);
        }
        return typeof Promise != "undefined" && f2 instanceof Promise ? f2.then(function(n2) {
          return j(c2, o2), P(n2, c2);
        }, function(n2) {
          throw g(c2), n2;
        }) : (j(c2, o2), P(f2, c2));
      }
      if (!r3 || typeof r3 != "object") {
        if ((f2 = i3(r3)) === H)
          return;
        return f2 === void 0 && (f2 = r3), e3.F && d(f2, true), f2;
      }
      n(21, r3);
    }, this.produceWithPatches = function(n2, r3) {
      return typeof n2 == "function" ? function(r4) {
        for (var t3 = arguments.length, i4 = Array(t3 > 1 ? t3 - 1 : 0), o2 = 1; o2 < t3; o2++)
          i4[o2 - 1] = arguments[o2];
        return e3.produceWithPatches(r4, function(r5) {
          return n2.apply(void 0, [r5].concat(i4));
        });
      } : [e3.produce(n2, r3, function(n3, r4) {
        t2 = n3, i3 = r4;
      }), t2, i3];
      var t2, i3;
    }, typeof (r2 == null ? void 0 : r2.useProxies) == "boolean" && this.setUseProxies(r2.useProxies), typeof (r2 == null ? void 0 : r2.autoFreeze) == "boolean" && this.setAutoFreeze(r2.autoFreeze);
  }
  var i2 = e2.prototype;
  return i2.createDraft = function(e3) {
    t(e3) || n(8), r(e3) && (e3 = D(e3));
    var i3 = w(this), o2 = R(this, e3, void 0);
    return o2[Q].C = true, O(i3), o2;
  }, i2.finishDraft = function(r2, t2) {
    var e3 = r2 && r2[Q];
    var i3 = e3.A;
    return j(i3, t2), P(void 0, i3);
  }, i2.setAutoFreeze = function(n2) {
    this.F = n2;
  }, i2.setUseProxies = function(r2) {
    r2 && !B && n(20), this.O = r2;
  }, i2.applyPatches = function(n2, t2) {
    var e3;
    for (e3 = t2.length - 1; e3 >= 0; e3--) {
      var i3 = t2[e3];
      if (i3.path.length === 0 && i3.op === "replace") {
        n2 = i3.value;
        break;
      }
    }
    var o2 = b("Patches").$;
    return r(n2) ? o2(n2, t2) : this.produce(n2, function(n3) {
      return o2(n3, t2.slice(e3 + 1));
    });
  }, e2;
}(), an = new un(), fn = an.produce;
an.produceWithPatches.bind(an);
an.setAutoFreeze.bind(an);
an.setUseProxies.bind(an);
an.applyPatches.bind(an);
an.createDraft.bind(an);
an.finishDraft.bind(an);
var produce = fn;
const Rectangle = (props) => {
  const {
    style: style2,
    config,
    pos
  } = props;
  const {
    backgroundColor,
    borders,
    bgImage,
    bgSize
  } = config;
  return /* @__PURE__ */ jsx("div", {
    style: __spreadProps(__spreadValues(__spreadProps(__spreadValues({}, style2), {
      backgroundColor,
      width: pos.w,
      height: pos.h
    }), borders == null ? void 0 : borders.reduce((prev, item) => __spreadProps(__spreadValues({}, prev), {
      [item.border]: item.value
    }), {
      [borders[0].border]: borders == null ? void 0 : borders[0].value
    })), {
      backgroundImage: `url(${bgImage})`,
      backgroundSize: bgSize
    })
  });
};
const RectangleConfig = ({
  widgetConfig,
  dispatchConfig
}) => {
  const [borderList, setBorderList] = useState(widgetConfig.config.borders);
  const timer = useRef(null);
  return /* @__PURE__ */ jsxs(Grid$1, {
    container: true,
    children: ["\u5706\u89D2(\u5355\u4F4D\u586B\u5199 px \u6216 %)", borderList == null ? void 0 : borderList.map(({
      name,
      value
    }, i2) => /* @__PURE__ */ jsxs(Grid$1, {
      container: true,
      children: [/* @__PURE__ */ jsx(Grid$1, {
        item: true,
        xs: 4,
        children: name
      }), /* @__PURE__ */ jsx(Grid$1, {
        item: true,
        xs: 8,
        children: /* @__PURE__ */ jsx(Input$1, {
          fullWidth: true,
          value,
          onChange: (e2) => {
            setBorderList((list) => {
              const newConfig = produce(list, (it) => {
                it[i2].value = e2.target.value;
              });
              if (timer.current !== null) {
                clearTimeout(timer.current);
              }
              timer.current = setTimeout(() => {
                dispatchConfig(produce(widgetConfig, (config) => {
                  config.config.borders = newConfig;
                }));
              }, 500);
              return newConfig;
            });
          }
        })
      })]
    }, i2))]
  });
};
var rectangle = createPkg(Rectangle, () => ({
  name: "rectangle",
  showName: "\u77E9\u5F62",
  version: "0.0.1",
  description: "\u57FA\u7840\u7684\u77E9\u5F62\uFF0C\u8C03\u6574\u5706\u89D2\u53EF\u4EE5\u5448\u73B0\u5176\u4ED6\u5F62\u72B6",
  editorConfig: [
    {
      key: "backgroundColor",
      name: "\u989C\u8272",
      type: EditorTypes.Color
    },
    {
      key: "opacity",
      name: "\u900F\u660E\u5EA6",
      type: EditorTypes.Text
    },
    {
      key: "bgImage",
      name: "\u80CC\u666F\u56FE\u7247url",
      type: EditorTypes.Text
    },
    {
      key: "bgSize",
      name: "\u80CC\u666F\u5C3A\u5BF8",
      type: EditorTypes.Select,
      options: [
        {
          label: "\u65E0",
          value: "auto"
        },
        {
          label: "cover",
          value: "cover"
        },
        {
          label: "contain",
          value: "contain"
        }
      ]
    }
  ],
  config: {
    backgroundColor: "rgb(164, 151, 230)",
    opacity: "1",
    bgImage: "",
    bgSize: "auto",
    borders: [
      {
        name: "\u5DE6\u4E0A",
        border: "borderTopLeftRadius",
        value: "0"
      },
      {
        name: "\u53F3\u4E0A",
        border: "borderTopRightRadius",
        value: "0"
      },
      {
        name: "\u53F3\u4E0B",
        border: "borderBottomRightRadius",
        value: "0"
      },
      {
        name: "\u53F3\u4E0B",
        border: "borderBottomLeftRadius",
        value: "0"
      }
    ]
  },
  from: "presets"
}), RectangleConfig);
const SvgRenderer = ({
  config,
  pos
}) => {
  const {
    svgStr
  } = config;
  const svgRef = useRef(null);
  useEffect(() => {
    if (svgStr) {
      svgRef.current.innerHTML = svgStr;
    }
  }, [svgStr]);
  return /* @__PURE__ */ jsx("div", {
    ref: svgRef,
    className: "svg-render",
    style: {
      width: pos.w,
      height: pos.h
    }
  });
};
var svg = createPkg(SvgRenderer, () => ({
  name: "v-svg",
  version: "0.0.1",
  showName: "SVG\u56FE\u6807",
  description: "\u6E32\u67D3svg",
  editorConfig: [{
    key: "svgStr",
    name: "svg\u5B57\u7B26\u4E32",
    type: EditorTypes.Text
  }],
  config: { svgStr: `<svg t="1621775473285" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3354" width="100%" height="80"><path d="M192 0h448.1536L960 320v576c0 70.6944-57.3056 128-128 128H192C121.3056 1024 64 966.6944 64 896V128C64 57.3056 121.3056 0 192 0z" fill="#426C8D" p-id="3355"></path><path d="M640 0l320 320H768c-70.6944 0-128-57.3056-128-128V0z" fill="#6B99BC" p-id="3356"></path><path d="M320.256 720.0768c25.8304 0 46.5664-5.6448 62.1824-16.9472 15.6288-11.3024 23.4368-26.9568 23.4368-46.9504 0-19.584-6.7584-35.008-20.3008-46.2592s-33.4976-20.7744-59.8528-28.5824c-15.5136-6.0544-26.112-11.072-31.7952-15.0784-5.6704-4.0192-8.512-9.344-8.512-16.0256 0-6.8736 2.7648-12.6464 8.2816-17.344 5.5168-4.6848 13.0688-7.0272 22.656-7.0272 11.776 0 20.5696 2.432 26.4064 7.2704 5.8368 4.8384 8.7424 12.6208 8.7424 23.36h51.2512l0.32-0.9472c0.512-22.08-7.1424-39.1936-22.976-51.328-15.8336-12.1344-36.7104-18.2016-62.656-18.2016-24.576 0-44.8384 5.888-60.7744 17.664-15.936 11.776-23.9104 27.1872-23.9104 46.2464 0 19.4816 6.848 34.3936 20.544 44.7616 13.696 10.368 34.6624 20.1344 62.8992 29.2992 13.952 4.9024 23.5904 9.5104 28.9024 13.824 5.312 4.3264 7.9616 10.5472 7.9616 18.688 0 7.0656-2.7008 12.8-8.1152 17.1776-5.4144 4.3776-13.6448 6.5664-24.6912 6.5664-13.44 0-23.4112-2.7904-29.9264-8.3712-6.5024-5.568-9.7664-14.976-9.7664-28.1984h-51.4048l-0.3072 0.9344c-0.512 26.048 8.1536 45.1328 26.0096 57.2672 17.8688 12.1344 39.6672 18.2016 65.3952 18.2016zM534.1696 716.8l73.7536-227.4944h-55.3088l-45.1584 166.4-1.5616 7.6544h-0.9344l-1.5616-8.2816-44.544-165.7728H403.712L477.1456 716.8h57.024z m167.8336 3.2768c22.6048 0 41.088-3.3792 55.4624-10.1504 14.3744-6.784 25.5232-14.9504 33.4464-24.5376v-90.1504h-93.1328v34.9952h40.32v40.6272c-3.2384 2.6112-7.6416 4.6848-13.2096 6.2464-5.568 1.5616-13.1968 2.3552-22.8864 2.3552-13.44 0-23.8848-4.8256-31.3344-14.464-7.4496-9.6256-11.1744-22.3616-11.1744-38.1952v-47.8208c0-15.5136 3.7504-28.1216 11.264-37.8112 7.488-9.6896 17.3824-14.528 29.6832-14.528 11.9808 0 20.928 2.7136 26.88 8.128 5.9264 5.4144 8.896 13.696 8.896 24.832h49.536l0.3072-0.9344c0.512-22.4896-6.6432-40.2304-21.4784-53.1968-14.848-12.9664-36.8-19.456-65.8688-19.456-26.9696 0-49.024 8.704-66.176 26.0992-17.1264 17.3952-25.6896 39.7952-25.6896 67.1872v47.488c0 27.6096 8.7936 50.0608 26.4064 67.3536 17.6 17.28 40.512 25.9328 68.736 25.9328z" fill="#FFFFFF" fill-opacity=".9" p-id="3357"></path></svg>` },
  from: "presets"
}));
const Text = (props) => {
  const {
    style: style2,
    config,
    pos
  } = props;
  const {
    fontSize,
    fontFace,
    color,
    padding,
    content,
    justifyContent: justifyContent2,
    alignItems,
    backgroundColor,
    woffUrl
  } = config;
  const {
    w: w2,
    h: h2
  } = pos;
  if (woffUrl) {
    const font = new FontFace(fontFace, `url(${woffUrl})`);
    font.load().then((loaded) => {
      document.fonts.add(loaded);
    }).catch((err) => {
      console.log(fontFace + "\u5B57\u4F53\u52A0\u8F7D\u5931\u8D25.url " + woffUrl);
      console.error(err);
    });
  }
  return /* @__PURE__ */ jsx("div", {
    style: __spreadProps(__spreadValues({}, style2), {
      fontSize: fontSize + "px",
      color,
      fontFamily: fontFace,
      backgroundColor,
      padding: padding + "px",
      width: w2,
      height: h2,
      display: "flex",
      justifyContent: justifyContent2,
      alignItems,
      boxSizing: "border-box"
    }),
    children: /* @__PURE__ */ jsx("div", {
      children: content
    })
  });
};
const fontsList = ["Arial", "\u6977\u4F53", "Brush Script MT", "Courier New", "Verdana", "\u5B8B\u4F53", "Garamond", "Helvetica", "Tahoma", "Trebuchet MS", "Times New Roman", "Georgia"];
const TextConfiguration = ({
  dispatchConfig,
  widgetConfig
}) => {
  return /* @__PURE__ */ jsx("div", {
    children: fontsList.map((fontFace) => {
      return /* @__PURE__ */ jsx("div", {
        className: "text-config-item",
        style: {
          fontFamily: fontFace
        },
        onClick: () => {
          dispatchConfig(produce(widgetConfig, (it) => {
            it.config.fontFace = fontFace;
          }));
        },
        children: `\u5B57\u4F53\u793A\u4F8B Fonts Sample 0123456789 ,.:;''""`
      }, fontFace);
    })
  });
};
var text = createPkg(Text, () => ({
  name: "text-wrapper",
  showName: "\u6587\u672C",
  version: "0.0.1",
  description: "\u57FA\u7840\u6587\u672C\u63A7\u4EF6",
  editorConfig: [{
    key: "fontSize",
    name: "\u5B57\u4F53\u5927\u5C0F",
    type: EditorTypes.Number
  }, {
    key: "color",
    name: "\u5B57\u4F53\u989C\u8272",
    type: EditorTypes.Color
  }, {
    key: "padding",
    name: "\u5185\u8FB9\u8DDD",
    type: EditorTypes.Number
  }, {
    key: "content",
    name: "\u5185\u5BB9",
    type: EditorTypes.Text
  }, {
    key: "backgroundColor",
    name: "\u80CC\u666F\u989C\u8272",
    type: EditorTypes.Color
  }, {
    key: "justifyContent",
    name: "\u6C34\u5E73\u5E03\u5C40",
    type: EditorTypes.Select,
    options: [{
      label: "\u9760\u5DE6",
      value: "flex-start"
    }, {
      label: "\u5C45\u4E2D",
      value: "center"
    }, {
      label: "\u9760\u53F3",
      value: "flex-end"
    }]
  }, {
    key: "alignItems",
    name: "\u5782\u76F4\u5E03\u5C40",
    type: EditorTypes.Select,
    options: [{
      label: "\u9760\u4E0A",
      value: "flex-start"
    }, {
      label: "\u5C45\u4E2D",
      value: "center"
    }, {
      label: "\u9760\u4E0B",
      value: "flex-end"
    }]
  }],
  config: {
    fontSize: 16,
    color: "black",
    padding: 15,
    content: "\u6587\u672C\u6846 Hello",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    fontFace: "serif"
  },
  from: "presets"
}), TextConfiguration);
const RouterLink = ({
  config,
  isDev,
  pos
}) => {
  return isDev ? /* @__PURE__ */ jsx("div", {
    style: {
      position: "relative",
      border: "1px solid grey",
      width: "100%",
      height: "100%"
    }
  }) : /* @__PURE__ */ jsx(Link, {
    to: config.to,
    children: /* @__PURE__ */ jsx("div", {
      style: {
        position: "relative",
        width: pos.w + "px",
        height: pos.h + "px"
      }
    })
  });
};
class EventEmitter {
  constructor() {
    __publicField(this, "subMap");
    this.subMap = new Map();
  }
  on(eventName, callback) {
    let cbs;
    if (cbs = this.subMap.get(eventName)) {
      cbs.push(callback);
    } else {
      this.subMap.set(eventName, [callback]);
    }
  }
  emit(eventName, ...args) {
    let cbs;
    if (cbs = this.subMap.get(eventName)) {
      for (const cb of cbs) {
        cb(...args);
      }
    }
  }
}
var routerLink = createPkg(RouterLink, () => ({
  name: "link",
  description: "\u5728\u751F\u6210\u7684\u4EE3\u7801\u540E\u5C06\u770B\u4E0D\u5230\u5916\u8FB9\u6846\n",
  version: "0.0.1",
  showName: "\u8DEF\u7531\u94FE\u63A5",
  editorConfig: [
    {
      name: "\u5BFC\u822A\u5730\u5740",
      type: EditorTypes.Text,
      key: "to"
    }
  ],
  config: {
    to: ""
  }
}));
var dist = { exports: {} };
var propTypes = { exports: {} };
var ReactPropTypesSecret$1 = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";
var ReactPropTypesSecret_1 = ReactPropTypesSecret$1;
var ReactPropTypesSecret = ReactPropTypesSecret_1;
function emptyFunction() {
}
function emptyFunctionWithReset() {
}
emptyFunctionWithReset.resetWarningCache = emptyFunction;
var factoryWithThrowingShims = function() {
  function shim(props, propName, componentName, location, propFullName, secret) {
    if (secret === ReactPropTypesSecret) {
      return;
    }
    var err = new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");
    err.name = "Invariant Violation";
    throw err;
  }
  shim.isRequired = shim;
  function getShim() {
    return shim;
  }
  var ReactPropTypes = {
    array: shim,
    bool: shim,
    func: shim,
    number: shim,
    object: shim,
    string: shim,
    symbol: shim,
    any: shim,
    arrayOf: getShim,
    element: shim,
    elementType: shim,
    instanceOf: getShim,
    node: shim,
    objectOf: getShim,
    oneOf: getShim,
    oneOfType: getShim,
    shape: getShim,
    exact: getShim,
    checkPropTypes: emptyFunctionWithReset,
    resetWarningCache: emptyFunction
  };
  ReactPropTypes.PropTypes = ReactPropTypes;
  return ReactPropTypes;
};
{
  propTypes.exports = factoryWithThrowingShims();
}
(function(module2, exports2) {
  !function webpackUniversalModuleDefinition(e2, t2) {
    module2.exports = t2(propTypes.exports, React__default);
  }(commonjsGlobal, function(e2, t2) {
    return function(e3) {
      var t3 = {};
      function __webpack_require__(n2) {
        if (t3[n2])
          return t3[n2].exports;
        var o2 = t3[n2] = { i: n2, l: false, exports: {} };
        return e3[n2].call(o2.exports, o2, o2.exports, __webpack_require__), o2.l = true, o2.exports;
      }
      return __webpack_require__.m = e3, __webpack_require__.c = t3, __webpack_require__.d = function(e4, t4, n2) {
        __webpack_require__.o(e4, t4) || Object.defineProperty(e4, t4, { enumerable: true, get: n2 });
      }, __webpack_require__.r = function(e4) {
        typeof Symbol != "undefined" && Symbol.toStringTag && Object.defineProperty(e4, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(e4, "__esModule", { value: true });
      }, __webpack_require__.t = function(e4, t4) {
        if (1 & t4 && (e4 = __webpack_require__(e4)), 8 & t4)
          return e4;
        if (4 & t4 && typeof e4 == "object" && e4 && e4.__esModule)
          return e4;
        var n2 = Object.create(null);
        if (__webpack_require__.r(n2), Object.defineProperty(n2, "default", { enumerable: true, value: e4 }), 2 & t4 && typeof e4 != "string")
          for (var o2 in e4)
            __webpack_require__.d(n2, o2, function(t5) {
              return e4[t5];
            }.bind(null, o2));
        return n2;
      }, __webpack_require__.n = function(e4) {
        var t4 = e4 && e4.__esModule ? function getDefault() {
          return e4.default;
        } : function getModuleExports() {
          return e4;
        };
        return __webpack_require__.d(t4, "a", t4), t4;
      }, __webpack_require__.o = function(e4, t4) {
        return Object.prototype.hasOwnProperty.call(e4, t4);
      }, __webpack_require__.p = "", __webpack_require__(__webpack_require__.s = 5);
    }([function(e3, t3, n2) {
      function _defineProperties2(e4, t4) {
        for (var n3 = 0; n3 < t4.length; n3++) {
          var o3 = t4[n3];
          o3.enumerable = o3.enumerable || false, o3.configurable = true, "value" in o3 && (o3.writable = true), Object.defineProperty(e4, o3.key, o3);
        }
      }
      n2.d(t3, "a", function() {
        return o2;
      }), n2.d(t3, "b", function() {
        return classToModules;
      }), n2.d(t3, "c", function() {
        return getClassName;
      });
      var o2 = function() {
        function MediaLoader() {
          !function _classCallCheck2(e4, t4) {
            if (!(e4 instanceof t4))
              throw new TypeError("Cannot call a class as a function");
          }(this, MediaLoader), typeof window != "undefined" && (this.image = new Image(), this.resolve = null, this.video = document.createElement("video"), this.events());
        }
        return function _createClass2(e4, t4, n3) {
          return t4 && _defineProperties2(e4.prototype, t4), n3 && _defineProperties2(e4, n3), e4;
        }(MediaLoader, [{ key: "events", value: function events() {
          var e4 = this;
          this.video.addEventListener("loadeddata", function() {
            return e4.resolve && e4.resolve(true);
          }), this.video.addEventListener("loadeddata", function() {
            return e4.resolve && e4.resolve(false);
          }), this.image.onload = function() {
            return e4.resolve && e4.resolve(true);
          }, this.image.onerror = function() {
            return e4.resolve && e4.resolve(false);
          };
        } }, { key: "load", value: function load(e4) {
          var t4 = this;
          return new Promise(function(n3) {
            e4 || n3(true), t4.resolve = n3, t4.loading = true, t4.ended = false, e4.match(/\.(mp4|webm)/i) && t4.video.setAttribute("src", e4), e4.match(/\.(png|jp(e)?g|gif|webp)/i) && (t4.image.src = e4, (t4.image.width > 0 || t4.image.height > 0) && n3(true));
          });
        } }, { key: "loadImage", value: function loadImage(e4) {
          var t4 = this, n3 = new Image(), o3 = false;
          n3.onload = function() {
            o3 || t4.pumpLoaded();
          }, n3.onerror = function() {
            o3 || t4.pumpLoaded();
          }, n3.src = e4, o3 === false && (n3.width > 0 || n3.height > 0) && (o3 = true, this.pumpLoaded());
        } }, { key: "loadVideo", value: function loadVideo(e4) {
          var t4 = this, n3 = document.createElement("video");
          n3.addEventListener("loadeddata", function() {
            t4.pumpLoaded();
          }), n3.addEventListener("error", function() {
            t4.pumpLoaded();
          }), n3.setAttribute("src", e4);
        } }, { key: "pumpLoaded", value: function pumpLoaded() {
          this.loaded += 1, this.loaded === this.toLoad && this.resolver(true);
        } }, { key: "startLoad", value: function startLoad(e4) {
          e4.match(/\.(mp4|webm)/i) && this.loadVideo(e4), e4.match(/\.(png|jp(e)?g|gif|webp)/i) && this.loadImage(e4);
        } }, { key: "loadMultiple", value: function loadMultiple(e4) {
          var t4 = this;
          return this.loaded = 0, this.toLoad = e4.length, new Promise(function(n3) {
            t4.resolver = n3, e4.forEach(function(e5) {
              t4.startLoad(e5);
            });
          });
        } }]), MediaLoader;
      }();
      function classToModules() {
        var e4 = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [], t4 = arguments.length > 1 ? arguments[1] : void 0;
        if (!t4)
          return e4.join(" ").trim();
        for (var n3 = [], o3 = e4.length; o3--; )
          t4[e4[o3]] && n3.push(t4[e4[o3]]);
        return n3;
      }
      function getClassName() {
        var e4 = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "", t4 = arguments.length > 1 ? arguments[1] : void 0;
        return t4 && t4[e4] || e4;
      }
    }, function(e3, t3, n2) {
      n2.d(t3, "a", function() {
        return r2;
      }), n2.d(t3, "b", function() {
        return i2;
      }), n2.d(t3, "c", function() {
        return a2;
      }), n2.d(t3, "e", function() {
        return s2;
      }), n2.d(t3, "d", function() {
        return getRootClassName;
      }), n2.d(t3, "g", function() {
        return transformChildren;
      }), n2.d(t3, "f", function() {
        return setupClassNames;
      });
      var o2 = n2(0);
      function _toConsumableArray2(e4) {
        return function _arrayWithoutHoles2(e5) {
          if (Array.isArray(e5)) {
            for (var t4 = 0, n3 = new Array(e5.length); t4 < e5.length; t4++)
              n3[t4] = e5[t4];
            return n3;
          }
        }(e4) || function _iterableToArray2(e5) {
          if (Symbol.iterator in Object(e5) || Object.prototype.toString.call(e5) === "[object Arguments]")
            return Array.from(e5);
        }(e4) || function _nonIterableSpread2() {
          throw new TypeError("Invalid attempt to spread non-iterable instance");
        }();
      }
      function ownKeys(e4, t4) {
        var n3 = Object.keys(e4);
        if (Object.getOwnPropertySymbols) {
          var o3 = Object.getOwnPropertySymbols(e4);
          t4 && (o3 = o3.filter(function(t5) {
            return Object.getOwnPropertyDescriptor(e4, t5).enumerable;
          })), n3.push.apply(n3, o3);
        }
        return n3;
      }
      function _objectSpread(e4) {
        for (var t4 = 1; t4 < arguments.length; t4++) {
          var n3 = arguments[t4] != null ? arguments[t4] : {};
          t4 % 2 ? ownKeys(Object(n3), true).forEach(function(t5) {
            _defineProperty2(e4, t5, n3[t5]);
          }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e4, Object.getOwnPropertyDescriptors(n3)) : ownKeys(Object(n3)).forEach(function(t5) {
            Object.defineProperty(e4, t5, Object.getOwnPropertyDescriptor(n3, t5));
          });
        }
        return e4;
      }
      function _defineProperty2(e4, t4, n3) {
        return t4 in e4 ? Object.defineProperty(e4, t4, { value: n3, enumerable: true, configurable: true, writable: true }) : e4[t4] = n3, e4;
      }
      var r2 = function classListAdd(e4, t4) {
        typeof t4 == "string" && e4 && t4.split(" ").forEach(function(t5) {
          e4.classList.add(t5);
        });
      }, i2 = function classListRemove(e4, t4) {
        typeof t4 == "string" && e4 && t4.split(" ").forEach(function(t5) {
          e4.classList.remove(t5);
        });
      }, a2 = function getAnyClassName(e4) {
        return typeof e4 == "string" && e4.split(" ")[0] || "";
      }, s2 = function mergeStyles(e4) {
        var t4 = Array.isArray(e4) ? e4 : [e4];
        if (t4.length === 1)
          return t4[0];
        for (var n3 = _objectSpread({}, t4[0]), o3 = 1; o3 < t4.length; o3 += 1) {
          for (var r3 in n3)
            t4[o3][r3] && (n3[r3] = [n3[r3], t4[o3][r3]].join(" "));
          for (var i3 in t4[o3])
            n3[i3] || (n3[i3] = t4[o3][i3]);
        }
        return n3;
      };
      function getRootClassName(e4) {
        var t4, n3 = e4.rootElement, r3 = e4.cssModule, i3 = e4.disabled, a3 = e4.organicArrows, s3 = e4.className, c2 = e4.total, l2 = e4.current, u2 = e4.infinite, d2 = e4.animation, f2 = e4.fillParent, p2 = [n3];
        (d2 && p2.push("".concat(n3, "--").concat(d2)), a3 === true && p2.push("".concat(n3, "--organic-arrows")), i3 === true && p2.push("".concat(n3, "--disabled")), f2 && p2.push("".concat(n3, "--fill-parent")), u2 === false && (l2 === 0 && p2.push("".concat(n3, "--first")), l2 === c2 - 1 && p2.push("".concat(n3, "--last"))), r3 && r3[n3] && (p2 = Object(o2.b)(p2, r3)), s3) && (t4 = p2).push.apply(t4, _toConsumableArray2(s3.split(" ")));
        return p2.join(" ").trim().replace(/[\s]+/gi, " ");
      }
      function transformChildren(e4) {
        var t4 = [];
        return (e4.constructor === Array ? e4 : [e4]).forEach(function(e5) {
          var n3 = _objectSpread({}, e5.props);
          e5.props["data-src"] && (n3.source = e5.props["data-src"]), e5.props["data-slug"] && (n3.slug = e5.props["data-slug"]), t4.push(n3);
        }), t4;
      }
      function setupClassNames(e4, t4) {
        return { boxA: Object(o2.c)("".concat(e4, "__boxA"), t4), boxB: Object(o2.c)("".concat(e4, "__boxB"), t4), box: Object(o2.c)("".concat(e4, "__box"), t4), container: Object(o2.c)("".concat(e4, "__container"), t4), wrapper: Object(o2.c)("".concat(e4, "__wrapper"), t4), bar: Object(o2.c)("".concat(e4, "__bar"), t4), barActive: Object(o2.c)("".concat(e4, "__bar--active"), t4), barEnd: Object(o2.c)("".concat(e4, "__bar--end"), t4), content: Object(o2.c)("".concat(e4, "__content"), t4), contentStatic: Object(o2.c)("".concat(e4, "__content--static"), t4), contentMoveLeft: Object(o2.c)("".concat(e4, "__content--moveLeft"), t4), contentMoveRight: Object(o2.c)("".concat(e4, "__content--moveRight"), t4), controlsHidden: Object(o2.c)("".concat(e4, "__controls--hidden"), t4), controlsActive: Object(o2.c)("".concat(e4, "__controls--active"), t4), animated: Object(o2.c)("".concat(e4, "--animated"), t4), animatedMobile: Object(o2.c)("".concat(e4, "--animated-mobile"), t4), contentExit: Object(o2.c)("".concat(e4, "__content--exit"), t4), exit: Object(o2.c)("".concat(e4, "--exit"), t4), active: Object(o2.c)("".concat(e4, "--active"), t4), moveLeft: Object(o2.c)("".concat(e4, "--moveLeft"), t4), moveRight: Object(o2.c)("".concat(e4, "--moveRight"), t4), startUp: Object(o2.c)("".concat(e4, "__startUp"), t4), bulletsLoading: Object(o2.c)("".concat(e4, "__bullets--loading"), t4) };
      }
    }, function(t3, n2) {
      t3.exports = e2;
    }, function(e3, n2) {
      e3.exports = t2;
    }, function(e3, t3, n2) {
      e3.exports = function(e4) {
        var n3 = {};
        function t4(o2) {
          if (n3[o2])
            return n3[o2].exports;
          var r2 = n3[o2] = { i: o2, l: false, exports: {} };
          return e4[o2].call(r2.exports, r2, r2.exports, t4), r2.l = true, r2.exports;
        }
        return t4.m = e4, t4.c = n3, t4.d = function(e5, n4, o2) {
          t4.o(e5, n4) || Object.defineProperty(e5, n4, { enumerable: true, get: o2 });
        }, t4.r = function(e5) {
          typeof Symbol != "undefined" && Symbol.toStringTag && Object.defineProperty(e5, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(e5, "__esModule", { value: true });
        }, t4.t = function(e5, n4) {
          if (1 & n4 && (e5 = t4(e5)), 8 & n4)
            return e5;
          if (4 & n4 && typeof e5 == "object" && e5 && e5.__esModule)
            return e5;
          var o2 = Object.create(null);
          if (t4.r(o2), Object.defineProperty(o2, "default", { enumerable: true, value: e5 }), 2 & n4 && typeof e5 != "string")
            for (var r2 in e5)
              t4.d(o2, r2, function(t5) {
                return e5[t5];
              }.bind(null, r2));
          return o2;
        }, t4.n = function(e5) {
          var n4 = e5 && e5.__esModule ? function() {
            return e5.default;
          } : function() {
            return e5;
          };
          return t4.d(n4, "a", n4), n4;
        }, t4.o = function(e5, t5) {
          return Object.prototype.hasOwnProperty.call(e5, t5);
        }, t4.p = "", t4(t4.s = 0);
      }([function(e4, t4, n3) {
        function o2(e5, t5) {
          var n4 = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {}, o3 = n4.tolerance, r3 = o3 === void 0 ? 0 : o3, i2 = n4.propertyName;
          return new Promise(function(n5) {
            if (e5) {
              var o4 = null, a2 = t5.charAt(0).toUpperCase() + t5.slice(1), s2 = 0;
              e5.style["Webkit" + a2] !== void 0 && (o4 = "webkit" + a2 + "End"), e5.style.OTransition !== void 0 && (o4 = "o" + t5 + "End"), e5.style[t5] !== void 0 && (o4 = t5 + "end"), e5.clearCssEndEvent && e5.clearCssEndEvent(), e5.clearCssEndEvent = function() {
                e5.removeEventListener(o4, c2);
              }, e5.addEventListener(o4, c2);
            } else
              n5(false);
            function c2(t6) {
              if ((t6.srcElement || t6.target) === e5) {
                if (s2 >= r3) {
                  if (i2 && i2 !== t6.propertyName)
                    return;
                  e5.removeEventListener(o4, c2), n5(t6);
                }
                s2 += 1;
              }
            }
          });
        }
        function r2(e5) {
          window && window.requestAnimationFrame(function() {
            window.requestAnimationFrame(e5);
          });
        }
        Object.defineProperty(t4, "__esModule", { value: true }), t4.setCssEndEvent = o2, t4.beforeCssLayout = function(e5) {
          window && window.requestAnimationFrame(e5);
        }, t4.beforeNextCssLayout = r2, t4.beforeFutureCssLayout = function(e5, t5) {
          !function e6(t6, n4) {
            window && t6 && Number.isInteger(t6) && t6 > 0 ? window.requestAnimationFrame(function() {
              e6(t6 - 1, n4);
            }) : n4();
          }(e5 + 1, t5);
        }, t4.onceNextCssLayout = function() {
          return new Promise(function(e5) {
            r2(e5);
          });
        }, t4.onceTransitionEnd = function(e5) {
          var t5 = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
          return new Promise(function(n4) {
            o2(e5, "transition", t5).then(n4);
          });
        }, t4.onceAnimationEnd = function(e5) {
          var t5 = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
          return new Promise(function(n4) {
            o2(e5, "animation", t5).then(n4);
          });
        };
      }]);
    }, function(e3, t3, n2) {
      e3.exports = n2(13);
    }, , , , , , , , function(e3, t3, n2) {
      n2.r(t3);
      var o2 = n2(3), r2 = n2.n(o2), i2 = n2(2), a2 = n2.n(i2), s2 = n2(4), c2 = n2(0), l2 = n2(1);
      function _typeof2(e4) {
        return (_typeof2 = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function _typeof3(e5) {
          return typeof e5;
        } : function _typeof3(e5) {
          return e5 && typeof Symbol == "function" && e5.constructor === Symbol && e5 !== Symbol.prototype ? "symbol" : typeof e5;
        })(e4);
      }
      function _defineProperties2(e4, t4) {
        for (var n3 = 0; n3 < t4.length; n3++) {
          var o3 = t4[n3];
          o3.enumerable = o3.enumerable || false, o3.configurable = true, "value" in o3 && (o3.writable = true), Object.defineProperty(e4, o3.key, o3);
        }
      }
      function _getPrototypeOf(e4) {
        return (_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf2(e5) {
          return e5.__proto__ || Object.getPrototypeOf(e5);
        })(e4);
      }
      function _assertThisInitialized2(e4) {
        if (e4 === void 0)
          throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return e4;
      }
      function _setPrototypeOf2(e4, t4) {
        return (_setPrototypeOf2 = Object.setPrototypeOf || function _setPrototypeOf3(e5, t5) {
          return e5.__proto__ = t5, e5;
        })(e4, t4);
      }
      function _defineProperty2(e4, t4, n3) {
        return t4 in e4 ? Object.defineProperty(e4, t4, { value: n3, enumerable: true, configurable: true, writable: true }) : e4[t4] = n3, e4;
      }
      var u2 = function(e4) {
        function Bullets(e5) {
          var t4;
          return function _classCallCheck2(e6, t5) {
            if (!(e6 instanceof t5))
              throw new TypeError("Cannot call a class as a function");
          }(this, Bullets), t4 = function _possibleConstructorReturn2(e6, t5) {
            return !t5 || _typeof2(t5) !== "object" && typeof t5 != "function" ? _assertThisInitialized2(e6) : t5;
          }(this, _getPrototypeOf(Bullets).call(this, e5)), _defineProperty2(_assertThisInitialized2(t4), "bulletClick", function(e6) {
            var n3 = e6.currentTarget;
            n3.classList.add(Object(c2.c)("".concat(t4.rootElement, "__bullets--loading"), t4.props.cssModule));
            var o3 = parseInt(n3.getAttribute("data-index"), 10), r3 = !(t4.props.selected > o3);
            t4.props.onClick({ index: o3, direction: r3 });
          }), t4.rootElement = e5.rootElement, t4;
        }
        return function _inherits2(e5, t4) {
          if (typeof t4 != "function" && t4 !== null)
            throw new TypeError("Super expression must either be null or a function");
          e5.prototype = Object.create(t4 && t4.prototype, { constructor: { value: e5, writable: true, configurable: true } }), t4 && _setPrototypeOf2(e5, t4);
        }(Bullets, e4), function _createClass2(e5, t4, n3) {
          return t4 && _defineProperties2(e5.prototype, t4), n3 && _defineProperties2(e5, n3), e5;
        }(Bullets, [{ key: "renderBullets", value: function renderBullets() {
          var e5 = this, t4 = this.props, n3 = t4.cssModule, o3 = t4.selected, i3 = t4.media;
          return (i3 === void 0 ? [] : i3).map(function(t5, i4) {
            var a3 = i4 === o3 ? Object(c2.c)("".concat(e5.rootElement, "__bullets--active"), n3) : null;
            return r2.a.createElement("button", { key: "bullet-".concat(i4), "data-index": i4, onClick: e5.bulletClick, className: a3 }, i4);
          });
        } }, { key: "render", value: function render3() {
          var e5 = this.props, t4 = e5.cssModule, n3 = e5.rootElement;
          return r2.a.createElement("nav", { className: Object(c2.c)("".concat(n3, "__bullets"), t4) }, this.renderBullets());
        } }]), Bullets;
      }(r2.a.Component);
      function buttons_typeof(e4) {
        return (buttons_typeof = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function _typeof3(e5) {
          return typeof e5;
        } : function _typeof3(e5) {
          return e5 && typeof Symbol == "function" && e5.constructor === Symbol && e5 !== Symbol.prototype ? "symbol" : typeof e5;
        })(e4);
      }
      function buttons_defineProperties(e4, t4) {
        for (var n3 = 0; n3 < t4.length; n3++) {
          var o3 = t4[n3];
          o3.enumerable = o3.enumerable || false, o3.configurable = true, "value" in o3 && (o3.writable = true), Object.defineProperty(e4, o3.key, o3);
        }
      }
      function buttons_possibleConstructorReturn(e4, t4) {
        return !t4 || buttons_typeof(t4) !== "object" && typeof t4 != "function" ? function buttons_assertThisInitialized(e5) {
          if (e5 === void 0)
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
          return e5;
        }(e4) : t4;
      }
      function buttons_getPrototypeOf(e4) {
        return (buttons_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf2(e5) {
          return e5.__proto__ || Object.getPrototypeOf(e5);
        })(e4);
      }
      function buttons_setPrototypeOf(e4, t4) {
        return (buttons_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf3(e5, t5) {
          return e5.__proto__ = t5, e5;
        })(e4, t4);
      }
      function buttons_defineProperty(e4, t4, n3) {
        return t4 in e4 ? Object.defineProperty(e4, t4, { value: n3, enumerable: true, configurable: true, writable: true }) : e4[t4] = n3, e4;
      }
      _defineProperty2(u2, "propTypes", { cssModule: a2.a.object, rootElement: a2.a.string.isRequired, media: a2.a.array, onClick: a2.a.func, selected: a2.a.number }), _defineProperty2(u2, "defaultProps", { cssModule: null, selected: 0, media: [], onClick: function onClick() {
      } });
      var d2 = function(e4) {
        function Buttons() {
          return function buttons_classCallCheck(e5, t4) {
            if (!(e5 instanceof t4))
              throw new TypeError("Cannot call a class as a function");
          }(this, Buttons), buttons_possibleConstructorReturn(this, buttons_getPrototypeOf(Buttons).apply(this, arguments));
        }
        return function buttons_inherits(e5, t4) {
          if (typeof t4 != "function" && t4 !== null)
            throw new TypeError("Super expression must either be null or a function");
          e5.prototype = Object.create(t4 && t4.prototype, { constructor: { value: e5, writable: true, configurable: true } }), t4 && buttons_setPrototypeOf(e5, t4);
        }(Buttons, e4), function buttons_createClass(e5, t4, n3) {
          return t4 && buttons_defineProperties(e5.prototype, t4), n3 && buttons_defineProperties(e5, n3), e5;
        }(Buttons, [{ key: "componentDidMount", value: function componentDidMount() {
          this.props.onMount({ element: this.controls, next: this.next, prev: this.prev });
        } }, { key: "render", value: function render3() {
          var e5 = this, t4 = this.props, n3 = t4.rootElement, o3 = t4.cssModule, i3 = t4.organicArrows, a3 = t4.buttonContentLeft, s3 = t4.buttonContentRight, l3 = t4.onNext, u3 = t4.onPrev;
          return r2.a.createElement("div", { ref: function ref(t5) {
            e5.controls = t5, e5.props.onMount({ element: e5.controls, next: e5.next || null, prev: e5.prev || null });
          }, className: [Object(c2.c)("".concat(n3, "__controls"), o3), Object(c2.c)("".concat(n3, "__controls--hidden"), o3)].join(" ") }, r2.a.createElement("button", { ref: function ref(t5) {
            e5.next = t5;
          }, "aria-label": "next", className: Object(c2.c)("".concat(n3, "__next"), o3), onClick: l3 }, i3 ? r2.a.createElement("span", { className: Object(c2.c)("".concat(n3, "__controls__arrow-right"), o3) }) : s3), r2.a.createElement("button", { ref: function ref(t5) {
            e5.prev = t5;
          }, "aria-label": "previous", className: Object(c2.c)("".concat(n3, "__prev"), o3), onClick: u3 }, i3 ? r2.a.createElement("span", { className: Object(c2.c)("".concat(n3, "__controls__arrow-left"), o3) }) : a3));
        } }]), Buttons;
      }(r2.a.Component);
      function media_typeof(e4) {
        return (media_typeof = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function _typeof3(e5) {
          return typeof e5;
        } : function _typeof3(e5) {
          return e5 && typeof Symbol == "function" && e5.constructor === Symbol && e5 !== Symbol.prototype ? "symbol" : typeof e5;
        })(e4);
      }
      function _extends2() {
        return (_extends2 = Object.assign || function(e4) {
          for (var t4 = 1; t4 < arguments.length; t4++) {
            var n3 = arguments[t4];
            for (var o3 in n3)
              Object.prototype.hasOwnProperty.call(n3, o3) && (e4[o3] = n3[o3]);
          }
          return e4;
        }).apply(this, arguments);
      }
      function _objectWithoutProperties2(e4, t4) {
        if (e4 == null)
          return {};
        var n3, o3, r3 = function _objectWithoutPropertiesLoose2(e5, t5) {
          if (e5 == null)
            return {};
          var n4, o4, r4 = {}, i4 = Object.keys(e5);
          for (o4 = 0; o4 < i4.length; o4++)
            n4 = i4[o4], t5.indexOf(n4) >= 0 || (r4[n4] = e5[n4]);
          return r4;
        }(e4, t4);
        if (Object.getOwnPropertySymbols) {
          var i3 = Object.getOwnPropertySymbols(e4);
          for (o3 = 0; o3 < i3.length; o3++)
            n3 = i3[o3], t4.indexOf(n3) >= 0 || Object.prototype.propertyIsEnumerable.call(e4, n3) && (r3[n3] = e4[n3]);
        }
        return r3;
      }
      function media_defineProperties(e4, t4) {
        for (var n3 = 0; n3 < t4.length; n3++) {
          var o3 = t4[n3];
          o3.enumerable = o3.enumerable || false, o3.configurable = true, "value" in o3 && (o3.writable = true), Object.defineProperty(e4, o3.key, o3);
        }
      }
      function media_getPrototypeOf(e4) {
        return (media_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf2(e5) {
          return e5.__proto__ || Object.getPrototypeOf(e5);
        })(e4);
      }
      function media_assertThisInitialized(e4) {
        if (e4 === void 0)
          throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return e4;
      }
      function media_setPrototypeOf(e4, t4) {
        return (media_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf3(e5, t5) {
          return e5.__proto__ = t5, e5;
        })(e4, t4);
      }
      function media_defineProperty(e4, t4, n3) {
        return t4 in e4 ? Object.defineProperty(e4, t4, { value: n3, enumerable: true, configurable: true, writable: true }) : e4[t4] = n3, e4;
      }
      buttons_defineProperty(d2, "propTypes", { cssModule: a2.a.object, rootElement: a2.a.string.isRequired, onMount: a2.a.func.isRequired, onNext: a2.a.func.isRequired, onPrev: a2.a.func.isRequired, buttonContentLeft: a2.a.node, buttonContentRight: a2.a.node, organicArrows: a2.a.bool }), buttons_defineProperty(d2, "defaultProps", { cssModule: null, organicArrows: true, buttonContentLeft: null, buttonContentRight: null });
      var f2 = function(e4) {
        function Media() {
          var e5, t4;
          !function media_classCallCheck(e6, t5) {
            if (!(e6 instanceof t5))
              throw new TypeError("Cannot call a class as a function");
          }(this, Media);
          for (var n3 = arguments.length, o3 = new Array(n3), r3 = 0; r3 < n3; r3++)
            o3[r3] = arguments[r3];
          return t4 = function media_possibleConstructorReturn(e6, t5) {
            return !t5 || media_typeof(t5) !== "object" && typeof t5 != "function" ? media_assertThisInitialized(e6) : t5;
          }(this, (e5 = media_getPrototypeOf(Media)).call.apply(e5, [this].concat(o3))), media_defineProperty(media_assertThisInitialized(t4), "state", {}), t4;
        }
        return function media_inherits(e5, t4) {
          if (typeof t4 != "function" && t4 !== null)
            throw new TypeError("Super expression must either be null or a function");
          e5.prototype = Object.create(t4 && t4.prototype, { constructor: { value: e5, writable: true, configurable: true } }), t4 && media_setPrototypeOf(e5, t4);
        }(Media, e4), function media_createClass(e5, t4, n3) {
          return t4 && media_defineProperties(e5.prototype, t4), n3 && media_defineProperties(e5, n3), e5;
        }(Media, [{ key: "render", value: function render3() {
          var e5 = this.props, t4 = e5.media, n3 = e5.className, o3 = t4.source, i3 = t4.children, a3 = t4.style, s3 = (t4.loader, t4["data-src"], t4["data-alt"], t4.className), c3 = (t4.onTransitionEnd, t4.onTransitionStartOut, t4.onTransitionStartIn, t4.onTransitionRequestOut, t4.onTransitionRequestIn, _objectWithoutProperties2(t4, ["source", "children", "style", "loader", "data-src", "data-alt", "className", "onTransitionEnd", "onTransitionStartOut", "onTransitionStartIn", "onTransitionRequestOut", "onTransitionRequestIn"])), l3 = null;
          return o3 && (l3 = o3.match(/\.(mp4|webm)/) ? r2.a.createElement("video", { title: t4.title || t4["data-title"], src: o3, type: "video/mp4", controls: true }) : r2.a.createElement("img", { alt: t4.alt || t4.title || t4["data-alt"] || null, src: o3 })), r2.a.createElement("div", _extends2({ className: n3, style: a3 || null }, c3), l3, i3 && r2.a.createElement("div", { className: s3 }, t4.children));
        } }]), Media;
      }(r2.a.Component);
      function core_typeof(e4) {
        return (core_typeof = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function _typeof3(e5) {
          return typeof e5;
        } : function _typeof3(e5) {
          return e5 && typeof Symbol == "function" && e5.constructor === Symbol && e5 !== Symbol.prototype ? "symbol" : typeof e5;
        })(e4);
      }
      function core_extends() {
        return (core_extends = Object.assign || function(e4) {
          for (var t4 = 1; t4 < arguments.length; t4++) {
            var n3 = arguments[t4];
            for (var o3 in n3)
              Object.prototype.hasOwnProperty.call(n3, o3) && (e4[o3] = n3[o3]);
          }
          return e4;
        }).apply(this, arguments);
      }
      function _toConsumableArray2(e4) {
        return function _arrayWithoutHoles2(e5) {
          if (Array.isArray(e5)) {
            for (var t4 = 0, n3 = new Array(e5.length); t4 < e5.length; t4++)
              n3[t4] = e5[t4];
            return n3;
          }
        }(e4) || function _iterableToArray2(e5) {
          if (Symbol.iterator in Object(e5) || Object.prototype.toString.call(e5) === "[object Arguments]")
            return Array.from(e5);
        }(e4) || function _nonIterableSpread2() {
          throw new TypeError("Invalid attempt to spread non-iterable instance");
        }();
      }
      function ownKeys(e4, t4) {
        var n3 = Object.keys(e4);
        if (Object.getOwnPropertySymbols) {
          var o3 = Object.getOwnPropertySymbols(e4);
          t4 && (o3 = o3.filter(function(t5) {
            return Object.getOwnPropertyDescriptor(e4, t5).enumerable;
          })), n3.push.apply(n3, o3);
        }
        return n3;
      }
      function _objectSpread(e4) {
        for (var t4 = 1; t4 < arguments.length; t4++) {
          var n3 = arguments[t4] != null ? arguments[t4] : {};
          t4 % 2 ? ownKeys(Object(n3), true).forEach(function(t5) {
            core_defineProperty(e4, t5, n3[t5]);
          }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e4, Object.getOwnPropertyDescriptors(n3)) : ownKeys(Object(n3)).forEach(function(t5) {
            Object.defineProperty(e4, t5, Object.getOwnPropertyDescriptor(n3, t5));
          });
        }
        return e4;
      }
      function core_defineProperties(e4, t4) {
        for (var n3 = 0; n3 < t4.length; n3++) {
          var o3 = t4[n3];
          o3.enumerable = o3.enumerable || false, o3.configurable = true, "value" in o3 && (o3.writable = true), Object.defineProperty(e4, o3.key, o3);
        }
      }
      function core_getPrototypeOf(e4) {
        return (core_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf2(e5) {
          return e5.__proto__ || Object.getPrototypeOf(e5);
        })(e4);
      }
      function core_assertThisInitialized(e4) {
        if (e4 === void 0)
          throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return e4;
      }
      function core_setPrototypeOf(e4, t4) {
        return (core_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf3(e5, t5) {
          return e5.__proto__ = t5, e5;
        })(e4, t4);
      }
      function core_defineProperty(e4, t4, n3) {
        return t4 in e4 ? Object.defineProperty(e4, t4, { value: n3, enumerable: true, configurable: true, writable: true }) : e4[t4] = n3, e4;
      }
      media_defineProperty(f2, "propTypes", { media: a2.a.object.isRequired, className: a2.a.string.isRequired });
      var p2 = "awssld", b2 = new c2.a(), h2 = function(e4) {
        function AwesomeSlider2(e5) {
          var t4;
          return function core_classCallCheck(e6, t5) {
            if (!(e6 instanceof t5))
              throw new TypeError("Cannot call a class as a function");
          }(this, AwesomeSlider2), t4 = function core_possibleConstructorReturn(e6, t5) {
            return !t5 || core_typeof(t5) !== "object" && typeof t5 != "function" ? core_assertThisInitialized(e6) : t5;
          }(this, core_getPrototypeOf(AwesomeSlider2).call(this, e5)), core_defineProperty(core_assertThisInitialized(t4), "clickNext", function() {
            var e6 = t4.index === null ? 0 : t4.index + 1;
            t4.onTransitionRequest("next", e6), t4.goTo({ index: e6, direction: true });
          }), core_defineProperty(core_assertThisInitialized(t4), "clickPrev", function() {
            var e6 = t4.index - 1;
            t4.onTransitionRequest("prev", e6), t4.goTo({ index: e6, direction: false });
          }), core_defineProperty(core_assertThisInitialized(t4), "touchStart", function(e6) {
            if (!t4.animating && t4.index !== null) {
              var n3 = e6.nativeEvent;
              t4.touchStartPoint = n3.touches[0].clientX;
            }
          }), core_defineProperty(core_assertThisInitialized(t4), "touchMove", function(e6) {
            if (!t4.animating && t4.touchStartPoint) {
              var n3 = e6.nativeEvent, o3 = n3.touches[0].clientX - t4.touchStartPoint, r3 = t4[t4.active], i3 = t4[t4.loader], a3 = !(o3 > 0), s3 = Math.abs(o3);
              t4.touchEnabled !== false ? s3 >= 10 && (t4.loading === false ? t4.goTo({ index: a3 ? t4.index + 1 : t4.index - 1, direction: a3, touch: true }) : t4.direction === true ? (o3 += 10, Math.abs(o3) > r3.offsetWidth ? o3 = -r3.offsetWidth : o3 > 0 && (o3 = 0), r3.style.transform = "translate3d(".concat(o3, "px, 0, 0)"), i3.style.transform = "translate3d(calc(100% + ".concat(o3, "px), 0, 0)")) : (o3 -= 10, Math.abs(o3) > r3.offsetWidth ? o3 = r3.offsetWidth : o3 < 0 && (o3 = 0), r3.style.transform = "translate3d(".concat(o3, "px, 0, 0)"), i3.style.transform = "translate3d(calc(-100% + ".concat(o3, "px), 0, 0)"))) : s3 > 20 && (t4.touchEnabled = true, t4.touchStartPoint = n3.touches[0].clientX);
            }
          }), core_defineProperty(core_assertThisInitialized(t4), "touchEnd", function() {
            !t4.animating && t4.touchStartPoint && t4.loading && (t4.touchStartPoint = null, t4.animating = true, t4.touchEnabled = false, t4.animateMobileEnd(function() {
              t4.index = t4.nextIndex, t4.setState({ index: t4.index }), t4.onTransitionEnd(), t4.animating = false, t4.loading = false, t4.unchargeIndex();
            }));
          }), core_defineProperty(core_assertThisInitialized(t4), "bulletClick", function(e6) {
            var n3 = e6.currentTarget, o3 = parseInt(n3.getAttribute("data-index"), 10);
            t4.goTo({ index: o3, direction: !(t4.index > o3) }, function() {
              Object(s2.onceNextCssLayout)().then(function() {
                Object(l2.a)(n3, t4.classNames.bulletsLoading);
              });
            });
          }), t4.rootElement = e5.rootElement || p2, t4.boxA = null, t4.boxB = null, t4.loaded = [], t4.active = "boxA", t4.loader = "boxB", t4.nextIndex = null, t4.loading = false, t4.media = null, t4.started = false, t4.touchEnabled = false, t4.setupStartup(e5), t4;
        }
        return function core_inherits(e5, t4) {
          if (typeof t4 != "function" && t4 !== null)
            throw new TypeError("Super expression must either be null or a function");
          e5.prototype = Object.create(t4 && t4.prototype, { constructor: { value: e5, writable: true, configurable: true } }), t4 && core_setPrototypeOf(e5, t4);
        }(AwesomeSlider2, e4), function core_createClass(e5, t4, n3) {
          return t4 && core_defineProperties(e5.prototype, t4), n3 && core_defineProperties(e5, n3), e5;
        }(AwesomeSlider2, [{ key: "componentDidMount", value: function componentDidMount() {
          var e5 = this;
          Object(l2.a)(this.boxA, this.classNames.active), this.props.startupScreen && (this.buttons && (Object(l2.a)(this.buttons.element, this.classNames.controlsHidden), Object(l2.a)(this.buttons.element, this.classNames.controlsActive)), this.props.startup === true && this.media.length > 0 && this.startup()), this.props.onFirstMount && this.props.onFirstMount(_objectSpread({}, this.getInfo())), this.buttons && Object(s2.onceNextCssLayout)().then(function() {
            e5.buttons && e5.buttons.element && Object(l2.b)(e5.buttons.element, e5.classNames.controlsHidden);
          });
        } }, { key: "UNSAFE_componentWillReceiveProps", value: function UNSAFE_componentWillReceiveProps(e5) {
          if (this.checkChildren(e5), this.setupClassNames(Object(l2.e)(e5.cssModule)), e5.name === this.props.name)
            if (e5.startup !== true || this.started !== false)
              if (e5.selected === this.props.selected)
                this.refreshSlider();
              else {
                var t4 = this.getIndex(e5.selected), n3 = e5.infinite === true && t4 === 0 && this.index === this.media.length - 1 || !(this.index > t4);
                this.goTo({ index: t4, direction: n3 });
              }
            else
              this.startup();
          else
            this.resetSlider(e5.selected);
        } }, { key: "onTransitionStart", value: function onTransitionStart() {
          var e5 = this.media[this.index], t4 = this.media[this.nextIndex], n3 = _objectSpread({}, this.getInfo(), { nextSlide: this[this.loader], nextIndex: this.nextIndex, nextMedia: t4 });
          this.props.onTransitionStart && this.props.onTransitionStart(n3), e5 && e5.onTransitionStartOut && e5.onTransitionStartOut(n3), t4 && t4.onTransitionStartIn && t4.onTransitionStartIn(n3);
        } }, { key: "onTransitionRequest", value: function onTransitionRequest(e5, t4) {
          var n3 = this.media[this.index], o3 = this.checkIndex(t4), r3 = this.media[o3], i3 = _objectSpread({ eventName: e5 }, this.getInfo(), { nextSlide: null, nextIndex: o3, nextMedia: r3 });
          this.props.onTransitionRequest && this.props.onTransitionRequest(i3), n3 && n3.onTransitionRequestOut && n3.onTransitionRequestOut(i3), r3 && r3.onTransitionRequestIn && r3.onTransitionRequestIn(i3);
        } }, { key: "onTransitionEnd", value: function onTransitionEnd() {
          var e5 = this.media[this.index], t4 = _objectSpread({}, this.getInfo());
          this.props.onTransitionEnd && this.props.onTransitionEnd(t4), e5 && e5.onTransitionEnd && e5.onTransitionEnd(t4);
        } }, { key: "getRootClassName", value: function getRootClassName() {
          var e5 = this.props, t4 = e5.animation, n3 = e5.className, o3 = e5.cssModule, r3 = e5.disabled, i3 = e5.fillParent, a3 = e5.infinite, s3 = e5.organicArrows;
          return Object(l2.d)({ animation: t4, className: n3, cssModule: Object(l2.e)(o3), current: this.state.index, disabled: r3, fillParent: i3, infinite: a3, organicArrows: s3, rootElement: this.rootElement, total: this.media.length });
        } }, { key: "setupStartup", value: function setupStartup(e5) {
          if (this.checkChildren(e5), this.setupClassNames(Object(l2.e)(e5.cssModule)), e5.startupScreen) {
            var t4 = this.getIndex(this.props.selected);
            this.index = null, this.state = { index: this.index, boxA: { className: this.classNames.startUp, children: e5.startupScreen }, boxB: this.media[t4] || null };
          } else
            this.started = true, this.index = this.getIndex(this.props.selected), this.state = { index: this.index, boxA: this.media[this.index] || null, boxB: null };
        } }, { key: "getInfo", value: function getInfo() {
          return { slides: this.media.length, currentIndex: this.index, currentSlide: this[this.active], currentMedia: this.media[this.index], element: this.slider };
        } }, { key: "getProgressBar", value: function getProgressBar() {
          if (!document)
            return {};
          var e5 = document.createElement("div");
          return e5.className = this.classNames.bar, e5;
        } }, { key: "setupClassNames", value: function setupClassNames(e5) {
          this.classNames = Object(l2.f)(this.rootElement, e5);
        } }, { key: "getIndex", value: function getIndex(e5) {
          var t4 = 0;
          return typeof e5 == "number" ? e5 : (typeof e5 == "string" && this.media.forEach(function(n3, o3) {
            n3.slug === e5 && (t4 = o3);
          }), t4);
        } }, { key: "refreshSlider", value: function refreshSlider() {
          var e5;
          if (this.loading !== true && this.props.startup !== false && this.index !== null) {
            var t4 = this.index;
            this.setState((core_defineProperty(e5 = { index: t4 }, this.active, this.media[this.getIndex(t4)]), core_defineProperty(e5, this.loader, null), e5));
          }
        } }, { key: "startup", value: function startup() {
          var e5 = this;
          this.started = true, setTimeout(function() {
            e5.goTo({ index: e5.props.selected, direction: true, touch: false });
          }, this.props.startupDelay || 75);
        } }, { key: "resetSlider", value: function resetSlider() {
          var e5, t4 = this, n3 = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 0;
          this.index = n3, this.setState((core_defineProperty(e5 = { index: n3 }, this.active, this.media[this.getIndex(n3)]), core_defineProperty(e5, this.loader, null), e5), function() {
            t4.props.onResetSlider && t4.props.onResetSlider(_objectSpread({}, t4.getInfo()));
          });
        } }, { key: "checkChildren", value: function checkChildren(e5) {
          e5.children && (e5.children !== this.props.children || this.props.children && !this.media) ? this.media = Object(l2.g)(e5.children) : e5.media && e5.media.length ? this.media = e5.media : this.media || (this.media = []);
        } }, { key: "startBarAnimation", value: function startBarAnimation(e5) {
          var t4 = this, n3 = e5.active;
          return new Promise(function(e6) {
            t4.bar = t4.getProgressBar(), n3.appendChild(t4.bar), Object(s2.onceNextCssLayout)().then(function() {
              Object(s2.onceNextCssLayout)().then(function() {
                Object(l2.a)(t4.bar, t4.classNames.barActive), e6();
              });
            });
          });
        } }, { key: "endBarAnimation", value: function endBarAnimation(e5) {
          var t4 = this;
          this.bar && Object(s2.onceNextCssLayout)().then(function() {
            Object(s2.onceTransitionEnd)(t4.bar).then(function() {
              e5();
            }), Object(l2.a)(t4.bar, t4.classNames.barEnd);
          });
        } }, { key: "loadContent", value: function loadContent(e5, t4) {
          var n3 = this;
          return new Promise(function(o3, r3) {
            if (n3.props.onLoadStart || t4 && t4.onLoadStart) {
              var i3 = n3.props.onLoadStart || t4 && t4.onLoadStart;
              return n3.startBarAnimation({ active: e5 }), void i3(_objectSpread({ next: function next() {
                n3.endBarAnimation(function() {
                  o3(n3.bar);
                });
              }, error: r3 }, n3.getInfo()));
            }
            if (t4 && (t4.source || t4.preload)) {
              var a3 = t4.preload ? t4.preload : t4.source && [t4.source] || [];
              return n3.checkLoadedUrls(a3) === true ? void o3(null) : (n3.startBarAnimation({ active: e5 }), void b2.loadMultiple(a3).then(function() {
                n3.pushLoaded(a3), n3.endBarAnimation(function() {
                  o3(n3.bar);
                });
              }));
            }
            o3(null);
          });
        } }, { key: "pushLoaded", value: function pushLoaded(e5) {
          this.loaded = [].concat(_toConsumableArray2(this.loaded), _toConsumableArray2(e5));
        } }, { key: "checkLoadedUrls", value: function checkLoadedUrls(e5) {
          var t4 = this, n3 = true;
          return e5.forEach(function(e6) {
            t4.loaded.includes(e6) || (n3 = false);
          }), n3;
        } }, { key: "startAnimationMobile", value: function startAnimationMobile() {
          var e5 = this.direction, t4 = this[this.active], n3 = this[this.loader], o3 = e5 ? this.classNames.contentMoveRight : this.classNames.contentMoveLeft, r3 = e5 ? this.classNames.contentMoveLeft : this.classNames.contentMoveRight;
          this.props.onTransitionStart && this.props.onTransitionStart(_objectSpread({}, this.getInfo(), { nextSlide: this[this.loader], nextIndex: this.nextIndex, nextMedia: this.media[this.nextIndex] }));
          var i3 = t4.querySelector(".".concat(Object(l2.c)(this.classNames.content)));
          Object(l2.a)(i3, r3), Object(l2.a)(i3, this.classNames.contentExit);
          var a3 = n3.querySelector(".".concat(Object(l2.c)(this.classNames.content)));
          Object(l2.a)(a3, o3), Object(l2.a)(a3, this.classNames.contentStatic), Object(l2.a)(t4, this.classNames.animated), Object(l2.a)(n3, this.classNames.animated);
        } }, { key: "animateMobileEnd", value: function animateMobileEnd(e5) {
          var t4 = this, n3 = this.direction, o3 = this[this.active], r3 = this[this.loader], i3 = n3 ? this.classNames.moveLeft : this.classNames.moveRight, a3 = n3 ? this.classNames.contentMoveRight : this.classNames.contentMoveLeft, c3 = n3 ? this.classNames.contentMoveLeft : this.classNames.contentMoveRight, u3 = r3.querySelector(".".concat(Object(l2.c)(this.classNames.content))), d3 = o3.querySelector(".".concat(Object(l2.c)(this.classNames.content)));
          Object(l2.b)(u3, this.classNames.contentStatic), Object(l2.a)(r3, this.classNames.animatedMobile), Object(l2.a)(o3, this.classNames.animatedMobile), Object(s2.onceNextCssLayout)().then(function() {
            r3.style.transform = "translate3d(0, 0, 0)", o3.style.transform = "translate3d(".concat(t4.direction ? "-" : "", "100%, 0, 0)"), Object(s2.onceTransitionEnd)(o3).then(function() {
              t4.loading && (Object(l2.b)(o3, t4.classNames.animated), Object(l2.b)(r3, t4.classNames.animated), Object(l2.a)(r3, t4.classNames.active), Object(l2.b)(o3, t4.classNames.active), Object(l2.b)(o3, i3), Object(l2.b)(r3, t4.classNames.animatedMobile), Object(l2.b)(o3, t4.classNames.animatedMobile), Object(l2.b)(d3, c3), Object(l2.b)(d3, t4.classNames.contentExit), Object(l2.b)(u3, a3), t4.buttons && setTimeout(function() {
                t4.buttons && Object(l2.b)(t4.buttons.element, t4.classNames.controlsActive);
              }, t4.props.controlsReturnDelay), t4.activeArrow && (Object(l2.b)(t4.activeArrow, t4.activeArrowClass), t4.activeArrow = null, t4.activeArrowClass = null), t4.active = t4.active === "boxA" ? "boxB" : "boxA", t4.loader = t4.active === "boxA" ? "boxB" : "boxA", e5 && e5());
            });
          });
        } }, { key: "runAnimation", value: function runAnimation(e5) {
          var t4 = this, n3 = e5.active, o3 = e5.media, r3 = e5.contentExitMoveClass, i3 = e5.contentEnterMoveClass, a3 = e5.activeContentElement, c3 = e5.loaderContentElement, u3 = e5.loader, d3 = e5.loaderPosition, f3 = e5.exitPosition, p3 = e5.callback, b3 = e5.transitionDelay;
          this.loadContent(n3, o3).then(function(e6) {
            Object(l2.a)(a3, r3), Object(l2.a)(a3, t4.classNames.contentExit), Object(l2.a)(c3, i3), Object(l2.a)(c3, t4.classNames.contentStatic), setTimeout(function() {
              Object(s2.onceNextCssLayout)().then(function() {
                Object(l2.a)(n3, t4.classNames.animated), Object(l2.a)(u3, t4.classNames.animated), Object(l2.b)(c3, t4.classNames.contentStatic), Object(l2.a)(n3, t4.classNames.exit), Object(l2.a)(u3, d3), Object(l2.a)(n3, f3), Object(s2.onceAnimationEnd)(n3).then(function() {
                  Object(l2.a)(u3, t4.classNames.active), Object(l2.b)(u3, d3), Object(l2.b)(u3, t4.classNames.animated), Object(l2.b)(n3, t4.classNames.animated), Object(l2.b)(n3, t4.classNames.active), Object(l2.b)(n3, f3), Object(l2.b)(n3, t4.classNames.exit), Object(l2.b)(a3, r3), Object(l2.b)(a3, t4.classNames.contentExit), Object(l2.b)(c3, i3), e6 && n3.removeChild(e6), t4.buttons && setTimeout(function() {
                    t4.buttons && Object(l2.b)(t4.buttons.element, t4.classNames.controlsActive);
                  }, t4.props.controlsReturnDelay), t4.active = t4.active === "boxA" ? "boxB" : "boxA", t4.loader = t4.active === "boxA" ? "boxB" : "boxA";
                  var o4 = !t4.activeArrow;
                  t4.activeArrow && (Object(s2.onceTransitionEnd)(t4.activeArrow, { tolerance: t4.index === null ? 0 : 2 }).then(function() {
                    t4.releaseTransition();
                  }), Object(l2.b)(t4.activeArrow, t4.activeArrowClass), t4.activeArrow = null, t4.activeArrowClass = null), p3({ release: o4 });
                });
              });
            }, b3);
          });
        } }, { key: "releaseTransition", value: function releaseTransition() {
          this.loading = false;
        } }, { key: "startAnimation", value: function startAnimation(e5, t4, n3) {
          var o3 = this.props.transitionDelay, r3 = this[this.active], i3 = this[this.loader], a3 = e5 ? this.classNames.moveRight : this.classNames.moveLeft, s3 = e5 ? this.classNames.moveLeft : this.classNames.moveRight, c3 = e5 ? this.classNames.contentMoveRight : this.classNames.contentMoveLeft, u3 = e5 ? this.classNames.contentMoveLeft : this.classNames.contentMoveRight, d3 = r3.querySelector(".".concat(Object(l2.c)(this.classNames.content))), f3 = i3.querySelector(".".concat(Object(l2.c)(this.classNames.content)));
          r3.style.removeProperty("transform"), i3.style.removeProperty("transform"), this.onTransitionStart();
          var p3 = { active: r3, media: t4, contentExitMoveClass: u3, contentEnterMoveClass: c3, activeContentElement: d3, loaderContentElement: f3, loader: i3, loaderPosition: a3, exitPosition: s3, callback: n3, transitionDelay: o3 };
          this.runAnimation(p3);
        } }, { key: "goTo", value: function goTo(e5) {
          var t4 = this, n3 = e5.index, o3 = e5.direction, r3 = e5.touch, i3 = r3 !== void 0 && r3, a3 = this.getIndex(n3);
          this.loading !== true && n3 !== this.index ? (this.loading = true, this.direction = o3, i3 !== true ? this.activateArrows(o3, function() {
            t4.chargeIndex(a3, function(e6) {
              t4.renderedLoader = true, t4.startAnimation(o3, e6, function(e7) {
                var n4 = e7.release, o4 = n4 === void 0 || n4;
                t4.index = t4.nextIndex, t4.setState({ index: t4.index }, function() {
                  t4.onTransitionEnd(), o4 === true && t4.releaseTransition();
                });
              });
            });
          }) : this.chargeIndex(a3, function() {
            t4.activateArrows(o3), t4.startAnimationMobile();
          })) : this.props.onTransitionReject && this.props.onTransitionReject(_objectSpread({}, this.getInfo(), { forceTransition: function forceTransition() {
            t4.goTo({ index: n3, direction: o3, touch: i3 });
          } }));
        } }, { key: "checkIndex", value: function checkIndex(e5) {
          return e5 > this.media.length - 1 ? 0 : e5 < 0 ? this.media.length - 1 : e5;
        } }, { key: "chargeIndex", value: function chargeIndex(e5, t4) {
          this.nextIndex = this.checkIndex(e5);
          var n3 = {}, o3 = this.media[this.nextIndex];
          n3[this.loader] = _objectSpread({ loader: true }, o3), this.setState(n3, function() {
            t4(o3);
          });
        } }, { key: "unchargeIndex", value: function unchargeIndex() {
          var e5 = {};
          e5[this.loader] = null, this.setState(e5, function() {
          });
        } }, { key: "activateArrows", value: function activateArrows(e5, t4) {
          var n3 = e5 ? "right" : "left", o3 = Object(l2.e)(this.props.cssModule), r3 = Object(l2.c)(Object(c2.c)("".concat(this.rootElement, "__controls__arrow-").concat(n3), o3));
          if (this.buttons) {
            var i3 = e5 ? this.buttons.next : this.buttons.prev;
            this.activeArrow = i3.querySelector(".".concat(r3));
          }
          !this.activeArrow || this.buttons && this.buttons.element && this.buttons.element.classList.contains(this.classNames.controlsActive) ? t4 && t4() : (this.activeArrowClass = Object(c2.c)("".concat(this.rootElement, "__controls__arrow-").concat(n3, "--active"), o3), Object(s2.onceTransitionEnd)(this.activeArrow, { tolerance: this.index === null ? 0 : 2 }).then(function() {
            t4 && t4();
          }), this.buttons && this.buttons.element && (Object(l2.a)(this.buttons.element, this.classNames.controlsActive), Object(l2.a)(this.activeArrow, this.activeArrowClass)));
        } }, { key: "renderBox", value: function renderBox(e5) {
          var t4 = this, n3 = {};
          return this.props.mobileTouch && (n3.onTouchStart = this.touchStart, n3.onTouchMove = this.touchMove, n3.onTouchEnd = this.touchEnd), r2.a.createElement("div", core_extends({ ref: function ref(n4) {
            t4["box".concat(e5)] = n4;
          }, className: this.classNames.box }, n3), this.state["box".concat(e5)] && r2.a.createElement(f2, { media: this.state["box".concat(e5)], className: this.classNames.content }));
        } }, { key: "render", value: function render3() {
          var e5 = this, t4 = this.props, n3 = t4.cssModule, o3 = t4.organicArrows, i3 = t4.bullets, a3 = t4.style, s3 = t4.customContent, c3 = t4.buttons, f3 = t4.buttonContentLeft, p3 = t4.buttonContentRight, b3 = this.rootElement;
          return r2.a.createElement("div", { ref: function ref(t5) {
            e5.slider = t5;
          }, className: this.getRootClassName(), style: a3 }, r2.a.createElement("div", { ref: function ref(t5) {
            e5.wrapper = t5;
          }, className: this.classNames.wrapper }, r2.a.createElement("div", { ref: function ref(t5) {
            e5.container = t5;
          }, className: this.classNames.container }, this.renderBox("A"), this.renderBox("B")), c3 && r2.a.createElement(d2, { rootElement: b3, cssModule: Object(l2.e)(n3), onMount: function onMount(t5) {
            e5.buttons = t5;
          }, onNext: this.clickNext, onPrev: this.clickPrev, organicArrows: o3, buttonContentLeft: f3, buttonContentRight: p3 }), s3), i3 && r2.a.createElement(u2, { cssModule: Object(l2.e)(n3), rootElement: b3, media: this.media, selected: this.state.index, onClick: function onClick(t5) {
            e5.onTransitionRequest("bullet", t5.index), e5.goTo(t5);
          } }));
        } }]), AwesomeSlider2;
      }(r2.a.Component);
      core_defineProperty(h2, "propTypes", { animation: a2.a.string, bullets: a2.a.bool, buttonContentLeft: a2.a.node, buttonContentRight: a2.a.node, buttons: a2.a.bool, children: a2.a.node, className: a2.a.string, controlsReturnDelay: a2.a.number, cssModule: a2.a.any, customContent: a2.a.node, onLoadStart: a2.a.func, disabled: a2.a.bool, fillParent: a2.a.bool, infinite: a2.a.bool, media: a2.a.array, name: a2.a.string, onFirstMount: a2.a.func, onResetSlider: a2.a.func, onStartupRelease: a2.a.func, onTransitionEnd: a2.a.func, onTransitionRequest: a2.a.func, onTransitionStart: a2.a.func, organicArrows: a2.a.bool, rootElement: a2.a.string, selected: a2.a.any, startup: a2.a.bool, startupDelay: a2.a.number, startupScreen: a2.a.object, style: a2.a.object, transitionDelay: a2.a.number, mobileTouch: a2.a.bool }), core_defineProperty(h2, "defaultProps", { animation: null, bullets: true, buttonContentLeft: null, buttonContentRight: null, buttons: true, children: null, className: null, controlsReturnDelay: 0, cssModule: null, customContent: null, onLoadStart: null, disabled: false, fillParent: false, infinite: true, media: [], name: "awesome-slider", onFirstMount: null, onResetSlider: null, onStartupRelease: null, onTransitionEnd: null, onTransitionRequest: null, onTransitionStart: null, organicArrows: true, rootElement: p2, selected: 0, startup: true, startupDelay: 0, startupScreen: null, style: {}, transitionDelay: 0, mobileTouch: true });
      t3.default = h2;
    }]);
  });
})(dist);
var AwesomeSlider = /* @__PURE__ */ getDefaultExportFromCjs(dist.exports);
var autoplay = { exports: {} };
(function(module2, exports2) {
  !function webpackUniversalModuleDefinition(e2, t2) {
    module2.exports = t2(propTypes.exports, React__default);
  }(commonjsGlobal, function(e2, t2) {
    return function(e3) {
      var t3 = {};
      function __webpack_require__(n2) {
        if (t3[n2])
          return t3[n2].exports;
        var r2 = t3[n2] = { i: n2, l: false, exports: {} };
        return e3[n2].call(r2.exports, r2, r2.exports, __webpack_require__), r2.l = true, r2.exports;
      }
      return __webpack_require__.m = e3, __webpack_require__.c = t3, __webpack_require__.d = function(e4, t4, n2) {
        __webpack_require__.o(e4, t4) || Object.defineProperty(e4, t4, { enumerable: true, get: n2 });
      }, __webpack_require__.r = function(e4) {
        typeof Symbol != "undefined" && Symbol.toStringTag && Object.defineProperty(e4, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(e4, "__esModule", { value: true });
      }, __webpack_require__.t = function(e4, t4) {
        if (1 & t4 && (e4 = __webpack_require__(e4)), 8 & t4)
          return e4;
        if (4 & t4 && typeof e4 == "object" && e4 && e4.__esModule)
          return e4;
        var n2 = Object.create(null);
        if (__webpack_require__.r(n2), Object.defineProperty(n2, "default", { enumerable: true, value: e4 }), 2 & t4 && typeof e4 != "string")
          for (var r2 in e4)
            __webpack_require__.d(n2, r2, function(t5) {
              return e4[t5];
            }.bind(null, r2));
        return n2;
      }, __webpack_require__.n = function(e4) {
        var t4 = e4 && e4.__esModule ? function getDefault() {
          return e4.default;
        } : function getModuleExports() {
          return e4;
        };
        return __webpack_require__.d(t4, "a", t4), t4;
      }, __webpack_require__.o = function(e4, t4) {
        return Object.prototype.hasOwnProperty.call(e4, t4);
      }, __webpack_require__.p = "", __webpack_require__(__webpack_require__.s = 6);
    }([function(e3, t3, n2) {
      function _defineProperties2(e4, t4) {
        for (var n3 = 0; n3 < t4.length; n3++) {
          var r3 = t4[n3];
          r3.enumerable = r3.enumerable || false, r3.configurable = true, "value" in r3 && (r3.writable = true), Object.defineProperty(e4, r3.key, r3);
        }
      }
      n2.d(t3, "a", function() {
        return r2;
      }), n2.d(t3, "b", function() {
        return classToModules;
      }), n2.d(t3, "c", function() {
        return getClassName;
      });
      var r2 = function() {
        function MediaLoader() {
          !function _classCallCheck2(e4, t4) {
            if (!(e4 instanceof t4))
              throw new TypeError("Cannot call a class as a function");
          }(this, MediaLoader), typeof window != "undefined" && (this.image = new Image(), this.resolve = null, this.video = document.createElement("video"), this.events());
        }
        return function _createClass2(e4, t4, n3) {
          return t4 && _defineProperties2(e4.prototype, t4), n3 && _defineProperties2(e4, n3), e4;
        }(MediaLoader, [{ key: "events", value: function events() {
          var e4 = this;
          this.video.addEventListener("loadeddata", function() {
            return e4.resolve && e4.resolve(true);
          }), this.video.addEventListener("loadeddata", function() {
            return e4.resolve && e4.resolve(false);
          }), this.image.onload = function() {
            return e4.resolve && e4.resolve(true);
          }, this.image.onerror = function() {
            return e4.resolve && e4.resolve(false);
          };
        } }, { key: "load", value: function load(e4) {
          var t4 = this;
          return new Promise(function(n3) {
            e4 || n3(true), t4.resolve = n3, t4.loading = true, t4.ended = false, e4.match(/\.(mp4|webm)/i) && t4.video.setAttribute("src", e4), e4.match(/\.(png|jp(e)?g|gif|webp)/i) && (t4.image.src = e4, (t4.image.width > 0 || t4.image.height > 0) && n3(true));
          });
        } }, { key: "loadImage", value: function loadImage(e4) {
          var t4 = this, n3 = new Image(), r3 = false;
          n3.onload = function() {
            r3 || t4.pumpLoaded();
          }, n3.onerror = function() {
            r3 || t4.pumpLoaded();
          }, n3.src = e4, r3 === false && (n3.width > 0 || n3.height > 0) && (r3 = true, this.pumpLoaded());
        } }, { key: "loadVideo", value: function loadVideo(e4) {
          var t4 = this, n3 = document.createElement("video");
          n3.addEventListener("loadeddata", function() {
            t4.pumpLoaded();
          }), n3.addEventListener("error", function() {
            t4.pumpLoaded();
          }), n3.setAttribute("src", e4);
        } }, { key: "pumpLoaded", value: function pumpLoaded() {
          this.loaded += 1, this.loaded === this.toLoad && this.resolver(true);
        } }, { key: "startLoad", value: function startLoad(e4) {
          e4.match(/\.(mp4|webm)/i) && this.loadVideo(e4), e4.match(/\.(png|jp(e)?g|gif|webp)/i) && this.loadImage(e4);
        } }, { key: "loadMultiple", value: function loadMultiple(e4) {
          var t4 = this;
          return this.loaded = 0, this.toLoad = e4.length, new Promise(function(n3) {
            t4.resolver = n3, e4.forEach(function(e5) {
              t4.startLoad(e5);
            });
          });
        } }]), MediaLoader;
      }();
      function classToModules() {
        var e4 = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [], t4 = arguments.length > 1 ? arguments[1] : void 0;
        if (!t4)
          return e4.join(" ").trim();
        for (var n3 = [], r3 = e4.length; r3--; )
          t4[e4[r3]] && n3.push(t4[e4[r3]]);
        return n3;
      }
      function getClassName() {
        var e4 = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "", t4 = arguments.length > 1 ? arguments[1] : void 0;
        return t4 && t4[e4] || e4;
      }
    }, function(e3, t3, n2) {
      n2.d(t3, "a", function() {
        return o2;
      }), n2.d(t3, "b", function() {
        return i2;
      }), n2.d(t3, "c", function() {
        return c2;
      }), n2.d(t3, "e", function() {
        return a2;
      }), n2.d(t3, "d", function() {
        return getRootClassName;
      }), n2.d(t3, "g", function() {
        return transformChildren;
      }), n2.d(t3, "f", function() {
        return setupClassNames;
      });
      var r2 = n2(0);
      function _toConsumableArray2(e4) {
        return function _arrayWithoutHoles2(e5) {
          if (Array.isArray(e5)) {
            for (var t4 = 0, n3 = new Array(e5.length); t4 < e5.length; t4++)
              n3[t4] = e5[t4];
            return n3;
          }
        }(e4) || function _iterableToArray2(e5) {
          if (Symbol.iterator in Object(e5) || Object.prototype.toString.call(e5) === "[object Arguments]")
            return Array.from(e5);
        }(e4) || function _nonIterableSpread2() {
          throw new TypeError("Invalid attempt to spread non-iterable instance");
        }();
      }
      function ownKeys(e4, t4) {
        var n3 = Object.keys(e4);
        if (Object.getOwnPropertySymbols) {
          var r3 = Object.getOwnPropertySymbols(e4);
          t4 && (r3 = r3.filter(function(t5) {
            return Object.getOwnPropertyDescriptor(e4, t5).enumerable;
          })), n3.push.apply(n3, r3);
        }
        return n3;
      }
      function _objectSpread(e4) {
        for (var t4 = 1; t4 < arguments.length; t4++) {
          var n3 = arguments[t4] != null ? arguments[t4] : {};
          t4 % 2 ? ownKeys(Object(n3), true).forEach(function(t5) {
            _defineProperty2(e4, t5, n3[t5]);
          }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e4, Object.getOwnPropertyDescriptors(n3)) : ownKeys(Object(n3)).forEach(function(t5) {
            Object.defineProperty(e4, t5, Object.getOwnPropertyDescriptor(n3, t5));
          });
        }
        return e4;
      }
      function _defineProperty2(e4, t4, n3) {
        return t4 in e4 ? Object.defineProperty(e4, t4, { value: n3, enumerable: true, configurable: true, writable: true }) : e4[t4] = n3, e4;
      }
      var o2 = function classListAdd(e4, t4) {
        typeof t4 == "string" && e4 && t4.split(" ").forEach(function(t5) {
          e4.classList.add(t5);
        });
      }, i2 = function classListRemove(e4, t4) {
        typeof t4 == "string" && e4 && t4.split(" ").forEach(function(t5) {
          e4.classList.remove(t5);
        });
      }, c2 = function getAnyClassName(e4) {
        return typeof e4 == "string" && e4.split(" ")[0] || "";
      }, a2 = function mergeStyles(e4) {
        var t4 = Array.isArray(e4) ? e4 : [e4];
        if (t4.length === 1)
          return t4[0];
        for (var n3 = _objectSpread({}, t4[0]), r3 = 1; r3 < t4.length; r3 += 1) {
          for (var o3 in n3)
            t4[r3][o3] && (n3[o3] = [n3[o3], t4[r3][o3]].join(" "));
          for (var i3 in t4[r3])
            n3[i3] || (n3[i3] = t4[r3][i3]);
        }
        return n3;
      };
      function getRootClassName(e4) {
        var t4, n3 = e4.rootElement, o3 = e4.cssModule, i3 = e4.disabled, c3 = e4.organicArrows, a3 = e4.className, s2 = e4.total, u2 = e4.current, l2 = e4.infinite, f2 = e4.animation, d2 = e4.fillParent, p2 = [n3];
        (f2 && p2.push("".concat(n3, "--").concat(f2)), c3 === true && p2.push("".concat(n3, "--organic-arrows")), i3 === true && p2.push("".concat(n3, "--disabled")), d2 && p2.push("".concat(n3, "--fill-parent")), l2 === false && (u2 === 0 && p2.push("".concat(n3, "--first")), u2 === s2 - 1 && p2.push("".concat(n3, "--last"))), o3 && o3[n3] && (p2 = Object(r2.b)(p2, o3)), a3) && (t4 = p2).push.apply(t4, _toConsumableArray2(a3.split(" ")));
        return p2.join(" ").trim().replace(/[\s]+/gi, " ");
      }
      function transformChildren(e4) {
        var t4 = [];
        return (e4.constructor === Array ? e4 : [e4]).forEach(function(e5) {
          var n3 = _objectSpread({}, e5.props);
          e5.props["data-src"] && (n3.source = e5.props["data-src"]), e5.props["data-slug"] && (n3.slug = e5.props["data-slug"]), t4.push(n3);
        }), t4;
      }
      function setupClassNames(e4, t4) {
        return { boxA: Object(r2.c)("".concat(e4, "__boxA"), t4), boxB: Object(r2.c)("".concat(e4, "__boxB"), t4), box: Object(r2.c)("".concat(e4, "__box"), t4), container: Object(r2.c)("".concat(e4, "__container"), t4), wrapper: Object(r2.c)("".concat(e4, "__wrapper"), t4), bar: Object(r2.c)("".concat(e4, "__bar"), t4), barActive: Object(r2.c)("".concat(e4, "__bar--active"), t4), barEnd: Object(r2.c)("".concat(e4, "__bar--end"), t4), content: Object(r2.c)("".concat(e4, "__content"), t4), contentStatic: Object(r2.c)("".concat(e4, "__content--static"), t4), contentMoveLeft: Object(r2.c)("".concat(e4, "__content--moveLeft"), t4), contentMoveRight: Object(r2.c)("".concat(e4, "__content--moveRight"), t4), controlsHidden: Object(r2.c)("".concat(e4, "__controls--hidden"), t4), controlsActive: Object(r2.c)("".concat(e4, "__controls--active"), t4), animated: Object(r2.c)("".concat(e4, "--animated"), t4), animatedMobile: Object(r2.c)("".concat(e4, "--animated-mobile"), t4), contentExit: Object(r2.c)("".concat(e4, "__content--exit"), t4), exit: Object(r2.c)("".concat(e4, "--exit"), t4), active: Object(r2.c)("".concat(e4, "--active"), t4), moveLeft: Object(r2.c)("".concat(e4, "--moveLeft"), t4), moveRight: Object(r2.c)("".concat(e4, "--moveRight"), t4), startUp: Object(r2.c)("".concat(e4, "__startUp"), t4), bulletsLoading: Object(r2.c)("".concat(e4, "__bullets--loading"), t4) };
      }
    }, function(t3, n2) {
      t3.exports = e2;
    }, function(e3, n2) {
      e3.exports = t2;
    }, function(e3, t3, n2) {
      e3.exports = function(e4) {
        var n3 = {};
        function t4(r2) {
          if (n3[r2])
            return n3[r2].exports;
          var o2 = n3[r2] = { i: r2, l: false, exports: {} };
          return e4[r2].call(o2.exports, o2, o2.exports, t4), o2.l = true, o2.exports;
        }
        return t4.m = e4, t4.c = n3, t4.d = function(e5, n4, r2) {
          t4.o(e5, n4) || Object.defineProperty(e5, n4, { enumerable: true, get: r2 });
        }, t4.r = function(e5) {
          typeof Symbol != "undefined" && Symbol.toStringTag && Object.defineProperty(e5, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(e5, "__esModule", { value: true });
        }, t4.t = function(e5, n4) {
          if (1 & n4 && (e5 = t4(e5)), 8 & n4)
            return e5;
          if (4 & n4 && typeof e5 == "object" && e5 && e5.__esModule)
            return e5;
          var r2 = Object.create(null);
          if (t4.r(r2), Object.defineProperty(r2, "default", { enumerable: true, value: e5 }), 2 & n4 && typeof e5 != "string")
            for (var o2 in e5)
              t4.d(r2, o2, function(t5) {
                return e5[t5];
              }.bind(null, o2));
          return r2;
        }, t4.n = function(e5) {
          var n4 = e5 && e5.__esModule ? function() {
            return e5.default;
          } : function() {
            return e5;
          };
          return t4.d(n4, "a", n4), n4;
        }, t4.o = function(e5, t5) {
          return Object.prototype.hasOwnProperty.call(e5, t5);
        }, t4.p = "", t4(t4.s = 0);
      }([function(e4, t4, n3) {
        function o2(e5, t5) {
          var n4 = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {}, r3 = n4.tolerance, o3 = r3 === void 0 ? 0 : r3, i2 = n4.propertyName;
          return new Promise(function(n5) {
            if (e5) {
              var r4 = null, a2 = t5.charAt(0).toUpperCase() + t5.slice(1), s2 = 0;
              e5.style["Webkit" + a2] !== void 0 && (r4 = "webkit" + a2 + "End"), e5.style.OTransition !== void 0 && (r4 = "o" + t5 + "End"), e5.style[t5] !== void 0 && (r4 = t5 + "end"), e5.clearCssEndEvent && e5.clearCssEndEvent(), e5.clearCssEndEvent = function() {
                e5.removeEventListener(r4, c2);
              }, e5.addEventListener(r4, c2);
            } else
              n5(false);
            function c2(t6) {
              if ((t6.srcElement || t6.target) === e5) {
                if (s2 >= o3) {
                  if (i2 && i2 !== t6.propertyName)
                    return;
                  e5.removeEventListener(r4, c2), n5(t6);
                }
                s2 += 1;
              }
            }
          });
        }
        function r2(e5) {
          window && window.requestAnimationFrame(function() {
            window.requestAnimationFrame(e5);
          });
        }
        Object.defineProperty(t4, "__esModule", { value: true }), t4.setCssEndEvent = o2, t4.beforeCssLayout = function(e5) {
          window && window.requestAnimationFrame(e5);
        }, t4.beforeNextCssLayout = r2, t4.beforeFutureCssLayout = function(e5, t5) {
          !function e6(t6, n4) {
            window && t6 && Number.isInteger(t6) && t6 > 0 ? window.requestAnimationFrame(function() {
              e6(t6 - 1, n4);
            }) : n4();
          }(e5 + 1, t5);
        }, t4.onceNextCssLayout = function() {
          return new Promise(function(e5) {
            r2(e5);
          });
        }, t4.onceTransitionEnd = function(e5) {
          var t5 = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
          return new Promise(function(n4) {
            o2(e5, "transition", t5).then(n4);
          });
        }, t4.onceAnimationEnd = function(e5) {
          var t5 = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
          return new Promise(function(n4) {
            o2(e5, "animation", t5).then(n4);
          });
        };
      }]);
    }, , function(e3, t3, n2) {
      e3.exports = n2(7);
    }, function(e3, t3, n2) {
      n2.r(t3), n2.d(t3, "default", function() {
        return AutoplayHoc;
      });
      var r2 = n2(3), o2 = n2.n(r2), i2 = n2(4), c2 = n2(2), a2 = n2.n(c2), s2 = n2(0), u2 = n2(1);
      function _typeof2(e4) {
        return (_typeof2 = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function _typeof3(e5) {
          return typeof e5;
        } : function _typeof3(e5) {
          return e5 && typeof Symbol == "function" && e5.constructor === Symbol && e5 !== Symbol.prototype ? "symbol" : typeof e5;
        })(e4);
      }
      function _extends2() {
        return (_extends2 = Object.assign || function(e4) {
          for (var t4 = 1; t4 < arguments.length; t4++) {
            var n3 = arguments[t4];
            for (var r3 in n3)
              Object.prototype.hasOwnProperty.call(n3, r3) && (e4[r3] = n3[r3]);
          }
          return e4;
        }).apply(this, arguments);
      }
      function _objectWithoutProperties2(e4, t4) {
        if (e4 == null)
          return {};
        var n3, r3, o3 = function _objectWithoutPropertiesLoose2(e5, t5) {
          if (e5 == null)
            return {};
          var n4, r4, o4 = {}, i4 = Object.keys(e5);
          for (r4 = 0; r4 < i4.length; r4++)
            n4 = i4[r4], t5.indexOf(n4) >= 0 || (o4[n4] = e5[n4]);
          return o4;
        }(e4, t4);
        if (Object.getOwnPropertySymbols) {
          var i3 = Object.getOwnPropertySymbols(e4);
          for (r3 = 0; r3 < i3.length; r3++)
            n3 = i3[r3], t4.indexOf(n3) >= 0 || Object.prototype.propertyIsEnumerable.call(e4, n3) && (o3[n3] = e4[n3]);
        }
        return o3;
      }
      function _defineProperties2(e4, t4) {
        for (var n3 = 0; n3 < t4.length; n3++) {
          var r3 = t4[n3];
          r3.enumerable = r3.enumerable || false, r3.configurable = true, "value" in r3 && (r3.writable = true), Object.defineProperty(e4, r3.key, r3);
        }
      }
      function _possibleConstructorReturn2(e4, t4) {
        return !t4 || _typeof2(t4) !== "object" && typeof t4 != "function" ? function _assertThisInitialized2(e5) {
          if (e5 === void 0)
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
          return e5;
        }(e4) : t4;
      }
      function _getPrototypeOf(e4) {
        return (_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf2(e5) {
          return e5.__proto__ || Object.getPrototypeOf(e5);
        })(e4);
      }
      function _setPrototypeOf2(e4, t4) {
        return (_setPrototypeOf2 = Object.setPrototypeOf || function _setPrototypeOf3(e5, t5) {
          return e5.__proto__ = t5, e5;
        })(e4, t4);
      }
      function _defineProperty2(e4, t4, n3) {
        return t4 in e4 ? Object.defineProperty(e4, t4, { value: n3, enumerable: true, configurable: true, writable: true }) : e4[t4] = n3, e4;
      }
      var l2 = "awssld";
      function AutoplayHoc(e4) {
        var t4, n3;
        return n3 = t4 = function(t5) {
          function _class(e5) {
            var t6;
            return function _classCallCheck2(e6, t7) {
              if (!(e6 instanceof t7))
                throw new TypeError("Cannot call a class as a function");
            }(this, _class), (t6 = _possibleConstructorReturn2(this, _getPrototypeOf(_class).call(this, e5))).forceStop = false, t6.rootElement = e5.rootElement || l2, t6.mergedStyles = Object(u2.e)(e5.cssModule), t6.state = { selected: 0 }, t6;
          }
          return function _inherits2(e5, t6) {
            if (typeof t6 != "function" && t6 !== null)
              throw new TypeError("Super expression must either be null or a function");
            e5.prototype = Object.create(t6 && t6.prototype, { constructor: { value: e5, writable: true, configurable: true } }), t6 && _setPrototypeOf2(e5, t6);
          }(_class, t5), function _createClass2(e5, t6, n4) {
            return t6 && _defineProperties2(e5.prototype, t6), n4 && _defineProperties2(e5, n4), e5;
          }(_class, [{ key: "componentWillReceiveProps", value: function componentWillReceiveProps(e5) {
            this.mergedStyles = Object(u2.e)(e5.cssModule), this.checkStartStatus(e5);
          } }, { key: "setInfo", value: function setInfo(e5) {
            this.currentInfo = e5, e5.currentIndex !== this.state.selected && this.setState({ selected: e5.currentIndex });
          } }, { key: "setTimer", value: function setTimer(e5) {
            var t6 = this;
            if (this.forceStop !== true) {
              var n4 = e5.querySelector(".".concat(Object(u2.c)(Object(s2.c)("".concat(this.rootElement, "__timer"), this.mergedStyles)))), r3 = e5.querySelector("div");
              r3 && (n4 || (n4 = this.createBarElement(), r3.appendChild(n4)), n4.classList.remove(Object(s2.c)("".concat(this.rootElement, "__timer--animated"), this.mergedStyles)), Object(i2.onceNextCssLayout)().then(function() {
                n4.classList.remove(Object(s2.c)("".concat(t6.rootElement, "__timer--run"), t6.mergedStyles)), n4.classList.remove(Object(s2.c)("".concat(t6.rootElement, "__timer--fast"), t6.mergedStyles)), Object(i2.onceNextCssLayout)().then(function() {
                  n4.classList.add(Object(s2.c)("".concat(t6.rootElement, "__timer--animated"), t6.mergedStyles)), Object(i2.onceNextCssLayout)().then(function() {
                    n4.classList.add(Object(s2.c)("".concat(t6.rootElement, "__timer--run"), t6.mergedStyles)), Object(i2.onceTransitionEnd)(n4).then(function() {
                      t6.clearBarAnimation(n4), t6.forceStop !== true && t6.props.play !== false && t6.goTonext();
                    });
                  });
                });
              }));
            }
          } }, { key: "getBarFromSlide", value: function getBarFromSlide(e5) {
            return e5.querySelector(".".concat(Object(u2.c)(Object(s2.c)("".concat(this.rootElement, "__timer"), this.mergedStyles)))) || null;
          } }, { key: "checkStartStatus", value: function checkStartStatus(e5) {
            this.currentInfo && this.props.play !== e5.play && (e5.play === true && this.currentInfo && this.setTimer(this.currentInfo.currentSlide), e5.play === false && this.forceClearBar(this.currentInfo));
          } }, { key: "createBarElement", value: function createBarElement() {
            var e5 = document.createElement("div");
            return e5.classList.add(Object(s2.c)("".concat(this.rootElement, "__timer"), this.mergedStyles)), e5.style.setProperty("--timer-delay", "".concat(this.props.interval, "ms")), e5.style.setProperty("--timer-height", this.props.timerHeight), e5.style.setProperty("--timer-background-color", this.props.timerBackgroundColor), e5;
          } }, { key: "clearBar", value: function clearBar(e5) {
            var t6 = this, n4 = this.getBarFromSlide(e5.currentSlide);
            n4 && (n4.clearCssEndEvent && n4.clearCssEndEvent(), n4.classList.add(Object(s2.c)("".concat(this.rootElement, "__timer--fast"), this.mergedStyles)), Object(i2.onceTransitionEnd)(n4).then(function() {
              t6.clearBarAnimation(n4);
            }));
          } }, { key: "clearBarAnimation", value: function clearBarAnimation(e5) {
            e5.classList.remove(Object(s2.c)("".concat(this.rootElement, "__timer--animated"), this.mergedStyles));
          } }, { key: "restartBarAnimation", value: function restartBarAnimation(e5) {
            e5.classList.remove(Object(s2.c)("".concat(this.rootElement, "__timer--run"), this.mergedStyles)), e5.classList.remove(Object(s2.c)("".concat(this.rootElement, "__timer--fast"), this.mergedStyles));
          } }, { key: "forceClearBar", value: function forceClearBar(e5) {
            var t6 = this.getBarFromSlide(e5.currentSlide);
            this.restartBarAnimation(t6);
          } }, { key: "goTonext", value: function goTonext() {
            var e5 = this.currentInfo, t6 = e5.currentIndex + 1, n4 = t6 > e5.slides - 1 ? 0 : t6;
            n4 !== this.state.selected ? this.setState({ selected: n4 }) : this.forceClearBar(this.currentInfo);
          } }, { key: "render", value: function render3() {
            var t6 = this, n4 = this.props, r3 = (n4.inverval, n4.play), i3 = n4.cancelOnInteraction, c3 = (n4.showTimer, n4.onTransitionStart), a3 = n4.onTransitionEnd, s3 = n4.onFirstMount, u3 = n4.onTransitionRequest, l3 = _objectWithoutProperties2(n4, ["inverval", "play", "cancelOnInteraction", "showTimer", "onTransitionStart", "onTransitionEnd", "onFirstMount", "onTransitionRequest"]);
            return o2.a.createElement(e4, _extends2({}, l3, { selected: this.state.selected, onFirstMount: function onFirstMount(e5) {
              s3 && s3(e5), l3.startupScreen || (t6.setInfo(e5), r3 === true && t6.setTimer(e5.currentSlide));
            }, onTransitionStart: function onTransitionStart(e5) {
              var n5 = t6.getBarFromSlide(e5.nextSlide);
              n5 && t6.restartBarAnimation(n5), c3 && c3(e5);
            }, onTransitionRequest: function onTransitionRequest(e5) {
              t6.clearBar(e5), t6.currentInfo = e5, i3 === true && (t6.forceStop = true), u3 && u3(e5);
            }, onTransitionEnd: function onTransitionEnd(e5) {
              t6.setInfo(e5), r3 === true && t6.setTimer(e5.currentSlide), a3 && a3(e5);
            } }));
          } }]), _class;
        }(r2.Component), _defineProperty2(t4, "propTypes", { interval: a2.a.number, cssModule: a2.a.any, play: a2.a.bool, cancelOnInteraction: a2.a.bool, timerHeight: a2.a.string, timerBackgroundColor: a2.a.string, showTimer: a2.a.bool, onTransitionStart: a2.a.func, onTransitionEnd: a2.a.func, onTransitionRequest: a2.a.func, rootElement: a2.a.string }), _defineProperty2(t4, "defaultProps", { interval: 2e3, play: false, cancelOnInteraction: false, timerHeight: "6px", cssModule: null, timerBackgroundColor: "rgba(0, 0, 0, 0.15)", showTimer: true, onTransitionStart: null, onTransitionEnd: null, onTransitionRequest: null, rootElement: l2 }), n3;
      }
    }]);
  });
})(autoplay);
var withAutoplay = /* @__PURE__ */ getDefaultExportFromCjs(autoplay.exports);
var styles6 = "";
var lib = {};
var flattenNames$1 = {};
var freeGlobal$3 = typeof commonjsGlobal == "object" && commonjsGlobal && commonjsGlobal.Object === Object && commonjsGlobal;
var _freeGlobal = freeGlobal$3;
var freeGlobal$2 = _freeGlobal;
var freeSelf$1 = typeof self == "object" && self && self.Object === Object && self;
var root$a = freeGlobal$2 || freeSelf$1 || Function("return this")();
var _root = root$a;
var root$9 = _root;
var Symbol$8 = root$9.Symbol;
var _Symbol = Symbol$8;
var Symbol$7 = _Symbol;
var objectProto$u = Object.prototype;
var hasOwnProperty$o = objectProto$u.hasOwnProperty;
var nativeObjectToString$3 = objectProto$u.toString;
var symToStringTag$3 = Symbol$7 ? Symbol$7.toStringTag : void 0;
function getRawTag$2(value) {
  var isOwn = hasOwnProperty$o.call(value, symToStringTag$3), tag = value[symToStringTag$3];
  try {
    value[symToStringTag$3] = void 0;
    var unmasked = true;
  } catch (e2) {
  }
  var result = nativeObjectToString$3.call(value);
  if (unmasked) {
    if (isOwn) {
      value[symToStringTag$3] = tag;
    } else {
      delete value[symToStringTag$3];
    }
  }
  return result;
}
var _getRawTag = getRawTag$2;
var objectProto$t = Object.prototype;
var nativeObjectToString$2 = objectProto$t.toString;
function objectToString$2(value) {
  return nativeObjectToString$2.call(value);
}
var _objectToString = objectToString$2;
var Symbol$6 = _Symbol, getRawTag$1 = _getRawTag, objectToString$1 = _objectToString;
var nullTag$1 = "[object Null]", undefinedTag$1 = "[object Undefined]";
var symToStringTag$2 = Symbol$6 ? Symbol$6.toStringTag : void 0;
function baseGetTag$8(value) {
  if (value == null) {
    return value === void 0 ? undefinedTag$1 : nullTag$1;
  }
  return symToStringTag$2 && symToStringTag$2 in Object(value) ? getRawTag$1(value) : objectToString$1(value);
}
var _baseGetTag = baseGetTag$8;
var isArray$d = Array.isArray;
var isArray_1 = isArray$d;
function isObjectLike$a(value) {
  return value != null && typeof value == "object";
}
var isObjectLike_1 = isObjectLike$a;
var baseGetTag$7 = _baseGetTag, isArray$c = isArray_1, isObjectLike$9 = isObjectLike_1;
var stringTag$6 = "[object String]";
function isString(value) {
  return typeof value == "string" || !isArray$c(value) && isObjectLike$9(value) && baseGetTag$7(value) == stringTag$6;
}
var isString_1 = isString;
function createBaseFor$2(fromRight) {
  return function(object, iteratee, keysFunc) {
    var index = -1, iterable = Object(object), props = keysFunc(object), length = props.length;
    while (length--) {
      var key = props[fromRight ? length : ++index];
      if (iteratee(iterable[key], key, iterable) === false) {
        break;
      }
    }
    return object;
  };
}
var _createBaseFor = createBaseFor$2;
var createBaseFor$1 = _createBaseFor;
var baseFor$3 = createBaseFor$1();
var _baseFor = baseFor$3;
function baseTimes$2(n2, iteratee) {
  var index = -1, result = Array(n2);
  while (++index < n2) {
    result[index] = iteratee(index);
  }
  return result;
}
var _baseTimes = baseTimes$2;
var baseGetTag$6 = _baseGetTag, isObjectLike$8 = isObjectLike_1;
var argsTag$6 = "[object Arguments]";
function baseIsArguments$2(value) {
  return isObjectLike$8(value) && baseGetTag$6(value) == argsTag$6;
}
var _baseIsArguments = baseIsArguments$2;
var baseIsArguments$1 = _baseIsArguments, isObjectLike$7 = isObjectLike_1;
var objectProto$s = Object.prototype;
var hasOwnProperty$n = objectProto$s.hasOwnProperty;
var propertyIsEnumerable$3 = objectProto$s.propertyIsEnumerable;
var isArguments$4 = baseIsArguments$1(function() {
  return arguments;
}()) ? baseIsArguments$1 : function(value) {
  return isObjectLike$7(value) && hasOwnProperty$n.call(value, "callee") && !propertyIsEnumerable$3.call(value, "callee");
};
var isArguments_1 = isArguments$4;
var isBuffer$5 = { exports: {} };
function stubFalse$1() {
  return false;
}
var stubFalse_1 = stubFalse$1;
(function(module2, exports2) {
  var root2 = _root, stubFalse2 = stubFalse_1;
  var freeExports2 = exports2 && !exports2.nodeType && exports2;
  var freeModule2 = freeExports2 && true && module2 && !module2.nodeType && module2;
  var moduleExports2 = freeModule2 && freeModule2.exports === freeExports2;
  var Buffer3 = moduleExports2 ? root2.Buffer : void 0;
  var nativeIsBuffer2 = Buffer3 ? Buffer3.isBuffer : void 0;
  var isBuffer2 = nativeIsBuffer2 || stubFalse2;
  module2.exports = isBuffer2;
})(isBuffer$5, isBuffer$5.exports);
var MAX_SAFE_INTEGER$3 = 9007199254740991;
var reIsUint$1 = /^(?:0|[1-9]\d*)$/;
function isIndex$3(value, length) {
  var type = typeof value;
  length = length == null ? MAX_SAFE_INTEGER$3 : length;
  return !!length && (type == "number" || type != "symbol" && reIsUint$1.test(value)) && (value > -1 && value % 1 == 0 && value < length);
}
var _isIndex = isIndex$3;
var MAX_SAFE_INTEGER$2 = 9007199254740991;
function isLength$4(value) {
  return typeof value == "number" && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER$2;
}
var isLength_1 = isLength$4;
var baseGetTag$5 = _baseGetTag, isLength$3 = isLength_1, isObjectLike$6 = isObjectLike_1;
var argsTag$5 = "[object Arguments]", arrayTag$4 = "[object Array]", boolTag$5 = "[object Boolean]", dateTag$5 = "[object Date]", errorTag$4 = "[object Error]", funcTag$4 = "[object Function]", mapTag$8 = "[object Map]", numberTag$5 = "[object Number]", objectTag$8 = "[object Object]", regexpTag$5 = "[object RegExp]", setTag$8 = "[object Set]", stringTag$5 = "[object String]", weakMapTag$4 = "[object WeakMap]";
var arrayBufferTag$5 = "[object ArrayBuffer]", dataViewTag$7 = "[object DataView]", float32Tag$3 = "[object Float32Array]", float64Tag$3 = "[object Float64Array]", int8Tag$3 = "[object Int8Array]", int16Tag$3 = "[object Int16Array]", int32Tag$3 = "[object Int32Array]", uint8Tag$3 = "[object Uint8Array]", uint8ClampedTag$3 = "[object Uint8ClampedArray]", uint16Tag$3 = "[object Uint16Array]", uint32Tag$3 = "[object Uint32Array]";
var typedArrayTags$1 = {};
typedArrayTags$1[float32Tag$3] = typedArrayTags$1[float64Tag$3] = typedArrayTags$1[int8Tag$3] = typedArrayTags$1[int16Tag$3] = typedArrayTags$1[int32Tag$3] = typedArrayTags$1[uint8Tag$3] = typedArrayTags$1[uint8ClampedTag$3] = typedArrayTags$1[uint16Tag$3] = typedArrayTags$1[uint32Tag$3] = true;
typedArrayTags$1[argsTag$5] = typedArrayTags$1[arrayTag$4] = typedArrayTags$1[arrayBufferTag$5] = typedArrayTags$1[boolTag$5] = typedArrayTags$1[dataViewTag$7] = typedArrayTags$1[dateTag$5] = typedArrayTags$1[errorTag$4] = typedArrayTags$1[funcTag$4] = typedArrayTags$1[mapTag$8] = typedArrayTags$1[numberTag$5] = typedArrayTags$1[objectTag$8] = typedArrayTags$1[regexpTag$5] = typedArrayTags$1[setTag$8] = typedArrayTags$1[stringTag$5] = typedArrayTags$1[weakMapTag$4] = false;
function baseIsTypedArray$2(value) {
  return isObjectLike$6(value) && isLength$3(value.length) && !!typedArrayTags$1[baseGetTag$5(value)];
}
var _baseIsTypedArray = baseIsTypedArray$2;
function baseUnary$4(func) {
  return function(value) {
    return func(value);
  };
}
var _baseUnary = baseUnary$4;
var _nodeUtil = { exports: {} };
(function(module2, exports2) {
  var freeGlobal2 = _freeGlobal;
  var freeExports2 = exports2 && !exports2.nodeType && exports2;
  var freeModule2 = freeExports2 && true && module2 && !module2.nodeType && module2;
  var moduleExports2 = freeModule2 && freeModule2.exports === freeExports2;
  var freeProcess2 = moduleExports2 && freeGlobal2.process;
  var nodeUtil2 = function() {
    try {
      var types = freeModule2 && freeModule2.require && freeModule2.require("util").types;
      if (types) {
        return types;
      }
      return freeProcess2 && freeProcess2.binding && freeProcess2.binding("util");
    } catch (e2) {
    }
  }();
  module2.exports = nodeUtil2;
})(_nodeUtil, _nodeUtil.exports);
var baseIsTypedArray$1 = _baseIsTypedArray, baseUnary$3 = _baseUnary, nodeUtil$4 = _nodeUtil.exports;
var nodeIsTypedArray$1 = nodeUtil$4 && nodeUtil$4.isTypedArray;
var isTypedArray$4 = nodeIsTypedArray$1 ? baseUnary$3(nodeIsTypedArray$1) : baseIsTypedArray$1;
var isTypedArray_1 = isTypedArray$4;
var baseTimes$1 = _baseTimes, isArguments$3 = isArguments_1, isArray$b = isArray_1, isBuffer$4 = isBuffer$5.exports, isIndex$2 = _isIndex, isTypedArray$3 = isTypedArray_1;
var objectProto$r = Object.prototype;
var hasOwnProperty$m = objectProto$r.hasOwnProperty;
function arrayLikeKeys$3(value, inherited) {
  var isArr = isArray$b(value), isArg = !isArr && isArguments$3(value), isBuff = !isArr && !isArg && isBuffer$4(value), isType = !isArr && !isArg && !isBuff && isTypedArray$3(value), skipIndexes = isArr || isArg || isBuff || isType, result = skipIndexes ? baseTimes$1(value.length, String) : [], length = result.length;
  for (var key in value) {
    if ((inherited || hasOwnProperty$m.call(value, key)) && !(skipIndexes && (key == "length" || isBuff && (key == "offset" || key == "parent") || isType && (key == "buffer" || key == "byteLength" || key == "byteOffset") || isIndex$2(key, length)))) {
      result.push(key);
    }
  }
  return result;
}
var _arrayLikeKeys = arrayLikeKeys$3;
var objectProto$q = Object.prototype;
function isPrototype$4(value) {
  var Ctor = value && value.constructor, proto = typeof Ctor == "function" && Ctor.prototype || objectProto$q;
  return value === proto;
}
var _isPrototype = isPrototype$4;
function overArg$3(func, transform3) {
  return function(arg) {
    return func(transform3(arg));
  };
}
var _overArg = overArg$3;
var overArg$2 = _overArg;
var nativeKeys$3 = overArg$2(Object.keys, Object);
var _nativeKeys = nativeKeys$3;
var isPrototype$3 = _isPrototype, nativeKeys$2 = _nativeKeys;
var objectProto$p = Object.prototype;
var hasOwnProperty$l = objectProto$p.hasOwnProperty;
function baseKeys$2(object) {
  if (!isPrototype$3(object)) {
    return nativeKeys$2(object);
  }
  var result = [];
  for (var key in Object(object)) {
    if (hasOwnProperty$l.call(object, key) && key != "constructor") {
      result.push(key);
    }
  }
  return result;
}
var _baseKeys = baseKeys$2;
function isObject$7(value) {
  var type = typeof value;
  return value != null && (type == "object" || type == "function");
}
var isObject_1 = isObject$7;
var baseGetTag$4 = _baseGetTag, isObject$6 = isObject_1;
var asyncTag$1 = "[object AsyncFunction]", funcTag$3 = "[object Function]", genTag$2 = "[object GeneratorFunction]", proxyTag$1 = "[object Proxy]";
function isFunction$3(value) {
  if (!isObject$6(value)) {
    return false;
  }
  var tag = baseGetTag$4(value);
  return tag == funcTag$3 || tag == genTag$2 || tag == asyncTag$1 || tag == proxyTag$1;
}
var isFunction_1 = isFunction$3;
var isFunction$2 = isFunction_1, isLength$2 = isLength_1;
function isArrayLike$5(value) {
  return value != null && isLength$2(value.length) && !isFunction$2(value);
}
var isArrayLike_1 = isArrayLike$5;
var arrayLikeKeys$2 = _arrayLikeKeys, baseKeys$1 = _baseKeys, isArrayLike$4 = isArrayLike_1;
function keys$6(object) {
  return isArrayLike$4(object) ? arrayLikeKeys$2(object) : baseKeys$1(object);
}
var keys_1 = keys$6;
var baseFor$2 = _baseFor, keys$5 = keys_1;
function baseForOwn$3(object, iteratee) {
  return object && baseFor$2(object, iteratee, keys$5);
}
var _baseForOwn = baseForOwn$3;
function identity$3(value) {
  return value;
}
var identity_1 = identity$3;
var identity$2 = identity_1;
function castFunction$2(value) {
  return typeof value == "function" ? value : identity$2;
}
var _castFunction = castFunction$2;
var baseForOwn$2 = _baseForOwn, castFunction$1 = _castFunction;
function forOwn(object, iteratee) {
  return object && baseForOwn$2(object, castFunction$1(iteratee));
}
var forOwn_1 = forOwn;
var overArg$1 = _overArg;
var getPrototype$5 = overArg$1(Object.getPrototypeOf, Object);
var _getPrototype = getPrototype$5;
var baseGetTag$3 = _baseGetTag, getPrototype$4 = _getPrototype, isObjectLike$5 = isObjectLike_1;
var objectTag$7 = "[object Object]";
var funcProto$5 = Function.prototype, objectProto$o = Object.prototype;
var funcToString$5 = funcProto$5.toString;
var hasOwnProperty$k = objectProto$o.hasOwnProperty;
var objectCtorString$1 = funcToString$5.call(Object);
function isPlainObject$1(value) {
  if (!isObjectLike$5(value) || baseGetTag$3(value) != objectTag$7) {
    return false;
  }
  var proto = getPrototype$4(value);
  if (proto === null) {
    return true;
  }
  var Ctor = hasOwnProperty$k.call(proto, "constructor") && proto.constructor;
  return typeof Ctor == "function" && Ctor instanceof Ctor && funcToString$5.call(Ctor) == objectCtorString$1;
}
var isPlainObject_1 = isPlainObject$1;
function arrayMap$3(array, iteratee) {
  var index = -1, length = array == null ? 0 : array.length, result = Array(length);
  while (++index < length) {
    result[index] = iteratee(array[index], index, array);
  }
  return result;
}
var _arrayMap = arrayMap$3;
function listCacheClear$2() {
  this.__data__ = [];
  this.size = 0;
}
var _listCacheClear = listCacheClear$2;
function eq$4(value, other) {
  return value === other || value !== value && other !== other;
}
var eq_1 = eq$4;
var eq$3 = eq_1;
function assocIndexOf$5(array, key) {
  var length = array.length;
  while (length--) {
    if (eq$3(array[length][0], key)) {
      return length;
    }
  }
  return -1;
}
var _assocIndexOf = assocIndexOf$5;
var assocIndexOf$4 = _assocIndexOf;
var arrayProto$1 = Array.prototype;
var splice$1 = arrayProto$1.splice;
function listCacheDelete$2(key) {
  var data = this.__data__, index = assocIndexOf$4(data, key);
  if (index < 0) {
    return false;
  }
  var lastIndex = data.length - 1;
  if (index == lastIndex) {
    data.pop();
  } else {
    splice$1.call(data, index, 1);
  }
  --this.size;
  return true;
}
var _listCacheDelete = listCacheDelete$2;
var assocIndexOf$3 = _assocIndexOf;
function listCacheGet$2(key) {
  var data = this.__data__, index = assocIndexOf$3(data, key);
  return index < 0 ? void 0 : data[index][1];
}
var _listCacheGet = listCacheGet$2;
var assocIndexOf$2 = _assocIndexOf;
function listCacheHas$2(key) {
  return assocIndexOf$2(this.__data__, key) > -1;
}
var _listCacheHas = listCacheHas$2;
var assocIndexOf$1 = _assocIndexOf;
function listCacheSet$2(key, value) {
  var data = this.__data__, index = assocIndexOf$1(data, key);
  if (index < 0) {
    ++this.size;
    data.push([key, value]);
  } else {
    data[index][1] = value;
  }
  return this;
}
var _listCacheSet = listCacheSet$2;
var listCacheClear$1 = _listCacheClear, listCacheDelete$1 = _listCacheDelete, listCacheGet$1 = _listCacheGet, listCacheHas$1 = _listCacheHas, listCacheSet$1 = _listCacheSet;
function ListCache$5(entries) {
  var index = -1, length = entries == null ? 0 : entries.length;
  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}
ListCache$5.prototype.clear = listCacheClear$1;
ListCache$5.prototype["delete"] = listCacheDelete$1;
ListCache$5.prototype.get = listCacheGet$1;
ListCache$5.prototype.has = listCacheHas$1;
ListCache$5.prototype.set = listCacheSet$1;
var _ListCache = ListCache$5;
var ListCache$4 = _ListCache;
function stackClear$2() {
  this.__data__ = new ListCache$4();
  this.size = 0;
}
var _stackClear = stackClear$2;
function stackDelete$2(key) {
  var data = this.__data__, result = data["delete"](key);
  this.size = data.size;
  return result;
}
var _stackDelete = stackDelete$2;
function stackGet$2(key) {
  return this.__data__.get(key);
}
var _stackGet = stackGet$2;
function stackHas$2(key) {
  return this.__data__.has(key);
}
var _stackHas = stackHas$2;
var root$8 = _root;
var coreJsData$3 = root$8["__core-js_shared__"];
var _coreJsData = coreJsData$3;
var coreJsData$2 = _coreJsData;
var maskSrcKey$1 = function() {
  var uid = /[^.]+$/.exec(coreJsData$2 && coreJsData$2.keys && coreJsData$2.keys.IE_PROTO || "");
  return uid ? "Symbol(src)_1." + uid : "";
}();
function isMasked$2(func) {
  return !!maskSrcKey$1 && maskSrcKey$1 in func;
}
var _isMasked = isMasked$2;
var funcProto$4 = Function.prototype;
var funcToString$4 = funcProto$4.toString;
function toSource$3(func) {
  if (func != null) {
    try {
      return funcToString$4.call(func);
    } catch (e2) {
    }
    try {
      return func + "";
    } catch (e2) {
    }
  }
  return "";
}
var _toSource = toSource$3;
var isFunction$1 = isFunction_1, isMasked$1 = _isMasked, isObject$5 = isObject_1, toSource$2 = _toSource;
var reRegExpChar$1 = /[\\^$.*+?()[\]{}|]/g;
var reIsHostCtor$1 = /^\[object .+?Constructor\]$/;
var funcProto$3 = Function.prototype, objectProto$n = Object.prototype;
var funcToString$3 = funcProto$3.toString;
var hasOwnProperty$j = objectProto$n.hasOwnProperty;
var reIsNative$1 = RegExp("^" + funcToString$3.call(hasOwnProperty$j).replace(reRegExpChar$1, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$");
function baseIsNative$2(value) {
  if (!isObject$5(value) || isMasked$1(value)) {
    return false;
  }
  var pattern = isFunction$1(value) ? reIsNative$1 : reIsHostCtor$1;
  return pattern.test(toSource$2(value));
}
var _baseIsNative = baseIsNative$2;
function getValue$2(object, key) {
  return object == null ? void 0 : object[key];
}
var _getValue = getValue$2;
var baseIsNative$1 = _baseIsNative, getValue$1 = _getValue;
function getNative$8(object, key) {
  var value = getValue$1(object, key);
  return baseIsNative$1(value) ? value : void 0;
}
var _getNative = getNative$8;
var getNative$7 = _getNative, root$7 = _root;
var Map$6 = getNative$7(root$7, "Map");
var _Map = Map$6;
var getNative$6 = _getNative;
var nativeCreate$6 = getNative$6(Object, "create");
var _nativeCreate = nativeCreate$6;
var nativeCreate$5 = _nativeCreate;
function hashClear$2() {
  this.__data__ = nativeCreate$5 ? nativeCreate$5(null) : {};
  this.size = 0;
}
var _hashClear = hashClear$2;
function hashDelete$2(key) {
  var result = this.has(key) && delete this.__data__[key];
  this.size -= result ? 1 : 0;
  return result;
}
var _hashDelete = hashDelete$2;
var nativeCreate$4 = _nativeCreate;
var HASH_UNDEFINED$5 = "__lodash_hash_undefined__";
var objectProto$m = Object.prototype;
var hasOwnProperty$i = objectProto$m.hasOwnProperty;
function hashGet$2(key) {
  var data = this.__data__;
  if (nativeCreate$4) {
    var result = data[key];
    return result === HASH_UNDEFINED$5 ? void 0 : result;
  }
  return hasOwnProperty$i.call(data, key) ? data[key] : void 0;
}
var _hashGet = hashGet$2;
var nativeCreate$3 = _nativeCreate;
var objectProto$l = Object.prototype;
var hasOwnProperty$h = objectProto$l.hasOwnProperty;
function hashHas$2(key) {
  var data = this.__data__;
  return nativeCreate$3 ? data[key] !== void 0 : hasOwnProperty$h.call(data, key);
}
var _hashHas = hashHas$2;
var nativeCreate$2 = _nativeCreate;
var HASH_UNDEFINED$4 = "__lodash_hash_undefined__";
function hashSet$2(key, value) {
  var data = this.__data__;
  this.size += this.has(key) ? 0 : 1;
  data[key] = nativeCreate$2 && value === void 0 ? HASH_UNDEFINED$4 : value;
  return this;
}
var _hashSet = hashSet$2;
var hashClear$1 = _hashClear, hashDelete$1 = _hashDelete, hashGet$1 = _hashGet, hashHas$1 = _hashHas, hashSet$1 = _hashSet;
function Hash$2(entries) {
  var index = -1, length = entries == null ? 0 : entries.length;
  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}
Hash$2.prototype.clear = hashClear$1;
Hash$2.prototype["delete"] = hashDelete$1;
Hash$2.prototype.get = hashGet$1;
Hash$2.prototype.has = hashHas$1;
Hash$2.prototype.set = hashSet$1;
var _Hash = Hash$2;
var Hash$1 = _Hash, ListCache$3 = _ListCache, Map$5 = _Map;
function mapCacheClear$2() {
  this.size = 0;
  this.__data__ = {
    "hash": new Hash$1(),
    "map": new (Map$5 || ListCache$3)(),
    "string": new Hash$1()
  };
}
var _mapCacheClear = mapCacheClear$2;
function isKeyable$2(value) {
  var type = typeof value;
  return type == "string" || type == "number" || type == "symbol" || type == "boolean" ? value !== "__proto__" : value === null;
}
var _isKeyable = isKeyable$2;
var isKeyable$1 = _isKeyable;
function getMapData$5(map2, key) {
  var data = map2.__data__;
  return isKeyable$1(key) ? data[typeof key == "string" ? "string" : "hash"] : data.map;
}
var _getMapData = getMapData$5;
var getMapData$4 = _getMapData;
function mapCacheDelete$2(key) {
  var result = getMapData$4(this, key)["delete"](key);
  this.size -= result ? 1 : 0;
  return result;
}
var _mapCacheDelete = mapCacheDelete$2;
var getMapData$3 = _getMapData;
function mapCacheGet$2(key) {
  return getMapData$3(this, key).get(key);
}
var _mapCacheGet = mapCacheGet$2;
var getMapData$2 = _getMapData;
function mapCacheHas$2(key) {
  return getMapData$2(this, key).has(key);
}
var _mapCacheHas = mapCacheHas$2;
var getMapData$1 = _getMapData;
function mapCacheSet$2(key, value) {
  var data = getMapData$1(this, key), size = data.size;
  data.set(key, value);
  this.size += data.size == size ? 0 : 1;
  return this;
}
var _mapCacheSet = mapCacheSet$2;
var mapCacheClear$1 = _mapCacheClear, mapCacheDelete$1 = _mapCacheDelete, mapCacheGet$1 = _mapCacheGet, mapCacheHas$1 = _mapCacheHas, mapCacheSet$1 = _mapCacheSet;
function MapCache$4(entries) {
  var index = -1, length = entries == null ? 0 : entries.length;
  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}
MapCache$4.prototype.clear = mapCacheClear$1;
MapCache$4.prototype["delete"] = mapCacheDelete$1;
MapCache$4.prototype.get = mapCacheGet$1;
MapCache$4.prototype.has = mapCacheHas$1;
MapCache$4.prototype.set = mapCacheSet$1;
var _MapCache = MapCache$4;
var ListCache$2 = _ListCache, Map$4 = _Map, MapCache$3 = _MapCache;
var LARGE_ARRAY_SIZE$1 = 200;
function stackSet$2(key, value) {
  var data = this.__data__;
  if (data instanceof ListCache$2) {
    var pairs = data.__data__;
    if (!Map$4 || pairs.length < LARGE_ARRAY_SIZE$1 - 1) {
      pairs.push([key, value]);
      this.size = ++data.size;
      return this;
    }
    data = this.__data__ = new MapCache$3(pairs);
  }
  data.set(key, value);
  this.size = data.size;
  return this;
}
var _stackSet = stackSet$2;
var ListCache$1 = _ListCache, stackClear$1 = _stackClear, stackDelete$1 = _stackDelete, stackGet$1 = _stackGet, stackHas$1 = _stackHas, stackSet$1 = _stackSet;
function Stack$4(entries) {
  var data = this.__data__ = new ListCache$1(entries);
  this.size = data.size;
}
Stack$4.prototype.clear = stackClear$1;
Stack$4.prototype["delete"] = stackDelete$1;
Stack$4.prototype.get = stackGet$1;
Stack$4.prototype.has = stackHas$1;
Stack$4.prototype.set = stackSet$1;
var _Stack = Stack$4;
var HASH_UNDEFINED$3 = "__lodash_hash_undefined__";
function setCacheAdd$2(value) {
  this.__data__.set(value, HASH_UNDEFINED$3);
  return this;
}
var _setCacheAdd = setCacheAdd$2;
function setCacheHas$2(value) {
  return this.__data__.has(value);
}
var _setCacheHas = setCacheHas$2;
var MapCache$2 = _MapCache, setCacheAdd$1 = _setCacheAdd, setCacheHas$1 = _setCacheHas;
function SetCache$2(values2) {
  var index = -1, length = values2 == null ? 0 : values2.length;
  this.__data__ = new MapCache$2();
  while (++index < length) {
    this.add(values2[index]);
  }
}
SetCache$2.prototype.add = SetCache$2.prototype.push = setCacheAdd$1;
SetCache$2.prototype.has = setCacheHas$1;
var _SetCache = SetCache$2;
function arraySome$2(array, predicate) {
  var index = -1, length = array == null ? 0 : array.length;
  while (++index < length) {
    if (predicate(array[index], index, array)) {
      return true;
    }
  }
  return false;
}
var _arraySome = arraySome$2;
function cacheHas$2(cache2, key) {
  return cache2.has(key);
}
var _cacheHas = cacheHas$2;
var SetCache$1 = _SetCache, arraySome$1 = _arraySome, cacheHas$1 = _cacheHas;
var COMPARE_PARTIAL_FLAG$b = 1, COMPARE_UNORDERED_FLAG$7 = 2;
function equalArrays$3(array, other, bitmask, customizer, equalFunc, stack) {
  var isPartial = bitmask & COMPARE_PARTIAL_FLAG$b, arrLength = array.length, othLength = other.length;
  if (arrLength != othLength && !(isPartial && othLength > arrLength)) {
    return false;
  }
  var arrStacked = stack.get(array);
  var othStacked = stack.get(other);
  if (arrStacked && othStacked) {
    return arrStacked == other && othStacked == array;
  }
  var index = -1, result = true, seen = bitmask & COMPARE_UNORDERED_FLAG$7 ? new SetCache$1() : void 0;
  stack.set(array, other);
  stack.set(other, array);
  while (++index < arrLength) {
    var arrValue = array[index], othValue = other[index];
    if (customizer) {
      var compared = isPartial ? customizer(othValue, arrValue, index, other, array, stack) : customizer(arrValue, othValue, index, array, other, stack);
    }
    if (compared !== void 0) {
      if (compared) {
        continue;
      }
      result = false;
      break;
    }
    if (seen) {
      if (!arraySome$1(other, function(othValue2, othIndex) {
        if (!cacheHas$1(seen, othIndex) && (arrValue === othValue2 || equalFunc(arrValue, othValue2, bitmask, customizer, stack))) {
          return seen.push(othIndex);
        }
      })) {
        result = false;
        break;
      }
    } else if (!(arrValue === othValue || equalFunc(arrValue, othValue, bitmask, customizer, stack))) {
      result = false;
      break;
    }
  }
  stack["delete"](array);
  stack["delete"](other);
  return result;
}
var _equalArrays = equalArrays$3;
var root$6 = _root;
var Uint8Array$4 = root$6.Uint8Array;
var _Uint8Array = Uint8Array$4;
function mapToArray$2(map2) {
  var index = -1, result = Array(map2.size);
  map2.forEach(function(value, key) {
    result[++index] = [key, value];
  });
  return result;
}
var _mapToArray = mapToArray$2;
function setToArray$2(set2) {
  var index = -1, result = Array(set2.size);
  set2.forEach(function(value) {
    result[++index] = value;
  });
  return result;
}
var _setToArray = setToArray$2;
var Symbol$5 = _Symbol, Uint8Array$3 = _Uint8Array, eq$2 = eq_1, equalArrays$2 = _equalArrays, mapToArray$1 = _mapToArray, setToArray$1 = _setToArray;
var COMPARE_PARTIAL_FLAG$a = 1, COMPARE_UNORDERED_FLAG$6 = 2;
var boolTag$4 = "[object Boolean]", dateTag$4 = "[object Date]", errorTag$3 = "[object Error]", mapTag$7 = "[object Map]", numberTag$4 = "[object Number]", regexpTag$4 = "[object RegExp]", setTag$7 = "[object Set]", stringTag$4 = "[object String]", symbolTag$5 = "[object Symbol]";
var arrayBufferTag$4 = "[object ArrayBuffer]", dataViewTag$6 = "[object DataView]";
var symbolProto$4 = Symbol$5 ? Symbol$5.prototype : void 0, symbolValueOf$2 = symbolProto$4 ? symbolProto$4.valueOf : void 0;
function equalByTag$2(object, other, tag, bitmask, customizer, equalFunc, stack) {
  switch (tag) {
    case dataViewTag$6:
      if (object.byteLength != other.byteLength || object.byteOffset != other.byteOffset) {
        return false;
      }
      object = object.buffer;
      other = other.buffer;
    case arrayBufferTag$4:
      if (object.byteLength != other.byteLength || !equalFunc(new Uint8Array$3(object), new Uint8Array$3(other))) {
        return false;
      }
      return true;
    case boolTag$4:
    case dateTag$4:
    case numberTag$4:
      return eq$2(+object, +other);
    case errorTag$3:
      return object.name == other.name && object.message == other.message;
    case regexpTag$4:
    case stringTag$4:
      return object == other + "";
    case mapTag$7:
      var convert = mapToArray$1;
    case setTag$7:
      var isPartial = bitmask & COMPARE_PARTIAL_FLAG$a;
      convert || (convert = setToArray$1);
      if (object.size != other.size && !isPartial) {
        return false;
      }
      var stacked = stack.get(object);
      if (stacked) {
        return stacked == other;
      }
      bitmask |= COMPARE_UNORDERED_FLAG$6;
      stack.set(object, other);
      var result = equalArrays$2(convert(object), convert(other), bitmask, customizer, equalFunc, stack);
      stack["delete"](object);
      return result;
    case symbolTag$5:
      if (symbolValueOf$2) {
        return symbolValueOf$2.call(object) == symbolValueOf$2.call(other);
      }
  }
  return false;
}
var _equalByTag = equalByTag$2;
function arrayPush$3(array, values2) {
  var index = -1, length = values2.length, offset = array.length;
  while (++index < length) {
    array[offset + index] = values2[index];
  }
  return array;
}
var _arrayPush = arrayPush$3;
var arrayPush$2 = _arrayPush, isArray$a = isArray_1;
function baseGetAllKeys$3(object, keysFunc, symbolsFunc) {
  var result = keysFunc(object);
  return isArray$a(object) ? result : arrayPush$2(result, symbolsFunc(object));
}
var _baseGetAllKeys = baseGetAllKeys$3;
function arrayFilter$2(array, predicate) {
  var index = -1, length = array == null ? 0 : array.length, resIndex = 0, result = [];
  while (++index < length) {
    var value = array[index];
    if (predicate(value, index, array)) {
      result[resIndex++] = value;
    }
  }
  return result;
}
var _arrayFilter = arrayFilter$2;
function stubArray$3() {
  return [];
}
var stubArray_1 = stubArray$3;
var arrayFilter$1 = _arrayFilter, stubArray$2 = stubArray_1;
var objectProto$k = Object.prototype;
var propertyIsEnumerable$2 = objectProto$k.propertyIsEnumerable;
var nativeGetSymbols$2 = Object.getOwnPropertySymbols;
var getSymbols$5 = !nativeGetSymbols$2 ? stubArray$2 : function(object) {
  if (object == null) {
    return [];
  }
  object = Object(object);
  return arrayFilter$1(nativeGetSymbols$2(object), function(symbol) {
    return propertyIsEnumerable$2.call(object, symbol);
  });
};
var _getSymbols = getSymbols$5;
var baseGetAllKeys$2 = _baseGetAllKeys, getSymbols$4 = _getSymbols, keys$4 = keys_1;
function getAllKeys$3(object) {
  return baseGetAllKeys$2(object, keys$4, getSymbols$4);
}
var _getAllKeys = getAllKeys$3;
var getAllKeys$2 = _getAllKeys;
var COMPARE_PARTIAL_FLAG$9 = 1;
var objectProto$j = Object.prototype;
var hasOwnProperty$g = objectProto$j.hasOwnProperty;
function equalObjects$2(object, other, bitmask, customizer, equalFunc, stack) {
  var isPartial = bitmask & COMPARE_PARTIAL_FLAG$9, objProps = getAllKeys$2(object), objLength = objProps.length, othProps = getAllKeys$2(other), othLength = othProps.length;
  if (objLength != othLength && !isPartial) {
    return false;
  }
  var index = objLength;
  while (index--) {
    var key = objProps[index];
    if (!(isPartial ? key in other : hasOwnProperty$g.call(other, key))) {
      return false;
    }
  }
  var objStacked = stack.get(object);
  var othStacked = stack.get(other);
  if (objStacked && othStacked) {
    return objStacked == other && othStacked == object;
  }
  var result = true;
  stack.set(object, other);
  stack.set(other, object);
  var skipCtor = isPartial;
  while (++index < objLength) {
    key = objProps[index];
    var objValue = object[key], othValue = other[key];
    if (customizer) {
      var compared = isPartial ? customizer(othValue, objValue, key, other, object, stack) : customizer(objValue, othValue, key, object, other, stack);
    }
    if (!(compared === void 0 ? objValue === othValue || equalFunc(objValue, othValue, bitmask, customizer, stack) : compared)) {
      result = false;
      break;
    }
    skipCtor || (skipCtor = key == "constructor");
  }
  if (result && !skipCtor) {
    var objCtor = object.constructor, othCtor = other.constructor;
    if (objCtor != othCtor && ("constructor" in object && "constructor" in other) && !(typeof objCtor == "function" && objCtor instanceof objCtor && typeof othCtor == "function" && othCtor instanceof othCtor)) {
      result = false;
    }
  }
  stack["delete"](object);
  stack["delete"](other);
  return result;
}
var _equalObjects = equalObjects$2;
var getNative$5 = _getNative, root$5 = _root;
var DataView$3 = getNative$5(root$5, "DataView");
var _DataView = DataView$3;
var getNative$4 = _getNative, root$4 = _root;
var Promise$4 = getNative$4(root$4, "Promise");
var _Promise = Promise$4;
var getNative$3 = _getNative, root$3 = _root;
var Set$4 = getNative$3(root$3, "Set");
var _Set = Set$4;
var getNative$2 = _getNative, root$2 = _root;
var WeakMap$3 = getNative$2(root$2, "WeakMap");
var _WeakMap = WeakMap$3;
var DataView$2 = _DataView, Map$3 = _Map, Promise$3 = _Promise, Set$3 = _Set, WeakMap$2 = _WeakMap, baseGetTag$2 = _baseGetTag, toSource$1 = _toSource;
var mapTag$6 = "[object Map]", objectTag$6 = "[object Object]", promiseTag$1 = "[object Promise]", setTag$6 = "[object Set]", weakMapTag$3 = "[object WeakMap]";
var dataViewTag$5 = "[object DataView]";
var dataViewCtorString$1 = toSource$1(DataView$2), mapCtorString$1 = toSource$1(Map$3), promiseCtorString$1 = toSource$1(Promise$3), setCtorString$1 = toSource$1(Set$3), weakMapCtorString$1 = toSource$1(WeakMap$2);
var getTag$6 = baseGetTag$2;
if (DataView$2 && getTag$6(new DataView$2(new ArrayBuffer(1))) != dataViewTag$5 || Map$3 && getTag$6(new Map$3()) != mapTag$6 || Promise$3 && getTag$6(Promise$3.resolve()) != promiseTag$1 || Set$3 && getTag$6(new Set$3()) != setTag$6 || WeakMap$2 && getTag$6(new WeakMap$2()) != weakMapTag$3) {
  getTag$6 = function(value) {
    var result = baseGetTag$2(value), Ctor = result == objectTag$6 ? value.constructor : void 0, ctorString = Ctor ? toSource$1(Ctor) : "";
    if (ctorString) {
      switch (ctorString) {
        case dataViewCtorString$1:
          return dataViewTag$5;
        case mapCtorString$1:
          return mapTag$6;
        case promiseCtorString$1:
          return promiseTag$1;
        case setCtorString$1:
          return setTag$6;
        case weakMapCtorString$1:
          return weakMapTag$3;
      }
    }
    return result;
  };
}
var _getTag = getTag$6;
var Stack$3 = _Stack, equalArrays$1 = _equalArrays, equalByTag$1 = _equalByTag, equalObjects$1 = _equalObjects, getTag$5 = _getTag, isArray$9 = isArray_1, isBuffer$3 = isBuffer$5.exports, isTypedArray$2 = isTypedArray_1;
var COMPARE_PARTIAL_FLAG$8 = 1;
var argsTag$4 = "[object Arguments]", arrayTag$3 = "[object Array]", objectTag$5 = "[object Object]";
var objectProto$i = Object.prototype;
var hasOwnProperty$f = objectProto$i.hasOwnProperty;
function baseIsEqualDeep$2(object, other, bitmask, customizer, equalFunc, stack) {
  var objIsArr = isArray$9(object), othIsArr = isArray$9(other), objTag = objIsArr ? arrayTag$3 : getTag$5(object), othTag = othIsArr ? arrayTag$3 : getTag$5(other);
  objTag = objTag == argsTag$4 ? objectTag$5 : objTag;
  othTag = othTag == argsTag$4 ? objectTag$5 : othTag;
  var objIsObj = objTag == objectTag$5, othIsObj = othTag == objectTag$5, isSameTag = objTag == othTag;
  if (isSameTag && isBuffer$3(object)) {
    if (!isBuffer$3(other)) {
      return false;
    }
    objIsArr = true;
    objIsObj = false;
  }
  if (isSameTag && !objIsObj) {
    stack || (stack = new Stack$3());
    return objIsArr || isTypedArray$2(object) ? equalArrays$1(object, other, bitmask, customizer, equalFunc, stack) : equalByTag$1(object, other, objTag, bitmask, customizer, equalFunc, stack);
  }
  if (!(bitmask & COMPARE_PARTIAL_FLAG$8)) {
    var objIsWrapped = objIsObj && hasOwnProperty$f.call(object, "__wrapped__"), othIsWrapped = othIsObj && hasOwnProperty$f.call(other, "__wrapped__");
    if (objIsWrapped || othIsWrapped) {
      var objUnwrapped = objIsWrapped ? object.value() : object, othUnwrapped = othIsWrapped ? other.value() : other;
      stack || (stack = new Stack$3());
      return equalFunc(objUnwrapped, othUnwrapped, bitmask, customizer, stack);
    }
  }
  if (!isSameTag) {
    return false;
  }
  stack || (stack = new Stack$3());
  return equalObjects$1(object, other, bitmask, customizer, equalFunc, stack);
}
var _baseIsEqualDeep = baseIsEqualDeep$2;
var baseIsEqualDeep$1 = _baseIsEqualDeep, isObjectLike$4 = isObjectLike_1;
function baseIsEqual$3(value, other, bitmask, customizer, stack) {
  if (value === other) {
    return true;
  }
  if (value == null || other == null || !isObjectLike$4(value) && !isObjectLike$4(other)) {
    return value !== value && other !== other;
  }
  return baseIsEqualDeep$1(value, other, bitmask, customizer, baseIsEqual$3, stack);
}
var _baseIsEqual = baseIsEqual$3;
var Stack$2 = _Stack, baseIsEqual$2 = _baseIsEqual;
var COMPARE_PARTIAL_FLAG$7 = 1, COMPARE_UNORDERED_FLAG$5 = 2;
function baseIsMatch$2(object, source, matchData, customizer) {
  var index = matchData.length, length = index, noCustomizer = !customizer;
  if (object == null) {
    return !length;
  }
  object = Object(object);
  while (index--) {
    var data = matchData[index];
    if (noCustomizer && data[2] ? data[1] !== object[data[0]] : !(data[0] in object)) {
      return false;
    }
  }
  while (++index < length) {
    data = matchData[index];
    var key = data[0], objValue = object[key], srcValue = data[1];
    if (noCustomizer && data[2]) {
      if (objValue === void 0 && !(key in object)) {
        return false;
      }
    } else {
      var stack = new Stack$2();
      if (customizer) {
        var result = customizer(objValue, srcValue, key, object, source, stack);
      }
      if (!(result === void 0 ? baseIsEqual$2(srcValue, objValue, COMPARE_PARTIAL_FLAG$7 | COMPARE_UNORDERED_FLAG$5, customizer, stack) : result)) {
        return false;
      }
    }
  }
  return true;
}
var _baseIsMatch = baseIsMatch$2;
var isObject$4 = isObject_1;
function isStrictComparable$3(value) {
  return value === value && !isObject$4(value);
}
var _isStrictComparable = isStrictComparable$3;
var isStrictComparable$2 = _isStrictComparable, keys$3 = keys_1;
function getMatchData$2(object) {
  var result = keys$3(object), length = result.length;
  while (length--) {
    var key = result[length], value = object[key];
    result[length] = [key, value, isStrictComparable$2(value)];
  }
  return result;
}
var _getMatchData = getMatchData$2;
function matchesStrictComparable$3(key, srcValue) {
  return function(object) {
    if (object == null) {
      return false;
    }
    return object[key] === srcValue && (srcValue !== void 0 || key in Object(object));
  };
}
var _matchesStrictComparable = matchesStrictComparable$3;
var baseIsMatch$1 = _baseIsMatch, getMatchData$1 = _getMatchData, matchesStrictComparable$2 = _matchesStrictComparable;
function baseMatches$2(source) {
  var matchData = getMatchData$1(source);
  if (matchData.length == 1 && matchData[0][2]) {
    return matchesStrictComparable$2(matchData[0][0], matchData[0][1]);
  }
  return function(object) {
    return object === source || baseIsMatch$1(object, source, matchData);
  };
}
var _baseMatches = baseMatches$2;
var baseGetTag$1 = _baseGetTag, isObjectLike$3 = isObjectLike_1;
var symbolTag$4 = "[object Symbol]";
function isSymbol$4(value) {
  return typeof value == "symbol" || isObjectLike$3(value) && baseGetTag$1(value) == symbolTag$4;
}
var isSymbol_1 = isSymbol$4;
var isArray$8 = isArray_1, isSymbol$3 = isSymbol_1;
var reIsDeepProp$1 = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, reIsPlainProp$1 = /^\w*$/;
function isKey$4(value, object) {
  if (isArray$8(value)) {
    return false;
  }
  var type = typeof value;
  if (type == "number" || type == "symbol" || type == "boolean" || value == null || isSymbol$3(value)) {
    return true;
  }
  return reIsPlainProp$1.test(value) || !reIsDeepProp$1.test(value) || object != null && value in Object(object);
}
var _isKey = isKey$4;
var MapCache$1 = _MapCache;
var FUNC_ERROR_TEXT$3 = "Expected a function";
function memoize$2(func, resolver) {
  if (typeof func != "function" || resolver != null && typeof resolver != "function") {
    throw new TypeError(FUNC_ERROR_TEXT$3);
  }
  var memoized = function() {
    var args = arguments, key = resolver ? resolver.apply(this, args) : args[0], cache2 = memoized.cache;
    if (cache2.has(key)) {
      return cache2.get(key);
    }
    var result = func.apply(this, args);
    memoized.cache = cache2.set(key, result) || cache2;
    return result;
  };
  memoized.cache = new (memoize$2.Cache || MapCache$1)();
  return memoized;
}
memoize$2.Cache = MapCache$1;
var memoize_1 = memoize$2;
var memoize$1 = memoize_1;
var MAX_MEMOIZE_SIZE$1 = 500;
function memoizeCapped$2(func) {
  var result = memoize$1(func, function(key) {
    if (cache2.size === MAX_MEMOIZE_SIZE$1) {
      cache2.clear();
    }
    return key;
  });
  var cache2 = result.cache;
  return result;
}
var _memoizeCapped = memoizeCapped$2;
var memoizeCapped$1 = _memoizeCapped;
var rePropName$1 = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;
var reEscapeChar$1 = /\\(\\)?/g;
var stringToPath$3 = memoizeCapped$1(function(string) {
  var result = [];
  if (string.charCodeAt(0) === 46) {
    result.push("");
  }
  string.replace(rePropName$1, function(match, number, quote, subString) {
    result.push(quote ? subString.replace(reEscapeChar$1, "$1") : number || match);
  });
  return result;
});
var _stringToPath = stringToPath$3;
var Symbol$4 = _Symbol, arrayMap$2 = _arrayMap, isArray$7 = isArray_1, isSymbol$2 = isSymbol_1;
var INFINITY$3 = 1 / 0;
var symbolProto$3 = Symbol$4 ? Symbol$4.prototype : void 0, symbolToString$1 = symbolProto$3 ? symbolProto$3.toString : void 0;
function baseToString$2(value) {
  if (typeof value == "string") {
    return value;
  }
  if (isArray$7(value)) {
    return arrayMap$2(value, baseToString$2) + "";
  }
  if (isSymbol$2(value)) {
    return symbolToString$1 ? symbolToString$1.call(value) : "";
  }
  var result = value + "";
  return result == "0" && 1 / value == -INFINITY$3 ? "-0" : result;
}
var _baseToString = baseToString$2;
var baseToString$1 = _baseToString;
function toString$2(value) {
  return value == null ? "" : baseToString$1(value);
}
var toString_1 = toString$2;
var isArray$6 = isArray_1, isKey$3 = _isKey, stringToPath$2 = _stringToPath, toString$1 = toString_1;
function castPath$3(value, object) {
  if (isArray$6(value)) {
    return value;
  }
  return isKey$3(value, object) ? [value] : stringToPath$2(toString$1(value));
}
var _castPath = castPath$3;
var isSymbol$1 = isSymbol_1;
var INFINITY$2 = 1 / 0;
function toKey$5(value) {
  if (typeof value == "string" || isSymbol$1(value)) {
    return value;
  }
  var result = value + "";
  return result == "0" && 1 / value == -INFINITY$2 ? "-0" : result;
}
var _toKey = toKey$5;
var castPath$2 = _castPath, toKey$4 = _toKey;
function baseGet$3(object, path) {
  path = castPath$2(path, object);
  var index = 0, length = path.length;
  while (object != null && index < length) {
    object = object[toKey$4(path[index++])];
  }
  return index && index == length ? object : void 0;
}
var _baseGet = baseGet$3;
var baseGet$2 = _baseGet;
function get$3(object, path, defaultValue) {
  var result = object == null ? void 0 : baseGet$2(object, path);
  return result === void 0 ? defaultValue : result;
}
var get_1 = get$3;
function baseHasIn$2(object, key) {
  return object != null && key in Object(object);
}
var _baseHasIn = baseHasIn$2;
var castPath$1 = _castPath, isArguments$2 = isArguments_1, isArray$5 = isArray_1, isIndex$1 = _isIndex, isLength$1 = isLength_1, toKey$3 = _toKey;
function hasPath$2(object, path, hasFunc) {
  path = castPath$1(path, object);
  var index = -1, length = path.length, result = false;
  while (++index < length) {
    var key = toKey$3(path[index]);
    if (!(result = object != null && hasFunc(object, key))) {
      break;
    }
    object = object[key];
  }
  if (result || ++index != length) {
    return result;
  }
  length = object == null ? 0 : object.length;
  return !!length && isLength$1(length) && isIndex$1(key, length) && (isArray$5(object) || isArguments$2(object));
}
var _hasPath = hasPath$2;
var baseHasIn$1 = _baseHasIn, hasPath$1 = _hasPath;
function hasIn$2(object, path) {
  return object != null && hasPath$1(object, path, baseHasIn$1);
}
var hasIn_1 = hasIn$2;
var baseIsEqual$1 = _baseIsEqual, get$2 = get_1, hasIn$1 = hasIn_1, isKey$2 = _isKey, isStrictComparable$1 = _isStrictComparable, matchesStrictComparable$1 = _matchesStrictComparable, toKey$2 = _toKey;
var COMPARE_PARTIAL_FLAG$6 = 1, COMPARE_UNORDERED_FLAG$4 = 2;
function baseMatchesProperty$2(path, srcValue) {
  if (isKey$2(path) && isStrictComparable$1(srcValue)) {
    return matchesStrictComparable$1(toKey$2(path), srcValue);
  }
  return function(object) {
    var objValue = get$2(object, path);
    return objValue === void 0 && objValue === srcValue ? hasIn$1(object, path) : baseIsEqual$1(srcValue, objValue, COMPARE_PARTIAL_FLAG$6 | COMPARE_UNORDERED_FLAG$4);
  };
}
var _baseMatchesProperty = baseMatchesProperty$2;
function baseProperty$2(key) {
  return function(object) {
    return object == null ? void 0 : object[key];
  };
}
var _baseProperty = baseProperty$2;
var baseGet$1 = _baseGet;
function basePropertyDeep$2(path) {
  return function(object) {
    return baseGet$1(object, path);
  };
}
var _basePropertyDeep = basePropertyDeep$2;
var baseProperty$1 = _baseProperty, basePropertyDeep$1 = _basePropertyDeep, isKey$1 = _isKey, toKey$1 = _toKey;
function property$2(path) {
  return isKey$1(path) ? baseProperty$1(toKey$1(path)) : basePropertyDeep$1(path);
}
var property_1 = property$2;
var baseMatches$1 = _baseMatches, baseMatchesProperty$1 = _baseMatchesProperty, identity$1 = identity_1, isArray$4 = isArray_1, property$1 = property_1;
function baseIteratee$2(value) {
  if (typeof value == "function") {
    return value;
  }
  if (value == null) {
    return identity$1;
  }
  if (typeof value == "object") {
    return isArray$4(value) ? baseMatchesProperty$1(value[0], value[1]) : baseMatches$1(value);
  }
  return property$1(value);
}
var _baseIteratee = baseIteratee$2;
var isArrayLike$3 = isArrayLike_1;
function createBaseEach$2(eachFunc, fromRight) {
  return function(collection, iteratee) {
    if (collection == null) {
      return collection;
    }
    if (!isArrayLike$3(collection)) {
      return eachFunc(collection, iteratee);
    }
    var length = collection.length, index = fromRight ? length : -1, iterable = Object(collection);
    while (fromRight ? index-- : ++index < length) {
      if (iteratee(iterable[index], index, iterable) === false) {
        break;
      }
    }
    return collection;
  };
}
var _createBaseEach = createBaseEach$2;
var baseForOwn$1 = _baseForOwn, createBaseEach$1 = _createBaseEach;
var baseEach$3 = createBaseEach$1(baseForOwn$1);
var _baseEach = baseEach$3;
var baseEach$2 = _baseEach, isArrayLike$2 = isArrayLike_1;
function baseMap$2(collection, iteratee) {
  var index = -1, result = isArrayLike$2(collection) ? Array(collection.length) : [];
  baseEach$2(collection, function(value, key, collection2) {
    result[++index] = iteratee(value, key, collection2);
  });
  return result;
}
var _baseMap = baseMap$2;
var arrayMap$1 = _arrayMap, baseIteratee$1 = _baseIteratee, baseMap$1 = _baseMap, isArray$3 = isArray_1;
function map$1(collection, iteratee) {
  var func = isArray$3(collection) ? arrayMap$1 : baseMap$1;
  return func(collection, baseIteratee$1(iteratee));
}
var map_1 = map$1;
Object.defineProperty(flattenNames$1, "__esModule", {
  value: true
});
flattenNames$1.flattenNames = void 0;
var _isString2 = isString_1;
var _isString3 = _interopRequireDefault$7(_isString2);
var _forOwn2$2 = forOwn_1;
var _forOwn3$2 = _interopRequireDefault$7(_forOwn2$2);
var _isPlainObject2 = isPlainObject_1;
var _isPlainObject3 = _interopRequireDefault$7(_isPlainObject2);
var _map2 = map_1;
var _map3 = _interopRequireDefault$7(_map2);
function _interopRequireDefault$7(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}
var flattenNames = flattenNames$1.flattenNames = function flattenNames2() {
  var things = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [];
  var names = [];
  (0, _map3.default)(things, function(thing) {
    if (Array.isArray(thing)) {
      flattenNames2(thing).map(function(name) {
        return names.push(name);
      });
    } else if ((0, _isPlainObject3.default)(thing)) {
      (0, _forOwn3$2.default)(thing, function(value, key) {
        value === true && names.push(key);
        names.push(key + "-" + value);
      });
    } else if ((0, _isString3.default)(thing)) {
      names.push(thing);
    }
  });
  return names;
};
flattenNames$1.default = flattenNames;
var mergeClasses$1 = {};
function arrayEach$2(array, iteratee) {
  var index = -1, length = array == null ? 0 : array.length;
  while (++index < length) {
    if (iteratee(array[index], index, array) === false) {
      break;
    }
  }
  return array;
}
var _arrayEach = arrayEach$2;
var getNative$1 = _getNative;
var defineProperty$3 = function() {
  try {
    var func = getNative$1(Object, "defineProperty");
    func({}, "", {});
    return func;
  } catch (e2) {
  }
}();
var _defineProperty$1 = defineProperty$3;
var defineProperty$2 = _defineProperty$1;
function baseAssignValue$3(object, key, value) {
  if (key == "__proto__" && defineProperty$2) {
    defineProperty$2(object, key, {
      "configurable": true,
      "enumerable": true,
      "value": value,
      "writable": true
    });
  } else {
    object[key] = value;
  }
}
var _baseAssignValue = baseAssignValue$3;
var baseAssignValue$2 = _baseAssignValue, eq$1 = eq_1;
var objectProto$h = Object.prototype;
var hasOwnProperty$e = objectProto$h.hasOwnProperty;
function assignValue$3(object, key, value) {
  var objValue = object[key];
  if (!(hasOwnProperty$e.call(object, key) && eq$1(objValue, value)) || value === void 0 && !(key in object)) {
    baseAssignValue$2(object, key, value);
  }
}
var _assignValue = assignValue$3;
var assignValue$2 = _assignValue, baseAssignValue$1 = _baseAssignValue;
function copyObject$5(source, props, object, customizer) {
  var isNew = !object;
  object || (object = {});
  var index = -1, length = props.length;
  while (++index < length) {
    var key = props[index];
    var newValue = customizer ? customizer(object[key], source[key], key, object, source) : void 0;
    if (newValue === void 0) {
      newValue = source[key];
    }
    if (isNew) {
      baseAssignValue$1(object, key, newValue);
    } else {
      assignValue$2(object, key, newValue);
    }
  }
  return object;
}
var _copyObject = copyObject$5;
var copyObject$4 = _copyObject, keys$2 = keys_1;
function baseAssign$1(object, source) {
  return object && copyObject$4(source, keys$2(source), object);
}
var _baseAssign = baseAssign$1;
function nativeKeysIn$2(object) {
  var result = [];
  if (object != null) {
    for (var key in Object(object)) {
      result.push(key);
    }
  }
  return result;
}
var _nativeKeysIn = nativeKeysIn$2;
var isObject$3 = isObject_1, isPrototype$2 = _isPrototype, nativeKeysIn$1 = _nativeKeysIn;
var objectProto$g = Object.prototype;
var hasOwnProperty$d = objectProto$g.hasOwnProperty;
function baseKeysIn$2(object) {
  if (!isObject$3(object)) {
    return nativeKeysIn$1(object);
  }
  var isProto = isPrototype$2(object), result = [];
  for (var key in object) {
    if (!(key == "constructor" && (isProto || !hasOwnProperty$d.call(object, key)))) {
      result.push(key);
    }
  }
  return result;
}
var _baseKeysIn = baseKeysIn$2;
var arrayLikeKeys$1 = _arrayLikeKeys, baseKeysIn$1 = _baseKeysIn, isArrayLike$1 = isArrayLike_1;
function keysIn$4(object) {
  return isArrayLike$1(object) ? arrayLikeKeys$1(object, true) : baseKeysIn$1(object);
}
var keysIn_1 = keysIn$4;
var copyObject$3 = _copyObject, keysIn$3 = keysIn_1;
function baseAssignIn$1(object, source) {
  return object && copyObject$3(source, keysIn$3(source), object);
}
var _baseAssignIn = baseAssignIn$1;
var _cloneBuffer = { exports: {} };
(function(module2, exports2) {
  var root2 = _root;
  var freeExports2 = exports2 && !exports2.nodeType && exports2;
  var freeModule2 = freeExports2 && true && module2 && !module2.nodeType && module2;
  var moduleExports2 = freeModule2 && freeModule2.exports === freeExports2;
  var Buffer3 = moduleExports2 ? root2.Buffer : void 0, allocUnsafe2 = Buffer3 ? Buffer3.allocUnsafe : void 0;
  function cloneBuffer2(buffer, isDeep) {
    if (isDeep) {
      return buffer.slice();
    }
    var length = buffer.length, result = allocUnsafe2 ? allocUnsafe2(length) : new buffer.constructor(length);
    buffer.copy(result);
    return result;
  }
  module2.exports = cloneBuffer2;
})(_cloneBuffer, _cloneBuffer.exports);
function copyArray$2(source, array) {
  var index = -1, length = source.length;
  array || (array = Array(length));
  while (++index < length) {
    array[index] = source[index];
  }
  return array;
}
var _copyArray = copyArray$2;
var copyObject$2 = _copyObject, getSymbols$3 = _getSymbols;
function copySymbols$1(source, object) {
  return copyObject$2(source, getSymbols$3(source), object);
}
var _copySymbols = copySymbols$1;
var arrayPush$1 = _arrayPush, getPrototype$3 = _getPrototype, getSymbols$2 = _getSymbols, stubArray$1 = stubArray_1;
var nativeGetSymbols$1 = Object.getOwnPropertySymbols;
var getSymbolsIn$2 = !nativeGetSymbols$1 ? stubArray$1 : function(object) {
  var result = [];
  while (object) {
    arrayPush$1(result, getSymbols$2(object));
    object = getPrototype$3(object);
  }
  return result;
};
var _getSymbolsIn = getSymbolsIn$2;
var copyObject$1 = _copyObject, getSymbolsIn$1 = _getSymbolsIn;
function copySymbolsIn$1(source, object) {
  return copyObject$1(source, getSymbolsIn$1(source), object);
}
var _copySymbolsIn = copySymbolsIn$1;
var baseGetAllKeys$1 = _baseGetAllKeys, getSymbolsIn = _getSymbolsIn, keysIn$2 = keysIn_1;
function getAllKeysIn$1(object) {
  return baseGetAllKeys$1(object, keysIn$2, getSymbolsIn);
}
var _getAllKeysIn = getAllKeysIn$1;
var objectProto$f = Object.prototype;
var hasOwnProperty$c = objectProto$f.hasOwnProperty;
function initCloneArray$1(array) {
  var length = array.length, result = new array.constructor(length);
  if (length && typeof array[0] == "string" && hasOwnProperty$c.call(array, "index")) {
    result.index = array.index;
    result.input = array.input;
  }
  return result;
}
var _initCloneArray = initCloneArray$1;
var Uint8Array$2 = _Uint8Array;
function cloneArrayBuffer$4(arrayBuffer) {
  var result = new arrayBuffer.constructor(arrayBuffer.byteLength);
  new Uint8Array$2(result).set(new Uint8Array$2(arrayBuffer));
  return result;
}
var _cloneArrayBuffer = cloneArrayBuffer$4;
var cloneArrayBuffer$3 = _cloneArrayBuffer;
function cloneDataView$1(dataView, isDeep) {
  var buffer = isDeep ? cloneArrayBuffer$3(dataView.buffer) : dataView.buffer;
  return new dataView.constructor(buffer, dataView.byteOffset, dataView.byteLength);
}
var _cloneDataView = cloneDataView$1;
var reFlags = /\w*$/;
function cloneRegExp$1(regexp) {
  var result = new regexp.constructor(regexp.source, reFlags.exec(regexp));
  result.lastIndex = regexp.lastIndex;
  return result;
}
var _cloneRegExp = cloneRegExp$1;
var Symbol$3 = _Symbol;
var symbolProto$2 = Symbol$3 ? Symbol$3.prototype : void 0, symbolValueOf$1 = symbolProto$2 ? symbolProto$2.valueOf : void 0;
function cloneSymbol$1(symbol) {
  return symbolValueOf$1 ? Object(symbolValueOf$1.call(symbol)) : {};
}
var _cloneSymbol = cloneSymbol$1;
var cloneArrayBuffer$2 = _cloneArrayBuffer;
function cloneTypedArray$2(typedArray, isDeep) {
  var buffer = isDeep ? cloneArrayBuffer$2(typedArray.buffer) : typedArray.buffer;
  return new typedArray.constructor(buffer, typedArray.byteOffset, typedArray.length);
}
var _cloneTypedArray = cloneTypedArray$2;
var cloneArrayBuffer$1 = _cloneArrayBuffer, cloneDataView = _cloneDataView, cloneRegExp = _cloneRegExp, cloneSymbol = _cloneSymbol, cloneTypedArray$1 = _cloneTypedArray;
var boolTag$3 = "[object Boolean]", dateTag$3 = "[object Date]", mapTag$5 = "[object Map]", numberTag$3 = "[object Number]", regexpTag$3 = "[object RegExp]", setTag$5 = "[object Set]", stringTag$3 = "[object String]", symbolTag$3 = "[object Symbol]";
var arrayBufferTag$3 = "[object ArrayBuffer]", dataViewTag$4 = "[object DataView]", float32Tag$2 = "[object Float32Array]", float64Tag$2 = "[object Float64Array]", int8Tag$2 = "[object Int8Array]", int16Tag$2 = "[object Int16Array]", int32Tag$2 = "[object Int32Array]", uint8Tag$2 = "[object Uint8Array]", uint8ClampedTag$2 = "[object Uint8ClampedArray]", uint16Tag$2 = "[object Uint16Array]", uint32Tag$2 = "[object Uint32Array]";
function initCloneByTag$1(object, tag, isDeep) {
  var Ctor = object.constructor;
  switch (tag) {
    case arrayBufferTag$3:
      return cloneArrayBuffer$1(object);
    case boolTag$3:
    case dateTag$3:
      return new Ctor(+object);
    case dataViewTag$4:
      return cloneDataView(object, isDeep);
    case float32Tag$2:
    case float64Tag$2:
    case int8Tag$2:
    case int16Tag$2:
    case int32Tag$2:
    case uint8Tag$2:
    case uint8ClampedTag$2:
    case uint16Tag$2:
    case uint32Tag$2:
      return cloneTypedArray$1(object, isDeep);
    case mapTag$5:
      return new Ctor();
    case numberTag$3:
    case stringTag$3:
      return new Ctor(object);
    case regexpTag$3:
      return cloneRegExp(object);
    case setTag$5:
      return new Ctor();
    case symbolTag$3:
      return cloneSymbol(object);
  }
}
var _initCloneByTag = initCloneByTag$1;
var isObject$2 = isObject_1;
var objectCreate$1 = Object.create;
var baseCreate$3 = function() {
  function object() {
  }
  return function(proto) {
    if (!isObject$2(proto)) {
      return {};
    }
    if (objectCreate$1) {
      return objectCreate$1(proto);
    }
    object.prototype = proto;
    var result = new object();
    object.prototype = void 0;
    return result;
  };
}();
var _baseCreate = baseCreate$3;
var baseCreate$2 = _baseCreate, getPrototype$2 = _getPrototype, isPrototype$1 = _isPrototype;
function initCloneObject$2(object) {
  return typeof object.constructor == "function" && !isPrototype$1(object) ? baseCreate$2(getPrototype$2(object)) : {};
}
var _initCloneObject = initCloneObject$2;
var getTag$4 = _getTag, isObjectLike$2 = isObjectLike_1;
var mapTag$4 = "[object Map]";
function baseIsMap$1(value) {
  return isObjectLike$2(value) && getTag$4(value) == mapTag$4;
}
var _baseIsMap = baseIsMap$1;
var baseIsMap = _baseIsMap, baseUnary$2 = _baseUnary, nodeUtil$3 = _nodeUtil.exports;
var nodeIsMap = nodeUtil$3 && nodeUtil$3.isMap;
var isMap$1 = nodeIsMap ? baseUnary$2(nodeIsMap) : baseIsMap;
var isMap_1 = isMap$1;
var getTag$3 = _getTag, isObjectLike$1 = isObjectLike_1;
var setTag$4 = "[object Set]";
function baseIsSet$1(value) {
  return isObjectLike$1(value) && getTag$3(value) == setTag$4;
}
var _baseIsSet = baseIsSet$1;
var baseIsSet = _baseIsSet, baseUnary$1 = _baseUnary, nodeUtil$2 = _nodeUtil.exports;
var nodeIsSet = nodeUtil$2 && nodeUtil$2.isSet;
var isSet$1 = nodeIsSet ? baseUnary$1(nodeIsSet) : baseIsSet;
var isSet_1 = isSet$1;
var Stack$1 = _Stack, arrayEach$1 = _arrayEach, assignValue$1 = _assignValue, baseAssign = _baseAssign, baseAssignIn = _baseAssignIn, cloneBuffer$1 = _cloneBuffer.exports, copyArray$1 = _copyArray, copySymbols = _copySymbols, copySymbolsIn = _copySymbolsIn, getAllKeys$1 = _getAllKeys, getAllKeysIn = _getAllKeysIn, getTag$2 = _getTag, initCloneArray = _initCloneArray, initCloneByTag = _initCloneByTag, initCloneObject$1 = _initCloneObject, isArray$2 = isArray_1, isBuffer$2 = isBuffer$5.exports, isMap = isMap_1, isObject$1 = isObject_1, isSet = isSet_1, keys$1 = keys_1, keysIn$1 = keysIn_1;
var CLONE_DEEP_FLAG$1 = 1, CLONE_FLAT_FLAG = 2, CLONE_SYMBOLS_FLAG$1 = 4;
var argsTag$3 = "[object Arguments]", arrayTag$2 = "[object Array]", boolTag$2 = "[object Boolean]", dateTag$2 = "[object Date]", errorTag$2 = "[object Error]", funcTag$2 = "[object Function]", genTag$1 = "[object GeneratorFunction]", mapTag$3 = "[object Map]", numberTag$2 = "[object Number]", objectTag$4 = "[object Object]", regexpTag$2 = "[object RegExp]", setTag$3 = "[object Set]", stringTag$2 = "[object String]", symbolTag$2 = "[object Symbol]", weakMapTag$2 = "[object WeakMap]";
var arrayBufferTag$2 = "[object ArrayBuffer]", dataViewTag$3 = "[object DataView]", float32Tag$1 = "[object Float32Array]", float64Tag$1 = "[object Float64Array]", int8Tag$1 = "[object Int8Array]", int16Tag$1 = "[object Int16Array]", int32Tag$1 = "[object Int32Array]", uint8Tag$1 = "[object Uint8Array]", uint8ClampedTag$1 = "[object Uint8ClampedArray]", uint16Tag$1 = "[object Uint16Array]", uint32Tag$1 = "[object Uint32Array]";
var cloneableTags = {};
cloneableTags[argsTag$3] = cloneableTags[arrayTag$2] = cloneableTags[arrayBufferTag$2] = cloneableTags[dataViewTag$3] = cloneableTags[boolTag$2] = cloneableTags[dateTag$2] = cloneableTags[float32Tag$1] = cloneableTags[float64Tag$1] = cloneableTags[int8Tag$1] = cloneableTags[int16Tag$1] = cloneableTags[int32Tag$1] = cloneableTags[mapTag$3] = cloneableTags[numberTag$2] = cloneableTags[objectTag$4] = cloneableTags[regexpTag$2] = cloneableTags[setTag$3] = cloneableTags[stringTag$2] = cloneableTags[symbolTag$2] = cloneableTags[uint8Tag$1] = cloneableTags[uint8ClampedTag$1] = cloneableTags[uint16Tag$1] = cloneableTags[uint32Tag$1] = true;
cloneableTags[errorTag$2] = cloneableTags[funcTag$2] = cloneableTags[weakMapTag$2] = false;
function baseClone$1(value, bitmask, customizer, key, object, stack) {
  var result, isDeep = bitmask & CLONE_DEEP_FLAG$1, isFlat = bitmask & CLONE_FLAT_FLAG, isFull = bitmask & CLONE_SYMBOLS_FLAG$1;
  if (customizer) {
    result = object ? customizer(value, key, object, stack) : customizer(value);
  }
  if (result !== void 0) {
    return result;
  }
  if (!isObject$1(value)) {
    return value;
  }
  var isArr = isArray$2(value);
  if (isArr) {
    result = initCloneArray(value);
    if (!isDeep) {
      return copyArray$1(value, result);
    }
  } else {
    var tag = getTag$2(value), isFunc = tag == funcTag$2 || tag == genTag$1;
    if (isBuffer$2(value)) {
      return cloneBuffer$1(value, isDeep);
    }
    if (tag == objectTag$4 || tag == argsTag$3 || isFunc && !object) {
      result = isFlat || isFunc ? {} : initCloneObject$1(value);
      if (!isDeep) {
        return isFlat ? copySymbolsIn(value, baseAssignIn(result, value)) : copySymbols(value, baseAssign(result, value));
      }
    } else {
      if (!cloneableTags[tag]) {
        return object ? value : {};
      }
      result = initCloneByTag(value, tag, isDeep);
    }
  }
  stack || (stack = new Stack$1());
  var stacked = stack.get(value);
  if (stacked) {
    return stacked;
  }
  stack.set(value, result);
  if (isSet(value)) {
    value.forEach(function(subValue) {
      result.add(baseClone$1(subValue, bitmask, customizer, subValue, value, stack));
    });
  } else if (isMap(value)) {
    value.forEach(function(subValue, key2) {
      result.set(key2, baseClone$1(subValue, bitmask, customizer, key2, value, stack));
    });
  }
  var keysFunc = isFull ? isFlat ? getAllKeysIn : getAllKeys$1 : isFlat ? keysIn$1 : keys$1;
  var props = isArr ? void 0 : keysFunc(value);
  arrayEach$1(props || value, function(subValue, key2) {
    if (props) {
      key2 = subValue;
      subValue = value[key2];
    }
    assignValue$1(result, key2, baseClone$1(subValue, bitmask, customizer, key2, value, stack));
  });
  return result;
}
var _baseClone = baseClone$1;
var baseClone = _baseClone;
var CLONE_DEEP_FLAG = 1, CLONE_SYMBOLS_FLAG = 4;
function cloneDeep(value) {
  return baseClone(value, CLONE_DEEP_FLAG | CLONE_SYMBOLS_FLAG);
}
var cloneDeep_1 = cloneDeep;
Object.defineProperty(mergeClasses$1, "__esModule", {
  value: true
});
mergeClasses$1.mergeClasses = void 0;
var _forOwn2$1 = forOwn_1;
var _forOwn3$1 = _interopRequireDefault$6(_forOwn2$1);
var _cloneDeep2 = cloneDeep_1;
var _cloneDeep3 = _interopRequireDefault$6(_cloneDeep2);
var _extends$e = Object.assign || function(target) {
  for (var i2 = 1; i2 < arguments.length; i2++) {
    var source = arguments[i2];
    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }
  return target;
};
function _interopRequireDefault$6(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}
var mergeClasses = mergeClasses$1.mergeClasses = function mergeClasses2(classes) {
  var activeNames = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : [];
  var styles7 = classes.default && (0, _cloneDeep3.default)(classes.default) || {};
  activeNames.map(function(name) {
    var toMerge = classes[name];
    if (toMerge) {
      (0, _forOwn3$1.default)(toMerge, function(value, key) {
        if (!styles7[key]) {
          styles7[key] = {};
        }
        styles7[key] = _extends$e({}, styles7[key], toMerge[key]);
      });
    }
    return name;
  });
  return styles7;
};
mergeClasses$1.default = mergeClasses;
var autoprefix$1 = {};
Object.defineProperty(autoprefix$1, "__esModule", {
  value: true
});
autoprefix$1.autoprefix = void 0;
var _forOwn2 = forOwn_1;
var _forOwn3 = _interopRequireDefault$5(_forOwn2);
var _extends$d = Object.assign || function(target) {
  for (var i2 = 1; i2 < arguments.length; i2++) {
    var source = arguments[i2];
    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }
  return target;
};
function _interopRequireDefault$5(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}
var transforms = {
  borderRadius: function borderRadius(value) {
    return {
      msBorderRadius: value,
      MozBorderRadius: value,
      OBorderRadius: value,
      WebkitBorderRadius: value,
      borderRadius: value
    };
  },
  boxShadow: function boxShadow(value) {
    return {
      msBoxShadow: value,
      MozBoxShadow: value,
      OBoxShadow: value,
      WebkitBoxShadow: value,
      boxShadow: value
    };
  },
  userSelect: function userSelect2(value) {
    return {
      WebkitTouchCallout: value,
      KhtmlUserSelect: value,
      MozUserSelect: value,
      msUserSelect: value,
      WebkitUserSelect: value,
      userSelect: value
    };
  },
  flex: function flex(value) {
    return {
      WebkitBoxFlex: value,
      MozBoxFlex: value,
      WebkitFlex: value,
      msFlex: value,
      flex: value
    };
  },
  flexBasis: function flexBasis(value) {
    return {
      WebkitFlexBasis: value,
      flexBasis: value
    };
  },
  justifyContent: function justifyContent(value) {
    return {
      WebkitJustifyContent: value,
      justifyContent: value
    };
  },
  transition: function transition2(value) {
    return {
      msTransition: value,
      MozTransition: value,
      OTransition: value,
      WebkitTransition: value,
      transition: value
    };
  },
  transform: function transform2(value) {
    return {
      msTransform: value,
      MozTransform: value,
      OTransform: value,
      WebkitTransform: value,
      transform: value
    };
  },
  absolute: function absolute(value) {
    var direction = value && value.split(" ");
    return {
      position: "absolute",
      top: direction && direction[0],
      right: direction && direction[1],
      bottom: direction && direction[2],
      left: direction && direction[3]
    };
  },
  extend: function extend(name, otherElementStyles) {
    var otherStyle = otherElementStyles[name];
    if (otherStyle) {
      return otherStyle;
    }
    return {
      "extend": name
    };
  }
};
var autoprefix = autoprefix$1.autoprefix = function autoprefix2(elements) {
  var prefixed2 = {};
  (0, _forOwn3.default)(elements, function(styles7, element) {
    var expanded = {};
    (0, _forOwn3.default)(styles7, function(value, key) {
      var transform3 = transforms[key];
      if (transform3) {
        expanded = _extends$d({}, expanded, transform3(value));
      } else {
        expanded[key] = value;
      }
    });
    prefixed2[element] = expanded;
  });
  return prefixed2;
};
autoprefix$1.default = autoprefix;
var hover$1 = {};
Object.defineProperty(hover$1, "__esModule", {
  value: true
});
hover$1.hover = void 0;
var _extends$c = Object.assign || function(target) {
  for (var i2 = 1; i2 < arguments.length; i2++) {
    var source = arguments[i2];
    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }
  return target;
};
var _react$3 = React__default;
var _react2$3 = _interopRequireDefault$4(_react$3);
function _interopRequireDefault$4(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}
function _classCallCheck$9(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _possibleConstructorReturn$9(self2, call) {
  if (!self2) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return call && (typeof call === "object" || typeof call === "function") ? call : self2;
}
function _inherits$9(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });
  if (superClass)
    Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}
var hover = hover$1.hover = function hover2(Component2) {
  var Span = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "span";
  return function(_React$Component) {
    _inherits$9(Hover, _React$Component);
    function Hover() {
      var _ref;
      var _temp, _this, _ret;
      _classCallCheck$9(this, Hover);
      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }
      return _ret = (_temp = (_this = _possibleConstructorReturn$9(this, (_ref = Hover.__proto__ || Object.getPrototypeOf(Hover)).call.apply(_ref, [this].concat(args))), _this), _this.state = { hover: false }, _this.handleMouseOver = function() {
        return _this.setState({ hover: true });
      }, _this.handleMouseOut = function() {
        return _this.setState({ hover: false });
      }, _this.render = function() {
        return _react2$3.default.createElement(Span, { onMouseOver: _this.handleMouseOver, onMouseOut: _this.handleMouseOut }, _react2$3.default.createElement(Component2, _extends$c({}, _this.props, _this.state)));
      }, _temp), _possibleConstructorReturn$9(_this, _ret);
    }
    return Hover;
  }(_react2$3.default.Component);
};
hover$1.default = hover;
var active$1 = {};
Object.defineProperty(active$1, "__esModule", {
  value: true
});
active$1.active = void 0;
var _extends$b = Object.assign || function(target) {
  for (var i2 = 1; i2 < arguments.length; i2++) {
    var source = arguments[i2];
    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }
  return target;
};
var _react$2 = React__default;
var _react2$2 = _interopRequireDefault$3(_react$2);
function _interopRequireDefault$3(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}
function _classCallCheck$8(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _possibleConstructorReturn$8(self2, call) {
  if (!self2) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return call && (typeof call === "object" || typeof call === "function") ? call : self2;
}
function _inherits$8(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });
  if (superClass)
    Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}
var active = active$1.active = function active2(Component2) {
  var Span = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "span";
  return function(_React$Component) {
    _inherits$8(Active, _React$Component);
    function Active() {
      var _ref;
      var _temp, _this, _ret;
      _classCallCheck$8(this, Active);
      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }
      return _ret = (_temp = (_this = _possibleConstructorReturn$8(this, (_ref = Active.__proto__ || Object.getPrototypeOf(Active)).call.apply(_ref, [this].concat(args))), _this), _this.state = { active: false }, _this.handleMouseDown = function() {
        return _this.setState({ active: true });
      }, _this.handleMouseUp = function() {
        return _this.setState({ active: false });
      }, _this.render = function() {
        return _react2$2.default.createElement(Span, { onMouseDown: _this.handleMouseDown, onMouseUp: _this.handleMouseUp }, _react2$2.default.createElement(Component2, _extends$b({}, _this.props, _this.state)));
      }, _temp), _possibleConstructorReturn$8(_this, _ret);
    }
    return Active;
  }(_react2$2.default.Component);
};
active$1.default = active;
var loop = {};
Object.defineProperty(loop, "__esModule", {
  value: true
});
var loopable = function loopable2(i2, length) {
  var props = {};
  var setProp = function setProp2(name) {
    var value = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : true;
    props[name] = value;
  };
  i2 === 0 && setProp("first-child");
  i2 === length - 1 && setProp("last-child");
  (i2 === 0 || i2 % 2 === 0) && setProp("even");
  Math.abs(i2 % 2) === 1 && setProp("odd");
  setProp("nth-child", i2);
  return props;
};
loop.default = loopable;
Object.defineProperty(lib, "__esModule", {
  value: true
});
lib.ReactCSS = lib.loop = lib.handleActive = handleHover = lib.handleHover = lib.hover = void 0;
var _flattenNames = flattenNames$1;
var _flattenNames2 = _interopRequireDefault$2(_flattenNames);
var _mergeClasses = mergeClasses$1;
var _mergeClasses2 = _interopRequireDefault$2(_mergeClasses);
var _autoprefix = autoprefix$1;
var _autoprefix2 = _interopRequireDefault$2(_autoprefix);
var _hover2 = hover$1;
var _hover3 = _interopRequireDefault$2(_hover2);
var _active = active$1;
var _active2 = _interopRequireDefault$2(_active);
var _loop2 = loop;
var _loop3 = _interopRequireDefault$2(_loop2);
function _interopRequireDefault$2(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}
lib.hover = _hover3.default;
var handleHover = lib.handleHover = _hover3.default;
lib.handleActive = _active2.default;
lib.loop = _loop3.default;
var ReactCSS = lib.ReactCSS = function ReactCSS2(classes) {
  for (var _len = arguments.length, activations = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    activations[_key - 1] = arguments[_key];
  }
  var activeNames = (0, _flattenNames2.default)(activations);
  var merged = (0, _mergeClasses2.default)(classes, activeNames);
  return (0, _autoprefix2.default)(merged);
};
var _default$2 = lib.default = ReactCSS;
var calculateChange$2 = function calculateChange(e2, hsl, direction, initialA, container) {
  var containerWidth = container.clientWidth;
  var containerHeight = container.clientHeight;
  var x2 = typeof e2.pageX === "number" ? e2.pageX : e2.touches[0].pageX;
  var y2 = typeof e2.pageY === "number" ? e2.pageY : e2.touches[0].pageY;
  var left = x2 - (container.getBoundingClientRect().left + window.pageXOffset);
  var top = y2 - (container.getBoundingClientRect().top + window.pageYOffset);
  if (direction === "vertical") {
    var a2 = void 0;
    if (top < 0) {
      a2 = 0;
    } else if (top > containerHeight) {
      a2 = 1;
    } else {
      a2 = Math.round(top * 100 / containerHeight) / 100;
    }
    if (hsl.a !== a2) {
      return {
        h: hsl.h,
        s: hsl.s,
        l: hsl.l,
        a: a2,
        source: "rgb"
      };
    }
  } else {
    var _a = void 0;
    if (left < 0) {
      _a = 0;
    } else if (left > containerWidth) {
      _a = 1;
    } else {
      _a = Math.round(left * 100 / containerWidth) / 100;
    }
    if (initialA !== _a) {
      return {
        h: hsl.h,
        s: hsl.s,
        l: hsl.l,
        a: _a,
        source: "rgb"
      };
    }
  }
  return null;
};
var checkboardCache = {};
var render = function render2(c1, c2, size, serverCanvas) {
  if (typeof document === "undefined" && !serverCanvas) {
    return null;
  }
  var canvas = serverCanvas ? new serverCanvas() : document.createElement("canvas");
  canvas.width = size * 2;
  canvas.height = size * 2;
  var ctx = canvas.getContext("2d");
  if (!ctx) {
    return null;
  }
  ctx.fillStyle = c1;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = c2;
  ctx.fillRect(0, 0, size, size);
  ctx.translate(size, size);
  ctx.fillRect(0, 0, size, size);
  return canvas.toDataURL();
};
var get$1 = function get2(c1, c2, size, serverCanvas) {
  var key = c1 + "-" + c2 + "-" + size + (serverCanvas ? "-server" : "");
  if (checkboardCache[key]) {
    return checkboardCache[key];
  }
  var checkboard = render(c1, c2, size, serverCanvas);
  checkboardCache[key] = checkboard;
  return checkboard;
};
var _extends$a = Object.assign || function(target) {
  for (var i2 = 1; i2 < arguments.length; i2++) {
    var source = arguments[i2];
    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }
  return target;
};
var Checkboard = function Checkboard2(_ref) {
  var white = _ref.white, grey2 = _ref.grey, size = _ref.size, renderers = _ref.renderers, borderRadius2 = _ref.borderRadius, boxShadow2 = _ref.boxShadow, children = _ref.children;
  var styles7 = _default$2({
    "default": {
      grid: {
        borderRadius: borderRadius2,
        boxShadow: boxShadow2,
        absolute: "0px 0px 0px 0px",
        background: "url(" + get$1(white, grey2, size, renderers.canvas) + ") center left"
      }
    }
  });
  return isValidElement(children) ? React__default.cloneElement(children, _extends$a({}, children.props, {
    style: _extends$a({}, children.props.style, styles7.grid)
  })) : /* @__PURE__ */ jsx("div", {
    style: styles7.grid
  });
};
Checkboard.defaultProps = {
  size: 8,
  white: "transparent",
  grey: "rgba(0,0,0,.08)",
  renderers: {}
};
var _extends$9 = Object.assign || function(target) {
  for (var i2 = 1; i2 < arguments.length; i2++) {
    var source = arguments[i2];
    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }
  return target;
};
var _createClass$7 = function() {
  function defineProperties(target, props) {
    for (var i2 = 0; i2 < props.length; i2++) {
      var descriptor = props[i2];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor)
        descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }
  return function(Constructor, protoProps, staticProps) {
    if (protoProps)
      defineProperties(Constructor.prototype, protoProps);
    if (staticProps)
      defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();
function _classCallCheck$7(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _possibleConstructorReturn$7(self2, call) {
  if (!self2) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return call && (typeof call === "object" || typeof call === "function") ? call : self2;
}
function _inherits$7(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass)
    Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}
var Alpha = function(_ref) {
  _inherits$7(Alpha2, _ref);
  function Alpha2() {
    var _ref2;
    var _temp, _this, _ret;
    _classCallCheck$7(this, Alpha2);
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    return _ret = (_temp = (_this = _possibleConstructorReturn$7(this, (_ref2 = Alpha2.__proto__ || Object.getPrototypeOf(Alpha2)).call.apply(_ref2, [this].concat(args))), _this), _this.handleChange = function(e2) {
      var change = calculateChange$2(e2, _this.props.hsl, _this.props.direction, _this.props.a, _this.container);
      change && typeof _this.props.onChange === "function" && _this.props.onChange(change, e2);
    }, _this.handleMouseDown = function(e2) {
      _this.handleChange(e2);
      window.addEventListener("mousemove", _this.handleChange);
      window.addEventListener("mouseup", _this.handleMouseUp);
    }, _this.handleMouseUp = function() {
      _this.unbindEventListeners();
    }, _this.unbindEventListeners = function() {
      window.removeEventListener("mousemove", _this.handleChange);
      window.removeEventListener("mouseup", _this.handleMouseUp);
    }, _temp), _possibleConstructorReturn$7(_this, _ret);
  }
  _createClass$7(Alpha2, [{
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.unbindEventListeners();
    }
  }, {
    key: "render",
    value: function render3() {
      var _this2 = this;
      var rgb = this.props.rgb;
      var styles7 = _default$2({
        "default": {
          alpha: {
            absolute: "0px 0px 0px 0px",
            borderRadius: this.props.radius
          },
          checkboard: {
            absolute: "0px 0px 0px 0px",
            overflow: "hidden",
            borderRadius: this.props.radius
          },
          gradient: {
            absolute: "0px 0px 0px 0px",
            background: "linear-gradient(to right, rgba(" + rgb.r + "," + rgb.g + "," + rgb.b + ", 0) 0%,\n           rgba(" + rgb.r + "," + rgb.g + "," + rgb.b + ", 1) 100%)",
            boxShadow: this.props.shadow,
            borderRadius: this.props.radius
          },
          container: {
            position: "relative",
            height: "100%",
            margin: "0 3px"
          },
          pointer: {
            position: "absolute",
            left: rgb.a * 100 + "%"
          },
          slider: {
            width: "4px",
            borderRadius: "1px",
            height: "8px",
            boxShadow: "0 0 2px rgba(0, 0, 0, .6)",
            background: "#fff",
            marginTop: "1px",
            transform: "translateX(-2px)"
          }
        },
        "vertical": {
          gradient: {
            background: "linear-gradient(to bottom, rgba(" + rgb.r + "," + rgb.g + "," + rgb.b + ", 0) 0%,\n           rgba(" + rgb.r + "," + rgb.g + "," + rgb.b + ", 1) 100%)"
          },
          pointer: {
            left: 0,
            top: rgb.a * 100 + "%"
          }
        },
        "overwrite": _extends$9({}, this.props.style)
      }, {
        vertical: this.props.direction === "vertical",
        overwrite: true
      });
      return /* @__PURE__ */ jsxs("div", {
        style: styles7.alpha,
        children: [/* @__PURE__ */ jsx("div", {
          style: styles7.checkboard,
          children: /* @__PURE__ */ jsx(Checkboard, {
            renderers: this.props.renderers
          })
        }), /* @__PURE__ */ jsx("div", {
          style: styles7.gradient
        }), /* @__PURE__ */ jsx("div", {
          style: styles7.container,
          ref: function ref(container) {
            return _this2.container = container;
          },
          onMouseDown: this.handleMouseDown,
          onTouchMove: this.handleChange,
          onTouchStart: this.handleChange,
          children: /* @__PURE__ */ jsx("div", {
            style: styles7.pointer,
            children: this.props.pointer ? React__default.createElement(this.props.pointer, this.props) : /* @__PURE__ */ jsx("div", {
              style: styles7.slider
            })
          })
        })]
      });
    }
  }]);
  return Alpha2;
}(PureComponent || Component);
var _createClass$6 = function() {
  function defineProperties(target, props) {
    for (var i2 = 0; i2 < props.length; i2++) {
      var descriptor = props[i2];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor)
        descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }
  return function(Constructor, protoProps, staticProps) {
    if (protoProps)
      defineProperties(Constructor.prototype, protoProps);
    if (staticProps)
      defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();
function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _classCallCheck$6(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _possibleConstructorReturn$6(self2, call) {
  if (!self2) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return call && (typeof call === "object" || typeof call === "function") ? call : self2;
}
function _inherits$6(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass)
    Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}
var DEFAULT_ARROW_OFFSET = 1;
var UP_KEY_CODE = 38;
var DOWN_KEY_CODE = 40;
var VALID_KEY_CODES = [UP_KEY_CODE, DOWN_KEY_CODE];
var isValidKeyCode = function isValidKeyCode2(keyCode) {
  return VALID_KEY_CODES.indexOf(keyCode) > -1;
};
var getNumberValue = function getNumberValue2(value) {
  return Number(String(value).replace(/%/g, ""));
};
var idCounter = 1;
var EditableInput = function(_ref) {
  _inherits$6(EditableInput2, _ref);
  function EditableInput2(props) {
    _classCallCheck$6(this, EditableInput2);
    var _this = _possibleConstructorReturn$6(this, (EditableInput2.__proto__ || Object.getPrototypeOf(EditableInput2)).call(this));
    _this.handleBlur = function() {
      if (_this.state.blurValue) {
        _this.setState({
          value: _this.state.blurValue,
          blurValue: null
        });
      }
    };
    _this.handleChange = function(e2) {
      _this.setUpdatedValue(e2.target.value, e2);
    };
    _this.handleKeyDown = function(e2) {
      var value = getNumberValue(e2.target.value);
      if (!isNaN(value) && isValidKeyCode(e2.keyCode)) {
        var offset = _this.getArrowOffset();
        var updatedValue = e2.keyCode === UP_KEY_CODE ? value + offset : value - offset;
        _this.setUpdatedValue(updatedValue, e2);
      }
    };
    _this.handleDrag = function(e2) {
      if (_this.props.dragLabel) {
        var newValue = Math.round(_this.props.value + e2.movementX);
        if (newValue >= 0 && newValue <= _this.props.dragMax) {
          _this.props.onChange && _this.props.onChange(_this.getValueObjectWithLabel(newValue), e2);
        }
      }
    };
    _this.handleMouseDown = function(e2) {
      if (_this.props.dragLabel) {
        e2.preventDefault();
        _this.handleDrag(e2);
        window.addEventListener("mousemove", _this.handleDrag);
        window.addEventListener("mouseup", _this.handleMouseUp);
      }
    };
    _this.handleMouseUp = function() {
      _this.unbindEventListeners();
    };
    _this.unbindEventListeners = function() {
      window.removeEventListener("mousemove", _this.handleDrag);
      window.removeEventListener("mouseup", _this.handleMouseUp);
    };
    _this.state = {
      value: String(props.value).toUpperCase(),
      blurValue: String(props.value).toUpperCase()
    };
    _this.inputId = "rc-editable-input-" + idCounter++;
    return _this;
  }
  _createClass$6(EditableInput2, [{
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps, prevState) {
      if (this.props.value !== this.state.value && (prevProps.value !== this.props.value || prevState.value !== this.state.value)) {
        if (this.input === document.activeElement) {
          this.setState({
            blurValue: String(this.props.value).toUpperCase()
          });
        } else {
          this.setState({
            value: String(this.props.value).toUpperCase(),
            blurValue: !this.state.blurValue && String(this.props.value).toUpperCase()
          });
        }
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.unbindEventListeners();
    }
  }, {
    key: "getValueObjectWithLabel",
    value: function getValueObjectWithLabel(value) {
      return _defineProperty({}, this.props.label, value);
    }
  }, {
    key: "getArrowOffset",
    value: function getArrowOffset() {
      return this.props.arrowOffset || DEFAULT_ARROW_OFFSET;
    }
  }, {
    key: "setUpdatedValue",
    value: function setUpdatedValue(value, e2) {
      var onChangeValue2 = this.props.label ? this.getValueObjectWithLabel(value) : value;
      this.props.onChange && this.props.onChange(onChangeValue2, e2);
      this.setState({
        value
      });
    }
  }, {
    key: "render",
    value: function render3() {
      var _this2 = this;
      var styles7 = _default$2({
        "default": {
          wrap: {
            position: "relative"
          }
        },
        "user-override": {
          wrap: this.props.style && this.props.style.wrap ? this.props.style.wrap : {},
          input: this.props.style && this.props.style.input ? this.props.style.input : {},
          label: this.props.style && this.props.style.label ? this.props.style.label : {}
        },
        "dragLabel-true": {
          label: {
            cursor: "ew-resize"
          }
        }
      }, {
        "user-override": true
      }, this.props);
      return /* @__PURE__ */ jsxs("div", {
        style: styles7.wrap,
        children: [/* @__PURE__ */ jsx("input", {
          id: this.inputId,
          style: styles7.input,
          ref: function ref(input) {
            return _this2.input = input;
          },
          value: this.state.value,
          onKeyDown: this.handleKeyDown,
          onChange: this.handleChange,
          onBlur: this.handleBlur,
          placeholder: this.props.placeholder,
          spellCheck: "false"
        }), this.props.label && !this.props.hideLabel ? /* @__PURE__ */ jsx("label", {
          htmlFor: this.inputId,
          style: styles7.label,
          onMouseDown: this.handleMouseDown,
          children: this.props.label
        }) : null]
      });
    }
  }]);
  return EditableInput2;
}(PureComponent || Component);
var calculateChange$1 = function calculateChange2(e2, direction, hsl, container) {
  var containerWidth = container.clientWidth;
  var containerHeight = container.clientHeight;
  var x2 = typeof e2.pageX === "number" ? e2.pageX : e2.touches[0].pageX;
  var y2 = typeof e2.pageY === "number" ? e2.pageY : e2.touches[0].pageY;
  var left = x2 - (container.getBoundingClientRect().left + window.pageXOffset);
  var top = y2 - (container.getBoundingClientRect().top + window.pageYOffset);
  if (direction === "vertical") {
    var h2 = void 0;
    if (top < 0) {
      h2 = 359;
    } else if (top > containerHeight) {
      h2 = 0;
    } else {
      var percent2 = -(top * 100 / containerHeight) + 100;
      h2 = 360 * percent2 / 100;
    }
    if (hsl.h !== h2) {
      return {
        h: h2,
        s: hsl.s,
        l: hsl.l,
        a: hsl.a,
        source: "hsl"
      };
    }
  } else {
    var _h = void 0;
    if (left < 0) {
      _h = 0;
    } else if (left > containerWidth) {
      _h = 359;
    } else {
      var _percent = left * 100 / containerWidth;
      _h = 360 * _percent / 100;
    }
    if (hsl.h !== _h) {
      return {
        h: _h,
        s: hsl.s,
        l: hsl.l,
        a: hsl.a,
        source: "hsl"
      };
    }
  }
  return null;
};
var _createClass$5 = function() {
  function defineProperties(target, props) {
    for (var i2 = 0; i2 < props.length; i2++) {
      var descriptor = props[i2];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor)
        descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }
  return function(Constructor, protoProps, staticProps) {
    if (protoProps)
      defineProperties(Constructor.prototype, protoProps);
    if (staticProps)
      defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();
function _classCallCheck$5(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _possibleConstructorReturn$5(self2, call) {
  if (!self2) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return call && (typeof call === "object" || typeof call === "function") ? call : self2;
}
function _inherits$5(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass)
    Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}
var Hue = function(_ref) {
  _inherits$5(Hue2, _ref);
  function Hue2() {
    var _ref2;
    var _temp, _this, _ret;
    _classCallCheck$5(this, Hue2);
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    return _ret = (_temp = (_this = _possibleConstructorReturn$5(this, (_ref2 = Hue2.__proto__ || Object.getPrototypeOf(Hue2)).call.apply(_ref2, [this].concat(args))), _this), _this.handleChange = function(e2) {
      var change = calculateChange$1(e2, _this.props.direction, _this.props.hsl, _this.container);
      change && typeof _this.props.onChange === "function" && _this.props.onChange(change, e2);
    }, _this.handleMouseDown = function(e2) {
      _this.handleChange(e2);
      window.addEventListener("mousemove", _this.handleChange);
      window.addEventListener("mouseup", _this.handleMouseUp);
    }, _this.handleMouseUp = function() {
      _this.unbindEventListeners();
    }, _temp), _possibleConstructorReturn$5(_this, _ret);
  }
  _createClass$5(Hue2, [{
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.unbindEventListeners();
    }
  }, {
    key: "unbindEventListeners",
    value: function unbindEventListeners() {
      window.removeEventListener("mousemove", this.handleChange);
      window.removeEventListener("mouseup", this.handleMouseUp);
    }
  }, {
    key: "render",
    value: function render3() {
      var _this2 = this;
      var _props$direction = this.props.direction, direction = _props$direction === void 0 ? "horizontal" : _props$direction;
      var styles7 = _default$2({
        "default": {
          hue: {
            absolute: "0px 0px 0px 0px",
            borderRadius: this.props.radius,
            boxShadow: this.props.shadow
          },
          container: {
            padding: "0 2px",
            position: "relative",
            height: "100%",
            borderRadius: this.props.radius
          },
          pointer: {
            position: "absolute",
            left: this.props.hsl.h * 100 / 360 + "%"
          },
          slider: {
            marginTop: "1px",
            width: "4px",
            borderRadius: "1px",
            height: "8px",
            boxShadow: "0 0 2px rgba(0, 0, 0, .6)",
            background: "#fff",
            transform: "translateX(-2px)"
          }
        },
        "vertical": {
          pointer: {
            left: "0px",
            top: -(this.props.hsl.h * 100 / 360) + 100 + "%"
          }
        }
      }, {
        vertical: direction === "vertical"
      });
      return /* @__PURE__ */ jsx("div", {
        style: styles7.hue,
        children: /* @__PURE__ */ jsxs("div", {
          className: "hue-" + direction,
          style: styles7.container,
          ref: function ref(container) {
            return _this2.container = container;
          },
          onMouseDown: this.handleMouseDown,
          onTouchMove: this.handleChange,
          onTouchStart: this.handleChange,
          children: [/* @__PURE__ */ jsx("style", {
            children: ".hue-horizontal { background: linear-gradient(to right, #f00 0%, #ff0 17%, #0f0 33%, #0ff 50%, #00f 67%, #f0f 83%, #f00 100%); background: -webkit-linear-gradient(to right, #f00 0%, #ff0 17%, #0f0 33%, #0ff 50%, #00f 67%, #f0f 83%, #f00 100%); } .hue-vertical { background: linear-gradient(to top, #f00 0%, #ff0 17%, #0f0 33%, #0ff 50%, #00f 67%, #f0f 83%, #f00 100%); background: -webkit-linear-gradient(to top, #f00 0%, #ff0 17%, #0f0 33%, #0ff 50%, #00f 67%, #f0f 83%, #f00 100%); }"
          }), /* @__PURE__ */ jsx("div", {
            style: styles7.pointer,
            children: this.props.pointer ? React__default.createElement(this.props.pointer, this.props) : /* @__PURE__ */ jsx("div", {
              style: styles7.slider
            })
          })]
        })
      });
    }
  }]);
  return Hue2;
}(PureComponent || Component);
function listCacheClear() {
  this.__data__ = [];
  this.size = 0;
}
function eq(value, other) {
  return value === other || value !== value && other !== other;
}
function assocIndexOf(array, key) {
  var length = array.length;
  while (length--) {
    if (eq(array[length][0], key)) {
      return length;
    }
  }
  return -1;
}
var arrayProto = Array.prototype;
var splice = arrayProto.splice;
function listCacheDelete(key) {
  var data = this.__data__, index = assocIndexOf(data, key);
  if (index < 0) {
    return false;
  }
  var lastIndex = data.length - 1;
  if (index == lastIndex) {
    data.pop();
  } else {
    splice.call(data, index, 1);
  }
  --this.size;
  return true;
}
function listCacheGet(key) {
  var data = this.__data__, index = assocIndexOf(data, key);
  return index < 0 ? void 0 : data[index][1];
}
function listCacheHas(key) {
  return assocIndexOf(this.__data__, key) > -1;
}
function listCacheSet(key, value) {
  var data = this.__data__, index = assocIndexOf(data, key);
  if (index < 0) {
    ++this.size;
    data.push([key, value]);
  } else {
    data[index][1] = value;
  }
  return this;
}
function ListCache(entries) {
  var index = -1, length = entries == null ? 0 : entries.length;
  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}
ListCache.prototype.clear = listCacheClear;
ListCache.prototype["delete"] = listCacheDelete;
ListCache.prototype.get = listCacheGet;
ListCache.prototype.has = listCacheHas;
ListCache.prototype.set = listCacheSet;
function stackClear() {
  this.__data__ = new ListCache();
  this.size = 0;
}
function stackDelete(key) {
  var data = this.__data__, result = data["delete"](key);
  this.size = data.size;
  return result;
}
function stackGet(key) {
  return this.__data__.get(key);
}
function stackHas(key) {
  return this.__data__.has(key);
}
var freeGlobal = typeof global == "object" && global && global.Object === Object && global;
var freeGlobal$1 = freeGlobal;
var freeSelf = typeof self == "object" && self && self.Object === Object && self;
var root = freeGlobal$1 || freeSelf || Function("return this")();
var root$1 = root;
var Symbol$1 = root$1.Symbol;
var Symbol$2 = Symbol$1;
var objectProto$e = Object.prototype;
var hasOwnProperty$b = objectProto$e.hasOwnProperty;
var nativeObjectToString$1 = objectProto$e.toString;
var symToStringTag$1 = Symbol$2 ? Symbol$2.toStringTag : void 0;
function getRawTag(value) {
  var isOwn = hasOwnProperty$b.call(value, symToStringTag$1), tag = value[symToStringTag$1];
  try {
    value[symToStringTag$1] = void 0;
    var unmasked = true;
  } catch (e2) {
  }
  var result = nativeObjectToString$1.call(value);
  if (unmasked) {
    if (isOwn) {
      value[symToStringTag$1] = tag;
    } else {
      delete value[symToStringTag$1];
    }
  }
  return result;
}
var objectProto$d = Object.prototype;
var nativeObjectToString = objectProto$d.toString;
function objectToString(value) {
  return nativeObjectToString.call(value);
}
var nullTag = "[object Null]", undefinedTag = "[object Undefined]";
var symToStringTag = Symbol$2 ? Symbol$2.toStringTag : void 0;
function baseGetTag(value) {
  if (value == null) {
    return value === void 0 ? undefinedTag : nullTag;
  }
  return symToStringTag && symToStringTag in Object(value) ? getRawTag(value) : objectToString(value);
}
function isObject(value) {
  var type = typeof value;
  return value != null && (type == "object" || type == "function");
}
var asyncTag = "[object AsyncFunction]", funcTag$1 = "[object Function]", genTag = "[object GeneratorFunction]", proxyTag = "[object Proxy]";
function isFunction(value) {
  if (!isObject(value)) {
    return false;
  }
  var tag = baseGetTag(value);
  return tag == funcTag$1 || tag == genTag || tag == asyncTag || tag == proxyTag;
}
var coreJsData = root$1["__core-js_shared__"];
var coreJsData$1 = coreJsData;
var maskSrcKey = function() {
  var uid = /[^.]+$/.exec(coreJsData$1 && coreJsData$1.keys && coreJsData$1.keys.IE_PROTO || "");
  return uid ? "Symbol(src)_1." + uid : "";
}();
function isMasked(func) {
  return !!maskSrcKey && maskSrcKey in func;
}
var funcProto$2 = Function.prototype;
var funcToString$2 = funcProto$2.toString;
function toSource(func) {
  if (func != null) {
    try {
      return funcToString$2.call(func);
    } catch (e2) {
    }
    try {
      return func + "";
    } catch (e2) {
    }
  }
  return "";
}
var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;
var reIsHostCtor = /^\[object .+?Constructor\]$/;
var funcProto$1 = Function.prototype, objectProto$c = Object.prototype;
var funcToString$1 = funcProto$1.toString;
var hasOwnProperty$a = objectProto$c.hasOwnProperty;
var reIsNative = RegExp("^" + funcToString$1.call(hasOwnProperty$a).replace(reRegExpChar, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$");
function baseIsNative(value) {
  if (!isObject(value) || isMasked(value)) {
    return false;
  }
  var pattern = isFunction(value) ? reIsNative : reIsHostCtor;
  return pattern.test(toSource(value));
}
function getValue(object, key) {
  return object == null ? void 0 : object[key];
}
function getNative(object, key) {
  var value = getValue(object, key);
  return baseIsNative(value) ? value : void 0;
}
var Map$1 = getNative(root$1, "Map");
var Map$2 = Map$1;
var nativeCreate = getNative(Object, "create");
var nativeCreate$1 = nativeCreate;
function hashClear() {
  this.__data__ = nativeCreate$1 ? nativeCreate$1(null) : {};
  this.size = 0;
}
function hashDelete(key) {
  var result = this.has(key) && delete this.__data__[key];
  this.size -= result ? 1 : 0;
  return result;
}
var HASH_UNDEFINED$2 = "__lodash_hash_undefined__";
var objectProto$b = Object.prototype;
var hasOwnProperty$9 = objectProto$b.hasOwnProperty;
function hashGet(key) {
  var data = this.__data__;
  if (nativeCreate$1) {
    var result = data[key];
    return result === HASH_UNDEFINED$2 ? void 0 : result;
  }
  return hasOwnProperty$9.call(data, key) ? data[key] : void 0;
}
var objectProto$a = Object.prototype;
var hasOwnProperty$8 = objectProto$a.hasOwnProperty;
function hashHas(key) {
  var data = this.__data__;
  return nativeCreate$1 ? data[key] !== void 0 : hasOwnProperty$8.call(data, key);
}
var HASH_UNDEFINED$1 = "__lodash_hash_undefined__";
function hashSet(key, value) {
  var data = this.__data__;
  this.size += this.has(key) ? 0 : 1;
  data[key] = nativeCreate$1 && value === void 0 ? HASH_UNDEFINED$1 : value;
  return this;
}
function Hash(entries) {
  var index = -1, length = entries == null ? 0 : entries.length;
  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}
Hash.prototype.clear = hashClear;
Hash.prototype["delete"] = hashDelete;
Hash.prototype.get = hashGet;
Hash.prototype.has = hashHas;
Hash.prototype.set = hashSet;
function mapCacheClear() {
  this.size = 0;
  this.__data__ = {
    "hash": new Hash(),
    "map": new (Map$2 || ListCache)(),
    "string": new Hash()
  };
}
function isKeyable(value) {
  var type = typeof value;
  return type == "string" || type == "number" || type == "symbol" || type == "boolean" ? value !== "__proto__" : value === null;
}
function getMapData(map2, key) {
  var data = map2.__data__;
  return isKeyable(key) ? data[typeof key == "string" ? "string" : "hash"] : data.map;
}
function mapCacheDelete(key) {
  var result = getMapData(this, key)["delete"](key);
  this.size -= result ? 1 : 0;
  return result;
}
function mapCacheGet(key) {
  return getMapData(this, key).get(key);
}
function mapCacheHas(key) {
  return getMapData(this, key).has(key);
}
function mapCacheSet(key, value) {
  var data = getMapData(this, key), size = data.size;
  data.set(key, value);
  this.size += data.size == size ? 0 : 1;
  return this;
}
function MapCache(entries) {
  var index = -1, length = entries == null ? 0 : entries.length;
  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}
MapCache.prototype.clear = mapCacheClear;
MapCache.prototype["delete"] = mapCacheDelete;
MapCache.prototype.get = mapCacheGet;
MapCache.prototype.has = mapCacheHas;
MapCache.prototype.set = mapCacheSet;
var LARGE_ARRAY_SIZE = 200;
function stackSet(key, value) {
  var data = this.__data__;
  if (data instanceof ListCache) {
    var pairs = data.__data__;
    if (!Map$2 || pairs.length < LARGE_ARRAY_SIZE - 1) {
      pairs.push([key, value]);
      this.size = ++data.size;
      return this;
    }
    data = this.__data__ = new MapCache(pairs);
  }
  data.set(key, value);
  this.size = data.size;
  return this;
}
function Stack(entries) {
  var data = this.__data__ = new ListCache(entries);
  this.size = data.size;
}
Stack.prototype.clear = stackClear;
Stack.prototype["delete"] = stackDelete;
Stack.prototype.get = stackGet;
Stack.prototype.has = stackHas;
Stack.prototype.set = stackSet;
var defineProperty = function() {
  try {
    var func = getNative(Object, "defineProperty");
    func({}, "", {});
    return func;
  } catch (e2) {
  }
}();
var defineProperty$1 = defineProperty;
function baseAssignValue(object, key, value) {
  if (key == "__proto__" && defineProperty$1) {
    defineProperty$1(object, key, {
      "configurable": true,
      "enumerable": true,
      "value": value,
      "writable": true
    });
  } else {
    object[key] = value;
  }
}
function assignMergeValue(object, key, value) {
  if (value !== void 0 && !eq(object[key], value) || value === void 0 && !(key in object)) {
    baseAssignValue(object, key, value);
  }
}
function createBaseFor(fromRight) {
  return function(object, iteratee, keysFunc) {
    var index = -1, iterable = Object(object), props = keysFunc(object), length = props.length;
    while (length--) {
      var key = props[fromRight ? length : ++index];
      if (iteratee(iterable[key], key, iterable) === false) {
        break;
      }
    }
    return object;
  };
}
var baseFor = createBaseFor();
var baseFor$1 = baseFor;
var freeExports$2 = typeof exports == "object" && exports && !exports.nodeType && exports;
var freeModule$2 = freeExports$2 && typeof module == "object" && module && !module.nodeType && module;
var moduleExports$2 = freeModule$2 && freeModule$2.exports === freeExports$2;
var Buffer$1 = moduleExports$2 ? root$1.Buffer : void 0, allocUnsafe = Buffer$1 ? Buffer$1.allocUnsafe : void 0;
function cloneBuffer(buffer, isDeep) {
  if (isDeep) {
    return buffer.slice();
  }
  var length = buffer.length, result = allocUnsafe ? allocUnsafe(length) : new buffer.constructor(length);
  buffer.copy(result);
  return result;
}
var Uint8Array2 = root$1.Uint8Array;
var Uint8Array$1 = Uint8Array2;
function cloneArrayBuffer(arrayBuffer) {
  var result = new arrayBuffer.constructor(arrayBuffer.byteLength);
  new Uint8Array$1(result).set(new Uint8Array$1(arrayBuffer));
  return result;
}
function cloneTypedArray(typedArray, isDeep) {
  var buffer = isDeep ? cloneArrayBuffer(typedArray.buffer) : typedArray.buffer;
  return new typedArray.constructor(buffer, typedArray.byteOffset, typedArray.length);
}
function copyArray(source, array) {
  var index = -1, length = source.length;
  array || (array = Array(length));
  while (++index < length) {
    array[index] = source[index];
  }
  return array;
}
var objectCreate = Object.create;
var baseCreate = function() {
  function object() {
  }
  return function(proto) {
    if (!isObject(proto)) {
      return {};
    }
    if (objectCreate) {
      return objectCreate(proto);
    }
    object.prototype = proto;
    var result = new object();
    object.prototype = void 0;
    return result;
  };
}();
var baseCreate$1 = baseCreate;
function overArg(func, transform3) {
  return function(arg) {
    return func(transform3(arg));
  };
}
var getPrototype = overArg(Object.getPrototypeOf, Object);
var getPrototype$1 = getPrototype;
var objectProto$9 = Object.prototype;
function isPrototype(value) {
  var Ctor = value && value.constructor, proto = typeof Ctor == "function" && Ctor.prototype || objectProto$9;
  return value === proto;
}
function initCloneObject(object) {
  return typeof object.constructor == "function" && !isPrototype(object) ? baseCreate$1(getPrototype$1(object)) : {};
}
function isObjectLike(value) {
  return value != null && typeof value == "object";
}
var argsTag$2 = "[object Arguments]";
function baseIsArguments(value) {
  return isObjectLike(value) && baseGetTag(value) == argsTag$2;
}
var objectProto$8 = Object.prototype;
var hasOwnProperty$7 = objectProto$8.hasOwnProperty;
var propertyIsEnumerable$1 = objectProto$8.propertyIsEnumerable;
var isArguments = baseIsArguments(function() {
  return arguments;
}()) ? baseIsArguments : function(value) {
  return isObjectLike(value) && hasOwnProperty$7.call(value, "callee") && !propertyIsEnumerable$1.call(value, "callee");
};
var isArguments$1 = isArguments;
var isArray = Array.isArray;
var isArray$1 = isArray;
var MAX_SAFE_INTEGER$1 = 9007199254740991;
function isLength(value) {
  return typeof value == "number" && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER$1;
}
function isArrayLike(value) {
  return value != null && isLength(value.length) && !isFunction(value);
}
function isArrayLikeObject(value) {
  return isObjectLike(value) && isArrayLike(value);
}
function stubFalse() {
  return false;
}
var freeExports$1 = typeof exports == "object" && exports && !exports.nodeType && exports;
var freeModule$1 = freeExports$1 && typeof module == "object" && module && !module.nodeType && module;
var moduleExports$1 = freeModule$1 && freeModule$1.exports === freeExports$1;
var Buffer2 = moduleExports$1 ? root$1.Buffer : void 0;
var nativeIsBuffer = Buffer2 ? Buffer2.isBuffer : void 0;
var isBuffer = nativeIsBuffer || stubFalse;
var isBuffer$1 = isBuffer;
var objectTag$3 = "[object Object]";
var funcProto = Function.prototype, objectProto$7 = Object.prototype;
var funcToString = funcProto.toString;
var hasOwnProperty$6 = objectProto$7.hasOwnProperty;
var objectCtorString = funcToString.call(Object);
function isPlainObject(value) {
  if (!isObjectLike(value) || baseGetTag(value) != objectTag$3) {
    return false;
  }
  var proto = getPrototype$1(value);
  if (proto === null) {
    return true;
  }
  var Ctor = hasOwnProperty$6.call(proto, "constructor") && proto.constructor;
  return typeof Ctor == "function" && Ctor instanceof Ctor && funcToString.call(Ctor) == objectCtorString;
}
var argsTag$1 = "[object Arguments]", arrayTag$1 = "[object Array]", boolTag$1 = "[object Boolean]", dateTag$1 = "[object Date]", errorTag$1 = "[object Error]", funcTag = "[object Function]", mapTag$2 = "[object Map]", numberTag$1 = "[object Number]", objectTag$2 = "[object Object]", regexpTag$1 = "[object RegExp]", setTag$2 = "[object Set]", stringTag$1 = "[object String]", weakMapTag$1 = "[object WeakMap]";
var arrayBufferTag$1 = "[object ArrayBuffer]", dataViewTag$2 = "[object DataView]", float32Tag = "[object Float32Array]", float64Tag = "[object Float64Array]", int8Tag = "[object Int8Array]", int16Tag = "[object Int16Array]", int32Tag = "[object Int32Array]", uint8Tag = "[object Uint8Array]", uint8ClampedTag = "[object Uint8ClampedArray]", uint16Tag = "[object Uint16Array]", uint32Tag = "[object Uint32Array]";
var typedArrayTags = {};
typedArrayTags[float32Tag] = typedArrayTags[float64Tag] = typedArrayTags[int8Tag] = typedArrayTags[int16Tag] = typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] = typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] = typedArrayTags[uint32Tag] = true;
typedArrayTags[argsTag$1] = typedArrayTags[arrayTag$1] = typedArrayTags[arrayBufferTag$1] = typedArrayTags[boolTag$1] = typedArrayTags[dataViewTag$2] = typedArrayTags[dateTag$1] = typedArrayTags[errorTag$1] = typedArrayTags[funcTag] = typedArrayTags[mapTag$2] = typedArrayTags[numberTag$1] = typedArrayTags[objectTag$2] = typedArrayTags[regexpTag$1] = typedArrayTags[setTag$2] = typedArrayTags[stringTag$1] = typedArrayTags[weakMapTag$1] = false;
function baseIsTypedArray(value) {
  return isObjectLike(value) && isLength(value.length) && !!typedArrayTags[baseGetTag(value)];
}
function baseUnary(func) {
  return function(value) {
    return func(value);
  };
}
var freeExports = typeof exports == "object" && exports && !exports.nodeType && exports;
var freeModule = freeExports && typeof module == "object" && module && !module.nodeType && module;
var moduleExports = freeModule && freeModule.exports === freeExports;
var freeProcess = moduleExports && freeGlobal$1.process;
var nodeUtil = function() {
  try {
    var types = freeModule && freeModule.require && freeModule.require("util").types;
    if (types) {
      return types;
    }
    return freeProcess && freeProcess.binding && freeProcess.binding("util");
  } catch (e2) {
  }
}();
var nodeUtil$1 = nodeUtil;
var nodeIsTypedArray = nodeUtil$1 && nodeUtil$1.isTypedArray;
var isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;
var isTypedArray$1 = isTypedArray;
function safeGet(object, key) {
  if (key === "constructor" && typeof object[key] === "function") {
    return;
  }
  if (key == "__proto__") {
    return;
  }
  return object[key];
}
var objectProto$6 = Object.prototype;
var hasOwnProperty$5 = objectProto$6.hasOwnProperty;
function assignValue(object, key, value) {
  var objValue = object[key];
  if (!(hasOwnProperty$5.call(object, key) && eq(objValue, value)) || value === void 0 && !(key in object)) {
    baseAssignValue(object, key, value);
  }
}
function copyObject(source, props, object, customizer) {
  var isNew = !object;
  object || (object = {});
  var index = -1, length = props.length;
  while (++index < length) {
    var key = props[index];
    var newValue = customizer ? customizer(object[key], source[key], key, object, source) : void 0;
    if (newValue === void 0) {
      newValue = source[key];
    }
    if (isNew) {
      baseAssignValue(object, key, newValue);
    } else {
      assignValue(object, key, newValue);
    }
  }
  return object;
}
function baseTimes(n2, iteratee) {
  var index = -1, result = Array(n2);
  while (++index < n2) {
    result[index] = iteratee(index);
  }
  return result;
}
var MAX_SAFE_INTEGER = 9007199254740991;
var reIsUint = /^(?:0|[1-9]\d*)$/;
function isIndex(value, length) {
  var type = typeof value;
  length = length == null ? MAX_SAFE_INTEGER : length;
  return !!length && (type == "number" || type != "symbol" && reIsUint.test(value)) && (value > -1 && value % 1 == 0 && value < length);
}
var objectProto$5 = Object.prototype;
var hasOwnProperty$4 = objectProto$5.hasOwnProperty;
function arrayLikeKeys(value, inherited) {
  var isArr = isArray$1(value), isArg = !isArr && isArguments$1(value), isBuff = !isArr && !isArg && isBuffer$1(value), isType = !isArr && !isArg && !isBuff && isTypedArray$1(value), skipIndexes = isArr || isArg || isBuff || isType, result = skipIndexes ? baseTimes(value.length, String) : [], length = result.length;
  for (var key in value) {
    if ((inherited || hasOwnProperty$4.call(value, key)) && !(skipIndexes && (key == "length" || isBuff && (key == "offset" || key == "parent") || isType && (key == "buffer" || key == "byteLength" || key == "byteOffset") || isIndex(key, length)))) {
      result.push(key);
    }
  }
  return result;
}
function nativeKeysIn(object) {
  var result = [];
  if (object != null) {
    for (var key in Object(object)) {
      result.push(key);
    }
  }
  return result;
}
var objectProto$4 = Object.prototype;
var hasOwnProperty$3 = objectProto$4.hasOwnProperty;
function baseKeysIn(object) {
  if (!isObject(object)) {
    return nativeKeysIn(object);
  }
  var isProto = isPrototype(object), result = [];
  for (var key in object) {
    if (!(key == "constructor" && (isProto || !hasOwnProperty$3.call(object, key)))) {
      result.push(key);
    }
  }
  return result;
}
function keysIn(object) {
  return isArrayLike(object) ? arrayLikeKeys(object, true) : baseKeysIn(object);
}
function toPlainObject(value) {
  return copyObject(value, keysIn(value));
}
function baseMergeDeep(object, source, key, srcIndex, mergeFunc, customizer, stack) {
  var objValue = safeGet(object, key), srcValue = safeGet(source, key), stacked = stack.get(srcValue);
  if (stacked) {
    assignMergeValue(object, key, stacked);
    return;
  }
  var newValue = customizer ? customizer(objValue, srcValue, key + "", object, source, stack) : void 0;
  var isCommon = newValue === void 0;
  if (isCommon) {
    var isArr = isArray$1(srcValue), isBuff = !isArr && isBuffer$1(srcValue), isTyped = !isArr && !isBuff && isTypedArray$1(srcValue);
    newValue = srcValue;
    if (isArr || isBuff || isTyped) {
      if (isArray$1(objValue)) {
        newValue = objValue;
      } else if (isArrayLikeObject(objValue)) {
        newValue = copyArray(objValue);
      } else if (isBuff) {
        isCommon = false;
        newValue = cloneBuffer(srcValue, true);
      } else if (isTyped) {
        isCommon = false;
        newValue = cloneTypedArray(srcValue, true);
      } else {
        newValue = [];
      }
    } else if (isPlainObject(srcValue) || isArguments$1(srcValue)) {
      newValue = objValue;
      if (isArguments$1(objValue)) {
        newValue = toPlainObject(objValue);
      } else if (!isObject(objValue) || isFunction(objValue)) {
        newValue = initCloneObject(srcValue);
      }
    } else {
      isCommon = false;
    }
  }
  if (isCommon) {
    stack.set(srcValue, newValue);
    mergeFunc(newValue, srcValue, srcIndex, customizer, stack);
    stack["delete"](srcValue);
  }
  assignMergeValue(object, key, newValue);
}
function baseMerge(object, source, srcIndex, customizer, stack) {
  if (object === source) {
    return;
  }
  baseFor$1(source, function(srcValue, key) {
    stack || (stack = new Stack());
    if (isObject(srcValue)) {
      baseMergeDeep(object, source, key, srcIndex, baseMerge, customizer, stack);
    } else {
      var newValue = customizer ? customizer(safeGet(object, key), srcValue, key + "", object, source, stack) : void 0;
      if (newValue === void 0) {
        newValue = srcValue;
      }
      assignMergeValue(object, key, newValue);
    }
  }, keysIn);
}
function identity(value) {
  return value;
}
function apply(func, thisArg, args) {
  switch (args.length) {
    case 0:
      return func.call(thisArg);
    case 1:
      return func.call(thisArg, args[0]);
    case 2:
      return func.call(thisArg, args[0], args[1]);
    case 3:
      return func.call(thisArg, args[0], args[1], args[2]);
  }
  return func.apply(thisArg, args);
}
var nativeMax$1 = Math.max;
function overRest(func, start, transform3) {
  start = nativeMax$1(start === void 0 ? func.length - 1 : start, 0);
  return function() {
    var args = arguments, index = -1, length = nativeMax$1(args.length - start, 0), array = Array(length);
    while (++index < length) {
      array[index] = args[start + index];
    }
    index = -1;
    var otherArgs = Array(start + 1);
    while (++index < start) {
      otherArgs[index] = args[index];
    }
    otherArgs[start] = transform3(array);
    return apply(func, this, otherArgs);
  };
}
function constant(value) {
  return function() {
    return value;
  };
}
var baseSetToString = !defineProperty$1 ? identity : function(func, string) {
  return defineProperty$1(func, "toString", {
    "configurable": true,
    "enumerable": false,
    "value": constant(string),
    "writable": true
  });
};
var baseSetToString$1 = baseSetToString;
var HOT_COUNT = 800, HOT_SPAN = 16;
var nativeNow = Date.now;
function shortOut(func) {
  var count = 0, lastCalled = 0;
  return function() {
    var stamp = nativeNow(), remaining = HOT_SPAN - (stamp - lastCalled);
    lastCalled = stamp;
    if (remaining > 0) {
      if (++count >= HOT_COUNT) {
        return arguments[0];
      }
    } else {
      count = 0;
    }
    return func.apply(void 0, arguments);
  };
}
var setToString = shortOut(baseSetToString$1);
var setToString$1 = setToString;
function baseRest(func, start) {
  return setToString$1(overRest(func, start, identity), func + "");
}
function isIterateeCall(value, index, object) {
  if (!isObject(object)) {
    return false;
  }
  var type = typeof index;
  if (type == "number" ? isArrayLike(object) && isIndex(index, object.length) : type == "string" && index in object) {
    return eq(object[index], value);
  }
  return false;
}
function createAssigner(assigner) {
  return baseRest(function(object, sources) {
    var index = -1, length = sources.length, customizer = length > 1 ? sources[length - 1] : void 0, guard = length > 2 ? sources[2] : void 0;
    customizer = assigner.length > 3 && typeof customizer == "function" ? (length--, customizer) : void 0;
    if (guard && isIterateeCall(sources[0], sources[1], guard)) {
      customizer = length < 3 ? void 0 : customizer;
      length = 1;
    }
    object = Object(object);
    while (++index < length) {
      var source = sources[index];
      if (source) {
        assigner(object, source, index, customizer);
      }
    }
    return object;
  });
}
var merge = createAssigner(function(object, source, srcIndex) {
  baseMerge(object, source, srcIndex);
});
var merge$1 = merge;
var Raised = function Raised2(_ref) {
  var zDepth = _ref.zDepth, radius = _ref.radius, background = _ref.background, children = _ref.children, _ref$styles = _ref.styles, passedStyles = _ref$styles === void 0 ? {} : _ref$styles;
  var styles7 = _default$2(merge$1({
    "default": {
      wrap: {
        position: "relative",
        display: "inline-block"
      },
      content: {
        position: "relative"
      },
      bg: {
        absolute: "0px 0px 0px 0px",
        boxShadow: "0 " + zDepth + "px " + zDepth * 4 + "px rgba(0,0,0,.24)",
        borderRadius: radius,
        background
      }
    },
    "zDepth-0": {
      bg: {
        boxShadow: "none"
      }
    },
    "zDepth-1": {
      bg: {
        boxShadow: "0 2px 10px rgba(0,0,0,.12), 0 2px 5px rgba(0,0,0,.16)"
      }
    },
    "zDepth-2": {
      bg: {
        boxShadow: "0 6px 20px rgba(0,0,0,.19), 0 8px 17px rgba(0,0,0,.2)"
      }
    },
    "zDepth-3": {
      bg: {
        boxShadow: "0 17px 50px rgba(0,0,0,.19), 0 12px 15px rgba(0,0,0,.24)"
      }
    },
    "zDepth-4": {
      bg: {
        boxShadow: "0 25px 55px rgba(0,0,0,.21), 0 16px 28px rgba(0,0,0,.22)"
      }
    },
    "zDepth-5": {
      bg: {
        boxShadow: "0 40px 77px rgba(0,0,0,.22), 0 27px 24px rgba(0,0,0,.2)"
      }
    },
    "square": {
      bg: {
        borderRadius: "0"
      }
    },
    "circle": {
      bg: {
        borderRadius: "50%"
      }
    }
  }, passedStyles), { "zDepth-1": zDepth === 1 });
  return React__default.createElement("div", { style: styles7.wrap }, React__default.createElement("div", { style: styles7.bg }), React__default.createElement("div", { style: styles7.content }, children));
};
Raised.propTypes = {
  background: PropTypes.string,
  zDepth: PropTypes.oneOf([0, 1, 2, 3, 4, 5]),
  radius: PropTypes.number,
  styles: PropTypes.object
};
Raised.defaultProps = {
  background: "#fff",
  zDepth: 1,
  radius: 2,
  styles: {}
};
var now = function() {
  return root$1.Date.now();
};
var now$1 = now;
var reWhitespace = /\s/;
function trimmedEndIndex(string) {
  var index = string.length;
  while (index-- && reWhitespace.test(string.charAt(index))) {
  }
  return index;
}
var reTrimStart = /^\s+/;
function baseTrim(string) {
  return string ? string.slice(0, trimmedEndIndex(string) + 1).replace(reTrimStart, "") : string;
}
var symbolTag$1 = "[object Symbol]";
function isSymbol(value) {
  return typeof value == "symbol" || isObjectLike(value) && baseGetTag(value) == symbolTag$1;
}
var NAN = 0 / 0;
var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;
var reIsBinary = /^0b[01]+$/i;
var reIsOctal = /^0o[0-7]+$/i;
var freeParseInt = parseInt;
function toNumber(value) {
  if (typeof value == "number") {
    return value;
  }
  if (isSymbol(value)) {
    return NAN;
  }
  if (isObject(value)) {
    var other = typeof value.valueOf == "function" ? value.valueOf() : value;
    value = isObject(other) ? other + "" : other;
  }
  if (typeof value != "string") {
    return value === 0 ? value : +value;
  }
  value = baseTrim(value);
  var isBinary = reIsBinary.test(value);
  return isBinary || reIsOctal.test(value) ? freeParseInt(value.slice(2), isBinary ? 2 : 8) : reIsBadHex.test(value) ? NAN : +value;
}
var FUNC_ERROR_TEXT$2 = "Expected a function";
var nativeMax = Math.max, nativeMin = Math.min;
function debounce(func, wait, options) {
  var lastArgs, lastThis, maxWait, result, timerId, lastCallTime, lastInvokeTime = 0, leading = false, maxing = false, trailing = true;
  if (typeof func != "function") {
    throw new TypeError(FUNC_ERROR_TEXT$2);
  }
  wait = toNumber(wait) || 0;
  if (isObject(options)) {
    leading = !!options.leading;
    maxing = "maxWait" in options;
    maxWait = maxing ? nativeMax(toNumber(options.maxWait) || 0, wait) : maxWait;
    trailing = "trailing" in options ? !!options.trailing : trailing;
  }
  function invokeFunc(time) {
    var args = lastArgs, thisArg = lastThis;
    lastArgs = lastThis = void 0;
    lastInvokeTime = time;
    result = func.apply(thisArg, args);
    return result;
  }
  function leadingEdge(time) {
    lastInvokeTime = time;
    timerId = setTimeout(timerExpired, wait);
    return leading ? invokeFunc(time) : result;
  }
  function remainingWait(time) {
    var timeSinceLastCall = time - lastCallTime, timeSinceLastInvoke = time - lastInvokeTime, timeWaiting = wait - timeSinceLastCall;
    return maxing ? nativeMin(timeWaiting, maxWait - timeSinceLastInvoke) : timeWaiting;
  }
  function shouldInvoke(time) {
    var timeSinceLastCall = time - lastCallTime, timeSinceLastInvoke = time - lastInvokeTime;
    return lastCallTime === void 0 || timeSinceLastCall >= wait || timeSinceLastCall < 0 || maxing && timeSinceLastInvoke >= maxWait;
  }
  function timerExpired() {
    var time = now$1();
    if (shouldInvoke(time)) {
      return trailingEdge(time);
    }
    timerId = setTimeout(timerExpired, remainingWait(time));
  }
  function trailingEdge(time) {
    timerId = void 0;
    if (trailing && lastArgs) {
      return invokeFunc(time);
    }
    lastArgs = lastThis = void 0;
    return result;
  }
  function cancel() {
    if (timerId !== void 0) {
      clearTimeout(timerId);
    }
    lastInvokeTime = 0;
    lastArgs = lastCallTime = lastThis = timerId = void 0;
  }
  function flush() {
    return timerId === void 0 ? result : trailingEdge(now$1());
  }
  function debounced() {
    var time = now$1(), isInvoking = shouldInvoke(time);
    lastArgs = arguments;
    lastThis = this;
    lastCallTime = time;
    if (isInvoking) {
      if (timerId === void 0) {
        return leadingEdge(lastCallTime);
      }
      if (maxing) {
        clearTimeout(timerId);
        timerId = setTimeout(timerExpired, wait);
        return invokeFunc(lastCallTime);
      }
    }
    if (timerId === void 0) {
      timerId = setTimeout(timerExpired, wait);
    }
    return result;
  }
  debounced.cancel = cancel;
  debounced.flush = flush;
  return debounced;
}
var FUNC_ERROR_TEXT$1 = "Expected a function";
function throttle(func, wait, options) {
  var leading = true, trailing = true;
  if (typeof func != "function") {
    throw new TypeError(FUNC_ERROR_TEXT$1);
  }
  if (isObject(options)) {
    leading = "leading" in options ? !!options.leading : leading;
    trailing = "trailing" in options ? !!options.trailing : trailing;
  }
  return debounce(func, wait, {
    "leading": leading,
    "maxWait": wait,
    "trailing": trailing
  });
}
var calculateChange3 = function calculateChange4(e2, hsl, container) {
  var _container$getBoundin = container.getBoundingClientRect(), containerWidth = _container$getBoundin.width, containerHeight = _container$getBoundin.height;
  var x2 = typeof e2.pageX === "number" ? e2.pageX : e2.touches[0].pageX;
  var y2 = typeof e2.pageY === "number" ? e2.pageY : e2.touches[0].pageY;
  var left = x2 - (container.getBoundingClientRect().left + window.pageXOffset);
  var top = y2 - (container.getBoundingClientRect().top + window.pageYOffset);
  if (left < 0) {
    left = 0;
  } else if (left > containerWidth) {
    left = containerWidth;
  }
  if (top < 0) {
    top = 0;
  } else if (top > containerHeight) {
    top = containerHeight;
  }
  var saturation = left / containerWidth;
  var bright = 1 - top / containerHeight;
  return {
    h: hsl.h,
    s: saturation,
    v: bright,
    a: hsl.a,
    source: "hsv"
  };
};
var _createClass$4 = function() {
  function defineProperties(target, props) {
    for (var i2 = 0; i2 < props.length; i2++) {
      var descriptor = props[i2];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor)
        descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }
  return function(Constructor, protoProps, staticProps) {
    if (protoProps)
      defineProperties(Constructor.prototype, protoProps);
    if (staticProps)
      defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();
function _classCallCheck$4(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _possibleConstructorReturn$4(self2, call) {
  if (!self2) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return call && (typeof call === "object" || typeof call === "function") ? call : self2;
}
function _inherits$4(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass)
    Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}
var Saturation = function(_ref) {
  _inherits$4(Saturation2, _ref);
  function Saturation2(props) {
    _classCallCheck$4(this, Saturation2);
    var _this = _possibleConstructorReturn$4(this, (Saturation2.__proto__ || Object.getPrototypeOf(Saturation2)).call(this, props));
    _this.handleChange = function(e2) {
      typeof _this.props.onChange === "function" && _this.throttle(_this.props.onChange, calculateChange3(e2, _this.props.hsl, _this.container), e2);
    };
    _this.handleMouseDown = function(e2) {
      _this.handleChange(e2);
      var renderWindow = _this.getContainerRenderWindow();
      renderWindow.addEventListener("mousemove", _this.handleChange);
      renderWindow.addEventListener("mouseup", _this.handleMouseUp);
    };
    _this.handleMouseUp = function() {
      _this.unbindEventListeners();
    };
    _this.throttle = throttle(function(fn2, data, e2) {
      fn2(data, e2);
    }, 50);
    return _this;
  }
  _createClass$4(Saturation2, [{
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.throttle.cancel();
      this.unbindEventListeners();
    }
  }, {
    key: "getContainerRenderWindow",
    value: function getContainerRenderWindow() {
      var container = this.container;
      var renderWindow = window;
      while (!renderWindow.document.contains(container) && renderWindow.parent !== renderWindow) {
        renderWindow = renderWindow.parent;
      }
      return renderWindow;
    }
  }, {
    key: "unbindEventListeners",
    value: function unbindEventListeners() {
      var renderWindow = this.getContainerRenderWindow();
      renderWindow.removeEventListener("mousemove", this.handleChange);
      renderWindow.removeEventListener("mouseup", this.handleMouseUp);
    }
  }, {
    key: "render",
    value: function render3() {
      var _this2 = this;
      var _ref2 = this.props.style || {}, color = _ref2.color, white = _ref2.white, black = _ref2.black, pointer = _ref2.pointer, circle = _ref2.circle;
      var styles7 = _default$2({
        "default": {
          color: {
            absolute: "0px 0px 0px 0px",
            background: "hsl(" + this.props.hsl.h + ",100%, 50%)",
            borderRadius: this.props.radius
          },
          white: {
            absolute: "0px 0px 0px 0px",
            borderRadius: this.props.radius
          },
          black: {
            absolute: "0px 0px 0px 0px",
            boxShadow: this.props.shadow,
            borderRadius: this.props.radius
          },
          pointer: {
            position: "absolute",
            top: -(this.props.hsv.v * 100) + 100 + "%",
            left: this.props.hsv.s * 100 + "%",
            cursor: "default"
          },
          circle: {
            width: "4px",
            height: "4px",
            boxShadow: "0 0 0 1.5px #fff, inset 0 0 1px 1px rgba(0,0,0,.3),\n            0 0 1px 2px rgba(0,0,0,.4)",
            borderRadius: "50%",
            cursor: "hand",
            transform: "translate(-2px, -2px)"
          }
        },
        "custom": {
          color,
          white,
          black,
          pointer,
          circle
        }
      }, {
        "custom": !!this.props.style
      });
      return /* @__PURE__ */ jsxs("div", {
        style: styles7.color,
        ref: function ref(container) {
          return _this2.container = container;
        },
        onMouseDown: this.handleMouseDown,
        onTouchMove: this.handleChange,
        onTouchStart: this.handleChange,
        children: [/* @__PURE__ */ jsx("style", {
          children: ".saturation-white { background: -webkit-linear-gradient(to right, #fff, rgba(255,255,255,0)); background: linear-gradient(to right, #fff, rgba(255,255,255,0)); } .saturation-black { background: -webkit-linear-gradient(to top, #000, rgba(0,0,0,0)); background: linear-gradient(to top, #000, rgba(0,0,0,0)); }"
        }), /* @__PURE__ */ jsxs("div", {
          style: styles7.white,
          className: "saturation-white",
          children: [/* @__PURE__ */ jsx("div", {
            style: styles7.black,
            className: "saturation-black"
          }), /* @__PURE__ */ jsx("div", {
            style: styles7.pointer,
            children: this.props.pointer ? React__default.createElement(this.props.pointer, this.props) : /* @__PURE__ */ jsx("div", {
              style: styles7.circle
            })
          })]
        })]
      });
    }
  }]);
  return Saturation2;
}(PureComponent || Component);
function arrayEach(array, iteratee) {
  var index = -1, length = array == null ? 0 : array.length;
  while (++index < length) {
    if (iteratee(array[index], index, array) === false) {
      break;
    }
  }
  return array;
}
var nativeKeys = overArg(Object.keys, Object);
var nativeKeys$1 = nativeKeys;
var objectProto$3 = Object.prototype;
var hasOwnProperty$2 = objectProto$3.hasOwnProperty;
function baseKeys(object) {
  if (!isPrototype(object)) {
    return nativeKeys$1(object);
  }
  var result = [];
  for (var key in Object(object)) {
    if (hasOwnProperty$2.call(object, key) && key != "constructor") {
      result.push(key);
    }
  }
  return result;
}
function keys(object) {
  return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
}
function baseForOwn(object, iteratee) {
  return object && baseFor$1(object, iteratee, keys);
}
function createBaseEach(eachFunc, fromRight) {
  return function(collection, iteratee) {
    if (collection == null) {
      return collection;
    }
    if (!isArrayLike(collection)) {
      return eachFunc(collection, iteratee);
    }
    var length = collection.length, index = fromRight ? length : -1, iterable = Object(collection);
    while (fromRight ? index-- : ++index < length) {
      if (iteratee(iterable[index], index, iterable) === false) {
        break;
      }
    }
    return collection;
  };
}
var baseEach = createBaseEach(baseForOwn);
var baseEach$1 = baseEach;
function castFunction(value) {
  return typeof value == "function" ? value : identity;
}
function forEach(collection, iteratee) {
  var func = isArray$1(collection) ? arrayEach : baseEach$1;
  return func(collection, castFunction(iteratee));
}
var tinycolor$1 = { exports: {} };
(function(module2) {
  (function(Math2) {
    var trimLeft = /^\s+/, trimRight = /\s+$/, tinyCounter = 0, mathRound = Math2.round, mathMin = Math2.min, mathMax = Math2.max, mathRandom = Math2.random;
    function tinycolor2(color, opts) {
      color = color ? color : "";
      opts = opts || {};
      if (color instanceof tinycolor2) {
        return color;
      }
      if (!(this instanceof tinycolor2)) {
        return new tinycolor2(color, opts);
      }
      var rgb = inputToRGB(color);
      this._originalInput = color, this._r = rgb.r, this._g = rgb.g, this._b = rgb.b, this._a = rgb.a, this._roundA = mathRound(100 * this._a) / 100, this._format = opts.format || rgb.format;
      this._gradientType = opts.gradientType;
      if (this._r < 1) {
        this._r = mathRound(this._r);
      }
      if (this._g < 1) {
        this._g = mathRound(this._g);
      }
      if (this._b < 1) {
        this._b = mathRound(this._b);
      }
      this._ok = rgb.ok;
      this._tc_id = tinyCounter++;
    }
    tinycolor2.prototype = {
      isDark: function() {
        return this.getBrightness() < 128;
      },
      isLight: function() {
        return !this.isDark();
      },
      isValid: function() {
        return this._ok;
      },
      getOriginalInput: function() {
        return this._originalInput;
      },
      getFormat: function() {
        return this._format;
      },
      getAlpha: function() {
        return this._a;
      },
      getBrightness: function() {
        var rgb = this.toRgb();
        return (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1e3;
      },
      getLuminance: function() {
        var rgb = this.toRgb();
        var RsRGB, GsRGB, BsRGB, R2, G2, B2;
        RsRGB = rgb.r / 255;
        GsRGB = rgb.g / 255;
        BsRGB = rgb.b / 255;
        if (RsRGB <= 0.03928) {
          R2 = RsRGB / 12.92;
        } else {
          R2 = Math2.pow((RsRGB + 0.055) / 1.055, 2.4);
        }
        if (GsRGB <= 0.03928) {
          G2 = GsRGB / 12.92;
        } else {
          G2 = Math2.pow((GsRGB + 0.055) / 1.055, 2.4);
        }
        if (BsRGB <= 0.03928) {
          B2 = BsRGB / 12.92;
        } else {
          B2 = Math2.pow((BsRGB + 0.055) / 1.055, 2.4);
        }
        return 0.2126 * R2 + 0.7152 * G2 + 0.0722 * B2;
      },
      setAlpha: function(value) {
        this._a = boundAlpha(value);
        this._roundA = mathRound(100 * this._a) / 100;
        return this;
      },
      toHsv: function() {
        var hsv = rgbToHsv(this._r, this._g, this._b);
        return { h: hsv.h * 360, s: hsv.s, v: hsv.v, a: this._a };
      },
      toHsvString: function() {
        var hsv = rgbToHsv(this._r, this._g, this._b);
        var h2 = mathRound(hsv.h * 360), s2 = mathRound(hsv.s * 100), v2 = mathRound(hsv.v * 100);
        return this._a == 1 ? "hsv(" + h2 + ", " + s2 + "%, " + v2 + "%)" : "hsva(" + h2 + ", " + s2 + "%, " + v2 + "%, " + this._roundA + ")";
      },
      toHsl: function() {
        var hsl = rgbToHsl(this._r, this._g, this._b);
        return { h: hsl.h * 360, s: hsl.s, l: hsl.l, a: this._a };
      },
      toHslString: function() {
        var hsl = rgbToHsl(this._r, this._g, this._b);
        var h2 = mathRound(hsl.h * 360), s2 = mathRound(hsl.s * 100), l2 = mathRound(hsl.l * 100);
        return this._a == 1 ? "hsl(" + h2 + ", " + s2 + "%, " + l2 + "%)" : "hsla(" + h2 + ", " + s2 + "%, " + l2 + "%, " + this._roundA + ")";
      },
      toHex: function(allow3Char) {
        return rgbToHex(this._r, this._g, this._b, allow3Char);
      },
      toHexString: function(allow3Char) {
        return "#" + this.toHex(allow3Char);
      },
      toHex8: function(allow4Char) {
        return rgbaToHex(this._r, this._g, this._b, this._a, allow4Char);
      },
      toHex8String: function(allow4Char) {
        return "#" + this.toHex8(allow4Char);
      },
      toRgb: function() {
        return { r: mathRound(this._r), g: mathRound(this._g), b: mathRound(this._b), a: this._a };
      },
      toRgbString: function() {
        return this._a == 1 ? "rgb(" + mathRound(this._r) + ", " + mathRound(this._g) + ", " + mathRound(this._b) + ")" : "rgba(" + mathRound(this._r) + ", " + mathRound(this._g) + ", " + mathRound(this._b) + ", " + this._roundA + ")";
      },
      toPercentageRgb: function() {
        return { r: mathRound(bound01(this._r, 255) * 100) + "%", g: mathRound(bound01(this._g, 255) * 100) + "%", b: mathRound(bound01(this._b, 255) * 100) + "%", a: this._a };
      },
      toPercentageRgbString: function() {
        return this._a == 1 ? "rgb(" + mathRound(bound01(this._r, 255) * 100) + "%, " + mathRound(bound01(this._g, 255) * 100) + "%, " + mathRound(bound01(this._b, 255) * 100) + "%)" : "rgba(" + mathRound(bound01(this._r, 255) * 100) + "%, " + mathRound(bound01(this._g, 255) * 100) + "%, " + mathRound(bound01(this._b, 255) * 100) + "%, " + this._roundA + ")";
      },
      toName: function() {
        if (this._a === 0) {
          return "transparent";
        }
        if (this._a < 1) {
          return false;
        }
        return hexNames[rgbToHex(this._r, this._g, this._b, true)] || false;
      },
      toFilter: function(secondColor) {
        var hex8String = "#" + rgbaToArgbHex(this._r, this._g, this._b, this._a);
        var secondHex8String = hex8String;
        var gradientType = this._gradientType ? "GradientType = 1, " : "";
        if (secondColor) {
          var s2 = tinycolor2(secondColor);
          secondHex8String = "#" + rgbaToArgbHex(s2._r, s2._g, s2._b, s2._a);
        }
        return "progid:DXImageTransform.Microsoft.gradient(" + gradientType + "startColorstr=" + hex8String + ",endColorstr=" + secondHex8String + ")";
      },
      toString: function(format) {
        var formatSet = !!format;
        format = format || this._format;
        var formattedString = false;
        var hasAlpha = this._a < 1 && this._a >= 0;
        var needsAlphaFormat = !formatSet && hasAlpha && (format === "hex" || format === "hex6" || format === "hex3" || format === "hex4" || format === "hex8" || format === "name");
        if (needsAlphaFormat) {
          if (format === "name" && this._a === 0) {
            return this.toName();
          }
          return this.toRgbString();
        }
        if (format === "rgb") {
          formattedString = this.toRgbString();
        }
        if (format === "prgb") {
          formattedString = this.toPercentageRgbString();
        }
        if (format === "hex" || format === "hex6") {
          formattedString = this.toHexString();
        }
        if (format === "hex3") {
          formattedString = this.toHexString(true);
        }
        if (format === "hex4") {
          formattedString = this.toHex8String(true);
        }
        if (format === "hex8") {
          formattedString = this.toHex8String();
        }
        if (format === "name") {
          formattedString = this.toName();
        }
        if (format === "hsl") {
          formattedString = this.toHslString();
        }
        if (format === "hsv") {
          formattedString = this.toHsvString();
        }
        return formattedString || this.toHexString();
      },
      clone: function() {
        return tinycolor2(this.toString());
      },
      _applyModification: function(fn2, args) {
        var color = fn2.apply(null, [this].concat([].slice.call(args)));
        this._r = color._r;
        this._g = color._g;
        this._b = color._b;
        this.setAlpha(color._a);
        return this;
      },
      lighten: function() {
        return this._applyModification(lighten2, arguments);
      },
      brighten: function() {
        return this._applyModification(brighten, arguments);
      },
      darken: function() {
        return this._applyModification(darken2, arguments);
      },
      desaturate: function() {
        return this._applyModification(desaturate, arguments);
      },
      saturate: function() {
        return this._applyModification(saturate, arguments);
      },
      greyscale: function() {
        return this._applyModification(greyscale, arguments);
      },
      spin: function() {
        return this._applyModification(spin, arguments);
      },
      _applyCombination: function(fn2, args) {
        return fn2.apply(null, [this].concat([].slice.call(args)));
      },
      analogous: function() {
        return this._applyCombination(analogous, arguments);
      },
      complement: function() {
        return this._applyCombination(complement, arguments);
      },
      monochromatic: function() {
        return this._applyCombination(monochromatic, arguments);
      },
      splitcomplement: function() {
        return this._applyCombination(splitcomplement, arguments);
      },
      triad: function() {
        return this._applyCombination(triad, arguments);
      },
      tetrad: function() {
        return this._applyCombination(tetrad, arguments);
      }
    };
    tinycolor2.fromRatio = function(color, opts) {
      if (typeof color == "object") {
        var newColor = {};
        for (var i2 in color) {
          if (color.hasOwnProperty(i2)) {
            if (i2 === "a") {
              newColor[i2] = color[i2];
            } else {
              newColor[i2] = convertToPercentage(color[i2]);
            }
          }
        }
        color = newColor;
      }
      return tinycolor2(color, opts);
    };
    function inputToRGB(color) {
      var rgb = { r: 0, g: 0, b: 0 };
      var a2 = 1;
      var s2 = null;
      var v2 = null;
      var l2 = null;
      var ok = false;
      var format = false;
      if (typeof color == "string") {
        color = stringInputToObject(color);
      }
      if (typeof color == "object") {
        if (isValidCSSUnit(color.r) && isValidCSSUnit(color.g) && isValidCSSUnit(color.b)) {
          rgb = rgbToRgb(color.r, color.g, color.b);
          ok = true;
          format = String(color.r).substr(-1) === "%" ? "prgb" : "rgb";
        } else if (isValidCSSUnit(color.h) && isValidCSSUnit(color.s) && isValidCSSUnit(color.v)) {
          s2 = convertToPercentage(color.s);
          v2 = convertToPercentage(color.v);
          rgb = hsvToRgb(color.h, s2, v2);
          ok = true;
          format = "hsv";
        } else if (isValidCSSUnit(color.h) && isValidCSSUnit(color.s) && isValidCSSUnit(color.l)) {
          s2 = convertToPercentage(color.s);
          l2 = convertToPercentage(color.l);
          rgb = hslToRgb2(color.h, s2, l2);
          ok = true;
          format = "hsl";
        }
        if (color.hasOwnProperty("a")) {
          a2 = color.a;
        }
      }
      a2 = boundAlpha(a2);
      return {
        ok,
        format: color.format || format,
        r: mathMin(255, mathMax(rgb.r, 0)),
        g: mathMin(255, mathMax(rgb.g, 0)),
        b: mathMin(255, mathMax(rgb.b, 0)),
        a: a2
      };
    }
    function rgbToRgb(r2, g2, b2) {
      return {
        r: bound01(r2, 255) * 255,
        g: bound01(g2, 255) * 255,
        b: bound01(b2, 255) * 255
      };
    }
    function rgbToHsl(r2, g2, b2) {
      r2 = bound01(r2, 255);
      g2 = bound01(g2, 255);
      b2 = bound01(b2, 255);
      var max = mathMax(r2, g2, b2), min = mathMin(r2, g2, b2);
      var h2, s2, l2 = (max + min) / 2;
      if (max == min) {
        h2 = s2 = 0;
      } else {
        var d2 = max - min;
        s2 = l2 > 0.5 ? d2 / (2 - max - min) : d2 / (max + min);
        switch (max) {
          case r2:
            h2 = (g2 - b2) / d2 + (g2 < b2 ? 6 : 0);
            break;
          case g2:
            h2 = (b2 - r2) / d2 + 2;
            break;
          case b2:
            h2 = (r2 - g2) / d2 + 4;
            break;
        }
        h2 /= 6;
      }
      return { h: h2, s: s2, l: l2 };
    }
    function hslToRgb2(h2, s2, l2) {
      var r2, g2, b2;
      h2 = bound01(h2, 360);
      s2 = bound01(s2, 100);
      l2 = bound01(l2, 100);
      function hue2rgb(p3, q3, t2) {
        if (t2 < 0)
          t2 += 1;
        if (t2 > 1)
          t2 -= 1;
        if (t2 < 1 / 6)
          return p3 + (q3 - p3) * 6 * t2;
        if (t2 < 1 / 2)
          return q3;
        if (t2 < 2 / 3)
          return p3 + (q3 - p3) * (2 / 3 - t2) * 6;
        return p3;
      }
      if (s2 === 0) {
        r2 = g2 = b2 = l2;
      } else {
        var q2 = l2 < 0.5 ? l2 * (1 + s2) : l2 + s2 - l2 * s2;
        var p2 = 2 * l2 - q2;
        r2 = hue2rgb(p2, q2, h2 + 1 / 3);
        g2 = hue2rgb(p2, q2, h2);
        b2 = hue2rgb(p2, q2, h2 - 1 / 3);
      }
      return { r: r2 * 255, g: g2 * 255, b: b2 * 255 };
    }
    function rgbToHsv(r2, g2, b2) {
      r2 = bound01(r2, 255);
      g2 = bound01(g2, 255);
      b2 = bound01(b2, 255);
      var max = mathMax(r2, g2, b2), min = mathMin(r2, g2, b2);
      var h2, s2, v2 = max;
      var d2 = max - min;
      s2 = max === 0 ? 0 : d2 / max;
      if (max == min) {
        h2 = 0;
      } else {
        switch (max) {
          case r2:
            h2 = (g2 - b2) / d2 + (g2 < b2 ? 6 : 0);
            break;
          case g2:
            h2 = (b2 - r2) / d2 + 2;
            break;
          case b2:
            h2 = (r2 - g2) / d2 + 4;
            break;
        }
        h2 /= 6;
      }
      return { h: h2, s: s2, v: v2 };
    }
    function hsvToRgb(h2, s2, v2) {
      h2 = bound01(h2, 360) * 6;
      s2 = bound01(s2, 100);
      v2 = bound01(v2, 100);
      var i2 = Math2.floor(h2), f2 = h2 - i2, p2 = v2 * (1 - s2), q2 = v2 * (1 - f2 * s2), t2 = v2 * (1 - (1 - f2) * s2), mod = i2 % 6, r2 = [v2, q2, p2, p2, t2, v2][mod], g2 = [t2, v2, v2, q2, p2, p2][mod], b2 = [p2, p2, t2, v2, v2, q2][mod];
      return { r: r2 * 255, g: g2 * 255, b: b2 * 255 };
    }
    function rgbToHex(r2, g2, b2, allow3Char) {
      var hex = [
        pad2(mathRound(r2).toString(16)),
        pad2(mathRound(g2).toString(16)),
        pad2(mathRound(b2).toString(16))
      ];
      if (allow3Char && hex[0].charAt(0) == hex[0].charAt(1) && hex[1].charAt(0) == hex[1].charAt(1) && hex[2].charAt(0) == hex[2].charAt(1)) {
        return hex[0].charAt(0) + hex[1].charAt(0) + hex[2].charAt(0);
      }
      return hex.join("");
    }
    function rgbaToHex(r2, g2, b2, a2, allow4Char) {
      var hex = [
        pad2(mathRound(r2).toString(16)),
        pad2(mathRound(g2).toString(16)),
        pad2(mathRound(b2).toString(16)),
        pad2(convertDecimalToHex(a2))
      ];
      if (allow4Char && hex[0].charAt(0) == hex[0].charAt(1) && hex[1].charAt(0) == hex[1].charAt(1) && hex[2].charAt(0) == hex[2].charAt(1) && hex[3].charAt(0) == hex[3].charAt(1)) {
        return hex[0].charAt(0) + hex[1].charAt(0) + hex[2].charAt(0) + hex[3].charAt(0);
      }
      return hex.join("");
    }
    function rgbaToArgbHex(r2, g2, b2, a2) {
      var hex = [
        pad2(convertDecimalToHex(a2)),
        pad2(mathRound(r2).toString(16)),
        pad2(mathRound(g2).toString(16)),
        pad2(mathRound(b2).toString(16))
      ];
      return hex.join("");
    }
    tinycolor2.equals = function(color1, color2) {
      if (!color1 || !color2) {
        return false;
      }
      return tinycolor2(color1).toRgbString() == tinycolor2(color2).toRgbString();
    };
    tinycolor2.random = function() {
      return tinycolor2.fromRatio({
        r: mathRandom(),
        g: mathRandom(),
        b: mathRandom()
      });
    };
    function desaturate(color, amount) {
      amount = amount === 0 ? 0 : amount || 10;
      var hsl = tinycolor2(color).toHsl();
      hsl.s -= amount / 100;
      hsl.s = clamp01(hsl.s);
      return tinycolor2(hsl);
    }
    function saturate(color, amount) {
      amount = amount === 0 ? 0 : amount || 10;
      var hsl = tinycolor2(color).toHsl();
      hsl.s += amount / 100;
      hsl.s = clamp01(hsl.s);
      return tinycolor2(hsl);
    }
    function greyscale(color) {
      return tinycolor2(color).desaturate(100);
    }
    function lighten2(color, amount) {
      amount = amount === 0 ? 0 : amount || 10;
      var hsl = tinycolor2(color).toHsl();
      hsl.l += amount / 100;
      hsl.l = clamp01(hsl.l);
      return tinycolor2(hsl);
    }
    function brighten(color, amount) {
      amount = amount === 0 ? 0 : amount || 10;
      var rgb = tinycolor2(color).toRgb();
      rgb.r = mathMax(0, mathMin(255, rgb.r - mathRound(255 * -(amount / 100))));
      rgb.g = mathMax(0, mathMin(255, rgb.g - mathRound(255 * -(amount / 100))));
      rgb.b = mathMax(0, mathMin(255, rgb.b - mathRound(255 * -(amount / 100))));
      return tinycolor2(rgb);
    }
    function darken2(color, amount) {
      amount = amount === 0 ? 0 : amount || 10;
      var hsl = tinycolor2(color).toHsl();
      hsl.l -= amount / 100;
      hsl.l = clamp01(hsl.l);
      return tinycolor2(hsl);
    }
    function spin(color, amount) {
      var hsl = tinycolor2(color).toHsl();
      var hue = (hsl.h + amount) % 360;
      hsl.h = hue < 0 ? 360 + hue : hue;
      return tinycolor2(hsl);
    }
    function complement(color) {
      var hsl = tinycolor2(color).toHsl();
      hsl.h = (hsl.h + 180) % 360;
      return tinycolor2(hsl);
    }
    function triad(color) {
      var hsl = tinycolor2(color).toHsl();
      var h2 = hsl.h;
      return [
        tinycolor2(color),
        tinycolor2({ h: (h2 + 120) % 360, s: hsl.s, l: hsl.l }),
        tinycolor2({ h: (h2 + 240) % 360, s: hsl.s, l: hsl.l })
      ];
    }
    function tetrad(color) {
      var hsl = tinycolor2(color).toHsl();
      var h2 = hsl.h;
      return [
        tinycolor2(color),
        tinycolor2({ h: (h2 + 90) % 360, s: hsl.s, l: hsl.l }),
        tinycolor2({ h: (h2 + 180) % 360, s: hsl.s, l: hsl.l }),
        tinycolor2({ h: (h2 + 270) % 360, s: hsl.s, l: hsl.l })
      ];
    }
    function splitcomplement(color) {
      var hsl = tinycolor2(color).toHsl();
      var h2 = hsl.h;
      return [
        tinycolor2(color),
        tinycolor2({ h: (h2 + 72) % 360, s: hsl.s, l: hsl.l }),
        tinycolor2({ h: (h2 + 216) % 360, s: hsl.s, l: hsl.l })
      ];
    }
    function analogous(color, results, slices) {
      results = results || 6;
      slices = slices || 30;
      var hsl = tinycolor2(color).toHsl();
      var part = 360 / slices;
      var ret = [tinycolor2(color)];
      for (hsl.h = (hsl.h - (part * results >> 1) + 720) % 360; --results; ) {
        hsl.h = (hsl.h + part) % 360;
        ret.push(tinycolor2(hsl));
      }
      return ret;
    }
    function monochromatic(color, results) {
      results = results || 6;
      var hsv = tinycolor2(color).toHsv();
      var h2 = hsv.h, s2 = hsv.s, v2 = hsv.v;
      var ret = [];
      var modification = 1 / results;
      while (results--) {
        ret.push(tinycolor2({ h: h2, s: s2, v: v2 }));
        v2 = (v2 + modification) % 1;
      }
      return ret;
    }
    tinycolor2.mix = function(color1, color2, amount) {
      amount = amount === 0 ? 0 : amount || 50;
      var rgb1 = tinycolor2(color1).toRgb();
      var rgb2 = tinycolor2(color2).toRgb();
      var p2 = amount / 100;
      var rgba = {
        r: (rgb2.r - rgb1.r) * p2 + rgb1.r,
        g: (rgb2.g - rgb1.g) * p2 + rgb1.g,
        b: (rgb2.b - rgb1.b) * p2 + rgb1.b,
        a: (rgb2.a - rgb1.a) * p2 + rgb1.a
      };
      return tinycolor2(rgba);
    };
    tinycolor2.readability = function(color1, color2) {
      var c1 = tinycolor2(color1);
      var c2 = tinycolor2(color2);
      return (Math2.max(c1.getLuminance(), c2.getLuminance()) + 0.05) / (Math2.min(c1.getLuminance(), c2.getLuminance()) + 0.05);
    };
    tinycolor2.isReadable = function(color1, color2, wcag2) {
      var readability = tinycolor2.readability(color1, color2);
      var wcag2Parms, out;
      out = false;
      wcag2Parms = validateWCAG2Parms(wcag2);
      switch (wcag2Parms.level + wcag2Parms.size) {
        case "AAsmall":
        case "AAAlarge":
          out = readability >= 4.5;
          break;
        case "AAlarge":
          out = readability >= 3;
          break;
        case "AAAsmall":
          out = readability >= 7;
          break;
      }
      return out;
    };
    tinycolor2.mostReadable = function(baseColor, colorList, args) {
      var bestColor = null;
      var bestScore = 0;
      var readability;
      var includeFallbackColors, level, size;
      args = args || {};
      includeFallbackColors = args.includeFallbackColors;
      level = args.level;
      size = args.size;
      for (var i2 = 0; i2 < colorList.length; i2++) {
        readability = tinycolor2.readability(baseColor, colorList[i2]);
        if (readability > bestScore) {
          bestScore = readability;
          bestColor = tinycolor2(colorList[i2]);
        }
      }
      if (tinycolor2.isReadable(baseColor, bestColor, { "level": level, "size": size }) || !includeFallbackColors) {
        return bestColor;
      } else {
        args.includeFallbackColors = false;
        return tinycolor2.mostReadable(baseColor, ["#fff", "#000"], args);
      }
    };
    var names = tinycolor2.names = {
      aliceblue: "f0f8ff",
      antiquewhite: "faebd7",
      aqua: "0ff",
      aquamarine: "7fffd4",
      azure: "f0ffff",
      beige: "f5f5dc",
      bisque: "ffe4c4",
      black: "000",
      blanchedalmond: "ffebcd",
      blue: "00f",
      blueviolet: "8a2be2",
      brown: "a52a2a",
      burlywood: "deb887",
      burntsienna: "ea7e5d",
      cadetblue: "5f9ea0",
      chartreuse: "7fff00",
      chocolate: "d2691e",
      coral: "ff7f50",
      cornflowerblue: "6495ed",
      cornsilk: "fff8dc",
      crimson: "dc143c",
      cyan: "0ff",
      darkblue: "00008b",
      darkcyan: "008b8b",
      darkgoldenrod: "b8860b",
      darkgray: "a9a9a9",
      darkgreen: "006400",
      darkgrey: "a9a9a9",
      darkkhaki: "bdb76b",
      darkmagenta: "8b008b",
      darkolivegreen: "556b2f",
      darkorange: "ff8c00",
      darkorchid: "9932cc",
      darkred: "8b0000",
      darksalmon: "e9967a",
      darkseagreen: "8fbc8f",
      darkslateblue: "483d8b",
      darkslategray: "2f4f4f",
      darkslategrey: "2f4f4f",
      darkturquoise: "00ced1",
      darkviolet: "9400d3",
      deeppink: "ff1493",
      deepskyblue: "00bfff",
      dimgray: "696969",
      dimgrey: "696969",
      dodgerblue: "1e90ff",
      firebrick: "b22222",
      floralwhite: "fffaf0",
      forestgreen: "228b22",
      fuchsia: "f0f",
      gainsboro: "dcdcdc",
      ghostwhite: "f8f8ff",
      gold: "ffd700",
      goldenrod: "daa520",
      gray: "808080",
      green: "008000",
      greenyellow: "adff2f",
      grey: "808080",
      honeydew: "f0fff0",
      hotpink: "ff69b4",
      indianred: "cd5c5c",
      indigo: "4b0082",
      ivory: "fffff0",
      khaki: "f0e68c",
      lavender: "e6e6fa",
      lavenderblush: "fff0f5",
      lawngreen: "7cfc00",
      lemonchiffon: "fffacd",
      lightblue: "add8e6",
      lightcoral: "f08080",
      lightcyan: "e0ffff",
      lightgoldenrodyellow: "fafad2",
      lightgray: "d3d3d3",
      lightgreen: "90ee90",
      lightgrey: "d3d3d3",
      lightpink: "ffb6c1",
      lightsalmon: "ffa07a",
      lightseagreen: "20b2aa",
      lightskyblue: "87cefa",
      lightslategray: "789",
      lightslategrey: "789",
      lightsteelblue: "b0c4de",
      lightyellow: "ffffe0",
      lime: "0f0",
      limegreen: "32cd32",
      linen: "faf0e6",
      magenta: "f0f",
      maroon: "800000",
      mediumaquamarine: "66cdaa",
      mediumblue: "0000cd",
      mediumorchid: "ba55d3",
      mediumpurple: "9370db",
      mediumseagreen: "3cb371",
      mediumslateblue: "7b68ee",
      mediumspringgreen: "00fa9a",
      mediumturquoise: "48d1cc",
      mediumvioletred: "c71585",
      midnightblue: "191970",
      mintcream: "f5fffa",
      mistyrose: "ffe4e1",
      moccasin: "ffe4b5",
      navajowhite: "ffdead",
      navy: "000080",
      oldlace: "fdf5e6",
      olive: "808000",
      olivedrab: "6b8e23",
      orange: "ffa500",
      orangered: "ff4500",
      orchid: "da70d6",
      palegoldenrod: "eee8aa",
      palegreen: "98fb98",
      paleturquoise: "afeeee",
      palevioletred: "db7093",
      papayawhip: "ffefd5",
      peachpuff: "ffdab9",
      peru: "cd853f",
      pink: "ffc0cb",
      plum: "dda0dd",
      powderblue: "b0e0e6",
      purple: "800080",
      rebeccapurple: "663399",
      red: "f00",
      rosybrown: "bc8f8f",
      royalblue: "4169e1",
      saddlebrown: "8b4513",
      salmon: "fa8072",
      sandybrown: "f4a460",
      seagreen: "2e8b57",
      seashell: "fff5ee",
      sienna: "a0522d",
      silver: "c0c0c0",
      skyblue: "87ceeb",
      slateblue: "6a5acd",
      slategray: "708090",
      slategrey: "708090",
      snow: "fffafa",
      springgreen: "00ff7f",
      steelblue: "4682b4",
      tan: "d2b48c",
      teal: "008080",
      thistle: "d8bfd8",
      tomato: "ff6347",
      turquoise: "40e0d0",
      violet: "ee82ee",
      wheat: "f5deb3",
      white: "fff",
      whitesmoke: "f5f5f5",
      yellow: "ff0",
      yellowgreen: "9acd32"
    };
    var hexNames = tinycolor2.hexNames = flip(names);
    function flip(o2) {
      var flipped = {};
      for (var i2 in o2) {
        if (o2.hasOwnProperty(i2)) {
          flipped[o2[i2]] = i2;
        }
      }
      return flipped;
    }
    function boundAlpha(a2) {
      a2 = parseFloat(a2);
      if (isNaN(a2) || a2 < 0 || a2 > 1) {
        a2 = 1;
      }
      return a2;
    }
    function bound01(n2, max) {
      if (isOnePointZero(n2)) {
        n2 = "100%";
      }
      var processPercent = isPercentage(n2);
      n2 = mathMin(max, mathMax(0, parseFloat(n2)));
      if (processPercent) {
        n2 = parseInt(n2 * max, 10) / 100;
      }
      if (Math2.abs(n2 - max) < 1e-6) {
        return 1;
      }
      return n2 % max / parseFloat(max);
    }
    function clamp01(val) {
      return mathMin(1, mathMax(0, val));
    }
    function parseIntFromHex(val) {
      return parseInt(val, 16);
    }
    function isOnePointZero(n2) {
      return typeof n2 == "string" && n2.indexOf(".") != -1 && parseFloat(n2) === 1;
    }
    function isPercentage(n2) {
      return typeof n2 === "string" && n2.indexOf("%") != -1;
    }
    function pad2(c2) {
      return c2.length == 1 ? "0" + c2 : "" + c2;
    }
    function convertToPercentage(n2) {
      if (n2 <= 1) {
        n2 = n2 * 100 + "%";
      }
      return n2;
    }
    function convertDecimalToHex(d2) {
      return Math2.round(parseFloat(d2) * 255).toString(16);
    }
    function convertHexToDecimal(h2) {
      return parseIntFromHex(h2) / 255;
    }
    var matchers = function() {
      var CSS_INTEGER = "[-\\+]?\\d+%?";
      var CSS_NUMBER = "[-\\+]?\\d*\\.\\d+%?";
      var CSS_UNIT = "(?:" + CSS_NUMBER + ")|(?:" + CSS_INTEGER + ")";
      var PERMISSIVE_MATCH3 = "[\\s|\\(]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")\\s*\\)?";
      var PERMISSIVE_MATCH4 = "[\\s|\\(]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")\\s*\\)?";
      return {
        CSS_UNIT: new RegExp(CSS_UNIT),
        rgb: new RegExp("rgb" + PERMISSIVE_MATCH3),
        rgba: new RegExp("rgba" + PERMISSIVE_MATCH4),
        hsl: new RegExp("hsl" + PERMISSIVE_MATCH3),
        hsla: new RegExp("hsla" + PERMISSIVE_MATCH4),
        hsv: new RegExp("hsv" + PERMISSIVE_MATCH3),
        hsva: new RegExp("hsva" + PERMISSIVE_MATCH4),
        hex3: /^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
        hex6: /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/,
        hex4: /^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
        hex8: /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/
      };
    }();
    function isValidCSSUnit(color) {
      return !!matchers.CSS_UNIT.exec(color);
    }
    function stringInputToObject(color) {
      color = color.replace(trimLeft, "").replace(trimRight, "").toLowerCase();
      var named = false;
      if (names[color]) {
        color = names[color];
        named = true;
      } else if (color == "transparent") {
        return { r: 0, g: 0, b: 0, a: 0, format: "name" };
      }
      var match;
      if (match = matchers.rgb.exec(color)) {
        return { r: match[1], g: match[2], b: match[3] };
      }
      if (match = matchers.rgba.exec(color)) {
        return { r: match[1], g: match[2], b: match[3], a: match[4] };
      }
      if (match = matchers.hsl.exec(color)) {
        return { h: match[1], s: match[2], l: match[3] };
      }
      if (match = matchers.hsla.exec(color)) {
        return { h: match[1], s: match[2], l: match[3], a: match[4] };
      }
      if (match = matchers.hsv.exec(color)) {
        return { h: match[1], s: match[2], v: match[3] };
      }
      if (match = matchers.hsva.exec(color)) {
        return { h: match[1], s: match[2], v: match[3], a: match[4] };
      }
      if (match = matchers.hex8.exec(color)) {
        return {
          r: parseIntFromHex(match[1]),
          g: parseIntFromHex(match[2]),
          b: parseIntFromHex(match[3]),
          a: convertHexToDecimal(match[4]),
          format: named ? "name" : "hex8"
        };
      }
      if (match = matchers.hex6.exec(color)) {
        return {
          r: parseIntFromHex(match[1]),
          g: parseIntFromHex(match[2]),
          b: parseIntFromHex(match[3]),
          format: named ? "name" : "hex"
        };
      }
      if (match = matchers.hex4.exec(color)) {
        return {
          r: parseIntFromHex(match[1] + "" + match[1]),
          g: parseIntFromHex(match[2] + "" + match[2]),
          b: parseIntFromHex(match[3] + "" + match[3]),
          a: convertHexToDecimal(match[4] + "" + match[4]),
          format: named ? "name" : "hex8"
        };
      }
      if (match = matchers.hex3.exec(color)) {
        return {
          r: parseIntFromHex(match[1] + "" + match[1]),
          g: parseIntFromHex(match[2] + "" + match[2]),
          b: parseIntFromHex(match[3] + "" + match[3]),
          format: named ? "name" : "hex"
        };
      }
      return false;
    }
    function validateWCAG2Parms(parms) {
      var level, size;
      parms = parms || { "level": "AA", "size": "small" };
      level = (parms.level || "AA").toUpperCase();
      size = (parms.size || "small").toLowerCase();
      if (level !== "AA" && level !== "AAA") {
        level = "AA";
      }
      if (size !== "small" && size !== "large") {
        size = "small";
      }
      return { "level": level, "size": size };
    }
    if (module2.exports) {
      module2.exports = tinycolor2;
    } else {
      window.tinycolor = tinycolor2;
    }
  })(Math);
})(tinycolor$1);
var tinycolor = tinycolor$1.exports;
var simpleCheckForValidColor = function simpleCheckForValidColor2(data) {
  var keysToCheck = ["r", "g", "b", "a", "h", "s", "l", "v"];
  var checked = 0;
  var passed = 0;
  forEach(keysToCheck, function(letter) {
    if (data[letter]) {
      checked += 1;
      if (!isNaN(data[letter])) {
        passed += 1;
      }
      if (letter === "s" || letter === "l") {
        var percentPatt = /^\d+%$/;
        if (percentPatt.test(data[letter])) {
          passed += 1;
        }
      }
    }
  });
  return checked === passed ? data : false;
};
var toState = function toState2(data, oldHue) {
  var color = data.hex ? tinycolor(data.hex) : tinycolor(data);
  var hsl = color.toHsl();
  var hsv = color.toHsv();
  var rgb = color.toRgb();
  var hex = color.toHex();
  if (hsl.s === 0) {
    hsl.h = oldHue || 0;
    hsv.h = oldHue || 0;
  }
  var transparent = hex === "000000" && rgb.a === 0;
  return {
    hsl,
    hex: transparent ? "transparent" : "#" + hex,
    rgb,
    hsv,
    oldHue: data.h || oldHue || hsl.h,
    source: data.source
  };
};
var isValidHex = function isValidHex2(hex) {
  if (hex === "transparent") {
    return true;
  }
  var lh = String(hex).charAt(0) === "#" ? 1 : 0;
  return hex.length !== 4 + lh && hex.length < 7 + lh && tinycolor(hex).isValid();
};
var getContrastingColor = function getContrastingColor2(data) {
  if (!data) {
    return "#fff";
  }
  var col = toState(data);
  if (col.hex === "transparent") {
    return "rgba(0,0,0,0.4)";
  }
  var yiq = (col.rgb.r * 299 + col.rgb.g * 587 + col.rgb.b * 114) / 1e3;
  return yiq >= 128 ? "#000" : "#fff";
};
var isvalidColorString = function isvalidColorString2(string, type) {
  var stringWithoutDegree = string.replace("\xB0", "");
  return tinycolor(type + " (" + stringWithoutDegree + ")")._ok;
};
var _extends$8 = Object.assign || function(target) {
  for (var i2 = 1; i2 < arguments.length; i2++) {
    var source = arguments[i2];
    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }
  return target;
};
var _createClass$3 = function() {
  function defineProperties(target, props) {
    for (var i2 = 0; i2 < props.length; i2++) {
      var descriptor = props[i2];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor)
        descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }
  return function(Constructor, protoProps, staticProps) {
    if (protoProps)
      defineProperties(Constructor.prototype, protoProps);
    if (staticProps)
      defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();
function _classCallCheck$3(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _possibleConstructorReturn$3(self2, call) {
  if (!self2) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return call && (typeof call === "object" || typeof call === "function") ? call : self2;
}
function _inherits$3(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass)
    Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}
var ColorWrap = function ColorWrap2(Picker) {
  var ColorPicker2 = function(_ref) {
    _inherits$3(ColorPicker3, _ref);
    function ColorPicker3(props) {
      _classCallCheck$3(this, ColorPicker3);
      var _this = _possibleConstructorReturn$3(this, (ColorPicker3.__proto__ || Object.getPrototypeOf(ColorPicker3)).call(this));
      _this.handleChange = function(data, event) {
        var isValidColor = simpleCheckForValidColor(data);
        if (isValidColor) {
          var colors = toState(data, data.h || _this.state.oldHue);
          _this.setState(colors);
          _this.props.onChangeComplete && _this.debounce(_this.props.onChangeComplete, colors, event);
          _this.props.onChange && _this.props.onChange(colors, event);
        }
      };
      _this.handleSwatchHover = function(data, event) {
        var isValidColor = simpleCheckForValidColor(data);
        if (isValidColor) {
          var colors = toState(data, data.h || _this.state.oldHue);
          _this.props.onSwatchHover && _this.props.onSwatchHover(colors, event);
        }
      };
      _this.state = _extends$8({}, toState(props.color, 0));
      _this.debounce = debounce(function(fn2, data, event) {
        fn2(data, event);
      }, 100);
      return _this;
    }
    _createClass$3(ColorPicker3, [{
      key: "render",
      value: function render3() {
        var optionalEvents = {};
        if (this.props.onSwatchHover) {
          optionalEvents.onSwatchHover = this.handleSwatchHover;
        }
        return /* @__PURE__ */ jsx(Picker, __spreadValues(__spreadProps(__spreadValues(__spreadValues({}, this.props), this.state), {
          onChange: this.handleChange
        }), optionalEvents));
      }
    }], [{
      key: "getDerivedStateFromProps",
      value: function getDerivedStateFromProps(nextProps, state) {
        return _extends$8({}, toState(nextProps.color, state.oldHue));
      }
    }]);
    return ColorPicker3;
  }(PureComponent || Component);
  ColorPicker2.propTypes = _extends$8({}, Picker.propTypes);
  ColorPicker2.defaultProps = _extends$8({}, Picker.defaultProps, {
    color: {
      h: 250,
      s: 0.5,
      l: 0.2,
      a: 1
    }
  });
  return ColorPicker2;
};
var _extends$7 = Object.assign || function(target) {
  for (var i2 = 1; i2 < arguments.length; i2++) {
    var source = arguments[i2];
    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }
  return target;
};
var _createClass$2 = function() {
  function defineProperties(target, props) {
    for (var i2 = 0; i2 < props.length; i2++) {
      var descriptor = props[i2];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor)
        descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }
  return function(Constructor, protoProps, staticProps) {
    if (protoProps)
      defineProperties(Constructor.prototype, protoProps);
    if (staticProps)
      defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();
function _classCallCheck$2(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _possibleConstructorReturn$2(self2, call) {
  if (!self2) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return call && (typeof call === "object" || typeof call === "function") ? call : self2;
}
function _inherits$2(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });
  if (superClass)
    Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}
var handleFocus = function handleFocus2(Component2) {
  var Span = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "span";
  return function(_React$Component) {
    _inherits$2(Focus, _React$Component);
    function Focus() {
      var _ref;
      var _temp, _this, _ret;
      _classCallCheck$2(this, Focus);
      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }
      return _ret = (_temp = (_this = _possibleConstructorReturn$2(this, (_ref = Focus.__proto__ || Object.getPrototypeOf(Focus)).call.apply(_ref, [this].concat(args))), _this), _this.state = { focus: false }, _this.handleFocus = function() {
        return _this.setState({ focus: true });
      }, _this.handleBlur = function() {
        return _this.setState({ focus: false });
      }, _temp), _possibleConstructorReturn$2(_this, _ret);
    }
    _createClass$2(Focus, [{
      key: "render",
      value: function render3() {
        return React__default.createElement(Span, { onFocus: this.handleFocus, onBlur: this.handleBlur }, React__default.createElement(Component2, _extends$7({}, this.props, this.state)));
      }
    }]);
    return Focus;
  }(React__default.Component);
};
var _extends$6 = Object.assign || function(target) {
  for (var i2 = 1; i2 < arguments.length; i2++) {
    var source = arguments[i2];
    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }
  return target;
};
var ENTER = 13;
var Swatch = function Swatch2(_ref) {
  var color = _ref.color, style2 = _ref.style, _ref$onClick = _ref.onClick, onClick = _ref$onClick === void 0 ? function() {
  } : _ref$onClick, onHover = _ref.onHover, _ref$title = _ref.title, title = _ref$title === void 0 ? color : _ref$title, children = _ref.children, focus = _ref.focus, _ref$focusStyle = _ref.focusStyle, focusStyle = _ref$focusStyle === void 0 ? {} : _ref$focusStyle;
  var transparent = color === "transparent";
  var styles7 = _default$2({
    default: {
      swatch: _extends$6({
        background: color,
        height: "100%",
        width: "100%",
        cursor: "pointer",
        position: "relative",
        outline: "none"
      }, style2, focus ? focusStyle : {})
    }
  });
  var handleClick = function handleClick2(e2) {
    return onClick(color, e2);
  };
  var handleKeyDown2 = function handleKeyDown3(e2) {
    return e2.keyCode === ENTER && onClick(color, e2);
  };
  var handleHover2 = function handleHover3(e2) {
    return onHover(color, e2);
  };
  var optionalEvents = {};
  if (onHover) {
    optionalEvents.onMouseOver = handleHover2;
  }
  return React__default.createElement("div", _extends$6({
    style: styles7.swatch,
    onClick: handleClick,
    title,
    tabIndex: 0,
    onKeyDown: handleKeyDown2
  }, optionalEvents), children, transparent && React__default.createElement(Checkboard, {
    borderRadius: styles7.swatch.borderRadius,
    boxShadow: "inset 0 0 0 1px rgba(0,0,0,0.1)"
  }));
};
var Swatch$1 = handleFocus(Swatch);
var AlphaPointer = function AlphaPointer2(_ref) {
  var direction = _ref.direction;
  var styles7 = _default$2({
    "default": {
      picker: {
        width: "18px",
        height: "18px",
        borderRadius: "50%",
        transform: "translate(-9px, -1px)",
        backgroundColor: "rgb(248, 248, 248)",
        boxShadow: "0 1px 4px 0 rgba(0, 0, 0, 0.37)"
      }
    },
    "vertical": {
      picker: {
        transform: "translate(-3px, -9px)"
      }
    }
  }, { vertical: direction === "vertical" });
  return React__default.createElement("div", { style: styles7.picker });
};
var _extends$5 = Object.assign || function(target) {
  for (var i2 = 1; i2 < arguments.length; i2++) {
    var source = arguments[i2];
    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }
  return target;
};
var AlphaPicker = function AlphaPicker2(_ref) {
  var rgb = _ref.rgb, hsl = _ref.hsl, width = _ref.width, height = _ref.height, onChange = _ref.onChange, direction = _ref.direction, style2 = _ref.style, renderers = _ref.renderers, pointer = _ref.pointer, _ref$className = _ref.className, className = _ref$className === void 0 ? "" : _ref$className;
  var styles7 = _default$2({
    "default": {
      picker: {
        position: "relative",
        width,
        height
      },
      alpha: {
        radius: "2px",
        style: style2
      }
    }
  });
  return React__default.createElement("div", { style: styles7.picker, className: "alpha-picker " + className }, React__default.createElement(Alpha, _extends$5({}, styles7.alpha, {
    rgb,
    hsl,
    pointer,
    renderers,
    onChange,
    direction
  })));
};
AlphaPicker.defaultProps = {
  width: "316px",
  height: "16px",
  direction: "horizontal",
  pointer: AlphaPointer
};
ColorWrap(AlphaPicker);
function arrayMap(array, iteratee) {
  var index = -1, length = array == null ? 0 : array.length, result = Array(length);
  while (++index < length) {
    result[index] = iteratee(array[index], index, array);
  }
  return result;
}
var HASH_UNDEFINED = "__lodash_hash_undefined__";
function setCacheAdd(value) {
  this.__data__.set(value, HASH_UNDEFINED);
  return this;
}
function setCacheHas(value) {
  return this.__data__.has(value);
}
function SetCache(values2) {
  var index = -1, length = values2 == null ? 0 : values2.length;
  this.__data__ = new MapCache();
  while (++index < length) {
    this.add(values2[index]);
  }
}
SetCache.prototype.add = SetCache.prototype.push = setCacheAdd;
SetCache.prototype.has = setCacheHas;
function arraySome(array, predicate) {
  var index = -1, length = array == null ? 0 : array.length;
  while (++index < length) {
    if (predicate(array[index], index, array)) {
      return true;
    }
  }
  return false;
}
function cacheHas(cache2, key) {
  return cache2.has(key);
}
var COMPARE_PARTIAL_FLAG$5 = 1, COMPARE_UNORDERED_FLAG$3 = 2;
function equalArrays(array, other, bitmask, customizer, equalFunc, stack) {
  var isPartial = bitmask & COMPARE_PARTIAL_FLAG$5, arrLength = array.length, othLength = other.length;
  if (arrLength != othLength && !(isPartial && othLength > arrLength)) {
    return false;
  }
  var arrStacked = stack.get(array);
  var othStacked = stack.get(other);
  if (arrStacked && othStacked) {
    return arrStacked == other && othStacked == array;
  }
  var index = -1, result = true, seen = bitmask & COMPARE_UNORDERED_FLAG$3 ? new SetCache() : void 0;
  stack.set(array, other);
  stack.set(other, array);
  while (++index < arrLength) {
    var arrValue = array[index], othValue = other[index];
    if (customizer) {
      var compared = isPartial ? customizer(othValue, arrValue, index, other, array, stack) : customizer(arrValue, othValue, index, array, other, stack);
    }
    if (compared !== void 0) {
      if (compared) {
        continue;
      }
      result = false;
      break;
    }
    if (seen) {
      if (!arraySome(other, function(othValue2, othIndex) {
        if (!cacheHas(seen, othIndex) && (arrValue === othValue2 || equalFunc(arrValue, othValue2, bitmask, customizer, stack))) {
          return seen.push(othIndex);
        }
      })) {
        result = false;
        break;
      }
    } else if (!(arrValue === othValue || equalFunc(arrValue, othValue, bitmask, customizer, stack))) {
      result = false;
      break;
    }
  }
  stack["delete"](array);
  stack["delete"](other);
  return result;
}
function mapToArray(map2) {
  var index = -1, result = Array(map2.size);
  map2.forEach(function(value, key) {
    result[++index] = [key, value];
  });
  return result;
}
function setToArray(set2) {
  var index = -1, result = Array(set2.size);
  set2.forEach(function(value) {
    result[++index] = value;
  });
  return result;
}
var COMPARE_PARTIAL_FLAG$4 = 1, COMPARE_UNORDERED_FLAG$2 = 2;
var boolTag = "[object Boolean]", dateTag = "[object Date]", errorTag = "[object Error]", mapTag$1 = "[object Map]", numberTag = "[object Number]", regexpTag = "[object RegExp]", setTag$1 = "[object Set]", stringTag = "[object String]", symbolTag = "[object Symbol]";
var arrayBufferTag = "[object ArrayBuffer]", dataViewTag$1 = "[object DataView]";
var symbolProto$1 = Symbol$2 ? Symbol$2.prototype : void 0, symbolValueOf = symbolProto$1 ? symbolProto$1.valueOf : void 0;
function equalByTag(object, other, tag, bitmask, customizer, equalFunc, stack) {
  switch (tag) {
    case dataViewTag$1:
      if (object.byteLength != other.byteLength || object.byteOffset != other.byteOffset) {
        return false;
      }
      object = object.buffer;
      other = other.buffer;
    case arrayBufferTag:
      if (object.byteLength != other.byteLength || !equalFunc(new Uint8Array$1(object), new Uint8Array$1(other))) {
        return false;
      }
      return true;
    case boolTag:
    case dateTag:
    case numberTag:
      return eq(+object, +other);
    case errorTag:
      return object.name == other.name && object.message == other.message;
    case regexpTag:
    case stringTag:
      return object == other + "";
    case mapTag$1:
      var convert = mapToArray;
    case setTag$1:
      var isPartial = bitmask & COMPARE_PARTIAL_FLAG$4;
      convert || (convert = setToArray);
      if (object.size != other.size && !isPartial) {
        return false;
      }
      var stacked = stack.get(object);
      if (stacked) {
        return stacked == other;
      }
      bitmask |= COMPARE_UNORDERED_FLAG$2;
      stack.set(object, other);
      var result = equalArrays(convert(object), convert(other), bitmask, customizer, equalFunc, stack);
      stack["delete"](object);
      return result;
    case symbolTag:
      if (symbolValueOf) {
        return symbolValueOf.call(object) == symbolValueOf.call(other);
      }
  }
  return false;
}
function arrayPush(array, values2) {
  var index = -1, length = values2.length, offset = array.length;
  while (++index < length) {
    array[offset + index] = values2[index];
  }
  return array;
}
function baseGetAllKeys(object, keysFunc, symbolsFunc) {
  var result = keysFunc(object);
  return isArray$1(object) ? result : arrayPush(result, symbolsFunc(object));
}
function arrayFilter(array, predicate) {
  var index = -1, length = array == null ? 0 : array.length, resIndex = 0, result = [];
  while (++index < length) {
    var value = array[index];
    if (predicate(value, index, array)) {
      result[resIndex++] = value;
    }
  }
  return result;
}
function stubArray() {
  return [];
}
var objectProto$2 = Object.prototype;
var propertyIsEnumerable = objectProto$2.propertyIsEnumerable;
var nativeGetSymbols = Object.getOwnPropertySymbols;
var getSymbols = !nativeGetSymbols ? stubArray : function(object) {
  if (object == null) {
    return [];
  }
  object = Object(object);
  return arrayFilter(nativeGetSymbols(object), function(symbol) {
    return propertyIsEnumerable.call(object, symbol);
  });
};
var getSymbols$1 = getSymbols;
function getAllKeys(object) {
  return baseGetAllKeys(object, keys, getSymbols$1);
}
var COMPARE_PARTIAL_FLAG$3 = 1;
var objectProto$1 = Object.prototype;
var hasOwnProperty$1 = objectProto$1.hasOwnProperty;
function equalObjects(object, other, bitmask, customizer, equalFunc, stack) {
  var isPartial = bitmask & COMPARE_PARTIAL_FLAG$3, objProps = getAllKeys(object), objLength = objProps.length, othProps = getAllKeys(other), othLength = othProps.length;
  if (objLength != othLength && !isPartial) {
    return false;
  }
  var index = objLength;
  while (index--) {
    var key = objProps[index];
    if (!(isPartial ? key in other : hasOwnProperty$1.call(other, key))) {
      return false;
    }
  }
  var objStacked = stack.get(object);
  var othStacked = stack.get(other);
  if (objStacked && othStacked) {
    return objStacked == other && othStacked == object;
  }
  var result = true;
  stack.set(object, other);
  stack.set(other, object);
  var skipCtor = isPartial;
  while (++index < objLength) {
    key = objProps[index];
    var objValue = object[key], othValue = other[key];
    if (customizer) {
      var compared = isPartial ? customizer(othValue, objValue, key, other, object, stack) : customizer(objValue, othValue, key, object, other, stack);
    }
    if (!(compared === void 0 ? objValue === othValue || equalFunc(objValue, othValue, bitmask, customizer, stack) : compared)) {
      result = false;
      break;
    }
    skipCtor || (skipCtor = key == "constructor");
  }
  if (result && !skipCtor) {
    var objCtor = object.constructor, othCtor = other.constructor;
    if (objCtor != othCtor && ("constructor" in object && "constructor" in other) && !(typeof objCtor == "function" && objCtor instanceof objCtor && typeof othCtor == "function" && othCtor instanceof othCtor)) {
      result = false;
    }
  }
  stack["delete"](object);
  stack["delete"](other);
  return result;
}
var DataView = getNative(root$1, "DataView");
var DataView$1 = DataView;
var Promise$1 = getNative(root$1, "Promise");
var Promise$2 = Promise$1;
var Set$1 = getNative(root$1, "Set");
var Set$2 = Set$1;
var WeakMap = getNative(root$1, "WeakMap");
var WeakMap$1 = WeakMap;
var mapTag = "[object Map]", objectTag$1 = "[object Object]", promiseTag = "[object Promise]", setTag = "[object Set]", weakMapTag = "[object WeakMap]";
var dataViewTag = "[object DataView]";
var dataViewCtorString = toSource(DataView$1), mapCtorString = toSource(Map$2), promiseCtorString = toSource(Promise$2), setCtorString = toSource(Set$2), weakMapCtorString = toSource(WeakMap$1);
var getTag = baseGetTag;
if (DataView$1 && getTag(new DataView$1(new ArrayBuffer(1))) != dataViewTag || Map$2 && getTag(new Map$2()) != mapTag || Promise$2 && getTag(Promise$2.resolve()) != promiseTag || Set$2 && getTag(new Set$2()) != setTag || WeakMap$1 && getTag(new WeakMap$1()) != weakMapTag) {
  getTag = function(value) {
    var result = baseGetTag(value), Ctor = result == objectTag$1 ? value.constructor : void 0, ctorString = Ctor ? toSource(Ctor) : "";
    if (ctorString) {
      switch (ctorString) {
        case dataViewCtorString:
          return dataViewTag;
        case mapCtorString:
          return mapTag;
        case promiseCtorString:
          return promiseTag;
        case setCtorString:
          return setTag;
        case weakMapCtorString:
          return weakMapTag;
      }
    }
    return result;
  };
}
var getTag$1 = getTag;
var COMPARE_PARTIAL_FLAG$2 = 1;
var argsTag = "[object Arguments]", arrayTag = "[object Array]", objectTag = "[object Object]";
var objectProto = Object.prototype;
var hasOwnProperty = objectProto.hasOwnProperty;
function baseIsEqualDeep(object, other, bitmask, customizer, equalFunc, stack) {
  var objIsArr = isArray$1(object), othIsArr = isArray$1(other), objTag = objIsArr ? arrayTag : getTag$1(object), othTag = othIsArr ? arrayTag : getTag$1(other);
  objTag = objTag == argsTag ? objectTag : objTag;
  othTag = othTag == argsTag ? objectTag : othTag;
  var objIsObj = objTag == objectTag, othIsObj = othTag == objectTag, isSameTag = objTag == othTag;
  if (isSameTag && isBuffer$1(object)) {
    if (!isBuffer$1(other)) {
      return false;
    }
    objIsArr = true;
    objIsObj = false;
  }
  if (isSameTag && !objIsObj) {
    stack || (stack = new Stack());
    return objIsArr || isTypedArray$1(object) ? equalArrays(object, other, bitmask, customizer, equalFunc, stack) : equalByTag(object, other, objTag, bitmask, customizer, equalFunc, stack);
  }
  if (!(bitmask & COMPARE_PARTIAL_FLAG$2)) {
    var objIsWrapped = objIsObj && hasOwnProperty.call(object, "__wrapped__"), othIsWrapped = othIsObj && hasOwnProperty.call(other, "__wrapped__");
    if (objIsWrapped || othIsWrapped) {
      var objUnwrapped = objIsWrapped ? object.value() : object, othUnwrapped = othIsWrapped ? other.value() : other;
      stack || (stack = new Stack());
      return equalFunc(objUnwrapped, othUnwrapped, bitmask, customizer, stack);
    }
  }
  if (!isSameTag) {
    return false;
  }
  stack || (stack = new Stack());
  return equalObjects(object, other, bitmask, customizer, equalFunc, stack);
}
function baseIsEqual(value, other, bitmask, customizer, stack) {
  if (value === other) {
    return true;
  }
  if (value == null || other == null || !isObjectLike(value) && !isObjectLike(other)) {
    return value !== value && other !== other;
  }
  return baseIsEqualDeep(value, other, bitmask, customizer, baseIsEqual, stack);
}
var COMPARE_PARTIAL_FLAG$1 = 1, COMPARE_UNORDERED_FLAG$1 = 2;
function baseIsMatch(object, source, matchData, customizer) {
  var index = matchData.length, length = index, noCustomizer = !customizer;
  if (object == null) {
    return !length;
  }
  object = Object(object);
  while (index--) {
    var data = matchData[index];
    if (noCustomizer && data[2] ? data[1] !== object[data[0]] : !(data[0] in object)) {
      return false;
    }
  }
  while (++index < length) {
    data = matchData[index];
    var key = data[0], objValue = object[key], srcValue = data[1];
    if (noCustomizer && data[2]) {
      if (objValue === void 0 && !(key in object)) {
        return false;
      }
    } else {
      var stack = new Stack();
      if (customizer) {
        var result = customizer(objValue, srcValue, key, object, source, stack);
      }
      if (!(result === void 0 ? baseIsEqual(srcValue, objValue, COMPARE_PARTIAL_FLAG$1 | COMPARE_UNORDERED_FLAG$1, customizer, stack) : result)) {
        return false;
      }
    }
  }
  return true;
}
function isStrictComparable(value) {
  return value === value && !isObject(value);
}
function getMatchData(object) {
  var result = keys(object), length = result.length;
  while (length--) {
    var key = result[length], value = object[key];
    result[length] = [key, value, isStrictComparable(value)];
  }
  return result;
}
function matchesStrictComparable(key, srcValue) {
  return function(object) {
    if (object == null) {
      return false;
    }
    return object[key] === srcValue && (srcValue !== void 0 || key in Object(object));
  };
}
function baseMatches(source) {
  var matchData = getMatchData(source);
  if (matchData.length == 1 && matchData[0][2]) {
    return matchesStrictComparable(matchData[0][0], matchData[0][1]);
  }
  return function(object) {
    return object === source || baseIsMatch(object, source, matchData);
  };
}
var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, reIsPlainProp = /^\w*$/;
function isKey(value, object) {
  if (isArray$1(value)) {
    return false;
  }
  var type = typeof value;
  if (type == "number" || type == "symbol" || type == "boolean" || value == null || isSymbol(value)) {
    return true;
  }
  return reIsPlainProp.test(value) || !reIsDeepProp.test(value) || object != null && value in Object(object);
}
var FUNC_ERROR_TEXT = "Expected a function";
function memoize2(func, resolver) {
  if (typeof func != "function" || resolver != null && typeof resolver != "function") {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  var memoized = function() {
    var args = arguments, key = resolver ? resolver.apply(this, args) : args[0], cache2 = memoized.cache;
    if (cache2.has(key)) {
      return cache2.get(key);
    }
    var result = func.apply(this, args);
    memoized.cache = cache2.set(key, result) || cache2;
    return result;
  };
  memoized.cache = new (memoize2.Cache || MapCache)();
  return memoized;
}
memoize2.Cache = MapCache;
var MAX_MEMOIZE_SIZE = 500;
function memoizeCapped(func) {
  var result = memoize2(func, function(key) {
    if (cache2.size === MAX_MEMOIZE_SIZE) {
      cache2.clear();
    }
    return key;
  });
  var cache2 = result.cache;
  return result;
}
var rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;
var reEscapeChar = /\\(\\)?/g;
var stringToPath = memoizeCapped(function(string) {
  var result = [];
  if (string.charCodeAt(0) === 46) {
    result.push("");
  }
  string.replace(rePropName, function(match, number, quote, subString) {
    result.push(quote ? subString.replace(reEscapeChar, "$1") : number || match);
  });
  return result;
});
var stringToPath$1 = stringToPath;
var INFINITY$1 = 1 / 0;
var symbolProto = Symbol$2 ? Symbol$2.prototype : void 0, symbolToString = symbolProto ? symbolProto.toString : void 0;
function baseToString(value) {
  if (typeof value == "string") {
    return value;
  }
  if (isArray$1(value)) {
    return arrayMap(value, baseToString) + "";
  }
  if (isSymbol(value)) {
    return symbolToString ? symbolToString.call(value) : "";
  }
  var result = value + "";
  return result == "0" && 1 / value == -INFINITY$1 ? "-0" : result;
}
function toString(value) {
  return value == null ? "" : baseToString(value);
}
function castPath(value, object) {
  if (isArray$1(value)) {
    return value;
  }
  return isKey(value, object) ? [value] : stringToPath$1(toString(value));
}
var INFINITY = 1 / 0;
function toKey(value) {
  if (typeof value == "string" || isSymbol(value)) {
    return value;
  }
  var result = value + "";
  return result == "0" && 1 / value == -INFINITY ? "-0" : result;
}
function baseGet(object, path) {
  path = castPath(path, object);
  var index = 0, length = path.length;
  while (object != null && index < length) {
    object = object[toKey(path[index++])];
  }
  return index && index == length ? object : void 0;
}
function get3(object, path, defaultValue) {
  var result = object == null ? void 0 : baseGet(object, path);
  return result === void 0 ? defaultValue : result;
}
function baseHasIn(object, key) {
  return object != null && key in Object(object);
}
function hasPath(object, path, hasFunc) {
  path = castPath(path, object);
  var index = -1, length = path.length, result = false;
  while (++index < length) {
    var key = toKey(path[index]);
    if (!(result = object != null && hasFunc(object, key))) {
      break;
    }
    object = object[key];
  }
  if (result || ++index != length) {
    return result;
  }
  length = object == null ? 0 : object.length;
  return !!length && isLength(length) && isIndex(key, length) && (isArray$1(object) || isArguments$1(object));
}
function hasIn(object, path) {
  return object != null && hasPath(object, path, baseHasIn);
}
var COMPARE_PARTIAL_FLAG = 1, COMPARE_UNORDERED_FLAG = 2;
function baseMatchesProperty(path, srcValue) {
  if (isKey(path) && isStrictComparable(srcValue)) {
    return matchesStrictComparable(toKey(path), srcValue);
  }
  return function(object) {
    var objValue = get3(object, path);
    return objValue === void 0 && objValue === srcValue ? hasIn(object, path) : baseIsEqual(srcValue, objValue, COMPARE_PARTIAL_FLAG | COMPARE_UNORDERED_FLAG);
  };
}
function baseProperty(key) {
  return function(object) {
    return object == null ? void 0 : object[key];
  };
}
function basePropertyDeep(path) {
  return function(object) {
    return baseGet(object, path);
  };
}
function property(path) {
  return isKey(path) ? baseProperty(toKey(path)) : basePropertyDeep(path);
}
function baseIteratee(value) {
  if (typeof value == "function") {
    return value;
  }
  if (value == null) {
    return identity;
  }
  if (typeof value == "object") {
    return isArray$1(value) ? baseMatchesProperty(value[0], value[1]) : baseMatches(value);
  }
  return property(value);
}
function baseMap(collection, iteratee) {
  var index = -1, result = isArrayLike(collection) ? Array(collection.length) : [];
  baseEach$1(collection, function(value, key, collection2) {
    result[++index] = iteratee(value, key, collection2);
  });
  return result;
}
function map(collection, iteratee) {
  var func = isArray$1(collection) ? arrayMap : baseMap;
  return func(collection, baseIteratee(iteratee));
}
var BlockSwatches = function BlockSwatches2(_ref) {
  var colors = _ref.colors, onClick = _ref.onClick, onSwatchHover = _ref.onSwatchHover;
  var styles7 = _default$2({
    "default": {
      swatches: {
        marginRight: "-10px"
      },
      swatch: {
        width: "22px",
        height: "22px",
        float: "left",
        marginRight: "10px",
        marginBottom: "10px",
        borderRadius: "4px"
      },
      clear: {
        clear: "both"
      }
    }
  });
  return React__default.createElement("div", { style: styles7.swatches }, map(colors, function(c2) {
    return React__default.createElement(Swatch$1, {
      key: c2,
      color: c2,
      style: styles7.swatch,
      onClick,
      onHover: onSwatchHover,
      focusStyle: {
        boxShadow: "0 0 4px " + c2
      }
    });
  }), React__default.createElement("div", { style: styles7.clear }));
};
var Block = function Block2(_ref) {
  var onChange = _ref.onChange, onSwatchHover = _ref.onSwatchHover, hex = _ref.hex, colors = _ref.colors, width = _ref.width, triangle = _ref.triangle, _ref$styles = _ref.styles, passedStyles = _ref$styles === void 0 ? {} : _ref$styles, _ref$className = _ref.className, className = _ref$className === void 0 ? "" : _ref$className;
  var transparent = hex === "transparent";
  var handleChange = function handleChange2(hexCode, e2) {
    isValidHex(hexCode) && onChange({
      hex: hexCode,
      source: "hex"
    }, e2);
  };
  var styles7 = _default$2(merge$1({
    "default": {
      card: {
        width,
        background: "#fff",
        boxShadow: "0 1px rgba(0,0,0,.1)",
        borderRadius: "6px",
        position: "relative"
      },
      head: {
        height: "110px",
        background: hex,
        borderRadius: "6px 6px 0 0",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative"
      },
      body: {
        padding: "10px"
      },
      label: {
        fontSize: "18px",
        color: getContrastingColor(hex),
        position: "relative"
      },
      triangle: {
        width: "0px",
        height: "0px",
        borderStyle: "solid",
        borderWidth: "0 10px 10px 10px",
        borderColor: "transparent transparent " + hex + " transparent",
        position: "absolute",
        top: "-10px",
        left: "50%",
        marginLeft: "-10px"
      },
      input: {
        width: "100%",
        fontSize: "12px",
        color: "#666",
        border: "0px",
        outline: "none",
        height: "22px",
        boxShadow: "inset 0 0 0 1px #ddd",
        borderRadius: "4px",
        padding: "0 7px",
        boxSizing: "border-box"
      }
    },
    "hide-triangle": {
      triangle: {
        display: "none"
      }
    }
  }, passedStyles), { "hide-triangle": triangle === "hide" });
  return React__default.createElement("div", { style: styles7.card, className: "block-picker " + className }, React__default.createElement("div", { style: styles7.triangle }), React__default.createElement("div", { style: styles7.head }, transparent && React__default.createElement(Checkboard, { borderRadius: "6px 6px 0 0" }), React__default.createElement("div", { style: styles7.label }, hex)), React__default.createElement("div", { style: styles7.body }, React__default.createElement(BlockSwatches, { colors, onClick: handleChange, onSwatchHover }), React__default.createElement(EditableInput, {
    style: { input: styles7.input },
    value: hex,
    onChange: handleChange
  })));
};
Block.propTypes = {
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  colors: PropTypes.arrayOf(PropTypes.string),
  triangle: PropTypes.oneOf(["top", "hide"]),
  styles: PropTypes.object
};
Block.defaultProps = {
  width: 170,
  colors: ["#D9E3F0", "#F47373", "#697689", "#37D67A", "#2CCCE4", "#555555", "#dce775", "#ff8a65", "#ba68c8"],
  triangle: "top",
  styles: {}
};
ColorWrap(Block);
var red = { "50": "#ffebee", "100": "#ffcdd2", "200": "#ef9a9a", "300": "#e57373", "400": "#ef5350", "500": "#f44336", "600": "#e53935", "700": "#d32f2f", "800": "#c62828", "900": "#b71c1c", "a100": "#ff8a80", "a200": "#ff5252", "a400": "#ff1744", "a700": "#d50000" };
var pink = { "50": "#fce4ec", "100": "#f8bbd0", "200": "#f48fb1", "300": "#f06292", "400": "#ec407a", "500": "#e91e63", "600": "#d81b60", "700": "#c2185b", "800": "#ad1457", "900": "#880e4f", "a100": "#ff80ab", "a200": "#ff4081", "a400": "#f50057", "a700": "#c51162" };
var purple = { "50": "#f3e5f5", "100": "#e1bee7", "200": "#ce93d8", "300": "#ba68c8", "400": "#ab47bc", "500": "#9c27b0", "600": "#8e24aa", "700": "#7b1fa2", "800": "#6a1b9a", "900": "#4a148c", "a100": "#ea80fc", "a200": "#e040fb", "a400": "#d500f9", "a700": "#aa00ff" };
var deepPurple = { "50": "#ede7f6", "100": "#d1c4e9", "200": "#b39ddb", "300": "#9575cd", "400": "#7e57c2", "500": "#673ab7", "600": "#5e35b1", "700": "#512da8", "800": "#4527a0", "900": "#311b92", "a100": "#b388ff", "a200": "#7c4dff", "a400": "#651fff", "a700": "#6200ea" };
var indigo = { "50": "#e8eaf6", "100": "#c5cae9", "200": "#9fa8da", "300": "#7986cb", "400": "#5c6bc0", "500": "#3f51b5", "600": "#3949ab", "700": "#303f9f", "800": "#283593", "900": "#1a237e", "a100": "#8c9eff", "a200": "#536dfe", "a400": "#3d5afe", "a700": "#304ffe" };
var blue = { "50": "#e3f2fd", "100": "#bbdefb", "200": "#90caf9", "300": "#64b5f6", "400": "#42a5f5", "500": "#2196f3", "600": "#1e88e5", "700": "#1976d2", "800": "#1565c0", "900": "#0d47a1", "a100": "#82b1ff", "a200": "#448aff", "a400": "#2979ff", "a700": "#2962ff" };
var lightBlue = { "50": "#e1f5fe", "100": "#b3e5fc", "200": "#81d4fa", "300": "#4fc3f7", "400": "#29b6f6", "500": "#03a9f4", "600": "#039be5", "700": "#0288d1", "800": "#0277bd", "900": "#01579b", "a100": "#80d8ff", "a200": "#40c4ff", "a400": "#00b0ff", "a700": "#0091ea" };
var cyan = { "50": "#e0f7fa", "100": "#b2ebf2", "200": "#80deea", "300": "#4dd0e1", "400": "#26c6da", "500": "#00bcd4", "600": "#00acc1", "700": "#0097a7", "800": "#00838f", "900": "#006064", "a100": "#84ffff", "a200": "#18ffff", "a400": "#00e5ff", "a700": "#00b8d4" };
var teal = { "50": "#e0f2f1", "100": "#b2dfdb", "200": "#80cbc4", "300": "#4db6ac", "400": "#26a69a", "500": "#009688", "600": "#00897b", "700": "#00796b", "800": "#00695c", "900": "#004d40", "a100": "#a7ffeb", "a200": "#64ffda", "a400": "#1de9b6", "a700": "#00bfa5" };
var green = { "50": "#e8f5e9", "100": "#c8e6c9", "200": "#a5d6a7", "300": "#81c784", "400": "#66bb6a", "500": "#4caf50", "600": "#43a047", "700": "#388e3c", "800": "#2e7d32", "900": "#1b5e20", "a100": "#b9f6ca", "a200": "#69f0ae", "a400": "#00e676", "a700": "#00c853" };
var lightGreen = { "50": "#f1f8e9", "100": "#dcedc8", "200": "#c5e1a5", "300": "#aed581", "400": "#9ccc65", "500": "#8bc34a", "600": "#7cb342", "700": "#689f38", "800": "#558b2f", "900": "#33691e", "a100": "#ccff90", "a200": "#b2ff59", "a400": "#76ff03", "a700": "#64dd17" };
var lime = { "50": "#f9fbe7", "100": "#f0f4c3", "200": "#e6ee9c", "300": "#dce775", "400": "#d4e157", "500": "#cddc39", "600": "#c0ca33", "700": "#afb42b", "800": "#9e9d24", "900": "#827717", "a100": "#f4ff81", "a200": "#eeff41", "a400": "#c6ff00", "a700": "#aeea00" };
var yellow = { "50": "#fffde7", "100": "#fff9c4", "200": "#fff59d", "300": "#fff176", "400": "#ffee58", "500": "#ffeb3b", "600": "#fdd835", "700": "#fbc02d", "800": "#f9a825", "900": "#f57f17", "a100": "#ffff8d", "a200": "#ffff00", "a400": "#ffea00", "a700": "#ffd600" };
var amber = { "50": "#fff8e1", "100": "#ffecb3", "200": "#ffe082", "300": "#ffd54f", "400": "#ffca28", "500": "#ffc107", "600": "#ffb300", "700": "#ffa000", "800": "#ff8f00", "900": "#ff6f00", "a100": "#ffe57f", "a200": "#ffd740", "a400": "#ffc400", "a700": "#ffab00" };
var orange = { "50": "#fff3e0", "100": "#ffe0b2", "200": "#ffcc80", "300": "#ffb74d", "400": "#ffa726", "500": "#ff9800", "600": "#fb8c00", "700": "#f57c00", "800": "#ef6c00", "900": "#e65100", "a100": "#ffd180", "a200": "#ffab40", "a400": "#ff9100", "a700": "#ff6d00" };
var deepOrange = { "50": "#fbe9e7", "100": "#ffccbc", "200": "#ffab91", "300": "#ff8a65", "400": "#ff7043", "500": "#ff5722", "600": "#f4511e", "700": "#e64a19", "800": "#d84315", "900": "#bf360c", "a100": "#ff9e80", "a200": "#ff6e40", "a400": "#ff3d00", "a700": "#dd2c00" };
var brown = { "50": "#efebe9", "100": "#d7ccc8", "200": "#bcaaa4", "300": "#a1887f", "400": "#8d6e63", "500": "#795548", "600": "#6d4c41", "700": "#5d4037", "800": "#4e342e", "900": "#3e2723" };
var blueGrey = { "50": "#eceff1", "100": "#cfd8dc", "200": "#b0bec5", "300": "#90a4ae", "400": "#78909c", "500": "#607d8b", "600": "#546e7a", "700": "#455a64", "800": "#37474f", "900": "#263238" };
var CircleSwatch = function CircleSwatch2(_ref) {
  var color = _ref.color, onClick = _ref.onClick, onSwatchHover = _ref.onSwatchHover, hover3 = _ref.hover, active3 = _ref.active, circleSize = _ref.circleSize, circleSpacing = _ref.circleSpacing;
  var styles7 = _default$2({
    "default": {
      swatch: {
        width: circleSize,
        height: circleSize,
        marginRight: circleSpacing,
        marginBottom: circleSpacing,
        transform: "scale(1)",
        transition: "100ms transform ease"
      },
      Swatch: {
        borderRadius: "50%",
        background: "transparent",
        boxShadow: "inset 0 0 0 " + (circleSize / 2 + 1) + "px " + color,
        transition: "100ms box-shadow ease"
      }
    },
    "hover": {
      swatch: {
        transform: "scale(1.2)"
      }
    },
    "active": {
      Swatch: {
        boxShadow: "inset 0 0 0 3px " + color
      }
    }
  }, { hover: hover3, active: active3 });
  return React__default.createElement("div", { style: styles7.swatch }, React__default.createElement(Swatch$1, {
    style: styles7.Swatch,
    color,
    onClick,
    onHover: onSwatchHover,
    focusStyle: { boxShadow: styles7.Swatch.boxShadow + ", 0 0 5px " + color }
  }));
};
CircleSwatch.defaultProps = {
  circleSize: 28,
  circleSpacing: 14
};
var CircleSwatch$1 = handleHover(CircleSwatch);
var Circle = function Circle2(_ref) {
  var width = _ref.width, onChange = _ref.onChange, onSwatchHover = _ref.onSwatchHover, colors = _ref.colors, hex = _ref.hex, circleSize = _ref.circleSize, _ref$styles = _ref.styles, passedStyles = _ref$styles === void 0 ? {} : _ref$styles, circleSpacing = _ref.circleSpacing, _ref$className = _ref.className, className = _ref$className === void 0 ? "" : _ref$className;
  var styles7 = _default$2(merge$1({
    "default": {
      card: {
        width,
        display: "flex",
        flexWrap: "wrap",
        marginRight: -circleSpacing,
        marginBottom: -circleSpacing
      }
    }
  }, passedStyles));
  var handleChange = function handleChange2(hexCode, e2) {
    return onChange({ hex: hexCode, source: "hex" }, e2);
  };
  return React__default.createElement("div", { style: styles7.card, className: "circle-picker " + className }, map(colors, function(c2) {
    return React__default.createElement(CircleSwatch$1, {
      key: c2,
      color: c2,
      onClick: handleChange,
      onSwatchHover,
      active: hex === c2.toLowerCase(),
      circleSize,
      circleSpacing
    });
  }));
};
Circle.propTypes = {
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  circleSize: PropTypes.number,
  circleSpacing: PropTypes.number,
  styles: PropTypes.object
};
Circle.defaultProps = {
  width: 252,
  circleSize: 28,
  circleSpacing: 14,
  colors: [red["500"], pink["500"], purple["500"], deepPurple["500"], indigo["500"], blue["500"], lightBlue["500"], cyan["500"], teal["500"], green["500"], lightGreen["500"], lime["500"], yellow["500"], amber["500"], orange["500"], deepOrange["500"], brown["500"], blueGrey["500"]],
  styles: {}
};
ColorWrap(Circle);
function isUndefined(value) {
  return value === void 0;
}
var UnfoldMoreHorizontalIcon = {};
Object.defineProperty(UnfoldMoreHorizontalIcon, "__esModule", {
  value: true
});
var _extends$4 = Object.assign || function(target) {
  for (var i2 = 1; i2 < arguments.length; i2++) {
    var source = arguments[i2];
    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }
  return target;
};
var _react$1 = React__default;
var _react2$1 = _interopRequireDefault$1(_react$1);
function _interopRequireDefault$1(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}
function _objectWithoutProperties$1(obj, keys2) {
  var target = {};
  for (var i2 in obj) {
    if (keys2.indexOf(i2) >= 0)
      continue;
    if (!Object.prototype.hasOwnProperty.call(obj, i2))
      continue;
    target[i2] = obj[i2];
  }
  return target;
}
var DEFAULT_SIZE$1 = 24;
var _default$1 = UnfoldMoreHorizontalIcon.default = function(_ref) {
  var _ref$fill = _ref.fill, fill = _ref$fill === void 0 ? "currentColor" : _ref$fill, _ref$width = _ref.width, width = _ref$width === void 0 ? DEFAULT_SIZE$1 : _ref$width, _ref$height = _ref.height, height = _ref$height === void 0 ? DEFAULT_SIZE$1 : _ref$height, _ref$style = _ref.style, style2 = _ref$style === void 0 ? {} : _ref$style, props = _objectWithoutProperties$1(_ref, ["fill", "width", "height", "style"]);
  return _react2$1.default.createElement("svg", _extends$4({
    viewBox: "0 0 " + DEFAULT_SIZE$1 + " " + DEFAULT_SIZE$1,
    style: _extends$4({ fill, width, height }, style2)
  }, props), _react2$1.default.createElement("path", { d: "M12,18.17L8.83,15L7.42,16.41L12,21L16.59,16.41L15.17,15M12,5.83L15.17,9L16.58,7.59L12,3L7.41,7.59L8.83,9L12,5.83Z" }));
};
var _createClass$1 = function() {
  function defineProperties(target, props) {
    for (var i2 = 0; i2 < props.length; i2++) {
      var descriptor = props[i2];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor)
        descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }
  return function(Constructor, protoProps, staticProps) {
    if (protoProps)
      defineProperties(Constructor.prototype, protoProps);
    if (staticProps)
      defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();
function _classCallCheck$1(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _possibleConstructorReturn$1(self2, call) {
  if (!self2) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return call && (typeof call === "object" || typeof call === "function") ? call : self2;
}
function _inherits$1(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });
  if (superClass)
    Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}
var ChromeFields = function(_React$Component) {
  _inherits$1(ChromeFields2, _React$Component);
  function ChromeFields2(props) {
    _classCallCheck$1(this, ChromeFields2);
    var _this = _possibleConstructorReturn$1(this, (ChromeFields2.__proto__ || Object.getPrototypeOf(ChromeFields2)).call(this));
    _this.toggleViews = function() {
      if (_this.state.view === "hex") {
        _this.setState({ view: "rgb" });
      } else if (_this.state.view === "rgb") {
        _this.setState({ view: "hsl" });
      } else if (_this.state.view === "hsl") {
        if (_this.props.hsl.a === 1) {
          _this.setState({ view: "hex" });
        } else {
          _this.setState({ view: "rgb" });
        }
      }
    };
    _this.handleChange = function(data, e2) {
      if (data.hex) {
        isValidHex(data.hex) && _this.props.onChange({
          hex: data.hex,
          source: "hex"
        }, e2);
      } else if (data.r || data.g || data.b) {
        _this.props.onChange({
          r: data.r || _this.props.rgb.r,
          g: data.g || _this.props.rgb.g,
          b: data.b || _this.props.rgb.b,
          source: "rgb"
        }, e2);
      } else if (data.a) {
        if (data.a < 0) {
          data.a = 0;
        } else if (data.a > 1) {
          data.a = 1;
        }
        _this.props.onChange({
          h: _this.props.hsl.h,
          s: _this.props.hsl.s,
          l: _this.props.hsl.l,
          a: Math.round(data.a * 100) / 100,
          source: "rgb"
        }, e2);
      } else if (data.h || data.s || data.l) {
        if (typeof data.s === "string" && data.s.includes("%")) {
          data.s = data.s.replace("%", "");
        }
        if (typeof data.l === "string" && data.l.includes("%")) {
          data.l = data.l.replace("%", "");
        }
        if (data.s == 1) {
          data.s = 0.01;
        } else if (data.l == 1) {
          data.l = 0.01;
        }
        _this.props.onChange({
          h: data.h || _this.props.hsl.h,
          s: Number(!isUndefined(data.s) ? data.s : _this.props.hsl.s),
          l: Number(!isUndefined(data.l) ? data.l : _this.props.hsl.l),
          source: "hsl"
        }, e2);
      }
    };
    _this.showHighlight = function(e2) {
      e2.currentTarget.style.background = "#eee";
    };
    _this.hideHighlight = function(e2) {
      e2.currentTarget.style.background = "transparent";
    };
    if (props.hsl.a !== 1 && props.view === "hex") {
      _this.state = {
        view: "rgb"
      };
    } else {
      _this.state = {
        view: props.view
      };
    }
    return _this;
  }
  _createClass$1(ChromeFields2, [{
    key: "render",
    value: function render3() {
      var _this2 = this;
      var styles7 = _default$2({
        "default": {
          wrap: {
            paddingTop: "16px",
            display: "flex"
          },
          fields: {
            flex: "1",
            display: "flex",
            marginLeft: "-6px"
          },
          field: {
            paddingLeft: "6px",
            width: "100%"
          },
          alpha: {
            paddingLeft: "6px",
            width: "100%"
          },
          toggle: {
            width: "32px",
            textAlign: "right",
            position: "relative"
          },
          icon: {
            marginRight: "-4px",
            marginTop: "12px",
            cursor: "pointer",
            position: "relative"
          },
          iconHighlight: {
            position: "absolute",
            width: "24px",
            height: "28px",
            background: "#eee",
            borderRadius: "4px",
            top: "10px",
            left: "12px",
            display: "none"
          },
          input: {
            fontSize: "11px",
            color: "#333",
            width: "100%",
            borderRadius: "2px",
            border: "none",
            boxShadow: "inset 0 0 0 1px #dadada",
            height: "21px",
            textAlign: "center"
          },
          label: {
            textTransform: "uppercase",
            fontSize: "11px",
            lineHeight: "11px",
            color: "#969696",
            textAlign: "center",
            display: "block",
            marginTop: "12px"
          },
          svg: {
            fill: "#333",
            width: "24px",
            height: "24px",
            border: "1px transparent solid",
            borderRadius: "5px"
          }
        },
        "disableAlpha": {
          alpha: {
            display: "none"
          }
        }
      }, this.props, this.state);
      var fields = void 0;
      if (this.state.view === "hex") {
        fields = React__default.createElement("div", { style: styles7.fields, className: "flexbox-fix" }, React__default.createElement("div", { style: styles7.field }, React__default.createElement(EditableInput, {
          style: { input: styles7.input, label: styles7.label },
          label: "hex",
          value: this.props.hex,
          onChange: this.handleChange
        })));
      } else if (this.state.view === "rgb") {
        fields = React__default.createElement("div", { style: styles7.fields, className: "flexbox-fix" }, React__default.createElement("div", { style: styles7.field }, React__default.createElement(EditableInput, {
          style: { input: styles7.input, label: styles7.label },
          label: "r",
          value: this.props.rgb.r,
          onChange: this.handleChange
        })), React__default.createElement("div", { style: styles7.field }, React__default.createElement(EditableInput, {
          style: { input: styles7.input, label: styles7.label },
          label: "g",
          value: this.props.rgb.g,
          onChange: this.handleChange
        })), React__default.createElement("div", { style: styles7.field }, React__default.createElement(EditableInput, {
          style: { input: styles7.input, label: styles7.label },
          label: "b",
          value: this.props.rgb.b,
          onChange: this.handleChange
        })), React__default.createElement("div", { style: styles7.alpha }, React__default.createElement(EditableInput, {
          style: { input: styles7.input, label: styles7.label },
          label: "a",
          value: this.props.rgb.a,
          arrowOffset: 0.01,
          onChange: this.handleChange
        })));
      } else if (this.state.view === "hsl") {
        fields = React__default.createElement("div", { style: styles7.fields, className: "flexbox-fix" }, React__default.createElement("div", { style: styles7.field }, React__default.createElement(EditableInput, {
          style: { input: styles7.input, label: styles7.label },
          label: "h",
          value: Math.round(this.props.hsl.h),
          onChange: this.handleChange
        })), React__default.createElement("div", { style: styles7.field }, React__default.createElement(EditableInput, {
          style: { input: styles7.input, label: styles7.label },
          label: "s",
          value: Math.round(this.props.hsl.s * 100) + "%",
          onChange: this.handleChange
        })), React__default.createElement("div", { style: styles7.field }, React__default.createElement(EditableInput, {
          style: { input: styles7.input, label: styles7.label },
          label: "l",
          value: Math.round(this.props.hsl.l * 100) + "%",
          onChange: this.handleChange
        })), React__default.createElement("div", { style: styles7.alpha }, React__default.createElement(EditableInput, {
          style: { input: styles7.input, label: styles7.label },
          label: "a",
          value: this.props.hsl.a,
          arrowOffset: 0.01,
          onChange: this.handleChange
        })));
      }
      return React__default.createElement("div", { style: styles7.wrap, className: "flexbox-fix" }, fields, React__default.createElement("div", { style: styles7.toggle }, React__default.createElement("div", { style: styles7.icon, onClick: this.toggleViews, ref: function ref(icon) {
        return _this2.icon = icon;
      } }, React__default.createElement(_default$1, {
        style: styles7.svg,
        onMouseOver: this.showHighlight,
        onMouseEnter: this.showHighlight,
        onMouseOut: this.hideHighlight
      }))));
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(nextProps, state) {
      if (nextProps.hsl.a !== 1 && state.view === "hex") {
        return { view: "rgb" };
      }
      return null;
    }
  }]);
  return ChromeFields2;
}(React__default.Component);
ChromeFields.defaultProps = {
  view: "hex"
};
var ChromePointer = function ChromePointer2() {
  var styles7 = _default$2({
    "default": {
      picker: {
        width: "12px",
        height: "12px",
        borderRadius: "6px",
        transform: "translate(-6px, -1px)",
        backgroundColor: "rgb(248, 248, 248)",
        boxShadow: "0 1px 4px 0 rgba(0, 0, 0, 0.37)"
      }
    }
  });
  return React__default.createElement("div", { style: styles7.picker });
};
var ChromePointerCircle = function ChromePointerCircle2() {
  var styles7 = _default$2({
    "default": {
      picker: {
        width: "12px",
        height: "12px",
        borderRadius: "6px",
        boxShadow: "inset 0 0 0 1px #fff",
        transform: "translate(-6px, -6px)"
      }
    }
  });
  return React__default.createElement("div", { style: styles7.picker });
};
var Chrome = function Chrome2(_ref) {
  var width = _ref.width, onChange = _ref.onChange, disableAlpha = _ref.disableAlpha, rgb = _ref.rgb, hsl = _ref.hsl, hsv = _ref.hsv, hex = _ref.hex, renderers = _ref.renderers, _ref$styles = _ref.styles, passedStyles = _ref$styles === void 0 ? {} : _ref$styles, _ref$className = _ref.className, className = _ref$className === void 0 ? "" : _ref$className, defaultView = _ref.defaultView;
  var styles7 = _default$2(merge$1({
    "default": {
      picker: {
        width,
        background: "#fff",
        borderRadius: "2px",
        boxShadow: "0 0 2px rgba(0,0,0,.3), 0 4px 8px rgba(0,0,0,.3)",
        boxSizing: "initial",
        fontFamily: "Menlo"
      },
      saturation: {
        width: "100%",
        paddingBottom: "55%",
        position: "relative",
        borderRadius: "2px 2px 0 0",
        overflow: "hidden"
      },
      Saturation: {
        radius: "2px 2px 0 0"
      },
      body: {
        padding: "16px 16px 12px"
      },
      controls: {
        display: "flex"
      },
      color: {
        width: "32px"
      },
      swatch: {
        marginTop: "6px",
        width: "16px",
        height: "16px",
        borderRadius: "8px",
        position: "relative",
        overflow: "hidden"
      },
      active: {
        absolute: "0px 0px 0px 0px",
        borderRadius: "8px",
        boxShadow: "inset 0 0 0 1px rgba(0,0,0,.1)",
        background: "rgba(" + rgb.r + ", " + rgb.g + ", " + rgb.b + ", " + rgb.a + ")",
        zIndex: "2"
      },
      toggles: {
        flex: "1"
      },
      hue: {
        height: "10px",
        position: "relative",
        marginBottom: "8px"
      },
      Hue: {
        radius: "2px"
      },
      alpha: {
        height: "10px",
        position: "relative"
      },
      Alpha: {
        radius: "2px"
      }
    },
    "disableAlpha": {
      color: {
        width: "22px"
      },
      alpha: {
        display: "none"
      },
      hue: {
        marginBottom: "0px"
      },
      swatch: {
        width: "10px",
        height: "10px",
        marginTop: "0px"
      }
    }
  }, passedStyles), { disableAlpha });
  return React__default.createElement("div", { style: styles7.picker, className: "chrome-picker " + className }, React__default.createElement("div", { style: styles7.saturation }, React__default.createElement(Saturation, {
    style: styles7.Saturation,
    hsl,
    hsv,
    pointer: ChromePointerCircle,
    onChange
  })), React__default.createElement("div", { style: styles7.body }, React__default.createElement("div", { style: styles7.controls, className: "flexbox-fix" }, React__default.createElement("div", { style: styles7.color }, React__default.createElement("div", { style: styles7.swatch }, React__default.createElement("div", { style: styles7.active }), React__default.createElement(Checkboard, { renderers }))), React__default.createElement("div", { style: styles7.toggles }, React__default.createElement("div", { style: styles7.hue }, React__default.createElement(Hue, {
    style: styles7.Hue,
    hsl,
    pointer: ChromePointer,
    onChange
  })), React__default.createElement("div", { style: styles7.alpha }, React__default.createElement(Alpha, {
    style: styles7.Alpha,
    rgb,
    hsl,
    pointer: ChromePointer,
    renderers,
    onChange
  })))), React__default.createElement(ChromeFields, {
    rgb,
    hsl,
    hex,
    view: defaultView,
    onChange,
    disableAlpha
  })));
};
Chrome.propTypes = {
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  disableAlpha: PropTypes.bool,
  styles: PropTypes.object,
  defaultView: PropTypes.oneOf(["hex", "rgb", "hsl"])
};
Chrome.defaultProps = {
  width: 225,
  disableAlpha: false,
  styles: {}
};
var ChromePicker = ColorWrap(Chrome);
var CompactColor = function CompactColor2(_ref) {
  var color = _ref.color, _ref$onClick = _ref.onClick, onClick = _ref$onClick === void 0 ? function() {
  } : _ref$onClick, onSwatchHover = _ref.onSwatchHover, active3 = _ref.active;
  var styles7 = _default$2({
    "default": {
      color: {
        background: color,
        width: "15px",
        height: "15px",
        float: "left",
        marginRight: "5px",
        marginBottom: "5px",
        position: "relative",
        cursor: "pointer"
      },
      dot: {
        absolute: "5px 5px 5px 5px",
        background: getContrastingColor(color),
        borderRadius: "50%",
        opacity: "0"
      }
    },
    "active": {
      dot: {
        opacity: "1"
      }
    },
    "color-#FFFFFF": {
      color: {
        boxShadow: "inset 0 0 0 1px #ddd"
      },
      dot: {
        background: "#000"
      }
    },
    "transparent": {
      dot: {
        background: "#000"
      }
    }
  }, { active: active3, "color-#FFFFFF": color === "#FFFFFF", "transparent": color === "transparent" });
  return React__default.createElement(Swatch$1, {
    style: styles7.color,
    color,
    onClick,
    onHover: onSwatchHover,
    focusStyle: { boxShadow: "0 0 4px " + color }
  }, React__default.createElement("div", { style: styles7.dot }));
};
var CompactFields = function CompactFields2(_ref) {
  var hex = _ref.hex, rgb = _ref.rgb, onChange = _ref.onChange;
  var styles7 = _default$2({
    "default": {
      fields: {
        display: "flex",
        paddingBottom: "6px",
        paddingRight: "5px",
        position: "relative"
      },
      active: {
        position: "absolute",
        top: "6px",
        left: "5px",
        height: "9px",
        width: "9px",
        background: hex
      },
      HEXwrap: {
        flex: "6",
        position: "relative"
      },
      HEXinput: {
        width: "80%",
        padding: "0px",
        paddingLeft: "20%",
        border: "none",
        outline: "none",
        background: "none",
        fontSize: "12px",
        color: "#333",
        height: "16px"
      },
      HEXlabel: {
        display: "none"
      },
      RGBwrap: {
        flex: "3",
        position: "relative"
      },
      RGBinput: {
        width: "70%",
        padding: "0px",
        paddingLeft: "30%",
        border: "none",
        outline: "none",
        background: "none",
        fontSize: "12px",
        color: "#333",
        height: "16px"
      },
      RGBlabel: {
        position: "absolute",
        top: "3px",
        left: "0px",
        lineHeight: "16px",
        textTransform: "uppercase",
        fontSize: "12px",
        color: "#999"
      }
    }
  });
  var handleChange = function handleChange2(data, e2) {
    if (data.r || data.g || data.b) {
      onChange({
        r: data.r || rgb.r,
        g: data.g || rgb.g,
        b: data.b || rgb.b,
        source: "rgb"
      }, e2);
    } else {
      onChange({
        hex: data.hex,
        source: "hex"
      }, e2);
    }
  };
  return React__default.createElement("div", { style: styles7.fields, className: "flexbox-fix" }, React__default.createElement("div", { style: styles7.active }), React__default.createElement(EditableInput, {
    style: { wrap: styles7.HEXwrap, input: styles7.HEXinput, label: styles7.HEXlabel },
    label: "hex",
    value: hex,
    onChange: handleChange
  }), React__default.createElement(EditableInput, {
    style: { wrap: styles7.RGBwrap, input: styles7.RGBinput, label: styles7.RGBlabel },
    label: "r",
    value: rgb.r,
    onChange: handleChange
  }), React__default.createElement(EditableInput, {
    style: { wrap: styles7.RGBwrap, input: styles7.RGBinput, label: styles7.RGBlabel },
    label: "g",
    value: rgb.g,
    onChange: handleChange
  }), React__default.createElement(EditableInput, {
    style: { wrap: styles7.RGBwrap, input: styles7.RGBinput, label: styles7.RGBlabel },
    label: "b",
    value: rgb.b,
    onChange: handleChange
  }));
};
var Compact = function Compact2(_ref) {
  var onChange = _ref.onChange, onSwatchHover = _ref.onSwatchHover, colors = _ref.colors, hex = _ref.hex, rgb = _ref.rgb, _ref$styles = _ref.styles, passedStyles = _ref$styles === void 0 ? {} : _ref$styles, _ref$className = _ref.className, className = _ref$className === void 0 ? "" : _ref$className;
  var styles7 = _default$2(merge$1({
    "default": {
      Compact: {
        background: "#f6f6f6",
        radius: "4px"
      },
      compact: {
        paddingTop: "5px",
        paddingLeft: "5px",
        boxSizing: "initial",
        width: "240px"
      },
      clear: {
        clear: "both"
      }
    }
  }, passedStyles));
  var handleChange = function handleChange2(data, e2) {
    if (data.hex) {
      isValidHex(data.hex) && onChange({
        hex: data.hex,
        source: "hex"
      }, e2);
    } else {
      onChange(data, e2);
    }
  };
  return React__default.createElement(Raised, { style: styles7.Compact, styles: passedStyles }, React__default.createElement("div", { style: styles7.compact, className: "compact-picker " + className }, React__default.createElement("div", null, map(colors, function(c2) {
    return React__default.createElement(CompactColor, {
      key: c2,
      color: c2,
      active: c2.toLowerCase() === hex,
      onClick: handleChange,
      onSwatchHover
    });
  }), React__default.createElement("div", { style: styles7.clear })), React__default.createElement(CompactFields, { hex, rgb, onChange: handleChange })));
};
Compact.propTypes = {
  colors: PropTypes.arrayOf(PropTypes.string),
  styles: PropTypes.object
};
Compact.defaultProps = {
  colors: ["#4D4D4D", "#999999", "#FFFFFF", "#F44E3B", "#FE9200", "#FCDC00", "#DBDF00", "#A4DD00", "#68CCCA", "#73D8FF", "#AEA1FF", "#FDA1FF", "#333333", "#808080", "#cccccc", "#D33115", "#E27300", "#FCC400", "#B0BC00", "#68BC00", "#16A5A5", "#009CE0", "#7B64FF", "#FA28FF", "#000000", "#666666", "#B3B3B3", "#9F0500", "#C45100", "#FB9E00", "#808900", "#194D33", "#0C797D", "#0062B1", "#653294", "#AB149E"],
  styles: {}
};
ColorWrap(Compact);
var GithubSwatch = function GithubSwatch2(_ref) {
  var hover3 = _ref.hover, color = _ref.color, onClick = _ref.onClick, onSwatchHover = _ref.onSwatchHover;
  var hoverSwatch = {
    position: "relative",
    zIndex: "2",
    outline: "2px solid #fff",
    boxShadow: "0 0 5px 2px rgba(0,0,0,0.25)"
  };
  var styles7 = _default$2({
    "default": {
      swatch: {
        width: "25px",
        height: "25px",
        fontSize: "0"
      }
    },
    "hover": {
      swatch: hoverSwatch
    }
  }, { hover: hover3 });
  return React__default.createElement("div", { style: styles7.swatch }, React__default.createElement(Swatch$1, {
    color,
    onClick,
    onHover: onSwatchHover,
    focusStyle: hoverSwatch
  }));
};
var GithubSwatch$1 = handleHover(GithubSwatch);
var Github = function Github2(_ref) {
  var width = _ref.width, colors = _ref.colors, onChange = _ref.onChange, onSwatchHover = _ref.onSwatchHover, triangle = _ref.triangle, _ref$styles = _ref.styles, passedStyles = _ref$styles === void 0 ? {} : _ref$styles, _ref$className = _ref.className, className = _ref$className === void 0 ? "" : _ref$className;
  var styles7 = _default$2(merge$1({
    "default": {
      card: {
        width,
        background: "#fff",
        border: "1px solid rgba(0,0,0,0.2)",
        boxShadow: "0 3px 12px rgba(0,0,0,0.15)",
        borderRadius: "4px",
        position: "relative",
        padding: "5px",
        display: "flex",
        flexWrap: "wrap"
      },
      triangle: {
        position: "absolute",
        border: "7px solid transparent",
        borderBottomColor: "#fff"
      },
      triangleShadow: {
        position: "absolute",
        border: "8px solid transparent",
        borderBottomColor: "rgba(0,0,0,0.15)"
      }
    },
    "hide-triangle": {
      triangle: {
        display: "none"
      },
      triangleShadow: {
        display: "none"
      }
    },
    "top-left-triangle": {
      triangle: {
        top: "-14px",
        left: "10px"
      },
      triangleShadow: {
        top: "-16px",
        left: "9px"
      }
    },
    "top-right-triangle": {
      triangle: {
        top: "-14px",
        right: "10px"
      },
      triangleShadow: {
        top: "-16px",
        right: "9px"
      }
    },
    "bottom-left-triangle": {
      triangle: {
        top: "35px",
        left: "10px",
        transform: "rotate(180deg)"
      },
      triangleShadow: {
        top: "37px",
        left: "9px",
        transform: "rotate(180deg)"
      }
    },
    "bottom-right-triangle": {
      triangle: {
        top: "35px",
        right: "10px",
        transform: "rotate(180deg)"
      },
      triangleShadow: {
        top: "37px",
        right: "9px",
        transform: "rotate(180deg)"
      }
    }
  }, passedStyles), {
    "hide-triangle": triangle === "hide",
    "top-left-triangle": triangle === "top-left",
    "top-right-triangle": triangle === "top-right",
    "bottom-left-triangle": triangle === "bottom-left",
    "bottom-right-triangle": triangle === "bottom-right"
  });
  var handleChange = function handleChange2(hex, e2) {
    return onChange({ hex, source: "hex" }, e2);
  };
  return React__default.createElement("div", { style: styles7.card, className: "github-picker " + className }, React__default.createElement("div", { style: styles7.triangleShadow }), React__default.createElement("div", { style: styles7.triangle }), map(colors, function(c2) {
    return React__default.createElement(GithubSwatch$1, {
      color: c2,
      key: c2,
      onClick: handleChange,
      onSwatchHover
    });
  }));
};
Github.propTypes = {
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  colors: PropTypes.arrayOf(PropTypes.string),
  triangle: PropTypes.oneOf(["hide", "top-left", "top-right", "bottom-left", "bottom-right"]),
  styles: PropTypes.object
};
Github.defaultProps = {
  width: 200,
  colors: ["#B80000", "#DB3E00", "#FCCB00", "#008B02", "#006B76", "#1273DE", "#004DCF", "#5300EB", "#EB9694", "#FAD0C3", "#FEF3BD", "#C1E1C5", "#BEDADC", "#C4DEF6", "#BED3F3", "#D4C4FB"],
  triangle: "top-left",
  styles: {}
};
ColorWrap(Github);
var SliderPointer$1 = function SliderPointer(_ref) {
  var direction = _ref.direction;
  var styles7 = _default$2({
    "default": {
      picker: {
        width: "18px",
        height: "18px",
        borderRadius: "50%",
        transform: "translate(-9px, -1px)",
        backgroundColor: "rgb(248, 248, 248)",
        boxShadow: "0 1px 4px 0 rgba(0, 0, 0, 0.37)"
      }
    },
    "vertical": {
      picker: {
        transform: "translate(-3px, -9px)"
      }
    }
  }, { vertical: direction === "vertical" });
  return React__default.createElement("div", { style: styles7.picker });
};
var _extends$3 = Object.assign || function(target) {
  for (var i2 = 1; i2 < arguments.length; i2++) {
    var source = arguments[i2];
    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }
  return target;
};
var HuePicker = function HuePicker2(_ref) {
  var width = _ref.width, height = _ref.height, onChange = _ref.onChange, hsl = _ref.hsl, direction = _ref.direction, pointer = _ref.pointer, _ref$styles = _ref.styles, passedStyles = _ref$styles === void 0 ? {} : _ref$styles, _ref$className = _ref.className, className = _ref$className === void 0 ? "" : _ref$className;
  var styles7 = _default$2(merge$1({
    "default": {
      picker: {
        position: "relative",
        width,
        height
      },
      hue: {
        radius: "2px"
      }
    }
  }, passedStyles));
  var handleChange = function handleChange2(data) {
    return onChange({ a: 1, h: data.h, l: 0.5, s: 1 });
  };
  return React__default.createElement("div", { style: styles7.picker, className: "hue-picker " + className }, React__default.createElement(Hue, _extends$3({}, styles7.hue, {
    hsl,
    pointer,
    onChange: handleChange,
    direction
  })));
};
HuePicker.propTypes = {
  styles: PropTypes.object
};
HuePicker.defaultProps = {
  width: "316px",
  height: "16px",
  direction: "horizontal",
  pointer: SliderPointer$1,
  styles: {}
};
ColorWrap(HuePicker);
var Material = function Material2(_ref) {
  var onChange = _ref.onChange, hex = _ref.hex, rgb = _ref.rgb, _ref$styles = _ref.styles, passedStyles = _ref$styles === void 0 ? {} : _ref$styles, _ref$className = _ref.className, className = _ref$className === void 0 ? "" : _ref$className;
  var styles7 = _default$2(merge$1({
    "default": {
      material: {
        width: "98px",
        height: "98px",
        padding: "16px",
        fontFamily: "Roboto"
      },
      HEXwrap: {
        position: "relative"
      },
      HEXinput: {
        width: "100%",
        marginTop: "12px",
        fontSize: "15px",
        color: "#333",
        padding: "0px",
        border: "0px",
        borderBottom: "2px solid " + hex,
        outline: "none",
        height: "30px"
      },
      HEXlabel: {
        position: "absolute",
        top: "0px",
        left: "0px",
        fontSize: "11px",
        color: "#999999",
        textTransform: "capitalize"
      },
      Hex: {
        style: {}
      },
      RGBwrap: {
        position: "relative"
      },
      RGBinput: {
        width: "100%",
        marginTop: "12px",
        fontSize: "15px",
        color: "#333",
        padding: "0px",
        border: "0px",
        borderBottom: "1px solid #eee",
        outline: "none",
        height: "30px"
      },
      RGBlabel: {
        position: "absolute",
        top: "0px",
        left: "0px",
        fontSize: "11px",
        color: "#999999",
        textTransform: "capitalize"
      },
      split: {
        display: "flex",
        marginRight: "-10px",
        paddingTop: "11px"
      },
      third: {
        flex: "1",
        paddingRight: "10px"
      }
    }
  }, passedStyles));
  var handleChange = function handleChange2(data, e2) {
    if (data.hex) {
      isValidHex(data.hex) && onChange({
        hex: data.hex,
        source: "hex"
      }, e2);
    } else if (data.r || data.g || data.b) {
      onChange({
        r: data.r || rgb.r,
        g: data.g || rgb.g,
        b: data.b || rgb.b,
        source: "rgb"
      }, e2);
    }
  };
  return React__default.createElement(Raised, { styles: passedStyles }, React__default.createElement("div", { style: styles7.material, className: "material-picker " + className }, React__default.createElement(EditableInput, {
    style: { wrap: styles7.HEXwrap, input: styles7.HEXinput, label: styles7.HEXlabel },
    label: "hex",
    value: hex,
    onChange: handleChange
  }), React__default.createElement("div", { style: styles7.split, className: "flexbox-fix" }, React__default.createElement("div", { style: styles7.third }, React__default.createElement(EditableInput, {
    style: { wrap: styles7.RGBwrap, input: styles7.RGBinput, label: styles7.RGBlabel },
    label: "r",
    value: rgb.r,
    onChange: handleChange
  })), React__default.createElement("div", { style: styles7.third }, React__default.createElement(EditableInput, {
    style: { wrap: styles7.RGBwrap, input: styles7.RGBinput, label: styles7.RGBlabel },
    label: "g",
    value: rgb.g,
    onChange: handleChange
  })), React__default.createElement("div", { style: styles7.third }, React__default.createElement(EditableInput, {
    style: { wrap: styles7.RGBwrap, input: styles7.RGBinput, label: styles7.RGBlabel },
    label: "b",
    value: rgb.b,
    onChange: handleChange
  })))));
};
ColorWrap(Material);
var PhotoshopPicker = function PhotoshopPicker2(_ref) {
  var onChange = _ref.onChange, rgb = _ref.rgb, hsv = _ref.hsv, hex = _ref.hex;
  var styles7 = _default$2({
    "default": {
      fields: {
        paddingTop: "5px",
        paddingBottom: "9px",
        width: "80px",
        position: "relative"
      },
      divider: {
        height: "5px"
      },
      RGBwrap: {
        position: "relative"
      },
      RGBinput: {
        marginLeft: "40%",
        width: "40%",
        height: "18px",
        border: "1px solid #888888",
        boxShadow: "inset 0 1px 1px rgba(0,0,0,.1), 0 1px 0 0 #ECECEC",
        marginBottom: "5px",
        fontSize: "13px",
        paddingLeft: "3px",
        marginRight: "10px"
      },
      RGBlabel: {
        left: "0px",
        top: "0px",
        width: "34px",
        textTransform: "uppercase",
        fontSize: "13px",
        height: "18px",
        lineHeight: "22px",
        position: "absolute"
      },
      HEXwrap: {
        position: "relative"
      },
      HEXinput: {
        marginLeft: "20%",
        width: "80%",
        height: "18px",
        border: "1px solid #888888",
        boxShadow: "inset 0 1px 1px rgba(0,0,0,.1), 0 1px 0 0 #ECECEC",
        marginBottom: "6px",
        fontSize: "13px",
        paddingLeft: "3px"
      },
      HEXlabel: {
        position: "absolute",
        top: "0px",
        left: "0px",
        width: "14px",
        textTransform: "uppercase",
        fontSize: "13px",
        height: "18px",
        lineHeight: "22px"
      },
      fieldSymbols: {
        position: "absolute",
        top: "5px",
        right: "-7px",
        fontSize: "13px"
      },
      symbol: {
        height: "20px",
        lineHeight: "22px",
        paddingBottom: "7px"
      }
    }
  });
  var handleChange = function handleChange2(data, e2) {
    if (data["#"]) {
      isValidHex(data["#"]) && onChange({
        hex: data["#"],
        source: "hex"
      }, e2);
    } else if (data.r || data.g || data.b) {
      onChange({
        r: data.r || rgb.r,
        g: data.g || rgb.g,
        b: data.b || rgb.b,
        source: "rgb"
      }, e2);
    } else if (data.h || data.s || data.v) {
      onChange({
        h: data.h || hsv.h,
        s: data.s || hsv.s,
        v: data.v || hsv.v,
        source: "hsv"
      }, e2);
    }
  };
  return React__default.createElement("div", { style: styles7.fields }, React__default.createElement(EditableInput, {
    style: { wrap: styles7.RGBwrap, input: styles7.RGBinput, label: styles7.RGBlabel },
    label: "h",
    value: Math.round(hsv.h),
    onChange: handleChange
  }), React__default.createElement(EditableInput, {
    style: { wrap: styles7.RGBwrap, input: styles7.RGBinput, label: styles7.RGBlabel },
    label: "s",
    value: Math.round(hsv.s * 100),
    onChange: handleChange
  }), React__default.createElement(EditableInput, {
    style: { wrap: styles7.RGBwrap, input: styles7.RGBinput, label: styles7.RGBlabel },
    label: "v",
    value: Math.round(hsv.v * 100),
    onChange: handleChange
  }), React__default.createElement("div", { style: styles7.divider }), React__default.createElement(EditableInput, {
    style: { wrap: styles7.RGBwrap, input: styles7.RGBinput, label: styles7.RGBlabel },
    label: "r",
    value: rgb.r,
    onChange: handleChange
  }), React__default.createElement(EditableInput, {
    style: { wrap: styles7.RGBwrap, input: styles7.RGBinput, label: styles7.RGBlabel },
    label: "g",
    value: rgb.g,
    onChange: handleChange
  }), React__default.createElement(EditableInput, {
    style: { wrap: styles7.RGBwrap, input: styles7.RGBinput, label: styles7.RGBlabel },
    label: "b",
    value: rgb.b,
    onChange: handleChange
  }), React__default.createElement("div", { style: styles7.divider }), React__default.createElement(EditableInput, {
    style: { wrap: styles7.HEXwrap, input: styles7.HEXinput, label: styles7.HEXlabel },
    label: "#",
    value: hex.replace("#", ""),
    onChange: handleChange
  }), React__default.createElement("div", { style: styles7.fieldSymbols }, React__default.createElement("div", { style: styles7.symbol }, "\xB0"), React__default.createElement("div", { style: styles7.symbol }, "%"), React__default.createElement("div", { style: styles7.symbol }, "%")));
};
var PhotoshopPointerCircle$1 = function PhotoshopPointerCircle(_ref) {
  var hsl = _ref.hsl;
  var styles7 = _default$2({
    "default": {
      picker: {
        width: "12px",
        height: "12px",
        borderRadius: "6px",
        boxShadow: "inset 0 0 0 1px #fff",
        transform: "translate(-6px, -6px)"
      }
    },
    "black-outline": {
      picker: {
        boxShadow: "inset 0 0 0 1px #000"
      }
    }
  }, { "black-outline": hsl.l > 0.5 });
  return React__default.createElement("div", { style: styles7.picker });
};
var PhotoshopPointerCircle2 = function PhotoshopPointerCircle3() {
  var styles7 = _default$2({
    "default": {
      triangle: {
        width: 0,
        height: 0,
        borderStyle: "solid",
        borderWidth: "4px 0 4px 6px",
        borderColor: "transparent transparent transparent #fff",
        position: "absolute",
        top: "1px",
        left: "1px"
      },
      triangleBorder: {
        width: 0,
        height: 0,
        borderStyle: "solid",
        borderWidth: "5px 0 5px 8px",
        borderColor: "transparent transparent transparent #555"
      },
      left: {
        Extend: "triangleBorder",
        transform: "translate(-13px, -4px)"
      },
      leftInside: {
        Extend: "triangle",
        transform: "translate(-8px, -5px)"
      },
      right: {
        Extend: "triangleBorder",
        transform: "translate(20px, -14px) rotate(180deg)"
      },
      rightInside: {
        Extend: "triangle",
        transform: "translate(-8px, -5px)"
      }
    }
  });
  return React__default.createElement("div", { style: styles7.pointer }, React__default.createElement("div", { style: styles7.left }, React__default.createElement("div", { style: styles7.leftInside })), React__default.createElement("div", { style: styles7.right }, React__default.createElement("div", { style: styles7.rightInside })));
};
var PhotoshopButton = function PhotoshopButton2(_ref) {
  var onClick = _ref.onClick, label = _ref.label, children = _ref.children, active3 = _ref.active;
  var styles7 = _default$2({
    "default": {
      button: {
        backgroundImage: "linear-gradient(-180deg, #FFFFFF 0%, #E6E6E6 100%)",
        border: "1px solid #878787",
        borderRadius: "2px",
        height: "20px",
        boxShadow: "0 1px 0 0 #EAEAEA",
        fontSize: "14px",
        color: "#000",
        lineHeight: "20px",
        textAlign: "center",
        marginBottom: "10px",
        cursor: "pointer"
      }
    },
    "active": {
      button: {
        boxShadow: "0 0 0 1px #878787"
      }
    }
  }, { active: active3 });
  return React__default.createElement("div", { style: styles7.button, onClick }, label || children);
};
var PhotoshopPreviews = function PhotoshopPreviews2(_ref) {
  var rgb = _ref.rgb, currentColor = _ref.currentColor;
  var styles7 = _default$2({
    "default": {
      swatches: {
        border: "1px solid #B3B3B3",
        borderBottom: "1px solid #F0F0F0",
        marginBottom: "2px",
        marginTop: "1px"
      },
      new: {
        height: "34px",
        background: "rgb(" + rgb.r + "," + rgb.g + ", " + rgb.b + ")",
        boxShadow: "inset 1px 0 0 #000, inset -1px 0 0 #000, inset 0 1px 0 #000"
      },
      current: {
        height: "34px",
        background: currentColor,
        boxShadow: "inset 1px 0 0 #000, inset -1px 0 0 #000, inset 0 -1px 0 #000"
      },
      label: {
        fontSize: "14px",
        color: "#000",
        textAlign: "center"
      }
    }
  });
  return React__default.createElement("div", null, React__default.createElement("div", { style: styles7.label }, "new"), React__default.createElement("div", { style: styles7.swatches }, React__default.createElement("div", { style: styles7.new }), React__default.createElement("div", { style: styles7.current })), React__default.createElement("div", { style: styles7.label }, "current"));
};
var _createClass = function() {
  function defineProperties(target, props) {
    for (var i2 = 0; i2 < props.length; i2++) {
      var descriptor = props[i2];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor)
        descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }
  return function(Constructor, protoProps, staticProps) {
    if (protoProps)
      defineProperties(Constructor.prototype, protoProps);
    if (staticProps)
      defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _possibleConstructorReturn(self2, call) {
  if (!self2) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return call && (typeof call === "object" || typeof call === "function") ? call : self2;
}
function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });
  if (superClass)
    Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}
var Photoshop = function(_React$Component) {
  _inherits(Photoshop2, _React$Component);
  function Photoshop2(props) {
    _classCallCheck(this, Photoshop2);
    var _this = _possibleConstructorReturn(this, (Photoshop2.__proto__ || Object.getPrototypeOf(Photoshop2)).call(this));
    _this.state = {
      currentColor: props.hex
    };
    return _this;
  }
  _createClass(Photoshop2, [{
    key: "render",
    value: function render3() {
      var _props = this.props, _props$styles = _props.styles, passedStyles = _props$styles === void 0 ? {} : _props$styles, _props$className = _props.className, className = _props$className === void 0 ? "" : _props$className;
      var styles7 = _default$2(merge$1({
        "default": {
          picker: {
            background: "#DCDCDC",
            borderRadius: "4px",
            boxShadow: "0 0 0 1px rgba(0,0,0,.25), 0 8px 16px rgba(0,0,0,.15)",
            boxSizing: "initial",
            width: "513px"
          },
          head: {
            backgroundImage: "linear-gradient(-180deg, #F0F0F0 0%, #D4D4D4 100%)",
            borderBottom: "1px solid #B1B1B1",
            boxShadow: "inset 0 1px 0 0 rgba(255,255,255,.2), inset 0 -1px 0 0 rgba(0,0,0,.02)",
            height: "23px",
            lineHeight: "24px",
            borderRadius: "4px 4px 0 0",
            fontSize: "13px",
            color: "#4D4D4D",
            textAlign: "center"
          },
          body: {
            padding: "15px 15px 0",
            display: "flex"
          },
          saturation: {
            width: "256px",
            height: "256px",
            position: "relative",
            border: "2px solid #B3B3B3",
            borderBottom: "2px solid #F0F0F0",
            overflow: "hidden"
          },
          hue: {
            position: "relative",
            height: "256px",
            width: "19px",
            marginLeft: "10px",
            border: "2px solid #B3B3B3",
            borderBottom: "2px solid #F0F0F0"
          },
          controls: {
            width: "180px",
            marginLeft: "10px"
          },
          top: {
            display: "flex"
          },
          previews: {
            width: "60px"
          },
          actions: {
            flex: "1",
            marginLeft: "20px"
          }
        }
      }, passedStyles));
      return React__default.createElement("div", { style: styles7.picker, className: "photoshop-picker " + className }, React__default.createElement("div", { style: styles7.head }, this.props.header), React__default.createElement("div", { style: styles7.body, className: "flexbox-fix" }, React__default.createElement("div", { style: styles7.saturation }, React__default.createElement(Saturation, {
        hsl: this.props.hsl,
        hsv: this.props.hsv,
        pointer: PhotoshopPointerCircle$1,
        onChange: this.props.onChange
      })), React__default.createElement("div", { style: styles7.hue }, React__default.createElement(Hue, {
        direction: "vertical",
        hsl: this.props.hsl,
        pointer: PhotoshopPointerCircle2,
        onChange: this.props.onChange
      })), React__default.createElement("div", { style: styles7.controls }, React__default.createElement("div", { style: styles7.top, className: "flexbox-fix" }, React__default.createElement("div", { style: styles7.previews }, React__default.createElement(PhotoshopPreviews, {
        rgb: this.props.rgb,
        currentColor: this.state.currentColor
      })), React__default.createElement("div", { style: styles7.actions }, React__default.createElement(PhotoshopButton, { label: "OK", onClick: this.props.onAccept, active: true }), React__default.createElement(PhotoshopButton, { label: "Cancel", onClick: this.props.onCancel }), React__default.createElement(PhotoshopPicker, {
        onChange: this.props.onChange,
        rgb: this.props.rgb,
        hsv: this.props.hsv,
        hex: this.props.hex
      }))))));
    }
  }]);
  return Photoshop2;
}(React__default.Component);
Photoshop.propTypes = {
  header: PropTypes.string,
  styles: PropTypes.object
};
Photoshop.defaultProps = {
  header: "Color Picker",
  styles: {}
};
ColorWrap(Photoshop);
var SketchFields = function SketchFields2(_ref) {
  var onChange = _ref.onChange, rgb = _ref.rgb, hsl = _ref.hsl, hex = _ref.hex, disableAlpha = _ref.disableAlpha;
  var styles7 = _default$2({
    "default": {
      fields: {
        display: "flex",
        paddingTop: "4px"
      },
      single: {
        flex: "1",
        paddingLeft: "6px"
      },
      alpha: {
        flex: "1",
        paddingLeft: "6px"
      },
      double: {
        flex: "2"
      },
      input: {
        width: "80%",
        padding: "4px 10% 3px",
        border: "none",
        boxShadow: "inset 0 0 0 1px #ccc",
        fontSize: "11px"
      },
      label: {
        display: "block",
        textAlign: "center",
        fontSize: "11px",
        color: "#222",
        paddingTop: "3px",
        paddingBottom: "4px",
        textTransform: "capitalize"
      }
    },
    "disableAlpha": {
      alpha: {
        display: "none"
      }
    }
  }, { disableAlpha });
  var handleChange = function handleChange2(data, e2) {
    if (data.hex) {
      isValidHex(data.hex) && onChange({
        hex: data.hex,
        source: "hex"
      }, e2);
    } else if (data.r || data.g || data.b) {
      onChange({
        r: data.r || rgb.r,
        g: data.g || rgb.g,
        b: data.b || rgb.b,
        a: rgb.a,
        source: "rgb"
      }, e2);
    } else if (data.a) {
      if (data.a < 0) {
        data.a = 0;
      } else if (data.a > 100) {
        data.a = 100;
      }
      data.a /= 100;
      onChange({
        h: hsl.h,
        s: hsl.s,
        l: hsl.l,
        a: data.a,
        source: "rgb"
      }, e2);
    }
  };
  return React__default.createElement("div", { style: styles7.fields, className: "flexbox-fix" }, React__default.createElement("div", { style: styles7.double }, React__default.createElement(EditableInput, {
    style: { input: styles7.input, label: styles7.label },
    label: "hex",
    value: hex.replace("#", ""),
    onChange: handleChange
  })), React__default.createElement("div", { style: styles7.single }, React__default.createElement(EditableInput, {
    style: { input: styles7.input, label: styles7.label },
    label: "r",
    value: rgb.r,
    onChange: handleChange,
    dragLabel: "true",
    dragMax: "255"
  })), React__default.createElement("div", { style: styles7.single }, React__default.createElement(EditableInput, {
    style: { input: styles7.input, label: styles7.label },
    label: "g",
    value: rgb.g,
    onChange: handleChange,
    dragLabel: "true",
    dragMax: "255"
  })), React__default.createElement("div", { style: styles7.single }, React__default.createElement(EditableInput, {
    style: { input: styles7.input, label: styles7.label },
    label: "b",
    value: rgb.b,
    onChange: handleChange,
    dragLabel: "true",
    dragMax: "255"
  })), React__default.createElement("div", { style: styles7.alpha }, React__default.createElement(EditableInput, {
    style: { input: styles7.input, label: styles7.label },
    label: "a",
    value: Math.round(rgb.a * 100),
    onChange: handleChange,
    dragLabel: "true",
    dragMax: "100"
  })));
};
var _extends$2 = Object.assign || function(target) {
  for (var i2 = 1; i2 < arguments.length; i2++) {
    var source = arguments[i2];
    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }
  return target;
};
var SketchPresetColors = function SketchPresetColors2(_ref) {
  var colors = _ref.colors, _ref$onClick = _ref.onClick, onClick = _ref$onClick === void 0 ? function() {
  } : _ref$onClick, onSwatchHover = _ref.onSwatchHover;
  var styles7 = _default$2({
    "default": {
      colors: {
        margin: "0 -10px",
        padding: "10px 0 0 10px",
        borderTop: "1px solid #eee",
        display: "flex",
        flexWrap: "wrap",
        position: "relative"
      },
      swatchWrap: {
        width: "16px",
        height: "16px",
        margin: "0 10px 10px 0"
      },
      swatch: {
        borderRadius: "3px",
        boxShadow: "inset 0 0 0 1px rgba(0,0,0,.15)"
      }
    },
    "no-presets": {
      colors: {
        display: "none"
      }
    }
  }, {
    "no-presets": !colors || !colors.length
  });
  var handleClick = function handleClick2(hex, e2) {
    onClick({
      hex,
      source: "hex"
    }, e2);
  };
  return React__default.createElement("div", { style: styles7.colors, className: "flexbox-fix" }, colors.map(function(colorObjOrString) {
    var c2 = typeof colorObjOrString === "string" ? { color: colorObjOrString } : colorObjOrString;
    var key = "" + c2.color + (c2.title || "");
    return React__default.createElement("div", { key, style: styles7.swatchWrap }, React__default.createElement(Swatch$1, _extends$2({}, c2, {
      style: styles7.swatch,
      onClick: handleClick,
      onHover: onSwatchHover,
      focusStyle: {
        boxShadow: "inset 0 0 0 1px rgba(0,0,0,.15), 0 0 4px " + c2.color
      }
    })));
  }));
};
SketchPresetColors.propTypes = {
  colors: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.shape({
    color: PropTypes.string,
    title: PropTypes.string
  })])).isRequired
};
var _extends$1 = Object.assign || function(target) {
  for (var i2 = 1; i2 < arguments.length; i2++) {
    var source = arguments[i2];
    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }
  return target;
};
var Sketch = function Sketch2(_ref) {
  var width = _ref.width, rgb = _ref.rgb, hex = _ref.hex, hsv = _ref.hsv, hsl = _ref.hsl, onChange = _ref.onChange, onSwatchHover = _ref.onSwatchHover, disableAlpha = _ref.disableAlpha, presetColors = _ref.presetColors, renderers = _ref.renderers, _ref$styles = _ref.styles, passedStyles = _ref$styles === void 0 ? {} : _ref$styles, _ref$className = _ref.className, className = _ref$className === void 0 ? "" : _ref$className;
  var styles7 = _default$2(merge$1({
    "default": _extends$1({
      picker: {
        width,
        padding: "10px 10px 0",
        boxSizing: "initial",
        background: "#fff",
        borderRadius: "4px",
        boxShadow: "0 0 0 1px rgba(0,0,0,.15), 0 8px 16px rgba(0,0,0,.15)"
      },
      saturation: {
        width: "100%",
        paddingBottom: "75%",
        position: "relative",
        overflow: "hidden"
      },
      Saturation: {
        radius: "3px",
        shadow: "inset 0 0 0 1px rgba(0,0,0,.15), inset 0 0 4px rgba(0,0,0,.25)"
      },
      controls: {
        display: "flex"
      },
      sliders: {
        padding: "4px 0",
        flex: "1"
      },
      color: {
        width: "24px",
        height: "24px",
        position: "relative",
        marginTop: "4px",
        marginLeft: "4px",
        borderRadius: "3px"
      },
      activeColor: {
        absolute: "0px 0px 0px 0px",
        borderRadius: "2px",
        background: "rgba(" + rgb.r + "," + rgb.g + "," + rgb.b + "," + rgb.a + ")",
        boxShadow: "inset 0 0 0 1px rgba(0,0,0,.15), inset 0 0 4px rgba(0,0,0,.25)"
      },
      hue: {
        position: "relative",
        height: "10px",
        overflow: "hidden"
      },
      Hue: {
        radius: "2px",
        shadow: "inset 0 0 0 1px rgba(0,0,0,.15), inset 0 0 4px rgba(0,0,0,.25)"
      },
      alpha: {
        position: "relative",
        height: "10px",
        marginTop: "4px",
        overflow: "hidden"
      },
      Alpha: {
        radius: "2px",
        shadow: "inset 0 0 0 1px rgba(0,0,0,.15), inset 0 0 4px rgba(0,0,0,.25)"
      }
    }, passedStyles),
    "disableAlpha": {
      color: {
        height: "10px"
      },
      hue: {
        height: "10px"
      },
      alpha: {
        display: "none"
      }
    }
  }, passedStyles), { disableAlpha });
  return React__default.createElement("div", { style: styles7.picker, className: "sketch-picker " + className }, React__default.createElement("div", { style: styles7.saturation }, React__default.createElement(Saturation, {
    style: styles7.Saturation,
    hsl,
    hsv,
    onChange
  })), React__default.createElement("div", { style: styles7.controls, className: "flexbox-fix" }, React__default.createElement("div", { style: styles7.sliders }, React__default.createElement("div", { style: styles7.hue }, React__default.createElement(Hue, {
    style: styles7.Hue,
    hsl,
    onChange
  })), React__default.createElement("div", { style: styles7.alpha }, React__default.createElement(Alpha, {
    style: styles7.Alpha,
    rgb,
    hsl,
    renderers,
    onChange
  }))), React__default.createElement("div", { style: styles7.color }, React__default.createElement(Checkboard, null), React__default.createElement("div", { style: styles7.activeColor }))), React__default.createElement(SketchFields, {
    rgb,
    hsl,
    hex,
    onChange,
    disableAlpha
  }), React__default.createElement(SketchPresetColors, {
    colors: presetColors,
    onClick: onChange,
    onSwatchHover
  }));
};
Sketch.propTypes = {
  disableAlpha: PropTypes.bool,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  styles: PropTypes.object
};
Sketch.defaultProps = {
  disableAlpha: false,
  width: 200,
  styles: {},
  presetColors: ["#D0021B", "#F5A623", "#F8E71C", "#8B572A", "#7ED321", "#417505", "#BD10E0", "#9013FE", "#4A90E2", "#50E3C2", "#B8E986", "#000000", "#4A4A4A", "#9B9B9B", "#FFFFFF"]
};
ColorWrap(Sketch);
var SliderSwatch = function SliderSwatch2(_ref) {
  var hsl = _ref.hsl, offset = _ref.offset, _ref$onClick = _ref.onClick, onClick = _ref$onClick === void 0 ? function() {
  } : _ref$onClick, active3 = _ref.active, first = _ref.first, last = _ref.last;
  var styles7 = _default$2({
    "default": {
      swatch: {
        height: "12px",
        background: "hsl(" + hsl.h + ", 50%, " + offset * 100 + "%)",
        cursor: "pointer"
      }
    },
    "first": {
      swatch: {
        borderRadius: "2px 0 0 2px"
      }
    },
    "last": {
      swatch: {
        borderRadius: "0 2px 2px 0"
      }
    },
    "active": {
      swatch: {
        transform: "scaleY(1.8)",
        borderRadius: "3.6px/2px"
      }
    }
  }, { active: active3, first, last });
  var handleClick = function handleClick2(e2) {
    return onClick({
      h: hsl.h,
      s: 0.5,
      l: offset,
      source: "hsl"
    }, e2);
  };
  return React__default.createElement("div", { style: styles7.swatch, onClick: handleClick });
};
var SliderSwatches = function SliderSwatches2(_ref) {
  var onClick = _ref.onClick, hsl = _ref.hsl;
  var styles7 = _default$2({
    "default": {
      swatches: {
        marginTop: "20px"
      },
      swatch: {
        boxSizing: "border-box",
        width: "20%",
        paddingRight: "1px",
        float: "left"
      },
      clear: {
        clear: "both"
      }
    }
  });
  var epsilon = 0.1;
  return React__default.createElement("div", { style: styles7.swatches }, React__default.createElement("div", { style: styles7.swatch }, React__default.createElement(SliderSwatch, {
    hsl,
    offset: ".80",
    active: Math.abs(hsl.l - 0.8) < epsilon && Math.abs(hsl.s - 0.5) < epsilon,
    onClick,
    first: true
  })), React__default.createElement("div", { style: styles7.swatch }, React__default.createElement(SliderSwatch, {
    hsl,
    offset: ".65",
    active: Math.abs(hsl.l - 0.65) < epsilon && Math.abs(hsl.s - 0.5) < epsilon,
    onClick
  })), React__default.createElement("div", { style: styles7.swatch }, React__default.createElement(SliderSwatch, {
    hsl,
    offset: ".50",
    active: Math.abs(hsl.l - 0.5) < epsilon && Math.abs(hsl.s - 0.5) < epsilon,
    onClick
  })), React__default.createElement("div", { style: styles7.swatch }, React__default.createElement(SliderSwatch, {
    hsl,
    offset: ".35",
    active: Math.abs(hsl.l - 0.35) < epsilon && Math.abs(hsl.s - 0.5) < epsilon,
    onClick
  })), React__default.createElement("div", { style: styles7.swatch }, React__default.createElement(SliderSwatch, {
    hsl,
    offset: ".20",
    active: Math.abs(hsl.l - 0.2) < epsilon && Math.abs(hsl.s - 0.5) < epsilon,
    onClick,
    last: true
  })), React__default.createElement("div", { style: styles7.clear }));
};
var SliderPointer2 = function SliderPointer3() {
  var styles7 = _default$2({
    "default": {
      picker: {
        width: "14px",
        height: "14px",
        borderRadius: "6px",
        transform: "translate(-7px, -1px)",
        backgroundColor: "rgb(248, 248, 248)",
        boxShadow: "0 1px 4px 0 rgba(0, 0, 0, 0.37)"
      }
    }
  });
  return React__default.createElement("div", { style: styles7.picker });
};
var Slider$1 = function Slider(_ref) {
  var hsl = _ref.hsl, onChange = _ref.onChange, pointer = _ref.pointer, _ref$styles = _ref.styles, passedStyles = _ref$styles === void 0 ? {} : _ref$styles, _ref$className = _ref.className, className = _ref$className === void 0 ? "" : _ref$className;
  var styles7 = _default$2(merge$1({
    "default": {
      hue: {
        height: "12px",
        position: "relative"
      },
      Hue: {
        radius: "2px"
      }
    }
  }, passedStyles));
  return React__default.createElement("div", { style: styles7.wrap || {}, className: "slider-picker " + className }, React__default.createElement("div", { style: styles7.hue }, React__default.createElement(Hue, {
    style: styles7.Hue,
    hsl,
    pointer,
    onChange
  })), React__default.createElement("div", { style: styles7.swatches }, React__default.createElement(SliderSwatches, { hsl, onClick: onChange })));
};
Slider$1.propTypes = {
  styles: PropTypes.object
};
Slider$1.defaultProps = {
  pointer: SliderPointer2,
  styles: {}
};
ColorWrap(Slider$1);
var CheckIcon = {};
Object.defineProperty(CheckIcon, "__esModule", {
  value: true
});
var _extends = Object.assign || function(target) {
  for (var i2 = 1; i2 < arguments.length; i2++) {
    var source = arguments[i2];
    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }
  return target;
};
var _react = React__default;
var _react2 = _interopRequireDefault(_react);
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}
function _objectWithoutProperties(obj, keys2) {
  var target = {};
  for (var i2 in obj) {
    if (keys2.indexOf(i2) >= 0)
      continue;
    if (!Object.prototype.hasOwnProperty.call(obj, i2))
      continue;
    target[i2] = obj[i2];
  }
  return target;
}
var DEFAULT_SIZE = 24;
var _default = CheckIcon.default = function(_ref) {
  var _ref$fill = _ref.fill, fill = _ref$fill === void 0 ? "currentColor" : _ref$fill, _ref$width = _ref.width, width = _ref$width === void 0 ? DEFAULT_SIZE : _ref$width, _ref$height = _ref.height, height = _ref$height === void 0 ? DEFAULT_SIZE : _ref$height, _ref$style = _ref.style, style2 = _ref$style === void 0 ? {} : _ref$style, props = _objectWithoutProperties(_ref, ["fill", "width", "height", "style"]);
  return _react2.default.createElement("svg", _extends({
    viewBox: "0 0 " + DEFAULT_SIZE + " " + DEFAULT_SIZE,
    style: _extends({ fill, width, height }, style2)
  }, props), _react2.default.createElement("path", { d: "M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z" }));
};
var SwatchesColor = function SwatchesColor2(_ref) {
  var color = _ref.color, _ref$onClick = _ref.onClick, onClick = _ref$onClick === void 0 ? function() {
  } : _ref$onClick, onSwatchHover = _ref.onSwatchHover, first = _ref.first, last = _ref.last, active3 = _ref.active;
  var styles7 = _default$2({
    "default": {
      color: {
        width: "40px",
        height: "24px",
        cursor: "pointer",
        background: color,
        marginBottom: "1px"
      },
      check: {
        color: getContrastingColor(color),
        marginLeft: "8px",
        display: "none"
      }
    },
    "first": {
      color: {
        overflow: "hidden",
        borderRadius: "2px 2px 0 0"
      }
    },
    "last": {
      color: {
        overflow: "hidden",
        borderRadius: "0 0 2px 2px"
      }
    },
    "active": {
      check: {
        display: "block"
      }
    },
    "color-#FFFFFF": {
      color: {
        boxShadow: "inset 0 0 0 1px #ddd"
      },
      check: {
        color: "#333"
      }
    },
    "transparent": {
      check: {
        color: "#333"
      }
    }
  }, {
    first,
    last,
    active: active3,
    "color-#FFFFFF": color === "#FFFFFF",
    "transparent": color === "transparent"
  });
  return React__default.createElement(Swatch$1, {
    color,
    style: styles7.color,
    onClick,
    onHover: onSwatchHover,
    focusStyle: { boxShadow: "0 0 4px " + color }
  }, React__default.createElement("div", { style: styles7.check }, React__default.createElement(_default, null)));
};
var SwatchesGroup = function SwatchesGroup2(_ref) {
  var onClick = _ref.onClick, onSwatchHover = _ref.onSwatchHover, group = _ref.group, active3 = _ref.active;
  var styles7 = _default$2({
    "default": {
      group: {
        paddingBottom: "10px",
        width: "40px",
        float: "left",
        marginRight: "10px"
      }
    }
  });
  return React__default.createElement("div", { style: styles7.group }, map(group, function(color, i2) {
    return React__default.createElement(SwatchesColor, {
      key: color,
      color,
      active: color.toLowerCase() === active3,
      first: i2 === 0,
      last: i2 === group.length - 1,
      onClick,
      onSwatchHover
    });
  }));
};
var Swatches = function Swatches2(_ref) {
  var width = _ref.width, height = _ref.height, onChange = _ref.onChange, onSwatchHover = _ref.onSwatchHover, colors = _ref.colors, hex = _ref.hex, _ref$styles = _ref.styles, passedStyles = _ref$styles === void 0 ? {} : _ref$styles, _ref$className = _ref.className, className = _ref$className === void 0 ? "" : _ref$className;
  var styles7 = _default$2(merge$1({
    "default": {
      picker: {
        width,
        height
      },
      overflow: {
        height,
        overflowY: "scroll"
      },
      body: {
        padding: "16px 0 6px 16px"
      },
      clear: {
        clear: "both"
      }
    }
  }, passedStyles));
  var handleChange = function handleChange2(data, e2) {
    return onChange({ hex: data, source: "hex" }, e2);
  };
  return React__default.createElement("div", { style: styles7.picker, className: "swatches-picker " + className }, React__default.createElement(Raised, null, React__default.createElement("div", { style: styles7.overflow }, React__default.createElement("div", { style: styles7.body }, map(colors, function(group) {
    return React__default.createElement(SwatchesGroup, {
      key: group.toString(),
      group,
      active: hex,
      onClick: handleChange,
      onSwatchHover
    });
  }), React__default.createElement("div", { style: styles7.clear })))));
};
Swatches.propTypes = {
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  colors: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)),
  styles: PropTypes.object
};
Swatches.defaultProps = {
  width: 320,
  height: 240,
  colors: [[red["900"], red["700"], red["500"], red["300"], red["100"]], [pink["900"], pink["700"], pink["500"], pink["300"], pink["100"]], [purple["900"], purple["700"], purple["500"], purple["300"], purple["100"]], [deepPurple["900"], deepPurple["700"], deepPurple["500"], deepPurple["300"], deepPurple["100"]], [indigo["900"], indigo["700"], indigo["500"], indigo["300"], indigo["100"]], [blue["900"], blue["700"], blue["500"], blue["300"], blue["100"]], [lightBlue["900"], lightBlue["700"], lightBlue["500"], lightBlue["300"], lightBlue["100"]], [cyan["900"], cyan["700"], cyan["500"], cyan["300"], cyan["100"]], [teal["900"], teal["700"], teal["500"], teal["300"], teal["100"]], ["#194D33", green["700"], green["500"], green["300"], green["100"]], [lightGreen["900"], lightGreen["700"], lightGreen["500"], lightGreen["300"], lightGreen["100"]], [lime["900"], lime["700"], lime["500"], lime["300"], lime["100"]], [yellow["900"], yellow["700"], yellow["500"], yellow["300"], yellow["100"]], [amber["900"], amber["700"], amber["500"], amber["300"], amber["100"]], [orange["900"], orange["700"], orange["500"], orange["300"], orange["100"]], [deepOrange["900"], deepOrange["700"], deepOrange["500"], deepOrange["300"], deepOrange["100"]], [brown["900"], brown["700"], brown["500"], brown["300"], brown["100"]], [blueGrey["900"], blueGrey["700"], blueGrey["500"], blueGrey["300"], blueGrey["100"]], ["#000000", "#525252", "#969696", "#D9D9D9", "#FFFFFF"]],
  styles: {}
};
ColorWrap(Swatches);
var Twitter = function Twitter2(_ref) {
  var onChange = _ref.onChange, onSwatchHover = _ref.onSwatchHover, hex = _ref.hex, colors = _ref.colors, width = _ref.width, triangle = _ref.triangle, _ref$styles = _ref.styles, passedStyles = _ref$styles === void 0 ? {} : _ref$styles, _ref$className = _ref.className, className = _ref$className === void 0 ? "" : _ref$className;
  var styles7 = _default$2(merge$1({
    "default": {
      card: {
        width,
        background: "#fff",
        border: "0 solid rgba(0,0,0,0.25)",
        boxShadow: "0 1px 4px rgba(0,0,0,0.25)",
        borderRadius: "4px",
        position: "relative"
      },
      body: {
        padding: "15px 9px 9px 15px"
      },
      label: {
        fontSize: "18px",
        color: "#fff"
      },
      triangle: {
        width: "0px",
        height: "0px",
        borderStyle: "solid",
        borderWidth: "0 9px 10px 9px",
        borderColor: "transparent transparent #fff transparent",
        position: "absolute"
      },
      triangleShadow: {
        width: "0px",
        height: "0px",
        borderStyle: "solid",
        borderWidth: "0 9px 10px 9px",
        borderColor: "transparent transparent rgba(0,0,0,.1) transparent",
        position: "absolute"
      },
      hash: {
        background: "#F0F0F0",
        height: "30px",
        width: "30px",
        borderRadius: "4px 0 0 4px",
        float: "left",
        color: "#98A1A4",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      },
      input: {
        width: "100px",
        fontSize: "14px",
        color: "#666",
        border: "0px",
        outline: "none",
        height: "28px",
        boxShadow: "inset 0 0 0 1px #F0F0F0",
        boxSizing: "content-box",
        borderRadius: "0 4px 4px 0",
        float: "left",
        paddingLeft: "8px"
      },
      swatch: {
        width: "30px",
        height: "30px",
        float: "left",
        borderRadius: "4px",
        margin: "0 6px 6px 0"
      },
      clear: {
        clear: "both"
      }
    },
    "hide-triangle": {
      triangle: {
        display: "none"
      },
      triangleShadow: {
        display: "none"
      }
    },
    "top-left-triangle": {
      triangle: {
        top: "-10px",
        left: "12px"
      },
      triangleShadow: {
        top: "-11px",
        left: "12px"
      }
    },
    "top-right-triangle": {
      triangle: {
        top: "-10px",
        right: "12px"
      },
      triangleShadow: {
        top: "-11px",
        right: "12px"
      }
    }
  }, passedStyles), {
    "hide-triangle": triangle === "hide",
    "top-left-triangle": triangle === "top-left",
    "top-right-triangle": triangle === "top-right"
  });
  var handleChange = function handleChange2(hexcode, e2) {
    isValidHex(hexcode) && onChange({
      hex: hexcode,
      source: "hex"
    }, e2);
  };
  return React__default.createElement("div", { style: styles7.card, className: "twitter-picker " + className }, React__default.createElement("div", { style: styles7.triangleShadow }), React__default.createElement("div", { style: styles7.triangle }), React__default.createElement("div", { style: styles7.body }, map(colors, function(c2, i2) {
    return React__default.createElement(Swatch$1, {
      key: i2,
      color: c2,
      hex: c2,
      style: styles7.swatch,
      onClick: handleChange,
      onHover: onSwatchHover,
      focusStyle: {
        boxShadow: "0 0 4px " + c2
      }
    });
  }), React__default.createElement("div", { style: styles7.hash }, "#"), React__default.createElement(EditableInput, {
    label: null,
    style: { input: styles7.input },
    value: hex.replace("#", ""),
    onChange: handleChange
  }), React__default.createElement("div", { style: styles7.clear })));
};
Twitter.propTypes = {
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  triangle: PropTypes.oneOf(["hide", "top-left", "top-right"]),
  colors: PropTypes.arrayOf(PropTypes.string),
  styles: PropTypes.object
};
Twitter.defaultProps = {
  width: 276,
  colors: ["#FF6900", "#FCB900", "#7BDCB5", "#00D084", "#8ED1FC", "#0693E3", "#ABB8C3", "#EB144C", "#F78DA7", "#9900EF"],
  triangle: "top-left",
  styles: {}
};
ColorWrap(Twitter);
var GooglePointerCircle = function GooglePointerCircle2(props) {
  var styles7 = _default$2({
    "default": {
      picker: {
        width: "20px",
        height: "20px",
        borderRadius: "22px",
        border: "2px #fff solid",
        transform: "translate(-12px, -13px)",
        background: "hsl(" + Math.round(props.hsl.h) + ", " + Math.round(props.hsl.s * 100) + "%, " + Math.round(props.hsl.l * 100) + "%)"
      }
    }
  });
  return React__default.createElement("div", { style: styles7.picker });
};
GooglePointerCircle.propTypes = {
  hsl: PropTypes.shape({
    h: PropTypes.number,
    s: PropTypes.number,
    l: PropTypes.number,
    a: PropTypes.number
  })
};
GooglePointerCircle.defaultProps = {
  hsl: { a: 1, h: 249.94, l: 0.2, s: 0.5 }
};
var GooglePointer = function GooglePointer2(props) {
  var styles7 = _default$2({
    "default": {
      picker: {
        width: "20px",
        height: "20px",
        borderRadius: "22px",
        transform: "translate(-10px, -7px)",
        background: "hsl(" + Math.round(props.hsl.h) + ", 100%, 50%)",
        border: "2px white solid"
      }
    }
  });
  return React__default.createElement("div", { style: styles7.picker });
};
GooglePointer.propTypes = {
  hsl: PropTypes.shape({
    h: PropTypes.number,
    s: PropTypes.number,
    l: PropTypes.number,
    a: PropTypes.number
  })
};
GooglePointer.defaultProps = {
  hsl: { a: 1, h: 249.94, l: 0.2, s: 0.5 }
};
var GoogleFields = function GoogleFields2(_ref) {
  var onChange = _ref.onChange, rgb = _ref.rgb, hsl = _ref.hsl, hex = _ref.hex, hsv = _ref.hsv;
  var handleChange = function handleChange2(data, e2) {
    if (data.hex) {
      isValidHex(data.hex) && onChange({
        hex: data.hex,
        source: "hex"
      }, e2);
    } else if (data.rgb) {
      var values2 = data.rgb.split(",");
      isvalidColorString(data.rgb, "rgb") && onChange({
        r: values2[0],
        g: values2[1],
        b: values2[2],
        a: 1,
        source: "rgb"
      }, e2);
    } else if (data.hsv) {
      var _values = data.hsv.split(",");
      if (isvalidColorString(data.hsv, "hsv")) {
        _values[2] = _values[2].replace("%", "");
        _values[1] = _values[1].replace("%", "");
        _values[0] = _values[0].replace("\xB0", "");
        if (_values[1] == 1) {
          _values[1] = 0.01;
        } else if (_values[2] == 1) {
          _values[2] = 0.01;
        }
        onChange({
          h: Number(_values[0]),
          s: Number(_values[1]),
          v: Number(_values[2]),
          source: "hsv"
        }, e2);
      }
    } else if (data.hsl) {
      var _values2 = data.hsl.split(",");
      if (isvalidColorString(data.hsl, "hsl")) {
        _values2[2] = _values2[2].replace("%", "");
        _values2[1] = _values2[1].replace("%", "");
        _values2[0] = _values2[0].replace("\xB0", "");
        if (hsvValue[1] == 1) {
          hsvValue[1] = 0.01;
        } else if (hsvValue[2] == 1) {
          hsvValue[2] = 0.01;
        }
        onChange({
          h: Number(_values2[0]),
          s: Number(_values2[1]),
          v: Number(_values2[2]),
          source: "hsl"
        }, e2);
      }
    }
  };
  var styles7 = _default$2({
    "default": {
      wrap: {
        display: "flex",
        height: "100px",
        marginTop: "4px"
      },
      fields: {
        width: "100%"
      },
      column: {
        paddingTop: "10px",
        display: "flex",
        justifyContent: "space-between"
      },
      double: {
        padding: "0px 4.4px",
        boxSizing: "border-box"
      },
      input: {
        width: "100%",
        height: "38px",
        boxSizing: "border-box",
        padding: "4px 10% 3px",
        textAlign: "center",
        border: "1px solid #dadce0",
        fontSize: "11px",
        textTransform: "lowercase",
        borderRadius: "5px",
        outline: "none",
        fontFamily: "Roboto,Arial,sans-serif"
      },
      input2: {
        height: "38px",
        width: "100%",
        border: "1px solid #dadce0",
        boxSizing: "border-box",
        fontSize: "11px",
        textTransform: "lowercase",
        borderRadius: "5px",
        outline: "none",
        paddingLeft: "10px",
        fontFamily: "Roboto,Arial,sans-serif"
      },
      label: {
        textAlign: "center",
        fontSize: "12px",
        background: "#fff",
        position: "absolute",
        textTransform: "uppercase",
        color: "#3c4043",
        width: "35px",
        top: "-6px",
        left: "0",
        right: "0",
        marginLeft: "auto",
        marginRight: "auto",
        fontFamily: "Roboto,Arial,sans-serif"
      },
      label2: {
        left: "10px",
        textAlign: "center",
        fontSize: "12px",
        background: "#fff",
        position: "absolute",
        textTransform: "uppercase",
        color: "#3c4043",
        width: "32px",
        top: "-6px",
        fontFamily: "Roboto,Arial,sans-serif"
      },
      single: {
        flexGrow: "1",
        margin: "0px 4.4px"
      }
    }
  });
  var rgbValue = rgb.r + ", " + rgb.g + ", " + rgb.b;
  var hslValue = Math.round(hsl.h) + "\xB0, " + Math.round(hsl.s * 100) + "%, " + Math.round(hsl.l * 100) + "%";
  var hsvValue = Math.round(hsv.h) + "\xB0, " + Math.round(hsv.s * 100) + "%, " + Math.round(hsv.v * 100) + "%";
  return React__default.createElement("div", { style: styles7.wrap, className: "flexbox-fix" }, React__default.createElement("div", { style: styles7.fields }, React__default.createElement("div", { style: styles7.double }, React__default.createElement(EditableInput, {
    style: { input: styles7.input, label: styles7.label },
    label: "hex",
    value: hex,
    onChange: handleChange
  })), React__default.createElement("div", { style: styles7.column }, React__default.createElement("div", { style: styles7.single }, React__default.createElement(EditableInput, {
    style: { input: styles7.input2, label: styles7.label2 },
    label: "rgb",
    value: rgbValue,
    onChange: handleChange
  })), React__default.createElement("div", { style: styles7.single }, React__default.createElement(EditableInput, {
    style: { input: styles7.input2, label: styles7.label2 },
    label: "hsv",
    value: hsvValue,
    onChange: handleChange
  })), React__default.createElement("div", { style: styles7.single }, React__default.createElement(EditableInput, {
    style: { input: styles7.input2, label: styles7.label2 },
    label: "hsl",
    value: hslValue,
    onChange: handleChange
  })))));
};
var Google = function Google2(_ref) {
  var width = _ref.width, onChange = _ref.onChange, rgb = _ref.rgb, hsl = _ref.hsl, hsv = _ref.hsv, hex = _ref.hex, header = _ref.header, _ref$styles = _ref.styles, passedStyles = _ref$styles === void 0 ? {} : _ref$styles, _ref$className = _ref.className, className = _ref$className === void 0 ? "" : _ref$className;
  var styles7 = _default$2(merge$1({
    "default": {
      picker: {
        width,
        background: "#fff",
        border: "1px solid #dfe1e5",
        boxSizing: "initial",
        display: "flex",
        flexWrap: "wrap",
        borderRadius: "8px 8px 0px 0px"
      },
      head: {
        height: "57px",
        width: "100%",
        paddingTop: "16px",
        paddingBottom: "16px",
        paddingLeft: "16px",
        fontSize: "20px",
        boxSizing: "border-box",
        fontFamily: "Roboto-Regular,HelveticaNeue,Arial,sans-serif"
      },
      saturation: {
        width: "70%",
        padding: "0px",
        position: "relative",
        overflow: "hidden"
      },
      swatch: {
        width: "30%",
        height: "228px",
        padding: "0px",
        background: "rgba(" + rgb.r + ", " + rgb.g + ", " + rgb.b + ", 1)",
        position: "relative",
        overflow: "hidden"
      },
      body: {
        margin: "auto",
        width: "95%"
      },
      controls: {
        display: "flex",
        boxSizing: "border-box",
        height: "52px",
        paddingTop: "22px"
      },
      color: {
        width: "32px"
      },
      hue: {
        height: "8px",
        position: "relative",
        margin: "0px 16px 0px 16px",
        width: "100%"
      },
      Hue: {
        radius: "2px"
      }
    }
  }, passedStyles));
  return React__default.createElement("div", { style: styles7.picker, className: "google-picker " + className }, React__default.createElement("div", { style: styles7.head }, header), React__default.createElement("div", { style: styles7.swatch }), React__default.createElement("div", { style: styles7.saturation }, React__default.createElement(Saturation, {
    hsl,
    hsv,
    pointer: GooglePointerCircle,
    onChange
  })), React__default.createElement("div", { style: styles7.body }, React__default.createElement("div", { style: styles7.controls, className: "flexbox-fix" }, React__default.createElement("div", { style: styles7.hue }, React__default.createElement(Hue, {
    style: styles7.Hue,
    hsl,
    radius: "4px",
    pointer: GooglePointer,
    onChange
  }))), React__default.createElement(GoogleFields, {
    rgb,
    hsl,
    hex,
    hsv,
    onChange
  })));
};
Google.propTypes = {
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  styles: PropTypes.object,
  header: PropTypes.string
};
Google.defaultProps = {
  width: 652,
  styles: {},
  header: "Color picker"
};
ColorWrap(Google);
var style$2 = "";
const ColorPicker = ({
  color: _color,
  onChangeComplete
}) => {
  const [color, setColor] = useState(_color);
  const [showPicker, setShowPicker] = useState(false);
  useEffect(() => {
    setColor(_color);
  }, [_color]);
  useEffect(() => {
    const handler = () => {
      setShowPicker(false);
    };
    window.addEventListener("click", handler);
    return () => {
      window.removeEventListener("click", handler);
    };
  }, []);
  return /* @__PURE__ */ jsxs("div", {
    style: {
      position: "relative"
    },
    children: [/* @__PURE__ */ jsx("div", {
      style: {
        padding: "5px",
        backgroundColor: "#fff",
        width: "50%",
        height: "30px"
      },
      onClick: (e2) => {
        e2.preventDefault();
        e2.stopPropagation();
        setShowPicker(!showPicker);
      },
      children: /* @__PURE__ */ jsx("div", {
        style: {
          backgroundColor: color,
          width: "100%",
          height: "100%"
        }
      })
    }), /* @__PURE__ */ jsx("div", {
      className: showPicker ? "picker" : "hidden",
      children: /* @__PURE__ */ jsx(ChromePicker, {
        color,
        onChange: ({
          rgb: {
            r: r2,
            g: g2,
            b: b2,
            a: a2
          }
        }) => {
          setColor(`rgba(${r2}, ${g2}, ${b2}, ${a2})`);
        },
        onChangeComplete: ({
          rgb: {
            r: r2,
            g: g2,
            b: b2,
            a: a2
          }
        }) => {
          onChangeComplete(`rgba(${r2}, ${g2}, ${b2}, ${a2})`);
        }
      })
    })]
  });
};
function mdiDelete(props) {
  return /* @__PURE__ */ jsx("svg", __spreadProps(__spreadValues({
    width: "1.2em",
    height: "1.2em",
    preserveAspectRatio: "xMidYMid meet",
    viewBox: "0 0 24 24"
  }, props), {
    children: /* @__PURE__ */ jsx("path", {
      d: "M19 4h-3.5l-1-1h-5l-1 1H5v2h14M6 19a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7H6v12z",
      fill: "currentColor"
    })
  }));
}
function mdiAdd(props) {
  return /* @__PURE__ */ jsx("svg", __spreadProps(__spreadValues({
    width: "1.2em",
    height: "1.2em",
    preserveAspectRatio: "xMidYMid meet",
    viewBox: "0 0 24 24"
  }, props), {
    children: /* @__PURE__ */ jsx("path", {
      d: "M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z",
      fill: "currentColor"
    })
  }));
}
var style$1 = "";
const Slider2 = withAutoplay(AwesomeSlider);
const Carousel = ({
  config,
  pos
}) => {
  const {
    resources,
    showButton,
    showDot,
    iterationTime
  } = config;
  return /* @__PURE__ */ jsx("div", {
    style: {
      width: pos.w + "px",
      height: pos.h + "px"
    },
    children: /* @__PURE__ */ jsx(Slider2, {
      play: true,
      interval: iterationTime,
      fillParent: true,
      transitionDelay: 0,
      mobileTouch: true,
      buttons: showButton,
      bullets: showDot,
      children: resources.map(({
        href,
        text: text2,
        bgColor,
        color,
        img: img2,
        fontSize
      }, i2) => /* @__PURE__ */ jsx("div", {
        style: {
          width: "100%",
          height: "100%"
        },
        children: /* @__PURE__ */ jsx("a", {
          target: "_blank",
          href,
          style: {
            width: pos.w + "px",
            height: pos.h + "px",
            textDecoration: "none",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize,
            backgroundColor: bgColor,
            color,
            backgroundImage: `url(${img2})`,
            backgroundSize: "cover",
            backgroundPosition: "center"
          },
          children: /* @__PURE__ */ jsx("div", {
            children: text2
          })
        }, i2)
      }, i2))
    })
  });
};
const Configure = ({
  widgetConfig,
  dispatchConfig
}) => {
  const {
    config
  } = widgetConfig;
  const {
    resources
  } = config;
  return /* @__PURE__ */ jsxs("div", {
    children: [resources.map(({
      color,
      bgColor,
      text: text2,
      href,
      fontSize,
      img: img2
    }, i2) => {
      color = color || "#000";
      bgColor = bgColor || "#fff";
      return /* @__PURE__ */ jsxs("div", {
        className: "v-carousel-item",
        children: [/* @__PURE__ */ jsxs("div", {
          className: "v-carousel-title",
          style: {
            display: "flex",
            alignItems: "center"
          },
          children: ["\u7B2C", i2 + 1, "\u9875", /* @__PURE__ */ jsx("span", {
            className: "v-carousel-del-btn",
            children: /* @__PURE__ */ jsx(mdiDelete, {
              style: {
                fontSize: "1.3em",
                cursor: "pointer"
              },
              onClick: () => {
                dispatchConfig(fn(widgetConfig, (it) => {
                  it.config.resources.splice(i2, 1);
                }));
              }
            })
          })]
        }), /* @__PURE__ */ jsx("div", {
          className: "v-carousel-content",
          children: /* @__PURE__ */ jsxs(Grid$1, {
            container: true,
            children: [/* @__PURE__ */ jsx(Grid$1, {
              item: true,
              xs: 6,
              children: "\u94FE\u63A5"
            }), /* @__PURE__ */ jsx(Grid$1, {
              item: true,
              xs: 6,
              children: /* @__PURE__ */ jsx(Input$1, {
                value: href,
                onChange: (e2) => {
                  dispatchConfig(fn(widgetConfig, (it) => {
                    it.config.resources[i2].href = e2.target.value;
                  }));
                }
              })
            }), /* @__PURE__ */ jsx(Grid$1, {
              item: true,
              xs: 6,
              children: "\u6587\u5B57\u5185\u5BB9"
            }), /* @__PURE__ */ jsx(Grid$1, {
              item: true,
              xs: 6,
              children: /* @__PURE__ */ jsx(Input$1, {
                value: text2,
                onChange: (e2) => {
                  dispatchConfig(fn(widgetConfig, (it) => {
                    it.config.resources[i2].text = e2.target.value;
                  }));
                }
              })
            }), /* @__PURE__ */ jsx(Grid$1, {
              item: true,
              xs: 6,
              children: "\u5B57\u4F53\u5927\u5C0F"
            }), /* @__PURE__ */ jsx(Grid$1, {
              item: true,
              xs: 6,
              children: /* @__PURE__ */ jsx(Input$1, {
                value: fontSize,
                onChange: (e2) => {
                  dispatchConfig(fn(widgetConfig, (it) => {
                    it.config.resources[i2].fontSize = e2.target.value;
                  }));
                }
              })
            }), /* @__PURE__ */ jsx(Grid$1, {
              item: true,
              xs: 6,
              children: "\u80CC\u666F\u56FE\u7247"
            }), /* @__PURE__ */ jsx(Grid$1, {
              item: true,
              xs: 6,
              children: /* @__PURE__ */ jsx(Input$1, {
                value: img2,
                onChange: (e2) => {
                  dispatchConfig(fn(widgetConfig, (it) => {
                    it.config.resources[i2].img = e2.target.value;
                  }));
                }
              })
            }), /* @__PURE__ */ jsx(Grid$1, {
              item: true,
              xs: 6,
              children: "\u6587\u672C\u989C\u8272"
            }), /* @__PURE__ */ jsx(Grid$1, {
              item: true,
              xs: 6,
              children: /* @__PURE__ */ jsx(ColorPicker, {
                color,
                onChangeComplete: (color2) => {
                  dispatchConfig(fn(widgetConfig, (it) => {
                    it.config.resources[i2].color = color2;
                  }));
                }
              })
            }), /* @__PURE__ */ jsx(Grid$1, {
              item: true,
              xs: 6,
              children: "\u80CC\u666F\u8272"
            }), /* @__PURE__ */ jsx(Grid$1, {
              item: true,
              xs: 6,
              children: /* @__PURE__ */ jsx(ColorPicker, {
                color: bgColor,
                onChangeComplete: (color2) => {
                  dispatchConfig(fn(widgetConfig, (it) => {
                    it.config.resources[i2].bgColor = color2;
                  }));
                }
              })
            })]
          })
        })]
      }, i2);
    }), /* @__PURE__ */ jsx(IconButton$1, {
      onClick: () => {
        dispatchConfig(fn(widgetConfig, (it) => {
          it.config.resources.push({
            text: `page ${it.config.resources.length + 1}`
          });
        }));
      },
      children: /* @__PURE__ */ jsx(mdiAdd, {})
    })]
  });
};
var carousel = createPkg(Carousel, {
  name: "@v-editor/carousel",
  showName: "\u8F6E\u64AD\u7EC4\u4EF6",
  description: "\u8F6E\u64AD\u56FEbanner\u7EC4\u4EF6",
  editorConfig: [
    {
      type: EditorTypes.Switch,
      name: "\u663E\u793A\u4E0B\u65B9\u63A7\u5236\u5706\u70B9",
      key: "showDot"
    },
    {
      type: EditorTypes.Switch,
      name: "\u663E\u793A\u5DE6\u53F3\u63A7\u5236\u7BAD\u5934",
      key: "showButton"
    },
    {
      type: EditorTypes.Number,
      name: "\u8F6C\u5230\u4E0B\u4E00\u9875\u6240\u9700\u65F6\u95F4",
      key: "iterationTime"
    }
  ],
  config: {
    showButton: true,
    showDot: true,
    iterationTime: 2e3,
    resources: [
      {
        text: "Page One",
        color: "#fff",
        bgColor: "#888"
      },
      {
        text: "Page Two",
        color: "#888",
        bgColor: "#fff"
      },
      {
        text: "Page Three",
        color: "#fff",
        bgColor: "#888"
      }
    ]
  }
}, Configure);
var style = "";
const presetsWidgets = {
  img,
  rectangle,
  svg,
  text,
  routerLink,
  carousel
};
export { EditorTypes, EventEmitter, WidgetsCenter, checkIfValidRenderConfig, createPkg, defaultDescription, normalizePos, presetsWidgets, sureStrToRenderConfig };
