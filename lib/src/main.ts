import "./terminalUI";
import {initializeCommands} from './commandHandler';
import {setupEventHandlers} from './eventHandler';
import {terminalUI} from "./domUtils.ts";


window.addEventListener('DOMContentLoaded', () => {

    // Get the file path from the attribute 'commands' and initialize commands list
    if(terminalUI) {
        initializeCommands(terminalUI.getAttribute('commands'));
        setupEventHandlers();
    }
});