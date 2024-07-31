var commandJSON = null;

const terminalDOM = `<div id="window-frame" class="window">
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
            <div id="history" class="history">
            </div>
            <div class="text-input">
                <span class="user-name">ptp@PTPs-MacBook-Pro %</span>
                <span id="user-input-text"></span>
                <div class="blinking-character">&nbsp;</div>
            </div>
        </div>
    </div>`;

class TerminalUI extends HTMLElement {
    connectedCallback() {
        this.innerHTML = terminalDOM;

        const commandsFile = this.getAttribute('commands');
        if(commandsFile) {
            fetch(this.getAttribute('commands'))
                .then((response) => response.json())
                .then((json) => commandJSON = json)
                .catch((error) => console.error(`Error reading file. Error: ${error}`));
        }
        else {
            console.warn(`No commands file provided.`);
        }
    }
}

customElements.define("terminal-ui", TerminalUI);

const windowFrame = document.getElementById('window-frame');
const windowContent = document.getElementById('window-content');
const history = document.getElementById('history');
const userInput = document.getElementById('user-input-text');

window.addEventListener('keydown', function (e) {
    if (e.key === "Enter") {
        history.innerText += `ptp@PTPs-MacBook-Pro % ${userInput.innerText} \n`;
        handleCommandInput(userInput.innerText);
        userInput.innerText = "";
        scrollToBottom();
    } else if (e.key === " ") {
        userInput.innerText += " ";
    } else if (e.key === "Backspace") {
        userInput.innerText = userInput.innerText.substring(0, userInput.innerText.length - 1);
    } else if (e.key.length === 1) {
        userInput.innerText += e.key;
    }
});


function scrollToBottom() {
    windowContent.scrollTo(0, windowContent.scrollHeight);
}

function handleCommandInput(command) {
    if(!commandJSON) {
        return;
    }

    if(command === "help") {
        history.innerText += `${JSON.stringify(commandJSON, null, 2)} \n`;
        return;
    }

    if (commandJSON[command]) {
        history.innerText += commandJSON[command].output + "\n";
    } else {
        history.innerText += `command not found: ${command} \n`;
    }
}