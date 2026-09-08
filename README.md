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

Cubiertos (11):

- `Button` (primary / secondary / tertiary × default / hover / pressed / disabled)
- `Tab Bar` (default / selected)
- `Product Card` (bnpl / credit / frozen)
- `Transaction List Item` (in / out)
- `Quick Action Tile` — tile de acción rápida para la fila de acciones
  del home (componente sin variantes en Figma, node `75:51`, añadido en
  Fase 2 el 2026-09-03). Prop `icon` obligatoria, sin default: el
  "Calendar Icon" que trae por defecto en Figma no se pudo descargar en
  esta sesión (el egress de red del entorno bloquea `figma.com`) — el
  consumidor debe pasar siempre un icono.
- `Stat Item` — bloque de estadística pequeño para el resumen de
  balance (Balance total / Total Gastos; componente sin variantes,
  node `75:597`, añadido en Fase 2 el 2026-09-03). Prop `icon`
  obligatoria por el mismo motivo: en Figma alterna entre
  `arrow.up.right.circle.fill` / `arrow.down.left.circle.fill`, ninguno
  de los dos assets se pudo descargar.
- `Toggle` — switch on/off (track + knob), sin label propio. No existía
  en la librería: se diseñó de cero en Figma con el agente (skill
  `figma-generate-library` + `figma-use`), component_set `159:119` en
  la página "02. Components", bindeado a variables reales (sin hex
  hardcodeados). Añadido en Fase 2 el 2026-09-03.
- `Badge` — pill de estado (success / error / warning / neutral) con
  punto de color + texto. Tampoco existía en la librería: diseñado de
  cero igual que Toggle, component_set `165:119`. El texto de la
  variante `warning` usa `sunflower/800` (primitivo directo) en vez de
  `semantic/feedback/warning` (`sunflower/500`) por falta de contraste
  suficiente — no existe `warning-subtle` en el archivo. Añadido en
  Fase 2 el 2026-09-03.
- `Avatar` — círculo con iniciales (sm/md/lg), reutiliza los tokens de
  Button (`button.primary.bg.default` / `button.primary.text.default`)
  en vez de variables propias. Solo soporta iniciales, sin imagen —
  extensión futura documentada en su metadata. Diseñado de cero,
  component_set `169:113`. Añadido en Fase 2 el 2026-09-03.
- `Input` — campo de texto de una línea con label + helper text,
  estados default / focused / error / disabled. El estado "focused" se
  deriva en runtime con onFocus/onBlur en vez de exigirse como prop,
  aunque en Figma sí existe como variante propia para poder verla en el
  archivo de diseño. Diseñado de cero, component_set `173:119`. Añadido
  en Fase 2 el 2026-09-03.
- `Modal` — bottom sheet: backdrop + sheet (handle, header con título y
  botón cerrar, divider, body de contenido, footer con acción
  secundaria y primaria). El último de los 5 componentes ausentes
  originales. No existía en la librería: diseñado de cero, componente
  `178:107` (sin variantes, como Quick Action Tile/Stat Item — su
  variabilidad es de contenido, no de estado). El footer por defecto
  reutiliza el componente `Button` real en código (no en Figma, donde
  se construyó como nodos propios, igual que el resto del repo).
  Añadido en Fase 2 el 2026-09-08.

`Quick Action Tile` y `Stat Item` fueron los primeros componentes en
usar la colección "semantic" de Figma directamente (`semantic/bg/default`,
`semantic/border/default`, `semantic/text/secondary`,
`semantic/text/disabled`) en vez de tener variables propias por
componente como Button/Card/Tab — ahora está en `src/tokens/colors.ts`
como `semantic` y `labels`.

La librería tiene además un catálogo de iconos individuales estilo SF
Symbols mucho más grande de lo que se había estimado: la Fase 0 apuntó
"~15", pero una búsqueda parcial en `search_design_system` (2026-09-03)
ya encontró 40+ (`download.and.arrow.down`, `bell.badge`,
`cart.badge.plus`, `person.crop.square`, `location.north.fill`, etc.) —
es probable que sea un pack de comunidad SF Symbols completo, no una
selección curada para la app. En vez de intentar catalogar el pack
entero como componente `Icon`, la Fase 2 debería arrancar por los
iconos con uso confirmado en componentes reales: los dos de `Stat Item`
y el "Calendar Icon" de `Quick Action Tile` son los tres primeros
candidatos, con el mismo bloqueo de descarga documentado arriba —
resolverlo (o exportar los SVG a mano desde Figma) es el siguiente paso
antes de poder construir `Icon`.

De los 5 componentes que no existían en la librería (decidido con
Alfonso el 2026-09-03: se diseñan en Figma propio, no se adoptan de una
librería de comunidad), los 5 ya están construidos y sincronizados a
código: Toggle, Badge, Avatar, Input y Modal (arriba) — cierra la
cobertura de componentes ausentes de la Fase 2.

Ninguno de los 5 construidos tiene todavía `componentKey`: se asigna
solo cuando Alfonso publica la librería desde Figma desktop (acción
manual, no expuesta por ninguna herramienta MCP disponible). Cada
metadata de componente documenta esto explícitamente con
`figma.componentKey: null` + `figma.nodeId`.

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
