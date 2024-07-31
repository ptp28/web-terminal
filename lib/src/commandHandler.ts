let commandJSON: Record<string, any> | null = null;

export function initializeCommands(commandsFile: string | null) {
    if (commandsFile) {
        fetch(commandsFile)
            .then((response) => response.json())
            .then((json) => commandJSON = json)
            .catch((error) => console.error(`Error reading file. Error: ${error}`));
    } else {
        console.warn(`No commands file provided.`);
    }
}

export function getCommand(command: string) {
    return commandJSON ? commandJSON[command] : null;
}

export function getAllCommands() {
    return commandJSON;
}