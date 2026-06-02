import react from '@astrojs/react';
import { defineConfig } from 'astro/config';

export default defineConfig({
  integrations: [react()],
  vite: {
    optimizeDeps: {
      exclude: ['react/jsx-dev-runtime', 'react/jsx-runtime'],
    },
  },
});
