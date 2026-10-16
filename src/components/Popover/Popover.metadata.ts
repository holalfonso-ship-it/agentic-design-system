/**
 * Metadata ejecutable — Pilar 1. Popover se diseñó primero en Figma (2026-10-16,
 * componente 252:155, página "02. Components") con cada color, radio y espaciado
 * enlazado a variables, y después se llevó a código (Fase 5, familia «Overlay»).
 * Es el panel flotante no modal de la familia: sin variables nuevas, solo tokens
 * existentes (borde en vez de sombra, como Select y Card).
 */
export const meta = {
  name: "Popover",
  category: "overlay",
  description:
    "Panel flotante anclado a un elemento, con título opcional, contenido breve y una acción opcional. No es modal: no bloquea la pantalla y se cierra con Escape o al pulsar fuera.",
  figma: {
    library: "Aida",
    // Librería publicada (2026-10-16): la key es la del componente 252:155 en el archivo.
    componentKey: "1e81ba9c9dd4036d2b1ae34b2d3af54a1aeeb6ba",
    nodeId: "252:155",
    type: "component",
    // Mapean a las props de React de abajo; «Show title» y «Show action» en código se
    // derivan de pasar `title` y `actionLabel`, no son props booleanas.
    componentProperties: {
      Title: "TEXT",
      Body: "TEXT",
      Action: "TEXT",
      "Show title": "BOOLEAN",
      "Show action": "BOOLEAN",
    },
  },
  props: {
    trigger: "(props: PopoverTriggerProps) => ReactNode (obligatorio) — dibuja el elemento que lo abre y debe aplicarle las props recibidas",
    title: "string — título del panel, opcional; es también su nombre accesible",
    children: "ReactNode (obligatorio, el contenido: una o dos frases)",
    actionLabel: "string — texto de la acción opcional, al pie",
    onAction: "() => void — al pulsar la acción; después el popover se cierra",
    placement: ["bottom-start", "bottom-end", "top-start", "top-end"],
    open: "boolean — modo controlado; sin ella el componente gestiona su estado",
    defaultOpen: "boolean — abierto al empezar (modo no controlado)",
    onOpenChange: "(open: boolean) => void",
  },
  tokens: [
    "semantic.bg.surface",
    "semantic.border.default",
    "semantic.text.primary",
    "semantic.text.secondary",
    "button.tertiary.text.default",
    "radius.md",
    "fontSize.label-md",
    "fontSize.body-md",
    "lineHeight.label-md",
    "lineHeight.body-md",
    "fontFamily.base",
    "fontWeight.medium",
    "fontWeight.regular",
    "space.8",
    "space.16",
  ],
  states: ["cerrado", "abierto"],
  useWhen:
    "Ampliar con un párrafo corto lo que hay junto a un elemento: qué significa un dato, cómo se calcula, un consejo con una acción de seguimiento. Acompaña sin bloquear. Para una ayuda de una frase, Tooltip; para una decisión que interrumpe, Modal; para filtros o ajustes de una pantalla, Drawer; para una lista de acciones, DropdownMenu.",
  a11y: {
    role: "dialog",
    keyboardSupport: true,
    minTouchTarget: 44,
    notes:
      "Panel con role=\"dialog\" sin aria-modal (no es modal), nombrado por su título (aria-labelledby) o, sin título, por aria-label. El elemento que lo abre recibe aria-haspopup=\"dialog\", aria-expanded y aria-controls. Al abrirse el foco entra en el panel (en la acción si la hay); Escape lo cierra y devuelve el foco al elemento que lo abrió; también se cierra al pulsar fuera o al sacar el foco del panel. No atrapa el foco: Tab sigue su camino. La acción mide 44 de alto de área táctil. Contraste: texto secundario #2E2824 sobre blanco 14,5:1; acción #361C5C sobre blanco 14,2:1.",
  },
  guidelines: [
    {
      do: "Úsalo para una explicación corta junto a un elemento, con una acción como mucho.",
      dont: "No metas un formulario ni varios pasos dentro de un Popover.",
      reason: "Se cierra al pulsar fuera o al cambiar el foco, y lo escrito se perdería. Lo que pide entrada del usuario va en un Modal o un Drawer.",
    },
    {
      do: "Dibuja el botón dentro de `trigger` y aplícale las props que recibes.",
      dont: "No pongas un botón por tu cuenta que abra el popover con un estado propio.",
      reason: "Sin las props, el botón no anuncia aria-expanded ni aria-controls y el lector de pantalla no sabe que abre un panel.",
    },
  ],
  dependencies: [],
} as const;
