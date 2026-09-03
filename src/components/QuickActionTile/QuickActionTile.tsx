import { semantic, labels, radius, fontSize, lineHeight, fontFamily } from "../../tokens";
import type { CSSProperties, ReactNode } from "react";

export interface QuickActionTileProps {
  icon: ReactNode;
  title?: string;
  subtitle?: string;
  className?: string;
  style?: CSSProperties;
}

/**
 * QuickActionTile — tile de acción rápida para la fila de acciones del
 * home. Corresponde al componente "Quick Action Tile" publicado en la
 * librería Figma "Alfonso_Zamorano_Task_IDFinance" (AID). Ver
 * QuickActionTile.metadata.ts.
 *
 * La prop `icon` es obligatoria y no tiene valor por defecto: en Figma es
 * intercambiable por cualquier icono circular estilo SF Symbol y el
 * asset del nodo por defecto no se pudo descargar en esta sesión (ver
 * metadata) — el consumidor debe pasar siempre un icono.
 */
export function QuickActionTile({
  icon,
  title = "Transferencias",
  subtitle = "Feb · Mar · Abr · May",
  className,
  style,
}: QuickActionTileProps) {
  const finalStyle: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    gap: 16,
    alignItems: "flex-start",
    width: 170,
    height: 100,
    padding: 14,
    borderRadius: radius.lg,
    border: `1px solid ${semantic.border.default}`,
    background: semantic.bg.default,
    fontFamily: fontFamily.base,
    boxSizing: "border-box",
    ...style,
  };

  return (
    <div className={className} style={finalStyle}>
      <div style={{ width: 20, height: 20, display: "flex", alignItems: "center", justifyContent: "center" }}>
        {icon}
      </div>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 0 }}>
        <p
          style={{
            margin: 0,
            fontFamily: fontFamily.base,
            fontSize: fontSize["body-lg"],
            lineHeight: `${lineHeight["body-lg"]}px`,
            fontWeight: 400,
            color: labels.primary,
            whiteSpace: "nowrap",
          }}
        >
          {title}
        </p>
        <p
          style={{
            margin: 0,
            fontFamily: fontFamily.base,
            fontSize: fontSize["label-sm"],
            lineHeight: `${lineHeight["label-sm"]}px`,
            fontWeight: 500,
            color: semantic.text.disabled,
            whiteSpace: "nowrap",
          }}
        >
          {subtitle}
        </p>
      </div>
    </div>
  );
}
