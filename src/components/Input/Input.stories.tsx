import type { Meta, StoryObj } from "@storybook/react-vite";
import { Input } from "./Input";
import { meta as inputMeta } from "./Input.metadata";

const meta: Meta<typeof Input> = {
  title: "Form/Input",
  component: Input,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `${inputMeta.description}\n\n**Cuándo usarlo:** ${inputMeta.useWhen}`,
      },
    },
  },
  argTypes: {
    error: { control: "boolean" },
    disabled: { control: "boolean" },
  },
  args: { label: "Nombre", placeholder: "Placeholder", helperText: "Texto de ayuda" },
};
export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {};
export const ConValor: Story = {
  name: "Con valor",
  args: { label: "Email", defaultValue: "alfonso@example.com", helperText: "Texto de ayuda" },
};
export const Error: Story = {
  args: { label: "Importe", error: true, errorText: "Este campo es obligatorio" },
};
export const Disabled: Story = {
  args: { label: "Documento", placeholder: "Placeholder", helperText: "Texto de ayuda", disabled: true },
};

export const LosCuatroEstados: Story = {
  name: "Los 4 estados",
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 16, width: 280 }}>
      <Input label="Nombre" placeholder="Placeholder" helperText="Texto de ayuda" />
      <Input label="Email" defaultValue="alfonso@example.com" helperText="Texto de ayuda" />
      <Input label="Importe" error errorText="Este campo es obligatorio" />
      <Input label="Documento" placeholder="Placeholder" helperText="Texto de ayuda" disabled />
    </div>
  ),
};
