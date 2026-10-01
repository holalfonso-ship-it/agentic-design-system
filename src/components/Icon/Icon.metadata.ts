/**
 * Metadata ejecutable — Pilar 1 del sistema de diseño agéntico.
 * Fuente: página "03. Icons" (51:2498) del archivo Figma "Aida" — una librería de
 * SF Symbols de Apple (1.524 componentes). Aida no redistribuye los glifos de
 * Apple (licencia): cada SF Symbol usado por los componentes se mapea a un glifo
 * de Lucide (ISC). Ver `notes`.
 */
export const meta = {
  name: "Icon",
  category: "data-display",
  description:
    "Icono de la librería: glifo SVG en línea con tamaño y color configurables. Decorativo por defecto; con `title` pasa a ser una imagen con nombre accesible.",
  figma: {
    library: "Aida",
    nodeId: "51:2498",
    type: "icon_library",
  },
  props: {
    name: [
      "calendar",
      "circle-arrow-out-up-right",
      "circle-arrow-out-down-left",
      "utensils",
      "house",
      "credit-card",
      "wallet",
      "settings",
      "lock",
      "snowflake",
      "x",
    ],
    size: "number (default 20)",
    color: "string (default currentColor)",
    title: "string?",
  },
  tokens: [],
  states: [],
  useWhen:
    "Siempre que un componente necesite un icono: pásalo como `icon` a QuickActionTile, StatItem o TransactionListItem, como `statusIcon` en ProductCard o dentro de un Button. Añade `title` solo cuando el icono comunica algo que el texto cercano no dice; si lo acompaña un texto, déjalo decorativo.",
  a11y: {
    role: "img (solo con title; sin title es decorativo y va con aria-hidden)",
    keyboardSupport: false,
    notes:
      "Sin `title` el SVG lleva aria-hidden y no entra en el árbol de accesibilidad. Con `title` lleva role='img' y aria-label. Un icono no es interactivo: si dispara una acción, envolverlo en un Button.",
  },
  dependencies: [],
  notes:
    "Ciclo ARC 3 (2026-10-01). Antes la prop `icon` de varios componentes se rellenaba con un marcador porque el asset de Figma no se podía descargar por el egress de red; `use_figma` + exportAsync resolvió el bloqueo técnico, pero los iconos de Figma son SF Symbols (licencia de Apple: solo plataformas de Apple) y Aida es un repo/Storybook públicos en web. Decisión con Alfonso: set abierto de Lucide (ISC), con el aviso de copyright en icons.ts. Mapeo SF Symbol → nombre de Icon: calendar.circle.fill → calendar; arrow.up.right.circle.fill → circle-arrow-out-up-right; arrow.down.left.circle.fill → circle-arrow-out-down-left; fork.knife.circle.fill → utensils; house → house; creditcard → credit-card; wallet.pass → wallet; gearshape → settings; lock.fill (estado bloqueado) → lock; snowflake (estado congelado) → snowflake. Divergencia visual conocida: los SF Symbols de Figma son iconos rellenos o con círculo, y los de Lucide son de trazo de 2 px. Para añadir un icono: copiar sus nodos de lucide-static/icons/<nombre>.svg a icons.ts y añadir el nombre a `props.name` de esta metadata.",
} as const;
