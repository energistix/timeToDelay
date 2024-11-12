var V=(r=>typeof require<"u"?require:typeof Proxy<"u"?new Proxy(r,{get:(e,t)=>(typeof require<"u"?require:e)[t]}):r)(function(r){if(typeof require<"u")return require.apply(this,arguments);throw Error('Dynamic require of "'+r+'" is not supported')});var $;if(typeof TextEncoder<"u")$={Encoder:TextEncoder,Decoder:TextDecoder};else try{let r=V("util");$={Encoder:r.TextEncoder,Decoder:r.TextDecoder}}catch{throw new Error("Arcsecond requires TextEncoder and TextDecoder to be polyfilled.")}var m=new $.Encoder,T=new $.Decoder,U=(r,e,t)=>{let n=Uint8Array.from({length:e},(o,s)=>t.getUint8(r+s));return T.decode(n)},b=(r,e)=>{let t=e.getUint8(r);if((t&128)>>7){if((t&224)>>5===6)return 2;if((t&240)>>4===14)return 3;if((t&240)>>4===15)return 4}else return 1;return 1},P=(r,e,t)=>{let n=Uint8Array.from({length:e},(i,o)=>t.getUint8(r+o));return T.decode(n)},v=r=>{let e,t=0,n=0;for(;n<r.length;){for(e=r.codePointAt(n);e;)e=e>>8,n++;t++}return t},R=r=>r instanceof Uint8Array||r instanceof Uint8ClampedArray||r instanceof Int8Array||r instanceof Uint16Array||r instanceof Int16Array||r instanceof Uint32Array||r instanceof Int32Array||r instanceof Float32Array||r instanceof Float64Array,d;(function(r){r.STRING="string",r.ARRAY_BUFFER="arrayBuffer",r.TYPED_ARRAY="typedArray",r.DATA_VIEW="dataView"})(d||(d={}));var D=(r,e=null)=>{let t,n;if(typeof r=="string"){let i=m.encode(r);t=new DataView(i.buffer),n=d.STRING}else if(r instanceof ArrayBuffer)t=new DataView(r),n=d.ARRAY_BUFFER;else if(R(r))t=new DataView(r.buffer),n=d.TYPED_ARRAY;else if(r instanceof DataView)t=r,n=d.DATA_VIEW;else throw new Error(`Cannot process input. Must be a string, ArrayBuffer, TypedArray, or DataView. but got ${typeof r}`);return{dataView:t,inputType:n,isError:!1,error:null,result:null,data:e,index:0}},f=(r,e)=>({...r,isError:!0,error:e}),l=(r,e)=>({...r,result:e}),O=(r,e)=>({...r,data:e}),h=(r,e,t)=>({...r,result:e,index:t}),c=class r{constructor(e){this.p=e}run(e){let t=D(e),n=this.p(t);return n.isError?{isError:!0,error:n.error,index:n.index,data:n.data}:{isError:!1,result:n.result,index:n.index,data:n.data}}fork(e,t,n){let i=D(e),o=this.p(i);return o.isError?t(o.error,o):n(o.result,o)}map(e){let t=this.p;return new r(function(i){let o=t(i);return o.isError?o:l(o,e(o.result))})}chain(e){let t=this.p;return new r(function(i){let o=t(i);return o.isError?o:e(o.result).p(o)})}ap(e){let t=this.p;return new r(function(i){if(i.isError)return i;let o=t(i);if(o.isError)return o;let s=e.p(o);return s.isError?s:l(s,s.result(o.result))})}errorMap(e){let t=this.p;return new r(function(i){let o=t(i);return o.isError?f(o,e({isError:!0,error:o.error,index:o.index,data:o.data})):o})}errorChain(e){let t=this.p;return new r(function(i){let o=t(i);if(o.isError){let{error:s,index:a,data:p}=o;return e({isError:!0,error:s,index:a,data:p}).p({...o,isError:!1})}return o})}mapFromData(e){let t=this.p;return new r(n=>{let i=t(n);return i.isError&&i.error?i:l(i,e({isError:!1,result:i.result,data:i.data,index:i.index}))})}chainFromData(e){let t=this.p;return new r(function(i){let o=t(i);return o.isError&&o.error?o:e({result:o.result,data:o.data}).p(o)})}mapData(e){let t=this.p;return new r(function(i){let o=t(i);return O(o,e(o.data))})}static of(e){return new r(t=>l(t,e))}},C=/[0-9]/,B=/^[0-9]+/,W=/[a-zA-Z]/,F=/^[a-zA-Z]+/,q=/^\s+/,H=/ParseError.+Expecting/,X=new c(function(e){return e.isError?e:l(e,e.data)});var rr=c.of;function g(r){if(typeof r!="number"||r<=0)throw new TypeError(`exactly must be called with a number > 0, but got ${r}`);return function(t){return new c(function(i){if(i.isError)return i;let o=[],s=i;for(let a=0;a<r;a++){let p=t.p(s);if(p.isError)return p;s=p,o.push(s.result)}return l(s,o)}).errorMap(({index:n,error:i})=>`ParseError (position ${n}): Expecting ${r}${i.replace(H,"")}`)}}var er=new c(function(e){if(e.isError)return e;let{index:t,dataView:n}=e;if(t<n.byteLength){let i=b(t,n);if(t+i<=n.byteLength){let o=P(t,i,n);return h(e,o,t+i)}}return f(e,`ParseError (position ${t}): Expecting a character, but got end of input.`)}),tr=new c(function(e){if(e.isError)return e;let{index:t,dataView:n}=e;return t<n.byteLength?h(e,n.getUint8(t),t):f(e,`ParseError (position ${t}): Unexpected end of input.`)});function u(r){if(!r||v(r)<1)throw new TypeError(`str must be called with a string with length > 1, but got ${r}`);let e=m.encode(r);return new c(function(n){let{index:i,dataView:o}=n;if(o.byteLength-i<e.byteLength)return f(n,`ParseError (position ${i}): Expecting string '${r}', but got end of input.`);let a=U(i,e.byteLength,o);return r===a?h(n,r,i+m.encode(r).byteLength):f(n,`ParseError (position ${i}): Expecting string '${r}', got '${a}...'`)})}function S(r){let e=Object.prototype.toString.call(r);if(e!=="[object RegExp]")throw new TypeError(`regex must be called with a Regular Expression, but got ${e}`);if(r.toString()[1]!=="^")throw new Error("regex parsers must contain '^' start assertion.");return new c(function(n){if(n.isError)return n;let{dataView:i,index:o}=n,s=U(o,i.byteLength-o,i);if(s.length>=1){let a=s.match(r);return a?h(n,a[0],o+m.encode(a[0]).byteLength):f(n,`ParseError (position ${o}): Expecting string matching '${r}', got '${s.slice(0,5)}...'`)}return f(n,`ParseError (position ${o}): Expecting string matching '${r}', but got end of input.`)})}var E=new c(function(e){if(e.isError)return e;let{dataView:t,index:n}=e;if(t.byteLength>n){let i=b(n,t);if(n+i<=t.byteLength){let o=P(n,i,t);return t.byteLength&&o&&C.test(o)?h(e,o,n+i):f(e,`ParseError (position ${n}): Expecting digit, got '${o}'`)}}return f(e,`ParseError (position ${n}): Expecting digit, but got end of input.`)}),nr=S(B).errorMap(({index:r})=>`ParseError (position ${r}): Expecting digits`),or=new c(function(e){if(e.isError)return e;let{index:t,dataView:n}=e;if(n.byteLength>t){let i=b(t,n);if(t+i<=n.byteLength){let o=P(t,i,n);return n.byteLength&&o&&W.test(o)?h(e,o,t+i):f(e,`ParseError (position ${t}): Expecting letter, got '${o}'`)}}return f(e,`ParseError (position ${t}): Expecting letter, but got end of input.`)}),ir=S(F).errorMap(({index:r})=>`ParseError (position ${r}): Expecting letters`);function A(r){return new c(function(t){if(t.isError)return t;let n=r.length,i=new Array(n),o=t;for(let s=0;s<n;s++){let a=r[s].p(o);if(a.isError)return a;o=a,i[s]=a.result}return l(o,i)})}function y(r){if(r.length===0)throw new Error("List of parsers can't be empty.");return new c(function(t){if(t.isError)return t;let n=null;for(let i of r){let o=i.p(t);if(!o.isError)return o;(n===null||n&&o.index>n.index)&&(n=o)}return n})}function Y(r){return new c(function(t){if(t.isError)return t;let n=r.p(t);return n.isError?l(t,null):n})}var sr=new c(function(e){if(e.isError)return e;let{index:t}=e;return t>0?f(e,`ParseError 'startOfInput' (position ${t}): Expected start of input'`):e}),ar=new c(function(e){if(e.isError)return e;let{dataView:t,index:n,inputType:i}=e;if(n!==t.byteLength){let o=i===d.STRING?String.fromCharCode(t.getUint8(n)):`0x${t.getUint8(n).toString(16).padStart(2,"0")}`;return f(e,`ParseError 'endOfInput' (position ${n}): Expected end of input but got '${o}'`)}return l(e,null)}),N=S(q).errorMap(({index:r})=>`ParseError 'many1' (position ${r}): Expecting to match at least one value`),cr=Y(N).map(r=>r||"");var x=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];function L(r,e,t,n){let i=new Date,o=new Date;if(r==="Tomorrow")o.setDate(o.getDate()+1);else if(r!=="Today"){let s=i.getDay(),a=x.indexOf(r);if(a===-1)throw new Error("Invalid day provided");let p=a-s;p<=0&&(p+=7),o.setDate(o.getDate()+p)}return o.setHours(e),o.setMinutes(t),n==="PM"&&o.getHours()<12&&o.setHours(o.getHours()+12),o}var w=r=>Number(r.join("")),G=A([y([u("Today"),u("Tomorrow"),...x.map(r=>u(r))]),u(", "),g(2)(E).map(w),u(":"),g(2)(E).map(w),u(" "),y([u("AM"),u("PM")])]).map(([r,,e,,t,,n])=>L(r,e,t,n)),z=A([u("Next"),u(" "),y(x.map(u))]).map(([,,r])=>{let t=new Date().getDay(),n=x.indexOf(r),i=L(r,0,0,"PM");return n>t&&i.setDate(i.getDate()+7),i}),_=A([y(x.map(r=>u(r.slice(0,3)))),u(" "),g(2)(E).map(w),u("-"),g(2)(E).map(w),u("-"),g(4)(E).map(w)]).map(([,,r,,e,,t])=>new Date(t,e-1,r)),Z=y([G,z,_]);function I(r){let e=Z.run(r);if(e.isError)throw new Error(e.error);return e.result}function k(r){let e=new Date;if(r.getTime()<e.getTime())return"Any moment now";let t=(r.getMinutes()-e.getMinutes()+60)%24,n=(r.getHours()-e.getHours()+24)%24,i=r.getDate()-e.getDate()+(r.getMonth()-e.getMonth())*30+(r.getFullYear()-e.getFullYear())*365,o=Math.floor(i/7);return o>1?`In ${o} weeks`:i>1?`In ${i} days`:i===1?"Tomorrow":n>0?`In ${n} hours`:t>0?`In ${t} minutes`:"Any moment now"}var M={key:"search_url",defaultUrl:"https://google.com/search?q=%s",get searchUrl(){return localStorage.getItem(this.key)??this.defaultUrl},set searchUrl(r){localStorage.setItem(this.key,r)},promptForSearchUrl(){let r=prompt("Enter search URL (use %s where the search term should go):",this.searchUrl);r&&(this.searchUrl=r,alert("Search URL updated."),location.reload())}};GM_registerMenuCommand("Set search URL",function(){M.promptForSearchUrl()});function Q(){document.querySelectorAll(".SimklTVProfilePosterEpisodeText").forEach(t=>{try{let n=null;t.dataset.date&&(n=new Date(t.dataset.date)),n===null&&(n=I(t.innerText),t.dataset.date=n.toISOString());let i=k(n);t.innerText=i}catch{}});let e=document.querySelector("#bigtext-id1 > h2");if(e){let t=M.searchUrl.replace("%s",e.innerText),n=document.createElement("a");n.href=t;let i=t.match(/https?:\/\/([^/]+)/)?.[1]??"unknown";n.target="_blank",n.rel="noopener noreferrer",n.className="simkl-search-link",n.style.color="white",n.style.fontSize="1.2em",n.innerText=`Search on ${i} for "${e.innerText}"`,e.replaceWith(n)}}setInterval(Q,1e3);
