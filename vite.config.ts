import { sveltekit } from '@sveltejs/kit/vite';
import postcss from './postcss.config'
import { defineConfig } from 'vitest/config';
import path from 'path';
export default defineConfig({
	optimizeDeps: {
		include: [
			'echarts/core',
			'echarts/charts',
			'echarts/components',
			'echarts/renderers',
		],
	},
	plugins: [sveltekit()],
	server: {
		host: true,
		port: 2345
	},
	resolve: {
		alias: {
      '@': path.resolve(__dirname, 'src')
    }
	},
	css: {
		postcss
	},
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}', 'tests/**/*.{test,spec}.{js,ts}'],
    environmentOptions: {
      jsdom: {
        resources: 'usable',
      },
    },
		environment: 'jsdom',
		setupFiles: './src/setupTest.ts',
	}
});
