/**
 * Metadata ejecutable — Pilar 1. Alert se diseñó primero en Figma (2026-10-15,
 * component set 239:178, página "02. Components") con cada color y espaciado
 * enlazado a variables reales, y después se llevó a código (Fase 5, familia
 * «Feedback»). Para ello se crearon tres variables en "Semantic Colors":
 * semantic/feedback/info (plum/700), info-subtle (plum/50) y warning-subtle
 * (sunflower/50). Decisión con Zamo: info reutiliza plum porque el archivo no
 * tiene familia azul; es el mismo color que la acción primaria.
 */
export const meta = {
  name: "Alert",
  category: "feedback",
  description:
    "Aviso en línea, persistente y no bloqueante: icono, título opcional, mensaje y acción opcional. Cuatro tipos: info, success, warning y error.",
  figma: {
    library: "Aida",
    // Librería publicada (2026-10-16): la key es la del component set 239:178 en el archivo.
    componentKey: "56a4595801c489f8c52a5ab1ec5143d44f00730a",
    nodeId: "239:178",
    type: "component_set",
  },
  props: {
    type: ["info", "success", "warning", "error"],
    title: "string — título corto, opcional",
    children: "ReactNode (obligatorio, el mensaje)",
    actionLabel: "string — texto de la acción opcional; sin él no se dibuja el botón",
    onAction: "() => void — se llama al pulsar la acción",
    "...rest": "resto de props nativas de <div> (id, data-*, aria-*…), salvo 'title' y 'children'",
  },
  tokens: [
    "semantic.feedback.info",
    "semantic.feedback.info-subtle",
    "semantic.feedback.success",
    "semantic.feedback.success-subtle",
    "semantic.feedback.warning",
    "semantic.feedback.warning-subtle",
    "semantic.feedback.error",
    "semantic.feedback.error-subtle",
    "green.900",
    "sunflower.800",
    "semantic.text.primary",
    "semantic.text.secondary",
    "radius.md",
    "fontSize.label-md",
    "lineHeight.label-md",
    "fontSize.body-md",
    "lineHeight.body-md",
    "fontFamily.base",
    "fontWeight.medium",
    "fontWeight.regular",
    "space.2",
    "space.4",
    "space.12",
    "space.16",
  ],
  states: ["info", "success", "warning", "error"],
  useWhen:
    "Dar un aviso que debe seguir visible hasta que el usuario lo lea o actúe: un error de pago, un límite cercano, una nota sobre la pantalla. Es contenido de la página, no una capa encima. Para confirmar algo que desaparece solo, usa Toast; para algo que exige una decisión antes de seguir, Modal.",
  a11y: {
    role: "status en info y success; alert en warning y error",
    keyboardSupport: true,
    minTouchTarget: 44,
    notes:
      "info y success usan role=status (aviso educado: el lector lo lee cuando termina lo que está diciendo); warning y error usan role=alert (interrumpe), reservado a lo urgente. Un lector de pantalla solo oye el texto, no el icono ni el color, así que el mensaje debe decir por sí mismo qué ha pasado. El icono es decorativo (aria-hidden). La acción es un <button> nativo con área táctil de 44px. Contraste del icono sobre su fondo: info 12:1, error 4:1 y, con los tonos oscuros green/900 y sunflower/800, success y warning por encima de 5:1.",
  },
  guidelines: [
    {
      do: "Di qué ha pasado y qué puede hacer el usuario: «No se pudo pagar. Comprueba los datos de tu tarjeta».",
      dont: "No uses mensajes vagos como «Error» o «Algo salió mal».",
      reason: "Un lector de pantalla solo oye el texto. Sin una causa y un siguiente paso, el usuario sabe que falló pero no cómo seguir.",
    },
    {
      do: "Usa Alert para avisos que deben seguir visibles hasta que el usuario actúe.",
      dont: "No lo uses para confirmar una acción rápida que se pierde sola: para eso va Toast.",
      reason: "Un aviso fijo para algo que no necesita seguimiento ocupa espacio y se queda ahí como ruido; el efímero sí se retira solo.",
    },
  ],
  dependencies: ["Icon"],
} as const;
