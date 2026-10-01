import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ProductCard } from "./ProductCard";
import { expectNoA11yViolations } from "../../test/axe";

describe("ProductCard", () => {
  it("muestra título, subtítulo e importe", () => {
    render(<ProductCard product="credit" title="Visa" subtitle="•••• 4821" amount="1.250 €" />);
    expect(screen.getByText("Visa")).toBeInTheDocument();
    expect(screen.getByText("•••• 4821")).toBeInTheDocument();
    expect(screen.getByText("1.250 €")).toBeInTheDocument();
  });

  it("subtítulo e importe son opcionales", () => {
    render(<ProductCard product="credit" title="Visa" />);
    expect(screen.getAllByText(/./)).toHaveLength(2); // eyebrow + título
  });

  it.each([
    ["credit", "Tarjeta de crédito"],
    ["bnpl", "Compra ahora, paga después"],
  ] as const)("producto %s → etiqueta «%s» en estado activo", (product, label) => {
    render(<ProductCard product={product} title="T" />);
    expect(screen.getByText(label)).toBeInTheDocument();
  });

  it.each([
    ["frozen", "Congelada"],
    ["blocked", "Bloqueada"],
  ] as const)("estado %s se añade a la etiqueta del producto", (state, label) => {
    render(<ProductCard product="credit" state={state} title="T" />);
    expect(screen.getByText(`Tarjeta de crédito · ${label}`)).toBeInTheDocument();
  });

  it("producto y estado son ejes independientes (6 combinaciones distintas)", () => {
    const html = new Set<string>();
    for (const product of ["credit", "bnpl"] as const) {
      for (const state of ["active", "frozen", "blocked"] as const) {
        const { container, unmount } = render(<ProductCard product={product} state={state} title="T" />);
        html.add(container.innerHTML);
        unmount();
      }
    }
    expect(html.size).toBe(6);
  });

  it("no tiene violaciones de accesibilidad", async () => {
    const { container } = render(<ProductCard product="bnpl" state="frozen" title="T" subtitle="s" amount="1 €" />);
    await expectNoA11yViolations(container);
  });
});
