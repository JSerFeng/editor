(function(global, factory) {
  typeof exports === "object" && typeof module !== "undefined" ? module.exports = factory(require("react"), require("@editor/editor")) : typeof define === "function" && define.amd ? define(["react", "@editor/editor"], factory) : (global = typeof globalThis !== "undefined" ? globalThis : global || self, global["custom-widget"] = factory(global.React, global.Editor));
})(this, function(require$$0, editor) {
  "use strict";
  function _interopDefaultLegacy(e) {
    return e && typeof e === "object" && "default" in e ? e : { "default": e };
  }
  var require$$0__default = /* @__PURE__ */ _interopDefaultLegacy(require$$0);
  var jsxRuntime = { exports: {} };
  var reactJsxRuntime_production_min = {};
  /*
  object-assign
  (c) Sindre Sorhus
  @license MIT
  */
  var getOwnPropertySymbols = Object.getOwnPropertySymbols;
  var hasOwnProperty = Object.prototype.hasOwnProperty;
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
      for (var i = 0; i < 10; i++) {
        test2["_" + String.fromCharCode(i)] = i;
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
    for (var s = 1; s < arguments.length; s++) {
      from = Object(arguments[s]);
      for (var key in from) {
        if (hasOwnProperty.call(from, key)) {
          to[key] = from[key];
        }
      }
      if (getOwnPropertySymbols) {
        symbols = getOwnPropertySymbols(from);
        for (var i = 0; i < symbols.length; i++) {
          if (propIsEnumerable.call(from, symbols[i])) {
            to[symbols[i]] = from[symbols[i]];
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
  var f = require$$0__default["default"], g = 60103;
  reactJsxRuntime_production_min.Fragment = 60107;
  if (typeof Symbol === "function" && Symbol.for) {
    var h = Symbol.for;
    g = h("react.element");
    reactJsxRuntime_production_min.Fragment = h("react.fragment");
  }
  var m = f.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, n = Object.prototype.hasOwnProperty, p = { key: true, ref: true, __self: true, __source: true };
  function q(c, a, k) {
    var b, d = {}, e = null, l = null;
    k !== void 0 && (e = "" + k);
    a.key !== void 0 && (e = "" + a.key);
    a.ref !== void 0 && (l = a.ref);
    for (b in a)
      n.call(a, b) && !p.hasOwnProperty(b) && (d[b] = a[b]);
    if (c && c.defaultProps)
      for (b in a = c.defaultProps, a)
        d[b] === void 0 && (d[b] = a[b]);
    return { $$typeof: g, type: c, key: e, ref: l, props: d, _owner: m.current };
  }
  reactJsxRuntime_production_min.jsx = q;
  reactJsxRuntime_production_min.jsxs = q;
  {
    jsxRuntime.exports = reactJsxRuntime_production_min;
  }
  const jsx = jsxRuntime.exports.jsx;
  const jsxs = jsxRuntime.exports.jsxs;
  const Widget = ({
    config
  }) => {
    const {
      customColor,
      content,
      title
    } = config;
    return /* @__PURE__ */ jsxs("div", {
      className: "widget-1",
      style: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100%"
      },
      children: [/* @__PURE__ */ jsx("h1", {
        color: customColor,
        children: title
      }), /* @__PURE__ */ jsx("p", {
        children: content
      })]
    });
  };
  var widget_1 = editor.createPkg(Widget, {
    name: "custom-widget-1",
    showName: "\u81EA\u5B9A\u4E49\u7EC4\u4EF6-1",
    description: "\u8FD8\u672A\u8F93\u5165\u4F60\u7684\u7EC4\u4EF6\u4ECB\u7ECD",
    initPos: {
      x: 0,
      y: 0,
      w: 200,
      h: 200
    },
    editorConfig: [{
      type: editor.EditorTypes.Color,
      name: "\u989C\u8272",
      key: "customColor"
    }, {
      type: editor.EditorTypes.Text,
      name: "\u6807\u9898\u5185\u5BB9",
      key: "title"
    }, {
      type: editor.EditorTypes.Text,
      name: "\u6587\u7AE0\u5185\u5BB9",
      key: "content"
    }],
    config: {
      "customColor": "blue",
      "title": "\u6211\u662F\u6807\u9898",
      "content": "\u6211\u662F\u5185\u5BB9"
    },
    from: "custom"
  });
  var style = ".widget-1 {\r\n	background-color: red;\r\n}\r\n\r\n.widget-2 {\r\n	background-color: red;\r\n}\r\n";
  window.widgetsCenter.use(widget_1);
  return widget_1;
});
