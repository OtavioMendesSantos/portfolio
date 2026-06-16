export function applyOpacity(cor: string, opacidade: number): string {
  // Valida a opacidade
  if (opacidade < 0 || opacidade > 1) {
    throw new Error("Opacidade deve estar entre 0 e 1.");
  }

  // Função para converter cor HEX para RGB
  function hexParaRgb(hex: string): { r: number; g: number; b: number } {
    // Remove o hash (#) se estiver presente
    hex = hex.replace(/^#/, "");

    let r: number, g: number, b: number;

    // Converte HEX para RGB
    if (hex.length === 3) {
      r = parseInt(hex[0] + hex[0], 16);
      g = parseInt(hex[1] + hex[1], 16);
      b = parseInt(hex[2] + hex[2], 16);
    } else if (hex.length === 6) {
      r = parseInt(hex.slice(0, 2), 16);
      g = parseInt(hex.slice(2, 4), 16);
      b = parseInt(hex.slice(4, 6), 16);
    } else {
      throw new Error("Formato de cor HEX inválido.");
    }

    return { r, g, b };
  }

  // Função para converter cor RGB para RGBA
  function rgbParaRgba(r: number, g: number, b: number): string {
    return `rgba(${r}, ${g}, ${b}, ${opacidade})`;
  }

  // Verifica se a cor está no formato HEX
  if (/^#?[0-9A-Fa-f]{3}$|^#?[0-9A-Fa-f]{6}$/.test(cor)) {
    // Remove o hash (#) se presente e converte para RGB
    const { r, g, b } = hexParaRgb(cor);
    return rgbParaRgba(r, g, b);
  }

  // Verifica se a cor está no formato RGB
  const match = cor.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
  if (match) {
    const [, r, g, b] = match.map(Number);
    return rgbParaRgba(r, g, b);
  }

  throw new Error("Formato de cor inválido. Use HEX ou RGB.");
}

export const changeOpacity = (cor: string, opacidade: number) => {
  if (opacidade < 0 || opacidade > 1) {
    throw new Error("Opacidade deve estar entre 0 e 1.");
  }
  // Verifica se a cor está no formato RGBA
  const match = cor.match(
    /^rgba\((\d+),\s*(\d+),\s*(\d+),\s*(0?\.\d+|1(\.0)?)\)$/
  );
  if (match) {
    const [, r, g, b] = match.map(Number);

    // Retorna a cor RGBA com a nova opacidade
    return `rgba(${r}, ${g}, ${b}, ${opacidade})`;
  }

  // Se a cor não estiver no formato RGBA, lança um erro
  console.log(cor);
  throw new Error("Formato de cor inválido. Use RGBA.");
};

type CorTipo = "hex" | "rgb" | "rgba" | "hsl" | "hsla" | "unknown";
export const identifyColorType = (cor: string): CorTipo => {
  // Expressão regular para identificar HEX (com ou sem hash e em formatos curto ou longo)
  const hexRegex = /^#(?:[0-9A-Fa-f]{3}){1,2}$/;

  // Expressão regular para identificar RGB
  const rgbRegex = /^rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)$/;

  // Expressão regular para identificar RGBA
  const rgbaRegex =
    /^rgba\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(0?\.\d+|1(\.0)?)\)$/;

  // Expressão regular para identificar HSL
  const hslRegex = /^hsl\(\s*(\d{1,3})\s*,\s*(\d{1,3})%\s*,\s*(\d{1,3})%\s*\)$/;

  // Expressão regular para identificar HSLA
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

export const handleOpacityColor = (color: string, opacity: number) => {
  const colorType = identifyColorType(color);

  if (colorType == "rgb" || colorType == "hex") {
    return applyOpacity(color, opacity);
  } else if (colorType == "hsl" || colorType == "hsla" || colorType == "rgba") {
    return changeOpacity(color, opacity);
  } else {
    return color;
  }
};
