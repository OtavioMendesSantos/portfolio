import react from "@astrojs/react";
import { defineConfig } from "astro/config";

export default defineConfig({
  integrations: [react()],
  vite: {
    resolve: {
      alias: {
        "react-transition-group/TransitionGroupContext":
          "react-transition-group/cjs/TransitionGroupContext.js",
      },
    },
    ssr: {
      noExternal: [
        "@mui/material",
        "@mui/icons-material",
        "@emotion/react",
        "@emotion/styled",
        "@mui/system",
        "@mui/base",
        "@mui/utils",
        "react-transition-group",
      ],
    },
    optimizeDeps: {
      exclude: ["react/jsx-dev-runtime", "react/jsx-runtime"],
    },
  },
});
