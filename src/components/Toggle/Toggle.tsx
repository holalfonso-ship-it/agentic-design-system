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

  // Corregido en el Audit de la Fase 3 (2026-09-14, hallazgo 8): el
  // área táctil real era 51×31, por debajo del mínimo recomendado de
  // 44×44. Se separa el "hit target" (el <button>, ahora 51×44,
  // transparente) del track visual (el <span> de dentro, sigue siendo
  // 51×31 — mismo aspecto que antes). El knob se posiciona igual que
  // antes, solo que ahora relativo al track en vez de al botón.
  const hitStyle: CSSProperties = {
    position: "relative",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: TRACK_WIDTH,
    height: 44,
    padding: 0,
    border: "none",
    background: "transparent",
    cursor: disabled ? "not-allowed" : "pointer",
    ...style,
  };

  const trackStyle: CSSProperties = {
    position: "relative",
    display: "block",
    width: TRACK_WIDTH,
    height: TRACK_HEIGHT,
    borderRadius: radius.full,
    background: trackColor,
    border: disabled ? `1px solid ${semantic.border.default}` : "none",
    transition: "background-color 120ms ease",
    boxSizing: "border-box",
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
      style={hitStyle}
      {...rest}
    >
      <span style={trackStyle}>
        <span style={knobStyle} />
      </span>
    </button>
  );
}
