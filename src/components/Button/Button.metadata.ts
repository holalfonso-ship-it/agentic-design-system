/**
 * Metadata ejecutable — Pilar 1 del sistema de diseño agéntico.
 * Fuente: component set "Button" (componentKey 0784c9db…) en la librería
 * Figma "Aida".
 */
export const meta = {
  name: "Button",
  category: "action",
  description:
    "Acción primaria, secundaria o terciaria disparada por el usuario. Único punto de interacción táctil por vista relevante.",
  figma: {
    library: "Aida",
    componentKey: "0784c9dbdf145332fe89fda98d11d14d3ac9794b",
    type: "component_set",
  },
  props: {
    variant: ["primary", "secondary", "tertiary"],
    size: ["sm", "md", "lg"],
    disabled: "boolean",
  },
  tokens: [
    "button.primary.bg",
    "button.primary.text",
    "button.secondary.bg",
    "button.secondary.border",
    "button.secondary.text",
    "button.tertiary.text",
    "radius.md",
    "fontSize.label-md",
    "fontSize.label-sm",
    "fontSize.body-md",
    "fontFamily.base",
    "space.16",
    "space.24",
    "fontWeight.medium",
  ],
  states: ["default", "hover", "pressed", "disabled"],
  useWhen:
    "Una sola acción clara por pantalla o sección. Usa 'primary' para la acción principal, 'secondary' para una alternativa con el mismo peso visual reducido, 'tertiary' para acciones de bajo énfasis (p. ej. 'cancelar'). No usar para navegación — para eso, un componente Link.",
  a11y: {
    role: "button",
    keyboardSupport: true,
    minTouchTarget: 44,
    notes: "El estado disabled debe comunicarse también por atributo aria-disabled, no solo por color.",
  },
  // Do's y don'ts (2026-10-14): texto de las guías de uso. Cada par se dibuja en la
  // story «Do's y don'ts» del componente; el ejemplo visual vive en la story.
  guidelines: [
    {
      do: "Una sola acción primary por pantalla o sección; la alternativa va en tertiary.",
      dont: "No pongas dos primary compitiendo.",
      reason: "Primary marca la acción principal. Con dos, ninguna lo es y el usuario no sabe cuál se espera de él.",
    },
    {
      do: "Etiqueta con verbo y objeto: «Enviar transferencia».",
      dont: "No uses etiquetas vacías como «Aceptar» u «OK».",
      reason: "El texto es lo único que un lector de pantalla anuncia del botón; debe decir qué va a pasar sin necesitar el contexto.",
    },
    {
      do: "Usa Button para disparar una acción (abrir un formulario, confirmar).",
      dont: "No lo uses para navegar entre pantallas.",
      reason: "Navegar es un enlace o, a nivel raíz, la TabBar. El sistema aún no tiene Link: si lo necesitas, abre un flag en lugar de disfrazar un Button.",
    },
  ],
  dependencies: [],
  notes:
    "Ciclo ARC 3 (2026-10-01): peso 500 (Type/Label/*) y padding horizontal 16/24/24 y altura fija sm 44, md 48, lg 56 (sin padding vertical), alineados con Figma en las tres variantes. Antes la altura se derivaba del contenido y el tertiary tenía un padding propio (8/4).",
} as const;
