# DOTENV plus JSON

[![CodeQL](https://github.com/andrusch/vscode-dotenv-plus-json/actions/workflows/codeql-analysis.yml/badge.svg?branch=main)](https://github.com/andrusch/vscode-dotenv-plus-json/actions/workflows/codeql-analysis.yml)

Code heavily based on [JSON :heart: YAML](https://github.com/hilleer/vscode-yaml-plus-json)
Easily convert .ENV to JSON or vice versa. 

Any good ideas or feature requests? Please, do not hesitate to open [a new issue](https://github.com/andrusch/vscode-dotenv-plus-json/issues/new)!

## Features and usage

* **Convert a single file:**
	* Convert a .env file to JSON by right clicking it and selecting `Convert to JSON`.
	* Convert a .env file to JSON by changing file extension to `.json`.
	* Convert a JSON file to .env by right clicking it and selecting `Convert to .env`.
	* Convert a JSON file to .env by changing file extension to `.env`.
* **Convert text selection:**
	* Convert .env selection by using command `Convert selection to JSON` - _does not_ change file extension.
	* Convert JSON selection by using command `Convert selection to .env` - _does not_ change file extension.

After converting one or multiple files a _revert_ prompt will be shown, allowing to revert conversion. Using this will also return .env comments.

## Config

All configurations should can be defined in `dotenv-plus-json`.

| id                    | description                                                                                                               | type    | default   | example    |
|-----------------------|---------------------------------------------------------------------------------------------------------------------------|---------|-----------|------------|
| `convertOnRename`     | Convert DOTENV/JSON files on rename                                                                                         | boolean | `true`    | `false`    |
| `fileExtensions`      | define what filename extension(s) to use when converting file(s)                                                          | object  |           |            |
| `fileExtensions.env` | dotenv filename extension                                                                                                   | string  | `".env"` | `".env"`   |
| `fileExtensions.json` | json filename extension                                                                                                   | string  | `".json"` | `".json"`  |
| `keepOriginalFiles`   | Keep original files when converting. Use `"ask"` to be asked and `always` to always keep                                  | string  |           | `"always"` |

### Keep original files

If you want to keep the original file(s) when converting, you can use the configuration `keepOriginalFiles` to achieve that. The configuration has two different values:

* `ask`: Be asked each time when you convert, if you want to keep original files
* `always`: Always keep original files
