/// <reference types="vite/client" />
import { describe, it, expect } from "vitest";

/**
 * Campo constraints (2026-10-21, a partir de feedback de Phong Designs AI
 * Systems: la metadata necesitaba precondiciones y prohibiciones por
 * componente, no solo useWhen). A diferencia de `guidelines` — que es guía de
 * uso para humanos y se dibuja en la story «Do's y don'ts» — `constraints` es
 * lo que un agente debe comprobar ANTES de decidir extender un componente en
 * vez de abrir un flag (ver "Cuando nada encaja" en CLAUDE.md). Es opcional:
 * solo lo llevan los componentes con un límite estructural real, no los 25.
 * Este test valida la forma de quien lo declara, no obliga a declararlo.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const metas = import.meta.glob("../components/*/*.metadata.ts", { import: "meta", eager: true }) as Record<string, any>;

function isNonEmptyStringArray(value: unknown): value is string[] {
  return (
    Array.isArray(value) &&
    value.every((v) => typeof v === "string" && v.trim().length > 10)
  );
}

describe("constraints (opcional, pero bien formado cuando existe)", () => {
  it("encuentra los componentes del repo", () => {
    expect(Object.keys(metas).length).toBeGreaterThan(0);
  });

  for (const [path, meta] of Object.entries(metas)) {
    const name = path.split("/").pop()!.replace(".metadata.ts", "");
    if (meta.constraints === undefined) continue;

    it(`${name}: constraints tiene preconditions y prohibitions como arrays de texto`, () => {
      expect(typeof meta.constraints, `${name}.constraints no es un objeto`).toBe("object");
      expect(
        isNonEmptyStringArray(meta.constraints.preconditions),
        `${name}.constraints.preconditions debe ser un array de strings no vacíos`
      ).toBe(true);
      expect(
        isNonEmptyStringArray(meta.constraints.prohibitions),
        `${name}.constraints.prohibitions debe ser un array de strings no vacíos`
      ).toBe(true);
    });

    it(`${name}: constraints no está vacío del todo (si no hay nada que decir, se omite el campo)`, () => {
      const total = meta.constraints.preconditions.length + meta.constraints.prohibitions.length;
      expect(total, `${name}.constraints está declarado pero sin entradas`).toBeGreaterThan(0);
    });
  }
});
