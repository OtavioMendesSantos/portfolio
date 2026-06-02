/// <reference types="astro/client" />

declare global {
  interface Window {
    theme?: import('@mui/material').Theme;
  }
}

export {};
