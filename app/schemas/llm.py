from pydantic import BaseModel, ConfigDict, field_validator


class LLMResponse(BaseModel):
    model_config = ConfigDict(extra="forbid")

    answer: str

    @field_validator("answer")
    @classmethod
    def validate_answer(cls, value: str) -> str:
        answer = value.strip()

        if not answer:
            raise ValueError("LLM answer cannot be empty")

        return answer