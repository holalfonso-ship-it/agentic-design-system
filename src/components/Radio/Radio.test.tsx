import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Radio } from "./Radio";
import { expectNoA11yViolations } from "../../test/axe";

function Grupo({ onChange }: { onChange?: () => void }) {
  return (
    <fieldset>
      <legend>Pago</legend>
      <Radio name="pago" value="a" label="Tarjeta" defaultChecked onChange={onChange} />
      <Radio name="pago" value="b" label="Bizum" onChange={onChange} />
    </fieldset>
  );
}

describe("Radio", () => {
  it("es un radio con el label como nombre accesible", () => {
    render(<Radio label="Tarjeta" name="x" />);
    expect(screen.getByRole("radio", { name: "Tarjeta" })).not.toBeChecked();
  });

  it("elegir una opción desmarca la otra del grupo", async () => {
    render(<Grupo />);
    await userEvent.click(screen.getByText("Bizum"));
    expect(screen.getByRole("radio", { name: "Bizum" })).toBeChecked();
    expect(screen.getByRole("radio", { name: "Tarjeta" })).not.toBeChecked();
  });

  it("el punto visual sigue al estado del grupo sin control", async () => {
    const { container } = render(<Grupo />);
    const dots = () => container.querySelectorAll('span[aria-hidden="true"][style*="border-radius"]:not([style*="border:"])').length;
    const before = dots();
    await userEvent.click(screen.getByText("Bizum"));
    expect(dots()).toBe(before);
  });

  it("se mueve con las flechas del teclado", async () => {
    render(<Grupo />);
    screen.getByRole("radio", { name: "Tarjeta" }).focus();
    await userEvent.keyboard("{ArrowDown}");
    expect(screen.getByRole("radio", { name: "Bizum" })).toBeChecked();
  });

  it("llama a onChange al elegir", async () => {
    const onChange = vi.fn();
    render(<Grupo onChange={onChange} />);
    await userEvent.click(screen.getByText("Bizum"));
    expect(onChange).toHaveBeenCalled();
  });

  it("disabled: no se puede elegir", async () => {
    render(<Radio label="Efectivo" name="x" disabled />);
    await userEvent.click(screen.getByText("Efectivo"));
    expect(screen.getByRole("radio")).toBeDisabled();
    expect(screen.getByRole("radio")).not.toBeChecked();
  });

  it("no tiene violaciones de accesibilidad", async () => {
    const { container } = render(<Grupo />);
    await expectNoA11yViolations(container);
  });
});
