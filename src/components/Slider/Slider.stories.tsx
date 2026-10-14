import { Guidelines, withExamples, Demo } from "../../stories/Guidelines";
import { meta as guidelinesMeta } from "./Slider.metadata";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Slider } from "./Slider";
import { meta as sliderMeta } from "./Slider.metadata";

const meta: Meta<typeof Slider> = {
  title: "Form/Slider",
  component: Slider,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `${sliderMeta.description}\n\n**Cuándo usarlo:** ${sliderMeta.useWhen}`,
      },
    },
  },
  argTypes: {
    disabled: { control: "boolean" },
    showValue: { control: "boolean" },
    min: { control: "number" },
    max: { control: "number" },
    step: { control: "number" },
  },
  args: { label: "Volumen", defaultValue: 40, helperText: "Texto de ayuda" },
};
export default meta;
type Story = StoryObj<typeof Slider>;

export const Default: Story = {};
export const ConUnidad: Story = {
  name: "Con unidad",
  args: { label: "Brillo", defaultValue: 70, formatValue: (v: number) => `${v} %` },
};
export const Disabled: Story = { args: { disabled: true } };

export const LosTresEstados: Story = {
  name: "Los 3 estados",
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 16, width: 280 }}>
      <Slider label="Volumen" defaultValue={40} helperText="Texto de ayuda" />
      <Slider label="Brillo" defaultValue={70} formatValue={(v) => `${v} %`} helperText="Tabula hasta aquí para ver el foco" />
      <Slider label="Volumen" defaultValue={40} helperText="Texto de ayuda" disabled />
    </div>
  ),
};

const examples = [
  {
    good: (
      <Demo code={'<Slider label="Volumen" defaultValue={40} />'}>
        <Slider label="Volumen" defaultValue={40} />
      </Demo>
    ),
    bad: (
      <Demo code={'<Slider label="Importe a transferir" min={0} max={10000} />'}>
        <Slider label="Importe a transferir" min={0} max={10000} defaultValue={4000} />
      </Demo>
    ),
  },
  {
    good: (
      <Demo code={'<Slider label="Brillo" defaultValue={70} formatValue={(v) => `${v} %`} />'}>
        <Slider label="Brillo" defaultValue={70} formatValue={(v) => `${v} %`} />
      </Demo>
    ),
    bad: (
      <Demo code={'<Slider label="Brillo" defaultValue={70} showValue={false} />'}>
        <Slider label="Brillo" defaultValue={70} showValue={false} />
      </Demo>
    ),
  },
];

export const DosYDonts: Story = {
  name: "Do's y don'ts",
  parameters: { controls: { disable: true } },
  render: () => <Guidelines items={withExamples(guidelinesMeta.guidelines, examples)} />,
};
