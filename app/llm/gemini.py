from google import genai

from app.llm.client import LLMClient
from app.schemas.llm import LLMResponse


class GeminiClient(LLMClient):
    def __init__(self, api_key: str) -> None:
        self._client = genai.Client(api_key=api_key)

    def generate(self, prompt: str) -> LLMResponse:
        interaction = self._client.interactions.create(
            model="gemini-3.5-flash-lite",
            input=prompt,
            response_format={
                "type": "text",
                "mime_type": "application/json",
                "schema": LLMResponse.model_json_schema(),
            },
        )
        return LLMResponse.model_validate_json(interaction.output_text or "")
