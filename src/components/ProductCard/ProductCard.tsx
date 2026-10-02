import {
  card,
  semantic,
  sunflower,
  radius,
  fontSize,
  lineHeight,
  fontFamily,
  space,
  fontWeight,
} from "../../tokens";
import { Button } from "../Button";
import { Icon } from "../Icon";
import type { CSSProperties, ReactNode } from "react";

export type ProductCardProduct = "bnpl" | "credit";
export type ProductCardState = "active" | "frozen" | "blocked";
export type ProductCardSide = "front" | "back";

export interface ProductCardAction {
  label: string;
  onClick?: () => void;
}

export interface ProductCardProps {
  product: ProductCardProduct;
  /** Estado del producto — no un producto en sí. Default: "active". */
  state?: ProductCardState;
  /** Cara de la tarjeta: "front" (número y titular) o "back" (saldo y acciones). Default: "front". */
  side?: ProductCardSide;
  /** Front: últimos dígitos; se muestra como «···· ···· ···· ···· 4289». */
  cardNumber?: string;
  /** Front: nombre del titular. */
  holderName?: string;
  /** Front: logo de la red de pago (48×48). Si no se pasa, se dibuja el logo de Figma. */
  logo?: ReactNode;
  /** Icono de estado (16×16) junto a la etiqueta del producto. Si no se pasa, un candado (`Icon lock`) en "blocked". */
  statusIcon?: ReactNode;
  /** Back: importe principal, p. ej. «€3.500,00». */
  balance?: string;
  /** Back: texto bajo el importe, p. ej. «de €3.800,00 disponibles». */
  balanceCaption?: string;
  /** Back: progreso de uso, de 0 a 1. */
  progress?: number;
  /** Back: acción principal (en Figma, «Ver movimientos»). Se deshabilita sola si el estado no es "active". */
  primaryAction?: ProductCardAction;
  /** Back: acción secundaria (en Figma, «Congelar tarjeta», «Descongelar tarjeta» o «Contactar soporte»). */
  secondaryAction?: ProductCardAction;
}

const productLabel: Record<ProductCardProduct, string> = {
  bnpl: "BNPL",
  credit: "Crédito",
};

const stateLabel: Record<Exclude<ProductCardState, "active">, string> = {
  frozen: "congelada",
  blocked: "bloqueada",
};

/**
 * ProductCard — tarjeta física de un producto financiero (BNPL o crédito), con
 * un estado independiente del producto (activo, congelado o bloqueado) y dos
 * caras. Corresponde al component set real "Product Card" (38:176) en la
 * librería Figma "Aida": `product = credit | bnpl` × `state = active | frozen |
 * blocked` × `Side = Front | Back` (12 variantes). Ver ProductCard.metadata.ts.
 *
 * Reconstruido en el Ciclo ARC 3 (2026-10-01, hallazgo 15): hasta entonces era
 * un bloque de texto (eyebrow + título + subtítulo + importe) que no existía en
 * Figma. Es un breaking change de la API pública, asumido porque el repo no
 * tiene consumidores externos todavía.
 */
