import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Toggle } from "./Toggle";
import { expectNoA11yViolations } from "../../test/axe";

describe("Toggle", () => {
  it("expone role=switch y aria-checked según `checked`", () => {
    const { rerender } = render(<Toggle checked={false} aria-label="Notificaciones" />);
    expect(screen.getByRole("switch", { name: "Notificaciones" })).toHaveAttribute("aria-checked", "false");
    rerender(<Toggle checked aria-label="Notificaciones" />);
    expect(screen.getByRole("switch")).toHaveAttribute("aria-checked", "true");
  });

  it("al hacer clic llama a onChange con el valor invertido", async () => {
    const onChange = vi.fn();
    const { rerender } = render(<Toggle checked={false} onChange={onChange} aria-label="x" />);
    await userEvent.click(screen.getByRole("switch"));
    expect(onChange).toHaveBeenLastCalledWith(true);
    rerender(<Toggle checked onChange={onChange} aria-label="x" />);
    await userEvent.click(screen.getByRole("switch"));
    expect(onChange).toHaveBeenLastCalledWith(false);
  });

  it("funciona con teclado (Espacio y Enter)", async () => {
    const onChange = vi.fn();
    render(<Toggle checked={false} onChange={onChange} aria-label="x" />);
    screen.getByRole("switch").focus();
    await userEvent.keyboard(" ");
    await userEvent.keyboard("{Enter}");
    expect(onChange).toHaveBeenCalledTimes(2);
  });

  it.each([true, false])("disabled (checked=%s): no llama a onChange", async (checked) => {
    const onChange = vi.fn();
    render(<Toggle checked={checked} disabled onChange={onChange} aria-label="x" />);
    const toggle = screen.getByRole("switch");
    expect(toggle).toBeDisabled();
    await userEvent.click(toggle);
    expect(onChange).not.toHaveBeenCalled();
  });

  it("área táctil de 44px de alto como mínimo (hallazgo 8 del Audit)", () => {
    render(<Toggle checked aria-label="x" />);
    expect(parseInt(screen.getByRole("switch").style.height, 10)).toBeGreaterThanOrEqual(44);
  });

  it("no tiene violaciones de accesibilidad con aria-label", async () => {
    const { container } = render(<Toggle checked aria-label="Biometría" />);
    await expectNoA11yViolations(container);
  });
});
