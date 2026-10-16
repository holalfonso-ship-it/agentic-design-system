import { describe, it, expect, vi, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useState } from "react";
import { Drawer } from "./Drawer";
import { expectNoA11yViolations } from "../../test/axe";

afterEach(cleanup);

const base = { title: "Filtros", onClose: () => {} };

describe("Drawer", () => {
  it("cerrado: no renderiza nada", () => {
    render(<Drawer {...base} open={false}>Contenido</Drawer>);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("abierto: role=dialog, aria-modal y nombre accesible = título", () => {
    render(<Drawer {...base} open>Contenido</Drawer>);
    const dialog = screen.getByRole("dialog", { name: "Filtros" });
    expect(dialog).toHaveAttribute("aria-modal", "true");
    expect(screen.getByRole("heading", { name: "Filtros" })).toBeInTheDocument();
    expect(screen.getByText("Contenido")).toBeInTheDocument();
  });

  it("side=end (por defecto) lo pega a la derecha y side=start a la izquierda", () => {
    const { rerender } = render(<Drawer {...base} open>x</Drawer>);
    expect(screen.getByRole("dialog").parentElement?.style.justifyContent).toBe("flex-end");
    rerender(<Drawer {...base} open side="start">x</Drawer>);
    expect(screen.getByRole("dialog").parentElement?.style.justifyContent).toBe("flex-start");
  });

  it("el radio va en el borde que da al contenido", () => {
    const { rerender } = render(<Drawer {...base} open>x</Drawer>);
    expect(screen.getByRole("dialog").style.borderTopLeftRadius).not.toBe("");
    expect(screen.getByRole("dialog").style.borderTopRightRadius).toBe("");
    rerender(<Drawer {...base} open side="start">x</Drawer>);
    expect(screen.getByRole("dialog").style.borderTopRightRadius).not.toBe("");
    expect(screen.getByRole("dialog").style.borderTopLeftRadius).toBe("");
  });

  it("Escape cierra", async () => {
    const onClose = vi.fn();
    render(<Drawer {...base} open onClose={onClose}>x</Drawer>);
    await userEvent.keyboard("{Escape}");
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("el botón Cerrar cierra", async () => {
    const onClose = vi.fn();
    render(<Drawer {...base} open onClose={onClose}>x</Drawer>);
    await userEvent.click(screen.getByRole("button", { name: "Cerrar" }));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("clic en el fondo cierra; clic dentro del panel no", async () => {
    const onClose = vi.fn();
    render(<Drawer {...base} open onClose={onClose}>Contenido</Drawer>);
    await userEvent.click(screen.getByText("Contenido"));
    expect(onClose).not.toHaveBeenCalled();
    await userEvent.click(screen.getByRole("dialog").parentElement as HTMLElement);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("footer por defecto: acción primaria y secundaria", async () => {
    const onPrimary = vi.fn();
    const onSecondary = vi.fn();
    render(
      <Drawer {...base} open primaryActionLabel="Aplicar" onPrimaryAction={onPrimary}
        secondaryActionLabel="Volver" onSecondaryAction={onSecondary}>x</Drawer>,
    );
    await userEvent.click(screen.getByRole("button", { name: "Aplicar" }));
    await userEvent.click(screen.getByRole("button", { name: "Volver" }));
    expect(onPrimary).toHaveBeenCalledTimes(1);
    expect(onSecondary).toHaveBeenCalledTimes(1);
  });

  it('la acción secundaria por defecto ("Cancelar") cierra', async () => {
    const onClose = vi.fn();
    render(<Drawer {...base} open onClose={onClose} primaryActionLabel="Aplicar">x</Drawer>);
    await userEvent.click(screen.getByRole("button", { name: "Cancelar" }));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("sin acciones ni footer no dibuja footer", () => {
    render(<Drawer {...base} open>x</Drawer>);
    expect(screen.getAllByRole("button")).toHaveLength(1);
  });

  it("footer personalizado sustituye al de dos botones", () => {
    render(<Drawer {...base} open primaryActionLabel="Aplicar" footer={<button>Solo yo</button>}>x</Drawer>);
    expect(screen.getByRole("button", { name: "Solo yo" })).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "Aplicar" })).not.toBeInTheDocument();
  });

  it("al abrirse el foco entra en el panel; Tab y Shift+Tab no se escapan", async () => {
    render(<Drawer {...base} open primaryActionLabel="Aplicar">x</Drawer>);
    expect(screen.getByRole("button", { name: "Cerrar" })).toHaveFocus();
    await userEvent.tab();
    expect(screen.getByRole("button", { name: "Cancelar" })).toHaveFocus();
    await userEvent.tab();
    expect(screen.getByRole("button", { name: "Aplicar" })).toHaveFocus();
    await userEvent.tab();
    expect(screen.getByRole("button", { name: "Cerrar" })).toHaveFocus();
    await userEvent.tab({ shift: true });
    expect(screen.getByRole("button", { name: "Aplicar" })).toHaveFocus();
  });

  it("al cerrarse devuelve el foco al elemento que lo abrió", async () => {
    function Wrapper() {
      const [open, setOpen] = useState(false);
      return (
        <div>
          <button onClick={() => setOpen(true)}>Abrir</button>
          <Drawer {...base} open={open} onClose={() => setOpen(false)}>x</Drawer>
        </div>
      );
    }
    render(<Wrapper />);
    await userEvent.click(screen.getByRole("button", { name: "Abrir" }));
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    await userEvent.keyboard("{Escape}");
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Abrir" })).toHaveFocus();
  });

  it("no tiene violaciones de accesibilidad (abierto)", async () => {
    const { baseElement } = render(
      <Drawer {...base} open primaryActionLabel="Aplicar">Contenido</Drawer>,
    );
    await expectNoA11yViolations(baseElement);
  });
});
