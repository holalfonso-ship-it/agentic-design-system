import { Guidelines, withExamples, Code } from "../../stories/Guidelines";
import { meta as guidelinesMeta } from "./Modal.metadata";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { Modal } from "./Modal";
import { Button } from "../Button";
import { meta as modalMeta } from "./Modal.metadata";

const meta: Meta<typeof Modal> = {
  title: "Overlay/Modal",
  component: Modal,
  tags: ["autodocs"],
  parameters: {
    docs: {
      // El overlay es position: fixed: dentro de la página de docs quedaría recortado por la tarjeta
      // de la story, así que se dibuja en su propio iframe.
      story: { inline: false, iframeHeight: 520 },
      description: {
        component: `${modalMeta.description}\n\n**Cuándo usarlo:** ${modalMeta.useWhen}`,
      },
    },
  },
  args: {
    title: "Confirmar transferencia",
    children: "Vas a transferir 45,00 € a Carrefour. Esta acción no se puede deshacer.",
    primaryActionLabel: "Confirmar",
    secondaryActionLabel: "Cancelar",
  },
};
export default meta;
type Story = StoryObj<typeof Modal>;

export const ConfirmacionDeTransferencia: Story = {
  name: "Confirmación de transferencia",
  render: (args) => {
    function Wrapper() {
      const [open, setOpen] = useState(true);
      return (
        <div>
          <Button variant="secondary" onClick={() => setOpen(true)}>
            Abrir modal
          </Button>
          <Modal {...args} open={open} onClose={() => setOpen(false)} onPrimaryAction={() => setOpen(false)} />
        </div>
      );
    }
    return <Wrapper />;
  },
};


const examples = [
  {
    good: (
      <Code>{`<Modal
  open={abierto}
  onClose={cerrar}
  title="¿Eliminar la tarjeta virtual?"
  primaryActionLabel="Eliminar"
  onPrimaryAction={eliminar}
>
  Esta acción no se puede deshacer.
</Modal>`}</Code>
    ),
    bad: (
      <Code>{`<Modal
  open={abierto}
  onClose={cerrar}
  title="Guardado"
  primaryActionLabel="OK"
  onPrimaryAction={cerrar}
>
  Tus cambios se han guardado.
</Modal>`}</Code>
    ),
  },
  {
    good: <Code>{'navigate("/alta-beneficiario")\n// varios pasos: pantalla propia'}</Code>,
    bad: (
      <Code>{`<Modal title="Paso 2 de 5" ...>
  <AsistenteAltaBeneficiario />
</Modal>`}</Code>
    ),
  },
];

export const DosYDonts: Story = {
  name: "Do's y don'ts",
  parameters: { controls: { disable: true } },
  render: () => <Guidelines items={withExamples(guidelinesMeta.guidelines, examples)} />,
};
