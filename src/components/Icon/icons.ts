/**
 * Catálogo de iconos de Aida — glifos de Lucide (https://lucide.dev), licencia ISC.
 *
 * Copyright (c) Lucide Icons and Contributors. Se permite usar, copiar y distribuir
 * este software con o sin cambios siempre que se mantenga este aviso de copyright y
 * de permiso (texto completo de la licencia ISC en https://lucide.dev/license).
 *
 * POR QUÉ LUCIDE Y NO LOS SF SYMBOLS DE FIGMA: los iconos del archivo de Figma
 * ("03. Icons") son SF Symbols de Apple, cuya licencia solo permite usarlos en apps
 * para plataformas de Apple. Aida es un repo y un Storybook públicos en web, así que
 * los glifos de Apple no se redistribuyen: cada icono de Figma se mapea a un
 * equivalente de Lucide (decisión con Alfonso, 2026-10-01; tabla en Icon.metadata.ts).
 *
 * Formato: nombre de Lucide → lista de nodos SVG [etiqueta, atributos] sobre un
 * viewBox 24×24, trazo de 2 px y sin relleno. Generado a partir de lucide-static
 * v1.49.0; para añadir un icono, copiar sus nodos de lucide-static/icons/<nombre>.svg.
 */
export const iconNodes = {
  "calendar": [
    ["path", {"d":"M8 2v3"}],
    ["path", {"d":"M16 2v3"}],
    ["rect", {"x":"3","y":"3","width":"18","height":"18","rx":"2"}],
    ["path", {"d":"M3 9h18"}],
  ],
  "circle-arrow-out-up-right": [
    ["path", {"d":"M22 12A10 10 0 1 1 12 2"}],
    ["path", {"d":"M22 2 12 12"}],
    ["path", {"d":"M16 2h6v6"}],
  ],
  "circle-arrow-out-down-left": [
    ["path", {"d":"M2 12a10 10 0 1 1 10 10"}],
    ["path", {"d":"m2 22 10-10"}],
    ["path", {"d":"M8 22H2v-6"}],
  ],
  "utensils": [
    ["path", {"d":"M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"}],
    ["path", {"d":"M7 2v20"}],
    ["path", {"d":"M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"}],
  ],
  "house": [
    ["path", {"d":"M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"}],
    ["path", {"d":"M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"}],
  ],
  "credit-card": [
    ["rect", {"width":"20","height":"14","x":"2","y":"5","rx":"2"}],
    ["line", {"x1":"2","x2":"22","y1":"10","y2":"10"}],
    ["path", {"d":"M6 14h2"}],
  ],
  "wallet": [
    ["path", {"d":"M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1"}],
    ["path", {"d":"M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4"}],
  ],
  "settings": [
    ["path", {"d":"M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915"}],
    ["circle", {"cx":"12","cy":"12","r":"3"}],
  ],
  "lock": [
    ["rect", {"width":"18","height":"11","x":"3","y":"11","rx":"2","ry":"2"}],
    ["path", {"d":"M7 11V7a5 5 0 0 1 10 0v4"}],
  ],
  "snowflake": [
    ["path", {"d":"m10 20-1.25-2.5L6 18"}],
    ["path", {"d":"M10 4 8.75 6.5 6 6"}],
    ["path", {"d":"m14 20 1.25-2.5L18 18"}],
    ["path", {"d":"m14 4 1.25 2.5L18 6"}],
    ["path", {"d":"m17 21-3-6h-4"}],
    ["path", {"d":"m17 3-3 6 1.5 3"}],
    ["path", {"d":"M2 12h6.5L10 9"}],
    ["path", {"d":"m20 10-1.5 2 1.5 2"}],
    ["path", {"d":"M22 12h-6.5L14 15"}],
    ["path", {"d":"m4 10 1.5 2L4 14"}],
    ["path", {"d":"m7 21 3-6-1.5-3"}],
    ["path", {"d":"m7 3 3 6h4"}],
  ],
  "x": [
    ["path", {"d":"M18 6 6 18"}],
    ["path", {"d":"m6 6 12 12"}],
  ],
} as const satisfies Record<string, ReadonlyArray<readonly [string, Record<string, string>]>>;
