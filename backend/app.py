import requests
from flask import Flask, request, jsonify, Response
from flask_cors import CORS
from backend.blueprints.voice_recognition import transcribe_audio

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


@app.route('/proxy/<path:url>', methods=['GET', 'POST', 'PUT', 'DELETE'])
def proxy(url):
    try:
        if request.method == 'GET':
            resp = requests.get(f'https://openbanking.santander.co.uk/{url}',headers={'Accept': 'application/prs.openbanking.opendata.v2.2+json'})
        elif request.method == 'POST':
            resp = requests.post(f'https://openbanking.santander.co.uk/{url}', json=request.json, headers=request.headers)
        elif request.method == 'PUT':
            resp = requests.put(f'https://openbanking.santander.co.uk/{url}', json=request.json, headers=request.headers)
        elif request.method == 'DELETE':
            resp = requests.delete(f'https://openbanking.santander.co.uk/{url}', headers=request.headers)
    except Exception as e:
        return Response(f"An error occurred: {str(e)}", status=500)

    print(resp.status_code)
    # print(resp.text)
    print(resp.headers.items())
    headers = {k: v for k, v in resp.headers.items() if k.lower() not in ('transfer-encoding', 'content-length')}
    return resp.text, 200
    # return Response(resp.text, resp.status_code, resp.headers.items())







if __name__ == '__main__':
    app.run(debug=True)
