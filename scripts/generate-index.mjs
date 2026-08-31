#!/usr/bin/env node
/**
 * Pilar 2 — Índice del codebase.
 *
 * Recorre src/components, lee cada *.metadata.ts y genera index.toon: un
 * grafo compacto de componentes y sus relaciones, pensado para que un
 * agente lo consuma sin tener que abrir cada archivo fuente.
 *
 * Formato por línea:
 *   Nombre|categoria|deps:a,b|tokens:n|estados:n|figmaKey
 *
 * Uso: npm run generate-index
 */
import { readdirSync, readFileSync, writeFileSync, statSync } from "node:fs";
import { join } from "node:path";

const COMPONENTS_DIR = new URL("../src/components", import.meta.url).pathname;
const OUTPUT_PATH = new URL("../index.toon", import.meta.url).pathname;

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

    componentCount += 1;
    relationCount += deps.length;

    lines.push(
      `${name}|${category}|deps:${deps.join(",") || "none"}|tokens:${tokenCount}|estados:${stateCount}|figma:${figmaKey.slice(0, 8)}`
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
