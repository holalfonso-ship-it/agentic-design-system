# Agentic Design System — AID

Fase 0–3 del sistema de diseño agéntico, construido desde cero a partir de
los componentes reales publicados en Figma (librería y archivo
`Alfonso_Zamorano_Task_IDFinance`, `fileKey 3EHBqyJGvIfSG3CZol393z`).

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

**Estado: hecho — Fase 1 (2026-09-01).** Los tokens de `src/tokens/*.ts`
(colores, radios, tipografía) tienen ya valores reales, extraídos
directamente del archivo de Figma correcto: **`Alfonso_Zamorano_Task_IDFinance`**
(`fileKey 3EHBqyJGvIfSG3CZol393z` — el archivo que da nombre a la
librería, no confundir con otros archivos que puedan compartir nombre de
librería visible en "Assets").

Procedimiento que funcionó, repetible para futuras sincronizaciones:

1. Abre el archivo correcto en Figma desktop (confirma el nombre en la
   barra de título / URL — `figma.com/design/<fileKey>/...`).
2. Selecciona en el canvas el nodo que quieras leer y copia su enlace
   ("Copy link to selection"); el `node-id` de esa URL es lo único que
   necesita el agente.
3. Con el nodo seleccionado, el MCP de Figma puede usar **tanto**
   `get_design_context` (devuelve hex reales incluso sin selección viva,
   sirve para cualquier node-id válido) **como** `get_variable_defs`
   (solo funciona si ese nodo sigue siendo la selección activa en el
   Figma desktop app en ese momento — si fallas con "nothing selected",
   vuelve a seleccionarlo y reinténtalo).
4. La página "01. Tokens" del archivo (node `2:3`) tiene una sección
   "Component Colors" (`18:144`) con demos de Button / Product Card /
   Tab que traen los hex ya resueltos, más las secciones "Radius"
   (`18:220`) y "Typography" (`18:248`) con los valores primitivos
   escritos directamente como texto — son el atajo más rápido.

`card/frozen/*` se cerró localizando el component set real **Product
Card** (`38:176`): en Figma "frozen" no es un tercer producto, es un
**estado** (`state = active | frozen | blocked`) que se aplica sobre
`product = credit | bnpl`. `card.frozen.bg` (`#FFFFFF`) y
`card.frozen.text` (`#5C5653`) están confirmados sobre ese component
set real; no existe un "bg-subtle" propio para el estado frozen (a
diferencia de los productos bnpl/credit), así que se reutiliza el valor
de `bg`.

Sigue pendiente `card/border`: existe como variable en la colección
Component Colors pero no se encontró ningún nodo del component set real
de Product Card (ninguno de los 12: 2 productos × 3 estados × 2 lados)
que lo use — el estado "blocked" usa en su lugar
`semantic/feedback/error` para el borde. Puede ser un token sin usar
todavía; se deja como estimación razonada
(`semantic/border/default` → `neutral/200`, `#A19E9C`). Si aparece en
algún otro componente, repite el procedimiento de arriba para
confirmarlo.

Alternativa sin desktop: exportar las variables vía la REST API de
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
