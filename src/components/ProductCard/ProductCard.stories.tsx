import type { Meta, StoryObj } from "@storybook/react-vite";
import { ProductCard } from "./ProductCard";
import { Icon } from "../Icon";
import type { ProductCardProps } from "./ProductCard";
import { meta as productCardMeta } from "./ProductCard.metadata";

const meta: Meta<typeof ProductCard> = {
  title: "Data Display/ProductCard",
  component: ProductCard,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `${productCardMeta.description}\n\n**Cuándo usarlo:** ${productCardMeta.useWhen}\n\n\`product\`, \`state\` y \`side\` son tres ejes independientes (las 12 variantes del component set de Figma). Reconstruido en el Ciclo ARC 3: la API anterior (title/subtitle/amount) ya no existe.`,
      },
    },
  },
  argTypes: {
    product: { control: "select", options: ["bnpl", "credit"] },
    state: { control: "select", options: ["active", "frozen", "blocked"] },
    side: { control: "inline-radio", options: ["front", "back"] },
    progress: { control: { type: "range", min: 0, max: 1, step: 0.05 } },
  },
  args: {
    product: "credit",
    state: "active",
    side: "front",
    cardNumber: "4289",
    holderName: "Alfonso Zamorano",
    balance: "€3.500,00",
    balanceCaption: "de €3.800,00 disponibles",
    progress: 0.6,
    primaryAction: { label: "Ver movimientos" },
    secondaryAction: { label: "Congelar tarjeta" },
  },
};
export default meta;
type Story = StoryObj<typeof ProductCard>;

export const CreditoFrontal: Story = { name: "Crédito · activa · frontal" };
export const CreditoTrasera: Story = { name: "Crédito · activa · trasera", args: { side: "back" } };
export const BnplFrontal: Story = { name: "BNPL · activa · frontal", args: { product: "bnpl" } };
export const BnplTrasera: Story = { name: "BNPL · activa · trasera", args: { product: "bnpl", side: "back" } };
export const CongeladaTrasera: Story = {
  name: "Crédito · congelada · trasera",
  args: { state: "frozen", side: "back", secondaryAction: { label: "Descongelar tarjeta" } },
};
export const BloqueadaFrontal: Story = { name: "Crédito · bloqueada · frontal", args: { state: "blocked", statusIcon: <Icon name="lock" size={16} /> } };
export const BloqueadaTrasera: Story = {
  name: "Crédito · bloqueada · trasera",
  args: { state: "blocked", side: "back", secondaryAction: { label: "Contactar soporte" }, statusIcon: <Icon name="lock" size={16} /> },
};

const secondaryByState: Record<"active" | "frozen" | "blocked", string> = {
  active: "Congelar tarjeta",
  frozen: "Descongelar tarjeta",
  blocked: "Contactar soporte",
};

export const TodasLasVariantes: Story = {
  name: "Todas las variantes (12)",
  parameters: { controls: { disable: true }, layout: "padded" },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      {(["credit", "bnpl"] as const).flatMap((product) =>
        (["active", "frozen", "blocked"] as const).map((state) => {
          const base: ProductCardProps = {
            product,
            state,
            cardNumber: "4289",
            holderName: "Alfonso Zamorano",
            balance: "€3.500,00",
            balanceCaption: "de €3.800,00 disponibles",
            progress: 0.6,
            primaryAction: { label: "Ver movimientos" },
            secondaryAction: { label: secondaryByState[state] },
          };
          return (
            <div key={`${product}-${state}`} style={{ display: "flex", flexWrap: "wrap", gap: 24, alignItems: "flex-start" }}>
              <ProductCard {...base} side="front" />
              <ProductCard {...base} side="back" />
            </div>
          );
        }),
      )}
    </div>
  ),
};
