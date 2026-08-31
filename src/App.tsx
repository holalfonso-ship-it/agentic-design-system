import { useState } from "react";
import { Button } from "./components/Button";
import { TabBar } from "./components/TabBar";
import { ProductCard } from "./components/ProductCard";
import { TransactionListItem } from "./components/TransactionListItem";

export default function App() {
  const [activeTab, setActiveTab] = useState("home");

  return (
    <div style={{ maxWidth: 380, margin: "40px auto", fontFamily: "sans-serif" }}>
      <h1 style={{ fontSize: 20 }}>Fase 0 — vitrina de componentes</h1>

      <section style={{ display: "flex", gap: 8, marginBottom: 24 }}>
        <Button variant="primary">Continuar</Button>
        <Button variant="secondary">Cancelar</Button>
        <Button variant="tertiary">Omitir</Button>
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
