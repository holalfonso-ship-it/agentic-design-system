/**
 * Metadata ejecutable — Pilar 1. Tooltip se diseñó primero en Figma (2026-10-15,
 * component set 243:236, página "02. Components") con cada color, radio y espaciado
 * enlazado a variables, y después se llevó a código (Fase 5, familia «Feedback»).
 * Reutiliza el tema inverso de Toast (semantic/bg/inverse y semantic/text/inverse):
 * no hizo falta crear variables nuevas.
 */
export const meta = {
  name: "Tooltip",
  category: "feedback",
  description:
    "Bocadillo oscuro con una ayuda breve que aparece al pasar el ratón o enfocar con teclado. Cuatro posiciones: top, bottom, left y right.",
  figma: {
    library: "Aida",
    // Librería publicada (2026-10-16): la key es la del component set 243:236 en el archivo.
    componentKey: "ebff1b5e2c32564e1faae323b65fb4e9889e16ee",
    nodeId: "243:236",
    type: "component_set",
  },
  props: {
    content: "string (obligatorio, texto de la ayuda)",
    placement: ["top", "bottom", "left", "right"],
    children: "ReactNode (obligatorio, el elemento que lo activa)",
    delay: "number — milisegundos de espera antes de mostrarse con el ratón; por defecto 300 (en foco es inmediato)",
  },
  tokens: [
    "semantic.bg.inverse",
    "semantic.text.inverse",
    "radius.sm",
    "fontSize.label-sm",
    "lineHeight.label-sm",
    "fontFamily.base",
    "fontWeight.medium",
    "space.4",
    "space.6",
    "space.12",
  ],
  states: ["oculto", "visible"],
  useWhen:
    "Aclarar en una frase corta lo que hace un control cuando el icono o la etiqueta no bastan: un botón de solo icono, una abreviatura. Es un complemento, nunca el único sitio donde vive una información importante. Para un aviso con título o acción, Alert o Toast; para contenido interactivo, un Popover.",
  a11y: {
    role: "tooltip",
    keyboardSupport: true,
    minTouchTarget: 44,
    notes:
      "Aparece también al enfocar con teclado y se cierra con Escape; el elemento recibe aria-describedby apuntando al tooltip, así que el lector lo lee como descripción, no como nombre: el elemento debe tener ya su propio nombre accesible (aria-label en un botón de solo icono). No se muestra con el tacto, por lo que nada esencial puede vivir solo en un tooltip. No contiene nada interactivo y no atrapa el ratón (pointer-events: none). Contraste del texto blanco sobre #151211: 18:1.",
  },
  guidelines: [
    {
      do: "Escribe una frase corta que aclare la acción: «Guardar borrador».",
      dont: "No metas párrafos, enlaces ni botones dentro de un tooltip.",
      reason: "Desaparece al mover el ratón o el foco y no se puede tocar; lo largo o interactivo se pierde o no se alcanza. Eso va en un Popover.",
    },
    {
      do: "Dale al elemento su propio nombre accesible y usa el tooltip como apoyo.",
      dont: "No dejes un botón de solo icono sin aria-label confiando en que el tooltip lo nombre.",
      reason: "El tooltip se lee como descripción y no aparece con el tacto; sin nombre propio, el botón queda mudo para un lector de pantalla.",
    },
  ],
  dependencies: [],
} as const;
