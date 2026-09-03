import { semantic, neutral, radius, fontSize, lineHeight } from "../../tokens";
import type { CSSProperties, InputHTMLAttributes } from "react";
import { useState } from "react";

export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  label: string;
  helperText?: string;
  error?: boolean;
  errorText?: string;
  disabled?: boolean;
  className?: string;
  containerStyle?: CSSProperties;
}

export function Input({
  label,
  helperText,
  error = false,
  errorText,
  disabled = false,
  className,
  containerStyle,
  style,
  onFocus,
  onBlur,
  ...rest
}: InputProps) {
  const [focused, setFocused] = useState(false);

  const borderColor = disabled
    ? semantic.border.default
    : error
      ? semantic.feedback.error
      : focused
        ? semantic.brand.primary
        : semantic.border.default;
  const borderWidth = !disabled && (focused || error) ? 2 : 1;

  const labelColor = disabled ? semantic.text.disabled : semantic.text.secondary;
  const valueColor = disabled ? semantic.text.disabled : semantic.text.primary;
  const fieldBg = disabled ? neutral["50"] : semantic.bg.surface;

  const helperColor = disabled
    ? semantic.text.disabled
    : error
      ? semantic.feedback.error
      : semantic.text.secondary;
  const helperCopy = error ? errorText ?? helperText : helperText;

  const rootStyle: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    gap: 6,
    width: "100%",
    ...containerStyle,
  };

  const labelStyle: CSSProperties = {
    fontSize: fontSize["label-sm"],
    lineHeight: `${lineHeight["label-sm"]}px`,
    fontWeight: 600,
    color: labelColor,
  };

  const fieldStyle: CSSProperties = {
    display: "flex",
    alignItems: "center",
    height: 48,
    padding: "12px 16px",
    borderRadius: radius.md,
    background: fieldBg,
    border: `${borderWidth}px solid ${borderColor}`,
    boxSizing: "border-box",
    transition: "border-color 120ms ease",
  };

  const inputStyle: CSSProperties = {
    flex: 1,
    border: "none",
    outline: "none",
    background: "transparent",
    fontSize: fontSize["body-md"],
    lineHeight: `${lineHeight["body-md"]}px`,
    color: valueColor,
    ...style,
  };

  const helperStyle: CSSProperties = {
    fontSize: fontSize["label-sm"],
    lineHeight: `${lineHeight["label-sm"]}px`,
    color: helperColor,
  };

  return (
    <label className={className} style={rootStyle}>
      <span style={labelStyle}>{label}</span>
      <span style={fieldStyle}>
        <input
          disabled={disabled}
          style={inputStyle}
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
      </span>
      {helperCopy ? <span style={helperStyle}>{helperCopy}</span> : null}
    </label>
  );
}
