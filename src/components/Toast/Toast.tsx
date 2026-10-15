import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { semantic, green, plum, red, sunflower, radius, fontSize, lineHeight, fontFamily, fontWeight, space } from "../../tokens";
import { Icon } from "../Icon";
import type { IconName } from "../Icon";
import type { CSSProperties, HTMLAttributes, ReactNode } from "react";

export type ToastType = "info" | "success" | "warning" | "error";

export interface ToastProps extends Omit<HTMLAttributes<HTMLDivElement>, "title" | "children"> {
  /** Tipo de aviso: decide el color y el icono. Por defecto "info". */
  type?: ToastType;
  /** Título corto, opcional. */
  title?: string;
  /** El mensaje. */
  children: ReactNode;
  /** Texto de la acción opcional (p. ej. «Deshacer»). */
  actionLabel?: string;
  /** Se llama al pulsar la acción. */
  onAction?: () => void;
  /** Si se pasa, se dibuja el botón de cierre y se llama al pulsarlo. */
  onClose?: () => void;
  /** Nombre accesible del botón de cierre. Por defecto «Cerrar aviso». */
  closeLabel?: string;
}

// Sobre el fondo oscuro, el icono usa el tono claro de cada familia (todos por encima de 5:1).
const typeConfig: Record<ToastType, { icon: string; iconName: IconName; role: "status" | "alert" }> = {
  info: { icon: plum["100"], iconName: "info", role: "status" },
  success: { icon: green["400"], iconName: "circle-check", role: "status" },
  warning: { icon: sunflower["500"], iconName: "triangle-alert", role: "alert" },
  error: { icon: red["400"], iconName: "circle-alert", role: "alert" },
};

const pull = (n: number) => -n;

/**
 * Toast — aviso efímero y no bloqueante sobre fondo inverso: icono, título opcional,
 * mensaje, acción opcional y cierre. Cuatro tipos: info, success, warning y error.
 * Corresponde al component set "Toast" diseñado en Figma el 2026-10-15 (página
 * "02. Components"). Esta pieza es solo la tarjeta; para mostrarla, apilarla y retirarla
 * sola, monta `<ToastProvider>` y llama a `useToast().show(...)`. Ver Toast.metadata.ts.
 */
