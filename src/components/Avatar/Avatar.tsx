import { button, fontFamily } from "../../tokens";
import type { CSSProperties } from "react";

export type AvatarSize = "sm" | "md" | "lg";

export interface AvatarProps {
  initials: string;
  size?: AvatarSize;
  className?: string;
  style?: CSSProperties;
}

const sizeToDiameter: Record<AvatarSize, number> = { sm: 32, md: 40, lg: 48 };
const sizeToFontSize: Record<AvatarSize, number> = { sm: 12, md: 14, lg: 20 };

/**
 * Avatar — círculo con iniciales (fallback de texto, sin foto todavía).
 * Corresponde al componente "Avatar" diseñado directamente en Figma en
 * la Fase 2 (2026-09-03, component set 169:113), construido con el
 * agente de Figma (skill figma-generate-library) — no existía en la
 * librería. Ver Avatar.metadata.ts.
 */
export function Avatar({ initials, size = "md", className, style }: AvatarProps) {
  const diameter = sizeToDiameter[size];

  const finalStyle: CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: diameter,
    height: diameter,
    borderRadius: "50%",
    background: button.primary.bg.default, // semantic/brand/primary — mismo plum que Button primary
    color: button.primary.text.default, // button/primary/text/default — blanco, pensado para texto sobre marca
    fontFamily: fontFamily.base,
    fontSize: sizeToFontSize[size],
    fontWeight: 600,
    flexShrink: 0,
    userSelect: "none",
    ...style,
  };

  return (
    <span className={className} style={finalStyle}>
      {initials}
    </span>
  );
}
