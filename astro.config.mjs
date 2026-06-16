import { defineConfig } from "astro/config";
import react from "@astrojs/react";

export default defineConfig({
  integrations: [react()],
  vite: {
    resolve: {
      noExternal: [
        "@mui/material",
        "@mui/icons-material",
        "@mui/system",
        "@mui/base",
        "@mui/utils",
        "@emotion/react",
        "@emotion/styled",
        "react-transition-group",
      ],
      alias: {
        "react-transition-group/TransitionGroupContext":
          "react-transition-group/esm/TransitionGroupContext.js",
      },
    },
    optimizeDeps: {
      exclude: ["react/jsx-dev-runtime", "react/jsx-runtime"],
    },
  },
});
