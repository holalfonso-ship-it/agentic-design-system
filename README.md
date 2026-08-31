# Agentic Design System — AID

Fase 0–3 del sistema de diseño agéntico, construido desde cero a partir de
los componentes reales publicados en Figma (librería
`Alfonso_Zamorano_Task_IDFinance`, dentro del archivo *AID — iOS Design
Tokens — UI Kit*).

Marco conceptual completo (los 3 pilares, el bucle ARC, el roadmap): ver el
documento del proyecto "Sistema de Diseño Agéntico".

## Qué hay aquí

- **`src/tokens/`** — tokens de color, radio y tipografía, con los nombres
  reales de las variables de Figma (`button/primary/bg/default`,
  `radius/md`, `font-size/heading-lg`, etc.).
- **`src/components/`** — 4 componentes reales (`Button`, `TabBar`,
  `ProductCard`, `TransactionListItem`), cada uno con su
  `*.metadata.ts` junto al código: el Pilar 1.
- **`scripts/generate-index.mjs`** — genera `index.toon`, el grafo de
  componentes: el Pilar 2.
- **`CLAUDE.md`** — el protocolo de consulta para cualquier agente que
  trabaje en este repo: el Pilar 3.

## Empezar

```bash
npm install
npm run dev              # vitrina de componentes en localhost
npm run generate-index   # regenera index.toon a partir de la metadata
```

## Sincronizar valores exactos desde Figma

Los **nombres** de los tokens (`src/tokens/*.ts`) son reales — vienen de
las variables publicadas en Figma. Los **valores hex/px** son un
placeholder plausible para una app fintech iOS, porque esta sesión no pudo
leer los valores exactos de las variables sin el archivo de Figma abierto
en el Figma desktop app (el MCP de Figma necesita eso para
`get_variable_defs`).

Para cerrar esa brecha:

1. Abre el archivo en Figma desktop y selecciona cualquier componente que
   use la variable que quieras leer.
2. Pide que se sincronicen los valores exactos — con el archivo abierto,
   se pueden leer directamente y actualizar `src/tokens/colors.ts` con
   los hex reales.
3. Alternativa sin desktop: exportar las variables vía la REST API de
   Figma (`GET /v1/files/:key/variables/local`) con un token personal de
   Figma.

## Componentes cubiertos vs. pendientes

Cubiertos en esta primera pasada (los que aparecieron como *component
set* reales en la librería, no como icono suelto):

- `Button` (primary / secondary / tertiary × default / hover / pressed / disabled)
- `Tab Bar` (default / selected)
- `Product Card` (bnpl / credit / frozen)
- `Transaction List Item` (in / out)

La librería también tiene ~15 componentes de icono individuales (estilo
SF Symbols: `camera.shutter.button`, `bookmark.fill`, etc.) que no se
tradujeron a componentes React en esta fase — son assets, no componentes
de UI con variantes de comportamiento. Se pueden incorporar como un
componente `Icon` único parametrizado por nombre, cuando haga falta.

No encontrados en la librería actual (huecos a decidir si se diseñan o se
toman de una librería de comunidad): input de texto, toggle/switch,
badge/chip, modal/sheet, avatar.

## Próximo paso

Con esto ya hay material real para el primer post de la serie de
LinkedIn (Post 2 — los tres pilares) y para correr el primer ciclo
Audit → Report sobre este mismo repo.
