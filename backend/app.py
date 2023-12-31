from flask import Flask
from flask_cors import CORS
from flask_socketio import SocketIO
from voice_blueprints.voice_recognition import constant_voice
from voice_blueprints.transcription import transcription
from bank_blueprints.bankproxy import bankproxy
from bank_blueprints.openbank_api import authenticate_with_open_bank_project
from database_blueprints import controllers

# from facial_blueprints import trigger_facial
from chatbot_blueprints.chatbot import chatbot

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})
socketio = SocketIO(app, cors_allowed_origins="*")

app.register_blueprint(transcription)
app.register_blueprint(bankproxy)
app.register_blueprint(controllers)

username = "minhazh00"
password = "Openbankminz1!"
consumer_key = "kbvhddnoif1m5iisus1uewgqgkkyplunvs5otfhb"
# trigger_facial()
app.register_blueprint(chatbot)


auth_token = authenticate_with_open_bank_project(username, password, consumer_key)

if auth_token:
    print("Authentication token:",auth_token)
else:
    print("Authentication failed")

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
            socketio.emit('recognized_text', result)


if __name__ == '__main__':
    # app.run(debug=True, port=5008)
    socketio.start_background_task(target=init_constant_voice)
    socketio.run(app, debug=True, allow_unsafe_werkzeug=True, port=5000)
