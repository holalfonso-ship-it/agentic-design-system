import { button, radius, fontSize, fontFamily, space, fontWeight } from "../../tokens";
import type { CSSProperties, ButtonHTMLAttributes } from "react";

export type ButtonVariant = "primary" | "secondary" | "tertiary";
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

// Horizontales alineados con Figma (Ciclo 3): sm 16, md 24, lg 24. Los 14/18/22 que
// había antes no existían en Figma. Las partes verticales (8/12/16) se mantienen:
// en Figma la altura es fija (44/48/56) y el código la deriva del contenido
// (divergencia registrada en la metadata).
const sizeToPadding: Record<ButtonSize, string> = {
  sm: `${space["8"]}px ${space["16"]}px`,
  md: `${space["12"]}px ${space["24"]}px`,
  lg: `${space["16"]}px ${space["24"]}px`,
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
    padding: variant === "tertiary" ? `${space["8"]}px ${space["4"]}px` : sizeToPadding[size],
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
