"use client";

import { useEffect, useMemo, useState } from "react";
import { getDashboardSummary, type DashboardSummary } from "@/lib/api";

const formatRupiah = (value: number) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value);

const fallbackData: DashboardSummary = {
  currency: "IDR",
  revenue_this_month: 42850000,
  revenue_previous_month: 39100000,
  orders_this_month: 284,
  average_order_value: 150880,
  low_stock_items: 7,
  revenue_trend: [
    { month: "Mei", revenue: 24800000 },
    { month: "Jun", revenue: 29100000 },
    { month: "Jul", revenue: 27500000 },
    { month: "Agu", revenue: 33400000 },
    { month: "Sep", revenue: 39100000 },
    { month: "Okt", revenue: 42850000 },
  ],
  top_products: [
    { name: "Daily Tote Bag", units_sold: 96 },
    { name: "Classic Sneakers", units_sold: 82 },
    { name: "Minimalist Wallet", units_sold: 67 },
    { name: "Canvas Backpack", units_sold: 54 },
  ],
  data_note: "Data contoh hanya untuk pratinjau UI.",
};

function formatCompact(value: number) {
  if (value >= 1_000_000) return `Rp${(value / 1_000_000).toLocaleString("id-ID", { maximumFractionDigits: 1 })} jt`;
  return formatRupiah(value);
}

