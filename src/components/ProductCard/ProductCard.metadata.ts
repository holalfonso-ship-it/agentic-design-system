export const meta = {
  name: "ProductCard",
  category: "data-display",
  description:
    "Tarjeta que resume un producto financiero del usuario: BNPL o tarjeta de crédito, en uno de tres estados (activo, congelado, bloqueado).",
  figma: {
    library: "Alfonso_Zamorano_Task_IDFinance",
    componentKey: "6a26bf3ba21c5c0880939bdbf69bad3a2267ce59",
    type: "component_set",
  },
  props: {
    product: ["bnpl", "credit"],
    state: ["active", "frozen", "blocked"],
    title: "string",
    subtitle: "string?",
    amount: "string?",
  },
  tokens: [
    "card.bnpl.bg",
    "card.credit.bg",
    "card.frozen.bg",
    "card.border",
    "semantic.feedback.error",
    "radius.md",
    "fontSize.heading-md",
    "fontSize.heading-lg",
  ],
  states: ["active", "frozen", "blocked"],
  useWhen:
    "Para mostrar el estado de un producto financiero del usuario en una lista o dashboard. No usar para transacciones individuales — para eso, TransactionListItem.",
  a11y: {
    role: "group",
    keyboardSupport: false,
    notes: "Si la tarjeta es interactiva (navega al detalle), envolver en un elemento con role='button' y soporte de teclado.",
  },
  dependencies: [],
  notes:
    "Remodelado en el Compose de la Fase 3 (2026-09-14, hallazgo 3 del Audit): antes `variant: 'bnpl' | 'credit' | 'frozen'` trataba el estado congelado como un tercer producto y no cubría el estado 'blocked' en absoluto. El component set real (38:176) tiene dos ejes independientes — product (bnpl/credit) y state (active/frozen/blocked) — confirmados de nuevo vía get_design_context/get_variable_defs sobre los nodos 35:959 (active) y 46:68 (blocked). El radio del componente también se corrigió de radius.lg a radius.md (12px), el valor real. Breaking change deliberado de la API pública, documentado en estado-tarea-agentic-design-system.md — sin consumidores externos todavía, coste mínimo.",
} as const;
