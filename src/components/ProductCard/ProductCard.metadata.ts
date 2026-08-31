export const meta = {
  name: "ProductCard",
  category: "data-display",
  description:
    "Tarjeta que resume un producto financiero del usuario: BNPL, tarjeta de crédito o tarjeta congelada.",
  figma: {
    library: "Alfonso_Zamorano_Task_IDFinance",
    componentKey: "6a26bf3ba21c5c0880939bdbf69bad3a2267ce59",
    type: "component_set",
  },
  props: {
    variant: ["bnpl", "credit", "frozen"],
    title: "string",
    subtitle: "string?",
    amount: "string?",
  },
  tokens: [
    "card.bnpl.bg",
    "card.credit.bg",
    "card.frozen.bg",
    "card.border",
    "radius.lg",
    "fontSize.heading-md",
    "fontSize.heading-lg",
  ],
  states: ["bnpl", "credit", "frozen"],
  useWhen:
    "Para mostrar el estado de un producto financiero del usuario en una lista o dashboard. No usar para transacciones individuales — para eso, TransactionListItem.",
  a11y: {
    role: "group",
    keyboardSupport: false,
    notes: "Si la tarjeta es interactiva (navega al detalle), envolver en un elemento con role='button' y soporte de teclado.",
  },
  dependencies: [],
} as const;
