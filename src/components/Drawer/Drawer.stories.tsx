import { Guidelines, withExamples, Code } from "../../stories/Guidelines";
import { meta as guidelinesMeta } from "./Drawer.metadata";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { Drawer } from "./Drawer";
import { Button } from "../Button";
import { meta as drawerMeta } from "./Drawer.metadata";

const meta: Meta<typeof Drawer> = {
  title: "Overlay/Drawer",
  component: Drawer,
  tags: ["autodocs"],
  parameters: {
    docs: {
      // El overlay es position: fixed: dentro de la página de docs quedaría recortado por la tarjeta
      // de la story, así que se dibuja en su propio iframe.
      story: { inline: false, iframeHeight: 520 },
      description: {
        component: `${drawerMeta.description}\n\n**Cuándo usarlo:** ${drawerMeta.useWhen}`,
      },
    },
  },
  argTypes: { side: { control: "inline-radio", options: ["end", "start"] } },
  args: {
    title: "Filtros",
    children: "Elige el periodo, el tipo de movimiento y la tarjeta. Los cambios se aplican al pulsar «Aplicar».",
    side: "end",
    primaryActionLabel: "Aplicar",
    secondaryActionLabel: "Cancelar",
  },
  render: (args) => {
    function Wrapper() {
      const [open, setOpen] = useState(true);
      return (
        <div>
          <Button variant="secondary" onClick={() => setOpen(true)}>
            Abrir panel
          </Button>
          <Drawer {...args} open={open} onClose={() => setOpen(false)} onPrimaryAction={() => setOpen(false)} />
        </div>
      );
    }
    return <Wrapper />;
  },
};
export default meta;
type Story = StoryObj<typeof Drawer>;

export const Filtros: Story = {};
export const PorElLadoInicial: Story = { name: "Por el lado inicial", args: { side: "start", title: "Cuentas" } };
export const SinFooter: Story = { name: "Sin footer", args: { primaryActionLabel: undefined, title: "Detalle del movimiento" } };

const examples = [
  {
    good: (
      <Code>{`<Drawer open={abierto} onClose={cerrar} title="Filtros"
  primaryActionLabel="Aplicar" onPrimaryAction={aplicar}>
  <FiltrosDeMovimientos />
</Drawer>`}</Code>
    ),
    bad: (
      <Code>{`<Drawer open={abierto} onClose={cerrar} title="¿Eliminar la tarjeta?"
  primaryActionLabel="Eliminar">
  Esta acción no se puede deshacer.
</Drawer>
// una decisión corta es un Modal`}</Code>
    ),
  },
  {
    good: (
      <Code>{`<Drawer title="Ajustes" primaryActionLabel="Guardar"
  secondaryActionLabel="Cancelar" …>
  <FormularioDeAjustes />
</Drawer>`}</Code>
    ),
    bad: (
      <Code>{`<Drawer title="Menú" open={true} onClose={() => {}}>
  <NavegacionPrincipal />
</Drawer>
// navegación permanente: va en la pantalla`}</Code>
    ),
  },
];

export const DosYDonts: Story = {
  name: "Do's y don'ts",
  parameters: { controls: { disable: true } },
  render: () => <Guidelines items={withExamples(guidelinesMeta.guidelines, examples)} />,
};
