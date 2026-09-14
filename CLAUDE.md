# Protocolo del sistema de diseño agéntico — AID

Este repo es la Fase 0–3 de un sistema de diseño agéntico (ver el framework
completo: "Sistema de Diseño Agéntico", documento del proyecto). Este archivo
es el Pilar 3: el protocolo que le dice a cualquier agente cómo consultar y
modificar este codebase correctamente.

## Antes de crear un componente nuevo

1. Lee `index.toon` en la raíz del repo — es el grafo de componentes
   generado por `npm run generate-index`. No explores `src/components`
   manualmente si `index.toon` ya responde la pregunta.
2. Busca por **categoría**, no por nombre exacto. Categorías actuales:
   `action`, `navigation`, `data-display`, `form` (desde Input, Fase 2),
   `overlay` (desde Modal, Fase 2).
3. Si un componente existente cubre más del 70% de las props que necesitas,
   extiéndelo (nueva variante, nueva prop) en vez de crear uno nuevo.
4. Si no existe nada parecido, revisa `src/tokens/` antes de escribir
   cualquier valor de color, radio o tamaño de fuente a mano. Ningún
   componente debe tener un hex o un px hardcodeado que ya exista como
   token.
5. **Si nada de lo anterior encaja, no fuerces el componente más
   parecido ni inventes uno nuevo por tu cuenta.** Ve la sección
   siguiente — "Cuando nada encaja" es una puerta dura (hard gate), no
   una guía.

## Cuando nada encaja — flag, no invención

Incorporado el 2026-09-03 a partir de feedback real de Phong Designs AI
Systems (Product Designer, Design Systems) en la serie de LinkedIn del
proyecto: la metadata describe qué es cada componente, pero no resuelve
la decisión extend-vs-create sobre la petición en sí. Sin una salida
legítima para "no hay nada que encaje", un agente solo tiene dos
movimientos posibles frente a una petición que no cubre ningún
componente existente — y los dos son incorrectos:

- Coger el componente más parecido aunque no encaje del todo (lo
  estira con una prop o variante ad-hoc).
- Inventarse un componente nuevo sin pasar por Figma ni por revisión.

Ambos casos "parecen" un resultado correcto pero no lo son: rompen la
trazabilidad código↔diseño y ensucian el índice con componentes que no
existen en la librería real.

**Regla dura:** si tras seguir los 4 pasos de la sección anterior ningún
componente existente cubre ≥70% de las props necesarias y ninguna
categoría existente encaja, el agente NO construye nada. En su lugar:

1. Añade una línea a `flags.jsonl` (raíz del repo, formato JSON Lines,
   solo apertura — nunca reescribas ni borres líneas existentes) con
   este esquema:

   ```json
   {
     "date": "YYYY-MM-DD",
     "requestedBy": "quién/qué originó la petición (agente, usuario, feature)",
     "brief": "descripción corta de qué se pidió construir",
     "closestComponent": "nombre del componente más parecido, o null",
     "closestCategory": "categoría más parecida, o null",
     "reason": "qué prop, variante o patrón falta para que encajara",
     "decision": "flagged"
   }
   ```

2. Responde a quien hizo la petición explicando que no hay componente
   que encaje, citando `closestComponent`/`closestCategory` y `reason`.
3. No construyas una versión provisional "mientras tanto" — el flag es
   el resultado correcto, no un paso intermedio antes de construir igual.

`flags.jsonl` es el backlog real del sistema: en vez de decidir a priori
qué componentes faltan, la Fase 2 se prioriza con casos reales donde el
sistema no dio la talla. El ciclo Audit (ver más abajo) debe releer este
archivo en cada pasada.

**Cerrar un flag (añadido en el Compose de la Fase 3, 2026-09-14, a
partir de feedback de Phong Designs AI Systems tras el post de Fase 2):**
un archivo que solo registra casos sin resolver es un backlog real
solamente si alguien está obligado a vaciarlo — si nada lo obliga, se
convierte en el sitio silencioso donde van los casos difíciles, y el
sistema parece más sano de lo que es. Por eso:

1. Cuando un flag deja de estar pendiente (se construyó el componente,
   se decidió extender uno existente, o se decidió explícitamente no
   hacer nada), añade una **nueva línea** a `flags.jsonl` (nunca edites
   ni borres la original — el archivo sigue siendo solo-apertura) con
   este esquema:

   ```json
   {
     "date": "YYYY-MM-DD",
     "resolves": "date del flag original que cierra",
     "resolution": "built" | "extended" | "wontfix",
     "detail": "qué se hizo (componente creado/extendido, o motivo de wontfix)",
     "decision": "resolved"
   }
   ```

2. El ciclo Audit no solo lee `flags.jsonl` para agrupar por
   componente/categoría — también calcula **entradas añadidas vs.
   entradas cerradas** (contando `"decision": "flagged"` frente a
   `"decision": "resolved"`) y lo reporta explícitamente. Un flag
   abierto durante varias pasadas de Audit sin ninguna entrada
   `"resolved"` que lo referencie es una señal a escalar, no un dato a
   ignorar.
