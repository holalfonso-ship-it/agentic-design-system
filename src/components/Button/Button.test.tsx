import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Button } from "./Button";
import { expectNoA11yViolations } from "../../test/axe";

describe("Button", () => {
  it.each(["primary", "secondary", "tertiary"] as const)("renderiza la variante %s", (variant) => {
    render(<Button variant={variant}>Continuar</Button>);
    expect(screen.getByRole("button", { name: "Continuar" })).toBeInTheDocument();
  });

  it.each(["sm", "md", "lg"] as const)("acepta el tamaño %s", (size) => {
    render(<Button size={size}>Ok</Button>);
    expect(screen.getByRole("button", { name: "Ok" })).toBeInTheDocument();
  });

  it('usa type="button" por defecto (no envía formularios)', () => {
    render(<Button>Ok</Button>);
    expect(screen.getByRole("button")).toHaveAttribute("type", "button");
  });

  it("dispara onClick", async () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Ok</Button>);
    await userEvent.click(screen.getByRole("button"));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("disabled: no dispara onClick y queda deshabilitado", async () => {
    const onClick = vi.fn();
    render(<Button disabled onClick={onClick}>Ok</Button>);
    const button = screen.getByRole("button");
    expect(button).toBeDisabled();
    await userEvent.click(button);
    expect(onClick).not.toHaveBeenCalled();
  });

  it("se activa con teclado (Enter y Espacio)", async () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Ok</Button>);
    screen.getByRole("button").focus();
    await userEvent.keyboard("{Enter}");
    await userEvent.keyboard(" ");
    expect(onClick).toHaveBeenCalledTimes(2);
  });

  it("no tiene violaciones de accesibilidad", async () => {
    const { container } = render(<Button>Continuar</Button>);
    await expectNoA11yViolations(container);
  });

  // Valores de Figma (component set "Button"): altura fija y padding horizontal por tamaño.
  it.each([
    ["sm", "44px", "16px"],
    ["md", "48px", "24px"],
    ["lg", "56px", "24px"],
  ] as const)("tamaño %s: altura %s y padding horizontal %s, en las tres variantes", (size, height, padX) => {
    for (const variant of ["primary", "secondary", "tertiary"] as const) {
      const { unmount } = render(
        <Button size={size} variant={variant}>
          Ok
        </Button>,
      );
      const el = screen.getByRole("button");
      expect(el).toHaveStyle({ height, paddingLeft: padX, paddingRight: padX, paddingTop: "0px", fontWeight: "500" });
      unmount();
    }
  });
});
