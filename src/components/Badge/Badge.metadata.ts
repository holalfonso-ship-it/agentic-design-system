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
    library: "Aida",
    componentKey: "cb2b0282fce83320c1bc3c37e8cb822aea48ffc5",
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
    "lineHeight.label-sm",
    "fontFamily.base",
    "space.4",
    "space.6",
    "space.8",
    "fontWeight.medium",
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
  // Do's y don'ts (2026-10-14): texto de las guías de uso. Cada par se dibuja en la
  // story «Do's y don'ts» del componente; el ejemplo visual vive en la story.
  guidelines: [
    {
      do: "Una o dos palabras: «Completado».",
      dont: "No escribas frases completas dentro del Badge.",
      reason: "Es una etiqueta de estado en forma de pill; con una frase larga deja de leerse de un vistazo y desborda su contenedor.",
    },
    {
      do: "Elige la variante por lo que significa el estado: «Rechazado» va en error.",
      dont: "No elijas el color por estética ni lo contradigas con el texto.",
      reason: "El color es la primera señal del estado. Si dice success y el texto dice «Rechazado», el usuario recibe dos mensajes opuestos.",
    },
  ],
  dependencies: [],
  notes:
    "Nota de accesibilidad tomada en el diseño: la variante 'warning' usa sunflower/800 como color de texto, no semantic/feedback/warning (sunflower/500) directamente — sunflower/500 no tiene contraste suficiente sobre su propio bg-subtle (sunflower/50). No existe todavía un token semántico de 'warning text fuerte' en el archivo de Figma; candidato a proponerle a Alfonso para añadir a la colección Semantic Colors en una futura pasada de fundaciones. Corregido en el Audit de la Fase 3 (2026-09-14): estos tokens ahora existen de verdad en src/tokens/colors.ts (antes esta lista describía la intención pero el componente hardcodeaba los hex directamente) — re-verificados contra Figma vía get_variable_defs, valores sin cambios.",
} as const;
