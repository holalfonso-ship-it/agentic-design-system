import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { Skeleton } from "./Skeleton";
import { expectNoA11yViolations } from "../../test/axe";

const get = (c: HTMLElement) => c.querySelector("[aria-hidden='true']") as HTMLElement;

describe("Skeleton", () => {
  it("es decorativo (aria-hidden)", () => {
    const { container } = render(<Skeleton />);
    expect(get(container)).toBeInTheDocument();
  });

  it("text: 100% de ancho y 16 de alto", () => {
    const { container } = render(<Skeleton />);
    expect(get(container).style.width).toBe("100%");
    expect(get(container).style.height).toBe("16px");
  });

  it("circle: 40 x 40 y totalmente redondo", () => {
    const { container } = render(<Skeleton shape="circle" />);
    expect(get(container).style.width).toBe("40px");
    expect(get(container).style.height).toBe("40px");
    expect(get(container).style.borderRadius).toBe("999px");
  });

  it("rect: alto 96 por defecto", () => {
    const { container } = render(<Skeleton shape="rect" />);
    expect(get(container).style.height).toBe("96px");
  });

  it("width y height sobrescriben los valores por defecto", () => {
    const { container } = render(<Skeleton width="60%" height={24} />);
    expect(get(container).style.width).toBe("60%");
    expect(get(container).style.height).toBe("24px");
  });

  it("conserva className propio junto al de la animación", () => {
    const { container } = render(<Skeleton className="mi-clase" />);
    expect(get(container)).toHaveClass("aida-skeleton", "mi-clase");
  });

  it("no tiene violaciones de accesibilidad", async () => {
    const { container } = render(<Skeleton />);
    await expectNoA11yViolations(container);
  });
});
