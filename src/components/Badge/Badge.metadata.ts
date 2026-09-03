/**
 * Metadata ejecutable — Pilar 1 del sistema de diseño agéntico.
 *
 * Igual que Toggle: "Badge" no se extrajo de un diseño ya publicado en
 * Figma — se confirmó por búsqueda que no existía un componente Badge
 * de UI (solo iconos sueltos con "badge" en el nombre, ver README). Se
 * construyó desde cero en Figma con el agente (figma-generate-library +
 * figma-use), bindeando cada fill a una variable real del archivo.
 */
export const meta = {
  name: "Badge",
  category: "data-display",
  description:
    "Etiqueta de estado corta (dot + texto) en forma de pill. Cuatro variantes de color: success, error, warning, neutral.",
  figma: {
    library: "Alfonso_Zamorano_Task_IDFinance",
    // Sin componentKey todavía — igual que Toggle, pendiente de que
    // Alfonso publique la librería desde Figma desktop.
    componentKey: null,
    nodeId: "165:119",
    type: "component_set",
  },
  props: {
    variant: ["success", "error", "warning", "neutral"],
    children: "ReactNode (obligatorio, el texto del badge)",
  },
  tokens: [
    "semantic.feedback.success",
    "semantic.feedback.success-subtle",
    "semantic.feedback.error",
    "semantic.feedback.error-subtle",
    "sunflower.50",
    "sunflower.800",
    "neutral.50",
    "semantic.text.secondary",
    "radius.full",
    "fontSize.label-sm",
  ],
  states: ["success", "error", "warning", "neutral"],
  useWhen:
    "Comunicar el estado de algo (una transacción, una verificación, un producto) en una etiqueta corta de una o dos palabras. No usar para acciones interactivas — para eso, Button o Toggle. No usar para navegación.",
  a11y: {
    role: "status",
    keyboardSupport: false,
    minTouchTarget: null,
    notes:
      "Puramente presentacional, no interactivo. El color no es el único portador de significado: el texto siempre acompaña al dot, así que no depende solo del color para comunicar el estado.",
  },
  dependencies: [],
  notes:
    "Nota de accesibilidad tomada en el diseño: la variante 'warning' usa sunflower/800 como color de texto, no semantic/feedback/warning (sunflower/500) directamente — sunflower/500 no tiene contraste suficiente sobre su propio bg-subtle (sunflower/50). No existe todavía un token semántico de 'warning text fuerte' en el archivo de Figma; candidato a proponerle a Alfonso para añadir a la colección Semantic Colors en una futura pasada de fundaciones.",
} as const;
