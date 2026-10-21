#!/usr/bin/env node
/**
 * Métrica de adopción agéntica (Fase 5, 2026-10-21).
 *
 * No mide cuánta gente usa Aida: mide si los agentes que la consultan
 * siguen el protocolo de CLAUDE.md en vez de inventar o forzar
 * componentes. Cuatro indicadores, cada uno con su fuente:
 *
 *   1. flags: proporción de líneas "flagged" vs "resolved" en
 *      flags.jsonl. Muchas resolved = el mecanismo de "cuando nada
 *      encaja" funciona; muchas flagged sin resolver = señal a escalar.
 *   2. extendVsCreate: de los commits feat: que tocan src/components,
 *      cuántos CREAN un componente (primer .tsx de su carpeta) frente a
 *      cuántos EXTIENDEN uno existente — proxy de la regla del 70%.
 *      Aproximado por diseño (como generate-index.mjs): un commit feat
 *      que no toca ningún .tsx de componente (herramientas, docs) no
 *      cuenta en ningún lado.
 *   3. metadataCoverage: de los componentes leídos vía *.metadata.ts,
 *      % con guidelines (mínimo 2 pares) y % con constraints declarado.
 *   4. arcDrift: hallazgos por Ciclo ARC, leído de arc-cycles.json
 *      (seed manual desde la base de Notion "Ciclos ARC — Aida" — no
 *      hay forma de leer Notion en un build estático de Storybook, así
 *      que este archivo se actualiza a mano tras cada Audit).
 *
 * Uso: npm run adoption-report
 * Escribe src/adoption/report.json (committed, igual que index.toon) y
 * imprime un resumen por consola.
 */
import { readdirSync, readFileSync, writeFileSync, statSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { execSync } from "node:child_process";

const ROOT = fileURLToPath(new URL("..", import.meta.url));
const COMPONENTS_DIR = join(ROOT, "src/components");
const FLAGS_PATH = join(ROOT, "flags.jsonl");
const ARC_CYCLES_PATH = join(ROOT, "src/adoption/arc-cycles.json");
const OUTPUT_PATH = join(ROOT, "src/adoption/report.json");

function git(cmd) {
  return execSync(`git ${cmd}`, { cwd: ROOT, encoding: "utf-8" });
}

function computeFlags() {
  let lines = [];
  try {
    lines = readFileSync(FLAGS_PATH, "utf-8").split("\n").filter(Boolean);
  } catch {
    return { flagged: 0, resolved: 0, total: 0 };
  }
  let flagged = 0;
  let resolved = 0;
  for (const line of lines) {
    try {
      const entry = JSON.parse(line);
      if (entry.decision === "flagged") flagged += 1;
      if (entry.decision === "resolved") resolved += 1;
    } catch {
      // línea no parseable: se ignora, no se cuenta
    }
  }
  return { flagged, resolved, total: lines.length };
}

function computeExtendVsCreate() {
  // Commits que crean al menos un componente: el .tsx añadido vive en
  // src/components/<Nombre>/<Nombre>.tsx (se excluyen .test.tsx y .stories.tsx,
  // que también matchean el glob *.tsx de un solo nivel).
  const raw = git(
    `log --diff-filter=A --name-only --pretty=format:"@@%H" -- "src/components/*/*.tsx"`
  );
  const creationHashes = new Set();
  const blocks = raw.split("@@").filter(Boolean);
  for (const block of blocks) {
    const [hash, ...files] = block.trim().split("\n");
    const createsComponent = files.some((f) => {
      if (f.endsWith(".test.tsx") || f.endsWith(".stories.tsx")) return false;
      return /^src\/components\/[^/]+\/[^/]+\.tsx$/.test(f.trim());
    });
    if (createsComponent) creationHashes.add(hash);
  }

  // Todos los commits feat: que tocan src/components (sin merges).
  const featLog = git(
    `log --no-merges --pretty=format:"%H|%s" -- src/components`
  )
    .split("\n")
    .filter(Boolean)
    .map((line) => {
      const idx = line.indexOf("|");
      return { hash: line.slice(0, idx), subject: line.slice(idx + 1) };
    })
    .filter((c) => /^feat/i.test(c.subject));

  const create = featLog.filter((c) => creationHashes.has(c.hash)).length;
  const extend = featLog.length - create;
  return { create, extend, totalFeatCommits: featLog.length };
}

function computeMetadataCoverage() {
  const entries = readdirSync(COMPONENTS_DIR).filter((name) =>
    statSync(join(COMPONENTS_DIR, name)).isDirectory()
  );
  let withGuidelines = 0;
  let withConstraints = 0;
  let withFigmaKey = 0;
  for (const dir of entries) {
    let source;
    try {
      source = readFileSync(join(COMPONENTS_DIR, dir, `${dir}.metadata.ts`), "utf-8");
    } catch {
      continue;
    }
    if (/guidelines\s*:\s*\[/.test(source)) withGuidelines += 1;
    if (/constraints\s*:\s*\{/.test(source)) withConstraints += 1;
    if (/componentKey\s*:\s*["']/.test(source)) withFigmaKey += 1;
  }
  return {
    total: entries.length,
    withGuidelines,
    withConstraints,
    withFigmaKey,
  };
}

function readArcCycles() {
  try {
    return JSON.parse(readFileSync(ARC_CYCLES_PATH, "utf-8"));
  } catch {
    return [];
  }
}

function main() {
  const flags = computeFlags();
  const extendVsCreate = computeExtendVsCreate();
  const metadataCoverage = computeMetadataCoverage();
  const arcCycles = readArcCycles();

  const report = {
    generatedAt: new Date().toISOString(),
    flags,
    extendVsCreate,
    metadataCoverage,
    arcCycles,
  };

  writeFileSync(OUTPUT_PATH, JSON.stringify(report, null, 2) + "\n", "utf-8");

  console.log("✓ Métrica de adopción agéntica\n");
  console.log(
    `  flags.jsonl        — ${flags.flagged} flagged, ${flags.resolved} resolved (${flags.total} líneas)`
  );
  console.log(
    `  crear vs extender   — ${extendVsCreate.create} crean, ${extendVsCreate.extend} extienden (${extendVsCreate.totalFeatCommits} commits feat: sobre src/components)`
  );
  console.log(
    `  cobertura metadata  — ${metadataCoverage.withGuidelines}/${metadataCoverage.total} guidelines, ${metadataCoverage.withConstraints}/${metadataCoverage.total} constraints, ${metadataCoverage.withFigmaKey}/${metadataCoverage.total} figma.componentKey`
  );
  console.log(
    `  drift por Ciclo ARC — ${arcCycles.map((c) => `Ciclo ${c.ciclo}: ${c.cerrados}/${c.hallazgos}`).join(", ")}`
  );
  console.log(`\n→ src/adoption/report.json escrito.`);
}

main();
