import { semantic, neutral, radius, fontSize, lineHeight, fontFamily } from "../../tokens";
import { Button } from "../Button";
import { useEffect, useRef } from "react";
import type { CSSProperties, ReactNode } from "react";

export interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  primaryActionLabel?: string;
  onPrimaryAction?: () => void;
  secondaryActionLabel?: string;
  onSecondaryAction?: () => void;
  /** Sobreescribe el footer de dos botones por defecto (secundario + primario). */
  footer?: ReactNode;
  className?: string;
  style?: CSSProperties;
}

const FOCUSABLE_SELECTOR =
  'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

/**
 * Modal — bottom sheet: backdrop + sheet (handle, header con título y botón
 * cerrar, divider, body de contenido, footer con acción secundaria y
 * primaria). Corresponde al componente "Modal" diseñado directamente en
 * Figma en la Fase 2 (2026-09-08, componente 178:107, página
 * "02. Components"), construido con el agente de Figma (skill
 * figma-generate-library) a partir de las variables reales del archivo —
 * no existía en la librería (confirmado por búsqueda en la Fase 2,
 * 2026-09-03). Es el último de los 5 componentes ausentes originales. Ver
 * Modal.metadata.ts, incluida la nota sobre por qué todavía no tiene
 * `figma.componentKey`.
 *
 * A diferencia de Figma (donde el footer se construyó como nodos propios,
 * no instancias, mismo criterio que el resto de componentes de este repo),
 * en código el footer por defecto reutiliza el componente Button real —
 * más natural en React que duplicar sus estilos.
 *
 * Accesibilidad corregida en el Compose de la Fase 3 (2026-09-14,
 * hallazgo 8 del Audit): cierre con Escape, focus trap dentro del sheet
 * mientras está abierto, devolución de foco al elemento que lo abrió al
 * cerrarse, y área táctil del botón cerrar ampliada a 44×44 (el círculo
 * visual sigue siendo 32×32, solo el hit target creció).
 */
export function Modal({
  open,
  onClose,
  title,
  children,
  primaryActionLabel,
  onPrimaryAction,
  secondaryActionLabel = "Cancelar",
  onSecondaryAction,
  footer,
  className,
  style,
}: ModalProps) {
  const sheetRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!open) return;

    previousFocusRef.current = document.activeElement as HTMLElement | null;
    const sheet = sheetRef.current;
    const firstFocusable = sheet?.querySelector<HTMLElement>(FOCUSABLE_SELECTOR);
    firstFocusable?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
        return;
      }
      if (event.key !== "Tab" || !sheet) return;

      const focusable = sheet.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR);
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      previousFocusRef.current?.focus();
    };
  }, [open, onClose]);

  if (!open) return null;

  const backdropStyle: CSSProperties = {
    position: "fixed",
    inset: 0,
    // neutral.black al 40% opacity — mismo binding que el backdrop real en Figma
    background: `${neutral.black}66`,
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "center",
    zIndex: 1000,
  };

  const sheetStyle: CSSProperties = {
    width: "100%",
    maxWidth: 375,
    background: semantic.bg.surface,
    borderTopLeftRadius: radius.lg,
    borderTopRightRadius: radius.lg,
    display: "flex",
    flexDirection: "column",
    boxSizing: "border-box",
    fontFamily: fontFamily.base,
    ...style,
  };

  const handleWrapStyle: CSSProperties = {
    display: "flex",
    justifyContent: "center",
    paddingTop: 12,
    paddingBottom: 8,
  };

  const handleBarStyle: CSSProperties = {
    width: 36,
    height: 4,
    borderRadius: radius.full,
    background: neutral["300"],
  };

  const headerStyle: CSSProperties = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
    padding: "4px 16px 16px 24px",
  };

  const titleStyle: CSSProperties = {
    fontSize: fontSize["heading-md"],
    lineHeight: `${lineHeight["heading-md"]}px`,
    fontWeight: 700,
    color: semantic.text.primary,
    margin: 0,
  };

  // Hit target (44×44) separado del círculo visual (32×32) — ver nota
  // de accesibilidad de la Fase 3 arriba.
  const closeButtonStyle: CSSProperties = {
    width: 44,
    height: 44,
    minWidth: 44,
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
    fontSize: 18,
    lineHeight: 1,
  };

  const dividerStyle: CSSProperties = {
    height: 1,
    background: semantic.border.default,
    border: "none",
    margin: 0,
  };

  const bodyStyle: CSSProperties = {
    padding: "8px 24px",
    fontSize: fontSize["body-md"],
    lineHeight: `${lineHeight["body-md"]}px`,
    color: semantic.text.secondary,
  };

  const footerStyle: CSSProperties = {
    display: "flex",
    gap: 12,
    padding: "16px 24px 24px",
  };

  const hasDefaultFooter = !footer && (primaryActionLabel || onPrimaryAction);

  return (
    <div style={backdropStyle} onClick={onClose}>
      <div
        ref={sheetRef}
        className={className}
        style={sheetStyle}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label={title}
      >
        <div style={handleWrapStyle}>
          <span style={handleBarStyle} />
        </div>
        <div style={headerStyle}>
          <h2 style={titleStyle}>{title}</h2>
          <button type="button" onClick={onClose} style={closeButtonStyle} aria-label="Cerrar">
            <span style={closeGlyphStyle}>×</span>
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
