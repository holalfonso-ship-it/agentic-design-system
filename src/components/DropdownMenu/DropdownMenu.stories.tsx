import { Guidelines, withExamples, Code } from "../../stories/Guidelines";
import { meta as guidelinesMeta } from "./DropdownMenu.metadata";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { DropdownMenu } from "./DropdownMenu";
import { Button } from "../Button";
import { meta as dropdownMeta } from "./DropdownMenu.metadata";

const meta: Meta<typeof DropdownMenu> = {
  title: "Overlay/DropdownMenu",
  component: DropdownMenu,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `${dropdownMeta.description}\n\n**Cuándo usarlo:** ${dropdownMeta.useWhen}`,
      },
    },
  },
  argTypes: {
    placement: { control: "select", options: ["bottom-start", "bottom-end", "top-start", "top-end"] },
  },
  args: {
    placement: "bottom-start",
    defaultOpen: true,
    "aria-label": "Acciones de la tarjeta",
    items: [
      { label: "Ajustes de la tarjeta", icon: "menu" },
      { label: "Congelar tarjeta", icon: "eye-off", selected: true },
      { type: "divider" },
      { label: "Bloquear tarjeta", icon: "x", tone: "destructive" },
      { label: "Descargar extracto", icon: "arrow-right", disabled: true },
    ],
  },
  // Deja sitio para que el menú desplegado no se corte en el lienzo de la story.
  decorators: [
    (Story, ctx) =>
      ctx.id.endsWith("--dos-y-donts") ? (
        <Story />
      ) : (
        <div style={{ padding: "32px 32px 260px", minHeight: 340, display: "flex", justifyContent: "center" }}>
          <Story />
        </div>
      ),
  ],
  render: (args) => (
    <DropdownMenu
      {...args}
      trigger={(p) => (
        <Button variant="secondary" size="sm" {...p}>
          Opciones
        </Button>
      )}
    />
  ),
};
export default meta;
type Story = StoryObj<typeof DropdownMenu>;

export const Completo: Story = {};
export const SinIconos: Story = {
  name: "Sin iconos",
  args: {
    items: [{ label: "Editar" }, { label: "Duplicar" }, { type: "divider" }, { label: "Eliminar", tone: "destructive" }],
  },
};
export const AlineadoALaDerecha: Story = { name: "Alineado a la derecha", args: { placement: "bottom-end" } };

const examples = [
  {
    good: (
      <Code>{`items={[
  { label: "Ajustes", icon: "menu" },
  { label: "Congelar tarjeta" },
  { type: "divider" },
  { label: "Bloquear tarjeta", tone: "destructive" },
]}`}</Code>
    ),
    bad: (
      <Code>{`items={[
  { label: "Bloquear tarjeta" },   // sin tone ni separador
  { label: "Ajustes" },
  { label: "Congelar tarjeta" },
]}`}</Code>
    ),
  },
  {
    good: (
      <Code>{`<DropdownMenu
  trigger={(p) => <Button {...p}>Opciones</Button>}
  items={[{ label: "Congelar tarjeta", onSelect: congelar }]}
/>`}</Code>
    ),
    bad: (
      <Code>{`<DropdownMenu
  trigger={(p) => <Button {...p}>País</Button>}
  items={paises.map((p) => ({ label: p, selected: p === pais }))}
/>
// elegir un valor de un campo: usa Select`}</Code>
    ),
  },
];

export const DosYDonts: Story = {
  name: "Do's y don'ts",
  parameters: { controls: { disable: true } },
  render: () => <Guidelines items={withExamples(guidelinesMeta.guidelines, examples)} />,
};