export function ProductCard({
  product,
  state = "active",
  side = "front",
  cardNumber,
  holderName,
  logo,
  statusIcon,
  balance,
  balanceCaption,
  progress,
  primaryAction,
  secondaryAction,
}: ProductCardProps) {
  // "frozen" y "blocked" comparten bg/text (confirmado sobre los nodos reales
  // 46:30 y 46:68): solo "active" usa la paleta propia del producto.
  const palette = state === "active" ? card[product] : card.frozen;
  const isFront = side === "front";
  const faded = state !== "active"; // los efectos decorativos bajan al 40 % fuera de "active"

  // Figma: borde error de 2 px en la cara frontal y de 1,5 px en la trasera; sin borde si no es "blocked".
  const border = state === "blocked" ? `${isFront ? 2 : 1.5}px solid ${semantic.feedback.error}` : "none";

  const containerStyle: CSSProperties = {
    position: "relative",
    overflow: "hidden",
    boxSizing: "border-box",
    width: 343,
    maxWidth: "100%",
    // La cara frontal tiene altura fija (232) y reparte el contenido arriba/abajo;
    // la trasera crece con su contenido (232 en active/frozen, 295 en blocked).
    ...(isFront ? { height: 232, justifyContent: "space-between" } : {}),
    display: "flex",
    flexDirection: "column",
    gap: space["16"],
    padding: space["24"],
    borderRadius: radius.md,
    background: palette.bg,
    border,
    color: palette.text,
    fontFamily: fontFamily.base,
  };

  const labelStyle: CSSProperties = {
    fontSize: fontSize["label-md"],
    lineHeight: `${lineHeight["label-md"]}px`,
    fontWeight: fontWeight.medium,
  };

  // Figma: el status-badge («icon-placeholder», una elipse) solo se ve en "blocked"; en frozen
  // es blanco sobre blanco, un aro gris o no existe, según producto y cara. El hueco por defecto
  // es un candado de Icon. Si el consumidor pasa su propio icono, se muestra en cualquier estado
  // distinto de "active".
  const showStatus = state === "blocked" || (statusIcon !== undefined && state !== "active");
  const statusColor = state === "blocked" ? semantic.feedback.error : palette.text;
  const status = showStatus ? (
    <span style={{ display: "inline-flex", alignItems: "center", flexShrink: 0 }} aria-hidden="true">
      {statusIcon ?? <Icon name="lock" size={16} color={statusColor} />}
    </span>
  ) : null;

  const header = (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flex: 1,
        minWidth: 0,
      }}
    >
      <span style={labelStyle}>{productLabel[product]}</span>
      {status}
    </div>
  );

  const groupLabel =
    state === "active"
      ? `${productLabel[product]}, ${isFront ? "cara frontal" : "cara trasera"}`
      : `${productLabel[product]} ${stateLabel[state]}, ${isFront ? "cara frontal" : "cara trasera"}`;

  if (isFront) {
    const glowColor = card.glow[product];
    const decoration: CSSProperties = {
      position: "absolute",
      pointerEvents: "none",
      overflow: "visible",
      opacity: faded ? 0.4 : 1,
    };
    return (
      <div role="group" aria-label={groupLabel} style={containerStyle}>
        {/* Mancha de color difuminada (nodo «Effect» 41:985, girado 180° en Figma: queda
            arriba a la izquierda). Figma añade además un ruido (feTurbulence) que no se reproduce. */}
        <svg
          aria-hidden="true"
          width={270}
          height={125}
          viewBox="0 0 270 125"
          style={{ ...decoration, left: 0, top: 0, transform: "rotate(180deg)", filter: "blur(52px)" }}
        >
          <path
            d="M117.691 124.838C70.5902 124.838 28.402 103.808 0 70.6269L0 20C0 8.95431 8.95436 0 20 0L269.638 0C255.66 71.1579 192.946 124.838 117.691 124.838Z"
            fill={glowColor}
          />
        </svg>
        <div style={{ display: "flex", alignItems: "center", gap: space["16"] }}>
          {header}
          <div style={{ width: 48, height: 48, flexShrink: 0 }}>{logo ?? <CardLogo faint={state !== "active"} />}</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: space["16"] }}>
          {cardNumber ? (
            <p
              style={{
                margin: 0,
                fontSize: fontSize["display-xl"],
                lineHeight: `${fontSize["display-xl"]}px`, // Figma: 32/32 (no la 32/40 de Display/XL)
                whiteSpace: "nowrap",
              }}
            >
              {/* Figma: puntos en Black 32 y dígitos en Light 24 (texto con estilos mezclados). */}
              <span style={{ fontWeight: fontWeight.black }}>···· ···· ···· ····</span>
              <span style={{ fontSize: fontSize["heading-lg"], fontWeight: fontWeight.light }}>{` ${cardNumber}`}</span>
            </p>
          ) : null}
          {holderName ? (
            <p
              style={{
                margin: 0,
                fontSize: fontSize["body-lg"],
                lineHeight: `${lineHeight["body-lg"]}px`,
                fontWeight: fontWeight.regular,
              }}
            >
              {holderName}
            </p>
          ) : null}
        </div>
        {/* Brillo superior (nodo «Effect» 41:1027): blanco al 8 %. */}
        <svg
          aria-hidden="true"
          width={352}
          height={207}
          viewBox="0 0 352 207"
          style={{ ...decoration, left: 0, top: 30 }}
        >
          <path
            d="M0 20.0518C3.32617 50.1266 57.3921 65.431 150.576 80.0645C320.336 106.723 363.024 160.272 349.366 206.72H20C8.95432 206.72 0 197.765 0 186.72V20.0518ZM4.24805 0C1.86262 4.9719 0.454234 9.61762 0 13.9746V12.3242C0 7.67499 1.58706 3.39643 4.24805 0Z"
            fill={semantic.bg.surface}
            fillOpacity={0.08}
          />
        </svg>
      </div>
    );
  }

  const clamped = progress === undefined ? undefined : Math.min(1, Math.max(0, progress));
  // Figma: en "active" la pista usa card/credit/text (blanco) también en BNPL y el relleno el bgSubtle
  // del producto; en "frozen"/"blocked" pista y relleno comparten color.
  const trackColor = state === "active" ? card.credit.text : palette.text;
  const fillColor = state === "active" ? card[product].bgSubtle : palette.text;
  const blocked = state === "blocked";

  return (
    <div role="group" aria-label={groupLabel} style={containerStyle}>
      <div style={{ display: "flex", alignItems: "center" }}>{header}</div>
      {balance || balanceCaption ? (
        <div style={{ display: "flex", flexDirection: "column", gap: space["4"] }}>
          {balance ? (
            <p
              style={{
                margin: 0,
                fontSize: fontSize["display-xl"],
                lineHeight: `${lineHeight["display-xl"]}px`,
                fontWeight: fontWeight.bold,
              }}
            >
              {balance}
            </p>
          ) : null}
          {balanceCaption ? (
            <p
              style={{
                margin: 0,
                fontSize: fontSize["body-md"],
                lineHeight: `${lineHeight["body-md"]}px`,
                fontWeight: fontWeight.regular,
              }}
            >
              {balanceCaption}
            </p>
          ) : null}
        </div>
      ) : null}
      {clamped !== undefined ? (
        <div
          role="progressbar"
          aria-label="Uso del límite"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(clamped * 100)}
          style={{ height: 8, borderRadius: radius.full, background: trackColor, overflow: "hidden" }}
        >
          <div style={{ width: `${clamped * 100}%`, height: "100%", borderRadius: radius.full, background: fillColor }} />
        </div>
      ) : null}
      {primaryAction || secondaryAction ? (
        <div
          style={{
            display: "flex",
            flexDirection: blocked ? "column" : "row",
            gap: blocked ? space["8"] : space["12"],
          }}
        >
          {primaryAction ? (
            <Button
              variant="primary"
              size={blocked ? "md" : "sm"}
              disabled={state !== "active"}
              onClick={primaryAction.onClick}
              style={blocked ? { width: "100%" } : undefined}
            >
              {primaryAction.label}
            </Button>
          ) : null}
          {secondaryAction ? (
            <Button
              variant={blocked ? "tertiary" : "secondary"}
              size={blocked ? "md" : "sm"}
              onClick={secondaryAction.onClick}
              style={blocked ? { width: "100%" } : undefined}
            >
              {secondaryAction.label}
            </Button>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}

/** Logo de la cara frontal (nodo «Logo» de Figma): dos círculos que se solapan. */
function CardLogo({ faint }: { faint: boolean }) {
  const stroke = faint ? undefined : semantic.bg.surface;
  const common = { stroke, strokeOpacity: 0.33 } as const;
  return (
    <svg aria-hidden="true" width={48} height={48} viewBox="0 0 48 48" fill="none">
      <circle cx={15} cy={23.9412} r={15} fill={semantic.brand.primary} {...common} />
      <circle cx={33} cy={23.9412} r={15} fill={sunflower["500"]} {...common} />
      <path
        d="M24 11.9412C28.1407 14.3365 30.9268 18.8135 30.9268 23.9412C30.9268 29.0686 28.1405 33.5448 24 35.9402C19.8594 33.5448 17.0732 29.0687 17.0732 23.9412C17.0732 18.8135 19.8592 14.3365 24 11.9412Z"
        fill={card.bnpl.bg}
        {...common}
      />
    </svg>
  );
}
