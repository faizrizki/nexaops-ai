export type RevenuePoint = {
  month: string;
  revenue: number;
};

export type TopProduct = {
  name: string;
  units_sold: number;
};

export type DashboardSummary = {
  currency: string;
  revenue_this_month: number;
  revenue_previous_month: number;
  orders_this_month: number;
  average_order_value: number;
  low_stock_items: number;
  revenue_trend: RevenuePoint[];
  top_products: TopProduct[];
  data_note: string;
};

const API_BASE_URL = (process.env.NEXT_PUBLIC_API_URL ?? "http://127.0.0.1:8000").replace(/\/$/, "");

export async function getDashboardSummary(signal?: AbortSignal): Promise<DashboardSummary> {
  const response = await fetch(`${API_BASE_URL}/api/v1/dashboard/summary`, {
    cache: "no-store",
    signal,
  });

  if (!response.ok) {
    throw new Error(`API returned ${response.status}`);
  }

  return (await response.json()) as DashboardSummary;
}
