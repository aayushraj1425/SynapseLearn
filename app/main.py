"""
Builds the FastAPI app and mounts the routes.
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

import app.models
from app.api.auth import router as auth_router
from app.api.courses import router as courses_router
from app.db.database import Base, engine

Base.metadata.create_all(bind=engine)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router)
app.include_router(courses_router)

@app.get("/health", tags=["system"])
def health():
    return {"status": "ok"}