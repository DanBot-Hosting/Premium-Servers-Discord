import { resolve } from 'node:path';
import { readdir } from 'node:fs/promises';
import { info } from '../Logger';
import type { Client } from 'discord.js';

export class ListenerHandler {
	public async load(client: Client) {
		const folder = resolve('./dist/listeners');
		if (!folder) throw new Error(`Could not find the listeners folder.`);

		const files = await (await readdir(folder)).filter((m) => m.endsWith('.js'));

		for (const file of files) {
			const { default: ExportedListener } = await import(`file://${folder}/${file}`);
			const loaded = new ExportedListener();

			info(`Loaded listener ${loaded.name}`);

			client.on(loaded.name, loaded.run);
		}
	}
}
