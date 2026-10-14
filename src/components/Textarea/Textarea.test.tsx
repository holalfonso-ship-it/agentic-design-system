import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Textarea } from "./Textarea";
import { expectNoA11yViolations } from "../../test/axe";

describe("Textarea", () => {
  it("el nombre accesible es solo el label", () => {
    render(<Textarea label="Mensaje" helperText="Ayuda" />);
    expect(screen.getByRole("textbox", { name: "Mensaje" })).toBeInTheDocument();
  });

  it("escribir llama a onChange y actualiza el valor", async () => {
    const onChange = vi.fn();
    render(<Textarea label="Mensaje" onChange={onChange} />);
    await userEvent.type(screen.getByRole("textbox"), "hola");
    expect(screen.getByRole("textbox")).toHaveValue("hola");
    expect(onChange).toHaveBeenCalledTimes(4);
  });

  it("helperText se asocia con aria-describedby", () => {
    render(<Textarea label="Mensaje" helperText="Máximo 280 caracteres" />);
    expect(screen.getByRole("textbox")).toHaveAccessibleDescription("Máximo 280 caracteres");
  });

  it("error: aria-invalid y errorText sustituye a helperText", () => {
    render(<Textarea label="Mensaje" helperText="Ayuda" error errorText="Demasiado corto" />);
    expect(screen.getByRole("textbox")).toHaveAttribute("aria-invalid", "true");
    expect(screen.getByText("Demasiado corto")).toBeInTheDocument();
    expect(screen.queryByText("Ayuda")).not.toBeInTheDocument();
  });

  it("rows por defecto 3 y se puede cambiar", () => {
    const { rerender } = render(<Textarea label="Mensaje" />);
    expect(screen.getByRole("textbox")).toHaveAttribute("rows", "3");
    rerender(<Textarea label="Mensaje" rows={6} />);
    expect(screen.getByRole("textbox")).toHaveAttribute("rows", "6");
  });

  it("disabled deshabilita el campo y no admite texto", async () => {
    render(<Textarea label="Mensaje" disabled />);
    const t = screen.getByRole("textbox");
    expect(t).toBeDisabled();
    await userEvent.type(t, "hola");
    expect(t).toHaveValue("");
  });

  it("no tiene violaciones de accesibilidad", async () => {
    const { container } = render(
      <div>
        <Textarea label="Uno" helperText="Ayuda" />
        <Textarea label="Dos" error errorText="Obligatorio" />
      </div>,
    );
    await expectNoA11yViolations(container);
  });
});
