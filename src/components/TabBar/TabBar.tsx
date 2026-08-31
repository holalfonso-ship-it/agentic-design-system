import { tab, fontSize, fontFamily } from "../../tokens";
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
  const container: CSSProperties = {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    padding: "8px 0 20px",
    borderTop: "1px solid #E1E3EA",
    background: "#FFFFFF",
  };

  return (
    <nav style={container} aria-label="Navegación principal">
      {items.map((item) => {
        const selected = item.key === activeKey;
        const itemStyle: CSSProperties = {
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 4,
          padding: "4px 10px",
          borderRadius: 999,
          background: selected ? tab.bg.selected : tab.bg.default,
          color: selected ? tab.text.selected : tab.text.default,
          fontFamily: fontFamily.base,
          fontSize: fontSize.caption,
          fontWeight: selected ? 600 : 500,
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
