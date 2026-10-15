import { describe, it, expect, vi, afterEach } from "vitest";
import { render, screen, fireEvent, act, cleanup } from "@testing-library/react";
import { Toast, ToastProvider, useToast } from "./Toast";
import { expectNoA11yViolations } from "../../test/axe";

afterEach(() => {
  cleanup();
  vi.useRealTimers();
});

describe("Toast", () => {
  it("dibuja el título y el mensaje", () => {
    render(<Toast title="Pago completado">Hemos enviado el recibo.</Toast>);
    expect(screen.getByText("Pago completado")).toBeInTheDocument();
    expect(screen.getByText("Hemos enviado el recibo.")).toBeInTheDocument();
  });

  it("info y success son role=status; warning y error, role=alert", () => {
    const { rerender } = render(<Toast type="info">x</Toast>);
    expect(screen.getByRole("status")).toBeInTheDocument();
    rerender(<Toast type="success">x</Toast>);
    expect(screen.getByRole("status")).toBeInTheDocument();
    rerender(<Toast type="warning">x</Toast>);
    expect(screen.getByRole("alert")).toBeInTheDocument();
    rerender(<Toast type="error">x</Toast>);
    expect(screen.getByRole("alert")).toBeInTheDocument();
  });

  it("sin onClose no hay botón de cierre", () => {
    render(<Toast>x</Toast>);
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });

  it("el cierre es un botón con nombre accesible que llama a onClose", () => {
    const onClose = vi.fn();
    render(<Toast onClose={onClose}>x</Toast>);
    fireEvent.click(screen.getByRole("button", { name: "Cerrar aviso" }));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("closeLabel cambia el nombre del cierre", () => {
    render(<Toast onClose={() => {}} closeLabel="Descartar">x</Toast>);
    expect(screen.getByRole("button", { name: "Descartar" })).toBeInTheDocument();
  });

  it("la acción es un botón que llama a onAction", () => {
    const onAction = vi.fn();
    render(<Toast actionLabel="Deshacer" onAction={onAction}>x</Toast>);
    fireEvent.click(screen.getByRole("button", { name: "Deshacer" }));
    expect(onAction).toHaveBeenCalledTimes(1);
  });

  it("el cierre y la acción tienen un área táctil de 44px como mínimo", () => {
    render(<Toast actionLabel="Deshacer" onClose={() => {}}>x</Toast>);
    expect(parseInt(screen.getByRole("button", { name: "Cerrar aviso" }).style.height, 10)).toBeGreaterThanOrEqual(44);
    expect(parseInt(screen.getByRole("button", { name: "Deshacer" }).style.minHeight, 10)).toBeGreaterThanOrEqual(44);
  });

  it("no tiene violaciones de accesibilidad", async () => {
    const { container } = render(
      <div>
        <Toast type="info" title="Información" onClose={() => {}}>Mensaje</Toast>
        <Toast type="success" actionLabel="Deshacer" onClose={() => {}}>Mensaje</Toast>
        <Toast type="warning">Mensaje</Toast>
        <Toast type="error" onClose={() => {}}>Mensaje</Toast>
      </div>,
    );
    await expectNoA11yViolations(container);
  });
});

function Lanzador({ options }: { options: Parameters<ReturnType<typeof useToast>["show"]>[0] }) {
  const { show, dismissAll } = useToast();
  return (
    <>
      <button onClick={() => show(options)}>mostrar</button>
      <button onClick={dismissAll}>limpiar</button>
    </>
  );
}

describe("ToastProvider y useToast", () => {
  it("useToast fuera del proveedor lanza un error claro", () => {
    const spy = vi.spyOn(console, "error").mockImplementation(() => {});
    expect(() => render(<Lanzador options={{ message: "x" }} />)).toThrow(/ToastProvider/);
    spy.mockRestore();
  });

  it("show dibuja el aviso dentro de la región «Notificaciones»", () => {
    render(<ToastProvider><Lanzador options={{ message: "Guardado" }} /></ToastProvider>);
    expect(screen.getByRole("region", { name: "Notificaciones" })).toBeInTheDocument();
    fireEvent.click(screen.getByText("mostrar"));
    expect(screen.getByRole("region", { name: "Notificaciones" })).toHaveTextContent("Guardado");
  });

  it("el cierre retira el aviso", () => {
    render(<ToastProvider><Lanzador options={{ message: "Guardado" }} /></ToastProvider>);
    fireEvent.click(screen.getByText("mostrar"));
    fireEvent.click(screen.getByRole("button", { name: "Cerrar aviso" }));
    expect(screen.queryByText("Guardado")).not.toBeInTheDocument();
  });

  it("se retira solo tras la duración por defecto (5 s)", () => {
    vi.useFakeTimers();
    render(<ToastProvider><Lanzador options={{ message: "Guardado" }} /></ToastProvider>);
    fireEvent.click(screen.getByText("mostrar"));
    act(() => { vi.advanceTimersByTime(4900); });
    expect(screen.getByText("Guardado")).toBeInTheDocument();
    act(() => { vi.advanceTimersByTime(200); });
    expect(screen.queryByText("Guardado")).not.toBeInTheDocument();
  });

  it("duration del proveedor y duration del aviso mandan, en ese orden", () => {
    vi.useFakeTimers();
    render(<ToastProvider duration={1000}><Lanzador options={{ message: "A", duration: 3000 }} /></ToastProvider>);
    fireEvent.click(screen.getByText("mostrar"));
    act(() => { vi.advanceTimersByTime(2000); });
    expect(screen.getByText("A")).toBeInTheDocument();
    act(() => { vi.advanceTimersByTime(1100); });
    expect(screen.queryByText("A")).not.toBeInTheDocument();
  });

  it("un aviso con acción no se retira solo", () => {
    vi.useFakeTimers();
    render(<ToastProvider><Lanzador options={{ message: "Enviado", actionLabel: "Deshacer" }} /></ToastProvider>);
    fireEvent.click(screen.getByText("mostrar"));
    act(() => { vi.advanceTimersByTime(60000); });
    expect(screen.getByText("Enviado")).toBeInTheDocument();
  });

  it("pulsar la acción la ejecuta y retira el aviso", () => {
    const onAction = vi.fn();
    render(<ToastProvider><Lanzador options={{ message: "Enviado", actionLabel: "Deshacer", onAction }} /></ToastProvider>);
    fireEvent.click(screen.getByText("mostrar"));
    fireEvent.click(screen.getByRole("button", { name: "Deshacer" }));
    expect(onAction).toHaveBeenCalledTimes(1);
    expect(screen.queryByText("Enviado")).not.toBeInTheDocument();
  });

  it("se pausa mientras el puntero está encima y retoma al salir", () => {
    vi.useFakeTimers();
    render(<ToastProvider><Lanzador options={{ message: "Guardado" }} /></ToastProvider>);
    fireEvent.click(screen.getByText("mostrar"));
    const toast = screen.getByRole("status");
    act(() => { vi.advanceTimersByTime(3000); });
    fireEvent.mouseEnter(toast.parentElement as HTMLElement);
    act(() => { vi.advanceTimersByTime(20000); });
    expect(screen.getByText("Guardado")).toBeInTheDocument();
    fireEvent.mouseLeave(toast.parentElement as HTMLElement);
    act(() => { vi.advanceTimersByTime(1900); });
    expect(screen.getByText("Guardado")).toBeInTheDocument();
    act(() => { vi.advanceTimersByTime(200); });
    expect(screen.queryByText("Guardado")).not.toBeInTheDocument();
  });

  it("max limita los avisos y retira el más antiguo", () => {
    function Varios() {
      const { show } = useToast();
      return <button onClick={() => { show({ message: "uno", duration: 0 }); show({ message: "dos", duration: 0 }); show({ message: "tres", duration: 0 }); }}>mostrar</button>;
    }
    render(<ToastProvider max={2}><Varios /></ToastProvider>);
    fireEvent.click(screen.getByText("mostrar"));
    expect(screen.queryByText("uno")).not.toBeInTheDocument();
    expect(screen.getByText("dos")).toBeInTheDocument();
    expect(screen.getByText("tres")).toBeInTheDocument();
  });

  it("dismissAll retira todos", () => {
    render(<ToastProvider><Lanzador options={{ message: "Guardado", duration: 0 }} /></ToastProvider>);
    fireEvent.click(screen.getByText("mostrar"));
    fireEvent.click(screen.getByText("limpiar"));
    expect(screen.queryByText("Guardado")).not.toBeInTheDocument();
  });

  it("el proveedor con un aviso no tiene violaciones de accesibilidad", async () => {
    const { container } = render(<ToastProvider><Lanzador options={{ type: "warning", title: "Aviso", message: "Mensaje", actionLabel: "Ver" }} /></ToastProvider>);
    fireEvent.click(screen.getByText("mostrar"));
    await expectNoA11yViolations(container);
  });
});
