import type { Meta, StoryObj } from "@storybook/react-vite";
import { Badge } from "./Badge";
import { meta as badgeMeta } from "./Badge.metadata";

const meta: Meta<typeof Badge> = {
  title: "Data Display/Badge",
  component: Badge,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `${badgeMeta.description}\n\n**Cuándo usarlo:** ${badgeMeta.useWhen}`,
      },
    },
  },
  argTypes: {
    variant: { control: "select", options: ["success", "error", "warning", "neutral"] },
  },
  args: { variant: "success", children: "Completado" },
};
export default meta;
type Story = StoryObj<typeof Badge>;

export const Success: Story = { args: { variant: "success", children: "Completado" } };
export const Error: Story = { args: { variant: "error", children: "Rechazado" } };
export const Warning: Story = { args: { variant: "warning", children: "Pendiente" } };
export const Neutral: Story = { args: { variant: "neutral", children: "Programado" } };

export const LasCuatroVariantes: Story = {
  name: "Las 4 variantes",
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
      <Badge variant="success">Completado</Badge>
      <Badge variant="error">Rechazado</Badge>
      <Badge variant="warning">Pendiente</Badge>
      <Badge variant="neutral">Programado</Badge>
    </div>
  ),
};
