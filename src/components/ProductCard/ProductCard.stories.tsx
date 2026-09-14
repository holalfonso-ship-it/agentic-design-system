import type { Meta, StoryObj } from "@storybook/react-vite";
import { ProductCard } from "./ProductCard";
import { meta as productCardMeta } from "./ProductCard.metadata";

const meta: Meta<typeof ProductCard> = {
  title: "Data Display/ProductCard",
  component: ProductCard,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `${productCardMeta.description}\n\n**Cuándo usarlo:** ${productCardMeta.useWhen}\n\n\`product\` y \`state\` son dos ejes independientes (remodelado en el Compose de la Fase 3) — no todas las combinaciones antiguas de "variant" existen ya.`,
      },
    },
  },
  argTypes: {
    product: { control: "select", options: ["bnpl", "credit"] },
    state: { control: "select", options: ["active", "frozen", "blocked"] },
  },
  args: {
    product: "credit",
    state: "active",
    title: "Tarjeta Visa ····4821",
    subtitle: "Límite disponible",
    amount: "1.230,00 €",
  },
};
export default meta;
type Story = StoryObj<typeof ProductCard>;

export const BnplActiva: Story = {
  name: "BNPL · activa",
  args: { product: "bnpl", state: "active", title: "Compra en 3 pagos", subtitle: "Próximo pago: 12 sep", amount: "45,00 €" },
};
export const CreditoActivo: Story = {
  name: "Crédito · activo",
  args: { product: "credit", state: "active" },
};
export const CreditoCongelado: Story = {
  name: "Crédito · congelado",
  args: { product: "credit", state: "frozen", subtitle: "Congelada por el usuario", amount: undefined },
};
export const CreditoBloqueado: Story = {
  name: "Crédito · bloqueado",
  args: { product: "credit", state: "blocked", subtitle: "Bloqueada por sospecha de fraude", amount: undefined },
};

export const TodosLosEstados: Story = {
  name: "Todos los estados",
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 12, maxWidth: 320 }}>
      <ProductCard product="bnpl" title="Compra en 3 pagos" subtitle="Próximo pago: 12 sep" amount="45,00 €" />
      <ProductCard product="credit" title="Tarjeta Visa ····4821" subtitle="Límite disponible" amount="1.230,00 €" />
      <ProductCard product="credit" state="frozen" title="Tarjeta Visa ····4821" subtitle="Congelada por el usuario" />
      <ProductCard product="credit" state="blocked" title="Tarjeta Visa ····4821" subtitle="Bloqueada por sospecha de fraude" />
    </div>
  ),
};
