/**
 * Metadata ejecutable — Pilar 1 del sistema de diseño agéntico.
 *
 * "Modal" no se extrajo de un diseño ya publicado en Figma: no existía
 * ningún modal/sheet en la librería (confirmado por búsqueda en la
 * Fase 2, 2026-09-03 — ver flags/hallazgos en README.md). Se construyó
 * desde cero directamente en Figma con el agente de Figma (skill
 * figma-generate-library + figma-use), bindeando cada fill/padding/radio/
 * tipografía a una variable real del archivo — cero valores hardcodeados
 * salvo el fondo del "Header + Icon" de documentación (no forma parte del
 * componente en sí). El código de este directorio se escribió después,
 * a partir de ese componente real. Es el último de los 5 componentes
 * ausentes originales de la Fase 2 (Input, Toggle, Badge, Avatar, Modal).
 *
 * Nota (2026-09-08): la primera versión de este componente en Figma no
 * tenía component properties (a diferencia de Toggle/Badge/Avatar/Input,
 * que exponen estado como variantes) — corregido el mismo día a raíz de
 * una pregunta directa de Alfonso ("¿y no tendrá propiedades?"). Se
 * añadieron 5: Title, Body, Secondary label, Primary label (TEXT) y
 * Show footer (BOOLEAN). Ver figma.componentProperties abajo.
 */
export const meta = {
  name: "Modal",
  category: "overlay",
  description:
    "Bottom sheet modal: backdrop + sheet (handle, header con título y botón cerrar, divider, body de contenido, footer con acción secundaria y primaria).",
  figma: {
    library: "Alfonso_Zamorano_Task_IDFinance",
    // Sin componentKey todavía: el nodo existe en el archivo (componente
    // 178:107, página "02. Components") pero componentKey solo se asigna
    // cuando la librería se publica desde Figma desktop — acción manual
    // que le corresponde a Alfonso. Node-id de referencia:
    // https://www.figma.com/design/3EHBqyJGvIfSG3CZol393z/Alfonso_Zamorano_Task_IDFinance?node-id=178-107
    componentKey: null,
    nodeId: "178:107",
    type: "component",
    // Component properties añadidas el 2026-09-08 (tras revisión de
    // Alfonso: la primera versión no tenía ninguna, a diferencia de
    // Toggle/Badge/Avatar/Input que sí exponen estado como variantes).
    // Mapean 1:1 a las props de React de abajo, salvo "Show footer"
    // (booleana, controla la visibilidad del footer completo) que en
    // código se deriva de si se pasan primaryActionLabel/onPrimaryAction
    // o un footer custom, no es una prop booleana independiente.
    componentProperties: {
      Title: "TEXT",
      Body: "TEXT",
      "Secondary label": "TEXT",
      "Primary label": "TEXT",
      "Show footer": "BOOLEAN",
    },
  },
  props: {
    open: "boolean (obligatorio)",
    onClose: "() => void (obligatorio)",
    title: "string (obligatorio)",
    children: "ReactNode (obligatorio) — contenido del body",
    primaryActionLabel: "string",
    onPrimaryAction: "() => void",
    secondaryActionLabel: "string (default: 'Cancelar')",
    onSecondaryAction: "() => void",
    footer: "ReactNode — sobreescribe el footer de dos botones por defecto",
  },
  tokens: [
    "semantic.bg.surface",
    "semantic.bg.default",
    "semantic.border.default",
    "semantic.text.primary",
    "semantic.text.secondary",
    "neutral.300",
    "neutral.black",
    "radius.lg",
    "radius.md",
    "radius.full",
    "fontSize.heading-md",
    "fontSize.body-md",
    "lineHeight.heading-md",
    "lineHeight.body-md",
  ],
  states: ["default"],
  useWhen:
    "Contenido o una acción que interrumpe el flujo actual y necesita foco exclusivo del usuario antes de continuar (confirmar una acción destructiva, un formulario corto, un detalle que no merece pantalla propia). No usar para mensajes breves no bloqueantes (ahí el patrón esperado es un toast/snackbar, que este sistema todavía no cubre) ni para flujos largos de varios pasos (mejor una pantalla dedicada).",
  a11y: {
    role: "dialog",
    keyboardSupport: false,
    minTouchTarget: 32,
    notes:
      "Renderizado con role=\"dialog\" y aria-modal=\"true\", con aria-label tomado de title. El botón de cerrar tiene aria-label propio (\"Cerrar\"). Limitaciones conocidas, no resueltas en esta fase: no hay focus trap (el foco de teclado puede salir del modal), no se cierra con Escape, y no se devuelve el foco al elemento que abrió el modal al cerrarlo. El botón cerrar (32×32) es menor que el mínimo táctil recomendado de 44×44, igual que el hit-area del Toggle — mismo patrón, misma nota pendiente de resolver a nivel de sistema.",
  },
  dependencies: ["Button"],
} as const;
