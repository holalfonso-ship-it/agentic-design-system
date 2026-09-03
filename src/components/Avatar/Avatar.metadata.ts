/**
 * Metadata ejecutable — Pilar 1 del sistema de diseño agéntico.
 *
 * Igual que Toggle y Badge: "Avatar" no se extrajo de un diseño ya
 * publicado en Figma — se confirmó por búsqueda que no existía (solo
 * un icono suelto "person.crop.square"). Se construyó desde cero en
 * Figma con el agente (figma-generate-library + figma-use), bindeando
 * cada fill a una variable real del archivo.
 */
export const meta = {
  name: "Avatar",
  category: "data-display",
  description:
    "Círculo con iniciales (fallback de texto, sin soporte de imagen todavía). Tres tamaños: sm (32px), md (40px), lg (48px).",
  figma: {
    library: "Alfonso_Zamorano_Task_IDFinance",
    // Sin componentKey todavía — igual que Toggle y Badge, pendiente de
    // que Alfonso publique la librería desde Figma desktop.
    componentKey: null,
    nodeId: "169:113",
    type: "component_set",
  },
  props: {
    initials: "string (obligatorio, normalmente 1-2 caracteres)",
    size: ["sm", "md", "lg"],
  },
  tokens: [
    "semantic.brand.primary",
    "button.primary.text.default",
  ],
  states: ["sm", "md", "lg"],
  useWhen:
    "Representar a una persona o cuenta cuando no hay foto disponible: cabecera de perfil, lista de contactos/beneficiarios, remitente de una transacción. Reusa intencionadamente el color de marca de Button primary — no es un token de avatar propio, porque Figma no tiene ninguno todavía.",
  a11y: {
    role: "img",
    keyboardSupport: false,
    minTouchTarget: null,
    notes:
      "Puramente presentacional. Si el consumidor lo envuelve en un elemento interactivo (p. ej. para abrir un perfil), ese elemento necesita su propio aria-label — el Avatar en sí no expone el nombre completo de la persona, solo iniciales.",
  },
  dependencies: [],
  notes:
    "No soporta imagen todavía (solo iniciales) — cuando haga falta, añadir una prop `src?: string` que, si está presente, renderiza una <img> en vez del texto, manteniendo el mismo círculo de fondo como fallback si la imagen falla en cargar.",
} as const;
