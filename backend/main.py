from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import ChatModel

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

gpt3_chat = ChatModel.ChatModel()

class ChatInput(BaseModel):
    inputText: str
    maxInputText: int

@app.post("/sendMessage")
async def chat_with_gpt(request: ChatInput):
    chat_input = request.inputText
    chat_input_max = request.maxInputText
    print('XXX',chat_input,chat_input_max)
    chat_output = await gpt3_chat.generate_response(chat_input,chat_input_max)
    print(chat_input)
    return chat_output
