import e from"react";import{createPkg as t}from"@editor/editor";var r={exports:{}},o={};Object.getOwnPropertySymbols,Object.prototype.hasOwnProperty,Object.prototype.propertyIsEnumerable;!function(){try{if(!Object.assign)return!1;var e=new String("abc");if(e[5]="de","5"===Object.getOwnPropertyNames(e)[0])return!1;for(var t={},r=0;r<10;r++)t["_"+String.fromCharCode(r)]=r;if("0123456789"!==Object.getOwnPropertyNames(t).map((function(e){return t[e]})).join(""))return!1;var o={};return"abcdefghijklmnopqrst".split("").forEach((function(e){o[e]=e})),"abcdefghijklmnopqrst"===Object.keys(Object.assign({},o)).join("")}catch(n){return!1}}()||Object.assign;
/** @license React v17.0.2
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var n=e,i=60103;if(o.Fragment=60107,"function"==typeof Symbol&&Symbol.for){var c=Symbol.for;i=c("react.element"),o.Fragment=c("react.fragment")}var s=n.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,a=Object.prototype.hasOwnProperty,f={key:!0,ref:!0,__self:!0,__source:!0};function p(e,t,r){var o,n={},c=null,p=null;for(o in void 0!==r&&(c=""+r),void 0!==t.key&&(c=""+t.key),void 0!==t.ref&&(p=t.ref),t)a.call(t,o)&&!f.hasOwnProperty(o)&&(n[o]=t[o]);if(e&&e.defaultProps)for(o in t=e.defaultProps)void 0===n[o]&&(n[o]=t[o]);return{$$typeof:i,type:e,key:c,ref:p,props:n,_owner:s.current}}o.jsx=p,o.jsxs=p,r.exports=o;const l=r.exports.jsx,y=r.exports.jsxs;var m=t((({config:e})=>{const{customColor:t,content:r,title:o}=e;return y("div",{className:"widget-1",style:{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",width:"100%",height:"100%"},children:[l("h1",{color:t,children:o}),l("p",{children:r})]})}),{name:"@editor/widget-factory",showName:"自定义组件",description:"这是一个组件示例",snapShot:"",initPos:{w:200,h:200},editorConfig:[{type:"Color",name:"颜色",key:"customColor"},{type:Text,name:"标题内容",key:"title"},{type:Text,name:"文章内容",key:"content"}],config:{customColor:"blue",title:"我是标题",content:"我是E内容"},from:"custom"});window.widgetsCenter.use(m);export default m;