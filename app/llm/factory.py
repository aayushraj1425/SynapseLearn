from collections.abc import Callable
from typing import Protocol

from app.llm.client import LLMClient


class LLMSettings(Protocol):
    llm_provider: str


class LLMClientFactory:
    def __init__(self, providers: dict[str, Callable[[], LLMClient]]) -> None:
        self._providers = providers

    def create(self, settings: LLMSettings) -> LLMClient:
        provider = self._providers.get(settings.llm_provider)

        if provider is None:
            raise ValueError(
                f"Unsupported LLM provider: {settings.llm_provider}"
            )

        return provider()
