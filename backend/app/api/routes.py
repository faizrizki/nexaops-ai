from fastapi import APIRouter

router = APIRouter(prefix="/api/v1")


@router.get("/health", tags=["health"])
def health_check() -> dict[str, str]:
    """Simple liveness endpoint; it does not imply a database is connected."""
    return {"status": "ok", "service": "nexaops-ai-api", "version": "0.1.0"}


@router.get("/dashboard/summary", tags=["dashboard"])
def dashboard_summary() -> dict:
    """Return synthetic demo metrics until persistence is added in Milestone 2."""
    return {
        "currency": "IDR",
        "revenue_this_month": 42_850_000,
        "revenue_previous_month": 39_100_000,
        "orders_this_month": 284,
        "average_order_value": 150_880,
        "low_stock_items": 7,
        "revenue_trend": [
            {"month": "Mei", "revenue": 24_800_000},
            {"month": "Jun", "revenue": 29_100_000},
            {"month": "Jul", "revenue": 27_500_000},
            {"month": "Agu", "revenue": 33_400_000},
            {"month": "Sep", "revenue": 39_100_000},
            {"month": "Okt", "revenue": 42_850_000},
        ],
        "top_products": [
            {"name": "Daily Tote Bag", "units_sold": 96},
            {"name": "Classic Sneakers", "units_sold": 82},
            {"name": "Minimalist Wallet", "units_sold": 67},
            {"name": "Canvas Backpack", "units_sold": 54},
        ],
        "data_note": "Data sintetis untuk keperluan demo.",
    }
