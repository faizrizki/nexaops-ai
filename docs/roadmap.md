# NexaOps AI roadmap

## Milestone 1 — Full-stack foundation (current)
- [x] Next.js + TypeScript starter
- [x] FastAPI API starter
- [x] Demo dashboard data endpoint
- [x] Basic backend API tests
- [x] GitHub Actions baseline
- [ ] Verify local install on developer laptop

## Milestone 2 — Production-minded application foundation
- [ ] PostgreSQL schema for products, orders, order items, and inventory movements
- [ ] SQLAlchemy models and Alembic migrations
- [ ] Seed script with synthetic business data
- [ ] Authentication and role-based access control
- [ ] Unit and integration tests for business rules

## Milestone 3 — AI business insights
- [ ] LLM provider adapter and server-side secrets
- [ ] Allowlisted, typed business tools (no unrestricted model-generated SQL)
- [ ] Natural-language sales summaries grounded in database results
- [ ] Report metadata: period, data timestamp, and source metrics
- [ ] Rate limits, timeouts, error handling, audit logs

## Milestone 4 — Document RAG
- [ ] Document upload and text extraction
- [ ] Chunking and embeddings
- [ ] PostgreSQL + pgvector retrieval
- [ ] Source citations and access filters
- [ ] Evaluation set for retrieval and answer grounding

## Milestone 5 — Forecasting
- [ ] Baseline forecast
- [ ] Time-aware train/validation split and backtesting
- [ ] MAE and WAPE (when appropriate to data)
- [ ] Forecast vs actual dashboard

## Milestone 6 — Reliability and delivery
- [ ] LLM tracing and evaluation
- [ ] Security checks, prompt-injection tests, and tenant isolation tests
- [ ] Docker setup
- [ ] Public demo deployment and environment variables
- [ ] Architecture diagram, screenshots, and demo video

## Engineering principles
- Database and deterministic backend code are the source of truth for business metrics.
- The model may call only typed, allowlisted tools.
- Sensitive actions require explicit user approval.
- Use synthetic demo data; never commit credentials or real customer data.
- Report measured performance honestly; don't invent model accuracy or latency figures.
