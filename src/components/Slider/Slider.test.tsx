import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Slider } from "./Slider";
import { expectNoA11yViolations } from "../../test/axe";

describe("Slider", () => {
  it("es un slider con el label como nombre accesible y su rango", () => {
    render(<Slider label="Volumen" min={10} max={50} defaultValue={20} />);
    const s = screen.getByRole("slider", { name: "Volumen" });
    expect(s).toHaveAttribute("min", "10");
    expect(s).toHaveAttribute("max", "50");
    expect(s).toHaveValue("20");
  });

  it("muestra el valor y lo actualiza al cambiar", () => {
    const onChange = vi.fn();
    render(<Slider label="Volumen" defaultValue={40} onChange={onChange} />);
    expect(screen.getByText("40")).toBeInTheDocument();
    fireEvent.change(screen.getByRole("slider"), { target: { value: "70" } });
    expect(screen.getByText("70")).toBeInTheDocument();
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it("formatValue da el texto visible y aria-valuetext", () => {
    render(<Slider label="Brillo" defaultValue={70} formatValue={(v) => `${v} %`} />);
    expect(screen.getByText("70 %")).toBeInTheDocument();
    expect(screen.getByRole("slider")).toHaveAttribute("aria-valuetext", "70 %");
  });

  it("showValue={false} oculta el valor", () => {
    render(<Slider label="Brillo" defaultValue={70} showValue={false} />);
    expect(screen.queryByText("70")).not.toBeInTheDocument();
  });

  it("modo controlado: respeta `value`", () => {
    const { rerender } = render(<Slider label="Volumen" value={30} onChange={() => {}} />);
    expect(screen.getByRole("slider")).toHaveValue("30");
    rerender(<Slider label="Volumen" value={80} onChange={() => {}} />);
    expect(screen.getByText("80")).toBeInTheDocument();
  });

  it("helperText se asocia con aria-describedby", () => {
    render(<Slider label="Volumen" helperText="Ajusta el nivel" />);
    expect(screen.getByRole("slider")).toHaveAccessibleDescription("Ajusta el nivel");
  });

  it("disabled deshabilita el control", () => {
    render(<Slider label="Volumen" disabled />);
    expect(screen.getByRole("slider")).toBeDisabled();
  });

  it("área táctil de 44px de alto como mínimo", () => {
    render(<Slider label="Volumen" />);
    const area = screen.getByRole("slider").parentElement as HTMLElement;
    expect(parseInt(area.style.height, 10)).toBeGreaterThanOrEqual(44);
  });

  it("no tiene violaciones de accesibilidad", async () => {
    const { container } = render(
      <div>
        <Slider label="Uno" helperText="Ayuda" />
        <Slider label="Dos" defaultValue={20} disabled formatValue={(v) => `${v} %`} />
      </div>,
    );
    await expectNoA11yViolations(container);
  });
});
