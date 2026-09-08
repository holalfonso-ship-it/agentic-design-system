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
 * (#E60C00) para el borde. Puede ser un token sin usar todavía. Su
 * valor exacto SÍ se confirmó en la Fase 2 (2026-09-03), al resolver
 * variables reales para construir el Toggle en Figma:
 * `semantic/border/default` → `neutral/100` → `#C0BEBC` (no
 * `neutral/200` como se había estimado en la Fase 1 — la estimación
 * anterior era la variable primitiva equivocada, aunque el hex final
 * quedó cerca). Sigue sin usarse en ningún nodo real, pero ya no es una
 * estimación.
 */
export const button = {
  primary: {
    bg: {
      default: "#361C5C",
      // Confirmado en la Fase 2 (2026-09-03) al resolver variables
      // reales para el Toggle: plum/700 = #361C5C (= semantic/action/
      // primary/bg/default, el mismo valor que default de arriba) y
      // plum/800 = #2A1648 — coincide exacto con este valor estimado
      // en Fase 1. Ya no es una estimación.
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
  // Confirmado en la Fase 2 (2026-09-03): semantic/border/default →
  // neutral/100 → #C0BEBC (mismo valor que semantic.border.default más
  // abajo). Sigue sin usarse en ningún nodo real de Product Card — ver
  // nota al principio del archivo.
  border: "#C0BEBC",
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

/**
 * Colores semánticos genéricos — colección "semantic" de Figma, distinta
 * de "Component Colors" (button/*, card/*, tab/* arriba). Confirmados en
 * la Fase 2 (2026-09-03) sobre los componentes reales "Quick Action Tile"
 * (75:51) y "Stat Item" (75:597), que los referencian directamente en vez
 * de tener variables propias por componente como Button/Card/Tab.
 *
 * `semantic/border/default` (#C0BEBC) y `semantic/text/disabled`
 * (#5C5653) ya habían aparecido antes como el valor real detrás de
 * variables con nombre distinto (`button.secondary.border.disabled`,
 * `button.primary.text.disabled` / `card.frozen.text`) — mismo valor,
 * confirma que son alias del mismo token semántico subyacente.
 */
export const semantic = {
  // `surface` (#FFFFFF, neutral/white) confirmado en la Fase 2
  // (2026-09-03) sobre el knob del Toggle — es semantic/bg/surface,
  // distinto de semantic/bg/default (el fondo violeta claro de Quick
  // Action Tile).
  bg: { default: "#EDEAF3", surface: "#FFFFFF" },
  border: { default: "#C0BEBC" },
  // `primary` (#151211, neutral/900) añadido en la Fase 2 (2026-09-03)
  // al construir el Input: es el color de "Texto introducido" en los
  // estados default/focused/error — coincide con card.credit.text
  // ya documentado más arriba, confirmando que es el mismo alias.
  text: { primary: "#151211", secondary: "#2E2824", disabled: "#5C5653" },
  // `brand.primary` (#361C5C, plum/700) añadido en la Fase 2
  // (2026-09-03) al construir el Input: es el borde del estado
  // "focused" — mismo valor exacto que semanticAction.primary.bg.default
  // y button.primary.bg.default, pero es una variable de Figma distinta
  // (semantic/brand/primary) que Input referencia directamente.
  brand: { primary: "#361C5C" },
  // `feedback.error` (#E60C00, red/500) añadido en la Fase 2
  // (2026-09-03) al construir el Input: borde + helper text del estado
  // "error". No se añaden success/warning aquí porque Input no los usa
  // todavía (sí están resueltos en Badge.tsx, con sus propios comentarios).
  feedback: { error: "#E60C00" },
} as const;

/**
 * Colección "labels" de Figma — texto de máximo énfasis, distinto de los
 * colores por componente. Confirmado sobre "Quick Action Tile" (75:51).
 */
export const labels = {
  primary: "#000000",
} as const;

/**
 * Colores de acción semánticos — subcolección `semantic/action/*` de
 * Figma, distinta de `semantic.bg`/`semantic.border`/`semantic.text` de
 * arriba. Confirmados en la Fase 2 (2026-09-03) al construir el Toggle:
 * `semantic/action/primary/bg/default` resultó ser exactamente el mismo
 * valor que `button.primary.bg.default` (plum/700, #361C5C) — es el
 * token que Button referencia bajo un nombre propio y que Toggle
 * consume directo, igual que `semantic`/`labels` para Quick Action
 * Tile/Stat Item.
 */
export const semanticAction = {
  primary: {
    bg: { default: "#361C5C", disabled: "#F7F6F6" },
  },
} as const;

/**
 * Primitivos de la colección "Primitive Colors" de Figma consumidos
 * directamente (sin pasar por un token semántico), cuando ningún token
 * semántico existente encaja. Confirmado en la Fase 2 (2026-09-03):
 * `neutral/300` es el track "off" del Toggle — no hay un
 * un `semantic/action/.../off` (o similar) en la colección Semantic Colors,
 * así que se usa el primitivo tal cual, siguiendo la regla de
 * `figma-generate-library` de que reusar un primitivo directo es
 * preferible a inventar un token semántico nuevo que Figma no tiene.
 */
export const neutral = {
  "300": "#76726F",
  // `50` (#F7F6F6, neutral/50) añadido en la Fase 2 (2026-09-03) al
  // construir el Input: fondo del campo en el estado "disabled". Mismo
  // hex que button.primary.bg.disabled y semanticAction.primary.bg.disabled
  // (misma variable primitiva, consumida por distintos tokens semánticos
  // en Figma) — aquí se referencia el primitivo directo porque no hay un
  // semantic/bg/disabled genérico en la colección Semantic Colors.
  "50": "#F7F6F6",
  // `black` (#000000, neutral/black) añadido en la Fase 2 (2026-09-08) al
  // construir el Modal: color base del backdrop (fondo semi-transparente
  // detrás del sheet), consumido al 40% de opacity en tiempo de renderizado
  // (Modal.tsx aplica el canal alpha en CSS, no como variable de Figma
  // separada: el archivo no tiene una variable "backdrop" propia).
  "black": "#000000",
} as const;
