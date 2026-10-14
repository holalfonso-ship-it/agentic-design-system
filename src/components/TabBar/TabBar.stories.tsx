import { Guidelines, withExamples, Code } from "../../stories/Guidelines";
import { meta as guidelinesMeta } from "./TabBar.metadata";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { TabBar } from "./TabBar";
import { meta as tabBarMeta } from "./TabBar.metadata";

const items = [
  { key: "home", label: "Inicio" },
  { key: "cards", label: "Tarjetas" },
  { key: "activity", label: "Movimientos" },
  { key: "profile", label: "Perfil" },
];

const meta: Meta<typeof TabBar> = {
  title: "Navigation/TabBar",
  component: TabBar,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `${tabBarMeta.description}\n\n**Cuándo usarlo:** ${tabBarMeta.useWhen}\n\n⚠️ Nota abierta del Audit de Fase 3: el componente real en Figma es una barra flotante en pill sin labels — este repo mantiene la barra a todo el ancho con labels a propósito, ver \`TabBar.metadata.ts\`.`,
      },
    },
  },
  args: { items, activeKey: "home" },
};
export default meta;
type Story = StoryObj<typeof TabBar>;

export const Interactivo: Story = {
  name: "Interactivo",
  render: (args) => {
    function Wrapper() {
      const [activeKey, setActiveKey] = useState(args.activeKey);
      return <TabBar {...args} activeKey={activeKey} onChange={setActiveKey} />;
    }
    return <Wrapper />;
  },
};


const cuatro = [
  { key: "home", label: "Inicio" },
  { key: "cards", label: "Tarjetas" },
  { key: "activity", label: "Movimientos" },
  { key: "profile", label: "Perfil" },
];
const siete = [
  { key: "home", label: "Inicio" },
  { key: "cards", label: "Tarjetas" },
  { key: "pay", label: "Pagos" },
  { key: "activity", label: "Movimientos" },
  { key: "save", label: "Ahorro" },
  { key: "profile", label: "Perfil" },
  { key: "settings", label: "Ajustes" },
];

const examples = [
  {
    good: (
      <div style={{ width: "100%" }}>
        <TabBar items={cuatro} activeKey="home" />
      </div>
    ),
    bad: (
      <div style={{ width: "100%" }}>
        <TabBar items={siete} activeKey="home" />
      </div>
    ),
  },
  {
    good: (
      <Code>{`<header>
  <button aria-label="Volver">‹</button>
  <h1>Detalle del movimiento</h1>
</header>`}</Code>
    ),
    bad: (
      <Code>{`<TabBar
  items={[{ key: "detalle", label: "Detalle" }, { key: "recibo", label: "Recibo" }]}
  activeKey="detalle"
/>`}</Code>
    ),
  },
];

export const DosYDonts: Story = {
  name: "Do's y don'ts",
  parameters: { controls: { disable: true } },
  render: () => <Guidelines items={withExamples(guidelinesMeta.guidelines, examples)} />,
};
