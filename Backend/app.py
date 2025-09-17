import os
from flask import Flask, request, jsonify
import pip_system_certs.wrapt_requests
from dotenv import load_dotenv
import openai

from flask_cors import CORS

load_dotenv()    #load environment variables from .env file


app = Flask(__name__)    # Initialize the Flask app
CORS(app)

openai.api_key = os.getenv("OPENAI_API_KEY")    # Set OpenAI API key from environment variable


@app.route("/", methods=["GET", "POST"])
def home():
    return "Welcome to my application"


@app.route("/transcribe-audio", methods=["POST"])
def transcribe_audio():

    if "file" not in request.files:
        return jsonify({"error": "No file part"}), 400
    
    audio_file = request.files["file"]

    if audio_file.filename == "":
        return jsonify({"error": "No selected file"}), 400
    
    try:
        audio_file.stream.seek(0)
        transcript = openai.audio.transcriptions.create(
        file=(audio_file.filename, audio_file.stream, audio_file.content_type),
        model="whisper-1"
        )


        return jsonify({"transcript": transcript.text}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)
