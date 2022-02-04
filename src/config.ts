import * as vscode from 'vscode';

export enum ConfigId {
	ConvertOnRename = 'convertOnRename',
	FileExtensionsDotEnv = 'fileExtensions.env',
	FileExtensionsJson = 'fileExtensions.json',
	KeepOriginalFiles = 'keepOriginalFiles',
}

export type Configs = {
	keepOriginalFiles: 'ask' | 'always';
};

enum ConfigIdLegacy {
	// Same key as new - only here for convenience
	ConvertOnRename = 'convertOnRename'
}

const EXTENSION_CONFIG_ID = 'dotenv-plus-json';

export function getConfig<T = any>(configId: ConfigId): T | undefined {
	const config = vscode.workspace.getConfiguration(EXTENSION_CONFIG_ID);

	const legacyConfigKey = getLegacyConfigKey(configId);

	return config.get<T>(legacyConfigKey) || config.get<T>(configId);
}

/**
 * @deprecated do not add new configs here
 */
 const LEGACY_CONFIGS = Object.freeze({
	[ConfigId.ConvertOnRename]: ConfigIdLegacy.ConvertOnRename
});

function getLegacyConfigKey(configId: ConfigId) {
	// @ts-ignore
	return LEGACY_CONFIGS[configId];
}