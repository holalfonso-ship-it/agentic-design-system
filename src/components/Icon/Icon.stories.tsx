import type { Meta, StoryObj } from "@storybook/react-vite";
import { Icon, iconNames } from "./Icon";
import { meta as iconMeta } from "./Icon.metadata";

const meta: Meta<typeof Icon> = {
  title: "Data Display/Icon",
  component: Icon,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `${iconMeta.description}\n\n**Cuándo usarlo:** ${iconMeta.useWhen}\n\n**Sobre los glifos:** los iconos de Figma son SF Symbols (licencia de Apple, solo plataformas de Apple), así que Aida usa glifos de Lucide (ISC) mapeados a ellos. Tabla de mapeo en la metadata.`,
      },
    },
  },
  argTypes: {
    name: { control: "select", options: iconNames },
    size: { control: { type: "range", min: 12, max: 64, step: 2 } },
    color: { control: "color" },
  },
  args: { name: "house", size: 20 },
};
export default meta;
type Story = StoryObj<typeof Icon>;

export const Default: Story = {};
export const Grande: Story = { name: "Tamaño y color", args: { name: "wallet", size: 48, color: "#361C5C" } };
export const ConTitulo: Story = {
  name: "Con título (imagen accesible)",
  args: { name: "lock", title: "Tarjeta bloqueada" },
};

export const Catalogo: Story = {
  name: "Catálogo",
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))", gap: 16 }}>
      {iconNames.map((name) => (
        <div key={name} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8, padding: 12 }}>
          <Icon name={name} size={28} />
          <code style={{ fontSize: 11, textAlign: "center" }}>{name}</code>
        </div>
      ))}
    </div>
  ),
};
