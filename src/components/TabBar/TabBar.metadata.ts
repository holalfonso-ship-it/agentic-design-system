export const meta = {
  name: "TabBar",
  category: "navigation",
  description: "Barra de navegación inferior con hasta 5 destinos principales de la app.",
  figma: {
    library: "Alfonso_Zamorano_Task_IDFinance",
    componentKey: "4cbc45b63ae7ee3ba23691f7487d35de6d534a74",
    type: "component_set",
  },
  props: {
    items: "TabBarItem[]",
    activeKey: "string",
  },
  tokens: ["tab.bg.default", "tab.bg.selected", "tab.text.default", "tab.text.selected", "fontSize.caption"],
  states: ["default", "selected"],
  useWhen:
    "Navegación de nivel raíz entre 3-5 secciones principales de la app. No usar para navegación jerárquica dentro de una sección — para eso, un header con back button.",
  a11y: {
    role: "navigation",
    keyboardSupport: true,
    notes: "Cada tab debe exponer aria-current='page' cuando está seleccionado.",
  },
  dependencies: [],
} as const;
