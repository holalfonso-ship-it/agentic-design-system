import { fontSize, fontFamily } from "../../tokens";
import type { CSSProperties, ReactNode } from "react";

export interface TransactionListItemProps {
  icon?: ReactNode;
  merchant: string;
  category?: string;
  amount: string;
  direction?: "in" | "out";
  timestamp?: string;
}

/**
 * TransactionListItem — fila de una transacción en el historial de
 * movimientos. Corresponde al component set "Transaction List Item" en
 * la librería Figma AID. Ver TransactionListItem.metadata.ts.
 */
export function TransactionListItem({
  icon,
  merchant,
  category,
  amount,
  direction = "out",
  timestamp,
}: TransactionListItemProps) {
  const row: CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: 12,
    padding: "12px 4px",
    fontFamily: fontFamily.base,
  };

  const iconWrap: CSSProperties = {
    width: 40,
    height: 40,
    borderRadius: 999,
    background: "#EEF1F5",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  };

  const info: CSSProperties = { display: "flex", flexDirection: "column", flex: 1, minWidth: 0 };
  const merchantStyle: CSSProperties = {
    fontSize: fontSize["body-md"],
    fontWeight: 600,
    color: "#1A1C24",
    margin: 0,
  };
  const metaStyle: CSSProperties = {
    fontSize: fontSize.caption,
    color: "#8A8E9C",
    margin: 0,
  };
  const amountStyle: CSSProperties = {
    fontSize: fontSize["body-md"],
    fontWeight: 600,
    color: direction === "in" ? "#1F8A4C" : "#1A1C24",
  };

  return (
    <div style={row}>
      <div style={iconWrap}>{icon}</div>
      <div style={info}>
        <p style={merchantStyle}>{merchant}</p>
        {category || timestamp ? (
          <p style={metaStyle}>{[category, timestamp].filter(Boolean).join(" · ")}</p>
        ) : null}
      </div>
      <span style={amountStyle}>
        {direction === "in" ? "+" : "−"}
        {amount}
      </span>
    </div>
  );
}
