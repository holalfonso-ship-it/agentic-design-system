import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { TabBar } from "./TabBar";
import { expectNoA11yViolations } from "../../test/axe";

const items = [
  { key: "home", label: "Inicio" },
  { key: "cards", label: "Tarjetas" },
  { key: "profile", label: "Perfil" },
];

describe("TabBar", () => {
  it("es un landmark de navegación con nombre accesible", () => {
    render(<TabBar items={items} activeKey="home" />);
    expect(screen.getByRole("navigation", { name: "Navegación principal" })).toBeInTheDocument();
  });

  it("renderiza todas las pestañas como botones", () => {
    render(<TabBar items={items} activeKey="home" />);
    expect(screen.getAllByRole("button")).toHaveLength(3);
  });

  it("marca solo la pestaña activa con aria-current=page", () => {
    render(<TabBar items={items} activeKey="cards" />);
    expect(screen.getByRole("button", { name: "Tarjetas" })).toHaveAttribute("aria-current", "page");
    expect(screen.getByRole("button", { name: "Inicio" })).not.toHaveAttribute("aria-current");
    expect(screen.getByRole("button", { name: "Perfil" })).not.toHaveAttribute("aria-current");
  });

  it("llama a onChange con la key de la pestaña pulsada", async () => {
    const onChange = vi.fn();
    render(<TabBar items={items} activeKey="home" onChange={onChange} />);
    await userEvent.click(screen.getByRole("button", { name: "Perfil" }));
    expect(onChange).toHaveBeenCalledWith("profile");
  });

  it("onChange es opcional", async () => {
    render(<TabBar items={items} activeKey="home" />);
    await userEvent.click(screen.getByRole("button", { name: "Perfil" }));
    expect(screen.getByRole("navigation")).toBeInTheDocument();
  });

  it("renderiza el icono de cada pestaña si se pasa", () => {
    render(<TabBar items={items.map((i) => ({ ...i, icon: <svg data-testid={`i-${i.key}`} aria-hidden="true" /> }))} activeKey="home" />);
    expect(screen.getByTestId("i-home")).toBeInTheDocument();
  });

  it("no tiene violaciones de accesibilidad", async () => {
    const { container } = render(<TabBar items={items} activeKey="home" />);
    await expectNoA11yViolations(container);
  });
});
