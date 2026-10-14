import { Guidelines, withExamples, Code } from "../../stories/Guidelines";
import { meta as guidelinesMeta } from "./TransactionListItem.metadata";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { TransactionListItem } from "./TransactionListItem";
import { meta as transactionListItemMeta } from "./TransactionListItem.metadata";
import { Icon } from "../Icon";

const meta: Meta<typeof TransactionListItem> = {
  title: "Data Display/TransactionListItem",
  component: TransactionListItem,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `${transactionListItemMeta.description}\n\n**Cuándo usarlo:** ${transactionListItemMeta.useWhen}`,
      },
    },
  },
  argTypes: {
    direction: { control: "select", options: ["in", "out"] },
  },
  args: {
    icon: <Icon name="utensils" />,
    merchant: "Carrefour",
    category: "Supermercado",
    amount: "34,20 €",
    direction: "out",
    timestamp: "hoy",
  },
};
export default meta;
type Story = StoryObj<typeof TransactionListItem>;

export const Salida: Story = { name: "Salida (out)", args: { direction: "out" } };
export const Entrada: Story = {
  name: "Entrada (in)",
  args: { merchant: "Nómina", category: "Ingreso", amount: "1.800,00 €", direction: "in", timestamp: "ayer" },
};

export const Historial: Story = {
  name: "Historial de movimientos",
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ maxWidth: 340 }}>
      <TransactionListItem icon={<Icon name="utensils" />} merchant="Carrefour" category="Supermercado" amount="34,20 €" direction="out" timestamp="hoy" />
      <TransactionListItem icon={<Icon name="utensils" />} merchant="Nómina" category="Ingreso" amount="1.800,00 €" direction="in" timestamp="ayer" />
    </div>
  ),
};


const examples = [
  {
    good: <TransactionListItem merchant="Mercadona" category="Supermercado" amount="42,50 €" direction="out" timestamp="hoy" />,
    bad: <TransactionListItem merchant="Mercadona" category="Supermercado" amount="−42,50 €" direction="out" timestamp="hoy" />,
  },
  {
    good: (
      <Code>{`{"date":"2026-10-14","requestedBy":"agente de pagos","brief":"Fila con estado pendiente","closestComponent":"TransactionListItem","closestCategory":"data-display","reason":"Solo modela in/out; falta un estado intermedio","decision":"flagged"}`}</Code>
    ),
    bad: (
      <TransactionListItem merchant="Transferencia a Marta" category="⏳ Pendiente" amount="120,00 €" direction="out" timestamp="hoy" />
    ),
  },
];

export const DosYDonts: Story = {
  name: "Do's y don'ts",
  parameters: { controls: { disable: true } },
  render: () => <Guidelines items={withExamples(guidelinesMeta.guidelines, examples)} />,
};
