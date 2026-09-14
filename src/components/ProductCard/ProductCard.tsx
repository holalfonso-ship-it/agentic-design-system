import { card, semantic, radius, fontSize, fontFamily } from "../../tokens";
import type { CSSProperties } from "react";

export type ProductCardProduct = "bnpl" | "credit";
export type ProductCardState = "active" | "frozen" | "blocked";

export interface ProductCardProps {
  product: ProductCardProduct;
  /** Estado del producto — no un producto en sí. Default: "active". */
  state?: ProductCardState;
  title: string;
  subtitle?: string;
  amount?: string;
}

const productLabel: Record<ProductCardProduct, string> = {
  bnpl: "Compra ahora, paga después",
  credit: "Tarjeta de crédito",
};

const stateLabel: Record<Exclude<ProductCardState, "active">, string> = {
  frozen: "Congelada",
  blocked: "Bloqueada",
};

/**
 * ProductCard — tarjeta de producto financiero (BNPL o crédito), con un
 * estado independiente del producto (activo, congelado o bloqueado).
 * Corresponde al component set real "Product Card" (38:176) en la
 * librería Figma AID: `product = credit | bnpl` × `state = active |
 * frozen | blocked`. Ver ProductCard.metadata.ts.
 *
 * Remodelado en el Compose de la Fase 3 (2026-09-14, hallazgo 3 del
 * Audit): antes `variant: "bnpl" | "credit" | "frozen"` trataba
 * "frozen" como un tercer producto, cuando en Figma es un estado que se
 * aplica sobre cualquier producto — y no cubría "blocked" en absoluto.
 * Es un breaking change deliberado de la API pública (documentado en
 * `estado-tarea-agentic-design-system.md`), asumido porque el repo no
 * tiene consumidores externos todavía.
 */
export function ProductCard({ product, state = "active", title, subtitle, amount }: ProductCardProps) {
  // "frozen" y "blocked" comparten el mismo bg/text (confirmado sobre
  // los nodos reales 46:30 y 46:68 en Figma) — solo "active" usa la
  // paleta propia del producto.
  const palette = state === "active" ? card[product] : card.frozen;
  const borderColor = state === "blocked" ? semantic.feedback.error : card.border;
  const borderWidth = state === "blocked" ? 2 : 1;

  const containerStyle: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    gap: 6,
    padding: 16,
    // Corregido en el Compose de la Fase 3: el radio real del componente
    // es radius/md (12px), no radius/lg (16px) — confirmado sobre los
    // nodos reales 35:959 y 46:68.
    borderRadius: radius.md,
    background: palette.bg,
    border: `${borderWidth}px solid ${borderColor}`,
    fontFamily: fontFamily.base,
    minWidth: 220,
    boxSizing: "border-box",
  };

  const eyebrowStyle: CSSProperties = {
    fontSize: fontSize.caption,
    fontWeight: 600,
    color: palette.text,
    textTransform: "uppercase",
    letterSpacing: "0.04em",
  };

  const titleStyle: CSSProperties = {
    fontSize: fontSize["heading-md"],
    fontWeight: 700,
    color: palette.text,
    margin: 0,
  };

  const subtitleStyle: CSSProperties = {
    fontSize: fontSize["body-md"],
    color: palette.text,
    opacity: 0.75,
    margin: 0,
  };

  const eyebrow =
    state === "active" ? productLabel[product] : `${productLabel[product]} · ${stateLabel[state]}`;

  return (
    <div style={containerStyle}>
      <span style={eyebrowStyle}>{eyebrow}</span>
      <p style={titleStyle}>{title}</p>
      {subtitle ? <p style={subtitleStyle}>{subtitle}</p> : null}
      {amount ? <p style={{ ...titleStyle, fontSize: fontSize["heading-lg"] }}>{amount}</p> : null}
    </div>
  );
}
