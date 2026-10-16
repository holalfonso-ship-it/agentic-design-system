/**
 * Metadata ejecutable — Pilar 1. Checkbox se diseñó primero en Figma (2026-10-14,
 * component set 231:168, página "02. Components") con cada color, radio y espaciado
 * enlazado a variables reales, y después se llevó a código (Fase 5, familia
 * «Formularios»). Usa semantic/border/strong en vez de border/default porque este
 * último da solo ~1,8:1 sobre blanco.
 */
export const meta = {
  name: "Checkbox",
  category: "form",
  description:
    "Casilla de verificación con label. Estados: sin marcar, marcada e indeterminada, cada una en default, focused, error y disabled.",
  figma: {
    library: "Aida",
    componentKey: "64308870f554e46ca01351a20ec053e335a978b4",
    nodeId: "231:168",
    type: "component_set",
  },
  props: {
    label: "string (obligatorio)",
    indeterminate: "boolean — estado mixto de un padre cuyas hijas están a medias; es solo visual, no un tercer valor",
    error: "boolean",
    disabled: "boolean",
    checked: "boolean — modo controlado; sin él, el componente guarda su propio estado",
    defaultChecked: "boolean — valor inicial en modo no controlado",
    containerStyle: "CSSProperties — estilos del <label> contenedor; `style` se aplica al <input>",
    "...rest": "resto de props nativas de <input type=checkbox> (name, value, onChange, id…), salvo 'type' y 'size'",
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
    "semanticAction.primary.text.default",
    "neutral.50",
    "radius.xs",
    "radius.sm",
    "space.12",
    "fontSize.body-md",
    "lineHeight.body-md",
  ],
  states: ["unchecked", "checked", "indeterminate", "focused", "error", "disabled"],
  useWhen:
    "Una o varias opciones independientes que se confirman con un botón (aceptar condiciones, elegir varios elementos de una lista). Para un ajuste que se aplica al instante usa Toggle; para elegir una sola opción entre varias, Radio.",
  a11y: {
    role: "checkbox (nativo, vía <input type=checkbox>)",
    keyboardSupport: true,
    minTouchTarget: 44,
    notes:
      "El <input> nativo ocupa la casilla (opacity 0) dentro de un <label>, así que Espacio, clic en el texto y el nombre accesible funcionan sin ARIA. `indeterminate` se aplica a la propiedad DOM del input. El anillo de foco (2px, semantic/brand/primary) aparece con onFocus/onBlur, como Input. aria-invalid se añade con error.",
  },
  guidelines: [
    {
      do: "Escribe el label como afirmación de lo que se activa: «Acepto recibir avisos por email».",
      dont: "No uses labels negativos como «No quiero no recibir avisos».",
      reason: "Marcar la casilla debe significar «sí». Con una negación el usuario tiene que invertir la frase en la cabeza y se equivoca más.",
    },
    {
      do: "Úsalo en un formulario que se envía con un botón, o para elegir varios elementos a la vez.",
      dont: "No lo uses para un ajuste que se aplica al instante: ahí va Toggle.",
      reason: "Una casilla comunica «se enviará al guardar»; un interruptor comunica «ya está activo». Mezclarlos confunde cuándo se aplica el cambio.",
    },
  ],
  dependencies: ["Icon"],
} as const;
