export const meta = {
  name: "TransactionListItem",
  category: "data-display",
  description: "Fila de una transacción individual dentro del historial de movimientos.",
  figma: {
    library: "Aida",
    componentKey: "7d433c686e62c82b27d9d05cfff0e814bae9b117",
    // nodeId localizado en el Audit de la Fase 3 (2026-09-14) — no
    // estaba documentado hasta ahora (solo se conocía el componentKey,
    // de la extracción original de Fase 0). Component set real:
    // variantes sign=negative / sign=positive.
    nodeId: "76:91",
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
  tokens: [
    "fontSize.body-lg",
    "fontSize.caption",
    "semantic.text.primary",
    "semantic.text.secondary",
    "semantic.feedback.success",
    "semantic.feedback.error",
    "fontFamily.base",
    "space.12",
    "space.4",
    "fontWeight.regular",
  ],
  states: ["in", "out"],
  useWhen:
    "Para listar movimientos/transacciones en un feed o historial. Para resumir un producto financiero completo (no una transacción puntual), usar ProductCard.",
  a11y: {
    role: "listitem",
    keyboardSupport: false,
    notes: "El monto debe anunciarse con el signo (entrada/salida) también por texto, no solo por color, para lectores de pantalla.",
  },
  // Do's y don'ts (2026-10-14): texto de las guías de uso. Cada par se dibuja en la
  // story «Do's y don'ts» del componente; el ejemplo visual vive en la story.
  guidelines: [
    {
      do: "Pasa el importe sin signo y deja que direction ponga + o −.",
      dont: "No escribas el signo a mano en amount.",
      reason: "El componente añade el signo según direction. Si también lo pones tú, aparece duplicado («−−42,50 €»).",
    },
    {
      do: "Si necesitas un estado que no existe, como «pendiente», abre un flag en flags.jsonl.",
      dont: "No lo estires metiendo «Pendiente» en category.",
      reason: "TransactionListItem modela solo entradas y salidas. Estirarlo rompe la trazabilidad con Figma y es justo el caso que la regla de «cuando nada encaja» vigila.",
    },
  ],
  // Constraints (campo opuesto a guidelines: no es guía de uso, es lo que un
  // agente debe comprobar ANTES de decidir extender este componente en vez de
  // abrir un flag. TransactionListItem es el caso de prueba nombrado en
  // CLAUDE.md para la regla «cuando nada encaja».
  constraints: {
    preconditions: [
      "Solo modela movimientos con dos signos posibles: entrada o salida (direction: 'in' | 'out').",
    ],
    prohibitions: [
      "No añadir un tercer estado (p. ej. 'pendiente') metiéndolo en category, ni inventar un valor de direction nuevo: eso es exactamente el caso que cubre la regla de 'cuando nada encaja' — abre un flag en flags.jsonl en su lugar.",
    ],
  },
  dependencies: [],
  notes:
    "Corregido en el Audit de la Fase 3 (2026-09-14): los colores del icono (fondo circular), el texto principal, el texto secundario y el monto estaban hardcodeados con valores que no correspondían a ningún token ni nodo real. Releído el component set real (76:91) vía get_design_context: se quitó el fondo circular del icono (no existe en Figma) y se corrigieron los 3 colores de texto/monto a sus tokens reales — ver comentarios en TransactionListItem.tsx. Nota aparte, no corregida aquí: el componente real de Figma modela los campos como `category` (texto principal) + `date` (texto secundario), no como `merchant` + `category`/`timestamp` combinados — se mantiene la API actual (más útil para una app real, donde el nombre del comercio es el dato principal) en vez de replicar literalmente el demo de Figma, pero queda anotado por si un futuro Audit quiere revisarlo. DECISIÓN (Ciclo 2, 2026-10-01, con Alfonso): se mantiene la API de código. Mapeo Figma → código: variante `sign=negative|positive` ⇒ prop `direction` (out | in); texto principal `category` ⇒ `merchant`; texto secundario `date` ⇒ `category` + `timestamp` (unidos con « · »). Ciclo ARC 3 (2026-10-01): pesos alineados con Figma (merchant e importe en Regular 400, antes 600). Tamaño de merchant e importe alineado con Figma: Type/Body/LG (16), antes body-md (14).",
} as const;
