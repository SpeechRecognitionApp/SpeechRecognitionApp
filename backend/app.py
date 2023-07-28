from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import json
from vosk import Model, KaldiRecognizer
from flask_socketio import SocketIO
import pyaudio

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})
socketio = SocketIO(app, cors_allowed_origins="*")

model = Model(lang="en-us")


def extract_text_and_check_for_keywords(data_json):
    # Parse JSON data
    data = json.loads(data_json)

    # Extract the text field's content
    text = data.get("text", "")

    # Split the text into words
    words = text.split()

    if "deposit" in words:
        return json.dumps({"text": "deposit"})
    elif "withdraw" in words:
        return json.dumps({"text": "withdraw"})
    elif "transfer" in words:
        return json.dumps({"text": "transfer"})


    # If none of the keywords are found, return None
    return None

def transcribe():
    recognizer = KaldiRecognizer(model, 16000)
    mic = pyaudio.PyAudio()
    stream = mic.open(format=pyaudio.paInt16, channels=1, rate=16000, input=True, frames_per_buffer=8192)

    while True:
        data = stream.read(4096)
        if recognizer.AcceptWaveform(data):
            text = recognizer.Result()
            result = extract_text_and_check_for_keywords(text)
            print(result)
            if result:
                # Emit recognized text to frontend via WebSocket
                socketio.emit('recognized_text', result)

if __name__ == '__main__':
    # Start constant voice recognition in the background
    socketio.start_background_task(target=transcribe)

    socketio.run(app, debug=True,allow_unsafe_werkzeug=True)
