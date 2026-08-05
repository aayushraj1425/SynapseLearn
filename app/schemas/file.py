from datetime import datetime

from pydantic import BaseModel

class Folder(BaseModel):
    id: int
    name: str
    full_name: str
    parent_id: int | None = None


class File(BaseModel):
    id: int
    name: str
    folder_id: int
    content_type: str | None = None
    size: int | None = None
    url: str | None = None
    updated_at: datetime | None = None
