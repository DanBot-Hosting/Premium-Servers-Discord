import { defineConfig } from 'tsup';

export default defineConfig({
	clean: true,
	dts: false,
	entry: ['src/**/*.ts'],
	format: ['esm'],
	minify: false,
	skipNodeModulesBundle: true,
	sourcemap: true,
	target: 'esnext',
	tsconfig: 'src/tsconfig.json',
	splitting: false,
	keepNames: true
});
