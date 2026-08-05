"""
Talks to the Canvas REST API: courses, folders, and files.
"""

import httpx

from app.schemas.course import Course
from app.schemas.file import File, Folder


class CanvasClient:
    def __init__(self, base_url: str, token: str) -> None:
        self._client = httpx.Client(
            base_url=f"{base_url}/api/v1",
            headers={"Authorization": f"Bearer {token}"},
            timeout=30.0,
        )

    def list_courses(self) -> list[Course]:
        rows = self._get("/courses", {"enrollment_state": "active", "per_page": 100})
        return [
            Course(id=r["id"], name=r.get("name", ""), course_code=r.get("course_code"))
            for r in rows
        ]

    def list_folders(self, course_id: int) -> list[Folder]:
        rows = self._get(f"/courses/{course_id}/folders", {"per_page": 100})
        return [
            Folder(
                id=r["id"],
                name=r["name"],
                full_name=r["full_name"],
                parent_id=r.get("parent_folder_id"),
            )
            for r in rows
        ]

    def list_files(self, course_id: int) -> list[File]:
        rows = self._get(f"/courses/{course_id}/files", {"per_page": 100})
        return [
            File(
                id=r["id"],
                name=r["display_name"],
                folder_id=r["folder_id"],
                content_type=r.get("content-type"),
                size=r.get("size"),
                url=r.get("url"),
                updated_at=r.get("updated_at"),
            )
            for r in rows
        ]

    def _get(self, path: str, params: dict) -> list[dict]:
        response = self._client.get(path, params=params)
        response.raise_for_status()
        return response.json()