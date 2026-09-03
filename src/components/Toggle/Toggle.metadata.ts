/**
 * Metadata ejecutable — Pilar 1 del sistema de diseño agéntico.
 *
 * A diferencia del resto de componentes del repo, "Toggle" no se
 * extrajo de un diseño ya publicado en Figma: no existía ningún switch
 * en la librería (confirmado por búsqueda en la Fase 2, 2026-09-03).
 * Se construyó desde cero directamente en Figma con el agente de Figma
 * (skill figma-generate-library + figma-use), bindeando cada fill a una
 * variable real del archivo (semantic/action/primary/bg/default,
 * neutral/300, semantic/bg/surface, semantic/border/default,
 * radius/full) — cero valores hardcodeados. El código de este
 * directorio se escribió después, a partir de ese componente real.
 */
export const meta = {
  name: "Toggle",
  category: "action",
  description:
    "Switch on/off de una sola pieza (track + knob), sin label propio: el label va fuera, a cargo de quien lo consume.",
  figma: {
    library: "Alfonso_Zamorano_Task_IDFinance",
    // Sin componentKey todavía: el nodo existe en el archivo (component
    // set 159:119, página "02. Components") pero componentKey solo se
    // asigna cuando la librería se publica desde Figma desktop — acción
    // manual que le corresponde a Alfonso. Node-id de referencia:
    // https://www.figma.com/design/3EHBqyJGvIfSG3CZol393z/Alfonso_Zamorano_Task_IDFinance?node-id=159-119
    componentKey: null,
    nodeId: "159:119",
    type: "component_set",
  },
  props: {
    checked: "boolean (obligatorio)",
    disabled: "boolean",
    onChange: "(checked: boolean) => void",
  },
  tokens: [
    "semanticAction.primary.bg.default",
    "semanticAction.primary.bg.disabled",
    "neutral.300",
    "semantic.bg.surface",
    "semantic.border.default",
    "radius.full",
  ],
  states: ["on", "off", "on-disabled", "off-disabled"],
  useWhen:
    "Ajuste binario que se aplica al instante, sin botón de confirmar (p. ej. notificaciones, biometría, modo oscuro). No usar como sustituto de un Checkbox en un formulario largo con botón de guardar — ahí el patrón esperado es distinto (el cambio no es inmediato).",
  a11y: {
    role: "switch",
    keyboardSupport: true,
    minTouchTarget: 44,
    notes:
      "Renderizado como <button role=\"switch\" aria-checked>, no <input type=\"checkbox\">, para que el estado se anuncie correctamente en lectores de pantalla. El consumidor debe pasar aria-label (no hay label de texto propio). El área táctil real (51×31) es menor que el mínimo recomendado de 44×44 — el consumidor debería ampliar el hit-area con padding si se usa como control táctil principal.",
  },
  dependencies: [],
} as const;
