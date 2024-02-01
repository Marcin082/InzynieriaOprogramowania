from pydantic import BaseModel
import httpx
from dotenv import load_dotenv
import os

load_dotenv()

class ChatModel:
    def __init__(self):
        self.api_key = os.getenv("OPENAI_API_KEY")

    async def generate_response(self, user_input, user_max_input):
        print(user_input, user_max_input)
        async with httpx.AsyncClient() as client:
            response = await client.post(
                "https://api.openai.com/v1/chat/completions",
                headers={
                    "Authorization": f"Bearer {self.api_key}",
                    "Content-Type": "application/json"
                },
                json={
                    "messages": [
                        {"role": "system", "content": "You finish user's sentence."},
                        {"role": "user", "content": user_input}
                    ],
                    "model": "gpt-3.5-turbo",
                    "max_tokens": user_max_input,
                    "temperature": 0.7,
                    "n": 1,
                    "stop": None
                }
            )
        print(response)
        chat_output = response.json()["choices"][0]["message"]["content"].strip()
        return chat_output
