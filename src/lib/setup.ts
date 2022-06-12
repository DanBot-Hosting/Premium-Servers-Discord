process.env.NODE_ENV ??= 'development';

import 'reflect-metadata';

import { QuickDB } from 'quick.db';
import { config } from 'dotenv-cra';
import { resolve } from 'node:path';
import { inspect } from 'node:util';
import { container } from 'tsyringe';

config({
	path: resolve('src/.env')
});
inspect.defaultOptions.depth = 1;

const db = new QuickDB();
container.register('db', { useValue: db });
