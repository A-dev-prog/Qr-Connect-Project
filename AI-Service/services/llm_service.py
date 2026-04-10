import os
import requests
from dotenv import load_dotenv

load_dotenv()

GROQ_API_KEY = os.getenv("GROQ_API_KEY")

def generate_profile_summary(data):

    prompt = f"""
Create a professional developer summary for:

Name: {data.get("name")}
Profession: {data.get("profession")}
Skills: Java, Spring Boot, React
Bio: {data.get("bio")}

Make it suitable for recruiters.
"""

    url = "https://api.groq.com/openai/v1/chat/completions"

    headers = {
        "Authorization": f"Bearer {GROQ_API_KEY}",
        "Content-Type": "application/json"
    }

    body = {
        "model": "llama-3.1-8b-instant",
        "messages": [
            {"role": "user", "content": prompt}
        ],
        "temperature": 0.7
    }

    response = requests.post(url, headers=headers, json=body)

    print("STATUS:", response.status_code)
    print("RESPONSE:", response.text)  #  DEBUG

    if response.status_code != 200:
        return "Error generating summary"

    return response.json()["choices"][0]["message"]["content"]