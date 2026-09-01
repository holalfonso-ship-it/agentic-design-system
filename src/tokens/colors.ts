/**
 * Colores por componente — nombres reales de la colección "Component
 * Colors" del archivo AID en Figma (button/*, card/*, tab/*).
 *
 * SINCRONIZADO — Fase 1 (2026-09-01). Valores extraídos directamente del
 * archivo Figma correcto: "Alfonso_Zamorano_Task_IDFinance"
 * (fileKey 3EHBqyJGvIfSG3CZol393z), vía MCP de Figma (get_design_context /
 * get_variable_defs) sobre el component set real "Button" (28:122), el
 * demo "Tab / Segmented Control" (18:167) y la sección de documentación
 * "Component Colors" (18:144) de la página "01. Tokens" (2:3).
 *
 * Pendiente de resolver (ver README): las variables `card/frozen/bg`,
 * `card/frozen/bg-subtle`, `card/frozen/text` y `card/border` existen en
 * la colección Component Colors pero no tienen un swatch visual en el
 * archivo — no se ha podido leer su valor exacto por este medio. Quedan
 * marcadas explícitamente abajo. `card.border` usa una estimación
 * razonada (semantic/border → neutral/200) hasta confirmarse.
 */
export const button = {
  primary: {
    bg: {
      default: "#361C5C",
      // Estimado desde semantic/action/primary/bg/hover → plum/800.
      // La variable button/primary/bg/hover existe pero no se encontró
      // su swatch directo — confirmar antes de dar por definitivo.
      hover: "#2A1648",
      pressed: "#201137",
      disabled: "#F7F6F6",
    },
    text: { default: "#FFFFFF", disabled: "#5C5653" },
  },
  secondary: {
    bg: { default: "#FFFFFF" },
    // NOTA: el valor real de button/secondary/border/default (#361C5C)
    // se aplica en Figma al estado "pressed"/"loading", no al estado
    // "default" visual (que usa semantic/border/default, #C0BEBC).
    // Se respeta aquí el nombre real de la variable — ver hallazgo en
    // el README / futura auditoría Fase 3.
    border: { default: "#361C5C", disabled: "#C0BEBC" },
    text: { default: "#361C5C", disabled: "#5C5653" },
  },
  tertiary: {
    text: { default: "#361C5C", disabled: "#5C5653" },
  },
} as const;

export const card = {
  // Estimado (semantic/border/default → neutral/200). Sin swatch directo
  // para card/border en el archivo — confirmar.
  border: "#A19E9C",
  bnpl: { bg: "#DCF3A2", bgSubtle: "#FCFEF6", text: "#151211" },
  credit: { bg: "#452476", bgSubtle: "#EDEAF3", text: "#FFFFFF" },
  // PENDIENTE — sin swatch visual en Figma para card/frozen/*. Se
  // mantiene el placeholder anterior hasta poder confirmarlo.
  frozen: { bg: "#EEF1F5", bgSubtle: "#F7F8FA", text: "#4B4F5E" },
} as const;

export const tab = {
  bg: { default: "#FFFFFF", selected: "#361C5C" },
  text: { default: "#2E2824", selected: "#FFFFFF" },
} as const;
