/**
 * Escala tipográfica — nombres y jerarquía extraídos de las variables reales
 * de Figma (colección "Primitive Numbers", tipo FONT_SIZE) del archivo AID.
 *
 * SINCRONIZADO — Fase 1 (2026-09-01). Valores leídos de la sección
 * "Typography" (18:248) de la página "01. Tokens" (2:3) del archivo Figma
 * "Alfonso_Zamorano_Task_IDFinance" (fileKey 3EHBqyJGvIfSG3CZol393z),
 * confirmados también vía get_variable_defs sobre el componente Button
 * (font-size/label-sm = 12, font-size/label-md = 14 — coinciden).
 */
export const fontSize = {
  caption: 11,
  "label-sm": 12,
  "label-md": 14,
  "body-md": 14,
  "body-lg": 16,
  "heading-md": 20,
  "heading-lg": 24,
  "display-xl": 32,
} as const;

export type FontSizeToken = keyof typeof fontSize;

/**
 * Line-height por tamaño — mismo origen que fontSize (sección
 * "Typography" del archivo Figma). Añadido en la sincronización de la
 * Fase 1 porque Figma expone ambos valores juntos (ej. "Type/Label/MD —
 * 14/20"); no existía en el archivo de tokens original.
 */
export const lineHeight = {
  caption: 14,
  "label-sm": 16,
  "label-md": 20,
  "body-md": 20,
  "body-lg": 24,
  "heading-md": 28,
  "heading-lg": 32,
  "display-xl": 40,
} as const;

export type LineHeightToken = keyof typeof lineHeight;

export const fontFamily = {
  base: '"SF Pro Text", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
} as const;
