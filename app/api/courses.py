"""HTTP routes for courses, folders, and files.
"""

from fastapi import APIRouter, Depends

from app.canvas.client import CanvasClient
from app.config import settings
from app.schemas.course import Course
from app.schemas.file import File, Folder

router = APIRouter(prefix="/courses", tags=["courses"])

def get_canvas_client() -> CanvasClient:
    return CanvasClient(settings.canvas_base_url, settings.canvas_api_token)


@router.get("", response_model=list[Course])
def list_courses(client: CanvasClient = Depends(get_canvas_client)):
    return client.list_courses()


@router.get("/{course_id}/folders", response_model=list[Folder])
def list_folders(course_id: int, client: CanvasClient = Depends(get_canvas_client)):
    return client.list_folders(course_id)


@router.get("/{course_id}/files", response_model=list[File])
def list_files(course_id: int, client: CanvasClient = Depends(get_canvas_client)):
    return client.list_files(course_id)