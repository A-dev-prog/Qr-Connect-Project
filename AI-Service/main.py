from fastapi import FastAPI
from pydantic import BaseModel
from services.llm_service import generate_profile_summary

app = FastAPI()

#  Request model
class ProfileRequest(BaseModel):
    name: str
    bio: str
    profession: str
    github: str = ""

#  API
@app.post("/ai/profile-summary")
def get_summary(data: ProfileRequest):
    summary = generate_profile_summary(data.dict())

    return {
        "summary": summary
    }