import { CommandHandler, Listener, info } from '../lib/structures';
import { container } from 'tsyringe';
import type { Client } from 'discord.js';

export default class ReadyListener extends Listener {
	public constructor() {
		super({
			name: 'ready',
			event: 'ready'
		});
	}

	public async run(client: Client) {
		const commandHandler = new CommandHandler({
			messagePrefix: process.env.CLIENT_PREFIX!
		});
		await commandHandler.load();
		container.register('commandHandler', { useValue: commandHandler });

		info(`Logged in as ${client.user!.tag}`);
	}
}
