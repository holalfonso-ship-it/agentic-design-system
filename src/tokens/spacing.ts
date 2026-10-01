/**
 * Escala de espaciado — variables reales de Figma `space/*` (colección
 * "Primitive Numbers", scope GAP) del archivo Aida (fileKey
 * 3EHBqyJGvIfSG3CZol393z).
 *
 * SINCRONIZADO — Ciclo ARC 3 (2026-10-01). Leído con use_figma
 * (figma.variables.getLocalVariablesAsync): space/0, 2, 4, 6, 8, 12, 14, 16, 24,
 * 32, 40, 48, 64. space/6 y space/14 se añadieron a Figma en el Ciclo 3 porque
 * esos valores se repetían en varios componentes (6: Badge, Input, ProductCard;
 * 14: QuickActionTile, StatItem). Confirmado también vía get_variable_defs en los component sets
 * Badge (space/4, 8), Input (space/12, 16), Modal (space/8, 12, 24) y Tab Bar
 * (space/16, 32).
 *
 * Uso: `space["16"]` (px). Las claves son los nombres de Figma tal cual, igual
 * que `neutral["300"]`. Un valor que NO esté en esta escala no se inventa como
 * token: se ajusta al valor más cercano (empate → el mayor) o, si se repite en
 * varios componentes, se añade primero a Figma (regla del Ciclo 3).
 */
export const space = {
  "0": 0,
  "2": 2,
  "4": 4,
  "6": 6,
  "8": 8,
  "12": 12,
  "14": 14,
  "16": 16,
  "24": 24,
  "32": 32,
  "40": 40,
  "48": 48,
  "64": 64,
} as const;

export type SpaceToken = keyof typeof space;
