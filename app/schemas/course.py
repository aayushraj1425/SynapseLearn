from pydantic import BaseModel

class Course(BaseModel):
    id: int
    name: str
    course_code: str | None = None