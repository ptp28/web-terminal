(function(l){typeof define=="function"&&define.amd?define(l):l()})(function(){"use strict";const l=()=>`
.titlebar {
  padding: 3px 3px;
  background-color: #f6f6f6;
}

.titlebar-stoplight {
  float: left;
  text-align: left;
}

.titlebar:after,
.titlebar-stoplight:after {
  content: ' ';
  display: table;
  clear: both;
}

.titlebar-stoplight:hover svg,
.titlebar-stoplight:hover svg.fullscreen-svg,
.titlebar-stoplight:hover svg.maximize-svg {
  opacity: 1;
}

.titlebar.alt svg.fullscreen-svg {
  display: none;
}

.titlebar.alt svg.maximize-svg {
  display: block;
}

.titlebar-close,
.titlebar-minimize,
.titlebar-fullscreen {
  float: left;
  width: 11px;
  height: 11px;
  border-radius: 50%;
  margin: 6px 4px;
  line-height: 0;
}

.titlebar-close {
  border: 1px solid #e2463f;
  background-color: #ff5f57;
  margin-left: 6px;
}

.titlebar-close:active {
  border-color: #ad3934;
  background-color: #bf4943;
}

.titlebar-close svg {
  width: 6px;
  height: 6px;
  margin-top: 2px;
  margin-left: 2px;
  opacity: 0;
}

.titlebar-minimize {
  border: 1px solid #e1a116;
  background-color: #ffbd2e;
}

.titlebar-minimize:active {
  border-color: #ad7d15;
  background-color: #bf9123;
}

.titlebar-minimize svg {
  width: 8px;
  height: 8px;
  margin-top: 1px;
  margin-left: 1px;
  opacity: 0;
}

.titlebar-fullscreen,
.titlebar-maximize {
  border: 1px solid #12ac28;
  background-color: #28c940;
}

.titlebar-fullscreen:active {
  border-color: #128622;
  background-color: #1f9a31;
}

.titlebar-fullscreen svg.fullscreen-svg {
  width: 6px;
  height: 6px;
  margin-top: 2px;
  margin-left: 2px;
  opacity: 0;
}

.titlebar-fullscreen svg.maximize-svg {
  width: 8px;
  height: 8px;
  margin-top: 1px;
  margin-left: 1px;
  opacity: 0;
  display: none;
}

.window {
  width: 100%;
  height: 100%;
  border-radius: 7px;
  display: flex;
  flex-direction: column;
  overflow: hidden; /*Needed to show border-radius */
}

.window-content {
  flex: 1;
  background: black;
  color: lightgray;
  overflow: auto;
}

.history {
}

.text-input {
  display: inline-block;
}

.user-name {
  display: inline-block;
  font-family: "Space Mono", monospace;
  font-weight: 700;
  font-style: normal;
}

.blinking-character {
  display: inline-block;
  align-self: baseline;
  background: rgba(255, 255, 255, 1);
  animation: blink 1s step-start 0s infinite;
}

@keyframes blink {
  50% {
    opacity: 0;
  }
}

.keyboard-input {
  border: 0;
  background: transparent;
  color: white;
}
    
`,d=(t,e)=>`
        <style>
            ${l()}
        </style>
        <div id="window-frame" class="window">
            <div class="titlebar">
                <div class="titlebar-stoplight">
                    <div class="titlebar-close">
                        <svg x="0px" y="0px" viewBox="0 0 6.4 6.4">
                            <polygon fill="#4d0000" points="6.4,0.8 5.6,0 3.2,2.4 0.8,0 0,0.8 2.4,3.2 0,5.6 0.8,6.4 3.2,4 5.6,6.4 6.4,5.6 4,3.2"></polygon>
                        </svg>
                    </div>
                    <div class="titlebar-minimize">
                        <svg x="0px" y="0px" viewBox="0 0 8 1.1">
                            <rect fill="#995700" width="8" height="1.1"></rect>
                        </svg>
                    </div>
                    <div class="titlebar-fullscreen">
                        <svg class="fullscreen-svg" x="0px" y="0px" viewBox="0 0 6 5.9">
                            <path fill="#006400" d="M5.4,0h-4L6,4.5V0.6C5.7,0.6,5.3,0.3,5.4,0z"></path>
                            <path fill="#006400" d="M0.6,5.9h4L0,1.4l0,3.9C0.3,5.3,0.6,5.6,0.6,5.9z"></path>
                        </svg>
                        <svg class="maximize-svg" x="0px" y="0px" viewBox="0 0 7.9 7.9">
                            <polygon fill="#006400" points="7.9,4.5 7.9,3.4 4.5,3.4 4.5,0 3.4,0 3.4,3.4 0,3.4 0,4.5 3.4,4.5 3.4,7.9 4.5,7.9 4.5,4.5"></polygon>
                        </svg>
                    </div>
                </div>
            </div>
            <div id="window-content" class="window-content">
                <div id="history" class="history"></div>
                <div class="text-input">
                    <span class="user-name">${t}@${e} %</span>
                    <span id="user-input-text"></span>
                    <div class="blinking-character">&nbsp;</div>
                </div>
            </div>
        </div>
    `;class c extends HTMLElement{constructor(){super();const e=this.attachShadow({mode:"open"});e.innerHTML=d(this.getUsername(),this.getHostname())}getUsername(){return this.getAttribute("username")||"root"}getHostname(){return this.getAttribute("hostname")||window.location.hostname}getUserInputElement(){if(this.shadowRoot)return this.shadowRoot.getElementById("user-input-text")}getHistoryContentElement(){if(this.shadowRoot)return this.shadowRoot.getElementById("history")}}customElements.define("terminal-ui",c);let n=null;function p(t){t?fetch(t).then(e=>e.json()).then(e=>n=e).catch(e=>console.error(`Error reading file. Error: ${e}`)):console.warn("No commands file provided.")}function g(t){return n?n[t]:null}function u(){if(!n)return"";const t=[],e=Object.keys(n).reduce((r,s)=>Math.max(r,s.length),0);console.log(e);for(const r in n){const s=" ".repeat(e-r.length);t.push(`${r}${s}: ${n[r].desc}`)}return t.join(`
`)}const i=document.querySelector("terminal-ui"),a=i==null?void 0:i.getHistoryContentElement(),o=i==null?void 0:i.getUserInputElement();function h(){const t=document.getElementById("window-content");t&&t.scrollTo(0,t.scrollHeight)}function f(){window.addEventListener("keydown",t=>{switch(t.key){case"Enter":a.innerText+=`${i==null?void 0:i.getUsername()}@${i==null?void 0:i.getHostname()} % ${o.innerText}
`,a.innerText+=`${m(o.innerText)}
`,o.innerText="",h();break;case" ":o.innerText+=" ";break;case"Backspace":o.innerText=o.innerText.slice(0,-1);break;default:t.key.length===1&&(o.innerText+=t.key)}})}function m(t){if(t==="help")return u();{const e=g(t);return e?e.output:`command not found: ${t}`}}window.addEventListener("DOMContentLoaded",()=>{i&&(p(i.getAttribute("commands")),f())})});
//# sourceMappingURL=web-terminal.umd.1.0.0.js.map
