# Protocolo del sistema de diseño agéntico

Este archivo es el Pilar 3: le dice a cualquier agente cómo consultar y
modificar este codebase. Cópialo a la raíz de tu repo y ajusta las categorías,
rutas y comandos a tu proyecto.

## Antes de crear un componente nuevo

1. Lee `index.toon` en la raíz — es el grafo de componentes generado por
   `npm run generate-index`. No explores `src/components` a mano si el índice
   ya responde la pregunta.
2. Busca por **categoría**, no por nombre exacto. Categorías actuales:
   `action`, `navigation`, `data-display`, `form`, `overlay`.
   <!-- Ajusta esta lista a las categorías reales de tu sistema. -->
3. Si un componente existente cubre más del 70 % de las props que necesitas,
   extiéndelo (nueva variante, nueva prop) en vez de crear uno nuevo.
4. Si no existe nada parecido, revisa `src/tokens/` antes de escribir cualquier
   valor de color, radio, espaciado o tamaño de fuente. Ningún componente debe
   tener un hex o un px hardcodeado que ya exista como token.
5. **Si nada de lo anterior encaja, no fuerces el componente más parecido ni
   inventes uno nuevo.** Pasa a la sección siguiente. Es una puerta dura, no
   una guía.

## Cuando nada encaja — flag, no invención

Sin una salida legítima para «no hay nada que encaje», un agente solo tiene dos
movimientos, y los dos son incorrectos:

- Coger el componente más parecido y estirarlo con una prop o variante ad hoc.
- Inventarse un componente nuevo sin pasar por diseño ni revisión.

Los dos parecen un resultado correcto y no lo son: rompen la trazabilidad
diseño↔código y ensucian el índice con componentes que no existen en la
librería real.

**Regla dura:** si ningún componente cubre ≥70 % de las props necesarias y
ninguna categoría encaja, el agente NO construye nada. En su lugar:

1. Añade una línea a `flags.jsonl` (raíz, JSON Lines, **solo apertura**: nunca
   reescribas ni borres líneas existentes):

   ```json
   {
     "date": "YYYY-MM-DD",
     "requestedBy": "quién o qué originó la petición",
     "brief": "qué se pidió construir, en una frase",
     "closestComponent": "nombre del más parecido, o null",
     "closestCategory": "categoría más parecida, o null",
     "reason": "qué prop, variante o patrón falta para que encajara",
     "decision": "flagged"
   }
   ```

2. Responde a quien hizo la petición: no hay componente que encaje, citando
   `closestComponent`/`closestCategory` y `reason`.
3. No construyas una versión provisional «mientras tanto». El flag es el
   resultado correcto, no un paso previo a construir igual.

`flags.jsonl` es el backlog real del sistema: en vez de decidir a priori qué
falta, priorizas con casos reales donde el sistema no dio la talla.

### Cerrar un flag

Un archivo que solo registra casos sin resolver se convierte en el sitio
silencioso donde van los casos difíciles, y el sistema parece más sano de lo que
es. Si nadie está obligado a vaciarlo, no es un backlog. Por eso, cuando un flag
deja de estar pendiente (se construyó, se extendió un componente, o se decidió
no hacer nada) se añade una **nueva línea**; la original no se toca:

```json
{
  "date": "YYYY-MM-DD",
  "resolves": "date del flag original que cierra",
  "resolution": "built | extended | wontfix",
  "detail": "qué se hizo, o el motivo del wontfix",
  "decision": "resolved"
}
```

El ciclo Audit calcula **añadidas vs. cerradas** (`flagged` frente a
`resolved`) y lo reporta. Un flag abierto durante varias pasadas sin ninguna
entrada `resolved` que lo referencie es una señal a escalar, no un dato a
ignorar. Cerrar flags es una obligación del Audit, no una tarea «si hay tiempo».

### Componente bajo vigilancia

Elige el componente más acoplado a un flujo concreto de tu sistema y trátalo
como caso de prueba de esta regla: es el que un agente tenderá a estirar antes
que admitir que no encaja. Apúntalo aquí:

- `<NombreDelComponente>`: <por qué es el candidato más probable a estirarse>

## Al crear o modificar un componente

1. Vive en `src/components/<Nombre>/<Nombre>.tsx`.
2. Lleva un `<Nombre>.metadata.ts` al lado (parte de `templates/Component.metadata.ts`).
   Campos obligatorios: `name`, `category`, `description`, `props`, `tokens`,
   `useWhen`, `a11y`. Sin metadata, el componente no existe para el índice.
3. Si el componente existe en Figma, registra `figma.library` y
   `figma.componentKey`: es lo que permite detectar cuando uno cambia y el otro no.
4. Corre `npm run generate-index` tras cualquier cambio de metadata. Un índice
   desactualizado es peor que no tener índice: genera falsos negativos.
5. Añade o actualiza la story y los tests si tu proyecto los usa, y no des el
   componente por cerrado hasta que pasen.

## Ciclo ARC — cómo auditar este sistema

- **Audit**: lee `index.toon` completo y compáralo con `src/components/`.
  Reporta carpetas sin entrada en el índice y entradas sin carpeta. Lee
  `flags.jsonl` entero: agrupa los `flagged` por `closestCategory` /
  `closestComponent` (3 o más sobre el mismo componente señalan una variante que
  falta, o un componente que representa dos conceptos con un solo nombre).
  Reporta añadidas vs. cerradas e intenta cerrar los pendientes en el propio ciclo.
- **Report**: busca en el código consumidor (fuera de `src/components/`) estilos
  inline o valores hardcodeados que dupliquen un token, o un patrón repetido 3+
  veces sin extraer a componente. Indica archivo, línea y el token o componente
  que debería usarse. Suma los hallazgos de `flags.jsonl`.
- **Compose**: no apliques cambios automáticos. Deja el reporte para revisión
  humana vía PR.

## Convenciones

- Los tokens son la única fuente de verdad de los valores visuales.
- Si un valor no cuadra con el diseño, repórtalo; no lo «corrijas» inventando
  uno nuevo.
- Commits con Conventional Commits (`feat:`, `fix:`, `docs:`, `refactor:`,
  `test:`, `ci:`, `chore:`).
