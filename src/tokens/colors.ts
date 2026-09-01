/**
 * Colores por componente — nombres reales de la colección "Component
 * Colors" del archivo AID en Figma (button/*, card/*, tab/*).
 *
 * SINCRONIZADO — Fase 1 (2026-09-01). Valores extraídos directamente del
 * archivo Figma correcto: "Alfonso_Zamorano_Task_IDFinance"
 * (fileKey 3EHBqyJGvIfSG3CZol393z), vía MCP de Figma (get_design_context /
 * get_variable_defs) sobre el component set real "Button" (28:122), el
 * component set real "Product Card" (38:176), el demo "Tab / Segmented
 * Control" (18:167) y la sección de documentación "Component Colors"
 * (18:144) de la página "01. Tokens" (2:3).
 *
 * HALLAZGO — "frozen" no es un tercer producto de tarjeta en Figma, es un
 * ESTADO que se aplica sobre credit o bnpl (variantes reales del
 * component set: product = credit | bnpl, state = active | frozen |
 * blocked). `card.frozen` aquí representa ese estado compartido, no un
 * producto propio — el código original (Fase 0) lo modeló mal. Se
 * mantiene la forma `{ bnpl, credit, frozen }` por compatibilidad con
 * los componentes existentes, pero un futuro Audit (Fase 3) debería
 * replantear esto como `card.state.frozen` aplicado sobre el producto.
 *
 * Pendiente de resolver: `card/border` existe en la colección Component
 * Colors pero no se encontró ningún nodo del component set real de
 * Product Card (estados active/frozen/blocked, ambos lados) que lo use
 * — el estado "blocked" usa en su lugar `semantic/feedback/error`
 * (#E60C00) para el borde. Puede ser un token sin usar todavía. Se deja
 * como estimación razonada (`semantic/border/default` → `neutral/200`)
 * hasta confirmarlo — otro candidato para el Audit de la Fase 3.
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
  // Confirmado sobre el component set real (product=credit/bnpl,
  // state=frozen): mismo bg/text para ambos productos en este estado.
  // Figma no define un "bg-subtle" propio para el estado frozen (a
  // diferencia de bnpl/credit, que sí lo tienen como producto) — se usa
  // el mismo valor que bg.
  frozen: { bg: "#FFFFFF", bgSubtle: "#FFFFFF", text: "#5C5653" },
} as const;

export const tab = {
  bg: { default: "#FFFFFF", selected: "#361C5C" },
  text: { default: "#2E2824", selected: "#FFFFFF" },
} as const;
