import { button, radius, fontSize, fontFamily } from "../../tokens";
import type { CSSProperties, ButtonHTMLAttributes } from "react";

export type ButtonVariant = "primary" | "secondary" | "tertiary";
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

const sizeToPadding: Record<ButtonSize, string> = {
  sm: "8px 14px",
  md: "12px 18px",
  lg: "16px 22px",
};

const sizeToFontSize: Record<ButtonSize, number> = {
  sm: fontSize["label-sm"],
  md: fontSize["label-md"],
  lg: fontSize["body-md"],
};

/**
 * Button — acción primaria, secundaria o terciaria.
 * Corresponde al component set "Button" publicado en la librería Figma
 * "Alfonso_Zamorano_Task_IDFinance" (AID). Ver Button.metadata.ts.
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
    fontWeight: 600,
    padding: variant === "tertiary" ? "8px 4px" : sizeToPadding[size],
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
