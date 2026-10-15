import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Alert } from "./Alert";
import { expectNoA11yViolations } from "../../test/axe";

describe("Alert", () => {
  it("dibuja el título y el mensaje", () => {
    render(<Alert title="Pago completado">Hemos enviado el recibo.</Alert>);
    expect(screen.getByText("Pago completado")).toBeInTheDocument();
    expect(screen.getByText("Hemos enviado el recibo.")).toBeInTheDocument();
  });

  it("el título es opcional", () => {
    render(<Alert>Solo mensaje</Alert>);
    expect(screen.getByText("Solo mensaje")).toBeInTheDocument();
    expect(screen.queryByRole("heading")).not.toBeInTheDocument();
  });

  it("info y success son role=status", () => {
    const { rerender } = render(<Alert type="info">x</Alert>);
    expect(screen.getByRole("status")).toBeInTheDocument();
    rerender(<Alert type="success">x</Alert>);
    expect(screen.getByRole("status")).toBeInTheDocument();
  });

  it("warning y error son role=alert", () => {
    const { rerender } = render(<Alert type="warning">x</Alert>);
    expect(screen.getByRole("alert")).toBeInTheDocument();
    rerender(<Alert type="error">x</Alert>);
    expect(screen.getByRole("alert")).toBeInTheDocument();
  });

  it("por defecto es info", () => {
    render(<Alert>x</Alert>);
    expect(screen.getByRole("status")).toBeInTheDocument();
  });

  it("sin actionLabel no hay botón", () => {
    render(<Alert>x</Alert>);
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });

  it("la acción es un botón que llama a onAction", () => {
    const onAction = vi.fn();
    render(<Alert actionLabel="Ver detalle" onAction={onAction}>x</Alert>);
    fireEvent.click(screen.getByRole("button", { name: "Ver detalle" }));
    expect(onAction).toHaveBeenCalledTimes(1);
  });

  it("el botón de acción tiene un área táctil de 44px como mínimo", () => {
    render(<Alert actionLabel="Ver detalle">x</Alert>);
    expect(parseInt(screen.getByRole("button").style.minHeight, 10)).toBeGreaterThanOrEqual(44);
  });

  it("el icono es decorativo (aria-hidden)", () => {
    const { container } = render(<Alert type="error">x</Alert>);
    expect(container.querySelector("svg")).toHaveAttribute("aria-hidden", "true");
  });

  it("acepta id y aria-* nativos en el contenedor", () => {
    render(<Alert id="aviso" aria-live="off">x</Alert>);
    expect(screen.getByRole("status")).toHaveAttribute("id", "aviso");
  });

  it("no tiene violaciones de accesibilidad", async () => {
    const { container } = render(
      <div>
        <Alert type="info" title="Información">Mensaje</Alert>
        <Alert type="success">Mensaje</Alert>
        <Alert type="warning" title="Aviso" actionLabel="Ver">Mensaje</Alert>
        <Alert type="error" title="Error" actionLabel="Reintentar">Mensaje</Alert>
      </div>,
    );
    await expectNoA11yViolations(container);
  });
});
