import react from '@astrojs/react';
import { defineConfig } from 'astro/config';

export default defineConfig({
  integrations: [react()],
  vite: {
    ssr: {
      noExternal: ['@mui/material', '@mui/icons-material', '@emotion/react', '@emotion/styled', 'react-transition-group'],
    },
    optimizeDeps: {
      exclude: ['react/jsx-dev-runtime', 'react/jsx-runtime'],
    },
  },
});
