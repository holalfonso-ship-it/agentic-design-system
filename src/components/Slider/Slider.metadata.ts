/**
 * Metadata ejecutable — Pilar 1. Slider se diseñó primero en Figma (2026-10-14,
 * component set 235:163, página "02. Components") con cada color y espaciado
 * enlazado a variables reales, y después se llevó a código (Fase 5, familia
 * «Formularios»). Pista, relleno y pulgar son visuales; el control real es un
 * <input type="range"> nativo invisible que ocupa toda el área táctil de 44px.
 */
export const meta = {
  name: "Slider",
  category: "form",
  description:
    "Selector de un valor dentro de un rango, con label, valor visible y helper text opcional. Estados: default, focused y disabled.",
  figma: {
    library: "Aida",
    componentKey: "c2845b343a14f5b09e9e83468b07489f2d2f1e64",
    nodeId: "235:163",
    type: "component_set",
  },
  props: {
    label: "string (obligatorio)",
    helperText: "string",
    showValue: "boolean — muestra el valor actual junto al label (por defecto true)",
    formatValue: "(value: number) => string — texto del valor, p. ej. «40 %»; también se anuncia como aria-valuetext",
    disabled: "boolean",
    min: "number (por defecto 0)",
    max: "number (por defecto 100)",
    step: "number (por defecto 1)",
    value: "number — modo controlado; sin él, el componente guarda su propio valor",
    defaultValue: "number — valor inicial en modo no controlado",
    containerStyle: "CSSProperties — estilos del contenedor; `style` se aplica al <input>",
    "...rest": "resto de props nativas de <input type=range> (id, name, onChange, aria-describedby…), salvo 'type' y 'size'",
  },
  tokens: [
    "semantic.bg.surface",
    "semantic.border.default",
    "semantic.brand.primary",
    "semantic.text.primary",
    "semantic.text.secondary",
    "semantic.text.disabled",
    "semanticAction.primary.bg.default",
    "neutral.50",
    "neutral.300",
    "radius.full",
    "fontSize.label-sm",
    "lineHeight.label-sm",
    "space.6",
    "fontWeight.medium",
    "fontWeight.semibold",
  ],
  states: ["default", "focused", "disabled"],
  useWhen:
    "Elegir un valor dentro de un rango continuo cuando la precisión exacta no importa (volumen, brillo, filtro de precio aproximado). Si el usuario necesita un número exacto, usa Input.",
  a11y: {
    role: "slider (nativo, vía <input type=range>)",
    keyboardSupport: true,
    minTouchTarget: 44,
    notes:
      "El <input type=range> nativo ocupa toda el área (opacity 0), así que flechas, Inicio, Fin y Re Pág/Av Pág funcionan sin código. El <label htmlFor> da el nombre accesible. El valor visible es aria-hidden porque el input ya anuncia su valor; con formatValue se anuncia también como aria-valuetext. El anillo de foco (2px, semantic/brand/primary) aparece con onFocus/onBlur, como Input.",
  },
  guidelines: [
    {
      do: "Úsalo para un valor aproximado dentro de un rango: volumen, brillo, filtro de precio.",
      dont: "No lo uses cuando el usuario necesita un número exacto, como un importe a transferir: ahí va Input.",
      reason: "Arrastrar un pulgar es impreciso; para una cifra exacta escribirla es más rápido y fiable.",
    },
    {
      do: "Deja visible el valor junto al label y usa formatValue para añadir la unidad («40 %»).",
      dont: "No ocultes el valor con showValue={false} salvo que el contexto lo muestre ya en otro sitio.",
      reason: "Sin el valor el usuario tiene que estimarlo por la posición del pulgar; formatValue además lo anuncia con su unidad a los lectores de pantalla.",
    },
  ],
  dependencies: [],
} as const;
