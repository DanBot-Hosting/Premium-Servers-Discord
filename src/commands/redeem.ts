import { Command, error } from '../lib/structures';
import fetch from 'node-fetch';
import type { Message } from 'discord.js';

export default class RedeemCommand extends Command {
	public constructor(options: Command.Options) {
		super({
			...options,
			name: 'redeem',
			description: 'Redeem a server.',
			extendedDescription: {
				usage: `${process.env.PREFIX}`
			},
			disabled: async () => (this.db ? ((await this.db.get('redeem-disabled')) ? true : false) : false)
		});
	}

	public async run(message: Message) {
		try {
			const data = await this.db!.get<{ claimed: boolean }>(`claimed:${message.author.id}`);
			if (data?.claimed) return message.reply('You have already redeemed your premium servers.'); // This is assuming that the user is allowed to claim only once.

			const response = await fetch(`https://danbot.host/external/prem`, {
				method: 'POST',
				headers: {
					password: process.env.API_PASSWORD!,
					user: message.author.id
				},
				body: JSON.stringify({
					user: message.author.id
				})
			});

			await response.json();

			await this.db!.set(`claimed:${message.author.id}`, { claimed: true });
			return message.reply('You have successfully claimed 4 **FREE** premium servers. Enjoy!');
		} catch (err) {
			error((err as Error).message);
			return message.reply('An error occured while giving you your premium servers.');
		}
	}
}
