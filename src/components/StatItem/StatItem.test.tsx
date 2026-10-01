import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { StatItem } from "./StatItem";
import { expectNoA11yViolations } from "../../test/axe";

describe("StatItem", () => {
  it("renderiza icono, etiqueta e importe", () => {
    render(<StatItem icon={<svg data-testid="icon" aria-hidden="true" />} label="Ingresos" amount="2.400 €" />);
    expect(screen.getByTestId("icon")).toBeInTheDocument();
    expect(screen.getByText("Ingresos")).toBeInTheDocument();
    expect(screen.getByText("2.400 €")).toBeInTheDocument();
  });

  it("etiqueta e importe son opcionales", () => {
    render(<StatItem icon={<svg data-testid="icon" aria-hidden="true" />} />);
    expect(screen.getByTestId("icon")).toBeInTheDocument();
  });

  it("no tiene violaciones de accesibilidad", async () => {
    const { container } = render(<StatItem icon={<svg aria-hidden="true" />} label="Ingresos" amount="2.400 €" />);
    await expectNoA11yViolations(container);
  });
});
