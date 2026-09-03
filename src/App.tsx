import { useState } from "react";
import { Button } from "./components/Button";
import { TabBar } from "./components/TabBar";
import { ProductCard } from "./components/ProductCard";
import { TransactionListItem } from "./components/TransactionListItem";
import { QuickActionTile } from "./components/QuickActionTile";
import { StatItem } from "./components/StatItem";
import { Toggle } from "./components/Toggle";

// Icono de relleno genérico para la vitrina — QuickActionTile y StatItem
// exigen la prop `icon` (ver nota en su metadata sobre por qué no traen
// un icono por defecto). No reproduce ningún asset real de Figma.
function PlaceholderIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="10" cy="10" r="9" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

export default function App() {
  const [activeTab, setActiveTab] = useState("home");

  return (
    <div style={{ maxWidth: 380, margin: "40px auto", fontFamily: "sans-serif" }}>
      <h1 style={{ fontSize: 20 }}>Fase 0-2 — vitrina de componentes</h1>

      <section style={{ display: "flex", gap: 8, marginBottom: 24 }}>
        <Button variant="primary">Continuar</Button>
        <Button variant="secondary">Cancelar</Button>
        <Button variant="tertiary">Omitir</Button>
      </section>

      <section style={{ display: "flex", gap: 20, marginBottom: 24 }}>
        <StatItem icon={<PlaceholderIcon />} label="Balance total" amount="€7.783,00" />
        <StatItem icon={<PlaceholderIcon />} label="Total Gastos" amount="€1.204,50" />
      </section>

      <section style={{ display: "flex", gap: 8, marginBottom: 24 }}>
        <QuickActionTile icon={<PlaceholderIcon />} title="Transferencias" subtitle="Feb · Mar · Abr · May" />
        <QuickActionTile icon={<PlaceholderIcon />} title="Pagar" subtitle="Recibos y servicios" />
      </section>

      <section style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 24 }}>
        <Toggle checked={true} onChange={() => {}} aria-label="Notificaciones" />
        <Toggle checked={false} onChange={() => {}} aria-label="Modo oscuro" />
        <Toggle checked={true} disabled aria-label="Biometría (bloqueado)" />
        <Toggle checked={false} disabled aria-label="Ubicación (bloqueado)" />
      </section>

      <section style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 24 }}>
        <ProductCard variant="bnpl" title="Compra en 3 pagos" subtitle="Próximo pago: 12 sep" amount="45,00 €" />
        <ProductCard variant="credit" title="Tarjeta Visa ····4821" subtitle="Límite disponible" amount="1.230,00 €" />
        <ProductCard variant="frozen" title="Tarjeta congelada" subtitle="Bloqueada por el usuario" />
      </section>

      <section style={{ marginBottom: 24 }}>
        <TransactionListItem merchant="Carrefour" category="Supermercado" amount="34,20 €" direction="out" timestamp="hoy" />
        <TransactionListItem merchant="Nómina" category="Ingreso" amount="1.800,00 €" direction="in" timestamp="ayer" />
      </section>

      <TabBar
        activeKey={activeTab}
        onChange={setActiveTab}
        items={[
          { key: "home", label: "Inicio" },
          { key: "cards", label: "Tarjetas" },
          { key: "activity", label: "Movimientos" },
          { key: "profile", label: "Perfil" },
        ]}
      />
    </div>
  );
}
