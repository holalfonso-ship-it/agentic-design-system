import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { QuickActionTile } from "./QuickActionTile";
import { expectNoA11yViolations } from "../../test/axe";

describe("QuickActionTile", () => {
  it("renderiza icono, título y subtítulo", () => {
    render(<QuickActionTile icon={<svg data-testid="icon" aria-hidden="true" />} title="Enviar" subtitle="Dinero" />);
    expect(screen.getByTestId("icon")).toBeInTheDocument();
    expect(screen.getByText("Enviar")).toBeInTheDocument();
    expect(screen.getByText("Dinero")).toBeInTheDocument();
  });

  it("título y subtítulo son opcionales", () => {
    render(<QuickActionTile icon={<svg data-testid="icon" aria-hidden="true" />} />);
    expect(screen.getByTestId("icon")).toBeInTheDocument();
  });

  it("no tiene violaciones de accesibilidad", async () => {
    const { container } = render(<QuickActionTile icon={<svg aria-hidden="true" />} title="Enviar" subtitle="Dinero" />);
    await expectNoA11yViolations(container);
  });
});
