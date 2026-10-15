import { useCallback, useEffect, useId, useRef, useState } from "react";
import { semantic, radius, fontSize, lineHeight, fontFamily, fontWeight, space } from "../../tokens";
import type { CSSProperties, ReactNode } from "react";

export type TooltipPlacement = "top" | "bottom" | "left" | "right";

export interface TooltipProps {
  /** Texto de ayuda. Corto: una frase como mucho. */
  content: string;
  /** Dónde aparece respecto al elemento. Por defecto "top". */
  placement?: TooltipPlacement;
  /** El elemento que lo activa (un botón, un icono, un enlace). */
  children: ReactNode;
  /** Milisegundos de espera antes de mostrarse al pasar el ratón. Por defecto 300. En foco aparece al instante. */
  delay?: number;
}

const ARROW_W = 8;
const ARROW_H = 4;

/**
 * Tooltip: bocadillo oscuro con una ayuda breve. Se muestra al pasar el ratón o al
 * enfocar con teclado, y se cierra con Escape. Corresponde al component set "Tooltip"
 * diseñado en Figma el 2026-10-15 (página "02. Components"). Ver Tooltip.metadata.ts.
 * El texto describe al elemento (aria-describedby), no lo sustituye: el elemento debe
 * tener ya su propio nombre accesible. No metas aquí nada interactivo.
 */
export function Tooltip({ content, placement = "top", children, delay = 300 }: TooltipProps) {
  const id = useId();
  const [open, setOpen] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clear = useCallback(() => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = null;
  }, []);
  const show = useCallback(
    (wait: number) => {
      clear();
      if (wait <= 0) setOpen(true);
      else timer.current = setTimeout(() => setOpen(true), wait);
    },
    [clear],
  );
  const hide = useCallback(() => {
    clear();
    setOpen(false);
  }, [clear]);

  useEffect(() => clear, [clear]);

  const vertical = placement === "top" || placement === "bottom";
  const arrowFirst = placement === "bottom" || placement === "right";
  const gap = `${space["4"]}px`;

  const wrapperStyle: CSSProperties = { position: "relative", display: "inline-flex" };

  const positionStyle: CSSProperties =
    placement === "top"
      ? { bottom: `calc(100% + ${gap})`, left: "50%", transform: "translateX(-50%)" }
      : placement === "bottom"
        ? { top: `calc(100% + ${gap})`, left: "50%", transform: "translateX(-50%)" }
        : placement === "left"
          ? { right: `calc(100% + ${gap})`, top: "50%", transform: "translateY(-50%)" }
          : { left: `calc(100% + ${gap})`, top: "50%", transform: "translateY(-50%)" };

  const popupStyle: CSSProperties = {
    position: "absolute",
    zIndex: 1000,
    display: "flex",
    flexDirection: vertical ? "column" : "row",
    alignItems: "center",
    width: "max-content",
    maxWidth: 240,
    pointerEvents: "none",
    ...positionStyle,
  };

  const bubbleStyle: CSSProperties = {
    padding: `${space["6"]}px ${space["12"]}px`,
    background: semantic.bg.inverse,
    color: semantic.text.inverse,
    borderRadius: radius.sm,
    boxSizing: "border-box",
    fontFamily: fontFamily.base,
    fontSize: fontSize["label-sm"],
    lineHeight: `${lineHeight["label-sm"]}px`,
    fontWeight: fontWeight.medium,
  };

  const arrowStyle: CSSProperties = {
    display: "block",
    flexShrink: 0,
    width: vertical ? ARROW_W : ARROW_H,
    height: vertical ? ARROW_H : ARROW_W,
    background: semantic.bg.inverse,
    clipPath:
      placement === "top"
        ? "polygon(0 0, 100% 0, 50% 100%)"
        : placement === "bottom"
          ? "polygon(0 100%, 100% 100%, 50% 0)"
          : placement === "left"
            ? "polygon(0 0, 100% 50%, 0 100%)"
            : "polygon(100% 0, 100% 100%, 0 50%)",
  };

  const arrow = <span aria-hidden="true" style={arrowStyle} />;

  return (
    // El envoltorio solo recoge los eventos del hijo enfocable (no es interactivo por sí mismo).
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <span
      style={wrapperStyle}
      aria-describedby={open ? id : undefined}
      onMouseEnter={() => show(delay)}
      onMouseLeave={hide}
      onFocus={() => show(0)}
      onBlur={hide}
      onKeyDown={(e) => {
        if (e.key === "Escape") hide();
      }}
    >
      {children}
      {open ? (
        <span style={popupStyle}>
          {arrowFirst ? arrow : null}
          <span role="tooltip" id={id} style={bubbleStyle}>
            {content}
          </span>
          {arrowFirst ? null : arrow}
        </span>
      ) : null}
    </span>
  );
}
