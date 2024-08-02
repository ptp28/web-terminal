import TerminalElement from "./terminalElement.ts";

export const terminalUI: TerminalElement|null = document.querySelector('terminal-ui');
export const historyContent: HTMLElement = terminalUI?.getHistoryContentElement()!;
export const userInput: HTMLElement = terminalUI?.getUserInputElement()!;


export function scrollToBottom() {
    const windowContent = document.getElementById('window-content');
    if (windowContent) {
        windowContent.scrollTo(0, windowContent.scrollHeight);
    }
}