import type { Meta, StoryObj } from "@storybook/react-vite";
import { TransactionListItem } from "./TransactionListItem";
import { meta as transactionListItemMeta } from "./TransactionListItem.metadata";
import { PlaceholderIcon } from "../../stories/PlaceholderIcon";

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
    icon: <PlaceholderIcon />,
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
      <TransactionListItem icon={<PlaceholderIcon />} merchant="Carrefour" category="Supermercado" amount="34,20 €" direction="out" timestamp="hoy" />
      <TransactionListItem icon={<PlaceholderIcon />} merchant="Nómina" category="Ingreso" amount="1.800,00 €" direction="in" timestamp="ayer" />
    </div>
  ),
};
