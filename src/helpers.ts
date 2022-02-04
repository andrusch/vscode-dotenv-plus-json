import * as vscode from 'vscode';
import { parse } from 'dotenv';
import { convertJsonToDotEnv } from './converter.dotenv';

const DEFAULT_ERROR_MESSAGE = 'Something went wrong, please validate your file and try again or create an issue if the problem persist';

/**
 * prints errors to console and shows its error message to the user.
 */
export function showError(error: any) {
	console.error(error);

	const message = error.message || DEFAULT_ERROR_MESSAGE;
	vscode.window.showErrorMessage(message);
}

export function getDotEnvFromJson(json: string): string {
	try {
		return convertJsonToDotEnv(JSON.parse(json), '', '');
	} catch (error) {
		console.error(error);
		throw new Error('Failed to parse DotEnv. Please make sure it has a valid format and try again.');
	}
}

export function getJsonFromDotEnv(dotenv: string): string {
	try {
		const json = parse(dotenv); 
		return JSON.stringify(json, undefined, 2);
	} catch (error) {
		console.error(error);
		throw new Error('Failed to parse JSON. Please make sure it has a valid format and try again.');
	}
}