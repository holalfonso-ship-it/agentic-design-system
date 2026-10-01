/// <reference types="vite/client" />
import { describe, it, expect } from "vitest";
import { space, fontWeight } from "../tokens";

/**
 * Tokens de spacing y fontWeight (Compose Ciclo 2, 2026-10-01). Los valores se
 * comparan con los leídos de Figma con use_figma: variables `space/*` de la
 * colección "Primitive Numbers" y pesos de los estilos de texto `Type/*`.
 */
describe("tokens ↔ Figma", () => {
  it("space es exactamente la escala space/* de Figma", () => {
    expect(space).toEqual({ "0": 0, "2": 2, "4": 4, "6": 6, "8": 8, "12": 12, "14": 14, "16": 16, "24": 24, "32": 32, "40": 40, "48": 48, "64": 64 });
  });

  it("las claves de space son sus propios valores (mismo nombre que en Figma)", () => {
    for (const [key, value] of Object.entries(space)) expect(Number(key)).toBe(value);
  });

  it("fontWeight refleja los pesos de los estilos de texto de Figma", () => {
    expect(fontWeight).toEqual({ light: 300, regular: 400, medium: 500, semibold: 600, bold: 700, black: 900 });
  });
});

const sources = import.meta.glob("../components/*/*.tsx", { query: "?raw", import: "default", eager: true }) as Record<string, string>;
const componentSources = Object.entries(sources).filter(([p]) => !/\.(stories|test)\./.test(p));
// Primero los comentarios de línea (pueden contener "/*"), después los de bloque.
const stripComments = (c: string) => c.replace(/(^|[^:"'\\])\/\/[^\n]*/g, "$1").replace(/\/\*[\s\S]*?\*\//g, "");

describe("los componentes no se saltan los tokens", () => {
  it("encuentra los 12 componentes", () => {
    expect(componentSources).toHaveLength(12);
  });

  it("ningún fontWeight es un número literal (usar fontWeight.*)", () => {
    const offenders = componentSources.flatMap(([path, src]) =>
      [...stripComments(src).matchAll(/fontWeight:[^\n]*?\b(\d{3})\b/g)].map((m) => `${path}: fontWeight ${m[1]}`),
    );
    expect(offenders).toEqual([]);
  });

  it("ningún padding/gap/margin usa un literal que ya existe en la escala space (salvo 0)", () => {
    const scale = new Set<number>(Object.values(space).filter((v) => v !== 0));
    const offenders: string[] = [];
    for (const [path, src] of componentSources) {
      for (const m of stripComments(src).matchAll(/\b(?:padding|margin|gap|rowGap|columnGap)\w*:\s*([^,\n]+)/g)) {
        // Se quitan los ${space[...]} ya tokenizados; lo que quede son literales.
        const literal = m[1].replace(/\$\{[^}]*\}/g, "").replace(/space\["\d+"\]/g, "");
        for (const n of literal.match(/\d+/g) ?? []) {
          if (scale.has(Number(n))) offenders.push(`${path}: «${m[0].trim()}» usa el literal ${n}, que es space["${n}"]`);
        }
      }
    }
    expect(offenders).toEqual([]);
  });
});
