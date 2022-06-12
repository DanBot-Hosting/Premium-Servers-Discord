import './lib/setup';

import { Client, Intents } from 'discord.js';
import { ListenerHandler } from './lib/structures';
import { container } from 'tsyringe';

const client = new Client({
	intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]
});

await new ListenerHandler().load(client);
await client.login();
container.register('client', { useValue: client });
