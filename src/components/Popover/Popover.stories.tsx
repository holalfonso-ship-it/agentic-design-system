import { Guidelines, withExamples, Code } from "../../stories/Guidelines";
import { meta as guidelinesMeta } from "./Popover.metadata";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Popover } from "./Popover";
import { Button } from "../Button";
import { meta as popoverMeta } from "./Popover.metadata";

const meta: Meta<typeof Popover> = {
  title: "Overlay/Popover",
  component: Popover,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `${popoverMeta.description}\n\n**Cuándo usarlo:** ${popoverMeta.useWhen}`,
      },
    },
  },
  argTypes: {
    placement: { control: "select", options: ["bottom-start", "bottom-end", "top-start", "top-end"] },
    title: { control: "text" },
    actionLabel: { control: "text" },
  },
  args: {
    title: "¿Cómo se calcula?",
    children: "Suma los movimientos del mes en curso, sin contar las devoluciones pendientes.",
    actionLabel: "Entendido",
    placement: "bottom-start",
    defaultOpen: true,
  },
  // Deja sitio para que el panel flotante no se corte en el lienzo de la story.
  decorators: [
    (Story, ctx) =>
      ctx.id.endsWith("--dos-y-donts") ? (
        <Story />
      ) : (
        <div style={{ padding: "32px 32px 200px", minHeight: 280, display: "flex", justifyContent: "center" }}>
          <Story />
        </div>
      ),
  ],
  render: (args) => (
    <Popover
      {...args}
      trigger={(p) => (
        <Button variant="secondary" size="sm" {...p}>
          Gasto del mes
        </Button>
      )}
    />
  ),
};
export default meta;
type Story = StoryObj<typeof Popover>;

export const ConAccion: Story = { name: "Con título y acción" };
export const SoloTexto: Story = { name: "Solo texto", args: { title: undefined, actionLabel: undefined, "aria-label": "Cómo se calcula" } };
export const Arriba: Story = { args: { placement: "top-start" }, decorators: [(Story) => <div style={{ paddingTop: 180 }}><Story /></div>] };

const examples = [
  {
    good: (
      <Code>{`<Popover
  title="¿Cómo se calcula?"
  actionLabel="Entendido"
  trigger={(p) => <Button {...p}>Gasto del mes</Button>}
>
  Suma los movimientos del mes en curso.
</Popover>`}</Code>
    ),
    bad: (
      <Code>{`<Popover trigger={...}>
  <FormularioAltaBeneficiario />
</Popover>
// se cierra al pulsar fuera: se pierde lo escrito`}</Code>
    ),
  },
  {
    good: (
      <Code>{`<Popover trigger={(p) => <Button {...p}>Ayuda</Button>}>
  …
</Popover>`}</Code>
    ),
    bad: (
      <Code>{`const [abierto, setAbierto] = useState(false);
<Button onClick={() => setAbierto(!abierto)}>Ayuda</Button>
<Popover open={abierto}>…</Popover>
// sin aria-expanded ni aria-controls`}</Code>
    ),
  },
];

export const DosYDonts: Story = {
  name: "Do's y don'ts",
  parameters: { controls: { disable: true } },
  render: () => <Guidelines items={withExamples(guidelinesMeta.guidelines, examples)} />,
};
