import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useState } from "react";
import { Modal } from "./Modal";
import { expectNoA11yViolations } from "../../test/axe";

const base = { title: "Confirmar", onClose: () => {} };

describe("Modal", () => {
  it("cerrado: no renderiza nada", () => {
    render(<Modal {...base} open={false}>Contenido</Modal>);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("abierto: role=dialog, aria-modal y nombre accesible = título", () => {
    render(<Modal {...base} open>Contenido</Modal>);
    const dialog = screen.getByRole("dialog", { name: "Confirmar" });
    expect(dialog).toHaveAttribute("aria-modal", "true");
    expect(screen.getByRole("heading", { name: "Confirmar" })).toBeInTheDocument();
    expect(screen.getByText("Contenido")).toBeInTheDocument();
  });

  it("Escape cierra", async () => {
    const onClose = vi.fn();
    render(<Modal {...base} open onClose={onClose}>x</Modal>);
    await userEvent.keyboard("{Escape}");
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("el botón Cerrar cierra", async () => {
    const onClose = vi.fn();
    render(<Modal {...base} open onClose={onClose}>x</Modal>);
    await userEvent.click(screen.getByRole("button", { name: "Cerrar" }));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("clic en el backdrop cierra; clic dentro del sheet no", async () => {
    const onClose = vi.fn();
    render(<Modal {...base} open onClose={onClose}>Contenido</Modal>);
    await userEvent.click(screen.getByText("Contenido"));
    expect(onClose).not.toHaveBeenCalled();
    await userEvent.click(screen.getByRole("dialog").parentElement as HTMLElement);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("footer por defecto: acción primaria y secundaria", async () => {
    const onPrimary = vi.fn();
    const onSecondary = vi.fn();
    render(
      <Modal {...base} open primaryActionLabel="Aceptar" onPrimaryAction={onPrimary}
        secondaryActionLabel="Volver" onSecondaryAction={onSecondary}>x</Modal>,
    );
    await userEvent.click(screen.getByRole("button", { name: "Aceptar" }));
    await userEvent.click(screen.getByRole("button", { name: "Volver" }));
    expect(onPrimary).toHaveBeenCalledTimes(1);
    expect(onSecondary).toHaveBeenCalledTimes(1);
  });

  it('la acción secundaria por defecto ("Cancelar") cierra el modal', async () => {
    const onClose = vi.fn();
    render(<Modal {...base} open onClose={onClose} primaryActionLabel="Aceptar">x</Modal>);
    await userEvent.click(screen.getByRole("button", { name: "Cancelar" }));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("footer personalizado sustituye al de dos botones", () => {
    render(<Modal {...base} open primaryActionLabel="Aceptar" footer={<button>Solo yo</button>}>x</Modal>);
    expect(screen.getByRole("button", { name: "Solo yo" })).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "Aceptar" })).not.toBeInTheDocument();
  });

  it("al abrir, el foco se mueve dentro del sheet", () => {
    render(<Modal {...base} open primaryActionLabel="Aceptar">x</Modal>);
    expect(screen.getByRole("dialog")).toContainElement(document.activeElement as HTMLElement);
  });

  it("focus trap: Tab y Shift+Tab nunca sacan el foco del sheet", async () => {
    render(<Modal {...base} open primaryActionLabel="Aceptar">x</Modal>);
    const dialog = screen.getByRole("dialog");
    for (let i = 0; i < 6; i++) {
      await userEvent.tab();
      expect(dialog).toContainElement(document.activeElement as HTMLElement);
    }
    for (let i = 0; i < 6; i++) {
      await userEvent.tab({ shift: true });
      expect(dialog).toContainElement(document.activeElement as HTMLElement);
    }
  });

  it("al cerrar, devuelve el foco al elemento que lo abrió", async () => {
    function Host() {
      const [open, setOpen] = useState(false);
      return (
        <>
          <button onClick={() => setOpen(true)}>Abrir</button>
          <Modal open={open} onClose={() => setOpen(false)} title="Confirmar">x</Modal>
        </>
      );
    }
    render(<Host />);
    const trigger = screen.getByRole("button", { name: "Abrir" });
    await userEvent.click(trigger);
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    await userEvent.keyboard("{Escape}");
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(trigger).toHaveFocus();
  });

  it("no tiene violaciones de accesibilidad", async () => {
    const { baseElement } = render(<Modal {...base} open primaryActionLabel="Aceptar">Contenido</Modal>);
    await expectNoA11yViolations(baseElement);
  });
});
