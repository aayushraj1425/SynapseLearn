"""
Builds the FastAPI app and mounts the routes.
"""

from fastapi import FastAPI

from app.api.courses import router as courses_router

app = FastAPI()
app.include_router(courses_router)

@app.get("/health", tags=["system"])
def health():
    return {"status": "ok"}