export const meta = {
  name: "TransactionListItem",
  category: "data-display",
  description: "Fila de una transacción individual dentro del historial de movimientos.",
  figma: {
    library: "Alfonso_Zamorano_Task_IDFinance",
    componentKey: "7d433c686e62c82b27d9d05cfff0e814bae9b117",
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
  tokens: ["fontSize.body-md", "fontSize.caption"],
  states: ["in", "out"],
  useWhen:
    "Para listar movimientos/transacciones en un feed o historial. Para resumir un producto financiero completo (no una transacción puntual), usar ProductCard.",
  a11y: {
    role: "listitem",
    keyboardSupport: false,
    notes: "El monto debe anunciarse con el signo (entrada/salida) también por texto, no solo por color, para lectores de pantalla.",
  },
  dependencies: [],
} as const;
