import { Guidelines, withExamples, Demo } from "../../stories/Guidelines";
import { meta as guidelinesMeta } from "./Checkbox.metadata";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Checkbox } from "./Checkbox";
import { meta as checkboxMeta } from "./Checkbox.metadata";

const meta: Meta<typeof Checkbox> = {
  title: "Form/Checkbox",
  component: Checkbox,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `${checkboxMeta.description}\n\n**Cuándo usarlo:** ${checkboxMeta.useWhen}`,
      },
    },
  },
  argTypes: {
    indeterminate: { control: "boolean" },
    error: { control: "boolean" },
    disabled: { control: "boolean" },
  },
  args: { label: "Acepto recibir avisos por email" },
};
export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {};
export const Marcada: Story = { args: { defaultChecked: true } };
export const Indeterminada: Story = { args: { indeterminate: true, label: "Seleccionar todo" } };
export const Error: Story = { args: { error: true, label: "Acepto las condiciones" } };
export const Disabled: Story = { args: { disabled: true, defaultChecked: true } };

export const TodosLosEstados: Story = {
  name: "Todos los estados",
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, max-content)", gap: 16 }}>
      <Checkbox label="Sin marcar" />
      <Checkbox label="Marcada" defaultChecked />
      <Checkbox label="Indeterminada" indeterminate />
      <Checkbox label="Error" error />
      <Checkbox label="Error marcada" error defaultChecked />
      <Checkbox label="Deshabilitada" disabled />
      <Checkbox label="Deshabilitada marcada" disabled defaultChecked />
    </div>
  ),
};

const examples = [
  {
    good: (
      <Demo code={'<Checkbox label="Acepto recibir avisos por email" />'}>
        <Checkbox label="Acepto recibir avisos por email" />
      </Demo>
    ),
    bad: (
      <Demo code={'<Checkbox label="No quiero no recibir avisos" />'}>
        <Checkbox label="No quiero no recibir avisos" />
      </Demo>
    ),
  },
  {
    good: (
      <Demo code={'<form onSubmit={enviar}>\n  <Checkbox label="Acepto las condiciones" />\n  <Button type="submit">Continuar</Button>\n</form>'}>
        <Checkbox label="Acepto las condiciones" />
      </Demo>
    ),
    bad: (
      <Demo code={'<Checkbox label="Modo oscuro" onChange={aplicarAlInstante} />'}>
        <Checkbox label="Modo oscuro" />
      </Demo>
    ),
  },
];

export const DosYDonts: Story = {
  name: "Do's y don'ts",
  parameters: { controls: { disable: true } },
  render: () => <Guidelines items={withExamples(guidelinesMeta.guidelines, examples)} />,
};
