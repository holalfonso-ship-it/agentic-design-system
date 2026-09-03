/**
 * Metadata ejecutable — Pilar 1 del sistema de diseño agéntico.
 *
 * Al igual que "Toggle" y "Badge", "Input" no se extrajo de un diseño ya
 * publicado en Figma: no existía ningún campo de texto en la librería
 * (confirmado por búsqueda en la Fase 2, 2026-09-03). Se construyó desde
 * cero directamente en Figma con el agente de Figma (skill
 * figma-generate-library + figma-use), bindeando cada fill/padding/radius/
 * tipografía a una variable real del archivo — cero valores hardcodeados.
 * El código de este directorio se escribió después, a partir de ese
 * componente real (component_set 173:119, página "02. Components").
 *
 * A diferencia de Toggle/Badge/Avatar, el estado "focused" no se modela
 * con una prop — se detecta con onFocus/onBlur de React, igual que un
 * <input> nativo, porque así es como se usa en la práctica. El
 * component_set de Figma sí tiene una variante "focused" propia (para
 * poder visualizarla en el archivo de diseño), pero el código la deriva
 * en runtime en vez de exigir que el consumidor la controle.
 */
export const meta = {
  name: "Input",
  category: "form",
  description:
    "Campo de texto de una sola línea con label y helper text opcional. Soporta estado de error (con mensaje propio) y disabled.",
  figma: {
    library: "Alfonso_Zamorano_Task_IDFinance",
    // Sin componentKey todavía: el nodo existe en el archivo (component
    // set 173:119, página "02. Components") pero componentKey solo se
    // asigna cuando la librería se publica desde Figma desktop — acción
    // manual que le corresponde a Alfonso. Node-id de referencia:
    // https://www.figma.com/design/3EHBqyJGvIfSG3CZol393z/Alfonso_Zamorano_Task_IDFinance?node-id=173-119
    componentKey: null,
    nodeId: "173:119",
    type: "component_set",
  },
  props: {
    label: "string (obligatorio)",
    helperText: "string",
    error: "boolean",
    errorText: "string — reemplaza a helperText cuando error=true, si se pasa",
    disabled: "boolean",
    "...rest": "resto de props nativas de <input>, salvo 'size'",
  },
  tokens: [
    "semantic.bg.surface",
    "semantic.border.default",
    "semantic.brand.primary",
    "semantic.feedback.error",
    "semantic.text.primary",
    "semantic.text.secondary",
    "semantic.text.disabled",
    "neutral.50",
    "radius.md",
    "fontSize.label-sm",
    "fontSize.body-md",
    "lineHeight.label-sm",
    "lineHeight.body-md",
  ],
  states: ["default", "focused", "error", "disabled"],
  useWhen:
    "Entrada de texto libre de una línea dentro de un formulario (nombre, email, importe, búsqueda simple). Para selección entre opciones predefinidas no es el patrón correcto — ahí correspondería un Select o RadioGroup (no existen todavía en este repo).",
  a11y: {
    role: "textbox (nativo, vía <input>)",
    keyboardSupport: true,
    minTouchTarget: 48,
    notes:
      "El label envuelve el campo (<label><span>texto</span><input/></label>), por lo que queda asociado automáticamente sin necesitar htmlFor/id. El estado de error debe comunicarse también con aria-invalid en el consumidor si se integra con validación de formularios más estricta — no lo añade este componente por sí solo todavía.",
  },
  dependencies: [],
} as const;
