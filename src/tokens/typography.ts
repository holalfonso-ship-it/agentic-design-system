/**
 * Escala tipográfica — nombres y jerarquía extraídos de las variables reales
 * de Figma (colección "Primitive Numbers", tipo FONT_SIZE) del archivo AID.
 *
 * Los valores en px son una interpolación razonable de una escala iOS
 * (caption → display). Sustituye por los valores exactos de Figma cuando
 * tengas acceso de escritorio al archivo (ver README, sección "Sincronizar
 * valores exactos").
 */
export const fontSize = {
  caption: 12,
  "label-sm": 13,
  "label-md": 15,
  "body-md": 16,
  "body-lg": 17,
  "heading-md": 20,
  "heading-lg": 24,
  "display-xl": 34,
} as const;

export type FontSizeToken = keyof typeof fontSize;

export const fontFamily = {
  base: '"SF Pro Text", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
} as const;
