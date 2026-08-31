import { card, radius, fontSize, fontFamily } from "../../tokens";
import type { CSSProperties } from "react";

export type ProductCardVariant = "bnpl" | "credit" | "frozen";

export interface ProductCardProps {
  variant: ProductCardVariant;
  title: string;
  subtitle?: string;
  amount?: string;
}

const variantLabel: Record<ProductCardVariant, string> = {
  bnpl: "Compra ahora, paga después",
  credit: "Tarjeta de crédito",
  frozen: "Tarjeta congelada",
};

/**
 * ProductCard — tarjeta de producto financiero (BNPL, crédito, congelada).
 * Corresponde al component set "Product Card" en la librería Figma AID.
 * Ver ProductCard.metadata.ts.
 */
export function ProductCard({ variant, title, subtitle, amount }: ProductCardProps) {
  const palette = card[variant];

  const containerStyle: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    gap: 6,
    padding: 16,
    borderRadius: radius.lg,
    background: palette.bg,
    border: `1px solid ${card.border}`,
    fontFamily: fontFamily.base,
    minWidth: 220,
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

  return (
    <div style={containerStyle}>
      <span style={eyebrowStyle}>{variantLabel[variant]}</span>
      <p style={titleStyle}>{title}</p>
      {subtitle ? <p style={subtitleStyle}>{subtitle}</p> : null}
      {amount ? <p style={{ ...titleStyle, fontSize: fontSize["heading-lg"] }}>{amount}</p> : null}
    </div>
  );
}