3. Cerrar flags es una obligación del ciclo Audit, no una tarea
   opcional "si hay tiempo" — un Audit que solo lee el archivo sin
   intentar cerrar ninguna entrada pendiente no ha cumplido su función.

**Componente bajo vigilancia especial:** `TransactionListItem`. Button,
TabBar y ProductCard son lo bastante genéricos como para que casi
cualquier petición encaje sin forzar. `TransactionListItem` está atado a
un flujo concreto (una fila de movimiento in/out), así que es el
candidato más probable a que un agente lo estire en vez de admitir que
no encaja — por ejemplo un estado "pending", o un tipo de partida que no
sea in/out. Trátalo como el caso de prueba de esta regla.

## Al crear o modificar un componente

1. El componente vive en `src/components/<Nombre>/<Nombre>.tsx`.
2. Todo componente lleva un `<Nombre>.metadata.ts` junto al código — sin
   metadata, el componente no es visible para el índice ni para otros
   agentes. Campos obligatorios: `name`, `category`, `description`,
   `props`, `tokens`, `useWhen`, `a11y`.
3. Si el componente corresponde a algo publicado en Figma, registra
   `figma.library` y `figma.componentKey` en la metadata — es lo que
   permite trazar código → diseño y detectar cuando Figma cambia y el
   código no se actualizó (o viceversa).
4. Corre `npm run generate-index` después de cualquier cambio de
   metadata. El índice desactualizado es peor que no tener índice —
   genera falsos negativos.
5. Añade (o actualiza) `<Nombre>.stories.tsx` junto al componente —
   Storybook (Fase 4, 2026-09-14) es la vitrina navegable del sistema,
   no solo un lujo visual: cada story reutiliza la `description` y el
   `useWhen` de la metadata como texto de documentación (`tags:
   ["autodocs"]`), así que metadata y vitrina nunca se desincronizan.
   Cubre como mínimo todas las variantes/estados listados en
   `meta.states`. Verifica con `npm run build-storybook` antes de dar
   el componente por cerrado.

## Ciclo ARC — cómo auditar este sistema

- **Audit**: lee `index.toon` completo, compara contra `src/components/`
  real. Reporta cualquier carpeta de componente sin entrada en el índice,
  y cualquier entrada del índice sin carpeta correspondiente (índice
  desincronizado). Lee también `flags.jsonl` completo — cada línea
  `"flagged"` es un caso real donde el sistema no dio la talla; agrúpalas
  por `closestCategory`/`closestComponent` para ver patrones (3+ flags
  sobre el mismo componente es señal fuerte de que falta una variante
  real, o de que el componente representa dos conceptos distintos bajo
  un mismo nombre). Reporta también la métrica **añadidas vs. cerradas**
  (entradas `"flagged"` frente a `"resolved"`, ver sección de flags
  arriba) y, cuando encuentres flags `"flagged"` sin una entrada
  `"resolved"` que los referencie, intenta cerrarlos como parte del
  propio ciclo Audit en vez de solo señalarlos.
- **Report**: busca en el código consumidor (fuera de `src/components/`)
  estilos inline o valores hardcodeados que dupliquen un token existente
  o un patrón que se repita 3+ veces sin estar extraído a componente.
  Repórtalo con archivo, línea y el token/componente que debería usarse.
  Suma los hallazgos de `flags.jsonl` como parte del reporte, no aparte.
- **Compose** (fase futura, no automatizada aún en este repo): no generes
  cambios automáticos todavía — deja el reporte para revisión humana vía
  PR.

## Convenciones de este repo

- Los tokens son la única fuente de verdad de valores visuales:
  `src/tokens/colors.ts`, `radius.ts`, `typography.ts`.
- Los valores de `colors.ts`, `radius.ts` y `typography.ts` están
  **sincronizados con Figma** desde la Fase 1 (2026-09-01) — ya no son
  placeholder. Quedan dos huecos documentados como estimación razonada,
  no confirmados: `card.border` (no se encontró ningún nodo real que lo
  use) y el nombre de `button.secondary.border.default` (la variable
  real se aplica en Figma al estado pressed/loading, no al default
  visual). Señala cualquier otro valor que no cuadre al auditar — no lo
  "corrijas" inventando un valor nuevo, repórtalo.
- Stack: React + TypeScript + Vite. Sin librería de estilos externa — los
  componentes usan estilos inline a propósito, en esta fase, para
  mantener el árbol de dependencias mínimo mientras se valida la
  infraestructura agéntica.
- **Storybook** (`npm run storybook` / `npm run build-storybook`,
  añadido en la Fase 4, 2026-09-14): vitrina navegable de los 11
  componentes, organizada por categoría (mismo orden que `index.toon`).
  Cada `.stories.tsx` vive junto a su componente, igual que la
  metadata. `.storybook/main.ts` y `preview.tsx` son la única
  configuración — nada de addons no instalados (evita el error de
  `create-storybook init`, ver nota en
  `estado-tarea-agentic-design-system.md`).
