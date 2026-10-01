import { createElement } from "react";
import type { SVGProps } from "react";
import { iconNodes } from "./icons";

export type IconName = keyof typeof iconNodes;

/** Todos los nombres disponibles, en el orden del catálogo. */
export const iconNames = Object.keys(iconNodes) as IconName[];

export interface IconProps extends Omit<SVGProps<SVGSVGElement>, "name" | "children" | "width" | "height" | "viewBox" | "fill" | "stroke" | "color"> {
  /** Nombre del icono (glifo de Lucide). */
  name: IconName;
  /** Lado en px. Default: 20, el tamaño de los iconos en Figma. */
  size?: number;
  /** Color del trazo. Default: "currentColor" (hereda el color del texto). */
  color?: string;
  /** Texto accesible. Sin `title` el icono es decorativo y se oculta a los lectores de pantalla. */
  title?: string;
}

/**
 * Icon — icono de la librería. Dibuja un glifo de Lucide (ISC) como SVG en línea.
 * Sustituye al marcador que usaban las stories para QuickActionTile, StatItem y
 * TransactionListItem, y es el hueco natural de `statusIcon` en ProductCard.
 * Ver Icon.metadata.ts (incluye la tabla SF Symbols → Lucide).
 */
export function Icon({ name, size = 20, color = "currentColor", title, ...rest }: IconProps) {
  const nodes = iconNodes[name];
  const a11y = title ? { role: "img", "aria-label": title } : { "aria-hidden": true as const };
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      focusable="false"
      style={{ flexShrink: 0 }}
      {...a11y}
      {...rest}
    >
      {nodes.map(([tag, attrs], i) => createElement(tag, { key: i, ...attrs }))}
    </svg>
  );
}
