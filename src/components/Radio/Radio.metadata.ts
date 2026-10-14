/**
 * Metadata ejecutable — Pilar 1. Radio se diseñó primero en Figma (2026-10-14,
 * component set 232:282, página "02. Components") y después se llevó a código
 * (Fase 5, familia «Formularios»). No existe todavía un RadioGroup: el grupo se
 * forma con varios Radio que comparten `name`, dentro de <fieldset><legend>.
 */
export const meta = {
  name: "Radio",
  category: "form",
  description:
    "Opción única dentro de un grupo, con label. Estados: sin elegir y elegida, cada una en default, focused, error y disabled.",
  figma: {
    library: "Aida",
    componentKey: "2beac255398deff2884f312ed7cdf8343c4a8e0b",
    nodeId: "232:282",
    type: "component_set",
  },
  props: {
    label: "string (obligatorio)",
    error: "boolean",
    disabled: "boolean",
    checked: "boolean — modo controlado",
    defaultChecked: "boolean — valor inicial en modo no controlado",
    containerStyle: "CSSProperties — estilos del <label> contenedor; `style` se aplica al <input>",
    "...rest": "resto de props nativas de <input type=radio> (name, value, onChange, id…), salvo 'type' y 'size'",
  },
  tokens: [
    "semantic.bg.surface",
    "semantic.border.default",
    "semantic.border.strong",
    "semantic.brand.primary",
    "semantic.feedback.error",
    "semantic.text.primary",
    "semantic.text.disabled",
    "semanticAction.primary.bg.default",
    "neutral.50",
    "radius.full",
    "space.12",
    "fontSize.body-md",
    "lineHeight.body-md",
  ],
  states: ["unselected", "selected", "focused", "error", "disabled"],
  useWhen:
    "Elegir una sola opción entre pocas (2 a 5) que conviene ver a la vez: método de pago, frecuencia, tamaño. Para listas largas usa Select; para opciones que se pueden combinar, Checkbox.",
  a11y: {
    role: "radio (nativo, vía <input type=radio>)",
    keyboardSupport: true,
    minTouchTarget: 44,
    notes:
      "El agrupado, las flechas del teclado y el anuncio «1 de 3» los da el navegador a partir del `name` compartido. Envuelve el grupo en <fieldset><legend> para que se anuncie la pregunta. `error` es solo visual (aria-invalid no está permitido en role=radio): explica el error en texto y asócialo al <fieldset> con aria-describedby. El punto se resincroniza con el input nativo, así que funciona en grupos no controlados.",
  },
  guidelines: [
    {
      do: "Agrupa los Radio con el mismo name dentro de un fieldset con legend.",
      dont: "No dejes Radio sueltos, sin name común ni pregunta.",
      reason: "Sin name compartido el navegador no los trata como una sola elección, y sin legend el lector de pantalla anuncia opciones sin decir de qué.",
    },
    {
      do: "Úsalo con pocas opciones (2 a 5) para poder compararlas de un vistazo.",
      dont: "No lo uses con listas largas: ahí va Select.",
      reason: "Con muchas opciones el grupo ocupa media pantalla y obliga a hacer scroll para compararlas; un desplegable las recoge en una línea.",
    },
  ],
  dependencies: [],
} as const;
