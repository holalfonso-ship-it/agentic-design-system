#!/usr/bin/env node
/**
 * Pilar 2 — Índice del codebase.
 *
 * Recorre src/components, lee cada *.metadata.ts y genera index.toon: un
 * grafo compacto de componentes y sus relaciones, pensado para que un
 * agente lo consuma sin tener que abrir cada archivo fuente.
 *
 * Formato por línea:
 *   Nombre|categoria|deps:a,b|tokens:n|estados:n|constraints:n|figmaKey
 *
 * Uso: npm run generate-index
 */
import { readdirSync, readFileSync, writeFileSync, statSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const COMPONENTS_DIR = fileURLToPath(new URL("../src/components", import.meta.url));
const OUTPUT_PATH = fileURLToPath(new URL("../index.toon", import.meta.url));

function extractField(source, field) {
  // extrae `name: "Valor"` o `name: 'Valor'` de un objeto meta literal simple
  const match = source.match(new RegExp(`${field}\\s*:\\s*["']([^"']+)["']`));
  return match ? match[1] : null;
}

function extractArrayLength(source, field) {
  const match = source.match(new RegExp(`${field}\\s*:\\s*\\[([^\\]]*)\\]`));
  if (!match) return 0;
  const trimmed = match[1].trim();
  if (!trimmed) return 0;
  return trimmed.split(",").filter(Boolean).length;
}

function countQuotedEntries(source, field) {
  // A diferencia de extractArrayLength (que separa por comas, válido para
  // identificadores cortos como tokens o estados), el texto libre de
  // constraints puede llevar comas dentro de la propia frase. Se cuenta el
  // número de strings entre comillas del array en vez de partir por comas.
  const match = source.match(new RegExp(`${field}\\s*:\\s*\\[([\\s\\S]*?)\\n\\s*\\]`));
  if (!match) return 0;
  const strings = match[1].match(/"(?:[^"\\]|\\.)*"/g);
  return strings ? strings.length : 0;
}

function extractConstraintsCount(source) {
  // constraints es opcional y anidado ({ preconditions: [...], prohibitions: [...] }),
  // a diferencia de los arrays planos de arriba. Se cuenta la suma de ambos arrays
  // dentro del bloque, no si el campo existe o no — así un agente ve de un vistazo
  // si ese componente tiene límites duros que comprobar antes de extenderlo.
  const block = source.match(/constraints\s*:\s*\{([\s\S]*?)\n {2}\},/);
  if (!block) return 0;
  const inner = block[1];
  return countQuotedEntries(inner, "preconditions") + countQuotedEntries(inner, "prohibitions");
}

function extractDeps(source) {
  const match = source.match(/dependencies\s*:\s*\[([^\]]*)\]/);
  if (!match) return [];
  return match[1]
    .split(",")
    .map((s) => s.trim().replace(/["']/g, ""))
    .filter(Boolean);
}

function main() {
  const entries = readdirSync(COMPONENTS_DIR).filter((name) =>
    statSync(join(COMPONENTS_DIR, name)).isDirectory()
  );

  const lines = [];
  let componentCount = 0;
  let relationCount = 0;

  for (const dir of entries) {
    const metaPath = join(COMPONENTS_DIR, dir, `${dir}.metadata.ts`);
    let source;
    try {
      source = readFileSync(metaPath, "utf-8");
    } catch {
      console.warn(`⚠️  Sin metadata: ${dir} (esperado ${dir}.metadata.ts)`);
      continue;
    }

    const name = extractField(source, "name") ?? dir;
    const category = extractField(source, "category") ?? "unknown";
    const figmaKey = extractField(source, "componentKey") ?? "-";
    const deps = extractDeps(source);
    const tokenCount = extractArrayLength(source, "tokens");
    const stateCount = extractArrayLength(source, "states");
    const constraintsCount = extractConstraintsCount(source);

    componentCount += 1;
    relationCount += deps.length;

    lines.push(
      `${name}|${category}|deps:${deps.join(",") || "none"}|tokens:${tokenCount}|estados:${stateCount}|constraints:${constraintsCount}|figma:${figmaKey.slice(0, 8)}`
    );
  }

  const header = [
    `# index.toon — generado ${new Date().toISOString()}`,
    `# componentes:${componentCount} relaciones:${relationCount}`,
    "",
  ].join("\n");

  writeFileSync(OUTPUT_PATH, header + lines.join("\n") + "\n", "utf-8");

  console.log(`✓ index.toon generado — ${componentCount} componentes, ${relationCount} relaciones`);
}

main();
