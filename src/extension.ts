import * as vscode from 'vscode';

import { onRename } from './onRename';
import { onRightClickAndConvertJsonFile, onRightClickAndConvertDotEnvFile } from './onRightClickAndConvertFile';
import { onConvertSelection } from './onConvertSelection';
import { ConvertFromType } from './converter';

export function activate(context: vscode.ExtensionContext) {
	context.subscriptions.push(
		vscode.commands.registerCommand('extension.rightClickJson', onRightClickAndConvertJsonFile),
		vscode.commands.registerCommand('extension.rightClickDotEnv', onRightClickAndConvertDotEnvFile),
		vscode.commands.registerCommand('extension.dotEnvSelectionToJson', onConvertSelection(ConvertFromType.DotEnv)),
		vscode.commands.registerCommand('extension.jsonSelectionToDotEnv', onConvertSelection(ConvertFromType.Json)),
	);

	vscode.workspace.onDidRenameFiles(onRename);
}