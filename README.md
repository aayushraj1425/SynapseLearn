# SynapseLearn

SynapseLearn includes the CanvasLLM React interface connected to the existing
FastAPI Canvas endpoints.

## Local setup

1. Copy `.env.example` to `.env` in the repository root.
2. Set `CANVAS_BASE_URL` to your Canvas instance, such as
   `https://canvas.instructure.com`.
3. Set `CANVAS_API_TOKEN` to a Canvas personal access token. Keep this file
   private; the frontend never reads the token.
4. Start the backend from the repository root:

   ```bash
   uvicorn app.main:app --reload
   ```

5. In a second terminal, start the frontend:

   ```bash
   cd frontend
   npm install
   npm run dev
   ```

Open the address printed by Vite and choose **Connect to Canvas**. During local
development, Vite forwards frontend API requests to the backend on port `8000`.
