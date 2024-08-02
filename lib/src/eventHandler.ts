import {getCommand, getHelpCommandOutput} from './commandHandler';
import {historyContent, scrollToBottom, terminalUI, userInput} from "./domUtils.ts";

export function setupEventHandlers() {

    window.addEventListener('keydown', (e) => {
        switch (e.key) {
            case "Enter":
                historyContent.innerText += `${terminalUI.getUsername()}@${terminalUI.getHostname()} % ${userInput.innerText}\n`;
                historyContent.innerText += `${handleCommandInput(userInput.innerText)}\n`;
                userInput.innerText = "";
                scrollToBottom();
                break;
            case " ":
                userInput.innerText += " ";
                break;
            case "Backspace":
                userInput.innerText = userInput.innerText.slice(0, -1);
                break;
            default:
                if (e.key.length === 1) {
                    userInput.innerText += e.key;
                }
        }
    });
}



function handleCommandInput(command: string) {
    if (command === "help") {
        return getHelpCommandOutput();
    } else {
        const commandOutput = getCommand(command);
        if (commandOutput) {
            return commandOutput.output;
        } else {
            return `command not found: ${command}`;
        }
    }
}