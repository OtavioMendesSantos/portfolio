import { defineConfig } from "astro/config";
import react from "@astrojs/react";

export default defineConfig({
  integrations: [react()],
  vite: {
    ssr: {
      noExternal: [
        "@mui/material",
        "@mui/icons-material",
        "@mui/system",
        "@mui/base",
        "@mui/utils",
        "@emotion/react",
        "@emotion/styled",
      ],
    },
  },
});
