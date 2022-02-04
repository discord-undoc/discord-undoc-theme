/*!
  Highlight.js v11.4.0 (git: 2d0e7c1094)
  (c) 2006-2022 Ivan Sagalaev and other contributors
  License: BSD-3-Clause
 */
var hljs=function(){"use strict";var e={exports:{}};function t(e){
  return e instanceof Map?e.clear=e.delete=e.set=()=>{
  throw Error("map is read-only")}:e instanceof Set&&(e.add=e.clear=e.delete=()=>{
  throw Error("set is read-only")
  }),Object.freeze(e),Object.getOwnPropertyNames(e).forEach((n=>{var i=e[n]
  ;"object"!=typeof i||Object.isFrozen(i)||t(i)})),e}
  e.exports=t,e.exports.default=t;var n=e.exports;class i{constructor(e){
  void 0===e.data&&(e.data={}),this.data=e.data,this.isMatchIgnored=!1}
  ignoreMatch(){this.isMatchIgnored=!0}}function r(e){
  return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#x27;")
  }function s(e,...t){const n=Object.create(null);for(const t in e)n[t]=e[t]
  ;return t.forEach((e=>{for(const t in e)n[t]=e[t]})),n}const o=e=>!!e.kind
  ;class a{constructor(e,t){
  this.buffer="",this.classPrefix=t.classPrefix,e.walk(this)}addText(e){
  this.buffer+=r(e)}openNode(e){if(!o(e))return;let t=e.kind
  ;t=e.sublanguage?"language-"+t:((e,{prefix:t})=>{if(e.includes(".")){
  const n=e.split(".")
  ;return[`${t}${n.shift()}`,...n.map(((e,t)=>`${e}${"_".repeat(t+1)}`))].join(" ")
  }return`${t}${e}`})(t,{prefix:this.classPrefix}),this.span(t)}closeNode(e){
  o(e)&&(this.buffer+="</span>")}value(){return this.buffer}span(e){
  this.buffer+=`<span class="${e}">`}}class c{constructor(){this.rootNode={
  children:[]},this.stack=[this.rootNode]}get top(){
  return this.stack[this.stack.length-1]}get root(){return this.rootNode}add(e){
  this.top.children.push(e)}openNode(e){const t={kind:e,children:[]}
  ;this.add(t),this.stack.push(t)}closeNode(){
  if(this.stack.length>1)return this.stack.pop()}closeAllNodes(){
  for(;this.closeNode(););}toJSON(){return JSON.stringify(this.rootNode,null,4)}
  walk(e){return this.constructor._walk(e,this.rootNode)}static _walk(e,t){
  return"string"==typeof t?e.addText(t):t.children&&(e.openNode(t),
  t.children.forEach((t=>this._walk(e,t))),e.closeNode(t)),e}static _collapse(e){
  "string"!=typeof e&&e.children&&(e.children.every((e=>"string"==typeof e))?e.children=[e.children.join("")]:e.children.forEach((e=>{
  c._collapse(e)})))}}class l extends c{constructor(e){super(),this.options=e}
  addKeyword(e,t){""!==e&&(this.openNode(t),this.addText(e),this.closeNode())}
  addText(e){""!==e&&this.add(e)}addSublanguage(e,t){const n=e.root
  ;n.kind=t,n.sublanguage=!0,this.add(n)}toHTML(){
  return new a(this,this.options).value()}finalize(){return!0}}function g(e){
  return e?"string"==typeof e?e:e.source:null}function d(e){return f("(?=",e,")")}
  function u(e){return f("(?:",e,")*")}function h(e){return f("(?:",e,")?")}
  function f(...e){return e.map((e=>g(e))).join("")}function p(...e){const t=(e=>{
  const t=e[e.length-1]
  ;return"object"==typeof t&&t.constructor===Object?(e.splice(e.length-1,1),t):{}
  })(e);return"("+(t.capture?"":"?:")+e.map((e=>g(e))).join("|")+")"}
  function b(e){return RegExp(e.toString()+"|").exec("").length-1}
  const m=/\[(?:[^\\\]]|\\.)*\]|\(\??|\\([1-9][0-9]*)|\\./
  ;function E(e,{joinWith:t}){let n=0;return e.map((e=>{n+=1;const t=n
  ;let i=g(e),r="";for(;i.length>0;){const e=m.exec(i);if(!e){r+=i;break}
  r+=i.substring(0,e.index),
  i=i.substring(e.index+e[0].length),"\\"===e[0][0]&&e[1]?r+="\\"+(Number(e[1])+t):(r+=e[0],
  "("===e[0]&&n++)}return r})).map((e=>`(${e})`)).join(t)}
  const x="[a-zA-Z]\\w*",w="[a-zA-Z_]\\w*",y="\\b\\d+(\\.\\d+)?",_="(-?)(\\b0[xX][a-fA-F0-9]+|(\\b\\d+(\\.\\d*)?|\\.\\d+)([eE][-+]?\\d+)?)",v="\\b(0b[01]+)",k={
  begin:"\\\\[\\s\\S]",relevance:0},O={scope:"string",begin:"'",end:"'",
  illegal:"\\n",contains:[k]},N={scope:"string",begin:'"',end:'"',illegal:"\\n",
  contains:[k]},M=(e,t,n={})=>{const i=s({scope:"comment",begin:e,end:t,
  contains:[]},n);i.contains.push({scope:"doctag",
  begin:"[ ]*(?=(TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):)",
  end:/(TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):/,excludeBegin:!0,relevance:0})
  ;const r=p("I","a","is","so","us","to","at","if","in","it","on",/[A-Za-z]+['](d|ve|re|ll|t|s|n)/,/[A-Za-z]+[-][a-z]+/,/[A-Za-z][a-z]{2,}/)
  ;return i.contains.push({begin:f(/[ ]+/,"(",r,/[.]?[:]?([.][ ]|[ ])/,"){3}")}),i
  },S=M("//","$"),R=M("/\\*","\\*/"),j=M("#","$");var A=Object.freeze({
  __proto__:null,MATCH_NOTHING_RE:/\b\B/,IDENT_RE:x,UNDERSCORE_IDENT_RE:w,
  NUMBER_RE:y,C_NUMBER_RE:_,BINARY_NUMBER_RE:v,
  RE_STARTERS_RE:"!|!=|!==|%|%=|&|&&|&=|\\*|\\*=|\\+|\\+=|,|-|-=|/=|/|:|;|<<|<<=|<=|<|===|==|=|>>>=|>>=|>=|>>>|>>|>|\\?|\\[|\\{|\\(|\\^|\\^=|\\||\\|=|\\|\\||~",
  SHEBANG:(e={})=>{const t=/^#![ ]*\//
  ;return e.binary&&(e.begin=f(t,/.*\b/,e.binary,/\b.*/)),s({scope:"meta",begin:t,
  end:/$/,relevance:0,"on:begin":(e,t)=>{0!==e.index&&t.ignoreMatch()}},e)},
  BACKSLASH_ESCAPE:k,APOS_STRING_MODE:O,QUOTE_STRING_MODE:N,PHRASAL_WORDS_MODE:{
  begin:/\b(a|an|the|are|I'm|isn't|don't|doesn't|won't|but|just|should|pretty|simply|enough|gonna|going|wtf|so|such|will|you|your|they|like|more)\b/
  },COMMENT:M,C_LINE_COMMENT_MODE:S,C_BLOCK_COMMENT_MODE:R,HASH_COMMENT_MODE:j,
  NUMBER_MODE:{scope:"number",begin:y,relevance:0},C_NUMBER_MODE:{scope:"number",
  begin:_,relevance:0},BINARY_NUMBER_MODE:{scope:"number",begin:v,relevance:0},
  REGEXP_MODE:{begin:/(?=\/[^/\n]*\/)/,contains:[{scope:"regexp",begin:/\//,
  end:/\/[gimuy]*/,illegal:/\n/,contains:[k,{begin:/\[/,end:/\]/,relevance:0,
  contains:[k]}]}]},TITLE_MODE:{scope:"title",begin:x,relevance:0},
  UNDERSCORE_TITLE_MODE:{scope:"title",begin:w,relevance:0},METHOD_GUARD:{
  begin:"\\.\\s*[a-zA-Z_]\\w*",relevance:0},END_SAME_AS_BEGIN:e=>Object.assign(e,{
  "on:begin":(e,t)=>{t.data._beginMatch=e[1]},"on:end":(e,t)=>{
  t.data._beginMatch!==e[1]&&t.ignoreMatch()}})});function I(e,t){
  "."===e.input[e.index-1]&&t.ignoreMatch()}function T(e,t){
  void 0!==e.className&&(e.scope=e.className,delete e.className)}function L(e,t){
  t&&e.beginKeywords&&(e.begin="\\b("+e.beginKeywords.split(" ").join("|")+")(?!\\.)(?=\\b|\\s)",
  e.__beforeBegin=I,e.keywords=e.keywords||e.beginKeywords,delete e.beginKeywords,
  void 0===e.relevance&&(e.relevance=0))}function B(e,t){
  Array.isArray(e.illegal)&&(e.illegal=p(...e.illegal))}function D(e,t){
  if(e.match){
  if(e.begin||e.end)throw Error("begin & end are not supported with match")
  ;e.begin=e.match,delete e.match}}function H(e,t){
  void 0===e.relevance&&(e.relevance=1)}const P=(e,t)=>{if(!e.beforeMatch)return
  ;if(e.starts)throw Error("beforeMatch cannot be used with starts")
  ;const n=Object.assign({},e);Object.keys(e).forEach((t=>{delete e[t]
  })),e.keywords=n.keywords,e.begin=f(n.beforeMatch,d(n.begin)),e.starts={
  relevance:0,contains:[Object.assign(n,{endsParent:!0})]
  },e.relevance=0,delete n.beforeMatch
  },C=["of","and","for","in","not","or","if","then","parent","list","value"]
  ;function $(e,t,n="keyword"){const i=Object.create(null)
  ;return"string"==typeof e?r(n,e.split(" ")):Array.isArray(e)?r(n,e):Object.keys(e).forEach((n=>{
  Object.assign(i,$(e[n],t,n))})),i;function r(e,n){
  t&&(n=n.map((e=>e.toLowerCase()))),n.forEach((t=>{const n=t.split("|")
  ;i[n[0]]=[e,U(n[0],n[1])]}))}}function U(e,t){
  return t?Number(t):(e=>C.includes(e.toLowerCase()))(e)?0:1}const z={},K=e=>{
  console.error(e)},W=(e,...t)=>{console.log("WARN: "+e,...t)},X=(e,t)=>{
  z[`${e}/${t}`]||(console.log(`Deprecated as of ${e}. ${t}`),z[`${e}/${t}`]=!0)
  },G=Error();function Z(e,t,{key:n}){let i=0;const r=e[n],s={},o={}
  ;for(let e=1;e<=t.length;e++)o[e+i]=r[e],s[e+i]=!0,i+=b(t[e-1])
  ;e[n]=o,e[n]._emit=s,e[n]._multi=!0}function F(e){(e=>{
  e.scope&&"object"==typeof e.scope&&null!==e.scope&&(e.beginScope=e.scope,
  delete e.scope)})(e),"string"==typeof e.beginScope&&(e.beginScope={
  _wrap:e.beginScope}),"string"==typeof e.endScope&&(e.endScope={_wrap:e.endScope
  }),(e=>{if(Array.isArray(e.begin)){
  if(e.skip||e.excludeBegin||e.returnBegin)throw K("skip, excludeBegin, returnBegin not compatible with beginScope: {}"),
  G
  ;if("object"!=typeof e.beginScope||null===e.beginScope)throw K("beginScope must be object"),
  G;Z(e,e.begin,{key:"beginScope"}),e.begin=E(e.begin,{joinWith:""})}})(e),(e=>{
  if(Array.isArray(e.end)){
  if(e.skip||e.excludeEnd||e.returnEnd)throw K("skip, excludeEnd, returnEnd not compatible with endScope: {}"),
  G
  ;if("object"!=typeof e.endScope||null===e.endScope)throw K("endScope must be object"),
  G;Z(e,e.end,{key:"endScope"}),e.end=E(e.end,{joinWith:""})}})(e)}function V(e){
  function t(t,n){
  return RegExp(g(t),"m"+(e.case_insensitive?"i":"")+(e.unicodeRegex?"u":"")+(n?"g":""))
  }class n{constructor(){
  this.matchIndexes={},this.regexes=[],this.matchAt=1,this.position=0}
  addRule(e,t){
  t.position=this.position++,this.matchIndexes[this.matchAt]=t,this.regexes.push([t,e]),
  this.matchAt+=b(e)+1}compile(){0===this.regexes.length&&(this.exec=()=>null)
  ;const e=this.regexes.map((e=>e[1]));this.matcherRe=t(E(e,{joinWith:"|"
  }),!0),this.lastIndex=0}exec(e){this.matcherRe.lastIndex=this.lastIndex
  ;const t=this.matcherRe.exec(e);if(!t)return null
  ;const n=t.findIndex(((e,t)=>t>0&&void 0!==e)),i=this.matchIndexes[n]
  ;return t.splice(0,n),Object.assign(t,i)}}class i{constructor(){
  this.rules=[],this.multiRegexes=[],
  this.count=0,this.lastIndex=0,this.regexIndex=0}getMatcher(e){
  if(this.multiRegexes[e])return this.multiRegexes[e];const t=new n
  ;return this.rules.slice(e).forEach((([e,n])=>t.addRule(e,n))),
  t.compile(),this.multiRegexes[e]=t,t}resumingScanAtSamePosition(){
  return 0!==this.regexIndex}considerAll(){this.regexIndex=0}addRule(e,t){
  this.rules.push([e,t]),"begin"===t.type&&this.count++}exec(e){
  const t=this.getMatcher(this.regexIndex);t.lastIndex=this.lastIndex
  ;let n=t.exec(e)
  ;if(this.resumingScanAtSamePosition())if(n&&n.index===this.lastIndex);else{
  const t=this.getMatcher(0);t.lastIndex=this.lastIndex+1,n=t.exec(e)}
  return n&&(this.regexIndex+=n.position+1,
  this.regexIndex===this.count&&this.considerAll()),n}}
  if(e.compilerExtensions||(e.compilerExtensions=[]),
  e.contains&&e.contains.includes("self"))throw Error("ERR: contains `self` is not supported at the top-level of a language.  See documentation.")
  ;return e.classNameAliases=s(e.classNameAliases||{}),function n(r,o){const a=r
  ;if(r.isCompiled)return a
  ;[T,D,F,P].forEach((e=>e(r,o))),e.compilerExtensions.forEach((e=>e(r,o))),
  r.__beforeBegin=null,[L,B,H].forEach((e=>e(r,o))),r.isCompiled=!0;let c=null
  ;return"object"==typeof r.keywords&&r.keywords.$pattern&&(r.keywords=Object.assign({},r.keywords),
  c=r.keywords.$pattern,
  delete r.keywords.$pattern),c=c||/\w+/,r.keywords&&(r.keywords=$(r.keywords,e.case_insensitive)),
  a.keywordPatternRe=t(c,!0),
  o&&(r.begin||(r.begin=/\B|\b/),a.beginRe=t(a.begin),r.end||r.endsWithParent||(r.end=/\B|\b/),
  r.end&&(a.endRe=t(a.end)),
  a.terminatorEnd=g(a.end)||"",r.endsWithParent&&o.terminatorEnd&&(a.terminatorEnd+=(r.end?"|":"")+o.terminatorEnd)),
  r.illegal&&(a.illegalRe=t(r.illegal)),
  r.contains||(r.contains=[]),r.contains=[].concat(...r.contains.map((e=>(e=>(e.variants&&!e.cachedVariants&&(e.cachedVariants=e.variants.map((t=>s(e,{
  variants:null},t)))),e.cachedVariants?e.cachedVariants:q(e)?s(e,{
  starts:e.starts?s(e.starts):null
  }):Object.isFrozen(e)?s(e):e))("self"===e?r:e)))),r.contains.forEach((e=>{n(e,a)
  })),r.starts&&n(r.starts,o),a.matcher=(e=>{const t=new i
  ;return e.contains.forEach((e=>t.addRule(e.begin,{rule:e,type:"begin"
  }))),e.terminatorEnd&&t.addRule(e.terminatorEnd,{type:"end"
  }),e.illegal&&t.addRule(e.illegal,{type:"illegal"}),t})(a),a}(e)}function q(e){
  return!!e&&(e.endsWithParent||q(e.starts))}class J extends Error{
  constructor(e,t){super(e),this.name="HTMLInjectionError",this.html=t}}
  const Y=r,Q=s,ee=Symbol("nomatch");var te=(e=>{
  const t=Object.create(null),r=Object.create(null),s=[];let o=!0
  ;const a="Could not find the language '{}', did you forget to load/include a language module?",c={
  disableAutodetect:!0,name:"Plain text",contains:[]};let g={
  ignoreUnescapedHTML:!1,throwUnescapedHTML:!1,noHighlightRe:/^(no-?highlight)$/i,
  languageDetectRe:/\blang(?:uage)?-([\w-]+)\b/i,classPrefix:"hljs-",
  cssSelector:"pre code",languages:null,__emitter:l};function b(e){
  return g.noHighlightRe.test(e)}function m(e,t,n){let i="",r=""
  ;"object"==typeof t?(i=e,
  n=t.ignoreIllegals,r=t.language):(X("10.7.0","highlight(lang, code, ...args) has been deprecated."),
  X("10.7.0","Please use highlight(code, options) instead.\nhttps://github.com/highlightjs/highlight.js/issues/2277"),
  r=e,i=t),void 0===n&&(n=!0);const s={code:i,language:r};N("before:highlight",s)
  ;const o=s.result?s.result:E(s.language,s.code,n)
  ;return o.code=s.code,N("after:highlight",o),o}function E(e,n,r,s){
  const c=Object.create(null);function l(){if(!O.keywords)return void M.addText(S)
  ;let e=0;O.keywordPatternRe.lastIndex=0;let t=O.keywordPatternRe.exec(S),n=""
  ;for(;t;){n+=S.substring(e,t.index)
  ;const r=y.case_insensitive?t[0].toLowerCase():t[0],s=(i=r,O.keywords[i]);if(s){
  const[e,i]=s
  ;if(M.addText(n),n="",c[r]=(c[r]||0)+1,c[r]<=7&&(R+=i),e.startsWith("_"))n+=t[0];else{
  const n=y.classNameAliases[e]||e;M.addKeyword(t[0],n)}}else n+=t[0]
  ;e=O.keywordPatternRe.lastIndex,t=O.keywordPatternRe.exec(S)}var i
  ;n+=S.substr(e),M.addText(n)}function d(){null!=O.subLanguage?(()=>{
  if(""===S)return;let e=null;if("string"==typeof O.subLanguage){
  if(!t[O.subLanguage])return void M.addText(S)
  ;e=E(O.subLanguage,S,!0,N[O.subLanguage]),N[O.subLanguage]=e._top
  }else e=x(S,O.subLanguage.length?O.subLanguage:null)
  ;O.relevance>0&&(R+=e.relevance),M.addSublanguage(e._emitter,e.language)
  })():l(),S=""}function u(e,t){let n=1;for(;void 0!==t[n];){if(!e._emit[n]){n++
  ;continue}const i=y.classNameAliases[e[n]]||e[n],r=t[n]
  ;i?M.addKeyword(r,i):(S=r,l(),S=""),n++}}function h(e,t){
  return e.scope&&"string"==typeof e.scope&&M.openNode(y.classNameAliases[e.scope]||e.scope),
  e.beginScope&&(e.beginScope._wrap?(M.addKeyword(S,y.classNameAliases[e.beginScope._wrap]||e.beginScope._wrap),
  S=""):e.beginScope._multi&&(u(e.beginScope,t),S="")),O=Object.create(e,{parent:{
  value:O}}),O}function f(e,t,n){let r=((e,t)=>{const n=e&&e.exec(t)
  ;return n&&0===n.index})(e.endRe,n);if(r){if(e["on:end"]){const n=new i(e)
  ;e["on:end"](t,n),n.isMatchIgnored&&(r=!1)}if(r){
  for(;e.endsParent&&e.parent;)e=e.parent;return e}}
  if(e.endsWithParent)return f(e.parent,t,n)}function p(e){
  return 0===O.matcher.regexIndex?(S+=e[0],1):(I=!0,0)}function b(e){
  const t=e[0],i=n.substr(e.index),r=f(O,e,i);if(!r)return ee;const s=O
  ;O.endScope&&O.endScope._wrap?(d(),
  M.addKeyword(t,O.endScope._wrap)):O.endScope&&O.endScope._multi?(d(),
  u(O.endScope,e)):s.skip?S+=t:(s.returnEnd||s.excludeEnd||(S+=t),
  d(),s.excludeEnd&&(S=t));do{
  O.scope&&M.closeNode(),O.skip||O.subLanguage||(R+=O.relevance),O=O.parent
  }while(O!==r.parent);return r.starts&&h(r.starts,e),s.returnEnd?0:t.length}
  let m={};function w(t,s){const a=s&&s[0];if(S+=t,null==a)return d(),0
  ;if("begin"===m.type&&"end"===s.type&&m.index===s.index&&""===a){
  if(S+=n.slice(s.index,s.index+1),!o){const t=Error(`0 width match regex (${e})`)
  ;throw t.languageName=e,t.badRule=m.rule,t}return 1}
  if(m=s,"begin"===s.type)return(e=>{
  const t=e[0],n=e.rule,r=new i(n),s=[n.__beforeBegin,n["on:begin"]]
  ;for(const n of s)if(n&&(n(e,r),r.isMatchIgnored))return p(t)
  ;return n.skip?S+=t:(n.excludeBegin&&(S+=t),
  d(),n.returnBegin||n.excludeBegin||(S=t)),h(n,e),n.returnBegin?0:t.length})(s)
  ;if("illegal"===s.type&&!r){
  const e=Error('Illegal lexeme "'+a+'" for mode "'+(O.scope||"<unnamed>")+'"')
  ;throw e.mode=O,e}if("end"===s.type){const e=b(s);if(e!==ee)return e}
  if("illegal"===s.type&&""===a)return 1
  ;if(A>1e5&&A>3*s.index)throw Error("potential infinite loop, way more iterations than matches")
  ;return S+=a,a.length}const y=v(e)
  ;if(!y)throw K(a.replace("{}",e)),Error('Unknown language: "'+e+'"')
  ;const _=V(y);let k="",O=s||_;const N={},M=new g.__emitter(g);(()=>{const e=[]
  ;for(let t=O;t!==y;t=t.parent)t.scope&&e.unshift(t.scope)
  ;e.forEach((e=>M.openNode(e)))})();let S="",R=0,j=0,A=0,I=!1;try{
  for(O.matcher.considerAll();;){
  A++,I?I=!1:O.matcher.considerAll(),O.matcher.lastIndex=j
  ;const e=O.matcher.exec(n);if(!e)break;const t=w(n.substring(j,e.index),e)
  ;j=e.index+t}return w(n.substr(j)),M.closeAllNodes(),M.finalize(),k=M.toHTML(),{
  language:e,value:k,relevance:R,illegal:!1,_emitter:M,_top:O}}catch(t){
  if(t.message&&t.message.includes("Illegal"))return{language:e,value:Y(n),
  illegal:!0,relevance:0,_illegalBy:{message:t.message,index:j,
  context:n.slice(j-100,j+100),mode:t.mode,resultSoFar:k},_emitter:M};if(o)return{
  language:e,value:Y(n),illegal:!1,relevance:0,errorRaised:t,_emitter:M,_top:O}
  ;throw t}}function x(e,n){n=n||g.languages||Object.keys(t);const i=(e=>{
  const t={value:Y(e),illegal:!1,relevance:0,_top:c,_emitter:new g.__emitter(g)}
  ;return t._emitter.addText(e),t})(e),r=n.filter(v).filter(O).map((t=>E(t,e,!1)))
  ;r.unshift(i);const s=r.sort(((e,t)=>{
  if(e.relevance!==t.relevance)return t.relevance-e.relevance
  ;if(e.language&&t.language){if(v(e.language).supersetOf===t.language)return 1
  ;if(v(t.language).supersetOf===e.language)return-1}return 0})),[o,a]=s,l=o
  ;return l.secondBest=a,l}function w(e){let t=null;const n=(e=>{
  let t=e.className+" ";t+=e.parentNode?e.parentNode.className:""
  ;const n=g.languageDetectRe.exec(t);if(n){const t=v(n[1])
  ;return t||(W(a.replace("{}",n[1])),
  W("Falling back to no-highlight mode for this block.",e)),t?n[1]:"no-highlight"}
  return t.split(/\s+/).find((e=>b(e)||v(e)))})(e);if(b(n))return
  ;if(N("before:highlightElement",{el:e,language:n
  }),e.children.length>0&&(g.ignoreUnescapedHTML||(console.warn("One of your code blocks includes unescaped HTML. This is a potentially serious security risk."),
  console.warn("https://github.com/highlightjs/highlight.js/wiki/security"),
  console.warn("The element with unescaped HTML:"),
  console.warn(e)),g.throwUnescapedHTML))throw new J("One of your code blocks includes unescaped HTML.",e.innerHTML)
  ;t=e;const i=t.textContent,s=n?m(i,{language:n,ignoreIllegals:!0}):x(i)
  ;e.innerHTML=s.value,((e,t,n)=>{const i=t&&r[t]||n
  ;e.classList.add("hljs"),e.classList.add("language-"+i)
  })(e,n,s.language),e.result={language:s.language,re:s.relevance,
  relevance:s.relevance},s.secondBest&&(e.secondBest={
  language:s.secondBest.language,relevance:s.secondBest.relevance
  }),N("after:highlightElement",{el:e,result:s,text:i})}let y=!1;function _(){
  "loading"!==document.readyState?document.querySelectorAll(g.cssSelector).forEach(w):y=!0
  }function v(e){return e=(e||"").toLowerCase(),t[e]||t[r[e]]}
  function k(e,{languageName:t}){"string"==typeof e&&(e=[e]),e.forEach((e=>{
  r[e.toLowerCase()]=t}))}function O(e){const t=v(e)
  ;return t&&!t.disableAutodetect}function N(e,t){const n=e;s.forEach((e=>{
  e[n]&&e[n](t)}))}
  "undefined"!=typeof window&&window.addEventListener&&window.addEventListener("DOMContentLoaded",(()=>{
  y&&_()}),!1),Object.assign(e,{highlight:m,highlightAuto:x,highlightAll:_,
  highlightElement:w,
  highlightBlock:e=>(X("10.7.0","highlightBlock will be removed entirely in v12.0"),
  X("10.7.0","Please use highlightElement now."),w(e)),configure:e=>{g=Q(g,e)},
  initHighlighting:()=>{
  _(),X("10.6.0","initHighlighting() deprecated.  Use highlightAll() now.")},
  initHighlightingOnLoad:()=>{
  _(),X("10.6.0","initHighlightingOnLoad() deprecated.  Use highlightAll() now.")
  },registerLanguage:(n,i)=>{let r=null;try{r=i(e)}catch(e){
  if(K("Language definition for '{}' could not be registered.".replace("{}",n)),
  !o)throw e;K(e),r=c}
  r.name||(r.name=n),t[n]=r,r.rawDefinition=i.bind(null,e),r.aliases&&k(r.aliases,{
  languageName:n})},unregisterLanguage:e=>{delete t[e]
  ;for(const t of Object.keys(r))r[t]===e&&delete r[t]},
  listLanguages:()=>Object.keys(t),getLanguage:v,registerAliases:k,
  autoDetection:O,inherit:Q,addPlugin:e=>{(e=>{
  e["before:highlightBlock"]&&!e["before:highlightElement"]&&(e["before:highlightElement"]=t=>{
  e["before:highlightBlock"](Object.assign({block:t.el},t))
  }),e["after:highlightBlock"]&&!e["after:highlightElement"]&&(e["after:highlightElement"]=t=>{
  e["after:highlightBlock"](Object.assign({block:t.el},t))})})(e),s.push(e)}
  }),e.debugMode=()=>{o=!1},e.safeMode=()=>{o=!0
  },e.versionString="11.4.0",e.regex={concat:f,lookahead:d,either:p,optional:h,
  anyNumberOfTimes:u};for(const e in A)"object"==typeof A[e]&&n(A[e])
  ;return Object.assign(e,A),e})({});return te}()
  ;"object"==typeof exports&&"undefined"!=typeof module&&(module.exports=hljs);/*! `json` grammar compiled for Highlight.js 11.4.0 */
  (()=>{var e=(()=>{"use strict";return e=>({name:"JSON",contains:[{
  className:"attr",begin:/"(\\.|[^\\"\r\n])*"(?=\s*:)/,relevance:1.01},{
  match:/[{}[\],:]/,className:"punctuation",relevance:0},e.QUOTE_STRING_MODE,{
  beginKeywords:"true false null"
  },e.C_NUMBER_MODE,e.C_LINE_COMMENT_MODE,e.C_BLOCK_COMMENT_MODE],illegal:"\\S"})
  })();hljs.registerLanguage("json",e)})();/*! `diff` grammar compiled for Highlight.js 11.4.0 */
  (()=>{var e=(()=>{"use strict";return e=>{const a=e.regex;return{name:"Diff",
  aliases:["patch"],contains:[{className:"meta",relevance:10,
  match:a.either(/^@@ +-\d+,\d+ +\+\d+,\d+ +@@/,/^\*\*\* +\d+,\d+ +\*\*\*\*$/,/^--- +\d+,\d+ +----$/)
  },{className:"comment",variants:[{
  begin:a.either(/Index: /,/^index/,/={3,}/,/^-{3}/,/^\*{3} /,/^\+{3}/,/^diff --git/),
  end:/$/},{match:/^\*{15}$/}]},{className:"addition",begin:/^\+/,end:/$/},{
  className:"deletion",begin:/^-/,end:/$/},{className:"addition",begin:/^!/,
  end:/$/}]}}})();hljs.registerLanguage("diff",e)})();/*! `typescript` grammar compiled for Highlight.js 11.4.0 */
  (()=>{var e=(()=>{"use strict"
  ;const e="[A-Za-z$_][0-9A-Za-z$_]*",n=["as","in","of","if","for","while","finally","var","new","function","do","return","void","else","break","catch","instanceof","with","throw","case","default","try","switch","continue","typeof","delete","let","yield","const","class","debugger","async","await","static","import","from","export","extends"],a=["true","false","null","undefined","NaN","Infinity"],t=["Object","Function","Boolean","Symbol","Math","Date","Number","BigInt","String","RegExp","Array","Float32Array","Float64Array","Int8Array","Uint8Array","Uint8ClampedArray","Int16Array","Int32Array","Uint16Array","Uint32Array","BigInt64Array","BigUint64Array","Set","Map","WeakSet","WeakMap","ArrayBuffer","SharedArrayBuffer","Atomics","DataView","JSON","Promise","Generator","GeneratorFunction","AsyncFunction","Reflect","Proxy","Intl","WebAssembly"],s=["Error","EvalError","InternalError","RangeError","ReferenceError","SyntaxError","TypeError","URIError"],r=["setInterval","setTimeout","clearInterval","clearTimeout","require","exports","eval","isFinite","isNaN","parseFloat","parseInt","decodeURI","decodeURIComponent","encodeURI","encodeURIComponent","escape","unescape"],c=["arguments","this","super","console","window","document","localStorage","module","global"],i=[].concat(r,t,s)
  ;function o(o){const l=o.regex,d=e,b={begin:/<[A-Za-z0-9\\._:-]+/,
  end:/\/[A-Za-z0-9\\._:-]+>|\/>/,isTrulyOpeningTag:(e,n)=>{
  const a=e[0].length+e.index,t=e.input[a]
  ;if("<"===t||","===t)return void n.ignoreMatch();let s
  ;">"===t&&(((e,{after:n})=>{const a="</"+e[0].slice(1)
  ;return-1!==e.input.indexOf(a,n)})(e,{after:a
  })||n.ignoreMatch()),(s=e.input.substr(a).match(/^\s+extends\s+/))&&0===s.index&&n.ignoreMatch()
  }},g={$pattern:e,keyword:n,literal:a,built_in:i,"variable.language":c
  },u="\\.([0-9](_?[0-9])*)",m="0|[1-9](_?[0-9])*|0[0-7]*[89][0-9]*",E={
  className:"number",variants:[{
  begin:`(\\b(${m})((${u})|\\.)?|(${u}))[eE][+-]?([0-9](_?[0-9])*)\\b`},{
  begin:`\\b(${m})\\b((${u})\\b|\\.)?|(${u})\\b`},{
  begin:"\\b(0|[1-9](_?[0-9])*)n\\b"},{
  begin:"\\b0[xX][0-9a-fA-F](_?[0-9a-fA-F])*n?\\b"},{
  begin:"\\b0[bB][0-1](_?[0-1])*n?\\b"},{begin:"\\b0[oO][0-7](_?[0-7])*n?\\b"},{
  begin:"\\b0[0-7]+n?\\b"}],relevance:0},y={className:"subst",begin:"\\$\\{",
  end:"\\}",keywords:g,contains:[]},A={begin:"html`",end:"",starts:{end:"`",
  returnEnd:!1,contains:[o.BACKSLASH_ESCAPE,y],subLanguage:"xml"}},p={
  begin:"css`",end:"",starts:{end:"`",returnEnd:!1,
  contains:[o.BACKSLASH_ESCAPE,y],subLanguage:"css"}},_={className:"string",
  begin:"`",end:"`",contains:[o.BACKSLASH_ESCAPE,y]},f={className:"comment",
  variants:[o.COMMENT(/\/\*\*(?!\/)/,"\\*/",{relevance:0,contains:[{
  begin:"(?=@[A-Za-z]+)",relevance:0,contains:[{className:"doctag",
  begin:"@[A-Za-z]+"},{className:"type",begin:"\\{",end:"\\}",excludeEnd:!0,
  excludeBegin:!0,relevance:0},{className:"variable",begin:d+"(?=\\s*(-)|$)",
  endsParent:!0,relevance:0},{begin:/(?=[^\n])\s/,relevance:0}]}]
  }),o.C_BLOCK_COMMENT_MODE,o.C_LINE_COMMENT_MODE]
  },N=[o.APOS_STRING_MODE,o.QUOTE_STRING_MODE,A,p,_,E];y.contains=N.concat({
  begin:/\{/,end:/\}/,keywords:g,contains:["self"].concat(N)})
  ;const h=[].concat(f,y.contains),v=h.concat([{begin:/\(/,end:/\)/,keywords:g,
  contains:["self"].concat(h)}]),S={className:"params",begin:/\(/,end:/\)/,
  excludeBegin:!0,excludeEnd:!0,keywords:g,contains:v},w={variants:[{
  match:[/class/,/\s+/,d,/\s+/,/extends/,/\s+/,l.concat(d,"(",l.concat(/\./,d),")*")],
  scope:{1:"keyword",3:"title.class",5:"keyword",7:"title.class.inherited"}},{
  match:[/class/,/\s+/,d],scope:{1:"keyword",3:"title.class"}}]},R={relevance:0,
  match:l.either(/\bJSON/,/\b[A-Z][a-z]+([A-Z][a-z]*|\d)*/,/\b[A-Z]{2,}([A-Z][a-z]+|\d)+([A-Z][a-z]*)*/,/\b[A-Z]{2,}[a-z]+([A-Z][a-z]+|\d)*([A-Z][a-z]*)*/),
  className:"title.class",keywords:{_:[...t,...s]}},x={variants:[{
  match:[/function/,/\s+/,d,/(?=\s*\()/]},{match:[/function/,/\s*(?=\()/]}],
  className:{1:"keyword",3:"title.function"},label:"func.def",contains:[S],
  illegal:/%/},k={
  match:l.concat(/\b/,(O=[...r,"super"],l.concat("(?!",O.join("|"),")")),d,l.lookahead(/\(/)),
  className:"title.function",relevance:0};var O;const I={
  begin:l.concat(/\./,l.lookahead(l.concat(d,/(?![0-9A-Za-z$_(])/))),end:d,
  excludeBegin:!0,keywords:"prototype",className:"property",relevance:0},C={
  match:[/get|set/,/\s+/,d,/(?=\()/],className:{1:"keyword",3:"title.function"},
  contains:[{begin:/\(\)/},S]
  },T="(\\([^()]*(\\([^()]*(\\([^()]*\\)[^()]*)*\\)[^()]*)*\\)|"+o.UNDERSCORE_IDENT_RE+")\\s*=>",M={
  match:[/const|var|let/,/\s+/,d,/\s*/,/=\s*/,/(async\s*)?/,l.lookahead(T)],
  keywords:"async",className:{1:"keyword",3:"title.function"},contains:[S]}
  ;return{name:"Javascript",aliases:["js","jsx","mjs","cjs"],keywords:g,exports:{
  PARAMS_CONTAINS:v,CLASS_REFERENCE:R},illegal:/#(?![$_A-z])/,
  contains:[o.SHEBANG({label:"shebang",binary:"node",relevance:5}),{
  label:"use_strict",className:"meta",relevance:10,
  begin:/^\s*['"]use (strict|asm)['"]/
  },o.APOS_STRING_MODE,o.QUOTE_STRING_MODE,A,p,_,f,E,R,{className:"attr",
  begin:d+l.lookahead(":"),relevance:0},M,{
  begin:"("+o.RE_STARTERS_RE+"|\\b(case|return|throw)\\b)\\s*",
  keywords:"return throw case",relevance:0,contains:[f,o.REGEXP_MODE,{
  className:"function",begin:T,returnBegin:!0,end:"\\s*=>",contains:[{
  className:"params",variants:[{begin:o.UNDERSCORE_IDENT_RE,relevance:0},{
  className:null,begin:/\(\s*\)/,skip:!0},{begin:/\(/,end:/\)/,excludeBegin:!0,
  excludeEnd:!0,keywords:g,contains:v}]}]},{begin:/,/,relevance:0},{match:/\s+/,
  relevance:0},{variants:[{begin:"<>",end:"</>"},{
  match:/<[A-Za-z0-9\\._:-]+\s*\/>/},{begin:b.begin,
  "on:begin":b.isTrulyOpeningTag,end:b.end}],subLanguage:"xml",contains:[{
  begin:b.begin,end:b.end,skip:!0,contains:["self"]}]}]},x,{
  beginKeywords:"while if switch catch for"},{
  begin:"\\b(?!function)"+o.UNDERSCORE_IDENT_RE+"\\([^()]*(\\([^()]*(\\([^()]*\\)[^()]*)*\\)[^()]*)*\\)\\s*\\{",
  returnBegin:!0,label:"func.def",contains:[S,o.inherit(o.TITLE_MODE,{begin:d,
  className:"title.function"})]},{match:/\.\.\./,relevance:0},I,{match:"\\$"+d,
  relevance:0},{match:[/\bconstructor(?=\s*\()/],className:{1:"title.function"},
  contains:[S]},k,{relevance:0,match:/\b[A-Z][A-Z_0-9]+\b/,
  className:"variable.constant"},w,C,{match:/\$[(.]/}]}}return t=>{
  const s=o(t),r=["any","void","number","boolean","string","object","never","enum"],l={
  beginKeywords:"namespace",end:/\{/,excludeEnd:!0,
  contains:[s.exports.CLASS_REFERENCE]},d={beginKeywords:"interface",end:/\{/,
  excludeEnd:!0,keywords:{keyword:"interface extends",built_in:r},
  contains:[s.exports.CLASS_REFERENCE]},b={$pattern:e,
  keyword:n.concat(["type","namespace","typedef","interface","public","private","protected","implements","declare","abstract","readonly"]),
  literal:a,built_in:i.concat(r),"variable.language":c},g={className:"meta",
  begin:"@[A-Za-z$_][0-9A-Za-z$_]*"},u=(e,n,a)=>{
  const t=e.contains.findIndex((e=>e.label===n))
  ;if(-1===t)throw Error("can not find mode to replace");e.contains.splice(t,1,a)}
  ;return Object.assign(s.keywords,b),
  s.exports.PARAMS_CONTAINS.push(g),s.contains=s.contains.concat([g,l,d]),
  u(s,"shebang",t.SHEBANG()),u(s,"use_strict",{className:"meta",relevance:10,
  begin:/^\s*['"]use strict['"]/
  }),s.contains.find((e=>"func.def"===e.label)).relevance=0,Object.assign(s,{
  name:"TypeScript",aliases:["ts","tsx"]}),s}})()
  ;hljs.registerLanguage("typescript",e)})();/*! `python` grammar compiled for Highlight.js 11.4.0 */
  (()=>{var e=(()=>{"use strict";return e=>{
  const n=e.regex,a=/[\p{XID_Start}_]\p{XID_Continue}*/u,i=["and","as","assert","async","await","break","class","continue","def","del","elif","else","except","finally","for","from","global","if","import","in","is","lambda","nonlocal|10","not","or","pass","raise","return","try","while","with","yield"],s={
  $pattern:/[A-Za-z]\w+|__\w+__/,keyword:i,
  built_in:["__import__","abs","all","any","ascii","bin","bool","breakpoint","bytearray","bytes","callable","chr","classmethod","compile","complex","delattr","dict","dir","divmod","enumerate","eval","exec","filter","float","format","frozenset","getattr","globals","hasattr","hash","help","hex","id","input","int","isinstance","issubclass","iter","len","list","locals","map","max","memoryview","min","next","object","oct","open","ord","pow","print","property","range","repr","reversed","round","set","setattr","slice","sorted","staticmethod","str","sum","super","tuple","type","vars","zip"],
  literal:["__debug__","Ellipsis","False","None","NotImplemented","True"],
  type:["Any","Callable","Coroutine","Dict","List","Literal","Generic","Optional","Sequence","Set","Tuple","Type","Union"]
  },t={className:"meta",begin:/^(>>>|\.\.\.) /},r={className:"subst",begin:/\{/,
  end:/\}/,keywords:s,illegal:/#/},l={begin:/\{\{/,relevance:0},b={
  className:"string",contains:[e.BACKSLASH_ESCAPE],variants:[{
  begin:/([uU]|[bB]|[rR]|[bB][rR]|[rR][bB])?'''/,end:/'''/,
  contains:[e.BACKSLASH_ESCAPE,t],relevance:10},{
  begin:/([uU]|[bB]|[rR]|[bB][rR]|[rR][bB])?"""/,end:/"""/,
  contains:[e.BACKSLASH_ESCAPE,t],relevance:10},{
  begin:/([fF][rR]|[rR][fF]|[fF])'''/,end:/'''/,
  contains:[e.BACKSLASH_ESCAPE,t,l,r]},{begin:/([fF][rR]|[rR][fF]|[fF])"""/,
  end:/"""/,contains:[e.BACKSLASH_ESCAPE,t,l,r]},{begin:/([uU]|[rR])'/,end:/'/,
  relevance:10},{begin:/([uU]|[rR])"/,end:/"/,relevance:10},{
  begin:/([bB]|[bB][rR]|[rR][bB])'/,end:/'/},{begin:/([bB]|[bB][rR]|[rR][bB])"/,
  end:/"/},{begin:/([fF][rR]|[rR][fF]|[fF])'/,end:/'/,
  contains:[e.BACKSLASH_ESCAPE,l,r]},{begin:/([fF][rR]|[rR][fF]|[fF])"/,end:/"/,
  contains:[e.BACKSLASH_ESCAPE,l,r]},e.APOS_STRING_MODE,e.QUOTE_STRING_MODE]
  },o="[0-9](_?[0-9])*",c=`(\\b(${o}))?\\.(${o})|\\b(${o})\\.`,d="\\b|"+i.join("|"),g={
  className:"number",relevance:0,variants:[{
  begin:`(\\b(${o})|(${c}))[eE][+-]?(${o})[jJ]?(?=${d})`},{begin:`(${c})[jJ]?`},{
  begin:`\\b([1-9](_?[0-9])*|0+(_?0)*)[lLjJ]?(?=${d})`},{
  begin:`\\b0[bB](_?[01])+[lL]?(?=${d})`},{begin:`\\b0[oO](_?[0-7])+[lL]?(?=${d})`
  },{begin:`\\b0[xX](_?[0-9a-fA-F])+[lL]?(?=${d})`},{begin:`\\b(${o})[jJ](?=${d})`
  }]},p={className:"comment",begin:n.lookahead(/# type:/),end:/$/,keywords:s,
  contains:[{begin:/# type:/},{begin:/#/,end:/\b\B/,endsWithParent:!0}]},m={
  className:"params",variants:[{className:"",begin:/\(\s*\)/,skip:!0},{begin:/\(/,
  end:/\)/,excludeBegin:!0,excludeEnd:!0,keywords:s,
  contains:["self",t,g,b,e.HASH_COMMENT_MODE]}]};return r.contains=[b,g,t],{
  name:"Python",aliases:["py","gyp","ipython"],unicodeRegex:!0,keywords:s,
  illegal:/(<\/|->|\?)|=>/,contains:[t,g,{begin:/\bself\b/},{beginKeywords:"if",
  relevance:0},b,p,e.HASH_COMMENT_MODE,{match:[/\bdef/,/\s+/,a],scope:{
  1:"keyword",3:"title.function"},contains:[m]},{variants:[{
  match:[/\bclass/,/\s+/,a,/\s*/,/\(\s*/,a,/\s*\)/]},{match:[/\bclass/,/\s+/,a]}],
  scope:{1:"keyword",3:"title.class",6:"title.class.inherited"}},{
  className:"meta",begin:/^[\t ]*@/,end:/(?=#)|$/,contains:[g,m,b]}]}}})()
  ;hljs.registerLanguage("python",e)})();/*! `plaintext` grammar compiled for Highlight.js 11.4.0 */
  (()=>{var t=(()=>{"use strict";return t=>({name:"Plain text",
  aliases:["text","txt"],disableAutodetect:!0})})()
  ;hljs.registerLanguage("plaintext",t)})();/*! `python-repl` grammar compiled for Highlight.js 11.4.0 */
  (()=>{var a=(()=>{"use strict";return a=>({aliases:["pycon"],contains:[{
  className:"meta",starts:{end:/ |$/,starts:{end:"$",subLanguage:"python"}},
  variants:[{begin:/^>>>(?=[ ]|$)/},{begin:/^\.\.\.(?=[ ]|$)/}]}]})})()
  ;hljs.registerLanguage("python-repl",a)})();/*! `xml` grammar compiled for Highlight.js 11.4.0 */
  (()=>{var e=(()=>{"use strict";return e=>{
  const a=e.regex,n=a.concat(/[A-Z_]/,a.optional(/[A-Z0-9_.-]*:/),/[A-Z0-9_.-]*/),s={
  className:"symbol",begin:/&[a-z]+;|&#[0-9]+;|&#x[a-f0-9]+;/},t={begin:/\s/,
  contains:[{className:"keyword",begin:/#?[a-z_][a-z1-9_-]+/,illegal:/\n/}]
  },i=e.inherit(t,{begin:/\(/,end:/\)/}),c=e.inherit(e.APOS_STRING_MODE,{
  className:"string"}),l=e.inherit(e.QUOTE_STRING_MODE,{className:"string"}),r={
  endsWithParent:!0,illegal:/</,relevance:0,contains:[{className:"attr",
  begin:/[A-Za-z0-9._:-]+/,relevance:0},{begin:/=\s*/,relevance:0,contains:[{
  className:"string",endsParent:!0,variants:[{begin:/"/,end:/"/,contains:[s]},{
  begin:/'/,end:/'/,contains:[s]},{begin:/[^\s"'=<>`]+/}]}]}]};return{
  name:"HTML, XML",
  aliases:["html","xhtml","rss","atom","xjb","xsd","xsl","plist","wsf","svg"],
  case_insensitive:!0,contains:[{className:"meta",begin:/<![a-z]/,end:/>/,
  relevance:10,contains:[t,l,c,i,{begin:/\[/,end:/\]/,contains:[{className:"meta",
  begin:/<![a-z]/,end:/>/,contains:[t,i,l,c]}]}]},e.COMMENT(/<!--/,/-->/,{
  relevance:10}),{begin:/<!\[CDATA\[/,end:/\]\]>/,relevance:10},s,{
  className:"meta",begin:/<\?xml/,end:/\?>/,relevance:10},{className:"tag",
  begin:/<style(?=\s|>)/,end:/>/,keywords:{name:"style"},contains:[r],starts:{
  end:/<\/style>/,returnEnd:!0,subLanguage:["css","xml"]}},{className:"tag",
  begin:/<script(?=\s|>)/,end:/>/,keywords:{name:"script"},contains:[r],starts:{
  end:/<\/script>/,returnEnd:!0,subLanguage:["javascript","handlebars","xml"]}},{
  className:"tag",begin:/<>|<\/>/},{className:"tag",
  begin:a.concat(/</,a.lookahead(a.concat(n,a.either(/\/>/,/>/,/\s/)))),
  end:/\/?>/,contains:[{className:"name",begin:n,relevance:0,starts:r}]},{
  className:"tag",begin:a.concat(/<\//,a.lookahead(a.concat(n,/>/))),contains:[{
  className:"name",begin:n,relevance:0},{begin:/>/,relevance:0,endsParent:!0}]}]}}
  })();hljs.registerLanguage("xml",e)})();/*! `markdown` grammar compiled for Highlight.js 11.4.0 */
  (()=>{var e=(()=>{"use strict";return e=>{const n={begin:/<\/?[A-Za-z_]/,
  end:">",subLanguage:"xml",relevance:0},a={variants:[{begin:/\[.+?\]\[.*?\]/,
  relevance:0},{
  begin:/\[.+?\]\(((data|javascript|mailto):|(?:http|ftp)s?:\/\/).*?\)/,
  relevance:2},{
  begin:e.regex.concat(/\[.+?\]\(/,/[A-Za-z][A-Za-z0-9+.-]*/,/:\/\/.*?\)/),
  relevance:2},{begin:/\[.+?\]\([./?&#].*?\)/,relevance:1},{
  begin:/\[.*?\]\(.*?\)/,relevance:0}],returnBegin:!0,contains:[{match:/\[(?=\])/
  },{className:"string",relevance:0,begin:"\\[",end:"\\]",excludeBegin:!0,
  returnEnd:!0},{className:"link",relevance:0,begin:"\\]\\(",end:"\\)",
  excludeBegin:!0,excludeEnd:!0},{className:"symbol",relevance:0,begin:"\\]\\[",
  end:"\\]",excludeBegin:!0,excludeEnd:!0}]},i={className:"strong",contains:[],
  variants:[{begin:/_{2}/,end:/_{2}/},{begin:/\*{2}/,end:/\*{2}/}]},s={
  className:"emphasis",contains:[],variants:[{begin:/\*(?!\*)/,end:/\*/},{
  begin:/_(?!_)/,end:/_/,relevance:0}]};i.contains.push(s),s.contains.push(i)
  ;let c=[n,a]
  ;return i.contains=i.contains.concat(c),s.contains=s.contains.concat(c),
  c=c.concat(i,s),{name:"Markdown",aliases:["md","mkdown","mkd"],contains:[{
  className:"section",variants:[{begin:"^#{1,6}",end:"$",contains:c},{
  begin:"(?=^.+?\\n[=-]{2,}$)",contains:[{begin:"^[=-]*$"},{begin:"^",end:"\\n",
  contains:c}]}]},n,{className:"bullet",begin:"^[ \t]*([*+-]|(\\d+\\.))(?=\\s+)",
  end:"\\s+",excludeEnd:!0},i,s,{className:"quote",begin:"^>\\s+",contains:c,
  end:"$"},{className:"code",variants:[{begin:"(`{3,})[^`](.|\\n)*?\\1`*[ ]*"},{
  begin:"(~{3,})[^~](.|\\n)*?\\1~*[ ]*"},{begin:"```",end:"```+[ ]*$"},{
  begin:"~~~",end:"~~~+[ ]*$"},{begin:"`.+?`"},{begin:"(?=^( {4}|\\t))",
  contains:[{begin:"^( {4}|\\t)",end:"(\\n)$"}],relevance:0}]},{
  begin:"^[-\\*]{3,}",end:"$"},a,{begin:/^\[[^\n]+\]:/,returnBegin:!0,contains:[{
  className:"symbol",begin:/\[/,end:/\]/,excludeBegin:!0,excludeEnd:!0},{
  className:"link",begin:/:\s*/,end:/$/,excludeBegin:!0}]}]}}})()
  ;hljs.registerLanguage("markdown",e)})();/*! `javascript` grammar compiled for Highlight.js 11.4.0 */
  (()=>{var e=(()=>{"use strict"
  ;const e="[A-Za-z$_][0-9A-Za-z$_]*",n=["as","in","of","if","for","while","finally","var","new","function","do","return","void","else","break","catch","instanceof","with","throw","case","default","try","switch","continue","typeof","delete","let","yield","const","class","debugger","async","await","static","import","from","export","extends"],a=["true","false","null","undefined","NaN","Infinity"],t=["Object","Function","Boolean","Symbol","Math","Date","Number","BigInt","String","RegExp","Array","Float32Array","Float64Array","Int8Array","Uint8Array","Uint8ClampedArray","Int16Array","Int32Array","Uint16Array","Uint32Array","BigInt64Array","BigUint64Array","Set","Map","WeakSet","WeakMap","ArrayBuffer","SharedArrayBuffer","Atomics","DataView","JSON","Promise","Generator","GeneratorFunction","AsyncFunction","Reflect","Proxy","Intl","WebAssembly"],s=["Error","EvalError","InternalError","RangeError","ReferenceError","SyntaxError","TypeError","URIError"],r=["setInterval","setTimeout","clearInterval","clearTimeout","require","exports","eval","isFinite","isNaN","parseFloat","parseInt","decodeURI","decodeURIComponent","encodeURI","encodeURIComponent","escape","unescape"],c=["arguments","this","super","console","window","document","localStorage","module","global"],i=[].concat(r,t,s)
  ;return o=>{const l=o.regex,b=e,d={begin:/<[A-Za-z0-9\\._:-]+/,
  end:/\/[A-Za-z0-9\\._:-]+>|\/>/,isTrulyOpeningTag:(e,n)=>{
  const a=e[0].length+e.index,t=e.input[a]
  ;if("<"===t||","===t)return void n.ignoreMatch();let s
  ;">"===t&&(((e,{after:n})=>{const a="</"+e[0].slice(1)
  ;return-1!==e.input.indexOf(a,n)})(e,{after:a
  })||n.ignoreMatch()),(s=e.input.substr(a).match(/^\s+extends\s+/))&&0===s.index&&n.ignoreMatch()
  }},g={$pattern:e,keyword:n,literal:a,built_in:i,"variable.language":c
  },u="\\.([0-9](_?[0-9])*)",m="0|[1-9](_?[0-9])*|0[0-7]*[89][0-9]*",E={
  className:"number",variants:[{
  begin:`(\\b(${m})((${u})|\\.)?|(${u}))[eE][+-]?([0-9](_?[0-9])*)\\b`},{
  begin:`\\b(${m})\\b((${u})\\b|\\.)?|(${u})\\b`},{
  begin:"\\b(0|[1-9](_?[0-9])*)n\\b"},{
  begin:"\\b0[xX][0-9a-fA-F](_?[0-9a-fA-F])*n?\\b"},{
  begin:"\\b0[bB][0-1](_?[0-1])*n?\\b"},{begin:"\\b0[oO][0-7](_?[0-7])*n?\\b"},{
  begin:"\\b0[0-7]+n?\\b"}],relevance:0},A={className:"subst",begin:"\\$\\{",
  end:"\\}",keywords:g,contains:[]},y={begin:"html`",end:"",starts:{end:"`",
  returnEnd:!1,contains:[o.BACKSLASH_ESCAPE,A],subLanguage:"xml"}},N={
  begin:"css`",end:"",starts:{end:"`",returnEnd:!1,
  contains:[o.BACKSLASH_ESCAPE,A],subLanguage:"css"}},_={className:"string",
  begin:"`",end:"`",contains:[o.BACKSLASH_ESCAPE,A]},f={className:"comment",
  variants:[o.COMMENT(/\/\*\*(?!\/)/,"\\*/",{relevance:0,contains:[{
  begin:"(?=@[A-Za-z]+)",relevance:0,contains:[{className:"doctag",
  begin:"@[A-Za-z]+"},{className:"type",begin:"\\{",end:"\\}",excludeEnd:!0,
  excludeBegin:!0,relevance:0},{className:"variable",begin:b+"(?=\\s*(-)|$)",
  endsParent:!0,relevance:0},{begin:/(?=[^\n])\s/,relevance:0}]}]
  }),o.C_BLOCK_COMMENT_MODE,o.C_LINE_COMMENT_MODE]
  },h=[o.APOS_STRING_MODE,o.QUOTE_STRING_MODE,y,N,_,E];A.contains=h.concat({
  begin:/\{/,end:/\}/,keywords:g,contains:["self"].concat(h)})
  ;const v=[].concat(f,A.contains),p=v.concat([{begin:/\(/,end:/\)/,keywords:g,
  contains:["self"].concat(v)}]),S={className:"params",begin:/\(/,end:/\)/,
  excludeBegin:!0,excludeEnd:!0,keywords:g,contains:p},w={variants:[{
  match:[/class/,/\s+/,b,/\s+/,/extends/,/\s+/,l.concat(b,"(",l.concat(/\./,b),")*")],
  scope:{1:"keyword",3:"title.class",5:"keyword",7:"title.class.inherited"}},{
  match:[/class/,/\s+/,b],scope:{1:"keyword",3:"title.class"}}]},R={relevance:0,
  match:l.either(/\bJSON/,/\b[A-Z][a-z]+([A-Z][a-z]*|\d)*/,/\b[A-Z]{2,}([A-Z][a-z]+|\d)+([A-Z][a-z]*)*/,/\b[A-Z]{2,}[a-z]+([A-Z][a-z]+|\d)*([A-Z][a-z]*)*/),
  className:"title.class",keywords:{_:[...t,...s]}},O={variants:[{
  match:[/function/,/\s+/,b,/(?=\s*\()/]},{match:[/function/,/\s*(?=\()/]}],
  className:{1:"keyword",3:"title.function"},label:"func.def",contains:[S],
  illegal:/%/},k={
  match:l.concat(/\b/,(I=[...r,"super"],l.concat("(?!",I.join("|"),")")),b,l.lookahead(/\(/)),
  className:"title.function",relevance:0};var I;const x={
  begin:l.concat(/\./,l.lookahead(l.concat(b,/(?![0-9A-Za-z$_(])/))),end:b,
  excludeBegin:!0,keywords:"prototype",className:"property",relevance:0},T={
  match:[/get|set/,/\s+/,b,/(?=\()/],className:{1:"keyword",3:"title.function"},
  contains:[{begin:/\(\)/},S]
  },C="(\\([^()]*(\\([^()]*(\\([^()]*\\)[^()]*)*\\)[^()]*)*\\)|"+o.UNDERSCORE_IDENT_RE+")\\s*=>",M={
  match:[/const|var|let/,/\s+/,b,/\s*/,/=\s*/,/(async\s*)?/,l.lookahead(C)],
  keywords:"async",className:{1:"keyword",3:"title.function"},contains:[S]}
  ;return{name:"Javascript",aliases:["js","jsx","mjs","cjs"],keywords:g,exports:{
  PARAMS_CONTAINS:p,CLASS_REFERENCE:R},illegal:/#(?![$_A-z])/,
  contains:[o.SHEBANG({label:"shebang",binary:"node",relevance:5}),{
  label:"use_strict",className:"meta",relevance:10,
  begin:/^\s*['"]use (strict|asm)['"]/
  },o.APOS_STRING_MODE,o.QUOTE_STRING_MODE,y,N,_,f,E,R,{className:"attr",
  begin:b+l.lookahead(":"),relevance:0},M,{
  begin:"("+o.RE_STARTERS_RE+"|\\b(case|return|throw)\\b)\\s*",
  keywords:"return throw case",relevance:0,contains:[f,o.REGEXP_MODE,{
  className:"function",begin:C,returnBegin:!0,end:"\\s*=>",contains:[{
  className:"params",variants:[{begin:o.UNDERSCORE_IDENT_RE,relevance:0},{
  className:null,begin:/\(\s*\)/,skip:!0},{begin:/\(/,end:/\)/,excludeBegin:!0,
  excludeEnd:!0,keywords:g,contains:p}]}]},{begin:/,/,relevance:0},{match:/\s+/,
  relevance:0},{variants:[{begin:"<>",end:"</>"},{
  match:/<[A-Za-z0-9\\._:-]+\s*\/>/},{begin:d.begin,
  "on:begin":d.isTrulyOpeningTag,end:d.end}],subLanguage:"xml",contains:[{
  begin:d.begin,end:d.end,skip:!0,contains:["self"]}]}]},O,{
  beginKeywords:"while if switch catch for"},{
  begin:"\\b(?!function)"+o.UNDERSCORE_IDENT_RE+"\\([^()]*(\\([^()]*(\\([^()]*\\)[^()]*)*\\)[^()]*)*\\)\\s*\\{",
  returnBegin:!0,label:"func.def",contains:[S,o.inherit(o.TITLE_MODE,{begin:b,
  className:"title.function"})]},{match:/\.\.\./,relevance:0},x,{match:"\\$"+b,
  relevance:0},{match:[/\bconstructor(?=\s*\()/],className:{1:"title.function"},
  contains:[S]},k,{relevance:0,match:/\b[A-Z][A-Z_0-9]+\b/,
  className:"variable.constant"},w,T,{match:/\$[(.]/}]}}})()
  ;hljs.registerLanguage("javascript",e)})();