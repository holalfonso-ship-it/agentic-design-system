import { Guidelines, withExamples, Code } from "../../stories/Guidelines";
import { meta as guidelinesMeta } from "./QuickActionTile.metadata";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { QuickActionTile } from "./QuickActionTile";
import { meta as quickActionTileMeta } from "./QuickActionTile.metadata";
import { Icon } from "../Icon";

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
    icon: <Icon name="calendar" />,
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
      <QuickActionTile icon={<Icon name="house" />} title="Transferencias" subtitle="Feb · Mar · Abr · May" />
      <QuickActionTile icon={<Icon name="house" />} title="Pagar" subtitle="Recibos y servicios" />
    </div>
  ),
};


const examples = [
  {
    good: <QuickActionTile icon={<Icon name="wallet" />} title="Pagar" subtitle="Recibos y tarjetas" />,
    bad: (
      <QuickActionTile
        icon={<Icon name="wallet" />}
        title="Realizar una transferencia"
        subtitle="Envía dinero a cualquier cuenta bancaria del mundo"
      />
    ),
  },
  {
    good: (
      <Code>{`<button type="button" onClick={abrirPagos}>
  <QuickActionTile icon={<Icon name="wallet" />} title="Pagar" subtitle="Recibos" />
</button>`}</Code>
    ),
    bad: (
      <Code>{`<div onClick={abrirPagos}>
  <QuickActionTile icon={<Icon name="wallet" />} title="Pagar" subtitle="Recibos" />
</div>`}</Code>
    ),
  },
];

export const DosYDonts: Story = {
  name: "Do's y don'ts",
  parameters: { controls: { disable: true } },
  render: () => <Guidelines items={withExamples(guidelinesMeta.guidelines, examples)} />,
};
