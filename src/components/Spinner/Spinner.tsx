import { semantic, fontFamily } from "../../tokens";
import type { CSSProperties, HTMLAttributes } from "react";

export type SpinnerSize = "sm" | "md" | "lg";

export interface SpinnerProps extends HTMLAttributes<HTMLSpanElement> {
  /** Tamaño: sm 16px, md 24px, lg 32px. Por defecto "md". */
  size?: SpinnerSize;
  /** Texto que oirá un lector de pantalla. Por defecto «Cargando». */
  label?: string;
}

// Diámetro y grosor del anillo por tamaño (los de las variantes de Figma).
const sizes: Record<SpinnerSize, { d: number; stroke: number }> = {
  sm: { d: 16, stroke: 2 },
  md: { d: 24, stroke: 3 },
  lg: { d: 32, stroke: 4 },
};

const visuallyHidden: CSSProperties = {
  position: "absolute",
  width: 1,
  height: 1,
  overflow: "hidden",
  clip: "rect(0 0 0 0)",
  whiteSpace: "nowrap",
};

// Con «reducir movimiento» el giro sigue (es el único indicador de que algo avanza), pero más lento.
const keyframes = `@keyframes aida-spin{to{transform:rotate(360deg)}}
.aida-spinner{animation:aida-spin .8s linear infinite}
@media (prefers-reduced-motion:reduce){.aida-spinner{animation-duration:2.4s}}`;

/**
 * Spinner: indicador de carga de duración desconocida. Un anillo gris con un cuarto
 * oscuro que gira. Corresponde al component set "Spinner" diseñado en Figma el
 * 2026-10-15 (página "02. Components"). Ver Spinner.metadata.ts. Si conoces el
 * progreso, usa una barra de progreso; si cargas contenido con forma conocida, Skeleton.
 */
export function Spinner({ size = "md", label = "Cargando", style, ...rest }: SpinnerProps) {
  const { d, stroke } = sizes[size];
  const r = (d - stroke) / 2;
  const c = 2 * Math.PI * r;

  const wrapperStyle: CSSProperties = {
    position: "relative",
    display: "inline-flex",
    width: d,
    height: d,
    fontFamily: fontFamily.base,
    ...style,
  };

  return (
    <span role="status" style={wrapperStyle} {...rest}>
      <style>{keyframes}</style>
      <svg width={d} height={d} viewBox={`0 0 ${d} ${d}`} aria-hidden="true" focusable="false" className="aida-spinner">
        <circle cx={d / 2} cy={d / 2} r={r} fill="none" stroke={semantic.border.default} strokeWidth={stroke} />
        <circle
          cx={d / 2}
          cy={d / 2}
          r={r}
          fill="none"
          stroke={semantic.text.primary}
          strokeWidth={stroke}
          strokeDasharray={`${c / 4} ${c}`}
          transform={`rotate(-90 ${d / 2} ${d / 2})`}
        />
      </svg>
      <span style={visuallyHidden}>{label}</span>
    </span>
  );
}
