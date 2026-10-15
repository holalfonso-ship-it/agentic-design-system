/**
 * Metadata ejecutable — Pilar 1. Spinner se diseñó primero en Figma (2026-10-15,
 * component set 243:269, página "02. Components") con los colores enlazados a
 * variables, y después se llevó a código (Fase 5, familia «Feedback»). El anillo se
 * dibuja como relleno en Figma; en código es un trazo SVG con la misma geometría.
 */
export const meta = {
  name: "Spinner",
  category: "feedback",
  description:
    "Indicador de carga de duración desconocida: un anillo gris con un cuarto oscuro que gira. Tres tamaños: sm (16), md (24) y lg (32).",
  figma: {
    library: "Aida",
    // Pendiente de publicar la librería: la key es la del component set 243:269 en el archivo.
    componentKey: "9c6429e4031c6d39641eb4d7ac2cd22fa9a904de",
    nodeId: "243:269",
    type: "component_set",
  },
  props: {
    size: ["sm", "md", "lg"],
    label: "string — texto para el lector de pantalla; por defecto «Cargando»",
    "...rest": "resto de props nativas de <span> (id, data-*, aria-*…)",
  },
  tokens: ["semantic.border.default", "semantic.text.primary", "fontFamily.base"],
  states: ["girando"],
  useWhen:
    "Indicar que algo está cargando y no sabes cuánto va a tardar: un envío, una búsqueda, un botón en espera. Si conoces el progreso, usa una barra de progreso; si cargas contenido con forma conocida (una lista, una tarjeta), usa Skeleton.",
  a11y: {
    role: "status",
    keyboardSupport: false,
    minTouchTarget: 44,
    notes:
      "Es role=status con un texto oculto visualmente («Cargando» por defecto) para que el lector avise de la espera; cámbialo por algo concreto si ayuda («Enviando pago»). El SVG es decorativo (aria-hidden). No es interactivo. Con «reducir movimiento» activado sigue girando pero 3 veces más lento: es el único indicador de que la página sigue trabajando. Contraste del arco oscuro sobre blanco: 18:1; del anillo gris 1.9:1, es solo pista y el arco lleva el significado.",
  },
  guidelines: [
    {
      do: "Ponle un texto concreto a la espera cuando ayude: «Enviando pago».",
      dont: "No lo dejes girando sin etiqueta en una pantalla donde el usuario no sabe qué se está cargando.",
      reason: "Un lector de pantalla solo oye el texto. Sin él, el usuario sabe que algo gira pero no qué ni por qué.",
    },
    {
      do: "Usa Skeleton cuando sabes la forma del contenido que va a llegar.",
      dont: "No cubras una pantalla entera con un único Spinner si puedes mostrar huecos con la forma de la lista.",
      reason: "Los huecos dan sensación de avance y evitan que la página salte al cargar; un círculo en medio de una pantalla vacía no dice nada del resultado.",
    },
  ],
  dependencies: [],
} as const;
