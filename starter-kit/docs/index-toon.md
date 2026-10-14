# index.toon — formato

`index.toon` es el mapa del sistema. Un agente lo lee **antes** de abrir ningún
componente, así que tiene que ser corto, barato de leer y siempre fiel al código.
Se genera; no se edita a mano.

```
# index.toon — generado 2026-10-14T14:08:08.907Z
# componentes:2 relaciones:1
Button|action|deps:none|tokens:4|estados:3|figma:0784c9db
Modal|overlay|deps:Button|tokens:3|estados:1|figma:-
```

## Cabecera

| Línea | Significado |
|---|---|
| `# index.toon — generado <ISO>` | Cuándo se generó. Si es más antigua que el último cambio de metadata, el índice está desactualizado. |
| `# componentes:N relaciones:M` | Nº de componentes con metadata y nº total de dependencias entre ellos. |

## Una línea por componente

`Nombre|categoria|deps:a,b|tokens:n|estados:n|figma:clave8`

| Campo | De dónde sale | Para qué sirve al agente |
|---|---|---|
| `Nombre` | `meta.name` (o el nombre de la carpeta) | Identificar el componente. |
| `categoria` | `meta.category` | **Buscar por categoría** antes de crear: el primer filtro de extend-vs-create. |
| `deps` | `meta.dependencies` (`none` si vacío) | Saber qué se rompe si cambias algo y qué componentes compone otro. |
| `tokens` | nº de elementos en `meta.tokens` | Un 0 en un componente con estilos es una alarma: valores hardcodeados. |
| `estados` | nº de elementos en `meta.states` | Cobertura de variantes y estados de un vistazo. |
| `figma` | primeros 8 caracteres de `meta.figma.componentKey` (`-` si no hay) | Trazabilidad diseño↔código sin gastar tokens en la clave entera. |

## Cómo lo usa un agente

1. Lee el índice completo (suele caber en unas pocas líneas por componente).
2. Filtra por categoría. Si algo cubre ≥70 % de lo que necesita, abre **solo**
   ese componente y su `.metadata.ts`.
3. Si nada encaja, no construye: abre un flag en `flags.jsonl`.

## Cómo se genera

```bash
node scripts/generate-index.mjs --components src/components --out index.toon
```

Añádelo como script de npm (`"generate-index": "node scripts/generate-index.mjs"`)
y ejecútalo en CI y en `prepublishOnly`. Un componente sin `<Nombre>.metadata.ts`
produce un aviso y queda fuera del índice.

## Límites a conocer

- Lee la metadata con expresiones regulares: sirve para el objeto literal simple
  de la plantilla. Si usas spreads, variables o arrays construidos, cambia las
  funciones `extract*` por un parser de TypeScript.
- Cuenta tokens y estados; no valida que existan. Esa comprobación es un test
  aparte (en Aida, `tokens.test.ts`).
