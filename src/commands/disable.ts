import { Command, error } from '../lib/structures';
import type { Message } from 'discord.js';

export default class DisableCommand extends Command {
	public constructor(options: Command.Options) {
		super({
			...options,
			name: 'disable',
			description: 'Disable the redeeem command.',
			extendedDescription: {
				usage: `${process.env.PREFIX}disable`
			}
		});
	}

	public async run(message: Message) {
		if (message.author.id !== '137624084572798976') return;

		try {
			const data = await this.db!.get('redeem-disabled');
			if (data && data === true) return message.reply('Redeeming is already disabled.');

			await this.db!.set('redeem-disabled', true);
			return message.reply('Redeeming has been disabled.');
		} catch (err) {
			error((err as Error).message);
			return message.reply('An error occured while disabling redeeming.');
		}
	}
}
