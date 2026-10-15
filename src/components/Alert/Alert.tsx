import { semantic, green, sunflower, radius, fontSize, lineHeight, fontFamily, fontWeight, space } from "../../tokens";
import { Icon } from "../Icon";
import type { IconName } from "../Icon";
import type { CSSProperties, HTMLAttributes, ReactNode } from "react";

export type AlertType = "info" | "success" | "warning" | "error";

export interface AlertProps extends Omit<HTMLAttributes<HTMLDivElement>, "title" | "children"> {
  /** Tipo de aviso: decide color e icono. Por defecto "info". */
  type?: AlertType;
  /** Título corto, opcional. */
  title?: string;
  /** El mensaje. */
  children: ReactNode;
  /** Texto de la acción opcional (p. ej. «Ver detalle»). Sin él, no se dibuja la acción. */
  actionLabel?: string;
  /** Se llama al pulsar la acción. */
  onAction?: () => void;
}

// Colores por tipo. El fondo y el borde salen de los tokens de feedback; el icono usa
// un tono más oscuro en success y warning porque el de feedback no llega a 3:1 sobre
// su fondo suave (ver el comentario de `semantic.feedback` en colors.ts).
const typeConfig: Record<AlertType, { bg: string; border: string; icon: string; iconName: IconName; role: "status" | "alert" }> = {
  info: { bg: semantic.feedback["info-subtle"], border: semantic.feedback.info, icon: semantic.feedback.info, iconName: "info", role: "status" },
  success: { bg: semantic.feedback["success-subtle"], border: semantic.feedback.success, icon: green["900"], iconName: "circle-check", role: "status" },
  warning: { bg: semantic.feedback["warning-subtle"], border: semantic.feedback.warning, icon: sunflower["800"], iconName: "triangle-alert", role: "alert" },
  error: { bg: semantic.feedback["error-subtle"], border: semantic.feedback.error, icon: semantic.feedback.error, iconName: "circle-alert", role: "alert" },
};

const pull = (n: number) => -n;

/**
 * Alert — aviso en línea, persistente y no bloqueante: icono, título opcional,
 * mensaje y una acción opcional. Cuatro tipos: info, success, warning y error.
 * Corresponde al component set "Alert" diseñado en Figma el 2026-10-15 (página
 * "02. Components"), con todos sus colores y espaciados enlazados a variables.
 * Ver Alert.metadata.ts. Para un aviso efímero que desaparece solo, usa Toast.
 */
export function Alert({ type = "info", title, children, actionLabel, onAction, style, ...rest }: AlertProps) {
  const config = typeConfig[type];

  const containerStyle: CSSProperties = {
    display: "flex",
    alignItems: "flex-start",
    gap: space["12"],
    padding: `${space["12"]}px ${space["16"]}px`,
    background: config.bg,
    border: `1px solid ${config.border}`,
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
    color: semantic.text.primary,
  };

  const messageStyle: CSSProperties = {
    margin: 0,
    fontSize: fontSize["body-md"],
    lineHeight: `${lineHeight["body-md"]}px`,
    fontWeight: fontWeight.regular,
    color: semantic.text.secondary,
  };

  // Área táctil de 44px con un hueco visual de 8px sobre el mensaje: el botón sube 4px
  // y se come los 12px de padding inferior del contenedor.
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
    color: semantic.text.primary,
    textDecoration: "underline",
  };

  return (
    <div role={config.role} style={containerStyle} {...rest}>
      <span style={{ display: "flex", color: config.icon }}>
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
    </div>
  );
}
