/**
 * Metadata ejecutable — Pilar 1. Skeleton se diseñó primero en Figma (2026-10-15,
 * component set 243:289, página "02. Components") con color y radios enlazados a
 * variables, y después se llevó a código (Fase 5, familia «Feedback»). En Figma las
 * variantes muestran un tamaño de ejemplo (200 px); en código el ancho por defecto
 * de text y rect es 100% para que se adapte al contenedor.
 */
export const meta = {
  name: "Skeleton",
  category: "feedback",
  description:
    "Hueco gris que ocupa el lugar del contenido mientras carga. Tres formas: text (una línea), circle (avatar) y rect (imagen o tarjeta).",
  figma: {
    library: "Aida",
    // Pendiente de publicar la librería: la key es la del component set 243:289 en el archivo.
    componentKey: "6b3ae2bae301c57213019e9be3e46d3ac661fbf3",
    nodeId: "243:289",
    type: "component_set",
  },
  props: {
    shape: ["text", "circle", "rect"],
    width: "number | string — px o CSS; por defecto 100% en text y rect, 40 en circle",
    height: "number | string — px o CSS; por defecto 16 en text, 96 en rect, 40 en circle",
    "...rest": "resto de props nativas de <span> (id, data-*…), salvo 'children'",
  },
  tokens: ["semantic.border.default", "radius.sm", "radius.md", "radius.full"],
  states: ["pulso"],
  useWhen:
    "Reservar el sitio de contenido con forma conocida (una lista, una tarjeta, un perfil) mientras llega, para que la página no salte. Para una espera sin forma conocida, Spinner.",
  a11y: {
    role: "ninguno (decorativo, aria-hidden)",
    keyboardSupport: false,
    minTouchTarget: 44,
    notes:
      "Es puramente decorativo y se oculta a los lectores de pantalla. Avisa de la carga en el contenedor con aria-busy=\"true\" (y quítalo al terminar) o junto a un Spinner con texto. El pulso se detiene con «reducir movimiento». No lleva información: el contraste del gris no se evalúa.",
  },
  guidelines: [
    {
      do: "Dibuja huecos con la misma forma y tamaño que tendrá el contenido: un círculo para el avatar, líneas para el texto.",
      dont: "No uses un único rectángulo gigante como relleno de toda la pantalla.",
      reason: "El hueco solo evita el salto de la página si coincide con lo que va a llegar; un bloque genérico se redibuja entero al cargar.",
    },
    {
      do: "Marca el contenedor con aria-busy=\"true\" mientras carga.",
      dont: "No dependas del Skeleton para avisar a un lector de pantalla: es decorativo.",
      reason: "El Skeleton está oculto para las tecnologías de apoyo, así que sin aria-busy o un texto de estado solo lo percibe quien ve la pantalla.",
    },
  ],
  dependencies: [],
} as const;
