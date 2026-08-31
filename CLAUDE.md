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
   `action`, `navigation`, `data-display`.
3. Si un componente existente cubre más del 70% de las props que necesitas,
   extiéndelo (nueva variante, nueva prop) en vez de crear uno nuevo.
4. Si no existe nada parecido, revisa `src/tokens/` antes de escribir
   cualquier valor de color, radio o tamaño de fuente a mano. Ningún
   componente debe tener un hex o un px hardcodeado que ya exista como
   token.

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
  desincronizado).
- **Report**: busca en el código consumidor (fuera de `src/components/`)
  estilos inline o valores hardcodeados que dupliquen un token existente
  o un patrón que se repita 3+ veces sin estar extraído a componente.
  Repórtalo con archivo, línea y el token/componente que debería usarse.
- **Compose** (fase futura, no automatizada aún en este repo): no generes
  cambios automáticos todavía — deja el reporte para revisión humana vía
  PR.

## Convenciones de este repo

- Los tokens son la única fuente de verdad de valores visuales:
  `src/tokens/colors.ts`, `radius.ts`, `typography.ts`.
- Los valores de color en `colors.ts` son placeholder hasta sincronizar
  los valores exactos de Figma — no los trates como definitivos al
  auditar contraste o accesibilidad; señala el placeholder si lo
  detectas, no lo "corrijas" inventando un valor.
- Stack: React + TypeScript + Vite. Sin librería de estilos externa — los
  componentes usan estilos inline a propósito, en esta fase, para
  mantener el árbol de dependencias mínimo mientras se valida la
  infraestructura agéntica.
