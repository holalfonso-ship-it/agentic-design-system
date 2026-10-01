import { button, radius, fontSize, fontFamily, space, fontWeight } from "../../tokens";
import type { CSSProperties, ButtonHTMLAttributes } from "react";

export type ButtonVariant = "primary" | "secondary" | "tertiary";
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

// Alineado con Figma (Ciclo 3): altura fija 44/48/56 sin padding vertical y
// horizontales 16/24/24 en las tres variantes (primary, secondary y tertiary).
// Las alturas no son spacing: son el tamaño del componente.
const sizeToHeight: Record<ButtonSize, number> = { sm: 44, md: 48, lg: 56 };
const sizeToPaddingX: Record<ButtonSize, number> = {
  sm: space["16"],
  md: space["24"],
  lg: space["24"],
};

const sizeToFontSize: Record<ButtonSize, number> = {
  sm: fontSize["label-sm"],
  md: fontSize["label-md"],
  lg: fontSize["body-md"],
};

/**
 * Button — acción primaria, secundaria o terciaria.
 * Corresponde al component set "Button" publicado en la librería Figma
 * "Aida" (AID). Ver Button.metadata.ts.
 */
export function Button({
  variant = "primary",
  size = "md",
  disabled,
  style,
  children,
  ...rest
}: ButtonProps) {
  const styles = getVariantStyles(variant, disabled ?? false);

  const finalStyle: CSSProperties = {
    fontFamily: fontFamily.base,
    fontSize: sizeToFontSize[size],
    fontWeight: fontWeight.medium,
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    boxSizing: "border-box",
    height: sizeToHeight[size],
    padding: `0 ${sizeToPaddingX[size]}px`,
    borderRadius: radius.md,
    border: styles.border ?? "none",
    background: styles.bg,
    color: styles.text,
    cursor: disabled ? "not-allowed" : "pointer",
    transition: "background-color 120ms ease, border-color 120ms ease",
    ...style,
  };

  return (
    <button type="button" disabled={disabled} style={finalStyle} {...rest}>
      {children}
    </button>
  );
}

function getVariantStyles(variant: ButtonVariant, disabled: boolean) {
  if (variant === "primary") {
    return {
      bg: disabled ? button.primary.bg.disabled : button.primary.bg.default,
      text: disabled ? button.primary.text.disabled : button.primary.text.default,
    };
  }
  if (variant === "secondary") {
    return {
      bg: button.secondary.bg.default,
      border: `1px solid ${disabled ? button.secondary.border.disabled : button.secondary.border.default}`,
      text: disabled ? button.secondary.text.disabled : button.secondary.text.default,
    };
  }
  return {
    bg: "transparent",
    text: disabled ? button.tertiary.text.disabled : button.tertiary.text.default,
  };
}
