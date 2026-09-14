import type { Meta, StoryObj } from "@storybook/react-vite";
import { StatItem } from "./StatItem";
import { meta as statItemMeta } from "./StatItem.metadata";
import { PlaceholderIcon } from "../../stories/PlaceholderIcon";

const meta: Meta<typeof StatItem> = {
  title: "Data Display/StatItem",
  component: StatItem,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `${statItemMeta.description}\n\n**Cuándo usarlo:** ${statItemMeta.useWhen}\n\n⚠️ La prop \`icon\` es obligatoria y sin default a propósito — ver \`StatItem.metadata.ts\` para el motivo (bloqueo de red al descargar el asset real de Figma).`,
      },
    },
  },
  args: { icon: <PlaceholderIcon />, label: "Balance total", amount: "€7.783,00" },
};
export default meta;
type Story = StoryObj<typeof StatItem>;

export const Default: Story = {};

export const FilaDeResumen: Story = {
  name: "Fila de resumen (home)",
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: "flex", gap: 20 }}>
      <StatItem icon={<PlaceholderIcon />} label="Balance total" amount="€7.783,00" />
      <StatItem icon={<PlaceholderIcon />} label="Total Gastos" amount="€1.204,50" />
    </div>
  ),
};
