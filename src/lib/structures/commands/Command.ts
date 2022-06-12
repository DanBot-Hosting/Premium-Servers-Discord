import { container } from 'tsyringe';
import type { Client, Message } from 'discord.js';
import type { CloneType } from '../../util';
import type { QuickDB } from 'quick.db';

export type CommandOptions = CloneType<Command>;

export class Command {
	public name!: string;
	public description!: string;
	public extendedDescription!: Record<string, string>;
	public disabled?: boolean | (() => boolean | Promise<boolean>) = false;
	public options?: CommandOptions;
	public db?: QuickDB = container.resolve('db');
	public client: Client = container.resolve('client');

	public constructor(options: CommandOptions) {
		this.options = options;
		Object.assign(this, options);
	}

	public run?(message: Message, args: string[]): Promise<unknown>;
}

export namespace Command {
	export type Options = CommandOptions;
}
