import { semantic, neutral, radius, fontSize, lineHeight, space, fontWeight } from "../../tokens";
import type { CSSProperties, InputHTMLAttributes } from "react";
import { useId, useState } from "react";

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
  id,
  "aria-describedby": ariaDescribedBy,
  onFocus,
  onBlur,
  ...rest
}: InputProps) {
  const [focused, setFocused] = useState(false);
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const helperId = `${inputId}-helper`;

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
    gap: 6, // fuera de la escala space.* (valor de Figma sin variable)
    width: "100%",
    ...containerStyle,
  };

  const labelStyle: CSSProperties = {
    fontSize: fontSize["label-sm"],
    lineHeight: `${lineHeight["label-sm"]}px`,
    fontWeight: fontWeight.semibold,
    color: labelColor,
  };

  const fieldStyle: CSSProperties = {
    display: "flex",
    alignItems: "center",
    height: 48,
    padding: `${space["12"]}px ${space["16"]}px`,
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
    <div className={className} style={rootStyle}>
      {/* Compose Ciclo 2 (2026-10-01, hallazgo 12): el texto de ayuda/error ya
          NO vive dentro del <label>, así que el nombre accesible del campo es
          solo `label`; el texto de ayuda se asocia con aria-describedby. */}
      <label htmlFor={inputId} style={labelStyle}>
        {label}
      </label>
      <span style={fieldStyle}>
        <input
          id={inputId}
          aria-describedby={[ariaDescribedBy, helperCopy ? helperId : undefined].filter(Boolean).join(" ") || undefined}
          disabled={disabled}
          style={inputStyle}
          // aria-invalid añadido en el Compose de la Fase 3 (2026-09-14,
          // hallazgo 8 del Audit) — antes el estado de error solo se
          // comunicaba visualmente (borde/texto rojo), sin señal para
          // lectores de pantalla.
          aria-invalid={error}
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
      {helperCopy ? (
        <span id={helperId} style={helperStyle}>
          {helperCopy}
        </span>
      ) : null}
    </div>
  );
}
