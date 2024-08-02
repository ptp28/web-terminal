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

export function getHelpCommandOutput() {
    if(!commandJSON) {
        return "";
    }

    const helpString: string[] = [];

    const maxCommandLength = Object.keys(commandJSON).reduce((max: number, command: string) => Math.max(max, command.length), 0);

    console.log(maxCommandLength);
    for (const command in commandJSON) {
        const padding = ' '.repeat(maxCommandLength - command.length);
        helpString.push(`${command}${padding}: ${commandJSON[command].desc}`);
    }
    return helpString.join('\n');
}