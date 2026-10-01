import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { TransactionListItem } from "./TransactionListItem";
import { expectNoA11yViolations } from "../../test/axe";

describe("TransactionListItem", () => {
  it("muestra comercio e importe", () => {
    render(<TransactionListItem merchant="Mercadona" amount="42,10 €" />);
    expect(screen.getByText("Mercadona")).toBeInTheDocument();
    expect(screen.getByText(/42,10 €/)).toBeInTheDocument();
  });

  it("dirección out (por defecto) → signo menos tipográfico", () => {
    render(<TransactionListItem merchant="M" amount="5 €" />);
    expect(screen.getByText("−5 €")).toBeInTheDocument();
  });

  it("dirección in → signo más", () => {
    render(<TransactionListItem merchant="Nómina" amount="1.800 €" direction="in" />);
    expect(screen.getByText("+1.800 €")).toBeInTheDocument();
  });

  it("une categoría y fecha con « · »", () => {
    render(<TransactionListItem merchant="M" amount="1 €" category="Comida" timestamp="Hoy" />);
    expect(screen.getByText("Comida · Hoy")).toBeInTheDocument();
  });

  it.each([
    [{ category: "Comida" }, "Comida"],
    [{ timestamp: "Hoy" }, "Hoy"],
  ])("categoría o fecha solas (%o)", (props, text) => {
    render(<TransactionListItem merchant="M" amount="1 €" {...props} />);
    expect(screen.getByText(text)).toBeInTheDocument();
  });

  it("sin categoría ni fecha no renderiza línea secundaria", () => {
    const { container } = render(<TransactionListItem merchant="M" amount="1 €" />);
    expect(container.querySelectorAll("p")).toHaveLength(1);
  });

  it("renderiza el icono si se pasa", () => {
    render(<TransactionListItem merchant="M" amount="1 €" icon={<svg data-testid="icon" aria-hidden="true" />} />);
    expect(screen.getByTestId("icon")).toBeInTheDocument();
  });

  it("no tiene violaciones de accesibilidad", async () => {
    const { container } = render(<TransactionListItem merchant="M" amount="1 €" category="c" timestamp="t" direction="in" />);
    await expectNoA11yViolations(container);
  });

  // Figma (76:91): merchant e importe usan Type/Body/LG (16, Regular); la fecha, Type/Caption (11).
  it("tipografía de Figma: merchant e importe 16 / 400, meta 11", () => {
    render(<TransactionListItem merchant="Mercadona" amount="5 €" category="Comida" />);
    for (const el of [screen.getByText("Mercadona"), screen.getByText("−5 €")]) {
      expect(el).toHaveStyle({ fontSize: "16px", fontWeight: "400" });
    }
    expect(screen.getByText("Comida")).toHaveStyle({ fontSize: "11px" });
  });
});
