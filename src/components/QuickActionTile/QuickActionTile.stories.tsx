import type { Meta, StoryObj } from "@storybook/react-vite";
import { QuickActionTile } from "./QuickActionTile";
import { meta as quickActionTileMeta } from "./QuickActionTile.metadata";
import { PlaceholderIcon } from "../../stories/PlaceholderIcon";

const meta: Meta<typeof QuickActionTile> = {
  title: "Action/QuickActionTile",
  component: QuickActionTile,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `${quickActionTileMeta.description}\n\n**Cuándo usarlo:** ${quickActionTileMeta.useWhen}\n\n⚠️ La prop \`icon\` es obligatoria y sin default a propósito — ver \`QuickActionTile.metadata.ts\` para el motivo (bloqueo de red al descargar el asset real de Figma).`,
      },
    },
  },
  args: {
    icon: <PlaceholderIcon />,
    title: "Transferencias",
    subtitle: "Feb · Mar · Abr · May",
  },
};
export default meta;
type Story = StoryObj<typeof QuickActionTile>;

export const Default: Story = {};

export const RowDeAcciones: Story = {
  name: "Fila de acciones (home)",
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: "flex", gap: 8 }}>
      <QuickActionTile icon={<PlaceholderIcon />} title="Transferencias" subtitle="Feb · Mar · Abr · May" />
      <QuickActionTile icon={<PlaceholderIcon />} title="Pagar" subtitle="Recibos y servicios" />
    </div>
  ),
};
