/**
 * Metadata ejecutable — Pilar 1. Drawer se diseñó primero en Figma (2026-10-16, component
 * set 254:237 con side = end | start, página "02. Components") con cada color, radio y
 * espaciado enlazado a variables, y después se llevó a código (Fase 5, familia «Overlay»).
 * Comparte con Modal el comportamiento de diálogo mediante el hook useModalBehavior
 * (src/hooks), extraído al llegar el segundo consumidor.
 */
export const meta = {
  name: "Drawer",
  category: "overlay",
  description:
    "Panel lateral modal de 280 px: fondo oscurecido, cabecera con título y botón cerrar, divider, cuerpo con scroll y footer opcional con acción secundaria y primaria. Entra por el lado final (side=end) o el inicial (side=start).",
  figma: {
    library: "Aida",
    // Librería publicada (2026-10-16): la key es la del component set 254:237 en el archivo.
    componentKey: "0abde49a4779fbeec4b2e2a586244d551b211abf",
    nodeId: "254:237",
    type: "component_set",
    // Mapean a las props de React de abajo, salvo «Show footer», que en código se deriva de
    // pasar las acciones o un footer propio.
    componentProperties: {
      Title: "TEXT",
      Body: "TEXT",
      "Show footer": "BOOLEAN",
    },
  },
  props: {
    open: "boolean (obligatorio)",
    onClose: "() => void (obligatorio)",
    title: "string (obligatorio)",
    children: "ReactNode (obligatorio) — contenido del cuerpo",
    side: ["end", "start"],
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
    "neutral.black",
    "radius.lg",
    "radius.full",
    "fontSize.heading-md",
    "fontSize.body-md",
    "lineHeight.heading-md",
    "lineHeight.body-md",
    "fontFamily.base",
    "fontWeight.semibold",
    "fontWeight.regular",
    "space.8",
    "space.12",
    "space.16",
    "space.24",
  ],
  states: ["cerrado", "abierto"],
  useWhen:
    "Contenido que acompaña a la pantalla pero necesita foco mientras se usa: filtros, ajustes, un formulario corto, el detalle de un elemento de una lista. Para una decisión corta (confirmar, cancelar), Modal; para algo que no bloquea, Popover; para una navegación permanente, una barra o pestañas.",
  a11y: {
    role: "dialog",
    keyboardSupport: true,
    minTouchTarget: 44,
    notes:
      "Panel con role=\"dialog\" y aria-modal=\"true\", con aria-label tomado de title. Al abrirse el foco entra en el panel (en el botón Cerrar si no hay otro control antes); Escape lo cierra, Tab y Shift+Tab quedan dentro y el foco vuelve al elemento que lo abrió (mismo hook que Modal). También se cierra con el botón «Cerrar» (hit target 44×44, círculo visual 32×32) o al pulsar el fondo. El cuerpo hace scroll si el contenido no cabe. Contraste: texto secundario #2E2824 sobre blanco 14,5:1.",
  },
  guidelines: [
    {
      do: "Úsalo para filtros, ajustes o un formulario corto que acompaña a la pantalla.",
      dont: "No lo uses para confirmar una acción de una frase como «¿Eliminar?».",
      reason: "El Drawer ocupa un lado entero de la pantalla. Una decisión corta se resuelve mejor y más rápido en un Modal.",
    },
    {
      do: "Deja el cuerpo para el contenido y las acciones («Cancelar» y «Aplicar») en el footer.",
      dont: "No lo uses como menú de navegación permanente de la aplicación.",
      reason: "Es modal: tapa la pantalla con un fondo oscuro y se cierra al elegir. Una navegación que siempre debe estar disponible va en la propia pantalla.",
    },
  ],
  dependencies: ["Button", "Icon"],
} as const;
