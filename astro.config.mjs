// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';
import vercelStatic from '@astrojs/vercel/static';

export default defineConfig({
	output: 'static',
	adapter: vercelStatic({
		webAnalytics: {
			enabled: true
		},
		maxDuration: 8
	}),

	vite: {
		plugins: [tailwindcss()],
		css: {
			transformer: 'lightningcss'
		},
		build: {
			rollupOptions: {
				output: {
					manualChunks(id) {
						if (id.includes('opentype.js')) {
							return 'opentype';
						}
						if (id.includes('q5')) {
							return 'q5';
						}
						if (id.includes('react')) {
							return 'react';
						}
					}
				}
			}
		}
	},

	integrations: [
		react({
			babel: {
				plugins: [['babel-plugin-react-compiler']]
			}
		})
	]
});
