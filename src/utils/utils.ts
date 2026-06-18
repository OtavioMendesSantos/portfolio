import { technologies } from "../constants/technologies";
import type { Technology } from "../constants/technologies";

export function applyOpacity(cor: string, opacidade: number): string {
  if (opacidade < 0 || opacidade > 1) {
    throw new Error("Opacidade deve estar entre 0 e 1.");
  }

  if (!cor || typeof cor !== "string") return cor;

  const trimmedColor = cor.trim().toLowerCase();

  // HEX
  if (/^#?[0-9A-Fa-f]{3}$|^#?[0-9A-Fa-f]{6}$/.test(trimmedColor)) {
    const hex = trimmedColor.replace(/^#/, "");
    let r: number, g: number, b: number;
    if (hex.length === 3) {
      r = parseInt(hex[0] + hex[0], 16);
      g = parseInt(hex[1] + hex[1], 16);
      b = parseInt(hex[2] + hex[2], 16);
    } else {
      r = parseInt(hex.slice(0, 2), 16);
      g = parseInt(hex.slice(2, 4), 16);
      b = parseInt(hex.slice(4, 6), 16);
    }
    return `rgba(${r}, ${g}, ${b}, ${opacidade})`;
  }

  // RGBA
  const rgbaMatch = trimmedColor.match(
    /^rgba\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*([0-9.]+)\s*\)$/,
  );
  if (rgbaMatch) {
    const r = rgbaMatch[1];
    const g = rgbaMatch[2];
    const b = rgbaMatch[3];
    return `rgba(${r}, ${g}, ${b}, ${opacidade})`;
  }

  // RGB
  const rgbMatch = trimmedColor.match(
    /^rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)$/,
  );
  if (rgbMatch) {
    const r = rgbMatch[1];
    const g = rgbMatch[2];
    const b = rgbMatch[3];
    return `rgba(${r}, ${g}, ${b}, ${opacidade})`;
  }

  // HSLA
  const hslaMatch = trimmedColor.match(
    /^hsla\(\s*([0-9.]+)\s*,\s*([0-9.]+)%\s*,\s*([0-9.]+)%\s*,\s*([0-9.]+)\s*\)$/,
  );
  if (hslaMatch) {
    const h = hslaMatch[1];
    const s = hslaMatch[2];
    const l = hslaMatch[3];
    return `hsla(${h}, ${s}%, ${l}%, ${opacidade})`;
  }

  // HSL
  const hslMatch = trimmedColor.match(
    /^hsl\(\s*([0-9.]+)\s*,\s*([0-9.]+)%\s*,\s*([0-9.]+)%\s*\)$/,
  );
  if (hslMatch) {
    const h = hslMatch[1];
    const s = hslMatch[2];
    const l = hslMatch[3];
    return `hsla(${h}, ${s}%, ${l}%, ${opacidade})`;
  }

  return cor;
}

export const changeOpacity = (cor: string, opacidade: number): string => {
  return applyOpacity(cor, opacidade);
};

type CollorType = "hex" | "rgb" | "rgba" | "hsl" | "hsla" | "unknown";

export const identifyColorType = (cor: string): CollorType => {
  const hexRegex = /^#(?:[0-9A-Fa-f]{3}){1,2}$/;
  const rgbRegex = /^rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)$/;
  const rgbaRegex =
    /^rgba\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(0?\.\d+|1(\.0)?)\)$/;
  const hslRegex = /^hsl\(\s*(\d{1,3})\s*,\s*(\d{1,3})%\s*,\s*(\d{1,3})%\s*\)$/;
  const hslaRegex =
    /^hsla\(\s*(\d{1,3})\s*,\s*(\d{1,3})%\s*,\s*(\d{1,3})%\s*,\s*(0?\.\d+|1(\.0)?)\)$/;

  if (hexRegex.test(cor)) {
    return "hex";
  } else if (rgbRegex.test(cor)) {
    return "rgb";
  } else if (rgbaRegex.test(cor)) {
    return "rgba";
  } else if (hslRegex.test(cor)) {
    return "hsl";
  } else if (hslaRegex.test(cor)) {
    return "hsla";
  } else {
    return "unknown";
  }
};

export const handleOpacityColor = (color: string, opacity: number): string => {
  return applyOpacity(color, opacity);
};

export const getStackDetail = (stack: string): Technology => {
  const normalized = stack.toLowerCase().replace(/[^a-z0-9]/g, "");
  
  const tech = technologies.find(
    (t) =>
      t.icon.toLowerCase() === normalized ||
      t.name.toLowerCase() === normalized ||
      t.icon.toLowerCase() === stack.toLowerCase() ||
      t.name.toLowerCase() === stack.toLowerCase()
  );

  if (tech) return tech;

  return {
    name: stack.charAt(0).toUpperCase() + stack.slice(1),
    icon: stack.toLowerCase(),
  };
};
