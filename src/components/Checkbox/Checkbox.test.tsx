import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Checkbox } from "./Checkbox";
import { expectNoA11yViolations } from "../../test/axe";

describe("Checkbox", () => {
  it("es un checkbox con el label como nombre accesible", () => {
    render(<Checkbox label="Acepto" />);
    expect(screen.getByRole("checkbox", { name: "Acepto" })).not.toBeChecked();
  });

  it("clic en la casilla o en el texto lo marca y llama a onChange", async () => {
    const onChange = vi.fn();
    render(<Checkbox label="Acepto" onChange={onChange} />);
    await userEvent.click(screen.getByText("Acepto"));
    expect(screen.getByRole("checkbox")).toBeChecked();
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it("funciona con teclado (Espacio)", async () => {
    render(<Checkbox label="Acepto" />);
    screen.getByRole("checkbox").focus();
    await userEvent.keyboard(" ");
    expect(screen.getByRole("checkbox")).toBeChecked();
  });

  it("modo controlado: respeta `checked`", () => {
    const { rerender } = render(<Checkbox label="Acepto" checked onChange={() => {}} />);
    expect(screen.getByRole("checkbox")).toBeChecked();
    rerender(<Checkbox label="Acepto" checked={false} onChange={() => {}} />);
    expect(screen.getByRole("checkbox")).not.toBeChecked();
  });

  it("indeterminate se aplica a la propiedad DOM del input", () => {
    render(<Checkbox label="Todo" indeterminate />);
    expect((screen.getByRole("checkbox") as HTMLInputElement).indeterminate).toBe(true);
  });

  it("disabled: no cambia ni llama a onChange", async () => {
    const onChange = vi.fn();
    render(<Checkbox label="Acepto" disabled onChange={onChange} />);
    await userEvent.click(screen.getByText("Acepto"));
    expect(onChange).not.toHaveBeenCalled();
    expect(screen.getByRole("checkbox")).toBeDisabled();
  });

  it("error marca aria-invalid", () => {
    render(<Checkbox label="Acepto" error />);
    expect(screen.getByRole("checkbox")).toHaveAttribute("aria-invalid", "true");
  });

  it("área táctil de 44px de alto como mínimo", () => {
    const { container } = render(<Checkbox label="Acepto" />);
    expect(parseInt((container.firstChild as HTMLElement).style.minHeight, 10)).toBeGreaterThanOrEqual(44);
  });

  it("no tiene violaciones de accesibilidad", async () => {
    const { container } = render(
      <div>
        <Checkbox label="Uno" />
        <Checkbox label="Dos" defaultChecked error />
        <Checkbox label="Tres" indeterminate disabled />
      </div>,
    );
    await expectNoA11yViolations(container);
  });
});
