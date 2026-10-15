import { Guidelines, withExamples, Demo } from "../../stories/Guidelines";
import { meta as guidelinesMeta } from "./Tooltip.metadata";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Tooltip } from "./Tooltip";
import { meta as tooltipMeta } from "./Tooltip.metadata";
import { Icon } from "../Icon";

const IconButton = ({ label }: { label: string }) => (
  <button
    type="button"
    aria-label={label}
    style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 44, height: 44, border: "none", background: "transparent", cursor: "pointer" }}
  >
    <Icon name="info" size={20} />
  </button>
);

const meta: Meta<typeof Tooltip> = {
  title: "Feedback/Tooltip",
  component: Tooltip,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `${tooltipMeta.description}\n\n**Cuándo usarlo:** ${tooltipMeta.useWhen}`,
      },
    },
  },
  argTypes: {
    placement: { control: "select", options: ["top", "bottom", "left", "right"] },
    content: { control: "text" },
    delay: { control: "number" },
  },
  args: { content: "Más información", placement: "top", delay: 0 },
  // Deja sitio alrededor para que el bocadillo no se corte en el lienzo de la story.
  decorators: [(Story, ctx) => (ctx.id.endsWith("--dos-y-donts") ? <Story /> : <div style={{ padding: "64px 120px", display: "flex", justifyContent: "center" }}><Story /></div>)],
  render: (args) => (
    <Tooltip {...args}>
      <IconButton label="Más información" />
    </Tooltip>
  ),
};
export default meta;
type Story = StoryObj<typeof Tooltip>;

export const Arriba: Story = { args: { placement: "top" } };
export const Abajo: Story = { args: { placement: "bottom" } };
export const Izquierda: Story = { args: { placement: "left" } };
export const Derecha: Story = { args: { placement: "right" } };
const examples = [
  {
    good: (
      <Demo code={'<Tooltip content="Guardar borrador"><IconButton aria-label="Guardar borrador" /></Tooltip>'}>
        <Tooltip content="Guardar borrador" delay={0}><IconButton label="Guardar borrador" /></Tooltip>
      </Demo>
    ),
    bad: (
      <Demo code={'<Tooltip content="Guarda el borrador, vuelve a la lista y revisa los cambios antes de publicarlo en la web..."><button>…</button></Tooltip>'}>
        <Tooltip content="Guarda el borrador, vuelve a la lista y revisa los cambios antes de publicarlo en la web pública." delay={0}><IconButton label="Guardar" /></Tooltip>
      </Demo>
    ),
  },
  {
    good: (
      <Demo code={'<Tooltip content="Ayuda"><button aria-label="Ayuda">?</button></Tooltip>'}>
        <Tooltip content="Ayuda" delay={0}><IconButton label="Ayuda" /></Tooltip>
      </Demo>
    ),
    bad: (
      <Demo code={'<Tooltip content="Ayuda"><button>?</button></Tooltip> // sin aria-label'}>
        <Tooltip content="Ayuda" delay={0}>
          <button type="button" style={{ width: 44, height: 44, border: "none", background: "transparent" }}>
            <Icon name="info" size={20} />
          </button>
        </Tooltip>
      </Demo>
    ),
  },
];

export const DosYDonts: Story = {
  name: "Do's y don'ts",
  parameters: { controls: { disable: true } },
  render: () => <Guidelines items={withExamples(guidelinesMeta.guidelines, examples)} />,
};
