import * as vscode from 'vscode';
import { ConfigId, getConfig } from './config';

import { showError, getDotEnvFromJson, getJsonFromDotEnv } from './helpers';

export function onRename(e: vscode.FileRenameEvent) {
	const shouldConvertOnRename = getConfig<boolean>(ConfigId.ConvertOnRename);

	if (!shouldConvertOnRename) {
		return;
	}

	e.files.forEach(async (change) => {
		const { oldUri, newUri } = change;

		const oldPath = oldUri.path;
		const newPath = newUri.path;

		const shouldConvertJson = oldPath.endsWith('.json') && newPath.endsWith('.env');
		const shouldConvertDotEnv = oldPath.endsWith('.env') && newPath.endsWith('.json');

		if (!shouldConvertJson && !shouldConvertDotEnv) {
			return;
		}

		const document = await vscode.workspace.openTextDocument(newUri);

		// language id of NEW file
		switch (document.languageId) {
			case 'json':
				convertDotEnvToJson(document);
				break;
			case 'env':
				convertJsonToDotEnv(document);
				break;
		}
	});
}

async function convertJsonToDotEnv(document: vscode.TextDocument) {
	try {
		const json = document.getText();
		const dotEnv = getDotEnvFromJson(json);

		await replaceFileContent(document, dotEnv);
	} catch (error: any) {
		showError(error);
	}
}

async function convertDotEnvToJson(document: vscode.TextDocument) {
	try {
		const dotEnv = document.getText();
		const json = getJsonFromDotEnv(dotEnv);

		await replaceFileContent(document, json);
	} catch (error: any) {
		showError(error);
	}
}

async function replaceFileContent(document: vscode.TextDocument, newText: string) {
	const { lineCount, isDirty, uri } = document;

	const edit = new vscode.WorkspaceEdit();
	const range = new vscode.Range(
		new vscode.Position(0, 0),
		new vscode.Position(lineCount, Number.MAX_VALUE)
	);

	try {

		if (isDirty) {
			await document.save();
		}

		edit.replace(uri, range, newText);
		await vscode.workspace.applyEdit(edit);
		await document.save();
	} catch (error: any) {
		showError(error);
	}
}