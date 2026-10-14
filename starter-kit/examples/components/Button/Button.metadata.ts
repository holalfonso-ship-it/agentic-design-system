export const meta = {
  name: "Button",
  category: "action",
  description: "Botón de acción con variantes primary y secondary.",
  figma: { library: "Demo", componentKey: "0784c9db1234567890abcdef", nodeId: "1:2", type: "component_set" },
  props: { variant: ["primary", "secondary"], children: "ReactNode (obligatorio)" },
  tokens: ["color.action.primary", "color.action.secondary", "radius.md", "space.16"],
  states: ["default", "hover", "disabled"],
  useWhen: "Disparar una acción. Para navegar entre secciones usa TabBar.",
  a11y: { role: "button", keyboardSupport: true, minTouchTarget: 44, notes: "Foco visible." },
  dependencies: [],
} as const;
