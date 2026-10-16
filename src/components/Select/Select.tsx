import { semantic, neutral, radius, fontSize, lineHeight, space, fontWeight } from "../../tokens";
import type { CSSProperties, SelectHTMLAttributes } from "react";
import { useId, useState } from "react";
import { Icon } from "../Icon";

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps
  extends Omit<SelectHTMLAttributes<HTMLSelectElement>, "size" | "children"> {
  label: string;
  options: readonly SelectOption[];
  placeholder?: string;
  helperText?: string;
  error?: boolean;
  errorText?: string;
  disabled?: boolean;
  className?: string;
  containerStyle?: CSSProperties;
}

// Chevron: instancia de Icon «chevron-down» de 20 px (a ese tamaño su geometría es 10×5,
// la del Figma). Su centro queda a 12 px del borde derecho, como en el diseño.
const CHEVRON = 20;
const CHEVRON_RIGHT = space["12"] - 5;

/**
 * Select — lista desplegable de una sola elección con label y helper text.
 * Diseñado en Figma (component set 232:390, página "02. Components") con la
 * misma estructura Label / Field / Helper que Input. Envuelve un <select>
 * nativo: así el desplegable, el teclado y el móvil los resuelve el navegador.
 * El estado "open" del diseño lo pinta el propio navegador; el componente solo
 * cuida el campo cerrado. Por eso no hay un Select Option propio: las opciones
 * se pasan como datos en `options`.
 */
export function Select({
  label,
  options,
  placeholder,
  helperText,
  error = false,
  errorText,
  disabled = false,
  className,
  containerStyle,
  style,
  id,
  value,
  defaultValue,
  "aria-describedby": ariaDescribedBy,
  onFocus,
  onBlur,
  onChange,
  ...rest
}: SelectProps) {
  const [picked, setPicked] = useState<string | undefined>(
    defaultValue === undefined ? undefined : String(defaultValue),
  );
  const [focused, setFocused] = useState(false);
  const generatedId = useId();
  const selectId = id ?? generatedId;
  const helperId = `${selectId}-helper`;

  const borderColor = disabled
    ? semantic.border.default
    : error
      ? semantic.feedback.error
      : focused
        ? semantic.brand.primary
        : semantic.border.strong;
  const borderWidth = !disabled && (focused || error) ? 2 : 1;

  const helperCopy = error ? errorText ?? helperText : helperText;
  const hasPlaceholder = placeholder !== undefined;
  // El placeholder solo es un <option value=""> deshabilitado; se pinta en gris mientras no haya valor.
  const current = value ?? picked;
  const showingPlaceholder = hasPlaceholder && (current === undefined || current === "");

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

  const fieldStyle: CSSProperties = {
    position: "relative",
    display: "flex",
    alignItems: "center",
    height: 44,
    borderRadius: radius.sm,
    background: disabled ? neutral["50"] : semantic.bg.surface,
    border: `${borderWidth}px solid ${borderColor}`,
    boxSizing: "border-box",
    transition: "border-color 120ms ease",
  };

  const selectStyle: CSSProperties = {
    appearance: "none",
    WebkitAppearance: "none",
    flex: 1,
    width: "100%",
    height: "100%",
    border: "none",
    outline: "none",
    background: "transparent",
    padding: `0 ${CHEVRON_RIGHT + CHEVRON + space["12"]}px 0 ${space["12"]}px`,
    fontSize: fontSize["body-md"],
    lineHeight: `${lineHeight["body-md"]}px`,
    color: disabled
      ? semantic.text.disabled
      : showingPlaceholder
        ? semantic.text.secondary
        : semantic.text.primary,
    cursor: disabled ? "not-allowed" : "pointer",
    ...style,
  };

  const helperStyle: CSSProperties = {
    fontSize: fontSize["label-sm"],
    lineHeight: `${lineHeight["label-sm"]}px`,
    color: disabled ? semantic.text.disabled : error ? semantic.feedback.error : semantic.text.secondary,
  };

  return (
    <div className={className} style={rootStyle}>
      <label htmlFor={selectId} style={labelStyle}>
        {label}
      </label>
      <span style={fieldStyle}>
        <select
          id={selectId}
          value={value}
          defaultValue={hasPlaceholder && value === undefined && defaultValue === undefined ? "" : defaultValue}
          disabled={disabled}
          aria-invalid={error}
          aria-describedby={[ariaDescribedBy, helperCopy ? helperId : undefined].filter(Boolean).join(" ") || undefined}
          style={selectStyle}
          onChange={(e) => {
            setPicked(e.target.value);
            onChange?.(e);
          }}
          onFocus={(e) => {
            setFocused(true);
            onFocus?.(e);
          }}
          onBlur={(e) => {
            setFocused(false);
            onBlur?.(e);
          }}
          {...rest}
        >
          {hasPlaceholder ? (
            <option value="" disabled>
              {placeholder}
            </option>
          ) : null}
          {options.map((o) => (
            <option key={o.value} value={o.value} disabled={o.disabled}>
              {o.label}
            </option>
          ))}
        </select>
        <Icon
          name="chevron-down"
          size={CHEVRON}
          color={disabled ? semantic.text.disabled : semantic.text.primary}
          style={{ position: "absolute", right: CHEVRON_RIGHT, pointerEvents: "none" }}
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
