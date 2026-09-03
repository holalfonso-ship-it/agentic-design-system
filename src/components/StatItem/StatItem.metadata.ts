/**
 * Metadata ejecutable — Pilar 1 del sistema de diseño agéntico.
 * Fuente: componente "Stat Item" (node 75:597, componentKey
 * a753e4476a…) en la librería Figma "Alfonso_Zamorano_Task_IDFinance".
 * Descubierto en la sesión de Fase 2 del 2026-09-03 (no catalogado en
 * Fase 0).
 */
export const meta = {
  name: "StatItem",
  category: "data-display",
  description:
    "Bloque de estadística pequeño para la fila de resumen de balance del home (Balance total / Total Gastos): icono direccional + etiqueta + importe.",
  figma: {
    library: "Alfonso_Zamorano_Task_IDFinance",
    componentKey: "a753e4476aae8f8dc1eb570a2b14c75a624f70a6",
    type: "component",
  },
  props: {
    icon: "ReactNode (obligatorio, sin default)",
    label: "string",
    amount: "string",
  },
  tokens: ["semantic.text.secondary", "fontSize.label-md", "fontSize.heading-lg"],
  states: ["default"],
  useWhen:
    "Fila de resumen de balance en el home (p. ej. 'Balance total', 'Total Gastos'): un StatItem por métrica, con un icono direccional que comunica si el número sube o baja. No usar para tarjetas de producto (crédito/BNPL) — para eso, ProductCard. No usar para una acción táctil — para eso, QuickActionTile.",
  a11y: {
    role: "text",
    keyboardSupport: false,
    minTouchTarget: null,
    notes:
      "Puramente presentacional, no interactivo. El icono es decorativo salvo que comunique información no repetida en el texto (p. ej. la dirección de la tendencia) — en ese caso debe llevar aria-label o texto oculto equivalente en vez de depender solo del color/forma.",
  },
  dependencies: [],
  notes:
    "La prop `icon` es obligatoria a propósito: en Figma se intercambia entre arrow.up.right.circle.fill y arrow.down.left.circle.fill, pero ninguno de los dos assets se pudo descargar en esta sesión — el egress de red del entorno de Cowork bloquea figma.com por política de la organización (confirmado con curl, tanto desde la VM del dispositivo como desde el contenedor cloud). Estos dos son los primeros candidatos confirmados para el componente Icon planeado en la Fase 2.",
} as const;
