// ==UserScript==
// @name         simkl timing
// @namespace    https://github.com/energistix
// @version      1.3
// @description  Change the timing formating on simkl.com
// @author       You
// @match        https://simkl.com/**
// @icon         https://simkl.com/favicon.ico
// @grant        none
// ==/UserScript==

var v=(r=>typeof require<"u"?require:typeof Proxy<"u"?new Proxy(r,{get:(t,e)=>(typeof require<"u"?require:t)[e]}):r)(function(r){if(typeof require<"u")return require.apply(this,arguments);throw Error('Dynamic require of "'+r+'" is not supported')});var $;if(typeof TextEncoder<"u")$={Encoder:TextEncoder,Decoder:TextDecoder};else try{let r=v("util");$={Encoder:r.TextEncoder,Decoder:r.TextDecoder}}catch{throw new Error("Arcsecond requires TextEncoder and TextDecoder to be polyfilled.")}var m=new $.Encoder,T=new $.Decoder,L=(r,t,e)=>{let n=Uint8Array.from({length:t},(o,s)=>e.getUint8(r+s));return T.decode(n)},b=(r,t)=>{let e=t.getUint8(r);if((e&128)>>7){if((e&224)>>5===6)return 2;if((e&240)>>4===14)return 3;if((e&240)>>4===15)return 4}else return 1;return 1},P=(r,t,e)=>{let n=Uint8Array.from({length:t},(i,o)=>e.getUint8(r+o));return T.decode(n)},M=r=>{let t,e=0,n=0;for(;n<r.length;){for(t=r.codePointAt(n);t;)t=t>>8,n++;e++}return e},k=r=>r instanceof Uint8Array||r instanceof Uint8ClampedArray||r instanceof Int8Array||r instanceof Uint16Array||r instanceof Int16Array||r instanceof Uint32Array||r instanceof Int32Array||r instanceof Float32Array||r instanceof Float64Array,l;(function(r){r.STRING="string",r.ARRAY_BUFFER="arrayBuffer",r.TYPED_ARRAY="typedArray",r.DATA_VIEW="dataView"})(l||(l={}));var S=(r,t=null)=>{let e,n;if(typeof r=="string"){let i=m.encode(r);e=new DataView(i.buffer),n=l.STRING}else if(r instanceof ArrayBuffer)e=new DataView(r),n=l.ARRAY_BUFFER;else if(k(r))e=new DataView(r.buffer),n=l.TYPED_ARRAY;else if(r instanceof DataView)e=r,n=l.DATA_VIEW;else throw new Error(`Cannot process input. Must be a string, ArrayBuffer, TypedArray, or DataView. but got ${typeof r}`);return{dataView:e,inputType:n,isError:!1,error:null,result:null,data:t,index:0}},f=(r,t)=>({...r,isError:!0,error:t}),d=(r,t)=>({...r,result:t}),O=(r,t)=>({...r,data:t}),h=(r,t,e)=>({...r,result:t,index:e}),a=class r{constructor(t){this.p=t}run(t){let e=S(t),n=this.p(e);return n.isError?{isError:!0,error:n.error,index:n.index,data:n.data}:{isError:!1,result:n.result,index:n.index,data:n.data}}fork(t,e,n){let i=S(t),o=this.p(i);return o.isError?e(o.error,o):n(o.result,o)}map(t){let e=this.p;return new r(function(i){let o=e(i);return o.isError?o:d(o,t(o.result))})}chain(t){let e=this.p;return new r(function(i){let o=e(i);return o.isError?o:t(o.result).p(o)})}ap(t){let e=this.p;return new r(function(i){if(i.isError)return i;let o=e(i);if(o.isError)return o;let s=t.p(o);return s.isError?s:d(s,s.result(o.result))})}errorMap(t){let e=this.p;return new r(function(i){let o=e(i);return o.isError?f(o,t({isError:!0,error:o.error,index:o.index,data:o.data})):o})}errorChain(t){let e=this.p;return new r(function(i){let o=e(i);if(o.isError){let{error:s,index:u,data:p}=o;return t({isError:!0,error:s,index:u,data:p}).p({...o,isError:!1})}return o})}mapFromData(t){let e=this.p;return new r(n=>{let i=e(n);return i.isError&&i.error?i:d(i,t({isError:!1,result:i.result,data:i.data,index:i.index}))})}chainFromData(t){let e=this.p;return new r(function(i){let o=e(i);return o.isError&&o.error?o:t({result:o.result,data:o.data}).p(o)})}mapData(t){let e=this.p;return new r(function(i){let o=e(i);return O(o,t(o.data))})}static of(t){return new r(e=>d(e,t))}},R=/[0-9]/,C=/^[0-9]+/,B=/[a-zA-Z]/,W=/^[a-zA-Z]+/,q=/^\s+/,F=/ParseError.+Expecting/,X=new a(function(t){return t.isError?t:d(t,t.data)});var _=a.of;function E(r){if(typeof r!="number"||r<=0)throw new TypeError(`exactly must be called with a number > 0, but got ${r}`);return function(e){return new a(function(i){if(i.isError)return i;let o=[],s=i;for(let u=0;u<r;u++){let p=e.p(s);if(p.isError)return p;s=p,o.push(s.result)}return d(s,o)}).errorMap(({index:n,error:i})=>`ParseError (position ${n}): Expecting ${r}${i.replace(F,"")}`)}}var rr=new a(function(t){if(t.isError)return t;let{index:e,dataView:n}=t;if(e<n.byteLength){let i=b(e,n);if(e+i<=n.byteLength){let o=P(e,i,n);return h(t,o,e+i)}}return f(t,`ParseError (position ${e}): Expecting a character, but got end of input.`)}),tr=new a(function(t){if(t.isError)return t;let{index:e,dataView:n}=t;return e<n.byteLength?h(t,n.getUint8(e),e):f(t,`ParseError (position ${e}): Unexpected end of input.`)});function c(r){if(!r||M(r)<1)throw new TypeError(`str must be called with a string with length > 1, but got ${r}`);let t=m.encode(r);return new a(function(n){let{index:i,dataView:o}=n;if(o.byteLength-i<t.byteLength)return f(n,`ParseError (position ${i}): Expecting string '${r}', but got end of input.`);let u=L(i,t.byteLength,o);return r===u?h(n,r,i+m.encode(r).byteLength):f(n,`ParseError (position ${i}): Expecting string '${r}', got '${u}...'`)})}function D(r){let t=Object.prototype.toString.call(r);if(t!=="[object RegExp]")throw new TypeError(`regex must be called with a Regular Expression, but got ${t}`);if(r.toString()[1]!=="^")throw new Error("regex parsers must contain '^' start assertion.");return new a(function(n){if(n.isError)return n;let{dataView:i,index:o}=n,s=L(o,i.byteLength-o,i);if(s.length>=1){let u=s.match(r);return u?h(n,u[0],o+m.encode(u[0]).byteLength):f(n,`ParseError (position ${o}): Expecting string matching '${r}', got '${s.slice(0,5)}...'`)}return f(n,`ParseError (position ${o}): Expecting string matching '${r}', but got end of input.`)})}var g=new a(function(t){if(t.isError)return t;let{dataView:e,index:n}=t;if(e.byteLength>n){let i=b(n,e);if(n+i<=e.byteLength){let o=P(n,i,e);return e.byteLength&&o&&R.test(o)?h(t,o,n+i):f(t,`ParseError (position ${n}): Expecting digit, got '${o}'`)}}return f(t,`ParseError (position ${n}): Expecting digit, but got end of input.`)}),er=D(C).errorMap(({index:r})=>`ParseError (position ${r}): Expecting digits`),nr=new a(function(t){if(t.isError)return t;let{index:e,dataView:n}=t;if(n.byteLength>e){let i=b(e,n);if(e+i<=n.byteLength){let o=P(e,i,n);return n.byteLength&&o&&B.test(o)?h(t,o,e+i):f(t,`ParseError (position ${e}): Expecting letter, got '${o}'`)}}return f(t,`ParseError (position ${e}): Expecting letter, but got end of input.`)}),or=D(W).errorMap(({index:r})=>`ParseError (position ${r}): Expecting letters`);function A(r){return new a(function(e){if(e.isError)return e;let n=r.length,i=new Array(n),o=e;for(let s=0;s<n;s++){let u=r[s].p(o);if(u.isError)return u;o=u,i[s]=u.result}return d(o,i)})}function y(r){if(r.length===0)throw new Error("List of parsers can't be empty.");return new a(function(e){if(e.isError)return e;let n=null;for(let i of r){let o=i.p(e);if(!o.isError)return o;(n===null||n&&o.index>n.index)&&(n=o)}return n})}function H(r){return new a(function(e){if(e.isError)return e;let n=r.p(e);return n.isError?d(e,null):n})}var ir=new a(function(t){if(t.isError)return t;let{index:e}=t;return e>0?f(t,`ParseError 'startOfInput' (position ${e}): Expected start of input'`):t}),sr=new a(function(t){if(t.isError)return t;let{dataView:e,index:n,inputType:i}=t;if(n!==e.byteLength){let o=i===l.STRING?String.fromCharCode(e.getUint8(n)):`0x${e.getUint8(n).toString(16).padStart(2,"0")}`;return f(t,`ParseError 'endOfInput' (position ${n}): Expected end of input but got '${o}'`)}return d(t,null)}),N=D(q).errorMap(({index:r})=>`ParseError 'many1' (position ${r}): Expecting to match at least one value`),ur=H(N).map(r=>r||"");var x=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];function I(r,t,e,n){let i=new Date,o=new Date;if(r==="Tomorrow")o.setDate(o.getDate()+1);else if(r!=="Today"){let s=i.getDay(),u=x.indexOf(r);if(u===-1)throw new Error("Invalid day provided");let p=u-s;p<=0&&(p+=7),o.setDate(o.getDate()+p)}return o.setHours(t),o.setMinutes(e),n==="PM"&&o.getHours()<12&&o.setHours(o.getHours()+12),o}var w=r=>Number(r.join("")),j=A([y([c("Today"),c("Tomorrow"),...x.map(r=>c(r))]),c(", "),E(2)(g).map(w),c(":"),E(2)(g).map(w),c(" "),y([c("AM"),c("PM")])]).map(([r,,t,,e,,n])=>I(r,t,e,n)),G=A([c("Next"),c(" "),y(x.map(c))]).map(([,,r])=>{let e=new Date().getDay(),n=x.indexOf(r),i=I(r,0,0,"PM");return n>e&&i.setDate(i.getDate()+7),i}),z=A([y(x.map(r=>c(r.slice(0,3)))),c(" "),E(2)(g).map(w),c("-"),E(2)(g).map(w),c("-"),E(4)(g).map(w)]).map(([,,r,,t,,e])=>new Date(e,t-1,r)),Z=y([j,G,z]);function U(r){let t=Z.run(r);if(t.isError)throw new Error(t.error);return t.result}function V(r){let t=new Date;if(r.getTime()<t.getTime())return"Any moment now";let e=r.getMinutes()-t.getMinutes(),n=r.getHours()-t.getHours(),i=r.getDate()-t.getDate(),o=Math.floor(i/7);return o>1?`In ${o} weeks`:i>1?`In ${i} days`:i===1?"Tomorrow":n>1?`In ${n} hours`:e>0?`In ${e} minutes`:"Any moment now"}function J(){document.querySelectorAll(".SimklTVProfilePosterEpisodeText").forEach(t=>{try{let e=null;t.dataset.date&&(e=new Date(t.dataset.date)),e===null&&(e=U(t.innerText),t.dataset.date=e.toISOString());let n=V(e);t.innerText=n}catch{}})}setInterval(J,1e3);

