/**
 * Metadata ejecutable — Pilar 1. Dropdown menu y Menu item se diseñaron primero en Figma
 * (2026-10-16: Menu item, component set 253:211, con state × tone; Dropdown menu,
 * componente 253:212, página "02. Components") con cada color, radio y espaciado enlazado
 * a variables, y después se llevaron a código (Fase 5, familia «Overlay»). Un único
 * componente de código, `DropdownMenu`, cubre los dos: la fila (Menu item) se dibuja desde
 * la lista `items`. Reutiliza el catálogo de Icon (iconos de fila y check) y añadió una
 * primitiva, red/900, para el texto destructivo.
 */
export const meta = {
  name: "DropdownMenu",
  category: "overlay",
  description:
    "Lista de acciones anclada a un botón. Cada fila (Menu item) lleva icono opcional, etiqueta y marca de selección; tone=destructive para lo que borra o bloquea; admite separadores y filas deshabilitadas.",
  figma: {
    library: "Aida",
    // Librería publicada (2026-10-16): la key es la del componente 253:212 (Dropdown menu).
    // La fila es el component set Menu item, 253:211, key 0bb9fc1cd5e79099c6459a05929d110e267488d7.
    componentKey: "bbfd6fb04b8738a081a7fc79f2654737b651f90f",
    nodeId: "253:212",
    type: "component",
    // Menu item (253:211): state = default | hover | focused | disabled; tone = default | destructive.
    // En código hover y focused salen del puntero y del teclado; disabled y tone son props de cada fila.
    componentProperties: {
      Label: "TEXT",
      Selected: "BOOLEAN",
      "Show icon": "BOOLEAN",
    },
  },
  props: {
    trigger: "(props: DropdownMenuTriggerProps) => ReactNode (obligatorio) — dibuja el botón que lo abre y debe aplicarle las props recibidas",
    items: "readonly DropdownMenuEntry[] (obligatorio) — filas { label, icon?, selected?, tone?: 'default' | 'destructive', disabled?, onSelect? } o { type: 'divider' }",
    placement: ["bottom-start", "bottom-end", "top-start", "top-end"],
    open: "boolean — modo controlado; sin ella el componente gestiona su estado",
    defaultOpen: "boolean — abierto al empezar (modo no controlado)",
    onOpenChange: "(open: boolean) => void",
  },
  tokens: [
    "semantic.bg.surface",
    "semantic.bg.default",
    "semantic.border.default",
    "semantic.text.primary",
    "semantic.text.disabled",
    "semantic.brand.primary",
    "semantic.feedback.error-subtle",
    "red.900",
    "radius.md",
    "radius.sm",
    "fontSize.body-md",
    "lineHeight.body-md",
    "fontFamily.base",
    "fontWeight.regular",
    "space.2",
    "space.4",
    "space.12",
  ],
  states: ["cerrado", "abierto", "fila: default", "fila: hover", "fila: focused", "fila: disabled"],
  useWhen:
    "Agrupar varias acciones secundarias de un elemento (los ajustes de una tarjeta, las opciones de un movimiento) detrás de un solo botón. Cada fila hace algo al elegirla. Para elegir un valor dentro de un formulario, Select; para una explicación, Popover; para una sola acción, un Button.",
  a11y: {
    role: "menu",
    keyboardSupport: true,
    minTouchTarget: 44,
    notes:
      "Contenedor con role=\"menu\" y filas con role=\"menuitem\" (o menuitemcheckbox con aria-checked si la fila lleva `selected`); los separadores son role=\"separator\". El botón que lo abre recibe aria-haspopup=\"menu\", aria-expanded y aria-controls, y flecha abajo en él abre el menú. Dentro: flecha abajo y arriba recorren las filas habilitadas (en círculo), Inicio y Fin saltan a la primera y la última, Intro o Espacio eligen y cierran, Escape cierra y devuelve el foco al botón, Tab cierra y sigue su camino. La fila deshabilitada lleva aria-disabled y se salta al recorrer. Cada fila mide 44 de alto. El foco se ve con un anillo de 2 px de semantic.brand.primary dentro de la fila. Contraste: texto destructivo red/900 #5A0702 sobre blanco 14,3:1 y sobre el hover rojo claro 12:1; deshabilitado #5C5653 sobre blanco 7,2:1.",
  },
  guidelines: [
    {
      do: "Pon la acción destructiva la última, con tone=\"destructive\" y un separador encima.",
      dont: "No mezcles «Eliminar» entre el resto de filas sin teñirla ni separarla.",
      reason: "Es la fila que cuesta deshacer. Separada y en rojo, no se pulsa por inercia al recorrer la lista.",
    },
    {
      do: "Úsalo para acciones: cada fila hace algo al elegirla («Congelar tarjeta»).",
      dont: "No lo uses para escoger el valor de un campo de formulario.",
      reason: "Un campo necesita etiqueta, valor visible y validación; eso es un Select. El menú no deja rastro de lo elegido.",
    },
  ],
  dependencies: ["Icon"],
} as const;
