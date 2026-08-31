/**
 * Metadata ejecutable — Pilar 1 del sistema de diseño agéntico.
 * Fuente: component set "Button" (componentKey 0784c9db…) en la librería
 * Figma "Alfonso_Zamorano_Task_IDFinance".
 */
export const meta = {
  name: "Button",
  category: "action",
  description:
    "Acción primaria, secundaria o terciaria disparada por el usuario. Único punto de interacción táctil por vista relevante.",
  figma: {
    library: "Alfonso_Zamorano_Task_IDFinance",
    componentKey: "0784c9dbdf145332fe89fda98d11d14d3ac9794b",
    type: "component_set",
  },
  props: {
    variant: ["primary", "secondary", "tertiary"],
    size: ["sm", "md", "lg"],
    disabled: "boolean",
  },
  tokens: [
    "button.primary.bg",
    "button.primary.text",
    "button.secondary.bg",
    "button.secondary.border",
    "button.secondary.text",
    "button.tertiary.text",
    "radius.md",
    "fontSize.label-md",
  ],
  states: ["default", "hover", "pressed", "disabled"],
  useWhen:
    "Una sola acción clara por pantalla o sección. Usa 'primary' para la acción principal, 'secondary' para una alternativa con el mismo peso visual reducido, 'tertiary' para acciones de bajo énfasis (p. ej. 'cancelar'). No usar para navegación — para eso, un componente Link.",
  a11y: {
    role: "button",
    keyboardSupport: true,
    minTouchTarget: 44,
    notes: "El estado disabled debe comunicarse también por atributo aria-disabled, no solo por color.",
  },
  dependencies: [],
} as const;
