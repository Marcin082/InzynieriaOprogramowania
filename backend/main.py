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
@app.post("/sendMessage")
async def sendMessage(request: Request):
    try:
        data = await request.json()  
        print('body', data)
        return 'Hello'
    except Exception as e:
        return {"error": str(e)}

