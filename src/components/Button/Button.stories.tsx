import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "./Button";
import { meta as buttonMeta } from "./Button.metadata";

const meta: Meta<typeof Button> = {
  title: "Action/Button",
  component: Button,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `${buttonMeta.description}\n\n**Cuándo usarlo:** ${buttonMeta.useWhen}`,
      },
    },
  },
  argTypes: {
    variant: { control: "select", options: ["primary", "secondary", "tertiary"] },
    size: { control: "select", options: ["sm", "md", "lg"] },
    disabled: { control: "boolean" },
  },
  args: {
    children: "Continuar",
    variant: "primary",
    size: "md",
    disabled: false,
  },
};
export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = { args: { variant: "primary" } };
export const Secondary: Story = { args: { variant: "secondary", children: "Cancelar" } };
export const Tertiary: Story = { args: { variant: "tertiary", children: "Omitir" } };
export const Disabled: Story = { args: { variant: "primary", disabled: true } };

export const AllVariants: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
      <Button variant="primary">Continuar</Button>
      <Button variant="secondary">Cancelar</Button>
      <Button variant="tertiary">Omitir</Button>
      <Button variant="primary" disabled>
        Continuar
      </Button>
      <Button variant="secondary" disabled>
        Cancelar
      </Button>
    </div>
  ),
};

export const Sizes: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
    </div>
  ),
};
