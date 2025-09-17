import os
import openai
from dotenv import load_dotenv
import httpx
import ssl


load_dotenv()

# openai.api_key = os.getenv("OPENAI_API_KEY")

# try:
#     # Simple test call to verify connection
#     response = openai.chat.completions.create(
#         model="gpt-4o-mini",
#         messages=[{"role": "user", "content": "Hello"}]
#     )
#     print(response.choices[0].message.content)

#     print("API reachable! Response:", response)
# except Exception as e:
#     print("Connection error:", e)
try:
    import httpx
    original_create_ssl_context = httpx._config.DEFAULT_SSL_CONTEXT

    def create_unverified_context():
        context = ssl.create_default_context()
        context.check_hostname = False
        context.verify_mode = ssl.CERT_NONE
        return context

    httpx._config.DEFAULT_SSL_CONTEXT = create_unverified_context()
except Exception as e:
    print("Could not monkeypatch httpx SSL context:", e)

openai.api_key = os.getenv("OPENAI_API_KEY")

response = openai.ChatCompletion.create(
    model="gpt-4o-mini",
    messages=[{"role": "user", "content": "Hello"}],
)

print(response.choices[0].message.content)


