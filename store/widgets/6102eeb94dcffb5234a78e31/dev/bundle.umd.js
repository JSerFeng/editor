!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t(require("react"),require("@editor/editor")):"function"==typeof define&&define.amd?define(["react","@editor/editor"],t):(e="undefined"!=typeof globalThis?globalThis:e||self)["custom-widget"]=t(e.React,e.Editor)}(this,(function(e,t){"use strict";function r(e){return e&&"object"==typeof e&&"default"in e?e:{default:e}}var o=r(e),n={exports:{}},i={};Object.getOwnPropertySymbols,Object.prototype.hasOwnProperty,Object.prototype.propertyIsEnumerable;!function(){try{if(!Object.assign)return!1;var e=new String("abc");if(e[5]="de","5"===Object.getOwnPropertyNames(e)[0])return!1;for(var t={},r=0;r<10;r++)t["_"+String.fromCharCode(r)]=r;if("0123456789"!==Object.getOwnPropertyNames(t).map((function(e){return t[e]})).join(""))return!1;var o={};return"abcdefghijklmnopqrst".split("").forEach((function(e){o[e]=e})),"abcdefghijklmnopqrst"===Object.keys(Object.assign({},o)).join("")}catch(n){return!1}}()||Object.assign;
/** @license React v17.0.2
   * react-jsx-runtime.production.min.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */
var c=o.default,s=60103;if(i.Fragment=60107,"function"==typeof Symbol&&Symbol.for){var a=Symbol.for;s=a("react.element"),i.Fragment=a("react.fragment")}var f=c.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,l=Object.prototype.hasOwnProperty,u={key:!0,ref:!0,__self:!0,__source:!0};function p(e,t,r){var o,n={},i=null,c=null;for(o in void 0!==r&&(i=""+r),void 0!==t.key&&(i=""+t.key),void 0!==t.ref&&(c=t.ref),t)l.call(t,o)&&!u.hasOwnProperty(o)&&(n[o]=t[o]);if(e&&e.defaultProps)for(o in t=e.defaultProps)void 0===n[o]&&(n[o]=t[o]);return{$$typeof:s,type:e,key:i,ref:c,props:n,_owner:f.current}}i.jsx=p,i.jsxs=p,n.exports=i;const d=n.exports.jsx,y=n.exports.jsxs,m={name:"@editor/widget-factory",showName:"自定义组件",description:"我的组件介绍",snapShot:"",initPos:{w:200,h:200},editorConfig:[{type:"Color",name:"颜色",key:"customColor"},{type:Text,name:"标题内容",key:"title"},{type:Text,name:"文章内容",key:"content"}],config:{customColor:"blue",title:"我是标题",content:"我是E内容"},from:"custom"};var g=t.createPkg((({config:e})=>{const{customColor:t,content:r,title:o}=e;return y("div",{className:"widget-1",style:{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",width:"100%",height:"100%"},children:[d("h1",{color:t,children:o}),d("p",{children:r})]})}),m);return window.widgetsCenter.use(g),g}));
