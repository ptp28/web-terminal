# web-terminal

**A reusable web component that renders a macOS terminal with custom commands on the host webpage.**

## Usage

### HTML
Include the script and use the custom web component `<terminal-ui>` in your code to render a macOS-like terminal on your webpage.
Give it attributes like the username and hostname to display on the terminal.
```html
<terminal-ui username="root" hostname="localhost" commands="commands.json"></terminal-ui>
```

### commands.json 
Include a JSON file that defines the list of valid commands and the output to display for each command. Pass the path to this file as an attribute to the web component.
```json
{
  "ls": {
    "desc": "list directory contents",
    "output": "file1 \n file2 \n file3 \n ..."
  },
  "whoami": {
    "desc": "display effective user id",
    "output": "root"
  },
  "cp": {
    "desc": "copy files",
    "output": "www.github.com"
  }
}
```

## Installation

This is a single JavaScript file available to download or fetch over CDN.

Download the latest release [here](bin/web-terminal.latest.js).

```html
<script src="/path/to/file/web-terminal.latest.js"></script>
```

## Examples

A few examples are included in the [examples/](examples/) folder.

## Features

* Set the preferred size/position for the terminal window on your page.
* Can set a custom username to display on the terminal. (Optional, default is `root`)
* Can set a custom hostname to display on the terminal. (Optional, default is `window.location.hostname` )
* Accepts a defined list of commands that it serves.

## Contributing

The project welcomes all constructive contributions. Contributions take many forms,
from code for bug fixes and enhancements, to additions and fixes to documentation, additional
tests, triaging incoming pull requests and issues, and more!