import { semantic, semanticAction, neutral, radius, fontSize, lineHeight, space, fontWeight } from "../../tokens";
import type { CSSProperties, InputHTMLAttributes } from "react";
import { useId, useState } from "react";

export interface SliderProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "size"> {
  label: string;
  helperText?: string;
  showValue?: boolean;
  formatValue?: (value: number) => string;
  disabled?: boolean;
  className?: string;
  containerStyle?: CSSProperties;
}

const THUMB = 24;

/**
 * Slider — selector de un valor dentro de un rango, con label, valor visible y
 * helper text. Diseñado en Figma (component set 235:163, página "02. Components").
 * Usa un <input type="range"> nativo (invisible, ocupando toda el área táctil de
 * 44px) para conservar ratón, táctil y teclado (flechas, Inicio, Fin, Re Pág);
 * la pista, el relleno y el pulgar se dibujan encima con los tokens.
 */
export function Slider({
  label,
  helperText,
  showValue = true,
  formatValue,
  disabled = false,
  className,
  containerStyle,
  style,
  id,
  min = 0,
  max = 100,
  step = 1,
  value,
  defaultValue,
  onChange,
  onFocus,
  onBlur,
  "aria-describedby": ariaDescribedBy,
  ...rest
}: SliderProps) {
  const [focused, setFocused] = useState(false);
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const helperId = `${inputId}-helper`;

  const lo = Number(min);
  const hi = Number(max);
  const [inner, setInner] = useState<number>(Number(defaultValue ?? lo));
  const current = Number(value ?? inner);
  const ratio = hi === lo ? 0 : Math.min(1, Math.max(0, (current - lo) / (hi - lo)));
  const shown = formatValue ? formatValue(current) : String(current);

  const rootStyle: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    gap: space["6"],
    width: "100%",
    ...containerStyle,
  };

  const headerStyle: CSSProperties = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    fontSize: fontSize["label-sm"],
    lineHeight: `${lineHeight["label-sm"]}px`,
  };

  const labelStyle: CSSProperties = {
    fontWeight: disabled ? fontWeight.semibold : fontWeight.medium,
    color: disabled ? semantic.text.disabled : semantic.text.secondary,
  };

  const valueStyle: CSSProperties = {
    fontWeight: fontWeight.medium,
    color: disabled ? semantic.text.disabled : semantic.text.primary,
  };

  const areaStyle: CSSProperties = { position: "relative", height: 44 };

  const trackStyle: CSSProperties = {
    position: "absolute",
    left: 0,
    right: 0,
    top: 20,
    height: 4,
    borderRadius: radius.full,
    background: disabled ? neutral["50"] : neutral["300"],
  };

  const fillStyle: CSSProperties = {
    position: "absolute",
    left: 0,
    top: 20,
    height: 4,
    width: `calc((100% - ${THUMB}px) * ${ratio} + ${THUMB / 2}px)`,
    borderRadius: radius.full,
    background: disabled ? semantic.border.default : semanticAction.primary.bg.default,
  };

  const thumbStyle: CSSProperties = {
    position: "absolute",
    top: 10,
    left: `calc((100% - ${THUMB}px) * ${ratio})`,
    width: THUMB,
    height: THUMB,
    boxSizing: "border-box",
    borderRadius: radius.full,
    background: disabled ? neutral["50"] : semanticAction.primary.bg.default,
    border: `2px solid ${disabled ? semantic.border.default : semantic.bg.surface}`,
  };

  const ringStyle: CSSProperties = {
    position: "absolute",
    top: 6,
    left: `calc((100% - ${THUMB}px) * ${ratio} - 4px)`,
    width: THUMB + 8,
    height: THUMB + 8,
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
    cursor: disabled ? "not-allowed" : "pointer",
    ...style,
  };

  const helperStyle: CSSProperties = {
    fontSize: fontSize["label-sm"],
    lineHeight: `${lineHeight["label-sm"]}px`,
    color: disabled ? semantic.text.disabled : semantic.text.secondary,
  };

  return (
    <div className={className} style={rootStyle}>
      <div style={headerStyle}>
        <label htmlFor={inputId} style={labelStyle}>
          {label}
        </label>
        {showValue ? (
          <span aria-hidden="true" style={valueStyle}>
            {shown}
          </span>
        ) : null}
      </div>
      <div style={areaStyle}>
        <span aria-hidden="true" style={trackStyle} />
        <span aria-hidden="true" style={fillStyle} />
        <span aria-hidden="true" style={ringStyle} />
        <span aria-hidden="true" style={thumbStyle} />
        <input
          id={inputId}
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          defaultValue={defaultValue}
          disabled={disabled}
          aria-valuetext={formatValue ? shown : undefined}
          aria-describedby={[ariaDescribedBy, helperText ? helperId : undefined].filter(Boolean).join(" ") || undefined}
          style={inputStyle}
          onChange={(e) => {
            setInner(Number(e.target.value));
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
      </div>
      {helperText ? (
        <span id={helperId} style={helperStyle}>
          {helperText}
        </span>
      ) : null}
    </div>
  );
}
