
function isCamelCase(str: string) {
	return !!str.match(/^[a-z]+[A-Z]/)
}

function camelToSnakeCase(str: string) {
	if (isCamelCase(str)) {
		return str.replace(/[A-Z]/g, '\_$&');
	}
	return str;
}
function escapeCharactersForEnvValue(obj: string) {
	return obj.indexOf('#') > -1 || obj.indexOf('=') > -1 ? '"' + obj + '"' : obj;
}
export function convertJsonToDotEnv(obj: any, key: string, output: string): string {
	if (typeof obj == 'string') {
		var exportString = camelToSnakeCase(key).toUpperCase() + '=' + escapeCharactersForEnvValue(obj) + '\n';
		//log(config, 'Writing: ' + exportString + '\n');
		return output + exportString;
	} else {
		for (var k in obj) {
			if (typeof obj[k] == 'string') {
				var prefix = key ? key.toUpperCase() + '_' : '';
				var exportString = prefix + camelToSnakeCase(k).toUpperCase() + '=' + escapeCharactersForEnvValue(obj[k]) + '\n';
				output += exportString;
			} else if (typeof obj[k] == 'object') {
				output = convertJsonToDotEnv(obj[k], k, output);
			}
		}
		return output;
	}
}