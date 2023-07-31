# app.py
from flask import Flask
from flask_cors import CORS
from flask_socketio import SocketIO

from voice_recognition import constant_voice
from transcription import transcription
from bankproxy import bankproxy
import requests


app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

app.register_blueprint(transcription)
app.register_blueprint(bankproxy)


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


constant_voice();

response = requests.get(url, data=data)
print(response.text)
with open('response.html', 'w') as f:
    f.write(response.text)
if __name__ == '__main__':
    app.run(debug=True, port=5008)
