import os
import httpx
import pytest
from dotenv import load_dotenv
from unittest.mock import AsyncMock

from ChatModel import ChatModel  # Replace 'your_module' with the actual module name containing ChatModel

load_dotenv()

@pytest.fixture
def chat_model():
    return ChatModel()

@pytest.mark.asyncio
async def test_generate_response(chat_model, monkeypatch):
    # Mock the httpx.AsyncClient.post method to avoid making actual API calls
    async def mock_post(*args, **kwargs):
        response_mock = AsyncMock()
        response_mock.json.return_value = {
            "choices": [{"message": {"content": "Mocked response"}}]
        }
        return response_mock

    monkeypatch.setattr(httpx.AsyncClient, 'post', mock_post)

    # Test case
    user_input = "Test user input"
    response = await chat_model.generate_response(user_input)
    
    assert response == "Mocked response"

# You can add more test cases as needed
