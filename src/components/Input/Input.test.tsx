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
    expect(screen.getByLabelText("Correo")).toHaveAttribute("aria-invalid", "true");
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

  // Hallazgo 12 del Ciclo 2 (2026-10-01), corregido en el Compose: helperText y
  // errorText ya no viven dentro del <label>, así que no contaminan el nombre
  // accesible y se asocian al campo con aria-describedby.
  it("el nombre accesible es solo la etiqueta, también con helperText y con error", () => {
    render(
      <>
        <Input label="Correo" helperText="Usaremos este correo para avisarte" />
        <Input label="Teléfono" error errorText="No válido" />
      </>,
    );
    expect(screen.getByRole("textbox", { name: "Correo" })).toBeInTheDocument();
    expect(screen.getByRole("textbox", { name: "Teléfono" })).toBeInTheDocument();
  });

  it("asocia helperText y errorText al campo con aria-describedby", () => {
    render(
      <>
        <Input label="Correo" helperText="Usaremos este correo para avisarte" />
        <Input label="Teléfono" error errorText="No válido" />
      </>,
    );
    expect(screen.getByRole("textbox", { name: "Correo" })).toHaveAccessibleDescription("Usaremos este correo para avisarte");
    expect(screen.getByRole("textbox", { name: "Teléfono" })).toHaveAccessibleDescription("No válido");
  });

  it("sin texto de ayuda no hay aria-describedby", () => {
    render(<Input label="Correo" />);
    expect(screen.getByRole("textbox")).not.toHaveAttribute("aria-describedby");
  });

  it("conserva el aria-describedby del consumidor y le suma el del texto de ayuda", () => {
    render(
      <>
        <p id="extra">Nota extra</p>
        <Input label="Correo" helperText="ayuda" aria-describedby="extra" />
      </>,
    );
    expect(screen.getByRole("textbox")).toHaveAccessibleDescription("Nota extra ayuda");
  });

  it("hacer clic en la etiqueta enfoca el campo", async () => {
    render(<Input label="Correo" />);
    await userEvent.click(screen.getByText("Correo"));
    expect(screen.getByRole("textbox")).toHaveFocus();
  });

  it("respeta el id que pasa el consumidor", () => {
    render(<Input label="Correo" id="mi-correo" helperText="ayuda" />);
    expect(screen.getByRole("textbox")).toHaveAttribute("id", "mi-correo");
    expect(screen.getByLabelText("Correo")).toBe(document.getElementById("mi-correo"));
  });

  it("dos Input a la vez no comparten ids", () => {
    render(
      <>
        <Input label="A" helperText="a" />
        <Input label="B" helperText="b" />
      </>,
    );
    const [a, b] = screen.getAllByRole("textbox");
    expect(a.id).not.toBe(b.id);
  });

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

  // Figma: la etiqueta es Medium en default/focused y Semi Bold en error/disabled.
  it("peso de la etiqueta según estado (Medium 500 / Semi Bold 600)", () => {
    const weight = (props: Record<string, unknown>) => {
      const { unmount } = render(<Input label="Correo" {...props} />);
      const w = screen.getByText("Correo").style.fontWeight;
      unmount();
      return w;
    };
    expect(weight({})).toBe("500");
    expect(weight({ error: true, errorText: "x" })).toBe("600");
    expect(weight({ disabled: true })).toBe("600");
  });
});
