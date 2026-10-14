import { semantic, semanticAction, neutral, radius, space, fontSize, lineHeight } from "../../tokens";
import type { CSSProperties, InputHTMLAttributes } from "react";
import { useEffect, useRef, useState } from "react";

export interface RadioProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "size"> {
  label: string;
  error?: boolean;
  disabled?: boolean;
  className?: string;
  containerStyle?: CSSProperties;
}

const CIRCLE = 24;
const DOT = 12;

/**
 * Radio — opción única dentro de un grupo, con label. Diseñado en Figma
 * (component set 232:282, página "02. Components"). Usa un <input type="radio">
 * nativo (invisible) para que el agrupado por `name`, las flechas del teclado y
 * los lectores de pantalla funcionen sin código extra. `error` es solo visual:
 * aria-invalid no está permitido en role=radio, así que el mensaje de error del grupo
 * debe ir en texto y asociarse al <fieldset> con aria-describedby. Un grupo se forma con
 * varios Radio que comparten `name`, dentro de un <fieldset><legend>.
 */
export function Radio({
  label,
  error = false,
  disabled = false,
  className,
  containerStyle,
  style,
  onFocus,
  onBlur,
  checked,
  defaultChecked,
  ...rest
}: RadioProps) {
  const [focused, setFocused] = useState(false);
  const ref = useRef<HTMLInputElement>(null);
  // Para pintar el punto hace falta saber si está marcado. En un grupo sin control, al
  // elegir otro Radio este no recibe evento propio, así que se resincroniza con el
  // estado real del input nativo cada vez que cambia cualquier control del documento.
  const [innerChecked, setInnerChecked] = useState(Boolean(defaultChecked));
  useEffect(() => {
    const sync = () => setInnerChecked(ref.current?.checked ?? false);
    sync();
    document.addEventListener("change", sync);
    return () => document.removeEventListener("change", sync);
  }, []);
  const isChecked = checked ?? innerChecked;

  const stroke = disabled
    ? semantic.border.default
    : error
      ? semantic.feedback.error
      : isChecked
        ? semanticAction.primary.bg.default
        : semantic.border.strong;
  const dot = disabled
    ? semantic.text.disabled
    : error
      ? semantic.feedback.error
      : semanticAction.primary.bg.default;

  const rootStyle: CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    gap: space["12"],
    minHeight: 44,
    cursor: disabled ? "not-allowed" : "pointer",
    ...containerStyle,
  };

  const circleStyle: CSSProperties = {
    position: "relative",
    flexShrink: 0,
    width: CIRCLE,
    height: CIRCLE,
    boxSizing: "border-box",
    borderRadius: radius.full,
    background: disabled ? neutral["50"] : semantic.bg.surface,
    border: `2px solid ${stroke}`,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "border-color 120ms ease",
  };

  const ringStyle: CSSProperties = {
    position: "absolute",
    top: -6,
    left: -6,
    width: CIRCLE + 8,
    height: CIRCLE + 8,
    boxSizing: "border-box",
    borderRadius: radius.full,
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
      <span style={circleStyle}>
        <input
          ref={ref}
          type="radio"
          checked={checked}
          defaultChecked={defaultChecked}
          disabled={disabled}
          style={inputStyle}
          {...rest}
          onFocus={(e) => {
            setFocused(true);
            onFocus?.(e);
          }}
          onBlur={(e) => {
            setFocused(false);
            onBlur?.(e);
          }}
        />
        <span aria-hidden="true" style={ringStyle} />
        {isChecked ? (
          <span
            aria-hidden="true"
            style={{ width: DOT, height: DOT, borderRadius: radius.full, background: dot, pointerEvents: "none" }}
          />
        ) : null}
      </span>
      <span style={labelStyle}>{label}</span>
    </label>
  );
}
