import { describe, it, expect, vi, afterEach } from "vitest";
import { render, screen, fireEvent, act, cleanup } from "@testing-library/react";
import { Tooltip } from "./Tooltip";
import { expectNoA11yViolations } from "../../test/axe";

afterEach(() => {
  cleanup();
  vi.useRealTimers();
});

describe("Tooltip", () => {
  it("está oculto al principio", () => {
    render(<Tooltip content="Ayuda"><button>Ok</button></Tooltip>);
    expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();
  });

  it("aparece al enfocar, al instante, y se oculta al desenfocar", () => {
    render(<Tooltip content="Ayuda"><button>Ok</button></Tooltip>);
    fireEvent.focus(screen.getByRole("button"));
    expect(screen.getByRole("tooltip")).toHaveTextContent("Ayuda");
    fireEvent.blur(screen.getByRole("button"));
    expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();
  });

  it("con el ratón espera el delay", () => {
    vi.useFakeTimers();
    render(<Tooltip content="Ayuda" delay={300}><button>Ok</button></Tooltip>);
    fireEvent.mouseEnter(screen.getByRole("button"));
    expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();
    act(() => { vi.advanceTimersByTime(300); });
    expect(screen.getByRole("tooltip")).toBeInTheDocument();
    fireEvent.mouseLeave(screen.getByRole("button"));
    expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();
  });

  it("salir antes del delay cancela la aparición", () => {
    vi.useFakeTimers();
    render(<Tooltip content="Ayuda" delay={300}><button>Ok</button></Tooltip>);
    fireEvent.mouseEnter(screen.getByRole("button"));
    fireEvent.mouseLeave(screen.getByRole("button"));
    act(() => { vi.advanceTimersByTime(500); });
    expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();
  });

  it("Escape lo cierra", () => {
    render(<Tooltip content="Ayuda"><button>Ok</button></Tooltip>);
    fireEvent.focus(screen.getByRole("button"));
    fireEvent.keyDown(screen.getByRole("button"), { key: "Escape" });
    expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();
  });

  it("el elemento queda descrito por el tooltip (aria-describedby) mientras está abierto", () => {
    render(<Tooltip content="Ayuda"><button>Ok</button></Tooltip>);
    const wrapper = screen.getByRole("button").parentElement as HTMLElement;
    expect(wrapper).not.toHaveAttribute("aria-describedby");
    fireEvent.focus(screen.getByRole("button"));
    expect(wrapper).toHaveAttribute("aria-describedby", screen.getByRole("tooltip").id);
  });

  it("la posición cambia el lado donde se dibuja", () => {
    const { rerender } = render(<Tooltip content="Ayuda" placement="top"><button>Ok</button></Tooltip>);
    fireEvent.focus(screen.getByRole("button"));
    expect((screen.getByRole("tooltip").parentElement as HTMLElement).style.bottom).toContain("100%");
    rerender(<Tooltip content="Ayuda" placement="right"><button>Ok</button></Tooltip>);
    expect((screen.getByRole("tooltip").parentElement as HTMLElement).style.left).toContain("100%");
  });

  it("no tiene violaciones de accesibilidad abierto", async () => {
    const { container } = render(<Tooltip content="Ayuda"><button>Ok</button></Tooltip>);
    fireEvent.focus(screen.getByRole("button"));
    await expectNoA11yViolations(container);
  });
});
