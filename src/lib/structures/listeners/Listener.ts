import type { CloneType } from '../../util';

export type ListenerOptions = CloneType<Listener>;

export class Listener {
	public name: string;
	public event: string;
	public options?: ListenerOptions;

	public constructor(options: ListenerOptions) {
		this.options = options;
		this.name = options.name;
		this.event = options.event;
	}

	public run?(...args: any[]): unknown | Promise<unknown>;
}

export namespace Listener {
	export type Options = ListenerOptions;
}
