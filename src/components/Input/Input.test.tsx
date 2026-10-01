import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Input } from "./Input";
import { expectNoA11yViolations } from "../../test/axe";

describe("Input", () => {
  it("asocia la etiqueta con el campo", () => {
    render(<Input label="Correo" />);
    expect(screen.getByLabelText("Correo")).toBeInTheDocument();
  });

  it("muestra helperText en estado normal", () => {
    render(<Input label="Correo" helperText="Usaremos este correo para avisarte" />);
    expect(screen.getByText("Usaremos este correo para avisarte")).toBeInTheDocument();
  });

  it("error: aria-invalid=true y muestra errorText en lugar del helperText", () => {
    render(<Input label="Correo" error helperText="ayuda" errorText="Correo no válido" />);
    expect(screen.getByRole("textbox")).toHaveAttribute("aria-invalid", "true");
    expect(screen.getByText("Correo no válido")).toBeInTheDocument();
    expect(screen.queryByText("ayuda")).not.toBeInTheDocument();
  });

  it("error sin errorText: cae al helperText", () => {
    render(<Input label="Correo" error helperText="ayuda" />);
    expect(screen.getByText("ayuda")).toBeInTheDocument();
  });

  it("sin error: aria-invalid no es true", () => {
    render(<Input label="Correo" />);
    expect(screen.getByLabelText("Correo")).not.toHaveAttribute("aria-invalid", "true");
  });

  // Hallazgo detectado al escribir estos tests (2026-10-01): helperText/errorText
  // viven DENTRO del <label>, así que el nombre accesible del campo pasa a ser
  // «Correo Correo no válido» y no hay aria-describedby. Pendiente para el
  // próximo Audit (mover el texto de ayuda fuera del <label> + aria-describedby).
  it.todo("el nombre accesible es solo la etiqueta; helper/error se asocian con aria-describedby");

  it("acepta texto y llama a onChange", async () => {
    const onChange = vi.fn();
    render(<Input label="Nombre" onChange={onChange} />);
    await userEvent.type(screen.getByLabelText("Nombre"), "Zamo");
    expect(onChange).toHaveBeenCalledTimes(4);
    expect(screen.getByLabelText("Nombre")).toHaveValue("Zamo");
  });

  it("propaga onFocus y onBlur al consumidor", async () => {
    const onFocus = vi.fn();
    const onBlur = vi.fn();
    render(<Input label="Nombre" onFocus={onFocus} onBlur={onBlur} />);
    await userEvent.click(screen.getByLabelText("Nombre"));
    expect(onFocus).toHaveBeenCalledTimes(1);
    await userEvent.tab();
    expect(onBlur).toHaveBeenCalledTimes(1);
  });

  it("disabled: el campo no es editable", async () => {
    render(<Input label="Nombre" disabled />);
    const input = screen.getByLabelText("Nombre");
    expect(input).toBeDisabled();
    await userEvent.type(input, "x");
    expect(input).toHaveValue("");
  });

  it("no tiene violaciones de accesibilidad (normal y error)", async () => {
    const { container } = render(
      <>
        <Input label="Correo" helperText="ayuda" />
        <Input label="Teléfono" error errorText="No válido" />
      </>,
    );
    await expectNoA11yViolations(container);
  });
});
