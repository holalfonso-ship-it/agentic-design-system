import { Guidelines, withExamples, Demo } from "../../stories/Guidelines";
import { meta as guidelinesMeta } from "./Radio.metadata";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Radio } from "./Radio";
import { meta as radioMeta } from "./Radio.metadata";

const meta: Meta<typeof Radio> = {
  title: "Form/Radio",
  component: Radio,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `${radioMeta.description}\n\n**Cuándo usarlo:** ${radioMeta.useWhen}`,
      },
    },
  },
  argTypes: {
    error: { control: "boolean" },
    disabled: { control: "boolean" },
  },
  args: { label: "Tarjeta", name: "pago" },
};
export default meta;
type Story = StoryObj<typeof Radio>;

export const Default: Story = {};
export const Elegida: Story = { args: { defaultChecked: true } };
export const Error: Story = { args: { error: true } };
export const Disabled: Story = { args: { disabled: true, defaultChecked: true } };

export const Grupo: Story = {
  name: "Grupo",
  parameters: { controls: { disable: true } },
  render: () => (
    <fieldset style={{ border: "none", padding: 0, margin: 0 }}>
      <legend style={{ padding: 0, marginBottom: 4 }}>Método de pago</legend>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <Radio name="pago" value="tarjeta" label="Tarjeta" defaultChecked />
        <Radio name="pago" value="transferencia" label="Transferencia" />
        <Radio name="pago" value="bizum" label="Bizum" />
        <Radio name="pago" value="efectivo" label="Efectivo (no disponible)" disabled />
      </div>
    </fieldset>
  ),
};

const examples = [
  {
    good: (
      <Demo code={'<fieldset>\n  <legend>Frecuencia</legend>\n  <Radio name="frecuencia" value="mensual" label="Mensual" />\n  <Radio name="frecuencia" value="anual" label="Anual" />\n</fieldset>'}>
        <fieldset style={{ border: "none", padding: 0, margin: 0 }}>
          <legend style={{ padding: 0 }}>Frecuencia</legend>
          <Radio name="ej-frecuencia" value="mensual" label="Mensual" defaultChecked />
          <Radio name="ej-frecuencia" value="anual" label="Anual" />
        </fieldset>
      </Demo>
    ),
    bad: (
      <Demo code={'<Radio label="Mensual" />\n<Radio label="Anual" />'}>
        <div>
          <Radio label="Mensual" />
          <Radio label="Anual" />
        </div>
      </Demo>
    ),
  },
  {
    good: (
      <Demo code={'<Radio name="plan" value="basico" label="Básico" />\n<Radio name="plan" value="pro" label="Pro" />\n<Radio name="plan" value="equipo" label="Equipo" />'}>
        <div>
          <Radio name="ej-plan" value="basico" label="Básico" defaultChecked />
          <Radio name="ej-plan" value="pro" label="Pro" />
          <Radio name="ej-plan" value="equipo" label="Equipo" />
        </div>
      </Demo>
    ),
    bad: (
      <Demo code={'{paises.map((p) => (\n  <Radio name="pais" value={p} label={p} />\n))} // 12 países'}>
        <div style={{ maxHeight: 160, overflow: "hidden" }}>
          {["España", "Francia", "Italia", "Portugal", "Alemania", "Irlanda"].map((p) => (
            <Radio key={p} name="ej-pais" value={p} label={p} />
          ))}
        </div>
      </Demo>
    ),
  },
];

export const DosYDonts: Story = {
  name: "Do's y don'ts",
  parameters: { controls: { disable: true } },
  render: () => <Guidelines items={withExamples(guidelinesMeta.guidelines, examples)} />,
};
