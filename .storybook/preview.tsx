import type { Preview } from "@storybook/react-vite";
import { fontFamily, semantic } from "../src/tokens";

const preview: Preview = {
  parameters: {
    // Orden del sidebar: sigue las categorías reales de CLAUDE.md /
    // index.toon (action → navigation → data-display → form → overlay),
    // no el orden alfabético por defecto de Storybook.
    options: {
      storySort: {
        order: [
          "Introducción",
          "Action",
          ["Button", "QuickActionTile", "Toggle"],
          "Navigation",
          ["TabBar"],
          "Data Display",
          ["Avatar", "Badge", "ProductCard", "StatItem", "TransactionListItem"],
          "Form",
          ["Input"],
          "Overlay",
          ["Modal"],
        ],
      },
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      options: {
        surface: { name: "surface", value: semantic.bg.surface },
        default: { name: "default", value: semantic.bg.default },
      },
    },
    a11y: {
      // Los tests de a11y no rompen el build de Storybook — Aida ya
      // documenta su deuda de accesibilidad conocida en cada metadata
      // (ver CLAUDE.md); el addon aquí es para verla, no para bloquear.
      test: "todo",
    },
  },
  decorators: [
    (Story) => (
      <div style={{ fontFamily: fontFamily.base, padding: 24 }}>
        <Story />
      </div>
    ),
  ],
};

export default preview;
