import { useCallback, useEffect, useId, useRef, useState } from "react";
import { semantic, button, radius, fontSize, lineHeight, fontFamily, fontWeight, space } from "../../tokens";
import type { CSSProperties, ReactNode } from "react";

export type PopoverPlacement = "bottom-start" | "bottom-end" | "top-start" | "top-end";

export interface PopoverProps {
  /** Dibuja el elemento que lo abre. Recibe las props que debe llevar (onClick, aria-*). */
  trigger: (props: PopoverTriggerProps) => ReactNode;
  /** Título del panel, opcional. Es también su nombre accesible. */
  title?: string;
  /** Contenido del panel. Corto: una o dos frases. */
  children: ReactNode;
  /** Texto de la acción opcional, al pie del panel. */
  actionLabel?: string;
  /** Se llama al pulsar la acción; después el popover se cierra. */
  onAction?: () => void;
  /** Dónde se ancla respecto al elemento. Por defecto "bottom-start". */
  placement?: PopoverPlacement;
  /** Controlado: si está abierto. Sin esta prop el componente gestiona su propio estado. */
  open?: boolean;
  /** Abierto al empezar (modo no controlado). */
  defaultOpen?: boolean;
  /** Se llama cuando quiere abrirse o cerrarse (clic, Escape, pulsar fuera). */
  onOpenChange?: (open: boolean) => void;
  /** Nombre accesible cuando no hay `title`. */
  "aria-label"?: string;
}

/** Props que Popover pasa a la función `trigger`; hay que ponerlas en el elemento. */
export interface PopoverTriggerProps {
  onClick: () => void;
  "aria-haspopup": "dialog";
  "aria-expanded": boolean;
  "aria-controls": string | undefined;
}

/**
 * Popover: panel flotante anclado a un elemento, con título opcional, contenido y una
 * acción opcional. No es modal: no bloquea la pantalla, no atrapa el foco y se cierra
 * con Escape, al pulsar fuera o al sacar el foco del panel. Corresponde al componente
 * "Popover" diseñado en Figma el 2026-10-16 (página "02. Components", familia «Overlay»).
 * Ver Popover.metadata.ts. El elemento que lo abre lo dibuja quien lo usa (`trigger`),
 * así conserva su propio nombre accesible y recibe aria-expanded y aria-controls.
 */
export function Popover({
  trigger,
  title,
  children,
  actionLabel,
  onAction,
  placement = "bottom-start",
  open: openProp,
  defaultOpen = false,
  onOpenChange,
  "aria-label": ariaLabel,
}: PopoverProps) {
  const panelId = useId();
  const titleId = useId();
  const wrapperRef = useRef<HTMLSpanElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const [innerOpen, setInnerOpen] = useState(defaultOpen);
  const controlled = openProp !== undefined;
  const open = controlled ? openProp : innerOpen;

  const setOpen = useCallback(
    (next: boolean) => {
      if (!controlled) setInnerOpen(next);
      onOpenChange?.(next);
    },
    [controlled, onOpenChange],
  );

  // El foco vuelve al elemento que lo abre: lo localiza por el aria-haspopup que lleva.
  const closeAndRestore = useCallback(() => {
    setOpen(false);
    wrapperRef.current?.querySelector<HTMLElement>("[aria-haspopup]")?.focus();
  }, [setOpen]);

  useEffect(() => {
    if (!open) return;
    const panel = panelRef.current;
    // Al abrirse el foco entra en el panel: en lo primero interactivo, o en el panel.
    const target = panel?.querySelector<HTMLElement>("button, [href], input, select, textarea") ?? panel;
    target?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") closeAndRestore();
    }
    function handlePointerDown(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) setOpen(false);
    }
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handlePointerDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handlePointerDown);
    };
  }, [open, closeAndRestore, setOpen]);

  const above = placement.startsWith("top");
  const alignEnd = placement.endsWith("end");

  // fit-content: en un contenedor flex que estira, el panel se anclaría al borde del contenedor y no al botón.
  const wrapperStyle: CSSProperties = { position: "relative", display: "inline-flex", width: "fit-content", height: "fit-content" };

  const panelStyle: CSSProperties = {
    position: "absolute",
    zIndex: 1000,
    ...(above ? { bottom: `calc(100% + ${space["8"]}px)` } : { top: `calc(100% + ${space["8"]}px)` }),
    ...(alignEnd ? { right: 0 } : { left: 0 }),
    width: 280,
    maxWidth: "calc(100vw - 32px)",
    boxSizing: "border-box",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: space["8"],
    padding: space["16"],
    background: semantic.bg.surface,
    border: `1px solid ${semantic.border.default}`,
    borderRadius: radius.md,
    fontFamily: fontFamily.base,
    outline: "none",
  };

  const titleStyle: CSSProperties = {
    margin: 0,
    fontSize: fontSize["label-md"],
    lineHeight: `${lineHeight["label-md"]}px`,
    fontWeight: fontWeight.medium,
    color: semantic.text.primary,
  };

  const bodyStyle: CSSProperties = {
    fontSize: fontSize["body-md"],
    lineHeight: `${lineHeight["body-md"]}px`,
    fontWeight: fontWeight.regular,
    color: semantic.text.secondary,
  };

  // Hit target de 44 de alto sin mover el diseño de Figma (la acción dibuja 20): sobresale
  // 8 por arriba (lo que mide el gap, así no pisa el texto) y 16 por abajo (el padding del panel).
  const actionStyle: CSSProperties = {
    minHeight: 44,
    boxSizing: "border-box",
    margin: `${-space["8"]}px 0 ${-space["16"]}px`,
    padding: `${space["8"]}px 0 0`,
    border: "none",
    background: "transparent",
    display: "inline-flex",
    alignItems: "flex-start",
    cursor: "pointer",
    fontFamily: fontFamily.base,
    fontSize: fontSize["label-md"],
    lineHeight: `${lineHeight["label-md"]}px`,
    fontWeight: fontWeight.medium,
    color: button.tertiary.text.default,
  };

  return (
    <span
      ref={wrapperRef}
      style={wrapperStyle}
      onBlur={(e) => {
        const next = e.relatedTarget as Node | null;
        if (open && next && !wrapperRef.current?.contains(next)) setOpen(false);
      }}
    >
      {trigger({
        onClick: () => (open ? closeAndRestore() : setOpen(true)),
        "aria-haspopup": "dialog",
        "aria-expanded": open,
        "aria-controls": open ? panelId : undefined,
      })}
      {open ? (
        <div
          ref={panelRef}
          id={panelId}
          role="dialog"
          aria-labelledby={title ? titleId : undefined}
          aria-label={title ? undefined : (ariaLabel ?? "Información")}
          tabIndex={-1}
          style={panelStyle}
        >
          {title ? (
            <p id={titleId} style={titleStyle}>
              {title}
            </p>
          ) : null}
          <div style={bodyStyle}>{children}</div>
          {actionLabel ? (
            <button
              type="button"
              style={actionStyle}
              onClick={() => {
                onAction?.();
                closeAndRestore();
              }}
            >
              {actionLabel}
            </button>
          ) : null}
        </div>
      ) : null}
    </span>
  );
}
