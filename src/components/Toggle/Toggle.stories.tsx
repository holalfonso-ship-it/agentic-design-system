import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { Toggle } from "./Toggle";
import { meta as toggleMeta } from "./Toggle.metadata";

const meta: Meta<typeof Toggle> = {
  title: "Action/Toggle",
  component: Toggle,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `${toggleMeta.description}\n\n**Cuándo usarlo:** ${toggleMeta.useWhen}`,
      },
    },
  },
  argTypes: {
    checked: { control: "boolean" },
    disabled: { control: "boolean" },
  },
  args: {
    checked: true,
    disabled: false,
    "aria-label": "Notificaciones",
  },
};
export default meta;
type Story = StoryObj<typeof Toggle>;

export const On: Story = {
  args: { checked: true },
  render: (args) => {
    function Wrapper() {
      const [checked, setChecked] = useState(args.checked);
      return <Toggle {...args} checked={checked} onChange={setChecked} />;
    }
    return <Wrapper />;
  },
};

export const Off: Story = { ...On, args: { checked: false, "aria-label": "Modo oscuro" } };
export const OnDisabled: Story = {
  args: { checked: true, disabled: true, "aria-label": "Biometría (bloqueado)" },
};
export const OffDisabled: Story = {
  args: { checked: false, disabled: true, "aria-label": "Ubicación (bloqueado)" },
};

export const LosCuatroEstados: Story = {
  name: "Los 4 estados",
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <Toggle checked={true} onChange={() => {}} aria-label="Notificaciones" />
      <Toggle checked={false} onChange={() => {}} aria-label="Modo oscuro" />
      <Toggle checked={true} disabled aria-label="Biometría (bloqueado)" />
      <Toggle checked={false} disabled aria-label="Ubicación (bloqueado)" />
    </div>
  ),
};
