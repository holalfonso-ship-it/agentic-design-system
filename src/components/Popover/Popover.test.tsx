import { describe, it, expect, vi, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Popover } from "./Popover";
import type { PopoverProps } from "./Popover";
import { expectNoA11yViolations } from "../../test/axe";

afterEach(cleanup);

const setup = (props: Partial<PopoverProps> = {}) =>
  render(
    <div>
      <Popover
        title="Título"
        trigger={(p) => (
          <button type="button" {...p}>
            Abrir
          </button>
        )}
        {...props}
      >
        Contenido breve
      </Popover>
      <button type="button">Fuera</button>
    </div>,
  );

describe("Popover", () => {
  it("está cerrado al principio y el botón lo anuncia", () => {
    setup();
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    const trigger = screen.getByRole("button", { name: "Abrir" });
    expect(trigger).toHaveAttribute("aria-haspopup", "dialog");
    expect(trigger).toHaveAttribute("aria-expanded", "false");
  });

  it("se abre con el botón: role=dialog sin aria-modal, nombrado por el título", async () => {
    setup();
    await userEvent.click(screen.getByRole("button", { name: "Abrir" }));
    const dialog = screen.getByRole("dialog", { name: "Título" });
    expect(dialog).not.toHaveAttribute("aria-modal");
    expect(dialog).toHaveTextContent("Contenido breve");
    const trigger = screen.getByRole("button", { name: "Abrir" });
    expect(trigger).toHaveAttribute("aria-expanded", "true");
    expect(trigger).toHaveAttribute("aria-controls", dialog.id);
  });

  it("sin título usa aria-label como nombre accesible", async () => {
    setup({ title: undefined, "aria-label": "Cómo se calcula" });
    await userEvent.click(screen.getByRole("button", { name: "Abrir" }));
    expect(screen.getByRole("dialog", { name: "Cómo se calcula" })).toBeInTheDocument();
    expect(screen.queryByText("Título")).not.toBeInTheDocument();
  });

  it("el foco entra en el panel y Escape lo cierra devolviendo el foco al botón", async () => {
    setup();
    await userEvent.click(screen.getByRole("button", { name: "Abrir" }));
    expect(screen.getByRole("dialog")).toHaveFocus();
    await userEvent.keyboard("{Escape}");
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Abrir" })).toHaveFocus();
  });

  it("pulsar fuera lo cierra; pulsar dentro no", async () => {
    setup();
    await userEvent.click(screen.getByRole("button", { name: "Abrir" }));
    await userEvent.click(screen.getByText("Contenido breve"));
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    await userEvent.click(screen.getByRole("button", { name: "Fuera" }));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("sacar el foco del panel con Tab lo cierra", async () => {
    setup({ actionLabel: "Entendido" });
    await userEvent.click(screen.getByRole("button", { name: "Abrir" }));
    expect(screen.getByRole("button", { name: "Entendido" })).toHaveFocus();
    await userEvent.tab();
    await userEvent.tab();
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("la acción llama a onAction y cierra", async () => {
    const onAction = vi.fn();
    setup({ actionLabel: "Entendido", onAction });
    await userEvent.click(screen.getByRole("button", { name: "Abrir" }));
    await userEvent.click(screen.getByRole("button", { name: "Entendido" }));
    expect(onAction).toHaveBeenCalledTimes(1);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("sin actionLabel no dibuja acción", async () => {
    setup();
    await userEvent.click(screen.getByRole("button", { name: "Abrir" }));
    expect(screen.queryByRole("button", { name: "Entendido" })).not.toBeInTheDocument();
  });

  it("controlado: respeta `open` y avisa con onOpenChange", async () => {
    const onOpenChange = vi.fn();
    setup({ open: false, onOpenChange });
    await userEvent.click(screen.getByRole("button", { name: "Abrir" }));
    expect(onOpenChange).toHaveBeenCalledWith(true);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("defaultOpen lo abre al empezar", () => {
    setup({ defaultOpen: true });
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  it("defaultOpen no roba el foco al cargar", () => {
    setup({ defaultOpen: true });
    expect(screen.getByRole("dialog")).not.toHaveFocus();
  });

  it("la posición cambia el lado donde se dibuja", async () => {
    setup({ placement: "top-end" });
    await userEvent.click(screen.getByRole("button", { name: "Abrir" }));
    const style = screen.getByRole("dialog").style;
    expect(style.bottom).not.toBe("");
    expect(style.right).toBe("0px");
  });

  it("no tiene violaciones de accesibilidad (abierto)", async () => {
    const { container } = setup({ actionLabel: "Entendido", defaultOpen: true });
    await expectNoA11yViolations(container);
  });
});
