# SynapseLearn frontend

This React + Vite frontend preserves the CanvasLLM interface while using the
FastAPI endpoints provided by SynapseLearn.

## Run locally

Start the FastAPI backend on port `8000`, then run:

```bash
npm install
npm run dev
```

Vite proxies `/health` and `/courses` to `http://127.0.0.1:8000`. For a deployed
backend, set `VITE_API_URL` to its public origin when building the frontend.

The Canvas API token belongs only in the repository root `.env` file. Never put
it in a `VITE_` environment variable because those values are browser-visible.
