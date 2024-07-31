import { getCommand, getAllCommands } from './commandHandler';
import {historyContent, scrollToBottom, userInput} from "./domUtils.ts";

export function setupEventHandlers() {

    window.addEventListener('keydown', (e) => {
        switch (e.key) {
            case "Enter":
                historyContent.innerText += `ptp@PTPs-MacBook-Pro % ${userInput.innerText}\n`;
                historyContent.innerText += handleCommandInput(userInput.innerText);
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
        return `${JSON.stringify(getAllCommands(), null, 2)}\n`;
    } else {
        const commandOutput = getCommand(command);
        if (commandOutput) {
            return `${commandOutput.output}\n`;
        } else {
            return `command not found: ${command}\n`;
        }
    }
}