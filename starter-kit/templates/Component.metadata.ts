/**
 * Metadata ejecutable — Pilar 1.
 *
 * Copia este archivo a src/components/<Nombre>/<Nombre>.metadata.ts y rellénalo.
 * Sin metadata, el componente no existe para el índice ni para los agentes.
 *
 * Reglas para que generate-index.mjs la lea bien:
 *  - Mantén `export const meta = { ... } as const;` como objeto literal simple.
 *  - Strings entre comillas y arrays planos (sin spreads ni variables).
 */
export const meta = {
  // Obligatorios ---------------------------------------------------------
  name: "NombreDelComponente",
  category: "action", // action | navigation | data-display | form | overlay (o las tuyas)
  description:
    "Una o dos frases: qué es y qué variantes tiene. Sin marketing.",
  props: {
    variant: ["primary", "secondary"],
    children: "ReactNode (obligatorio)",
  },
  tokens: [
    // Solo tokens que existan de verdad en tu carpeta de tokens.
    // Ningún hex ni px hardcodeado que ya sea un token.
    "color.action.primary",
    "radius.md",
    "space.16",
  ],
  states: ["default", "hover", "disabled"],
  useWhen:
    "Cuándo usarlo. Y, igual de importante, cuándo NO: nombra el componente que corresponde en su lugar.",
  a11y: {
    role: "button",
    keyboardSupport: true,
    minTouchTarget: 44,
    notes: "Qué garantiza el componente y qué debe aportar quien lo usa.",
  },

  // Opcionales -----------------------------------------------------------
  dependencies: [], // otros componentes que renderiza, p. ej. ["Button"]
  figma: {
    // Rellena si el componente existe en Figma; si no, borra el bloque.
    library: "Mi librería",
    componentKey: "",
    nodeId: "",
    type: "component_set",
  },
  notes: "Decisiones, deuda conocida, cosas que un agente debería saber.",
} as const;
