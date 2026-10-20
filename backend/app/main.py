from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.routes import router

app = FastAPI(
    title="NexaOps AI API",
    description="API foundation for the NexaOps AI business operations copilot.",
    version="0.1.0",
)

# Local development only. Restrict this list to the deployed frontend origins later.
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],
    allow_credentials=False,
    allow_methods=["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allow_headers=["*"],
)

app.include_router(router)


@app.get("/", tags=["root"])
def root() -> dict[str, str]:
    return {"message": "NexaOps AI API", "docs": "/docs"}
