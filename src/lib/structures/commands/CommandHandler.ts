import { resolve } from 'node:path';
import { readdir } from 'node:fs/promises';
import { info } from '../Logger';
import type { Command } from './Command';

export class CommandHandler {
	public options: CommandHandlerOptions;
	public messagePrefix: CommandHandlerOptions['messagePrefix'];
	public commands = new Map<string, Command>();

	public constructor(options: CommandHandlerOptions) {
		this.options = options;
		this.messagePrefix = options.messagePrefix;
	}

	public async load() {
		const folder = resolve('./dist/commands');
		if (!folder) throw new Error(`Could not find the commands folder.`);

		const files = await (await readdir(folder)).filter((m) => m.endsWith('.js'));

		for (const file of files) {
			const { default: ExportedComand } = await import(`file://${folder}/${file}`);
			const loaded = new ExportedComand();

			this.commands.set(loaded.name, loaded);
			info(`Loaded command ${loaded.name}`);
		}
	}
}

export interface CommandHandlerOptions {
	messagePrefix: string;
}
