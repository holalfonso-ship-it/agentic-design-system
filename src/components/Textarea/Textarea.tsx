import { semantic, neutral, radius, fontSize, lineHeight, space, fontWeight } from "../../tokens";
import type { CSSProperties, TextareaHTMLAttributes } from "react";
import { useId, useState } from "react";

export interface TextareaProps
  extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "cols"> {
  label: string;
  helperText?: string;
  error?: boolean;
  errorText?: string;
  disabled?: boolean;
  className?: string;
  containerStyle?: CSSProperties;
}

/**
 * Textarea — campo de texto de varias líneas con label y helper text. Diseñado
 * en Figma (component set 234:165, página "02. Components") con la misma
 * estructura Label / Field / Helper que Input y Select. Envuelve un
 * <textarea> nativo; el redimensionado vertical lo da el propio navegador.
 */
export function Textarea({
  label,
  helperText,
  error = false,
  errorText,
  disabled = false,
  className,
  containerStyle,
  style,
  id,
  rows = 3,
  "aria-describedby": ariaDescribedBy,
  onFocus,
  onBlur,
  ...rest
}: TextareaProps) {
  const [focused, setFocused] = useState(false);
  const generatedId = useId();
  const fieldId = id ?? generatedId;
  const helperId = `${fieldId}-helper`;

  const borderColor = disabled
    ? semantic.border.default
    : error
      ? semantic.feedback.error
      : focused
        ? semantic.brand.primary
        : semantic.border.strong;
  const borderWidth = !disabled && (focused || error) ? 2 : 1;
  const helperCopy = error ? errorText ?? helperText : helperText;

  const rootStyle: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    gap: space["6"],
    width: "100%",
    ...containerStyle,
  };

  const labelStyle: CSSProperties = {
    fontSize: fontSize["label-sm"],
    lineHeight: `${lineHeight["label-sm"]}px`,
    fontWeight: error || disabled ? fontWeight.semibold : fontWeight.medium,
    color: disabled ? semantic.text.disabled : semantic.text.secondary,
  };

  const textareaStyle: CSSProperties = {
    display: "block",
    width: "100%",
    minHeight: 96,
    boxSizing: "border-box",
    resize: disabled ? "none" : "vertical",
    padding: space["12"],
    borderRadius: radius.sm,
    background: disabled ? neutral["50"] : semantic.bg.surface,
    border: `${borderWidth}px solid ${borderColor}`,
    outline: "none",
    fontFamily: "inherit",
    fontSize: fontSize["body-md"],
    lineHeight: `${lineHeight["body-md"]}px`,
    color: disabled ? semantic.text.disabled : semantic.text.primary,
    cursor: disabled ? "not-allowed" : "text",
    transition: "border-color 120ms ease",
    ...style,
  };

  const helperStyle: CSSProperties = {
    fontSize: fontSize["label-sm"],
    lineHeight: `${lineHeight["label-sm"]}px`,
    color: disabled ? semantic.text.disabled : error ? semantic.feedback.error : semantic.text.secondary,
  };

  return (
    <div className={className} style={rootStyle}>
      <label htmlFor={fieldId} style={labelStyle}>
        {label}
      </label>
      <textarea
        id={fieldId}
        rows={rows}
        disabled={disabled}
        aria-invalid={error}
        aria-describedby={[ariaDescribedBy, helperCopy ? helperId : undefined].filter(Boolean).join(" ") || undefined}
        style={textareaStyle}
        onFocus={(e) => {
          setFocused(true);
          onFocus?.(e);
        }}
        onBlur={(e) => {
          setFocused(false);
          onBlur?.(e);
        }}
        {...rest}
      />
      {helperCopy ? (
        <span id={helperId} style={helperStyle}>
          {helperCopy}
        </span>
      ) : null}
    </div>
  );
}