export function Toast({ type = "info", title, children, actionLabel, onAction, onClose, closeLabel = "Cerrar aviso", style, ...rest }: ToastProps) {
  const config = typeConfig[type];

  const containerStyle: CSSProperties = {
    display: "flex",
    alignItems: "flex-start",
    gap: space["12"],
    padding: `${space["12"]}px ${space["16"]}px`,
    background: semantic.bg.inverse,
    borderRadius: radius.md,
    boxSizing: "border-box",
    fontFamily: fontFamily.base,
    ...style,
  };

  const bodyStyle: CSSProperties = { flex: 1, minWidth: 0, display: "flex", flexDirection: "column" };
  const textStyle: CSSProperties = { display: "flex", flexDirection: "column", gap: space["2"] };

  const titleStyle: CSSProperties = {
    margin: 0,
    fontSize: fontSize["label-md"],
    lineHeight: `${lineHeight["label-md"]}px`,
    fontWeight: fontWeight.medium,
    color: semantic.text.inverse,
  };

  const messageStyle: CSSProperties = {
    margin: 0,
    fontSize: fontSize["body-md"],
    lineHeight: `${lineHeight["body-md"]}px`,
    fontWeight: fontWeight.regular,
    color: semantic.text.inverse,
  };

  // Área táctil de 44px con un hueco visual de 8px sobre el mensaje (mismo truco que Alert).
  const actionStyle: CSSProperties = {
    alignSelf: "flex-start",
    display: "inline-flex",
    alignItems: "center",
    minHeight: 44,
    margin: `${pull(space["4"])}px 0 ${pull(space["12"])}px`,
    padding: 0,
    border: "none",
    background: "transparent",
    cursor: "pointer",
    fontFamily: "inherit",
    fontSize: fontSize["label-md"],
    lineHeight: `${lineHeight["label-md"]}px`,
    fontWeight: fontWeight.medium,
    color: semantic.text.inverse,
    textDecoration: "underline",
  };

  // Hit target de 44×44 alrededor del icono de 20×20: el margen negativo devuelve al flujo
  // el tamaño visual, así que el cierre queda donde lo dibuja Figma.
  const closeStyle: CSSProperties = {
    flexShrink: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 44,
    height: 44,
    margin: pull(space["12"]),
    padding: 0,
    border: "none",
    background: "transparent",
    cursor: "pointer",
    color: semantic.text.inverse,
  };

  return (
    <div role={config.role} style={containerStyle} {...rest}>
      <span style={{ display: "flex" }}>
        <Icon name={config.iconName} size={20} color={config.icon} />
      </span>
      <div style={bodyStyle}>
        <div style={textStyle}>
          {title ? <p style={titleStyle}>{title}</p> : null}
          <div style={messageStyle}>{children}</div>
        </div>
        {actionLabel ? (
          <button type="button" onClick={onAction} style={actionStyle}>
            {actionLabel}
          </button>
        ) : null}
      </div>
      {onClose ? (
        <button type="button" onClick={onClose} aria-label={closeLabel} style={closeStyle}>
          <Icon name="x" size={20} color={semantic.text.inverse} />
        </button>
      ) : null}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Proveedor y hook: cola de avisos con retirada automática.
// Viven en este mismo fichero porque cada carpeta de componente tiene un único .tsx.
// ---------------------------------------------------------------------------

export interface ToastOptions {
  type?: ToastType;
  title?: string;
  message: ReactNode;
  actionLabel?: string;
  onAction?: () => void;
  /** Milisegundos hasta retirarlo solo. 0 = no se retira. Por defecto, el del proveedor; con acción, 0. */
  duration?: number;
}

export interface ToastContextValue {
  /** Muestra un aviso y devuelve su id. */
  show: (options: ToastOptions) => string;
  /** Retira un aviso por su id. */
  dismiss: (id: string) => void;
  /** Retira todos los avisos. */
  dismissAll: () => void;
}

export interface ToastProviderProps {
  children: ReactNode;
  /** Milisegundos por defecto antes de retirar un aviso sin acción. Por defecto 5000. */
  duration?: number;
  /** Máximo de avisos a la vez; al pasarse, se retira el más antiguo. Por defecto 3. */
  max?: number;
}

interface ToastItem extends ToastOptions {
  id: string;
  duration: number;
}

const ToastContext = createContext<ToastContextValue | null>(null);

export function useToast(): ToastContextValue {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast debe usarse dentro de <ToastProvider>.");
  return ctx;
}

function ToastEntry({ item, onDismiss }: { item: ToastItem; onDismiss: (id: string) => void }) {
  const [paused, setPaused] = useState(false);
  const remaining = useRef(item.duration);

  // Se pausa mientras el puntero o el foco están encima, para que dé tiempo a leerlo y actuar.
  useEffect(() => {
    if (item.duration <= 0 || paused) return;
    const startedAt = Date.now();
    const timer = setTimeout(() => onDismiss(item.id), remaining.current);
    return () => {
      clearTimeout(timer);
      remaining.current -= Date.now() - startedAt;
    };
  }, [paused, item.duration, item.id, onDismiss]);

  return (
    <div
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      style={{ pointerEvents: "auto" }}
    >
      <Toast
        type={item.type}
        title={item.title}
        actionLabel={item.actionLabel}
        onAction={() => {
          item.onAction?.();
          onDismiss(item.id);
        }}
        onClose={() => onDismiss(item.id)}
      >
        {item.message}
      </Toast>
    </div>
  );
}

/**
 * ToastProvider — monta la zona de avisos (abajo, centrada, por encima del Modal) y
 * da acceso a `useToast()`. Un aviso con acción no se retira solo salvo que indiques
 * `duration`: quien lo lee necesita tiempo para decidir.
 */
export function ToastProvider({ children, duration = 5000, max = 3 }: ToastProviderProps) {
  const [items, setItems] = useState<ToastItem[]>([]);
  const counter = useRef(0);

  const dismiss = useCallback((id: string) => setItems((prev) => prev.filter((t) => t.id !== id)), []);
  const dismissAll = useCallback(() => setItems([]), []);
  const show = useCallback(
    (options: ToastOptions) => {
      counter.current += 1;
      const id = `toast-${counter.current}`;
      const item: ToastItem = { ...options, id, duration: options.duration ?? (options.actionLabel ? 0 : duration) };
      setItems((prev) => [...prev, item].slice(-max));
      return id;
    },
    [duration, max],
  );

  const value = useMemo(() => ({ show, dismiss, dismissAll }), [show, dismiss, dismissAll]);

  const viewportStyle: CSSProperties = {
    position: "fixed",
    bottom: space["16"],
    left: "50%",
    transform: "translateX(-50%)",
    width: "100%",
    maxWidth: 360,
    padding: `0 ${space["16"]}px`,
    boxSizing: "border-box",
    display: "flex",
    flexDirection: "column",
    gap: space["8"],
    pointerEvents: "none",
    zIndex: 1100,
  };

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div role="region" aria-label="Notificaciones" style={viewportStyle}>
        {items.map((item) => (
          <ToastEntry key={item.id} item={item} onDismiss={dismiss} />
        ))}
      </div>
    </ToastContext.Provider>
  );
}
