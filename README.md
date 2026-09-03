# Agentic Design System — AIDA

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

La librería tiene además un catálogo de iconos individuales estilo SF
Symbols mucho más grande de lo que se había estimado: la Fase 0 apuntó
"~15", pero una búsqueda parcial en `search_design_system` (2026-09-03)
ya encontró 40+ (`download.and.arrow.down`, `bell.badge`,
`cart.badge.plus`, `person.crop.square`, `location.north.fill`, etc.) —
es probable que sea un pack de comunidad SF Symbols completo, no una
selección curada para la app. En vez de intentar catalogar el pack
entero como componente `Icon`, la Fase 2 debería arrancar por los
iconos con uso confirmado en componentes reales (p. ej.
`arrow.up.right.circle.fill` / `arrow.down.left.circle.fill` en
"Stat Item", ver abajo) y crecer el mapeo nombre→componente bajo
demanda, no de una vez.

### Componentes reales encontrados, aún sin catalogar

Búsqueda en Figma del 2026-09-03 (`search_design_system`) reveló dos
component sets/componentes reales que no estaban en el inventario de
Fase 0 y no tienen todavía metadata ni entrada en `index.toon`:

- **`Quick Action Tile`** — tile de acción rápida para la fila de
  acciones del home. Prop `Icon` intercambiable (cualquier SF Symbol
  circular), título/subtítulo editables directamente.
- **`Stat Item`** — bloque de estadística pequeño para el resumen de
  balance (Balance total / Total Gastos). Prop `Icon`, pensado para
  `arrow.up.right.circle.fill` / `arrow.down.left.circle.fill` según
  dirección.

Cubrirlos requiere leer su design context exacto (colores, spacing,
variantes) con el archivo abierto en Figma desktop en la página
correspondiente — pendiente de que Alfonso lo abra ahí para poder
extraerlos con `get_design_context` en vez de estimarlos.

No encontrados en la librería actual como componente de UI (huecos a
decidir si se diseñan en Figma o se toman de una librería de
comunidad): input de texto, toggle/switch, badge/chip (más allá de los
iconos con "badge" en el nombre, que son SF Symbols compuestos, no un
componente Badge de UI), modal/sheet, avatar.

## Cuando nada encaja — mecanismo de flag

Desde el 2026-09-03, la regla extend-vs-create de `CLAUDE.md` es una
puerta dura: si ningún componente ni categoría existente encaja, el
agente no fuerza el más parecido ni inventa uno nuevo — añade una línea
a `flags.jsonl` (raíz del repo) y lo reporta como tal. Ver la sección
"Cuando nada encaja" de `CLAUDE.md` para el esquema completo. Ese
archivo es el backlog real del sistema: los huecos de componentes se
priorizan por casos reales marcados ahí, no solo por la lista de huecos
conocidos de arriba.

## Próximo paso

Con esto ya hay material real para el primer post de la serie de
LinkedIn (Post 2 — los tres pilares) y para correr el primer ciclo
Audit → Report sobre este mismo repo.
