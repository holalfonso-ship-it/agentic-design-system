/**
 * Metadata ejecutable — Pilar 1. Toast se diseñó primero en Figma (2026-10-15,
 * component set 241:201, página "02. Components") con cada color y espaciado
 * enlazado a variables reales, y después se llevó a código (Fase 5, familia
 * «Feedback»). Se distingue de Alert por el fondo inverso (semantic/bg/inverse) con
 * iconos en el tono claro de cada familia, y por llevar siempre botón de cierre.
 * Decisión con Zamo: el paquete incluye también el proveedor y el hook (cola,
 * retirada automática, pausa al pasar el puntero o el foco), no solo la tarjeta.
 */
export const meta = {
  name: "Toast",
  category: "feedback",
  description:
    "Aviso efímero y no bloqueante sobre fondo inverso: icono, título opcional, mensaje, acción opcional y cierre. Cuatro tipos: info, success, warning y error. Incluye ToastProvider y useToast para mostrarlo, apilarlo y retirarlo solo.",
  figma: {
    library: "Aida",
    // Librería publicada (2026-10-16): la key es la del component set 241:201 en el archivo.
    componentKey: "4e6d074dcc56e6d9842b960a6546907bd91f370f",
    nodeId: "241:201",
    type: "component_set",
  },
  props: {
    type: ["info", "success", "warning", "error"],
    title: "string — título corto, opcional",
    children: "ReactNode (obligatorio, el mensaje)",
    actionLabel: "string — texto de la acción opcional",
    onAction: "() => void — se llama al pulsar la acción",
    onClose: "() => void — si se pasa, se dibuja el botón de cierre",
    closeLabel: "string — nombre accesible del cierre (por defecto «Cerrar aviso»)",
    "...rest": "resto de props nativas de <div> (id, data-*…), salvo 'title' y 'children'",
    ToastProvider: "{ children, duration?: number (5000), max?: number (3) } — monta la zona de avisos y da acceso a useToast",
    useToast: "() => { show(options): id, dismiss(id), dismissAll() } — options: { type?, title?, message, actionLabel?, onAction?, duration? }",
  },
  tokens: [
    "semantic.bg.inverse",
    "semantic.text.inverse",
    "plum.100",
    "green.400",
    "sunflower.500",
    "red.400",
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
    "space.8",
    "space.12",
    "space.16",
  ],
  states: ["info", "success", "warning", "error"],
  useWhen:
    "Confirmar o avisar de algo breve que no necesita seguimiento: «Guardado», «Copiado», «Pago enviado». Se retira solo. Si el aviso debe seguir visible hasta que el usuario actúe, usa Alert; si exige una decisión antes de seguir, Modal.",
  a11y: {
    role: "status en info y success; alert en warning y error; la zona de avisos es una region «Notificaciones»",
    keyboardSupport: true,
    minTouchTarget: 44,
    notes:
      "La zona de avisos existe siempre en el DOM, así que los lectores anuncian cada aviso que se inserta. Un aviso que se retira solo es un riesgo: se pausa mientras el puntero o el foco están encima, y uno con acción no se retira solo salvo que lo pidas con `duration`. No pongas en un Toast nada que el usuario necesite releer. El cierre y la acción son <button> nativos con área táctil de 44px; el cierre tiene aria-label. El icono es decorativo. Contraste de los iconos sobre el fondo inverso: de 5,5:1 (error) a 10:1; el texto blanco, 18,6:1.",
  },
  guidelines: [
    {
      do: "Úsalo para confirmar algo breve que no necesita seguimiento: «Copiado al portapapeles».",
      dont: "No lo uses para un error que el usuario debe resolver: «No se pudo pagar» va en un Alert.",
      reason: "El Toast se retira solo; si el usuario no lo ve a tiempo, pierde el aviso y no sabe que algo falló.",
    },
    {
      do: "Mantén el texto en una línea o dos, sin información que haya que releer.",
      dont: "No metas instrucciones largas ni datos que el usuario tenga que copiar.",
      reason: "Desaparece a los pocos segundos y se lee de pasada. Lo que necesite tiempo o repaso va en un Alert o en la propia pantalla.",
    },
  ],
  dependencies: ["Icon"],
} as const;
