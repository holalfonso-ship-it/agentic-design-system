export const meta = {
  name: "Modal",
  category: "overlay",
  description: "Diálogo modal con título, contenido y acciones.",
  props: { open: "boolean", title: "string" },
  tokens: ["color.surface", "radius.lg", "space.24"],
  states: ["open"],
  useWhen: "Pedir una decisión que bloquea el flujo. No para avisos pasivos.",
  a11y: { role: "dialog", keyboardSupport: true, minTouchTarget: null, notes: "Atrapa el foco; Esc cierra." },
  dependencies: ["Button"],
} as const;
