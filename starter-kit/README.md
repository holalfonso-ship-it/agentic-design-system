# Starter kit — sistema de diseño agéntico

Lo mínimo para que un agente de IA consulte y modifique tu sistema de diseño sin
inventarse componentes. Sale de [Aida](https://github.com/holalfonso-ship-it/agentic-design-system),
un sistema de diseño agéntico abierto, y está recortado a las piezas que no
dependen de su código.

Tres pilares:

| Pilar | Pieza del kit | Qué resuelve |
|---|---|---|
| 1. Metadata por componente | `templates/Component.metadata.ts` | El agente sabe qué es cada componente, cuándo usarlo y cuándo no. |
| 2. Índice generado | `scripts/generate-index.mjs` → `index.toon` | El agente ve el sistema entero sin abrir cada archivo. |
| 3. Protocolo | `CLAUDE.md` + `flags.jsonl` | El agente sabe qué hacer, incluida la salida legítima «nada encaja». |

## Qué hay dentro

```
CLAUDE.md                       protocolo para agentes (cópialo a la raíz)
flags.jsonl                     backlog real, vacío y listo (cópialo a la raíz)
flags.example.jsonl             tres líneas de ejemplo: abrir y cerrar flags
index.toon.example              salida real del script sobre examples/
templates/Component.metadata.ts plantilla de metadata
scripts/generate-index.mjs      generador del índice (sin dependencias)
docs/index-toon.md              formato del índice, campo a campo
examples/components/            dos componentes de ejemplo (Button, Modal)
```

## Empezar en 10 minutos

1. Copia `CLAUDE.md`, `flags.jsonl` y `scripts/generate-index.mjs` a tu repo.
2. En `CLAUDE.md`, ajusta las categorías y apunta tu «componente bajo vigilancia».
3. Por cada componente, crea `<Nombre>.metadata.ts` desde la plantilla.
4. Añade a `package.json`: `"generate-index": "node scripts/generate-index.mjs"`.
5. Ejecuta `npm run generate-index` y commitea `index.toon`.
6. Pide a tu agente una funcionalidad que **no** encaje. Si abre un flag en vez de
   construir, funciona.

## La idea que más importa

Los dos fallos de un agente ante una petición que no encaja son estirar el
componente más parecido o inventarse uno. Los dos *parecen* éxito. El flag es la
tercera salida, y el Audit está obligado a vaciarlo: si nadie cierra flags, el
archivo se convierte en el cajón donde van los casos difíciles.

## Licencia

MIT, como Aida.
