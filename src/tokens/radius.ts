/**
 * Escala de radios — nombres reales de la colección "Primitive Numbers"
 * (tipo CORNER_RADIUS) del archivo AID en Figma.
 * Valores en px, interpolados sobre una escala iOS estándar — sustituir
 * por los valores exactos cuando se sincronicen desde Figma.
 */
export const radius = {
  none: 0,
  xs: 4,
  sm: 8,
  md: 12,
  lg: 20,
  full: 999,
} as const;

export type RadiusToken = keyof typeof radius;
