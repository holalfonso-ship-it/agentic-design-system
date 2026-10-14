#!/usr/bin/env node
/**
 * Pilar 2 — Índice del codebase.
 *
 * Recorre una carpeta de componentes, lee cada <Nombre>.metadata.ts y genera
 * index.toon: un grafo compacto de componentes y sus relaciones, pensado para
 * que un agente lo consuma sin abrir cada archivo fuente.
 *
 * Formato por línea:
 *   Nombre|categoria|deps:a,b|tokens:n|estados:n|figma:clave8
 *
 * Uso:
 *   node scripts/generate-index.mjs
 *   node scripts/generate-index.mjs --components src/components --out index.toon
 *
 * Limitación conocida: lee la metadata con expresiones regulares, no con un
 * parser de TypeScript. Funciona con el objeto literal simple de la plantilla
 * (strings entre comillas, arrays planos). Si tu metadata es más dinámica,
 * sustituye extractField/extractArrayLength por un parser real.
 */
import { readdirSync, readFileSync, writeFileSync, statSync } from "node:fs";
import { join, resolve } from "node:path";

function arg(name, fallback) {
  const i = process.argv.indexOf(`--${name}`);
  return i !== -1 && process.argv[i + 1] ? process.argv[i + 1] : fallback;
}

const COMPONENTS_DIR = resolve(arg("components", "src/components"));
const OUTPUT_PATH = resolve(arg("out", "index.toon"));

function extractField(source, field) {
  const match = source.match(new RegExp(`${field}\\s*:\\s*["']([^"']+)["']`));
  return match ? match[1] : null;
}

function extractArrayLength(source, field) {
  const match = source.match(new RegExp(`${field}\\s*:\\s*\\[([^\\]]*)\\]`));
  if (!match) return 0;
  const trimmed = match[1].trim();
  if (!trimmed) return 0;
  return trimmed.split(",").filter((s) => s.trim()).length;
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
  let entries;
  try {
    entries = readdirSync(COMPONENTS_DIR).filter((n) =>
      statSync(join(COMPONENTS_DIR, n)).isDirectory()
    );
  } catch {
    console.error(`✗ No existe la carpeta de componentes: ${COMPONENTS_DIR}`);
    process.exit(1);
  }

  const lines = [];
  let relationCount = 0;

  for (const dir of entries.sort()) {
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
    relationCount += deps.length;

    lines.push(
      `${name}|${category}|deps:${deps.join(",") || "none"}|tokens:${extractArrayLength(source, "tokens")}|estados:${extractArrayLength(source, "states")}|figma:${figmaKey === "-" ? "-" : figmaKey.slice(0, 8)}`
    );
  }

  const header = [
    `# index.toon — generado ${new Date().toISOString()}`,
    `# componentes:${lines.length} relaciones:${relationCount}`,
    "",
  ].join("\n");

  writeFileSync(OUTPUT_PATH, header + lines.join("\n") + "\n", "utf-8");
  console.log(`✓ ${OUTPUT_PATH} — ${lines.length} componentes, ${relationCount} relaciones`);
}

main();
