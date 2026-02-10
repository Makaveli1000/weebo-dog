var E_=Object.defineProperty,T_=Object.defineProperties;var b_=Object.getOwnPropertyDescriptors;var nd=Object.getOwnPropertySymbols;var A_=Object.prototype.hasOwnProperty,S_=Object.prototype.propertyIsEnumerable;var rd=(n,e,t)=>e in n?E_(n,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):n[e]=t,Qi=(n,e)=>{for(var t in e||(e={}))A_.call(e,t)&&rd(n,t,e[t]);if(nd)for(var t of nd(e))S_.call(e,t)&&rd(n,t,e[t]);return n},Xi=(n,e)=>T_(n,b_(e));var id=()=>{};var ad=function(n){let e=[],t=0;for(let r=0;r<n.length;r++){let i=n.charCodeAt(r);i<128?e[t++]=i:i<2048?(e[t++]=i>>6|192,e[t++]=i&63|128):(i&64512)===55296&&r+1<n.length&&(n.charCodeAt(r+1)&64512)===56320?(i=65536+((i&1023)<<10)+(n.charCodeAt(++r)&1023),e[t++]=i>>18|240,e[t++]=i>>12&63|128,e[t++]=i>>6&63|128,e[t++]=i&63|128):(e[t++]=i>>12|224,e[t++]=i>>6&63|128,e[t++]=i&63|128)}return e},R_=function(n){let e=[],t=0,r=0;for(;t<n.length;){let i=n[t++];if(i<128)e[r++]=String.fromCharCode(i);else if(i>191&&i<224){let s=n[t++];e[r++]=String.fromCharCode((i&31)<<6|s&63)}else if(i>239&&i<365){let s=n[t++],a=n[t++],c=n[t++],l=((i&7)<<18|(s&63)<<12|(a&63)<<6|c&63)-65536;e[r++]=String.fromCharCode(55296+(l>>10)),e[r++]=String.fromCharCode(56320+(l&1023))}else{let s=n[t++],a=n[t++];e[r++]=String.fromCharCode((i&15)<<12|(s&63)<<6|a&63)}}return e.join("")},cd={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(n,e){if(!Array.isArray(n))throw Error("encodeByteArray takes an array as a parameter");this.init_();let t=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,r=[];for(let i=0;i<n.length;i+=3){let s=n[i],a=i+1<n.length,c=a?n[i+1]:0,l=i+2<n.length,d=l?n[i+2]:0,p=s>>2,m=(s&3)<<4|c>>4,v=(c&15)<<2|d>>6,S=d&63;l||(S=64,a||(v=64)),r.push(t[p],t[m],t[v],t[S])}return r.join("")},encodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(n):this.encodeByteArray(ad(n),e)},decodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(n):R_(this.decodeStringToByteArray(n,e))},decodeStringToByteArray(n,e){this.init_();let t=e?this.charToByteMapWebSafe_:this.charToByteMap_,r=[];for(let i=0;i<n.length;){let s=t[n.charAt(i++)],c=i<n.length?t[n.charAt(i)]:0;++i;let d=i<n.length?t[n.charAt(i)]:64;++i;let m=i<n.length?t[n.charAt(i)]:64;if(++i,s==null||c==null||d==null||m==null)throw new ga;let v=s<<2|c>>4;if(r.push(v),d!==64){let S=c<<4&240|d>>2;if(r.push(S),m!==64){let P=d<<6&192|m;r.push(P)}}}return r},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let n=0;n<this.ENCODED_VALS.length;n++)this.byteToCharMap_[n]=this.ENCODED_VALS.charAt(n),this.charToByteMap_[this.byteToCharMap_[n]]=n,this.byteToCharMapWebSafe_[n]=this.ENCODED_VALS_WEBSAFE.charAt(n),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[n]]=n,n>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(n)]=n,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(n)]=n)}}},ga=class extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}},P_=function(n){let e=ad(n);return cd.encodeByteArray(e,!0)},Or=function(n){return P_(n).replace(/\./g,"")},Ji=function(n){try{return cd.decodeString(n,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};function ud(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}var C_=()=>ud().__FIREBASE_DEFAULTS__,k_=()=>{if(typeof process>"u"||typeof process.env>"u")return;let n=process.env.__FIREBASE_DEFAULTS__;if(n)return JSON.parse(n)},N_=()=>{if(typeof document>"u")return;let n;try{n=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch(t){return}let e=n&&Ji(n[1]);return e&&JSON.parse(e)},Zi=()=>{try{return id()||C_()||k_()||N_()}catch(n){console.info("Unable to get __FIREBASE_DEFAULTS__ due to: ".concat(n));return}},ya=n=>{var e,t;return(t=(e=Zi())===null||e===void 0?void 0:e.emulatorHosts)===null||t===void 0?void 0:t[n]},es=n=>{let e=ya(n);if(!e)return;let t=e.lastIndexOf(":");if(t<=0||t+1===e.length)throw new Error("Invalid host ".concat(e," with no separate hostname and port!"));let r=parseInt(e.substring(t+1),10);return e[0]==="["?[e.substring(1,t-1),r]:[e.substring(0,t),r]},va=()=>{var n;return(n=Zi())===null||n===void 0?void 0:n.config},Ia=n=>{var e;return(e=Zi())===null||e===void 0?void 0:e["_".concat(n)]};var Yi=class{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}wrapCallback(e){return(t,r)=>{t?this.reject(t):this.resolve(r),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(t):e(t,r))}}};function Be(n){try{return(n.startsWith("http://")||n.startsWith("https://")?new URL(n).hostname:n).endsWith(".cloudworkstations.dev")}catch(e){return!1}}async function Cn(n){return(await fetch(n,{credentials:"include"})).ok}function ts(n,e){if(n.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');let t={alg:"none",type:"JWT"},r=e||"demo-project",i=n.iat||0,s=n.sub||n.user_id;if(!s)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");let a=Object.assign({iss:"https://securetoken.google.com/".concat(r),aud:r,iat:i,exp:i+3600,auth_time:i,sub:s,user_id:s,firebase:{sign_in_provider:"custom",identities:{}}},n);return[Or(JSON.stringify(t)),Or(JSON.stringify(a)),""].join(".")}var Dr={};function D_(){let n={prod:[],emulator:[]};for(let e of Object.keys(Dr))Dr[e]?n.emulator.push(e):n.prod.push(e);return n}function O_(n){let e=document.getElementById(n),t=!1;return e||(e=document.createElement("div"),e.setAttribute("id",n),t=!0),{created:t,element:e}}var sd=!1;function kn(n,e){if(typeof window>"u"||typeof document>"u"||!Be(window.location.host)||Dr[n]===e||Dr[n]||sd)return;Dr[n]=e;function t(v){return"__firebase__banner__".concat(v)}let r="__firebase__banner",s=D_().prod.length>0;function a(){let v=document.getElementById(r);v&&v.remove()}function c(v){v.style.display="flex",v.style.background="#7faaf0",v.style.position="fixed",v.style.bottom="5px",v.style.left="5px",v.style.padding=".5em",v.style.borderRadius="5px",v.style.alignItems="center"}function l(v,S){v.setAttribute("width","24"),v.setAttribute("id",S),v.setAttribute("height","24"),v.setAttribute("viewBox","0 0 24 24"),v.setAttribute("fill","none"),v.style.marginLeft="-6px"}function d(){let v=document.createElement("span");return v.style.cursor="pointer",v.style.marginLeft="16px",v.style.fontSize="24px",v.innerHTML=" &times;",v.onclick=()=>{sd=!0,a()},v}function p(v,S){v.setAttribute("id",S),v.innerText="Learn more",v.href="https://firebase.google.com/docs/studio/preview-apps#preview-backend",v.setAttribute("target","__blank"),v.style.paddingLeft="5px",v.style.textDecoration="underline"}function m(){let v=O_(r),S=t("text"),P=document.getElementById(S)||document.createElement("span"),N=t("learnmore"),C=document.getElementById(N)||document.createElement("a"),U=t("preprendIcon"),M=document.getElementById(U)||document.createElementNS("http://www.w3.org/2000/svg","svg");if(v.created){let L=v.element;c(L),p(C,N);let q=d();l(M,U),L.append(M,P,C,q),document.body.appendChild(L)}s?(P.innerText="Preview backend disconnected.",M.innerHTML='<g clip-path="url(#clip0_6013_33858)">\n<path d="M4.8 17.6L12 5.6L19.2 17.6H4.8ZM6.91667 16.4H17.0833L12 7.93333L6.91667 16.4ZM12 15.6C12.1667 15.6 12.3056 15.5444 12.4167 15.4333C12.5389 15.3111 12.6 15.1667 12.6 15C12.6 14.8333 12.5389 14.6944 12.4167 14.5833C12.3056 14.4611 12.1667 14.4 12 14.4C11.8333 14.4 11.6889 14.4611 11.5667 14.5833C11.4556 14.6944 11.4 14.8333 11.4 15C11.4 15.1667 11.4556 15.3111 11.5667 15.4333C11.6889 15.5444 11.8333 15.6 12 15.6ZM11.4 13.6H12.6V10.4H11.4V13.6Z" fill="#212121"/>\n</g>\n<defs>\n<clipPath id="clip0_6013_33858">\n<rect width="24" height="24" fill="white"/>\n</clipPath>\n</defs>'):(M.innerHTML='<g clip-path="url(#clip0_6083_34804)">\n<path d="M11.4 15.2H12.6V11.2H11.4V15.2ZM12 10C12.1667 10 12.3056 9.94444 12.4167 9.83333C12.5389 9.71111 12.6 9.56667 12.6 9.4C12.6 9.23333 12.5389 9.09444 12.4167 8.98333C12.3056 8.86111 12.1667 8.8 12 8.8C11.8333 8.8 11.6889 8.86111 11.5667 8.98333C11.4556 9.09444 11.4 9.23333 11.4 9.4C11.4 9.56667 11.4556 9.71111 11.5667 9.83333C11.6889 9.94444 11.8333 10 12 10ZM12 18.4C11.1222 18.4 10.2944 18.2333 9.51667 17.9C8.73889 17.5667 8.05556 17.1111 7.46667 16.5333C6.88889 15.9444 6.43333 15.2611 6.1 14.4833C5.76667 13.7056 5.6 12.8778 5.6 12C5.6 11.1111 5.76667 10.2833 6.1 9.51667C6.43333 8.73889 6.88889 8.06111 7.46667 7.48333C8.05556 6.89444 8.73889 6.43333 9.51667 6.1C10.2944 5.76667 11.1222 5.6 12 5.6C12.8889 5.6 13.7167 5.76667 14.4833 6.1C15.2611 6.43333 15.9389 6.89444 16.5167 7.48333C17.1056 8.06111 17.5667 8.73889 17.9 9.51667C18.2333 10.2833 18.4 11.1111 18.4 12C18.4 12.8778 18.2333 13.7056 17.9 14.4833C17.5667 15.2611 17.1056 15.9444 16.5167 16.5333C15.9389 17.1111 15.2611 17.5667 14.4833 17.9C13.7167 18.2333 12.8889 18.4 12 18.4ZM12 17.2C13.4444 17.2 14.6722 16.6944 15.6833 15.6833C16.6944 14.6722 17.2 13.4444 17.2 12C17.2 10.5556 16.6944 9.32778 15.6833 8.31667C14.6722 7.30555 13.4444 6.8 12 6.8C10.5556 6.8 9.32778 7.30555 8.31667 8.31667C7.30556 9.32778 6.8 10.5556 6.8 12C6.8 13.4444 7.30556 14.6722 8.31667 15.6833C9.32778 16.6944 10.5556 17.2 12 17.2Z" fill="#212121"/>\n</g>\n<defs>\n<clipPath id="clip0_6083_34804">\n<rect width="24" height="24" fill="white"/>\n</clipPath>\n</defs>',P.innerText="Preview backend running in this workspace."),P.setAttribute("id",S)}document.readyState==="loading"?window.addEventListener("DOMContentLoaded",m):m()}function de(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function ld(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(de())}function x_(){var n;let e=(n=Zi())===null||n===void 0?void 0:n.forceEnvironment;if(e==="node")return!0;if(e==="browser")return!1;try{return Object.prototype.toString.call(global.process)==="[object process]"}catch(t){return!1}}function hd(){return typeof navigator<"u"&&navigator.userAgent==="Cloudflare-Workers"}function dd(){let n=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof n=="object"&&n.id!==void 0}function fd(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function pd(){let n=de();return n.indexOf("MSIE ")>=0||n.indexOf("Trident/")>=0}function md(){return!x_()&&!!navigator.userAgent&&navigator.userAgent.includes("Safari")&&!navigator.userAgent.includes("Chrome")}function wa(){try{return typeof indexedDB=="object"}catch(n){return!1}}function gd(){return new Promise((n,e)=>{try{let t=!0,r="validate-browser-context-for-indexeddb-analytics-module",i=self.indexedDB.open(r);i.onsuccess=()=>{i.result.close(),t||self.indexedDB.deleteDatabase(r),n(!0)},i.onupgradeneeded=()=>{t=!1},i.onerror=()=>{var s;e(((s=i.error)===null||s===void 0?void 0:s.message)||"")}}catch(t){e(t)}})}var V_="FirebaseError",Ce=class n extends Error{constructor(e,t,r){super(t),this.code=e,this.customData=r,this.name=V_,Object.setPrototypeOf(this,n.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,lt.prototype.create)}},lt=class{constructor(e,t,r){this.service=e,this.serviceName=t,this.errors=r}create(e,...t){let r=t[0]||{},i="".concat(this.service,"/").concat(e),s=this.errors[e],a=s?L_(s,r):"Error",c="".concat(this.serviceName,": ").concat(a," (").concat(i,").");return new Ce(i,c,r)}};function L_(n,e){return n.replace(M_,(t,r)=>{let i=e[r];return i!=null?String(i):"<".concat(r,"?>")})}var M_=/\{\$([^}]+)}/g;function _d(n){for(let e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}function We(n,e){if(n===e)return!0;let t=Object.keys(n),r=Object.keys(e);for(let i of t){if(!r.includes(i))return!1;let s=n[i],a=e[i];if(od(s)&&od(a)){if(!We(s,a))return!1}else if(s!==a)return!1}for(let i of r)if(!t.includes(i))return!1;return!0}function od(n){return n!==null&&typeof n=="object"}function Nn(n){let e=[];for(let[t,r]of Object.entries(n))Array.isArray(r)?r.forEach(i=>{e.push(encodeURIComponent(t)+"="+encodeURIComponent(i))}):e.push(encodeURIComponent(t)+"="+encodeURIComponent(r));return e.length?"&"+e.join("&"):""}function Dn(n){let e={};return n.replace(/^\?/,"").split("&").forEach(r=>{if(r){let[i,s]=r.split("=");e[decodeURIComponent(i)]=decodeURIComponent(s)}}),e}function On(n){let e=n.indexOf("?");if(!e)return"";let t=n.indexOf("#",e);return n.substring(e,t>0?t:void 0)}function yd(n,e){let t=new _a(n,e);return t.subscribe.bind(t)}var _a=class{constructor(e,t){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=t,this.task.then(()=>{e(this)}).catch(r=>{this.error(r)})}next(e){this.forEachObserver(t=>{t.next(e)})}error(e){this.forEachObserver(t=>{t.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,t,r){let i;if(e===void 0&&t===void 0&&r===void 0)throw new Error("Missing Observer.");F_(e,["next","error","complete"])?i=e:i={next:e,error:t,complete:r},i.next===void 0&&(i.next=ma),i.error===void 0&&(i.error=ma),i.complete===void 0&&(i.complete=ma);let s=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?i.error(this.finalError):i.complete()}catch(a){}}),this.observers.push(i),s}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let t=0;t<this.observers.length;t++)this.sendOne(t,e)}sendOne(e,t){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{t(this.observers[e])}catch(r){typeof console<"u"&&console.error&&console.error(r)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}};function F_(n,e){if(typeof n!="object"||n===null)return!1;for(let t of e)if(t in n&&typeof n[t]=="function")return!0;return!1}function ma(){}var ab=4*60*60*1e3;function ee(n){return n&&n._delegate?n._delegate:n}var ke=class{constructor(e,t,r){this.name=e,this.instanceFactory=t,this.type=r,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}};var Yt="[DEFAULT]";var Ea=class{constructor(e,t){this.name=e,this.container=t,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){let t=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(t)){let r=new Yi;if(this.instancesDeferred.set(t,r),this.isInitialized(t)||this.shouldAutoInitialize())try{let i=this.getOrInitializeService({instanceIdentifier:t});i&&r.resolve(i)}catch(i){}}return this.instancesDeferred.get(t).promise}getImmediate(e){var t;let r=this.normalizeInstanceIdentifier(e==null?void 0:e.identifier),i=(t=e==null?void 0:e.optional)!==null&&t!==void 0?t:!1;if(this.isInitialized(r)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:r})}catch(s){if(i)return null;throw s}else{if(i)return null;throw Error("Service ".concat(this.name," is not available"))}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error("Mismatching Component ".concat(e.name," for Provider ").concat(this.name,"."));if(this.component)throw Error("Component for ".concat(this.name," has already been provided"));if(this.component=e,!!this.shouldAutoInitialize()){if(B_(e))try{this.getOrInitializeService({instanceIdentifier:Yt})}catch(t){}for(let[t,r]of this.instancesDeferred.entries()){let i=this.normalizeInstanceIdentifier(t);try{let s=this.getOrInitializeService({instanceIdentifier:i});r.resolve(s)}catch(s){}}}}clearInstance(e=Yt){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){let e=Array.from(this.instances.values());await Promise.all([...e.filter(t=>"INTERNAL"in t).map(t=>t.INTERNAL.delete()),...e.filter(t=>"_delete"in t).map(t=>t._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=Yt){return this.instances.has(e)}getOptions(e=Yt){return this.instancesOptions.get(e)||{}}initialize(e={}){let{options:t={}}=e,r=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(r))throw Error("".concat(this.name,"(").concat(r,") has already been initialized"));if(!this.isComponentSet())throw Error("Component ".concat(this.name," has not been registered yet"));let i=this.getOrInitializeService({instanceIdentifier:r,options:t});for(let[s,a]of this.instancesDeferred.entries()){let c=this.normalizeInstanceIdentifier(s);r===c&&a.resolve(i)}return i}onInit(e,t){var r;let i=this.normalizeInstanceIdentifier(t),s=(r=this.onInitCallbacks.get(i))!==null&&r!==void 0?r:new Set;s.add(e),this.onInitCallbacks.set(i,s);let a=this.instances.get(i);return a&&e(a,i),()=>{s.delete(e)}}invokeOnInitCallbacks(e,t){let r=this.onInitCallbacks.get(t);if(r)for(let i of r)try{i(e,t)}catch(s){}}getOrInitializeService({instanceIdentifier:e,options:t={}}){let r=this.instances.get(e);if(!r&&this.component&&(r=this.component.instanceFactory(this.container,{instanceIdentifier:U_(e),options:t}),this.instances.set(e,r),this.instancesOptions.set(e,t),this.invokeOnInitCallbacks(r,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,r)}catch(i){}return r||null}normalizeInstanceIdentifier(e=Yt){return this.component?this.component.multipleInstances?e:Yt:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}};function U_(n){return n===Yt?void 0:n}function B_(n){return n.instantiationMode==="EAGER"}var ns=class{constructor(e){this.name=e,this.providers=new Map}addComponent(e){let t=this.getProvider(e.name);if(t.isComponentSet())throw new Error("Component ".concat(e.name," has already been registered with ").concat(this.name));t.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);let t=new Ea(e,this);return this.providers.set(e,t),t}getProviders(){return Array.from(this.providers.values())}};var q_=[],G;(function(n){n[n.DEBUG=0]="DEBUG",n[n.VERBOSE=1]="VERBOSE",n[n.INFO=2]="INFO",n[n.WARN=3]="WARN",n[n.ERROR=4]="ERROR",n[n.SILENT=5]="SILENT"})(G||(G={}));var j_={debug:G.DEBUG,verbose:G.VERBOSE,info:G.INFO,warn:G.WARN,error:G.ERROR,silent:G.SILENT},z_=G.INFO,$_={[G.DEBUG]:"log",[G.VERBOSE]:"log",[G.INFO]:"info",[G.WARN]:"warn",[G.ERROR]:"error"},G_=(n,e,...t)=>{if(e<n.logLevel)return;let r=new Date().toISOString(),i=$_[e];if(i)console[i]("[".concat(r,"]  ").concat(n.name,":"),...t);else throw new Error("Attempted to log a message with an invalid logType (value: ".concat(e,")"))},Nt=class{constructor(e){this.name=e,this._logLevel=z_,this._logHandler=G_,this._userLogHandler=null,q_.push(this)}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in G))throw new TypeError('Invalid value "'.concat(e,'" assigned to `logLevel`'));this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?j_[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,G.DEBUG,...e),this._logHandler(this,G.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,G.VERBOSE,...e),this._logHandler(this,G.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,G.INFO,...e),this._logHandler(this,G.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,G.WARN,...e),this._logHandler(this,G.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,G.ERROR,...e),this._logHandler(this,G.ERROR,...e)}};var H_=(n,e)=>e.some(t=>n instanceof t),vd,Id;function W_(){return vd||(vd=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function K_(){return Id||(Id=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}var wd=new WeakMap,ba=new WeakMap,Ed=new WeakMap,Ta=new WeakMap,Sa=new WeakMap;function Q_(n){let e=new Promise((t,r)=>{let i=()=>{n.removeEventListener("success",s),n.removeEventListener("error",a)},s=()=>{t(Ke(n.result)),i()},a=()=>{r(n.error),i()};n.addEventListener("success",s),n.addEventListener("error",a)});return e.then(t=>{t instanceof IDBCursor&&wd.set(t,n)}).catch(()=>{}),Sa.set(e,n),e}function X_(n){if(ba.has(n))return;let e=new Promise((t,r)=>{let i=()=>{n.removeEventListener("complete",s),n.removeEventListener("error",a),n.removeEventListener("abort",a)},s=()=>{t(),i()},a=()=>{r(n.error||new DOMException("AbortError","AbortError")),i()};n.addEventListener("complete",s),n.addEventListener("error",a),n.addEventListener("abort",a)});ba.set(n,e)}var Aa={get(n,e,t){if(n instanceof IDBTransaction){if(e==="done")return ba.get(n);if(e==="objectStoreNames")return n.objectStoreNames||Ed.get(n);if(e==="store")return t.objectStoreNames[1]?void 0:t.objectStore(t.objectStoreNames[0])}return Ke(n[e])},set(n,e,t){return n[e]=t,!0},has(n,e){return n instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in n}};function Td(n){Aa=n(Aa)}function Y_(n){return n===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...t){let r=n.call(rs(this),e,...t);return Ed.set(r,e.sort?e.sort():[e]),Ke(r)}:K_().includes(n)?function(...e){return n.apply(rs(this),e),Ke(wd.get(this))}:function(...e){return Ke(n.apply(rs(this),e))}}function J_(n){return typeof n=="function"?Y_(n):(n instanceof IDBTransaction&&X_(n),H_(n,W_())?new Proxy(n,Aa):n)}function Ke(n){if(n instanceof IDBRequest)return Q_(n);if(Ta.has(n))return Ta.get(n);let e=J_(n);return e!==n&&(Ta.set(n,e),Sa.set(e,n)),e}var rs=n=>Sa.get(n);function Ad(n,e,{blocked:t,upgrade:r,blocking:i,terminated:s}={}){let a=indexedDB.open(n,e),c=Ke(a);return r&&a.addEventListener("upgradeneeded",l=>{r(Ke(a.result),l.oldVersion,l.newVersion,Ke(a.transaction),l)}),t&&a.addEventListener("blocked",l=>t(l.oldVersion,l.newVersion,l)),c.then(l=>{s&&l.addEventListener("close",()=>s()),i&&l.addEventListener("versionchange",d=>i(d.oldVersion,d.newVersion,d))}).catch(()=>{}),c}var Z_=["get","getKey","getAll","getAllKeys","count"],ey=["put","add","delete","clear"],Ra=new Map;function bd(n,e){if(!(n instanceof IDBDatabase&&!(e in n)&&typeof e=="string"))return;if(Ra.get(e))return Ra.get(e);let t=e.replace(/FromIndex$/,""),r=e!==t,i=ey.includes(t);if(!(t in(r?IDBIndex:IDBObjectStore).prototype)||!(i||Z_.includes(t)))return;let s=async function(a,...c){let l=this.transaction(a,i?"readwrite":"readonly"),d=l.store;return r&&(d=d.index(c.shift())),(await Promise.all([d[t](...c),i&&l.done]))[0]};return Ra.set(e,s),s}Td(n=>Xi(Qi({},n),{get:(e,t,r)=>bd(e,t)||n.get(e,t,r),has:(e,t)=>!!bd(e,t)||n.has(e,t)}));var Ca=class{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(t=>{if(ty(t)){let r=t.getImmediate();return"".concat(r.library,"/").concat(r.version)}else return null}).filter(t=>t).join(" ")}};function ty(n){let e=n.getComponent();return(e==null?void 0:e.type)==="VERSION"}var ka="@firebase/app",Sd="0.13.2";var ht=new Nt("@firebase/app"),ny="@firebase/app-compat",ry="@firebase/analytics-compat",iy="@firebase/analytics",sy="@firebase/app-check-compat",oy="@firebase/app-check",ay="@firebase/auth",cy="@firebase/auth-compat",uy="@firebase/database",ly="@firebase/data-connect",hy="@firebase/database-compat",dy="@firebase/functions",fy="@firebase/functions-compat",py="@firebase/installations",my="@firebase/installations-compat",gy="@firebase/messaging",_y="@firebase/messaging-compat",yy="@firebase/performance",vy="@firebase/performance-compat",Iy="@firebase/remote-config",wy="@firebase/remote-config-compat",Ey="@firebase/storage",Ty="@firebase/storage-compat",by="@firebase/firestore",Ay="@firebase/ai",Sy="@firebase/firestore-compat",Ry="firebase",Py="11.10.0";var Na="[DEFAULT]",Cy={[ka]:"fire-core",[ny]:"fire-core-compat",[iy]:"fire-analytics",[ry]:"fire-analytics-compat",[oy]:"fire-app-check",[sy]:"fire-app-check-compat",[ay]:"fire-auth",[cy]:"fire-auth-compat",[uy]:"fire-rtdb",[ly]:"fire-data-connect",[hy]:"fire-rtdb-compat",[dy]:"fire-fn",[fy]:"fire-fn-compat",[py]:"fire-iid",[my]:"fire-iid-compat",[gy]:"fire-fcm",[_y]:"fire-fcm-compat",[yy]:"fire-perf",[vy]:"fire-perf-compat",[Iy]:"fire-rc",[wy]:"fire-rc-compat",[Ey]:"fire-gcs",[Ty]:"fire-gcs-compat",[by]:"fire-fst",[Sy]:"fire-fst-compat",[Ay]:"fire-vertex","fire-js":"fire-js",[Ry]:"fire-js-all"};var is=new Map,ky=new Map,Da=new Map;function Rd(n,e){try{n.container.addComponent(e)}catch(t){ht.debug("Component ".concat(e.name," failed to register with FirebaseApp ").concat(n.name),t)}}function Qe(n){let e=n.name;if(Da.has(e))return ht.debug("There were multiple attempts to register component ".concat(e,".")),!1;Da.set(e,n);for(let t of is.values())Rd(t,n);for(let t of ky.values())Rd(t,n);return!0}function Jt(n,e){let t=n.container.getProvider("heartbeat").getImmediate({optional:!0});return t&&t.triggerHeartbeat(),n.container.getProvider(e)}function Te(n){return n==null?!1:n.settings!==void 0}var Ny={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},Dt=new lt("app","Firebase",Ny);var Oa=class{constructor(e,t,r){this._isDeleted=!1,this._options=Object.assign({},e),this._config=Object.assign({},t),this._name=t.name,this._automaticDataCollectionEnabled=t.automaticDataCollectionEnabled,this._container=r,this.container.addComponent(new ke("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw Dt.create("app-deleted",{appName:this._name})}};var Xe=Py;function La(n,e={}){let t=n;typeof e!="object"&&(e={name:e});let r=Object.assign({name:Na,automaticDataCollectionEnabled:!0},e),i=r.name;if(typeof i!="string"||!i)throw Dt.create("bad-app-name",{appName:String(i)});if(t||(t=va()),!t)throw Dt.create("no-options");let s=is.get(i);if(s){if(We(t,s.options)&&We(r,s.config))return s;throw Dt.create("duplicate-app",{appName:i})}let a=new ns(i);for(let l of Da.values())a.addComponent(l);let c=new Oa(t,r,a);return is.set(i,c),c}function xn(n=Na){let e=is.get(n);if(!e&&n===Na&&va())return La();if(!e)throw Dt.create("no-app",{appName:n});return e}function Ne(n,e,t){var r;let i=(r=Cy[n])!==null&&r!==void 0?r:n;t&&(i+="-".concat(t));let s=i.match(/\s|\//),a=e.match(/\s|\//);if(s||a){let c=['Unable to register library "'.concat(i,'" with version "').concat(e,'":')];s&&c.push('library name "'.concat(i,'" contains illegal characters (whitespace or "/")')),s&&a&&c.push("and"),a&&c.push('version name "'.concat(e,'" contains illegal characters (whitespace or "/")')),ht.warn(c.join(" "));return}Qe(new ke("".concat(i,"-version"),()=>({library:i,version:e}),"VERSION"))}var Dy="firebase-heartbeat-database",Oy=1,xr="firebase-heartbeat-store",Pa=null;function Nd(){return Pa||(Pa=Ad(Dy,Oy,{upgrade:(n,e)=>{switch(e){case 0:try{n.createObjectStore(xr)}catch(t){console.warn(t)}}}}).catch(n=>{throw Dt.create("idb-open",{originalErrorMessage:n.message})})),Pa}async function xy(n){try{let t=(await Nd()).transaction(xr),r=await t.objectStore(xr).get(Dd(n));return await t.done,r}catch(e){if(e instanceof Ce)ht.warn(e.message);else{let t=Dt.create("idb-get",{originalErrorMessage:e==null?void 0:e.message});ht.warn(t.message)}}}async function Pd(n,e){try{let r=(await Nd()).transaction(xr,"readwrite");await r.objectStore(xr).put(e,Dd(n)),await r.done}catch(t){if(t instanceof Ce)ht.warn(t.message);else{let r=Dt.create("idb-set",{originalErrorMessage:t==null?void 0:t.message});ht.warn(r.message)}}}function Dd(n){return"".concat(n.name,"!").concat(n.options.appId)}var Vy=1024,Ly=30,xa=class{constructor(e){this.container=e,this._heartbeatsCache=null;let t=this.container.getProvider("app").getImmediate();this._storage=new Va(t),this._heartbeatsCachePromise=this._storage.read().then(r=>(this._heartbeatsCache=r,r))}async triggerHeartbeat(){var e,t;try{let i=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),s=Cd();if(((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,((t=this._heartbeatsCache)===null||t===void 0?void 0:t.heartbeats)==null)||this._heartbeatsCache.lastSentHeartbeatDate===s||this._heartbeatsCache.heartbeats.some(a=>a.date===s))return;if(this._heartbeatsCache.heartbeats.push({date:s,agent:i}),this._heartbeatsCache.heartbeats.length>Ly){let a=Fy(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(a,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(r){ht.warn(r)}}async getHeartbeatsHeader(){var e;try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";let t=Cd(),{heartbeatsToSend:r,unsentEntries:i}=My(this._heartbeatsCache.heartbeats),s=Or(JSON.stringify({version:2,heartbeats:r}));return this._heartbeatsCache.lastSentHeartbeatDate=t,i.length>0?(this._heartbeatsCache.heartbeats=i,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),s}catch(t){return ht.warn(t),""}}};function Cd(){return new Date().toISOString().substring(0,10)}function My(n,e=Vy){let t=[],r=n.slice();for(let i of n){let s=t.find(a=>a.agent===i.agent);if(s){if(s.dates.push(i.date),kd(t)>e){s.dates.pop();break}}else if(t.push({agent:i.agent,dates:[i.date]}),kd(t)>e){t.pop();break}r=r.slice(1)}return{heartbeatsToSend:t,unsentEntries:r}}var Va=class{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return wa()?gd().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){let t=await xy(this.app);return t!=null&&t.heartbeats?t:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){var t;if(await this._canUseIndexedDBPromise){let i=await this.read();return Pd(this.app,{lastSentHeartbeatDate:(t=e.lastSentHeartbeatDate)!==null&&t!==void 0?t:i.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){var t;if(await this._canUseIndexedDBPromise){let i=await this.read();return Pd(this.app,{lastSentHeartbeatDate:(t=e.lastSentHeartbeatDate)!==null&&t!==void 0?t:i.lastSentHeartbeatDate,heartbeats:[...i.heartbeats,...e.heartbeats]})}else return}};function kd(n){return Or(JSON.stringify({version:2,heartbeats:n})).length}function Fy(n){if(n.length===0)return-1;let e=0,t=n[0].date;for(let r=1;r<n.length;r++)n[r].date<t&&(t=n[r].date,e=r);return e}function Uy(n){Qe(new ke("platform-logger",e=>new Ca(e),"PRIVATE")),Qe(new ke("heartbeat",e=>new xa(e),"PRIVATE")),Ne(ka,Sd,n),Ne(ka,Sd,"esm2017"),Ne("fire-js","")}Uy("");var By="firebase",qy="11.10.0";Ne(By,qy,"app");function ss(n,e){var t={};for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&e.indexOf(r)<0&&(t[r]=n[r]);if(n!=null&&typeof Object.getOwnPropertySymbols=="function")for(var i=0,r=Object.getOwnPropertySymbols(n);i<r.length;i++)e.indexOf(r[i])<0&&Object.prototype.propertyIsEnumerable.call(n,r[i])&&(t[r[i]]=n[r[i]]);return t}function Yd(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}var Jd=Yd,Zd=new lt("auth","Firebase",Yd());var ds=new Nt("@firebase/auth");function jy(n,...e){ds.logLevel<=G.WARN&&ds.warn("Auth (".concat(Xe,"): ").concat(n),...e)}function as(n,...e){ds.logLevel<=G.ERROR&&ds.error("Auth (".concat(Xe,"): ").concat(n),...e)}function Le(n,...e){throw ac(n,...e)}function qe(n,...e){return ac(n,...e)}function oc(n,e,t){let r=Object.assign(Object.assign({},Jd()),{[e]:t});return new lt("auth","Firebase",r).create(e,{appName:n.name})}function Vt(n){return oc(n,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function zy(n,e,t){let r=t;if(!(e instanceof r))throw r.name!==e.constructor.name&&Le(n,"argument-error"),oc(n,"argument-error","Type of ".concat(e.constructor.name," does not match expected instance.")+"Did you pass a reference from a different Auth SDK?")}function ac(n,...e){if(typeof n!="string"){let t=e[0],r=[...e.slice(1)];return r[0]&&(r[0].appName=n.name),n._errorFactory.create(t,...r)}return Zd.create(n,...e)}function V(n,e,...t){if(!n)throw ac(e,...t)}function Ye(n){let e="INTERNAL ASSERTION FAILED: "+n;throw as(e),new Error(e)}function ft(n,e){n||Ye(e)}function ja(){var n;return typeof self<"u"&&((n=self.location)===null||n===void 0?void 0:n.href)||""}function $y(){return Od()==="http:"||Od()==="https:"}function Od(){var n;return typeof self<"u"&&((n=self.location)===null||n===void 0?void 0:n.protocol)||null}function Gy(){return typeof navigator<"u"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&($y()||dd()||"connection"in navigator)?navigator.onLine:!0}function Hy(){if(typeof navigator>"u")return null;let n=navigator;return n.languages&&n.languages[0]||n.language||null}var Zt=class{constructor(e,t){this.shortDelay=e,this.longDelay=t,ft(t>e,"Short delay should be less than long delay!"),this.isMobile=ld()||fd()}get(){return Gy()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}};function cc(n,e){ft(n.emulator,"Emulator should always be set here");let{url:t}=n.emulator;return e?"".concat(t).concat(e.startsWith("/")?e.slice(1):e):t}var fs=class{static initialize(e,t,r){this.fetchImpl=e,t&&(this.headersImpl=t),r&&(this.responseImpl=r)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<"u"&&"fetch"in self)return self.fetch;if(typeof globalThis<"u"&&globalThis.fetch)return globalThis.fetch;if(typeof fetch<"u")return fetch;Ye("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<"u"&&"Headers"in self)return self.Headers;if(typeof globalThis<"u"&&globalThis.Headers)return globalThis.Headers;if(typeof Headers<"u")return Headers;Ye("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<"u"&&"Response"in self)return self.Response;if(typeof globalThis<"u"&&globalThis.Response)return globalThis.Response;if(typeof Response<"u")return Response;Ye("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}};var Wy={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};var Ky=["/v1/accounts:signInWithCustomToken","/v1/accounts:signInWithEmailLink","/v1/accounts:signInWithIdp","/v1/accounts:signInWithPassword","/v1/accounts:signInWithPhoneNumber","/v1/token"],Qy=new Zt(3e4,6e4);function fe(n,e){return n.tenantId&&!e.tenantId?Object.assign(Object.assign({},e),{tenantId:n.tenantId}):e}async function be(n,e,t,r,i={}){return ef(n,i,async()=>{let s={},a={};r&&(e==="GET"?a=r:s={body:JSON.stringify(r)});let c=Nn(Object.assign({key:n.config.apiKey},a)).slice(1),l=await n._getAdditionalHeaders();l["Content-Type"]="application/json",n.languageCode&&(l["X-Firebase-Locale"]=n.languageCode);let d=Object.assign({method:e,headers:l},s);return hd()||(d.referrerPolicy="no-referrer"),n.emulatorConfig&&Be(n.emulatorConfig.host)&&(d.credentials="include"),fs.fetch()(await tf(n,n.config.apiHost,t,c),d)})}async function ef(n,e,t){n._canInitEmulator=!1;let r=Object.assign(Object.assign({},Wy),e);try{let i=new za(n),s=await Promise.race([t(),i.promise]);i.clearNetworkTimeout();let a=await s.json();if("needConfirmation"in a)throw Lr(n,"account-exists-with-different-credential",a);if(s.ok&&!("errorMessage"in a))return a;{let c=s.ok?a.errorMessage:a.error.message,[l,d]=c.split(" : ");if(l==="FEDERATED_USER_ID_ALREADY_LINKED")throw Lr(n,"credential-already-in-use",a);if(l==="EMAIL_EXISTS")throw Lr(n,"email-already-in-use",a);if(l==="USER_DISABLED")throw Lr(n,"user-disabled",a);let p=r[l]||l.toLowerCase().replace(/[_\s]+/g,"-");if(d)throw oc(n,p,d);Le(n,p)}}catch(i){if(i instanceof Ce)throw i;Le(n,"network-request-failed",{message:String(i)})}}async function an(n,e,t,r,i={}){let s=await be(n,e,t,r,i);return"mfaPendingCredential"in s&&Le(n,"multi-factor-auth-required",{_serverResponse:s}),s}async function tf(n,e,t,r){let i="".concat(e).concat(t,"?").concat(r),s=n,a=s.config.emulator?cc(n.config,i):"".concat(n.config.apiScheme,"://").concat(i);return Ky.includes(t)&&(await s._persistenceManagerAvailable,s._getPersistenceType()==="COOKIE")?s._getPersistence()._getFinalTarget(a).toString():a}function Xy(n){switch(n){case"ENFORCE":return"ENFORCE";case"AUDIT":return"AUDIT";case"OFF":return"OFF";default:return"ENFORCEMENT_STATE_UNSPECIFIED"}}var za=class{clearNetworkTimeout(){clearTimeout(this.timer)}constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((t,r)=>{this.timer=setTimeout(()=>r(qe(this.auth,"network-request-failed")),Qy.get())})}};function Lr(n,e,t){let r={appName:n.name};t.email&&(r.email=t.email),t.phoneNumber&&(r.phoneNumber=t.phoneNumber);let i=qe(n,e,r);return i.customData._tokenResponse=t,i}function xd(n){return n!==void 0&&n.enterprise!==void 0}var ps=class{constructor(e){if(this.siteKey="",this.recaptchaEnforcementState=[],e.recaptchaKey===void 0)throw new Error("recaptchaKey undefined");this.siteKey=e.recaptchaKey.split("/")[3],this.recaptchaEnforcementState=e.recaptchaEnforcementState}getProviderEnforcementState(e){if(!this.recaptchaEnforcementState||this.recaptchaEnforcementState.length===0)return null;for(let t of this.recaptchaEnforcementState)if(t.provider&&t.provider===e)return Xy(t.enforcementState);return null}isProviderEnabled(e){return this.getProviderEnforcementState(e)==="ENFORCE"||this.getProviderEnforcementState(e)==="AUDIT"}isAnyProviderEnabled(){return this.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")||this.isProviderEnabled("PHONE_PROVIDER")}};async function nf(n,e){return be(n,"GET","/v2/recaptchaConfig",fe(n,e))}async function Yy(n,e){return be(n,"POST","/v1/accounts:delete",e)}async function ms(n,e){return be(n,"POST","/v1/accounts:lookup",e)}function Mr(n){if(n)try{let e=new Date(Number(n));if(!isNaN(e.getTime()))return e.toUTCString()}catch(e){}}async function rf(n,e=!1){let t=ee(n),r=await t.getIdToken(e),i=uc(r);V(i&&i.exp&&i.auth_time&&i.iat,t.auth,"internal-error");let s=typeof i.firebase=="object"?i.firebase:void 0,a=s==null?void 0:s.sign_in_provider;return{claims:i,token:r,authTime:Mr(Ma(i.auth_time)),issuedAtTime:Mr(Ma(i.iat)),expirationTime:Mr(Ma(i.exp)),signInProvider:a||null,signInSecondFactor:(s==null?void 0:s.sign_in_second_factor)||null}}function Ma(n){return Number(n)*1e3}function uc(n){let[e,t,r]=n.split(".");if(e===void 0||t===void 0||r===void 0)return as("JWT malformed, contained fewer than 3 sections"),null;try{let i=Ji(t);return i?JSON.parse(i):(as("Failed to decode base64 JWT payload"),null)}catch(i){return as("Caught error parsing JWT payload as JSON",i==null?void 0:i.toString()),null}}function Vd(n){let e=uc(n);return V(e,"internal-error"),V(typeof e.exp<"u","internal-error"),V(typeof e.iat<"u","internal-error"),Number(e.exp)-Number(e.iat)}async function qr(n,e,t=!1){if(t)return e;try{return await e}catch(r){throw r instanceof Ce&&Jy(r)&&n.auth.currentUser===n&&await n.auth.signOut(),r}}function Jy({code:n}){return n==="auth/user-disabled"||n==="auth/user-token-expired"}var $a=class{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){var t;if(e){let r=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),r}else{this.errorBackoff=3e4;let i=((t=this.user.stsTokenManager.expirationTime)!==null&&t!==void 0?t:0)-Date.now()-3e5;return Math.max(0,i)}}schedule(e=!1){if(!this.isRunning)return;let t=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},t)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){(e==null?void 0:e.code)==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}};var jr=class{constructor(e,t){this.createdAt=e,this.lastLoginAt=t,this._initializeTime()}_initializeTime(){this.lastSignInTime=Mr(this.lastLoginAt),this.creationTime=Mr(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}};async function gs(n){var e;let t=n.auth,r=await n.getIdToken(),i=await qr(n,ms(t,{idToken:r}));V(i==null?void 0:i.users.length,t,"internal-error");let s=i.users[0];n._notifyReloadListener(s);let a=!((e=s.providerUserInfo)===null||e===void 0)&&e.length?of(s.providerUserInfo):[],c=Zy(n.providerData,a),l=n.isAnonymous,d=!(n.email&&s.passwordHash)&&!(c!=null&&c.length),p=l?d:!1,m={uid:s.localId,displayName:s.displayName||null,photoURL:s.photoUrl||null,email:s.email||null,emailVerified:s.emailVerified||!1,phoneNumber:s.phoneNumber||null,tenantId:s.tenantId||null,providerData:c,metadata:new jr(s.createdAt,s.lastLoginAt),isAnonymous:p};Object.assign(n,m)}async function sf(n){let e=ee(n);await gs(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function Zy(n,e){return[...n.filter(r=>!e.some(i=>i.providerId===r.providerId)),...e]}function of(n){return n.map(e=>{var{providerId:t}=e,r=ss(e,["providerId"]);return{providerId:t,uid:r.rawId||"",displayName:r.displayName||null,email:r.email||null,phoneNumber:r.phoneNumber||null,photoURL:r.photoUrl||null}})}async function ev(n,e){let t=await ef(n,{},async()=>{let r=Nn({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:i,apiKey:s}=n.config,a=await tf(n,i,"/v1/token","key=".concat(s)),c=await n._getAdditionalHeaders();c["Content-Type"]="application/x-www-form-urlencoded";let l={method:"POST",headers:c,body:r};return n.emulatorConfig&&Be(n.emulatorConfig.host)&&(l.credentials="include"),fs.fetch()(a,l)});return{accessToken:t.access_token,expiresIn:t.expires_in,refreshToken:t.refresh_token}}async function tv(n,e){return be(n,"POST","/v2/accounts:revokeToken",fe(n,e))}var Fr=class n{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){V(e.idToken,"internal-error"),V(typeof e.idToken<"u","internal-error"),V(typeof e.refreshToken<"u","internal-error");let t="expiresIn"in e&&typeof e.expiresIn<"u"?Number(e.expiresIn):Vd(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,t)}updateFromIdToken(e){V(e.length!==0,"internal-error");let t=Vd(e);this.updateTokensAndExpiration(e,null,t)}async getToken(e,t=!1){return!t&&this.accessToken&&!this.isExpired?this.accessToken:(V(this.refreshToken,e,"user-token-expired"),this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null)}clearRefreshToken(){this.refreshToken=null}async refresh(e,t){let{accessToken:r,refreshToken:i,expiresIn:s}=await ev(e,t);this.updateTokensAndExpiration(r,i,Number(s))}updateTokensAndExpiration(e,t,r){this.refreshToken=t||null,this.accessToken=e||null,this.expirationTime=Date.now()+r*1e3}static fromJSON(e,t){let{refreshToken:r,accessToken:i,expirationTime:s}=t,a=new n;return r&&(V(typeof r=="string","internal-error",{appName:e}),a.refreshToken=r),i&&(V(typeof i=="string","internal-error",{appName:e}),a.accessToken=i),s&&(V(typeof s=="number","internal-error",{appName:e}),a.expirationTime=s),a}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new n,this.toJSON())}_performRefresh(){return Ye("not implemented")}};function Ot(n,e){V(typeof n=="string"||typeof n>"u","internal-error",{appName:e})}var xt=class n{constructor(e){var{uid:t,auth:r,stsTokenManager:i}=e,s=ss(e,["uid","auth","stsTokenManager"]);this.providerId="firebase",this.proactiveRefresh=new $a(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=t,this.auth=r,this.stsTokenManager=i,this.accessToken=i.accessToken,this.displayName=s.displayName||null,this.email=s.email||null,this.emailVerified=s.emailVerified||!1,this.phoneNumber=s.phoneNumber||null,this.photoURL=s.photoURL||null,this.isAnonymous=s.isAnonymous||!1,this.tenantId=s.tenantId||null,this.providerData=s.providerData?[...s.providerData]:[],this.metadata=new jr(s.createdAt||void 0,s.lastLoginAt||void 0)}async getIdToken(e){let t=await qr(this,this.stsTokenManager.getToken(this.auth,e));return V(t,this.auth,"internal-error"),this.accessToken!==t&&(this.accessToken=t,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),t}getIdTokenResult(e){return rf(this,e)}reload(){return sf(this)}_assign(e){this!==e&&(V(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(t=>Object.assign({},t)),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){let t=new n(Object.assign(Object.assign({},this),{auth:e,stsTokenManager:this.stsTokenManager._clone()}));return t.metadata._copy(this.metadata),t}_onReload(e){V(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,t=!1){let r=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),r=!0),t&&await gs(this),await this.auth._persistUserIfCurrent(this),r&&this.auth._notifyListenersIfCurrent(this)}async delete(){if(Te(this.auth.app))return Promise.reject(Vt(this.auth));let e=await this.getIdToken();return await qr(this,Yy(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return Object.assign(Object.assign({uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>Object.assign({},e)),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId},this.metadata.toJSON()),{apiKey:this.auth.config.apiKey,appName:this.auth.name})}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,t){var r,i,s,a,c,l,d,p;let m=(r=t.displayName)!==null&&r!==void 0?r:void 0,v=(i=t.email)!==null&&i!==void 0?i:void 0,S=(s=t.phoneNumber)!==null&&s!==void 0?s:void 0,P=(a=t.photoURL)!==null&&a!==void 0?a:void 0,N=(c=t.tenantId)!==null&&c!==void 0?c:void 0,C=(l=t._redirectEventId)!==null&&l!==void 0?l:void 0,U=(d=t.createdAt)!==null&&d!==void 0?d:void 0,M=(p=t.lastLoginAt)!==null&&p!==void 0?p:void 0,{uid:L,emailVerified:q,isAnonymous:ie,providerData:H,stsTokenManager:w}=t;V(L&&w,e,"internal-error");let g=Fr.fromJSON(this.name,w);V(typeof L=="string",e,"internal-error"),Ot(m,e.name),Ot(v,e.name),V(typeof q=="boolean",e,"internal-error"),V(typeof ie=="boolean",e,"internal-error"),Ot(S,e.name),Ot(P,e.name),Ot(N,e.name),Ot(C,e.name),Ot(U,e.name),Ot(M,e.name);let _=new n({uid:L,auth:e,email:v,emailVerified:q,displayName:m,isAnonymous:ie,photoURL:P,phoneNumber:S,tenantId:N,stsTokenManager:g,createdAt:U,lastLoginAt:M});return H&&Array.isArray(H)&&(_.providerData=H.map(I=>Object.assign({},I))),C&&(_._redirectEventId=C),_}static async _fromIdTokenResponse(e,t,r=!1){let i=new Fr;i.updateFromServerResponse(t);let s=new n({uid:t.localId,auth:e,stsTokenManager:i,isAnonymous:r});return await gs(s),s}static async _fromGetAccountInfoResponse(e,t,r){let i=t.users[0];V(i.localId!==void 0,"internal-error");let s=i.providerUserInfo!==void 0?of(i.providerUserInfo):[],a=!(i.email&&i.passwordHash)&&!(s!=null&&s.length),c=new Fr;c.updateFromIdToken(r);let l=new n({uid:i.localId,auth:e,stsTokenManager:c,isAnonymous:a}),d={uid:i.localId,displayName:i.displayName||null,photoURL:i.photoUrl||null,email:i.email||null,emailVerified:i.emailVerified||!1,phoneNumber:i.phoneNumber||null,tenantId:i.tenantId||null,providerData:s,metadata:new jr(i.createdAt,i.lastLoginAt),isAnonymous:!(i.email&&i.passwordHash)&&!(s!=null&&s.length)};return Object.assign(l,d),l}};var Ld=new Map;function dt(n){ft(n instanceof Function,"Expected a class definition");let e=Ld.get(n);return e?(ft(e instanceof n,"Instance stored in cache mismatched with class"),e):(e=new n,Ld.set(n,e),e)}var _s=class{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,t){this.storage[e]=t}async _get(e){let t=this.storage[e];return t===void 0?null:t}async _remove(e){delete this.storage[e]}_addListener(e,t){}_removeListener(e,t){}};_s.type="NONE";var Ga=_s;function cs(n,e,t){return"firebase:".concat(n,":").concat(e,":").concat(t)}var ys=class n{constructor(e,t,r){this.persistence=e,this.auth=t,this.userKey=r;let{config:i,name:s}=this.auth;this.fullUserKey=cs(this.userKey,i.apiKey,s),this.fullPersistenceKey=cs("persistence",i.apiKey,s),this.boundEventHandler=t._onStorageEvent.bind(t),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){let e=await this.persistence._get(this.fullUserKey);if(!e)return null;if(typeof e=="string"){let t=await ms(this.auth,{idToken:e}).catch(()=>{});return t?xt._fromGetAccountInfoResponse(this.auth,t,e):null}return xt._fromJSON(this.auth,e)}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;let t=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,t)return this.setCurrentUser(t)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,t,r="authUser"){if(!t.length)return new n(dt(Ga),e,r);let i=(await Promise.all(t.map(async d=>{if(await d._isAvailable())return d}))).filter(d=>d),s=i[0]||dt(Ga),a=cs(r,e.config.apiKey,e.name),c=null;for(let d of t)try{let p=await d._get(a);if(p){let m;if(typeof p=="string"){let v=await ms(e,{idToken:p}).catch(()=>{});if(!v)break;m=await xt._fromGetAccountInfoResponse(e,v,p)}else m=xt._fromJSON(e,p);d!==s&&(c=m),s=d;break}}catch(p){}let l=i.filter(d=>d._shouldAllowMigration);return!s._shouldAllowMigration||!l.length?new n(s,e,r):(s=l[0],c&&await s._set(a,c.toJSON()),await Promise.all(t.map(async d=>{if(d!==s)try{await d._remove(a)}catch(p){}})),new n(s,e,r))}};function Md(n){let e=n.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(lf(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(af(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(df(e))return"Blackberry";if(ff(e))return"Webos";if(cf(e))return"Safari";if((e.includes("chrome/")||uf(e))&&!e.includes("edge/"))return"Chrome";if(hf(e))return"Android";{let t=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,r=n.match(t);if((r==null?void 0:r.length)===2)return r[1]}return"Other"}function af(n=de()){return/firefox\//i.test(n)}function cf(n=de()){let e=n.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function uf(n=de()){return/crios\//i.test(n)}function lf(n=de()){return/iemobile/i.test(n)}function hf(n=de()){return/android/i.test(n)}function df(n=de()){return/blackberry/i.test(n)}function ff(n=de()){return/webos/i.test(n)}function lc(n=de()){return/iphone|ipad|ipod/i.test(n)||/macintosh/i.test(n)&&/mobile/i.test(n)}function nv(n=de()){var e;return lc(n)&&!!(!((e=window.navigator)===null||e===void 0)&&e.standalone)}function rv(){return pd()&&document.documentMode===10}function pf(n=de()){return lc(n)||hf(n)||ff(n)||df(n)||/windows phone/i.test(n)||lf(n)}function mf(n,e=[]){let t;switch(n){case"Browser":t=Md(de());break;case"Worker":t="".concat(Md(de()),"-").concat(n);break;default:t=n}let r=e.length?e.join(","):"FirebaseCore-web";return"".concat(t,"/JsCore/").concat(Xe,"/").concat(r)}var Ha=class{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,t){let r=s=>new Promise((a,c)=>{try{let l=e(s);a(l)}catch(l){c(l)}});r.onAbort=t,this.queue.push(r);let i=this.queue.length-1;return()=>{this.queue[i]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;let t=[];try{for(let r of this.queue)await r(e),r.onAbort&&t.push(r.onAbort)}catch(r){t.reverse();for(let i of t)try{i()}catch(s){}throw this.auth._errorFactory.create("login-blocked",{originalMessage:r==null?void 0:r.message})}}};async function iv(n,e={}){return be(n,"GET","/v2/passwordPolicy",fe(n,e))}var sv=6,Wa=class{constructor(e){var t,r,i,s;let a=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=(t=a.minPasswordLength)!==null&&t!==void 0?t:sv,a.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=a.maxPasswordLength),a.containsLowercaseCharacter!==void 0&&(this.customStrengthOptions.containsLowercaseLetter=a.containsLowercaseCharacter),a.containsUppercaseCharacter!==void 0&&(this.customStrengthOptions.containsUppercaseLetter=a.containsUppercaseCharacter),a.containsNumericCharacter!==void 0&&(this.customStrengthOptions.containsNumericCharacter=a.containsNumericCharacter),a.containsNonAlphanumericCharacter!==void 0&&(this.customStrengthOptions.containsNonAlphanumericCharacter=a.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,this.enforcementState==="ENFORCEMENT_STATE_UNSPECIFIED"&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=(i=(r=e.allowedNonAlphanumericCharacters)===null||r===void 0?void 0:r.join(""))!==null&&i!==void 0?i:"",this.forceUpgradeOnSignin=(s=e.forceUpgradeOnSignin)!==null&&s!==void 0?s:!1,this.schemaVersion=e.schemaVersion}validatePassword(e){var t,r,i,s,a,c;let l={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,l),this.validatePasswordCharacterOptions(e,l),l.isValid&&(l.isValid=(t=l.meetsMinPasswordLength)!==null&&t!==void 0?t:!0),l.isValid&&(l.isValid=(r=l.meetsMaxPasswordLength)!==null&&r!==void 0?r:!0),l.isValid&&(l.isValid=(i=l.containsLowercaseLetter)!==null&&i!==void 0?i:!0),l.isValid&&(l.isValid=(s=l.containsUppercaseLetter)!==null&&s!==void 0?s:!0),l.isValid&&(l.isValid=(a=l.containsNumericCharacter)!==null&&a!==void 0?a:!0),l.isValid&&(l.isValid=(c=l.containsNonAlphanumericCharacter)!==null&&c!==void 0?c:!0),l}validatePasswordLengthOptions(e,t){let r=this.customStrengthOptions.minPasswordLength,i=this.customStrengthOptions.maxPasswordLength;r&&(t.meetsMinPasswordLength=e.length>=r),i&&(t.meetsMaxPasswordLength=e.length<=i)}validatePasswordCharacterOptions(e,t){this.updatePasswordCharacterOptionsStatuses(t,!1,!1,!1,!1);let r;for(let i=0;i<e.length;i++)r=e.charAt(i),this.updatePasswordCharacterOptionsStatuses(t,r>="a"&&r<="z",r>="A"&&r<="Z",r>="0"&&r<="9",this.allowedNonAlphanumericCharacters.includes(r))}updatePasswordCharacterOptionsStatuses(e,t,r,i,s){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||(e.containsLowercaseLetter=t)),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||(e.containsUppercaseLetter=r)),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||(e.containsNumericCharacter=i)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||(e.containsNonAlphanumericCharacter=s))}};var Ka=class{constructor(e,t,r,i){this.app=e,this.heartbeatServiceProvider=t,this.appCheckServiceProvider=r,this.config=i,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new vs(this),this.idTokenSubscription=new vs(this),this.beforeStateQueue=new Ha(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=Zd,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this._resolvePersistenceManagerAvailable=void 0,this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=i.sdkClientVersion,this._persistenceManagerAvailable=new Promise(s=>this._resolvePersistenceManagerAvailable=s)}_initializeWithPersistence(e,t){return t&&(this._popupRedirectResolver=dt(t)),this._initializationPromise=this.queue(async()=>{var r,i,s;if(!this._deleted&&(this.persistenceManager=await ys.create(this,e),(r=this._resolvePersistenceManagerAvailable)===null||r===void 0||r.call(this),!this._deleted)){if(!((i=this._popupRedirectResolver)===null||i===void 0)&&i._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch(a){}await this.initializeCurrentUser(t),this.lastNotifiedUid=((s=this.currentUser)===null||s===void 0?void 0:s.uid)||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;let e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUserFromIdToken(e){try{let t=await ms(this,{idToken:e}),r=await xt._fromGetAccountInfoResponse(this,t,e);await this.directlySetCurrentUser(r)}catch(t){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",t),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(e){var t;if(Te(this.app)){let a=this.app.settings.authIdToken;return a?new Promise(c=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(a).then(c,c))}):this.directlySetCurrentUser(null)}let r=await this.assertedPersistence.getCurrentUser(),i=r,s=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();let a=(t=this.redirectUser)===null||t===void 0?void 0:t._redirectEventId,c=i==null?void 0:i._redirectEventId,l=await this.tryRedirectSignIn(e);(!a||a===c)&&(l!=null&&l.user)&&(i=l.user,s=!0)}if(!i)return this.directlySetCurrentUser(null);if(!i._redirectEventId){if(s)try{await this.beforeStateQueue.runMiddleware(i)}catch(a){i=r,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(a))}return i?this.reloadAndSetCurrentUserOrClear(i):this.directlySetCurrentUser(null)}return V(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===i._redirectEventId?this.directlySetCurrentUser(i):this.reloadAndSetCurrentUserOrClear(i)}async tryRedirectSignIn(e){let t=null;try{t=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch(r){await this._setRedirectUser(null)}return t}async reloadAndSetCurrentUserOrClear(e){try{await gs(e)}catch(t){if((t==null?void 0:t.code)!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=Hy()}async _delete(){this._deleted=!0}async updateCurrentUser(e){if(Te(this.app))return Promise.reject(Vt(this));let t=e?ee(e):null;return t&&V(t.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(t&&t._clone(this))}async _updateCurrentUser(e,t=!1){if(!this._deleted)return e&&V(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),t||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return Te(this.app)?Promise.reject(Vt(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(e){return Te(this.app)?Promise.reject(Vt(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(dt(e))})}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();let t=this._getPasswordPolicyInternal();return t.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):t.validatePassword(e)}_getPasswordPolicyInternal(){return this.tenantId===null?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){let e=await iv(this),t=new Wa(e);this.tenantId===null?this._projectPasswordPolicy=t:this._tenantPasswordPolicies[this.tenantId]=t}_getPersistenceType(){return this.assertedPersistence.persistence.type}_getPersistence(){return this.assertedPersistence.persistence}_updateErrorMap(e){this._errorFactory=new lt("auth","Firebase",e())}onAuthStateChanged(e,t,r){return this.registerStateListener(this.authStateSubscription,e,t,r)}beforeAuthStateChanged(e,t){return this.beforeStateQueue.pushCallback(e,t)}onIdTokenChanged(e,t,r){return this.registerStateListener(this.idTokenSubscription,e,t,r)}authStateReady(){return new Promise((e,t)=>{if(this.currentUser)e();else{let r=this.onAuthStateChanged(()=>{r(),e()},t)}})}async revokeAccessToken(e){if(this.currentUser){let t=await this.currentUser.getIdToken(),r={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:e,idToken:t};this.tenantId!=null&&(r.tenantId=this.tenantId),await tv(this,r)}}toJSON(){var e;return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:(e=this._currentUser)===null||e===void 0?void 0:e.toJSON()}}async _setRedirectUser(e,t){let r=await this.getOrInitRedirectPersistenceManager(t);return e===null?r.removeCurrentUser():r.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){let t=e&&dt(e)||this._popupRedirectResolver;V(t,this,"argument-error"),this.redirectPersistenceManager=await ys.create(this,[dt(t._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){var t,r;return this._isInitialized&&await this.queue(async()=>{}),((t=this._currentUser)===null||t===void 0?void 0:t._redirectEventId)===e?this._currentUser:((r=this.redirectUser)===null||r===void 0?void 0:r._redirectEventId)===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return"".concat(this.config.authDomain,":").concat(this.config.apiKey,":").concat(this.name)}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){var e,t;if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);let r=(t=(e=this.currentUser)===null||e===void 0?void 0:e.uid)!==null&&t!==void 0?t:null;this.lastNotifiedUid!==r&&(this.lastNotifiedUid=r,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,t,r,i){if(this._deleted)return()=>{};let s=typeof t=="function"?t:t.next.bind(t),a=!1,c=this._isInitialized?Promise.resolve():this._initializationPromise;if(V(c,this,"internal-error"),c.then(()=>{a||s(this.currentUser)}),typeof t=="function"){let l=e.addObserver(t,r,i);return()=>{a=!0,l()}}else{let l=e.addObserver(t);return()=>{a=!0,l()}}}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return V(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=mf(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){var e;let t={"X-Client-Version":this.clientVersion};this.app.options.appId&&(t["X-Firebase-gmpid"]=this.app.options.appId);let r=await((e=this.heartbeatServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getHeartbeatsHeader());r&&(t["X-Firebase-Client"]=r);let i=await this._getAppCheckToken();return i&&(t["X-Firebase-AppCheck"]=i),t}async _getAppCheckToken(){var e;if(Te(this.app)&&this.app.settings.appCheckToken)return this.app.settings.appCheckToken;let t=await((e=this.appCheckServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getToken());return t!=null&&t.error&&jy("Error while retrieving App Check token: ".concat(t.error)),t==null?void 0:t.token}};function pt(n){return ee(n)}var vs=class{constructor(e){this.auth=e,this.observer=null,this.addObserver=yd(t=>this.observer=t)}get next(){return V(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}};var Ms={async loadJS(){throw new Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function ov(n){Ms=n}function gf(n){return Ms.loadJS(n)}function av(){return Ms.recaptchaEnterpriseScript}function cv(){return Ms.gapiScript}function _f(n){return"__".concat(n).concat(Math.floor(Math.random()*1e6))}var Qa=class{constructor(){this.enterprise=new Xa}ready(e){e()}execute(e,t){return Promise.resolve("token")}render(e,t){return""}},Xa=class{ready(e){e()}execute(e,t){return Promise.resolve("token")}render(e,t){return""}};var uv="recaptcha-enterprise",Ur="NO_RECAPTCHA",Is=class{constructor(e){this.type=uv,this.auth=pt(e)}async verify(e="verify",t=!1){async function r(s){if(!t){if(s.tenantId==null&&s._agentRecaptchaConfig!=null)return s._agentRecaptchaConfig.siteKey;if(s.tenantId!=null&&s._tenantRecaptchaConfigs[s.tenantId]!==void 0)return s._tenantRecaptchaConfigs[s.tenantId].siteKey}return new Promise(async(a,c)=>{nf(s,{clientType:"CLIENT_TYPE_WEB",version:"RECAPTCHA_ENTERPRISE"}).then(l=>{if(l.recaptchaKey===void 0)c(new Error("recaptcha Enterprise site key undefined"));else{let d=new ps(l);return s.tenantId==null?s._agentRecaptchaConfig=d:s._tenantRecaptchaConfigs[s.tenantId]=d,a(d.siteKey)}}).catch(l=>{c(l)})})}function i(s,a,c){let l=window.grecaptcha;xd(l)?l.enterprise.ready(()=>{l.enterprise.execute(s,{action:e}).then(d=>{a(d)}).catch(()=>{a(Ur)})}):c(Error("No reCAPTCHA enterprise script loaded."))}return this.auth.settings.appVerificationDisabledForTesting?new Qa().execute("siteKey",{action:"verify"}):new Promise((s,a)=>{r(this.auth).then(c=>{if(!t&&xd(window.grecaptcha))i(c,s,a);else{if(typeof window>"u"){a(new Error("RecaptchaVerifier is only supported in browser"));return}let l=av();l.length!==0&&(l+=c),gf(l).then(()=>{i(c,s,a)}).catch(d=>{a(d)})}}).catch(c=>{a(c)})})}};async function Vr(n,e,t,r=!1,i=!1){let s=new Is(n),a;if(i)a=Ur;else try{a=await s.verify(t)}catch(l){a=await s.verify(t,!0)}let c=Object.assign({},e);if(t==="mfaSmsEnrollment"||t==="mfaSmsSignIn"){if("phoneEnrollmentInfo"in c){let l=c.phoneEnrollmentInfo.phoneNumber,d=c.phoneEnrollmentInfo.recaptchaToken;Object.assign(c,{phoneEnrollmentInfo:{phoneNumber:l,recaptchaToken:d,captchaResponse:a,clientType:"CLIENT_TYPE_WEB",recaptchaVersion:"RECAPTCHA_ENTERPRISE"}})}else if("phoneSignInInfo"in c){let l=c.phoneSignInInfo.recaptchaToken;Object.assign(c,{phoneSignInInfo:{recaptchaToken:l,captchaResponse:a,clientType:"CLIENT_TYPE_WEB",recaptchaVersion:"RECAPTCHA_ENTERPRISE"}})}return c}return r?Object.assign(c,{captchaResp:a}):Object.assign(c,{captchaResponse:a}),Object.assign(c,{clientType:"CLIENT_TYPE_WEB"}),Object.assign(c,{recaptchaVersion:"RECAPTCHA_ENTERPRISE"}),c}async function Br(n,e,t,r,i){var s,a;if(i==="EMAIL_PASSWORD_PROVIDER")if(!((s=n._getRecaptchaConfig())===null||s===void 0)&&s.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")){let c=await Vr(n,e,t,t==="getOobCode");return r(n,c)}else return r(n,e).catch(async c=>{if(c.code==="auth/missing-recaptcha-token"){console.log("".concat(t," is protected by reCAPTCHA Enterprise for this project. Automatically triggering the reCAPTCHA flow and restarting the flow."));let l=await Vr(n,e,t,t==="getOobCode");return r(n,l)}else return Promise.reject(c)});else if(i==="PHONE_PROVIDER")if(!((a=n._getRecaptchaConfig())===null||a===void 0)&&a.isProviderEnabled("PHONE_PROVIDER")){let c=await Vr(n,e,t);return r(n,c).catch(async l=>{var d;if(((d=n._getRecaptchaConfig())===null||d===void 0?void 0:d.getProviderEnforcementState("PHONE_PROVIDER"))==="AUDIT"&&(l.code==="auth/missing-recaptcha-token"||l.code==="auth/invalid-app-credential")){console.log("Failed to verify with reCAPTCHA Enterprise. Automatically triggering the reCAPTCHA v2 flow to complete the ".concat(t," flow."));let p=await Vr(n,e,t,!1,!0);return r(n,p)}return Promise.reject(l)})}else{let c=await Vr(n,e,t,!1,!0);return r(n,c)}else return Promise.reject(i+" provider is not supported.")}async function lv(n){let e=pt(n),t=await nf(e,{clientType:"CLIENT_TYPE_WEB",version:"RECAPTCHA_ENTERPRISE"}),r=new ps(t);e.tenantId==null?e._agentRecaptchaConfig=r:e._tenantRecaptchaConfigs[e.tenantId]=r,r.isAnyProviderEnabled()&&new Is(e).verify()}function yf(n,e){let t=Jt(n,"auth");if(t.isInitialized()){let i=t.getImmediate(),s=t.getOptions();if(We(s,e!=null?e:{}))return i;Le(i,"already-initialized")}return t.initialize({options:e})}function hv(n,e){let t=(e==null?void 0:e.persistence)||[],r=(Array.isArray(t)?t:[t]).map(dt);e!=null&&e.errorMap&&n._updateErrorMap(e.errorMap),n._initializeWithPersistence(r,e==null?void 0:e.popupRedirectResolver)}function vf(n,e,t){let r=pt(n);V(/^https?:\/\//.test(e),r,"invalid-emulator-scheme");let i=!!(t!=null&&t.disableWarnings),s=If(e),{host:a,port:c}=dv(e),l=c===null?"":":".concat(c),d={url:"".concat(s,"//").concat(a).concat(l,"/")},p=Object.freeze({host:a,port:c,protocol:s.replace(":",""),options:Object.freeze({disableWarnings:i})});if(!r._canInitEmulator){V(r.config.emulator&&r.emulatorConfig,r,"emulator-config-failed"),V(We(d,r.config.emulator)&&We(p,r.emulatorConfig),r,"emulator-config-failed");return}r.config.emulator=d,r.emulatorConfig=p,r.settings.appVerificationDisabledForTesting=!0,Be(a)?(Cn("".concat(s,"//").concat(a).concat(l)),kn("Auth",!0)):i||fv()}function If(n){let e=n.indexOf(":");return e<0?"":n.substr(0,e+1)}function dv(n){let e=If(n),t=/(\/\/)?([^?#/]+)/.exec(n.substr(e.length));if(!t)return{host:"",port:null};let r=t[2].split("@").pop()||"",i=/^(\[[^\]]+\])(:|$)/.exec(r);if(i){let s=i[1];return{host:s,port:Fd(r.substr(s.length+1))}}else{let[s,a]=r.split(":");return{host:s,port:Fd(a)}}}function Fd(n){if(!n)return null;let e=Number(n);return isNaN(e)?null:e}function fv(){function n(){let e=document.createElement("p"),t=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",t.position="fixed",t.width="100%",t.backgroundColor="#ffffff",t.border=".1em solid #000000",t.color="#b50000",t.bottom="0px",t.left="0px",t.margin="0px",t.zIndex="10000",t.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}typeof console<"u"&&typeof console.info=="function"&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),typeof window<"u"&&typeof document<"u"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",n):n())}var en=class{constructor(e,t){this.providerId=e,this.signInMethod=t}toJSON(){return Ye("not implemented")}_getIdTokenResponse(e){return Ye("not implemented")}_linkToIdToken(e,t){return Ye("not implemented")}_getReauthenticationResolver(e){return Ye("not implemented")}};async function pv(n,e){return be(n,"POST","/v1/accounts:signUp",e)}async function mv(n,e){return an(n,"POST","/v1/accounts:signInWithPassword",fe(n,e))}async function gv(n,e){return an(n,"POST","/v1/accounts:signInWithEmailLink",fe(n,e))}async function _v(n,e){return an(n,"POST","/v1/accounts:signInWithEmailLink",fe(n,e))}var zr=class n extends en{constructor(e,t,r,i=null){super("password",r),this._email=e,this._password=t,this._tenantId=i}static _fromEmailAndPassword(e,t){return new n(e,t,"password")}static _fromEmailAndCode(e,t,r=null){return new n(e,t,"emailLink",r)}toJSON(){return{email:this._email,password:this._password,signInMethod:this.signInMethod,tenantId:this._tenantId}}static fromJSON(e){let t=typeof e=="string"?JSON.parse(e):e;if(t!=null&&t.email&&(t!=null&&t.password)){if(t.signInMethod==="password")return this._fromEmailAndPassword(t.email,t.password);if(t.signInMethod==="emailLink")return this._fromEmailAndCode(t.email,t.password,t.tenantId)}return null}async _getIdTokenResponse(e){switch(this.signInMethod){case"password":let t={returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return Br(e,t,"signInWithPassword",mv,"EMAIL_PASSWORD_PROVIDER");case"emailLink":return gv(e,{email:this._email,oobCode:this._password});default:Le(e,"internal-error")}}async _linkToIdToken(e,t){switch(this.signInMethod){case"password":let r={idToken:t,returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return Br(e,r,"signUpPassword",pv,"EMAIL_PASSWORD_PROVIDER");case"emailLink":return _v(e,{idToken:t,email:this._email,oobCode:this._password});default:Le(e,"internal-error")}}_getReauthenticationResolver(e){return this._getIdTokenResponse(e)}};async function Vn(n,e){return an(n,"POST","/v1/accounts:signInWithIdp",fe(n,e))}var yv="http://localhost",tn=class n extends en{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){let t=new n(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(t.idToken=e.idToken),e.accessToken&&(t.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(t.nonce=e.nonce),e.pendingToken&&(t.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(t.accessToken=e.oauthToken,t.secret=e.oauthTokenSecret):Le("argument-error"),t}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){let t=typeof e=="string"?JSON.parse(e):e,{providerId:r,signInMethod:i}=t,s=ss(t,["providerId","signInMethod"]);if(!r||!i)return null;let a=new n(r,i);return a.idToken=s.idToken||void 0,a.accessToken=s.accessToken||void 0,a.secret=s.secret,a.nonce=s.nonce,a.pendingToken=s.pendingToken||null,a}_getIdTokenResponse(e){let t=this.buildRequest();return Vn(e,t)}_linkToIdToken(e,t){let r=this.buildRequest();return r.idToken=t,Vn(e,r)}_getReauthenticationResolver(e){let t=this.buildRequest();return t.autoCreate=!1,Vn(e,t)}buildRequest(){let e={requestUri:yv,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{let t={};this.idToken&&(t.id_token=this.idToken),this.accessToken&&(t.access_token=this.accessToken),this.secret&&(t.oauth_token_secret=this.secret),t.providerId=this.providerId,this.nonce&&!this.pendingToken&&(t.nonce=this.nonce),e.postBody=Nn(t)}return e}};async function Ud(n,e){return be(n,"POST","/v1/accounts:sendVerificationCode",fe(n,e))}async function vv(n,e){return an(n,"POST","/v1/accounts:signInWithPhoneNumber",fe(n,e))}async function Iv(n,e){let t=await an(n,"POST","/v1/accounts:signInWithPhoneNumber",fe(n,e));if(t.temporaryProof)throw Lr(n,"account-exists-with-different-credential",t);return t}var wv={USER_NOT_FOUND:"user-not-found"};async function Ev(n,e){let t=Object.assign(Object.assign({},e),{operation:"REAUTH"});return an(n,"POST","/v1/accounts:signInWithPhoneNumber",fe(n,t),wv)}var $r=class n extends en{constructor(e){super("phone","phone"),this.params=e}static _fromVerification(e,t){return new n({verificationId:e,verificationCode:t})}static _fromTokenResponse(e,t){return new n({phoneNumber:e,temporaryProof:t})}_getIdTokenResponse(e){return vv(e,this._makeVerificationRequest())}_linkToIdToken(e,t){return Iv(e,Object.assign({idToken:t},this._makeVerificationRequest()))}_getReauthenticationResolver(e){return Ev(e,this._makeVerificationRequest())}_makeVerificationRequest(){let{temporaryProof:e,phoneNumber:t,verificationId:r,verificationCode:i}=this.params;return e&&t?{temporaryProof:e,phoneNumber:t}:{sessionInfo:r,code:i}}toJSON(){let e={providerId:this.providerId};return this.params.phoneNumber&&(e.phoneNumber=this.params.phoneNumber),this.params.temporaryProof&&(e.temporaryProof=this.params.temporaryProof),this.params.verificationCode&&(e.verificationCode=this.params.verificationCode),this.params.verificationId&&(e.verificationId=this.params.verificationId),e}static fromJSON(e){typeof e=="string"&&(e=JSON.parse(e));let{verificationId:t,verificationCode:r,phoneNumber:i,temporaryProof:s}=e;return!r&&!t&&!i&&!s?null:new n({verificationId:t,verificationCode:r,phoneNumber:i,temporaryProof:s})}};function Tv(n){switch(n){case"recoverEmail":return"RECOVER_EMAIL";case"resetPassword":return"PASSWORD_RESET";case"signIn":return"EMAIL_SIGNIN";case"verifyEmail":return"VERIFY_EMAIL";case"verifyAndChangeEmail":return"VERIFY_AND_CHANGE_EMAIL";case"revertSecondFactorAddition":return"REVERT_SECOND_FACTOR_ADDITION";default:return null}}function bv(n){let e=Dn(On(n)).link,t=e?Dn(On(e)).deep_link_id:null,r=Dn(On(n)).deep_link_id;return(r?Dn(On(r)).link:null)||r||t||e||n}var ws=class n{constructor(e){var t,r,i,s,a,c;let l=Dn(On(e)),d=(t=l.apiKey)!==null&&t!==void 0?t:null,p=(r=l.oobCode)!==null&&r!==void 0?r:null,m=Tv((i=l.mode)!==null&&i!==void 0?i:null);V(d&&p&&m,"argument-error"),this.apiKey=d,this.operation=m,this.code=p,this.continueUrl=(s=l.continueUrl)!==null&&s!==void 0?s:null,this.languageCode=(a=l.lang)!==null&&a!==void 0?a:null,this.tenantId=(c=l.tenantId)!==null&&c!==void 0?c:null}static parseLink(e){let t=bv(e);try{return new n(t)}catch(r){return null}}};var nn=class n{constructor(){this.providerId=n.PROVIDER_ID}static credential(e,t){return zr._fromEmailAndPassword(e,t)}static credentialWithLink(e,t){let r=ws.parseLink(t);return V(r,"argument-error"),zr._fromEmailAndCode(e,r.code,r.tenantId)}};nn.PROVIDER_ID="password";nn.EMAIL_PASSWORD_SIGN_IN_METHOD="password";nn.EMAIL_LINK_SIGN_IN_METHOD="emailLink";var Gr=class{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}};var rn=class extends Gr{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}};var Hr=class n extends rn{constructor(){super("facebook.com")}static credential(e){return tn._fromParams({providerId:n.PROVIDER_ID,signInMethod:n.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return n.credentialFromTaggedObject(e)}static credentialFromError(e){return n.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return n.credential(e.oauthAccessToken)}catch(t){return null}}};Hr.FACEBOOK_SIGN_IN_METHOD="facebook.com";Hr.PROVIDER_ID="facebook.com";var sn=class n extends rn{constructor(){super("google.com"),this.addScope("profile")}static credential(e,t){return tn._fromParams({providerId:n.PROVIDER_ID,signInMethod:n.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:t})}static credentialFromResult(e){return n.credentialFromTaggedObject(e)}static credentialFromError(e){return n.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;let{oauthIdToken:t,oauthAccessToken:r}=e;if(!t&&!r)return null;try{return n.credential(t,r)}catch(i){return null}}};sn.GOOGLE_SIGN_IN_METHOD="google.com";sn.PROVIDER_ID="google.com";var Wr=class n extends rn{constructor(){super("github.com")}static credential(e){return tn._fromParams({providerId:n.PROVIDER_ID,signInMethod:n.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return n.credentialFromTaggedObject(e)}static credentialFromError(e){return n.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return n.credential(e.oauthAccessToken)}catch(t){return null}}};Wr.GITHUB_SIGN_IN_METHOD="github.com";Wr.PROVIDER_ID="github.com";var Kr=class n extends rn{constructor(){super("twitter.com")}static credential(e,t){return tn._fromParams({providerId:n.PROVIDER_ID,signInMethod:n.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:t})}static credentialFromResult(e){return n.credentialFromTaggedObject(e)}static credentialFromError(e){return n.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;let{oauthAccessToken:t,oauthTokenSecret:r}=e;if(!t||!r)return null;try{return n.credential(t,r)}catch(i){return null}}};Kr.TWITTER_SIGN_IN_METHOD="twitter.com";Kr.PROVIDER_ID="twitter.com";var Qr=class n{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,t,r,i=!1){let s=await xt._fromIdTokenResponse(e,r,i),a=Bd(r);return new n({user:s,providerId:a,_tokenResponse:r,operationType:t})}static async _forOperation(e,t,r){await e._updateTokensIfNecessary(r,!0);let i=Bd(r);return new n({user:e,providerId:i,_tokenResponse:r,operationType:t})}};function Bd(n){return n.providerId?n.providerId:"phoneNumber"in n?"phone":null}var Ya=class n extends Ce{constructor(e,t,r,i){var s;super(t.code,t.message),this.operationType=r,this.user=i,Object.setPrototypeOf(this,n.prototype),this.customData={appName:e.name,tenantId:(s=e.tenantId)!==null&&s!==void 0?s:void 0,_serverResponse:t.customData._serverResponse,operationType:r}}static _fromErrorAndOperation(e,t,r,i){return new n(e,t,r,i)}};function wf(n,e,t,r){return(e==="reauthenticate"?t._getReauthenticationResolver(n):t._getIdTokenResponse(n)).catch(s=>{throw s.code==="auth/multi-factor-auth-required"?Ya._fromErrorAndOperation(n,s,e,r):s})}async function Av(n,e,t=!1){let r=await qr(n,e._linkToIdToken(n.auth,await n.getIdToken()),t);return Qr._forOperation(n,"link",r)}async function Sv(n,e,t=!1){let{auth:r}=n;if(Te(r.app))return Promise.reject(Vt(r));let i="reauthenticate";try{let s=await qr(n,wf(r,i,e,n),t);V(s.idToken,r,"internal-error");let a=uc(s.idToken);V(a,r,"internal-error");let{sub:c}=a;return V(n.uid===c,r,"user-mismatch"),Qr._forOperation(n,i,s)}catch(s){throw(s==null?void 0:s.code)==="auth/user-not-found"&&Le(r,"user-mismatch"),s}}async function Ef(n,e,t=!1){if(Te(n.app))return Promise.reject(Vt(n));let r="signIn",i=await wf(n,r,e),s=await Qr._fromIdTokenResponse(n,r,i);return t||await n._updateCurrentUser(s.user),s}async function Tf(n,e){return Ef(pt(n),e)}async function Rv(n){let e=pt(n);e._getPasswordPolicyInternal()&&await e._updatePasswordPolicy()}function hc(n,e,t){return Te(n.app)?Promise.reject(Vt(n)):Tf(ee(n),nn.credential(e,t)).catch(async r=>{throw r.code==="auth/password-does-not-meet-requirements"&&Rv(n),r})}function bf(n,e,t,r){return ee(n).onIdTokenChanged(e,t,r)}function Af(n,e,t){return ee(n).beforeAuthStateChanged(e,t)}function Fs(n,e,t,r){return ee(n).onAuthStateChanged(e,t,r)}function dc(n){return ee(n).signOut()}function qd(n,e){return be(n,"POST","/v2/accounts/mfaEnrollment:start",fe(n,e))}function Pv(n,e){return be(n,"POST","/v2/accounts/mfaEnrollment:finalize",fe(n,e))}function Cv(n,e){return be(n,"POST","/v2/accounts/mfaEnrollment:start",fe(n,e))}function kv(n,e){return be(n,"POST","/v2/accounts/mfaEnrollment:finalize",fe(n,e))}var Es="__sak";var Ts=class{constructor(e,t){this.storageRetriever=e,this.type=t}_isAvailable(){try{return this.storage?(this.storage.setItem(Es,"1"),this.storage.removeItem(Es),Promise.resolve(!0)):Promise.resolve(!1)}catch(e){return Promise.resolve(!1)}}_set(e,t){return this.storage.setItem(e,JSON.stringify(t)),Promise.resolve()}_get(e){let t=this.storage.getItem(e);return Promise.resolve(t?JSON.parse(t):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}};var Nv=1e3,Dv=10,bs=class extends Ts{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,t)=>this.onStorageEvent(e,t),this.listeners={},this.localCache={},this.pollTimer=null,this.fallbackToPolling=pf(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(let t of Object.keys(this.listeners)){let r=this.storage.getItem(t),i=this.localCache[t];r!==i&&e(t,i,r)}}onStorageEvent(e,t=!1){if(!e.key){this.forAllChangedKeys((a,c,l)=>{this.notifyListeners(a,l)});return}let r=e.key;t?this.detachListener():this.stopPolling();let i=()=>{let a=this.storage.getItem(r);!t&&this.localCache[r]===a||this.notifyListeners(r,a)},s=this.storage.getItem(r);rv()&&s!==e.newValue&&e.newValue!==e.oldValue?setTimeout(i,Dv):i()}notifyListeners(e,t){this.localCache[e]=t;let r=this.listeners[e];if(r)for(let i of Array.from(r))i(t&&JSON.parse(t))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,t,r)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:t,newValue:r}),!0)})},Nv)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,t){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(e,t){await super._set(e,t),this.localCache[e]=JSON.stringify(t)}async _get(e){let t=await super._get(e);return this.localCache[e]=JSON.stringify(t),t}async _remove(e){await super._remove(e),delete this.localCache[e]}};bs.type="LOCAL";var Sf=bs;var Ov=1e3;function Fa(n){var e,t;let r=n.replace(/[\\^$.*+?()[\]{}|]/g,"\\$&"),i=RegExp("".concat(r,"=([^;]+)"));return(t=(e=document.cookie.match(i))===null||e===void 0?void 0:e[1])!==null&&t!==void 0?t:null}function Ua(n){let e=window.location.protocol==="http:";return"".concat(e?"__dev_":"__HOST-","FIREBASE_").concat(n.split(":")[3])}var Ja=class{constructor(){this.type="COOKIE",this.listenerUnsubscribes=new Map}_getFinalTarget(e){if(typeof window===void 0)return e;let t=new URL("".concat(window.location.origin,"/__cookies__"));return t.searchParams.set("finalTarget",e),t}async _isAvailable(){var e;return typeof isSecureContext=="boolean"&&!isSecureContext||typeof navigator>"u"||typeof document>"u"?!1:(e=navigator.cookieEnabled)!==null&&e!==void 0?e:!0}async _set(e,t){}async _get(e){if(!this._isAvailable())return null;let t=Ua(e);if(window.cookieStore){let r=await window.cookieStore.get(t);return r==null?void 0:r.value}return Fa(t)}async _remove(e){if(!this._isAvailable()||!await this._get(e))return;let r=Ua(e);document.cookie="".concat(r,"=;Max-Age=34560000;Partitioned;Secure;SameSite=Strict;Path=/;Priority=High"),await fetch("/__cookies__",{method:"DELETE"}).catch(()=>{})}_addListener(e,t){if(!this._isAvailable())return;let r=Ua(e);if(window.cookieStore){let c=d=>{let p=d.changed.find(v=>v.name===r);p&&t(p.value),d.deleted.find(v=>v.name===r)&&t(null)},l=()=>window.cookieStore.removeEventListener("change",c);return this.listenerUnsubscribes.set(t,l),window.cookieStore.addEventListener("change",c)}let i=Fa(r),s=setInterval(()=>{let c=Fa(r);c!==i&&(t(c),i=c)},Ov),a=()=>clearInterval(s);this.listenerUnsubscribes.set(t,a)}_removeListener(e,t){let r=this.listenerUnsubscribes.get(t);r&&(r(),this.listenerUnsubscribes.delete(t))}};Ja.type="COOKIE";var As=class extends Ts{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,t){}_removeListener(e,t){}};As.type="SESSION";var fc=As;function xv(n){return Promise.all(n.map(async e=>{try{return{fulfilled:!0,value:await e}}catch(t){return{fulfilled:!1,reason:t}}}))}var Ss=class n{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){let t=this.receivers.find(i=>i.isListeningto(e));if(t)return t;let r=new n(e);return this.receivers.push(r),r}isListeningto(e){return this.eventTarget===e}async handleEvent(e){let t=e,{eventId:r,eventType:i,data:s}=t.data,a=this.handlersMap[i];if(!(a!=null&&a.size))return;t.ports[0].postMessage({status:"ack",eventId:r,eventType:i});let c=Array.from(a).map(async d=>d(t.origin,s)),l=await xv(c);t.ports[0].postMessage({status:"done",eventId:r,eventType:i,response:l})}_subscribe(e,t){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(t)}_unsubscribe(e,t){this.handlersMap[e]&&t&&this.handlersMap[e].delete(t),(!t||this.handlersMap[e].size===0)&&delete this.handlersMap[e],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}};Ss.receivers=[];function pc(n="",e=10){let t="";for(let r=0;r<e;r++)t+=Math.floor(Math.random()*10);return n+t}var Za=class{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,t,r=50){let i=typeof MessageChannel<"u"?new MessageChannel:null;if(!i)throw new Error("connection_unavailable");let s,a;return new Promise((c,l)=>{let d=pc("",20);i.port1.start();let p=setTimeout(()=>{l(new Error("unsupported_event"))},r);a={messageChannel:i,onMessage(m){let v=m;if(v.data.eventId===d)switch(v.data.status){case"ack":clearTimeout(p),s=setTimeout(()=>{l(new Error("timeout"))},3e3);break;case"done":clearTimeout(s),c(v.data.response);break;default:clearTimeout(p),clearTimeout(s),l(new Error("invalid_response"));break}}},this.handlers.add(a),i.port1.addEventListener("message",a.onMessage),this.target.postMessage({eventType:e,eventId:d,data:t},[i.port2])}).finally(()=>{a&&this.removeMessageHandler(a)})}};function Je(){return window}function Vv(n){Je().location.href=n}function Rf(){return typeof Je().WorkerGlobalScope<"u"&&typeof Je().importScripts=="function"}async function Lv(){if(!(navigator!=null&&navigator.serviceWorker))return null;try{return(await navigator.serviceWorker.ready).active}catch(n){return null}}function Mv(){var n;return((n=navigator==null?void 0:navigator.serviceWorker)===null||n===void 0?void 0:n.controller)||null}function Fv(){return Rf()?self:null}var Pf="firebaseLocalStorageDb",Uv=1,Rs="firebaseLocalStorage",Cf="fbase_key",on=class{constructor(e){this.request=e}toPromise(){return new Promise((e,t)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{t(this.request.error)})})}};function Us(n,e){return n.transaction([Rs],e?"readwrite":"readonly").objectStore(Rs)}function Bv(){let n=indexedDB.deleteDatabase(Pf);return new on(n).toPromise()}function ec(){let n=indexedDB.open(Pf,Uv);return new Promise((e,t)=>{n.addEventListener("error",()=>{t(n.error)}),n.addEventListener("upgradeneeded",()=>{let r=n.result;try{r.createObjectStore(Rs,{keyPath:Cf})}catch(i){t(i)}}),n.addEventListener("success",async()=>{let r=n.result;r.objectStoreNames.contains(Rs)?e(r):(r.close(),await Bv(),e(await ec()))})})}async function jd(n,e,t){let r=Us(n,!0).put({[Cf]:e,value:t});return new on(r).toPromise()}async function qv(n,e){let t=Us(n,!1).get(e),r=await new on(t).toPromise();return r===void 0?null:r.value}function zd(n,e){let t=Us(n,!0).delete(e);return new on(t).toPromise()}var jv=800,zv=3,Ps=class{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db?this.db:(this.db=await ec(),this.db)}async _withRetries(e){let t=0;for(;;)try{let r=await this._openDb();return await e(r)}catch(r){if(t++>zv)throw r;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return Rf()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=Ss._getInstance(Fv()),this.receiver._subscribe("keyChanged",async(e,t)=>({keyProcessed:(await this._poll()).includes(t.key)})),this.receiver._subscribe("ping",async(e,t)=>["keyChanged"])}async initializeSender(){var e,t;if(this.activeServiceWorker=await Lv(),!this.activeServiceWorker)return;this.sender=new Za(this.activeServiceWorker);let r=await this.sender._send("ping",{},800);r&&!((e=r[0])===null||e===void 0)&&e.fulfilled&&!((t=r[0])===null||t===void 0)&&t.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(!(!this.sender||!this.activeServiceWorker||Mv()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch(t){}}async _isAvailable(){try{if(!indexedDB)return!1;let e=await ec();return await jd(e,Es,"1"),await zd(e,Es),!0}catch(e){}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,t){return this._withPendingWrite(async()=>(await this._withRetries(r=>jd(r,e,t)),this.localCache[e]=t,this.notifyServiceWorker(e)))}async _get(e){let t=await this._withRetries(r=>qv(r,e));return this.localCache[e]=t,t}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(t=>zd(t,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){let e=await this._withRetries(i=>{let s=Us(i,!1).getAll();return new on(s).toPromise()});if(!e)return[];if(this.pendingWrites!==0)return[];let t=[],r=new Set;if(e.length!==0)for(let{fbase_key:i,value:s}of e)r.add(i),JSON.stringify(this.localCache[i])!==JSON.stringify(s)&&(this.notifyListeners(i,s),t.push(i));for(let i of Object.keys(this.localCache))this.localCache[i]&&!r.has(i)&&(this.notifyListeners(i,null),t.push(i));return t}notifyListeners(e,t){this.localCache[e]=t;let r=this.listeners[e];if(r)for(let i of Array.from(r))i(t)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),jv)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,t){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&this.stopPolling()}};Ps.type="LOCAL";var kf=Ps;function $d(n,e){return be(n,"POST","/v2/accounts/mfaSignIn:start",fe(n,e))}function $v(n,e){return be(n,"POST","/v2/accounts/mfaSignIn:finalize",fe(n,e))}function Gv(n,e){return be(n,"POST","/v2/accounts/mfaSignIn:finalize",fe(n,e))}var Lb=_f("rcb"),Mb=new Zt(3e4,6e4);var us="recaptcha";async function Hv(n,e,t){var r;if(!n._getRecaptchaConfig())try{await lv(n)}catch(i){console.log("Failed to initialize reCAPTCHA Enterprise config. Triggering the reCAPTCHA v2 verification.")}try{let i;if(typeof e=="string"?i={phoneNumber:e}:i=e,"session"in i){let s=i.session;if("phoneNumber"in i){V(s.type==="enroll",n,"internal-error");let a={idToken:s.credential,phoneEnrollmentInfo:{phoneNumber:i.phoneNumber,clientType:"CLIENT_TYPE_WEB"}};return(await Br(n,a,"mfaSmsEnrollment",async(p,m)=>{if(m.phoneEnrollmentInfo.captchaResponse===Ur){V((t==null?void 0:t.type)===us,p,"argument-error");let v=await Ba(p,m,t);return qd(p,v)}return qd(p,m)},"PHONE_PROVIDER").catch(p=>Promise.reject(p))).phoneSessionInfo.sessionInfo}else{V(s.type==="signin",n,"internal-error");let a=((r=i.multiFactorHint)===null||r===void 0?void 0:r.uid)||i.multiFactorUid;V(a,n,"missing-multi-factor-info");let c={mfaPendingCredential:s.credential,mfaEnrollmentId:a,phoneSignInInfo:{clientType:"CLIENT_TYPE_WEB"}};return(await Br(n,c,"mfaSmsSignIn",async(m,v)=>{if(v.phoneSignInInfo.captchaResponse===Ur){V((t==null?void 0:t.type)===us,m,"argument-error");let S=await Ba(m,v,t);return $d(m,S)}return $d(m,v)},"PHONE_PROVIDER").catch(m=>Promise.reject(m))).phoneResponseInfo.sessionInfo}}else{let s={phoneNumber:i.phoneNumber,clientType:"CLIENT_TYPE_WEB"};return(await Br(n,s,"sendVerificationCode",async(d,p)=>{if(p.captchaResponse===Ur){V((t==null?void 0:t.type)===us,d,"argument-error");let m=await Ba(d,p,t);return Ud(d,m)}return Ud(d,p)},"PHONE_PROVIDER").catch(d=>Promise.reject(d))).sessionInfo}}finally{t==null||t._reset()}}async function Ba(n,e,t){V(t.type===us,n,"argument-error");let r=await t.verify();V(typeof r=="string",n,"argument-error");let i=Object.assign({},e);if("phoneEnrollmentInfo"in i){let s=i.phoneEnrollmentInfo.phoneNumber,a=i.phoneEnrollmentInfo.captchaResponse,c=i.phoneEnrollmentInfo.clientType,l=i.phoneEnrollmentInfo.recaptchaVersion;return Object.assign(i,{phoneEnrollmentInfo:{phoneNumber:s,recaptchaToken:r,captchaResponse:a,clientType:c,recaptchaVersion:l}}),i}else if("phoneSignInInfo"in i){let s=i.phoneSignInInfo.captchaResponse,a=i.phoneSignInInfo.clientType,c=i.phoneSignInInfo.recaptchaVersion;return Object.assign(i,{phoneSignInInfo:{recaptchaToken:r,captchaResponse:s,clientType:a,recaptchaVersion:c}}),i}else return Object.assign(i,{recaptchaToken:r}),i}var Xr=class n{constructor(e){this.providerId=n.PROVIDER_ID,this.auth=pt(e)}verifyPhoneNumber(e,t){return Hv(this.auth,e,ee(t))}static credential(e,t){return $r._fromVerification(e,t)}static credentialFromResult(e){let t=e;return n.credentialFromTaggedObject(t)}static credentialFromError(e){return n.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;let{phoneNumber:t,temporaryProof:r}=e;return t&&r?$r._fromTokenResponse(t,r):null}};Xr.PROVIDER_ID="phone";Xr.PHONE_SIGN_IN_METHOD="phone";function Nf(n,e){return e?dt(e):(V(n._popupRedirectResolver,n,"argument-error"),n._popupRedirectResolver)}var Yr=class extends en{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return Vn(e,this._buildIdpRequest())}_linkToIdToken(e,t){return Vn(e,this._buildIdpRequest(t))}_getReauthenticationResolver(e){return Vn(e,this._buildIdpRequest())}_buildIdpRequest(e){let t={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(t.idToken=e),t}};function Wv(n){return Ef(n.auth,new Yr(n),n.bypassAuthState)}function Kv(n){let{auth:e,user:t}=n;return V(t,e,"internal-error"),Sv(t,new Yr(n),n.bypassAuthState)}async function Qv(n){let{auth:e,user:t}=n;return V(t,e,"internal-error"),Av(t,new Yr(n),n.bypassAuthState)}var Cs=class{constructor(e,t,r,i,s=!1){this.auth=e,this.resolver=r,this.user=i,this.bypassAuthState=s,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(t)?t:[t]}execute(){return new Promise(async(e,t)=>{this.pendingPromise={resolve:e,reject:t};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(r){this.reject(r)}})}async onAuthEvent(e){let{urlResponse:t,sessionId:r,postBody:i,tenantId:s,error:a,type:c}=e;if(a){this.reject(a);return}let l={auth:this.auth,requestUri:t,sessionId:r,tenantId:s||void 0,postBody:i||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(c)(l))}catch(d){this.reject(d)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return Wv;case"linkViaPopup":case"linkViaRedirect":return Qv;case"reauthViaPopup":case"reauthViaRedirect":return Kv;default:Le(this.auth,"internal-error")}}resolve(e){ft(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){ft(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}};var Xv=new Zt(2e3,1e4);async function mc(n,e,t){if(Te(n.app))return Promise.reject(qe(n,"operation-not-supported-in-this-environment"));let r=pt(n);zy(n,e,Gr);let i=Nf(r,t);return new ks(r,"signInViaPopup",e,i).executeNotNull()}var ks=class n extends Cs{constructor(e,t,r,i,s){super(e,t,i,s),this.provider=r,this.authWindow=null,this.pollId=null,n.currentPopupAction&&n.currentPopupAction.cancel(),n.currentPopupAction=this}async executeNotNull(){let e=await this.execute();return V(e,this.auth,"internal-error"),e}async onExecution(){ft(this.filter.length===1,"Popup operations only handle one event");let e=pc();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(t=>{this.reject(t)}),this.resolver._isIframeWebStorageSupported(this.auth,t=>{t||this.reject(qe(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){var e;return((e=this.authWindow)===null||e===void 0?void 0:e.associatedEvent)||null}cancel(){this.reject(qe(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,n.currentPopupAction=null}pollUserCancellation(){let e=()=>{var t,r;if(!((r=(t=this.authWindow)===null||t===void 0?void 0:t.window)===null||r===void 0)&&r.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(qe(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(e,Xv.get())};e()}};ks.currentPopupAction=null;var Yv="pendingRedirect",ls=new Map,tc=class extends Cs{constructor(e,t,r=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],t,void 0,r),this.eventId=null}async execute(){let e=ls.get(this.auth._key());if(!e){try{let r=await Jv(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(r)}catch(t){e=()=>Promise.reject(t)}ls.set(this.auth._key(),e)}return this.bypassAuthState||ls.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if(e.type==="signInViaRedirect")return super.onAuthEvent(e);if(e.type==="unknown"){this.resolve(null);return}if(e.eventId){let t=await this.auth._redirectUserForId(e.eventId);if(t)return this.user=t,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}};async function Jv(n,e){let t=tI(e),r=eI(n);if(!await r._isAvailable())return!1;let i=await r._get(t)==="true";return await r._remove(t),i}function Zv(n,e){ls.set(n._key(),e)}function eI(n){return dt(n._redirectPersistence)}function tI(n){return cs(Yv,n.config.apiKey,n.name)}async function nI(n,e,t=!1){if(Te(n.app))return Promise.reject(Vt(n));let r=pt(n),i=Nf(r,e),a=await new tc(r,i,t).execute();return a&&!t&&(delete a.user._redirectEventId,await r._persistUserIfCurrent(a.user),await r._setRedirectUser(null,e)),a}var rI=10*60*1e3,nc=class{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let t=!1;return this.consumers.forEach(r=>{this.isEventForConsumer(e,r)&&(t=!0,this.sendToConsumer(e,r),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!iI(e)||(this.hasHandledPotentialRedirect=!0,t||(this.queuedRedirectEvent=e,t=!0)),t}sendToConsumer(e,t){var r;if(e.error&&!Df(e)){let i=((r=e.error.code)===null||r===void 0?void 0:r.split("auth/")[1])||"internal-error";t.onError(qe(this.auth,i))}else t.onAuthEvent(e)}isEventForConsumer(e,t){let r=t.eventId===null||!!e.eventId&&e.eventId===t.eventId;return t.filter.includes(e.type)&&r}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=rI&&this.cachedEventUids.clear(),this.cachedEventUids.has(Gd(e))}saveEventToCache(e){this.cachedEventUids.add(Gd(e)),this.lastProcessedEventTime=Date.now()}};function Gd(n){return[n.type,n.eventId,n.sessionId,n.tenantId].filter(e=>e).join("-")}function Df({type:n,error:e}){return n==="unknown"&&(e==null?void 0:e.code)==="auth/no-auth-event"}function iI(n){switch(n.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return Df(n);default:return!1}}async function sI(n,e={}){return be(n,"GET","/v1/projects",e)}var oI=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,aI=/^https?/;async function cI(n){if(n.config.emulator)return;let{authorizedDomains:e}=await sI(n);for(let t of e)try{if(uI(t))return}catch(r){}Le(n,"unauthorized-domain")}function uI(n){let e=ja(),{protocol:t,hostname:r}=new URL(e);if(n.startsWith("chrome-extension://")){let a=new URL(n);return a.hostname===""&&r===""?t==="chrome-extension:"&&n.replace("chrome-extension://","")===e.replace("chrome-extension://",""):t==="chrome-extension:"&&a.hostname===r}if(!aI.test(t))return!1;if(oI.test(n))return r===n;let i=n.replace(/\./g,"\\.");return new RegExp("^(.+\\."+i+"|"+i+")$","i").test(r)}var lI=new Zt(3e4,6e4);function Hd(){let n=Je().___jsl;if(n!=null&&n.H){for(let e of Object.keys(n.H))if(n.H[e].r=n.H[e].r||[],n.H[e].L=n.H[e].L||[],n.H[e].r=[...n.H[e].L],n.CP)for(let t=0;t<n.CP.length;t++)n.CP[t]=null}}function hI(n){return new Promise((e,t)=>{var r,i,s;function a(){Hd(),gapi.load("gapi.iframes",{callback:()=>{e(gapi.iframes.getContext())},ontimeout:()=>{Hd(),t(qe(n,"network-request-failed"))},timeout:lI.get()})}if(!((i=(r=Je().gapi)===null||r===void 0?void 0:r.iframes)===null||i===void 0)&&i.Iframe)e(gapi.iframes.getContext());else if(!((s=Je().gapi)===null||s===void 0)&&s.load)a();else{let c=_f("iframefcb");return Je()[c]=()=>{gapi.load?a():t(qe(n,"network-request-failed"))},gf("".concat(cv(),"?onload=").concat(c)).catch(l=>t(l))}}).catch(e=>{throw hs=null,e})}var hs=null;function dI(n){return hs=hs||hI(n),hs}var fI=new Zt(5e3,15e3),pI="__/auth/iframe",mI="emulator/auth/iframe",gI={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},_I=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function yI(n){let e=n.config;V(e.authDomain,n,"auth-domain-config-required");let t=e.emulator?cc(e,mI):"https://".concat(n.config.authDomain,"/").concat(pI),r={apiKey:e.apiKey,appName:n.name,v:Xe},i=_I.get(n.config.apiHost);i&&(r.eid=i);let s=n._getFrameworks();return s.length&&(r.fw=s.join(",")),"".concat(t,"?").concat(Nn(r).slice(1))}async function vI(n){let e=await dI(n),t=Je().gapi;return V(t,n,"internal-error"),e.open({where:document.body,url:yI(n),messageHandlersFilter:t.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:gI,dontclear:!0},r=>new Promise(async(i,s)=>{await r.restyle({setHideOnLeave:!1});let a=qe(n,"network-request-failed"),c=Je().setTimeout(()=>{s(a)},fI.get());function l(){Je().clearTimeout(c),i(r)}r.ping(l).then(l,()=>{s(a)})}))}var II={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},wI=500,EI=600,TI="_blank",bI="http://localhost",Ns=class{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch(e){}}};function AI(n,e,t,r=wI,i=EI){let s=Math.max((window.screen.availHeight-i)/2,0).toString(),a=Math.max((window.screen.availWidth-r)/2,0).toString(),c="",l=Object.assign(Object.assign({},II),{width:r.toString(),height:i.toString(),top:s,left:a}),d=de().toLowerCase();t&&(c=uf(d)?TI:t),af(d)&&(e=e||bI,l.scrollbars="yes");let p=Object.entries(l).reduce((v,[S,P])=>"".concat(v).concat(S,"=").concat(P,","),"");if(nv(d)&&c!=="_self")return SI(e||"",c),new Ns(null);let m=window.open(e||"",c,p);V(m,n,"popup-blocked");try{m.focus()}catch(v){}return new Ns(m)}function SI(n,e){let t=document.createElement("a");t.href=n,t.target=e;let r=document.createEvent("MouseEvent");r.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),t.dispatchEvent(r)}var RI="__/auth/handler",PI="emulator/auth/handler",CI=encodeURIComponent("fac");async function Wd(n,e,t,r,i,s){V(n.config.authDomain,n,"auth-domain-config-required"),V(n.config.apiKey,n,"invalid-api-key");let a={apiKey:n.config.apiKey,appName:n.name,authType:t,redirectUrl:r,v:Xe,eventId:i};if(e instanceof Gr){e.setDefaultLanguage(n.languageCode),a.providerId=e.providerId||"",_d(e.getCustomParameters())||(a.customParameters=JSON.stringify(e.getCustomParameters()));for(let[p,m]of Object.entries(s||{}))a[p]=m}if(e instanceof rn){let p=e.getScopes().filter(m=>m!=="");p.length>0&&(a.scopes=p.join(","))}n.tenantId&&(a.tid=n.tenantId);let c=a;for(let p of Object.keys(c))c[p]===void 0&&delete c[p];let l=await n._getAppCheckToken(),d=l?"#".concat(CI,"=").concat(encodeURIComponent(l)):"";return"".concat(kI(n),"?").concat(Nn(c).slice(1)).concat(d)}function kI({config:n}){return n.emulator?cc(n,PI):"https://".concat(n.authDomain,"/").concat(RI)}var qa="webStorageSupport",rc=class{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=fc,this._completeRedirectFn=nI,this._overrideRedirectResult=Zv}async _openPopup(e,t,r,i){var s;ft((s=this.eventManagers[e._key()])===null||s===void 0?void 0:s.manager,"_initialize() not called before _openPopup()");let a=await Wd(e,t,r,ja(),i);return AI(e,a,pc())}async _openRedirect(e,t,r,i){await this._originValidation(e);let s=await Wd(e,t,r,ja(),i);return Vv(s),new Promise(()=>{})}_initialize(e){let t=e._key();if(this.eventManagers[t]){let{manager:i,promise:s}=this.eventManagers[t];return i?Promise.resolve(i):(ft(s,"If manager is not set, promise should be"),s)}let r=this.initAndGetManager(e);return this.eventManagers[t]={promise:r},r.catch(()=>{delete this.eventManagers[t]}),r}async initAndGetManager(e){let t=await vI(e),r=new nc(e);return t.register("authEvent",i=>(V(i==null?void 0:i.authEvent,e,"invalid-auth-event"),{status:r.onEvent(i.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:r},this.iframes[e._key()]=t,r}_isIframeWebStorageSupported(e,t){this.iframes[e._key()].send(qa,{type:qa},i=>{var s;let a=(s=i==null?void 0:i[0])===null||s===void 0?void 0:s[qa];a!==void 0&&t(!!a),Le(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){let t=e._key();return this.originValidationPromises[t]||(this.originValidationPromises[t]=cI(e)),this.originValidationPromises[t]}get _shouldInitProactively(){return pf()||cf()||lc()}},Of=rc,Ds=class{constructor(e){this.factorId=e}_process(e,t,r){switch(t.type){case"enroll":return this._finalizeEnroll(e,t.credential,r);case"signin":return this._finalizeSignIn(e,t.credential);default:return Ye("unexpected MultiFactorSessionType")}}},ic=class n extends Ds{constructor(e){super("phone"),this.credential=e}static _fromCredential(e){return new n(e)}_finalizeEnroll(e,t,r){return Pv(e,{idToken:t,displayName:r,phoneVerificationInfo:this.credential._makeVerificationRequest()})}_finalizeSignIn(e,t){return $v(e,{mfaPendingCredential:t,phoneVerificationInfo:this.credential._makeVerificationRequest()})}},Os=class{constructor(){}static assertion(e){return ic._fromCredential(e)}};Os.FACTOR_ID="phone";var xs=class{static assertionForEnrollment(e,t){return Vs._fromSecret(e,t)}static assertionForSignIn(e,t){return Vs._fromEnrollmentId(e,t)}static async generateSecret(e){var t;let r=e;V(typeof((t=r.user)===null||t===void 0?void 0:t.auth)<"u","internal-error");let i=await Cv(r.user.auth,{idToken:r.credential,totpEnrollmentInfo:{}});return Ls._fromStartTotpMfaEnrollmentResponse(i,r.user.auth)}};xs.FACTOR_ID="totp";var Vs=class n extends Ds{constructor(e,t,r){super("totp"),this.otp=e,this.enrollmentId=t,this.secret=r}static _fromSecret(e,t){return new n(t,void 0,e)}static _fromEnrollmentId(e,t){return new n(t,e)}async _finalizeEnroll(e,t,r){return V(typeof this.secret<"u",e,"argument-error"),kv(e,{idToken:t,displayName:r,totpVerificationInfo:this.secret._makeTotpVerificationInfo(this.otp)})}async _finalizeSignIn(e,t){V(this.enrollmentId!==void 0&&this.otp!==void 0,e,"argument-error");let r={verificationCode:this.otp};return Gv(e,{mfaPendingCredential:t,mfaEnrollmentId:this.enrollmentId,totpVerificationInfo:r})}},Ls=class n{constructor(e,t,r,i,s,a,c){this.sessionInfo=a,this.auth=c,this.secretKey=e,this.hashingAlgorithm=t,this.codeLength=r,this.codeIntervalSeconds=i,this.enrollmentCompletionDeadline=s}static _fromStartTotpMfaEnrollmentResponse(e,t){return new n(e.totpSessionInfo.sharedSecretKey,e.totpSessionInfo.hashingAlgorithm,e.totpSessionInfo.verificationCodeLength,e.totpSessionInfo.periodSec,new Date(e.totpSessionInfo.finalizeEnrollmentTime).toUTCString(),e.totpSessionInfo.sessionInfo,t)}_makeTotpVerificationInfo(e){return{sessionInfo:this.sessionInfo,verificationCode:e}}generateQrCodeUrl(e,t){var r;let i=!1;return(os(e)||os(t))&&(i=!0),i&&(os(e)&&(e=((r=this.auth.currentUser)===null||r===void 0?void 0:r.email)||"unknownuser"),os(t)&&(t=this.auth.name)),"otpauth://totp/".concat(t,":").concat(e,"?secret=").concat(this.secretKey,"&issuer=").concat(t,"&algorithm=").concat(this.hashingAlgorithm,"&digits=").concat(this.codeLength)}};function os(n){return typeof n>"u"||(n==null?void 0:n.length)===0}var Kd="@firebase/auth",Qd="1.10.8";var sc=class{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){var e;return this.assertAuthConfigured(),((e=this.auth.currentUser)===null||e===void 0?void 0:e.uid)||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;let t=this.auth.onIdTokenChanged(r=>{e((r==null?void 0:r.stsTokenManager.accessToken)||null)});this.internalListeners.set(e,t),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();let t=this.internalListeners.get(e);t&&(this.internalListeners.delete(e),t(),this.updateProactiveRefresh())}assertAuthConfigured(){V(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}};function NI(n){switch(n){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}function DI(n){Qe(new ke("auth",(e,{options:t})=>{let r=e.getProvider("app").getImmediate(),i=e.getProvider("heartbeat"),s=e.getProvider("app-check-internal"),{apiKey:a,authDomain:c}=r.options;V(a&&!a.includes(":"),"invalid-api-key",{appName:r.name});let l={apiKey:a,authDomain:c,clientPlatform:n,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:mf(n)},d=new Ka(r,i,s,l);return hv(d,t),d},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,t,r)=>{e.getProvider("auth-internal").initialize()})),Qe(new ke("auth-internal",e=>{let t=pt(e.getProvider("auth").getImmediate());return(r=>new sc(r))(t)},"PRIVATE").setInstantiationMode("EXPLICIT")),Ne(Kd,Qd,NI(n)),Ne(Kd,Qd,"esm2017")}var OI=5*60,xI=Ia("authIdTokenMaxAge")||OI,Xd=null,VI=n=>async e=>{let t=e&&await e.getIdTokenResult(),r=t&&(new Date().getTime()-Date.parse(t.issuedAtTime))/1e3;if(r&&r>xI)return;let i=t==null?void 0:t.token;Xd!==i&&(Xd=i,await fetch(n,{method:i?"POST":"DELETE",headers:i?{Authorization:"Bearer ".concat(i)}:{}}))};function gc(n=xn()){let e=Jt(n,"auth");if(e.isInitialized())return e.getImmediate();let t=yf(n,{popupRedirectResolver:Of,persistence:[kf,Sf,fc]}),r=Ia("authTokenSyncURL");if(r&&typeof isSecureContext=="boolean"&&isSecureContext){let s=new URL(r,location.origin);if(location.origin===s.origin){let a=VI(s.toString());Af(t,a,()=>a(t.currentUser)),bf(t,c=>a(c))}}let i=ya("auth");return i&&vf(t,"http://".concat(i)),t}function LI(){var n,e;return(e=(n=document.getElementsByTagName("head"))===null||n===void 0?void 0:n[0])!==null&&e!==void 0?e:document}ov({loadJS(n){return new Promise((e,t)=>{let r=document.createElement("script");r.setAttribute("src",n),r.onload=e,r.onerror=i=>{let s=qe("internal-error");s.customData=i,t(s)},r.type="text/javascript",r.charset="UTF-8",LI().appendChild(r)})},gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="});DI("Browser");var xf=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{},Vf={};var mt,_c;(function(){var n;function e(w,g){function _(){}_.prototype=g.prototype,w.D=g.prototype,w.prototype=new _,w.prototype.constructor=w,w.C=function(I,E,b){for(var y=Array(arguments.length-2),at=2;at<arguments.length;at++)y[at-2]=arguments[at];return g.prototype[E].apply(I,y)}}function t(){this.blockSize=-1}function r(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.B=Array(this.blockSize),this.o=this.h=0,this.s()}e(r,t),r.prototype.s=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0};function i(w,g,_){_||(_=0);var I=Array(16);if(typeof g=="string")for(var E=0;16>E;++E)I[E]=g.charCodeAt(_++)|g.charCodeAt(_++)<<8|g.charCodeAt(_++)<<16|g.charCodeAt(_++)<<24;else for(E=0;16>E;++E)I[E]=g[_++]|g[_++]<<8|g[_++]<<16|g[_++]<<24;g=w.g[0],_=w.g[1],E=w.g[2];var b=w.g[3],y=g+(b^_&(E^b))+I[0]+3614090360&4294967295;g=_+(y<<7&4294967295|y>>>25),y=b+(E^g&(_^E))+I[1]+3905402710&4294967295,b=g+(y<<12&4294967295|y>>>20),y=E+(_^b&(g^_))+I[2]+606105819&4294967295,E=b+(y<<17&4294967295|y>>>15),y=_+(g^E&(b^g))+I[3]+3250441966&4294967295,_=E+(y<<22&4294967295|y>>>10),y=g+(b^_&(E^b))+I[4]+4118548399&4294967295,g=_+(y<<7&4294967295|y>>>25),y=b+(E^g&(_^E))+I[5]+1200080426&4294967295,b=g+(y<<12&4294967295|y>>>20),y=E+(_^b&(g^_))+I[6]+2821735955&4294967295,E=b+(y<<17&4294967295|y>>>15),y=_+(g^E&(b^g))+I[7]+4249261313&4294967295,_=E+(y<<22&4294967295|y>>>10),y=g+(b^_&(E^b))+I[8]+1770035416&4294967295,g=_+(y<<7&4294967295|y>>>25),y=b+(E^g&(_^E))+I[9]+2336552879&4294967295,b=g+(y<<12&4294967295|y>>>20),y=E+(_^b&(g^_))+I[10]+4294925233&4294967295,E=b+(y<<17&4294967295|y>>>15),y=_+(g^E&(b^g))+I[11]+2304563134&4294967295,_=E+(y<<22&4294967295|y>>>10),y=g+(b^_&(E^b))+I[12]+1804603682&4294967295,g=_+(y<<7&4294967295|y>>>25),y=b+(E^g&(_^E))+I[13]+4254626195&4294967295,b=g+(y<<12&4294967295|y>>>20),y=E+(_^b&(g^_))+I[14]+2792965006&4294967295,E=b+(y<<17&4294967295|y>>>15),y=_+(g^E&(b^g))+I[15]+1236535329&4294967295,_=E+(y<<22&4294967295|y>>>10),y=g+(E^b&(_^E))+I[1]+4129170786&4294967295,g=_+(y<<5&4294967295|y>>>27),y=b+(_^E&(g^_))+I[6]+3225465664&4294967295,b=g+(y<<9&4294967295|y>>>23),y=E+(g^_&(b^g))+I[11]+643717713&4294967295,E=b+(y<<14&4294967295|y>>>18),y=_+(b^g&(E^b))+I[0]+3921069994&4294967295,_=E+(y<<20&4294967295|y>>>12),y=g+(E^b&(_^E))+I[5]+3593408605&4294967295,g=_+(y<<5&4294967295|y>>>27),y=b+(_^E&(g^_))+I[10]+38016083&4294967295,b=g+(y<<9&4294967295|y>>>23),y=E+(g^_&(b^g))+I[15]+3634488961&4294967295,E=b+(y<<14&4294967295|y>>>18),y=_+(b^g&(E^b))+I[4]+3889429448&4294967295,_=E+(y<<20&4294967295|y>>>12),y=g+(E^b&(_^E))+I[9]+568446438&4294967295,g=_+(y<<5&4294967295|y>>>27),y=b+(_^E&(g^_))+I[14]+3275163606&4294967295,b=g+(y<<9&4294967295|y>>>23),y=E+(g^_&(b^g))+I[3]+4107603335&4294967295,E=b+(y<<14&4294967295|y>>>18),y=_+(b^g&(E^b))+I[8]+1163531501&4294967295,_=E+(y<<20&4294967295|y>>>12),y=g+(E^b&(_^E))+I[13]+2850285829&4294967295,g=_+(y<<5&4294967295|y>>>27),y=b+(_^E&(g^_))+I[2]+4243563512&4294967295,b=g+(y<<9&4294967295|y>>>23),y=E+(g^_&(b^g))+I[7]+1735328473&4294967295,E=b+(y<<14&4294967295|y>>>18),y=_+(b^g&(E^b))+I[12]+2368359562&4294967295,_=E+(y<<20&4294967295|y>>>12),y=g+(_^E^b)+I[5]+4294588738&4294967295,g=_+(y<<4&4294967295|y>>>28),y=b+(g^_^E)+I[8]+2272392833&4294967295,b=g+(y<<11&4294967295|y>>>21),y=E+(b^g^_)+I[11]+1839030562&4294967295,E=b+(y<<16&4294967295|y>>>16),y=_+(E^b^g)+I[14]+4259657740&4294967295,_=E+(y<<23&4294967295|y>>>9),y=g+(_^E^b)+I[1]+2763975236&4294967295,g=_+(y<<4&4294967295|y>>>28),y=b+(g^_^E)+I[4]+1272893353&4294967295,b=g+(y<<11&4294967295|y>>>21),y=E+(b^g^_)+I[7]+4139469664&4294967295,E=b+(y<<16&4294967295|y>>>16),y=_+(E^b^g)+I[10]+3200236656&4294967295,_=E+(y<<23&4294967295|y>>>9),y=g+(_^E^b)+I[13]+681279174&4294967295,g=_+(y<<4&4294967295|y>>>28),y=b+(g^_^E)+I[0]+3936430074&4294967295,b=g+(y<<11&4294967295|y>>>21),y=E+(b^g^_)+I[3]+3572445317&4294967295,E=b+(y<<16&4294967295|y>>>16),y=_+(E^b^g)+I[6]+76029189&4294967295,_=E+(y<<23&4294967295|y>>>9),y=g+(_^E^b)+I[9]+3654602809&4294967295,g=_+(y<<4&4294967295|y>>>28),y=b+(g^_^E)+I[12]+3873151461&4294967295,b=g+(y<<11&4294967295|y>>>21),y=E+(b^g^_)+I[15]+530742520&4294967295,E=b+(y<<16&4294967295|y>>>16),y=_+(E^b^g)+I[2]+3299628645&4294967295,_=E+(y<<23&4294967295|y>>>9),y=g+(E^(_|~b))+I[0]+4096336452&4294967295,g=_+(y<<6&4294967295|y>>>26),y=b+(_^(g|~E))+I[7]+1126891415&4294967295,b=g+(y<<10&4294967295|y>>>22),y=E+(g^(b|~_))+I[14]+2878612391&4294967295,E=b+(y<<15&4294967295|y>>>17),y=_+(b^(E|~g))+I[5]+4237533241&4294967295,_=E+(y<<21&4294967295|y>>>11),y=g+(E^(_|~b))+I[12]+1700485571&4294967295,g=_+(y<<6&4294967295|y>>>26),y=b+(_^(g|~E))+I[3]+2399980690&4294967295,b=g+(y<<10&4294967295|y>>>22),y=E+(g^(b|~_))+I[10]+4293915773&4294967295,E=b+(y<<15&4294967295|y>>>17),y=_+(b^(E|~g))+I[1]+2240044497&4294967295,_=E+(y<<21&4294967295|y>>>11),y=g+(E^(_|~b))+I[8]+1873313359&4294967295,g=_+(y<<6&4294967295|y>>>26),y=b+(_^(g|~E))+I[15]+4264355552&4294967295,b=g+(y<<10&4294967295|y>>>22),y=E+(g^(b|~_))+I[6]+2734768916&4294967295,E=b+(y<<15&4294967295|y>>>17),y=_+(b^(E|~g))+I[13]+1309151649&4294967295,_=E+(y<<21&4294967295|y>>>11),y=g+(E^(_|~b))+I[4]+4149444226&4294967295,g=_+(y<<6&4294967295|y>>>26),y=b+(_^(g|~E))+I[11]+3174756917&4294967295,b=g+(y<<10&4294967295|y>>>22),y=E+(g^(b|~_))+I[2]+718787259&4294967295,E=b+(y<<15&4294967295|y>>>17),y=_+(b^(E|~g))+I[9]+3951481745&4294967295,w.g[0]=w.g[0]+g&4294967295,w.g[1]=w.g[1]+(E+(y<<21&4294967295|y>>>11))&4294967295,w.g[2]=w.g[2]+E&4294967295,w.g[3]=w.g[3]+b&4294967295}r.prototype.u=function(w,g){g===void 0&&(g=w.length);for(var _=g-this.blockSize,I=this.B,E=this.h,b=0;b<g;){if(E==0)for(;b<=_;)i(this,w,b),b+=this.blockSize;if(typeof w=="string"){for(;b<g;)if(I[E++]=w.charCodeAt(b++),E==this.blockSize){i(this,I),E=0;break}}else for(;b<g;)if(I[E++]=w[b++],E==this.blockSize){i(this,I),E=0;break}}this.h=E,this.o+=g},r.prototype.v=function(){var w=Array((56>this.h?this.blockSize:2*this.blockSize)-this.h);w[0]=128;for(var g=1;g<w.length-8;++g)w[g]=0;var _=8*this.o;for(g=w.length-8;g<w.length;++g)w[g]=_&255,_/=256;for(this.u(w),w=Array(16),g=_=0;4>g;++g)for(var I=0;32>I;I+=8)w[_++]=this.g[g]>>>I&255;return w};function s(w,g){var _=c;return Object.prototype.hasOwnProperty.call(_,w)?_[w]:_[w]=g(w)}function a(w,g){this.h=g;for(var _=[],I=!0,E=w.length-1;0<=E;E--){var b=w[E]|0;I&&b==g||(_[E]=b,I=!1)}this.g=_}var c={};function l(w){return-128<=w&&128>w?s(w,function(g){return new a([g|0],0>g?-1:0)}):new a([w|0],0>w?-1:0)}function d(w){if(isNaN(w)||!isFinite(w))return m;if(0>w)return C(d(-w));for(var g=[],_=1,I=0;w>=_;I++)g[I]=w/_|0,_*=4294967296;return new a(g,0)}function p(w,g){if(w.length==0)throw Error("number format error: empty string");if(g=g||10,2>g||36<g)throw Error("radix out of range: "+g);if(w.charAt(0)=="-")return C(p(w.substring(1),g));if(0<=w.indexOf("-"))throw Error('number format error: interior "-" character');for(var _=d(Math.pow(g,8)),I=m,E=0;E<w.length;E+=8){var b=Math.min(8,w.length-E),y=parseInt(w.substring(E,E+b),g);8>b?(b=d(Math.pow(g,b)),I=I.j(b).add(d(y))):(I=I.j(_),I=I.add(d(y)))}return I}var m=l(0),v=l(1),S=l(16777216);n=a.prototype,n.m=function(){if(N(this))return-C(this).m();for(var w=0,g=1,_=0;_<this.g.length;_++){var I=this.i(_);w+=(0<=I?I:4294967296+I)*g,g*=4294967296}return w},n.toString=function(w){if(w=w||10,2>w||36<w)throw Error("radix out of range: "+w);if(P(this))return"0";if(N(this))return"-"+C(this).toString(w);for(var g=d(Math.pow(w,6)),_=this,I="";;){var E=q(_,g).g;_=U(_,E.j(g));var b=((0<_.g.length?_.g[0]:_.h)>>>0).toString(w);if(_=E,P(_))return b+I;for(;6>b.length;)b="0"+b;I=b+I}},n.i=function(w){return 0>w?0:w<this.g.length?this.g[w]:this.h};function P(w){if(w.h!=0)return!1;for(var g=0;g<w.g.length;g++)if(w.g[g]!=0)return!1;return!0}function N(w){return w.h==-1}n.l=function(w){return w=U(this,w),N(w)?-1:P(w)?0:1};function C(w){for(var g=w.g.length,_=[],I=0;I<g;I++)_[I]=~w.g[I];return new a(_,~w.h).add(v)}n.abs=function(){return N(this)?C(this):this},n.add=function(w){for(var g=Math.max(this.g.length,w.g.length),_=[],I=0,E=0;E<=g;E++){var b=I+(this.i(E)&65535)+(w.i(E)&65535),y=(b>>>16)+(this.i(E)>>>16)+(w.i(E)>>>16);I=y>>>16,b&=65535,y&=65535,_[E]=y<<16|b}return new a(_,_[_.length-1]&-2147483648?-1:0)};function U(w,g){return w.add(C(g))}n.j=function(w){if(P(this)||P(w))return m;if(N(this))return N(w)?C(this).j(C(w)):C(C(this).j(w));if(N(w))return C(this.j(C(w)));if(0>this.l(S)&&0>w.l(S))return d(this.m()*w.m());for(var g=this.g.length+w.g.length,_=[],I=0;I<2*g;I++)_[I]=0;for(I=0;I<this.g.length;I++)for(var E=0;E<w.g.length;E++){var b=this.i(I)>>>16,y=this.i(I)&65535,at=w.i(E)>>>16,fr=w.i(E)&65535;_[2*I+2*E]+=y*fr,M(_,2*I+2*E),_[2*I+2*E+1]+=b*fr,M(_,2*I+2*E+1),_[2*I+2*E+1]+=y*at,M(_,2*I+2*E+1),_[2*I+2*E+2]+=b*at,M(_,2*I+2*E+2)}for(I=0;I<g;I++)_[I]=_[2*I+1]<<16|_[2*I];for(I=g;I<2*g;I++)_[I]=0;return new a(_,0)};function M(w,g){for(;(w[g]&65535)!=w[g];)w[g+1]+=w[g]>>>16,w[g]&=65535,g++}function L(w,g){this.g=w,this.h=g}function q(w,g){if(P(g))throw Error("division by zero");if(P(w))return new L(m,m);if(N(w))return g=q(C(w),g),new L(C(g.g),C(g.h));if(N(g))return g=q(w,C(g)),new L(C(g.g),g.h);if(30<w.g.length){if(N(w)||N(g))throw Error("slowDivide_ only works with positive integers.");for(var _=v,I=g;0>=I.l(w);)_=ie(_),I=ie(I);var E=H(_,1),b=H(I,1);for(I=H(I,2),_=H(_,2);!P(I);){var y=b.add(I);0>=y.l(w)&&(E=E.add(_),b=y),I=H(I,1),_=H(_,1)}return g=U(w,E.j(g)),new L(E,g)}for(E=m;0<=w.l(g);){for(_=Math.max(1,Math.floor(w.m()/g.m())),I=Math.ceil(Math.log(_)/Math.LN2),I=48>=I?1:Math.pow(2,I-48),b=d(_),y=b.j(g);N(y)||0<y.l(w);)_-=I,b=d(_),y=b.j(g);P(b)&&(b=v),E=E.add(b),w=U(w,y)}return new L(E,w)}n.A=function(w){return q(this,w).h},n.and=function(w){for(var g=Math.max(this.g.length,w.g.length),_=[],I=0;I<g;I++)_[I]=this.i(I)&w.i(I);return new a(_,this.h&w.h)},n.or=function(w){for(var g=Math.max(this.g.length,w.g.length),_=[],I=0;I<g;I++)_[I]=this.i(I)|w.i(I);return new a(_,this.h|w.h)},n.xor=function(w){for(var g=Math.max(this.g.length,w.g.length),_=[],I=0;I<g;I++)_[I]=this.i(I)^w.i(I);return new a(_,this.h^w.h)};function ie(w){for(var g=w.g.length+1,_=[],I=0;I<g;I++)_[I]=w.i(I)<<1|w.i(I-1)>>>31;return new a(_,w.h)}function H(w,g){var _=g>>5;g%=32;for(var I=w.g.length-_,E=[],b=0;b<I;b++)E[b]=0<g?w.i(b+_)>>>g|w.i(b+_+1)<<32-g:w.i(b+_);return new a(E,w.h)}r.prototype.digest=r.prototype.v,r.prototype.reset=r.prototype.s,r.prototype.update=r.prototype.u,_c=Vf.Md5=r,a.prototype.add=a.prototype.add,a.prototype.multiply=a.prototype.j,a.prototype.modulo=a.prototype.A,a.prototype.compare=a.prototype.l,a.prototype.toNumber=a.prototype.m,a.prototype.toString=a.prototype.toString,a.prototype.getBits=a.prototype.i,a.fromNumber=d,a.fromString=p,mt=Vf.Integer=a}).apply(typeof xf<"u"?xf:typeof self<"u"?self:typeof window<"u"?window:{});var Bs=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{},gt={};var yc,MI,Ln,vc,Jr,qs,Ic,wc,Ec;(function(){var n,e=typeof Object.defineProperties=="function"?Object.defineProperty:function(o,u,h){return o==Array.prototype||o==Object.prototype||(o[u]=h.value),o};function t(o){o=[typeof globalThis=="object"&&globalThis,o,typeof window=="object"&&window,typeof self=="object"&&self,typeof Bs=="object"&&Bs];for(var u=0;u<o.length;++u){var h=o[u];if(h&&h.Math==Math)return h}throw Error("Cannot find global object")}var r=t(this);function i(o,u){if(u)e:{var h=r;o=o.split(".");for(var f=0;f<o.length-1;f++){var T=o[f];if(!(T in h))break e;h=h[T]}o=o[o.length-1],f=h[o],u=u(f),u!=f&&u!=null&&e(h,o,{configurable:!0,writable:!0,value:u})}}function s(o,u){o instanceof String&&(o+="");var h=0,f=!1,T={next:function(){if(!f&&h<o.length){var A=h++;return{value:u(A,o[A]),done:!1}}return f=!0,{done:!0,value:void 0}}};return T[Symbol.iterator]=function(){return T},T}i("Array.prototype.values",function(o){return o||function(){return s(this,function(u,h){return h})}});var a=a||{},c=this||self;function l(o){var u=typeof o;return u=u!="object"?u:o?Array.isArray(o)?"array":u:"null",u=="array"||u=="object"&&typeof o.length=="number"}function d(o){var u=typeof o;return u=="object"&&o!=null||u=="function"}function p(o,u,h){return o.call.apply(o.bind,arguments)}function m(o,u,h){if(!o)throw Error();if(2<arguments.length){var f=Array.prototype.slice.call(arguments,2);return function(){var T=Array.prototype.slice.call(arguments);return Array.prototype.unshift.apply(T,f),o.apply(u,T)}}return function(){return o.apply(u,arguments)}}function v(o,u,h){return v=Function.prototype.bind&&Function.prototype.bind.toString().indexOf("native code")!=-1?p:m,v.apply(null,arguments)}function S(o,u){var h=Array.prototype.slice.call(arguments,1);return function(){var f=h.slice();return f.push.apply(f,arguments),o.apply(this,f)}}function P(o,u){function h(){}h.prototype=u.prototype,o.aa=u.prototype,o.prototype=new h,o.prototype.constructor=o,o.Qb=function(f,T,A){for(var D=Array(arguments.length-2),Y=2;Y<arguments.length;Y++)D[Y-2]=arguments[Y];return u.prototype[T].apply(f,D)}}function N(o){let u=o.length;if(0<u){let h=Array(u);for(let f=0;f<u;f++)h[f]=o[f];return h}return[]}function C(o,u){for(let h=1;h<arguments.length;h++){let f=arguments[h];if(l(f)){let T=o.length||0,A=f.length||0;o.length=T+A;for(let D=0;D<A;D++)o[T+D]=f[D]}else o.push(f)}}class U{constructor(u,h){this.i=u,this.j=h,this.h=0,this.g=null}get(){let u;return 0<this.h?(this.h--,u=this.g,this.g=u.next,u.next=null):u=this.i(),u}}function M(o){return/^[\s\xa0]*$/.test(o)}function L(){var o=c.navigator;return o&&(o=o.userAgent)?o:""}function q(o){return q[" "](o),o}q[" "]=function(){};var ie=L().indexOf("Gecko")!=-1&&!(L().toLowerCase().indexOf("webkit")!=-1&&L().indexOf("Edge")==-1)&&!(L().indexOf("Trident")!=-1||L().indexOf("MSIE")!=-1)&&L().indexOf("Edge")==-1;function H(o,u,h){for(let f in o)u.call(h,o[f],f,o)}function w(o,u){for(let h in o)u.call(void 0,o[h],h,o)}function g(o){let u={};for(let h in o)u[h]=o[h];return u}let _="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function I(o,u){let h,f;for(let T=1;T<arguments.length;T++){f=arguments[T];for(h in f)o[h]=f[h];for(let A=0;A<_.length;A++)h=_[A],Object.prototype.hasOwnProperty.call(f,h)&&(o[h]=f[h])}}function E(o){var u=1;o=o.split(":");let h=[];for(;0<u&&o.length;)h.push(o.shift()),u--;return o.length&&h.push(o.join(":")),h}function b(o){c.setTimeout(()=>{throw o},0)}function y(){var o=$o;let u=null;return o.g&&(u=o.g,o.g=o.g.next,o.g||(o.h=null),u.next=null),u}class at{constructor(){this.h=this.g=null}add(u,h){let f=fr.get();f.set(u,h),this.h?this.h.next=f:this.g=f,this.h=f}}var fr=new U(()=>new jg,o=>o.reset());class jg{constructor(){this.next=this.g=this.h=null}set(u,h){this.h=u,this.g=h,this.next=null}reset(){this.next=this.g=this.h=null}}let pr,mr=!1,$o=new at,th=()=>{let o=c.Promise.resolve(void 0);pr=()=>{o.then(zg)}};var zg=()=>{for(var o;o=y();){try{o.h.call(o.g)}catch(h){b(h)}var u=fr;u.j(o),100>u.h&&(u.h++,o.next=u.g,u.g=o)}mr=!1};function Rt(){this.s=this.s,this.C=this.C}Rt.prototype.s=!1,Rt.prototype.ma=function(){this.s||(this.s=!0,this.N())},Rt.prototype.N=function(){if(this.C)for(;this.C.length;)this.C.shift()()};function ve(o,u){this.type=o,this.g=this.target=u,this.defaultPrevented=!1}ve.prototype.h=function(){this.defaultPrevented=!0};var $g=function(){if(!c.addEventListener||!Object.defineProperty)return!1;var o=!1,u=Object.defineProperty({},"passive",{get:function(){o=!0}});try{let h=()=>{};c.addEventListener("test",h,u),c.removeEventListener("test",h,u)}catch(h){}return o}();function gr(o,u){if(ve.call(this,o?o.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,o){var h=this.type=o.type,f=o.changedTouches&&o.changedTouches.length?o.changedTouches[0]:null;if(this.target=o.target||o.srcElement,this.g=u,u=o.relatedTarget){if(ie){e:{try{q(u.nodeName);var T=!0;break e}catch(A){}T=!1}T||(u=null)}}else h=="mouseover"?u=o.fromElement:h=="mouseout"&&(u=o.toElement);this.relatedTarget=u,f?(this.clientX=f.clientX!==void 0?f.clientX:f.pageX,this.clientY=f.clientY!==void 0?f.clientY:f.pageY,this.screenX=f.screenX||0,this.screenY=f.screenY||0):(this.clientX=o.clientX!==void 0?o.clientX:o.pageX,this.clientY=o.clientY!==void 0?o.clientY:o.pageY,this.screenX=o.screenX||0,this.screenY=o.screenY||0),this.button=o.button,this.key=o.key||"",this.ctrlKey=o.ctrlKey,this.altKey=o.altKey,this.shiftKey=o.shiftKey,this.metaKey=o.metaKey,this.pointerId=o.pointerId||0,this.pointerType=typeof o.pointerType=="string"?o.pointerType:Gg[o.pointerType]||"",this.state=o.state,this.i=o,o.defaultPrevented&&gr.aa.h.call(this)}}P(gr,ve);var Gg={2:"touch",3:"pen",4:"mouse"};gr.prototype.h=function(){gr.aa.h.call(this);var o=this.i;o.preventDefault?o.preventDefault():o.returnValue=!1};var _r="closure_listenable_"+(1e6*Math.random()|0),Hg=0;function Wg(o,u,h,f,T){this.listener=o,this.proxy=null,this.src=u,this.type=h,this.capture=!!f,this.ha=T,this.key=++Hg,this.da=this.fa=!1}function Di(o){o.da=!0,o.listener=null,o.proxy=null,o.src=null,o.ha=null}function Oi(o){this.src=o,this.g={},this.h=0}Oi.prototype.add=function(o,u,h,f,T){var A=o.toString();o=this.g[A],o||(o=this.g[A]=[],this.h++);var D=Ho(o,u,f,T);return-1<D?(u=o[D],h||(u.fa=!1)):(u=new Wg(u,this.src,A,!!f,T),u.fa=h,o.push(u)),u};function Go(o,u){var h=u.type;if(h in o.g){var f=o.g[h],T=Array.prototype.indexOf.call(f,u,void 0),A;(A=0<=T)&&Array.prototype.splice.call(f,T,1),A&&(Di(u),o.g[h].length==0&&(delete o.g[h],o.h--))}}function Ho(o,u,h,f){for(var T=0;T<o.length;++T){var A=o[T];if(!A.da&&A.listener==u&&A.capture==!!h&&A.ha==f)return T}return-1}var Wo="closure_lm_"+(1e6*Math.random()|0),Ko={};function nh(o,u,h,f,T){if(f&&f.once)return ih(o,u,h,f,T);if(Array.isArray(u)){for(var A=0;A<u.length;A++)nh(o,u[A],h,f,T);return null}return h=Jo(h),o&&o[_r]?o.K(u,h,d(f)?!!f.capture:!!f,T):rh(o,u,h,!1,f,T)}function rh(o,u,h,f,T,A){if(!u)throw Error("Invalid event type");var D=d(T)?!!T.capture:!!T,Y=Xo(o);if(Y||(o[Wo]=Y=new Oi(o)),h=Y.add(u,h,f,D,A),h.proxy)return h;if(f=Kg(),h.proxy=f,f.src=o,f.listener=h,o.addEventListener)$g||(T=D),T===void 0&&(T=!1),o.addEventListener(u.toString(),f,T);else if(o.attachEvent)o.attachEvent(oh(u.toString()),f);else if(o.addListener&&o.removeListener)o.addListener(f);else throw Error("addEventListener and attachEvent are unavailable.");return h}function Kg(){function o(h){return u.call(o.src,o.listener,h)}let u=Qg;return o}function ih(o,u,h,f,T){if(Array.isArray(u)){for(var A=0;A<u.length;A++)ih(o,u[A],h,f,T);return null}return h=Jo(h),o&&o[_r]?o.L(u,h,d(f)?!!f.capture:!!f,T):rh(o,u,h,!0,f,T)}function sh(o,u,h,f,T){if(Array.isArray(u))for(var A=0;A<u.length;A++)sh(o,u[A],h,f,T);else f=d(f)?!!f.capture:!!f,h=Jo(h),o&&o[_r]?(o=o.i,u=String(u).toString(),u in o.g&&(A=o.g[u],h=Ho(A,h,f,T),-1<h&&(Di(A[h]),Array.prototype.splice.call(A,h,1),A.length==0&&(delete o.g[u],o.h--)))):o&&(o=Xo(o))&&(u=o.g[u.toString()],o=-1,u&&(o=Ho(u,h,f,T)),(h=-1<o?u[o]:null)&&Qo(h))}function Qo(o){if(typeof o!="number"&&o&&!o.da){var u=o.src;if(u&&u[_r])Go(u.i,o);else{var h=o.type,f=o.proxy;u.removeEventListener?u.removeEventListener(h,f,o.capture):u.detachEvent?u.detachEvent(oh(h),f):u.addListener&&u.removeListener&&u.removeListener(f),(h=Xo(u))?(Go(h,o),h.h==0&&(h.src=null,u[Wo]=null)):Di(o)}}}function oh(o){return o in Ko?Ko[o]:Ko[o]="on"+o}function Qg(o,u){if(o.da)o=!0;else{u=new gr(u,this);var h=o.listener,f=o.ha||o.src;o.fa&&Qo(o),o=h.call(f,u)}return o}function Xo(o){return o=o[Wo],o instanceof Oi?o:null}var Yo="__closure_events_fn_"+(1e9*Math.random()>>>0);function Jo(o){return typeof o=="function"?o:(o[Yo]||(o[Yo]=function(u){return o.handleEvent(u)}),o[Yo])}function Ie(){Rt.call(this),this.i=new Oi(this),this.M=this,this.F=null}P(Ie,Rt),Ie.prototype[_r]=!0,Ie.prototype.removeEventListener=function(o,u,h,f){sh(this,o,u,h,f)};function Re(o,u){var h,f=o.F;if(f)for(h=[];f;f=f.F)h.push(f);if(o=o.M,f=u.type||u,typeof u=="string")u=new ve(u,o);else if(u instanceof ve)u.target=u.target||o;else{var T=u;u=new ve(f,o),I(u,T)}if(T=!0,h)for(var A=h.length-1;0<=A;A--){var D=u.g=h[A];T=xi(D,f,!0,u)&&T}if(D=u.g=o,T=xi(D,f,!0,u)&&T,T=xi(D,f,!1,u)&&T,h)for(A=0;A<h.length;A++)D=u.g=h[A],T=xi(D,f,!1,u)&&T}Ie.prototype.N=function(){if(Ie.aa.N.call(this),this.i){var o=this.i,u;for(u in o.g){for(var h=o.g[u],f=0;f<h.length;f++)Di(h[f]);delete o.g[u],o.h--}}this.F=null},Ie.prototype.K=function(o,u,h,f){return this.i.add(String(o),u,!1,h,f)},Ie.prototype.L=function(o,u,h,f){return this.i.add(String(o),u,!0,h,f)};function xi(o,u,h,f){if(u=o.i.g[String(u)],!u)return!0;u=u.concat();for(var T=!0,A=0;A<u.length;++A){var D=u[A];if(D&&!D.da&&D.capture==h){var Y=D.listener,_e=D.ha||D.src;D.fa&&Go(o.i,D),T=Y.call(_e,f)!==!1&&T}}return T&&!f.defaultPrevented}function ah(o,u,h){if(typeof o=="function")h&&(o=v(o,h));else if(o&&typeof o.handleEvent=="function")o=v(o.handleEvent,o);else throw Error("Invalid listener argument");return 2147483647<Number(u)?-1:c.setTimeout(o,u||0)}function ch(o){o.g=ah(()=>{o.g=null,o.i&&(o.i=!1,ch(o))},o.l);let u=o.h;o.h=null,o.m.apply(null,u)}class Xg extends Rt{constructor(u,h){super(),this.m=u,this.l=h,this.h=null,this.i=!1,this.g=null}j(u){this.h=arguments,this.g?this.i=!0:ch(this)}N(){super.N(),this.g&&(c.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function yr(o){Rt.call(this),this.h=o,this.g={}}P(yr,Rt);var uh=[];function lh(o){H(o.g,function(u,h){this.g.hasOwnProperty(h)&&Qo(u)},o),o.g={}}yr.prototype.N=function(){yr.aa.N.call(this),lh(this)},yr.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};var Zo=c.JSON.stringify,Yg=c.JSON.parse,Jg=class{stringify(o){return c.JSON.stringify(o,void 0)}parse(o){return c.JSON.parse(o,void 0)}};function ea(){}ea.prototype.h=null;function hh(o){return o.h||(o.h=o.i())}function dh(){}var vr={OPEN:"a",kb:"b",Ja:"c",wb:"d"};function ta(){ve.call(this,"d")}P(ta,ve);function na(){ve.call(this,"c")}P(na,ve);var Wt={},fh=null;function Vi(){return fh=fh||new Ie}Wt.La="serverreachability";function ph(o){ve.call(this,Wt.La,o)}P(ph,ve);function Ir(o){let u=Vi();Re(u,new ph(u))}Wt.STAT_EVENT="statevent";function mh(o,u){ve.call(this,Wt.STAT_EVENT,o),this.stat=u}P(mh,ve);function Pe(o){let u=Vi();Re(u,new mh(u,o))}Wt.Ma="timingevent";function gh(o,u){ve.call(this,Wt.Ma,o),this.size=u}P(gh,ve);function wr(o,u){if(typeof o!="function")throw Error("Fn must not be null and must be a function");return c.setTimeout(function(){o()},u)}function Er(){this.g=!0}Er.prototype.xa=function(){this.g=!1};function Zg(o,u,h,f,T,A){o.info(function(){if(o.g)if(A)for(var D="",Y=A.split("&"),_e=0;_e<Y.length;_e++){var Q=Y[_e].split("=");if(1<Q.length){var we=Q[0];Q=Q[1];var Ee=we.split("_");D=2<=Ee.length&&Ee[1]=="type"?D+(we+"="+Q+"&"):D+(we+"=redacted&")}}else D=null;else D=A;return"XMLHTTP REQ ("+f+") [attempt "+T+"]: "+u+"\n"+h+"\n"+D})}function e_(o,u,h,f,T,A,D){o.info(function(){return"XMLHTTP RESP ("+f+") [ attempt "+T+"]: "+u+"\n"+h+"\n"+A+" "+D})}function An(o,u,h,f){o.info(function(){return"XMLHTTP TEXT ("+u+"): "+n_(o,h)+(f?" "+f:"")})}function t_(o,u){o.info(function(){return"TIMEOUT: "+u})}Er.prototype.info=function(){};function n_(o,u){if(!o.g)return u;if(!u)return null;try{var h=JSON.parse(u);if(h){for(o=0;o<h.length;o++)if(Array.isArray(h[o])){var f=h[o];if(!(2>f.length)){var T=f[1];if(Array.isArray(T)&&!(1>T.length)){var A=T[0];if(A!="noop"&&A!="stop"&&A!="close")for(var D=1;D<T.length;D++)T[D]=""}}}}return Zo(h)}catch(Y){return u}}var Li={NO_ERROR:0,gb:1,tb:2,sb:3,nb:4,rb:5,ub:6,Ia:7,TIMEOUT:8,xb:9},_h={lb:"complete",Hb:"success",Ja:"error",Ia:"abort",zb:"ready",Ab:"readystatechange",TIMEOUT:"timeout",vb:"incrementaldata",yb:"progress",ob:"downloadprogress",Pb:"uploadprogress"},ra;function Mi(){}P(Mi,ea),Mi.prototype.g=function(){return new XMLHttpRequest},Mi.prototype.i=function(){return{}},ra=new Mi;function Pt(o,u,h,f){this.j=o,this.i=u,this.l=h,this.R=f||1,this.U=new yr(this),this.I=45e3,this.H=null,this.o=!1,this.m=this.A=this.v=this.L=this.F=this.S=this.B=null,this.D=[],this.g=null,this.C=0,this.s=this.u=null,this.X=-1,this.J=!1,this.O=0,this.M=null,this.W=this.K=this.T=this.P=!1,this.h=new yh}function yh(){this.i=null,this.g="",this.h=!1}var vh={},ia={};function sa(o,u,h){o.L=1,o.v=qi(ct(u)),o.m=h,o.P=!0,Ih(o,null)}function Ih(o,u){o.F=Date.now(),Fi(o),o.A=ct(o.v);var h=o.A,f=o.R;Array.isArray(f)||(f=[String(f)]),xh(h.i,"t",f),o.C=0,h=o.j.J,o.h=new yh,o.g=Jh(o.j,h?u:null,!o.m),0<o.O&&(o.M=new Xg(v(o.Y,o,o.g),o.O)),u=o.U,h=o.g,f=o.ca;var T="readystatechange";Array.isArray(T)||(T&&(uh[0]=T.toString()),T=uh);for(var A=0;A<T.length;A++){var D=nh(h,T[A],f||u.handleEvent,!1,u.h||u);if(!D)break;u.g[D.key]=D}u=o.H?g(o.H):{},o.m?(o.u||(o.u="POST"),u["Content-Type"]="application/x-www-form-urlencoded",o.g.ea(o.A,o.u,o.m,u)):(o.u="GET",o.g.ea(o.A,o.u,null,u)),Ir(),Zg(o.i,o.u,o.A,o.l,o.R,o.m)}Pt.prototype.ca=function(o){o=o.target;let u=this.M;u&&ut(o)==3?u.j():this.Y(o)},Pt.prototype.Y=function(o){try{if(o==this.g)e:{let Ee=ut(this.g);var u=this.g.Ba();let Pn=this.g.Z();if(!(3>Ee)&&(Ee!=3||this.g&&(this.h.h||this.g.oa()||qh(this.g)))){this.J||Ee!=4||u==7||(u==8||0>=Pn?Ir(3):Ir(2)),oa(this);var h=this.g.Z();this.X=h;t:if(wh(this)){var f=qh(this.g);o="";var T=f.length,A=ut(this.g)==4;if(!this.h.i){if(typeof TextDecoder>"u"){Kt(this),Tr(this);var D="";break t}this.h.i=new c.TextDecoder}for(u=0;u<T;u++)this.h.h=!0,o+=this.h.i.decode(f[u],{stream:!(A&&u==T-1)});f.length=0,this.h.g+=o,this.C=0,D=this.h.g}else D=this.g.oa();if(this.o=h==200,e_(this.i,this.u,this.A,this.l,this.R,Ee,h),this.o){if(this.T&&!this.K){t:{if(this.g){var Y,_e=this.g;if((Y=_e.g?_e.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!M(Y)){var Q=Y;break t}}Q=null}if(h=Q)An(this.i,this.l,h,"Initial handshake response via X-HTTP-Initial-Response"),this.K=!0,aa(this,h);else{this.o=!1,this.s=3,Pe(12),Kt(this),Tr(this);break e}}if(this.P){h=!0;let Ue;for(;!this.J&&this.C<D.length;)if(Ue=r_(this,D),Ue==ia){Ee==4&&(this.s=4,Pe(14),h=!1),An(this.i,this.l,null,"[Incomplete Response]");break}else if(Ue==vh){this.s=4,Pe(15),An(this.i,this.l,D,"[Invalid Chunk]"),h=!1;break}else An(this.i,this.l,Ue,null),aa(this,Ue);if(wh(this)&&this.C!=0&&(this.h.g=this.h.g.slice(this.C),this.C=0),Ee!=4||D.length!=0||this.h.h||(this.s=1,Pe(16),h=!1),this.o=this.o&&h,!h)An(this.i,this.l,D,"[Invalid Chunked Response]"),Kt(this),Tr(this);else if(0<D.length&&!this.W){this.W=!0;var we=this.j;we.g==this&&we.ba&&!we.M&&(we.j.info("Great, no buffering proxy detected. Bytes received: "+D.length),fa(we),we.M=!0,Pe(11))}}else An(this.i,this.l,D,null),aa(this,D);Ee==4&&Kt(this),this.o&&!this.J&&(Ee==4?Kh(this.j,this):(this.o=!1,Fi(this)))}else I_(this.g),h==400&&0<D.indexOf("Unknown SID")?(this.s=3,Pe(12)):(this.s=0,Pe(13)),Kt(this),Tr(this)}}}catch(Ee){}finally{}};function wh(o){return o.g?o.u=="GET"&&o.L!=2&&o.j.Ca:!1}function r_(o,u){var h=o.C,f=u.indexOf("\n",h);return f==-1?ia:(h=Number(u.substring(h,f)),isNaN(h)?vh:(f+=1,f+h>u.length?ia:(u=u.slice(f,f+h),o.C=f+h,u)))}Pt.prototype.cancel=function(){this.J=!0,Kt(this)};function Fi(o){o.S=Date.now()+o.I,Eh(o,o.I)}function Eh(o,u){if(o.B!=null)throw Error("WatchDog timer not null");o.B=wr(v(o.ba,o),u)}function oa(o){o.B&&(c.clearTimeout(o.B),o.B=null)}Pt.prototype.ba=function(){this.B=null;let o=Date.now();0<=o-this.S?(t_(this.i,this.A),this.L!=2&&(Ir(),Pe(17)),Kt(this),this.s=2,Tr(this)):Eh(this,this.S-o)};function Tr(o){o.j.G==0||o.J||Kh(o.j,o)}function Kt(o){oa(o);var u=o.M;u&&typeof u.ma=="function"&&u.ma(),o.M=null,lh(o.U),o.g&&(u=o.g,o.g=null,u.abort(),u.ma())}function aa(o,u){try{var h=o.j;if(h.G!=0&&(h.g==o||ca(h.h,o))){if(!o.K&&ca(h.h,o)&&h.G==3){try{var f=h.Da.g.parse(u)}catch(Q){f=null}if(Array.isArray(f)&&f.length==3){var T=f;if(T[0]==0){e:if(!h.u){if(h.g)if(h.g.F+3e3<o.F)Hi(h),$i(h);else break e;da(h),Pe(18)}}else h.za=T[1],0<h.za-h.T&&37500>T[2]&&h.F&&h.v==0&&!h.C&&(h.C=wr(v(h.Za,h),6e3));if(1>=Ah(h.h)&&h.ca){try{h.ca()}catch(Q){}h.ca=void 0}}else Xt(h,11)}else if((o.K||h.g==o)&&Hi(h),!M(u))for(T=h.Da.g.parse(u),u=0;u<T.length;u++){let Q=T[u];if(h.T=Q[0],Q=Q[1],h.G==2)if(Q[0]=="c"){h.K=Q[1],h.ia=Q[2];let we=Q[3];we!=null&&(h.la=we,h.j.info("VER="+h.la));let Ee=Q[4];Ee!=null&&(h.Aa=Ee,h.j.info("SVER="+h.Aa));let Pn=Q[5];Pn!=null&&typeof Pn=="number"&&0<Pn&&(f=1.5*Pn,h.L=f,h.j.info("backChannelRequestTimeoutMs_="+f)),f=h;let Ue=o.g;if(Ue){let Ki=Ue.g?Ue.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(Ki){var A=f.h;A.g||Ki.indexOf("spdy")==-1&&Ki.indexOf("quic")==-1&&Ki.indexOf("h2")==-1||(A.j=A.l,A.g=new Set,A.h&&(ua(A,A.h),A.h=null))}if(f.D){let pa=Ue.g?Ue.g.getResponseHeader("X-HTTP-Session-Id"):null;pa&&(f.ya=pa,J(f.I,f.D,pa))}}h.G=3,h.l&&h.l.ua(),h.ba&&(h.R=Date.now()-o.F,h.j.info("Handshake RTT: "+h.R+"ms")),f=h;var D=o;if(f.qa=Yh(f,f.J?f.ia:null,f.W),D.K){Sh(f.h,D);var Y=D,_e=f.L;_e&&(Y.I=_e),Y.B&&(oa(Y),Fi(Y)),f.g=D}else Hh(f);0<h.i.length&&Gi(h)}else Q[0]!="stop"&&Q[0]!="close"||Xt(h,7);else h.G==3&&(Q[0]=="stop"||Q[0]=="close"?Q[0]=="stop"?Xt(h,7):ha(h):Q[0]!="noop"&&h.l&&h.l.ta(Q),h.v=0)}}Ir(4)}catch(Q){}}var i_=class{constructor(o,u){this.g=o,this.map=u}};function Th(o){this.l=o||10,c.PerformanceNavigationTiming?(o=c.performance.getEntriesByType("navigation"),o=0<o.length&&(o[0].nextHopProtocol=="hq"||o[0].nextHopProtocol=="h2")):o=!!(c.chrome&&c.chrome.loadTimes&&c.chrome.loadTimes()&&c.chrome.loadTimes().wasFetchedViaSpdy),this.j=o?this.l:1,this.g=null,1<this.j&&(this.g=new Set),this.h=null,this.i=[]}function bh(o){return o.h?!0:o.g?o.g.size>=o.j:!1}function Ah(o){return o.h?1:o.g?o.g.size:0}function ca(o,u){return o.h?o.h==u:o.g?o.g.has(u):!1}function ua(o,u){o.g?o.g.add(u):o.h=u}function Sh(o,u){o.h&&o.h==u?o.h=null:o.g&&o.g.has(u)&&o.g.delete(u)}Th.prototype.cancel=function(){if(this.i=Rh(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&this.g.size!==0){for(let o of this.g.values())o.cancel();this.g.clear()}};function Rh(o){if(o.h!=null)return o.i.concat(o.h.D);if(o.g!=null&&o.g.size!==0){let u=o.i;for(let h of o.g.values())u=u.concat(h.D);return u}return N(o.i)}function s_(o){if(o.V&&typeof o.V=="function")return o.V();if(typeof Map<"u"&&o instanceof Map||typeof Set<"u"&&o instanceof Set)return Array.from(o.values());if(typeof o=="string")return o.split("");if(l(o)){for(var u=[],h=o.length,f=0;f<h;f++)u.push(o[f]);return u}u=[],h=0;for(f in o)u[h++]=o[f];return u}function o_(o){if(o.na&&typeof o.na=="function")return o.na();if(!o.V||typeof o.V!="function"){if(typeof Map<"u"&&o instanceof Map)return Array.from(o.keys());if(!(typeof Set<"u"&&o instanceof Set)){if(l(o)||typeof o=="string"){var u=[];o=o.length;for(var h=0;h<o;h++)u.push(h);return u}u=[],h=0;for(let f in o)u[h++]=f;return u}}}function Ph(o,u){if(o.forEach&&typeof o.forEach=="function")o.forEach(u,void 0);else if(l(o)||typeof o=="string")Array.prototype.forEach.call(o,u,void 0);else for(var h=o_(o),f=s_(o),T=f.length,A=0;A<T;A++)u.call(void 0,f[A],h&&h[A],o)}var Ch=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function a_(o,u){if(o){o=o.split("&");for(var h=0;h<o.length;h++){var f=o[h].indexOf("="),T=null;if(0<=f){var A=o[h].substring(0,f);T=o[h].substring(f+1)}else A=o[h];u(A,T?decodeURIComponent(T.replace(/\+/g," ")):"")}}}function Qt(o){if(this.g=this.o=this.j="",this.s=null,this.m=this.l="",this.h=!1,o instanceof Qt){this.h=o.h,Ui(this,o.j),this.o=o.o,this.g=o.g,Bi(this,o.s),this.l=o.l;var u=o.i,h=new Sr;h.i=u.i,u.g&&(h.g=new Map(u.g),h.h=u.h),kh(this,h),this.m=o.m}else o&&(u=String(o).match(Ch))?(this.h=!1,Ui(this,u[1]||"",!0),this.o=br(u[2]||""),this.g=br(u[3]||"",!0),Bi(this,u[4]),this.l=br(u[5]||"",!0),kh(this,u[6]||"",!0),this.m=br(u[7]||"")):(this.h=!1,this.i=new Sr(null,this.h))}Qt.prototype.toString=function(){var o=[],u=this.j;u&&o.push(Ar(u,Nh,!0),":");var h=this.g;return(h||u=="file")&&(o.push("//"),(u=this.o)&&o.push(Ar(u,Nh,!0),"@"),o.push(encodeURIComponent(String(h)).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),h=this.s,h!=null&&o.push(":",String(h))),(h=this.l)&&(this.g&&h.charAt(0)!="/"&&o.push("/"),o.push(Ar(h,h.charAt(0)=="/"?l_:u_,!0))),(h=this.i.toString())&&o.push("?",h),(h=this.m)&&o.push("#",Ar(h,d_)),o.join("")};function ct(o){return new Qt(o)}function Ui(o,u,h){o.j=h?br(u,!0):u,o.j&&(o.j=o.j.replace(/:$/,""))}function Bi(o,u){if(u){if(u=Number(u),isNaN(u)||0>u)throw Error("Bad port number "+u);o.s=u}else o.s=null}function kh(o,u,h){u instanceof Sr?(o.i=u,f_(o.i,o.h)):(h||(u=Ar(u,h_)),o.i=new Sr(u,o.h))}function J(o,u,h){o.i.set(u,h)}function qi(o){return J(o,"zx",Math.floor(2147483648*Math.random()).toString(36)+Math.abs(Math.floor(2147483648*Math.random())^Date.now()).toString(36)),o}function br(o,u){return o?u?decodeURI(o.replace(/%25/g,"%2525")):decodeURIComponent(o):""}function Ar(o,u,h){return typeof o=="string"?(o=encodeURI(o).replace(u,c_),h&&(o=o.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),o):null}function c_(o){return o=o.charCodeAt(0),"%"+(o>>4&15).toString(16)+(o&15).toString(16)}var Nh=/[#\/\?@]/g,u_=/[#\?:]/g,l_=/[#\?]/g,h_=/[#\?@]/g,d_=/#/g;function Sr(o,u){this.h=this.g=null,this.i=o||null,this.j=!!u}function Ct(o){o.g||(o.g=new Map,o.h=0,o.i&&a_(o.i,function(u,h){o.add(decodeURIComponent(u.replace(/\+/g," ")),h)}))}n=Sr.prototype,n.add=function(o,u){Ct(this),this.i=null,o=Sn(this,o);var h=this.g.get(o);return h||this.g.set(o,h=[]),h.push(u),this.h+=1,this};function Dh(o,u){Ct(o),u=Sn(o,u),o.g.has(u)&&(o.i=null,o.h-=o.g.get(u).length,o.g.delete(u))}function Oh(o,u){return Ct(o),u=Sn(o,u),o.g.has(u)}n.forEach=function(o,u){Ct(this),this.g.forEach(function(h,f){h.forEach(function(T){o.call(u,T,f,this)},this)},this)},n.na=function(){Ct(this);let o=Array.from(this.g.values()),u=Array.from(this.g.keys()),h=[];for(let f=0;f<u.length;f++){let T=o[f];for(let A=0;A<T.length;A++)h.push(u[f])}return h},n.V=function(o){Ct(this);let u=[];if(typeof o=="string")Oh(this,o)&&(u=u.concat(this.g.get(Sn(this,o))));else{o=Array.from(this.g.values());for(let h=0;h<o.length;h++)u=u.concat(o[h])}return u},n.set=function(o,u){return Ct(this),this.i=null,o=Sn(this,o),Oh(this,o)&&(this.h-=this.g.get(o).length),this.g.set(o,[u]),this.h+=1,this},n.get=function(o,u){return o?(o=this.V(o),0<o.length?String(o[0]):u):u};function xh(o,u,h){Dh(o,u),0<h.length&&(o.i=null,o.g.set(Sn(o,u),N(h)),o.h+=h.length)}n.toString=function(){if(this.i)return this.i;if(!this.g)return"";let o=[],u=Array.from(this.g.keys());for(var h=0;h<u.length;h++){var f=u[h];let A=encodeURIComponent(String(f)),D=this.V(f);for(f=0;f<D.length;f++){var T=A;D[f]!==""&&(T+="="+encodeURIComponent(String(D[f]))),o.push(T)}}return this.i=o.join("&")};function Sn(o,u){return u=String(u),o.j&&(u=u.toLowerCase()),u}function f_(o,u){u&&!o.j&&(Ct(o),o.i=null,o.g.forEach(function(h,f){var T=f.toLowerCase();f!=T&&(Dh(this,f),xh(this,T,h))},o)),o.j=u}function p_(o,u){let h=new Er;if(c.Image){let f=new Image;f.onload=S(kt,h,"TestLoadImage: loaded",!0,u,f),f.onerror=S(kt,h,"TestLoadImage: error",!1,u,f),f.onabort=S(kt,h,"TestLoadImage: abort",!1,u,f),f.ontimeout=S(kt,h,"TestLoadImage: timeout",!1,u,f),c.setTimeout(function(){f.ontimeout&&f.ontimeout()},1e4),f.src=o}else u(!1)}function m_(o,u){let h=new Er,f=new AbortController,T=setTimeout(()=>{f.abort(),kt(h,"TestPingServer: timeout",!1,u)},1e4);fetch(o,{signal:f.signal}).then(A=>{clearTimeout(T),A.ok?kt(h,"TestPingServer: ok",!0,u):kt(h,"TestPingServer: server error",!1,u)}).catch(()=>{clearTimeout(T),kt(h,"TestPingServer: error",!1,u)})}function kt(o,u,h,f,T){try{T&&(T.onload=null,T.onerror=null,T.onabort=null,T.ontimeout=null),f(h)}catch(A){}}function g_(){this.g=new Jg}function __(o,u,h){let f=h||"";try{Ph(o,function(T,A){let D=T;d(T)&&(D=Zo(T)),u.push(f+A+"="+encodeURIComponent(D))})}catch(T){throw u.push(f+"type="+encodeURIComponent("_badmap")),T}}function Rr(o){this.l=o.Ub||null,this.j=o.eb||!1}P(Rr,ea),Rr.prototype.g=function(){return new ji(this.l,this.j)},Rr.prototype.i=function(o){return function(){return o}}({});function ji(o,u){Ie.call(this),this.D=o,this.o=u,this.m=void 0,this.status=this.readyState=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.u=new Headers,this.h=null,this.B="GET",this.A="",this.g=!1,this.v=this.j=this.l=null}P(ji,Ie),n=ji.prototype,n.open=function(o,u){if(this.readyState!=0)throw this.abort(),Error("Error reopening a connection");this.B=o,this.A=u,this.readyState=1,Cr(this)},n.send=function(o){if(this.readyState!=1)throw this.abort(),Error("need to call open() first. ");this.g=!0;let u={headers:this.u,method:this.B,credentials:this.m,cache:void 0};o&&(u.body=o),(this.D||c).fetch(new Request(this.A,u)).then(this.Sa.bind(this),this.ga.bind(this))},n.abort=function(){this.response=this.responseText="",this.u=new Headers,this.status=0,this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),1<=this.readyState&&this.g&&this.readyState!=4&&(this.g=!1,Pr(this)),this.readyState=0},n.Sa=function(o){if(this.g&&(this.l=o,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=o.headers,this.readyState=2,Cr(this)),this.g&&(this.readyState=3,Cr(this),this.g)))if(this.responseType==="arraybuffer")o.arrayBuffer().then(this.Qa.bind(this),this.ga.bind(this));else if(typeof c.ReadableStream<"u"&&"body"in o){if(this.j=o.body.getReader(),this.o){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.v=new TextDecoder;Vh(this)}else o.text().then(this.Ra.bind(this),this.ga.bind(this))};function Vh(o){o.j.read().then(o.Pa.bind(o)).catch(o.ga.bind(o))}n.Pa=function(o){if(this.g){if(this.o&&o.value)this.response.push(o.value);else if(!this.o){var u=o.value?o.value:new Uint8Array(0);(u=this.v.decode(u,{stream:!o.done}))&&(this.response=this.responseText+=u)}o.done?Pr(this):Cr(this),this.readyState==3&&Vh(this)}},n.Ra=function(o){this.g&&(this.response=this.responseText=o,Pr(this))},n.Qa=function(o){this.g&&(this.response=o,Pr(this))},n.ga=function(){this.g&&Pr(this)};function Pr(o){o.readyState=4,o.l=null,o.j=null,o.v=null,Cr(o)}n.setRequestHeader=function(o,u){this.u.append(o,u)},n.getResponseHeader=function(o){return this.h&&this.h.get(o.toLowerCase())||""},n.getAllResponseHeaders=function(){if(!this.h)return"";let o=[],u=this.h.entries();for(var h=u.next();!h.done;)h=h.value,o.push(h[0]+": "+h[1]),h=u.next();return o.join("\r\n")};function Cr(o){o.onreadystatechange&&o.onreadystatechange.call(o)}Object.defineProperty(ji.prototype,"withCredentials",{get:function(){return this.m==="include"},set:function(o){this.m=o?"include":"same-origin"}});function Lh(o){let u="";return H(o,function(h,f){u+=f,u+=":",u+=h,u+="\r\n"}),u}function la(o,u,h){e:{for(f in h){var f=!1;break e}f=!0}f||(h=Lh(h),typeof o=="string"?h!=null&&encodeURIComponent(String(h)):J(o,u,h))}function se(o){Ie.call(this),this.headers=new Map,this.o=o||null,this.h=!1,this.v=this.g=null,this.D="",this.m=0,this.l="",this.j=this.B=this.u=this.A=!1,this.I=null,this.H="",this.J=!1}P(se,Ie);var y_=/^https?$/i,v_=["POST","PUT"];n=se.prototype,n.Ha=function(o){this.J=o},n.ea=function(o,u,h,f){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.D+"; newUri="+o);u=u?u.toUpperCase():"GET",this.D=o,this.l="",this.m=0,this.A=!1,this.h=!0,this.g=this.o?this.o.g():ra.g(),this.v=this.o?hh(this.o):hh(ra),this.g.onreadystatechange=v(this.Ea,this);try{this.B=!0,this.g.open(u,String(o),!0),this.B=!1}catch(A){Mh(this,A);return}if(o=h||"",h=new Map(this.headers),f)if(Object.getPrototypeOf(f)===Object.prototype)for(var T in f)h.set(T,f[T]);else if(typeof f.keys=="function"&&typeof f.get=="function")for(let A of f.keys())h.set(A,f.get(A));else throw Error("Unknown input type for opt_headers: "+String(f));f=Array.from(h.keys()).find(A=>A.toLowerCase()=="content-type"),T=c.FormData&&o instanceof c.FormData,!(0<=Array.prototype.indexOf.call(v_,u,void 0))||f||T||h.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(let[A,D]of h)this.g.setRequestHeader(A,D);this.H&&(this.g.responseType=this.H),"withCredentials"in this.g&&this.g.withCredentials!==this.J&&(this.g.withCredentials=this.J);try{Bh(this),this.u=!0,this.g.send(o),this.u=!1}catch(A){Mh(this,A)}};function Mh(o,u){o.h=!1,o.g&&(o.j=!0,o.g.abort(),o.j=!1),o.l=u,o.m=5,Fh(o),zi(o)}function Fh(o){o.A||(o.A=!0,Re(o,"complete"),Re(o,"error"))}n.abort=function(o){this.g&&this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1,this.m=o||7,Re(this,"complete"),Re(this,"abort"),zi(this))},n.N=function(){this.g&&(this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1),zi(this,!0)),se.aa.N.call(this)},n.Ea=function(){this.s||(this.B||this.u||this.j?Uh(this):this.bb())},n.bb=function(){Uh(this)};function Uh(o){if(o.h&&typeof a<"u"&&(!o.v[1]||ut(o)!=4||o.Z()!=2)){if(o.u&&ut(o)==4)ah(o.Ea,0,o);else if(Re(o,"readystatechange"),ut(o)==4){o.h=!1;try{let D=o.Z();e:switch(D){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var u=!0;break e;default:u=!1}var h;if(!(h=u)){var f;if(f=D===0){var T=String(o.D).match(Ch)[1]||null;!T&&c.self&&c.self.location&&(T=c.self.location.protocol.slice(0,-1)),f=!y_.test(T?T.toLowerCase():"")}h=f}if(h)Re(o,"complete"),Re(o,"success");else{o.m=6;try{var A=2<ut(o)?o.g.statusText:""}catch(Y){A=""}o.l=A+" ["+o.Z()+"]",Fh(o)}}finally{zi(o)}}}}function zi(o,u){if(o.g){Bh(o);let h=o.g,f=o.v[0]?()=>{}:null;o.g=null,o.v=null,u||Re(o,"ready");try{h.onreadystatechange=f}catch(T){}}}function Bh(o){o.I&&(c.clearTimeout(o.I),o.I=null)}n.isActive=function(){return!!this.g};function ut(o){return o.g?o.g.readyState:0}n.Z=function(){try{return 2<ut(this)?this.g.status:-1}catch(o){return-1}},n.oa=function(){try{return this.g?this.g.responseText:""}catch(o){return""}},n.Oa=function(o){if(this.g){var u=this.g.responseText;return o&&u.indexOf(o)==0&&(u=u.substring(o.length)),Yg(u)}};function qh(o){try{if(!o.g)return null;if("response"in o.g)return o.g.response;switch(o.H){case"":case"text":return o.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in o.g)return o.g.mozResponseArrayBuffer}return null}catch(u){return null}}function I_(o){let u={};o=(o.g&&2<=ut(o)&&o.g.getAllResponseHeaders()||"").split("\r\n");for(let f=0;f<o.length;f++){if(M(o[f]))continue;var h=E(o[f]);let T=h[0];if(h=h[1],typeof h!="string")continue;h=h.trim();let A=u[T]||[];u[T]=A,A.push(h)}w(u,function(f){return f.join(", ")})}n.Ba=function(){return this.m},n.Ka=function(){return typeof this.l=="string"?this.l:String(this.l)};function kr(o,u,h){return h&&h.internalChannelParams&&h.internalChannelParams[o]||u}function jh(o){this.Aa=0,this.i=[],this.j=new Er,this.ia=this.qa=this.I=this.W=this.g=this.ya=this.D=this.H=this.m=this.S=this.o=null,this.Ya=this.U=0,this.Va=kr("failFast",!1,o),this.F=this.C=this.u=this.s=this.l=null,this.X=!0,this.za=this.T=-1,this.Y=this.v=this.B=0,this.Ta=kr("baseRetryDelayMs",5e3,o),this.cb=kr("retryDelaySeedMs",1e4,o),this.Wa=kr("forwardChannelMaxRetries",2,o),this.wa=kr("forwardChannelRequestTimeoutMs",2e4,o),this.pa=o&&o.xmlHttpFactory||void 0,this.Xa=o&&o.Tb||void 0,this.Ca=o&&o.useFetchStreams||!1,this.L=void 0,this.J=o&&o.supportsCrossDomainXhr||!1,this.K="",this.h=new Th(o&&o.concurrentRequestLimit),this.Da=new g_,this.P=o&&o.fastHandshake||!1,this.O=o&&o.encodeInitMessageHeaders||!1,this.P&&this.O&&(this.O=!1),this.Ua=o&&o.Rb||!1,o&&o.xa&&this.j.xa(),o&&o.forceLongPolling&&(this.X=!1),this.ba=!this.P&&this.X&&o&&o.detectBufferingProxy||!1,this.ja=void 0,o&&o.longPollingTimeout&&0<o.longPollingTimeout&&(this.ja=o.longPollingTimeout),this.ca=void 0,this.R=0,this.M=!1,this.ka=this.A=null}n=jh.prototype,n.la=8,n.G=1,n.connect=function(o,u,h,f){Pe(0),this.W=o,this.H=u||{},h&&f!==void 0&&(this.H.OSID=h,this.H.OAID=f),this.F=this.X,this.I=Yh(this,null,this.W),Gi(this)};function ha(o){if(zh(o),o.G==3){var u=o.U++,h=ct(o.I);if(J(h,"SID",o.K),J(h,"RID",u),J(h,"TYPE","terminate"),Nr(o,h),u=new Pt(o,o.j,u),u.L=2,u.v=qi(ct(h)),h=!1,c.navigator&&c.navigator.sendBeacon)try{h=c.navigator.sendBeacon(u.v.toString(),"")}catch(f){}!h&&c.Image&&(new Image().src=u.v,h=!0),h||(u.g=Jh(u.j,null),u.g.ea(u.v)),u.F=Date.now(),Fi(u)}Xh(o)}function $i(o){o.g&&(fa(o),o.g.cancel(),o.g=null)}function zh(o){$i(o),o.u&&(c.clearTimeout(o.u),o.u=null),Hi(o),o.h.cancel(),o.s&&(typeof o.s=="number"&&c.clearTimeout(o.s),o.s=null)}function Gi(o){if(!bh(o.h)&&!o.s){o.s=!0;var u=o.Ga;pr||th(),mr||(pr(),mr=!0),$o.add(u,o),o.B=0}}function w_(o,u){return Ah(o.h)>=o.h.j-(o.s?1:0)?!1:o.s?(o.i=u.D.concat(o.i),!0):o.G==1||o.G==2||o.B>=(o.Va?0:o.Wa)?!1:(o.s=wr(v(o.Ga,o,u),Qh(o,o.B)),o.B++,!0)}n.Ga=function(o){if(this.s)if(this.s=null,this.G==1){if(!o){this.U=Math.floor(1e5*Math.random()),o=this.U++;let T=new Pt(this,this.j,o),A=this.o;if(this.S&&(A?(A=g(A),I(A,this.S)):A=this.S),this.m!==null||this.O||(T.H=A,A=null),this.P)e:{for(var u=0,h=0;h<this.i.length;h++){t:{var f=this.i[h];if("__data__"in f.map&&(f=f.map.__data__,typeof f=="string")){f=f.length;break t}f=void 0}if(f===void 0)break;if(u+=f,4096<u){u=h;break e}if(u===4096||h===this.i.length-1){u=h+1;break e}}u=1e3}else u=1e3;u=Gh(this,T,u),h=ct(this.I),J(h,"RID",o),J(h,"CVER",22),this.D&&J(h,"X-HTTP-Session-Id",this.D),Nr(this,h),A&&(this.O?u="headers="+encodeURIComponent(String(Lh(A)))+"&"+u:this.m&&la(h,this.m,A)),ua(this.h,T),this.Ua&&J(h,"TYPE","init"),this.P?(J(h,"$req",u),J(h,"SID","null"),T.T=!0,sa(T,h,null)):sa(T,h,u),this.G=2}}else this.G==3&&(o?$h(this,o):this.i.length==0||bh(this.h)||$h(this))};function $h(o,u){var h;u?h=u.l:h=o.U++;let f=ct(o.I);J(f,"SID",o.K),J(f,"RID",h),J(f,"AID",o.T),Nr(o,f),o.m&&o.o&&la(f,o.m,o.o),h=new Pt(o,o.j,h,o.B+1),o.m===null&&(h.H=o.o),u&&(o.i=u.D.concat(o.i)),u=Gh(o,h,1e3),h.I=Math.round(.5*o.wa)+Math.round(.5*o.wa*Math.random()),ua(o.h,h),sa(h,f,u)}function Nr(o,u){o.H&&H(o.H,function(h,f){J(u,f,h)}),o.l&&Ph({},function(h,f){J(u,f,h)})}function Gh(o,u,h){h=Math.min(o.i.length,h);var f=o.l?v(o.l.Na,o.l,o):null;e:{var T=o.i;let A=-1;for(;;){let D=["count="+h];A==-1?0<h?(A=T[0].g,D.push("ofs="+A)):A=0:D.push("ofs="+A);let Y=!0;for(let _e=0;_e<h;_e++){let Q=T[_e].g,we=T[_e].map;if(Q-=A,0>Q)A=Math.max(0,T[_e].g-100),Y=!1;else try{__(we,D,"req"+Q+"_")}catch(Ee){f&&f(we)}}if(Y){f=D.join("&");break e}}}return o=o.i.splice(0,h),u.D=o,f}function Hh(o){if(!o.g&&!o.u){o.Y=1;var u=o.Fa;pr||th(),mr||(pr(),mr=!0),$o.add(u,o),o.v=0}}function da(o){return o.g||o.u||3<=o.v?!1:(o.Y++,o.u=wr(v(o.Fa,o),Qh(o,o.v)),o.v++,!0)}n.Fa=function(){if(this.u=null,Wh(this),this.ba&&!(this.M||this.g==null||0>=this.R)){var o=2*this.R;this.j.info("BP detection timer enabled: "+o),this.A=wr(v(this.ab,this),o)}},n.ab=function(){this.A&&(this.A=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.F=!1,this.M=!0,Pe(10),$i(this),Wh(this))};function fa(o){o.A!=null&&(c.clearTimeout(o.A),o.A=null)}function Wh(o){o.g=new Pt(o,o.j,"rpc",o.Y),o.m===null&&(o.g.H=o.o),o.g.O=0;var u=ct(o.qa);J(u,"RID","rpc"),J(u,"SID",o.K),J(u,"AID",o.T),J(u,"CI",o.F?"0":"1"),!o.F&&o.ja&&J(u,"TO",o.ja),J(u,"TYPE","xmlhttp"),Nr(o,u),o.m&&o.o&&la(u,o.m,o.o),o.L&&(o.g.I=o.L);var h=o.g;o=o.ia,h.L=1,h.v=qi(ct(u)),h.m=null,h.P=!0,Ih(h,o)}n.Za=function(){this.C!=null&&(this.C=null,$i(this),da(this),Pe(19))};function Hi(o){o.C!=null&&(c.clearTimeout(o.C),o.C=null)}function Kh(o,u){var h=null;if(o.g==u){Hi(o),fa(o),o.g=null;var f=2}else if(ca(o.h,u))h=u.D,Sh(o.h,u),f=1;else return;if(o.G!=0){if(u.o)if(f==1){h=u.m?u.m.length:0,u=Date.now()-u.F;var T=o.B;f=Vi(),Re(f,new gh(f,h)),Gi(o)}else Hh(o);else if(T=u.s,T==3||T==0&&0<u.X||!(f==1&&w_(o,u)||f==2&&da(o)))switch(h&&0<h.length&&(u=o.h,u.i=u.i.concat(h)),T){case 1:Xt(o,5);break;case 4:Xt(o,10);break;case 3:Xt(o,6);break;default:Xt(o,2)}}}function Qh(o,u){let h=o.Ta+Math.floor(Math.random()*o.cb);return o.isActive()||(h*=2),h*u}function Xt(o,u){if(o.j.info("Error code "+u),u==2){var h=v(o.fb,o),f=o.Xa;let T=!f;f=new Qt(f||"//www.google.com/images/cleardot.gif"),c.location&&c.location.protocol=="http"||Ui(f,"https"),qi(f),T?p_(f.toString(),h):m_(f.toString(),h)}else Pe(2);o.G=0,o.l&&o.l.sa(u),Xh(o),zh(o)}n.fb=function(o){o?(this.j.info("Successfully pinged google.com"),Pe(2)):(this.j.info("Failed to ping google.com"),Pe(1))};function Xh(o){if(o.G=0,o.ka=[],o.l){let u=Rh(o.h);(u.length!=0||o.i.length!=0)&&(C(o.ka,u),C(o.ka,o.i),o.h.i.length=0,N(o.i),o.i.length=0),o.l.ra()}}function Yh(o,u,h){var f=h instanceof Qt?ct(h):new Qt(h);if(f.g!="")u&&(f.g=u+"."+f.g),Bi(f,f.s);else{var T=c.location;f=T.protocol,u=u?u+"."+T.hostname:T.hostname,T=+T.port;var A=new Qt(null);f&&Ui(A,f),u&&(A.g=u),T&&Bi(A,T),h&&(A.l=h),f=A}return h=o.D,u=o.ya,h&&u&&J(f,h,u),J(f,"VER",o.la),Nr(o,f),f}function Jh(o,u,h){if(u&&!o.J)throw Error("Can't create secondary domain capable XhrIo object.");return u=o.Ca&&!o.pa?new se(new Rr({eb:h})):new se(o.pa),u.Ha(o.J),u}n.isActive=function(){return!!this.l&&this.l.isActive(this)};function Zh(){}n=Zh.prototype,n.ua=function(){},n.ta=function(){},n.sa=function(){},n.ra=function(){},n.isActive=function(){return!0},n.Na=function(){};function Wi(){}Wi.prototype.g=function(o,u){return new xe(o,u)};function xe(o,u){Ie.call(this),this.g=new jh(u),this.l=o,this.h=u&&u.messageUrlParams||null,o=u&&u.messageHeaders||null,u&&u.clientProtocolHeaderRequired&&(o?o["X-Client-Protocol"]="webchannel":o={"X-Client-Protocol":"webchannel"}),this.g.o=o,o=u&&u.initMessageHeaders||null,u&&u.messageContentType&&(o?o["X-WebChannel-Content-Type"]=u.messageContentType:o={"X-WebChannel-Content-Type":u.messageContentType}),u&&u.va&&(o?o["X-WebChannel-Client-Profile"]=u.va:o={"X-WebChannel-Client-Profile":u.va}),this.g.S=o,(o=u&&u.Sb)&&!M(o)&&(this.g.m=o),this.v=u&&u.supportsCrossDomainXhr||!1,this.u=u&&u.sendRawJson||!1,(u=u&&u.httpSessionIdParam)&&!M(u)&&(this.g.D=u,o=this.h,o!==null&&u in o&&(o=this.h,u in o&&delete o[u])),this.j=new Rn(this)}P(xe,Ie),xe.prototype.m=function(){this.g.l=this.j,this.v&&(this.g.J=!0),this.g.connect(this.l,this.h||void 0)},xe.prototype.close=function(){ha(this.g)},xe.prototype.o=function(o){var u=this.g;if(typeof o=="string"){var h={};h.__data__=o,o=h}else this.u&&(h={},h.__data__=Zo(o),o=h);u.i.push(new i_(u.Ya++,o)),u.G==3&&Gi(u)},xe.prototype.N=function(){this.g.l=null,delete this.j,ha(this.g),delete this.g,xe.aa.N.call(this)};function ed(o){ta.call(this),o.__headers__&&(this.headers=o.__headers__,this.statusCode=o.__status__,delete o.__headers__,delete o.__status__);var u=o.__sm__;if(u){e:{for(let h in u){o=h;break e}o=void 0}(this.i=o)&&(o=this.i,u=u!==null&&o in u?u[o]:void 0),this.data=u}else this.data=o}P(ed,ta);function td(){na.call(this),this.status=1}P(td,na);function Rn(o){this.g=o}P(Rn,Zh),Rn.prototype.ua=function(){Re(this.g,"a")},Rn.prototype.ta=function(o){Re(this.g,new ed(o))},Rn.prototype.sa=function(o){Re(this.g,new td)},Rn.prototype.ra=function(){Re(this.g,"b")},Wi.prototype.createWebChannel=Wi.prototype.g,xe.prototype.send=xe.prototype.o,xe.prototype.open=xe.prototype.m,xe.prototype.close=xe.prototype.close,Ec=gt.createWebChannelTransport=function(){return new Wi},wc=gt.getStatEventTarget=function(){return Vi()},Ic=gt.Event=Wt,qs=gt.Stat={mb:0,pb:1,qb:2,Jb:3,Ob:4,Lb:5,Mb:6,Kb:7,Ib:8,Nb:9,PROXY:10,NOPROXY:11,Gb:12,Cb:13,Db:14,Bb:15,Eb:16,Fb:17,ib:18,hb:19,jb:20},Li.NO_ERROR=0,Li.TIMEOUT=8,Li.HTTP_ERROR=6,Jr=gt.ErrorCode=Li,_h.COMPLETE="complete",vc=gt.EventType=_h,dh.EventType=vr,vr.OPEN="a",vr.CLOSE="b",vr.ERROR="c",vr.MESSAGE="d",Ie.prototype.listen=Ie.prototype.K,Ln=gt.WebChannel=dh,MI=gt.FetchXmlHttpFactory=Rr,se.prototype.listenOnce=se.prototype.L,se.prototype.getLastError=se.prototype.Ka,se.prototype.getLastErrorCode=se.prototype.Ba,se.prototype.getStatus=se.prototype.Z,se.prototype.getResponseJson=se.prototype.Oa,se.prototype.getResponseText=se.prototype.oa,se.prototype.send=se.prototype.ea,se.prototype.setWithCredentials=se.prototype.Ha,yc=gt.XhrIo=se}).apply(typeof Bs<"u"?Bs:typeof self<"u"?self:typeof window<"u"?window:{});var Lf="@firebase/firestore",Mf="4.8.0";var pe=class{constructor(e){this.uid=e}isAuthenticated(){return this.uid!=null}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(e){return e.uid===this.uid}};pe.UNAUTHENTICATED=new pe(null),pe.GOOGLE_CREDENTIALS=new pe("google-credentials-uid"),pe.FIRST_PARTY=new pe("first-party-uid"),pe.MOCK_USER=new pe("mock-user");var nr="11.10.0";var fn=new Nt("@firebase/firestore");function Mn(){return fn.logLevel}function x(n,...e){if(fn.logLevel<=G.DEBUG){let t=e.map(hl);fn.debug("Firestore (".concat(nr,"): ").concat(n),...t)}}function yt(n,...e){if(fn.logLevel<=G.ERROR){let t=e.map(hl);fn.error("Firestore (".concat(nr,"): ").concat(n),...t)}}function Bt(n,...e){if(fn.logLevel<=G.WARN){let t=e.map(hl);fn.warn("Firestore (".concat(nr,"): ").concat(n),...t)}}function hl(n){if(typeof n=="string")return n;try{return function(t){return JSON.stringify(t)}(n)}catch(e){return n}}function B(n,e,t){let r="Unexpected state";typeof e=="string"?r=e:t=e,Cp(n,r,t)}function Cp(n,e,t){let r="FIRESTORE (".concat(nr,") INTERNAL ASSERTION FAILED: ").concat(e," (ID: ").concat(n.toString(16),")");if(t!==void 0)try{r+=" CONTEXT: "+JSON.stringify(t)}catch(i){r+=" CONTEXT: "+t}throw yt(r),new Error(r)}function X(n,e,t,r){let i="Unexpected state";typeof t=="string"?i=t:r=t,n||Cp(e,i,r)}function j(n,e){return n}var R={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"},O=class extends Ce{constructor(e,t){super(e,t),this.code=e,this.message=t,this.toString=()=>"".concat(this.name,": [code=").concat(this.code,"]: ").concat(this.message)}};var ze=class{constructor(){this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}};var Ks=class{constructor(e,t){this.user=t,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization","Bearer ".concat(e))}},Rc=class{getToken(){return Promise.resolve(null)}invalidateToken(){}start(e,t){e.enqueueRetryable(()=>t(pe.UNAUTHENTICATED))}shutdown(){}},Pc=class{constructor(e){this.token=e,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(e,t){this.changeListener=t,e.enqueueRetryable(()=>t(this.token.user))}shutdown(){this.changeListener=null}},Cc=class{constructor(e){this.t=e,this.currentUser=pe.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(e,t){X(this.o===void 0,42304);let r=this.i,i=l=>this.i!==r?(r=this.i,t(l)):Promise.resolve(),s=new ze;this.o=()=>{this.i++,this.currentUser=this.u(),s.resolve(),s=new ze,e.enqueueRetryable(()=>i(this.currentUser))};let a=()=>{let l=s;e.enqueueRetryable(async()=>{await l.promise,await i(this.currentUser)})},c=l=>{x("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=l,this.o&&(this.auth.addAuthTokenListener(this.o),a())};this.t.onInit(l=>c(l)),setTimeout(()=>{if(!this.auth){let l=this.t.getImmediate({optional:!0});l?c(l):(x("FirebaseAuthCredentialsProvider","Auth not yet detected"),s.resolve(),s=new ze)}},0),a()}getToken(){let e=this.i,t=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(t).then(r=>this.i!==e?(x("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):r?(X(typeof r.accessToken=="string",31837,{l:r}),new Ks(r.accessToken,this.currentUser)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.o&&this.auth.removeAuthTokenListener(this.o),this.o=void 0}u(){let e=this.auth&&this.auth.getUid();return X(e===null||typeof e=="string",2055,{h:e}),new pe(e)}},kc=class{constructor(e,t,r){this.P=e,this.T=t,this.I=r,this.type="FirstParty",this.user=pe.FIRST_PARTY,this.A=new Map}R(){return this.I?this.I():null}get headers(){this.A.set("X-Goog-AuthUser",this.P);let e=this.R();return e&&this.A.set("Authorization",e),this.T&&this.A.set("X-Goog-Iam-Authorization-Token",this.T),this.A}},Nc=class{constructor(e,t,r){this.P=e,this.T=t,this.I=r}getToken(){return Promise.resolve(new kc(this.P,this.T,this.I))}start(e,t){e.enqueueRetryable(()=>t(pe.FIRST_PARTY))}shutdown(){}invalidateToken(){}},Qs=class{constructor(e){this.value=e,this.type="AppCheck",this.headers=new Map,e&&e.length>0&&this.headers.set("x-firebase-appcheck",this.value)}},Dc=class{constructor(e,t){this.V=t,this.forceRefresh=!1,this.appCheck=null,this.m=null,this.p=null,Te(e)&&e.settings.appCheckToken&&(this.p=e.settings.appCheckToken)}start(e,t){X(this.o===void 0,3512);let r=s=>{s.error!=null&&x("FirebaseAppCheckTokenProvider","Error getting App Check token; using placeholder token instead. Error: ".concat(s.error.message));let a=s.token!==this.m;return this.m=s.token,x("FirebaseAppCheckTokenProvider","Received ".concat(a?"new":"existing"," token.")),a?t(s.token):Promise.resolve()};this.o=s=>{e.enqueueRetryable(()=>r(s))};let i=s=>{x("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=s,this.o&&this.appCheck.addTokenListener(this.o)};this.V.onInit(s=>i(s)),setTimeout(()=>{if(!this.appCheck){let s=this.V.getImmediate({optional:!0});s?i(s):x("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}},0)}getToken(){if(this.p)return Promise.resolve(new Qs(this.p));let e=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(e).then(t=>t?(X(typeof t.token=="string",44558,{tokenResult:t}),this.m=t.token,new Qs(t.token)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.o&&this.appCheck.removeTokenListener(this.o),this.o=void 0}};function FI(n){let e=typeof self<"u"&&(self.crypto||self.msCrypto),t=new Uint8Array(n);if(e&&typeof e.getRandomValues=="function")e.getRandomValues(t);else for(let r=0;r<n;r++)t[r]=Math.floor(256*Math.random());return t}function kp(){return new TextEncoder}var ii=class{static newId(){let e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",t=62*Math.floor(4.129032258064516),r="";for(;r.length<20;){let i=FI(40);for(let s=0;s<i.length;++s)r.length<20&&i[s]<t&&(r+=e.charAt(i[s]%62))}return r}};function $(n,e){return n<e?-1:n>e?1:0}function Oc(n,e){let t=0;for(;t<n.length&&t<e.length;){let r=n.codePointAt(t),i=e.codePointAt(t);if(r!==i){if(r<128&&i<128)return $(r,i);{let s=kp(),a=UI(s.encode(Ff(n,t)),s.encode(Ff(e,t)));return a!==0?a:$(r,i)}}t+=r>65535?2:1}return $(n.length,e.length)}function Ff(n,e){return n.codePointAt(e)>65535?n.substring(e,e+2):n.substring(e,e+1)}function UI(n,e){for(let t=0;t<n.length&&t<e.length;++t)if(n[t]!==e[t])return $(n[t],e[t]);return $(n.length,e.length)}function $n(n,e,t){return n.length===e.length&&n.every((r,i)=>t(r,e[i]))}var Uf="__name__",Xs=class n{constructor(e,t,r){t===void 0?t=0:t>e.length&&B(637,{offset:t,range:e.length}),r===void 0?r=e.length-t:r>e.length-t&&B(1746,{length:r,range:e.length-t}),this.segments=e,this.offset=t,this.len=r}get length(){return this.len}isEqual(e){return n.comparator(this,e)===0}child(e){let t=this.segments.slice(this.offset,this.limit());return e instanceof n?e.forEach(r=>{t.push(r)}):t.push(e),this.construct(t)}limit(){return this.offset+this.length}popFirst(e){return e=e===void 0?1:e,this.construct(this.segments,this.offset+e,this.length-e)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(e){return this.segments[this.offset+e]}isEmpty(){return this.length===0}isPrefixOf(e){if(e.length<this.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}isImmediateParentOf(e){if(this.length+1!==e.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}forEach(e){for(let t=this.offset,r=this.limit();t<r;t++)e(this.segments[t])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(e,t){let r=Math.min(e.length,t.length);for(let i=0;i<r;i++){let s=n.compareSegments(e.get(i),t.get(i));if(s!==0)return s}return $(e.length,t.length)}static compareSegments(e,t){let r=n.isNumericId(e),i=n.isNumericId(t);return r&&!i?-1:!r&&i?1:r&&i?n.extractNumericId(e).compare(n.extractNumericId(t)):Oc(e,t)}static isNumericId(e){return e.startsWith("__id")&&e.endsWith("__")}static extractNumericId(e){return mt.fromString(e.substring(4,e.length-2))}},ne=class n extends Xs{construct(e,t,r){return new n(e,t,r)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...e){let t=[];for(let r of e){if(r.indexOf("//")>=0)throw new O(R.INVALID_ARGUMENT,"Invalid segment (".concat(r,"). Paths must not contain // in them."));t.push(...r.split("/").filter(i=>i.length>0))}return new n(t)}static emptyPath(){return new n([])}},BI=/^[_a-zA-Z][_a-zA-Z0-9]*$/,Ve=class n extends Xs{construct(e,t,r){return new n(e,t,r)}static isValidIdentifier(e){return BI.test(e)}canonicalString(){return this.toArray().map(e=>(e=e.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),n.isValidIdentifier(e)||(e="`"+e+"`"),e)).join(".")}toString(){return this.canonicalString()}isKeyField(){return this.length===1&&this.get(0)===Uf}static keyField(){return new n([Uf])}static fromServerFormat(e){let t=[],r="",i=0,s=()=>{if(r.length===0)throw new O(R.INVALID_ARGUMENT,"Invalid field path (".concat(e,"). Paths must not be empty, begin with '.', end with '.', or contain '..'"));t.push(r),r=""},a=!1;for(;i<e.length;){let c=e[i];if(c==="\\"){if(i+1===e.length)throw new O(R.INVALID_ARGUMENT,"Path has trailing escape character: "+e);let l=e[i+1];if(l!=="\\"&&l!=="."&&l!=="`")throw new O(R.INVALID_ARGUMENT,"Path has invalid escape sequence: "+e);r+=l,i+=2}else c==="`"?(a=!a,i++):c!=="."||a?(r+=c,i++):(s(),i++)}if(s(),a)throw new O(R.INVALID_ARGUMENT,"Unterminated ` in path: "+e);return new n(t)}static emptyPath(){return new n([])}};var F=class n{constructor(e){this.path=e}static fromPath(e){return new n(ne.fromString(e))}static fromName(e){return new n(ne.fromString(e).popFirst(5))}static empty(){return new n(ne.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(e){return this.path.length>=2&&this.path.get(this.path.length-2)===e}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(e){return e!==null&&ne.comparator(this.path,e.path)===0}toString(){return this.path.toString()}static comparator(e,t){return ne.comparator(e.path,t.path)}static isDocumentKey(e){return e.length%2==0}static fromSegments(e){return new n(new ne(e.slice()))}};function Np(n,e,t){if(!t)throw new O(R.INVALID_ARGUMENT,"Function ".concat(n,"() cannot be called with an empty ").concat(e,"."))}function qI(n,e,t,r){if(e===!0&&r===!0)throw new O(R.INVALID_ARGUMENT,"".concat(n," and ").concat(t," cannot be used together."))}function Bf(n){if(!F.isDocumentKey(n))throw new O(R.INVALID_ARGUMENT,"Invalid document reference. Document references must have an even number of segments, but ".concat(n," has ").concat(n.length,"."))}function qf(n){if(F.isDocumentKey(n))throw new O(R.INVALID_ARGUMENT,"Invalid collection reference. Collection references must have an odd number of segments, but ".concat(n," has ").concat(n.length,"."))}function Dp(n){return typeof n=="object"&&n!==null&&(Object.getPrototypeOf(n)===Object.prototype||Object.getPrototypeOf(n)===null)}function Ro(n){if(n===void 0)return"undefined";if(n===null)return"null";if(typeof n=="string")return n.length>20&&(n="".concat(n.substring(0,20),"...")),JSON.stringify(n);if(typeof n=="number"||typeof n=="boolean")return""+n;if(typeof n=="object"){if(n instanceof Array)return"an array";{let e=function(r){return r.constructor?r.constructor.name:null}(n);return e?"a custom ".concat(e," object"):"an object"}}return typeof n=="function"?"a function":B(12329,{type:typeof n})}function Fe(n,e){if("_delegate"in n&&(n=n._delegate),!(n instanceof e)){if(e.name===n.constructor.name)throw new O(R.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{let t=Ro(n);throw new O(R.INVALID_ARGUMENT,"Expected type '".concat(e.name,"', but it was: ").concat(t))}}return n}function jI(n,e){if(e<=0)throw new O(R.INVALID_ARGUMENT,"Function ".concat(n,"() requires a positive number, but it was: ").concat(e,"."))}function le(n,e){let t={typeString:n};return e&&(t.value=e),t}function Ei(n,e){if(!Dp(n))throw new O(R.INVALID_ARGUMENT,"JSON must be an object");let t;for(let r in e)if(e[r]){let i=e[r].typeString,s="value"in e[r]?{value:e[r].value}:void 0;if(!(r in n)){t="JSON missing required field: '".concat(r,"'");break}let a=n[r];if(i&&typeof a!==i){t="JSON field '".concat(r,"' must be a ").concat(i,".");break}if(s!==void 0&&a!==s.value){t="Expected '".concat(r,"' field to equal '").concat(s.value,"'");break}}if(t)throw new O(R.INVALID_ARGUMENT,t);return!0}var jf=-62135596800,zf=1e6,he=class n{static now(){return n.fromMillis(Date.now())}static fromDate(e){return n.fromMillis(e.getTime())}static fromMillis(e){let t=Math.floor(e/1e3),r=Math.floor((e-1e3*t)*zf);return new n(t,r)}constructor(e,t){if(this.seconds=e,this.nanoseconds=t,t<0)throw new O(R.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(t>=1e9)throw new O(R.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(e<jf)throw new O(R.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e);if(e>=253402300800)throw new O(R.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/zf}_compareTo(e){return this.seconds===e.seconds?$(this.nanoseconds,e.nanoseconds):$(this.seconds,e.seconds)}isEqual(e){return e.seconds===this.seconds&&e.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{type:n._jsonSchemaVersion,seconds:this.seconds,nanoseconds:this.nanoseconds}}static fromJSON(e){if(Ei(e,n._jsonSchema))return new n(e.seconds,e.nanoseconds)}valueOf(){let e=this.seconds-jf;return String(e).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}};he._jsonSchemaVersion="firestore/timestamp/1.0",he._jsonSchema={type:le("string",he._jsonSchemaVersion),seconds:le("number"),nanoseconds:le("number")};var z=class n{static fromTimestamp(e){return new n(e)}static min(){return new n(new he(0,0))}static max(){return new n(new he(253402300799,999999999))}constructor(e){this.timestamp=e}compareTo(e){return this.timestamp._compareTo(e.timestamp)}isEqual(e){return this.timestamp.isEqual(e.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}};var si=-1,xc=class{constructor(e,t,r,i){this.indexId=e,this.collectionGroup=t,this.fields=r,this.indexState=i}};xc.UNKNOWN_ID=-1;function zI(n,e){let t=n.toTimestamp().seconds,r=n.toTimestamp().nanoseconds+1,i=z.fromTimestamp(r===1e9?new he(t+1,0):new he(t,r));return new pn(i,F.empty(),e)}function $I(n){return new pn(n.readTime,n.key,si)}var pn=class n{constructor(e,t,r){this.readTime=e,this.documentKey=t,this.largestBatchId=r}static min(){return new n(z.min(),F.empty(),si)}static max(){return new n(z.max(),F.empty(),si)}};function GI(n,e){let t=n.readTime.compareTo(e.readTime);return t!==0?t:(t=F.comparator(n.documentKey,e.documentKey),t!==0?t:$(n.largestBatchId,e.largestBatchId))}var HI="The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.",Vc=class{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(e){this.onCommittedListeners.push(e)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach(e=>e())}};async function rr(n){if(n.code!==R.FAILED_PRECONDITION||n.message!==HI)throw n;x("LocalStore","Unexpectedly lost primary lease")}var k=class n{constructor(e){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,e(t=>{this.isDone=!0,this.result=t,this.nextCallback&&this.nextCallback(t)},t=>{this.isDone=!0,this.error=t,this.catchCallback&&this.catchCallback(t)})}catch(e){return this.next(void 0,e)}next(e,t){return this.callbackAttached&&B(59440),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(t,this.error):this.wrapSuccess(e,this.result):new n((r,i)=>{this.nextCallback=s=>{this.wrapSuccess(e,s).next(r,i)},this.catchCallback=s=>{this.wrapFailure(t,s).next(r,i)}})}toPromise(){return new Promise((e,t)=>{this.next(e,t)})}wrapUserFunction(e){try{let t=e();return t instanceof n?t:n.resolve(t)}catch(t){return n.reject(t)}}wrapSuccess(e,t){return e?this.wrapUserFunction(()=>e(t)):n.resolve(t)}wrapFailure(e,t){return e?this.wrapUserFunction(()=>e(t)):n.reject(t)}static resolve(e){return new n((t,r)=>{t(e)})}static reject(e){return new n((t,r)=>{r(e)})}static waitFor(e){return new n((t,r)=>{let i=0,s=0,a=!1;e.forEach(c=>{++i,c.next(()=>{++s,a&&s===i&&t()},l=>r(l))}),a=!0,s===i&&t()})}static or(e){let t=n.resolve(!1);for(let r of e)t=t.next(i=>i?n.resolve(i):r());return t}static forEach(e,t){let r=[];return e.forEach((i,s)=>{r.push(t.call(this,i,s))}),this.waitFor(r)}static mapArray(e,t){return new n((r,i)=>{let s=e.length,a=new Array(s),c=0;for(let l=0;l<s;l++){let d=l;t(e[d]).next(p=>{a[d]=p,++c,c===s&&r(a)},p=>i(p))}})}static doWhile(e,t){return new n((r,i)=>{let s=()=>{e()===!0?t().next(()=>{s()},i):r()};s()})}};function WI(n){let e=n.match(/Android ([\d.]+)/i),t=e?e[1].split(".").slice(0,2).join("."):"-1";return Number(t)}function ir(n){return n.name==="IndexedDbTransactionError"}var Gn=class{constructor(e,t){this.previousValue=e,t&&(t.sequenceNumberHandler=r=>this._e(r),this.ae=r=>t.writeSequenceNumber(r))}_e(e){return this.previousValue=Math.max(e,this.previousValue),this.previousValue}next(){let e=++this.previousValue;return this.ae&&this.ae(e),e}};Gn.ue=-1;var dl=-1;function Po(n){return n==null}function oi(n){return n===0&&1/n==-1/0}function KI(n){return typeof n=="number"&&Number.isInteger(n)&&!oi(n)&&n<=Number.MAX_SAFE_INTEGER&&n>=Number.MIN_SAFE_INTEGER}var Op="";function QI(n){let e="";for(let t=0;t<n.length;t++)e.length>0&&(e=$f(e)),e=XI(n.get(t),e);return $f(e)}function XI(n,e){let t=e,r=n.length;for(let i=0;i<r;i++){let s=n.charAt(i);switch(s){case"\0":t+="";break;case Op:t+="";break;default:t+=s}}return t}function $f(n){return n+Op+""}var YI="remoteDocuments",xp="owner";var Vp="mutationQueues";var Lp="mutations";var Mp="documentMutations",JI="remoteDocumentsV14";var Fp="remoteDocumentGlobal";var Up="targets";var Bp="targetDocuments";var qp="targetGlobal",jp="collectionParents";var zp="clientMetadata";var $p="bundles";var Gp="namedQueries";var ZI="indexConfiguration";var ew="indexState";var tw="indexEntries";var Hp="documentOverlays";var nw="globals";var rw=[Vp,Lp,Mp,YI,Up,xp,qp,Bp,zp,Fp,jp,$p,Gp],i0=[...rw,Hp],iw=[Vp,Lp,Mp,JI,Up,xp,qp,Bp,zp,Fp,jp,$p,Gp,Hp],sw=iw,ow=[...sw,ZI,ew,tw];var s0=[...ow,nw];function Gf(n){let e=0;for(let t in n)Object.prototype.hasOwnProperty.call(n,t)&&e++;return e}function wn(n,e){for(let t in n)Object.prototype.hasOwnProperty.call(n,t)&&e(t,n[t])}function Wp(n){for(let e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}var oe=class n{constructor(e,t){this.comparator=e,this.root=t||et.EMPTY}insert(e,t){return new n(this.comparator,this.root.insert(e,t,this.comparator).copy(null,null,et.BLACK,null,null))}remove(e){return new n(this.comparator,this.root.remove(e,this.comparator).copy(null,null,et.BLACK,null,null))}get(e){let t=this.root;for(;!t.isEmpty();){let r=this.comparator(e,t.key);if(r===0)return t.value;r<0?t=t.left:r>0&&(t=t.right)}return null}indexOf(e){let t=0,r=this.root;for(;!r.isEmpty();){let i=this.comparator(e,r.key);if(i===0)return t+r.left.size;i<0?r=r.left:(t+=r.left.size+1,r=r.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(e){return this.root.inorderTraversal(e)}forEach(e){this.inorderTraversal((t,r)=>(e(t,r),!1))}toString(){let e=[];return this.inorderTraversal((t,r)=>(e.push("".concat(t,":").concat(r)),!1)),"{".concat(e.join(", "),"}")}reverseTraversal(e){return this.root.reverseTraversal(e)}getIterator(){return new qn(this.root,null,this.comparator,!1)}getIteratorFrom(e){return new qn(this.root,e,this.comparator,!1)}getReverseIterator(){return new qn(this.root,null,this.comparator,!0)}getReverseIteratorFrom(e){return new qn(this.root,e,this.comparator,!0)}},qn=class{constructor(e,t,r,i){this.isReverse=i,this.nodeStack=[];let s=1;for(;!e.isEmpty();)if(s=t?r(e.key,t):1,t&&i&&(s*=-1),s<0)e=this.isReverse?e.left:e.right;else{if(s===0){this.nodeStack.push(e);break}this.nodeStack.push(e),e=this.isReverse?e.right:e.left}}getNext(){let e=this.nodeStack.pop(),t={key:e.key,value:e.value};if(this.isReverse)for(e=e.left;!e.isEmpty();)this.nodeStack.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack.push(e),e=e.left;return t}hasNext(){return this.nodeStack.length>0}peek(){if(this.nodeStack.length===0)return null;let e=this.nodeStack[this.nodeStack.length-1];return{key:e.key,value:e.value}}},et=class n{constructor(e,t,r,i,s){this.key=e,this.value=t,this.color=r!=null?r:n.RED,this.left=i!=null?i:n.EMPTY,this.right=s!=null?s:n.EMPTY,this.size=this.left.size+1+this.right.size}copy(e,t,r,i,s){return new n(e!=null?e:this.key,t!=null?t:this.value,r!=null?r:this.color,i!=null?i:this.left,s!=null?s:this.right)}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,t,r){let i=this,s=r(e,i.key);return i=s<0?i.copy(null,null,null,i.left.insert(e,t,r),null):s===0?i.copy(null,t,null,null,null):i.copy(null,null,null,null,i.right.insert(e,t,r)),i.fixUp()}removeMin(){if(this.left.isEmpty())return n.EMPTY;let e=this;return e.left.isRed()||e.left.left.isRed()||(e=e.moveRedLeft()),e=e.copy(null,null,null,e.left.removeMin(),null),e.fixUp()}remove(e,t){let r,i=this;if(t(e,i.key)<0)i.left.isEmpty()||i.left.isRed()||i.left.left.isRed()||(i=i.moveRedLeft()),i=i.copy(null,null,null,i.left.remove(e,t),null);else{if(i.left.isRed()&&(i=i.rotateRight()),i.right.isEmpty()||i.right.isRed()||i.right.left.isRed()||(i=i.moveRedRight()),t(e,i.key)===0){if(i.right.isEmpty())return n.EMPTY;r=i.right.min(),i=i.copy(r.key,r.value,null,null,i.right.removeMin())}i=i.copy(null,null,null,null,i.right.remove(e,t))}return i.fixUp()}isRed(){return this.color}fixUp(){let e=this;return e.right.isRed()&&!e.left.isRed()&&(e=e.rotateLeft()),e.left.isRed()&&e.left.left.isRed()&&(e=e.rotateRight()),e.left.isRed()&&e.right.isRed()&&(e=e.colorFlip()),e}moveRedLeft(){let e=this.colorFlip();return e.right.left.isRed()&&(e=e.copy(null,null,null,null,e.right.rotateRight()),e=e.rotateLeft(),e=e.colorFlip()),e}moveRedRight(){let e=this.colorFlip();return e.left.left.isRed()&&(e=e.rotateRight(),e=e.colorFlip()),e}rotateLeft(){let e=this.copy(null,null,n.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight(){let e=this.copy(null,null,n.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip(){let e=this.left.copy(null,null,!this.left.color,null,null),t=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,t)}checkMaxDepth(){let e=this.check();return Math.pow(2,e)<=this.size+1}check(){if(this.isRed()&&this.left.isRed())throw B(43730,{key:this.key,value:this.value});if(this.right.isRed())throw B(14113,{key:this.key,value:this.value});let e=this.left.check();if(e!==this.right.check())throw B(27949);return e+(this.isRed()?0:1)}};et.EMPTY=null,et.RED=!0,et.BLACK=!1;et.EMPTY=new class{constructor(){this.size=0}get key(){throw B(57766)}get value(){throw B(16141)}get color(){throw B(16727)}get left(){throw B(29726)}get right(){throw B(36894)}copy(e,t,r,i,s){return this}insert(e,t,r){return new et(e,t)}remove(e,t){return this}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};var me=class n{constructor(e){this.comparator=e,this.data=new oe(this.comparator)}has(e){return this.data.get(e)!==null}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(e){return this.data.indexOf(e)}forEach(e){this.data.inorderTraversal((t,r)=>(e(t),!1))}forEachInRange(e,t){let r=this.data.getIteratorFrom(e[0]);for(;r.hasNext();){let i=r.getNext();if(this.comparator(i.key,e[1])>=0)return;t(i.key)}}forEachWhile(e,t){let r;for(r=t!==void 0?this.data.getIteratorFrom(t):this.data.getIterator();r.hasNext();)if(!e(r.getNext().key))return}firstAfterOrEqual(e){let t=this.data.getIteratorFrom(e);return t.hasNext()?t.getNext().key:null}getIterator(){return new Ys(this.data.getIterator())}getIteratorFrom(e){return new Ys(this.data.getIteratorFrom(e))}add(e){return this.copy(this.data.remove(e).insert(e,!0))}delete(e){return this.has(e)?this.copy(this.data.remove(e)):this}isEmpty(){return this.data.isEmpty()}unionWith(e){let t=this;return t.size<e.size&&(t=e,e=this),e.forEach(r=>{t=t.add(r)}),t}isEqual(e){if(!(e instanceof n)||this.size!==e.size)return!1;let t=this.data.getIterator(),r=e.data.getIterator();for(;t.hasNext();){let i=t.getNext().key,s=r.getNext().key;if(this.comparator(i,s)!==0)return!1}return!0}toArray(){let e=[];return this.forEach(t=>{e.push(t)}),e}toString(){let e=[];return this.forEach(t=>e.push(t)),"SortedSet("+e.toString()+")"}copy(e){let t=new n(this.comparator);return t.data=e,t}},Ys=class{constructor(e){this.iter=e}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}};var Ze=class n{constructor(e){this.fields=e,e.sort(Ve.comparator)}static empty(){return new n([])}unionWith(e){let t=new me(Ve.comparator);for(let r of this.fields)t=t.add(r);for(let r of e)t=t.add(r);return new n(t.toArray())}covers(e){for(let t of this.fields)if(t.isPrefixOf(e))return!0;return!1}isEqual(e){return $n(this.fields,e.fields,(t,r)=>t.isEqual(r))}};var Js=class extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}};var Se=class n{constructor(e){this.binaryString=e}static fromBase64String(e){let t=function(i){try{return atob(i)}catch(s){throw typeof DOMException<"u"&&s instanceof DOMException?new Js("Invalid base64 string: "+s):s}}(e);return new n(t)}static fromUint8Array(e){let t=function(i){let s="";for(let a=0;a<i.length;++a)s+=String.fromCharCode(i[a]);return s}(e);return new n(t)}[Symbol.iterator](){let e=0;return{next:()=>e<this.binaryString.length?{value:this.binaryString.charCodeAt(e++),done:!1}:{value:void 0,done:!0}}}toBase64(){return function(t){return btoa(t)}(this.binaryString)}toUint8Array(){return function(t){let r=new Uint8Array(t.length);for(let i=0;i<t.length;i++)r[i]=t.charCodeAt(i);return r}(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(e){return $(this.binaryString,e.binaryString)}isEqual(e){return this.binaryString===e.binaryString}};Se.EMPTY_BYTE_STRING=new Se("");var aw=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function vt(n){if(X(!!n,39018),typeof n=="string"){let e=0,t=aw.exec(n);if(X(!!t,46558,{timestamp:n}),t[1]){let i=t[1];i=(i+"000000000").substr(0,9),e=Number(i)}let r=new Date(n);return{seconds:Math.floor(r.getTime()/1e3),nanos:e}}return{seconds:te(n.seconds),nanos:te(n.nanos)}}function te(n){return typeof n=="number"?n:typeof n=="string"?Number(n):0}function It(n){return typeof n=="string"?Se.fromBase64String(n):Se.fromUint8Array(n)}var Kp="server_timestamp",Qp="__type__",Xp="__previous_value__",Yp="__local_write_time__";function fl(n){var e,t;return((t=(((e=n==null?void 0:n.mapValue)===null||e===void 0?void 0:e.fields)||{})[Qp])===null||t===void 0?void 0:t.stringValue)===Kp}function Co(n){let e=n.mapValue.fields[Xp];return fl(e)?Co(e):e}function ai(n){let e=vt(n.mapValue.fields[Yp].timestampValue);return new he(e.seconds,e.nanos)}var Lc=class{constructor(e,t,r,i,s,a,c,l,d,p){this.databaseId=e,this.appId=t,this.persistenceKey=r,this.host=i,this.ssl=s,this.forceLongPolling=a,this.autoDetectLongPolling=c,this.longPollingOptions=l,this.useFetchStreams=d,this.isUsingEmulator=p}},Zs="(default)",eo=class n{constructor(e,t){this.projectId=e,this.database=t||Zs}static empty(){return new n("","")}get isDefaultDatabase(){return this.database===Zs}isEqual(e){return e instanceof n&&e.projectId===this.projectId&&e.database===this.database}};var pl="__type__",Jp="__max__",js={mapValue:{fields:{__type__:{stringValue:Jp}}}},ml="__vector__",Hn="value";function qt(n){return"nullValue"in n?0:"booleanValue"in n?1:"integerValue"in n||"doubleValue"in n?2:"timestampValue"in n?3:"stringValue"in n?5:"bytesValue"in n?6:"referenceValue"in n?7:"geoPointValue"in n?8:"arrayValue"in n?9:"mapValue"in n?fl(n)?4:em(n)?9007199254740991:Zp(n)?10:11:B(28295,{value:n})}function rt(n,e){if(n===e)return!0;let t=qt(n);if(t!==qt(e))return!1;switch(t){case 0:case 9007199254740991:return!0;case 1:return n.booleanValue===e.booleanValue;case 4:return ai(n).isEqual(ai(e));case 3:return function(i,s){if(typeof i.timestampValue=="string"&&typeof s.timestampValue=="string"&&i.timestampValue.length===s.timestampValue.length)return i.timestampValue===s.timestampValue;let a=vt(i.timestampValue),c=vt(s.timestampValue);return a.seconds===c.seconds&&a.nanos===c.nanos}(n,e);case 5:return n.stringValue===e.stringValue;case 6:return function(i,s){return It(i.bytesValue).isEqual(It(s.bytesValue))}(n,e);case 7:return n.referenceValue===e.referenceValue;case 8:return function(i,s){return te(i.geoPointValue.latitude)===te(s.geoPointValue.latitude)&&te(i.geoPointValue.longitude)===te(s.geoPointValue.longitude)}(n,e);case 2:return function(i,s){if("integerValue"in i&&"integerValue"in s)return te(i.integerValue)===te(s.integerValue);if("doubleValue"in i&&"doubleValue"in s){let a=te(i.doubleValue),c=te(s.doubleValue);return a===c?oi(a)===oi(c):isNaN(a)&&isNaN(c)}return!1}(n,e);case 9:return $n(n.arrayValue.values||[],e.arrayValue.values||[],rt);case 10:case 11:return function(i,s){let a=i.mapValue.fields||{},c=s.mapValue.fields||{};if(Gf(a)!==Gf(c))return!1;for(let l in a)if(a.hasOwnProperty(l)&&(c[l]===void 0||!rt(a[l],c[l])))return!1;return!0}(n,e);default:return B(52216,{left:n})}}function ci(n,e){return(n.values||[]).find(t=>rt(t,e))!==void 0}function Wn(n,e){if(n===e)return 0;let t=qt(n),r=qt(e);if(t!==r)return $(t,r);switch(t){case 0:case 9007199254740991:return 0;case 1:return $(n.booleanValue,e.booleanValue);case 2:return function(s,a){let c=te(s.integerValue||s.doubleValue),l=te(a.integerValue||a.doubleValue);return c<l?-1:c>l?1:c===l?0:isNaN(c)?isNaN(l)?0:-1:1}(n,e);case 3:return Hf(n.timestampValue,e.timestampValue);case 4:return Hf(ai(n),ai(e));case 5:return Oc(n.stringValue,e.stringValue);case 6:return function(s,a){let c=It(s),l=It(a);return c.compareTo(l)}(n.bytesValue,e.bytesValue);case 7:return function(s,a){let c=s.split("/"),l=a.split("/");for(let d=0;d<c.length&&d<l.length;d++){let p=$(c[d],l[d]);if(p!==0)return p}return $(c.length,l.length)}(n.referenceValue,e.referenceValue);case 8:return function(s,a){let c=$(te(s.latitude),te(a.latitude));return c!==0?c:$(te(s.longitude),te(a.longitude))}(n.geoPointValue,e.geoPointValue);case 9:return Wf(n.arrayValue,e.arrayValue);case 10:return function(s,a){var c,l,d,p;let m=s.fields||{},v=a.fields||{},S=(c=m[Hn])===null||c===void 0?void 0:c.arrayValue,P=(l=v[Hn])===null||l===void 0?void 0:l.arrayValue,N=$(((d=S==null?void 0:S.values)===null||d===void 0?void 0:d.length)||0,((p=P==null?void 0:P.values)===null||p===void 0?void 0:p.length)||0);return N!==0?N:Wf(S,P)}(n.mapValue,e.mapValue);case 11:return function(s,a){if(s===js.mapValue&&a===js.mapValue)return 0;if(s===js.mapValue)return 1;if(a===js.mapValue)return-1;let c=s.fields||{},l=Object.keys(c),d=a.fields||{},p=Object.keys(d);l.sort(),p.sort();for(let m=0;m<l.length&&m<p.length;++m){let v=Oc(l[m],p[m]);if(v!==0)return v;let S=Wn(c[l[m]],d[p[m]]);if(S!==0)return S}return $(l.length,p.length)}(n.mapValue,e.mapValue);default:throw B(23264,{le:t})}}function Hf(n,e){if(typeof n=="string"&&typeof e=="string"&&n.length===e.length)return $(n,e);let t=vt(n),r=vt(e),i=$(t.seconds,r.seconds);return i!==0?i:$(t.nanos,r.nanos)}function Wf(n,e){let t=n.values||[],r=e.values||[];for(let i=0;i<t.length&&i<r.length;++i){let s=Wn(t[i],r[i]);if(s)return s}return $(t.length,r.length)}function Kn(n){return Mc(n)}function Mc(n){return"nullValue"in n?"null":"booleanValue"in n?""+n.booleanValue:"integerValue"in n?""+n.integerValue:"doubleValue"in n?""+n.doubleValue:"timestampValue"in n?function(t){let r=vt(t);return"time(".concat(r.seconds,",").concat(r.nanos,")")}(n.timestampValue):"stringValue"in n?n.stringValue:"bytesValue"in n?function(t){return It(t).toBase64()}(n.bytesValue):"referenceValue"in n?function(t){return F.fromName(t).toString()}(n.referenceValue):"geoPointValue"in n?function(t){return"geo(".concat(t.latitude,",").concat(t.longitude,")")}(n.geoPointValue):"arrayValue"in n?function(t){let r="[",i=!0;for(let s of t.values||[])i?i=!1:r+=",",r+=Mc(s);return r+"]"}(n.arrayValue):"mapValue"in n?function(t){let r=Object.keys(t.fields||{}).sort(),i="{",s=!0;for(let a of r)s?s=!1:i+=",",i+="".concat(a,":").concat(Mc(t.fields[a]));return i+"}"}(n.mapValue):B(61005,{value:n})}function Gs(n){switch(qt(n)){case 0:case 1:return 4;case 2:return 8;case 3:case 8:return 16;case 4:let e=Co(n);return e?16+Gs(e):16;case 5:return 2*n.stringValue.length;case 6:return It(n.bytesValue).approximateByteSize();case 7:return n.referenceValue.length;case 9:return function(r){return(r.values||[]).reduce((i,s)=>i+Gs(s),0)}(n.arrayValue);case 10:case 11:return function(r){let i=0;return wn(r.fields,(s,a)=>{i+=s.length+Gs(a)}),i}(n.mapValue);default:throw B(13486,{value:n})}}function Kf(n,e){return{referenceValue:"projects/".concat(n.projectId,"/databases/").concat(n.database,"/documents/").concat(e.path.canonicalString())}}function Fc(n){return!!n&&"integerValue"in n}function gl(n){return!!n&&"arrayValue"in n}function Qf(n){return!!n&&"nullValue"in n}function Xf(n){return!!n&&"doubleValue"in n&&isNaN(Number(n.doubleValue))}function Hs(n){return!!n&&"mapValue"in n}function Zp(n){var e,t;return((t=(((e=n==null?void 0:n.mapValue)===null||e===void 0?void 0:e.fields)||{})[pl])===null||t===void 0?void 0:t.stringValue)===ml}function ei(n){if(n.geoPointValue)return{geoPointValue:Object.assign({},n.geoPointValue)};if(n.timestampValue&&typeof n.timestampValue=="object")return{timestampValue:Object.assign({},n.timestampValue)};if(n.mapValue){let e={mapValue:{fields:{}}};return wn(n.mapValue.fields,(t,r)=>e.mapValue.fields[t]=ei(r)),e}if(n.arrayValue){let e={arrayValue:{values:[]}};for(let t=0;t<(n.arrayValue.values||[]).length;++t)e.arrayValue.values[t]=ei(n.arrayValue.values[t]);return e}return Object.assign({},n)}function em(n){return(((n.mapValue||{}).fields||{}).__type__||{}).stringValue===Jp}var a0={mapValue:{fields:{[pl]:{stringValue:ml},[Hn]:{arrayValue:{}}}}};var je=class n{constructor(e){this.value=e}static empty(){return new n({mapValue:{}})}field(e){if(e.isEmpty())return this.value;{let t=this.value;for(let r=0;r<e.length-1;++r)if(t=(t.mapValue.fields||{})[e.get(r)],!Hs(t))return null;return t=(t.mapValue.fields||{})[e.lastSegment()],t||null}}set(e,t){this.getFieldsMap(e.popLast())[e.lastSegment()]=ei(t)}setAll(e){let t=Ve.emptyPath(),r={},i=[];e.forEach((a,c)=>{if(!t.isImmediateParentOf(c)){let l=this.getFieldsMap(t);this.applyChanges(l,r,i),r={},i=[],t=c.popLast()}a?r[c.lastSegment()]=ei(a):i.push(c.lastSegment())});let s=this.getFieldsMap(t);this.applyChanges(s,r,i)}delete(e){let t=this.field(e.popLast());Hs(t)&&t.mapValue.fields&&delete t.mapValue.fields[e.lastSegment()]}isEqual(e){return rt(this.value,e.value)}getFieldsMap(e){let t=this.value;t.mapValue.fields||(t.mapValue={fields:{}});for(let r=0;r<e.length;++r){let i=t.mapValue.fields[e.get(r)];Hs(i)&&i.mapValue.fields||(i={mapValue:{fields:{}}},t.mapValue.fields[e.get(r)]=i),t=i}return t.mapValue.fields}applyChanges(e,t,r){wn(t,(i,s)=>e[i]=s);for(let i of r)delete e[i]}clone(){return new n(ei(this.value))}};function tm(n){let e=[];return wn(n.fields,(t,r)=>{let i=new Ve([t]);if(Hs(r)){let s=tm(r.mapValue).fields;if(s.length===0)e.push(i);else for(let a of s)e.push(i.child(a))}else e.push(i)}),new Ze(e)}var $e=class n{constructor(e,t,r,i,s,a,c){this.key=e,this.documentType=t,this.version=r,this.readTime=i,this.createTime=s,this.data=a,this.documentState=c}static newInvalidDocument(e){return new n(e,0,z.min(),z.min(),z.min(),je.empty(),0)}static newFoundDocument(e,t,r,i){return new n(e,1,t,z.min(),r,i,0)}static newNoDocument(e,t){return new n(e,2,t,z.min(),z.min(),je.empty(),0)}static newUnknownDocument(e,t){return new n(e,3,t,z.min(),z.min(),je.empty(),2)}convertToFoundDocument(e,t){return!this.createTime.isEqual(z.min())||this.documentType!==2&&this.documentType!==0||(this.createTime=e),this.version=e,this.documentType=1,this.data=t,this.documentState=0,this}convertToNoDocument(e){return this.version=e,this.documentType=2,this.data=je.empty(),this.documentState=0,this}convertToUnknownDocument(e){return this.version=e,this.documentType=3,this.data=je.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=z.min(),this}setReadTime(e){return this.readTime=e,this}get hasLocalMutations(){return this.documentState===1}get hasCommittedMutations(){return this.documentState===2}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return this.documentType!==0}isFoundDocument(){return this.documentType===1}isNoDocument(){return this.documentType===2}isUnknownDocument(){return this.documentType===3}isEqual(e){return e instanceof n&&this.key.isEqual(e.key)&&this.version.isEqual(e.version)&&this.documentType===e.documentType&&this.documentState===e.documentState&&this.data.isEqual(e.data)}mutableCopy(){return new n(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return"Document(".concat(this.key,", ").concat(this.version,", ").concat(JSON.stringify(this.data.value),", {createTime: ").concat(this.createTime,"}), {documentType: ").concat(this.documentType,"}), {documentState: ").concat(this.documentState,"})")}};var Qn=class{constructor(e,t){this.position=e,this.inclusive=t}};function Yf(n,e,t){let r=0;for(let i=0;i<n.position.length;i++){let s=e[i],a=n.position[i];if(s.field.isKeyField()?r=F.comparator(F.fromName(a.referenceValue),t.key):r=Wn(a,t.data.field(s.field)),s.dir==="desc"&&(r*=-1),r!==0)break}return r}function Jf(n,e){if(n===null)return e===null;if(e===null||n.inclusive!==e.inclusive||n.position.length!==e.position.length)return!1;for(let t=0;t<n.position.length;t++)if(!rt(n.position[t],e.position[t]))return!1;return!0}var mn=class{constructor(e,t="asc"){this.field=e,this.dir=t}};function cw(n,e){return n.dir===e.dir&&n.field.isEqual(e.field)}var to=class{},ue=class n extends to{constructor(e,t,r){super(),this.field=e,this.op=t,this.value=r}static create(e,t,r){return e.isKeyField()?t==="in"||t==="not-in"?this.createKeyFieldInFilter(e,t,r):new Bc(e,t,r):t==="array-contains"?new zc(e,r):t==="in"?new $c(e,r):t==="not-in"?new Gc(e,r):t==="array-contains-any"?new Hc(e,r):new n(e,t,r)}static createKeyFieldInFilter(e,t,r){return t==="in"?new qc(e,r):new jc(e,r)}matches(e){let t=e.data.field(this.field);return this.op==="!="?t!==null&&t.nullValue===void 0&&this.matchesComparison(Wn(t,this.value)):t!==null&&qt(this.value)===qt(t)&&this.matchesComparison(Wn(t,this.value))}matchesComparison(e){switch(this.op){case"<":return e<0;case"<=":return e<=0;case"==":return e===0;case"!=":return e!==0;case">":return e>0;case">=":return e>=0;default:return B(47266,{operator:this.op})}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}},Ge=class n extends to{constructor(e,t){super(),this.filters=e,this.op=t,this.he=null}static create(e,t){return new n(e,t)}matches(e){return nm(this)?this.filters.find(t=>!t.matches(e))===void 0:this.filters.find(t=>t.matches(e))!==void 0}getFlattenedFilters(){return this.he!==null||(this.he=this.filters.reduce((e,t)=>e.concat(t.getFlattenedFilters()),[])),this.he}getFilters(){return Object.assign([],this.filters)}};function nm(n){return n.op==="and"}function rm(n){return uw(n)&&nm(n)}function uw(n){for(let e of n.filters)if(e instanceof Ge)return!1;return!0}function Uc(n){if(n instanceof ue)return n.field.canonicalString()+n.op.toString()+Kn(n.value);if(rm(n))return n.filters.map(e=>Uc(e)).join(",");{let e=n.filters.map(t=>Uc(t)).join(",");return"".concat(n.op,"(").concat(e,")")}}function im(n,e){return n instanceof ue?function(r,i){return i instanceof ue&&r.op===i.op&&r.field.isEqual(i.field)&&rt(r.value,i.value)}(n,e):n instanceof Ge?function(r,i){return i instanceof Ge&&r.op===i.op&&r.filters.length===i.filters.length?r.filters.reduce((s,a,c)=>s&&im(a,i.filters[c]),!0):!1}(n,e):void B(19439)}function sm(n){return n instanceof ue?function(t){return"".concat(t.field.canonicalString()," ").concat(t.op," ").concat(Kn(t.value))}(n):n instanceof Ge?function(t){return t.op.toString()+" {"+t.getFilters().map(sm).join(" ,")+"}"}(n):"Filter"}var Bc=class extends ue{constructor(e,t,r){super(e,t,r),this.key=F.fromName(r.referenceValue)}matches(e){let t=F.comparator(e.key,this.key);return this.matchesComparison(t)}},qc=class extends ue{constructor(e,t){super(e,"in",t),this.keys=om("in",t)}matches(e){return this.keys.some(t=>t.isEqual(e.key))}},jc=class extends ue{constructor(e,t){super(e,"not-in",t),this.keys=om("not-in",t)}matches(e){return!this.keys.some(t=>t.isEqual(e.key))}};function om(n,e){var t;return(((t=e.arrayValue)===null||t===void 0?void 0:t.values)||[]).map(r=>F.fromName(r.referenceValue))}var zc=class extends ue{constructor(e,t){super(e,"array-contains",t)}matches(e){let t=e.data.field(this.field);return gl(t)&&ci(t.arrayValue,this.value)}},$c=class extends ue{constructor(e,t){super(e,"in",t)}matches(e){let t=e.data.field(this.field);return t!==null&&ci(this.value.arrayValue,t)}},Gc=class extends ue{constructor(e,t){super(e,"not-in",t)}matches(e){if(ci(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;let t=e.data.field(this.field);return t!==null&&t.nullValue===void 0&&!ci(this.value.arrayValue,t)}},Hc=class extends ue{constructor(e,t){super(e,"array-contains-any",t)}matches(e){let t=e.data.field(this.field);return!(!gl(t)||!t.arrayValue.values)&&t.arrayValue.values.some(r=>ci(this.value.arrayValue,r))}};var Wc=class{constructor(e,t=null,r=[],i=[],s=null,a=null,c=null){this.path=e,this.collectionGroup=t,this.orderBy=r,this.filters=i,this.limit=s,this.startAt=a,this.endAt=c,this.Pe=null}};function Zf(n,e=null,t=[],r=[],i=null,s=null,a=null){return new Wc(n,e,t,r,i,s,a)}function _l(n){let e=j(n);if(e.Pe===null){let t=e.path.canonicalString();e.collectionGroup!==null&&(t+="|cg:"+e.collectionGroup),t+="|f:",t+=e.filters.map(r=>Uc(r)).join(","),t+="|ob:",t+=e.orderBy.map(r=>function(s){return s.field.canonicalString()+s.dir}(r)).join(","),Po(e.limit)||(t+="|l:",t+=e.limit),e.startAt&&(t+="|lb:",t+=e.startAt.inclusive?"b:":"a:",t+=e.startAt.position.map(r=>Kn(r)).join(",")),e.endAt&&(t+="|ub:",t+=e.endAt.inclusive?"a:":"b:",t+=e.endAt.position.map(r=>Kn(r)).join(",")),e.Pe=t}return e.Pe}function yl(n,e){if(n.limit!==e.limit||n.orderBy.length!==e.orderBy.length)return!1;for(let t=0;t<n.orderBy.length;t++)if(!cw(n.orderBy[t],e.orderBy[t]))return!1;if(n.filters.length!==e.filters.length)return!1;for(let t=0;t<n.filters.length;t++)if(!im(n.filters[t],e.filters[t]))return!1;return n.collectionGroup===e.collectionGroup&&!!n.path.isEqual(e.path)&&!!Jf(n.startAt,e.startAt)&&Jf(n.endAt,e.endAt)}function Kc(n){return F.isDocumentKey(n.path)&&n.collectionGroup===null&&n.filters.length===0}var jt=class{constructor(e,t=null,r=[],i=[],s=null,a="F",c=null,l=null){this.path=e,this.collectionGroup=t,this.explicitOrderBy=r,this.filters=i,this.limit=s,this.limitType=a,this.startAt=c,this.endAt=l,this.Te=null,this.Ie=null,this.de=null,this.startAt,this.endAt}};function lw(n,e,t,r,i,s,a,c){return new jt(n,e,t,r,i,s,a,c)}function ko(n){return new jt(n)}function ep(n){return n.filters.length===0&&n.limit===null&&n.startAt==null&&n.endAt==null&&(n.explicitOrderBy.length===0||n.explicitOrderBy.length===1&&n.explicitOrderBy[0].field.isKeyField())}function am(n){return n.collectionGroup!==null}function ti(n){let e=j(n);if(e.Te===null){e.Te=[];let t=new Set;for(let s of e.explicitOrderBy)e.Te.push(s),t.add(s.field.canonicalString());let r=e.explicitOrderBy.length>0?e.explicitOrderBy[e.explicitOrderBy.length-1].dir:"asc";(function(a){let c=new me(Ve.comparator);return a.filters.forEach(l=>{l.getFlattenedFilters().forEach(d=>{d.isInequality()&&(c=c.add(d.field))})}),c})(e).forEach(s=>{t.has(s.canonicalString())||s.isKeyField()||e.Te.push(new mn(s,r))}),t.has(Ve.keyField().canonicalString())||e.Te.push(new mn(Ve.keyField(),r))}return e.Te}function tt(n){let e=j(n);return e.Ie||(e.Ie=hw(e,ti(n))),e.Ie}function hw(n,e){if(n.limitType==="F")return Zf(n.path,n.collectionGroup,e,n.filters,n.limit,n.startAt,n.endAt);{e=e.map(i=>{let s=i.dir==="desc"?"asc":"desc";return new mn(i.field,s)});let t=n.endAt?new Qn(n.endAt.position,n.endAt.inclusive):null,r=n.startAt?new Qn(n.startAt.position,n.startAt.inclusive):null;return Zf(n.path,n.collectionGroup,e,n.filters,n.limit,t,r)}}function Qc(n,e){let t=n.filters.concat([e]);return new jt(n.path,n.collectionGroup,n.explicitOrderBy.slice(),t,n.limit,n.limitType,n.startAt,n.endAt)}function no(n,e,t){return new jt(n.path,n.collectionGroup,n.explicitOrderBy.slice(),n.filters.slice(),e,t,n.startAt,n.endAt)}function No(n,e){return yl(tt(n),tt(e))&&n.limitType===e.limitType}function cm(n){return"".concat(_l(tt(n)),"|lt:").concat(n.limitType)}function Fn(n){return"Query(target=".concat(function(t){let r=t.path.canonicalString();return t.collectionGroup!==null&&(r+=" collectionGroup="+t.collectionGroup),t.filters.length>0&&(r+=", filters: [".concat(t.filters.map(i=>sm(i)).join(", "),"]")),Po(t.limit)||(r+=", limit: "+t.limit),t.orderBy.length>0&&(r+=", orderBy: [".concat(t.orderBy.map(i=>function(a){return"".concat(a.field.canonicalString()," (").concat(a.dir,")")}(i)).join(", "),"]")),t.startAt&&(r+=", startAt: ",r+=t.startAt.inclusive?"b:":"a:",r+=t.startAt.position.map(i=>Kn(i)).join(",")),t.endAt&&(r+=", endAt: ",r+=t.endAt.inclusive?"a:":"b:",r+=t.endAt.position.map(i=>Kn(i)).join(",")),"Target(".concat(r,")")}(tt(n)),"; limitType=").concat(n.limitType,")")}function Do(n,e){return e.isFoundDocument()&&function(r,i){let s=i.key.path;return r.collectionGroup!==null?i.key.hasCollectionId(r.collectionGroup)&&r.path.isPrefixOf(s):F.isDocumentKey(r.path)?r.path.isEqual(s):r.path.isImmediateParentOf(s)}(n,e)&&function(r,i){for(let s of ti(r))if(!s.field.isKeyField()&&i.data.field(s.field)===null)return!1;return!0}(n,e)&&function(r,i){for(let s of r.filters)if(!s.matches(i))return!1;return!0}(n,e)&&function(r,i){return!(r.startAt&&!function(a,c,l){let d=Yf(a,c,l);return a.inclusive?d<=0:d<0}(r.startAt,ti(r),i)||r.endAt&&!function(a,c,l){let d=Yf(a,c,l);return a.inclusive?d>=0:d>0}(r.endAt,ti(r),i))}(n,e)}function dw(n){return n.collectionGroup||(n.path.length%2==1?n.path.lastSegment():n.path.get(n.path.length-2))}function um(n){return(e,t)=>{let r=!1;for(let i of ti(n)){let s=fw(i,e,t);if(s!==0)return s;r=r||i.field.isKeyField()}return 0}}function fw(n,e,t){let r=n.field.isKeyField()?F.comparator(e.key,t.key):function(s,a,c){let l=a.data.field(s),d=c.data.field(s);return l!==null&&d!==null?Wn(l,d):B(42886)}(n.field,e,t);switch(n.dir){case"asc":return r;case"desc":return-1*r;default:return B(19790,{direction:n.dir})}}var wt=class{constructor(e,t){this.mapKeyFn=e,this.equalsFn=t,this.inner={},this.innerSize=0}get(e){let t=this.mapKeyFn(e),r=this.inner[t];if(r!==void 0){for(let[i,s]of r)if(this.equalsFn(i,e))return s}}has(e){return this.get(e)!==void 0}set(e,t){let r=this.mapKeyFn(e),i=this.inner[r];if(i===void 0)return this.inner[r]=[[e,t]],void this.innerSize++;for(let s=0;s<i.length;s++)if(this.equalsFn(i[s][0],e))return void(i[s]=[e,t]);i.push([e,t]),this.innerSize++}delete(e){let t=this.mapKeyFn(e),r=this.inner[t];if(r===void 0)return!1;for(let i=0;i<r.length;i++)if(this.equalsFn(r[i][0],e))return r.length===1?delete this.inner[t]:r.splice(i,1),this.innerSize--,!0;return!1}forEach(e){wn(this.inner,(t,r)=>{for(let[i,s]of r)e(i,s)})}isEmpty(){return Wp(this.inner)}size(){return this.innerSize}};var pw=new oe(F.comparator);function Et(){return pw}var lm=new oe(F.comparator);function Zr(...n){let e=lm;for(let t of n)e=e.insert(t.key,t);return e}function hm(n){let e=lm;return n.forEach((t,r)=>e=e.insert(t,r.overlayedDocument)),e}function cn(){return ni()}function dm(){return ni()}function ni(){return new wt(n=>n.toString(),(n,e)=>n.isEqual(e))}var mw=new oe(F.comparator),gw=new me(F.comparator);function W(...n){let e=gw;for(let t of n)e=e.add(t);return e}var _w=new me($);function yw(){return _w}function vl(n,e){if(n.useProto3Json){if(isNaN(e))return{doubleValue:"NaN"};if(e===1/0)return{doubleValue:"Infinity"};if(e===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:oi(e)?"-0":e}}function fm(n){return{integerValue:""+n}}function vw(n,e){return KI(e)?fm(e):vl(n,e)}var Xn=class{constructor(){this._=void 0}};function Iw(n,e,t){return n instanceof gn?function(i,s){let a={fields:{[Qp]:{stringValue:Kp},[Yp]:{timestampValue:{seconds:i.seconds,nanos:i.nanoseconds}}}};return s&&fl(s)&&(s=Co(s)),s&&(a.fields[Xp]=s),{mapValue:a}}(t,e):n instanceof _n?mm(n,e):n instanceof yn?gm(n,e):function(i,s){let a=pm(i,s),c=tp(a)+tp(i.Ee);return Fc(a)&&Fc(i.Ee)?fm(c):vl(i.serializer,c)}(n,e)}function ww(n,e,t){return n instanceof _n?mm(n,e):n instanceof yn?gm(n,e):t}function pm(n,e){return n instanceof Yn?function(r){return Fc(r)||function(s){return!!s&&"doubleValue"in s}(r)}(e)?e:{integerValue:0}:null}var gn=class extends Xn{},_n=class extends Xn{constructor(e){super(),this.elements=e}};function mm(n,e){let t=_m(e);for(let r of n.elements)t.some(i=>rt(i,r))||t.push(r);return{arrayValue:{values:t}}}var yn=class extends Xn{constructor(e){super(),this.elements=e}};function gm(n,e){let t=_m(e);for(let r of n.elements)t=t.filter(i=>!rt(i,r));return{arrayValue:{values:t}}}var Yn=class extends Xn{constructor(e,t){super(),this.serializer=e,this.Ee=t}};function tp(n){return te(n.integerValue||n.doubleValue)}function _m(n){return gl(n)&&n.arrayValue.values?n.arrayValue.values.slice():[]}var Xc=class{constructor(e,t){this.field=e,this.transform=t}};function Ew(n,e){return n.field.isEqual(e.field)&&function(r,i){return r instanceof _n&&i instanceof _n||r instanceof yn&&i instanceof yn?$n(r.elements,i.elements,rt):r instanceof Yn&&i instanceof Yn?rt(r.Ee,i.Ee):r instanceof gn&&i instanceof gn}(n.transform,e.transform)}var Yc=class{constructor(e,t){this.version=e,this.transformResults=t}},_t=class n{constructor(e,t){this.updateTime=e,this.exists=t}static none(){return new n}static exists(e){return new n(void 0,e)}static updateTime(e){return new n(e)}get isNone(){return this.updateTime===void 0&&this.exists===void 0}isEqual(e){return this.exists===e.exists&&(this.updateTime?!!e.updateTime&&this.updateTime.isEqual(e.updateTime):!e.updateTime)}};function Ws(n,e){return n.updateTime!==void 0?e.isFoundDocument()&&e.version.isEqual(n.updateTime):n.exists===void 0||n.exists===e.isFoundDocument()}var Jn=class{};function ym(n,e){if(!n.hasLocalMutations||e&&e.fields.length===0)return null;if(e===null)return n.isNoDocument()?new ui(n.key,_t.none()):new vn(n.key,n.data,_t.none());{let t=n.data,r=je.empty(),i=new me(Ve.comparator);for(let s of e.fields)if(!i.has(s)){let a=t.field(s);a===null&&s.length>1&&(s=s.popLast(),a=t.field(s)),a===null?r.delete(s):r.set(s,a),i=i.add(s)}return new Tt(n.key,r,new Ze(i.toArray()),_t.none())}}function Tw(n,e,t){n instanceof vn?function(i,s,a){let c=i.value.clone(),l=rp(i.fieldTransforms,s,a.transformResults);c.setAll(l),s.convertToFoundDocument(a.version,c).setHasCommittedMutations()}(n,e,t):n instanceof Tt?function(i,s,a){if(!Ws(i.precondition,s))return void s.convertToUnknownDocument(a.version);let c=rp(i.fieldTransforms,s,a.transformResults),l=s.data;l.setAll(vm(i)),l.setAll(c),s.convertToFoundDocument(a.version,l).setHasCommittedMutations()}(n,e,t):function(i,s,a){s.convertToNoDocument(a.version).setHasCommittedMutations()}(0,e,t)}function ri(n,e,t,r){return n instanceof vn?function(s,a,c,l){if(!Ws(s.precondition,a))return c;let d=s.value.clone(),p=ip(s.fieldTransforms,l,a);return d.setAll(p),a.convertToFoundDocument(a.version,d).setHasLocalMutations(),null}(n,e,t,r):n instanceof Tt?function(s,a,c,l){if(!Ws(s.precondition,a))return c;let d=ip(s.fieldTransforms,l,a),p=a.data;return p.setAll(vm(s)),p.setAll(d),a.convertToFoundDocument(a.version,p).setHasLocalMutations(),c===null?null:c.unionWith(s.fieldMask.fields).unionWith(s.fieldTransforms.map(m=>m.field))}(n,e,t,r):function(s,a,c){return Ws(s.precondition,a)?(a.convertToNoDocument(a.version).setHasLocalMutations(),null):c}(n,e,t)}function bw(n,e){let t=null;for(let r of n.fieldTransforms){let i=e.data.field(r.field),s=pm(r.transform,i||null);s!=null&&(t===null&&(t=je.empty()),t.set(r.field,s))}return t||null}function np(n,e){return n.type===e.type&&!!n.key.isEqual(e.key)&&!!n.precondition.isEqual(e.precondition)&&!!function(r,i){return r===void 0&&i===void 0||!(!r||!i)&&$n(r,i,(s,a)=>Ew(s,a))}(n.fieldTransforms,e.fieldTransforms)&&(n.type===0?n.value.isEqual(e.value):n.type!==1||n.data.isEqual(e.data)&&n.fieldMask.isEqual(e.fieldMask))}var vn=class extends Jn{constructor(e,t,r,i=[]){super(),this.key=e,this.value=t,this.precondition=r,this.fieldTransforms=i,this.type=0}getFieldMask(){return null}},Tt=class extends Jn{constructor(e,t,r,i,s=[]){super(),this.key=e,this.data=t,this.fieldMask=r,this.precondition=i,this.fieldTransforms=s,this.type=1}getFieldMask(){return this.fieldMask}};function vm(n){let e=new Map;return n.fieldMask.fields.forEach(t=>{if(!t.isEmpty()){let r=n.data.field(t);e.set(t,r)}}),e}function rp(n,e,t){let r=new Map;X(n.length===t.length,32656,{Ae:t.length,Re:n.length});for(let i=0;i<t.length;i++){let s=n[i],a=s.transform,c=e.data.field(s.field);r.set(s.field,ww(a,c,t[i]))}return r}function ip(n,e,t){let r=new Map;for(let i of n){let s=i.transform,a=t.data.field(i.field);r.set(i.field,Iw(s,a,e))}return r}var ui=class extends Jn{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}},Jc=class extends Jn{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=3,this.fieldTransforms=[]}getFieldMask(){return null}};var Zc=class{constructor(e,t,r,i){this.batchId=e,this.localWriteTime=t,this.baseMutations=r,this.mutations=i}applyToRemoteDocument(e,t){let r=t.mutationResults;for(let i=0;i<this.mutations.length;i++){let s=this.mutations[i];s.key.isEqual(e.key)&&Tw(s,e,r[i])}}applyToLocalView(e,t){for(let r of this.baseMutations)r.key.isEqual(e.key)&&(t=ri(r,e,t,this.localWriteTime));for(let r of this.mutations)r.key.isEqual(e.key)&&(t=ri(r,e,t,this.localWriteTime));return t}applyToLocalDocumentSet(e,t){let r=dm();return this.mutations.forEach(i=>{let s=e.get(i.key),a=s.overlayedDocument,c=this.applyToLocalView(a,s.mutatedFields);c=t.has(i.key)?null:c;let l=ym(a,c);l!==null&&r.set(i.key,l),a.isValidDocument()||a.convertToNoDocument(z.min())}),r}keys(){return this.mutations.reduce((e,t)=>e.add(t.key),W())}isEqual(e){return this.batchId===e.batchId&&$n(this.mutations,e.mutations,(t,r)=>np(t,r))&&$n(this.baseMutations,e.baseMutations,(t,r)=>np(t,r))}},eu=class n{constructor(e,t,r,i){this.batch=e,this.commitVersion=t,this.mutationResults=r,this.docVersions=i}static from(e,t,r){X(e.mutations.length===r.length,58842,{Ve:e.mutations.length,me:r.length});let i=function(){return mw}(),s=e.mutations;for(let a=0;a<s.length;a++)i=i.insert(s[a].key,r[a].version);return new n(e,t,r,i)}};var tu=class{constructor(e,t){this.largestBatchId=e,this.mutation=t}getKey(){return this.mutation.key}isEqual(e){return e!==null&&this.mutation===e.mutation}toString(){return"Overlay{\n      largestBatchId: ".concat(this.largestBatchId,",\n      mutation: ").concat(this.mutation.toString(),"\n    }")}};var nu=class{constructor(e,t){this.count=e,this.unchangedNames=t}};var ae,K;function Aw(n){switch(n){case R.OK:return B(64938);case R.CANCELLED:case R.UNKNOWN:case R.DEADLINE_EXCEEDED:case R.RESOURCE_EXHAUSTED:case R.INTERNAL:case R.UNAVAILABLE:case R.UNAUTHENTICATED:return!1;case R.INVALID_ARGUMENT:case R.NOT_FOUND:case R.ALREADY_EXISTS:case R.PERMISSION_DENIED:case R.FAILED_PRECONDITION:case R.ABORTED:case R.OUT_OF_RANGE:case R.UNIMPLEMENTED:case R.DATA_LOSS:return!0;default:return B(15467,{code:n})}}function Im(n){if(n===void 0)return yt("GRPC error has no .code"),R.UNKNOWN;switch(n){case ae.OK:return R.OK;case ae.CANCELLED:return R.CANCELLED;case ae.UNKNOWN:return R.UNKNOWN;case ae.DEADLINE_EXCEEDED:return R.DEADLINE_EXCEEDED;case ae.RESOURCE_EXHAUSTED:return R.RESOURCE_EXHAUSTED;case ae.INTERNAL:return R.INTERNAL;case ae.UNAVAILABLE:return R.UNAVAILABLE;case ae.UNAUTHENTICATED:return R.UNAUTHENTICATED;case ae.INVALID_ARGUMENT:return R.INVALID_ARGUMENT;case ae.NOT_FOUND:return R.NOT_FOUND;case ae.ALREADY_EXISTS:return R.ALREADY_EXISTS;case ae.PERMISSION_DENIED:return R.PERMISSION_DENIED;case ae.FAILED_PRECONDITION:return R.FAILED_PRECONDITION;case ae.ABORTED:return R.ABORTED;case ae.OUT_OF_RANGE:return R.OUT_OF_RANGE;case ae.UNIMPLEMENTED:return R.UNIMPLEMENTED;case ae.DATA_LOSS:return R.DATA_LOSS;default:return B(39323,{code:n})}}(K=ae||(ae={}))[K.OK=0]="OK",K[K.CANCELLED=1]="CANCELLED",K[K.UNKNOWN=2]="UNKNOWN",K[K.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",K[K.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",K[K.NOT_FOUND=5]="NOT_FOUND",K[K.ALREADY_EXISTS=6]="ALREADY_EXISTS",K[K.PERMISSION_DENIED=7]="PERMISSION_DENIED",K[K.UNAUTHENTICATED=16]="UNAUTHENTICATED",K[K.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",K[K.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",K[K.ABORTED=10]="ABORTED",K[K.OUT_OF_RANGE=11]="OUT_OF_RANGE",K[K.UNIMPLEMENTED=12]="UNIMPLEMENTED",K[K.INTERNAL=13]="INTERNAL",K[K.UNAVAILABLE=14]="UNAVAILABLE",K[K.DATA_LOSS=15]="DATA_LOSS";var sp=null;var Sw=new mt([4294967295,4294967295],0);function op(n){let e=kp().encode(n),t=new _c;return t.update(e),new Uint8Array(t.digest())}function ap(n){let e=new DataView(n.buffer),t=e.getUint32(0,!0),r=e.getUint32(4,!0),i=e.getUint32(8,!0),s=e.getUint32(12,!0);return[new mt([t,r],0),new mt([i,s],0)]}var ru=class n{constructor(e,t,r){if(this.bitmap=e,this.padding=t,this.hashCount=r,t<0||t>=8)throw new un("Invalid padding: ".concat(t));if(r<0)throw new un("Invalid hash count: ".concat(r));if(e.length>0&&this.hashCount===0)throw new un("Invalid hash count: ".concat(r));if(e.length===0&&t!==0)throw new un("Invalid padding when bitmap length is 0: ".concat(t));this.fe=8*e.length-t,this.ge=mt.fromNumber(this.fe)}pe(e,t,r){let i=e.add(t.multiply(mt.fromNumber(r)));return i.compare(Sw)===1&&(i=new mt([i.getBits(0),i.getBits(1)],0)),i.modulo(this.ge).toNumber()}ye(e){return!!(this.bitmap[Math.floor(e/8)]&1<<e%8)}mightContain(e){if(this.fe===0)return!1;let t=op(e),[r,i]=ap(t);for(let s=0;s<this.hashCount;s++){let a=this.pe(r,i,s);if(!this.ye(a))return!1}return!0}static create(e,t,r){let i=e%8==0?0:8-e%8,s=new Uint8Array(Math.ceil(e/8)),a=new n(s,i,t);return r.forEach(c=>a.insert(c)),a}insert(e){if(this.fe===0)return;let t=op(e),[r,i]=ap(t);for(let s=0;s<this.hashCount;s++){let a=this.pe(r,i,s);this.we(a)}}we(e){let t=Math.floor(e/8),r=e%8;this.bitmap[t]|=1<<r}},un=class extends Error{constructor(){super(...arguments),this.name="BloomFilterError"}};var ro=class n{constructor(e,t,r,i,s){this.snapshotVersion=e,this.targetChanges=t,this.targetMismatches=r,this.documentUpdates=i,this.resolvedLimboDocuments=s}static createSynthesizedRemoteEventForCurrentChange(e,t,r){let i=new Map;return i.set(e,li.createSynthesizedTargetChangeForCurrentChange(e,t,r)),new n(z.min(),i,new oe($),Et(),W())}},li=class n{constructor(e,t,r,i,s){this.resumeToken=e,this.current=t,this.addedDocuments=r,this.modifiedDocuments=i,this.removedDocuments=s}static createSynthesizedTargetChangeForCurrentChange(e,t,r){return new n(r,t,W(),W(),W())}};var jn=class{constructor(e,t,r,i){this.Se=e,this.removedTargetIds=t,this.key=r,this.be=i}},io=class{constructor(e,t){this.targetId=e,this.De=t}},so=class{constructor(e,t,r=Se.EMPTY_BYTE_STRING,i=null){this.state=e,this.targetIds=t,this.resumeToken=r,this.cause=i}},oo=class{constructor(){this.ve=0,this.Ce=cp(),this.Fe=Se.EMPTY_BYTE_STRING,this.Me=!1,this.xe=!0}get current(){return this.Me}get resumeToken(){return this.Fe}get Oe(){return this.ve!==0}get Ne(){return this.xe}Be(e){e.approximateByteSize()>0&&(this.xe=!0,this.Fe=e)}Le(){let e=W(),t=W(),r=W();return this.Ce.forEach((i,s)=>{switch(s){case 0:e=e.add(i);break;case 2:t=t.add(i);break;case 1:r=r.add(i);break;default:B(38017,{changeType:s})}}),new li(this.Fe,this.Me,e,t,r)}ke(){this.xe=!1,this.Ce=cp()}qe(e,t){this.xe=!0,this.Ce=this.Ce.insert(e,t)}Qe(e){this.xe=!0,this.Ce=this.Ce.remove(e)}$e(){this.ve+=1}Ue(){this.ve-=1,X(this.ve>=0,3241,{ve:this.ve})}Ke(){this.xe=!0,this.Me=!0}},iu=class{constructor(e){this.We=e,this.Ge=new Map,this.ze=Et(),this.je=zs(),this.Je=zs(),this.He=new oe($)}Ye(e){for(let t of e.Se)e.be&&e.be.isFoundDocument()?this.Ze(t,e.be):this.Xe(t,e.key,e.be);for(let t of e.removedTargetIds)this.Xe(t,e.key,e.be)}et(e){this.forEachTarget(e,t=>{let r=this.tt(t);switch(e.state){case 0:this.nt(t)&&r.Be(e.resumeToken);break;case 1:r.Ue(),r.Oe||r.ke(),r.Be(e.resumeToken);break;case 2:r.Ue(),r.Oe||this.removeTarget(t);break;case 3:this.nt(t)&&(r.Ke(),r.Be(e.resumeToken));break;case 4:this.nt(t)&&(this.rt(t),r.Be(e.resumeToken));break;default:B(56790,{state:e.state})}})}forEachTarget(e,t){e.targetIds.length>0?e.targetIds.forEach(t):this.Ge.forEach((r,i)=>{this.nt(i)&&t(i)})}it(e){let t=e.targetId,r=e.De.count,i=this.st(t);if(i){let s=i.target;if(Kc(s))if(r===0){let a=new F(s.path);this.Xe(t,a,$e.newNoDocument(a,z.min()))}else X(r===1,20013,{expectedCount:r});else{let a=this.ot(t);if(a!==r){let c=this._t(e),l=c?this.ut(c,e,a):1;if(l!==0){this.rt(t);let d=l===2?"TargetPurposeExistenceFilterMismatchBloom":"TargetPurposeExistenceFilterMismatch";this.He=this.He.insert(t,d)}sp==null||sp.ct(function(p,m,v,S,P){var N,C,U,M,L,q;let ie={localCacheCount:p,existenceFilterCount:m.count,databaseId:v.database,projectId:v.projectId},H=m.unchangedNames;return H&&(ie.bloomFilter={applied:P===0,hashCount:(N=H==null?void 0:H.hashCount)!==null&&N!==void 0?N:0,bitmapLength:(M=(U=(C=H==null?void 0:H.bits)===null||C===void 0?void 0:C.bitmap)===null||U===void 0?void 0:U.length)!==null&&M!==void 0?M:0,padding:(q=(L=H==null?void 0:H.bits)===null||L===void 0?void 0:L.padding)!==null&&q!==void 0?q:0,mightContain:w=>{var g;return(g=S==null?void 0:S.mightContain(w))!==null&&g!==void 0&&g}}),ie}(a,e.De,this.We.lt(),c,l))}}}}_t(e){let t=e.De.unchangedNames;if(!t||!t.bits)return null;let{bits:{bitmap:r="",padding:i=0},hashCount:s=0}=t,a,c;try{a=It(r).toUint8Array()}catch(l){if(l instanceof Js)return Bt("Decoding the base64 bloom filter in existence filter failed ("+l.message+"); ignoring the bloom filter and falling back to full re-query."),null;throw l}try{c=new ru(a,i,s)}catch(l){return Bt(l instanceof un?"BloomFilter error: ":"Applying bloom filter failed: ",l),null}return c.fe===0?null:c}ut(e,t,r){return t.De.count===r-this.ht(e,t.targetId)?0:2}ht(e,t){let r=this.We.getRemoteKeysForTarget(t),i=0;return r.forEach(s=>{let a=this.We.lt(),c="projects/".concat(a.projectId,"/databases/").concat(a.database,"/documents/").concat(s.path.canonicalString());e.mightContain(c)||(this.Xe(t,s,null),i++)}),i}Pt(e){let t=new Map;this.Ge.forEach((s,a)=>{let c=this.st(a);if(c){if(s.current&&Kc(c.target)){let l=new F(c.target.path);this.Tt(l).has(a)||this.It(a,l)||this.Xe(a,l,$e.newNoDocument(l,e))}s.Ne&&(t.set(a,s.Le()),s.ke())}});let r=W();this.Je.forEach((s,a)=>{let c=!0;a.forEachWhile(l=>{let d=this.st(l);return!d||d.purpose==="TargetPurposeLimboResolution"||(c=!1,!1)}),c&&(r=r.add(s))}),this.ze.forEach((s,a)=>a.setReadTime(e));let i=new ro(e,t,this.He,this.ze,r);return this.ze=Et(),this.je=zs(),this.Je=zs(),this.He=new oe($),i}Ze(e,t){if(!this.nt(e))return;let r=this.It(e,t.key)?2:0;this.tt(e).qe(t.key,r),this.ze=this.ze.insert(t.key,t),this.je=this.je.insert(t.key,this.Tt(t.key).add(e)),this.Je=this.Je.insert(t.key,this.dt(t.key).add(e))}Xe(e,t,r){if(!this.nt(e))return;let i=this.tt(e);this.It(e,t)?i.qe(t,1):i.Qe(t),this.Je=this.Je.insert(t,this.dt(t).delete(e)),this.Je=this.Je.insert(t,this.dt(t).add(e)),r&&(this.ze=this.ze.insert(t,r))}removeTarget(e){this.Ge.delete(e)}ot(e){let t=this.tt(e).Le();return this.We.getRemoteKeysForTarget(e).size+t.addedDocuments.size-t.removedDocuments.size}$e(e){this.tt(e).$e()}tt(e){let t=this.Ge.get(e);return t||(t=new oo,this.Ge.set(e,t)),t}dt(e){let t=this.Je.get(e);return t||(t=new me($),this.Je=this.Je.insert(e,t)),t}Tt(e){let t=this.je.get(e);return t||(t=new me($),this.je=this.je.insert(e,t)),t}nt(e){let t=this.st(e)!==null;return t||x("WatchChangeAggregator","Detected inactive target",e),t}st(e){let t=this.Ge.get(e);return t&&t.Oe?null:this.We.Et(e)}rt(e){this.Ge.set(e,new oo),this.We.getRemoteKeysForTarget(e).forEach(t=>{this.Xe(e,t,null)})}It(e,t){return this.We.getRemoteKeysForTarget(e).has(t)}};function zs(){return new oe(F.comparator)}function cp(){return new oe(F.comparator)}var Rw={asc:"ASCENDING",desc:"DESCENDING"},Pw={"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"},Cw={and:"AND",or:"OR"},su=class{constructor(e,t){this.databaseId=e,this.useProto3Json=t}};function ou(n,e){return n.useProto3Json||Po(e)?e:{value:e}}function ao(n,e){return n.useProto3Json?"".concat(new Date(1e3*e.seconds).toISOString().replace(/\.\d*/,"").replace("Z",""),".").concat(("000000000"+e.nanoseconds).slice(-9),"Z"):{seconds:""+e.seconds,nanos:e.nanoseconds}}function wm(n,e){return n.useProto3Json?e.toBase64():e.toUint8Array()}function kw(n,e){return ao(n,e.toTimestamp())}function nt(n){return X(!!n,49232),z.fromTimestamp(function(t){let r=vt(t);return new he(r.seconds,r.nanos)}(n))}function Il(n,e){return au(n,e).canonicalString()}function au(n,e){let t=function(i){return new ne(["projects",i.projectId,"databases",i.database])}(n).child("documents");return e===void 0?t:t.child(e)}function Em(n){let e=ne.fromString(n);return X(Rm(e),10190,{key:e.toString()}),e}function cu(n,e){return Il(n.databaseId,e.path)}function Tc(n,e){let t=Em(e);if(t.get(1)!==n.databaseId.projectId)throw new O(R.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+t.get(1)+" vs "+n.databaseId.projectId);if(t.get(3)!==n.databaseId.database)throw new O(R.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+t.get(3)+" vs "+n.databaseId.database);return new F(bm(t))}function Tm(n,e){return Il(n.databaseId,e)}function Nw(n){let e=Em(n);return e.length===4?ne.emptyPath():bm(e)}function uu(n){return new ne(["projects",n.databaseId.projectId,"databases",n.databaseId.database]).canonicalString()}function bm(n){return X(n.length>4&&n.get(4)==="documents",29091,{key:n.toString()}),n.popFirst(5)}function up(n,e,t){return{name:cu(n,e),fields:t.value.mapValue.fields}}function Dw(n,e){let t;if("targetChange"in e){e.targetChange;let r=function(d){return d==="NO_CHANGE"?0:d==="ADD"?1:d==="REMOVE"?2:d==="CURRENT"?3:d==="RESET"?4:B(39313,{state:d})}(e.targetChange.targetChangeType||"NO_CHANGE"),i=e.targetChange.targetIds||[],s=function(d,p){return d.useProto3Json?(X(p===void 0||typeof p=="string",58123),Se.fromBase64String(p||"")):(X(p===void 0||p instanceof Buffer||p instanceof Uint8Array,16193),Se.fromUint8Array(p||new Uint8Array))}(n,e.targetChange.resumeToken),a=e.targetChange.cause,c=a&&function(d){let p=d.code===void 0?R.UNKNOWN:Im(d.code);return new O(p,d.message||"")}(a);t=new so(r,i,s,c||null)}else if("documentChange"in e){e.documentChange;let r=e.documentChange;r.document,r.document.name,r.document.updateTime;let i=Tc(n,r.document.name),s=nt(r.document.updateTime),a=r.document.createTime?nt(r.document.createTime):z.min(),c=new je({mapValue:{fields:r.document.fields}}),l=$e.newFoundDocument(i,s,a,c),d=r.targetIds||[],p=r.removedTargetIds||[];t=new jn(d,p,l.key,l)}else if("documentDelete"in e){e.documentDelete;let r=e.documentDelete;r.document;let i=Tc(n,r.document),s=r.readTime?nt(r.readTime):z.min(),a=$e.newNoDocument(i,s),c=r.removedTargetIds||[];t=new jn([],c,a.key,a)}else if("documentRemove"in e){e.documentRemove;let r=e.documentRemove;r.document;let i=Tc(n,r.document),s=r.removedTargetIds||[];t=new jn([],s,i,null)}else{if(!("filter"in e))return B(11601,{At:e});{e.filter;let r=e.filter;r.targetId;let{count:i=0,unchangedNames:s}=r,a=new nu(i,s),c=r.targetId;t=new io(c,a)}}return t}function Ow(n,e){let t;if(e instanceof vn)t={update:up(n,e.key,e.value)};else if(e instanceof ui)t={delete:cu(n,e.key)};else if(e instanceof Tt)t={update:up(n,e.key,e.data),updateMask:jw(e.fieldMask)};else{if(!(e instanceof Jc))return B(16599,{Rt:e.type});t={verify:cu(n,e.key)}}return e.fieldTransforms.length>0&&(t.updateTransforms=e.fieldTransforms.map(r=>function(s,a){let c=a.transform;if(c instanceof gn)return{fieldPath:a.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(c instanceof _n)return{fieldPath:a.field.canonicalString(),appendMissingElements:{values:c.elements}};if(c instanceof yn)return{fieldPath:a.field.canonicalString(),removeAllFromArray:{values:c.elements}};if(c instanceof Yn)return{fieldPath:a.field.canonicalString(),increment:c.Ee};throw B(20930,{transform:a.transform})}(0,r))),e.precondition.isNone||(t.currentDocument=function(i,s){return s.updateTime!==void 0?{updateTime:kw(i,s.updateTime)}:s.exists!==void 0?{exists:s.exists}:B(27497)}(n,e.precondition)),t}function xw(n,e){return n&&n.length>0?(X(e!==void 0,14353),n.map(t=>function(i,s){let a=i.updateTime?nt(i.updateTime):nt(s);return a.isEqual(z.min())&&(a=nt(s)),new Yc(a,i.transformResults||[])}(t,e))):[]}function Vw(n,e){return{documents:[Tm(n,e.path)]}}function Lw(n,e){let t={structuredQuery:{}},r=e.path,i;e.collectionGroup!==null?(i=r,t.structuredQuery.from=[{collectionId:e.collectionGroup,allDescendants:!0}]):(i=r.popLast(),t.structuredQuery.from=[{collectionId:r.lastSegment()}]),t.parent=Tm(n,i);let s=function(d){if(d.length!==0)return Sm(Ge.create(d,"and"))}(e.filters);s&&(t.structuredQuery.where=s);let a=function(d){if(d.length!==0)return d.map(p=>function(v){return{field:Un(v.field),direction:Uw(v.dir)}}(p))}(e.orderBy);a&&(t.structuredQuery.orderBy=a);let c=ou(n,e.limit);return c!==null&&(t.structuredQuery.limit=c),e.startAt&&(t.structuredQuery.startAt=function(d){return{before:d.inclusive,values:d.position}}(e.startAt)),e.endAt&&(t.structuredQuery.endAt=function(d){return{before:!d.inclusive,values:d.position}}(e.endAt)),{Vt:t,parent:i}}function Mw(n){let e=Nw(n.parent),t=n.structuredQuery,r=t.from?t.from.length:0,i=null;if(r>0){X(r===1,65062);let p=t.from[0];p.allDescendants?i=p.collectionId:e=e.child(p.collectionId)}let s=[];t.where&&(s=function(m){let v=Am(m);return v instanceof Ge&&rm(v)?v.getFilters():[v]}(t.where));let a=[];t.orderBy&&(a=function(m){return m.map(v=>function(P){return new mn(Bn(P.field),function(C){switch(C){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}}(P.direction))}(v))}(t.orderBy));let c=null;t.limit&&(c=function(m){let v;return v=typeof m=="object"?m.value:m,Po(v)?null:v}(t.limit));let l=null;t.startAt&&(l=function(m){let v=!!m.before,S=m.values||[];return new Qn(S,v)}(t.startAt));let d=null;return t.endAt&&(d=function(m){let v=!m.before,S=m.values||[];return new Qn(S,v)}(t.endAt)),lw(e,i,a,s,c,"F",l,d)}function Fw(n,e){let t=function(i){switch(i){case"TargetPurposeListen":return null;case"TargetPurposeExistenceFilterMismatch":return"existence-filter-mismatch";case"TargetPurposeExistenceFilterMismatchBloom":return"existence-filter-mismatch-bloom";case"TargetPurposeLimboResolution":return"limbo-document";default:return B(28987,{purpose:i})}}(e.purpose);return t==null?null:{"goog-listen-tags":t}}function Am(n){return n.unaryFilter!==void 0?function(t){switch(t.unaryFilter.op){case"IS_NAN":let r=Bn(t.unaryFilter.field);return ue.create(r,"==",{doubleValue:NaN});case"IS_NULL":let i=Bn(t.unaryFilter.field);return ue.create(i,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":let s=Bn(t.unaryFilter.field);return ue.create(s,"!=",{doubleValue:NaN});case"IS_NOT_NULL":let a=Bn(t.unaryFilter.field);return ue.create(a,"!=",{nullValue:"NULL_VALUE"});case"OPERATOR_UNSPECIFIED":return B(61313);default:return B(60726)}}(n):n.fieldFilter!==void 0?function(t){return ue.create(Bn(t.fieldFilter.field),function(i){switch(i){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";case"OPERATOR_UNSPECIFIED":return B(58110);default:return B(50506)}}(t.fieldFilter.op),t.fieldFilter.value)}(n):n.compositeFilter!==void 0?function(t){return Ge.create(t.compositeFilter.filters.map(r=>Am(r)),function(i){switch(i){case"AND":return"and";case"OR":return"or";default:return B(1026)}}(t.compositeFilter.op))}(n):B(30097,{filter:n})}function Uw(n){return Rw[n]}function Bw(n){return Pw[n]}function qw(n){return Cw[n]}function Un(n){return{fieldPath:n.canonicalString()}}function Bn(n){return Ve.fromServerFormat(n.fieldPath)}function Sm(n){return n instanceof ue?function(t){if(t.op==="=="){if(Xf(t.value))return{unaryFilter:{field:Un(t.field),op:"IS_NAN"}};if(Qf(t.value))return{unaryFilter:{field:Un(t.field),op:"IS_NULL"}}}else if(t.op==="!="){if(Xf(t.value))return{unaryFilter:{field:Un(t.field),op:"IS_NOT_NAN"}};if(Qf(t.value))return{unaryFilter:{field:Un(t.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:Un(t.field),op:Bw(t.op),value:t.value}}}(n):n instanceof Ge?function(t){let r=t.getFilters().map(i=>Sm(i));return r.length===1?r[0]:{compositeFilter:{op:qw(t.op),filters:r}}}(n):B(54877,{filter:n})}function jw(n){let e=[];return n.fields.forEach(t=>e.push(t.canonicalString())),{fieldPaths:e}}function Rm(n){return n.length>=4&&n.get(0)==="projects"&&n.get(2)==="databases"}var hi=class n{constructor(e,t,r,i,s=z.min(),a=z.min(),c=Se.EMPTY_BYTE_STRING,l=null){this.target=e,this.targetId=t,this.purpose=r,this.sequenceNumber=i,this.snapshotVersion=s,this.lastLimboFreeSnapshotVersion=a,this.resumeToken=c,this.expectedCount=l}withSequenceNumber(e){return new n(this.target,this.targetId,this.purpose,e,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,this.expectedCount)}withResumeToken(e,t){return new n(this.target,this.targetId,this.purpose,this.sequenceNumber,t,this.lastLimboFreeSnapshotVersion,e,null)}withExpectedCount(e){return new n(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,e)}withLastLimboFreeSnapshotVersion(e){return new n(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,e,this.resumeToken,this.expectedCount)}};var lu=class{constructor(e){this.gt=e}};function zw(n){let e=Mw({parent:n.parent,structuredQuery:n.structuredQuery});return n.limitType==="LAST"?no(e,e.limit,"L"):e}var co=class{constructor(){}bt(e,t){this.Dt(e,t),t.vt()}Dt(e,t){if("nullValue"in e)this.Ct(t,5);else if("booleanValue"in e)this.Ct(t,10),t.Ft(e.booleanValue?1:0);else if("integerValue"in e)this.Ct(t,15),t.Ft(te(e.integerValue));else if("doubleValue"in e){let r=te(e.doubleValue);isNaN(r)?this.Ct(t,13):(this.Ct(t,15),oi(r)?t.Ft(0):t.Ft(r))}else if("timestampValue"in e){let r=e.timestampValue;this.Ct(t,20),typeof r=="string"&&(r=vt(r)),t.Mt("".concat(r.seconds||"")),t.Ft(r.nanos||0)}else if("stringValue"in e)this.xt(e.stringValue,t),this.Ot(t);else if("bytesValue"in e)this.Ct(t,30),t.Nt(It(e.bytesValue)),this.Ot(t);else if("referenceValue"in e)this.Bt(e.referenceValue,t);else if("geoPointValue"in e){let r=e.geoPointValue;this.Ct(t,45),t.Ft(r.latitude||0),t.Ft(r.longitude||0)}else"mapValue"in e?em(e)?this.Ct(t,Number.MAX_SAFE_INTEGER):Zp(e)?this.Lt(e.mapValue,t):(this.kt(e.mapValue,t),this.Ot(t)):"arrayValue"in e?(this.qt(e.arrayValue,t),this.Ot(t)):B(19022,{Qt:e})}xt(e,t){this.Ct(t,25),this.$t(e,t)}$t(e,t){t.Mt(e)}kt(e,t){let r=e.fields||{};this.Ct(t,55);for(let i of Object.keys(r))this.xt(i,t),this.Dt(r[i],t)}Lt(e,t){var r,i;let s=e.fields||{};this.Ct(t,53);let a=Hn,c=((i=(r=s[a].arrayValue)===null||r===void 0?void 0:r.values)===null||i===void 0?void 0:i.length)||0;this.Ct(t,15),t.Ft(te(c)),this.xt(a,t),this.Dt(s[a],t)}qt(e,t){let r=e.values||[];this.Ct(t,50);for(let i of r)this.Dt(i,t)}Bt(e,t){this.Ct(t,37),F.fromName(e).path.forEach(r=>{this.Ct(t,60),this.$t(r,t)})}Ct(e,t){e.Ft(t)}Ot(e){e.Ft(2)}};co.Ut=new co;var hu=class{constructor(){this.Dn=new du}addToCollectionParentIndex(e,t){return this.Dn.add(t),k.resolve()}getCollectionParents(e,t){return k.resolve(this.Dn.getEntries(t))}addFieldIndex(e,t){return k.resolve()}deleteFieldIndex(e,t){return k.resolve()}deleteAllFieldIndexes(e){return k.resolve()}createTargetIndexes(e,t){return k.resolve()}getDocumentsMatchingTarget(e,t){return k.resolve(null)}getIndexType(e,t){return k.resolve(0)}getFieldIndexes(e,t){return k.resolve([])}getNextCollectionGroupToUpdate(e){return k.resolve(null)}getMinOffset(e,t){return k.resolve(pn.min())}getMinOffsetFromCollectionGroup(e,t){return k.resolve(pn.min())}updateCollectionGroup(e,t,r){return k.resolve()}updateIndexEntries(e,t){return k.resolve()}},du=class{constructor(){this.index={}}add(e){let t=e.lastSegment(),r=e.popLast(),i=this.index[t]||new me(ne.comparator),s=!i.has(r);return this.index[t]=i.add(r),s}has(e){let t=e.lastSegment(),r=e.popLast(),i=this.index[t];return i&&i.has(r)}getEntries(e){return(this.index[e]||new me(ne.comparator)).toArray()}};var c0=new Uint8Array(0);var lp={didRun:!1,sequenceNumbersCollected:0,targetsRemoved:0,documentsRemoved:0},Pm=41943040,Me=class n{static withCacheSize(e){return new n(e,n.DEFAULT_COLLECTION_PERCENTILE,n.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT)}constructor(e,t,r){this.cacheSizeCollectionThreshold=e,this.percentileToCollect=t,this.maximumSequenceNumbersToCollect=r}};Me.DEFAULT_COLLECTION_PERCENTILE=10,Me.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT=1e3,Me.DEFAULT=new Me(Pm,Me.DEFAULT_COLLECTION_PERCENTILE,Me.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT),Me.DISABLED=new Me(-1,0,0);var di=class n{constructor(e){this._r=e}next(){return this._r+=2,this._r}static ar(){return new n(0)}static ur(){return new n(-1)}};var hp="LruGarbageCollector",$w=1048576;function dp([n,e],[t,r]){let i=$(n,t);return i===0?$(e,r):i}var fu=class{constructor(e){this.Tr=e,this.buffer=new me(dp),this.Ir=0}dr(){return++this.Ir}Er(e){let t=[e,this.dr()];if(this.buffer.size<this.Tr)this.buffer=this.buffer.add(t);else{let r=this.buffer.last();dp(t,r)<0&&(this.buffer=this.buffer.delete(r).add(t))}}get maxValue(){return this.buffer.last()[0]}},pu=class{constructor(e,t,r){this.garbageCollector=e,this.asyncQueue=t,this.localStore=r,this.Ar=null}start(){this.garbageCollector.params.cacheSizeCollectionThreshold!==-1&&this.Rr(6e4)}stop(){this.Ar&&(this.Ar.cancel(),this.Ar=null)}get started(){return this.Ar!==null}Rr(e){x(hp,"Garbage collection scheduled in ".concat(e,"ms")),this.Ar=this.asyncQueue.enqueueAfterDelay("lru_garbage_collection",e,async()=>{this.Ar=null;try{await this.localStore.collectGarbage(this.garbageCollector)}catch(t){ir(t)?x(hp,"Ignoring IndexedDB error during garbage collection: ",t):await rr(t)}await this.Rr(3e5)})}},mu=class{constructor(e,t){this.Vr=e,this.params=t}calculateTargetCount(e,t){return this.Vr.mr(e).next(r=>Math.floor(t/100*r))}nthSequenceNumber(e,t){if(t===0)return k.resolve(Gn.ue);let r=new fu(t);return this.Vr.forEachTarget(e,i=>r.Er(i.sequenceNumber)).next(()=>this.Vr.gr(e,i=>r.Er(i))).next(()=>r.maxValue)}removeTargets(e,t,r){return this.Vr.removeTargets(e,t,r)}removeOrphanedDocuments(e,t){return this.Vr.removeOrphanedDocuments(e,t)}collect(e,t){return this.params.cacheSizeCollectionThreshold===-1?(x("LruGarbageCollector","Garbage collection skipped; disabled"),k.resolve(lp)):this.getCacheSize(e).next(r=>r<this.params.cacheSizeCollectionThreshold?(x("LruGarbageCollector","Garbage collection skipped; Cache size ".concat(r," is lower than threshold ").concat(this.params.cacheSizeCollectionThreshold)),lp):this.pr(e,t))}getCacheSize(e){return this.Vr.getCacheSize(e)}pr(e,t){let r,i,s,a,c,l,d,p=Date.now();return this.calculateTargetCount(e,this.params.percentileToCollect).next(m=>(m>this.params.maximumSequenceNumbersToCollect?(x("LruGarbageCollector","Capping sequence numbers to collect down to the maximum of ".concat(this.params.maximumSequenceNumbersToCollect," from ").concat(m)),i=this.params.maximumSequenceNumbersToCollect):i=m,a=Date.now(),this.nthSequenceNumber(e,i))).next(m=>(r=m,c=Date.now(),this.removeTargets(e,r,t))).next(m=>(s=m,l=Date.now(),this.removeOrphanedDocuments(e,r))).next(m=>(d=Date.now(),Mn()<=G.DEBUG&&x("LruGarbageCollector","LRU Garbage Collection\n	Counted targets in ".concat(a-p,"ms\n	Determined least recently used ").concat(i," in ")+(c-a)+"ms\n"+"	Removed ".concat(s," targets in ")+(l-c)+"ms\n"+"	Removed ".concat(m," documents in ")+(d-l)+"ms\n"+"Total Duration: ".concat(d-p,"ms")),k.resolve({didRun:!0,sequenceNumbersCollected:i,targetsRemoved:s,documentsRemoved:m})))}};function Gw(n,e){return new mu(n,e)}var gu=class{constructor(){this.changes=new wt(e=>e.toString(),(e,t)=>e.isEqual(t)),this.changesApplied=!1}addEntry(e){this.assertNotApplied(),this.changes.set(e.key,e)}removeEntry(e,t){this.assertNotApplied(),this.changes.set(e,$e.newInvalidDocument(e).setReadTime(t))}getEntry(e,t){this.assertNotApplied();let r=this.changes.get(t);return r!==void 0?k.resolve(r):this.getFromCache(e,t)}getEntries(e,t){return this.getAllFromCache(e,t)}apply(e){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(e)}assertNotApplied(){}};var _u=class{constructor(e,t){this.overlayedDocument=e,this.mutatedFields=t}};var yu=class{constructor(e,t,r,i){this.remoteDocumentCache=e,this.mutationQueue=t,this.documentOverlayCache=r,this.indexManager=i}getDocument(e,t){let r=null;return this.documentOverlayCache.getOverlay(e,t).next(i=>(r=i,this.remoteDocumentCache.getEntry(e,t))).next(i=>(r!==null&&ri(r.mutation,i,Ze.empty(),he.now()),i))}getDocuments(e,t){return this.remoteDocumentCache.getEntries(e,t).next(r=>this.getLocalViewOfDocuments(e,r,W()).next(()=>r))}getLocalViewOfDocuments(e,t,r=W()){let i=cn();return this.populateOverlays(e,i,t).next(()=>this.computeViews(e,t,i,r).next(s=>{let a=Zr();return s.forEach((c,l)=>{a=a.insert(c,l.overlayedDocument)}),a}))}getOverlayedDocuments(e,t){let r=cn();return this.populateOverlays(e,r,t).next(()=>this.computeViews(e,t,r,W()))}populateOverlays(e,t,r){let i=[];return r.forEach(s=>{t.has(s)||i.push(s)}),this.documentOverlayCache.getOverlays(e,i).next(s=>{s.forEach((a,c)=>{t.set(a,c)})})}computeViews(e,t,r,i){let s=Et(),a=ni(),c=function(){return ni()}();return t.forEach((l,d)=>{let p=r.get(d.key);i.has(d.key)&&(p===void 0||p.mutation instanceof Tt)?s=s.insert(d.key,d):p!==void 0?(a.set(d.key,p.mutation.getFieldMask()),ri(p.mutation,d,p.mutation.getFieldMask(),he.now())):a.set(d.key,Ze.empty())}),this.recalculateAndSaveOverlays(e,s).next(l=>(l.forEach((d,p)=>a.set(d,p)),t.forEach((d,p)=>{var m;return c.set(d,new _u(p,(m=a.get(d))!==null&&m!==void 0?m:null))}),c))}recalculateAndSaveOverlays(e,t){let r=ni(),i=new oe((a,c)=>a-c),s=W();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(e,t).next(a=>{for(let c of a)c.keys().forEach(l=>{let d=t.get(l);if(d===null)return;let p=r.get(l)||Ze.empty();p=c.applyToLocalView(d,p),r.set(l,p);let m=(i.get(c.batchId)||W()).add(l);i=i.insert(c.batchId,m)})}).next(()=>{let a=[],c=i.getReverseIterator();for(;c.hasNext();){let l=c.getNext(),d=l.key,p=l.value,m=dm();p.forEach(v=>{if(!s.has(v)){let S=ym(t.get(v),r.get(v));S!==null&&m.set(v,S),s=s.add(v)}}),a.push(this.documentOverlayCache.saveOverlays(e,d,m))}return k.waitFor(a)}).next(()=>r)}recalculateAndSaveOverlaysForDocumentKeys(e,t){return this.remoteDocumentCache.getEntries(e,t).next(r=>this.recalculateAndSaveOverlays(e,r))}getDocumentsMatchingQuery(e,t,r,i){return function(a){return F.isDocumentKey(a.path)&&a.collectionGroup===null&&a.filters.length===0}(t)?this.getDocumentsMatchingDocumentQuery(e,t.path):am(t)?this.getDocumentsMatchingCollectionGroupQuery(e,t,r,i):this.getDocumentsMatchingCollectionQuery(e,t,r,i)}getNextDocuments(e,t,r,i){return this.remoteDocumentCache.getAllFromCollectionGroup(e,t,r,i).next(s=>{let a=i-s.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(e,t,r.largestBatchId,i-s.size):k.resolve(cn()),c=si,l=s;return a.next(d=>k.forEach(d,(p,m)=>(c<m.largestBatchId&&(c=m.largestBatchId),s.get(p)?k.resolve():this.remoteDocumentCache.getEntry(e,p).next(v=>{l=l.insert(p,v)}))).next(()=>this.populateOverlays(e,d,s)).next(()=>this.computeViews(e,l,d,W())).next(p=>({batchId:c,changes:hm(p)})))})}getDocumentsMatchingDocumentQuery(e,t){return this.getDocument(e,new F(t)).next(r=>{let i=Zr();return r.isFoundDocument()&&(i=i.insert(r.key,r)),i})}getDocumentsMatchingCollectionGroupQuery(e,t,r,i){let s=t.collectionGroup,a=Zr();return this.indexManager.getCollectionParents(e,s).next(c=>k.forEach(c,l=>{let d=function(m,v){return new jt(v,null,m.explicitOrderBy.slice(),m.filters.slice(),m.limit,m.limitType,m.startAt,m.endAt)}(t,l.child(s));return this.getDocumentsMatchingCollectionQuery(e,d,r,i).next(p=>{p.forEach((m,v)=>{a=a.insert(m,v)})})}).next(()=>a))}getDocumentsMatchingCollectionQuery(e,t,r,i){let s;return this.documentOverlayCache.getOverlaysForCollection(e,t.path,r.largestBatchId).next(a=>(s=a,this.remoteDocumentCache.getDocumentsMatchingQuery(e,t,r,s,i))).next(a=>{s.forEach((l,d)=>{let p=d.getKey();a.get(p)===null&&(a=a.insert(p,$e.newInvalidDocument(p)))});let c=Zr();return a.forEach((l,d)=>{let p=s.get(l);p!==void 0&&ri(p.mutation,d,Ze.empty(),he.now()),Do(t,d)&&(c=c.insert(l,d))}),c})}};var vu=class{constructor(e){this.serializer=e,this.Br=new Map,this.Lr=new Map}getBundleMetadata(e,t){return k.resolve(this.Br.get(t))}saveBundleMetadata(e,t){return this.Br.set(t.id,function(i){return{id:i.id,version:i.version,createTime:nt(i.createTime)}}(t)),k.resolve()}getNamedQuery(e,t){return k.resolve(this.Lr.get(t))}saveNamedQuery(e,t){return this.Lr.set(t.name,function(i){return{name:i.name,query:zw(i.bundledQuery),readTime:nt(i.readTime)}}(t)),k.resolve()}};var Iu=class{constructor(){this.overlays=new oe(F.comparator),this.kr=new Map}getOverlay(e,t){return k.resolve(this.overlays.get(t))}getOverlays(e,t){let r=cn();return k.forEach(t,i=>this.getOverlay(e,i).next(s=>{s!==null&&r.set(i,s)})).next(()=>r)}saveOverlays(e,t,r){return r.forEach((i,s)=>{this.wt(e,t,s)}),k.resolve()}removeOverlaysForBatchId(e,t,r){let i=this.kr.get(r);return i!==void 0&&(i.forEach(s=>this.overlays=this.overlays.remove(s)),this.kr.delete(r)),k.resolve()}getOverlaysForCollection(e,t,r){let i=cn(),s=t.length+1,a=new F(t.child("")),c=this.overlays.getIteratorFrom(a);for(;c.hasNext();){let l=c.getNext().value,d=l.getKey();if(!t.isPrefixOf(d.path))break;d.path.length===s&&l.largestBatchId>r&&i.set(l.getKey(),l)}return k.resolve(i)}getOverlaysForCollectionGroup(e,t,r,i){let s=new oe((d,p)=>d-p),a=this.overlays.getIterator();for(;a.hasNext();){let d=a.getNext().value;if(d.getKey().getCollectionGroup()===t&&d.largestBatchId>r){let p=s.get(d.largestBatchId);p===null&&(p=cn(),s=s.insert(d.largestBatchId,p)),p.set(d.getKey(),d)}}let c=cn(),l=s.getIterator();for(;l.hasNext()&&(l.getNext().value.forEach((d,p)=>c.set(d,p)),!(c.size()>=i)););return k.resolve(c)}wt(e,t,r){let i=this.overlays.get(r.key);if(i!==null){let a=this.kr.get(i.largestBatchId).delete(r.key);this.kr.set(i.largestBatchId,a)}this.overlays=this.overlays.insert(r.key,new tu(t,r));let s=this.kr.get(t);s===void 0&&(s=W(),this.kr.set(t,s)),this.kr.set(t,s.add(r.key))}};var wu=class{constructor(){this.sessionToken=Se.EMPTY_BYTE_STRING}getSessionToken(e){return k.resolve(this.sessionToken)}setSessionToken(e,t){return this.sessionToken=t,k.resolve()}};var fi=class{constructor(){this.qr=new me(ce.Qr),this.$r=new me(ce.Ur)}isEmpty(){return this.qr.isEmpty()}addReference(e,t){let r=new ce(e,t);this.qr=this.qr.add(r),this.$r=this.$r.add(r)}Kr(e,t){e.forEach(r=>this.addReference(r,t))}removeReference(e,t){this.Wr(new ce(e,t))}Gr(e,t){e.forEach(r=>this.removeReference(r,t))}zr(e){let t=new F(new ne([])),r=new ce(t,e),i=new ce(t,e+1),s=[];return this.$r.forEachInRange([r,i],a=>{this.Wr(a),s.push(a.key)}),s}jr(){this.qr.forEach(e=>this.Wr(e))}Wr(e){this.qr=this.qr.delete(e),this.$r=this.$r.delete(e)}Jr(e){let t=new F(new ne([])),r=new ce(t,e),i=new ce(t,e+1),s=W();return this.$r.forEachInRange([r,i],a=>{s=s.add(a.key)}),s}containsKey(e){let t=new ce(e,0),r=this.qr.firstAfterOrEqual(t);return r!==null&&e.isEqual(r.key)}},ce=class{constructor(e,t){this.key=e,this.Hr=t}static Qr(e,t){return F.comparator(e.key,t.key)||$(e.Hr,t.Hr)}static Ur(e,t){return $(e.Hr,t.Hr)||F.comparator(e.key,t.key)}};var Eu=class{constructor(e,t){this.indexManager=e,this.referenceDelegate=t,this.mutationQueue=[],this.er=1,this.Yr=new me(ce.Qr)}checkEmpty(e){return k.resolve(this.mutationQueue.length===0)}addMutationBatch(e,t,r,i){let s=this.er;this.er++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];let a=new Zc(s,t,r,i);this.mutationQueue.push(a);for(let c of i)this.Yr=this.Yr.add(new ce(c.key,s)),this.indexManager.addToCollectionParentIndex(e,c.key.path.popLast());return k.resolve(a)}lookupMutationBatch(e,t){return k.resolve(this.Zr(t))}getNextMutationBatchAfterBatchId(e,t){let r=t+1,i=this.Xr(r),s=i<0?0:i;return k.resolve(this.mutationQueue.length>s?this.mutationQueue[s]:null)}getHighestUnacknowledgedBatchId(){return k.resolve(this.mutationQueue.length===0?dl:this.er-1)}getAllMutationBatches(e){return k.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(e,t){let r=new ce(t,0),i=new ce(t,Number.POSITIVE_INFINITY),s=[];return this.Yr.forEachInRange([r,i],a=>{let c=this.Zr(a.Hr);s.push(c)}),k.resolve(s)}getAllMutationBatchesAffectingDocumentKeys(e,t){let r=new me($);return t.forEach(i=>{let s=new ce(i,0),a=new ce(i,Number.POSITIVE_INFINITY);this.Yr.forEachInRange([s,a],c=>{r=r.add(c.Hr)})}),k.resolve(this.ei(r))}getAllMutationBatchesAffectingQuery(e,t){let r=t.path,i=r.length+1,s=r;F.isDocumentKey(s)||(s=s.child(""));let a=new ce(new F(s),0),c=new me($);return this.Yr.forEachWhile(l=>{let d=l.key.path;return!!r.isPrefixOf(d)&&(d.length===i&&(c=c.add(l.Hr)),!0)},a),k.resolve(this.ei(c))}ei(e){let t=[];return e.forEach(r=>{let i=this.Zr(r);i!==null&&t.push(i)}),t}removeMutationBatch(e,t){X(this.ti(t.batchId,"removed")===0,55003),this.mutationQueue.shift();let r=this.Yr;return k.forEach(t.mutations,i=>{let s=new ce(i.key,t.batchId);return r=r.delete(s),this.referenceDelegate.markPotentiallyOrphaned(e,i.key)}).next(()=>{this.Yr=r})}rr(e){}containsKey(e,t){let r=new ce(t,0),i=this.Yr.firstAfterOrEqual(r);return k.resolve(t.isEqual(i&&i.key))}performConsistencyCheck(e){return this.mutationQueue.length,k.resolve()}ti(e,t){return this.Xr(e)}Xr(e){return this.mutationQueue.length===0?0:e-this.mutationQueue[0].batchId}Zr(e){let t=this.Xr(e);return t<0||t>=this.mutationQueue.length?null:this.mutationQueue[t]}};var Tu=class{constructor(e){this.ni=e,this.docs=function(){return new oe(F.comparator)}(),this.size=0}setIndexManager(e){this.indexManager=e}addEntry(e,t){let r=t.key,i=this.docs.get(r),s=i?i.size:0,a=this.ni(t);return this.docs=this.docs.insert(r,{document:t.mutableCopy(),size:a}),this.size+=a-s,this.indexManager.addToCollectionParentIndex(e,r.path.popLast())}removeEntry(e){let t=this.docs.get(e);t&&(this.docs=this.docs.remove(e),this.size-=t.size)}getEntry(e,t){let r=this.docs.get(t);return k.resolve(r?r.document.mutableCopy():$e.newInvalidDocument(t))}getEntries(e,t){let r=Et();return t.forEach(i=>{let s=this.docs.get(i);r=r.insert(i,s?s.document.mutableCopy():$e.newInvalidDocument(i))}),k.resolve(r)}getDocumentsMatchingQuery(e,t,r,i){let s=Et(),a=t.path,c=new F(a.child("__id-9223372036854775808__")),l=this.docs.getIteratorFrom(c);for(;l.hasNext();){let{key:d,value:{document:p}}=l.getNext();if(!a.isPrefixOf(d.path))break;d.path.length>a.length+1||GI($I(p),r)<=0||(i.has(p.key)||Do(t,p))&&(s=s.insert(p.key,p.mutableCopy()))}return k.resolve(s)}getAllFromCollectionGroup(e,t,r,i){B(9500)}ri(e,t){return k.forEach(this.docs,r=>t(r))}newChangeBuffer(e){return new bu(this)}getSize(e){return k.resolve(this.size)}},bu=class extends gu{constructor(e){super(),this.Or=e}applyChanges(e){let t=[];return this.changes.forEach((r,i)=>{i.isValidDocument()?t.push(this.Or.addEntry(e,i)):this.Or.removeEntry(r)}),k.waitFor(t)}getFromCache(e,t){return this.Or.getEntry(e,t)}getAllFromCache(e,t){return this.Or.getEntries(e,t)}};var Au=class{constructor(e){this.persistence=e,this.ii=new wt(t=>_l(t),yl),this.lastRemoteSnapshotVersion=z.min(),this.highestTargetId=0,this.si=0,this.oi=new fi,this.targetCount=0,this._i=di.ar()}forEachTarget(e,t){return this.ii.forEach((r,i)=>t(i)),k.resolve()}getLastRemoteSnapshotVersion(e){return k.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(e){return k.resolve(this.si)}allocateTargetId(e){return this.highestTargetId=this._i.next(),k.resolve(this.highestTargetId)}setTargetsMetadata(e,t,r){return r&&(this.lastRemoteSnapshotVersion=r),t>this.si&&(this.si=t),k.resolve()}hr(e){this.ii.set(e.target,e);let t=e.targetId;t>this.highestTargetId&&(this._i=new di(t),this.highestTargetId=t),e.sequenceNumber>this.si&&(this.si=e.sequenceNumber)}addTargetData(e,t){return this.hr(t),this.targetCount+=1,k.resolve()}updateTargetData(e,t){return this.hr(t),k.resolve()}removeTargetData(e,t){return this.ii.delete(t.target),this.oi.zr(t.targetId),this.targetCount-=1,k.resolve()}removeTargets(e,t,r){let i=0,s=[];return this.ii.forEach((a,c)=>{c.sequenceNumber<=t&&r.get(c.targetId)===null&&(this.ii.delete(a),s.push(this.removeMatchingKeysForTargetId(e,c.targetId)),i++)}),k.waitFor(s).next(()=>i)}getTargetCount(e){return k.resolve(this.targetCount)}getTargetData(e,t){let r=this.ii.get(t)||null;return k.resolve(r)}addMatchingKeys(e,t,r){return this.oi.Kr(t,r),k.resolve()}removeMatchingKeys(e,t,r){this.oi.Gr(t,r);let i=this.persistence.referenceDelegate,s=[];return i&&t.forEach(a=>{s.push(i.markPotentiallyOrphaned(e,a))}),k.waitFor(s)}removeMatchingKeysForTargetId(e,t){return this.oi.zr(t),k.resolve()}getMatchingKeysForTargetId(e,t){let r=this.oi.Jr(t);return k.resolve(r)}containsKey(e,t){return k.resolve(this.oi.containsKey(t))}};var uo=class{constructor(e,t){this.ai={},this.overlays={},this.ui=new Gn(0),this.ci=!1,this.ci=!0,this.li=new wu,this.referenceDelegate=e(this),this.hi=new Au(this),this.indexManager=new hu,this.remoteDocumentCache=function(i){return new Tu(i)}(r=>this.referenceDelegate.Pi(r)),this.serializer=new lu(t),this.Ti=new vu(this.serializer)}start(){return Promise.resolve()}shutdown(){return this.ci=!1,Promise.resolve()}get started(){return this.ci}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(e){return this.indexManager}getDocumentOverlayCache(e){let t=this.overlays[e.toKey()];return t||(t=new Iu,this.overlays[e.toKey()]=t),t}getMutationQueue(e,t){let r=this.ai[e.toKey()];return r||(r=new Eu(t,this.referenceDelegate),this.ai[e.toKey()]=r),r}getGlobalsCache(){return this.li}getTargetCache(){return this.hi}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.Ti}runTransaction(e,t,r){x("MemoryPersistence","Starting transaction:",e);let i=new Su(this.ui.next());return this.referenceDelegate.Ii(),r(i).next(s=>this.referenceDelegate.di(i).next(()=>s)).toPromise().then(s=>(i.raiseOnCommittedEvent(),s))}Ei(e,t){return k.or(Object.values(this.ai).map(r=>()=>r.containsKey(e,t)))}},Su=class extends Vc{constructor(e){super(),this.currentSequenceNumber=e}},Ru=class n{constructor(e){this.persistence=e,this.Ai=new fi,this.Ri=null}static Vi(e){return new n(e)}get mi(){if(this.Ri)return this.Ri;throw B(60996)}addReference(e,t,r){return this.Ai.addReference(r,t),this.mi.delete(r.toString()),k.resolve()}removeReference(e,t,r){return this.Ai.removeReference(r,t),this.mi.add(r.toString()),k.resolve()}markPotentiallyOrphaned(e,t){return this.mi.add(t.toString()),k.resolve()}removeTarget(e,t){this.Ai.zr(t.targetId).forEach(i=>this.mi.add(i.toString()));let r=this.persistence.getTargetCache();return r.getMatchingKeysForTargetId(e,t.targetId).next(i=>{i.forEach(s=>this.mi.add(s.toString()))}).next(()=>r.removeTargetData(e,t))}Ii(){this.Ri=new Set}di(e){let t=this.persistence.getRemoteDocumentCache().newChangeBuffer();return k.forEach(this.mi,r=>{let i=F.fromPath(r);return this.fi(e,i).next(s=>{s||t.removeEntry(i,z.min())})}).next(()=>(this.Ri=null,t.apply(e)))}updateLimboDocument(e,t){return this.fi(e,t).next(r=>{r?this.mi.delete(t.toString()):this.mi.add(t.toString())})}Pi(e){return 0}fi(e,t){return k.or([()=>k.resolve(this.Ai.containsKey(t)),()=>this.persistence.getTargetCache().containsKey(e,t),()=>this.persistence.Ei(e,t)])}},lo=class n{constructor(e,t){this.persistence=e,this.gi=new wt(r=>QI(r.path),(r,i)=>r.isEqual(i)),this.garbageCollector=Gw(this,t)}static Vi(e,t){return new n(e,t)}Ii(){}di(e){return k.resolve()}forEachTarget(e,t){return this.persistence.getTargetCache().forEachTarget(e,t)}mr(e){let t=this.yr(e);return this.persistence.getTargetCache().getTargetCount(e).next(r=>t.next(i=>r+i))}yr(e){let t=0;return this.gr(e,r=>{t++}).next(()=>t)}gr(e,t){return k.forEach(this.gi,(r,i)=>this.Sr(e,r,i).next(s=>s?k.resolve():t(i)))}removeTargets(e,t,r){return this.persistence.getTargetCache().removeTargets(e,t,r)}removeOrphanedDocuments(e,t){let r=0,i=this.persistence.getRemoteDocumentCache(),s=i.newChangeBuffer();return i.ri(e,a=>this.Sr(e,a,t).next(c=>{c||(r++,s.removeEntry(a,z.min()))})).next(()=>s.apply(e)).next(()=>r)}markPotentiallyOrphaned(e,t){return this.gi.set(t,e.currentSequenceNumber),k.resolve()}removeTarget(e,t){let r=t.withSequenceNumber(e.currentSequenceNumber);return this.persistence.getTargetCache().updateTargetData(e,r)}addReference(e,t,r){return this.gi.set(r,e.currentSequenceNumber),k.resolve()}removeReference(e,t,r){return this.gi.set(r,e.currentSequenceNumber),k.resolve()}updateLimboDocument(e,t){return this.gi.set(t,e.currentSequenceNumber),k.resolve()}Pi(e){let t=e.key.toString().length;return e.isFoundDocument()&&(t+=Gs(e.data.value)),t}Sr(e,t,r){return k.or([()=>this.persistence.Ei(e,t),()=>this.persistence.getTargetCache().containsKey(e,t),()=>{let i=this.gi.get(t);return k.resolve(i!==void 0&&i>r)}])}getCacheSize(e){return this.persistence.getRemoteDocumentCache().getSize(e)}};var Pu=class n{constructor(e,t,r,i){this.targetId=e,this.fromCache=t,this.Is=r,this.ds=i}static Es(e,t){let r=W(),i=W();for(let s of t.docChanges)switch(s.type){case 0:r=r.add(s.doc.key);break;case 1:i=i.add(s.doc.key)}return new n(e,t.fromCache,r,i)}};var Cu=class{constructor(){this._documentReadCount=0}get documentReadCount(){return this._documentReadCount}incrementDocumentReadCount(e){this._documentReadCount+=e}};var ku=class{constructor(){this.As=!1,this.Rs=!1,this.Vs=100,this.fs=function(){return md()?8:WI(de())>0?6:4}()}initialize(e,t){this.gs=e,this.indexManager=t,this.As=!0}getDocumentsMatchingQuery(e,t,r,i){let s={result:null};return this.ps(e,t).next(a=>{s.result=a}).next(()=>{if(!s.result)return this.ys(e,t,i,r).next(a=>{s.result=a})}).next(()=>{if(s.result)return;let a=new Cu;return this.ws(e,t,a).next(c=>{if(s.result=c,this.Rs)return this.Ss(e,t,a,c.size)})}).next(()=>s.result)}Ss(e,t,r,i){return r.documentReadCount<this.Vs?(Mn()<=G.DEBUG&&x("QueryEngine","SDK will not create cache indexes for query:",Fn(t),"since it only creates cache indexes for collection contains","more than or equal to",this.Vs,"documents"),k.resolve()):(Mn()<=G.DEBUG&&x("QueryEngine","Query:",Fn(t),"scans",r.documentReadCount,"local documents and returns",i,"documents as results."),r.documentReadCount>this.fs*i?(Mn()<=G.DEBUG&&x("QueryEngine","The SDK decides to create cache indexes for query:",Fn(t),"as using cache indexes may help improve performance."),this.indexManager.createTargetIndexes(e,tt(t))):k.resolve())}ps(e,t){if(ep(t))return k.resolve(null);let r=tt(t);return this.indexManager.getIndexType(e,r).next(i=>i===0?null:(t.limit!==null&&i===1&&(t=no(t,null,"F"),r=tt(t)),this.indexManager.getDocumentsMatchingTarget(e,r).next(s=>{let a=W(...s);return this.gs.getDocuments(e,a).next(c=>this.indexManager.getMinOffset(e,r).next(l=>{let d=this.bs(t,c);return this.Ds(t,d,a,l.readTime)?this.ps(e,no(t,null,"F")):this.vs(e,d,t,l)}))})))}ys(e,t,r,i){return ep(t)||i.isEqual(z.min())?k.resolve(null):this.gs.getDocuments(e,r).next(s=>{let a=this.bs(t,s);return this.Ds(t,a,r,i)?k.resolve(null):(Mn()<=G.DEBUG&&x("QueryEngine","Re-using previous result from %s to execute query: %s",i.toString(),Fn(t)),this.vs(e,a,t,zI(i,si)).next(c=>c))})}bs(e,t){let r=new me(um(e));return t.forEach((i,s)=>{Do(e,s)&&(r=r.add(s))}),r}Ds(e,t,r,i){if(e.limit===null)return!1;if(r.size!==t.size)return!0;let s=e.limitType==="F"?t.last():t.first();return!!s&&(s.hasPendingWrites||s.version.compareTo(i)>0)}ws(e,t,r){return Mn()<=G.DEBUG&&x("QueryEngine","Using full collection scan to execute query:",Fn(t)),this.gs.getDocumentsMatchingQuery(e,t,pn.min(),r)}vs(e,t,r,i){return this.gs.getDocumentsMatchingQuery(e,r,i).next(s=>(t.forEach(a=>{s=s.insert(a.key,a)}),s))}};var wl="LocalStore",Hw=3e8,Nu=class{constructor(e,t,r,i){this.persistence=e,this.Cs=t,this.serializer=i,this.Fs=new oe($),this.Ms=new wt(s=>_l(s),yl),this.xs=new Map,this.Os=e.getRemoteDocumentCache(),this.hi=e.getTargetCache(),this.Ti=e.getBundleCache(),this.Ns(r)}Ns(e){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(e),this.indexManager=this.persistence.getIndexManager(e),this.mutationQueue=this.persistence.getMutationQueue(e,this.indexManager),this.localDocuments=new yu(this.Os,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.Os.setIndexManager(this.indexManager),this.Cs.initialize(this.localDocuments,this.indexManager)}collectGarbage(e){return this.persistence.runTransaction("Collect garbage","readwrite-primary",t=>e.collect(t,this.Fs))}};function Ww(n,e,t,r){return new Nu(n,e,t,r)}async function Cm(n,e){let t=j(n);return await t.persistence.runTransaction("Handle user change","readonly",r=>{let i;return t.mutationQueue.getAllMutationBatches(r).next(s=>(i=s,t.Ns(e),t.mutationQueue.getAllMutationBatches(r))).next(s=>{let a=[],c=[],l=W();for(let d of i){a.push(d.batchId);for(let p of d.mutations)l=l.add(p.key)}for(let d of s){c.push(d.batchId);for(let p of d.mutations)l=l.add(p.key)}return t.localDocuments.getDocuments(r,l).next(d=>({Bs:d,removedBatchIds:a,addedBatchIds:c}))})})}function Kw(n,e){let t=j(n);return t.persistence.runTransaction("Acknowledge batch","readwrite-primary",r=>{let i=e.batch.keys(),s=t.Os.newChangeBuffer({trackRemovals:!0});return function(c,l,d,p){let m=d.batch,v=m.keys(),S=k.resolve();return v.forEach(P=>{S=S.next(()=>p.getEntry(l,P)).next(N=>{let C=d.docVersions.get(P);X(C!==null,48541),N.version.compareTo(C)<0&&(m.applyToRemoteDocument(N,d),N.isValidDocument()&&(N.setReadTime(d.commitVersion),p.addEntry(N)))})}),S.next(()=>c.mutationQueue.removeMutationBatch(l,m))}(t,r,e,s).next(()=>s.apply(r)).next(()=>t.mutationQueue.performConsistencyCheck(r)).next(()=>t.documentOverlayCache.removeOverlaysForBatchId(r,i,e.batch.batchId)).next(()=>t.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(r,function(c){let l=W();for(let d=0;d<c.mutationResults.length;++d)c.mutationResults[d].transformResults.length>0&&(l=l.add(c.batch.mutations[d].key));return l}(e))).next(()=>t.localDocuments.getDocuments(r,i))})}function km(n){let e=j(n);return e.persistence.runTransaction("Get last remote snapshot version","readonly",t=>e.hi.getLastRemoteSnapshotVersion(t))}function Qw(n,e){let t=j(n),r=e.snapshotVersion,i=t.Fs;return t.persistence.runTransaction("Apply remote event","readwrite-primary",s=>{let a=t.Os.newChangeBuffer({trackRemovals:!0});i=t.Fs;let c=[];e.targetChanges.forEach((p,m)=>{let v=i.get(m);if(!v)return;c.push(t.hi.removeMatchingKeys(s,p.removedDocuments,m).next(()=>t.hi.addMatchingKeys(s,p.addedDocuments,m)));let S=v.withSequenceNumber(s.currentSequenceNumber);e.targetMismatches.get(m)!==null?S=S.withResumeToken(Se.EMPTY_BYTE_STRING,z.min()).withLastLimboFreeSnapshotVersion(z.min()):p.resumeToken.approximateByteSize()>0&&(S=S.withResumeToken(p.resumeToken,r)),i=i.insert(m,S),function(N,C,U){return N.resumeToken.approximateByteSize()===0||C.snapshotVersion.toMicroseconds()-N.snapshotVersion.toMicroseconds()>=Hw?!0:U.addedDocuments.size+U.modifiedDocuments.size+U.removedDocuments.size>0}(v,S,p)&&c.push(t.hi.updateTargetData(s,S))});let l=Et(),d=W();if(e.documentUpdates.forEach(p=>{e.resolvedLimboDocuments.has(p)&&c.push(t.persistence.referenceDelegate.updateLimboDocument(s,p))}),c.push(Xw(s,a,e.documentUpdates).next(p=>{l=p.Ls,d=p.ks})),!r.isEqual(z.min())){let p=t.hi.getLastRemoteSnapshotVersion(s).next(m=>t.hi.setTargetsMetadata(s,s.currentSequenceNumber,r));c.push(p)}return k.waitFor(c).next(()=>a.apply(s)).next(()=>t.localDocuments.getLocalViewOfDocuments(s,l,d)).next(()=>l)}).then(s=>(t.Fs=i,s))}function Xw(n,e,t){let r=W(),i=W();return t.forEach(s=>r=r.add(s)),e.getEntries(n,r).next(s=>{let a=Et();return t.forEach((c,l)=>{let d=s.get(c);l.isFoundDocument()!==d.isFoundDocument()&&(i=i.add(c)),l.isNoDocument()&&l.version.isEqual(z.min())?(e.removeEntry(c,l.readTime),a=a.insert(c,l)):!d.isValidDocument()||l.version.compareTo(d.version)>0||l.version.compareTo(d.version)===0&&d.hasPendingWrites?(e.addEntry(l),a=a.insert(c,l)):x(wl,"Ignoring outdated watch update for ",c,". Current version:",d.version," Watch version:",l.version)}),{Ls:a,ks:i}})}function Yw(n,e){let t=j(n);return t.persistence.runTransaction("Get next mutation batch","readonly",r=>(e===void 0&&(e=dl),t.mutationQueue.getNextMutationBatchAfterBatchId(r,e)))}function Jw(n,e){let t=j(n);return t.persistence.runTransaction("Allocate target","readwrite",r=>{let i;return t.hi.getTargetData(r,e).next(s=>s?(i=s,k.resolve(i)):t.hi.allocateTargetId(r).next(a=>(i=new hi(e,a,"TargetPurposeListen",r.currentSequenceNumber),t.hi.addTargetData(r,i).next(()=>i))))}).then(r=>{let i=t.Fs.get(r.targetId);return(i===null||r.snapshotVersion.compareTo(i.snapshotVersion)>0)&&(t.Fs=t.Fs.insert(r.targetId,r),t.Ms.set(e,r.targetId)),r})}async function Du(n,e,t){let r=j(n),i=r.Fs.get(e),s=t?"readwrite":"readwrite-primary";try{t||await r.persistence.runTransaction("Release target",s,a=>r.persistence.referenceDelegate.removeTarget(a,i))}catch(a){if(!ir(a))throw a;x(wl,"Failed to update sequence numbers for target ".concat(e,": ").concat(a))}r.Fs=r.Fs.remove(e),r.Ms.delete(i.target)}function fp(n,e,t){let r=j(n),i=z.min(),s=W();return r.persistence.runTransaction("Execute query","readwrite",a=>function(l,d,p){let m=j(l),v=m.Ms.get(p);return v!==void 0?k.resolve(m.Fs.get(v)):m.hi.getTargetData(d,p)}(r,a,tt(e)).next(c=>{if(c)return i=c.lastLimboFreeSnapshotVersion,r.hi.getMatchingKeysForTargetId(a,c.targetId).next(l=>{s=l})}).next(()=>r.Cs.getDocumentsMatchingQuery(a,e,t?i:z.min(),t?s:W())).next(c=>(Zw(r,dw(e),c),{documents:c,qs:s})))}function Zw(n,e,t){let r=n.xs.get(e)||z.min();t.forEach((i,s)=>{s.readTime.compareTo(r)>0&&(r=s.readTime)}),n.xs.set(e,r)}var ho=class{constructor(){this.activeTargetIds=yw()}Gs(e){this.activeTargetIds=this.activeTargetIds.add(e)}zs(e){this.activeTargetIds=this.activeTargetIds.delete(e)}Ws(){let e={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(e)}};var Ou=class{constructor(){this.Fo=new ho,this.Mo={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(e){}updateMutationState(e,t,r){}addLocalQueryTarget(e,t=!0){return t&&this.Fo.Gs(e),this.Mo[e]||"not-current"}updateQueryState(e,t,r){this.Mo[e]=t}removeLocalQueryTarget(e){this.Fo.zs(e)}isLocalQueryTarget(e){return this.Fo.activeTargetIds.has(e)}clearQueryState(e){delete this.Mo[e]}getAllActiveQueryTargets(){return this.Fo.activeTargetIds}isActiveQueryTarget(e){return this.Fo.activeTargetIds.has(e)}start(){return this.Fo=new ho,Promise.resolve()}handleUserChange(e,t,r){}setOnlineState(e){}shutdown(){}writeSequenceNumber(e){}notifyBundleLoaded(e){}};var xu=class{xo(e){}shutdown(){}};var pp="ConnectivityMonitor",fo=class{constructor(){this.Oo=()=>this.No(),this.Bo=()=>this.Lo(),this.ko=[],this.qo()}xo(e){this.ko.push(e)}shutdown(){window.removeEventListener("online",this.Oo),window.removeEventListener("offline",this.Bo)}qo(){window.addEventListener("online",this.Oo),window.addEventListener("offline",this.Bo)}No(){x(pp,"Network connectivity changed: AVAILABLE");for(let e of this.ko)e(0)}Lo(){x(pp,"Network connectivity changed: UNAVAILABLE");for(let e of this.ko)e(1)}static C(){return typeof window<"u"&&window.addEventListener!==void 0&&window.removeEventListener!==void 0}};var $s=null;function Vu(){return $s===null?$s=function(){return 268435456+Math.round(2147483648*Math.random())}():$s++,"0x"+$s.toString(16)}var bc="RestConnection",eE={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery"},Lu=class{get Qo(){return!1}constructor(e){this.databaseInfo=e,this.databaseId=e.databaseId;let t=e.ssl?"https":"http",r=encodeURIComponent(this.databaseId.projectId),i=encodeURIComponent(this.databaseId.database);this.$o=t+"://"+e.host,this.Uo="projects/".concat(r,"/databases/").concat(i),this.Ko=this.databaseId.database===Zs?"project_id=".concat(r):"project_id=".concat(r,"&database_id=").concat(i)}Wo(e,t,r,i,s){let a=Vu(),c=this.Go(e,t.toUriEncodedString());x(bc,"Sending RPC '".concat(e,"' ").concat(a,":"),c,r);let l={"google-cloud-resource-prefix":this.Uo,"x-goog-request-params":this.Ko};this.zo(l,i,s);let{host:d}=new URL(c),p=Be(d);return this.jo(e,c,l,r,p).then(m=>(x(bc,"Received RPC '".concat(e,"' ").concat(a,": "),m),m),m=>{throw Bt(bc,"RPC '".concat(e,"' ").concat(a," failed with error: "),m,"url: ",c,"request:",r),m})}Jo(e,t,r,i,s,a){return this.Wo(e,t,r,i,s)}zo(e,t,r){e["X-Goog-Api-Client"]=function(){return"gl-js/ fire/"+nr}(),e["Content-Type"]="text/plain",this.databaseInfo.appId&&(e["X-Firebase-GMPID"]=this.databaseInfo.appId),t&&t.headers.forEach((i,s)=>e[s]=i),r&&r.headers.forEach((i,s)=>e[s]=i)}Go(e,t){let r=eE[e];return"".concat(this.$o,"/v1/").concat(t,":").concat(r)}terminate(){}};var Mu=class{constructor(e){this.Ho=e.Ho,this.Yo=e.Yo}Zo(e){this.Xo=e}e_(e){this.t_=e}n_(e){this.r_=e}onMessage(e){this.i_=e}close(){this.Yo()}send(e){this.Ho(e)}s_(){this.Xo()}o_(){this.t_()}__(e){this.r_(e)}a_(e){this.i_(e)}};var Ae="WebChannelConnection",Fu=class extends Lu{constructor(e){super(e),this.u_=[],this.forceLongPolling=e.forceLongPolling,this.autoDetectLongPolling=e.autoDetectLongPolling,this.useFetchStreams=e.useFetchStreams,this.longPollingOptions=e.longPollingOptions}jo(e,t,r,i,s){let a=Vu();return new Promise((c,l)=>{let d=new yc;d.setWithCredentials(!0),d.listenOnce(vc.COMPLETE,()=>{try{switch(d.getLastErrorCode()){case Jr.NO_ERROR:let m=d.getResponseJson();x(Ae,"XHR for RPC '".concat(e,"' ").concat(a," received:"),JSON.stringify(m)),c(m);break;case Jr.TIMEOUT:x(Ae,"RPC '".concat(e,"' ").concat(a," timed out")),l(new O(R.DEADLINE_EXCEEDED,"Request time out"));break;case Jr.HTTP_ERROR:let v=d.getStatus();if(x(Ae,"RPC '".concat(e,"' ").concat(a," failed with status:"),v,"response text:",d.getResponseText()),v>0){let S=d.getResponseJson();Array.isArray(S)&&(S=S[0]);let P=S==null?void 0:S.error;if(P&&P.status&&P.message){let N=function(U){let M=U.toLowerCase().replace(/_/g,"-");return Object.values(R).indexOf(M)>=0?M:R.UNKNOWN}(P.status);l(new O(N,P.message))}else l(new O(R.UNKNOWN,"Server responded with status "+d.getStatus()))}else l(new O(R.UNAVAILABLE,"Connection failed."));break;default:B(9055,{c_:e,streamId:a,l_:d.getLastErrorCode(),h_:d.getLastError()})}}finally{x(Ae,"RPC '".concat(e,"' ").concat(a," completed."))}});let p=JSON.stringify(i);x(Ae,"RPC '".concat(e,"' ").concat(a," sending request:"),i),d.send(t,"POST",p,r,15)})}P_(e,t,r){let i=Vu(),s=[this.$o,"/","google.firestore.v1.Firestore","/",e,"/channel"],a=Ec(),c=wc(),l={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:"projects/".concat(this.databaseId.projectId,"/databases/").concat(this.databaseId.database)},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling},d=this.longPollingOptions.timeoutSeconds;d!==void 0&&(l.longPollingTimeout=Math.round(1e3*d)),this.useFetchStreams&&(l.useFetchStreams=!0),this.zo(l.initMessageHeaders,t,r),l.encodeInitMessageHeaders=!0;let p=s.join("");x(Ae,"Creating RPC '".concat(e,"' stream ").concat(i,": ").concat(p),l);let m=a.createWebChannel(p,l);this.T_(m);let v=!1,S=!1,P=new Mu({Ho:C=>{S?x(Ae,"Not sending because RPC '".concat(e,"' stream ").concat(i," is closed:"),C):(v||(x(Ae,"Opening RPC '".concat(e,"' stream ").concat(i," transport.")),m.open(),v=!0),x(Ae,"RPC '".concat(e,"' stream ").concat(i," sending:"),C),m.send(C))},Yo:()=>m.close()}),N=(C,U,M)=>{C.listen(U,L=>{try{M(L)}catch(q){setTimeout(()=>{throw q},0)}})};return N(m,Ln.EventType.OPEN,()=>{S||(x(Ae,"RPC '".concat(e,"' stream ").concat(i," transport opened.")),P.s_())}),N(m,Ln.EventType.CLOSE,()=>{S||(S=!0,x(Ae,"RPC '".concat(e,"' stream ").concat(i," transport closed")),P.__(),this.I_(m))}),N(m,Ln.EventType.ERROR,C=>{S||(S=!0,Bt(Ae,"RPC '".concat(e,"' stream ").concat(i," transport errored. Name:"),C.name,"Message:",C.message),P.__(new O(R.UNAVAILABLE,"The operation could not be completed")))}),N(m,Ln.EventType.MESSAGE,C=>{var U;if(!S){let M=C.data[0];X(!!M,16349);let L=M,q=(L==null?void 0:L.error)||((U=L[0])===null||U===void 0?void 0:U.error);if(q){x(Ae,"RPC '".concat(e,"' stream ").concat(i," received error:"),q);let ie=q.status,H=function(_){let I=ae[_];if(I!==void 0)return Im(I)}(ie),w=q.message;H===void 0&&(H=R.INTERNAL,w="Unknown error status: "+ie+" with message "+q.message),S=!0,P.__(new O(H,w)),m.close()}else x(Ae,"RPC '".concat(e,"' stream ").concat(i," received:"),M),P.a_(M)}}),N(c,Ic.STAT_EVENT,C=>{C.stat===qs.PROXY?x(Ae,"RPC '".concat(e,"' stream ").concat(i," detected buffering proxy")):C.stat===qs.NOPROXY&&x(Ae,"RPC '".concat(e,"' stream ").concat(i," detected no buffering proxy"))}),setTimeout(()=>{P.o_()},0),P}terminate(){this.u_.forEach(e=>e.close()),this.u_=[]}T_(e){this.u_.push(e)}I_(e){this.u_=this.u_.filter(t=>t===e)}};function Ac(){return typeof document<"u"?document:null}function Oo(n){return new su(n,!0)}var po=class{constructor(e,t,r=1e3,i=1.5,s=6e4){this.Fi=e,this.timerId=t,this.d_=r,this.E_=i,this.A_=s,this.R_=0,this.V_=null,this.m_=Date.now(),this.reset()}reset(){this.R_=0}f_(){this.R_=this.A_}g_(e){this.cancel();let t=Math.floor(this.R_+this.p_()),r=Math.max(0,Date.now()-this.m_),i=Math.max(0,t-r);i>0&&x("ExponentialBackoff","Backing off for ".concat(i," ms (base delay: ").concat(this.R_," ms, delay with jitter: ").concat(t," ms, last attempt: ").concat(r," ms ago)")),this.V_=this.Fi.enqueueAfterDelay(this.timerId,i,()=>(this.m_=Date.now(),e())),this.R_*=this.E_,this.R_<this.d_&&(this.R_=this.d_),this.R_>this.A_&&(this.R_=this.A_)}y_(){this.V_!==null&&(this.V_.skipDelay(),this.V_=null)}cancel(){this.V_!==null&&(this.V_.cancel(),this.V_=null)}p_(){return(Math.random()-.5)*this.R_}};var mp="PersistentStream",mo=class{constructor(e,t,r,i,s,a,c,l){this.Fi=e,this.w_=r,this.S_=i,this.connection=s,this.authCredentialsProvider=a,this.appCheckCredentialsProvider=c,this.listener=l,this.state=0,this.b_=0,this.D_=null,this.v_=null,this.stream=null,this.C_=0,this.F_=new po(e,t)}M_(){return this.state===1||this.state===5||this.x_()}x_(){return this.state===2||this.state===3}start(){this.C_=0,this.state!==4?this.auth():this.O_()}async stop(){this.M_()&&await this.close(0)}N_(){this.state=0,this.F_.reset()}B_(){this.x_()&&this.D_===null&&(this.D_=this.Fi.enqueueAfterDelay(this.w_,6e4,()=>this.L_()))}k_(e){this.q_(),this.stream.send(e)}async L_(){if(this.x_())return this.close(0)}q_(){this.D_&&(this.D_.cancel(),this.D_=null)}Q_(){this.v_&&(this.v_.cancel(),this.v_=null)}async close(e,t){this.q_(),this.Q_(),this.F_.cancel(),this.b_++,e!==4?this.F_.reset():t&&t.code===R.RESOURCE_EXHAUSTED?(yt(t.toString()),yt("Using maximum backoff delay to prevent overloading the backend."),this.F_.f_()):t&&t.code===R.UNAUTHENTICATED&&this.state!==3&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),this.stream!==null&&(this.U_(),this.stream.close(),this.stream=null),this.state=e,await this.listener.n_(t)}U_(){}auth(){this.state=1;let e=this.K_(this.b_),t=this.b_;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then(([r,i])=>{this.b_===t&&this.W_(r,i)},r=>{e(()=>{let i=new O(R.UNKNOWN,"Fetching auth token failed: "+r.message);return this.G_(i)})})}W_(e,t){let r=this.K_(this.b_);this.stream=this.z_(e,t),this.stream.Zo(()=>{r(()=>this.listener.Zo())}),this.stream.e_(()=>{r(()=>(this.state=2,this.v_=this.Fi.enqueueAfterDelay(this.S_,1e4,()=>(this.x_()&&(this.state=3),Promise.resolve())),this.listener.e_()))}),this.stream.n_(i=>{r(()=>this.G_(i))}),this.stream.onMessage(i=>{r(()=>++this.C_==1?this.j_(i):this.onNext(i))})}O_(){this.state=5,this.F_.g_(async()=>{this.state=0,this.start()})}G_(e){return x(mp,"close with error: ".concat(e)),this.stream=null,this.close(4,e)}K_(e){return t=>{this.Fi.enqueueAndForget(()=>this.b_===e?t():(x(mp,"stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve()))}}},Uu=class extends mo{constructor(e,t,r,i,s,a){super(e,"listen_stream_connection_backoff","listen_stream_idle","health_check_timeout",t,r,i,a),this.serializer=s}z_(e,t){return this.connection.P_("Listen",e,t)}j_(e){return this.onNext(e)}onNext(e){this.F_.reset();let t=Dw(this.serializer,e),r=function(s){if(!("targetChange"in s))return z.min();let a=s.targetChange;return a.targetIds&&a.targetIds.length?z.min():a.readTime?nt(a.readTime):z.min()}(e);return this.listener.J_(t,r)}H_(e){let t={};t.database=uu(this.serializer),t.addTarget=function(s,a){let c,l=a.target;if(c=Kc(l)?{documents:Vw(s,l)}:{query:Lw(s,l).Vt},c.targetId=a.targetId,a.resumeToken.approximateByteSize()>0){c.resumeToken=wm(s,a.resumeToken);let d=ou(s,a.expectedCount);d!==null&&(c.expectedCount=d)}else if(a.snapshotVersion.compareTo(z.min())>0){c.readTime=ao(s,a.snapshotVersion.toTimestamp());let d=ou(s,a.expectedCount);d!==null&&(c.expectedCount=d)}return c}(this.serializer,e);let r=Fw(this.serializer,e);r&&(t.labels=r),this.k_(t)}Y_(e){let t={};t.database=uu(this.serializer),t.removeTarget=e,this.k_(t)}},Bu=class extends mo{constructor(e,t,r,i,s,a){super(e,"write_stream_connection_backoff","write_stream_idle","health_check_timeout",t,r,i,a),this.serializer=s}get Z_(){return this.C_>0}start(){this.lastStreamToken=void 0,super.start()}U_(){this.Z_&&this.X_([])}z_(e,t){return this.connection.P_("Write",e,t)}j_(e){return X(!!e.streamToken,31322),this.lastStreamToken=e.streamToken,X(!e.writeResults||e.writeResults.length===0,55816),this.listener.ea()}onNext(e){X(!!e.streamToken,12678),this.lastStreamToken=e.streamToken,this.F_.reset();let t=xw(e.writeResults,e.commitTime),r=nt(e.commitTime);return this.listener.ta(r,t)}na(){let e={};e.database=uu(this.serializer),this.k_(e)}X_(e){let t={streamToken:this.lastStreamToken,writes:e.map(r=>Ow(this.serializer,r))};this.k_(t)}};var qu=class{},ju=class extends qu{constructor(e,t,r,i){super(),this.authCredentials=e,this.appCheckCredentials=t,this.connection=r,this.serializer=i,this.ra=!1}ia(){if(this.ra)throw new O(R.FAILED_PRECONDITION,"The client has already been terminated.")}Wo(e,t,r,i){return this.ia(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([s,a])=>this.connection.Wo(e,au(t,r),i,s,a)).catch(s=>{throw s.name==="FirebaseError"?(s.code===R.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),s):new O(R.UNKNOWN,s.toString())})}Jo(e,t,r,i,s){return this.ia(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([a,c])=>this.connection.Jo(e,au(t,r),i,a,c,s)).catch(a=>{throw a.name==="FirebaseError"?(a.code===R.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),a):new O(R.UNKNOWN,a.toString())})}terminate(){this.ra=!0,this.connection.terminate()}},zu=class{constructor(e,t){this.asyncQueue=e,this.onlineStateHandler=t,this.state="Unknown",this.sa=0,this.oa=null,this._a=!0}aa(){this.sa===0&&(this.ua("Unknown"),this.oa=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,()=>(this.oa=null,this.ca("Backend didn't respond within 10 seconds."),this.ua("Offline"),Promise.resolve())))}la(e){this.state==="Online"?this.ua("Unknown"):(this.sa++,this.sa>=1&&(this.ha(),this.ca("Connection failed 1 times. Most recent error: ".concat(e.toString())),this.ua("Offline")))}set(e){this.ha(),this.sa=0,e==="Online"&&(this._a=!1),this.ua(e)}ua(e){e!==this.state&&(this.state=e,this.onlineStateHandler(e))}ca(e){let t="Could not reach Cloud Firestore backend. ".concat(e,"\nThis typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.");this._a?(yt(t),this._a=!1):x("OnlineStateTracker",t)}ha(){this.oa!==null&&(this.oa.cancel(),this.oa=null)}};var In="RemoteStore",$u=class{constructor(e,t,r,i,s){this.localStore=e,this.datastore=t,this.asyncQueue=r,this.remoteSyncer={},this.Pa=[],this.Ta=new Map,this.Ia=new Set,this.da=[],this.Ea=s,this.Ea.xo(a=>{r.enqueueAndForget(async()=>{En(this)&&(x(In,"Restarting streams for network reachability change."),await async function(l){let d=j(l);d.Ia.add(4),await Ti(d),d.Aa.set("Unknown"),d.Ia.delete(4),await xo(d)}(this))})}),this.Aa=new zu(r,i)}};async function xo(n){if(En(n))for(let e of n.da)await e(!0)}async function Ti(n){for(let e of n.da)await e(!1)}function Nm(n,e){let t=j(n);t.Ta.has(e.targetId)||(t.Ta.set(e.targetId,e),Al(t)?bl(t):sr(t).x_()&&Tl(t,e))}function El(n,e){let t=j(n),r=sr(t);t.Ta.delete(e),r.x_()&&Dm(t,e),t.Ta.size===0&&(r.x_()?r.B_():En(t)&&t.Aa.set("Unknown"))}function Tl(n,e){if(n.Ra.$e(e.targetId),e.resumeToken.approximateByteSize()>0||e.snapshotVersion.compareTo(z.min())>0){let t=n.remoteSyncer.getRemoteKeysForTarget(e.targetId).size;e=e.withExpectedCount(t)}sr(n).H_(e)}function Dm(n,e){n.Ra.$e(e),sr(n).Y_(e)}function bl(n){n.Ra=new iu({getRemoteKeysForTarget:e=>n.remoteSyncer.getRemoteKeysForTarget(e),Et:e=>n.Ta.get(e)||null,lt:()=>n.datastore.serializer.databaseId}),sr(n).start(),n.Aa.aa()}function Al(n){return En(n)&&!sr(n).M_()&&n.Ta.size>0}function En(n){return j(n).Ia.size===0}function Om(n){n.Ra=void 0}async function tE(n){n.Aa.set("Online")}async function nE(n){n.Ta.forEach((e,t)=>{Tl(n,e)})}async function rE(n,e){Om(n),Al(n)?(n.Aa.la(e),bl(n)):n.Aa.set("Unknown")}async function iE(n,e,t){if(n.Aa.set("Online"),e instanceof so&&e.state===2&&e.cause)try{await async function(i,s){let a=s.cause;for(let c of s.targetIds)i.Ta.has(c)&&(await i.remoteSyncer.rejectListen(c,a),i.Ta.delete(c),i.Ra.removeTarget(c))}(n,e)}catch(r){x(In,"Failed to remove targets %s: %s ",e.targetIds.join(","),r),await go(n,r)}else if(e instanceof jn?n.Ra.Ye(e):e instanceof io?n.Ra.it(e):n.Ra.et(e),!t.isEqual(z.min()))try{let r=await km(n.localStore);t.compareTo(r)>=0&&await function(s,a){let c=s.Ra.Pt(a);return c.targetChanges.forEach((l,d)=>{if(l.resumeToken.approximateByteSize()>0){let p=s.Ta.get(d);p&&s.Ta.set(d,p.withResumeToken(l.resumeToken,a))}}),c.targetMismatches.forEach((l,d)=>{let p=s.Ta.get(l);if(!p)return;s.Ta.set(l,p.withResumeToken(Se.EMPTY_BYTE_STRING,p.snapshotVersion)),Dm(s,l);let m=new hi(p.target,l,d,p.sequenceNumber);Tl(s,m)}),s.remoteSyncer.applyRemoteEvent(c)}(n,t)}catch(r){x(In,"Failed to raise snapshot:",r),await go(n,r)}}async function go(n,e,t){if(!ir(e))throw e;n.Ia.add(1),await Ti(n),n.Aa.set("Offline"),t||(t=()=>km(n.localStore)),n.asyncQueue.enqueueRetryable(async()=>{x(In,"Retrying IndexedDB access"),await t(),n.Ia.delete(1),await xo(n)})}function xm(n,e){return e().catch(t=>go(n,t,e))}async function Vo(n){let e=j(n),t=zt(e),r=e.Pa.length>0?e.Pa[e.Pa.length-1].batchId:dl;for(;sE(e);)try{let i=await Yw(e.localStore,r);if(i===null){e.Pa.length===0&&t.B_();break}r=i.batchId,oE(e,i)}catch(i){await go(e,i)}Vm(e)&&Lm(e)}function sE(n){return En(n)&&n.Pa.length<10}function oE(n,e){n.Pa.push(e);let t=zt(n);t.x_()&&t.Z_&&t.X_(e.mutations)}function Vm(n){return En(n)&&!zt(n).M_()&&n.Pa.length>0}function Lm(n){zt(n).start()}async function aE(n){zt(n).na()}async function cE(n){let e=zt(n);for(let t of n.Pa)e.X_(t.mutations)}async function uE(n,e,t){let r=n.Pa.shift(),i=eu.from(r,e,t);await xm(n,()=>n.remoteSyncer.applySuccessfulWrite(i)),await Vo(n)}async function lE(n,e){e&&zt(n).Z_&&await async function(r,i){if(function(a){return Aw(a)&&a!==R.ABORTED}(i.code)){let s=r.Pa.shift();zt(r).N_(),await xm(r,()=>r.remoteSyncer.rejectFailedWrite(s.batchId,i)),await Vo(r)}}(n,e),Vm(n)&&Lm(n)}async function gp(n,e){let t=j(n);t.asyncQueue.verifyOperationInProgress(),x(In,"RemoteStore received new credentials");let r=En(t);t.Ia.add(3),await Ti(t),r&&t.Aa.set("Unknown"),await t.remoteSyncer.handleCredentialChange(e),t.Ia.delete(3),await xo(t)}async function hE(n,e){let t=j(n);e?(t.Ia.delete(2),await xo(t)):e||(t.Ia.add(2),await Ti(t),t.Aa.set("Unknown"))}function sr(n){return n.Va||(n.Va=function(t,r,i){let s=j(t);return s.ia(),new Uu(r,s.connection,s.authCredentials,s.appCheckCredentials,s.serializer,i)}(n.datastore,n.asyncQueue,{Zo:tE.bind(null,n),e_:nE.bind(null,n),n_:rE.bind(null,n),J_:iE.bind(null,n)}),n.da.push(async e=>{e?(n.Va.N_(),Al(n)?bl(n):n.Aa.set("Unknown")):(await n.Va.stop(),Om(n))})),n.Va}function zt(n){return n.ma||(n.ma=function(t,r,i){let s=j(t);return s.ia(),new Bu(r,s.connection,s.authCredentials,s.appCheckCredentials,s.serializer,i)}(n.datastore,n.asyncQueue,{Zo:()=>Promise.resolve(),e_:aE.bind(null,n),n_:lE.bind(null,n),ea:cE.bind(null,n),ta:uE.bind(null,n)}),n.da.push(async e=>{e?(n.ma.N_(),await Vo(n)):(await n.ma.stop(),n.Pa.length>0&&(x(In,"Stopping write stream with ".concat(n.Pa.length," pending writes")),n.Pa=[]))})),n.ma}var Gu=class n{constructor(e,t,r,i,s){this.asyncQueue=e,this.timerId=t,this.targetTimeMs=r,this.op=i,this.removalCallback=s,this.deferred=new ze,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch(a=>{})}get promise(){return this.deferred.promise}static createAndSchedule(e,t,r,i,s){let a=Date.now()+r,c=new n(e,t,a,i,s);return c.start(r),c}start(e){this.timerHandle=setTimeout(()=>this.handleDelayElapsed(),e)}skipDelay(){return this.handleDelayElapsed()}cancel(e){this.timerHandle!==null&&(this.clearTimeout(),this.deferred.reject(new O(R.CANCELLED,"Operation cancelled"+(e?": "+e:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget(()=>this.timerHandle!==null?(this.clearTimeout(),this.op().then(e=>this.deferred.resolve(e))):Promise.resolve())}clearTimeout(){this.timerHandle!==null&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}};function Sl(n,e){if(yt("AsyncQueue","".concat(e,": ").concat(n)),ir(n))return new O(R.UNAVAILABLE,"".concat(e,": ").concat(n));throw n}var _o=class n{static emptySet(e){return new n(e.comparator)}constructor(e){this.comparator=e?(t,r)=>e(t,r)||F.comparator(t.key,r.key):(t,r)=>F.comparator(t.key,r.key),this.keyedMap=Zr(),this.sortedSet=new oe(this.comparator)}has(e){return this.keyedMap.get(e)!=null}get(e){return this.keyedMap.get(e)}first(){return this.sortedSet.minKey()}last(){return this.sortedSet.maxKey()}isEmpty(){return this.sortedSet.isEmpty()}indexOf(e){let t=this.keyedMap.get(e);return t?this.sortedSet.indexOf(t):-1}get size(){return this.sortedSet.size}forEach(e){this.sortedSet.inorderTraversal((t,r)=>(e(t),!1))}add(e){let t=this.delete(e.key);return t.copy(t.keyedMap.insert(e.key,e),t.sortedSet.insert(e,null))}delete(e){let t=this.get(e);return t?this.copy(this.keyedMap.remove(e),this.sortedSet.remove(t)):this}isEqual(e){if(!(e instanceof n)||this.size!==e.size)return!1;let t=this.sortedSet.getIterator(),r=e.sortedSet.getIterator();for(;t.hasNext();){let i=t.getNext().key,s=r.getNext().key;if(!i.isEqual(s))return!1}return!0}toString(){let e=[];return this.forEach(t=>{e.push(t.toString())}),e.length===0?"DocumentSet ()":"DocumentSet (\n  "+e.join("  \n")+"\n)"}copy(e,t){let r=new n;return r.comparator=this.comparator,r.keyedMap=e,r.sortedSet=t,r}};var yo=class{constructor(){this.fa=new oe(F.comparator)}track(e){let t=e.doc.key,r=this.fa.get(t);r?e.type!==0&&r.type===3?this.fa=this.fa.insert(t,e):e.type===3&&r.type!==1?this.fa=this.fa.insert(t,{type:r.type,doc:e.doc}):e.type===2&&r.type===2?this.fa=this.fa.insert(t,{type:2,doc:e.doc}):e.type===2&&r.type===0?this.fa=this.fa.insert(t,{type:0,doc:e.doc}):e.type===1&&r.type===0?this.fa=this.fa.remove(t):e.type===1&&r.type===2?this.fa=this.fa.insert(t,{type:1,doc:r.doc}):e.type===0&&r.type===1?this.fa=this.fa.insert(t,{type:2,doc:e.doc}):B(63341,{At:e,ga:r}):this.fa=this.fa.insert(t,e)}pa(){let e=[];return this.fa.inorderTraversal((t,r)=>{e.push(r)}),e}},Zn=class n{constructor(e,t,r,i,s,a,c,l,d){this.query=e,this.docs=t,this.oldDocs=r,this.docChanges=i,this.mutatedKeys=s,this.fromCache=a,this.syncStateChanged=c,this.excludesMetadataChanges=l,this.hasCachedResults=d}static fromInitialDocuments(e,t,r,i,s){let a=[];return t.forEach(c=>{a.push({type:0,doc:c})}),new n(e,t,_o.emptySet(t),a,r,i,!0,!1,s)}get hasPendingWrites(){return!this.mutatedKeys.isEmpty()}isEqual(e){if(!(this.fromCache===e.fromCache&&this.hasCachedResults===e.hasCachedResults&&this.syncStateChanged===e.syncStateChanged&&this.mutatedKeys.isEqual(e.mutatedKeys)&&No(this.query,e.query)&&this.docs.isEqual(e.docs)&&this.oldDocs.isEqual(e.oldDocs)))return!1;let t=this.docChanges,r=e.docChanges;if(t.length!==r.length)return!1;for(let i=0;i<t.length;i++)if(t[i].type!==r[i].type||!t[i].doc.isEqual(r[i].doc))return!1;return!0}};var Hu=class{constructor(){this.ya=void 0,this.wa=[]}Sa(){return this.wa.some(e=>e.ba())}},Wu=class{constructor(){this.queries=_p(),this.onlineState="Unknown",this.Da=new Set}terminate(){(function(t,r){let i=j(t),s=i.queries;i.queries=_p(),s.forEach((a,c)=>{for(let l of c.wa)l.onError(r)})})(this,new O(R.ABORTED,"Firestore shutting down"))}};function _p(){return new wt(n=>cm(n),No)}async function Rl(n,e){let t=j(n),r=3,i=e.query,s=t.queries.get(i);s?!s.Sa()&&e.ba()&&(r=2):(s=new Hu,r=e.ba()?0:1);try{switch(r){case 0:s.ya=await t.onListen(i,!0);break;case 1:s.ya=await t.onListen(i,!1);break;case 2:await t.onFirstRemoteStoreListen(i)}}catch(a){let c=Sl(a,"Initialization of query '".concat(Fn(e.query),"' failed"));return void e.onError(c)}t.queries.set(i,s),s.wa.push(e),e.va(t.onlineState),s.ya&&e.Ca(s.ya)&&Cl(t)}async function Pl(n,e){let t=j(n),r=e.query,i=3,s=t.queries.get(r);if(s){let a=s.wa.indexOf(e);a>=0&&(s.wa.splice(a,1),s.wa.length===0?i=e.ba()?0:1:!s.Sa()&&e.ba()&&(i=2))}switch(i){case 0:return t.queries.delete(r),t.onUnlisten(r,!0);case 1:return t.queries.delete(r),t.onUnlisten(r,!1);case 2:return t.onLastRemoteStoreUnlisten(r);default:return}}function dE(n,e){let t=j(n),r=!1;for(let i of e){let s=i.query,a=t.queries.get(s);if(a){for(let c of a.wa)c.Ca(i)&&(r=!0);a.ya=i}}r&&Cl(t)}function fE(n,e,t){let r=j(n),i=r.queries.get(e);if(i)for(let s of i.wa)s.onError(t);r.queries.delete(e)}function Cl(n){n.Da.forEach(e=>{e.next()})}var Ku,yp;(yp=Ku||(Ku={})).Fa="default",yp.Cache="cache";var pi=class{constructor(e,t,r){this.query=e,this.Ma=t,this.xa=!1,this.Oa=null,this.onlineState="Unknown",this.options=r||{}}Ca(e){if(!this.options.includeMetadataChanges){let r=[];for(let i of e.docChanges)i.type!==3&&r.push(i);e=new Zn(e.query,e.docs,e.oldDocs,r,e.mutatedKeys,e.fromCache,e.syncStateChanged,!0,e.hasCachedResults)}let t=!1;return this.xa?this.Na(e)&&(this.Ma.next(e),t=!0):this.Ba(e,this.onlineState)&&(this.La(e),t=!0),this.Oa=e,t}onError(e){this.Ma.error(e)}va(e){this.onlineState=e;let t=!1;return this.Oa&&!this.xa&&this.Ba(this.Oa,e)&&(this.La(this.Oa),t=!0),t}Ba(e,t){if(!e.fromCache||!this.ba())return!0;let r=t!=="Offline";return(!this.options.ka||!r)&&(!e.docs.isEmpty()||e.hasCachedResults||t==="Offline")}Na(e){if(e.docChanges.length>0)return!0;let t=this.Oa&&this.Oa.hasPendingWrites!==e.hasPendingWrites;return!(!e.syncStateChanged&&!t)&&this.options.includeMetadataChanges===!0}La(e){e=Zn.fromInitialDocuments(e.query,e.docs,e.mutatedKeys,e.fromCache,e.hasCachedResults),this.xa=!0,this.Ma.next(e)}ba(){return this.options.source!==Ku.Cache}};var vo=class{constructor(e){this.key=e}},Io=class{constructor(e){this.key=e}},Qu=class{constructor(e,t){this.query=e,this.Ha=t,this.Ya=null,this.hasCachedResults=!1,this.current=!1,this.Za=W(),this.mutatedKeys=W(),this.Xa=um(e),this.eu=new _o(this.Xa)}get tu(){return this.Ha}nu(e,t){let r=t?t.ru:new yo,i=t?t.eu:this.eu,s=t?t.mutatedKeys:this.mutatedKeys,a=i,c=!1,l=this.query.limitType==="F"&&i.size===this.query.limit?i.last():null,d=this.query.limitType==="L"&&i.size===this.query.limit?i.first():null;if(e.inorderTraversal((p,m)=>{let v=i.get(p),S=Do(this.query,m)?m:null,P=!!v&&this.mutatedKeys.has(v.key),N=!!S&&(S.hasLocalMutations||this.mutatedKeys.has(S.key)&&S.hasCommittedMutations),C=!1;v&&S?v.data.isEqual(S.data)?P!==N&&(r.track({type:3,doc:S}),C=!0):this.iu(v,S)||(r.track({type:2,doc:S}),C=!0,(l&&this.Xa(S,l)>0||d&&this.Xa(S,d)<0)&&(c=!0)):!v&&S?(r.track({type:0,doc:S}),C=!0):v&&!S&&(r.track({type:1,doc:v}),C=!0,(l||d)&&(c=!0)),C&&(S?(a=a.add(S),s=N?s.add(p):s.delete(p)):(a=a.delete(p),s=s.delete(p)))}),this.query.limit!==null)for(;a.size>this.query.limit;){let p=this.query.limitType==="F"?a.last():a.first();a=a.delete(p.key),s=s.delete(p.key),r.track({type:1,doc:p})}return{eu:a,ru:r,Ds:c,mutatedKeys:s}}iu(e,t){return e.hasLocalMutations&&t.hasCommittedMutations&&!t.hasLocalMutations}applyChanges(e,t,r,i){let s=this.eu;this.eu=e.eu,this.mutatedKeys=e.mutatedKeys;let a=e.ru.pa();a.sort((p,m)=>function(S,P){let N=C=>{switch(C){case 0:return 1;case 2:case 3:return 2;case 1:return 0;default:return B(20277,{At:C})}};return N(S)-N(P)}(p.type,m.type)||this.Xa(p.doc,m.doc)),this.su(r),i=i!=null&&i;let c=t&&!i?this.ou():[],l=this.Za.size===0&&this.current&&!i?1:0,d=l!==this.Ya;return this.Ya=l,a.length!==0||d?{snapshot:new Zn(this.query,e.eu,s,a,e.mutatedKeys,l===0,d,!1,!!r&&r.resumeToken.approximateByteSize()>0),_u:c}:{_u:c}}va(e){return this.current&&e==="Offline"?(this.current=!1,this.applyChanges({eu:this.eu,ru:new yo,mutatedKeys:this.mutatedKeys,Ds:!1},!1)):{_u:[]}}au(e){return!this.Ha.has(e)&&!!this.eu.has(e)&&!this.eu.get(e).hasLocalMutations}su(e){e&&(e.addedDocuments.forEach(t=>this.Ha=this.Ha.add(t)),e.modifiedDocuments.forEach(t=>{}),e.removedDocuments.forEach(t=>this.Ha=this.Ha.delete(t)),this.current=e.current)}ou(){if(!this.current)return[];let e=this.Za;this.Za=W(),this.eu.forEach(r=>{this.au(r.key)&&(this.Za=this.Za.add(r.key))});let t=[];return e.forEach(r=>{this.Za.has(r)||t.push(new Io(r))}),this.Za.forEach(r=>{e.has(r)||t.push(new vo(r))}),t}uu(e){this.Ha=e.qs,this.Za=W();let t=this.nu(e.documents);return this.applyChanges(t,!0)}cu(){return Zn.fromInitialDocuments(this.query,this.eu,this.mutatedKeys,this.Ya===0,this.hasCachedResults)}},kl="SyncEngine",Xu=class{constructor(e,t,r){this.query=e,this.targetId=t,this.view=r}},Yu=class{constructor(e){this.key=e,this.lu=!1}},Ju=class{constructor(e,t,r,i,s,a){this.localStore=e,this.remoteStore=t,this.eventManager=r,this.sharedClientState=i,this.currentUser=s,this.maxConcurrentLimboResolutions=a,this.hu={},this.Pu=new wt(c=>cm(c),No),this.Tu=new Map,this.Iu=new Set,this.du=new oe(F.comparator),this.Eu=new Map,this.Au=new fi,this.Ru={},this.Vu=new Map,this.mu=di.ur(),this.onlineState="Unknown",this.fu=void 0}get isPrimaryClient(){return this.fu===!0}};async function pE(n,e,t=!0){let r=jm(n),i,s=r.Pu.get(e);return s?(r.sharedClientState.addLocalQueryTarget(s.targetId),i=s.view.cu()):i=await Mm(r,e,t,!0),i}async function mE(n,e){let t=jm(n);await Mm(t,e,!0,!1)}async function Mm(n,e,t,r){let i=await Jw(n.localStore,tt(e)),s=i.targetId,a=n.sharedClientState.addLocalQueryTarget(s,t),c;return r&&(c=await gE(n,e,s,a==="current",i.resumeToken)),n.isPrimaryClient&&t&&Nm(n.remoteStore,i),c}async function gE(n,e,t,r,i){n.gu=(m,v,S)=>async function(N,C,U,M){let L=C.view.nu(U);L.Ds&&(L=await fp(N.localStore,C.query,!1).then(({documents:w})=>C.view.nu(w,L)));let q=M&&M.targetChanges.get(C.targetId),ie=M&&M.targetMismatches.get(C.targetId)!=null,H=C.view.applyChanges(L,N.isPrimaryClient,q,ie);return Ip(N,C.targetId,H._u),H.snapshot}(n,m,v,S);let s=await fp(n.localStore,e,!0),a=new Qu(e,s.qs),c=a.nu(s.documents),l=li.createSynthesizedTargetChangeForCurrentChange(t,r&&n.onlineState!=="Offline",i),d=a.applyChanges(c,n.isPrimaryClient,l);Ip(n,t,d._u);let p=new Xu(e,t,a);return n.Pu.set(e,p),n.Tu.has(t)?n.Tu.get(t).push(e):n.Tu.set(t,[e]),d.snapshot}async function _E(n,e,t){let r=j(n),i=r.Pu.get(e),s=r.Tu.get(i.targetId);if(s.length>1)return r.Tu.set(i.targetId,s.filter(a=>!No(a,e))),void r.Pu.delete(e);r.isPrimaryClient?(r.sharedClientState.removeLocalQueryTarget(i.targetId),r.sharedClientState.isActiveQueryTarget(i.targetId)||await Du(r.localStore,i.targetId,!1).then(()=>{r.sharedClientState.clearQueryState(i.targetId),t&&El(r.remoteStore,i.targetId),Zu(r,i.targetId)}).catch(rr)):(Zu(r,i.targetId),await Du(r.localStore,i.targetId,!0))}async function yE(n,e){let t=j(n),r=t.Pu.get(e),i=t.Tu.get(r.targetId);t.isPrimaryClient&&i.length===1&&(t.sharedClientState.removeLocalQueryTarget(r.targetId),El(t.remoteStore,r.targetId))}async function vE(n,e,t){let r=SE(n);try{let i=await function(a,c){let l=j(a),d=he.now(),p=c.reduce((S,P)=>S.add(P.key),W()),m,v;return l.persistence.runTransaction("Locally write mutations","readwrite",S=>{let P=Et(),N=W();return l.Os.getEntries(S,p).next(C=>{P=C,P.forEach((U,M)=>{M.isValidDocument()||(N=N.add(U))})}).next(()=>l.localDocuments.getOverlayedDocuments(S,P)).next(C=>{m=C;let U=[];for(let M of c){let L=bw(M,m.get(M.key).overlayedDocument);L!=null&&U.push(new Tt(M.key,L,tm(L.value.mapValue),_t.exists(!0)))}return l.mutationQueue.addMutationBatch(S,d,U,c)}).next(C=>{v=C;let U=C.applyToLocalDocumentSet(m,N);return l.documentOverlayCache.saveOverlays(S,C.batchId,U)})}).then(()=>({batchId:v.batchId,changes:hm(m)}))}(r.localStore,e);r.sharedClientState.addPendingMutation(i.batchId),function(a,c,l){let d=a.Ru[a.currentUser.toKey()];d||(d=new oe($)),d=d.insert(c,l),a.Ru[a.currentUser.toKey()]=d}(r,i.batchId,t),await bi(r,i.changes),await Vo(r.remoteStore)}catch(i){let s=Sl(i,"Failed to persist write");t.reject(s)}}async function Fm(n,e){let t=j(n);try{let r=await Qw(t.localStore,e);e.targetChanges.forEach((i,s)=>{let a=t.Eu.get(s);a&&(X(i.addedDocuments.size+i.modifiedDocuments.size+i.removedDocuments.size<=1,22616),i.addedDocuments.size>0?a.lu=!0:i.modifiedDocuments.size>0?X(a.lu,14607):i.removedDocuments.size>0&&(X(a.lu,42227),a.lu=!1))}),await bi(t,r,e)}catch(r){await rr(r)}}function vp(n,e,t){let r=j(n);if(r.isPrimaryClient&&t===0||!r.isPrimaryClient&&t===1){let i=[];r.Pu.forEach((s,a)=>{let c=a.view.va(e);c.snapshot&&i.push(c.snapshot)}),function(a,c){let l=j(a);l.onlineState=c;let d=!1;l.queries.forEach((p,m)=>{for(let v of m.wa)v.va(c)&&(d=!0)}),d&&Cl(l)}(r.eventManager,e),i.length&&r.hu.J_(i),r.onlineState=e,r.isPrimaryClient&&r.sharedClientState.setOnlineState(e)}}async function IE(n,e,t){let r=j(n);r.sharedClientState.updateQueryState(e,"rejected",t);let i=r.Eu.get(e),s=i&&i.key;if(s){let a=new oe(F.comparator);a=a.insert(s,$e.newNoDocument(s,z.min()));let c=W().add(s),l=new ro(z.min(),new Map,new oe($),a,c);await Fm(r,l),r.du=r.du.remove(s),r.Eu.delete(e),Nl(r)}else await Du(r.localStore,e,!1).then(()=>Zu(r,e,t)).catch(rr)}async function wE(n,e){let t=j(n),r=e.batch.batchId;try{let i=await Kw(t.localStore,e);Bm(t,r,null),Um(t,r),t.sharedClientState.updateMutationState(r,"acknowledged"),await bi(t,i)}catch(i){await rr(i)}}async function EE(n,e,t){let r=j(n);try{let i=await function(a,c){let l=j(a);return l.persistence.runTransaction("Reject batch","readwrite-primary",d=>{let p;return l.mutationQueue.lookupMutationBatch(d,c).next(m=>(X(m!==null,37113),p=m.keys(),l.mutationQueue.removeMutationBatch(d,m))).next(()=>l.mutationQueue.performConsistencyCheck(d)).next(()=>l.documentOverlayCache.removeOverlaysForBatchId(d,p,c)).next(()=>l.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(d,p)).next(()=>l.localDocuments.getDocuments(d,p))})}(r.localStore,e);Bm(r,e,t),Um(r,e),r.sharedClientState.updateMutationState(e,"rejected",t),await bi(r,i)}catch(i){await rr(i)}}function Um(n,e){(n.Vu.get(e)||[]).forEach(t=>{t.resolve()}),n.Vu.delete(e)}function Bm(n,e,t){let r=j(n),i=r.Ru[r.currentUser.toKey()];if(i){let s=i.get(e);s&&(t?s.reject(t):s.resolve(),i=i.remove(e)),r.Ru[r.currentUser.toKey()]=i}}function Zu(n,e,t=null){n.sharedClientState.removeLocalQueryTarget(e);for(let r of n.Tu.get(e))n.Pu.delete(r),t&&n.hu.pu(r,t);n.Tu.delete(e),n.isPrimaryClient&&n.Au.zr(e).forEach(r=>{n.Au.containsKey(r)||qm(n,r)})}function qm(n,e){n.Iu.delete(e.path.canonicalString());let t=n.du.get(e);t!==null&&(El(n.remoteStore,t),n.du=n.du.remove(e),n.Eu.delete(t),Nl(n))}function Ip(n,e,t){for(let r of t)r instanceof vo?(n.Au.addReference(r.key,e),TE(n,r)):r instanceof Io?(x(kl,"Document no longer in limbo: "+r.key),n.Au.removeReference(r.key,e),n.Au.containsKey(r.key)||qm(n,r.key)):B(19791,{yu:r})}function TE(n,e){let t=e.key,r=t.path.canonicalString();n.du.get(t)||n.Iu.has(r)||(x(kl,"New document in limbo: "+t),n.Iu.add(r),Nl(n))}function Nl(n){for(;n.Iu.size>0&&n.du.size<n.maxConcurrentLimboResolutions;){let e=n.Iu.values().next().value;n.Iu.delete(e);let t=new F(ne.fromString(e)),r=n.mu.next();n.Eu.set(r,new Yu(t)),n.du=n.du.insert(t,r),Nm(n.remoteStore,new hi(tt(ko(t.path)),r,"TargetPurposeLimboResolution",Gn.ue))}}async function bi(n,e,t){let r=j(n),i=[],s=[],a=[];r.Pu.isEmpty()||(r.Pu.forEach((c,l)=>{a.push(r.gu(l,e,t).then(d=>{var p;if((d||t)&&r.isPrimaryClient){let m=d?!d.fromCache:(p=t==null?void 0:t.targetChanges.get(l.targetId))===null||p===void 0?void 0:p.current;r.sharedClientState.updateQueryState(l.targetId,m?"current":"not-current")}if(d){i.push(d);let m=Pu.Es(l.targetId,d);s.push(m)}}))}),await Promise.all(a),r.hu.J_(i),await async function(l,d){let p=j(l);try{await p.persistence.runTransaction("notifyLocalViewChanges","readwrite",m=>k.forEach(d,v=>k.forEach(v.Is,S=>p.persistence.referenceDelegate.addReference(m,v.targetId,S)).next(()=>k.forEach(v.ds,S=>p.persistence.referenceDelegate.removeReference(m,v.targetId,S)))))}catch(m){if(!ir(m))throw m;x(wl,"Failed to update sequence numbers: "+m)}for(let m of d){let v=m.targetId;if(!m.fromCache){let S=p.Fs.get(v),P=S.snapshotVersion,N=S.withLastLimboFreeSnapshotVersion(P);p.Fs=p.Fs.insert(v,N)}}}(r.localStore,s))}async function bE(n,e){let t=j(n);if(!t.currentUser.isEqual(e)){x(kl,"User change. New user:",e.toKey());let r=await Cm(t.localStore,e);t.currentUser=e,function(s,a){s.Vu.forEach(c=>{c.forEach(l=>{l.reject(new O(R.CANCELLED,a))})}),s.Vu.clear()}(t,"'waitForPendingWrites' promise is rejected due to a user change."),t.sharedClientState.handleUserChange(e,r.removedBatchIds,r.addedBatchIds),await bi(t,r.Bs)}}function AE(n,e){let t=j(n),r=t.Eu.get(e);if(r&&r.lu)return W().add(r.key);{let i=W(),s=t.Tu.get(e);if(!s)return i;for(let a of s){let c=t.Pu.get(a);i=i.unionWith(c.view.tu)}return i}}function jm(n){let e=j(n);return e.remoteStore.remoteSyncer.applyRemoteEvent=Fm.bind(null,e),e.remoteStore.remoteSyncer.getRemoteKeysForTarget=AE.bind(null,e),e.remoteStore.remoteSyncer.rejectListen=IE.bind(null,e),e.hu.J_=dE.bind(null,e.eventManager),e.hu.pu=fE.bind(null,e.eventManager),e}function SE(n){let e=j(n);return e.remoteStore.remoteSyncer.applySuccessfulWrite=wE.bind(null,e),e.remoteStore.remoteSyncer.rejectFailedWrite=EE.bind(null,e),e}var er=class{constructor(){this.kind="memory",this.synchronizeTabs=!1}async initialize(e){this.serializer=Oo(e.databaseInfo.databaseId),this.sharedClientState=this.bu(e),this.persistence=this.Du(e),await this.persistence.start(),this.localStore=this.vu(e),this.gcScheduler=this.Cu(e,this.localStore),this.indexBackfillerScheduler=this.Fu(e,this.localStore)}Cu(e,t){return null}Fu(e,t){return null}vu(e){return Ww(this.persistence,new ku,e.initialUser,this.serializer)}Du(e){return new uo(Ru.Vi,this.serializer)}bu(e){return new Ou}async terminate(){var e,t;(e=this.gcScheduler)===null||e===void 0||e.stop(),(t=this.indexBackfillerScheduler)===null||t===void 0||t.stop(),this.sharedClientState.shutdown(),await this.persistence.shutdown()}};er.provider={build:()=>new er};var el=class extends er{constructor(e){super(),this.cacheSizeBytes=e}Cu(e,t){X(this.persistence.referenceDelegate instanceof lo,46915);let r=this.persistence.referenceDelegate.garbageCollector;return new pu(r,e.asyncQueue,t)}Du(e){let t=this.cacheSizeBytes!==void 0?Me.withCacheSize(this.cacheSizeBytes):Me.DEFAULT;return new uo(r=>lo.Vi(r,t),this.serializer)}};var mi=class{async initialize(e,t){this.localStore||(this.localStore=e.localStore,this.sharedClientState=e.sharedClientState,this.datastore=this.createDatastore(t),this.remoteStore=this.createRemoteStore(t),this.eventManager=this.createEventManager(t),this.syncEngine=this.createSyncEngine(t,!e.synchronizeTabs),this.sharedClientState.onlineStateHandler=r=>vp(this.syncEngine,r,1),this.remoteStore.remoteSyncer.handleCredentialChange=bE.bind(null,this.syncEngine),await hE(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(e){return function(){return new Wu}()}createDatastore(e){let t=Oo(e.databaseInfo.databaseId),r=function(s){return new Fu(s)}(e.databaseInfo);return function(s,a,c,l){return new ju(s,a,c,l)}(e.authCredentials,e.appCheckCredentials,r,t)}createRemoteStore(e){return function(r,i,s,a,c){return new $u(r,i,s,a,c)}(this.localStore,this.datastore,e.asyncQueue,t=>vp(this.syncEngine,t,0),function(){return fo.C()?new fo:new xu}())}createSyncEngine(e,t){return function(i,s,a,c,l,d,p){let m=new Ju(i,s,a,c,l,d);return p&&(m.fu=!0),m}(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,e.initialUser,e.maxConcurrentLimboResolutions,t)}async terminate(){var e,t;await async function(i){let s=j(i);x(In,"RemoteStore shutting down."),s.Ia.add(5),await Ti(s),s.Ea.shutdown(),s.Aa.set("Unknown")}(this.remoteStore),(e=this.datastore)===null||e===void 0||e.terminate(),(t=this.eventManager)===null||t===void 0||t.terminate()}};mi.provider={build:()=>new mi};var gi=class{constructor(e){this.observer=e,this.muted=!1}next(e){this.muted||this.observer.next&&this.xu(this.observer.next,e)}error(e){this.muted||(this.observer.error?this.xu(this.observer.error,e):yt("Uncaught Error in snapshot listener:",e.toString()))}Ou(){this.muted=!0}xu(e,t){setTimeout(()=>{this.muted||e(t)},0)}};var $t="FirestoreClient",tl=class{constructor(e,t,r,i,s){this.authCredentials=e,this.appCheckCredentials=t,this.asyncQueue=r,this.databaseInfo=i,this.user=pe.UNAUTHENTICATED,this.clientId=ii.newId(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this._uninitializedComponentsProvider=s,this.authCredentials.start(r,async a=>{x($t,"Received user=",a.uid),await this.authCredentialListener(a),this.user=a}),this.appCheckCredentials.start(r,a=>(x($t,"Received new app check token=",a),this.appCheckCredentialListener(a,this.user)))}get configuration(){return{asyncQueue:this.asyncQueue,databaseInfo:this.databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(e){this.authCredentialListener=e}setAppCheckTokenChangeListener(e){this.appCheckCredentialListener=e}terminate(){this.asyncQueue.enterRestrictedMode();let e=new ze;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted(async()=>{try{this._onlineComponents&&await this._onlineComponents.terminate(),this._offlineComponents&&await this._offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),e.resolve()}catch(t){let r=Sl(t,"Failed to shutdown persistence");e.reject(r)}}),e.promise}};async function Sc(n,e){n.asyncQueue.verifyOperationInProgress(),x($t,"Initializing OfflineComponentProvider");let t=n.configuration;await e.initialize(t);let r=t.initialUser;n.setCredentialChangeListener(async i=>{r.isEqual(i)||(await Cm(e.localStore,i),r=i)}),e.persistence.setDatabaseDeletedListener(()=>{Bt("Terminating Firestore due to IndexedDb database deletion"),n.terminate().then(()=>{x("Terminating Firestore due to IndexedDb database deletion completed successfully")}).catch(i=>{Bt("Terminating Firestore due to IndexedDb database deletion failed",i)})}),n._offlineComponents=e}async function wp(n,e){n.asyncQueue.verifyOperationInProgress();let t=await RE(n);x($t,"Initializing OnlineComponentProvider"),await e.initialize(t,n.configuration),n.setCredentialChangeListener(r=>gp(e.remoteStore,r)),n.setAppCheckTokenChangeListener((r,i)=>gp(e.remoteStore,i)),n._onlineComponents=e}async function RE(n){if(!n._offlineComponents)if(n._uninitializedComponentsProvider){x($t,"Using user provided OfflineComponentProvider");try{await Sc(n,n._uninitializedComponentsProvider._offline)}catch(e){let t=e;if(!function(i){return i.name==="FirebaseError"?i.code===R.FAILED_PRECONDITION||i.code===R.UNIMPLEMENTED:!(typeof DOMException<"u"&&i instanceof DOMException)||i.code===22||i.code===20||i.code===11}(t))throw t;Bt("Error using user provided cache. Falling back to memory cache: "+t),await Sc(n,new er)}}else x($t,"Using default OfflineComponentProvider"),await Sc(n,new el(void 0));return n._offlineComponents}async function zm(n){return n._onlineComponents||(n._uninitializedComponentsProvider?(x($t,"Using user provided OnlineComponentProvider"),await wp(n,n._uninitializedComponentsProvider._online)):(x($t,"Using default OnlineComponentProvider"),await wp(n,new mi))),n._onlineComponents}function PE(n){return zm(n).then(e=>e.syncEngine)}async function wo(n){let e=await zm(n),t=e.eventManager;return t.onListen=pE.bind(null,e.syncEngine),t.onUnlisten=_E.bind(null,e.syncEngine),t.onFirstRemoteStoreListen=mE.bind(null,e.syncEngine),t.onLastRemoteStoreUnlisten=yE.bind(null,e.syncEngine),t}function CE(n,e,t={}){let r=new ze;return n.asyncQueue.enqueueAndForget(async()=>function(s,a,c,l,d){let p=new gi({next:v=>{p.Ou(),a.enqueueAndForget(()=>Pl(s,m));let S=v.docs.has(c);!S&&v.fromCache?d.reject(new O(R.UNAVAILABLE,"Failed to get document because the client is offline.")):S&&v.fromCache&&l&&l.source==="server"?d.reject(new O(R.UNAVAILABLE,'Failed to get document from server. (However, this document does exist in the local cache. Run again without setting source to "server" to retrieve the cached document.)')):d.resolve(v)},error:v=>d.reject(v)}),m=new pi(ko(c.path),p,{includeMetadataChanges:!0,ka:!0});return Rl(s,m)}(await wo(n),n.asyncQueue,e,t,r)),r.promise}function kE(n,e,t={}){let r=new ze;return n.asyncQueue.enqueueAndForget(async()=>function(s,a,c,l,d){let p=new gi({next:v=>{p.Ou(),a.enqueueAndForget(()=>Pl(s,m)),v.fromCache&&l.source==="server"?d.reject(new O(R.UNAVAILABLE,'Failed to get documents from server. (However, these documents may exist in the local cache. Run again without setting source to "server" to retrieve the cached documents.)')):d.resolve(v)},error:v=>d.reject(v)}),m=new pi(c,p,{includeMetadataChanges:!0,ka:!0});return Rl(s,m)}(await wo(n),n.asyncQueue,e,t,r)),r.promise}function $m(n){let e={};return n.timeoutSeconds!==void 0&&(e.timeoutSeconds=n.timeoutSeconds),e}var Ep=new Map;var Gm="firestore.googleapis.com",Tp=!0,Eo=class{constructor(e){var t,r;if(e.host===void 0){if(e.ssl!==void 0)throw new O(R.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host=Gm,this.ssl=Tp}else this.host=e.host,this.ssl=(t=e.ssl)!==null&&t!==void 0?t:Tp;if(this.isUsingEmulator=e.emulatorOptions!==void 0,this.credentials=e.credentials,this.ignoreUndefinedProperties=!!e.ignoreUndefinedProperties,this.localCache=e.localCache,e.cacheSizeBytes===void 0)this.cacheSizeBytes=Pm;else{if(e.cacheSizeBytes!==-1&&e.cacheSizeBytes<$w)throw new O(R.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=e.cacheSizeBytes}qI("experimentalForceLongPolling",e.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",e.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!e.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:e.experimentalAutoDetectLongPolling===void 0?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!e.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=$m((r=e.experimentalLongPollingOptions)!==null&&r!==void 0?r:{}),function(s){if(s.timeoutSeconds!==void 0){if(isNaN(s.timeoutSeconds))throw new O(R.INVALID_ARGUMENT,"invalid long polling timeout: ".concat(s.timeoutSeconds," (must not be NaN)"));if(s.timeoutSeconds<5)throw new O(R.INVALID_ARGUMENT,"invalid long polling timeout: ".concat(s.timeoutSeconds," (minimum allowed value is 5)"));if(s.timeoutSeconds>30)throw new O(R.INVALID_ARGUMENT,"invalid long polling timeout: ".concat(s.timeoutSeconds," (maximum allowed value is 30)"))}}(this.experimentalLongPollingOptions),this.useFetchStreams=!!e.useFetchStreams}isEqual(e){return this.host===e.host&&this.ssl===e.ssl&&this.credentials===e.credentials&&this.cacheSizeBytes===e.cacheSizeBytes&&this.experimentalForceLongPolling===e.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===e.experimentalAutoDetectLongPolling&&function(r,i){return r.timeoutSeconds===i.timeoutSeconds}(this.experimentalLongPollingOptions,e.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===e.ignoreUndefinedProperties&&this.useFetchStreams===e.useFetchStreams}},tr=class{constructor(e,t,r,i){this._authCredentials=e,this._appCheckCredentials=t,this._databaseId=r,this._app=i,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new Eo({}),this._settingsFrozen=!1,this._emulatorOptions={},this._terminateTask="notTerminated"}get app(){if(!this._app)throw new O(R.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!=="notTerminated"}_setSettings(e){if(this._settingsFrozen)throw new O(R.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new Eo(e),this._emulatorOptions=e.emulatorOptions||{},e.credentials!==void 0&&(this._authCredentials=function(r){if(!r)return new Rc;switch(r.type){case"firstParty":return new Nc(r.sessionIndex||"0",r.iamToken||null,r.authTokenFactory||null);case"provider":return r.client;default:throw new O(R.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}}(e.credentials))}_getSettings(){return this._settings}_getEmulatorOptions(){return this._emulatorOptions}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask==="notTerminated"&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){this._terminateTask==="notTerminated"?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return function(t){let r=Ep.get(t);r&&(x("ComponentProvider","Removing Datastore"),Ep.delete(t),r.terminate())}(this),Promise.resolve()}};function NE(n,e,t,r={}){var i;n=Fe(n,tr);let s=Be(e),a=n._getSettings(),c=Object.assign(Object.assign({},a),{emulatorOptions:n._getEmulatorOptions()}),l="".concat(e,":").concat(t);s&&(Cn("https://".concat(l)),kn("Firestore",!0)),a.host!==Gm&&a.host!==l&&Bt("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used.");let d=Object.assign(Object.assign({},a),{host:l,ssl:s,emulatorOptions:r});if(!We(d,c)&&(n._setSettings(d),r.mockUserToken)){let p,m;if(typeof r.mockUserToken=="string")p=r.mockUserToken,m=pe.MOCK_USER;else{p=ts(r.mockUserToken,(i=n._app)===null||i===void 0?void 0:i.options.projectId);let v=r.mockUserToken.sub||r.mockUserToken.user_id;if(!v)throw new O(R.INVALID_ARGUMENT,"mockUserToken must contain 'sub' or 'user_id' field!");m=new pe(v)}n._authCredentials=new Pc(new Ks(p,m))}}var bt=class n{constructor(e,t,r){this.converter=t,this._query=r,this.type="query",this.firestore=e}withConverter(e){return new n(this.firestore,e,this._query)}},ge=class n{constructor(e,t,r){this.converter=t,this._key=r,this.type="document",this.firestore=e}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new Lt(this.firestore,this.converter,this._key.path.popLast())}withConverter(e){return new n(this.firestore,e,this._key)}toJSON(){return{type:n._jsonSchemaVersion,referencePath:this._key.toString()}}static fromJSON(e,t,r){if(Ei(t,n._jsonSchema))return new n(e,r||null,new F(ne.fromString(t.referencePath)))}};ge._jsonSchemaVersion="firestore/documentReference/1.0",ge._jsonSchema={type:le("string",ge._jsonSchemaVersion),referencePath:le("string")};var Lt=class n extends bt{constructor(e,t,r){super(e,t,ko(r)),this._path=r,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){let e=this._path.popLast();return e.isEmpty()?null:new ge(this.firestore,null,new F(e))}withConverter(e){return new n(this.firestore,e,this._path)}};function Tn(n,e,...t){if(n=ee(n),Np("collection","path",e),n instanceof tr){let r=ne.fromString(e,...t);return qf(r),new Lt(n,null,r)}{if(!(n instanceof ge||n instanceof Lt))throw new O(R.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");let r=n._path.child(ne.fromString(e,...t));return qf(r),new Lt(n.firestore,null,r)}}function or(n,e,...t){if(n=ee(n),arguments.length===1&&(e=ii.newId()),Np("doc","path",e),n instanceof tr){let r=ne.fromString(e,...t);return Bf(r),new ge(n,null,new F(r))}{if(!(n instanceof ge||n instanceof Lt))throw new O(R.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");let r=n._path.child(ne.fromString(e,...t));return Bf(r),new ge(n.firestore,n instanceof Lt?n.converter:null,new F(r))}}var bp="AsyncQueue",To=class{constructor(e=Promise.resolve()){this.Zu=[],this.Xu=!1,this.ec=[],this.tc=null,this.nc=!1,this.rc=!1,this.sc=[],this.F_=new po(this,"async_queue_retry"),this.oc=()=>{let r=Ac();r&&x(bp,"Visibility state changed to "+r.visibilityState),this.F_.y_()},this._c=e;let t=Ac();t&&typeof t.addEventListener=="function"&&t.addEventListener("visibilitychange",this.oc)}get isShuttingDown(){return this.Xu}enqueueAndForget(e){this.enqueue(e)}enqueueAndForgetEvenWhileRestricted(e){this.ac(),this.uc(e)}enterRestrictedMode(e){if(!this.Xu){this.Xu=!0,this.rc=e||!1;let t=Ac();t&&typeof t.removeEventListener=="function"&&t.removeEventListener("visibilitychange",this.oc)}}enqueue(e){if(this.ac(),this.Xu)return new Promise(()=>{});let t=new ze;return this.uc(()=>this.Xu&&this.rc?Promise.resolve():(e().then(t.resolve,t.reject),t.promise)).then(()=>t.promise)}enqueueRetryable(e){this.enqueueAndForget(()=>(this.Zu.push(e),this.cc()))}async cc(){if(this.Zu.length!==0){try{await this.Zu[0](),this.Zu.shift(),this.F_.reset()}catch(e){if(!ir(e))throw e;x(bp,"Operation failed with retryable error: "+e)}this.Zu.length>0&&this.F_.g_(()=>this.cc())}}uc(e){let t=this._c.then(()=>(this.nc=!0,e().catch(r=>{throw this.tc=r,this.nc=!1,yt("INTERNAL UNHANDLED ERROR: ",Ap(r)),r}).then(r=>(this.nc=!1,r))));return this._c=t,t}enqueueAfterDelay(e,t,r){this.ac(),this.sc.indexOf(e)>-1&&(t=0);let i=Gu.createAndSchedule(this,e,t,r,s=>this.lc(s));return this.ec.push(i),i}ac(){this.tc&&B(47125,{hc:Ap(this.tc)})}verifyOperationInProgress(){}async Pc(){let e;do e=this._c,await e;while(e!==this._c)}Tc(e){for(let t of this.ec)if(t.timerId===e)return!0;return!1}Ic(e){return this.Pc().then(()=>{this.ec.sort((t,r)=>t.targetTimeMs-r.targetTimeMs);for(let t of this.ec)if(t.skipDelay(),e!=="all"&&t.timerId===e)break;return this.Pc()})}dc(e){this.sc.push(e)}lc(e){let t=this.ec.indexOf(e);this.ec.splice(t,1)}};function Ap(n){let e=n.message||"";return n.stack&&(e=n.stack.includes(n.message)?n.stack:n.message+"\n"+n.stack),e}function Sp(n){return function(t,r){if(typeof t!="object"||t===null)return!1;let i=t;for(let s of r)if(s in i&&typeof i[s]=="function")return!0;return!1}(n,["next","error","complete"])}var it=class extends tr{constructor(e,t,r,i){super(e,t,r,i),this.type="firestore",this._queue=new To,this._persistenceKey=(i==null?void 0:i.name)||"[DEFAULT]"}async _terminate(){if(this._firestoreClient){let e=this._firestoreClient.terminate();this._queue=new To(e),this._firestoreClient=void 0,await e}}};function Hm(n,e){let t=typeof n=="object"?n:xn(),r=typeof n=="string"?n:e||Zs,i=Jt(t,"firestore").getImmediate({identifier:r});if(!i._initialized){let s=es("firestore");s&&NE(i,...s)}return i}function Lo(n){if(n._terminated)throw new O(R.FAILED_PRECONDITION,"The client has already been terminated.");return n._firestoreClient||DE(n),n._firestoreClient}function DE(n){var e,t,r;let i=n._freezeSettings(),s=function(c,l,d,p){return new Lc(c,l,d,p.host,p.ssl,p.experimentalForceLongPolling,p.experimentalAutoDetectLongPolling,$m(p.experimentalLongPollingOptions),p.useFetchStreams,p.isUsingEmulator)}(n._databaseId,((e=n._app)===null||e===void 0?void 0:e.options.appId)||"",n._persistenceKey,i);n._componentsProvider||!((t=i.localCache)===null||t===void 0)&&t._offlineComponentProvider&&(!((r=i.localCache)===null||r===void 0)&&r._onlineComponentProvider)&&(n._componentsProvider={_offline:i.localCache._offlineComponentProvider,_online:i.localCache._onlineComponentProvider}),n._firestoreClient=new tl(n._authCredentials,n._appCheckCredentials,n._queue,s,n._componentsProvider&&function(c){let l=c==null?void 0:c._online.build();return{_offline:c==null?void 0:c._offline.build(l),_online:l}}(n._componentsProvider))}var Mt=class n{constructor(e){this._byteString=e}static fromBase64String(e){try{return new n(Se.fromBase64String(e))}catch(t){throw new O(R.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+t)}}static fromUint8Array(e){return new n(Se.fromUint8Array(e))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(e){return this._byteString.isEqual(e._byteString)}toJSON(){return{type:n._jsonSchemaVersion,bytes:this.toBase64()}}static fromJSON(e){if(Ei(e,n._jsonSchema))return n.fromBase64String(e.bytes)}};Mt._jsonSchemaVersion="firestore/bytes/1.0",Mt._jsonSchema={type:le("string",Mt._jsonSchemaVersion),bytes:le("string")};var _i=class{constructor(...e){for(let t=0;t<e.length;++t)if(e[t].length===0)throw new O(R.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new Ve(e)}isEqual(e){return this._internalPath.isEqual(e._internalPath)}};var yi=class{constructor(e){this._methodName=e}};var Ft=class n{constructor(e,t){if(!isFinite(e)||e<-90||e>90)throw new O(R.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+e);if(!isFinite(t)||t<-180||t>180)throw new O(R.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+t);this._lat=e,this._long=t}get latitude(){return this._lat}get longitude(){return this._long}isEqual(e){return this._lat===e._lat&&this._long===e._long}_compareTo(e){return $(this._lat,e._lat)||$(this._long,e._long)}toJSON(){return{latitude:this._lat,longitude:this._long,type:n._jsonSchemaVersion}}static fromJSON(e){if(Ei(e,n._jsonSchema))return new n(e.latitude,e.longitude)}};Ft._jsonSchemaVersion="firestore/geoPoint/1.0",Ft._jsonSchema={type:le("string",Ft._jsonSchemaVersion),latitude:le("number"),longitude:le("number")};var Ut=class n{constructor(e){this._values=(e||[]).map(t=>t)}toArray(){return this._values.map(e=>e)}isEqual(e){return function(r,i){if(r.length!==i.length)return!1;for(let s=0;s<r.length;++s)if(r[s]!==i[s])return!1;return!0}(this._values,e._values)}toJSON(){return{type:n._jsonSchemaVersion,vectorValues:this._values}}static fromJSON(e){if(Ei(e,n._jsonSchema)){if(Array.isArray(e.vectorValues)&&e.vectorValues.every(t=>typeof t=="number"))return new n(e.vectorValues);throw new O(R.INVALID_ARGUMENT,"Expected 'vectorValues' field to be a number array")}}};Ut._jsonSchemaVersion="firestore/vectorValue/1.0",Ut._jsonSchema={type:le("string",Ut._jsonSchemaVersion),vectorValues:le("object")};var OE=/^__.*__$/,nl=class{constructor(e,t,r){this.data=e,this.fieldMask=t,this.fieldTransforms=r}toMutation(e,t){return this.fieldMask!==null?new Tt(e,this.data,this.fieldMask,t,this.fieldTransforms):new vn(e,this.data,t,this.fieldTransforms)}};function Wm(n){switch(n){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw B(40011,{Ec:n})}}var rl=class n{constructor(e,t,r,i,s,a){this.settings=e,this.databaseId=t,this.serializer=r,this.ignoreUndefinedProperties=i,s===void 0&&this.Ac(),this.fieldTransforms=s||[],this.fieldMask=a||[]}get path(){return this.settings.path}get Ec(){return this.settings.Ec}Rc(e){return new n(Object.assign(Object.assign({},this.settings),e),this.databaseId,this.serializer,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}Vc(e){var t;let r=(t=this.path)===null||t===void 0?void 0:t.child(e),i=this.Rc({path:r,mc:!1});return i.fc(e),i}gc(e){var t;let r=(t=this.path)===null||t===void 0?void 0:t.child(e),i=this.Rc({path:r,mc:!1});return i.Ac(),i}yc(e){return this.Rc({path:void 0,mc:!0})}wc(e){return bo(e,this.settings.methodName,this.settings.Sc||!1,this.path,this.settings.bc)}contains(e){return this.fieldMask.find(t=>e.isPrefixOf(t))!==void 0||this.fieldTransforms.find(t=>e.isPrefixOf(t.field))!==void 0}Ac(){if(this.path)for(let e=0;e<this.path.length;e++)this.fc(this.path.get(e))}fc(e){if(e.length===0)throw this.wc("Document fields must not be empty");if(Wm(this.Ec)&&OE.test(e))throw this.wc('Document fields cannot begin and end with "__"')}},il=class{constructor(e,t,r){this.databaseId=e,this.ignoreUndefinedProperties=t,this.serializer=r||Oo(e)}Dc(e,t,r,i=!1){return new rl({Ec:e,methodName:t,bc:r,path:Ve.emptyPath(),mc:!1,Sc:i},this.databaseId,this.serializer,this.ignoreUndefinedProperties)}};function Dl(n){let e=n._freezeSettings(),t=Oo(n._databaseId);return new il(n._databaseId,!!e.ignoreUndefinedProperties,t)}function Km(n,e,t,r,i,s={}){let a=n.Dc(s.merge||s.mergeFields?2:0,e,t,i);Ym("Data must be an object, but it was:",a,r);let c=Qm(r,a),l,d;if(s.merge)l=new Ze(a.fieldMask),d=a.fieldTransforms;else if(s.mergeFields){let p=[];for(let m of s.mergeFields){let v=VE(e,m,t);if(!a.contains(v))throw new O(R.INVALID_ARGUMENT,"Field '".concat(v,"' is specified in your field mask but missing from your input data."));ME(p,v)||p.push(v)}l=new Ze(p),d=a.fieldTransforms.filter(m=>l.covers(m.field))}else l=null,d=a.fieldTransforms;return new nl(new je(c),l,d)}var sl=class n extends yi{_toFieldTransform(e){return new Xc(e.path,new gn)}isEqual(e){return e instanceof n}};function xE(n,e,t,r=!1){return Ol(t,n.Dc(r?4:3,e))}function Ol(n,e){if(Xm(n=ee(n)))return Ym("Unsupported field value:",e,n),Qm(n,e);if(n instanceof yi)return function(r,i){if(!Wm(i.Ec))throw i.wc("".concat(r._methodName,"() can only be used with update() and set()"));if(!i.path)throw i.wc("".concat(r._methodName,"() is not currently supported inside arrays"));let s=r._toFieldTransform(i);s&&i.fieldTransforms.push(s)}(n,e),null;if(n===void 0&&e.ignoreUndefinedProperties)return null;if(e.path&&e.fieldMask.push(e.path),n instanceof Array){if(e.settings.mc&&e.Ec!==4)throw e.wc("Nested arrays are not supported");return function(r,i){let s=[],a=0;for(let c of r){let l=Ol(c,i.yc(a));l==null&&(l={nullValue:"NULL_VALUE"}),s.push(l),a++}return{arrayValue:{values:s}}}(n,e)}return function(r,i){if((r=ee(r))===null)return{nullValue:"NULL_VALUE"};if(typeof r=="number")return vw(i.serializer,r);if(typeof r=="boolean")return{booleanValue:r};if(typeof r=="string")return{stringValue:r};if(r instanceof Date){let s=he.fromDate(r);return{timestampValue:ao(i.serializer,s)}}if(r instanceof he){let s=new he(r.seconds,1e3*Math.floor(r.nanoseconds/1e3));return{timestampValue:ao(i.serializer,s)}}if(r instanceof Ft)return{geoPointValue:{latitude:r.latitude,longitude:r.longitude}};if(r instanceof Mt)return{bytesValue:wm(i.serializer,r._byteString)};if(r instanceof ge){let s=i.databaseId,a=r.firestore._databaseId;if(!a.isEqual(s))throw i.wc("Document reference is for database ".concat(a.projectId,"/").concat(a.database," but should be for database ").concat(s.projectId,"/").concat(s.database));return{referenceValue:Il(r.firestore._databaseId||i.databaseId,r._key.path)}}if(r instanceof Ut)return function(a,c){return{mapValue:{fields:{[pl]:{stringValue:ml},[Hn]:{arrayValue:{values:a.toArray().map(d=>{if(typeof d!="number")throw c.wc("VectorValues must only contain numeric values.");return vl(c.serializer,d)})}}}}}}(r,i);throw i.wc("Unsupported field value: ".concat(Ro(r)))}(n,e)}function Qm(n,e){let t={};return Wp(n)?e.path&&e.path.length>0&&e.fieldMask.push(e.path):wn(n,(r,i)=>{let s=Ol(i,e.Vc(r));s!=null&&(t[r]=s)}),{mapValue:{fields:t}}}function Xm(n){return!(typeof n!="object"||n===null||n instanceof Array||n instanceof Date||n instanceof he||n instanceof Ft||n instanceof Mt||n instanceof ge||n instanceof yi||n instanceof Ut)}function Ym(n,e,t){if(!Xm(t)||!Dp(t)){let r=Ro(t);throw r==="an object"?e.wc(n+" a custom object"):e.wc(n+" "+r)}}function VE(n,e,t){if((e=ee(e))instanceof _i)return e._internalPath;if(typeof e=="string")return Jm(n,e);throw bo("Field path arguments must be of type string or ",n,!1,void 0,t)}var LE=new RegExp("[~\\*/\\[\\]]");function Jm(n,e,t){if(e.search(LE)>=0)throw bo("Invalid field path (".concat(e,"). Paths must not contain '~', '*', '/', '[', or ']'"),n,!1,void 0,t);try{return new _i(...e.split("."))._internalPath}catch(r){throw bo("Invalid field path (".concat(e,"). Paths must not be empty, begin with '.', end with '.', or contain '..'"),n,!1,void 0,t)}}function bo(n,e,t,r,i){let s=r&&!r.isEmpty(),a=i!==void 0,c="Function ".concat(e,"() called with invalid data");t&&(c+=" (via `toFirestore()`)"),c+=". ";let l="";return(s||a)&&(l+=" (found",s&&(l+=" in field ".concat(r)),a&&(l+=" in document ".concat(i)),l+=")"),new O(R.INVALID_ARGUMENT,c+n+l)}function ME(n,e){return n.some(t=>t.isEqual(e))}var Ao=class{constructor(e,t,r,i,s){this._firestore=e,this._userDataWriter=t,this._key=r,this._document=i,this._converter=s}get id(){return this._key.path.lastSegment()}get ref(){return new ge(this._firestore,this._converter,this._key)}exists(){return this._document!==null}data(){if(this._document){if(this._converter){let e=new ol(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(e)}return this._userDataWriter.convertValue(this._document.data.value)}}get(e){if(this._document){let t=this._document.data.field(Mo("DocumentSnapshot.get",e));if(t!==null)return this._userDataWriter.convertValue(t)}}},ol=class extends Ao{data(){return super.data()}};function Mo(n,e){return typeof e=="string"?Jm(n,e):e instanceof _i?e._internalPath:e._delegate._internalPath}function Zm(n){if(n.limitType==="L"&&n.explicitOrderBy.length===0)throw new O(R.UNIMPLEMENTED,"limitToLast() queries require specifying at least one orderBy() clause")}var vi=class{},Ii=class extends vi{};function xl(n,e,...t){let r=[];e instanceof vi&&r.push(e),r=r.concat(t),function(s){let a=s.filter(l=>l instanceof al).length,c=s.filter(l=>l instanceof So).length;if(a>1||a>0&&c>0)throw new O(R.INVALID_ARGUMENT,"InvalidQuery. When using composite filters, you cannot use more than one filter at the top level. Consider nesting the multiple filters within an `and(...)` statement. For example: change `query(query, where(...), or(...))` to `query(query, and(where(...), or(...)))`.")}(r);for(let i of r)n=i._apply(n);return n}var So=class n extends Ii{constructor(e,t,r){super(),this._field=e,this._op=t,this._value=r,this.type="where"}static _create(e,t,r){return new n(e,t,r)}_apply(e){let t=this._parse(e);return rg(e._query,t),new bt(e.firestore,e.converter,Qc(e._query,t))}_parse(e){let t=Dl(e.firestore);return function(s,a,c,l,d,p,m){let v;if(d.isKeyField()){if(p==="array-contains"||p==="array-contains-any")throw new O(R.INVALID_ARGUMENT,"Invalid Query. You can't perform '".concat(p,"' queries on documentId()."));if(p==="in"||p==="not-in"){Pp(m,p);let P=[];for(let N of m)P.push(Rp(l,s,N));v={arrayValue:{values:P}}}else v=Rp(l,s,m)}else p!=="in"&&p!=="not-in"&&p!=="array-contains-any"||Pp(m,p),v=xE(c,a,m,p==="in"||p==="not-in");return ue.create(d,p,v)}(e._query,"where",t,e.firestore._databaseId,this._field,this._op,this._value)}};function eg(n,e,t){let r=e,i=Mo("where",n);return So._create(i,r,t)}var al=class n extends vi{constructor(e,t){super(),this.type=e,this._queryConstraints=t}static _create(e,t){return new n(e,t)}_parse(e){let t=this._queryConstraints.map(r=>r._parse(e)).filter(r=>r.getFilters().length>0);return t.length===1?t[0]:Ge.create(t,this._getOperator())}_apply(e){let t=this._parse(e);return t.getFilters().length===0?e:(function(i,s){let a=i,c=s.getFlattenedFilters();for(let l of c)rg(a,l),a=Qc(a,l)}(e._query,t),new bt(e.firestore,e.converter,Qc(e._query,t)))}_getQueryConstraints(){return this._queryConstraints}_getOperator(){return this.type==="and"?"and":"or"}};var cl=class n extends Ii{constructor(e,t){super(),this._field=e,this._direction=t,this.type="orderBy"}static _create(e,t){return new n(e,t)}_apply(e){let t=function(i,s,a){if(i.startAt!==null)throw new O(R.INVALID_ARGUMENT,"Invalid query. You must not call startAt() or startAfter() before calling orderBy().");if(i.endAt!==null)throw new O(R.INVALID_ARGUMENT,"Invalid query. You must not call endAt() or endBefore() before calling orderBy().");return new mn(s,a)}(e._query,this._field,this._direction);return new bt(e.firestore,e.converter,function(i,s){let a=i.explicitOrderBy.concat([s]);return new jt(i.path,i.collectionGroup,a,i.filters.slice(),i.limit,i.limitType,i.startAt,i.endAt)}(e._query,t))}};function tg(n,e="asc"){let t=e,r=Mo("orderBy",n);return cl._create(r,t)}var ul=class n extends Ii{constructor(e,t,r){super(),this.type=e,this._limit=t,this._limitType=r}static _create(e,t,r){return new n(e,t,r)}_apply(e){return new bt(e.firestore,e.converter,no(e._query,this._limit,this._limitType))}};function ng(n){return jI("limit",n),ul._create("limit",n,"F")}function Rp(n,e,t){if(typeof(t=ee(t))=="string"){if(t==="")throw new O(R.INVALID_ARGUMENT,"Invalid query. When querying with documentId(), you must provide a valid document ID, but it was an empty string.");if(!am(e)&&t.indexOf("/")!==-1)throw new O(R.INVALID_ARGUMENT,"Invalid query. When querying a collection by documentId(), you must provide a plain document ID, but '".concat(t,"' contains a '/' character."));let r=e.path.child(ne.fromString(t));if(!F.isDocumentKey(r))throw new O(R.INVALID_ARGUMENT,"Invalid query. When querying a collection group by documentId(), the value provided must result in a valid document path, but '".concat(r,"' is not because it has an odd number of segments (").concat(r.length,")."));return Kf(n,new F(r))}if(t instanceof ge)return Kf(n,t._key);throw new O(R.INVALID_ARGUMENT,"Invalid query. When querying with documentId(), you must provide a valid string or a DocumentReference, but it was: ".concat(Ro(t),"."))}function Pp(n,e){if(!Array.isArray(n)||n.length===0)throw new O(R.INVALID_ARGUMENT,"Invalid Query. A non-empty array is required for '".concat(e.toString(),"' filters."))}function rg(n,e){let t=function(i,s){for(let a of i)for(let c of a.getFlattenedFilters())if(s.indexOf(c.op)>=0)return c.op;return null}(n.filters,function(i){switch(i){case"!=":return["!=","not-in"];case"array-contains-any":case"in":return["not-in"];case"not-in":return["array-contains-any","in","not-in","!="];default:return[]}}(e.op));if(t!==null)throw t===e.op?new O(R.INVALID_ARGUMENT,"Invalid query. You cannot use more than one '".concat(e.op.toString(),"' filter.")):new O(R.INVALID_ARGUMENT,"Invalid query. You cannot use '".concat(e.op.toString(),"' filters with '").concat(t.toString(),"' filters."))}var ll=class{convertValue(e,t="none"){switch(qt(e)){case 0:return null;case 1:return e.booleanValue;case 2:return te(e.integerValue||e.doubleValue);case 3:return this.convertTimestamp(e.timestampValue);case 4:return this.convertServerTimestamp(e,t);case 5:return e.stringValue;case 6:return this.convertBytes(It(e.bytesValue));case 7:return this.convertReference(e.referenceValue);case 8:return this.convertGeoPoint(e.geoPointValue);case 9:return this.convertArray(e.arrayValue,t);case 11:return this.convertObject(e.mapValue,t);case 10:return this.convertVectorValue(e.mapValue);default:throw B(62114,{value:e})}}convertObject(e,t){return this.convertObjectMap(e.fields,t)}convertObjectMap(e,t="none"){let r={};return wn(e,(i,s)=>{r[i]=this.convertValue(s,t)}),r}convertVectorValue(e){var t,r,i;let s=(i=(r=(t=e.fields)===null||t===void 0?void 0:t[Hn].arrayValue)===null||r===void 0?void 0:r.values)===null||i===void 0?void 0:i.map(a=>te(a.doubleValue));return new Ut(s)}convertGeoPoint(e){return new Ft(te(e.latitude),te(e.longitude))}convertArray(e,t){return(e.values||[]).map(r=>this.convertValue(r,t))}convertServerTimestamp(e,t){switch(t){case"previous":let r=Co(e);return r==null?null:this.convertValue(r,t);case"estimate":return this.convertTimestamp(ai(e));default:return null}}convertTimestamp(e){let t=vt(e);return new he(t.seconds,t.nanos)}convertDocumentKey(e,t){let r=ne.fromString(e);X(Rm(r),9688,{name:e});let i=new eo(r.get(1),r.get(3)),s=new F(r.popFirst(5));return i.isEqual(t)||yt("Document ".concat(s," contains a document reference within a different database (").concat(i.projectId,"/").concat(i.database,") which is not supported. It will be treated as a reference in the current database (").concat(t.projectId,"/").concat(t.database,") instead.")),s}};function ig(n,e,t){let r;return r=n?t&&(t.merge||t.mergeFields)?n.toFirestore(e,t):n.toFirestore(e):e,r}var ln=class{constructor(e,t){this.hasPendingWrites=e,this.fromCache=t}isEqual(e){return this.hasPendingWrites===e.hasPendingWrites&&this.fromCache===e.fromCache}},hn=class n extends Ao{constructor(e,t,r,i,s,a){super(e,t,r,i,a),this._firestore=e,this._firestoreImpl=e,this.metadata=s}exists(){return super.exists()}data(e={}){if(this._document){if(this._converter){let t=new zn(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(t,e)}return this._userDataWriter.convertValue(this._document.data.value,e.serverTimestamps)}}get(e,t={}){if(this._document){let r=this._document.data.field(Mo("DocumentSnapshot.get",e));if(r!==null)return this._userDataWriter.convertValue(r,t.serverTimestamps)}}toJSON(){if(this.metadata.hasPendingWrites)throw new O(R.FAILED_PRECONDITION,"DocumentSnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");let e=this._document,t={};return t.type=n._jsonSchemaVersion,t.bundle="",t.bundleSource="DocumentSnapshot",t.bundleName=this._key.toString(),!e||!e.isValidDocument()||!e.isFoundDocument()?t:(this._userDataWriter.convertObjectMap(e.data.value.mapValue.fields,"previous"),t.bundle=(this._firestore,this.ref.path,"NOT SUPPORTED"),t)}};hn._jsonSchemaVersion="firestore/documentSnapshot/1.0",hn._jsonSchema={type:le("string",hn._jsonSchemaVersion),bundleSource:le("string","DocumentSnapshot"),bundleName:le("string"),bundle:le("string")};var zn=class extends hn{data(e={}){return super.data(e)}},dn=class n{constructor(e,t,r,i){this._firestore=e,this._userDataWriter=t,this._snapshot=i,this.metadata=new ln(i.hasPendingWrites,i.fromCache),this.query=r}get docs(){let e=[];return this.forEach(t=>e.push(t)),e}get size(){return this._snapshot.docs.size}get empty(){return this.size===0}forEach(e,t){this._snapshot.docs.forEach(r=>{e.call(t,new zn(this._firestore,this._userDataWriter,r.key,r,new ln(this._snapshot.mutatedKeys.has(r.key),this._snapshot.fromCache),this.query.converter))})}docChanges(e={}){let t=!!e.includeMetadataChanges;if(t&&this._snapshot.excludesMetadataChanges)throw new O(R.INVALID_ARGUMENT,"To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");return this._cachedChanges&&this._cachedChangesIncludeMetadataChanges===t||(this._cachedChanges=function(i,s){if(i._snapshot.oldDocs.isEmpty()){let a=0;return i._snapshot.docChanges.map(c=>{let l=new zn(i._firestore,i._userDataWriter,c.doc.key,c.doc,new ln(i._snapshot.mutatedKeys.has(c.doc.key),i._snapshot.fromCache),i.query.converter);return c.doc,{type:"added",doc:l,oldIndex:-1,newIndex:a++}})}{let a=i._snapshot.oldDocs;return i._snapshot.docChanges.filter(c=>s||c.type!==3).map(c=>{let l=new zn(i._firestore,i._userDataWriter,c.doc.key,c.doc,new ln(i._snapshot.mutatedKeys.has(c.doc.key),i._snapshot.fromCache),i.query.converter),d=-1,p=-1;return c.type!==0&&(d=a.indexOf(c.doc.key),a=a.delete(c.doc.key)),c.type!==1&&(a=a.add(c.doc),p=a.indexOf(c.doc.key)),{type:FE(c.type),doc:l,oldIndex:d,newIndex:p}})}}(this,t),this._cachedChangesIncludeMetadataChanges=t),this._cachedChanges}toJSON(){if(this.metadata.hasPendingWrites)throw new O(R.FAILED_PRECONDITION,"QuerySnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");let e={};e.type=n._jsonSchemaVersion,e.bundleSource="QuerySnapshot",e.bundleName=ii.newId(),this._firestore._databaseId.database,this._firestore._databaseId.projectId;let t=[],r=[],i=[];return this.docs.forEach(s=>{s._document!==null&&(t.push(s._document),r.push(this._userDataWriter.convertObjectMap(s._document.data.value.mapValue.fields,"previous")),i.push(s.ref.path))}),e.bundle=(this._firestore,this.query._query,e.bundleName,"NOT SUPPORTED"),e}};function FE(n){switch(n){case 0:return"added";case 2:case 3:return"modified";case 1:return"removed";default:return B(61501,{type:n})}}function sg(n){n=Fe(n,ge);let e=Fe(n.firestore,it);return CE(Lo(e),n._key).then(t=>cg(e,n,t))}dn._jsonSchemaVersion="firestore/querySnapshot/1.0",dn._jsonSchema={type:le("string",dn._jsonSchemaVersion),bundleSource:le("string","QuerySnapshot"),bundleName:le("string"),bundle:le("string")};var wi=class extends ll{constructor(e){super(),this.firestore=e}convertBytes(e){return new Mt(e)}convertReference(e){let t=this.convertDocumentKey(e,this.firestore._databaseId);return new ge(this.firestore,null,t)}};function og(n){n=Fe(n,bt);let e=Fe(n.firestore,it),t=Lo(e),r=new wi(e);return Zm(n._query),kE(t,n._query).then(i=>new dn(e,r,n,i))}function ag(n,e,t){n=Fe(n,ge);let r=Fe(n.firestore,it),i=ig(n.converter,e,t);return Ml(r,[Km(Dl(r),"setDoc",n._key,i,n.converter!==null,t).toMutation(n._key,_t.none())])}function Vl(n){return Ml(Fe(n.firestore,it),[new ui(n._key,_t.none())])}function Fo(n,e){let t=Fe(n.firestore,it),r=or(n),i=ig(n.converter,e);return Ml(t,[Km(Dl(n.firestore),"addDoc",r._key,i,n.converter!==null,{}).toMutation(r._key,_t.exists(!1))]).then(()=>r)}function Ll(n,...e){var t,r,i;n=ee(n);let s={includeMetadataChanges:!1,source:"default"},a=0;typeof e[a]!="object"||Sp(e[a])||(s=e[a++]);let c={includeMetadataChanges:s.includeMetadataChanges,source:s.source};if(Sp(e[a])){let m=e[a];e[a]=(t=m.next)===null||t===void 0?void 0:t.bind(m),e[a+1]=(r=m.error)===null||r===void 0?void 0:r.bind(m),e[a+2]=(i=m.complete)===null||i===void 0?void 0:i.bind(m)}let l,d,p;if(n instanceof ge)d=Fe(n.firestore,it),p=ko(n._key.path),l={next:m=>{e[a]&&e[a](cg(d,n,m))},error:e[a+1],complete:e[a+2]};else{let m=Fe(n,bt);d=Fe(m.firestore,it),p=m._query;let v=new wi(d);l={next:S=>{e[a]&&e[a](new dn(d,v,m,S))},error:e[a+1],complete:e[a+2]},Zm(n._query)}return function(v,S,P,N){let C=new gi(N),U=new pi(S,C,P);return v.asyncQueue.enqueueAndForget(async()=>Rl(await wo(v),U)),()=>{C.Ou(),v.asyncQueue.enqueueAndForget(async()=>Pl(await wo(v),U))}}(Lo(d),p,c,l)}function Ml(n,e){return function(r,i){let s=new ze;return r.asyncQueue.enqueueAndForget(async()=>vE(await PE(r),i,s)),s.promise}(Lo(n),e)}function cg(n,e,t){let r=t.docs.get(e._key),i=new wi(n);return new hn(n,i,e._key,r,new ln(t.hasPendingWrites,t.fromCache),e.converter)}function ar(){return new sl("serverTimestamp")}(function(e,t=!0){(function(i){nr=i})(Xe),Qe(new ke("firestore",(r,{instanceIdentifier:i,options:s})=>{let a=r.getProvider("app").getImmediate(),c=new it(new Cc(r.getProvider("auth-internal")),new Dc(a,r.getProvider("app-check-internal")),function(d,p){if(!Object.prototype.hasOwnProperty.apply(d.options,["projectId"]))throw new O(R.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new eo(d.options.projectId,p)}(a,i),a);return s=Object.assign({useFetchStreams:t},s),c._setSettings(s),c},"PUBLIC").setMultipleInstances(!0)),Ne(Lf,Mf,e),Ne(Lf,Mf,"esm2017")})();var gg="firebasestorage.googleapis.com",_g="storageBucket",UE=2*60*1e3,BE=10*60*1e3,qE=1e3;var re=class n extends Ce{constructor(e,t,r=0){super(Fl(e),"Firebase Storage: ".concat(t," (").concat(Fl(e),")")),this.status_=r,this.customData={serverResponse:null},this._baseMessage=this.message,Object.setPrototypeOf(this,n.prototype)}get status(){return this.status_}set status(e){this.status_=e}_codeEquals(e){return Fl(e)===this.code}get serverResponse(){return this.customData.serverResponse}set serverResponse(e){this.customData.serverResponse=e,this.customData.serverResponse?this.message="".concat(this._baseMessage,"\n").concat(this.customData.serverResponse):this.message=this._baseMessage}},Z;(function(n){n.UNKNOWN="unknown",n.OBJECT_NOT_FOUND="object-not-found",n.BUCKET_NOT_FOUND="bucket-not-found",n.PROJECT_NOT_FOUND="project-not-found",n.QUOTA_EXCEEDED="quota-exceeded",n.UNAUTHENTICATED="unauthenticated",n.UNAUTHORIZED="unauthorized",n.UNAUTHORIZED_APP="unauthorized-app",n.RETRY_LIMIT_EXCEEDED="retry-limit-exceeded",n.INVALID_CHECKSUM="invalid-checksum",n.CANCELED="canceled",n.INVALID_EVENT_NAME="invalid-event-name",n.INVALID_URL="invalid-url",n.INVALID_DEFAULT_BUCKET="invalid-default-bucket",n.NO_DEFAULT_BUCKET="no-default-bucket",n.CANNOT_SLICE_BLOB="cannot-slice-blob",n.SERVER_FILE_WRONG_SIZE="server-file-wrong-size",n.NO_DOWNLOAD_URL="no-download-url",n.INVALID_ARGUMENT="invalid-argument",n.INVALID_ARGUMENT_COUNT="invalid-argument-count",n.APP_DELETED="app-deleted",n.INVALID_ROOT_OPERATION="invalid-root-operation",n.INVALID_FORMAT="invalid-format",n.INTERNAL_ERROR="internal-error",n.UNSUPPORTED_ENVIRONMENT="unsupported-environment"})(Z||(Z={}));function Fl(n){return"storage/"+n}function Wl(){let n="An unknown error occurred, please check the error payload for server response.";return new re(Z.UNKNOWN,n)}function jE(n){return new re(Z.OBJECT_NOT_FOUND,"Object '"+n+"' does not exist.")}function zE(n){return new re(Z.QUOTA_EXCEEDED,"Quota for bucket '"+n+"' exceeded, please view quota on https://firebase.google.com/pricing/.")}function $E(){let n="User is not authenticated, please authenticate using Firebase Authentication and try again.";return new re(Z.UNAUTHENTICATED,n)}function GE(){return new re(Z.UNAUTHORIZED_APP,"This app does not have permission to access Firebase Storage on this project.")}function HE(n){return new re(Z.UNAUTHORIZED,"User does not have permission to access '"+n+"'.")}function yg(){return new re(Z.RETRY_LIMIT_EXCEEDED,"Max retry time for operation exceeded, please try again.")}function vg(){return new re(Z.CANCELED,"User canceled the upload/download.")}function WE(n){return new re(Z.INVALID_URL,"Invalid URL '"+n+"'.")}function KE(n){return new re(Z.INVALID_DEFAULT_BUCKET,"Invalid default bucket '"+n+"'.")}function QE(){return new re(Z.NO_DEFAULT_BUCKET,"No default bucket found. Did you set the '"+_g+"' property when initializing the app?")}function Ig(){return new re(Z.CANNOT_SLICE_BLOB,"Cannot slice blob for upload. Please retry the upload.")}function XE(){return new re(Z.SERVER_FILE_WRONG_SIZE,"Server recorded incorrect upload file size, please retry the upload.")}function YE(){return new re(Z.NO_DOWNLOAD_URL,"The given file does not have any download URLs.")}function JE(n){return new re(Z.UNSUPPORTED_ENVIRONMENT,"".concat(n," is missing. Make sure to install the required polyfills. See https://firebase.google.com/docs/web/environments-js-sdk#polyfills for more information."))}function Bl(n){return new re(Z.INVALID_ARGUMENT,n)}function wg(){return new re(Z.APP_DELETED,"The Firebase app was deleted.")}function ZE(n){return new re(Z.INVALID_ROOT_OPERATION,"The operation '"+n+"' cannot be performed on a root reference, create a non-root reference using child, such as .child('file.png').")}function Si(n,e){return new re(Z.INVALID_FORMAT,"String does not match format '"+n+"': "+e)}function Ai(n){throw new re(Z.INTERNAL_ERROR,"Internal error: "+n)}var He=class n{constructor(e,t){this.bucket=e,this.path_=t}get path(){return this.path_}get isRoot(){return this.path.length===0}fullServerUrl(){let e=encodeURIComponent;return"/b/"+e(this.bucket)+"/o/"+e(this.path)}bucketOnlyServerUrl(){return"/b/"+encodeURIComponent(this.bucket)+"/o"}static makeFromBucketSpec(e,t){let r;try{r=n.makeFromUrl(e,t)}catch(i){return new n(e,"")}if(r.path==="")return r;throw KE(e)}static makeFromUrl(e,t){let r=null,i="([A-Za-z0-9.\\-_]+)";function s(q){q.path.charAt(q.path.length-1)==="/"&&(q.path_=q.path_.slice(0,-1))}let a="(/(.*))?$",c=new RegExp("^gs://"+i+a,"i"),l={bucket:1,path:3};function d(q){q.path_=decodeURIComponent(q.path)}let p="v[A-Za-z0-9_]+",m=t.replace(/[.]/g,"\\."),v="(/([^?#]*).*)?$",S=new RegExp("^https?://".concat(m,"/").concat(p,"/b/").concat(i,"/o").concat(v),"i"),P={bucket:1,path:3},N=t===gg?"(?:storage.googleapis.com|storage.cloud.google.com)":t,C="([^?#]*)",U=new RegExp("^https?://".concat(N,"/").concat(i,"/").concat(C),"i"),L=[{regex:c,indices:l,postModify:s},{regex:S,indices:P,postModify:d},{regex:U,indices:{bucket:1,path:2},postModify:d}];for(let q=0;q<L.length;q++){let ie=L[q],H=ie.regex.exec(e);if(H){let w=H[ie.indices.bucket],g=H[ie.indices.path];g||(g=""),r=new n(w,g),ie.postModify(r);break}}if(r==null)throw WE(e);return r}},ql=class{constructor(e){this.promise_=Promise.reject(e)}getPromise(){return this.promise_}cancel(e=!1){}};function eT(n,e,t){let r=1,i=null,s=null,a=!1,c=0;function l(){return c===2}let d=!1;function p(...C){d||(d=!0,e.apply(null,C))}function m(C){i=setTimeout(()=>{i=null,n(S,l())},C)}function v(){s&&clearTimeout(s)}function S(C,...U){if(d){v();return}if(C){v(),p.call(null,C,...U);return}if(l()||a){v(),p.call(null,C,...U);return}r<64&&(r*=2);let L;c===1?(c=2,L=0):L=(r+Math.random())*1e3,m(L)}let P=!1;function N(C){P||(P=!0,v(),!d&&(i!==null?(C||(c=2),clearTimeout(i),m(0)):C||(c=1)))}return m(0),s=setTimeout(()=>{a=!0,N(!0)},t),N}function tT(n){n(!1)}function nT(n){return n!==void 0}function rT(n){return typeof n=="function"}function iT(n){return typeof n=="object"&&!Array.isArray(n)}function jo(n){return typeof n=="string"||n instanceof String}function ug(n){return Kl()&&n instanceof Blob}function Kl(){return typeof Blob<"u"}function lg(n,e,t,r){if(r<e)throw Bl("Invalid value for '".concat(n,"'. Expected ").concat(e," or greater."));if(r>t)throw Bl("Invalid value for '".concat(n,"'. Expected ").concat(t," or less."))}function Ci(n,e,t){let r=e;return t==null&&(r="https://".concat(e)),"".concat(t,"://").concat(r,"/v0").concat(n)}function Eg(n){let e=encodeURIComponent,t="?";for(let r in n)if(n.hasOwnProperty(r)){let i=e(r)+"="+e(n[r]);t=t+i+"&"}return t=t.slice(0,-1),t}var bn;(function(n){n[n.NO_ERROR=0]="NO_ERROR",n[n.NETWORK_ERROR=1]="NETWORK_ERROR",n[n.ABORT=2]="ABORT"})(bn||(bn={}));function Tg(n,e){let t=n>=500&&n<600,i=[408,429].indexOf(n)!==-1,s=e.indexOf(n)!==-1;return t||i||s}var jl=class{constructor(e,t,r,i,s,a,c,l,d,p,m,v=!0,S=!1){this.url_=e,this.method_=t,this.headers_=r,this.body_=i,this.successCodes_=s,this.additionalRetryCodes_=a,this.callback_=c,this.errorCallback_=l,this.timeout_=d,this.progressCallback_=p,this.connectionFactory_=m,this.retry=v,this.isUsingEmulator=S,this.pendingConnection_=null,this.backoffId_=null,this.canceled_=!1,this.appDelete_=!1,this.promise_=new Promise((P,N)=>{this.resolve_=P,this.reject_=N,this.start_()})}start_(){let e=(r,i)=>{if(i){r(!1,new lr(!1,null,!0));return}let s=this.connectionFactory_();this.pendingConnection_=s;let a=c=>{let l=c.loaded,d=c.lengthComputable?c.total:-1;this.progressCallback_!==null&&this.progressCallback_(l,d)};this.progressCallback_!==null&&s.addUploadProgressListener(a),s.send(this.url_,this.method_,this.isUsingEmulator,this.body_,this.headers_).then(()=>{this.progressCallback_!==null&&s.removeUploadProgressListener(a),this.pendingConnection_=null;let c=s.getErrorCode()===bn.NO_ERROR,l=s.getStatus();if(!c||Tg(l,this.additionalRetryCodes_)&&this.retry){let p=s.getErrorCode()===bn.ABORT;r(!1,new lr(!1,null,p));return}let d=this.successCodes_.indexOf(l)!==-1;r(!0,new lr(d,s))})},t=(r,i)=>{let s=this.resolve_,a=this.reject_,c=i.connection;if(i.wasSuccessCode)try{let l=this.callback_(c,c.getResponse());nT(l)?s(l):s()}catch(l){a(l)}else if(c!==null){let l=Wl();l.serverResponse=c.getErrorText(),this.errorCallback_?a(this.errorCallback_(c,l)):a(l)}else if(i.canceled){let l=this.appDelete_?wg():vg();a(l)}else{let l=yg();a(l)}};this.canceled_?t(!1,new lr(!1,null,!0)):this.backoffId_=eT(e,t,this.timeout_)}getPromise(){return this.promise_}cancel(e){this.canceled_=!0,this.appDelete_=e||!1,this.backoffId_!==null&&tT(this.backoffId_),this.pendingConnection_!==null&&this.pendingConnection_.abort()}},lr=class{constructor(e,t,r){this.wasSuccessCode=e,this.connection=t,this.canceled=!!r}};function sT(n,e){e!==null&&e.length>0&&(n.Authorization="Firebase "+e)}function oT(n,e){n["X-Firebase-Storage-Version"]="webjs/"+(e!=null?e:"AppManager")}function aT(n,e){e&&(n["X-Firebase-GMPID"]=e)}function cT(n,e){e!==null&&(n["X-Firebase-AppCheck"]=e)}function uT(n,e,t,r,i,s,a=!0,c=!1){let l=Eg(n.urlParams),d=n.url+l,p=Object.assign({},n.headers);return aT(p,e),sT(p,t),oT(p,s),cT(p,r),new jl(d,n.method,p,n.body,n.successCodes,n.additionalRetryCodes,n.handler,n.errorHandler,n.timeout,n.progressCallback,i,a,c)}function lT(){return typeof BlobBuilder<"u"?BlobBuilder:typeof WebKitBlobBuilder<"u"?WebKitBlobBuilder:void 0}function hT(...n){let e=lT();if(e!==void 0){let t=new e;for(let r=0;r<n.length;r++)t.append(n[r]);return t.getBlob()}else{if(Kl())return new Blob(n);throw new re(Z.UNSUPPORTED_ENVIRONMENT,"This browser doesn't seem to support creating Blobs")}}function dT(n,e,t){return n.webkitSlice?n.webkitSlice(e,t):n.mozSlice?n.mozSlice(e,t):n.slice?n.slice(e,t):null}function fT(n){if(typeof atob>"u")throw JE("base-64");return atob(n)}var st={RAW:"raw",BASE64:"base64",BASE64URL:"base64url",DATA_URL:"data_url"},Ri=class{constructor(e,t){this.data=e,this.contentType=t||null}};function pT(n,e){switch(n){case st.RAW:return new Ri(bg(e));case st.BASE64:case st.BASE64URL:return new Ri(Ag(n,e));case st.DATA_URL:return new Ri(gT(e),_T(e))}throw Wl()}function bg(n){let e=[];for(let t=0;t<n.length;t++){let r=n.charCodeAt(t);if(r<=127)e.push(r);else if(r<=2047)e.push(192|r>>6,128|r&63);else if((r&64512)===55296)if(!(t<n.length-1&&(n.charCodeAt(t+1)&64512)===56320))e.push(239,191,189);else{let s=r,a=n.charCodeAt(++t);r=65536|(s&1023)<<10|a&1023,e.push(240|r>>18,128|r>>12&63,128|r>>6&63,128|r&63)}else(r&64512)===56320?e.push(239,191,189):e.push(224|r>>12,128|r>>6&63,128|r&63)}return new Uint8Array(e)}function mT(n){let e;try{e=decodeURIComponent(n)}catch(t){throw Si(st.DATA_URL,"Malformed data URL.")}return bg(e)}function Ag(n,e){switch(n){case st.BASE64:{let i=e.indexOf("-")!==-1,s=e.indexOf("_")!==-1;if(i||s)throw Si(n,"Invalid character '"+(i?"-":"_")+"' found: is it base64url encoded?");break}case st.BASE64URL:{let i=e.indexOf("+")!==-1,s=e.indexOf("/")!==-1;if(i||s)throw Si(n,"Invalid character '"+(i?"+":"/")+"' found: is it base64 encoded?");e=e.replace(/-/g,"+").replace(/_/g,"/");break}}let t;try{t=fT(e)}catch(i){throw i.message.includes("polyfill")?i:Si(n,"Invalid character found")}let r=new Uint8Array(t.length);for(let i=0;i<t.length;i++)r[i]=t.charCodeAt(i);return r}var Bo=class{constructor(e){this.base64=!1,this.contentType=null;let t=e.match(/^data:([^,]+)?,/);if(t===null)throw Si(st.DATA_URL,"Must be formatted 'data:[<mediatype>][;base64],<data>");let r=t[1]||null;r!=null&&(this.base64=yT(r,";base64"),this.contentType=this.base64?r.substring(0,r.length-7):r),this.rest=e.substring(e.indexOf(",")+1)}};function gT(n){let e=new Bo(n);return e.base64?Ag(st.BASE64,e.rest):mT(e.rest)}function _T(n){return new Bo(n).contentType}function yT(n,e){return n.length>=e.length?n.substring(n.length-e.length)===e:!1}var qo=class n{constructor(e,t){let r=0,i="";ug(e)?(this.data_=e,r=e.size,i=e.type):e instanceof ArrayBuffer?(t?this.data_=new Uint8Array(e):(this.data_=new Uint8Array(e.byteLength),this.data_.set(new Uint8Array(e))),r=this.data_.length):e instanceof Uint8Array&&(t?this.data_=e:(this.data_=new Uint8Array(e.length),this.data_.set(e)),r=e.length),this.size_=r,this.type_=i}size(){return this.size_}type(){return this.type_}slice(e,t){if(ug(this.data_)){let r=this.data_,i=dT(r,e,t);return i===null?null:new n(i)}else{let r=new Uint8Array(this.data_.buffer,e,t-e);return new n(r,!0)}}static getBlob(...e){if(Kl()){let t=e.map(r=>r instanceof n?r.data_:r);return new n(hT.apply(null,t))}else{let t=e.map(a=>jo(a)?pT(st.RAW,a).data:a.data_),r=0;t.forEach(a=>{r+=a.byteLength});let i=new Uint8Array(r),s=0;return t.forEach(a=>{for(let c=0;c<a.length;c++)i[s++]=a[c]}),new n(i,!0)}}uploadData(){return this.data_}};function Sg(n){let e;try{e=JSON.parse(n)}catch(t){return null}return iT(e)?e:null}function vT(n){if(n.length===0)return null;let e=n.lastIndexOf("/");return e===-1?"":n.slice(0,e)}function IT(n,e){let t=e.split("/").filter(r=>r.length>0).join("/");return n.length===0?t:n+"/"+t}function Rg(n){let e=n.lastIndexOf("/",n.length-2);return e===-1?n:n.slice(e+1)}function wT(n,e){return e}var ye=class{constructor(e,t,r,i){this.server=e,this.local=t||e,this.writable=!!r,this.xform=i||wT}},Uo=null;function ET(n){return!jo(n)||n.length<2?n:Rg(n)}function Pg(){if(Uo)return Uo;let n=[];n.push(new ye("bucket")),n.push(new ye("generation")),n.push(new ye("metageneration")),n.push(new ye("name","fullPath",!0));function e(s,a){return ET(a)}let t=new ye("name");t.xform=e,n.push(t);function r(s,a){return a!==void 0?Number(a):a}let i=new ye("size");return i.xform=r,n.push(i),n.push(new ye("timeCreated")),n.push(new ye("updated")),n.push(new ye("md5Hash",null,!0)),n.push(new ye("cacheControl",null,!0)),n.push(new ye("contentDisposition",null,!0)),n.push(new ye("contentEncoding",null,!0)),n.push(new ye("contentLanguage",null,!0)),n.push(new ye("contentType",null,!0)),n.push(new ye("metadata","customMetadata",!0)),Uo=n,Uo}function TT(n,e){function t(){let r=n.bucket,i=n.fullPath,s=new He(r,i);return e._makeStorageReference(s)}Object.defineProperty(n,"ref",{get:t})}function bT(n,e,t){let r={};r.type="file";let i=t.length;for(let s=0;s<i;s++){let a=t[s];r[a.local]=a.xform(r,e[a.server])}return TT(r,n),r}function Cg(n,e,t){let r=Sg(e);return r===null?null:bT(n,r,t)}function AT(n,e,t,r){let i=Sg(e);if(i===null||!jo(i.downloadTokens))return null;let s=i.downloadTokens;if(s.length===0)return null;let a=encodeURIComponent;return s.split(",").map(d=>{let p=n.bucket,m=n.fullPath,v="/b/"+a(p)+"/o/"+a(m),S=Ci(v,t,r),P=Eg({alt:"media",token:d});return S+P})[0]}function kg(n,e){let t={},r=e.length;for(let i=0;i<r;i++){let s=e[i];s.writable&&(t[s.server]=n[s.local])}return JSON.stringify(t)}var Gt=class{constructor(e,t,r,i){this.url=e,this.method=t,this.handler=r,this.timeout=i,this.urlParams={},this.headers={},this.body=null,this.errorHandler=null,this.progressCallback=null,this.successCodes=[200],this.additionalRetryCodes=[]}};function At(n){if(!n)throw Wl()}function Ql(n,e){function t(r,i){let s=Cg(n,i,e);return At(s!==null),s}return t}function ST(n,e){function t(r,i){let s=Cg(n,i,e);return At(s!==null),AT(s,i,n.host,n._protocol)}return t}function ki(n){function e(t,r){let i;return t.getStatus()===401?t.getErrorText().includes("Firebase App Check token is invalid")?i=GE():i=$E():t.getStatus()===402?i=zE(n.bucket):t.getStatus()===403?i=HE(n.path):i=r,i.status=t.getStatus(),i.serverResponse=r.serverResponse,i}return e}function Ng(n){let e=ki(n);function t(r,i){let s=e(r,i);return r.getStatus()===404&&(s=jE(n.path)),s.serverResponse=i.serverResponse,s}return t}function RT(n,e,t){let r=e.fullServerUrl(),i=Ci(r,n.host,n._protocol),s="GET",a=n.maxOperationRetryTime,c=new Gt(i,s,Ql(n,t),a);return c.errorHandler=Ng(e),c}function PT(n,e,t){let r=e.fullServerUrl(),i=Ci(r,n.host,n._protocol),s="GET",a=n.maxOperationRetryTime,c=new Gt(i,s,ST(n,t),a);return c.errorHandler=Ng(e),c}function CT(n,e){return n&&n.contentType||e&&e.type()||"application/octet-stream"}function Dg(n,e,t){let r=Object.assign({},t);return r.fullPath=n.path,r.size=e.size(),r.contentType||(r.contentType=CT(null,e)),r}function kT(n,e,t,r,i){let s=e.bucketOnlyServerUrl(),a={"X-Goog-Upload-Protocol":"multipart"};function c(){let L="";for(let q=0;q<2;q++)L=L+Math.random().toString().slice(2);return L}let l=c();a["Content-Type"]="multipart/related; boundary="+l;let d=Dg(e,r,i),p=kg(d,t),m="--"+l+"\r\nContent-Type: application/json; charset=utf-8\r\n\r\n"+p+"\r\n--"+l+"\r\nContent-Type: "+d.contentType+"\r\n\r\n",v="\r\n--"+l+"--",S=qo.getBlob(m,r,v);if(S===null)throw Ig();let P={name:d.fullPath},N=Ci(s,n.host,n._protocol),C="POST",U=n.maxUploadRetryTime,M=new Gt(N,C,Ql(n,t),U);return M.urlParams=P,M.headers=a,M.body=S.uploadData(),M.errorHandler=ki(e),M}var hr=class{constructor(e,t,r,i){this.current=e,this.total=t,this.finalized=!!r,this.metadata=i||null}};function Xl(n,e){let t=null;try{t=n.getResponseHeader("X-Goog-Upload-Status")}catch(i){At(!1)}return At(!!t&&(e||["active"]).indexOf(t)!==-1),t}function NT(n,e,t,r,i){let s=e.bucketOnlyServerUrl(),a=Dg(e,r,i),c={name:a.fullPath},l=Ci(s,n.host,n._protocol),d="POST",p={"X-Goog-Upload-Protocol":"resumable","X-Goog-Upload-Command":"start","X-Goog-Upload-Header-Content-Length":"".concat(r.size()),"X-Goog-Upload-Header-Content-Type":a.contentType,"Content-Type":"application/json; charset=utf-8"},m=kg(a,t),v=n.maxUploadRetryTime;function S(N){Xl(N);let C;try{C=N.getResponseHeader("X-Goog-Upload-URL")}catch(U){At(!1)}return At(jo(C)),C}let P=new Gt(l,d,S,v);return P.urlParams=c,P.headers=p,P.body=m,P.errorHandler=ki(e),P}function DT(n,e,t,r){let i={"X-Goog-Upload-Command":"query"};function s(d){let p=Xl(d,["active","final"]),m=null;try{m=d.getResponseHeader("X-Goog-Upload-Size-Received")}catch(S){At(!1)}m||At(!1);let v=Number(m);return At(!isNaN(v)),new hr(v,r.size(),p==="final")}let a="POST",c=n.maxUploadRetryTime,l=new Gt(t,a,s,c);return l.headers=i,l.errorHandler=ki(e),l}var hg=256*1024;function OT(n,e,t,r,i,s,a,c){let l=new hr(0,0);if(a?(l.current=a.current,l.total=a.total):(l.current=0,l.total=r.size()),r.size()!==l.total)throw XE();let d=l.total-l.current,p=d;i>0&&(p=Math.min(p,i));let m=l.current,v=m+p,S="";p===0?S="finalize":d===p?S="upload, finalize":S="upload";let P={"X-Goog-Upload-Command":S,"X-Goog-Upload-Offset":"".concat(l.current)},N=r.slice(m,v);if(N===null)throw Ig();function C(q,ie){let H=Xl(q,["active","final"]),w=l.current+p,g=r.size(),_;return H==="final"?_=Ql(e,s)(q,ie):_=null,new hr(w,g,H==="final",_)}let U="POST",M=e.maxUploadRetryTime,L=new Gt(t,U,C,M);return L.headers=P,L.body=N.uploadData(),L.progressCallback=c||null,L.errorHandler=ki(n),L}var De={RUNNING:"running",PAUSED:"paused",SUCCESS:"success",CANCELED:"canceled",ERROR:"error"};function Ul(n){switch(n){case"running":case"pausing":case"canceling":return De.RUNNING;case"paused":return De.PAUSED;case"success":return De.SUCCESS;case"canceled":return De.CANCELED;case"error":return De.ERROR;default:return De.ERROR}}var zl=class{constructor(e,t,r){if(rT(e)||t!=null||r!=null)this.next=e,this.error=t!=null?t:void 0,this.complete=r!=null?r:void 0;else{let s=e;this.next=s.next,this.error=s.error,this.complete=s.complete}}};function cr(n){return(...e)=>{Promise.resolve().then(()=>n(...e))}}var dg=null,$l=class{constructor(){this.sent_=!1,this.xhr_=new XMLHttpRequest,this.initXhr(),this.errorCode_=bn.NO_ERROR,this.sendPromise_=new Promise(e=>{this.xhr_.addEventListener("abort",()=>{this.errorCode_=bn.ABORT,e()}),this.xhr_.addEventListener("error",()=>{this.errorCode_=bn.NETWORK_ERROR,e()}),this.xhr_.addEventListener("load",()=>{e()})})}send(e,t,r,i,s){if(this.sent_)throw Ai("cannot .send() more than once");if(Be(e)&&r&&(this.xhr_.withCredentials=!0),this.sent_=!0,this.xhr_.open(t,e,!0),s!==void 0)for(let a in s)s.hasOwnProperty(a)&&this.xhr_.setRequestHeader(a,s[a].toString());return i!==void 0?this.xhr_.send(i):this.xhr_.send(),this.sendPromise_}getErrorCode(){if(!this.sent_)throw Ai("cannot .getErrorCode() before sending");return this.errorCode_}getStatus(){if(!this.sent_)throw Ai("cannot .getStatus() before sending");try{return this.xhr_.status}catch(e){return-1}}getResponse(){if(!this.sent_)throw Ai("cannot .getResponse() before sending");return this.xhr_.response}getErrorText(){if(!this.sent_)throw Ai("cannot .getErrorText() before sending");return this.xhr_.statusText}abort(){this.xhr_.abort()}getResponseHeader(e){return this.xhr_.getResponseHeader(e)}addUploadProgressListener(e){this.xhr_.upload!=null&&this.xhr_.upload.addEventListener("progress",e)}removeUploadProgressListener(e){this.xhr_.upload!=null&&this.xhr_.upload.removeEventListener("progress",e)}},Gl=class extends $l{initXhr(){this.xhr_.responseType="text"}};function ur(){return dg?dg():new Gl}var Hl=class{isExponentialBackoffExpired(){return this.sleepTime>this.maxSleepTime}constructor(e,t,r=null){this._transferred=0,this._needToFetchStatus=!1,this._needToFetchMetadata=!1,this._observers=[],this._error=void 0,this._uploadUrl=void 0,this._request=void 0,this._chunkMultiplier=1,this._resolve=void 0,this._reject=void 0,this._ref=e,this._blob=t,this._metadata=r,this._mappings=Pg(),this._resumable=this._shouldDoResumable(this._blob),this._state="running",this._errorHandler=i=>{if(this._request=void 0,this._chunkMultiplier=1,i._codeEquals(Z.CANCELED))this._needToFetchStatus=!0,this.completeTransitions_();else{let s=this.isExponentialBackoffExpired();if(Tg(i.status,[]))if(s)i=yg();else{this.sleepTime=Math.max(this.sleepTime*2,qE),this._needToFetchStatus=!0,this.completeTransitions_();return}this._error=i,this._transition("error")}},this._metadataErrorHandler=i=>{this._request=void 0,i._codeEquals(Z.CANCELED)?this.completeTransitions_():(this._error=i,this._transition("error"))},this.sleepTime=0,this.maxSleepTime=this._ref.storage.maxUploadRetryTime,this._promise=new Promise((i,s)=>{this._resolve=i,this._reject=s,this._start()}),this._promise.then(null,()=>{})}_makeProgressCallback(){let e=this._transferred;return t=>this._updateProgress(e+t)}_shouldDoResumable(e){return e.size()>256*1024}_start(){this._state==="running"&&this._request===void 0&&(this._resumable?this._uploadUrl===void 0?this._createResumable():this._needToFetchStatus?this._fetchStatus():this._needToFetchMetadata?this._fetchMetadata():this.pendingTimeout=setTimeout(()=>{this.pendingTimeout=void 0,this._continueUpload()},this.sleepTime):this._oneShotUpload())}_resolveToken(e){Promise.all([this._ref.storage._getAuthToken(),this._ref.storage._getAppCheckToken()]).then(([t,r])=>{switch(this._state){case"running":e(t,r);break;case"canceling":this._transition("canceled");break;case"pausing":this._transition("paused");break}})}_createResumable(){this._resolveToken((e,t)=>{let r=NT(this._ref.storage,this._ref._location,this._mappings,this._blob,this._metadata),i=this._ref.storage._makeRequest(r,ur,e,t);this._request=i,i.getPromise().then(s=>{this._request=void 0,this._uploadUrl=s,this._needToFetchStatus=!1,this.completeTransitions_()},this._errorHandler)})}_fetchStatus(){let e=this._uploadUrl;this._resolveToken((t,r)=>{let i=DT(this._ref.storage,this._ref._location,e,this._blob),s=this._ref.storage._makeRequest(i,ur,t,r);this._request=s,s.getPromise().then(a=>{a=a,this._request=void 0,this._updateProgress(a.current),this._needToFetchStatus=!1,a.finalized&&(this._needToFetchMetadata=!0),this.completeTransitions_()},this._errorHandler)})}_continueUpload(){let e=hg*this._chunkMultiplier,t=new hr(this._transferred,this._blob.size()),r=this._uploadUrl;this._resolveToken((i,s)=>{let a;try{a=OT(this._ref._location,this._ref.storage,r,this._blob,e,this._mappings,t,this._makeProgressCallback())}catch(l){this._error=l,this._transition("error");return}let c=this._ref.storage._makeRequest(a,ur,i,s,!1);this._request=c,c.getPromise().then(l=>{this._increaseMultiplier(),this._request=void 0,this._updateProgress(l.current),l.finalized?(this._metadata=l.metadata,this._transition("success")):this.completeTransitions_()},this._errorHandler)})}_increaseMultiplier(){hg*this._chunkMultiplier*2<32*1024*1024&&(this._chunkMultiplier*=2)}_fetchMetadata(){this._resolveToken((e,t)=>{let r=RT(this._ref.storage,this._ref._location,this._mappings),i=this._ref.storage._makeRequest(r,ur,e,t);this._request=i,i.getPromise().then(s=>{this._request=void 0,this._metadata=s,this._transition("success")},this._metadataErrorHandler)})}_oneShotUpload(){this._resolveToken((e,t)=>{let r=kT(this._ref.storage,this._ref._location,this._mappings,this._blob,this._metadata),i=this._ref.storage._makeRequest(r,ur,e,t);this._request=i,i.getPromise().then(s=>{this._request=void 0,this._metadata=s,this._updateProgress(this._blob.size()),this._transition("success")},this._errorHandler)})}_updateProgress(e){let t=this._transferred;this._transferred=e,this._transferred!==t&&this._notifyObservers()}_transition(e){if(this._state!==e)switch(e){case"canceling":case"pausing":this._state=e,this._request!==void 0?this._request.cancel():this.pendingTimeout&&(clearTimeout(this.pendingTimeout),this.pendingTimeout=void 0,this.completeTransitions_());break;case"running":let t=this._state==="paused";this._state=e,t&&(this._notifyObservers(),this._start());break;case"paused":this._state=e,this._notifyObservers();break;case"canceled":this._error=vg(),this._state=e,this._notifyObservers();break;case"error":this._state=e,this._notifyObservers();break;case"success":this._state=e,this._notifyObservers();break}}completeTransitions_(){switch(this._state){case"pausing":this._transition("paused");break;case"canceling":this._transition("canceled");break;case"running":this._start();break}}get snapshot(){let e=Ul(this._state);return{bytesTransferred:this._transferred,totalBytes:this._blob.size(),state:e,metadata:this._metadata,task:this,ref:this._ref}}on(e,t,r,i){let s=new zl(t||void 0,r||void 0,i||void 0);return this._addObserver(s),()=>{this._removeObserver(s)}}then(e,t){return this._promise.then(e,t)}catch(e){return this.then(null,e)}_addObserver(e){this._observers.push(e),this._notifyObserver(e)}_removeObserver(e){let t=this._observers.indexOf(e);t!==-1&&this._observers.splice(t,1)}_notifyObservers(){this._finishPromise(),this._observers.slice().forEach(t=>{this._notifyObserver(t)})}_finishPromise(){if(this._resolve!==void 0){let e=!0;switch(Ul(this._state)){case De.SUCCESS:cr(this._resolve.bind(null,this.snapshot))();break;case De.CANCELED:case De.ERROR:let t=this._reject;cr(t.bind(null,this._error))();break;default:e=!1;break}e&&(this._resolve=void 0,this._reject=void 0)}}_notifyObserver(e){switch(Ul(this._state)){case De.RUNNING:case De.PAUSED:e.next&&cr(e.next.bind(e,this.snapshot))();break;case De.SUCCESS:e.complete&&cr(e.complete.bind(e))();break;case De.CANCELED:case De.ERROR:e.error&&cr(e.error.bind(e,this._error))();break;default:e.error&&cr(e.error.bind(e,this._error))()}}resume(){let e=this._state==="paused"||this._state==="pausing";return e&&this._transition("running"),e}pause(){let e=this._state==="running";return e&&this._transition("pausing"),e}cancel(){let e=this._state==="running"||this._state==="pausing";return e&&this._transition("canceling"),e}};var dr=class n{constructor(e,t){this._service=e,t instanceof He?this._location=t:this._location=He.makeFromUrl(t,e.host)}toString(){return"gs://"+this._location.bucket+"/"+this._location.path}_newRef(e,t){return new n(e,t)}get root(){let e=new He(this._location.bucket,"");return this._newRef(this._service,e)}get bucket(){return this._location.bucket}get fullPath(){return this._location.path}get name(){return Rg(this._location.path)}get storage(){return this._service}get parent(){let e=vT(this._location.path);if(e===null)return null;let t=new He(this._location.bucket,e);return new n(this._service,t)}_throwIfRoot(e){if(this._location.path==="")throw ZE(e)}};function xT(n,e,t){return n._throwIfRoot("uploadBytesResumable"),new Hl(n,new qo(e),t)}function VT(n){n._throwIfRoot("getDownloadURL");let e=PT(n.storage,n._location,Pg());return n.storage.makeRequestWithTokens(e,ur).then(t=>{if(t===null)throw YE();return t})}function LT(n,e){let t=IT(n._location.path,e),r=new He(n._location.bucket,t);return new dr(n.storage,r)}function MT(n){return/^[A-Za-z]+:\/\//.test(n)}function FT(n,e){return new dr(n,e)}function Og(n,e){if(n instanceof Pi){let t=n;if(t._bucket==null)throw QE();let r=new dr(t,t._bucket);return e!=null?Og(r,e):r}else return e!==void 0?LT(n,e):n}function UT(n,e){if(e&&MT(e)){if(n instanceof Pi)return FT(n,e);throw Bl("To use ref(service, url), the first argument must be a Storage instance.")}else return Og(n,e)}function fg(n,e){let t=e==null?void 0:e[_g];return t==null?null:He.makeFromBucketSpec(t,n)}function BT(n,e,t,r={}){n.host="".concat(e,":").concat(t);let i=Be(e);i&&(Cn("https://".concat(n.host,"/b")),kn("Storage",!0)),n._isUsingEmulator=!0,n._protocol=i?"https":"http";let{mockUserToken:s}=r;s&&(n._overrideAuthToken=typeof s=="string"?s:ts(s,n.app.options.projectId))}var Pi=class{constructor(e,t,r,i,s,a=!1){this.app=e,this._authProvider=t,this._appCheckProvider=r,this._url=i,this._firebaseVersion=s,this._isUsingEmulator=a,this._bucket=null,this._host=gg,this._protocol="https",this._appId=null,this._deleted=!1,this._maxOperationRetryTime=UE,this._maxUploadRetryTime=BE,this._requests=new Set,i!=null?this._bucket=He.makeFromBucketSpec(i,this._host):this._bucket=fg(this._host,this.app.options)}get host(){return this._host}set host(e){this._host=e,this._url!=null?this._bucket=He.makeFromBucketSpec(this._url,e):this._bucket=fg(e,this.app.options)}get maxUploadRetryTime(){return this._maxUploadRetryTime}set maxUploadRetryTime(e){lg("time",0,Number.POSITIVE_INFINITY,e),this._maxUploadRetryTime=e}get maxOperationRetryTime(){return this._maxOperationRetryTime}set maxOperationRetryTime(e){lg("time",0,Number.POSITIVE_INFINITY,e),this._maxOperationRetryTime=e}async _getAuthToken(){if(this._overrideAuthToken)return this._overrideAuthToken;let e=this._authProvider.getImmediate({optional:!0});if(e){let t=await e.getToken();if(t!==null)return t.accessToken}return null}async _getAppCheckToken(){if(Te(this.app)&&this.app.settings.appCheckToken)return this.app.settings.appCheckToken;let e=this._appCheckProvider.getImmediate({optional:!0});return e?(await e.getToken()).token:null}_delete(){return this._deleted||(this._deleted=!0,this._requests.forEach(e=>e.cancel()),this._requests.clear()),Promise.resolve()}_makeStorageReference(e){return new dr(this,e)}_makeRequest(e,t,r,i,s=!0){if(this._deleted)return new ql(wg());{let a=uT(e,this._appId,r,i,t,this._firebaseVersion,s,this._isUsingEmulator);return this._requests.add(a),a.getPromise().then(()=>this._requests.delete(a),()=>this._requests.delete(a)),a}}async makeRequestWithTokens(e,t){let[r,i]=await Promise.all([this._getAuthToken(),this._getAppCheckToken()]);return this._makeRequest(e,t,r,i).getPromise()}},pg="@firebase/storage",mg="0.13.14";var xg="storage";function Vg(n,e,t){return n=ee(n),xT(n,e,t)}function Lg(n){return n=ee(n),VT(n)}function Mg(n,e){return n=ee(n),UT(n,e)}function Fg(n=xn(),e){n=ee(n);let r=Jt(n,xg).getImmediate({identifier:e}),i=es("storage");return i&&qT(r,...i),r}function qT(n,e,t,r={}){BT(n,e,t,r)}function jT(n,{instanceIdentifier:e}){let t=n.getProvider("app").getImmediate(),r=n.getProvider("auth-internal"),i=n.getProvider("app-check-internal");return new Pi(t,r,i,e,Xe)}function zT(){Qe(new ke(xg,jT,"PUBLIC").setMultipleInstances(!0)),Ne(pg,mg,""),Ne(pg,mg,"esm2017")}zT();var $T=!1,GT=null;function HT(){let n=window.speechSynthesis.getVoices();n.length&&(GT=n.find(e=>e.name.toLowerCase().includes("male"))||n.find(e=>e.lang.startsWith("en"))||n[0],$T=!0)}window.speechSynthesis.onvoiceschanged=HT;window.toggleLoginModal=n=>{let e=document.getElementById("login-modal");e&&(n?e.classList.remove("hidden"):e.classList.add("hidden"),Ht(n?"LOGIN_MODAL_OPENED":"LOGIN_MODAL_CLOSED"))};var WT=null,Ug=!1,Jl="All",Bg="",Ni=null,KT=20,zo=[];function Ht(n,e={}){let r={timestamp:new Date().toISOString().split("T")[1].replace("Z",""),event:n,detail:e};zo.unshift(r),zo.length>KT&&zo.pop();let i=document.getElementById("zeus-log-feed");i&&(i.innerHTML=zo.map(s=>'\n      <div class="text-[10px] text-gray-400 font-mono">\n        <span class="text-yellow-500">'.concat(s.timestamp,"</span> \u2014 ").concat(s.event,"\n      </div>")).join(""))}Fs(Oe,async n=>{var a;Ht("AUTH_STATE_CHANGED",{uid:(n==null?void 0:n.uid)||null}),WT=n;let e=document.getElementById("loading-overlay"),t=document.getElementById("main-content"),r=document.getElementById("paywall-content");if(e==null||e.classList.add("hidden"),!n){t==null||t.classList.add("hidden"),r==null||r.classList.remove("hidden"),Ni&&clearInterval(Ni);return}t==null||t.classList.remove("hidden"),r==null||r.classList.add("hidden");let i=or(ot,"artifacts/".concat(St,"/users/").concat(n.uid,"/profile"),"info"),s=await sg(i);Ug=s.exists()&&(s.data().isPro||s.data().isPremium),Ug?(a=document.querySelector("header"))==null||a.classList.add("ascend-pulse"):XT(),Zl(),YT(),nb()});function Zl(){let n=xl(Tn(ot,"artifacts",St,"public","data","players"),eg("stLouisConnection.isFromSTL","==",!0));Ll(n,e=>{let t=document.getElementById("match-grid-body"),r=document.getElementById("top-athlete-display");if(!t)return;t.innerHTML="";let i=[];e.forEach(s=>{let a=s.data(),c=(a.name||"").toLowerCase(),l=Jl==="All"||a.sport===Jl,d=c.includes(Bg);if(!l||!d)return;let p=(Number(a.score0)||0)+(Number(a.score1)||0)+(Number(a.score2)||0)+(Number(a.score3)||0)+(Number(a.score4)||0);i.push(Xi(Qi({id:s.id},a),{total:p}))}),i.sort((s,a)=>a.total-s.total),r&&i.length>0&&(r.innerText="".concat(QT(i[0].sport)," ").concat(i[0].name," \u2014 ").concat(i[0].total," PTS")),i.forEach((s,a)=>{var d;let c=((d=Oe.currentUser)==null?void 0:d.uid)==="cEQQHNVXPQfXFhOzO1xBXWZcGy52",l=document.createElement("tr");l.className="border-b border-gray-800 hover:bg-yellow-500/5 transition-all duration-500 opacity-0 group",setTimeout(()=>l.classList.remove("opacity-0"),a*50),l.innerHTML='\n        <td class="p-3 font-bold text-white">'.concat(a===0?"\u{1F451} ":"").concat(s.name,'</td>\n        <td class="p-3 text-center text-gray-400">').concat(s.score0||0,'</td>\n        <td class="p-3 text-center text-gray-400">').concat(s.score1||0,'</td>\n        <td class="p-3 text-center text-gray-400">').concat(s.score2||0,'</td>\n        <td class="p-3 text-center text-gray-400">').concat(s.score3||0,'</td>\n        <td class="p-3 text-center text-gray-400">').concat(s.score4||0,'</td>\n        <td class="p-3 text-center font-black text-yellow-500 bg-yellow-500/10">').concat(s.total,'</td>\n        <td class="p-3 text-right">\n          ').concat(c?'<button data-id="'.concat(s.id,'" class="delete-player-btn text-red-500 text-[10px] font-bold uppercase opacity-0 group-hover:opacity-100 transition-opacity">Delete</button>'):"","\n        </td>"),t.appendChild(l)}),JT()})}document.addEventListener("DOMContentLoaded",()=>{var s,a,c;let n=document.getElementById("athlete-search-input");n&&n.addEventListener("input",l=>{Bg=l.target.value.toLowerCase(),Zl()}),document.querySelectorAll(".filter-btn").forEach(l=>{l.addEventListener("click",d=>{document.querySelectorAll(".filter-btn").forEach(p=>p.classList.remove("active-filter","bg-yellow-500","text-black")),d.target.classList.add("active-filter","bg-yellow-500","text-black"),Jl=d.target.dataset.sport,Zl()})});let e=document.getElementById("deploy-athlete-btn");e&&e.addEventListener("click",async l=>{l.preventDefault();let d=document.getElementById("player-name").value,p=document.getElementById("player-sport").value;if(!d)return alert("Mortal, the Athlete needs a name!");try{await Fo(Tn(ot,"artifacts",St,"public","data","players"),{name:d,sport:p,score0:parseInt(document.getElementById("score0").value)||0,score1:parseInt(document.getElementById("score1").value)||0,score2:parseInt(document.getElementById("score2").value)||0,score3:parseInt(document.getElementById("score3").value)||0,score4:parseInt(document.getElementById("score4").value)||0,stLouisConnection:{isFromSTL:!0},timestamp:ar()}),document.getElementById("add-athlete-form").reset(),Ht("ATHLETE_DEPLOYED",{name:d})}catch(m){console.error(m)}});let t=document.getElementById("reset-grid-btn");t&&t.addEventListener("click",async()=>{if(!confirm("Master, clear the entire roster?"))return;let l=await og(Tn(ot,"artifacts",St,"public","data","players"));await Promise.all(l.docs.map(d=>Vl(d.ref))),Ht("GRID_RESET")});let r=document.getElementById("send-chat-message-btn"),i=document.getElementById("chat-message-input");r&&i&&(r.addEventListener("click",async()=>{let l=i.value.trim();l&&(await Fo(Tn(ot,"artifacts",St,"public","data","messages"),{userId:Oe.currentUser.uid,content:l,timestamp:ar(),author:Oe.currentUser.email.split("@")[0]}),i.value="")}),i.addEventListener("keydown",l=>{l.key==="Enter"&&r.click()})),(s=document.getElementById("start-call-btn"))==null||s.addEventListener("click",eb),(a=document.getElementById("hang-up-btn"))==null||a.addEventListener("click",tb),(c=document.getElementById("upload-media-btn"))==null||c.addEventListener("click",ZT)});function QT(n){return{Football:"\u{1F3C8}",Baseball:"\u26BE",Hockey:"\u{1F3D2}",Basketball:"\u{1F3C0}","Track & Field":"\u{1F45F}","Boys Soccer":"\u26BD\u2642\uFE0F","Girls Soccer":"\u26BD\u2640\uFE0F"}[n]||"\u{1F3C6}"}function XT(){var t;if(Ni)return;let n=600,e=document.getElementById("zeus-timer");(t=document.getElementById("mortal-timer-container"))==null||t.classList.remove("hidden"),Ni=setInterval(()=>{var s,a;n--;let r=Math.floor(n/60),i=(n%60).toString().padStart(2,"0");e&&(e.innerText="".concat(r,":").concat(i)),n<=0&&(clearInterval(Ni),(s=document.getElementById("main-content"))==null||s.classList.add("hidden"),(a=document.getElementById("paywall-content"))==null||a.classList.remove("hidden"))},1e3)}function YT(){let n=document.getElementById("chat-messages");if(!n)return;let e=xl(Tn(ot,"artifacts",St,"public","data","messages"),tg("timestamp","asc"),ng(50));Ll(e,t=>{n.innerHTML="",t.forEach(r=>{let i=r.data(),s=i.timestamp?i.timestamp.toDate().toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"}):"",a=document.createElement("div");a.className="p-2 mb-2 bg-gray-800/50 rounded border-l-2 border-yellow-500",a.innerHTML='<div class="flex justify-between text-[9px] text-yellow-500 font-bold uppercase"><span>'.concat(i.author,"</span><span>").concat(s,'</span></div><div class="text-sm text-gray-200">').concat(i.content,"</div>"),n.appendChild(a)}),n.scrollTop=n.scrollHeight})}function JT(){document.querySelectorAll(".delete-player-btn").forEach(n=>{n.onclick=async e=>{confirm("Master, are you sure?")&&(await Vl(or(ot,"artifacts",St,"public","data","players",e.target.dataset.id)),Ht("ATHLETE_REMOVED"))}})}async function ZT(){let n=document.getElementById("media-file-input");if(!Oe.currentUser||!n.files[0])return;let e=n.files[0],t="users/".concat(Oe.currentUser.uid,"/media/").concat(e.name),r=Vg(Mg(qg,t),e);r.on("state_changed",i=>{let s=i.bytesTransferred/i.totalBytes*100,a=document.querySelector("#upload-progress div");a&&(a.style.width="".concat(s,"%"))},null,async()=>{let i=await Lg(r.snapshot.ref);await Fo(Tn(ot,"users/".concat(Oe.currentUser.uid,"/personalMedia")),{userId:Oe.currentUser.uid,downloadURL:i,storagePath:t,timestamp:ar(),cheers:0})})}async function eb(){Ht("CALL_START")}async function tb(){Ht("CALL_HANGUP")}async function nb(){Ht("LISTENING_FOR_CALLS")}var rb=window.NETLIFY_FIREBASE_CONFIG,eh=La(rb),Oe=gc(eh),ot=Hm(eh),qg=Fg(eh),St="sntlmoexclusivesportsgrid";async function aS(){if(!Oe.currentUser)throw new Error("Mortal, you must be logged in to ascend.");try{let n=or(ot,"artifacts/".concat(St,"/users/").concat(Oe.currentUser.uid,"/profile"),"info");return await ag(n,{isPro:!0,isPremium:!0,ascensionDate:ar()},{merge:!0}),alert("Congratulations! You have ascended to PRO Status."),!0}catch(n){throw console.error("Ascension Error:",n),n}}window.logInGoogle=async()=>{let n=new sn;try{await mc(Oe,n),window.toggleLoginModal&&window.toggleLoginModal(!1)}catch(e){alert("Google Sign-In Failed: "+e.message)}};window.logIn=async()=>{var r,i;let n=(r=document.getElementById("login-email"))==null?void 0:r.value,e=(i=document.getElementById("login-password"))==null?void 0:i.value,t=document.getElementById("login-submit-btn");if(!n||!e)return alert("Credentials required, Mortal.");t&&(t.disabled=!0,t.innerText="AUTHENTICATING...");try{await hc(Oe,n,e),window.toggleLoginModal&&window.toggleLoginModal(!1)}catch(s){alert("Login Error: "+s.message)}finally{t&&(t.disabled=!1,t.innerText="SIGN IN")}};window.logOut=async()=>{try{await dc(Oe),window.toggleAccountModal&&window.toggleAccountModal(!1)}catch(n){console.error("Logout Error:",n)}};export{sn as GoogleAuthProvider,St as appId,Oe as auth,ot as db,dc as firebaseSignOut,Fs as onAuthStateChanged,hc as signInWithEmailAndPassword,mc as signInWithPopup,dc as signOut,qg as storage,aS as upgradeUser};
/*! Bundled license information:

@firebase/util/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2025 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/component/dist/esm/index.esm2017.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/logger/dist/esm/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/app/dist/esm/index.esm2017.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/app/dist/esm/index.esm2017.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2023 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/app/dist/esm/index.esm2017.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/app/dist/esm/index.esm2017.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

firebase/app/dist/esm/index.esm.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-35c79a8a.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-35c79a8a.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-35c79a8a.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-35c79a8a.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-35c79a8a.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-35c79a8a.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-35c79a8a.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-35c79a8a.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2023 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-35c79a8a.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-35c79a8a.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-35c79a8a.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-35c79a8a.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-35c79a8a.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-35c79a8a.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-35c79a8a.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-35c79a8a.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-35c79a8a.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-35c79a8a.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-35c79a8a.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-35c79a8a.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-35c79a8a.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-35c79a8a.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-35c79a8a.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-35c79a8a.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-35c79a8a.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-35c79a8a.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-35c79a8a.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-35c79a8a.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-35c79a8a.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-35c79a8a.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-35c79a8a.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-35c79a8a.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-35c79a8a.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-35c79a8a.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-35c79a8a.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-35c79a8a.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2025 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-35c79a8a.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2020 Google LLC.
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-35c79a8a.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-35c79a8a.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-35c79a8a.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-35c79a8a.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-35c79a8a.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm2017/index-35c79a8a.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2020 Google LLC.
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/webchannel-wrapper/dist/bloom-blob/esm/bloom_blob_es2018.js:
  (** @license
  Copyright The Closure Library Authors.
  SPDX-License-Identifier: Apache-2.0
  *)
  (** @license
  
   Copyright The Closure Library Authors.
   SPDX-License-Identifier: Apache-2.0
  *)

@firebase/webchannel-wrapper/dist/webchannel-blob/esm/webchannel_blob_es2018.js:
  (** @license
  Copyright The Closure Library Authors.
  SPDX-License-Identifier: Apache-2.0
  *)
  (** @license
  
   Copyright The Closure Library Authors.
   SPDX-License-Identifier: Apache-2.0
  *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
  * @license
  * Copyright 2020 Google LLC
  *
  * Licensed under the Apache License, Version 2.0 (the "License");
  * you may not use this file except in compliance with the License.
  * You may obtain a copy of the License at
  *
  *   http://www.apache.org/licenses/LICENSE-2.0
  *
  * Unless required by applicable law or agreed to in writing, software
  * distributed under the License is distributed on an "AS IS" BASIS,
  * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  * See the License for the specific language governing permissions and
  * limitations under the License.
  *)
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2023 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2025 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2018 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2023 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2018 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2023 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2023 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2024 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law | agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES | CONDITIONS OF ANY KIND, either express | implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2018 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2024 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2023 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2018 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2023 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2025 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2023 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2024 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2025 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2023 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2023 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/storage/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/storage/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/storage/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/storage/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/storage/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/storage/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/storage/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
*/
//# sourceMappingURL=bundle.js.map
