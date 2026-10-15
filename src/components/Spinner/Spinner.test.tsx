import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Spinner } from "./Spinner";
import { expectNoA11yViolations } from "../../test/axe";

describe("Spinner", () => {
  it("es un role=status con el texto «Cargando» por defecto", () => {
    render(<Spinner />);
    expect(screen.getByRole("status")).toHaveTextContent("Cargando");
  });

  it("acepta una etiqueta propia", () => {
    render(<Spinner label="Enviando pago" />);
    expect(screen.getByRole("status")).toHaveTextContent("Enviando pago");
  });

  it("los tamaños sm, md y lg miden 16, 24 y 32 px", () => {
    const { container, rerender } = render(<Spinner size="sm" />);
    expect(container.querySelector("svg")).toHaveAttribute("width", "16");
    rerender(<Spinner />);
    expect(container.querySelector("svg")).toHaveAttribute("width", "24");
    rerender(<Spinner size="lg" />);
    expect(container.querySelector("svg")).toHaveAttribute("width", "32");
  });

  it("el SVG es decorativo (aria-hidden)", () => {
    const { container } = render(<Spinner />);
    expect(container.querySelector("svg")).toHaveAttribute("aria-hidden", "true");
  });

  it("acepta id y data-* nativos", () => {
    render(<Spinner id="s1" data-x="1" />);
    expect(screen.getByRole("status")).toHaveAttribute("id", "s1");
    expect(screen.getByRole("status")).toHaveAttribute("data-x", "1");
  });

  it("no tiene violaciones de accesibilidad", async () => {
    const { container } = render(<Spinner />);
    await expectNoA11yViolations(container);
  });
});
