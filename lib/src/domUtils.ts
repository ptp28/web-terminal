import TerminalUI from "./terminalUI.ts";

export const terminalUI: TerminalUI|null = document.querySelector('terminal-ui');
export const historyContent: HTMLElement = document.getElementById('history')!;
export const userInput: HTMLElement = document.getElementById('user-input-text')!;

export function scrollToBottom() {
    const windowContent = document.getElementById('window-content');
    if (windowContent) {
        windowContent.scrollTo(0, windowContent.scrollHeight);
    }
}