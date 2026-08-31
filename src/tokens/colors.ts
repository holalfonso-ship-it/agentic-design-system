/**
 * Colores por componente — nombres reales de la colección "Component
 * Colors" del archivo AID en Figma (button/*, card/*, tab/*).
 *
 * IMPORTANTE: los valores hex son PLACEHOLDER (paleta fintech iOS
 * plausible) hasta sincronizar los valores exactos desde Figma — el MCP
 * de Figma en esta sesión no pudo leer valores de variable sin el
 * archivo abierto en el Figma desktop. Ver README para el paso de
 * sincronización.
 */
export const button = {
  primary: {
    bg: { default: "#3A4FE0", hover: "#2E3FC2", pressed: "#2434A3", disabled: "#C7CBD6" },
    text: { default: "#FFFFFF", disabled: "#8A8E9C" },
  },
  secondary: {
    bg: { default: "#FFFFFF" },
    border: { default: "#3A4FE0", disabled: "#C7CBD6" },
    text: { default: "#3A4FE0", disabled: "#A8ADBC" },
  },
  tertiary: {
    text: { default: "#3A4FE0", disabled: "#A8ADBC" },
  },
} as const;

export const card = {
  border: "#E1E3EA",
  bnpl: { bg: "#FFF4E8", bgSubtle: "#FFFAF3", text: "#A8621F" },
  credit: { bg: "#EAF0FF", bgSubtle: "#F4F7FF", text: "#2434A3" },
  frozen: { bg: "#EEF1F5", bgSubtle: "#F7F8FA", text: "#4B4F5E" },
} as const;

export const tab = {
  bg: { default: "transparent", selected: "#E4E7FB" },
  text: { default: "#8A8E9C", selected: "#3A4FE0" },
} as const;
