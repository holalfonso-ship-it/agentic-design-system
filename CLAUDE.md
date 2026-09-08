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

## Ciclo ARC — cómo auditar este sistema

- **Audit**: lee `index.toon` completo, compara contra `src/components/`
  real. Reporta cualquier carpeta de componente sin entrada en el índice,
  y cualquier entrada del índice sin carpeta correspondiente (índice
  desincronizado). Lee también `flags.jsonl` completo — cada línea es un
  caso real donde el sistema no dio la talla; agrúpalas por
  `closestCategory`/`closestComponent` para ver patrones (3+ flags sobre
  el mismo componente es señal fuerte de que falta una variante real).
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
