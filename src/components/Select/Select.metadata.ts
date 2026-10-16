/**
 * Metadata ejecutable — Pilar 1. Select se diseñó primero en Figma (2026-10-14,
 * component set 232:390, página "02. Components") con la misma estructura
 * Label / Field / Helper que Input, y después se llevó a código (Fase 5, familia
 * «Formularios»). El estado "open" del diseño lo pinta el navegador (<select>
 * nativo); no hay componente Select Option: las opciones son datos.
 */
export const meta = {
  name: "Select",
  category: "form",
  description:
    "Lista desplegable de una sola elección con label, placeholder y helper text opcionales. Soporta estado de error (con mensaje propio) y disabled.",
  figma: {
    library: "Aida",
    componentKey: "54f83af316c52775e0048ea1103f44394db6e30a",
    nodeId: "232:390",
    type: "component_set",
  },
  props: {
    label: "string (obligatorio)",
    options: "{ value: string; label: string; disabled?: boolean }[] (obligatorio)",
    placeholder: "string — se muestra como primera opción deshabilitada mientras no haya valor",
    helperText: "string",
    error: "boolean",
    errorText: "string — reemplaza a helperText cuando error=true, si se pasa",
    disabled: "boolean",
    containerStyle: "CSSProperties — estilos del contenedor; `style` se aplica al <select>",
    "...rest": "resto de props nativas de <select> (value, defaultValue, onChange, name, id, aria-describedby…), salvo 'size' y 'children'",
  },
  tokens: [
    "semantic.bg.surface",
    "semantic.border.strong",
    "semantic.border.default",
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
  states: ["default", "focused", "open", "error", "disabled"],
  useWhen:
    "Elegir una opción de una lista de más de cinco (país, categoría, divisa) o cuando falta espacio. Con 2 a 5 opciones, Radio las muestra a la vez; para texto libre, Input.",
  a11y: {
    role: "combobox/listbox (nativo, vía <select>)",
    keyboardSupport: true,
    minTouchTarget: 44,
    notes:
      "El <label htmlFor> apunta al <select id> (useId o el del consumidor). helperText/errorText viven fuera del <label> y se asocian con aria-describedby; el estado de error se anuncia con aria-invalid. El chevron es decorativo (aria-hidden). Al ser un <select> nativo, el desplegable y el teclado funcionan igual en móvil y escritorio.",
  },
  guidelines: [
    {
      do: "Usa un label que nombre el campo («País») y un placeholder que invite a elegir («Selecciona un país»).",
      dont: "No uses el placeholder como único nombre del campo.",
      reason: "El placeholder desaparece al elegir; el label es el nombre accesible del <select> y sigue visible siempre.",
    },
    {
      do: "Úsalo para más de cinco opciones o cuando falta espacio.",
      dont: "No lo uses para dos o tres opciones: ahí va Radio.",
      reason: "Con pocas opciones un desplegable obliga a abrir y cerrar para ver algo que cabía a la vista.",
    },
  ],
  dependencies: ["Icon"],
} as const;
