# Contribuir a Aida

La guía completa (con el árbol de decisión "extender vs. crear", el camino
en 6 pasos de Figma a la PR, un ejemplo real con `Popover`, el checklist
antes de abrir la PR y las preguntas frecuentes) vive en Storybook, no aquí:

**[storybook › Contribución](https://agentic-design-system-chi.vercel.app/?path=/docs/contribución--documentación)**

(o, en local: `npm run storybook` y abre "Contribución" en el sidebar)

## Lo mínimo si tienes prisa

1. Lee `index.toon` y busca por categoría antes de crear nada nuevo.
2. Si un componente existente cubre ≥70% de lo que necesitas, extiéndelo.
3. Si nada encaja, añade una línea a `flags.jsonl`, no construyas una
   versión provisional. Las reglas completas están en `CLAUDE.md`.
4. Todo componente lleva metadata, stories (con Do's y don'ts) y tests.
   Corre `npm run generate-index`, `npm test` y `npm run build-storybook`
   antes de abrir la PR.
5. Conventional Commits (`feat:`, `fix:`, `docs:`...).

Para el porqué de una decisión o el historial de sesiones, el sitio no es
este repo: es Notion (bases **Decisiones · Aida** y **Bitácora de sesiones
· Aida**).
