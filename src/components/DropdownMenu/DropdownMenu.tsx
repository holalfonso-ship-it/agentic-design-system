import { useCallback, useEffect, useId, useRef, useState } from "react";
import { semantic, red, radius, fontSize, lineHeight, fontFamily, fontWeight, space } from "../../tokens";
import { Icon } from "../Icon";
import type { IconName } from "../Icon";
import type { CSSProperties, KeyboardEvent as ReactKeyboardEvent, ReactNode } from "react";

export type DropdownMenuPlacement = "bottom-start" | "bottom-end" | "top-start" | "top-end";

export interface DropdownMenuProps {
  /** Dibuja el botón que abre el menú. Recibe las props que debe llevar (onClick, aria-*). */
  trigger: (props: DropdownMenuTriggerProps) => ReactNode;
  /** Filas del menú, en orden. Un `{ type: "divider" }` dibuja una línea de separación. */
  items: readonly DropdownMenuEntry[];
  /** Dónde se ancla respecto al botón. Por defecto "bottom-start". */
  placement?: DropdownMenuPlacement;
  /** Controlado: si está abierto. Sin esta prop el componente gestiona su propio estado. */
  open?: boolean;
  /** Abierto al empezar (modo no controlado). */
  defaultOpen?: boolean;
  /** Se llama cuando quiere abrirse o cerrarse (clic, Escape, pulsar fuera, elegir una fila). */
  onOpenChange?: (open: boolean) => void;
  /** Nombre accesible del menú. Por defecto «Menú». */
  "aria-label"?: string;
}

/** Una fila del menú. */
export interface DropdownMenuItem {
  label: string;
  /** Icono a la izquierda, del catálogo de Icon. */
  icon?: IconName;
  /** Si se indica, la fila es marcable: `true` dibuja el check a la derecha. */
  selected?: boolean;
  /** "destructive" para acciones que borran o bloquean. Por defecto "default". */
  tone?: "default" | "destructive";
  /** La fila deshabilitada no se activa ni recibe foco. */
  disabled?: boolean;
  /** Se llama al elegir la fila; después el menú se cierra. */
  onSelect?: () => void;
}

export type DropdownMenuEntry = DropdownMenuItem | { type: "divider" };

/** Props que DropdownMenu pasa a la función `trigger`; hay que ponerlas en el botón. */
export interface DropdownMenuTriggerProps {
  onClick: () => void;
  onKeyDown: (event: ReactKeyboardEvent) => void;
  "aria-haspopup": "menu";
  "aria-expanded": boolean;
  "aria-controls": string | undefined;
}

const isDivider = (entry: DropdownMenuEntry): entry is { type: "divider" } => "type" in entry;

// El hit target de cada fila mide 44; los iconos, 20.
const ROW_HEIGHT = 44;
const ICON_SIZE = 20;

/**
 * DropdownMenu: lista de acciones anclada a un botón. Cada fila es un Menu item (icono
 * opcional, etiqueta, marca de selección); `tone="destructive"` para lo que borra o
 * bloquea. Corresponde a los componentes "Dropdown menu" y "Menu item" diseñados en Figma
 * el 2026-10-16 (página "02. Components", familia «Overlay»). Ver DropdownMenu.metadata.ts.
 * Teclado: flecha abajo en el botón lo abre; dentro, flechas, Inicio y Fin recorren las
 * filas habilitadas, Intro o Espacio eligen, Escape cierra y devuelve el foco al botón.
 */
