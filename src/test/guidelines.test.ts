/// <reference types="vite/client" />
import { describe, it, expect, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";

/**
 * Do's y don'ts (2026-10-14). El texto de las guías vive en `guidelines` de cada
 * metadata (lo leen también los agentes); la story «Do's y don'ts» pone el
 * ejemplo visual. Este test obliga a que existan y a que ambos lados cuadren.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const metas = import.meta.glob("../components/*/*.metadata.ts", { import: "meta", eager: true }) as Record<string, any>;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const stories = import.meta.glob("../components/*/*.stories.tsx", { eager: true }) as Record<string, any>;

describe("do's y don'ts", () => {
  afterEach(cleanup);

  it("encuentra los 16 componentes", () => {
    expect(Object.keys(metas)).toHaveLength(16);
  });

  for (const [path, meta] of Object.entries(metas)) {
    const name = path.split("/").pop()!.replace(".metadata.ts", "");

    it(`${name}: tiene al menos 2 pares con do, dont y reason`, () => {
      expect(Array.isArray(meta.guidelines), `${name}.metadata.ts sin guidelines`).toBe(true);
      expect(meta.guidelines.length).toBeGreaterThanOrEqual(2);
      for (const g of meta.guidelines) {
        for (const key of ["do", "dont", "reason"]) {
          expect(typeof g[key], `${name}: guidelines.${key}`).toBe("string");
          expect(g[key].trim().length, `${name}: guidelines.${key} vacío`).toBeGreaterThan(10);
        }
      }
    });

    it(`${name}: su story «Do's y don'ts» tiene un ejemplo por cada par`, () => {
      const mod = stories[`../components/${name}/${name}.stories.tsx`];
      expect(mod?.DosYDonts, `${name}.stories.tsx sin la story DosYDonts`).toBeDefined();
      // render() llama a withExamples, que lanza si los pares y los ejemplos no coinciden.
      expect(() => mod.DosYDonts.render()).not.toThrow();
    });

    it(`${name}: la página se renderiza con un «Hacer» y un «Evitar» por cada par`, () => {
      const mod = stories[`../components/${name}/${name}.stories.tsx`];
      render(mod.DosYDonts.render());
      expect(screen.getAllByText("Hacer")).toHaveLength(meta.guidelines.length);
      expect(screen.getAllByText("Evitar")).toHaveLength(meta.guidelines.length);
      for (const g of meta.guidelines) expect(screen.getByText(g.reason)).toBeInTheDocument();
    });
  }
});
