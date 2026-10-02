import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ProductCard } from "./ProductCard";
import { card, semantic } from "../../tokens";
import { expectNoA11yViolations } from "../../test/axe";

const back = {
  side: "back",
  balance: "€3.500,00",
  balanceCaption: "de €3.800,00 disponibles",
  progress: 0.6,
  primaryAction: { label: "Ver movimientos" },
  secondaryAction: { label: "Congelar tarjeta" },
} as const;

describe("ProductCard — cara frontal", () => {
  it("muestra etiqueta del producto, número enmascarado y titular", () => {
    render(<ProductCard product="credit" cardNumber="4289" holderName="Alfonso Zamorano" />);
    expect(screen.getByText("Crédito")).toBeInTheDocument();
    expect(screen.getByText(/4289/).parentElement).toHaveTextContent("···· ···· ···· ···· 4289");
    expect(screen.getByText("Alfonso Zamorano")).toBeInTheDocument();
  });

  it.each([
    ["credit", "Crédito"],
    ["bnpl", "BNPL"],
  ] as const)("producto %s → etiqueta «%s» (como en Figma)", (product, label) => {
    render(<ProductCard product={product} />);
    expect(screen.getByText(label)).toBeInTheDocument();
  });

  it("número y titular son opcionales", () => {
    render(<ProductCard product="credit" />);
    expect(screen.queryByText(/····/)).not.toBeInTheDocument();
  });

  it("es la cara por defecto y tiene 343×232 fijos", () => {
    render(<ProductCard product="credit" />);
    expect(screen.getByRole("group")).toHaveStyle({ width: "343px", height: "232px" });
  });

  it("número con estilos mezclados (puntos Black 32, dígitos Light 24) y titular 16 Regular (Figma)", () => {
    render(<ProductCard product="credit" cardNumber="4289" holderName="Alfonso" />);
    expect(screen.getByText(/····/)).toHaveStyle({ fontWeight: "900" });
    expect(screen.getByText(/4289/)).toHaveStyle({ fontSize: "24px", fontWeight: "300" });
    expect(screen.getByText(/4289/).parentElement).toHaveStyle({ fontSize: "32px" });
    expect(screen.getByText("Alfonso")).toHaveStyle({ fontSize: "16px", fontWeight: "400" });
  });

  it("usa un logo propio si se pasa", () => {
    render(<ProductCard product="credit" logo={<span data-testid="logo">L</span>} />);
    expect(screen.getByTestId("logo")).toBeInTheDocument();
  });

  it("no tiene botones ni barra de progreso", () => {
    render(<ProductCard product="credit" cardNumber="4289" />);
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
    expect(screen.queryByRole("progressbar")).not.toBeInTheDocument();
  });
});

describe("ProductCard — estados y colores", () => {
  it.each([
    ["credit", card.credit.bg],
    ["bnpl", card.bnpl.bg],
  ] as const)("activa: fondo propio del producto %s", (product, bg) => {
    render(<ProductCard product={product} />);
    expect(screen.getByRole("group")).toHaveStyle({ background: bg });
  });

  it.each(["frozen", "blocked"] as const)("%s: fondo compartido card.frozen en los dos productos", (state) => {
    for (const product of ["credit", "bnpl"] as const) {
      const { unmount } = render(<ProductCard product={product} state={state} />);
      expect(screen.getByRole("group")).toHaveStyle({ background: card.frozen.bg });
      unmount();
    }
  });

  it("bloqueada: borde de error de 2 px (frontal) y 1,5 px (trasera); el resto, sin borde", () => {
    const { rerender } = render(<ProductCard product="credit" state="blocked" />);
    expect(screen.getByRole("group")).toHaveStyle({ border: `2px solid ${semantic.feedback.error}` });
    rerender(<ProductCard product="credit" state="blocked" {...back} />);
    expect(screen.getByRole("group")).toHaveStyle({ border: `1.5px solid ${semantic.feedback.error}` });
    rerender(<ProductCard product="credit" state="frozen" />);
    expect(screen.getByRole("group").style.borderStyle).not.toBe("solid");
  });

  it.each([
    ["active", "Crédito, cara frontal"],
    ["frozen", "Crédito congelada, cara frontal"],
    ["blocked", "Crédito bloqueada, cara frontal"],
  ] as const)("estado %s → aria-label «%s»", (state, label) => {
    render(<ProductCard product="credit" state={state} />);
    expect(screen.getByRole("group", { name: label })).toBeInTheDocument();
  });
});

