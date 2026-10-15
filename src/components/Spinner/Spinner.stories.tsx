import { Guidelines, withExamples, Demo } from "../../stories/Guidelines";
import { meta as guidelinesMeta } from "./Spinner.metadata";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Spinner } from "./Spinner";
import { meta as spinnerMeta } from "./Spinner.metadata";
import { Skeleton } from "../Skeleton";

const meta: Meta<typeof Spinner> = {
  title: "Feedback/Spinner",
  component: Spinner,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `${spinnerMeta.description}\n\n**Cuándo usarlo:** ${spinnerMeta.useWhen}`,
      },
    },
  },
  argTypes: {
    size: { control: "select", options: ["sm", "md", "lg"] },
    label: { control: "text" },
  },
  args: { size: "md", label: "Cargando" },
};
export default meta;
type Story = StoryObj<typeof Spinner>;

export const Medio: Story = {};
export const Pequeno: Story = { name: "Pequeño", args: { size: "sm" } };
export const Grande: Story = { args: { size: "lg" } };
export const ConEtiqueta: Story = {
  name: "Con etiqueta concreta",
  args: { label: "Enviando pago" },
};

export const LosTresTamanos: Story = {
  name: "Los 3 tamaños",
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
      <Spinner size="sm" />
      <Spinner size="md" />
      <Spinner size="lg" />
    </div>
  ),
};

const examples = [
  {
    good: (
      <Demo code={'<Spinner label="Enviando pago" />'}>
        <Spinner label="Enviando pago" />
      </Demo>
    ),
    bad: (
      <Demo code={'<Spinner /> // en una pantalla sin más contexto'}>
        <Spinner />
      </Demo>
    ),
  },
  {
    good: (
      <Demo code={'<div aria-busy="true"><Skeleton /><Skeleton width="60%" /></div>'}>
        <div aria-busy="true" style={{ display: "flex", flexDirection: "column", gap: 8, width: "100%" }}>
          <Skeleton />
          <Skeleton width="60%" />
        </div>
      </Demo>
    ),
    bad: (
      <Demo code={'<Spinner size="lg" /> // solo, en medio de una pantalla vacía'}>
        <div style={{ display: "flex", justifyContent: "center", padding: 32, width: "100%" }}>
          <Spinner size="lg" />
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
