import { Command, error } from '../lib/structures';
import type { Message } from 'discord.js';

export default class EnableCommand extends Command {
	public constructor(options: Command.Options) {
		super({
			...options,
			name: 'enable',
			description: 'Enable the redeeem command.',
			extendedDescription: {
				usage: `${process.env.PREFIX}enable`
			}
		});
	}

	public async run(message: Message) {
		if (message.author.id !== '137624084572798976') return;

		try {
			const data = await this.db!.get('redeem-disabled');
			if (data === false) return message.reply('Redeeming is already enabled.');

			await this.db!.set('redeem-disabled', false);
			return message.reply('Redeeming has been enabled.');
		} catch (err) {
			error((err as Error).message);
			return message.reply('An error occured while enabling redeeming.');
		}
	}
}
