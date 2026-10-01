import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Icon, iconNames } from "./Icon";
import { expectNoA11yViolations } from "../../test/axe";
import { meta } from "./Icon.metadata";

describe("Icon", () => {
  it("dibuja un SVG de 20×20 por defecto (tamaño de Figma), 24×24 de viewBox, sin relleno y con trazo de 2 px", () => {
    const { container } = render(<Icon name="house" />);
    const svg = container.querySelector("svg")!;
    expect(svg).toHaveAttribute("width", "20");
    expect(svg).toHaveAttribute("height", "20");
    expect(svg).toHaveAttribute("viewBox", "0 0 24 24");
    expect(svg).toHaveAttribute("fill", "none");
    expect(svg).toHaveAttribute("stroke-width", "2");
  });

  it("acepta size y color; el color por defecto hereda del texto", () => {
    const { container, rerender } = render(<Icon name="house" />);
    expect(container.querySelector("svg")).toHaveAttribute("stroke", "currentColor");
    rerender(<Icon name="house" size={32} color="#361C5C" />);
    const svg = container.querySelector("svg")!;
    expect(svg).toHaveAttribute("width", "32");
    expect(svg).toHaveAttribute("stroke", "#361C5C");
  });

  it("sin title es decorativo: aria-hidden y fuera del árbol de accesibilidad", () => {
    const { container } = render(<Icon name="lock" />);
    expect(container.querySelector("svg")).toHaveAttribute("aria-hidden", "true");
    expect(screen.queryByRole("img")).not.toBeInTheDocument();
  });

  it("con title es una imagen con nombre accesible", () => {
    render(<Icon name="lock" title="Tarjeta bloqueada" />);
    expect(screen.getByRole("img", { name: "Tarjeta bloqueada" })).toBeInTheDocument();
  });

  it("pasa el resto de atributos al SVG (p. ej. data-testid)", () => {
    render(<Icon name="x" data-testid="cerrar" />);
    expect(screen.getByTestId("cerrar")).toBeInTheDocument();
  });

  it.each(iconNames)("el icono «%s» dibuja al menos un nodo", (name) => {
    const { container } = render(<Icon name={name} />);
    expect(container.querySelector("svg")!.children.length).toBeGreaterThan(0);
  });

  it("los nombres del catálogo coinciden con los documentados en la metadata", () => {
    expect([...iconNames].sort()).toEqual([...meta.props.name].sort());
  });

  it("no tiene violaciones de accesibilidad (decorativo y con title)", async () => {
    const { container } = render(
      <div>
        <Icon name="house" />
        <Icon name="wallet" title="Cartera" />
      </div>,
    );
    await expectNoA11yViolations(container);
  });
});
