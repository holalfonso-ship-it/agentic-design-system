import { semantic, fontSize, lineHeight, fontFamily } from "../../tokens";
import type { CSSProperties, ReactNode } from "react";

export interface StatItemProps {
  icon: ReactNode;
  label?: string;
  amount?: string;
  className?: string;
  style?: CSSProperties;
}

/**
 * StatItem — bloque de estadística pequeño para la fila de resumen de
 * balance del home (Balance total / Total Gastos). Corresponde al
 * componente "Stat Item" publicado en la librería Figma
 * "Alfonso_Zamorano_Task_IDFinance" (AID). Ver StatItem.metadata.ts.
 *
 * La prop `icon` es obligatoria y no tiene valor por defecto: en Figma
 * se intercambia entre arrow.up.right.circle.fill / arrow.down.left.circle.fill
 * según la dirección del balance, y el asset del nodo por defecto no se
 * pudo descargar en esta sesión (ver metadata).
 */
export function StatItem({
  icon,
  label = "Balance total",
  amount = "€7.783,00",
  className,
  style,
}: StatItemProps) {
  const finalStyle: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    gap: 9,
    alignItems: "flex-start",
    width: 138,
    fontFamily: fontFamily.base,
    ...style,
  };

  return (
    <div className={className} style={finalStyle}>
      <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
        <div style={{ width: 20, height: 20, display: "flex", alignItems: "center", justifyContent: "center" }}>
          {icon}
        </div>
        <p
          style={{
            margin: 0,
            fontFamily: fontFamily.base,
            fontSize: fontSize["label-md"],
            lineHeight: `${lineHeight["label-md"]}px`,
            fontWeight: 500,
            color: semantic.text.secondary,
            whiteSpace: "nowrap",
          }}
        >
          {label}
        </p>
      </div>
      <p
        style={{
          margin: 0,
          fontFamily: fontFamily.base,
          fontSize: fontSize["heading-lg"],
          lineHeight: `${lineHeight["heading-lg"]}px`,
          fontWeight: 600,
          color: semantic.text.secondary,
          whiteSpace: "nowrap",
        }}
      >
        {amount}
      </p>
    </div>
  );
}
