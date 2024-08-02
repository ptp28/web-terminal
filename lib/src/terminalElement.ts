import {terminalDOM} from "./terminalUI.ts";

class TerminalElement extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({mode: "open"});
        shadow.innerHTML = terminalDOM(this.getUsername(), this.getHostname());
    }

    getUsername() {
        return this.getAttribute('username') || 'root';
    }

    getHostname() {
        return this.getAttribute('hostname') || window.location.hostname;
    }

    getUserInputElement() {
        if (this.shadowRoot) {
            return this.shadowRoot.getElementById('user-input-text');
        }
    }

    getHistoryContentElement() {
        if(this.shadowRoot) {
            return this.shadowRoot.getElementById('history');
        }
    }
}

customElements.define("terminal-ui", TerminalElement);

export default TerminalElement;