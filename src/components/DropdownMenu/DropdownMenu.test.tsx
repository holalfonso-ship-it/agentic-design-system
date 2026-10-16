import { describe, it, expect, vi, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { DropdownMenu } from "./DropdownMenu";
import type { DropdownMenuProps } from "./DropdownMenu";
import { expectNoA11yViolations } from "../../test/axe";

afterEach(cleanup);

const items: DropdownMenuProps["items"] = [
  { label: "Ajustes", icon: "eye" },
  { label: "Congelar tarjeta", icon: "circle-help", selected: true },
  { type: "divider" },
  { label: "Bloquear tarjeta", tone: "destructive" },
  { label: "Descargar extracto", disabled: true },
];

const setup = (props: Partial<DropdownMenuProps> = {}) =>
  render(
    <div>
      <DropdownMenu
        items={items}
        trigger={(p) => (
          <button type="button" {...p}>
            Opciones
          </button>
        )}
        {...props}
      />
      <button type="button">Fuera</button>
    </div>,
  );

describe("DropdownMenu", () => {
  it("está cerrado al principio y el botón lo anuncia", () => {
    setup();
    expect(screen.queryByRole("menu")).not.toBeInTheDocument();
    const trigger = screen.getByRole("button", { name: "Opciones" });
    expect(trigger).toHaveAttribute("aria-haspopup", "menu");
    expect(trigger).toHaveAttribute("aria-expanded", "false");
  });

  it("se abre con el botón y pinta menuitems, un menuitemcheckbox y un separador", async () => {
    setup();
    await userEvent.click(screen.getByRole("button", { name: "Opciones" }));
    expect(screen.getByRole("menu", { name: "Menú" })).toBeInTheDocument();
    expect(screen.getAllByRole("menuitem")).toHaveLength(3);
    expect(screen.getByRole("menuitemcheckbox", { name: "Congelar tarjeta" })).toHaveAttribute("aria-checked", "true");
    expect(screen.getByRole("separator")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Opciones" })).toHaveAttribute("aria-expanded", "true");
  });

  it("al abrirse el foco va a la primera fila habilitada", async () => {
    setup();
    await userEvent.click(screen.getByRole("button", { name: "Opciones" }));
    expect(screen.getByRole("menuitem", { name: "Ajustes" })).toHaveFocus();
  });

  it("flecha abajo en el botón lo abre", async () => {
    setup();
    screen.getByRole("button", { name: "Opciones" }).focus();
    await userEvent.keyboard("{ArrowDown}");
    expect(screen.getByRole("menu")).toBeInTheDocument();
  });

  it("las flechas recorren las filas habilitadas en círculo y se saltan la deshabilitada", async () => {
    setup();
    await userEvent.click(screen.getByRole("button", { name: "Opciones" }));
    await userEvent.keyboard("{ArrowDown}");
    expect(screen.getByRole("menuitemcheckbox", { name: "Congelar tarjeta" })).toHaveFocus();
    await userEvent.keyboard("{ArrowDown}");
    expect(screen.getByRole("menuitem", { name: "Bloquear tarjeta" })).toHaveFocus();
    await userEvent.keyboard("{ArrowDown}");
    expect(screen.getByRole("menuitem", { name: "Ajustes" })).toHaveFocus();
    await userEvent.keyboard("{ArrowUp}");
    expect(screen.getByRole("menuitem", { name: "Bloquear tarjeta" })).toHaveFocus();
  });

  it("Inicio y Fin saltan a la primera y la última fila habilitada", async () => {
    setup();
    await userEvent.click(screen.getByRole("button", { name: "Opciones" }));
    await userEvent.keyboard("{End}");
    expect(screen.getByRole("menuitem", { name: "Bloquear tarjeta" })).toHaveFocus();
    await userEvent.keyboard("{Home}");
    expect(screen.getByRole("menuitem", { name: "Ajustes" })).toHaveFocus();
  });

  it("elegir una fila llama a onSelect, cierra y devuelve el foco al botón", async () => {
    const onSelect = vi.fn();
    setup({ items: [{ label: "Ajustes", onSelect }] });
    await userEvent.click(screen.getByRole("button", { name: "Opciones" }));
    await userEvent.keyboard("{Enter}");
    expect(onSelect).toHaveBeenCalledTimes(1);
    expect(screen.queryByRole("menu")).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Opciones" })).toHaveFocus();
  });

  it("la fila deshabilitada no se activa", async () => {
    const onSelect = vi.fn();
    setup({ items: [{ label: "Ajustes" }, { label: "Descargar", disabled: true, onSelect }] });
    await userEvent.click(screen.getByRole("button", { name: "Opciones" }));
    const row = screen.getByRole("menuitem", { name: "Descargar" });
    expect(row).toHaveAttribute("aria-disabled", "true");
    await userEvent.click(row);
    expect(onSelect).not.toHaveBeenCalled();
    expect(screen.getByRole("menu")).toBeInTheDocument();
  });

  it("Escape cierra y devuelve el foco al botón", async () => {
    setup();
    await userEvent.click(screen.getByRole("button", { name: "Opciones" }));
    await userEvent.keyboard("{Escape}");
    expect(screen.queryByRole("menu")).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Opciones" })).toHaveFocus();
  });

  it("pulsar fuera lo cierra", async () => {
    setup();
    await userEvent.click(screen.getByRole("button", { name: "Opciones" }));
    await userEvent.click(screen.getByRole("button", { name: "Fuera" }));
    expect(screen.queryByRole("menu")).not.toBeInTheDocument();
  });

  it("Tab cierra el menú", async () => {
    setup();
    await userEvent.click(screen.getByRole("button", { name: "Opciones" }));
    await userEvent.tab();
    expect(screen.queryByRole("menu")).not.toBeInTheDocument();
  });

  it("controlado: respeta `open` y avisa con onOpenChange", async () => {
    const onOpenChange = vi.fn();
    setup({ open: false, onOpenChange });
    await userEvent.click(screen.getByRole("button", { name: "Opciones" }));
    expect(onOpenChange).toHaveBeenCalledWith(true);
    expect(screen.queryByRole("menu")).not.toBeInTheDocument();
  });

  it("aria-label da nombre al menú", async () => {
    setup({ "aria-label": "Acciones de la tarjeta", defaultOpen: true });
    expect(screen.getByRole("menu", { name: "Acciones de la tarjeta" })).toBeInTheDocument();
  });

  it("no tiene violaciones de accesibilidad (abierto)", async () => {
    const { container } = setup({ defaultOpen: true });
    await expectNoA11yViolations(container);
  });
});
