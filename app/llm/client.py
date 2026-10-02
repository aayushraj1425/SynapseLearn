from abc import ABC, abstractmethod

from app.schemas.llm import LLMResponse


class LLMClient(ABC):
    @abstractmethod
    def generate(self, prompt: str) -> LLMResponse:
        pass
