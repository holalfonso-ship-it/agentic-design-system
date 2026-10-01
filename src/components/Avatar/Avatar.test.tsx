import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Avatar } from "./Avatar";
import { expectNoA11yViolations } from "../../test/axe";

describe("Avatar", () => {
  it("muestra las iniciales", () => {
    render(<Avatar initials="AZ" />);
    expect(screen.getByText("AZ")).toBeInTheDocument();
  });

  it("sm < md < lg en diámetro", () => {
    const width = (size: "sm" | "md" | "lg") => {
      const { container, unmount } = render(<Avatar initials="AZ" size={size} />);
      const value = parseInt((container.firstElementChild as HTMLElement).style.width, 10);
      unmount();
      return value;
    };
    expect(width("sm")).toBeLessThan(width("md"));
    expect(width("md")).toBeLessThan(width("lg"));
  });

  it("es circular", () => {
    const { container } = render(<Avatar initials="AZ" />);
    expect((container.firstElementChild as HTMLElement).style.borderRadius).toBe("50%");
  });

  it("no tiene violaciones de accesibilidad", async () => {
    const { container } = render(<Avatar initials="AZ" />);
    await expectNoA11yViolations(container);
  });
});
