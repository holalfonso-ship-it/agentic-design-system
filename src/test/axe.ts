import axe from "axe-core";
import { expect } from "vitest";

/**
 * Ejecuta axe-core sobre un nodo y falla si hay violaciones.
 * Se desactiva `color-contrast` porque jsdom no calcula estilos reales
 * (la validación de contraste se cubre en el addon a11y de Storybook).
 */
export async function expectNoA11yViolations(container: Element) {
  const results = await axe.run(container, {
    rules: { "color-contrast": { enabled: false } },
  });
  const summary = results.violations.map(
    (v) => `${v.id}: ${v.help} (${v.nodes.length} nodo/s)`,
  );
  expect(summary, summary.join("\n")).toEqual([]);
}
