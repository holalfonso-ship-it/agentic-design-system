/**
 * Escala de espaciado — variables reales de Figma `space/*` (colección
 * "Primitive Numbers", scope GAP) del archivo Aida (fileKey
 * 3EHBqyJGvIfSG3CZol393z).
 *
 * SINCRONIZADO — Ciclo ARC 2 (2026-10-01). Leído con use_figma
 * (figma.variables.getLocalVariablesAsync): space/0, 2, 4, 8, 12, 16, 24, 32,
 * 40, 48, 64. Confirmado también vía get_variable_defs en los component sets
 * Badge (space/4, 8), Input (space/12, 16), Modal (space/8, 12, 24) y Tab Bar
 * (space/16, 32).
 *
 * Uso: `space["16"]` (px). Las claves son los nombres de Figma tal cual, igual
 * que `neutral["300"]`. Un valor que NO esté en esta escala (6, 9, 10, 14, 18,
 * 20, 22 aparecen hoy en el código) no se inventa como token: se deja como
 * literal señalado hasta decidir en Figma si se ajusta a la escala.
 */
export const space = {
  "0": 0,
  "2": 2,
  "4": 4,
  "8": 8,
  "12": 12,
  "16": 16,
  "24": 24,
  "32": 32,
  "40": 40,
  "48": 48,
  "64": 64,
} as const;

export type SpaceToken = keyof typeof space;
