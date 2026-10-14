import { semantic, semanticAction, neutral, radius, space, fontSize, lineHeight } from "../../tokens";
import type { CSSProperties, InputHTMLAttributes } from "react";
import { useEffect, useRef, useState } from "react";

export interface CheckboxProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "size"> {
  label: string;
  indeterminate?: boolean;
  error?: boolean;
  disabled?: boolean;
  className?: string;
  containerStyle?: CSSProperties;
}

const BOX = 24;

/**
 * Checkbox — casilla con label. Diseñado en Figma (component set 231:168,
 * página "02. Components") antes que el código. Usa un <input type="checkbox">
 * nativo (invisible, ocupando la casilla) para conservar teclado, formulario y
 * lectores de pantalla; la casilla visual se dibuja encima.
 */
export function Checkbox({
  label,
  indeterminate = false,
  error = false,
  disabled = false,
  className,
  containerStyle,
  style,
  checked,
  defaultChecked,
  onChange,
  onFocus,
  onBlur,
  ...rest
}: CheckboxProps) {
  const ref = useRef<HTMLInputElement>(null);
  const [focused, setFocused] = useState(false);
  const [inner, setInner] = useState(defaultChecked ?? false);
  const isChecked = checked ?? inner;
  const filled = isChecked || indeterminate;

  useEffect(() => {
    if (ref.current) ref.current.indeterminate = indeterminate;
  }, [indeterminate]);

  const stroke = disabled
    ? semantic.border.default
    : error
      ? semantic.feedback.error
      : filled
        ? semanticAction.primary.bg.default
        : semantic.border.strong;
  const fill = disabled
    ? neutral["50"]
    : filled
      ? error
        ? semantic.feedback.error
        : semanticAction.primary.bg.default
      : semantic.bg.surface;
  const glyph = disabled ? semantic.text.disabled : semanticAction.primary.text.default;

  const rootStyle: CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    gap: space["12"],
    minHeight: 44,
    cursor: disabled ? "not-allowed" : "pointer",
    ...containerStyle,
  };

  const boxStyle: CSSProperties = {
    position: "relative",
    flexShrink: 0,
    width: BOX,
    height: BOX,
    boxSizing: "border-box",
    borderRadius: radius.xs,
    background: fill,
    border: `2px solid ${stroke}`,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "background-color 120ms ease, border-color 120ms ease",
  };

  const ringStyle: CSSProperties = {
    position: "absolute",
    top: -6,
    left: -6,
    width: BOX + 8,
    height: BOX + 8,
    boxSizing: "border-box",
    borderRadius: radius.sm,
    border: `2px solid ${semantic.brand.primary}`,
    pointerEvents: "none",
    display: focused && !disabled ? "block" : "none",
  };

  const inputStyle: CSSProperties = {
    position: "absolute",
    inset: 0,
    width: "100%",
    height: "100%",
    margin: 0,
    opacity: 0,
    cursor: "inherit",
    ...style,
  };

  const labelStyle: CSSProperties = {
    fontSize: fontSize["body-md"],
    lineHeight: `${lineHeight["body-md"]}px`,
    color: disabled ? semantic.text.disabled : semantic.text.primary,
  };

  return (
    <label className={className} style={rootStyle}>
      <span style={boxStyle}>
        <input
          ref={ref}
          type="checkbox"
          checked={checked}
          defaultChecked={defaultChecked}
          disabled={disabled}
          aria-invalid={error || undefined}
          style={inputStyle}
          onChange={(e) => {
            setInner(e.target.checked);
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
        />
        <span aria-hidden="true" style={ringStyle} />
        {filled ? (
          <svg aria-hidden="true" width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ pointerEvents: "none" }}>
            <path
              d={indeterminate ? "M3 7H11" : "M2.5 7.5L5.5 10.5L11.5 3.5"}
              stroke={glyph}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        ) : null}
      </span>
      <span style={labelStyle}>{label}</span>
    </label>
  );
}
