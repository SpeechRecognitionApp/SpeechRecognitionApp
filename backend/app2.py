# app.py
from flask import Flask
from flask_cors import CORS
from flask_socketio import SocketIO
from blueprints.voice_recognition import constant_voice
from blueprints.transcription import transcription
from blueprints.bankproxy import bankproxy
import requests


app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})
socketio = SocketIO(app, cors_allowed_origins="*")

app.register_blueprint(transcription)
app.register_blueprint(bankproxy)

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


# url = "https://api.monzo.com/oauth2/authorize"
url = "https://auth.monzo.com"
data = {
    # "email": "ucabj41@ucl.ac.uk",
    "redirect_uri": "https://developers.monzo.com/login?redirect=%2Fapi%2Fplayground",
    "response_type": "code",
    "state": "c18956b6-2e01-4023-9c16-7517b059e71f",
    "client_id": "oauthclient_000094PvINDGzT3k6tz8jp",
    # "intent": "login"
}

def init_constant_voice():
    for result in constant_voice():
        if result:
            # Emit recognized text to frontend via WebSocket
            socketio.emit('recognized_text', result)
#
# response = requests.get(url, data=data)
# print(response.text)
# with open('response.html', 'w') as f:
#     f.write(response.text)


if __name__ == '__main__':
    # app.run(debug=True, port=5008)
    socketio.start_background_task(target=init_constant_voice)
    socketio.run(app, debug=True, allow_unsafe_werkzeug=True, port=5000)
