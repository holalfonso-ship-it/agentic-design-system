import { Guidelines, withExamples, Demo } from "../../stories/Guidelines";
import { meta as guidelinesMeta } from "./Skeleton.metadata";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Skeleton } from "./Skeleton";
import { meta as skeletonMeta } from "./Skeleton.metadata";

const meta: Meta<typeof Skeleton> = {
  title: "Feedback/Skeleton",
  component: Skeleton,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `${skeletonMeta.description}\n\n**Cuándo usarlo:** ${skeletonMeta.useWhen}`,
      },
    },
  },
  argTypes: {
    shape: { control: "select", options: ["text", "circle", "rect"] },
    width: { control: "text" },
    height: { control: "text" },
  },
  args: { shape: "text" },
  decorators: [(Story, ctx) => (ctx.id.endsWith("--dos-y-donts") ? <Story /> : <div style={{ width: 280 }}><Story /></div>)],
};
export default meta;
type Story = StoryObj<typeof Skeleton>;

export const Texto: Story = {};
export const Circulo: Story = { name: "Círculo", args: { shape: "circle" } };
export const Rectangulo: Story = { name: "Rectángulo", args: { shape: "rect" } };

export const PerfilCargando: Story = {
  name: "Ejemplo: perfil cargando",
  parameters: { controls: { disable: true } },
  render: () => (
    <div aria-busy="true" style={{ display: "flex", gap: 12, alignItems: "center" }}>
      <Skeleton shape="circle" />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 8 }}>
        <Skeleton width="50%" />
        <Skeleton />
      </div>
    </div>
  ),
};

const examples = [
  {
    good: (
      <Demo code={'<Skeleton shape="circle" /> + <Skeleton width="50%" /> + <Skeleton />'}>
        <div style={{ display: "flex", gap: 12, alignItems: "center", width: "100%" }}>
          <Skeleton shape="circle" />
          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 8 }}>
            <Skeleton width="50%" />
            <Skeleton />
          </div>
        </div>
      </Demo>
    ),
    bad: (
      <Demo code={'<Skeleton shape="rect" height={200} /> // un bloque para todo'}>
        <Skeleton shape="rect" height={120} />
      </Demo>
    ),
  },
  {
    good: (
      <Demo code={'<div aria-busy="true"> <Skeleton /> </div>'}>
        <div aria-busy="true" style={{ width: "100%" }}>
          <Skeleton />
        </div>
      </Demo>
    ),
    bad: (
      <Demo code={'<Skeleton /> // sin aria-busy ni texto de estado'}>
        <div style={{ width: "100%" }}>
          <Skeleton />
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
