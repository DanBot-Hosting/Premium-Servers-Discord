import { cyan, red } from 'colorette';

export function info(msg: string) {
	console.log(`${cyan(getTime())} - ${cyan('INFO')} - ${msg}`);
}

export function error(msg: string) {
	console.log(`${red(getTime())} - ${red('ERROR')} - ${msg}`);
}

function getTime() {
	const date = new Date();
	return `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
}
