import { radius, fontSize, lineHeight, fontFamily } from "../../tokens";
import type { CSSProperties, ReactNode } from "react";

export type BadgeVariant = "success" | "error" | "warning" | "neutral";

export interface BadgeProps {
  variant?: BadgeVariant;
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}

const variantColors: Record<BadgeVariant, { bg: string; text: string }> = {
  // semantic/feedback/success-subtle (green/50) + semantic/feedback/success (green/500)
  success: { bg: "#EAF7E8", text: "#2DAF17" },
  // semantic/feedback/error-subtle (red/50) + semantic/feedback/error (red/500)
  error: { bg: "#F9E7E6", text: "#E60C00" },
  // sunflower/50 (primitivo directo, no hay semantic/feedback/warning-subtle) +
  // sunflower/800 (primitivo directo, no semantic/feedback/warning = sunflower/500:
  // sin contraste suficiente como texto sobre su propio bg-subtle)
  warning: { bg: "#FEF8EA", text: "#86651B" },
  // neutral/50 (primitivo directo) + semantic/text/secondary
  neutral: { bg: "#F7F6F6", text: "#2E2824" },
};

/**
 * Badge — etiqueta de estado corta (dot + texto), pill. Corresponde al
 * componente "Badge" diseñado directamente en Figma en la Fase 2
 * (2026-09-03, component set 165:119), construido con el agente de
 * Figma (skill figma-generate-library) — no existía en la librería.
 * Ver Badge.metadata.ts.
 */
export function Badge({ variant = "neutral", children, className, style }: BadgeProps) {
  const colors = variantColors[variant];

  const finalStyle: CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
    padding: "4px 8px",
    borderRadius: radius.full,
    background: colors.bg,
    fontFamily: fontFamily.base,
    fontSize: fontSize["label-sm"],
    lineHeight: `${lineHeight["label-sm"]}px`,
    fontWeight: 500,
    color: colors.text,
    whiteSpace: "nowrap",
    ...style,
  };

  return (
    <span className={className} style={finalStyle}>
      <span
        style={{
          width: 6,
          height: 6,
          borderRadius: radius.full,
          background: colors.text,
          flexShrink: 0,
        }}
      />
      {children}
    </span>
  );
}
