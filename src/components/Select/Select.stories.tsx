import { Guidelines, withExamples, Demo } from "../../stories/Guidelines";
import { meta as guidelinesMeta } from "./Select.metadata";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Select } from "./Select";
import { meta as selectMeta } from "./Select.metadata";

const paises = [
  { value: "es", label: "España" },
  { value: "fr", label: "Francia" },
  { value: "it", label: "Italia" },
  { value: "pt", label: "Portugal" },
  { value: "de", label: "Alemania" },
  { value: "ie", label: "Irlanda" },
];

const meta: Meta<typeof Select> = {
  title: "Form/Select",
  component: Select,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `${selectMeta.description}\n\n**Cuándo usarlo:** ${selectMeta.useWhen}`,
      },
    },
  },
  argTypes: {
    error: { control: "boolean" },
    disabled: { control: "boolean" },
  },
  args: { label: "País", placeholder: "Selecciona un país", helperText: "Texto de ayuda", options: paises },
};
export default meta;
type Story = StoryObj<typeof Select>;

export const Default: Story = {};
export const ConValor: Story = { name: "Con valor", args: { defaultValue: "es" } };
export const Error: Story = { args: { error: true, errorText: "Selecciona un país" } };
export const Disabled: Story = { args: { disabled: true } };

export const LosCuatroEstados: Story = {
  name: "Los 4 estados",
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 16, width: 280 }}>
      <Select label="País" placeholder="Selecciona un país" helperText="Texto de ayuda" options={paises} />
      <Select label="País" defaultValue="es" helperText="Texto de ayuda" options={paises} />
      <Select label="País" placeholder="Selecciona un país" error errorText="Selecciona un país" options={paises} />
      <Select label="País" placeholder="Selecciona un país" helperText="Texto de ayuda" disabled options={paises} />
    </div>
  ),
};

const examples = [
  {
    good: (
      <Demo code={'<Select label="País" placeholder="Selecciona un país" options={paises} />'}>
        <Select label="País" placeholder="Selecciona un país" options={paises} />
      </Demo>
    ),
    bad: (
      <Demo code={'<Select label="Selecciona" placeholder="País" options={paises} />'}>
        <Select label="Selecciona" placeholder="País" options={paises} />
      </Demo>
    ),
  },
  {
    good: (
      <Demo code={'<Select label="País" options={paises} /> // 6 o más opciones'}>
        <Select label="País" placeholder="Selecciona un país" options={paises} />
      </Demo>
    ),
    bad: (
      <Demo code={'<Select label="¿Mayor de edad?" options={[{ value: "si", label: "Sí" }, { value: "no", label: "No" }]} />'}>
        <Select
          label="¿Mayor de edad?"
          placeholder="Selecciona"
          options={[
            { value: "si", label: "Sí" },
            { value: "no", label: "No" },
          ]}
        />
      </Demo>
    ),
  },
];

export const DosYDonts: Story = {
  name: "Do's y don'ts",
  parameters: { controls: { disable: true } },
  render: () => <Guidelines items={withExamples(guidelinesMeta.guidelines, examples)} />,
};