export default function Home() {
  const [data, setData] = useState<DashboardSummary>(fallbackData);
  const [apiOnline, setApiOnline] = useState(false);
  const [lastUpdated, setLastUpdated] = useState("Memuat data...");

  useEffect(() => {
    const controller = new AbortController();
    getDashboardSummary(controller.signal)
      .then((result) => {
        setData(result);
        setApiOnline(true);
        setLastUpdated(`Terhubung · ${new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" })}`);
      })
      .catch(() => {
        setApiOnline(false);
        setLastUpdated("Mode pratinjau · API belum terhubung");
      });
    return () => controller.abort();
  }, []);

  const change = useMemo(() => {
    if (!data.revenue_previous_month) return 0;
    return ((data.revenue_this_month - data.revenue_previous_month) / data.revenue_previous_month) * 100;
  }, [data.revenue_this_month, data.revenue_previous_month]);

  const maxRevenue = Math.max(...data.revenue_trend.map((point) => point.revenue), 1);

  return (
    <main className="app-shell">
      <aside className="sidebar">
        <div className="brand-lockup">
          <div className="brand-mark">N</div>
          <div><strong>NexaOps</strong><span>BUSINESS INTELLIGENCE</span></div>
        </div>
        <div className="workspace-label">WORKSPACE</div>
        <button className="nav-item active"><span className="nav-icon">◫</span> Overview <span className="nav-dot" /></button>
        <button className="nav-item" disabled><span className="nav-icon">▤</span> Transactions <span className="coming-soon">Soon</span></button>
        <button className="nav-item" disabled><span className="nav-icon">◇</span> Inventory <span className="coming-soon">Soon</span></button>
        <button className="nav-item" disabled><span className="nav-icon">✧</span> AI Insights <span className="coming-soon">Soon</span></button>
        <div className="sidebar-bottom">
          <div className="avatar">DR</div>
          <div className="user-info"><strong>Demo Retail</strong><span>Workspace owner</span></div>
          <span className="more">···</span>
        </div>
      </aside>

      <section className="main-panel">
        <header className="topbar">
          <div className="breadcrumbs"><span>Workspace</span><b>/</b><strong>Overview</strong></div>
          <div className="topbar-actions"><span className={`connection-pill ${apiOnline ? "online" : "offline"}`}><span />{apiOnline ? "API connected" : "Preview mode"}</span><button className="icon-button" aria-label="Notifications">♧</button><div className="mini-avatar">DR</div></div>
        </header>

        <div className="page-content">
          <div className="page-heading">
            <div><div className="eyebrow">WEDNESDAY, OCTOBER 21, 2026</div><h1>Good morning, team <span>✦</span></h1><p>Here&apos;s what&apos;s happening with your business today.</p></div>
            <button className="date-button">▦ <span>Last 6 months</span>⌄</button>
          </div>

          <section className="ai-banner">
            <div className="ai-symbol"><span>✳</span></div>
            <div className="ai-banner-copy"><div className="ai-label">NEXA AI <span>COMING NEXT</span></div><h2>Your business data, ready for a conversation.</h2><p>Ask questions, uncover trends, and get grounded recommendations from your business data.</p></div>
            <button className="ai-preview-button" disabled>AI assistant <span>↗</span></button>
            <div className="banner-orb orb-one"/><div className="banner-orb orb-two"/>
          </section>

          <div className="section-heading"><div><h2>Performance overview</h2><p>Key metrics for your business</p></div><span className="updated-label">● {lastUpdated}</span></div>
          <div className="metric-grid">
            <article className="metric-card"><div className="metric-top"><span>Total revenue</span><span className="metric-icon purple">↗</span></div><strong className="metric-value">{formatCompact(data.revenue_this_month)}</strong><div className="metric-foot"><span className={change >= 0 ? "trend-up" : "trend-down"}>{change >= 0 ? "↗" : "↘"} {Math.abs(change).toFixed(1)}%</span><span>vs. last month</span></div><div className="sparkline spark-purple"><i/><i/><i/><i/><i/><i/><i/><i/></div></article>
            <article className="metric-card"><div className="metric-top"><span>Orders this month</span><span className="metric-icon blue">▤</span></div><strong className="metric-value">{data.orders_this_month.toLocaleString("id-ID")}</strong><div className="metric-foot"><span className="muted">Completed orders</span></div><div className="sparkline spark-blue"><i/><i/><i/><i/><i/><i/><i/><i/></div></article>
            <article className="metric-card"><div className="metric-top"><span>Average order value</span><span className="metric-icon orange">◈</span></div><strong className="metric-value">{formatCompact(data.average_order_value)}</strong><div className="metric-foot"><span className="muted">Per transaction</span></div><div className="sparkline spark-orange"><i/><i/><i/><i/><i/><i/><i/><i/></div></article>
            <article className="metric-card"><div className="metric-top"><span>Low stock items</span><span className="metric-icon pink">!</span></div><strong className="metric-value">{data.low_stock_items}</strong><div className="metric-foot"><span className={data.low_stock_items > 0 ? "trend-warn" : "trend-up"}>{data.low_stock_items > 0 ? "Needs attention" : "All stocked"}</span></div><div className="stock-track"><span style={{ width: `${Math.min(data.low_stock_items * 7, 100)}%` }}/></div></article>
          </div>

          <div className="detail-grid">
            <section className="panel revenue-panel"><div className="panel-heading"><div><h3>Revenue overview</h3><p>Monthly revenue performance</p></div><button className="more-button">···</button></div><div className="chart-legend"><span><i/> Revenue</span><span className="chart-period">Last 6 months</span></div><div className="bar-chart" role="img" aria-label="Grafik batang tren pendapatan enam bulan terakhir">{data.revenue_trend.map((point) => <div className="bar-column" key={point.month}><div className="bar-value">{formatCompact(point.revenue)}</div><div className="bar-track"><div className="bar" style={{ height: `${Math.max((point.revenue / maxRevenue) * 100, 5)}%` }}/></div><span>{point.month}</span></div>)}</div><div className="chart-footer"><span>Showing monthly revenue</span><strong>{data.currency}</strong></div></section>
            <section className="panel products-panel"><div className="panel-heading"><div><h3>Top products</h3><p>Best sellers by units sold</p></div><button className="text-link" disabled>View all ↗</button></div><div className="product-list">{data.top_products.map((product, index) => <div className="product-row" key={product.name}><div className={`product-thumb thumb-${index + 1}`}>{["◈", "◒", "▱", "◇"][index % 4]}</div><div className="product-details"><strong>{product.name}</strong><span>{product.units_sold} units sold</span></div><div className="product-rank">#{index + 1}</div></div>)}</div><div className="products-footer"><span>Based on demo sales data</span><span>→</span></div></section>
          </div>

          <div className="bottom-note"><span className="note-icon">i</span><span><strong>Portfolio demo:</strong> Synthetic sample data. AI features, persistent database, and authentication will be added in future milestones.</span><span className="source-note">{data.data_note}</span></div>
          <footer><span>© 2026 NexaOps AI</span><span>Built to make business decisions clearer <b>✦</b></span></footer>
        </div>
      </section>
    </main>
  );
}
