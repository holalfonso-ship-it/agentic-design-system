/**
 * Escala de radios — nombres reales de la colección "Primitive Numbers"
 * (tipo CORNER_RADIUS) del archivo AID en Figma.
 *
 * SINCRONIZADO — Fase 1 (2026-09-01). Valores leídos directamente de la
 * sección "Radius" (18:220) de la página "01. Tokens" (2:3) del archivo
 * Figma "Alfonso_Zamorano_Task_IDFinance" (fileKey 3EHBqyJGvIfSG3CZol393z),
 * confirmados también vía get_variable_defs sobre el componente Button
 * (radius/sm = 8, coincide).
 */
export const radius = {
  none: 0,
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  full: 999,
} as const;

export type RadiusToken = keyof typeof radius;
