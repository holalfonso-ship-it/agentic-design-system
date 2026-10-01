import { tab, semantic, fontSize, fontFamily, radius, space, fontWeight } from "../../tokens";
import type { CSSProperties } from "react";

export interface TabBarItem {
  key: string;
  label: string;
  icon?: React.ReactNode;
}

export interface TabBarProps {
  items: TabBarItem[];
  activeKey: string;
  onChange?: (key: string) => void;
}

/**
 * TabBar — navegación inferior de la app (iOS tab bar).
 * Corresponde al component set "Tab Bar" en la librería Figma AID.
 * Ver TabBar.metadata.ts.
 */
export function TabBar({ items, activeKey, onChange }: TabBarProps) {
  // Corregido en el Audit de la Fase 3 (2026-09-14): "#E1E3EA" no
  // correspondía a ningún token real ni nodo de Figma (resto de la
  // Fase 0 nunca sincronizado). Releído el component real "Tab Bar"
  // (83:4772) vía get_design_context: el fondo es blanco puro
  // (neutral/white, igual que semantic.bg.surface, ya usado en el
  // resto del repo) y el borde real es "#E9E9E9" — un valor que en el
  // propio Figma tampoco está bindeado a ninguna variable (color de
  // trazo directo, no un token), así que se mantiene como hex literal
  // en vez de inventar un token que Figma no tiene.
  const container: CSSProperties = {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    padding: `${space["8"]}px 0 ${space["24"]}px`, // 20 → space/24 (único uso; empate 16/24 → el mayor)
    borderTop: "1px solid #E9E9E9",
    background: semantic.bg.surface,
  };

  return (
    <nav style={container} aria-label="Navegación principal">
      {items.map((item) => {
        const selected = item.key === activeKey;
        const itemStyle: CSSProperties = {
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: space["4"],
          padding: `${space["4"]}px ${space["12"]}px`, // 10 → space/12 (único uso; empate 8/12 → el mayor)
          borderRadius: radius.full,
          background: selected ? tab.bg.selected : tab.bg.default,
          color: selected ? tab.text.selected : tab.text.default,
          fontFamily: fontFamily.base,
          fontSize: fontSize.caption,
          fontWeight: selected ? fontWeight.semibold : fontWeight.medium,
          border: "none",
          cursor: "pointer",
        };

        return (
          <button
            key={item.key}
            type="button"
            style={itemStyle}
            aria-current={selected ? "page" : undefined}
            onClick={() => onChange?.(item.key)}
          >
            {item.icon}
            <span>{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
}
