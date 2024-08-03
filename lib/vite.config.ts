import { defineConfig } from 'vite';
import pkg from './package.json';

export default defineConfig({
    build: {
        outDir: '../bin',
        emptyOutDir: true,
        sourcemap: true,
        lib: {
            entry: './src/main.ts',
            name: 'Web-Terminal',
            fileName: (format) => `web-terminal.${format}.${pkg.version}.js`,
            formats: ['umd']
        },
        rollupOptions: {
            external: ['index.html', 'test.json'],
            output: {
                globals: {},
            },
        },
    },
});