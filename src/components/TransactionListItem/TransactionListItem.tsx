import { fontSize, fontFamily, semantic } from "../../tokens";
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

  // Corregido en el Audit de la Fase 3 (2026-09-14): el fondo circular
  // "#EEF1F5" no existía en ningún token ni en el nodo real de Figma —
  // el component set real "Transaction List Item" (76:91) no tiene
  // ningún fondo detrás del icono, solo el icono a tamaño natural
  // (44x44). Se quita el círculo de fondo en vez de tokenizarlo, para
  // no inventar un valor que Figma no tiene.
  const iconWrap: CSSProperties = {
    width: 44,
    height: 44,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  };

  // Colores corregidos en el Audit de la Fase 3 (2026-09-14) contra el
  // component set real "Transaction List Item" (76:91), vía
  // get_design_context: el título usa semantic/text/primary (no el
  // "#1A1C24" hardcodeado que había, aunque el tono era parecido), el
  // texto secundario usa semantic/text/secondary (no el gris "#8A8E9C"
  // que había, que no correspondía a ningún token real), y el monto usa
  // semantic/feedback/success en verde para "in" y semantic/feedback/error
  // en rojo para "out" — el código anterior no coloreaba "out" en
  // absoluto (usaba el mismo negro que "in").
  const info: CSSProperties = { display: "flex", flexDirection: "column", flex: 1, minWidth: 0 };
  const merchantStyle: CSSProperties = {
    fontSize: fontSize["body-md"],
    fontWeight: 600,
    color: semantic.text.primary,
    margin: 0,
  };
  const metaStyle: CSSProperties = {
    fontSize: fontSize.caption,
    color: semantic.text.secondary,
    margin: 0,
  };
  const amountStyle: CSSProperties = {
    fontSize: fontSize["body-md"],
    fontWeight: 600,
    color: direction === "in" ? semantic.feedback.success : semantic.feedback.error,
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
