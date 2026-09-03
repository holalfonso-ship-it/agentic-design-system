import { semanticAction, semantic, neutral, radius } from "../../tokens";
import type { CSSProperties } from "react";

export interface ToggleProps {
  checked: boolean;
  disabled?: boolean;
  onChange?: (checked: boolean) => void;
  "aria-label"?: string;
  className?: string;
  style?: CSSProperties;
}

const TRACK_WIDTH = 51;
const TRACK_HEIGHT = 31;
const INSET = 2;
const KNOB_SIZE = TRACK_HEIGHT - INSET * 2;

/**
 * Toggle — switch on/off de una sola pieza (track + knob), sin label
 * propio: el label va fuera, a cargo de quien lo consume. Corresponde
 * al componente "Toggle" diseñado directamente en Figma en la Fase 2
 * (2026-09-03, component set 159:119), construido con el agente de
 * Figma (skill figma-generate-library) a partir de las variables reales
 * del archivo — no extraído de un diseño preexistente, porque no
 * existía ninguno. Ver Toggle.metadata.ts, incluida la nota sobre por
 * qué todavía no tiene `figma.componentKey`.
 */
export function Toggle({
  checked,
  disabled = false,
  onChange,
  className,
  style,
  ...rest
}: ToggleProps) {
  const trackColor = disabled
    ? checked
      ? semanticAction.primary.bg.disabled
      : semantic.border.default // mismo token que el off-disabled real en Figma (semantic/border/default → neutral/100)
    : checked
      ? semanticAction.primary.bg.default
      : neutral["300"];

  const trackStyle: CSSProperties = {
    position: "relative",
    display: "inline-block",
    width: TRACK_WIDTH,
    height: TRACK_HEIGHT,
    borderRadius: radius.full,
    background: trackColor,
    border: disabled ? `1px solid ${semantic.border.default}` : "none",
    padding: 0,
    cursor: disabled ? "not-allowed" : "pointer",
    transition: "background-color 120ms ease",
    boxSizing: "border-box",
    ...style,
  };

  const knobStyle: CSSProperties = {
    position: "absolute",
    top: INSET,
    left: checked ? TRACK_WIDTH - INSET - KNOB_SIZE : INSET,
    width: KNOB_SIZE,
    height: KNOB_SIZE,
    borderRadius: radius.full,
    background: semantic.bg.surface,
    transition: "left 120ms ease",
  };

  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={() => onChange?.(!checked)}
      className={className}
      style={trackStyle}
      {...rest}
    >
      <span style={knobStyle} />
    </button>
  );
}
