import requests
from flask import Flask, request, Response
from flask_cors import CORS
import json
# from blueprints.vosk import Model, KaldiRecognizer
from flask_socketio import SocketIO

import pyaudio

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})
socketio = SocketIO(app, cors_allowed_origins="*")

# username = "minhazh00"
# password = "Openbankminz1!"
# consumer_key = "kbvhddnoif1m5iisus1uewgqgkkyplunvs5otfhb"
#
# auth_token = authenticate_with_open_bank_project(username,password,consumer_key)
#
# if auth_token:
#     print("Authentication token:",auth_token)
#
# else:
#     print("Authentication failed")
#
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
    # Start constant voice recognition in the background
    socketio.start_background_task(target=transcribe)
    socketio.run(app, debug=True,allow_unsafe_werkzeug=True)
