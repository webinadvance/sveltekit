import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
	plugins: [sveltekit(), tailwindcss()],
	server: {
		// Set very high limits for file uploads
		maxRequestSize: '1000mb',
		maxFileSize: '1000mb'
	}
});
