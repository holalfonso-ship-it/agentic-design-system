import { Guidelines, withExamples, Demo } from "../../stories/Guidelines";
import { meta as guidelinesMeta } from "./Toast.metadata";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Toast, ToastProvider, useToast } from "./Toast";
import { Button } from "../Button";
import { meta as toastMeta } from "./Toast.metadata";

const meta: Meta<typeof Toast> = {
  title: "Feedback/Toast",
  component: Toast,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `${toastMeta.description}\n\n**Cuándo usarlo:** ${toastMeta.useWhen}`,
      },
    },
  },
  argTypes: {
    type: { control: "select", options: ["info", "success", "warning", "error"] },
    title: { control: "text" },
    actionLabel: { control: "text" },
  },
  args: { type: "info", title: "Información", children: "Tu cuenta se actualizará mañana." },
  // 360 px para las stories de un solo aviso; la página «Do's y don'ts» necesita todo el ancho
  // para repartir «Hacer» y «Evitar» en dos columnas.
  decorators: [(Story, ctx) => (ctx.id.endsWith("--dos-y-donts") ? <Story /> : <div style={{ width: 360 }}><Story /></div>)],
};
export default meta;
type Story = StoryObj<typeof Toast>;

export const Info: Story = {};
export const Success: Story = { args: { type: "success", title: "Pago completado", children: "Hemos enviado el recibo." } };
export const Warning: Story = { args: { type: "warning", title: "Revisa tu límite", children: "Estás cerca de tu límite." } };
export const Fallo: Story = {
  name: "Error",
  args: { type: "error", title: "No se pudo pagar", children: "Comprueba los datos de tu tarjeta." },
};
export const ConCierre: Story = {
  name: "Con cierre",
  args: { onClose: () => {} },
};
export const ConAccion: Story = {
  name: "Con acción y cierre",
  args: { type: "success", title: undefined, children: "Transferencia enviada.", actionLabel: "Deshacer", onClose: () => {} },
};

export const LosCuatroTipos: Story = {
  name: "Los 4 tipos",
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <Toast type="info" title="Información" onClose={() => {}}>Tu cuenta se actualizará mañana.</Toast>
      <Toast type="success" title="Pago completado" onClose={() => {}}>Hemos enviado el recibo.</Toast>
      <Toast type="warning" title="Revisa tu límite" onClose={() => {}}>Estás cerca de tu límite.</Toast>
      <Toast type="error" title="No se pudo pagar" onClose={() => {}}>Comprueba los datos de tu tarjeta.</Toast>
    </div>
  ),
};

function Lanzador() {
  const { show } = useToast();
  return (
    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
      <Button size="sm" onClick={() => show({ type: "success", message: "Copiado al portapapeles" })}>Aviso que se retira solo</Button>
      <Button size="sm" variant="secondary" onClick={() => show({ type: "info", message: "Transferencia enviada", actionLabel: "Deshacer" })}>Aviso con acción</Button>
    </div>
  );
}

export const ConProveedor: Story = {
  name: "Con ToastProvider y useToast",
  parameters: { controls: { disable: true } },
  decorators: [(Story) => <ToastProvider><Story /></ToastProvider>],
  render: () => <Lanzador />,
};

const examples = [
  {
    good: (
      <Demo code={'<Toast type="success" onClose={close}>Copiado al portapapeles</Toast>'}>
        <Toast type="success" onClose={() => {}} style={{ width: "100%" }}>Copiado al portapapeles</Toast>
      </Demo>
    ),
    bad: (
      <Demo code={'<Toast type="error" onClose={close}>No se pudo pagar</Toast>'}>
        <Toast type="error" onClose={() => {}} style={{ width: "100%" }}>No se pudo pagar</Toast>
      </Demo>
    ),
  },
  {
    good: (
      <Demo code={'<Toast type="info">Transferencia enviada</Toast>'}>
        <Toast type="info" style={{ width: "100%" }}>Transferencia enviada</Toast>
      </Demo>
    ),
    bad: (
      <Demo code={'<Toast type="info">Para cambiar tu límite entra en Ajustes, pulsa Tarjeta, elige el límite y confirma con tu PIN.</Toast>'}>
        <Toast type="info" style={{ width: "100%" }}>Para cambiar tu límite entra en Ajustes, pulsa Tarjeta, elige el límite y confirma con tu PIN.</Toast>
      </Demo>
    ),
  },
];

export const DosYDonts: Story = {
  name: "Do's y don'ts",
  parameters: { controls: { disable: true } },
  render: () => <Guidelines items={withExamples(guidelinesMeta.guidelines, examples)} />,
};
