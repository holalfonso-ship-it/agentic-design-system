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
  tokens: ["tab.bg.default", "tab.bg.selected", "tab.text.default", "tab.text.selected", "semantic.bg.surface", "fontSize.caption"],
  states: ["default", "selected"],
  useWhen:
    "Navegación de nivel raíz entre 3-5 secciones principales de la app. No usar para navegación jerárquica dentro de una sección — para eso, un header con back button.",
  a11y: {
    role: "navigation",
    keyboardSupport: true,
    notes: "Cada tab debe exponer aria-current='page' cuando está seleccionado.",
  },
  dependencies: [],
  notes:
    "Corregido en el Audit de la Fase 3 (2026-09-14): el fondo/borde del contenedor tenía hex hardcodeados sin base real (#E1E3EA/#FFFFFF) — corregidos contra el component real 'Tab Bar' (83:4772). Hallazgo nuevo, no corregido en esta pasada por quedar fuera de alcance: el componente real de Figma es una barra flotante en pill (rounded-full, ancho fijo ~354px) con solo iconos (sin labels de texto) y el tab activo resaltado con un halo del color de marca al 15% de opacidad detrás del icono — un patrón visual distinto al de este componente (barra a todo el ancho, con label debajo de cada icono, fondo/texto sólido en el seleccionado). Los tokens nav.icon.*/nav.label.* (Component Colors, Fase 2) tampoco se consumen todavía. Ninguno de los dos se resuelve aquí — son un rediseño de estructura, no un arreglo de tokens — quedan anotados para una futura decisión con Alfonso.",
} as const;
