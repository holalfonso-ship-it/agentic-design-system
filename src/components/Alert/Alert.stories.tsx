import { Guidelines, withExamples, Demo } from "../../stories/Guidelines";
import { meta as guidelinesMeta } from "./Alert.metadata";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Alert } from "./Alert";
import { meta as alertMeta } from "./Alert.metadata";

const meta: Meta<typeof Alert> = {
  title: "Feedback/Alert",
  component: Alert,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `${alertMeta.description}\n\n**Cuándo usarlo:** ${alertMeta.useWhen}`,
      },
    },
  },
  argTypes: {
    type: { control: "select", options: ["info", "success", "warning", "error"] },
    title: { control: "text" },
    actionLabel: { control: "text" },
  },
  args: { type: "info", title: "Información", children: "Tu cuenta se actualizará mañana por la mañana." },
  decorators: [(Story) => <div style={{ width: 360 }}><Story /></div>],
};
export default meta;
type Story = StoryObj<typeof Alert>;

export const Info: Story = {};
export const Success: Story = {
  args: { type: "success", title: "Pago completado", children: "Hemos enviado el recibo a tu correo." },
};
export const Warning: Story = {
  args: { type: "warning", title: "Revisa tu límite", children: "Estás cerca del límite de tu tarjeta este mes." },
};
export const Fallo: Story = {
  name: "Error",
  args: { type: "error", title: "No se pudo pagar", children: "Comprueba los datos de tu tarjeta e inténtalo de nuevo." },
};
export const ConAccion: Story = {
  name: "Con acción",
  args: { type: "error", title: "No se pudo pagar", children: "Comprueba los datos de tu tarjeta.", actionLabel: "Revisar tarjeta" },
};
export const SinTitulo: Story = {
  name: "Sin título",
  args: { title: undefined, children: "Los cambios se guardan automáticamente." },
};

export const LosCuatroTipos: Story = {
  name: "Los 4 tipos",
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <Alert type="info" title="Información">Tu cuenta se actualizará mañana por la mañana.</Alert>
      <Alert type="success" title="Pago completado">Hemos enviado el recibo a tu correo.</Alert>
      <Alert type="warning" title="Revisa tu límite">Estás cerca del límite de tu tarjeta este mes.</Alert>
      <Alert type="error" title="No se pudo pagar" actionLabel="Revisar tarjeta">Comprueba los datos de tu tarjeta e inténtalo de nuevo.</Alert>
    </div>
  ),
};

const examples = [
  {
    good: (
      <Demo code={'<Alert type="error" title="No se pudo pagar">Comprueba los datos de tu tarjeta.</Alert>'}>
        <Alert type="error" title="No se pudo pagar" style={{ width: "100%" }}>Comprueba los datos de tu tarjeta.</Alert>
      </Demo>
    ),
    bad: (
      <Demo code={'<Alert type="error">Error</Alert>'}>
        <Alert type="error" style={{ width: "100%" }}>Error</Alert>
      </Demo>
    ),
  },
  {
    good: (
      <Demo code={'<Alert type="warning" title="Revisa tu límite">Estás cerca del límite de tu tarjeta.</Alert>'}>
        <Alert type="warning" title="Revisa tu límite" style={{ width: "100%" }}>Estás cerca del límite de tu tarjeta.</Alert>
      </Demo>
    ),
    bad: (
      <Demo code={'<Alert type="success">Copiado al portapapeles</Alert>'}>
        <Alert type="success" style={{ width: "100%" }}>Copiado al portapapeles</Alert>
      </Demo>
    ),
  },
];

export const DosYDonts: Story = {
  name: "Do's y don'ts",
  parameters: { controls: { disable: true } },
  render: () => <Guidelines items={withExamples(guidelinesMeta.guidelines, examples)} />,
};
