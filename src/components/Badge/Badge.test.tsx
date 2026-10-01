import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Badge } from "./Badge";
import { expectNoA11yViolations } from "../../test/axe";

describe("Badge", () => {
  it.each(["success", "error", "warning", "neutral"] as const)("renderiza la variante %s con su texto", (variant) => {
    render(<Badge variant={variant}>Estado</Badge>);
    expect(screen.getByText("Estado")).toBeInTheDocument();
  });

  it("usa neutral por defecto", () => {
    const { container: a } = render(<Badge>X</Badge>);
    const { container: b } = render(<Badge variant="neutral">X</Badge>);
    expect(a.innerHTML).toBe(b.innerHTML);
  });

  it("las variantes se distinguen visualmente entre sí", () => {
    const html = (["success", "error", "warning", "neutral"] as const).map((variant) => {
      const { container } = render(<Badge variant={variant}>X</Badge>);
      return container.innerHTML;
    });
    expect(new Set(html).size).toBe(4);
  });

  it("no tiene violaciones de accesibilidad", async () => {
    const { container } = render(<Badge variant="success">Pagado</Badge>);
    await expectNoA11yViolations(container);
  });
});
