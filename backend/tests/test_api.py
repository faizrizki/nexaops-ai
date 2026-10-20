from fastapi.testclient import TestClient

from app.main import app

client = TestClient(app)


def test_health_endpoint() -> None:
    response = client.get("/api/v1/health")
    assert response.status_code == 200
    assert response.json()["status"] == "ok"


def test_dashboard_summary_returns_expected_shape() -> None:
    response = client.get("/api/v1/dashboard/summary")
    assert response.status_code == 200
    body = response.json()
    assert body["currency"] == "IDR"
    assert body["revenue_this_month"] > 0
    assert len(body["revenue_trend"]) == 6
    assert len(body["top_products"]) >= 1
