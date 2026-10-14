import type { ReactNode } from "react";
import { fontFamily, fontSize, fontWeight, lineHeight, neutral, radius, semantic, space } from "../tokens";

/**
 * Bloque visual de «Do's y don'ts» para las stories (Fase 4/5, 2026-10-14).
 *
 * El TEXTO (qué hacer, qué evitar, por qué) vive en `guidelines` de cada
 * `<Nombre>.metadata.ts`: así lo leen también los agentes y no se desincroniza.
 * El EJEMPLO visual vive en la story y se empareja por posición con
 * `withExamples`, que falla en voz alta si los números no cuadran.
 */
export interface GuidelineText {
  readonly do: string;
  readonly dont: string;
  readonly reason: string;
}

export interface GuidelineExample {
  readonly good: ReactNode;
  readonly bad: ReactNode;
}

export type GuidelineItem = GuidelineText & GuidelineExample;

export function withExamples(
  texts: readonly GuidelineText[],
  examples: readonly GuidelineExample[],
): GuidelineItem[] {
  if (texts.length !== examples.length) {
    throw new Error(
      `guidelines: la metadata tiene ${texts.length} pares y la story ${examples.length} ejemplos; deben coincidir.`,
    );
  }
  return texts.map((t, i) => ({ do: t.do, dont: t.dont, reason: t.reason, good: examples[i].good, bad: examples[i].bad }));
}

const MONO = "ui-monospace, SFMono-Regular, Menlo, Consolas, monospace";

/** Fragmento de código para los ejemplos que no se pueden dibujar (overlays, patrones de uso). */
export function Code({ children }: { children: string }) {
  return (
    <pre
      style={{
        margin: 0,
        padding: space["12"],
        background: neutral["50"],
        borderRadius: radius.sm,
        fontFamily: MONO,
        fontSize: fontSize["label-sm"],
        lineHeight: `${lineHeight["label-sm"]}px`,
        color: semantic.text.primary,
        whiteSpace: "pre-wrap",
        overflowWrap: "anywhere",
        textAlign: "left",
        width: "100%",
        boxSizing: "border-box",
      }}
    >
      {children}
    </pre>
  );
}

/** Componente renderizado con su línea de uso debajo. */
export function Demo({ code, children }: { code: string; children: ReactNode }) {
  return (
    <div style={{ display: "grid", gap: space["12"], justifyItems: "start", width: "100%" }}>
      <div style={{ display: "flex", gap: space["8"], flexWrap: "wrap", alignItems: "center", maxWidth: "100%" }}>
        {children}
      </div>
      <Code>{code}</Code>
    </div>
  );
}

function Panel({ kind, caption, children }: { kind: "do" | "dont"; caption: string; children: ReactNode }) {
  const isDo = kind === "do";
  const accent = isDo ? semantic.feedback.success : semantic.feedback.error;
  const tint = isDo ? semantic.feedback["success-subtle"] : semantic.feedback["error-subtle"];
  return (
    <figure style={{ margin: 0, minWidth: 0, border: `1px solid ${accent}`, borderRadius: radius.md, overflow: "hidden", background: semantic.bg.surface }}>
      <figcaption
        style={{
          display: "flex",
          alignItems: "center",
          gap: space["8"],
          padding: `${space["8"]}px ${space["12"]}px`,
          background: tint,
          color: semantic.text.primary,
          fontSize: fontSize["label-md"],
          lineHeight: `${lineHeight["label-md"]}px`,
          fontWeight: fontWeight.semibold,
        }}
      >
        <span aria-hidden="true" style={{ color: accent, fontWeight: fontWeight.bold }}>
          {isDo ? "✓" : "✕"}
        </span>
        {isDo ? "Hacer" : "Evitar"}
      </figcaption>
      <div
        style={{
          padding: space["16"],
          minHeight: 96,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexWrap: "wrap",
          overflow: "hidden",
        }}
      >
        {children}
      </div>
      <p
        style={{
          margin: 0,
          padding: `${space["12"]}px ${space["16"]}px`,
          borderTop: `1px solid ${tint}`,
          fontSize: fontSize["body-md"],
          lineHeight: `${lineHeight["body-md"]}px`,
          color: semantic.text.primary,
        }}
      >
        {caption}
      </p>
    </figure>
  );
}

export function Guidelines({ items }: { items: readonly GuidelineItem[] }) {
  return (
    <div style={{ display: "grid", gap: space["32"], fontFamily: fontFamily.base }}>
      {items.map((item, i) => (
        <section key={i} style={{ display: "grid", gap: space["12"] }}>
          <div style={{ display: "grid", gap: space["16"], gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))" }}>
            <Panel kind="do" caption={item.do}>
              {item.good}
            </Panel>
            <Panel kind="dont" caption={item.dont}>
              {item.bad}
            </Panel>
          </div>
          <p style={{ margin: 0, fontSize: fontSize["body-md"], lineHeight: `${lineHeight["body-md"]}px`, color: semantic.text.secondary }}>
            <strong style={{ fontWeight: fontWeight.semibold }}>Por qué.</strong> {item.reason}
          </p>
        </section>
      ))}
    </div>
  );
}
