/**
 * Metadata ejecutable — Pilar 1 del sistema de diseño agéntico.
 * Fuente: componente "Quick Action Tile" (node 75:51, componentKey
 * 35e5a3a3e2…) en la librería Figma "Alfonso_Zamorano_Task_IDFinance".
 * Descubierto en la sesión de Fase 2 del 2026-09-03 (no catalogado en
 * Fase 0).
 */
export const meta = {
  name: "QuickActionTile",
  category: "action",
  description:
    "Tile de acción rápida para la fila de acciones del home. Combina un icono intercambiable con un título y un subtítulo cortos.",
  figma: {
    library: "Alfonso_Zamorano_Task_IDFinance",
    componentKey: "35e5a3a3e20ad89f76bbdc68ed46784ace1a475f",
    type: "component",
  },
  props: {
    icon: "ReactNode (obligatorio, sin default)",
    title: "string",
    subtitle: "string",
  },
  tokens: [
    "semantic.bg.default",
    "semantic.border.default",
    "semantic.text.disabled",
    "labels.primary",
    "radius.lg",
    "fontSize.body-lg",
    "fontSize.label-sm",
  ],
  states: ["default"],
  useWhen:
    "Fila de acciones rápidas del home (p. ej. 'Transferencias', 'Pagar', 'Recargar'): un tile por acción, icono + título + subtítulo corto. No usar para navegación entre pantallas — para eso, TabBar. No usar para mostrar una métrica sin acción — para eso, StatItem.",
  a11y: {
    role: "button",
    keyboardSupport: true,
    minTouchTarget: 44,
    notes:
      "En Figma el tile completo es el área táctil. Si se usa como control interactivo, el consumidor debe envolverlo en un elemento focuseable (button o role='button') con soporte de teclado — este componente es presentacional por sí mismo, no gestiona onClick.",
  },
  dependencies: [],
  notes:
    "La prop `icon` es obligatoria a propósito: en Figma el nodo por defecto trae un 'Calendar Icon' (SVG), pero el asset no se pudo descargar en esta sesión — el egress de red del entorno de Cowork bloquea figma.com por política de la organización (confirmado con curl, tanto desde la VM del dispositivo como desde el contenedor cloud). Cuando exista el componente Icon (Fase 2, en curso), sustituir por <Icon name=\"calendar\" /> o el nombre SF Symbol real una vez identificado.",
} as const;
