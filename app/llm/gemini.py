from google import genai
from google.genai import types

from app.llm.client import LLMClient
from app.schemas.llm import LLMResponse


class GeminiClient(LLMClient):
    def __init__(self, api_key: str) -> None:
        self._client = genai.Client(api_key=api_key)

    def generate(self, prompt: str) -> LLMResponse:
        response = self._client.models.generate_content(
            model="gemini-2.5-flash",
            contents=prompt,
            config=types.GenerateContentConfig(
                response_mime_type="application/json",
                response_schema=LLMResponse,
            ),
        )
        return LLMResponse.model_validate_json(response.text or "")
