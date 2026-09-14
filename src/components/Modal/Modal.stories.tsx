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
