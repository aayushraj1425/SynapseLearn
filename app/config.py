"""Application settings, loaded from the environment / `.env`.

One module owns configuration so there's a single place to look when something
is misconfigured. The Canvas values have no defaults: without them the app
can't talk to Canvas, so we want it to fail at startup rather than mid-request.
"""

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        extra="ignore",
    )

    canvas_base_url: str
    canvas_api_token: str

settings = Settings()