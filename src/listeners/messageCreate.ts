import { error, Listener, type CommandHandler } from '../lib/structures';
import { container } from 'tsyringe';
import type { Message } from 'discord.js';

export default class MessageCreateListener extends Listener {
	public constructor() {
		super({
			name: 'messageCreate',
			event: 'messageCreate'
		});
	}

	public async run(message: Message) {
		const prefix = process.env.CLIENT_PREFIX!;
		if (!message.content.startsWith(prefix) || message.author.bot) return;

		try {
			const commandHandler = container.resolve<CommandHandler>('commandHandler');
			const args = message.content.slice(prefix.length).trim().split(/ +/);
			const command = args.shift()!.toLowerCase();

			try {
				const found = commandHandler.commands.get(command);
				if (found) await found.run!(message, args);
			} catch (err) {
				error(`Error while running command ${command}: ${err}`);
			}
		} catch (err) {
			console.log(err);
		}
	}
}
