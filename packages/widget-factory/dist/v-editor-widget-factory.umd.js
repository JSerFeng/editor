!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t(require("react"),require("visible-editor")):"function"==typeof define&&define.amd?define(["react","visible-editor"],t):(e="undefined"!=typeof globalThis?globalThis:e||self)["custom-widget"]=t(e.require$$0,e.visibleEditor)}(this,(function(e,t){"use strict";function r(e){return e&&"object"==typeof e&&"default"in e?e:{default:e}}var o=r(e),n={exports:{}},i={};Object.getOwnPropertySymbols,Object.prototype.hasOwnProperty,Object.prototype.propertyIsEnumerable;!function(){try{if(!Object.assign)return!1;var e=new String("abc");if(e[5]="de","5"===Object.getOwnPropertyNames(e)[0])return!1;for(var t={},r=0;r<10;r++)t["_"+String.fromCharCode(r)]=r;if("0123456789"!==Object.getOwnPropertyNames(t).map((function(e){return t[e]})).join(""))return!1;var o={};return"abcdefghijklmnopqrst".split("").forEach((function(e){o[e]=e})),"abcdefghijklmnopqrst"===Object.keys(Object.assign({},o)).join("")}catch(n){return!1}}()||Object.assign;
/** @license React v17.0.2
   * react-jsx-runtime.production.min.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */
var c=o.default,l=60103;if(i.Fragment=60107,"function"==typeof Symbol&&Symbol.for){var s=Symbol.for;l=s("react.element"),i.Fragment=s("react.fragment")}var f=c.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,a=Object.prototype.hasOwnProperty,p={key:!0,ref:!0,__self:!0,__source:!0};function y(e,t,r){var o,n={},i=null,c=null;for(o in void 0!==r&&(i=""+r),void 0!==t.key&&(i=""+t.key),void 0!==t.ref&&(c=t.ref),t)a.call(t,o)&&!p.hasOwnProperty(o)&&(n[o]=t[o]);if(e&&e.defaultProps)for(o in t=e.defaultProps)void 0===n[o]&&(n[o]=t[o]);return{$$typeof:l,type:e,key:i,ref:c,props:n,_owner:f.current}}i.jsx=y,i.jsxs=y,n.exports=i;const d=n.exports.jsx,u=n.exports.jsxs;var m=t.createPkg((({config:e})=>{const{customColor:t,content:r,title:o}=e;return u("div",{style:{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",width:"100%",height:"100%"},children:[d("h1",{color:t,children:o}),d("p",{children:r})]})}),{name:"custom-widget-1",showName:"自定义组件-1",description:"还未输入你的组件介绍",initPos:{x:0,y:0,w:200,h:200},editorConfig:[{type:t.EditorTypes.Color,name:"颜色",key:"titleColor"},{type:t.EditorTypes.Text,name:"标题内容",key:"title"},{type:t.EditorTypes.Text,name:"文章内容",key:"content"}],config:{titleColor:"blue",title:"我是标题",content:"我是内容"}});return[t.createPkg((({config:e})=>{const{customColor:t,content:r,title:o}=e;return u("div",{style:{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",width:"100%",height:"100%"},children:[d("h1",{color:t,children:o}),d("p",{children:r})]})}),{name:"custom-widget-2",showName:"自定义组件-2",description:"还未输入你的组件介绍",initPos:{x:0,y:0,w:200,h:200},editorConfig:[{type:t.EditorTypes.Color,name:"颜色",key:"titleColor"},{type:t.EditorTypes.Text,name:"标题内容",key:"title"},{type:t.EditorTypes.Text,name:"文章内容",key:"content"}],config:{titleColor:"blue",title:"我是标题",content:"我是内容"}}),m]}));