export function DropdownMenu({
  trigger,
  items,
  placement = "bottom-start",
  open: openProp,
  defaultOpen = false,
  onOpenChange,
  "aria-label": ariaLabel,
}: DropdownMenuProps) {
  const menuId = useId();
  const wrapperRef = useRef<HTMLSpanElement>(null);
  const rowRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [innerOpen, setInnerOpen] = useState(defaultOpen);
  const [hovered, setHovered] = useState<number | null>(null);
  const [focused, setFocused] = useState<number | null>(null);
  const controlled = openProp !== undefined;
  const open = controlled ? openProp : innerOpen;

  const setOpen = useCallback(
    (next: boolean) => {
      if (!controlled) setInnerOpen(next);
      onOpenChange?.(next);
    },
    [controlled, onOpenChange],
  );

  const restoreFocus = useCallback(() => {
    wrapperRef.current?.querySelector<HTMLElement>("[aria-haspopup]")?.focus();
  }, []);
  const closeAndRestore = useCallback(() => {
    setOpen(false);
    restoreFocus();
  }, [setOpen, restoreFocus]);

  // Índices (en `items`) de las filas que se pueden recorrer con el teclado.
  const enabled = items.flatMap((entry, i) => (!isDivider(entry) && !entry.disabled ? [i] : []));

  const focusRow = useCallback((index: number | undefined) => {
    if (index !== undefined) rowRefs.current[index]?.focus();
  }, []);

  useEffect(() => {
    if (!open) return;
    focusRow(enabled[0]);

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
    // `enabled` se recalcula en cada render: aquí solo importa el momento de abrirse.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  function handleMenuKeyDown(event: ReactKeyboardEvent) {
    const current = focused === null ? -1 : enabled.indexOf(focused);
    if (event.key === "ArrowDown") {
      event.preventDefault();
      focusRow(enabled[(current + 1) % enabled.length]);
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      focusRow(enabled[(current - 1 + enabled.length) % enabled.length]);
    } else if (event.key === "Home") {
      event.preventDefault();
      focusRow(enabled[0]);
    } else if (event.key === "End") {
      event.preventDefault();
      focusRow(enabled[enabled.length - 1]);
    } else if (event.key === "Tab") {
      // Sin preventDefault: el foco sigue desde el botón, al siguiente elemento de la página.
      setOpen(false);
      restoreFocus();
    }
  }

  const above = placement.startsWith("top");
  const alignEnd = placement.endsWith("end");

  const wrapperStyle: CSSProperties = { position: "relative", display: "inline-flex" };

  const menuStyle: CSSProperties = {
    position: "absolute",
    zIndex: 1000,
    ...(above ? { bottom: `calc(100% + ${space["4"]}px)` } : { top: `calc(100% + ${space["4"]}px)` }),
    ...(alignEnd ? { right: 0 } : { left: 0 }),
    width: 240,
    maxWidth: "calc(100vw - 32px)",
    boxSizing: "border-box",
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch",
    gap: space["2"],
    padding: space["4"],
    background: semantic.bg.surface,
    border: `1px solid ${semantic.border.default}`,
    borderRadius: radius.md,
    fontFamily: fontFamily.base,
    outline: "none",
  };

  const dividerWrapStyle: CSSProperties = { padding: `${space["4"]}px 0` };
  const dividerLineStyle: CSSProperties = { height: 1, background: semantic.border.default };

  function rowStyle(item: DropdownMenuItem, index: number): CSSProperties {
    const destructive = item.tone === "destructive";
    const isHovered = hovered === index && !item.disabled;
    const isFocused = focused === index && !item.disabled;
    return {
      display: "flex",
      alignItems: "center",
      gap: space["12"],
      width: "100%",
      minHeight: ROW_HEIGHT,
      boxSizing: "border-box",
      padding: space["12"],
      border: "none",
      borderRadius: radius.sm,
      background: isFocused || isHovered ? (destructive ? semantic.feedback["error-subtle"] : semantic.bg.default) : "transparent",
      // El anillo de foco va dentro de la fila para no cambiar su tamaño.
      outline: isFocused ? `2px solid ${semantic.brand.primary}` : "none",
      outlineOffset: -2,
      color: item.disabled ? semantic.text.disabled : destructive ? red["900"] : semantic.text.primary,
      cursor: item.disabled ? "not-allowed" : "pointer",
      textAlign: "left",
      fontFamily: fontFamily.base,
      fontSize: fontSize["body-md"],
      lineHeight: `${lineHeight["body-md"]}px`,
      fontWeight: fontWeight.regular,
    };
  }

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
        onKeyDown: (event) => {
          if (event.key === "ArrowDown" && !open) {
            event.preventDefault();
            setOpen(true);
          }
        },
        "aria-haspopup": "menu",
        "aria-expanded": open,
        "aria-controls": open ? menuId : undefined,
      })}
      {open ? (
        // Las flechas llegan desde las filas (los botones enfocables); el menú solo las encamina.
        <div id={menuId} role="menu" aria-label={ariaLabel ?? "Menú"} tabIndex={-1} style={menuStyle} onKeyDown={handleMenuKeyDown}>
          {items.map((entry, index) => {
            if (isDivider(entry)) {
              return (
                <div key={index} role="separator" style={dividerWrapStyle}>
                  <div style={dividerLineStyle} />
                </div>
              );
            }
            const checkable = entry.selected !== undefined;
            return (
              <button
                key={index}
                ref={(el) => {
                  rowRefs.current[index] = el;
                }}
                type="button"
                role={checkable ? "menuitemcheckbox" : "menuitem"}
                aria-checked={checkable ? entry.selected : undefined}
                aria-disabled={entry.disabled || undefined}
                tabIndex={-1}
                style={rowStyle(entry, index)}
                onClick={() => {
                  if (entry.disabled) return;
                  entry.onSelect?.();
                  closeAndRestore();
                }}
                onMouseEnter={() => setHovered(index)}
                onMouseLeave={() => setHovered(null)}
                onFocus={() => setFocused(index)}
                onBlur={() => setFocused(null)}
              >
                {entry.icon ? <Icon name={entry.icon} size={ICON_SIZE} /> : null}
                <span style={{ flex: 1, minWidth: 0 }}>{entry.label}</span>
                {entry.selected ? <Icon name="check" size={ICON_SIZE} /> : null}
              </button>
            );
          })}
        </div>
      ) : null}
    </span>
  );
}
