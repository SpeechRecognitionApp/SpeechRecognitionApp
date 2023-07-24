from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from voice_recognition import transcribe_audio

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

@app.route('/transcribe', methods=['POST'])
def transcribe():
    if 'audio' not in request.files:
        return jsonify({"error": "No audio part"}), 400

    file = request.files['audio']

    # Check if the MIME type is audio/wav
    if file.mimetype.lower() != 'audio/wav':
        return jsonify({"error": "File format not supported, please upload a .wav file"}), 400

    # Transcribe the audio file using Vosk
    result = transcribe_audio(file)

    if not result:
        return jsonify({"error": "The voice command you entered is incorrect"}), 400

    # Return the transcription result
    return result, 200

if __name__ == '__main__':
    app.run(debug=True)
