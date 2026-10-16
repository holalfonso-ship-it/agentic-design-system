import { semantic, neutral, radius, fontSize, lineHeight, fontFamily, space, fontWeight } from "../../tokens";
import { Button } from "../Button";
import { Icon } from "../Icon";
import { useRef } from "react";
import { useModalBehavior } from "../../hooks/useModalBehavior";
import type { CSSProperties, ReactNode } from "react";

// El hit target del botón cerrar (44) sobresale 6 px del círculo visual (32) por cada lado.
const HIT_OVERHANG = (44 - 32) / 2;

export type DrawerSide = "end" | "start";

export interface DrawerProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  /** Lado por el que entra el panel. "end" (por defecto) es la derecha en LTR; "start", la izquierda. */
  side?: DrawerSide;
  primaryActionLabel?: string;
  onPrimaryAction?: () => void;
  secondaryActionLabel?: string;
  onSecondaryAction?: () => void;
  /** Sobreescribe el footer de dos botones por defecto (secundario + primario). */
  footer?: ReactNode;
  className?: string;
  style?: CSSProperties;
}

/**
 * Drawer — panel lateral modal: fondo oscurecido + panel de 280 px a pantalla
 * completa (cabecera con título y botón cerrar, divider, cuerpo con scroll, footer
 * opcional). Corresponde al component set "Drawer" diseñado en Figma el 2026-10-16
 * (página "02. Components", familia «Overlay»). Ver Drawer.metadata.ts.
 *
 * Comparte con Modal el comportamiento de diálogo (Escape, focus trap, devolución
 * del foco) a través de useModalBehavior. A diferencia de Modal no es un bottom
 * sheet: pensado para filtros, ajustes o un formulario corto que acompaña a la pantalla.
 */
export function Drawer({
  open,
  onClose,
  title,
  children,
  side = "end",
  primaryActionLabel,
  onPrimaryAction,
  secondaryActionLabel = "Cancelar",
  onSecondaryAction,
  footer,
  className,
  style,
}: DrawerProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  useModalBehavior(open, onClose, panelRef);

  if (!open) return null;

  const isEnd = side === "end";

  const backdropStyle: CSSProperties = {
    position: "fixed",
    inset: 0,
    // neutral.black al 40% de opacidad — mismo binding que el backdrop en Figma
    background: `${neutral.black}66`,
    display: "flex",
    justifyContent: isEnd ? "flex-end" : "flex-start",
    zIndex: 1000,
  };

  const panelStyle: CSSProperties = {
    width: 280,
    maxWidth: "100%",
    height: "100%",
    background: semantic.bg.surface,
    // El radio va en el borde que da al contenido, no en el que toca la pantalla.
    ...(isEnd
      ? { borderTopLeftRadius: radius.lg, borderBottomLeftRadius: radius.lg }
      : { borderTopRightRadius: radius.lg, borderBottomRightRadius: radius.lg }),
    display: "flex",
    flexDirection: "column",
    boxSizing: "border-box",
    overflow: "hidden",
    fontFamily: fontFamily.base,
    ...style,
  };

  const headerStyle: CSSProperties = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: space["8"],
    padding: `${space["16"]}px ${space["16"]}px ${space["16"]}px ${space["24"]}px`,
    flexShrink: 0,
  };

  const titleStyle: CSSProperties = {
    fontSize: fontSize["heading-md"],
    lineHeight: `${lineHeight["heading-md"]}px`,
    fontWeight: fontWeight.semibold,
    color: semantic.text.primary,
    margin: 0,
    flex: 1,
    minWidth: 0,
  };

  // Hit target 44×44 separado del círculo visual 32×32 (mismo criterio que Modal).
  const closeButtonStyle: CSSProperties = {
    width: 44,
    height: 44,
    minWidth: 44,
    // El hit target de 44 se come el padding de la cabecera para que el círculo
    // visual quede donde lo dibuja Figma (a 16 del borde).
    margin: `${-HIT_OVERHANG}px ${-HIT_OVERHANG}px ${-HIT_OVERHANG}px 0`,
    border: "none",
    background: "transparent",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    padding: 0,
    flexShrink: 0,
  };

  const closeGlyphStyle: CSSProperties = {
    width: 32,
    height: 32,
    borderRadius: radius.full,
    background: semantic.bg.default,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: semantic.text.secondary,
  };

  const dividerStyle: CSSProperties = {
    height: 1,
    background: semantic.border.default,
    border: "none",
    margin: 0,
    flexShrink: 0,
  };

  const bodyStyle: CSSProperties = {
    flex: 1,
    minHeight: 0,
    overflowY: "auto",
    padding: `${space["16"]}px ${space["24"]}px`,
    fontSize: fontSize["body-md"],
    lineHeight: `${lineHeight["body-md"]}px`,
    fontWeight: fontWeight.regular,
    color: semantic.text.secondary,
  };

  const footerStyle: CSSProperties = {
    display: "flex",
    gap: space["12"],
    padding: `${space["16"]}px ${space["24"]}px ${space["24"]}px`,
    flexShrink: 0,
  };

  const hasDefaultFooter = !footer && (primaryActionLabel || onPrimaryAction);

  return (
    // El clic en el fondo es un atajo de ratón; el equivalente de teclado
    // (Escape y el botón Cerrar) ya existe, así que no se duplica aquí.
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
    <div style={backdropStyle} onClick={onClose}>
      {/* Solo evita que el clic dentro del panel cierre el drawer. */}
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions */}
      <div
        ref={panelRef}
        className={className}
        style={panelStyle}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label={title}
      >
        <div style={headerStyle}>
          <h2 style={titleStyle}>{title}</h2>
          <button type="button" onClick={onClose} style={closeButtonStyle} aria-label="Cerrar">
            <span style={closeGlyphStyle}>
              <Icon name="x" size={16} />
            </span>
          </button>
        </div>
        <hr style={dividerStyle} />
        <div style={bodyStyle}>{children}</div>
        {footer ? (
          <div style={footerStyle}>{footer}</div>
        ) : hasDefaultFooter ? (
          <div style={footerStyle}>
            <Button variant="secondary" style={{ flex: 1 }} onClick={onSecondaryAction ?? onClose}>
              {secondaryActionLabel}
            </Button>
            <Button variant="primary" style={{ flex: 1 }} onClick={onPrimaryAction}>
              {primaryActionLabel}
            </Button>
          </div>
        ) : null}
      </div>
    </div>
  );
}
