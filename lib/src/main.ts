import "./terminalUI";
import { initializeCommands } from './commandHandler';
import { setupEventHandlers } from './eventHandler';


window.addEventListener('DOMContentLoaded', () => {

    const TerminalUI = document.querySelector('terminal-ui');
    if (TerminalUI) {
        // Get the file path from the attribute 'commands' and initialize commands list
        initializeCommands(TerminalUI.getAttribute('commands'));
    }

    setupEventHandlers();
});