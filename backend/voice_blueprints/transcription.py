# voice_blueprints/transcription.py
from flask import Blueprint, request, jsonify
from .voice_recognition import transcribe_audio

transcription = Blueprint('transcription', __name__)


@transcription.route('/transcribe', methods=['POST'])
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
