import { semantic, radius } from "../../tokens";
import type { CSSProperties, HTMLAttributes } from "react";

export type SkeletonShape = "text" | "circle" | "rect";

export interface SkeletonProps extends Omit<HTMLAttributes<HTMLSpanElement>, "children"> {
  /** Forma del hueco: "text" (una línea), "circle" (avatar) o "rect" (imagen, tarjeta). Por defecto "text". */
  shape?: SkeletonShape;
  /** Ancho en px o CSS (p. ej. "60%"). Por defecto: 100% en text y rect, 40 en circle. */
  width?: number | string;
  /** Alto en px o CSS. Por defecto: 16 en text, 96 en rect, 40 en circle. */
  height?: number | string;
}

const defaults: Record<SkeletonShape, { width: number | string; height: number | string }> = {
  text: { width: "100%", height: 16 },
  circle: { width: 40, height: 40 },
  rect: { width: "100%", height: 96 },
};

const corner: Record<SkeletonShape, number> = { text: radius.sm, circle: radius.full, rect: radius.md };

// Pulso suave; con «reducir movimiento» el hueco se queda quieto.
const keyframes = `@keyframes aida-pulse{50%{opacity:.5}}
.aida-skeleton{animation:aida-pulse 1.6s ease-in-out infinite}
@media (prefers-reduced-motion:reduce){.aida-skeleton{animation:none}}`;

/**
 * Skeleton: hueco gris que ocupa el lugar del contenido mientras carga y evita que
 * la página salte al llegar. Tres formas: línea de texto, círculo y rectángulo.
 * Corresponde al component set "Skeleton" diseñado en Figma el 2026-10-15 (página
 * "02. Components"). Ver Skeleton.metadata.ts. Es decorativo (aria-hidden): avisa de
 * la carga en el contenedor con aria-busy. Para una espera sin forma conocida, Spinner.
 */
export function Skeleton({ shape = "text", width, height, className, style, ...rest }: SkeletonProps) {
  const base = defaults[shape];
  const skeletonStyle: CSSProperties = {
    display: "block",
    width: width ?? base.width,
    height: height ?? base.height,
    background: semantic.border.default,
    borderRadius: corner[shape],
    flexShrink: 0,
    ...style,
  };
  return (
    <>
      <style>{keyframes}</style>
      <span aria-hidden="true" {...rest} className={className ? `aida-skeleton ${className}` : "aida-skeleton"} style={skeletonStyle} />
    </>
  );
}
