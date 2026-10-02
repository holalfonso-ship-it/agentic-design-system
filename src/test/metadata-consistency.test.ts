/// <reference types="vite/client" />
import { describe, it, expect } from "vitest";

/**
 * Pilar 1 hecho ejecutable (Compose Ciclo 2, 2026-10-01): la metadata que leen
 * los agentes no puede mentir sobre el código. Convierte en test los chequeos
 * manuales del Audit:
 *   - toda prop pública de <Nombre>Props está documentada en meta.props
 *   - todo token de ../../tokens que usa el código está en meta.tokens
 *   - todo token declarado en meta.tokens se usa realmente (o es de una dependencia)
 */
const sources = import.meta.glob("../components/*/*.tsx", { query: "?raw", import: "default", eager: true }) as Record<string, string>;
// La forma de cada meta la valida este mismo test; aquí se lee de forma laxa.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const metas = import.meta.glob("../components/*/*.metadata.ts", { import: "meta", eager: true }) as Record<string, any>;

const IGNORED_PROPS = new Set(["className", "style", "aria-label"]);
// Primero los comentarios de línea (pueden contener "/*" dentro), después los de bloque.
const stripComments = (code: string) => code.replace(/(^|[^:"'\\])\/\/[^\n]*/g, "$1").replace(/\/\*[\s\S]*?\*\//g, "");

function publicProps(source: string): string[] {
  const m = source.match(/export interface \w+Props[^{]*\{([\s\S]*?)\n\}/);
  if (!m) return [];
  return [...stripComments(m[1]).matchAll(/^\s+"?([\w-]+)"?\??:/gm)].map((x) => x[1]);
}

function usedTokens(source: string): string[] {
  const code = stripComments(source);
  const imp = code.match(/import \{([^}]*)\} from "\.\.\/\.\.\/tokens"/);
  if (!imp) return [];
  const roots = imp[1].split(",").map((s) => s.trim()).filter(Boolean);
  const body = code.slice(code.indexOf('from "../../tokens"') + 20);
  const paths = new Set<string>();
  for (const root of roots) {
    for (const m of body.matchAll(new RegExp(`\\b${root}((?:\\.[A-Za-z_][\\w-]*|\\["[^"]+"\\])*)`, "g"))) {
      // `fontSize: ...` es la clave CSS homónima, no el token: se descarta.
      const after = body.slice((m.index ?? 0) + m[0].length);
      if (m[1] === "" && /^\s*:/.test(after)) continue;
      // Cadenas CSS como "space-around": el \b encuentra «space» pero no es el token.
      const before = body[(m.index ?? 0) - 1];
      if (before === '"' || before === "'" || before === "-" || after.startsWith("-")) continue;
      const tail = m[1].replace(/\["([^"]+)"\]/g, ".$1");
      paths.add(root + tail);
    }
  }
  return [...paths];
}

const matches = (a: string, b: string) => a === b || a.startsWith(b + ".") || b.startsWith(a + ".");

const names = Object.keys(sources)
  .filter((p) => !/\.(stories|test)\./.test(p))
  .map((p) => p.match(/components\/(\w+)\/\1\.tsx$/)?.[1])
  .filter((n): n is string => Boolean(n))
  .sort();

describe("metadata ↔ código", () => {
  it("encuentra los 12 componentes", () => {
    expect(names).toHaveLength(12);
  });

  describe.each(names)("%s", (name) => {
    const source = sources[`../components/${name}/${name}.tsx`];
    const meta = metas[`../components/${name}/${name}.metadata.ts`];

    it("documenta todas sus props públicas en meta.props", () => {
      const documented = new Set(Object.keys(meta.props));
      const missing = publicProps(source).filter((p) => !IGNORED_PROPS.has(p) && !documented.has(p));
      expect(missing, `props sin documentar en ${name}.metadata.ts`).toEqual([]);
    });

    it("declara en meta.tokens todos los tokens que usa el código", () => {
      const declared: string[] = [...meta.tokens];
      const undeclared = usedTokens(source).filter((u) => !declared.some((d) => matches(u, d)));
      expect(undeclared, `tokens usados pero no declarados en ${name}.metadata.ts`).toEqual([]);
    });

    it("no declara tokens que el código no usa (salvo los que aportan sus dependencias)", () => {
      const used = usedTokens(source);
      // Un componente que renderiza otro (p. ej. Modal → Button) hereda sus tokens.
      const fromDependencies: string[] = (meta.dependencies ?? []).flatMap((dep: string) => [
        ...(metas[`../components/${dep}/${dep}.metadata.ts`]?.tokens ?? []),
      ]);
      const stale = [...meta.tokens].filter(
        (d: string) => !used.some((u) => matches(u, d)) && !fromDependencies.some((f) => matches(f, d)),
      );
      expect(stale, `tokens obsoletos en ${name}.metadata.ts`).toEqual([]);
    });
  });
});
