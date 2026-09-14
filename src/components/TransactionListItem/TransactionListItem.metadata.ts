export const meta = {
  name: "TransactionListItem",
  category: "data-display",
  description: "Fila de una transacción individual dentro del historial de movimientos.",
  figma: {
    library: "Alfonso_Zamorano_Task_IDFinance",
    componentKey: "7d433c686e62c82b27d9d05cfff0e814bae9b117",
    // nodeId localizado en el Audit de la Fase 3 (2026-09-14) — no
    // estaba documentado hasta ahora (solo se conocía el componentKey,
    // de la extracción original de Fase 0). Component set real:
    // variantes sign=negative / sign=positive.
    nodeId: "76:91",
    type: "component_set",
  },
  props: {
    icon: "ReactNode?",
    merchant: "string",
    category: "string?",
    amount: "string",
    direction: ["in", "out"],
    timestamp: "string?",
  },
  tokens: ["fontSize.body-md", "fontSize.caption", "semantic.text.primary", "semantic.text.secondary", "semantic.feedback.success", "semantic.feedback.error"],
  states: ["in", "out"],
  useWhen:
    "Para listar movimientos/transacciones en un feed o historial. Para resumir un producto financiero completo (no una transacción puntual), usar ProductCard.",
  a11y: {
    role: "listitem",
    keyboardSupport: false,
    notes: "El monto debe anunciarse con el signo (entrada/salida) también por texto, no solo por color, para lectores de pantalla.",
  },
  dependencies: [],
  notes:
    "Corregido en el Audit de la Fase 3 (2026-09-14): los colores del icono (fondo circular), el texto principal, el texto secundario y el monto estaban hardcodeados con valores que no correspondían a ningún token ni nodo real. Releído el component set real (76:91) vía get_design_context: se quitó el fondo circular del icono (no existe en Figma) y se corrigieron los 3 colores de texto/monto a sus tokens reales — ver comentarios en TransactionListItem.tsx. Nota aparte, no corregida aquí: el componente real de Figma modela los campos como `category` (texto principal) + `date` (texto secundario), no como `merchant` + `category`/`timestamp` combinados — se mantiene la API actual (más útil para una app real, donde el nombre del comercio es el dato principal) en vez de replicar literalmente el demo de Figma, pero queda anotado por si un futuro Audit quiere revisarlo.",
} as const;