describe("ProductCard — cara trasera", () => {
  it("muestra saldo, texto, progreso y las dos acciones", () => {
    render(<ProductCard product="credit" {...back} />);
    expect(screen.getByText("€3.500,00")).toBeInTheDocument();
    expect(screen.getByText("de €3.800,00 disponibles")).toBeInTheDocument();
    expect(screen.getByRole("progressbar")).toHaveAttribute("aria-valuenow", "60");
    expect(screen.getByRole("button", { name: "Ver movimientos" })).toBeEnabled();
    expect(screen.getByRole("button", { name: "Congelar tarjeta" })).toBeEnabled();
  });

  it("saldo en Display/XL 32/40 Bold y texto 14 Regular", () => {
    render(<ProductCard product="credit" {...back} />);
    expect(screen.getByText("€3.500,00")).toHaveStyle({ fontSize: "32px", lineHeight: "40px", fontWeight: "700" });
    expect(screen.getByText("de €3.800,00 disponibles")).toHaveStyle({ fontSize: "14px", fontWeight: "400" });
  });

  it("los botones son los de Button: sm (44 px) en active y frozen", () => {
    render(<ProductCard product="credit" {...back} />);
    expect(screen.getByRole("button", { name: "Ver movimientos" })).toHaveStyle({ height: "44px" });
  });

  it("frozen: la acción principal se deshabilita y la secundaria sigue activa", () => {
    render(<ProductCard product="credit" state="frozen" {...back} secondaryAction={{ label: "Descongelar tarjeta" }} />);
    expect(screen.getByRole("button", { name: "Ver movimientos" })).toBeDisabled();
    expect(screen.getByRole("button", { name: "Descongelar tarjeta" })).toBeEnabled();
  });

  it("blocked: principal deshabilitada y terciaria, medianas (48 px) y en columna", () => {
    render(<ProductCard product="credit" state="blocked" {...back} secondaryAction={{ label: "Contactar soporte" }} />);
    const primary = screen.getByRole("button", { name: "Ver movimientos" });
    const secondary = screen.getByRole("button", { name: "Contactar soporte" });
    expect(primary).toBeDisabled();
    expect(primary).toHaveStyle({ height: "48px" });
    expect(secondary).toHaveStyle({ height: "48px" });
    expect(primary.parentElement).toHaveStyle({ flexDirection: "column" });
  });

  it("dispara los onClick de las acciones", async () => {
    const onPrimary = vi.fn();
    const onSecondary = vi.fn();
    render(
      <ProductCard
        product="credit"
        {...back}
        primaryAction={{ label: "Ver movimientos", onClick: onPrimary }}
        secondaryAction={{ label: "Congelar tarjeta", onClick: onSecondary }}
      />,
    );
    await userEvent.click(screen.getByRole("button", { name: "Ver movimientos" }));
    await userEvent.click(screen.getByRole("button", { name: "Congelar tarjeta" }));
    expect(onPrimary).toHaveBeenCalledTimes(1);
    expect(onSecondary).toHaveBeenCalledTimes(1);
  });

  it("limita el progreso al rango 0–1", () => {
    const { rerender } = render(<ProductCard product="credit" {...back} progress={2} />);
    expect(screen.getByRole("progressbar")).toHaveAttribute("aria-valuenow", "100");
    rerender(<ProductCard product="credit" {...back} progress={-1} />);
    expect(screen.getByRole("progressbar")).toHaveAttribute("aria-valuenow", "0");
  });

  it("todo es opcional", () => {
    render(<ProductCard product="bnpl" side="back" />);
    expect(screen.getByText("BNPL")).toBeInTheDocument();
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });
});

describe("ProductCard — icono de estado", () => {
  it("blocked: por defecto un candado de Icon (16 px) en el color de error", () => {
    render(<ProductCard product="credit" state="blocked" />);
    const svg = screen.getByRole("group").querySelector("span[aria-hidden='true'] > svg");
    expect(svg).not.toBeNull();
    expect(svg).toHaveAttribute("width", "16");
    expect(svg).toHaveAttribute("height", "16");
    expect(svg).toHaveAttribute("stroke", semantic.feedback.error);
  });

  it("frozen no muestra icono por defecto, salvo que el consumidor pase el suyo", () => {
    const { rerender } = render(<ProductCard product="credit" state="frozen" />);
    expect(screen.getByRole("group").querySelectorAll("span[aria-hidden='true']")).toHaveLength(0);
    rerender(<ProductCard product="credit" state="frozen" statusIcon={<i data-testid="ic" />} />);
    expect(screen.getByTestId("ic")).toBeInTheDocument();
  });

  it("active no muestra icono de estado", () => {
    render(<ProductCard product="bnpl" />);
    expect(screen.getByRole("group").querySelectorAll("span[aria-hidden='true']")).toHaveLength(0);
  });
});

describe("ProductCard — barra de progreso", () => {
  it("active: pista blanca (card.credit.text) también en BNPL y relleno bgSubtle del producto", () => {
    render(<ProductCard product="bnpl" side="back" progress={0.5} />);
    const bar = screen.getByRole("progressbar");
    expect(bar).toHaveStyle({ background: card.credit.text });
    expect(bar.firstElementChild).toHaveStyle({ background: card.bnpl.bgSubtle, width: "50%" });
  });
});

describe("ProductCard — accesibilidad", () => {
  it.each([
    ["credit", "active", "front"],
    ["credit", "active", "back"],
    ["bnpl", "frozen", "back"],
    ["credit", "blocked", "front"],
    ["bnpl", "blocked", "back"],
  ] as const)("%s · %s · %s no tiene violaciones", async (product, state, side) => {
    const { container } = render(
      <ProductCard {...back} product={product} state={state} side={side} cardNumber="4289" holderName="Alfonso Zamorano" />,
    );
    await expectNoA11yViolations(container);
  });
});
