import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Select } from "./Select";
import { expectNoA11yViolations } from "../../test/axe";

const options = [
  { value: "es", label: "España" },
  { value: "fr", label: "Francia" },
];

describe("Select", () => {
  it("el nombre accesible es solo el label", () => {
    render(<Select label="País" options={options} helperText="Ayuda" />);
    expect(screen.getByRole("combobox", { name: "País" })).toBeInTheDocument();
  });

  it("el placeholder es la opción inicial y está deshabilitado", () => {
    render(<Select label="País" placeholder="Selecciona un país" options={options} />);
    expect(screen.getByRole("combobox")).toHaveValue("");
    expect(screen.getByRole("option", { name: "Selecciona un país" })).toBeDisabled();
  });

  it("elegir una opción llama a onChange con el valor", async () => {
    const onChange = vi.fn();
    render(<Select label="País" placeholder="Elige" options={options} onChange={onChange} />);
    await userEvent.selectOptions(screen.getByRole("combobox"), "fr");
    expect(screen.getByRole("combobox")).toHaveValue("fr");
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it("helperText se asocia con aria-describedby", () => {
    render(<Select label="País" options={options} helperText="Ayuda" />);
    const select = screen.getByRole("combobox");
    expect(select).toHaveAccessibleDescription("Ayuda");
  });

  it("error: aria-invalid y errorText sustituye a helperText", () => {
    render(<Select label="País" options={options} helperText="Ayuda" error errorText="Elige un país" />);
    expect(screen.getByRole("combobox")).toHaveAttribute("aria-invalid", "true");
    expect(screen.getByText("Elige un país")).toBeInTheDocument();
    expect(screen.queryByText("Ayuda")).not.toBeInTheDocument();
  });

  it("disabled deshabilita el <select>", () => {
    render(<Select label="País" options={options} disabled />);
    expect(screen.getByRole("combobox")).toBeDisabled();
  });

  it("altura de 44px como mínimo", () => {
    render(<Select label="País" options={options} />);
    const field = screen.getByRole("combobox").parentElement as HTMLElement;
    expect(parseInt(field.style.height, 10)).toBeGreaterThanOrEqual(44);
  });

  it("no tiene violaciones de accesibilidad", async () => {
    const { container } = render(
      <div>
        <Select label="País" placeholder="Elige" options={options} helperText="Ayuda" />
        <Select label="Otro" options={options} error errorText="Obligatorio" />
      </div>,
    );
    await expectNoA11yViolations(container);
  });
});
