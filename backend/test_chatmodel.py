import pytest
from unittest.mock import AsyncMock, patch
import ChatModel  # Replace 'your_module' with the actual module name

@pytest.fixture
def chat_model():
    return ChatModel.ChatModel()

@pytest.mark.asyncio
async def test_generate_response(chat_model):
    user_input = "Test user input"
    expected_output = "Test chat output"

    # Mocking the httpx.AsyncClient to avoid making actual API calls
    mock_response = {"choices": [{"message": {"content": expected_output}}]}
    mock_client = AsyncMock()
    mock_client.post.return_value.__aenter__.return_value.json.return_value = mock_response

    with patch("your_module.httpx.AsyncClient", return_value=mock_client):
        response = await chat_model.generate_response(user_input)

    assert response == expected_output

if __name__ == "__main__":
    pytest.main()
