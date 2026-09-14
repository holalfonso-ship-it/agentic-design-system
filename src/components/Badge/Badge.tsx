import { radius, fontSize, lineHeight, fontFamily, semantic, sunflower, neutral } from "../../tokens";
import type { CSSProperties, ReactNode } from "react";

export type BadgeVariant = "success" | "error" | "warning" | "neutral";

export interface BadgeProps {
  variant?: BadgeVariant;
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}

// Corregido en el Audit de la Fase 3 (2026-09-14): estos 4 pares de color
// vivían como hex hardcodeados con solo un comentario citando la variable
// de Figma — ahora son tokens reales de `src/tokens/colors.ts`, verificados
// de nuevo contra el component set real de Badge (165:119) vía
// get_variable_defs. Los valores no cambiaron (ya eran correctos), pero
// antes no existían como tokens reusables.
const variantColors: Record<BadgeVariant, { bg: string; text: string }> = {
  success: { bg: semantic.feedback["success-subtle"], text: semantic.feedback.success },
  error: { bg: semantic.feedback["error-subtle"], text: semantic.feedback.error },
  warning: { bg: sunflower["50"], text: sunflower["800"] },
  neutral: { bg: neutral["50"], text: semantic.text.secondary },
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
