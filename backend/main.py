from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
@app.post("/chat")
async def chat_with_gpt(request: ChatRequest):
    # Join all the messages into a single string
    chat_input = "\n".join(request.messages)

    # Call the OpenAI API to get the chat response
    async with httpx.AsyncClient() as client:
        response = await client.post(
            "https://api.openai.com/v1/chat/completions",
            headers={
                "Authorization": "Bearer YOUR_OPENAI_API_KEY",
                "Content-Type": "application/json"
            },
            json={
                "messages": [{"role": "system", "content": "You finish user's sentence."}, {"role": "user", "content": chat_input}],
                "model": "gpt-3.5-turbo",
                "max_tokens": 50,
                "temperature": 0.7,
                "n": 1,
                "stop": None
            }
        )

    # Extract the generated message from the API response
    chat_output = response.json()["choices"][0]["message"]["content"].strip()

    return ChatResponse(message=chat_output)
