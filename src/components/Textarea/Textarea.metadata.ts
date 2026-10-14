/**
 * Metadata ejecutable — Pilar 1. Textarea se diseñó primero en Figma (2026-10-14,
 * component set 234:165, página "02. Components") con la estructura
 * Label / Field / Helper de Input y Select, y después se llevó a código
 * (Fase 5, familia «Formularios»). Usa semantic/border/strong en el borde del
 * campo porque border/default da solo ~1,8:1 sobre blanco.
 */
export const meta = {
  name: "Textarea",
  category: "form",
  description:
    "Campo de texto de varias líneas con label y helper text opcional. Soporta estado de error (con mensaje propio) y disabled.",
  figma: {
    library: "Aida",
    componentKey: "e05ab7d980fbb6a213d626506daee2d93b17c8e5",
    nodeId: "234:165",
    type: "component_set",
  },
  props: {
    label: "string (obligatorio)",
    helperText: "string",
    error: "boolean",
    errorText: "string — reemplaza a helperText cuando error=true, si se pasa",
    disabled: "boolean",
    rows: "number — líneas visibles iniciales (por defecto 3)",
    containerStyle: "CSSProperties — estilos del contenedor; `style` se aplica al <textarea>",
    "...rest": "resto de props nativas de <textarea> (id, value, defaultValue, onChange, maxLength, placeholder, aria-describedby…), salvo 'cols'",
  },
  tokens: [
    "semantic.bg.surface",
    "semantic.border.default",
    "semantic.border.strong",
    "semantic.brand.primary",
    "semantic.feedback.error",
    "semantic.text.primary",
    "semantic.text.secondary",
    "semantic.text.disabled",
    "neutral.50",
    "radius.sm",
    "fontSize.label-sm",
    "fontSize.body-md",
    "lineHeight.label-sm",
    "lineHeight.body-md",
    "space.6",
    "space.12",
    "fontWeight.medium",
    "fontWeight.semibold",
  ],
  states: ["default", "focused", "error", "disabled"],
  useWhen:
    "Texto libre de varias líneas: mensaje, comentario, descripción, motivo. Para una sola línea (nombre, email, importe) usa Input; para elegir entre opciones predefinidas, Select o Radio.",
  a11y: {
    role: "textbox multilínea (nativo, vía <textarea>)",
    keyboardSupport: true,
    minTouchTarget: 96,
    notes:
      "El <label htmlFor> apunta al <textarea id> (useId o el del consumidor), así que el nombre accesible es solo `label`. helperText/errorText viven fuera del <label> y se asocian con aria-describedby; el error se anuncia con aria-invalid. El redimensionado vertical es el nativo del navegador (desactivado en disabled).",
  },
  guidelines: [
    {
      do: "Da altura suficiente para la respuesta esperada con `rows` y deja que el usuario la amplíe.",
      dont: "No uses un Textarea de una línea para un dato corto.",
      reason: "Un campo muy alto para un nombre confunde sobre qué se espera, y uno de una línea para un comentario esconde lo que se escribe; para una línea, Input.",
    },
    {
      do: "Di el límite o el formato en helperText («Máximo 280 caracteres») y que errorText explique cómo corregirlo.",
      dont: "No dejes un límite sin avisar ni uses solo el borde rojo como error.",
      reason: "Descubrir el límite al enviar es frustrante, y el color solo no basta: errorText se asocia al campo con aria-describedby para que también se anuncie.",
    },
  ],
  dependencies: [],
} as const;
